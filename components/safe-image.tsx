"use client";

import Image from "next/image";
import { useState } from "react";

export function SafeImage({ src, alt, fill = false, width, height, sizes, priority = false, className = "" }: { src: string; alt: string; fill?: boolean; width?: number; height?: number; sizes?: string; priority?: boolean; className?: string }) {
  const [failed, setFailed] = useState(false);
  if (failed || !src) return <div className={`image-fallback ${className}`} role="img" aria-label={`${alt}，图片暂不可用`}><span>ZX.</span><small>IMAGE UNAVAILABLE</small></div>;
  return <Image src={src} alt={alt} fill={fill} width={fill ? undefined : width} height={fill ? undefined : height} sizes={sizes} priority={priority} className={className} onError={() => setFailed(true)} />;
}
