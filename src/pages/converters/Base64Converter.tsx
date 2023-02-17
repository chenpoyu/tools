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
import { encodeBase64, decodeBase64 } from '../../utils/base64';

const sampleText = 'Hello, 你好！這是一個測試文字。';

export default function Base64Converter() {
  const { input, output, error, setInput, setOutput, setError, clear } = useTool();
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');

  const handleConvert = useCallback(() => {
    try {
      setError('');
      if (mode === 'encode') {
        const encoded = encodeBase64(input);
        setOutput(encoded);
      } else {
        const decoded = decodeBase64(input);
        setOutput(decoded);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : '轉換失敗');
      setOutput('');
    }
  }, [input, mode, setError, setOutput]);

  const handleLoadSample = () => {
    if (mode === 'encode') {
      setInput(sampleText);
    } else {
      setInput('SGVsbG8sIOS9oOWlve+8geminOaYr+S4gOWAi+a4rOippuaWh+Wtly4=');
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
      title="Base64 編碼/解碼工具"
      description="Base64 字串編碼與解碼，支援 UTF-8 中文字元"
      actions={
        <>
          <LoadSampleButton onLoad={handleLoadSample} label="載入範例" />
          <ClearButton onClear={clear} label="清空" />
          
          <div className="flex items-center gap-2 ml-auto">
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
          <ToolSection title={mode === 'encode' ? '原始文字' : 'Base64 字串'}>
            <ToolInput
              label=""
              value={input}
              onChange={setInput}
              placeholder={
                mode === 'encode'
                  ? '輸入要編碼的文字...'
                  : '輸入要解碼的 Base64 字串...'
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
          <ToolSection title={mode === 'encode' ? 'Base64 結果' : '解碼結果'}>
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
          <h3 className="text-lg font-semibold mb-2">關於 Base64</h3>
          <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
            <li>✅ 支援完整的 UTF-8 字元（包含中文、emoji 等）</li>
            <li>✅ 即時轉換，無需點擊按鈕</li>
            <li>✅ 常用於資料傳輸、URL 參數、圖片編碼等</li>
            <li>⚠️ Base64 編碼後的字串會比原始資料大約 33%</li>
          </ul>
        </div>
      </ToolSection>
    </ToolPageWrapper>
  );
}
