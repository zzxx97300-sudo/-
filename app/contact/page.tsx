import { Icon } from "@/components/icons";
import { PageIntro } from "@/components/page-intro";
import { profile } from "@/data/profile";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata("联系方式", "通过公开邮箱联系张鑫，沟通自动化技术岗位机会。", "/contact");

export default function ContactPage() {
  const { email, github, location, phone, wechat } = profile.contact;
  return <div className="site-container"><PageIntro eyebrow="CONTACT" title="联系我" description="欢迎就自动化、嵌入式开发与机器视觉相关岗位和项目进行沟通。" /><section className="content-section"><div className="contact-grid">
    {email.public && email.value && <article className="card contact-card"><Icon name="mail" size={25} /><h3>电子邮箱</h3><p>适合发送岗位信息与进一步沟通。</p><a href={`mailto:${email.value}`}>{email.value} ↗</a></article>}
    {github.public && github.value && <article className="card contact-card"><Icon name="external" size={25} /><h3>GitHub</h3><p>代码与公开项目。</p><a href={github.value} target="_blank" rel="noopener noreferrer">查看 GitHub ↗</a></article>}
    {location.public && location.value && <article className="card contact-card"><Icon name="check" size={25} /><h3>所在地区</h3><p>{location.value} · 具体工作地点可邮件沟通。</p></article>}
    {phone.public && phone.value && <article className="card contact-card"><h3>电话</h3><a href={`tel:${phone.value}`}>{phone.value}</a></article>}
    {wechat.public && wechat.value && <article className="card contact-card"><h3>微信</h3><p>{wechat.value}</p></article>}
  </div><p className="callout" style={{ marginTop: 20 }}>本站没有联系表单。手机号和微信默认不公开，联系方式可在 data/profile.ts 中调整。</p></section></div>;
}
