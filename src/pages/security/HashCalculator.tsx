import { useState, useCallback } from 'react';
import ToolPageWrapper, {
  ToolSection,
  ToolInput,
  ToolButton,
  CopyButton,
} from '../../components/ToolPageWrapper';
import { Hash, RefreshCw } from 'lucide-react';
import { calculateAllHashes, type HashAlgorithm } from '../../utils/hashCalculator';

export default function HashCalculator() {
  const [input, setInput] = useState('');
  const [hashes, setHashes] = useState<Record<HashAlgorithm, string>>({
    'MD5': '',
    'SHA-1': '',
    'SHA-256': '',
    'SHA-512': '',
  });
  const [isCalculating, setIsCalculating] = useState(false);

  const handleCalculate = useCallback(async () => {
    if (!input.trim()) {
      setHashes({
        'MD5': '',
        'SHA-1': '',
        'SHA-256': '',
        'SHA-512': '',
      });
      return;
    }

    setIsCalculating(true);
    try {
      const results = await calculateAllHashes(input);
      setHashes(results);
    } catch (error) {
      alert(error instanceof Error ? error.message : '雜湊計算失敗');
    } finally {
      setIsCalculating(false);
    }
  }, [input]);

  const handleClear = useCallback(() => {
    setInput('');
    setHashes({
      'MD5': '',
      'SHA-1': '',
      'SHA-256': '',
      'SHA-512': '',
    });
  }, []);

  const hashInfo: Record<HashAlgorithm, { description: string; length: number }> = {
    'MD5': { description: '128-bit 雜湊（不建議用於安全用途）', length: 32 },
    'SHA-1': { description: '160-bit 雜湊（已淘汰，不安全）', length: 40 },
    'SHA-256': { description: '256-bit 雜湊（安全，建議使用）', length: 64 },
    'SHA-512': { description: '512-bit 雜湊（最安全）', length: 128 },
  };

  return (
    <ToolPageWrapper
      title="雜湊計算器"
      description="計算文字的 MD5、SHA-1、SHA-256、SHA-512 雜湊值"
      actions={
        <>
          <ToolButton onClick={handleCalculate} icon={<Hash size={16} />} disabled={isCalculating}>
            {isCalculating ? '計算中...' : '計算雜湊'}
          </ToolButton>
          <ToolButton onClick={handleClear} variant="secondary" icon={<RefreshCw size={16} />}>
            清空
          </ToolButton>
        </>
      }
    >
      <ToolSection title="輸入文字">
        <ToolInput
          label="文字內容"
          value={input}
          onChange={setInput}
          placeholder="輸入要計算雜湊值的文字..."
          rows={4}
        />
      </ToolSection>

      <ToolSection title="雜湊結果">
        <div className="space-y-4">
          {(Object.keys(hashInfo) as HashAlgorithm[]).map((algo) => (
            <div key={algo} className="border border-gray-300 dark:border-gray-600 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <span className="font-bold text-lg text-gray-800 dark:text-white">
                    {algo}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {hashInfo[algo].description}
                  </span>
                </div>
                {hashes[algo] && <CopyButton text={hashes[algo]} label="複製" />}
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 p-3 bg-gray-50 dark:bg-gray-900 rounded border border-gray-200 dark:border-gray-700 font-mono text-sm break-all text-gray-900 dark:text-white">
                  {hashes[algo] || (
                    <span className="text-gray-400 dark:text-gray-500">
                      等待輸入文字...
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </ToolSection>

      <ToolSection>
        <div className="prose dark:prose-invert max-w-none">
          <h3 className="text-lg font-semibold mb-2">關於雜湊函數</h3>
          <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
            <li><strong>MD5</strong>: 已被破解，不建議用於安全用途，僅供檔案校驗</li>
            <li><strong>SHA-1</strong>: 已淘汰，不安全，僅供舊系統相容</li>
            <li><strong>SHA-256</strong>: 目前主流，安全可靠，建議使用</li>
            <li><strong>SHA-512</strong>: 更長的雜湊值，提供最高安全性</li>
            <li>⚠️ 雜湊是單向函數，無法反向解密</li>
            <li>✅ 適合用於密碼儲存、檔案完整性驗證</li>
          </ul>
        </div>
      </ToolSection>
    </ToolPageWrapper>
  );
}
