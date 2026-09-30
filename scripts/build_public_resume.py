"""Build a public, one-page PDF resume from verified facts only."""

from pathlib import Path
import re

from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "public" / "resume" / "zhangxin-resume-zh.pdf"
OUTPUT.parent.mkdir(parents=True, exist_ok=True)

pdfmetrics.registerFont(TTFont("YaHei", "C:/Windows/Fonts/msyh.ttc", subfontIndex=0))
pdfmetrics.registerFont(TTFont("YaHei-Bold", "C:/Windows/Fonts/msyhbd.ttc", subfontIndex=0))

PAGE_W, PAGE_H = A4
INK = colors.HexColor("#1D2421")
MUTED = colors.HexColor("#56665D")
ACCENT = colors.HexColor("#416E62")
LINE = colors.HexColor("#DCE3DD")


def tokens(value: str) -> list[str]:
    return re.findall(r"[A-Za-z0-9./+()\-]+|\s+|.", value)


def wrap(value: str, font: str, size: float, width: float) -> list[str]:
    result: list[str] = []
    line = ""
    for token in tokens(value):
        if token.isspace() and not line:
            continue
        candidate = line + token
        if pdfmetrics.stringWidth(candidate, font, size) <= width:
            line = candidate
        else:
            if token in "、，。；：）" and line:
                result.append((line + token).rstrip())
                line = ""
                continue
            if line:
                result.append(line.rstrip())
            line = token.lstrip()
    if line:
        result.append(line.rstrip())
    return result


pdf = canvas.Canvas(str(OUTPUT), pagesize=A4, pageCompression=1)
pdf.setTitle("张鑫 中文求职简历 公开版")
pdf.setAuthor("张鑫")


def text(x: float, y: float, value: str, size=9.5, bold=False, color=INK):
    pdf.setFillColor(color)
    pdf.setFont("YaHei-Bold" if bold else "YaHei", size)
    pdf.drawString(x, y, value)


def block(x: float, y: float, value: str, width: float, size=9.2, leading=14.4, color=MUTED, bold=False):
    font = "YaHei-Bold" if bold else "YaHei"
    for line in wrap(value, font, size, width):
        text(x, y, line, size, bold, color)
        y -= leading
    return y


def section(x: float, y: float, name: str, width: float):
    text(x, y, name, 11, True, INK)
    pdf.setStrokeColor(ACCENT)
    pdf.setLineWidth(1.5)
    pdf.line(x, y - 8, x + width, y - 8)
    return y - 27


def entry(x: float, y: float, title: str, period: str, width: float, lines: list[str]):
    text(x, y, title, 9.5, True, INK)
    period_width = pdfmetrics.stringWidth(period, "YaHei", 8)
    text(x + width - period_width, y, period, 8, False, MUTED)
    y -= 19
    for line in lines:
        y = block(x + 9, y, "• " + line, width - 9, size=8.7, leading=13.5)
        y -= 4
    return y - 5


# Header
pdf.setFillColor(colors.HexColor("#F4F7F4"))
pdf.rect(0, PAGE_H - 116, PAGE_W, 116, fill=1, stroke=0)
pdf.setFillColor(ACCENT)
pdf.rect(0, PAGE_H - 116, 8, 116, fill=1, stroke=0)
text(42, PAGE_H - 53, "张鑫", 28, True, INK)
text(134, PAGE_H - 52, "XIN ZHANG", 9, True, ACCENT)
text(43, PAGE_H - 77, "自动化本科生  |  嵌入式开发 · 机器视觉", 10.5, False, INK)
text(43, PAGE_H - 98, "求职方向：自动化技术岗位", 9.5, False, MUTED)
text(371, PAGE_H - 64, "ZhangXin001@outlook.com", 9.2, False, ACCENT)
text(445, PAGE_H - 90, "2027 届", 8.5, False, MUTED)

LEFT_X, LEFT_W = 42, 183
RIGHT_X, RIGHT_W = 247, 306
pdf.setStrokeColor(LINE)
pdf.setLineWidth(.7)
pdf.line(236, 52, 236, PAGE_H - 134)

left_y = PAGE_H - 145
left_y = section(LEFT_X, left_y, "教育背景", LEFT_W)
text(LEFT_X, left_y, "贵州理工学院", 10.5, True)
left_y -= 20
left_y = block(LEFT_X, left_y, "自动化 · 本科 · 普通全日制", LEFT_W)
left_y = block(LEFT_X, left_y - 4, "2023.09—2027.07（预计）", LEFT_W)
left_y = block(LEFT_X, left_y - 4, "绩点 3.49  |  专业学分绩点排名第 5 / 81", LEFT_W, size=8.7)
left_y = block(LEFT_X, left_y - 2, "（2026 年 9 月排名材料）", LEFT_W, size=8.2)

