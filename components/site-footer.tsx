import Link from "next/link";
import { navigation } from "@/data/navigation";
import { profile } from "@/data/profile";

export function SiteFooter() {
  return <footer className="site-footer">
    <div className="site-container footer-grid">
      <div>
        <div className="footer-brand">张鑫<span>.</span></div>
        <p>自动化 · 嵌入式开发 · 机器视觉</p>
        <p className="footer-small">内容依据本人提供的简历及证明材料整理。更新于 2026 年 9 月。</p>
      </div>
      <div>
        <div className="footer-heading">站点导航</div>
        <div className="footer-links">{navigation.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}</div>
      </div>
      <div>
        <div className="footer-heading">联系</div>
        {profile.contact.email.public && <a href={`mailto:${profile.contact.email.value}`} className="footer-contact">{profile.contact.email.value}</a>}
        <p className="footer-small">私人资料与证明原件不在网站中公开。</p>
      </div>
    </div>
    <div className="site-container footer-bottom"><span>© {new Date().getFullYear()} 张鑫</span><span>Built with Next.js</span></div>
  </footer>;
}
