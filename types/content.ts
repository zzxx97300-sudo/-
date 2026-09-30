export type VisibilityField = { value: string; public: boolean };

export type Project = {
  slug: string;
  title: string;
  period: string;
  role: string;
  summary: string;
  tags: string[];
  background: string;
  problem: string;
  responsibilities: string[];
  approach: string[];
  hardware?: string[];
  software?: string[];
  process?: string[];
  result: string;
  relatedAward?: string;
  visual: "gimbal" | "sorting";
};

export type Award = {
  id: string;
  title: string;
  result: string;
  date: string;
  level: "国家级" | "省级/赛区" | "校级" | "模拟赛";
  role: string;
  organizer?: string;
  project?: string;
  thumbnail?: string;
  certificateImage?: string;
  note?: string;
};

export type Certificate = {
  id: string;
  title: string;
  type: "竞赛" | "科研" | "资格";
  year: number;
  level: string;
  image?: string;
  thumbnail?: string;
  description: string;
};
