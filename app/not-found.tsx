import Link from "next/link";

export default function NotFound() {
  return <div className="site-container" style={{ minHeight: "60vh", paddingBlock: "100px" }}><div className="eyebrow">404 / NOT FOUND</div><h1 style={{ fontSize: "clamp(38px,6vw,64px)", margin: "16px 0" }}>页面暂不存在</h1><p className="prose-text">地址可能已更改。可以从首页重新查找项目和资料。</p><Link href="/" className="button button-primary" style={{ marginTop: 20 }}>返回首页</Link></div>;
}
