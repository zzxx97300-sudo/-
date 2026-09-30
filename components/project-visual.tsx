import type { Project } from "@/types/content";

export function ProjectVisual({ visual }: { visual: Project["visual"] }) {
  const steps = visual === "gimbal"
    ? [{ title: "视觉输入", sub: "OpenCV" }, { title: "偏差计算", sub: "目标中心" }, { title: "串口控制", sub: "单片机" }, { title: "云台跟随", sub: "双自由度" }]
    : [{ title: "目标识别", sub: "颜色 / 形状" }, { title: "分类判断", sub: "控制逻辑" }, { title: "机械臂", sub: "抓取" }, { title: "搬运放置", sub: "系统联调" }];
  return <div className="project-visual" role="img" aria-label={steps.map((step) => step.title).join("到")}>
    <div className="flow-diagram">{steps.map((step, index) => <span key={step.title} style={{ display: "contents" }}>
      {index > 0 && <span className="flow-arrow" aria-hidden="true">→</span>}
      <span className="flow-node">{step.title}<small>{step.sub}</small></span>
    </span>)}</div>
  </div>;
}
