# Poyu 的常用開發工具

專為開發者打造的實用工具集，使用 React、TypeScript 和 Tailwind CSS 構建。

🔗 **線上展示：** [https://chenpoyu.github.io/tools/](https://chenpoyu.github.io/tools/)

## 🛠️ 功能特色

### 轉換工具（Converters）
- ✅ **Base64 編碼/解碼** - 支援 UTF-8 中文字元
- **URL 編碼/解碼** - Component 和 Full URL 兩種模式
- **Unicode 轉換器** - Unicode 與文字相互轉換
- **JWT 解碼器** - 解碼和檢查 JWT token
- ✅ **Unix 時間戳記** - 時間戳記與日期時間雙向轉換
- **Cron 表達式** - 產生和解釋 cron 表達式
- **字串大小寫轉換** - camelCase、snake_case、kebab-case 等格式互轉

### 格式化工具（Formatters）
- ✅ **JSON 格式化** - 美化、壓縮和驗證 JSON
- **SQL 格式化** - 格式化 SQL 查詢語句
- **XML 美化** - 格式化和美化 XML 文件
- **HTML 格式化工具** - 格式化和壓縮 HTML 程式碼
- **JavaScript 格式化工具** - 格式化和壓縮 JavaScript 程式碼
- **Mermaid 預覽器** - 即時渲染 Mermaid 圖表語法

### 安全工具（Security）
- **密碼產生器** - 產生安全的隨機密碼
- **雜湊計算器** - 計算 MD5、SHA256 雜湊值
- **CSP 產生器** - 產生內容安全政策標頭
- **台灣身分證字號產生器** - 產生與驗證台灣身分證字號與外國人居留證號（僅供測試）
- **GUID 產生器** - 產生全域唯一識別碼，支援多種格式（32/36 字元、大小寫）

### 前端工具（Frontend）
- **Flexbox 視覺化** - 視覺化 CSS Flexbox 佈局
- **Grid 視覺化** - 視覺化 CSS Grid 佈局
- **色彩對比檢查** - 檢查無障礙色彩對比度
- **Markdown 預覽** - 即時預覽 Markdown
- **HTML 編輯器** - 即時編輯和預覽 HTML 模板

### 網路工具（Network）
- **HTTP 狀態碼** - HTTP 狀態碼參考
- **IP CIDR 計算器** - 從 CIDR 符號計算 IP 範圍
- **User-Agent 解析** - 解析和分析 User-Agent 字串

## 🚀 開始使用

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/chenpoyu/tools.git
cd tools

# Install dependencies
npm install

# Start development server
npm run dev
```

應用程式將在 `http://localhost:5173/tools/` 上運行

### 建構正式版本

```bash
npm run build
```

正式版本的檔案將會放在 `dist/` 目錄中。

## 📦 技術堆疊

- **Framework:** React 19 + TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Routing:** React Router (HashRouter for GitHub Pages)

## 🎨 專案結構

```
/src
  /assets        # Images, Global CSS
  /components    # Reusable UI components (Layout, Sidebar, Navbar)
  /hooks         # Shared logic (e.g., useLocalStorage, useCopy)
  /pages         # Individual tool pages
    /converters  # Base64, URL, Timestamp...
    /formatters  # JSON, SQL, XML...
    /frontend    # Flexbox, Grid, Colors...
    /security    # Password, Hash, CSP...
    /network     # HTTP, CIDR, User-Agent...
  /utils         # Pure logic functions
  App.tsx        # Routing logic
  main.tsx       # Entry point
```

## 🌙 特色功能

- **深色模式支援** - 在淺色和深色主題之間切換
- **純用戶端處理** - 所有處理都在瀏覽器中進行
- **響應式設計** - 在桌面和行動裝置上都能完美運作
- **快速且輕量** - 使用 Vite 建構以獲得最佳效能
- **完整中文介面** - 專為繁體中文使用者優化

## 🚢 部署

此專案已設定為使用 GitHub Actions 自動部署到 GitHub Pages。

### 手動部署
如果你偏好手動部署：

```bash
npm run build
# 然後將 dist/ 資料夾上傳到你的主機服務
```

### GitHub Pages 設定

1. 前往你的儲存庫設定
2. 導覽至 Pages
3. 選擇「GitHub Actions」作為來源
4. 推送到 `main` 分支以觸發部署

## 📝 授權條款

MIT License - 歡迎自由使用此專案。

## 🤝 貢獻

歡迎貢獻！請隨時提交 Pull Request。

## 💡 隱私權

所有工具都完全在你的瀏覽器中運行。不會將資料傳送到任何伺服器，確保資料隱私安全。
All tools run entirely in your browser. No data is sent to any server.

