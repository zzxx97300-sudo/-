"use client";

import { useEffect, useMemo, useState } from "react";
import type { Certificate } from "@/types/content";
import { SafeImage } from "./safe-image";
import { Icon } from "./icons";

export function CertificateGallery({ certificates }: { certificates: Certificate[] }) {
  const [year, setYear] = useState("全部年份");
  const [type, setType] = useState("全部类别");
  const [level, setLevel] = useState("全部级别");
  const [selected, setSelected] = useState<Certificate | null>(null);
  const years = ["全部年份", ...Array.from(new Set(certificates.map((item) => String(item.year)))).sort().reverse()];
  const types = ["全部类别", ...Array.from(new Set(certificates.map((item) => item.type)))];
  const levels = ["全部级别", ...Array.from(new Set(certificates.map((item) => item.level)))];
  const filtered = useMemo(() => certificates.filter((item) => (year === "全部年份" || String(item.year) === year) && (type === "全部类别" || item.type === type) && (level === "全部级别" || item.level === level)), [certificates, year, type, level]);

  useEffect(() => {
    if (!selected) return;
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") setSelected(null); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [selected]);

  return <>
    <div className="filter-bar" aria-label="证书筛选">
      {[{ label: "年份", value: year, setter: setYear, options: years }, { label: "类别", value: type, setter: setType, options: types }, { label: "级别", value: level, setter: setLevel, options: levels }].map((filter) => <label key={filter.label} className="filter-select">{filter.label}<select value={filter.value} onChange={(event) => filter.setter(event.target.value)} aria-label={`按${filter.label}筛选证书`}>{filter.options.map((option) => <option key={option} value={option}>{option}</option>)}</select></label>)}
    </div>
    {filtered.length ? <div className="certificate-grid">{filtered.map((item, index) => <article className="card certificate-card" key={item.id}>
      {item.thumbnail && item.image ? <button className="certificate-preview" type="button" onClick={() => setSelected(item)} aria-label={`放大查看${item.title}`}><SafeImage src={item.thumbnail} alt={`${item.title}缩略图`} fill sizes="(max-width: 650px) 100vw, (max-width: 850px) 50vw, 33vw" priority={index === 0} /></button> : <div className="certificate-placeholder"><Icon name="file" size={27} /><strong>原件不公开</strong></div>}
      <div className="certificate-card-content"><span className="level-label">{item.level}</span><h3>{item.title}</h3><p>{item.year} · {item.type}</p><p>{item.description}</p></div>
    </article>)}</div> : <div className="callout">当前筛选条件下没有证书。请选择其他年份或类别。</div>}
    {selected?.image && <div className="modal-backdrop" role="presentation" onMouseDown={() => setSelected(null)}>
      <div className="modal-inner" role="dialog" aria-modal="true" aria-label={`${selected.title}证书大图`} onMouseDown={(event) => event.stopPropagation()}>
        <div className="modal-header"><strong>{selected.title}</strong><button className="icon-button" type="button" onClick={() => setSelected(null)} aria-label="关闭证书大图"><Icon name="close" /></button></div>
        <div className="modal-image"><SafeImage src={selected.image} alt={`${selected.title}脱敏证书`} fill sizes="(max-width: 850px) 100vw, 1100px" /></div>
      </div>
    </div>}
  </>;
}
