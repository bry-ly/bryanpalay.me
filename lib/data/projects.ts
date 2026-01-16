import type { Project } from "../types/projects";

export const PROJECTS: Project[] = [
  {
    id: "attendance-system",
    logo: "/images/projects/ect.png",
    title: "Ect Attendance",
    period: {
      start: "01.2026",
    },
    link: "https://ect-attendance-sys.vercel.app",
    skills: ["NextJS", "Prisma", "BetterAuth", "ShadcnUI", "Vercel", "Arcjet"],
    description:
      "Attendance tracking for events, practices and for the department.",
  },
  {
    id: "velos-inventory",
    logo: "/images/projects/velos.png",
    title: "Velos Inventory",
    period: {
      start: "09.2025",
    },
    link: "https://velos-inve.vercel.app/",
    skills: ["NextJS", "TypeScript", "Prisma", "MongoDB", "TailwindCSS"],
    description:
      "Inventory management system for tracking products, stock levels, and sales analytics.",
  },
  {
    id: "dental-u-care",
    logo: "/images/projects/dental.svg",
    title: "Dental U-Care",
    period: {
      start: "11.2025",
    },
    link: "https://www.dentalucare.tech/",
    skills: ["NextJS", "TypeScript", "Prisma", "PostgreSQL", "TailwindCSS"],
    description:
      "A dental clinic management platform with appointment scheduling and patient records.",
  },
  {
    id: "health-care",
    logo: "/images/projects/health.ico",
    title: "Health Care",
    period: {
      start: "01.2024",
    },
    link: "https://health-care-rouge-theta.vercel.app/",
    skills: ["NextJS", "TypeScript", "Prisma", "PostgreSQL", "TailwindCSS"],
    description:
      "Healthcare management system for patient appointments and medical records.",
  },
  {
    id: "culm-lms",
    logo: "/images/projects/culm.svg",
    logoDark: "/images/projects/culm-dark.svg",
    title: "Culm LMS",
    period: {
      start: "12.2025",
    },
    link: "",
    skills: [
      "NextJS",
      "Prisma",
      "Tigris S3",
      "Arcjet",
      "ShadcnUI",
      "BetterAuth",
      "Stripe",
    ],
    description:
      "A modern minimalist learning management system integrate using modern technologies",
  },
];
