// 监听安装事件
chrome.runtime.onInstalled.addListener(() => {
  console.log("书签管理器已安装");
});

// 可以在这里添加其他后台任务，比如定期自动备份等功能
