import Link from "next/link";
import { PageIntro } from "@/components/page-intro";
import { profile } from "@/data/profile";
import { education } from "@/data/education";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata("关于我", "了解张鑫的自动化专业背景、求职方向与工程实践。", "/about");

export default function AboutPage() {
  const school = education[0];
  return <div className="site-container">
    <PageIntro eyebrow="ABOUT" title="关于我" description="从自动化基础出发，关注视觉识别、嵌入式控制和实际系统联调。" />
    <section className="content-section">
      <div className="prose-text"><p>我是张鑫，{school.school}{school.major}专业本科在读，预计于 2027 年毕业，求职方向为{profile.targetRole}。</p><p>在实验室项目中，我参与视觉追踪云台和智能分拣机器人的开发与联调。前者涉及 OpenCV 目标位置提取、串口通信和舵机控制，后者涉及颜色与形状识别、传感器采集及机械臂动作逻辑。</p><p>我也在南方电网道真分公司实习，接触电力安全规范、接线检查与试验仪器操作。科研材料包括一篇 CISC 2026 录用论文和四项已受理的专利申请。</p></div>
      <div className="detail-grid" style={{ marginTop: 30 }}>
        <div className="card detail-card"><h3>当前学习与方向</h3><p>{school.school} · {school.college}<br />{school.major}本科 · {school.period}</p><Link href="/education" className="text-link">查看教育经历 →</Link></div>
        <div className="card detail-card"><h3>实践侧重点</h3><p>视觉处理、单片机与串口控制、系统联调、电气基础实践。</p><Link href="/projects" className="text-link">查看项目经历 →</Link></div>
      </div>
    </section>
  </div>;
}
