import type { VisibilityField } from "@/types/content";

export const profile = {
  name: "张鑫",
  englishName: "Xin Zhang",
  headline: "自动化本科生 · 嵌入式开发与机器视觉方向",
  targetRole: "自动化技术岗位",
  introduction: "将视觉识别、单片机控制与工程联调结合，参与过视觉追踪云台和智能分拣机器人开发。",
  school: "贵州理工学院",
  major: "自动化",
  graduation: "2027 年预计毕业",
  portrait: "/images/profile/portrait.webp",
  contact: {
    email: { value: "ZhangXin001@outlook.com", public: true },
    phone: { value: "", public: false },
    wechat: { value: "", public: false },
    github: { value: "", public: false },
    location: { value: "贵州", public: true },
  } satisfies Record<string, VisibilityField>,
};

export const visibleContact = Object.entries(profile.contact).filter(([, field]) => field.public && field.value);
