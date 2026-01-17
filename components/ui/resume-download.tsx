"use client";

import { motion } from "motion/react";
import { DownloadIcon, FileTextIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Panel,
  PanelContent,
  PanelHeader,
  PanelTitle,
} from "@/components/layout/panel";

interface ResumeDownloadProps {
  resumeUrl?: string;
}

export function ResumeDownload({ resumeUrl = "/resume.pdf" }: ResumeDownloadProps) {
  return (
    <Panel id="resume">
      <PanelHeader>
        <PanelTitle>Resume</PanelTitle>
      </PanelHeader>

      <PanelContent>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-xl border border-edge bg-card"
        >
          <div className="flex items-center gap-4">
            <div className="size-12 rounded-lg bg-muted flex items-center justify-center">
              <FileTextIcon className="size-6 text-muted-foreground" />
            </div>
            <div>
              <h3 className="font-semibold">Download My Resume</h3>
              <p className="text-sm text-muted-foreground">
                PDF format, updated January 2026
              </p>
            </div>
          </div>

          <Button asChild>
            <a href={resumeUrl} download>
              <DownloadIcon className="size-4" />
              Download PDF
            </a>
          </Button>
        </motion.div>
      </PanelContent>
    </Panel>
  );
}
