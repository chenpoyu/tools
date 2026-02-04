import { useState } from 'react';
import ToolPageWrapper, {
  ToolSection,
  ToolButton,
  CopyButton,
} from '../../components/ToolPageWrapper';
import { RefreshCw, Check, X, Info } from 'lucide-react';
import {
  generateTaiwanId,
  generateMultipleTaiwanIds,
  validateTaiwanId,
  parseTaiwanId,
  REGION_MAP,
  REGION_CODES,
} from '../../utils/taiwanIdGenerator';

export default function TaiwanIdGenerator() {
  const [idType, setIdType] = useState<'national' | 'resident'>('national');
  const [selectedRegion, setSelectedRegion] = useState<string>('');
  const [selectedGender, setSelectedGender] = useState<'male' | 'female' | ''>('');
  const [generatedId, setGeneratedId] = useState(() => generateTaiwanId({ type: 'national' }));
  const [batchCount, setBatchCount] = useState(10);
  const [batchIds, setBatchIds] = useState<string[]>([]);
  const [validationInput, setValidationInput] = useState('');
  const [validationResult, setValidationResult] = useState<{
    valid: boolean;
    message: string;
    type?: 'national' | 'resident';
  } | null>(null);
  const [parsedInfo, setParsedInfo] = useState<{
    region: string;
    gender?: string;
    type: 'national' | 'resident';
  } | null>(null);

  const handleGenerate = () => {
    const options = {
      region: selectedRegion || undefined,
      gender: idType === 'national' ? (selectedGender || undefined) : undefined,
      type: idType,
    };
    const newId = generateTaiwanId(options);
    setGeneratedId(newId);
  };

  const handleBatchGenerate = () => {
    const options = {
      region: selectedRegion || undefined,
      gender: idType === 'national' ? (selectedGender || undefined) : undefined,
      type: idType,
    };
    const ids = generateMultipleTaiwanIds(batchCount, options);
    setBatchIds(ids);
  };

  const handleValidate = () => {
    const input = validationInput.trim().toUpperCase();
    
    if (!input) {
      setValidationResult({
        valid: false,
        message: '請輸入證號',
      });
      setParsedInfo(null);
      return;
    }
    
    const result = validateTaiwanId(input);
    setValidationResult(result);

    if (result.valid) {
      const info = parseTaiwanId(input);
      setParsedInfo(info);
    } else {
      setParsedInfo(null);
    }
  };

  const handleValidationInputChange = (value: string) => {
    setValidationInput(value);
    if (!value.trim()) {
      setValidationResult(null);
      setParsedInfo(null);
    }
  };

  return (
    <ToolPageWrapper
      title="台灣身分證字號／居留證號產生器"
      description="產生有效的台灣身分證字號或外國人居留證號（僅供測試使用）並驗證證號格式"
    >
      {/* 警告訊息 */}
      <div className="mb-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
        <div className="flex items-start gap-2">
          <Info className="w-5 h-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-yellow-800 dark:text-yellow-300">
            <p className="font-semibold mb-1">⚠️ 重要提醒</p>
            <p>此工具產生的證號僅供開發測試使用，請勿用於任何非法用途。</p>
          </div>
        </div>
      </div>

      {/* 單一號碼產生器 */}
      <ToolSection title="產生證號">
        <div className="space-y-4">
          {/* 選項 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                證號類型
              </label>
              <select
                value={idType}
                onChange={(e) => {
                  setIdType(e.target.value as 'national' | 'resident');
                  if (e.target.value === 'resident') {
                    setSelectedGender(''); // 居留證不需要性別選項
                  }
                }}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                         bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
                         focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="national">身分證字號（本國人）</option>
                <option value="resident">居留證號（外國人）</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                地區代碼（可選）
              </label>
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                         bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
                         focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">隨機選擇</option>
                {REGION_CODES.map((code) => (
                  <option key={code} value={code}>
                    {code} - {REGION_MAP[code]}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {idType === 'national' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                性別（可選）
              </label>
              <select
                value={selectedGender}
                onChange={(e) => setSelectedGender(e.target.value as 'male' | 'female' | '')}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                         bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
                         focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">隨機選擇</option>
                <option value="male">男性</option>
                <option value="female">女性</option>
              </select>
            </div>
          )}

          {/* 產生按鈕 */}
          <ToolButton onClick={handleGenerate} icon={<RefreshCw className="w-4 h-4" />}>
            產生新號碼
          </ToolButton>

          {/* 顯示產生的號碼 */}
          <div className="relative">
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
              <code className="text-2xl font-mono font-bold text-blue-600 dark:text-blue-400">
                {generatedId}
              </code>
              <CopyButton text={generatedId} />
            </div>
            {parseTaiwanId(generatedId) && (
              <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                <span>地區：{parseTaiwanId(generatedId)?.region}</span>
                {parseTaiwanId(generatedId)?.type === 'national' && (
                  <span> | 性別：{parseTaiwanId(generatedId)?.gender}</span>
                )}
                <span className="ml-2 text-xs text-gray-500">
                  （{parseTaiwanId(generatedId)?.type === 'national' ? '本國人身分證' : '外國人居留證'}）
                </span>
              </div>
            )}
          </div>
        </div>
      </ToolSection>

      {/* 批次產生 */}
      <ToolSection title="批次產生">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              產生數量
            </label>
            <input
              type="number"
              min="1"
              max="100"
              value={batchCount}
              onChange={(e) => setBatchCount(Math.max(1, Math.min(100, parseInt(e.target.value) || 10)))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                       bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
                       focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <ToolButton onClick={handleBatchGenerate} icon={<RefreshCw className="w-4 h-4" />}>
            批次產生
          </ToolButton>

          {batchIds.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  已產生 {batchIds.length} 個號碼
                </span>
                <CopyButton text={batchIds.join('\n')} />
              </div>
              <div className="max-h-96 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {batchIds.map((id, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-600"
                    >
                      <code className="font-mono text-sm text-gray-900 dark:text-gray-100">{id}</code>
                      <CopyButton text={id} label="" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </ToolSection>

      {/* 驗證器 */}
      <ToolSection title="驗證證號">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              輸入身分證字號或居留證號
            </label>
            <input
              type="text"
              value={validationInput}
              onChange={(e) => handleValidationInputChange(e.target.value.toUpperCase())}
              onKeyDown={(e) => e.key === 'Enter' && handleValidate()}
              placeholder="例如：A123456789 或 AA12345678"
              maxLength={10}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                       bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
                       focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono"
            />
          </div>

          <ToolButton onClick={handleValidate} icon={<Check className="w-4 h-4" />}>
            驗證
          </ToolButton>

          {validationResult && (
            <div
              className={`p-4 rounded-lg border ${
                validationResult.valid
                  ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                  : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
              }`}
            >
              <div className="flex items-start gap-3">
                {validationResult.valid ? (
                  <Check className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                ) : (
                  <X className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                )}
                <div className="flex-1">
                  <p
                    className={`font-medium ${
                      validationResult.valid
                        ? 'text-green-800 dark:text-green-300'
                        : 'text-red-800 dark:text-red-300'
                    }`}
                  >
                    {validationResult.message}
                  </p>
                  {parsedInfo && (
                    <div className="mt-2 space-y-1 text-sm text-green-700 dark:text-green-400">
                      <p>• 類型：{parsedInfo.type === 'national' ? '本國人身分證' : '外國人居留證'}</p>
                      <p>• 地區：{parsedInfo.region}</p>
                      {parsedInfo.gender && <p>• 性別：{parsedInfo.gender}</p>}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </ToolSection>

      {/* 說明 */}
      <ToolSection title="格式說明">
        <div className="prose dark:prose-invert max-w-none">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                台灣身分證字號（本國人）
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-2">
                共 10 碼，格式規則：
              </p>
              <ul className="text-gray-600 dark:text-gray-400 list-disc list-inside space-y-1">
                <li>第 1 碼：英文字母，代表出生地區或初次申報戶籍地</li>
                <li>第 2 碼：性別碼（1 為男性，2 為女性）</li>
                <li>第 3-9 碼：流水號碼</li>
                <li>第 10 碼：檢查碼</li>
              </ul>
              <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                範例：A123456789
              </p>
            </div>

            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                外國人居留證號（新式統一證號）
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-2">
                共 10 碼，格式規則：
              </p>
              <ul className="text-gray-600 dark:text-gray-400 list-disc list-inside space-y-1">
                <li>第 1 碼：英文字母，代表地區</li>
                <li>第 2 碼：英文字母（A、B、C 或 D），不代表性別</li>
                <li>第 3-9 碼：流水號碼</li>
                <li>第 10 碼：檢查碼</li>
              </ul>
              <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                範例：AA12345678
              </p>
            </div>
          </div>
        </div>
      </ToolSection>
    </ToolPageWrapper>
  );
}
