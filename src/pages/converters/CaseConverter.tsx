import { useState } from 'react';
import ToolPageWrapper, {
  ToolSection,
  ToolButton,
  CopyButton,
} from '../../components/ToolPageWrapper';
import { Type, RefreshCw } from 'lucide-react';
import { convertCase, detectCase, type CaseType } from '../../utils/caseConverter';

const CASE_TYPES: { value: CaseType; label: string; example: string }[] = [
  { value: 'camelCase', label: 'camelCase', example: 'helloWorld' },
  { value: 'PascalCase', label: 'PascalCase', example: 'HelloWorld' },
  { value: 'snake_case', label: 'snake_case', example: 'hello_world' },
  { value: 'SCREAMING_SNAKE_CASE', label: 'SCREAMING_SNAKE_CASE', example: 'HELLO_WORLD' },
  { value: 'kebab-case', label: 'kebab-case', example: 'hello-world' },
  { value: 'SCREAMING-KEBAB-CASE', label: 'SCREAMING-KEBAB-CASE', example: 'HELLO-WORLD' },
  { value: 'Title Case', label: 'Title Case', example: 'Hello World' },
  { value: 'Sentence case', label: 'Sentence case', example: 'Hello world' },
  { value: 'lowercase', label: 'lowercase', example: 'hello world' },
  { value: 'UPPERCASE', label: 'UPPERCASE', example: 'HELLO WORLD' },
];

export default function CaseConverter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [selectedCase, setSelectedCase] = useState<CaseType>('camelCase');
  const [detectedCase, setDetectedCase] = useState<string>('');

  const handleConvert = () => {
    if (!input.trim()) {
      setOutput('');
      setDetectedCase('');
      return;
    }

    // Split input by lines and convert each line
    const lines = input.split('\n');
    const convertedLines = lines.map(line => {
      if (!line.trim()) return '';
      return convertCase(line.trim(), selectedCase);
    });
    
    setOutput(convertedLines.join('\n'));

    // Detect case from first non-empty line
    const firstNonEmptyLine = lines.find(line => line.trim());
    if (firstNonEmptyLine) {
      const detected = detectCase(firstNonEmptyLine.trim());
      setDetectedCase(detected);
    }
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
    setDetectedCase('');
  };

  const handleLoadSample = () => {
    setInput('hello_world_example\nuser_profile_data\napi_response_handler');
    setOutput('');
    setDetectedCase('');
  };

  const getCaseTypeInfo = (type: CaseType) => {
    return CASE_TYPES.find(c => c.value === type);
  };

  return (
    <ToolPageWrapper
      title="字串大小寫轉換"
      description="快速轉換字串為各種命名格式（支援多行文字批次轉換）"
      actions={
        <>
          <button
            onClick={handleLoadSample}
            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors flex items-center gap-2"
          >
            <Type size={16} />
            載入範例
          </button>
          <button
            onClick={handleClear}
            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors flex items-center gap-2"
          >
            <RefreshCw size={16} />
            清空
          </button>
          <ToolButton onClick={handleConvert}>轉換</ToolButton>
        </>
      }
    >
      {/* Input Section */}
      <ToolSection>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              輸入字串（支援多行）
            </label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="輸入要轉換的字串，支援多行輸入&#10;例如：&#10;hello_world&#10;user_profile_data&#10;api_response_handler"
              rows={8}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                       bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 font-mono
                       focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Case Type Selector */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              目標格式
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
              {CASE_TYPES.map((caseType) => (
                <button
                  key={caseType.value}
                  onClick={() => setSelectedCase(caseType.value)}
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors border ${
                    selectedCase === caseType.value
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <div className="font-semibold">{caseType.label}</div>
                  <div className="text-xs opacity-75 mt-0.5 font-mono">{caseType.example}</div>
                </button>
              ))}
            </div>
          </div>

          {detectedCase && (
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
              <p className="text-sm text-blue-800 dark:text-blue-300">
                <strong>偵測到的格式：</strong>
                <span className="ml-2 font-mono font-semibold">{detectedCase}</span>
              </p>
            </div>
          )}
        </div>
      </ToolSection>

      {/* Output Section */}
      {output && (
        <ToolSection title={`轉換結果 - ${getCaseTypeInfo(selectedCase)?.label}`}>
          <div className="space-y-3">
            <div className="relative">
              <textarea
                value={output}
                readOnly
                rows={8}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                         bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-mono
                         focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <div className="absolute top-2 right-2">
                <CopyButton text={output} />
              </div>
            </div>
            <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
              <span>
                共 {input.split('\n').filter(line => line.trim()).length} 行
              </span>
              <span>
                轉換為：<strong className="text-gray-900 dark:text-white font-mono ml-1">
                  {getCaseTypeInfo(selectedCase)?.label}
                </strong>
              </span>
            </div>
          </div>
        </ToolSection>
      )}

      {/* Info Section */}
      <ToolSection title="支援的命名格式">
        <div className="prose dark:prose-invert max-w-none">
          <div className="text-sm text-gray-600 dark:text-gray-400 space-y-4">
            <div>
              <p className="font-semibold text-gray-900 dark:text-white mb-2">程式設計常用格式</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>
                  <strong>camelCase</strong> - 駝峰式命名，首字母小寫（變數名、函式名）
                  <br />
                  <code className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded ml-6">
                    helloWorld, userName, getData
                  </code>
                </li>
                <li>
                  <strong>PascalCase</strong> - 帕斯卡命名，首字母大寫（類別名、元件名）
                  <br />
                  <code className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded ml-6">
                    HelloWorld, UserProfile, MyComponent
                  </code>
                </li>
                <li>
                  <strong>snake_case</strong> - 蛇形命名，小寫加底線（Python、Ruby）
                  <br />
                  <code className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded ml-6">
                    hello_world, user_name, get_data
                  </code>
                </li>
                <li>
                  <strong>SCREAMING_SNAKE_CASE</strong> - 大寫蛇形命名（常數）
                  <br />
                  <code className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded ml-6">
                    MAX_SIZE, API_KEY, DATABASE_URL
                  </code>
                </li>
                <li>
                  <strong>kebab-case</strong> - 烤肉串命名（URL、CSS class）
                  <br />
                  <code className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded ml-6">
                    hello-world, user-profile, my-component
                  </code>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-semibold text-gray-900 dark:text-white mb-2">其他格式</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>
                  <strong>Title Case</strong> - 標題格式，每個單字首字母大寫
                </li>
                <li>
                  <strong>Sentence case</strong> - 句子格式，僅首字母大寫
                </li>
                <li>
                  <strong>lowercase / UPPERCASE</strong> - 全小寫 / 全大寫
                </li>
              </ul>
            </div>

            <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
              <p className="text-sm text-green-800 dark:text-green-300">
                <strong>💡 提示：</strong>
                <ul className="mt-2 space-y-1 list-disc list-inside">
                  <li>支援多行批次轉換，每行獨立處理</li>
                  <li>自動偵測輸入格式並智慧轉換</li>
                  <li>選擇目標格式後點擊「轉換」按鈕</li>
                  <li>支援混合格式的智慧識別</li>
                </ul>
              </p>
            </div>
          </div>
        </div>
      </ToolSection>
    </ToolPageWrapper>
  );
}
