# 启明学院官网封面

一个专业、现代且克制的教育机构落地页，包含响应式导航、语言切换、故事弹窗、锚点导航和预约联系入口。

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

3. 打开 GitHub 仓库的 **Settings → Pages**。
4. 在 **Build and deployment → Source** 中选择 **GitHub Actions**。
5. 打开仓库的 **Actions** 页面，等待 `Deploy static site to GitHub Pages` 显示绿色对勾。
6. 回到 **Settings → Pages**，打开 GitHub 显示的网站地址。项目仓库通常对应：

   ```text
   https://你的用户名.github.io/你的仓库名/
   ```

之后每次向 `main` 或 `master` 分支推送代码，网站都会自动重新发布。也可以在 **Actions → Deploy static site to GitHub Pages → Run workflow** 中手动发布。

> `localhost:4173` 仅用于你自己的电脑或开发容器。它不是公开网址；在 GitHub 上查看网站需要先完成以上 Pages 发布步骤。
