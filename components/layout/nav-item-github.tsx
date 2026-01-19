import { GithubButton } from "@/components/ui/features/github-button";
import {
  SOURCE_CODE_GITHUB_REPO,
  SOURCE_CODE_GITHUB_URL,
} from "@/lib/config/site";

async function getGitHubStars(): Promise<number | null> {
  try {
    const res = await fetch(
      `https://api.github.com/repos/${SOURCE_CODE_GITHUB_REPO}`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return null;
    const data = await res.json();
    return data.stargazers_count ?? null;
  } catch {
    return null;
  }
}

export async function NavItemGitHub({ className }: { className?: string }) {
  const stars = await getGitHubStars();

  return (
    <GithubButton
      className={className}
      initialStars={0}
      targetStars={stars ?? 0}
      separator={true}
      label=""
      roundStars={true}
      repoUrl={SOURCE_CODE_GITHUB_URL}
      variant="outline"
      size="sm"
    />
  );
}
