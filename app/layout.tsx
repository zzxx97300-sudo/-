import type { Metadata, Viewport } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { pageMetadata, siteUrl } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  ...pageMetadata("个人求职网站", "张鑫的个人求职展示网站。自动化本科在读，聚焦嵌入式开发、机器视觉和自动化系统联调。"),
  title: "张鑫 | Portfolio",
  metadataBase: new URL(siteUrl),
  icons: { icon: "/icon.svg" },
  applicationName: "张鑫 Portfolio",
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#f8f9f7" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN" data-scroll-behavior="smooth" suppressHydrationWarning>
    <head><script dangerouslySetInnerHTML={{ __html: "try{if(localStorage.getItem('portfolio-theme')==='dark')document.documentElement.classList.add('dark')}catch(e){}" }} /></head>
    <body><SiteHeader /><main id="main-content">{children}</main><SiteFooter /></body>
  </html>;
}
