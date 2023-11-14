import { useState } from 'react';
import ToolPageWrapper, {
  ToolSection,
  ToolButton,
  TwoColumnLayout,
} from '../../components/ToolPageWrapper';
import { Eye, RefreshCw } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function MarkdownPreviewer() {
  const [markdown, setMarkdown] = useState('');

  const handleClear = () => {
    setMarkdown('');
  };

  const loadSample = () => {
    const sample = `# Markdown 預覽範例

## 這是二級標題

這是一個段落，支援 **粗體**、*斜體*、~~刪除線~~。

### 清單範例

- 項目 1
- 項目 2
  - 子項目 2.1
  - 子項目 2.2

### 有序清單

1. 第一項
2. 第二項
3. 第三項

### 程式碼區塊

\`\`\`javascript
function hello() {
  console.log("Hello, World!");
}
\`\`\`

### 引用

> 這是一段引用文字。
> 可以有多行。

### 連結與圖片

[GitHub](https://github.com)

### 表格

| 欄位 1 | 欄位 2 | 欄位 3 |
|--------|--------|--------|
| 資料 1 | 資料 2 | 資料 3 |
| 資料 4 | 資料 5 | 資料 6 |

### 核取方塊

- [x] 已完成的任務
- [ ] 未完成的任務

---

這是分隔線
`;
    setMarkdown(sample);
  };

  return (
    <ToolPageWrapper
      title="Markdown 預覽器"
      description="即時預覽 Markdown 格式文件"
      actions={
        <>
          <ToolButton onClick={loadSample} icon={<Eye size={16} />}>
            載入範例
          </ToolButton>
          <ToolButton onClick={handleClear} variant="secondary" icon={<RefreshCw size={16} />}>
            清空
          </ToolButton>
        </>
      }
    >
      <TwoColumnLayout
        left={
          <ToolSection title="Markdown 編輯器">
            <textarea
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
              placeholder="在此輸入 Markdown 文字..."
              className="tool-textarea min-h-[600px] resize-y"
            />
          </ToolSection>
        }
        right={
          <ToolSection title="即時預覽">
            <div className="prose dark:prose-invert max-w-none p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-600 min-h-[600px]">
              {markdown ? (
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
              ) : (
                <p className="text-gray-400 dark:text-gray-500">預覽將顯示在這裡...</p>
              )}
            </div>
          </ToolSection>
        }
      />

      <ToolSection>
        <div className="prose dark:prose-invert max-w-none">
          <h3 className="text-lg font-semibold mb-2">支援的 Markdown 語法</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-400">
            <div>
              <h4 className="font-semibold text-gray-800 dark:text-white mb-2">基本語法</h4>
              <ul className="space-y-1">
                <li># 標題（H1-H6）</li>
                <li>**粗體** 或 __粗體__</li>
                <li>*斜體* 或 _斜體_</li>
                <li>~~刪除線~~</li>
                <li>`行內程式碼`</li>
                <li>```程式碼區塊```</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 dark:text-white mb-2">進階功能（GFM）</h4>
              <ul className="space-y-1">
                <li>✅ 表格</li>
                <li>✅ 任務清單</li>
                <li>✅ 自動連結</li>
                <li>✅ 刪除線</li>
                <li>✅ 清單</li>
                <li>✅ 引用</li>
              </ul>
            </div>
          </div>
        </div>
      </ToolSection>
    </ToolPageWrapper>
  );
}
