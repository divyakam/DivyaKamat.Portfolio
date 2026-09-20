import type { CardItem } from "./types";
import project01Cover from "@/assets/work/project-01.png";
import systemCsImg from "@/assets/work/system_cs.png";
import kineticCover from "@/assets/work/kine_b.png";
import kineticCs from "@/assets/work/kine_cs.png";

// Portfolio work projects
export const work: CardItem[] = [
  {
    id: "project-01",
    title: "The Cost of Convenience",
    description: "Mapped the hidden environmental toll of India's food delivery boom through a systems lens.",
    category: "System Thinking",
    year: 2025,
    duration: "4 Weeks",
    projectType: "Individual",
    order: 1,
    cover: { src: project01Cover, alt: "The Cost of Convenience — system map", width: 1600, height: 1000 },
    caseStudyImage: systemCsImg,
  },
  {
    id: "project-02",
    title: "Kine",
    description: "A motion-led signage system for transit spaces that adapts to crowd flow in real time.",
    category: "Experience Design",
    year: 2025,
    duration: "6 Weeks",
    projectType: "Group",
    order: 2,
    cover: { src: kineticCover, alt: "Kinetic Wayfinding — signage system", width: 1600, height: 1000 },
    caseStudyImage: kineticCs,
  },
  {
    id: "project-03",
    title: "Civic Pulse",
    description: "A participatory dashboard helping local governments visualise resident feedback in real time.",
    category: "Product Design",
    year: 2024,
    duration: "8 Weeks",
    projectType: "Group",
    order: 3,
    cover: { src: project01Cover, alt: "Civic Pulse — civic tech dashboard", width: 1600, height: 1000 },
  },
  {
    id: "project-04",
    title: "Threshold",
    description: "An immersive installation exploring the liminal space between digital and physical presence.",
    category: "Spatial Design",
    year: 2024,
    duration: "10 Weeks",
    projectType: "Group",
    order: 4,
    cover: { src: kineticCover, alt: "Threshold — spatial installation", width: 1600, height: 1000 },
  },
  {
    id: "project-05",
    title: "Ritual Objects",
    description: "Redesigning everyday domestic rituals through speculative product interventions.",
    category: "Product Design",
    year: 2023,
    duration: "5 Weeks",
    projectType: "Individual",
    order: 5,
    cover: { src: project01Cover, alt: "Ritual Objects — speculative products", width: 1600, height: 1000 },
  },
];
