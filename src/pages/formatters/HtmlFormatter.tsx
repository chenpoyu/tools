import { useState, useCallback } from 'react';
import ToolPageWrapper, {
  ToolSection,
  ToolInput,
  ToolButton,
  TwoColumnLayout,
  CopyButton,
} from '../../components/ToolPageWrapper';
import { FileCode, RefreshCw } from 'lucide-react';
import { formatHtml, minifyHtml } from '../../utils/htmlFormatter';

const HTML_SAMPLE = `<!DOCTYPE html><html><head><title>Sample Page</title><meta charset="UTF-8"><link rel="stylesheet" href="styles.css"></head><body><div class="container"><header><h1>Welcome to My Website</h1><nav><ul><li><a href="#home">Home</a></li><li><a href="#about">About</a></li><li><a href="#contact">Contact</a></li></ul></nav></header><main><section><h2>About Us</h2><p>這是一個範例 HTML 文件，展示各種 HTML 標籤的使用。</p><ul><li>項目 1</li><li>項目 2</li><li>項目 3</li></ul></section><section><h2>Contact Form</h2><form><label for="name">Name:</label><input type="text" id="name" name="name"><label for="email">Email:</label><input type="email" id="email" name="email"><button type="submit">Submit</button></form></section></main><footer><p>&copy; 2026 My Website. All rights reserved.</p></footer></div></body></html>`;

export default function HtmlFormatter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [indentSize, setIndentSize] = useState(2);

  const handleFormat = useCallback(() => {
    if (!input.trim()) {
      setOutput('');
      setError('');
      return;
    }

    try {
      const formatted = formatHtml(input, indentSize);
      setOutput(formatted);
      setError('');
    } catch (err) {
      setError(err instanceof Error ? err.message : '格式化失敗');
      setOutput('');
    }
  }, [input, indentSize]);

  const handleMinify = useCallback(() => {
    if (!input.trim()) {
      setOutput('');
      setError('');
      return;
    }

    try {
      const minified = minifyHtml(input);
      setOutput(minified);
      setError('');
    } catch (err) {
      setError(err instanceof Error ? err.message : '壓縮失敗');
      setOutput('');
    }
  }, [input]);

  const handleClear = useCallback(() => {
    setInput('');
    setOutput('');
    setError('');
  }, []);

  const loadSample = useCallback(() => {
    setInput(HTML_SAMPLE);
    setError('');
    setOutput('');
  }, []);

  return (
    <ToolPageWrapper
      title="HTML 格式化工具"
      description="格式化和壓縮 HTML 程式碼，使其更易讀或更精簡"
      actions={
        <>
          <button
            onClick={loadSample}
            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors flex items-center gap-2"
          >
            <FileCode size={16} />
            載入範例
          </button>
          <button
            onClick={handleClear}
            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors flex items-center gap-2"
          >
            <RefreshCw size={16} />
            清空
          </button>

          <div className="flex items-center gap-2 ml-auto">
            <label className="text-sm text-gray-700 dark:text-gray-300">縮排空格：</label>
            <select
              value={indentSize}
              onChange={(e) => setIndentSize(Number(e.target.value))}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value={2}>2 空格</option>
              <option value={4}>4 空格</option>
            </select>
          </div>

          <ToolButton onClick={handleFormat}>格式化</ToolButton>
          <ToolButton onClick={handleMinify} variant="secondary">
            壓縮
          </ToolButton>
        </>
      }
    >
      <TwoColumnLayout
        left={
          <ToolSection title="輸入 HTML">
            <ToolInput
              label=""
              value={input}
              onChange={setInput}
              placeholder="輸入或貼上 HTML 程式碼..."
              rows={20}
              monospace
            />
            {error && (
              <div className="mt-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <p className="text-sm text-red-800 dark:text-red-300">❌ {error}</p>
              </div>
            )}
          </ToolSection>
        }
        right={
          <ToolSection title="輸出結果">
            <div className="relative">
              <ToolInput
                label=""
                value={output}
                onChange={() => {}}
                placeholder="格式化或壓縮後的結果將顯示在這裡..."
                rows={20}
                readOnly
                monospace
              />
              {output && (
                <div className="absolute top-2 right-2">
                  <CopyButton text={output} />
                </div>
              )}
            </div>
            {output && (
              <div className="mt-2 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-green-800 dark:text-green-300">
                    ✓ 原始大小: {input.length} 字元
                  </span>
                  <span className="text-green-800 dark:text-green-300">
                    處理後: {output.length} 字元
                  </span>
                  <span className="font-medium text-green-800 dark:text-green-300">
                    {input.length > output.length
                      ? `壓縮 ${(((input.length - output.length) / input.length) * 100).toFixed(1)}%`
                      : `增加 ${(((output.length - input.length) / input.length) * 100).toFixed(1)}%`}
                  </span>
                </div>
              </div>
            )}
          </ToolSection>
        }
      />

      {/* Info Section */}
      <ToolSection title="功能說明">
        <div className="prose dark:prose-invert max-w-none">
          <div className="text-sm text-gray-600 dark:text-gray-400 space-y-3">
            <div>
              <p className="font-semibold text-gray-900 dark:text-white mb-2">HTML 格式化</p>
              <p>自動整理 HTML 標籤，添加適當的縮排和換行，使程式碼更易讀。</p>
              <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                <li>自動偵測並格式化區塊級元素（div, p, section 等）</li>
                <li>保持行內元素在同一行（a, span, strong 等）</li>
                <li>正確處理自閉合標籤（img, br, input 等）</li>
                <li>保留文字內容，移除多餘空白</li>
                <li>支援自訂縮排大小（2 或 4 空格）</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-gray-900 dark:text-white mb-2">HTML 壓縮</p>
              <p>移除所有不必要的空白、換行和註解，大幅減少檔案大小，適合用於生產環境。</p>
              <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                <li>移除 HTML 註解（&lt;!-- ... --&gt;）</li>
                <li>移除標籤之間的空白字元</li>
                <li>壓縮多個空格為單一空格</li>
                <li>通常可減少 20-40% 的檔案大小</li>
              </ul>
            </div>
            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
              <p className="text-sm text-blue-800 dark:text-blue-300">
                <strong>💡 提示：</strong>開發時使用格式化版本便於閱讀和維護，部署到生產環境時使用壓縮版本以提升載入速度。
              </p>
            </div>
          </div>
        </div>
      </ToolSection>
    </ToolPageWrapper>
  );
}
