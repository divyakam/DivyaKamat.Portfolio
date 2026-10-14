import type { CardItem } from "./types";
import project01Cover from "@/assets/work_case study/kine/kine_cover.png";
import puffyCover from "@/assets/play/puffys_way_out/puffy_cover.png";
import puffyCaseStudy from "@/assets/play/puffys_way_out/puffy_casestudy.png";

export const play: CardItem[] = [
  {
    id: "puffys-way-out",
    title: "Puffy's Way Out",
    description: "An interactive augmented reality experience where a physical poster transforms into a playable maze.",
    category: "Augmented Reality",
    categories: ["Augmented Reality", "Game Design", "Interactive Media"],
    year: 2025,
    duration: "4 Weeks",
    projectType: "Individual",
    order: 1,
    cover: {
      src: puffyCover,
      alt: "Puffy's Way Out cover",
      width: 1828,
      height: 1372,
    },
    caseStudyImage: puffyCaseStudy,
    caseStudyMedia: [
      {
        type: "image",
        src: puffyCaseStudy,
        filename: "puffy_casestudy.png",
        index: 1,
      },
    ],
  },
  {
    id: "play-01",
    title: "Particle Symphony",
    description: "Generative audio-visual particle system responding to microphone frequencies in WebGL.",
    category: "Generative Art",
    year: 2025,
    order: 2,
    cover: { src: project01Cover, alt: "Particle Symphony", width: 1600, height: 1000 },
    href: "https://example.com",
    external: true,
  }
];

