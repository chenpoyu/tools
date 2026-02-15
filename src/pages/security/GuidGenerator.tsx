import { useState } from 'react';
import ToolPageWrapper, {
  ToolSection,
  ToolButton,
  CopyButton,
} from '../../components/ToolPageWrapper';
import { Key, RefreshCw, Copy, Trash2 } from 'lucide-react';
import {
  generateGuid,
  generateMultipleGuids,
  isValidGuid,
  formatGuid,
  type GuidOptions,
} from '../../utils/guidGenerator';

export default function GuidGenerator() {
  const [options, setOptions] = useState<GuidOptions>({
    includeHyphens: true,
    uppercase: false,
  });
  const [guid, setGuid] = useState(() => generateGuid({ includeHyphens: true, uppercase: false }));
  const [batchCount, setBatchCount] = useState(5);
  const [batchGuids, setBatchGuids] = useState<string[]>([]);
  const [inputGuid, setInputGuid] = useState('');
  const [formatResult, setFormatResult] = useState('');

  const handleGenerate = () => {
    const newGuid = generateGuid(options);
    setGuid(newGuid);
  };

  const handleGenerateBatch = () => {
    const guids = generateMultipleGuids(batchCount, options);
    setBatchGuids(guids);
  };

  const handleCopyAllBatch = () => {
    const text = batchGuids.join('\n');
    navigator.clipboard.writeText(text);
  };

  const handleClearBatch = () => {
    setBatchGuids([]);
  };

  const handleFormatGuid = () => {
    const formatted = formatGuid(inputGuid, options);
    if (formatted) {
      setFormatResult(formatted);
    } else {
      setFormatResult('無效的 GUID 格式');
    }
  };

  // Auto-regenerate when options change
  const handleOptionChange = (key: keyof GuidOptions, value: boolean) => {
    const newOptions = { ...options, [key]: value };
    setOptions(newOptions);
    const newGuid = generateGuid(newOptions);
    setGuid(newGuid);
  };

  return (
    <ToolPageWrapper
      title="GUID 產生器"
      description="產生全域唯一識別碼（GUID/UUID），支援多種格式選項"
      actions={
        <>
          <ToolButton onClick={handleGenerate} icon={<RefreshCw size={16} />}>
            重新產生
          </ToolButton>
        </>
      }
    >
      {/* Single GUID Display */}
      <ToolSection>
        <div className="space-y-4">
          <div>
            <label className="input-label flex items-center gap-2">
              <Key size={16} />
              產生的 GUID
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={guid}
                readOnly
                className="flex-1 p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white font-mono text-lg"
              />
              <CopyButton text={guid} label="複製" />
            </div>
            <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              長度: {guid.length} 字元
            </div>
          </div>
        </div>
      </ToolSection>

      {/* Options */}
      <ToolSection title="格式選項">
        <div className="space-y-4">
          {/* Include Hyphens */}
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={options.includeHyphens}
              onChange={(e) => handleOptionChange('includeHyphens', e.target.checked)}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <div className="flex-1">
              <div className="font-medium text-gray-900 dark:text-white">包含連字號 (-)</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {options.includeHyphens ? '36 字元格式' : '32 字元格式'}
                {' '}
                {options.includeHyphens ? '(8-4-4-4-12)' : '(連續32位元)'}
              </div>
            </div>
          </label>

          {/* Uppercase */}
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={options.uppercase}
              onChange={(e) => handleOptionChange('uppercase', e.target.checked)}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <div className="flex-1">
              <div className="font-medium text-gray-900 dark:text-white">大寫</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                使用大寫字母（A-F）而非小寫（a-f）
              </div>
            </div>
          </label>
        </div>
      </ToolSection>

      {/* Batch Generation */}
      <ToolSection title="批次產生">
        <div className="space-y-4">
          <div className="flex gap-2 items-end">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                產生數量
              </label>
              <input
                type="number"
                min="1"
                max="100"
                value={batchCount}
                onChange={(e) => setBatchCount(Math.min(100, Math.max(1, parseInt(e.target.value) || 1)))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                         bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
                         focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <ToolButton onClick={handleGenerateBatch} icon={<RefreshCw size={16} />}>
              產生
            </ToolButton>
            {batchGuids.length > 0 && (
              <>
                <ToolButton onClick={handleCopyAllBatch} icon={<Copy size={16} />} variant="secondary">
                  全部複製
                </ToolButton>
                <ToolButton onClick={handleClearBatch} icon={<Trash2 size={16} />} variant="secondary">
                  清空
                </ToolButton>
              </>
            )}
          </div>

          {batchGuids.length > 0 && (
            <div className="border border-gray-300 dark:border-gray-600 rounded-lg p-4 bg-gray-50 dark:bg-gray-900 max-h-96 overflow-y-auto">
              <div className="space-y-2">
                {batchGuids.map((g, index) => (
                  <div key={index} className="flex items-center gap-2 group">
                    <span className="text-xs text-gray-400 dark:text-gray-500 w-8">
                      {index + 1}.
                    </span>
                    <code className="flex-1 text-sm font-mono text-gray-900 dark:text-white">
                      {g}
                    </code>
                    <CopyButton text={g} label="" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </ToolSection>

      {/* Format Existing GUID */}
      <ToolSection title="格式化現有 GUID">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              輸入 GUID
            </label>
            <input
              type="text"
              value={inputGuid}
              onChange={(e) => setInputGuid(e.target.value)}
              placeholder="輸入 GUID (32 或 36 字元)"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                       bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 font-mono
                       focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <ToolButton onClick={handleFormatGuid} icon={<RefreshCw size={16} />}>
            格式化
          </ToolButton>
          {formatResult && (
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                格式化結果
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={formatResult}
                  readOnly
                  className={`flex-1 px-3 py-2 rounded-lg font-mono
                         focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    isValidGuid(formatResult) 
                      ? 'bg-green-50 dark:bg-green-900/20 border-green-300 dark:border-green-700 text-gray-900 dark:text-gray-100' 
                      : 'bg-red-50 dark:bg-red-900/20 border-red-300 dark:border-red-700 text-gray-900 dark:text-gray-100'
                  }`}
                />
                {isValidGuid(formatResult) && <CopyButton text={formatResult} label="複製" />}
              </div>
            </div>
          )}
        </div>
      </ToolSection>

      {/* Info */}
      <ToolSection title="關於 GUID">
        <div className="prose dark:prose-invert max-w-none">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            GUID（全域唯一識別碼）也稱為 UUID（通用唯一識別碼），是一個 128 位元的數值，
            用於在分散式系統中唯一標識資訊。本工具產生的是 UUID version 4（隨機生成）。
          </p>
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex gap-2">
              <span className="font-semibold text-gray-900 dark:text-white">格式說明：</span>
            </div>
            <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400 ml-4">
              <li>36 字元（含連字號）：<code>550e8400-e29b-41d4-a716-446655440000</code></li>
              <li>32 字元（無連字號）：<code>550e8400e29b41d4a716446655440000</code></li>
              <li>大寫/小寫：改變 A-F 的字母大小寫</li>
            </ul>
          </div>
        </div>
      </ToolSection>
    </ToolPageWrapper>
  );
}
