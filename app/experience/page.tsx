import { PageIntro } from "@/components/page-intro";
import { experience } from "@/data/experience";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata("实习与实践经历", "张鑫在南方电网道真分公司的实习与校内实践经历。", "/experience");

export default function ExperiencePage() {
  return <div className="site-container"><PageIntro eyebrow="EXPERIENCE" title="实习与实践" description="企业实习、校内工作与班级服务经历。" /><section className="content-section"><div className="timeline">{experience.map((item) => <article className="card timeline-card" key={item.title}><div className="timeline-date">{item.period}</div><div><p className="small-label">{item.type}</p><h3>{item.title}</h3><ul>{item.details.map((detail) => <li key={detail}>{detail}</li>)}</ul></div></article>)}</div></section></div>;
}
