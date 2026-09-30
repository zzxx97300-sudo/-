import { PageIntro } from "@/components/page-intro";
import { skills } from "@/data/skills";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata("个人技能", "张鑫的嵌入式、机器视觉、电气与开发工具技能。", "/skills");

export default function SkillsPage() {
  return <div className="site-container"><PageIntro eyebrow="SKILLS" title="技能与工具" description="按材料中的实际课程、项目和实习经历归类，不使用主观百分比评分。" /><section className="content-section"><div className="skill-grid">{skills.map((group) => <article className="card skill-card" key={group.category}><h3>{group.category}</h3><div className="skill-items">{group.items.map((item) => <span className="skill-item" key={item}>{item}</span>)}</div></article>)}</div><p className="callout" style={{ marginTop: 20 }}>ROS2 出现在录用论文题目中；现有材料不足以证明独立工程熟练度，因此未列作技能标签。</p></section></div>;
}
