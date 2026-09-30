import { AwardGrid } from "@/components/award-grid";
import { PageIntro } from "@/components/page-intro";
import { awards } from "@/data/awards";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata("竞赛与荣誉", "张鑫的已核实竞赛获奖记录，按国家级、赛区、校级与模拟赛分别展示。", "/awards");

const groups = ["国家级", "省级/赛区", "校级", "模拟赛"] as const;

export default function AwardsPage() {
  return <div className="site-container">
    <PageIntro eyebrow="AWARDS" title="竞赛与荣誉" description="奖项按证书核实，明确区分正式赛事、校内选拔赛与模拟赛。点击证书缩略图可查看脱敏大图。" />
    <div className="content-section">{groups.map((group) => {
      const items = awards.filter((award) => award.level === group).sort((a, b) => b.date.localeCompare(a.date));
      if (!items.length) return null;
      return <section key={group} style={{ marginBottom: 45 }}><h2>{group}</h2><AwardGrid awards={items} /></section>;
    })}<p className="callout">证书大图经过压缩并隐藏证书编号。现有材料无法证明的奖项暂不展示。</p></div>
  </div>;
}
