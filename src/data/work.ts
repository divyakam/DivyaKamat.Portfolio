import type { CardItem, CaseStudyMediaItem } from "./types";

// Vite eager glob import of all assets in /assets/work_case study/
const globAssets = import.meta.glob<string>(
  "/src/assets/work_case study/**/*.{png,jpg,jpeg,webp,mp4,webm,mov}",
  { eager: true, import: "default" }
);

interface ProjectMeta {
  id: string;
  title: string;
  description: string;
  category: string; // single category for Work card
  categories: string[]; // categories array for left panel
  year: number;
  duration: string;
  projectType: string;
}

// Config map for project metadata, easily editable
const projectMetadataMap: Record<string, ProjectMeta> = {
  ehsaas: {
    id: "ehsaas",
    title: "Ehsaas",
    description: "An therapeutic VR game teaching about the Navrasa frawwork.",
    category: "Game Design",
    categories: ["Game Design", "VR Design", "VR Development"],
    year: 2025,
    duration: "7 Weeks",
    projectType: "Individual",
  },
  system_thinking: {
    id: "system-thinking",
    title: "The Cost of Convenience",
    description: "Mapped the hidden environmental toll of India's food delivery boom through a systems lens.",
    category: "System Thinking",
    categories: ["System Thinking", "UX Design"],
    year: 2026,
    duration: "4 Weeks",
    projectType: "Individual",
  },
  kine: {
    id: "kine",
    title: "Kine",
    description: "KINE is an intelligent IoT wearable that redefines posture correction through the psychological concept of Embodied Cognition",
    category: "Product Design",
    categories: ["Product Design", "IoT", "UX Design"],
    year: 2025,
    duration: "7 Weeks",
    projectType: "Group of 2",
  },
  ethnography: {
    id: "ethnography",
    title: "Ethnography Reseach",
    description: "Field research and qualitative synthesis exploring user behaviors and cultural patterns.",
    category: "Ethnography Research",
    categories: ["Ethnography Research"],
    year: 2025,
    duration: "2 Weeks",
    projectType: "Group of 2",
  },
  "semiotic analysis": {
    id: "semiotic-analysis",
    title: "Semiotic Analysis",
    description: "This case study explores how Habbo Hotel creates meaning through its avatars, spaces, economy, and social interactions within a virtual world through semiotic theories",
    category: "Semiotic Analysis",
    categories: ["Semiotic Analysis", "Game Design"],
    year: 2025,
    duration: "2 Weeks",
    projectType: "Individual",
  },
};

// Required order:
// 1. ehsaas
// 2. system thinking (folder name system_thinking)
// 3. kine
// 4. remaining two alphabetically: ethnography, semiotic analysis
const folderOrder = ["ehsaas", "system_thinking", "kine", "ethnography", "semiotic analysis"];

// Group asset URLs by folder
interface FolderAssets {
  cover?: string;
  media: CaseStudyMediaItem[];
}

const folderAssetsMap: Record<string, FolderAssets> = {};

for (const path in globAssets) {
  const assetUrl = globAssets[path];
  const parts = path.split("/");
  const folderName = parts[parts.length - 2];
  const filename = parts[parts.length - 1];

  if (!folderAssetsMap[folderName]) {
    folderAssetsMap[folderName] = { media: [] };
  }

  const lowercaseFilename = filename.toLowerCase();

  // Check if cover image
  if (lowercaseFilename.includes("cover")) {
    folderAssetsMap[folderName].cover = assetUrl;
  } else {
    // Check if cs media: e.g. name_cs1.png or ethno_cs2.mp4
    const csMatch = lowercaseFilename.match(/_cs(\d+)\.([a-z0-9]+)$/);
    if (csMatch) {
      const index = parseInt(csMatch[1], 10);
      const ext = csMatch[2];
      const isVideo = ["mp4", "webm", "mov"].includes(ext);

      folderAssetsMap[folderName].media.push({
        type: isVideo ? "video" : "image",
        src: assetUrl,
        filename,
        index,
      });
    }
  }
}

// Build the ordered work list
export const work: CardItem[] = folderOrder.map((folderName, idx) => {
  const meta = projectMetadataMap[folderName] || {
    id: folderName,
    title: folderName,
    description: "",
    category: "Design",
    categories: ["Design", "Experience Design"],
    year: 2025,
    duration: "4 Weeks",
    projectType: "Individual",
  };

  const assets = folderAssetsMap[folderName] || { media: [] };

  // Sort media strictly in numeric order cs1, cs2, cs3... (no gaps, cs2 before cs10)
  const sortedMedia = [...assets.media].sort((a, b) => a.index - b.index);

  return {
    id: meta.id,
    title: meta.title,
    description: meta.description,
    category: meta.category,
    categories: meta.categories,
    year: meta.year,
    duration: meta.duration,
    projectType: meta.projectType,
    order: idx + 1,
    cover: {
      src: assets.cover || (sortedMedia.length > 0 ? sortedMedia[0].src : ""),
      alt: `${meta.title} cover`,
      width: 1600,
      height: 1000,
    },
    caseStudyImage: sortedMedia.length > 0 ? sortedMedia[0].src : assets.cover,
    caseStudyMedia: sortedMedia,
  };
});

// Selected work project IDs to display on the Home page
export const selectedWorkIds: string[] = ["ehsaas", "system-thinking"];

// Export selected works helper array for Home page
export const selectedWorks: CardItem[] = selectedWorkIds
  .map((id) => work.find((item) => item.id === id))
  .filter((item): item is CardItem => item !== undefined);

