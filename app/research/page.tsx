import { PageIntro } from "@/components/page-intro";
import { papers, patents } from "@/data/research";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata("科研与论文", "张鑫的 CISC 2026 录用论文与四项已受理专利申请。", "/research");

export default function ResearchPage() {
  return <div className="site-container"><PageIntro eyebrow="RESEARCH" title="科研与论文" description="公开可核实的论文录用与专利申请信息，不把录用写成已发表，也不把受理写成已授权。" />
    <div className="content-section">
      {papers.length > 0 && <section style={{ marginBottom: 48 }}><h2>论文</h2>{papers.map((paper) => <article className="card paper-card" key={paper.id}>
        <span className="level-label">{paper.status}</span><h3>{paper.title}</h3><p><strong>作者：</strong>{paper.authors}</p><div className="paper-meta"><span className="metric-pill">{paper.authorPosition}</span><span className="metric-pill">{paper.venue}</span><span className="metric-pill">{paper.year}</span></div><p><strong>研究方向：</strong>{paper.topic}</p><p><strong>摘要：</strong>{paper.abstract}</p>{paper.pdf ? <a className="text-link" href={paper.pdf}>查看论文 →</a> : <p className="callout">暂无经确认可公开的论文 PDF 或 DOI。</p>}
      </article>)}</section>}
      {patents.length > 0 && <section><h2>专利申请</h2><div className="patent-list">{patents.map((patent) => <article className="card patent-item" key={patent.title}><span>{patent.date}</span><div><strong>{patent.title}</strong><br /><small>{patent.type} · {patent.status}</small></div><span className="level-label">{patent.position}</span></article>)}</div><p className="callout" style={{ marginTop: 20 }}>以上为申请受理信息，不代表专利已获授权。受理通知书包含申请号及第三方联系信息，原件不公开。</p></section>}
    </div>
  </div>;
}
