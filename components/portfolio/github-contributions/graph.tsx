"use client";

import { LoaderIcon } from "lucide-react";
import { use } from "react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import type { Activity } from "@/components/kibo-ui/contribution-graph";
import {
  ContributionGraph,
  ContributionGraphBlock,
  ContributionGraphCalendar,
  ContributionGraphFooter,
  ContributionGraphLegend,
  ContributionGraphTotalCount,
} from "@/components/kibo-ui/contribution-graph";
import { GITHUB_USERNAME } from "@/lib/config/site";

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});

export function GitHubContributionGraph({
  contributions,
}: {
  contributions: Promise<Activity[]>;
}) {
  const data = use(contributions);

  return (
    <TooltipProvider>
      <ContributionGraph
        className="mx-auto py-2"
        data={data}
        blockSize={11}
        blockMargin={3}
        blockRadius={0}
      >
        <ContributionGraphCalendar
          className="no-scrollbar px-2"
          title="GitHub Contributions"
        >
          {({ activity, dayIndex, weekIndex }) => (
            <Tooltip>
              <TooltipTrigger asChild>
                <g>
                  <ContributionGraphBlock
                    activity={activity}
                    dayIndex={dayIndex}
                    weekIndex={weekIndex}
                    className={`
                      data-[level="0"]:fill-muted
                      data-[level="1"]:fill-emerald-200 data-[level="1"]:dark:fill-emerald-900
                      data-[level="2"]:fill-emerald-400 data-[level="2"]:dark:fill-emerald-700
                      data-[level="3"]:fill-emerald-600 data-[level="3"]:dark:fill-emerald-500
                      data-[level="4"]:fill-emerald-800 data-[level="4"]:dark:fill-emerald-300
                    `}
                  />
                </g>
              </TooltipTrigger>

              <TooltipContent className="font-sans">
                <p>
                  {activity.count} contribution{activity.count > 1 ? "s" : null}{" "}
                  on {dateFormatter.format(new Date(activity.date))}
                </p>
              </TooltipContent>
            </Tooltip>
          )}
        </ContributionGraphCalendar>

        <ContributionGraphFooter className="px-2">
          <ContributionGraphTotalCount>
            {({ totalCount, year }) => (
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground text-sm">
                  {year} on{" "}
                  <a
                    className="font-medium underline underline-offset-4"
                    href={`https://github.com/${GITHUB_USERNAME}`}
                    target="_blank"
                    rel="noopener"
                  >
                    GitHub
                  </a>
                  :
                </span>
                <Badge variant="secondary">
                  {totalCount.toLocaleString("en")} contributions
                </Badge>
              </div>
            )}
          </ContributionGraphTotalCount>

          <ContributionGraphLegend>
            {({ level }) => (
              <div
                className="group relative flex h-3 w-3 items-center justify-center"
                data-level={level}
              >
                <div
                  className={`h-full w-full rounded-sm border border-border ${level === 0 ? "bg-muted" : ""} ${level === 1 ? "bg-emerald-200 dark:bg-emerald-900" : ""} ${level === 2 ? "bg-emerald-400 dark:bg-emerald-700" : ""} ${level === 3 ? "bg-emerald-600 dark:bg-emerald-500" : ""} ${level === 4 ? "bg-emerald-800 dark:bg-emerald-300" : ""} `}
                />
                <span className="-top-8 absolute hidden rounded bg-popover px-2 py-1 text-popover-foreground text-xs shadow-md group-hover:block">
                  Level {level}
                </span>
              </div>
            )}
          </ContributionGraphLegend>
        </ContributionGraphFooter>
      </ContributionGraph>
    </TooltipProvider>
  );
}

export function GitHubContributionFallback() {
  return (
    <div className="flex h-40.5 w-full items-center justify-center">
      <LoaderIcon className="animate-spin text-muted-foreground" aria-hidden="true" />
    </div>
  );
}