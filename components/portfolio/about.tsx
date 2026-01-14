import { Markdown } from "@/components/ui/markdown";
import { ProseMono } from "@/components/ui/typography";
import { USER } from "@/lib/data/user";

import {
  Panel,
  PanelContent,
  PanelHeader,
  PanelTitle,
} from "@/components/layout/panel";

export function About() {
  return (
    <Panel id="about">
      <PanelHeader>
        <PanelTitle>About</PanelTitle>
      </PanelHeader>

      <PanelContent>
        <ProseMono>
          <Markdown>{USER.about}</Markdown>
        </ProseMono>
      </PanelContent>
    </Panel>
  );
}
