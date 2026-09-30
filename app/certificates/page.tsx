import { CertificateGallery } from "@/components/certificate-gallery";
import { PageIntro } from "@/components/page-intro";
import { certificates } from "@/data/certificates";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata("证书材料", "张鑫的竞赛证书脱敏预览与科研证明摘要。", "/certificates");

export default function CertificatesPage() {
  return <div className="site-container"><PageIntro eyebrow="CERTIFICATES" title="证书材料" description="已公开的竞赛证书以压缩缩略图呈现，点击可查看脱敏大图；涉及编号和通信信息的材料只展示摘要。" /><section className="content-section"><CertificateGallery certificates={certificates} /></section></div>;
}
