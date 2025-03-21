# Chrome 书签管理器

这是一个 Chrome 浏览器插件，可以将您的书签备份到 GitHub 并通过 GitHub Pages 展示。

## 功能特点

- 将 Chrome 书签备份到 GitHub 仓库
- 通过 GitHub Pages 在线查看书签
- 安全的 GitHub Token 认证
- 简单易用的界面

## 安装说明

1. 克隆或下载此仓库到本地
2. 打开 Chrome 浏览器，进入扩展程序页面（chrome://extensions/）
3. 开启"开发者模式"
4. 点击"加载已解压的扩展程序"，选择本仓库目录

## 使用方法

1. 创建 GitHub 个人访问令牌（Token）：

   - 访问 GitHub Settings > Developer settings > Personal access tokens
   - 生成新的 Token，确保勾选 `repo` 权限
   - 复制生成的 Token

2. 配置插件：

   - 点击 Chrome 工具栏中的插件图标
   - 输入 GitHub Token
   - 输入 GitHub 用户名
   - 输入要使用的仓库名称（如果仓库不存在，需要先创建）
   - 点击"保存设置"

3. 备份书签：

   - 点击"备份书签"按钮即可将当前的书签备份到 GitHub

4. 查看在线书签：
   - 点击"打开网页版"按钮
   - 或直接访问 `https://[你的GitHub用户名].github.io/[仓库名]`

## GitHub Pages 设置

1. 在 GitHub 仓库中进入 Settings > Pages
2. 在 Source 选项中选择 main 分支
3. 保存设置后等待几分钟，GitHub Pages 将自动部署

## 注意事项

- 请妥善保管 GitHub Token，不要分享给他人
- 建议定期备份书签
- 如果遇到问题，请检查 GitHub Token 权限是否正确

## 技术支持

如有问题或建议，请提交 Issue。
