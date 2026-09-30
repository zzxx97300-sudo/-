import { awards } from "./awards";
import { certificates } from "./certificates";
import { education } from "./education";
import { experience } from "./experience";
import { projects } from "./projects";
import { papers, patents } from "./research";
import { skills } from "./skills";

const pages = [
  { href: "/", label: "首页", show: true, primary: true },
  { href: "/about", label: "关于我", show: true, primary: false },
  { href: "/education", label: "教育", show: education.length > 0, primary: false },
  { href: "/projects", label: "项目", show: projects.length > 0, primary: true },
  { href: "/awards", label: "竞赛与荣誉", show: awards.length > 0, primary: true },
  { href: "/research", label: "科研与论文", show: papers.length + patents.length > 0, primary: true },
  { href: "/experience", label: "实习与实践", show: experience.length > 0, primary: false },
  { href: "/skills", label: "技能", show: skills.length > 0, primary: false },
  { href: "/certificates", label: "证书", show: certificates.length > 0, primary: false },
  { href: "/resume", label: "简历", show: true, primary: true },
  { href: "/contact", label: "联系", show: true, primary: true },
];

export const navigation = pages.filter((page) => page.show);
export const primaryNavigation = navigation.filter((page) => page.primary);
export const secondaryNavigation = navigation.filter((page) => !page.primary);
