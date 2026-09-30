# 张鑫个人求职网站

面向招聘人员的中文个人展示网站。页面包含首页、关于我、教育、项目、竞赛与荣誉、科研与论文、实习与实践、技能、证书、简历和联系方式。网站基于 Next.js、TypeScript 和 Tailwind CSS，内容与页面分离，适合部署到 Vercel。

> **隐私原则**：原始简历、成绩单、学籍证明、就业推荐表和证书 PDF 不进入 Git，也不进入 `public`。公开版简历和证书 WebP 已按现有材料制作与脱敏。公开信息请先在 `data/` 中核对，再部署。

## 1. 安装与本地运行

准备 Node.js 20.9 或更新版本。打开终端，进入本目录后执行：

```bash
npm install
npm run dev
```

浏览器打开 `http://localhost:3000`。停止服务按 `Ctrl+C`。

正式构建与检查：

```bash
npm run lint
npm run typecheck
npm run build
npm run start
```

`npm run start` 运行生产构建，仍然只是在本机预览。公网部署见第 5 节。

## 2. 目录结构

| 目录 | 用途 |
| --- | --- |
| `app/` | 页面、SEO、404 和错误页面 |
| `components/` | 导航、项目卡片、证书弹窗等复用组件 |
| `data/` | 个人资料、项目、奖项、论文、技能等事实数据 |
| `types/` | 数据类型 |
| `lib/` | 站点 URL 与页面元数据 |
| `public/images/` | 已处理的公开图片 |
| `public/resume/` | 可下载的公开版简历 PDF |
| `scripts/` | 原始资料扫描和公开图片、简历生成脚本 |
| `.private-audit/` | 本机临时核对结果，Git 会忽略 |

`data/material-inventory.json` 记录已阅读材料的类别和公开策略；`data/review-needed.json` 记录待确认的冲突和缺口。原始材料仍保留在本目录原位置，但被 `.gitignore` 排除。

## 3. 日常更新资料

- **姓名、介绍、求职方向、邮箱等**：修改 `data/profile.ts`。`contact` 的每一项都有 `value` 和 `public`。只有 `public: true` 且 `value` 非空时才会显示。手机号和微信当前没有写入公开代码。若未来把信息改为不公开，应同时清空值；已经推送到公开 Git 历史的信息无法靠 `public: false` 删除。
- **教育**：修改 `data/education.ts`。排名或绩点请同时更新所依据材料的日期。
- **项目**：在 `data/projects.ts` 增加一个对象。`slug` 用英文小写和连字符，如 `new-robot-project`，详情页会自动生成 `/projects/new-robot-project`。只填写有证据的职责和结果，不要补造性能数字。
- **奖项**：在 `data/awards.ts` 增加记录，注明级别、时间、角色与证书。模拟赛须标为“模拟赛”。随后在 `data/certificates.ts` 检查证书展示。
- **论文与专利**：修改 `data/research.ts`。论文公开稿取得授权后才填写 `pdf` 或 DOI；“录用”“发表”“受理”“授权”要严格区分。
- **经历和技能**：分别修改 `data/experience.ts` 与 `data/skills.ts`。导航在对应数组为空时会自动隐藏该栏目。
- **照片**：替换 `public/images/profile/portrait.webp`。建议裁成竖向肖像，宽至少 300px，文件尽量小。原始就业推荐表不要上传。
- **证书图片**：只把已去除编号、二维码和通信信息的压缩 WebP 放进 `public/images/certificates/`，缩略图放进 `public/images/awards/`。更新 `data/awards.ts` 路径。网页使用 Next/Image 延迟加载。
- **中文简历**：替换 `public/resume/zhangxin-resume-zh.pdf`。检查 PDF 文本层与页面图像中都没有私人手机号、学号、详细住址等内容。本站的公开版可在本机运行 `scripts/build_public_resume.py` 重建；该脚本需要 Python、ReportLab 和 Windows 字体。以后可另加英文 PDF 并在 `/resume` 页面增加入口。

修改后先执行 `npm run build`，本地查看，再部署。

## 4. 当前公开与待确认内容

