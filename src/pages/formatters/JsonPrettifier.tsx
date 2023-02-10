import { useState, useEffect, useCallback } from 'react';
import ToolPageWrapper, {
  ToolSection,
  ToolInput,
  ToolButton,
  CopyButton,
  ClearButton,
  LoadSampleButton,
  TwoColumnLayout,
} from '../../components/ToolPageWrapper';
import { useTool } from '../../hooks/useTool';
import { formatJson, minifyJson } from '../../utils/jsonFormatter';

const sampleJson = `{
  "name": "Poyu",
  "role": "Developer",
  "skills": ["React", "TypeScript", "Node.js"],
  "experience": {
    "years": 5,
    "projects": 20
  }
}`;

export default function JsonPrettifier() {
  const { input, output, error, setInput, setOutput, setError, clear } = useTool();
  const [spacing, setSpacing] = useState(2);

  const handleFormat = useCallback(() => {
    try {
      setError('');
      const formatted = formatJson(input, spacing);
      setOutput(formatted);
    } catch (err) {
      setError(err instanceof Error ? err.message : '格式化失敗');
      setOutput('');
    }
  }, [input, spacing, setError, setOutput]);

  const handleMinify = () => {
    try {
      setError('');
      const minified = minifyJson(input);
      setOutput(minified);
    } catch (err) {
      setError(err instanceof Error ? err.message : '壓縮失敗');
      setOutput('');
    }
  };

  const handleLoadSample = () => {
    setInput(sampleJson);
    setError('');
  };

  // Auto-format when input changes
  useEffect(() => {
    if (input.trim()) {
      handleFormat();
    }
  }, [input, handleFormat]);

  return (
    <ToolPageWrapper
      title="JSON 格式化工具"
      description="美化、壓縮和驗證 JSON 資料格式"
      actions={
        <>
          <LoadSampleButton onLoad={handleLoadSample} label="載入範例" />
          <ClearButton onClear={clear} label="清空" />
          
          <div className="flex items-center gap-2 ml-auto">
            <label className="text-sm text-gray-700 dark:text-gray-300">縮排空格：</label>
            <select
              value={spacing}
              onChange={(e) => setSpacing(Number(e.target.value))}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              <option value={2}>2 空格</option>
              <option value={4}>4 空格</option>
            </select>
          </div>
          
          <ToolButton onClick={handleFormat}>格式化</ToolButton>
          <ToolButton onClick={handleMinify} variant="secondary">壓縮</ToolButton>
        </>
      }
    >
      <TwoColumnLayout
        left={
          <ToolSection title="輸入 JSON">
            <ToolInput
              label=""
              value={input}
              onChange={setInput}
              placeholder='輸入或貼上 JSON 資料，例如：{"key": "value"}'
              rows={20}
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
            <ToolInput
              label=""
              value={output}
              onChange={() => {}}
              placeholder="格式化後的 JSON 將顯示在這裡"
              rows={20}
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
          <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
            <li>✅ 自動驗證 JSON 格式</li>
            <li>✅ 支援 2 或 4 空格縮排</li>
            <li>✅ 一鍵壓縮 JSON（移除所有空白）</li>
            <li>✅ 即時格式化預覽</li>
          </ul>
        </div>
      </ToolSection>
    </ToolPageWrapper>
  );
}
