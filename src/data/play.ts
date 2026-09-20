import type { CardItem } from "./types";
import project01Cover from "@/assets/work/project-01.png";
import kineticCover from "@/assets/work/kine_b.png";

export const play: CardItem[] = [
  {
    id: "play-01",
    title: "Particle Symphony",
    description: "Generative audio-visual particle system responding to microphone frequencies in WebGL.",
    category: "Generative Art",
    year: 2025,
    order: 1,
    cover: { src: project01Cover, alt: "Particle Symphony", width: 1600, height: 1000 },
    href: "https://example.com",
    external: true,
  }
];
