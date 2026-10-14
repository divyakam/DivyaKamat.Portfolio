// Data types — §12.3
export type Category =
  | "Product design"
  | "Spatial design"
  | "Game design"
  | "Experience design"
  | "New media design";

export interface CaseStudyMediaItem {
  type: "image" | "video";
  src: string;
  filename: string;
  index: number;
}

export interface CardItem {
  id: string;
  title: string; // ≤ 40 chars, one line
  description: string; // ≤ 90 chars, one sentence
  category: Category | string; // Work: Category. Play: free-form
  categories?: string[]; // Two categories for case study left panel
  year: number;
  duration?: string; // e.g. "4 Weeks"
  projectType?: "Individual" | "Group" | string; // e.g. "Individual"
  cover: {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    blur?: string;
  };
  caseStudyImage?: string;
  caseStudyMedia?: CaseStudyMediaItem[];
  video?: {
    src: string;
    poster: string;
  }; // Play only
  href?: string; // omit = non-clickable
  external?: boolean;
  order?: number;
}
