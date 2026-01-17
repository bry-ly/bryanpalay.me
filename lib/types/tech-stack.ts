/**
 * A technology item displayed in the Tech Stack section.
 *
 * Icon file resolution:
 * - Default: /public/tech-stack-icons/[key].svg
 * - Themed (when `theme === true`):
 *   - Dark:  /public/tech-stack-icons/[key]-dark.svg
 *   - Light: /public/tech-stack-icons/[key]-light.svg
 */
export type TechStack = {
  /** Unique identifier used to resolve icon files. */
  key: string;
  /** Display name of the technology. */
  title: string;
  /** Official website URL. */
  href: string;
  /** Category tags used for grouping/filtering. */
  categories: string[];
  /** If true, use theme-specific icons for dark/light mode. */
  theme?: boolean;
  /** Proficiency level: 1 (beginner) to 5 (expert) */
  proficiency?: number;
  /** Years of experience with this technology */
  yearsOfExperience?: number;
};

export type SkillCategory = "all" | "frontend" | "backend" | "database" | "tools";
