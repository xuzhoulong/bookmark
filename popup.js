document.addEventListener("DOMContentLoaded", () => {
  // 加载保存的设置
  chrome.storage.sync.get(
    ["githubToken", "githubUsername", "repositoryName"],
    (result) => {
      document.getElementById("githubToken").value = result.githubToken || "";
      document.getElementById("githubUsername").value =
        result.githubUsername || "";
      document.getElementById("repositoryName").value =
        result.repositoryName || "";
    }
  );

  // 保存设置
  document.getElementById("saveSettings").addEventListener("click", () => {
    const githubToken = document.getElementById("githubToken").value;
    const githubUsername = document.getElementById("githubUsername").value;
    const repositoryName = document.getElementById("repositoryName").value;

    chrome.storage.sync.set(
      {
        githubToken,
        githubUsername,
        repositoryName,
      },
      () => {
        showStatus("设置已保存", "success");
      }
    );
  });

  // 备份书签
  document
    .getElementById("backupBookmarks")
    .addEventListener("click", async () => {
      try {
        const settings = await chrome.storage.sync.get([
          "githubToken",
          "githubUsername",
          "repositoryName",
        ]);
        if (
          !settings.githubToken ||
          !settings.githubUsername ||
          !settings.repositoryName
        ) {
          throw new Error("请先完成设置");
        }

        const bookmarks = await chrome.bookmarks.getTree();
        const bookmarksJson = JSON.stringify(bookmarks, null, 2);
        const timestamp = new Date().toISOString().replace(/[:.]/g, "-");

        // 创建或更新GitHub仓库中的文件
        const response = await fetch(
          `https://api.github.com/repos/${settings.githubUsername}/${settings.repositoryName}/contents/bookmarks.json`,
          {
            method: "PUT",
            headers: {
              Authorization: `token ${settings.githubToken}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              message: `更新书签 ${timestamp}`,
              content: btoa(unescape(encodeURIComponent(bookmarksJson))),
              sha: await getFileSha(settings),
            }),
          }
        );

        if (!response.ok) {
          throw new Error("备份失败，请检查设置是否正确");
        }

        showStatus("书签已成功备份到GitHub", "success");
      } catch (error) {
        showStatus(error.message, "error");
      }
    });

  // 打开GitHub Pages
  document
    .getElementById("openGithubPages")
    .addEventListener("click", async () => {
      const settings = await chrome.storage.sync.get([
        "githubUsername",
        "repositoryName",
      ]);
      if (settings.githubUsername && settings.repositoryName) {
        window.open(
          `https://${settings.githubUsername}.github.io/${settings.repositoryName}`
        );
      } else {
        showStatus("请先完成设置", "error");
      }
    });
});

// 获取文件SHA值（用于更新文件）
async function getFileSha(settings) {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${settings.githubUsername}/${settings.repositoryName}/contents/bookmarks.json`,
      {
        headers: {
          Authorization: `token ${settings.githubToken}`,
        },
      }
    );
    if (response.ok) {
      const data = await response.json();
      return data.sha;
    }
    return null;
  } catch (error) {
    return null;
  }
}

// 显示状态信息
function showStatus(message, type) {
  const status = document.getElementById("status");
  status.textContent = message;
  status.className = `status ${type}`;
  setTimeout(() => {
    status.textContent = "";
    status.className = "status";
  }, 3000);
}
