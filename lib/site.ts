import type { Metadata } from "next";

function normalizedUrl(value: string): string {
  return value.replace(/\/$/, "");
}

export const siteUrl = normalizedUrl(
  process.env.NEXT_PUBLIC_SITE_URL && !process.env.NEXT_PUBLIC_SITE_URL.includes("your-project")
    ? process.env.NEXT_PUBLIC_SITE_URL
    : process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : "http://localhost:3000",
);

export function pageMetadata(title: string, description: string, path = ""): Metadata {
  const fullTitle = `${title} | 张鑫`;
  return {
    title: fullTitle,
    description,
    alternates: { canonical: `${siteUrl}${path}` },
    openGraph: {
      type: "website",
      locale: "zh_CN",
      url: `${siteUrl}${path}`,
      siteName: "张鑫 Portfolio",
      title: fullTitle,
      description,
      images: [{ url: `${siteUrl}/og-image.png`, width: 1200, height: 630, alt: "张鑫个人求职网站" }],
    },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: [`${siteUrl}/og-image.png`] },
  };
}
