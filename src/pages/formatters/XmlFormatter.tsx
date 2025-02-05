import { useState, useCallback } from 'react';
import ToolPageWrapper, {
  ToolSection,
  ToolInput,
  ToolButton,
  TwoColumnLayout,
  CopyButton,
} from '../../components/ToolPageWrapper';
import { FileCode, RefreshCw } from 'lucide-react';

/**
 * Prettify XML with indentation
 */
function prettifyXML(xml: string, indent: number = 2): string {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xml, 'text/xml');

  // Check for parsing errors
  const parserError = xmlDoc.querySelector('parsererror');
  if (parserError) {
    throw new Error('無效的 XML 格式');
  }

  const serializer = new XMLSerializer();
  const serialized = serializer.serializeToString(xmlDoc);

  // Add indentation
  let formatted = '';
  let level = 0;
  const lines = serialized.split(/>\s*</);

  lines.forEach((line, index) => {
    if (index > 0) {
      formatted += '<';
    }

    // Self-closing or closing tag
    if (line.match(/^\/\w/) || line.match(/\/$/)) {
      level = Math.max(0, level - 1);
    }

    formatted += ' '.repeat(level * indent) + line;

    // Opening tag (not self-closing)
    if (line.match(/^<?\w[^>]*[^\/]$/) && !line.startsWith('?')) {
      level++;
    }

    if (index < lines.length - 1) {
      formatted += '>\n';
    } else {
      formatted += '>';
    }
  });

  return formatted;
}

/**
 * Minify XML by removing whitespace
 */
function minifyXML(xml: string): string {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xml, 'text/xml');

  // Check for parsing errors
  const parserError = xmlDoc.querySelector('parsererror');
  if (parserError) {
    throw new Error('無效的 XML 格式');
  }

  const serializer = new XMLSerializer();
  return serializer
    .serializeToString(xmlDoc)
    .replace(/>\s+</g, '><')
    .trim();
}

export default function XmlFormatter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const handlePrettify = useCallback(() => {
    if (!input.trim()) {
      setOutput('');
      setError('');
      return;
    }

    try {
      const formatted = prettifyXML(input);
      setOutput(formatted);
      setError('');
    } catch (err) {
      setError(err instanceof Error ? err.message : '格式化失敗');
      setOutput('');
    }
  }, [input]);

  const handleMinify = useCallback(() => {
    if (!input.trim()) {
      setOutput('');
      setError('');
      return;
    }

    try {
      const minified = minifyXML(input);
      setOutput(minified);
      setError('');
    } catch (err) {
      setError(err instanceof Error ? err.message : '壓縮失敗');
      setOutput('');
    }
  }, [input]);

  const handleClear = useCallback(() => {
    setInput('');
    setOutput('');
    setError('');
  }, []);

  const loadSample = useCallback(() => {
    setInput(
      `<?xml version="1.0" encoding="UTF-8"?><root><user id="1"><name>張三</name><email>zhang@example.com</email><roles><role>admin</role><role>user</role></roles></user><user id="2"><name>李四</name><email>li@example.com</email><roles><role>user</role></roles></user></root>`
    );
  }, []);

  return (
    <ToolPageWrapper
      title="XML 格式化工具"
      description="格式化與美化 XML 文件"
      actions={
        <>
          <ToolButton onClick={loadSample} icon={<FileCode size={16} />}>
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
        <ToolSection title="輸入 XML">
          <ToolInput
            label="原始 XML"
            value={input}
            onChange={setInput}
            placeholder="輸入要格式化的 XML..."
            rows={12}
            monospace
          />
          <div className="mt-3 flex gap-2">
            <ToolButton onClick={handlePrettify}>格式化</ToolButton>
            <ToolButton onClick={handleMinify} variant="secondary">
              壓縮
            </ToolButton>
          </div>
        </ToolSection>

        <ToolSection title="格式化結果">
          <ToolInput
            label="輸出 XML"
            value={output}
            onChange={setOutput}
            placeholder="格式化後的 XML 將顯示在這裡..."
            rows={12}
            monospace
            readOnly
          />
          <div className="mt-3">
            <CopyButton text={output} label="複製結果" />
          </div>
        </ToolSection>
      </TwoColumnLayout>

      <ToolSection>
        <div className="prose dark:prose-invert max-w-none">
          <h3 className="text-lg font-semibold mb-2">功能說明</h3>
          <div className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
            <p><strong>格式化：</strong></p>
            <ul className="list-disc list-inside space-y-1">
              <li>自動縮排 XML 標籤</li>
              <li>每個標籤單獨一行</li>
              <li>使用 2 個空格縮排</li>
              <li>保留原始標籤結構和屬性</li>
            </ul>
            <p className="mt-2"><strong>壓縮：</strong></p>
            <ul className="list-disc list-inside space-y-1">
              <li>移除所有不必要的空白</li>
              <li>移除換行符號</li>
              <li>減少檔案大小</li>
              <li>適合網路傳輸</li>
            </ul>
            <p className="mt-2"><strong>錯誤處理：</strong></p>
            <ul className="list-disc list-inside space-y-1">
              <li>自動檢測無效的 XML 格式</li>
              <li>顯示解析錯誤訊息</li>
              <li>支援 UTF-8 編碼</li>
            </ul>
          </div>
        </div>
      </ToolSection>
    </ToolPageWrapper>
  );
}
