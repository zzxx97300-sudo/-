import { existsSync } from "node:fs";
import { join } from "node:path";
import { Icon } from "@/components/icons";
import { PageIntro } from "@/components/page-intro";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata("中文简历", "在线预览并下载张鑫的公开版中文求职简历。", "/resume");
const pdfPath = "/resume/zhangxin-resume-zh.pdf";

export default function ResumePage() {
  const available = existsSync(join(process.cwd(), "public", "resume", "zhangxin-resume-zh.pdf"));
  return <div className="site-container"><PageIntro eyebrow="RESUME" title="中文简历" description="公开版简历已去除完整手机号和其他不适合公网展示的信息。" /><section className="content-section">
    {available ? <div className="resume-layout"><iframe className="pdf-frame" src={`${pdfPath}#view=FitH`} title="张鑫中文简历 PDF 在线预览" loading="lazy" /><aside className="card resume-side"><div className="eyebrow">PDF / CHINESE</div><h2>一页了解我的经历</h2><p>涵盖教育、项目、实习、科研与已核实竞赛奖项。可直接在线查看或下载发送给招聘人员。</p><a href={pdfPath} className="button button-primary" download><Icon name="download" size={17} />下载 PDF 简历</a><a href={pdfPath} className="button" target="_blank" rel="noopener noreferrer"><Icon name="file" size={17} />在新窗口打开</a><p>如手机浏览器不支持内嵌预览，请使用“在新窗口打开”。</p></aside></div> : <div className="callout">简历 PDF 暂未放入 public/resume。请按 README 的说明添加公开版简历后重新构建。</div>}
  </section></div>;
}