left_y = section(LEFT_X, left_y - 22, "专业技能", LEFT_W)
skill_groups = [
    ("嵌入式与控制", "C 语言、单片机程序设计、串口通信、舵机控制、传感器数据采集、PLC 编程"),
    ("机器视觉", "Python、OpenCV 图像处理、YOLO 目标检测、颜色与形状识别"),
    ("电气与工具", "电路识图、基础电气调试、Keil、Proteus、VS Code；持低压电工作业证"),
]
for heading, body in skill_groups:
    text(LEFT_X, left_y, heading, 9.2, True, INK)
    left_y = block(LEFT_X, left_y - 17, body, LEFT_W, size=8.7, leading=13.3)
    left_y -= 13

left_y = section(LEFT_X, left_y - 2, "主修课程", LEFT_W)
left_y = block(LEFT_X, left_y, "传感器与检测技术（96）、PLC 技术（94）、自动控制原理（90）、计算机控制技术（90）、单片机原理及应用（89）、过程控制（89）", LEFT_W, size=8.7, leading=13.4)

right_y = PAGE_H - 145
right_y = section(RIGHT_X, right_y, "项目经历", RIGHT_W)
right_y = entry(RIGHT_X, right_y, "视觉追踪云台", "2024.05—至今", RIGHT_W, [
    "利用 OpenCV 提取目标中心坐标并计算位置偏差，经串口向单片机发送控制指令。",
    "负责图像处理、串口通信与双自由度舵机控制程序调试和联调。",
])
right_y = entry(RIGHT_X, right_y, "智能分拣机器人", "2024.05—至今", RIGHT_W, [
    "集成颜色与形状识别模块，设计机械臂抓取、分类与搬运流程。",
    "参与传感器数据采集、机械臂动作逻辑编写和系统联调。",
])

right_y = section(RIGHT_X, right_y - 2, "实习与校园经历", RIGHT_W)
right_y = entry(RIGHT_X, right_y, "南方电网道真分公司 · 实习", "2026.06—08", RIGHT_W, [
    "参加电力安全、电气设备与电力试验培训；在指导下参与接线检查和常用试验仪器操作，整理记录与技术资料。",
])
right_y = entry(RIGHT_X, right_y, "校党委组织部 · 学生助理", "2025.03—2026.03", RIGHT_W, [
    "完成党员档案核验、数字化录入、台账与归档管理。",
])
right_y = entry(RIGHT_X, right_y, "班级学习委员", "2024.03—至今", RIGHT_W, [
    "对接任课教师与同学，负责学情反馈、考试通知并组织学习帮扶。",
])

right_y = section(RIGHT_X, right_y - 2, "科研成果", RIGHT_W)
right_y = block(RIGHT_X, right_y, "CISC 2026 会议论文已录用（第 4 作者）：A Three-Level Semantic Framework for Executable Task Planning of ROS2 Mobile Robots in Structured Indoor Environments", RIGHT_W, size=8.5, leading=13)
right_y = block(RIGHT_X, right_y - 8, "专利申请已受理 4 项：电力巡检无人机边缘数据管理装置（第 1 发明人）；嵌入式与 YOLO 改进算法无人机目标识别系统（第 3 发明人）；另有 2 项受理申请。", RIGHT_W, size=8.5, leading=13)

right_y = section(RIGHT_X, right_y - 17, "竞赛与荣誉", RIGHT_W)
for line in [
    "2025.12  毕昇杯全国总决赛三等奖",
    "2025.11  毕昇杯重庆赛区一等奖",
    "2026.05  挑战杯校内选拔赛一等奖",
    "2026.08  贵州赛区欣源杯模拟赛本科组一等奖",
]:
    right_y = block(RIGHT_X, right_y, line, RIGHT_W, size=8.7, leading=13.5)
    right_y -= 3

if min(left_y, right_y) < 48:
    raise RuntimeError(f"Resume overflow: left={left_y:.1f}, right={right_y:.1f}")

pdf.setStrokeColor(LINE)
pdf.line(42, 38, PAGE_W - 42, 38)
text(42, 23, "公开版 · 2026 年 9 月  |  完整手机号及证明原件未公开", 7.8, False, MUTED)
pdf.save()
print(f"Created {OUTPUT} ({OUTPUT.stat().st_size} bytes); content ends at {min(left_y, right_y):.1f} pt")
