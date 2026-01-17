"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { ExternalLinkIcon, BoxIcon, SearchIcon, XIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Project } from "@/lib/types/projects";

interface ProjectsFilterProps {
  projects: Project[];
  allSkills: string[];
}

export function ProjectsFilter({ projects, allSkills }: ProjectsFilterProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch =
        searchQuery === "" ||
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesSkills =
        selectedSkills.length === 0 ||
        selectedSkills.some((skill) => project.skills.includes(skill));

      return matchesSearch && matchesSkills;
    });
  }, [projects, searchQuery, selectedSkills]);

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill)
        ? prev.filter((s) => s !== skill)
        : [...prev, skill]
    );
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedSkills([]);
  };

  const hasFilters = searchQuery !== "" || selectedSkills.length > 0;

  return (
    <div className="border-x border-edge">
      <div className="p-4 border-b border-edge space-y-4">
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-10 pl-10 pr-4 rounded-lg border border-input bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <XIcon className="size-4" />
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {allSkills.map((skill) => (
            <Badge
              key={skill}
              variant={selectedSkills.includes(skill) ? "default" : "outline"}
              className={cn(
                "cursor-pointer transition-colors",
                selectedSkills.includes(skill)
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-accent"
              )}
              onClick={() => toggleSkill(skill)}
            >
              {skill}
            </Badge>
          ))}
        </div>

        {hasFilters && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              Showing {filteredProjects.length} of {projects.length} projects
            </span>
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              Clear filters
            </Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredProjects.length === 0 && (
        <div className="p-8 text-center text-muted-foreground">
          <p>No projects match your filters.</p>
          <Button variant="link" onClick={clearFilters} className="mt-2">
            Clear all filters
          </Button>
        </div>
      )}
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="group rounded-xl border border-edge bg-card hover:bg-accent2 transition-all duration-300 overflow-hidden">
      <div className="p-4">
        <div className="flex items-start gap-4">
          {project.logo ? (
            project.logoDark ? (
              <>
                <Image
                  src={project.logo}
                  alt={project.title}
                  width={48}
                  height={48}
                  className="size-12 rounded-lg shrink-0 dark:hidden"
                  unoptimized
                />
                <Image
                  src={project.logoDark}
                  alt={project.title}
                  width={48}
                  height={48}
                  className="size-12 rounded-lg shrink-0 hidden dark:block"
                  unoptimized
                />
              </>
            ) : (
              <Image
                src={project.logo}
                alt={project.title}
                width={48}
                height={48}
                className="size-12 rounded-lg shrink-0"
                unoptimized
              />
            )
          ) : (
            <div className="size-12 rounded-lg shrink-0 flex items-center justify-center bg-muted text-muted-foreground border border-edge">
              <BoxIcon className="size-6" />
            </div>
          )}

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <h3 className="font-semibold truncate">{project.title}</h3>
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ExternalLinkIcon className="size-4" />
                </a>
              )}
            </div>
            <p className="text-sm text-muted-foreground">{project.period.start}</p>
          </div>
        </div>

        {project.description && (
          <p className="mt-4 text-sm text-muted-foreground line-clamp-2">
            {project.description}
          </p>
        )}

        {project.skills.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-4">
            {project.skills.slice(0, 4).map((skill) => (
              <Badge key={skill} variant="secondary" className="text-xs">
                {skill}
              </Badge>
            ))}
            {project.skills.length > 4 && (
              <Badge variant="secondary" className="text-xs">
                +{project.skills.length - 4}
              </Badge>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
