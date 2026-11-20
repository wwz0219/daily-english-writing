# Daily Draft

一個聊天優先的每日英文寫作練習頁面。網站提供每日題目、字數統計、瀏覽器本機草稿保存、練習日曆，以及一鍵複製批改請求，方便將作文貼回聊天取得細緻回饋。

## 使用方式

直接以瀏覽器開啟 `index.html`，或部署到 GitHub Pages。每天選一個題目寫作；完成後按 **Copy essay for chat**，再將內容貼回本聊天，取得修正版、錯誤說明與下一步練習建議。

草稿和練習日期只保存在目前瀏覽器的 `localStorage`。清除瀏覽器網站資料會移除這些資料；本頁不會將作文傳送到伺服器。每日晚上 8 點提醒目前由聊天提醒設定負責。

## GitHub Pages 部署

此專案包含 `.github/workflows/pages.yml`。將程式碼推送到 `main` 後，GitHub Actions 會發布網站。

在 repository 的 **Settings → Pages → Build and deployment** 選擇 **GitHub Actions**。部署完成後，網站網址會顯示在 Pages 設定和 workflow 執行結果中。
