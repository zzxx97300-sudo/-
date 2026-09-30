import { PageIntro } from "@/components/page-intro";
import { education } from "@/data/education";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata("教育经历", "张鑫的自动化专业教育经历、绩点排名与主修课程。", "/education");

export default function EducationPage() {
  return <div className="site-container">
    <PageIntro eyebrow="EDUCATION" title="教育经历" description="以官方学籍报告和专业学分绩点排名材料为依据。" />
    <section className="content-section">
      {education.map((item) => <article className="card detail-card" key={item.school}>
        <div className="eyebrow">{item.period}</div><h2 style={{ margin: "12px 0 8px", fontSize: 28 }}>{item.school}</h2><p style={{ marginTop: 0 }}>{item.college} · {item.major} · {item.degree}</p>
        <div className="metric-line" style={{ marginTop: 23 }}><span className="metric-pill">{item.ranking}</span><span className="metric-pill">绩点 {item.gpa}</span></div>
        <div className="detail-grid" style={{ marginTop: 30 }}><div><h3>主修方向</h3><p>{item.focus}</p></div><div><h3>代表课程</h3><ul>{item.courses.map((course) => <li key={course}>{course}</li>)}</ul></div></div>
      </article>)}
      <p className="callout" style={{ marginTop: 20 }}>排名与绩点来自 2026 年 9 月的专业学分绩点排名材料；此处不公开包含其他同学学号与成绩的原表。</p>
    </section>
  </div>;
}
