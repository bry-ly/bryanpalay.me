import { unstable_cache } from "next/cache";

import type { Activity } from "@/components/kibo-ui/contribution-graph";
import { GITHUB_USERNAME } from "../config/site";

type GitHubContributionsResponse = {
  contributions: Activity[];
};

export const getGitHubContributions = unstable_cache(
  async (): Promise<Activity[]> => {
    try {
      const currentYear = new Date().getFullYear();
      const res = await fetch(
        `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=${currentYear}`
      );

      if (!res.ok) {
        console.error(`GitHub contributions API error: ${res.status}`);
        return [];
      }

      const data = (await res.json()) as GitHubContributionsResponse;
      return data.contributions ?? [];
    } catch (error) {
      console.error("Failed to fetch GitHub contributions:", error);
      return [];
    }
  },
  ["github-contributions"],
  { revalidate: 86400 }
);