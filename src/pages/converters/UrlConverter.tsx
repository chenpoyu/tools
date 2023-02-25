import { useState, useEffect, useCallback } from 'react';
import ToolPageWrapper, {
  ToolSection,
  ToolInput,
  CopyButton,
  ClearButton,
  LoadSampleButton,
  TwoColumnLayout,
} from '../../components/ToolPageWrapper';
import { useTool } from '../../hooks/useTool';
import { encodeUrl, decodeUrl, encodeFullUrl, decodeFullUrl } from '../../utils/urlEncoder';

const sampleText = 'Hello World! 你好世界 & special=chars?';
const sampleUrl = 'https://example.com/search?q=測試查詢&category=開發工具';

export default function UrlConverter() {
  const { input, output, error, setInput, setOutput, setError, clear } = useTool();
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [encodeType, setEncodeType] = useState<'component' | 'full'>('component');

  const handleConvert = useCallback(() => {
    try {
      setError('');
      if (mode === 'encode') {
        const encoded = encodeType === 'component' 
          ? encodeUrl(input) 
          : encodeFullUrl(input);
        setOutput(encoded);
      } else {
        const decoded = encodeType === 'component' 
          ? decodeUrl(input) 
          : decodeFullUrl(input);
        setOutput(decoded);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : '轉換失敗');
      setOutput('');
    }
  }, [input, mode, encodeType, setError, setOutput]);

  const handleLoadSample = () => {
    if (mode === 'encode') {
      setInput(encodeType === 'component' ? sampleText : sampleUrl);
    } else {
      setInput(
        encodeType === 'component'
          ? 'Hello%20World!%20%E4%BD%A0%E5%A5%BD%E4%B8%96%E7%95%8C%20%26%20special%3Dchars%3F'
          : 'https://example.com/search?q=%E6%B8%AC%E8%A9%A6%E6%9F%A5%E8%A9%A2&category=%E9%96%8B%E7%99%BC%E5%B7%A5%E5%85%B7'
      );
    }
    setError('');
  };

  const handleModeChange = (newMode: 'encode' | 'decode') => {
    setMode(newMode);
    clear();
  };

  // Auto-convert when input changes
  useEffect(() => {
    if (input.trim()) {
      handleConvert();
    } else {
      setOutput('');
      setError('');
    }
  }, [input, handleConvert, setOutput, setError]);

  return (
    <ToolPageWrapper
      title="URL 編碼/解碼工具"
      description="URL 字串編碼與解碼，適用於 URL 參數和完整 URL"
      actions={
        <>
          <LoadSampleButton onLoad={handleLoadSample} label="載入範例" />
          <ClearButton onClear={clear} label="清空" />
          
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-700 dark:text-gray-300">類型：</label>
            <select
              value={encodeType}
              onChange={(e) => setEncodeType(e.target.value as 'component' | 'full')}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
            >
              <option value="component">Component（參數）</option>
              <option value="full">Full（完整URL）</option>
            </select>
          </div>
          
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-700 dark:text-gray-300">模式：</label>
            <div className="flex bg-gray-200 dark:bg-gray-700 rounded-lg p-1">
              <button
                onClick={() => handleModeChange('encode')}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  mode === 'encode'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                編碼
              </button>
              <button
                onClick={() => handleModeChange('decode')}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  mode === 'decode'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                解碼
              </button>
            </div>
          </div>
        </>
      }
    >
      <TwoColumnLayout
        left={
          <ToolSection title={mode === 'encode' ? '原始文字/URL' : '編碼後的 URL'}>
            <ToolInput
              label=""
              value={input}
              onChange={setInput}
              placeholder={
                mode === 'encode'
                  ? encodeType === 'component'
                    ? '輸入要編碼的文字或參數...'
                    : '輸入要編碼的完整 URL...'
                  : '輸入要解碼的 URL 編碼字串...'
              }
              rows={15}
            />
            {error && (
              <div className="mt-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <p className="text-sm text-red-800 dark:text-red-300">❌ {error}</p>
              </div>
            )}
          </ToolSection>
        }
        right={
          <ToolSection title={mode === 'encode' ? '編碼結果' : '解碼結果'}>
            <ToolInput
              label=""
              value={output}
              onChange={() => {}}
              placeholder="轉換結果將顯示在這裡"
              rows={15}
              readOnly
            />
            {output && (
              <div className="mt-3">
                <CopyButton text={output} label="複製結果" />
              </div>
            )}
          </ToolSection>
        }
      />

      <ToolSection>
        <div className="prose dark:prose-invert max-w-none">
          <h3 className="text-lg font-semibold mb-2">使用說明</h3>
          
          <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
            <div>
              <p className="font-semibold text-gray-800 dark:text-white mb-1">
                encodeURIComponent（參數）
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li>編碼所有特殊字元，包含 <code className="text-xs bg-gray-200 dark:bg-gray-700 px-1 py-0.5 rounded">: / ? # [ ] @ ! $ & ' ( ) * + , ; =</code></li>
                <li>適用於 URL 參數值、查詢字串</li>
                <li>例如：<code className="text-xs bg-gray-200 dark:bg-gray-700 px-1 py-0.5 rounded">?name=你好</code> → <code className="text-xs bg-gray-200 dark:bg-gray-700 px-1 py-0.5 rounded">?name=%E4%BD%A0%E5%A5%BD</code></li>
              </ul>
            </div>

            <div>
              <p className="font-semibold text-gray-800 dark:text-white mb-1">
                encodeURI（完整URL）
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li>保留 URL 結構字元 <code className="text-xs bg-gray-200 dark:bg-gray-700 px-1 py-0.5 rounded">: / ? # [ ] @</code></li>
                <li>只編碼非 ASCII 字元和少數特殊字元</li>
                <li>適用於完整的 URL 字串</li>
              </ul>
            </div>

            <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
              <p className="font-semibold text-gray-800 dark:text-white mb-1">注意事項</p>
              <ul className="list-disc list-inside space-y-1">
                <li>✅ 支援完整的 UTF-8 字元（中文、emoji 等）</li>
                <li>✅ 即時轉換，無需點擊按鈕</li>
                <li>⚠️ 選擇正確的編碼類型很重要！</li>
              </ul>
            </div>
          </div>
        </div>
      </ToolSection>
    </ToolPageWrapper>
  );
}
