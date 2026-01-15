import { memo } from "react";

import { CollapsibleList } from "@/components/ui/collapsible-list";

import { PROJECTS } from "@/lib/data/projects";
import { Panel, PanelHeader, PanelTitle, PanelTitleSup } from "@/components/layout/panel";
import { ProjectItem } from "./project-item";

export const Projects = memo(function Projects() {
  return (
    <Panel id="projects">
      <PanelHeader>
        <PanelTitle>
          Projects
          <PanelTitleSup>({PROJECTS.length})</PanelTitleSup>
        </PanelTitle>
      </PanelHeader>

      <CollapsibleList
        items={PROJECTS}
        max={4}
        renderItem={(item) => <ProjectItem project={item} />}
      />
    </Panel>
  );
});