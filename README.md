# 启明学院官网封面

一个专业、现代且克制的教育机构落地页，包含响应式导航、语言切换、故事弹窗、锚点导航和预约联系入口。

## 教学工作台

从官网首页点击 **教学工作台** 即可进入 `portal.html`。工作台为班主任和授课教师提供一套连贯的前端演示流程：

- 工作概览：今日课程、教学课时、待批任务和班级达成率。
- 预约上课：选择班级、课程、日期、时段和教室，并管理已有预约。
- 我的课表：按周切换查看工作日课程安排。
- 课程进度：追踪班级课时完成率和进度风险。
- 教材资源库：搜索、分类筛选和下载课件、教案与练习。
- 课后复习：查看提交情况并更新批阅状态。
- 身份切换：在授课教师与班主任视角之间切换。

当前数据保存在浏览器页面状态中，适合作为产品原型演示；刷新页面后会恢复示例数据。正式投入使用前，需要接入学校的登录认证、数据库、文件存储和消息服务。

## 本地预览

```bash
npm start
```

打开 `http://localhost:4173` 即可预览。

> 浏览器出现 `ERR_CONNECTION_REFUSED` 表示预览服务器尚未启动，或启动服务器的终端已经关闭。请在项目目录中运行上面的命令，并在预览期间保持该终端运行。

服务器默认监听 `0.0.0.0:4173`，因此也兼容容器、云端工作区和端口转发环境。如需使用其他端口：

```bash
PORT=3000 npm start
```

## 发布到 GitHub Pages

本项目已经包含自动发布工作流 `.github/workflows/deploy-pages.yml`。第一次发布时：

1. 在 GitHub 创建一个空仓库，不要额外勾选 README、`.gitignore` 或 License。
2. 在本地项目目录连接并推送仓库（把地址替换为你自己的仓库地址）：

   ```bash
   git remote add origin https://github.com/你的用户名/你的仓库名.git
   git branch -M main
   git push -u origin main
   ```

3. 推送后，工作流会尝试自动启用 GitHub Pages。打开仓库的 **Actions** 页面，查看 `Deploy static site to GitHub Pages`。
4. 如果首次运行仍提示 Pages 未启用，请打开 **Settings → Pages**，在 **Build and deployment → Source** 中选择 **GitHub Actions**，然后回到失败的任务点击 **Re-run all jobs**。
5. 打开仓库的 **Actions** 页面，等待 `Deploy static site to GitHub Pages` 显示绿色对勾。
6. 回到 **Settings → Pages**，打开 GitHub 显示的网站地址。项目仓库通常对应：

   ```text
   https://你的用户名.github.io/你的仓库名/
   ```

之后每次向 `main` 或 `master` 分支推送代码，网站都会自动重新发布。也可以在 **Actions → Deploy static site to GitHub Pages → Run workflow** 中手动发布。

> `localhost:4173` 仅用于你自己的电脑或开发容器。它不是公开网址；在 GitHub 上查看网站需要先完成以上 Pages 发布步骤。

### 部署成功后打开网站

对于仓库 `W4LT3RM/testing-app`，公开网站地址应为：

```text
https://w4lt3rm.github.io/testing-app/
```

也可以通过 GitHub 界面获取准确地址：

1. 打开仓库的 **Settings → Pages**，点击顶部 `Your site is live at ...` 后面的 **Visit site**。
2. 或打开 **Actions → Deploy static site to GitHub Pages**，进入成功的运行记录，点击部署任务中的网站 URL。

如果部署刚刚成功但网址暂时显示 404，请等待一两分钟后强制刷新。务必访问带仓库名的完整路径 `/testing-app/`，而不是只访问 `https://w4lt3rm.github.io/`。

### 部署检查失败

如果提交旁边出现红色叉号并显示 `Deploy static site to GitHub Pages / deploy` 失败：

1. 点击失败任务右侧的 **Details**，展开带红色叉号的步骤。首次部署最常见的原因是 Pages 尚未启用。
2. 前往 **Settings → Pages**，确认 **Source** 为 **GitHub Actions**。
3. 前往 **Settings → Actions → General → Workflow permissions**，确认仓库允许 GitHub Actions 运行；组织仓库还可能受到组织策略限制。
4. 返回 **Actions** 中失败的运行，点击右上角 **Re-run jobs → Re-run all jobs**。

工作流已请求 `pages: write` 和 `id-token: write` 权限，并会尝试自动启用 Pages。若仍然失败，请复制 **Details** 中具体报错的步骤和红色错误文字；仅凭提交页面的红叉无法区分 Pages 设置、Actions 权限或账户策略问题。
