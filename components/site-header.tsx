"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navigation, primaryNavigation, secondaryNavigation } from "@/data/navigation";
import { Icon } from "./icons";

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);


  function toggleTheme() {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("portfolio-theme", next ? "dark" : "light");
  }

  const active = (href: string) => href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="site-header">
      <div className="site-container header-inner">
        <Link href="/" className="brand" aria-label="ZX. PORTFOLIO 张鑫首页" onClick={() => setMenuOpen(false)}>
          <span className="brand-mark">ZX<span className="brand-dot">.</span></span>
          <span className="brand-label">PORTFOLIO</span>
        </Link>
        <nav className="desktop-nav" aria-label="主导航">
          {primaryNavigation.map((item) => <Link key={item.href} href={item.href} className={active(item.href) ? "nav-link active" : "nav-link"}>{item.label}</Link>)}
          <details className="more-menu">
            <summary className="nav-link">更多 <span aria-hidden="true">⌄</span></summary>
            <div className="more-panel">
              {secondaryNavigation.map((item) => <Link key={item.href} href={item.href} className={active(item.href) ? "more-link active" : "more-link"}>{item.label}</Link>)}
            </div>
          </details>
        </nav>
        <div className="header-actions">
          <button className="icon-button theme-button" onClick={toggleTheme} type="button" aria-label="切换浅色或深色模式" title="切换主题">
            <Icon name="moon" size={19} className="moon-icon" /><Icon name="sun" size={19} className="sun-icon" />
          </button>
          <button className="icon-button mobile-toggle" onClick={() => setMenuOpen((value) => !value)} type="button" aria-label={menuOpen ? "关闭菜单" : "打开菜单"} aria-expanded={menuOpen} aria-controls="mobile-navigation">
            <Icon name={menuOpen ? "close" : "menu"} size={23} />
          </button>
        </div>
      </div>
      {menuOpen && <nav className="mobile-nav" id="mobile-navigation" aria-label="移动端导航">
        <div className="site-container mobile-nav-grid">
          {navigation.map((item) => <Link key={item.href} href={item.href} className={active(item.href) ? "mobile-link active" : "mobile-link"} onClick={() => setMenuOpen(false)}>{item.label}</Link>)}
        </div>
      </nav>}
    </header>
  );
}
