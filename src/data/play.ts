import type { CardItem } from "./types";
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
];