网站展示 2 项实验室项目、4 项证书核实的竞赛奖项、1 篇已录用会议论文和 4 项已受理专利申请。所有统计由数据数组自动计算。证书中的模拟赛已单列；挑战杯省二等奖及正式电子设计竞赛奖项须提供进一步证明，见 `data/review-needed.json`。论文 PDF、DOI、项目视频和公开代码仓库目前没有材料，因此没有放置空链接。

## 5. GitHub 与 Vercel 公网部署

本目录已经初始化 Git 并可作为独立仓库。先在 GitHub 新建一个**空仓库**，不要勾选自动创建 README 或 `.gitignore`。随后在本目录执行（把地址替换成你新建仓库的地址）：

```bash
git remote add origin https://github.com/你的用户名/你的仓库名.git
git push -u origin main
```

若提示登录，请在浏览器中完成 GitHub 授权。推送前可运行 `git status --short` 和 `git ls-files`，确认原始个人材料没有被跟踪。

### 在 Vercel 网站部署（推荐）

1. 登录 [Vercel](https://vercel.com/)；在 Dashboard 选择 **Add New → Project**。
2. 连接 GitHub，导入刚才的仓库。Framework Preset 选择 **Next.js**，其余保留默认。
3. 点击 **Deploy**。成功后会得到 `https://项目名.vercel.app` 公网地址。
4. 在 Vercel 的 Project Settings → Environment Variables 可设置 `NEXT_PUBLIC_SITE_URL` 为这个正式地址，然后重新部署，以使 canonical、Open Graph 与站点地图指向稳定网址。未设置时，站点会自动使用 Vercel 提供的生产域名。
5. 以后只要修改数据、提交并推送 `main`，Vercel 会自动构建更新。

也可在完成 [Vercel CLI 登录](https://vercel.com/docs/cli) 后于本目录执行：

```bash
npx vercel --prod
```

不要把 Vercel Token、GitHub Token 或 `.env` 文件提交到 Git。`.gitignore` 已排除 `.env*`，但保留 `.env.example` 作为示例。

### 网站二维码

取得最终公网地址后，生成指向该 URL 的二维码，保存为 `public/website-qrcode.png`，再重新部署。二维码必须指向稳定的生产域名；部署前不要使用 `localhost` 或猜测的域名生成。若以后更换域名，需重生二维码并更新纸质材料。

## 6. 自定义域名

可以从正规域名注册商购买自己的域名，完成注册商要求的实名、付款与必要备案流程。买好后：

1. 在 Vercel 项目 **Settings → Domains** 添加根域名和 `www` 子域名。
2. 按 Vercel 页面给出的 DNS 记录，在注册商的 DNS 控制台添加。常见配置是 `www` 使用 CNAME 指向 Vercel 给出的目标；根域名使用 Vercel 给出的 A/ALIAS 记录。**以 Vercel 当时显示的记录为准**，避免照抄过期 IP。
3. 等待 Vercel 显示 **Valid Configuration** 和 HTTPS 证书生效。把 `NEXT_PUBLIC_SITE_URL` 更新为最终主域名并重新部署，检查 `/robots.txt` 与 `/sitemap.xml`。
4. 如果纸质简历上使用了二维码，域名变化后重新生成二维码。

详细步骤参见 [Vercel 自定义域名官方文档](https://vercel.com/docs/domains/set-up-custom-domain)。

## 7. 维护时的检查

- 首页和每个栏目都能打开；项目卡片可进入详情；移动端菜单可用。
- 证书筛选和图片弹窗可用，图片没有失效或变形。
- `/resume` 能预览，下载按钮返回 PDF；若替换 PDF，重新核对脱敏。
- 浅色、深色模式及 390px 手机宽度没有横向滚动。
- `npm run lint`、`npm run typecheck`、`npm run build` 通过。
- 部署后打开公网 URL 复核，因为本地构建成功不等于公网部署成功。

## 8. 当前资料的边界

没有证据的照片、视频、GitHub 链接、项目性能数值、论文摘要与 DOI 均未加入。证书原件和学籍、成绩材料只供本地核对；网页只发布处理后的信息。没有后端表单或数据库，网站内容通过 Git 更新。
