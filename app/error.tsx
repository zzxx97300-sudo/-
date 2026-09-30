"use client";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <div className="site-container" style={{ minHeight: "60vh", paddingBlock: "100px" }}><div className="eyebrow">SOMETHING WENT WRONG</div><h1 style={{ fontSize: "clamp(34px,5vw,54px)", margin: "16px 0" }}>页面加载遇到问题</h1><p className="prose-text">请重试。如果问题持续，仍可以通过导航访问其他页面。</p><button className="button button-primary" type="button" onClick={reset} style={{ marginTop: 20 }}>重新加载</button></div>;
}
