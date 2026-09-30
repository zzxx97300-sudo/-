import Link from "next/link";
import { Icon } from "./icons";

export function SectionHeading({ eyebrow, title, description, href, linkLabel }: { eyebrow: string; title: string; description?: string; href?: string; linkLabel?: string }) {
  return <div className="section-heading">
    <div><div className="eyebrow">{eyebrow}</div><h2>{title}</h2>{description && <p>{description}</p>}</div>
    {href && <Link href={href} className="text-link">{linkLabel ?? "查看全部"}<Icon name="arrow" size={16} /></Link>}
  </div>;
}
