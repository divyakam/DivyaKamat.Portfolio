// Site configuration — §12.3
export const site = {
  name: "Divya",
  email: "hello@example.com", // TODO: Owner supplies
  linkedin: "https://www.linkedin.com/in/", // TODO: Owner supplies
  instagram: "https://www.instagram.com/", // TODO: Owner supplies
  resumePdf: "/assets/resume.pdf",
  spotifyTrackId: "6BbhGaNa0m7mHOVIMcMbMf", // PLACEHOLDER: "I Want It That Way"
  roles: [
    { label: "Product Designer", icon: "PenTool" as const },
    { label: "Spatial Designer", icon: "Box" as const },
    { label: "Experience Designer", icon: "Sparkles" as const },
  ],
  fabRoutes: ["/"],
  footerCopy: "Designed and built with curiosity. © 2026 Divya.",
  heroGreeting: "Hi",
  heroH1: "I'm Divya, and I love crafting fun things with passionate people!",
  tagline: "Combining design and tech to enhance human experiences.",
  subtext: "Always curious, always creative.",
};
