import { useState, useCallback } from 'react';
import ToolPageWrapper, {
  ToolSection,
  ToolInput,
  ToolButton,
  CopyButton,
  TwoColumnLayout,
} from '../../components/ToolPageWrapper';
import { Maximize2, Minimize2, Zap, RefreshCw } from 'lucide-react';
import {
  minifySVG,
  prettifySVG,
  optimizeSVGPath,
  getSVGStats,
  validateSVG,
} from '../../utils/svgOptimizer';

export default function SvgOptimizer() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const handleMinify = useCallback(() => {
    const validation = validateSVG(input);
    if (!validation.valid) {
      setError(validation.error || '');
      return;
    }

    try {
      const minified = minifySVG(input);
      const optimized = optimizeSVGPath(minified);
      setOutput(optimized);
      setError('');
    } catch (err) {
      setError(err instanceof Error ? err.message : '最小化失敗');
    }
  }, [input]);

  const handlePrettify = useCallback(() => {
    const validation = validateSVG(input);
    if (!validation.valid) {
      setError(validation.error || '');
      return;
    }

    try {
      const prettified = prettifySVG(input);
      setOutput(prettified);
      setError('');
    } catch (err) {
      setError(err instanceof Error ? err.message : '格式化失敗');
    }
  }, [input]);

  const handleClear = useCallback(() => {
    setInput('');
    setOutput('');
    setError('');
  }, []);

  const loadSample = useCallback(() => {
    const sample = `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">
  <circle cx="50" cy="50" r="40" fill="#3b82f6" />
  <path d="M 30 50 L 50 70 L 70 30" stroke="white" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round" />
</svg>`;
    setInput(sample);
  }, []);

  const stats = input ? getSVGStats(input) : null;
  const outputStats = output ? getSVGStats(output) : null;

  return (
    <ToolPageWrapper
      title="SVG 優化器"
      description="最小化或格式化 SVG 代碼，優化 path 路徑"
      actions={
        <>
          <ToolButton onClick={handleMinify} icon={<Minimize2 size={16} />}>
            最小化
          </ToolButton>
          <ToolButton onClick={handlePrettify} icon={<Maximize2 size={16} />}>
            格式化
          </ToolButton>
          <ToolButton onClick={loadSample} variant="secondary">
            載入範例
          </ToolButton>
          <ToolButton onClick={handleClear} variant="secondary" icon={<RefreshCw size={16} />}>
            清空
          </ToolButton>
        </>
      }
    >
      {error && (
        <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg text-sm">
          {error}
        </div>
      )}

      <TwoColumnLayout
        left={
          <ToolSection title="輸入 SVG">
            <ToolInput
              label="SVG 代碼"
              value={input}
              onChange={setInput}
              placeholder="貼上 SVG 代碼..."
              rows={15}
            />
          {stats && (
            <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <div className="text-xs font-semibold text-blue-700 dark:text-blue-300 mb-2">
                輸入統計
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 dark:text-gray-400">
                <div>大小: {stats.size} bytes</div>
                <div>元素: {stats.elementCount}</div>
                <div>路徑: {stats.pathCount}</div>
                {stats.viewBox && <div>ViewBox: {stats.viewBox}</div>}
              </div>
            </div>
          )}
        </ToolSection>
      }
      right={
        <ToolSection title="優化結果">
          <div className="relative">
            <textarea
              value={output}
              readOnly
              placeholder="優化結果將顯示在這裡..."
              className="tool-textarea min-h-[600px] resize-y"
            />
            {output && (
              <div className="absolute top-2 right-2">
                <CopyButton text={output} label="複製" />
              </div>
            )}
          </div>
          {outputStats && stats && (
            <div className="mt-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
              <div className="text-xs font-semibold text-green-700 dark:text-green-300 mb-2 flex items-center gap-1">
                <Zap size={14} />
                優化統計
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 dark:text-gray-400">
                <div>大小: {outputStats.size} bytes</div>
                <div>
                  節省:{' '}
                  <span className="font-bold text-green-600 dark:text-green-400">
                    {((1 - outputStats.size / stats.size) * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>
          )}
        </ToolSection>
      }
    />

      {output && (
        <ToolSection title="SVG 預覽">
          <div className="p-8 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-300 dark:border-gray-600 flex items-center justify-center min-h-[200px]">
            <div dangerouslySetInnerHTML={{ __html: output }} />
          </div>
        </ToolSection>
      )}

      <ToolSection>
        <div className="prose dark:prose-invert max-w-none">
          <h3 className="text-lg font-semibold mb-2">優化說明</h3>
          <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
            <li><strong>最小化</strong>: 移除多餘空白、優化數值精度，減少檔案大小</li>
            <li><strong>格式化</strong>: 添加縮排與換行，提高可讀性</li>
            <li><strong>路徑優化</strong>: 簡化 path 數值，保留 2 位小數</li>
            <li>✅ 保留 SVG 的視覺效果與功能</li>
          </ul>
        </div>
      </ToolSection>
    </ToolPageWrapper>
  );
}
