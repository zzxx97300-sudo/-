import type { ReactNode } from "react";

export function Icon({ name, size = 18, className = "" }: { name: "arrow" | "external" | "download" | "mail" | "moon" | "sun" | "menu" | "close" | "file" | "check"; size?: number; className?: string }) {
  const paths: Record<string, ReactNode> = {
    arrow: <><path d="M4 12h16" /><path d="m13 5 7 7-7 7" /></>,
    external: <><path d="M14 4h6v6" /><path d="M20 4 10 14" /><path d="M20 13v7H4V4h7" /></>,
    download: <><path d="M12 3v12" /><path d="m7 10 5 5 5-5" /><path d="M4 17v4h16v-4" /></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>,
    moon: <path d="M20.5 14.2A8.5 8.5 0 0 1 9.8 3.5 8.5 8.5 0 1 0 20.5 14.2Z" />,
    sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" /></>,
    menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
    close: <><path d="M5 5 19 19M19 5 5 19" /></>,
    file: <><path d="M6 2h8l4 4v16H6z" /><path d="M14 2v5h5" /><path d="M9 13h6M9 17h6" /></>,
    check: <path d="m5 12 4 4L19 6" />,
  };
  return <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}
