import Link from "next/link";
import { AwardGrid } from "@/components/award-grid";
import { Icon } from "@/components/icons";
import { ProjectCard } from "@/components/project-card";
import { SafeImage } from "@/components/safe-image";
import { SectionHeading } from "@/components/section-heading";
import { awards } from "@/data/awards";
import { education } from "@/data/education";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { papers, patents } from "@/data/research";

const stats = [
  { value: awards.length, label: "项已核实竞赛奖项" },
  { value: projects.length, label: "项实验室项目" },
  { value: papers.length, label: "篇会议论文录用" },
  { value: patents.length, label: "项已受理专利申请" },
];

export default function Home() {
  return <>
    <div className="site-container">
      <section className="hero" aria-labelledby="hero-title">
        <div>
          <div className="eyebrow">HELLO, I&apos;M XIN ZHANG / 求职作品集</div>
          <h1 id="hero-title">你好，我是<span className="accent">张鑫</span>。</h1>
          <p className="hero-lead">{profile.headline}<br />{profile.introduction}</p>
          <div className="hero-school">{education[0]?.school} · {education[0]?.major} · {profile.graduation}</div>
          <div className="hero-tags"><span className="tag">求职方向：{profile.targetRole}</span><span className="tag">OpenCV</span><span className="tag">单片机控制</span><span className="tag">Python / C</span></div>
          <div className="hero-actions">
            <Link href="/projects" className="button button-primary">查看项目<Icon name="arrow" size={16} /></Link>
            <Link href="/experience" className="button">查看经历</Link>
            <Link href="/awards" className="button">查看荣誉</Link>
            <Link href="/research" className="button">查看论文</Link>
            <a href="/resume/zhangxin-resume-zh.pdf" className="button" download>下载简历<Icon name="download" size={15} /></a>
            <Link href="/contact" className="button">联系我</Link>
          </div>
        </div>
        <div className="portrait-wrap">
          <div className="portrait-frame"><SafeImage src={profile.portrait} alt="张鑫的正式证件照" fill sizes="(max-width: 650px) 160px, 345px" priority /></div>
          <div className="portrait-caption"><strong>张鑫 / Xin Zhang</strong><span><i className="availability" />2027 届</span></div>
        </div>
      </section>
      <div className="stats" aria-label="材料统计">{stats.map((stat) => <div className="stat" key={stat.label}><strong>{stat.value.toString().padStart(2, "0")}</strong><span>{stat.label}</span></div>)}</div>
      <section className="section">
        <SectionHeading eyebrow="SELECTED PROJECTS" title="把识别结果变成可执行动作" description="围绕视觉处理、传感器采集与控制联调，展示两项有材料记录的实验室项目。" href="/projects" linkLabel="全部项目" />
        <div className="card-grid">{projects.map((project) => <ProjectCard key={project.slug} project={project} />)}</div>
      </section>
      <section className="section-tight">
        <SectionHeading eyebrow="RECOGNITION" title="竞赛与荣誉" description="奖项名称、级别和时间均按现有证书核对；模拟赛单独标注。" href="/awards" linkLabel="查看全部奖项" />
        <AwardGrid awards={awards.slice(0, 2)} />
      </section>
      <section className="section">
        <SectionHeading eyebrow="RESEARCH & PRACTICE" title="科研与工程实践" description="论文录用、专利申请与实际项目协同推进；只展示有材料依据的状态。" href="/research" linkLabel="查看科研成果" />
        <div className="insight-panel">
          <div><div className="eyebrow">PAPER / CISC 2026</div><h3>ROS2 移动机器人任务规划</h3><p>作为录用论文第 4 作者，参与题为 “A Three-Level Semantic Framework for Executable Task Planning of ROS2 Mobile Robots in Structured Indoor Environments” 的研究。当前仅有录用函，论文正文尚未公开。</p></div>
          <div><div className="eyebrow">PATENT APPLICATIONS</div><h3>{patents.length} 项申请已受理</h3><p>涉及无人机目标识别、空地协同、电力巡检边缘数据管理与智能设备。受理状态不等同于授权，网站明确区分。</p><div className="insight-actions"><Link href="/research" className="button">研究与专利<Icon name="arrow" size={15} /></Link><Link href="/resume" className="button">查看简历</Link></div></div>
        </div>
      </section>
    </div>
  </>;
}
