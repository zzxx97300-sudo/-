import Link from "next/link";
import type { Project } from "@/types/content";
import { ProjectVisual } from "./project-visual";
import { Icon } from "./icons";

export function ProjectCard({ project }: { project: Project }) {
  return <article className="card project-card">
    <ProjectVisual visual={project.visual} />
    <div className="project-card-body">
      <div className="project-card-meta"><span>{project.period}</span><span>{project.role}</span></div>
      <h3>{project.title}</h3>
      <p>{project.summary}</p>
      <div className="tag-row">{project.tags.map((tag) => <span key={tag} className="tag">{tag}</span>)}</div>
      <Link href={`/projects/${project.slug}`} className="text-link" aria-label={`查看项目详情：${project.title}`}>查看项目详情<Icon name="arrow" size={16} /></Link>
    </div>
  </article>;
}
