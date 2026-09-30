import { PageIntro } from "@/components/page-intro";
import { ProjectCard } from "@/components/project-card";
import { projects } from "@/data/projects";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata("项目经历", "张鑫参与的视觉追踪云台与智能分拣机器人项目。", "/projects");

export default function ProjectsPage() {
  return <div className="site-container"><PageIntro eyebrow="PROJECTS" title="项目经历" description="从问题、职责到实现路径，展示有简历材料支撑的工程项目。" /><section className="content-section">{projects.length ? <div className="card-grid">{projects.map((project) => <ProjectCard key={project.slug} project={project} />)}</div> : <p className="callout">项目资料整理中。</p>}</section></div>;
}
