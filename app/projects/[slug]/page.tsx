import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageIntro } from "@/components/page-intro";
import { ProjectVisual } from "@/components/project-visual";
import { projects } from "@/data/projects";
import { pageMetadata } from "@/lib/site";

export function generateStaticParams() { return projects.map((project) => ({ slug: project.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  return project ? pageMetadata(project.title, project.summary, `/projects/${slug}`) : pageMetadata("项目未找到", "项目页面不存在。", `/projects/${slug}`);
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();
  return <div className="site-container">
    <PageIntro eyebrow="PROJECT / CASE STUDY" title={project.title} description={project.summary} />
    <section className="content-section">
      <div className="metric-line" style={{ marginBottom: 24 }}><span className="metric-pill">{project.period}</span><span className="metric-pill">{project.role}</span>{project.tags.map((tag) => <span className="metric-pill" key={tag}>{tag}</span>)}</div>
      <div className="card" style={{ overflow: "hidden" }}><ProjectVisual visual={project.visual} /></div>
      <div className="detail-grid" style={{ marginTop: 20 }}>
        <article className="card detail-card"><h3>项目背景</h3><p>{project.background}</p></article>
        <article className="card detail-card"><h3>核心问题</h3><p>{project.problem}</p></article>
        <article className="card detail-card"><h3>我的职责</h3><ul>{project.responsibilities.map((item) => <li key={item}>{item}</li>)}</ul></article>
        <article className="card detail-card"><h3>技术方案</h3><ul>{project.approach.map((item) => <li key={item}>{item}</li>)}</ul></article>
        {project.hardware?.length ? <article className="card detail-card"><h3>硬件</h3><div className="tag-row">{project.hardware.map((item) => <span className="tag" key={item}>{item}</span>)}</div></article> : null}
        {project.software?.length ? <article className="card detail-card"><h3>软件与算法</h3><div className="tag-row">{project.software.map((item) => <span className="tag" key={item}>{item}</span>)}</div></article> : null}
      </div>
      {project.process?.length ? <article className="card detail-card" style={{ marginTop: 16 }}><h3>实现过程</h3><ol className="simple-list">{project.process.map((step) => <li key={step}>{step}</li>)}</ol></article> : null}
      <article className="card detail-card" style={{ marginTop: 16 }}><h3>最终结果</h3><p>{project.result}</p></article>
      {project.relatedAward && <p className="callout" style={{ marginTop: 20 }}>相关材料说明：{project.relatedAward}</p>}
      <div style={{ marginTop: 30 }}><Link href="/projects" className="text-link">← 返回项目列表</Link></div>
    </section>
  </div>;
}
