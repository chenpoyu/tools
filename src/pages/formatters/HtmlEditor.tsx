import { useState } from 'react';
import ToolPageWrapper, {
  ToolSection,
  ToolButton,
  TwoColumnLayout,
} from '../../components/ToolPageWrapper';
import { Eye, RefreshCw, Download, Upload, Code, Palette, Type, Image, Link, List, Table } from 'lucide-react';

export default function HtmlEditor() {
  const [htmlCode, setHtmlCode] = useState('');
  const [showQuickTools, setShowQuickTools] = useState(true);

  const handleClear = () => {
    setHtmlCode('');
  };

  const loadSample = () => {
    const sample = `<!DOCTYPE html>
<html lang="zh-TW">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>HTML 範例模板</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
      background: #f5f5f5;
    }
    .container {
      background: white;
      padding: 30px;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    h1 {
      color: #333;
      border-bottom: 2px solid #4CAF50;
      padding-bottom: 10px;
    }
    .button {
      background: #4CAF50;
      color: white;
      padding: 10px 20px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      margin: 10px 5px 10px 0;
    }
    .button:hover {
      background: #45a049;
    }
    .info-box {
      background: #e7f3ff;
      border-left: 4px solid #2196F3;
      padding: 15px;
      margin: 15px 0;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>歡迎使用 HTML 編輯器</h1>
    <p>這是一個簡單的 HTML 模板範例。</p>
    
    <div class="info-box">
      <strong>提示：</strong> 您可以在左側編輯 HTML 程式碼，右側會即時顯示預覽結果。
    </div>
    
    <h2>功能特色</h2>
    <ul>
      <li>即時預覽 HTML 輸出</li>
      <li>支援 CSS 樣式</li>
      <li>支援 JavaScript 腳本</li>
      <li>適合製作電子郵件模板</li>
    </ul>
    
    <button class="button" onclick="alert('按鈕被點擊了！')">
      點擊我
    </button>
    
    <h2>表單範例</h2>
    <form>
      <label for="name">姓名：</label>
      <input type="text" id="name" placeholder="請輸入姓名">
      <br><br>
      
      <label for="email">Email：</label>
      <input type="email" id="email" placeholder="請輸入 Email">
      <br><br>
      
      <button type="submit" class="button">送出</button>
    </form>
  </div>
  
  <script>
    console.log('HTML 模板已載入');
  </script>
</body>
</html>`;
    setHtmlCode(sample);
  };

  const handleDownload = () => {
    const blob = new Blob([htmlCode], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'template.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setHtmlCode(content);
      };
      reader.readAsText(file);
    }
  };

  // 快速插入功能
  const insertAtCursor = (text: string) => {
    const textarea = document.querySelector('textarea') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const newText = htmlCode.substring(0, start) + text + htmlCode.substring(end);
    
    setHtmlCode(newText);
    
    // 設定游標位置
    setTimeout(() => {
      textarea.focus();
      const newPosition = start + text.length;
      textarea.setSelectionRange(newPosition, newPosition);
    }, 0);
  };

  const quickInsert = {
    heading: () => insertAtCursor('<h1>標題文字</h1>\n'),
    paragraph: () => insertAtCursor('<p>段落文字</p>\n'),
    link: () => insertAtCursor('<a href="https://example.com">連結文字</a>'),
    image: () => insertAtCursor('<img src="image.jpg" alt="圖片描述" />'),
    button: () => insertAtCursor('<button class="btn">按鈕</button>'),
    div: () => insertAtCursor('<div class="container">\n  內容\n</div>\n'),
    list: () => insertAtCursor('<ul>\n  <li>項目 1</li>\n  <li>項目 2</li>\n  <li>項目 3</li>\n</ul>\n'),
    table: () => insertAtCursor(
      '<table>\n  <thead>\n    <tr>\n      <th>欄位 1</th>\n      <th>欄位 2</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <td>資料 1</td>\n      <td>資料 2</td>\n    </tr>\n  </tbody>\n</table>\n'
    ),
    form: () => insertAtCursor(
      '<form>\n  <label for="input1">標籤：</label>\n  <input type="text" id="input1" name="input1">\n  <button type="submit">送出</button>\n</form>\n'
    ),
    style: () => insertAtCursor(
      '<style>\n  /* CSS 樣式 */\n  .container {\n    padding: 20px;\n  }\n</style>\n'
    ),
  };

  const loadEmailTemplate = () => {
    const template = `<!DOCTYPE html>
<html lang="zh-TW">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>電子郵件模板</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
    }
    .email-container {
      max-width: 600px;
      margin: 20px auto;
      background-color: #ffffff;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    .header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 30px;
      text-align: center;
      color: white;
    }
    .content {
      padding: 30px;
      color: #333;
      line-height: 1.6;
    }
    .button {
      display: inline-block;
      padding: 12px 30px;
      background-color: #667eea;
      color: white;
      text-decoration: none;
      border-radius: 5px;
      margin: 20px 0;
    }
    .footer {
      background-color: #f8f8f8;
      padding: 20px;
      text-align: center;
      font-size: 12px;
      color: #666;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">
      <h1>您的標題</h1>
    </div>
    <div class="content">
      <h2>哈囉！</h2>
      <p>這是一封範例電子郵件。您可以在此撰寫內容。</p>
      <p>電子郵件內容支援基本的 HTML 和 CSS 樣式。</p>
      <a href="#" class="button">立即查看</a>
    </div>
    <div class="footer">
      <p>© 2026 您的公司名稱. 版權所有</p>
      <p><a href="#">取消訂閱</a> | <a href="#">隱私政策</a></p>
    </div>
  </div>
</body>
</html>`;
    setHtmlCode(template);
  };

  const loadLandingPage = () => {
    const template = `<!DOCTYPE html>
<html lang="zh-TW">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>產品登陸頁</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      line-height: 1.6;
      color: #333;
    }
    .hero {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 100px 20px;
      text-align: center;
    }
    .hero h1 {
      font-size: 3em;
      margin-bottom: 20px;
    }
    .hero p {
      font-size: 1.3em;
      margin-bottom: 30px;
    }
    .cta-button {
      display: inline-block;
      padding: 15px 40px;
      background: white;
      color: #667eea;
      text-decoration: none;
      border-radius: 50px;
      font-weight: bold;
      font-size: 1.1em;
      transition: transform 0.3s;
    }
    .cta-button:hover {
      transform: scale(1.05);
    }
    .features {
      max-width: 1200px;
      margin: 80px auto;
      padding: 0 20px;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 40px;
    }
    .feature {
      text-align: center;
      padding: 30px;
      border-radius: 10px;
      background: #f8f9fa;
    }
    .feature h3 {
      margin: 20px 0;
      color: #667eea;
    }
  </style>
</head>
<body>
  <div class="hero">
    <h1>歡迎來到我們的產品</h1>
    <p>打造完美的解決方案，讓您的工作更輕鬆</p>
    <a href="#" class="cta-button">立即開始</a>
  </div>
  
  <div class="features">
    <div class="feature">
      <h3>🚀 快速</h3>
      <p>極速的效能表現，讓您的工作效率倍增</p>
    </div>
    <div class="feature">
      <h3>🔒 安全</h3>
      <p>企業級安全保護，資料安全有保障</p>
    </div>
    <div class="feature">
      <h3>💎 簡單</h3>
      <p>直覺的使用介面，輕鬆上手無需學習</p>
    </div>
  </div>
</body>
</html>`;
    setHtmlCode(template);
  };

  return (
    <ToolPageWrapper
      title="HTML 編輯器 / 預覽器"
      description="即時編輯和預覽 HTML 模板，提供快速插入工具讓不熟悉程式碼的使用者也能輕鬆製作 HTML"
      actions={
        <>
          <ToolButton onClick={loadSample} icon={<Eye size={16} />}>
            基本範例
          </ToolButton>
          <ToolButton onClick={loadEmailTemplate} icon={<Eye size={16} />}>
            郵件模板
          </ToolButton>
          <ToolButton onClick={loadLandingPage} icon={<Eye size={16} />}>
            登陸頁
          </ToolButton>
          <ToolButton onClick={handleDownload} icon={<Download size={16} />} disabled={!htmlCode}>
            下載 HTML
          </ToolButton>
          <label className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer text-sm font-medium">
            <Upload size={16} />
            上傳檔案
            <input
              type="file"
              accept=".html,.htm"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
          <ToolButton onClick={handleClear} variant="secondary" icon={<RefreshCw size={16} />}>
            清空
          </ToolButton>
        </>
      }
    >
      {/* 快速插入工具列 */}
      <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            🛠️ 快速插入工具（點擊按鈕即可插入程式碼）
          </h3>
          <button
            onClick={() => setShowQuickTools(!showQuickTools)}
            className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
          >
            {showQuickTools ? '隱藏' : '顯示'}
          </button>
        </div>
        
        {showQuickTools && (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2">
            <button
              onClick={quickInsert.heading}
              className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors text-sm"
            >
              <Type size={16} />
              標題
            </button>
            <button
              onClick={quickInsert.paragraph}
              className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors text-sm"
            >
              <Type size={16} />
              段落
            </button>
            <button
              onClick={quickInsert.link}
              className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors text-sm"
            >
              <Link size={16} />
              連結
            </button>
            <button
              onClick={quickInsert.image}
              className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors text-sm"
            >
              <Image size={16} />
              圖片
            </button>
            <button
              onClick={quickInsert.button}
              className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors text-sm"
            >
              <Code size={16} />
              按鈕
            </button>
            <button
              onClick={quickInsert.div}
              className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors text-sm"
            >
              <Code size={16} />
              容器
            </button>
            <button
              onClick={quickInsert.list}
              className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors text-sm"
            >
              <List size={16} />
              清單
            </button>
            <button
              onClick={quickInsert.table}
              className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors text-sm"
            >
              <Table size={16} />
              表格
            </button>
            <button
              onClick={quickInsert.form}
              className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors text-sm"
            >
              <Code size={16} />
              表單
            </button>
            <button
              onClick={quickInsert.style}
              className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors text-sm"
            >
              <Palette size={16} />
              CSS
            </button>
          </div>
        )}
      </div>

      <TwoColumnLayout
        left={
          <ToolSection title="HTML 編輯器">
            <textarea
              value={htmlCode}
              onChange={(e) => setHtmlCode(e.target.value)}
              placeholder="在此輸入 HTML 程式碼..."
              className="tool-textarea min-h-[600px] resize-y font-mono text-sm"
              spellCheck={false}
            />
          </ToolSection>
        }
        right={
          <ToolSection title="即時預覽">
            <div className="border border-gray-300 dark:border-gray-600 rounded-lg min-h-[600px] bg-white overflow-auto">
              {htmlCode ? (
                <iframe
                  srcDoc={htmlCode}
                  title="HTML Preview"
                  sandbox="allow-scripts allow-same-origin allow-forms allow-modals allow-popups"
                  className="w-full min-h-[600px] border-0"
                />
              ) : (
                <div className="flex items-center justify-center h-[600px] text-gray-400">
                  預覽將顯示在這裡...
                </div>
              )}
            </div>
          </ToolSection>
        }
      />

      <ToolSection>
        <div className="prose dark:prose-invert max-w-none">
          <h3 className="text-lg font-semibold mb-2">使用說明</h3>
          
          <div className="mb-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
            <h4 className="font-semibold text-green-800 dark:text-green-300 mb-2">✨ 新功能：快速插入工具</h4>
            <p className="text-sm text-green-700 dark:text-green-400">
              不熟悉 HTML 嗎？沒問題！使用上方的快速插入按鈕，點擊即可在游標位置插入常用的 HTML 元素。
              您只需要修改文字內容即可，不需要記住複雜的標籤語法！
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
            <div>
              <h4 className="font-semibold text-gray-800 dark:text-white mb-2">主要功能</h4>
              <ul className="space-y-1">
                <li>✅ 即時預覽 HTML 輸出</li>
                <li>✅ 快速插入常用元素</li>
                <li>✅ 支援內嵌 CSS 樣式</li>
                <li>✅ 支援 JavaScript 腳本</li>
                <li>✅ 下載 HTML 檔案</li>
                <li>✅ 上傳現有檔案編輯</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 dark:text-white mb-2">範例模板</h4>
              <ul className="space-y-1">
                <li>📄 基本網頁範例</li>
                <li>📧 電子郵件模板</li>
                <li>🚀 產品登陸頁</li>
                <li>📝 可自由修改使用</li>
                <li>🎨 包含完整樣式</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 dark:text-white mb-2">快速插入元素</h4>
              <ul className="space-y-1">
                <li>📝 標題、段落、文字</li>
                <li>🔗 連結、圖片</li>
                <li>🎯 按鈕、表單</li>
                <li>📋 清單、表格</li>
                <li>🎨 CSS 樣式區塊</li>
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">💡 給初學者的建議</h4>
              <ul className="text-sm text-blue-700 dark:text-blue-400 space-y-1">
                <li>1. 先點「基本範例」或「郵件模板」載入模板</li>
                <li>2. 直接修改模板中的文字內容</li>
                <li>3. 使用快速插入工具新增更多元素</li>
                <li>4. 右側會即時顯示預覽效果</li>
                <li>5. 滿意後點「下載 HTML」儲存檔案</li>
              </ul>
            </div>
            
            <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
              <h4 className="font-semibold text-purple-800 dark:text-purple-300 mb-2">🎓 給進階使用者</h4>
              <ul className="text-sm text-purple-700 dark:text-purple-400 space-y-1">
                <li>• 完整支援 HTML5 標籤和屬性</li>
                <li>• 可在 &lt;style&gt; 標籤中撰寫 CSS</li>
                <li>• 支援 &lt;script&gt; 執行 JavaScript</li>
                <li>• 支援 CSS Grid 和 Flexbox</li>
                <li>• 適合製作響應式設計</li>
              </ul>
            </div>
          </div>
          
          <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
            <h4 className="font-semibold text-yellow-800 dark:text-yellow-300 mb-2">⚠️ 安全提示</h4>
            <p className="text-sm text-yellow-700 dark:text-yellow-400">
              預覽功能使用 iframe sandbox 提供安全隔離環境。雖然已啟用基本腳本功能，
              但請避免執行不受信任的程式碼。此工具適合製作靜態內容和簡單的互動效果。
            </p>
          </div>
        </div>
      </ToolSection>
    </ToolPageWrapper>
  );
}
