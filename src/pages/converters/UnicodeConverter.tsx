import { useState, useCallback } from 'react';
import ToolPageWrapper, {
  ToolSection,
  ToolInput,
  ToolButton,
  TwoColumnLayout,
  CopyButton,
} from '../../components/ToolPageWrapper';
import { Code2, RefreshCw } from 'lucide-react';
import { stringToUnicode, unicodeToString } from '../../utils/unicodeConverter';

export default function UnicodeConverter() {
  const [text, setText] = useState('');
  const [unicode, setUnicode] = useState('');
  const [error, setError] = useState('');

  const handleTextToUnicode = useCallback(() => {
    if (!text) {
      setUnicode('');
      return;
    }
    const converted = stringToUnicode(text);
    setUnicode(converted);
    setError('');
  }, [text]);

  const handleUnicodeToText = useCallback(() => {
    if (!unicode) {
      setText('');
      return;
    }
    try {
      const converted = unicodeToString(unicode);
      setText(converted);
      setError('');
    } catch (err) {
      setError(err instanceof Error ? err.message : '轉換失敗');
    }
  }, [unicode]);

  const handleClear = useCallback(() => {
    setText('');
    setUnicode('');
    setError('');
  }, []);

  const loadSample = useCallback(() => {
    setText('你好，世界！🌍');
  }, []);

  return (
    <ToolPageWrapper
      title="Unicode 轉換器"
      description="在文字與 Unicode 編碼（\\uXXXX）之間轉換"
      actions={
        <>
          <ToolButton onClick={loadSample} icon={<Code2 size={16} />}>
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

      <TwoColumnLayout>
        <ToolSection title="文字">
          <ToolInput
            label="輸入文字"
            value={text}
            onChange={setText}
            placeholder="輸入要轉換為 Unicode 的文字..."
            rows={8}
          />
          <div className="mt-3 flex gap-2">
            <ToolButton onClick={handleTextToUnicode}>轉換為 Unicode →</ToolButton>
            <CopyButton text={text} label="複製" />
          </div>
        </ToolSection>

        <ToolSection title="Unicode">
          <ToolInput
            label="Unicode 編碼"
            value={unicode}
            onChange={setUnicode}
            placeholder="輸入 Unicode 編碼（例如：\\u4F60\\u597D）..."
            rows={8}
          />
          <div className="mt-3 flex gap-2">
            <ToolButton onClick={handleUnicodeToText}>← 轉換為文字</ToolButton>
            <CopyButton text={unicode} label="複製" />
          </div>
        </ToolSection>
      </TwoColumnLayout>

      <ToolSection>
        <div className="prose dark:prose-invert max-w-none">
          <h3 className="text-lg font-semibold mb-2">Unicode 說明</h3>
          <div className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
            <p>
              Unicode 是一種國際字元編碼標準，可以表示世界上幾乎所有的文字系統。
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>格式：<code className="text-blue-600 dark:text-blue-400">\\uXXXX</code>（四位十六進位數字）</li>
              <li>範例：<code className="text-blue-600 dark:text-blue-400">\\u4F60</code> = 你</li>
              <li>範例：<code className="text-blue-600 dark:text-blue-400">\\u597D</code> = 好</li>
              <li>常用於 JavaScript、JSON、Java 等程式語言中</li>
              <li>ASCII 字元（0-127）通常不需要轉換</li>
            </ul>
          </div>
        </div>
      </ToolSection>
    </ToolPageWrapper>
  );
}
