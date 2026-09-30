import type { Certificate } from "@/types/content";
import { awards } from "./awards";

export const certificates: Certificate[] = [
  ...awards.map((award) => ({
    id: award.id,
    title: `${award.title} · ${award.result}`,
    type: "竞赛" as const,
    year: Number(award.date.slice(0, 4)),
    level: award.level,
    image: award.certificateImage,
    thumbnail: award.thumbnail,
    description: award.note ?? "证书图片已隐藏编号，原件未上传。",
  })),
  {
    id: "cisc-acceptance",
    title: "CISC 2026 会议论文录用函",
    type: "科研",
    year: 2026,
    level: "会议录用",
    description: "录用函含内部稿件编号和完整作者信息，仅展示核实后的论文信息，不公开原件。",
  },
  {
    id: "patent-acceptance",
    title: "专利申请受理通知书（4 项）",
    type: "科研",
    year: 2026,
    level: "申请已受理",
    description: "受理通知书含申请号、代理联系人与通信信息，仅公开专利名称、申请类型、本人顺位和受理状态。",
  },
];
