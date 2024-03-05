import { useState, useCallback, useMemo } from 'react';
import ToolPageWrapper, {
  ToolSection,
  ToolInput,
  ToolButton,
} from '../../components/ToolPageWrapper';
import { Search, RefreshCw, Sparkles } from 'lucide-react';
import {
  testRegex,
  validateRegex,
  commonPatterns,
  type RegexMatch,
} from '../../utils/regexTester';

export default function RegexTester() {
  const [pattern, setPattern] = useState('');
  const [flags, setFlags] = useState('g');
  const [testText, setTestText] = useState('');
  const [matches, setMatches] = useState<RegexMatch[]>([]);
  const [error, setError] = useState('');

  const handleTest = useCallback(() => {
    const validation = validateRegex(pattern, flags);
    
    if (!validation.valid) {
      setError(validation.error || '');
      setMatches([]);
      return;
    }

    if (!testText) {
      setError('請輸入測試文字');
      setMatches([]);
      return;
    }

    try {
      const results = testRegex(pattern, flags, testText);
      setMatches(results);
      setError('');
    } catch (err) {
      setError(err instanceof Error ? err.message : '測試失敗');
      setMatches([]);
    }
  }, [pattern, flags, testText]);

  const handleClear = useCallback(() => {
    setPattern('');
    setFlags('g');
    setTestText('');
    setMatches([]);
    setError('');
  }, []);

  const loadPattern = useCallback((commonPattern: typeof commonPatterns[0]) => {
    setPattern(commonPattern.pattern);
    setFlags(commonPattern.flags);
  }, []);

  // Highlight matches in the text
  const highlightedText = useMemo(() => {
    if (matches.length === 0 || !testText) return testText;

    const parts: { text: string; isMatch: boolean }[] = [];
    let lastIndex = 0;

    matches.forEach((match) => {
      // Add text before match
      if (match.index > lastIndex) {
        parts.push({
          text: testText.slice(lastIndex, match.index),
          isMatch: false,
        });
      }
      
      // Add matched text
      parts.push({
        text: match.fullMatch,
        isMatch: true,
      });
      
      lastIndex = match.lastIndex;
    });

    // Add remaining text
    if (lastIndex < testText.length) {
      parts.push({
        text: testText.slice(lastIndex),
        isMatch: false,
      });
    }

    return parts;
  }, [matches, testText]);

  const flagOptions = [
    { value: 'g', label: 'global (全域搜尋)', description: '尋找所有匹配' },
    { value: 'i', label: 'ignoreCase (忽略大小寫)', description: '不區分大小寫' },
    { value: 'm', label: 'multiline (多行)', description: '^ 和 $ 匹配每行' },
    { value: 's', label: 'dotAll (點匹配所有)', description: '. 匹配換行符' },
  ];

  return (
    <ToolPageWrapper
      title="正則表達式測試器"
      description="測試和調試正則表達式，即時顯示匹配結果"
      actions={
        <>
          <ToolButton onClick={handleTest} icon={<Search size={16} />}>
            測試
          </ToolButton>
          <ToolButton onClick={handleClear} variant="secondary" icon={<RefreshCw size={16} />}>
            清空
          </ToolButton>
        </>
      }
    >
      {/* Regex Pattern Input */}
      <ToolSection title="正則表達式">
        <div className="space-y-3">
          <div className="flex gap-2">
            <div className="flex-shrink-0 flex items-center px-3 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-400 font-mono">
              /
            </div>
            <input
              type="text"
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              placeholder="輸入正則表達式 (例如：\d{3}-\d{4})"
              className="flex-1 p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-mono"
            />
            <div className="flex-shrink-0 flex items-center px-3 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-400 font-mono">
              /{flags}
            </div>
          </div>

          {/* Flags */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {flagOptions.map((option) => (
              <label
                key={option.value}
                className="flex items-center gap-2 p-2 border border-gray-300 dark:border-gray-600 rounded cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <input
                  type="checkbox"
                  checked={flags.includes(option.value)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setFlags(flags + option.value);
                    } else {
                      setFlags(flags.replace(option.value, ''));
                    }
                  }}
                  className="w-4 h-4 text-blue-600 rounded"
                />
                <div>
                  <div className="text-xs font-medium text-gray-800 dark:text-white">
                    {option.label}
                  </div>
                </div>
              </label>
            ))}
          </div>

          {error && (
            <div className="p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg text-sm">
              {error}
            </div>
          )}
        </div>
      </ToolSection>

      {/* Test Text */}
      <ToolSection title="測試文字">
        <ToolInput
          label="測試內容"
          value={testText}
          onChange={setTestText}
          placeholder="輸入要測試的文字..."
          rows={6}
        />
      </ToolSection>

      {/* Results */}
      {matches.length > 0 && (
        <>
          <ToolSection title={`匹配結果 (${matches.length} 個)`}>
            <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-300 dark:border-gray-600 font-mono text-sm whitespace-pre-wrap break-all">
              {Array.isArray(highlightedText) ? highlightedText.map((part, index) =>
                part.isMatch ? (
                  <mark
                    key={index}
                    className="bg-yellow-300 dark:bg-yellow-600 text-gray-900 dark:text-white px-1 rounded"
                  >
                    {part.text}
                  </mark>
                ) : (
                  <span key={index} className="text-gray-900 dark:text-white">
                    {part.text}
                  </span>
                )
              ) : <span className="text-gray-900 dark:text-white">{highlightedText}</span>}
            </div>
          </ToolSection>

          <ToolSection title="匹配詳情">
            <div className="space-y-3">
              {matches.map((match, index) => (
                <div
                  key={index}
                  className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-600"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded text-xs font-bold">
                      匹配 {index + 1}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      位置: {match.index} - {match.lastIndex}
                    </span>
                  </div>
                  <div className="font-mono text-sm bg-gray-50 dark:bg-gray-900 p-3 rounded border border-gray-200 dark:border-gray-700">
                    <div className="text-gray-900 dark:text-white mb-2">
                      完整匹配: <span className="text-green-600 dark:text-green-400 font-bold">{match.fullMatch}</span>
                    </div>
                    {match.groups.length > 0 && (
                      <div className="text-gray-700 dark:text-gray-300">
                        捕獲群組:
                        {match.groups.map((group, gIndex) => (
                          <div key={gIndex} className="ml-4 text-blue-600 dark:text-blue-400">
                            群組 {gIndex + 1}: {group || '(空)'}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </ToolSection>
        </>
      )}

      {/* Common Patterns */}
      <ToolSection title="常用正則表達式">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {commonPatterns.map((item) => (
            <button
              key={item.name}
              onClick={() => loadPattern(item)}
              className="p-3 text-left bg-white dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500 transition-colors group"
            >
              <div className="flex items-center gap-2 mb-1">
                <Sparkles
                  size={14}
                  className="text-gray-400 group-hover:text-blue-500 transition-colors"
                />
                <span className="text-sm font-semibold text-gray-800 dark:text-white">
                  {item.name}
                </span>
              </div>
              <div className="text-xs font-mono text-gray-600 dark:text-gray-400 break-all">
                /{item.pattern}/{item.flags}
              </div>
            </button>
          ))}
        </div>
      </ToolSection>

      <ToolSection>
        <div className="prose dark:prose-invert max-w-none">
          <h3 className="text-lg font-semibold mb-2">正則表達式語法參考</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-gray-600 dark:text-gray-400">
            <div>
              <h4 className="font-semibold text-gray-800 dark:text-white mb-2">字元類別</h4>
              <ul className="space-y-1 font-mono text-xs">
                <li>\d - 數字 [0-9]</li>
                <li>\w - 字母數字 [A-Za-z0-9_]</li>
                <li>\s - 空白字元</li>
                <li>. - 任意字元</li>
                <li>[abc] - a、b 或 c</li>
                <li>[^abc] - 非 a、b、c</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 dark:text-white mb-2">量詞</h4>
              <ul className="space-y-1 font-mono text-xs">
                <li>* - 0 次或多次</li>
                <li>+ - 1 次或多次</li>
                <li>? - 0 次或 1 次</li>
                <li>{'{n}'} - 剛好 n 次</li>
                <li>{'{n,}'} - 至少 n 次</li>
                <li>{'{n,m}'} - n 到 m 次</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 dark:text-white mb-2">錨點</h4>
              <ul className="space-y-1 font-mono text-xs">
                <li>^ - 字串開頭</li>
                <li>$ - 字串結尾</li>
                <li>\b - 單詞邊界</li>
                <li>\B - 非單詞邊界</li>
                <li>() - 捕獲群組</li>
                <li>| - 或</li>
              </ul>
            </div>
          </div>
        </div>
      </ToolSection>
    </ToolPageWrapper>
  );
}
