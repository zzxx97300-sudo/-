"use client";

import { useEffect, useState } from "react";
import type { Award } from "@/types/content";
import { SafeImage } from "./safe-image";
import { Icon } from "./icons";

export function AwardGrid({ awards }: { awards: Award[] }) {
  const [selected, setSelected] = useState<Award | null>(null);
  useEffect(() => {
    if (!selected) return;
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") setSelected(null); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [selected]);
  return <>
    <div className="award-list">{awards.map((award, index) => <article className="card award-card" key={award.id}>
      {award.thumbnail && <button type="button" className="award-thumb" onClick={() => setSelected(award)} aria-label={`放大查看${award.title}证书`}>
        <SafeImage src={award.thumbnail} alt={`${award.title}证书缩略图`} fill sizes="132px" priority={index === 0} />
      </button>}
      <div><span className="level-label">{award.level}</span><h3>{award.title}</h3><p className="result">{award.result} · {award.date}</p><p>{award.role}{award.project ? ` · ${award.project}` : ""}</p></div>
    </article>)}</div>
    {selected?.certificateImage && <div className="modal-backdrop" role="presentation" onMouseDown={() => setSelected(null)}>
      <div className="modal-inner" role="dialog" aria-modal="true" aria-label={`${selected.title}证书`} onMouseDown={(event) => event.stopPropagation()}>
        <div className="modal-header"><strong>{selected.title} · {selected.result}</strong><button className="icon-button" type="button" onClick={() => setSelected(null)} aria-label="关闭证书大图"><Icon name="close" /></button></div>
        <div className="modal-image"><SafeImage src={selected.certificateImage} alt={`${selected.title}脱敏证书`} fill sizes="(max-width: 850px) 100vw, 1100px" /></div>
      </div>
    </div>}
  </>;
}
