// Skills data — §8.9.3

export interface SkillTool {
  name: string;
  icon: string; // SimpleIcon / Devicon slug
  color?: string; // Optional icon color hex (without #)
  badgeBg?: string; // Optional background for icon tile
  deviconClass?: string; // Fallback Devicon class
}

export interface SkillMethod {
  name: string;
}

export const designTools: SkillTool[] = [
  { name: "Figma", icon: "figma", deviconClass: "devicon-figma-plain" },
  { name: "FigJam", icon: "figma", deviconClass: "devicon-figma-plain" },
  { name: "Adobe Illustrator", icon: "adobeillustrator", deviconClass: "devicon-illustrator-plain" },
  { name: "Adobe Photoshop", icon: "adobephotoshop", deviconClass: "devicon-photoshop-plain" },
  { name: "After Effects", icon: "adobeaftereffects", deviconClass: "devicon-aftereffects-plain" },
  { name: "Framer", icon: "framer", color: "000000", deviconClass: "devicon-framermotion-original" },

];

export const spatialTools: SkillTool[] = [
  { name: "Unity", icon: "unity", color: "000000", deviconClass: "devicon-unity-original" },
  { name: "Unreal Engine", icon: "unrealengine", color: "ffffff", badgeBg: "#111113", deviconClass: "devicon-unrealengine-original" },
  { name: "TouchDesigner", icon: "touchdesigner", color: "000000" },
  { name: "Blender", icon: "blender", deviconClass: "devicon-blender-original" },
  { name: "Spline", icon: "spline", color: "000000" },
];

export const researchMethods: SkillMethod[] = [
  { name: "User testing" },
  { name: "Information architecture" },
  { name: "User flows" },
  { name: "User interviews" },
  { name: "Usability heuristics" },
  { name: "Journey mapping" },
  { name: "Personas" },
  { name: "Affinity mapping" },
  { name: "Wireframing" },
  { name: "Prototyping" },
  { name: "Design systems" },
];
