import { useState, useCallback } from 'react';
import ToolPageWrapper, {
  ToolSection,
  ToolInput,
  ToolButton,
  TwoColumnLayout,
  CopyButton,
} from '../../components/ToolPageWrapper';
import { FileCode, RefreshCw } from 'lucide-react';
import { formatJavaScript, minifyJavaScript } from '../../utils/jsFormatter';

const JS_SAMPLE = `function calculateSum(a,b){return a+b;}const user={name:"John",age:30,email:"john@example.com"};const greeting="Hello World";const numbers=[1,2,3,4,5,6,7,8,9,10];const doubled=numbers.map(n=>n*2);const filtered=doubled.filter(n=>n>10);console.log("Filtered numbers:",filtered);function processData(data){if(!data){return null;}const result=data.reduce((acc,item)=>{acc[item.id]=item;return acc;},{});return result;}const apiCall=async()=>{try{const response=await fetch('/api/data');const data=await response.json();return processData(data);}catch(error){console.error('Error:',error);return null;}};`;

export default function JavaScriptFormatter() {
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
      const formatted = formatJavaScript(input, indentSize);
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
      const minified = minifyJavaScript(input);
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
    setInput(JS_SAMPLE);
    setError('');
    setOutput('');
  }, []);

  return (
    <ToolPageWrapper
      title="JavaScript 格式化工具"
      description="格式化和壓縮 JavaScript 程式碼，提升可讀性或減少檔案大小"
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
          <ToolSection title="輸入 JavaScript">
            <ToolInput
              label=""
              value={input}
              onChange={setInput}
              placeholder="輸入或貼上 JavaScript 程式碼..."
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
              <p className="font-semibold text-gray-900 dark:text-white mb-2">JavaScript 格式化</p>
              <p>自動整理 JavaScript 程式碼，添加適當的縮排和換行，提升程式碼可讀性。</p>
              <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                <li>自動處理大括號和中括號的縮排</li>
                <li>在分號後自動換行</li>
                <li>保留字串內容不受影響</li>
                <li>保留單行和多行註解</li>
                <li>在逗號後添加空格</li>
                <li>支援自訂縮排大小（2 或 4 空格）</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-gray-900 dark:text-white mb-2">JavaScript 壓縮</p>
              <p>移除註解、多餘空白和換行，減少檔案大小，加快載入速度。</p>
              <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                <li>移除單行註解（// ...）</li>
                <li>移除多行註解（/* ... */）</li>
                <li>移除所有不必要的空白字元</li>
                <li>移除換行符號</li>
                <li>壓縮符號周圍的空格</li>
                <li>通常可減少 30-50% 的檔案大小</li>
              </ul>
            </div>
            <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
              <p className="text-sm text-yellow-800 dark:text-yellow-300">
                <strong>⚠️ 注意：</strong>此工具提供基本的格式化和壓縮功能。對於生產環境，建議使用專業工具如 Terser、UglifyJS 或 Babel 進行更完整的程式碼優化和混淆。
              </p>
            </div>
            <div className="mt-2 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
              <p className="text-sm text-blue-800 dark:text-blue-300">
                <strong>💡 提示：</strong>開發時使用格式化版本便於除錯，部署前使用壓縮版本以優化效能。
              </p>
            </div>
          </div>
        </div>
      </ToolSection>
    </ToolPageWrapper>
  );
}
