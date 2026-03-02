import { useCallback, useEffect, useMemo, useState } from 'react';
import mermaid from 'mermaid';
import { Eye, RefreshCw } from 'lucide-react';
import ToolPageWrapper, {
  CopyButton,
  ToolButton,
  ToolSection,
  TwoColumnLayout,
} from '../../components/ToolPageWrapper';

const SAMPLE_DIAGRAM = `flowchart TD
  A[使用者輸入 Mermaid] --> B{語法正確?}
  B -- 是 --> C[渲染 SVG 預覽]
  B -- 否 --> D[顯示錯誤訊息]
  C --> E[可複製原始碼]
  D --> F[修正後重新渲染]`;

const DEFAULT_DIAGRAM = `graph LR
  Start --> Build
  Build --> Test
  Test --> Deploy`;

function getErrorMessage(error: unknown): string {
  if (error instanceof Error && error.message) {
    return error.message;
  }

  if (typeof error === 'string') {
    return error;
  }

  return '渲染失敗，請檢查 Mermaid 語法。';
}

export default function MermaidPreviewer() {
  const [code, setCode] = useState(DEFAULT_DIAGRAM);
  const [svg, setSvg] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      securityLevel: 'strict',
      theme: 'default',
    });
  }, []);

  const renderDiagram = useCallback(async (source: string) => {
    const trimmedCode = source.trim();

    if (!trimmedCode) {
      setSvg('');
      setError('');
      return;
    }

    try {
      const elementId = `mermaid-preview-${Date.now()}`;
      const { svg: renderedSvg } = await mermaid.render(elementId, trimmedCode);
      setSvg(renderedSvg);
      setError('');
    } catch (renderError) {
      setSvg('');
      setError(getErrorMessage(renderError));
    }
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      renderDiagram(code);
    }, 250);

    return () => window.clearTimeout(timer);
  }, [code, renderDiagram]);

  const previewContent = useMemo(() => {
    if (!code.trim()) {
      return <p className="text-gray-400 dark:text-gray-500">預覽將顯示在這裡...</p>;
    }

    if (error) {
      return (
        <div className="p-3 rounded border border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 text-sm whitespace-pre-wrap break-words">
          {error}
        </div>
      );
    }

    if (!svg) {
      return <p className="text-gray-400 dark:text-gray-500">正在渲染圖表...</p>;
    }

    return (
      <div
        className="mermaid-svg-container overflow-auto rounded bg-white p-2"
        dangerouslySetInnerHTML={{ __html: svg }}
      />
    );
  }, [code, error, svg]);

  return (
    <ToolPageWrapper
      title="Mermaid 預覽器"
      description="即時編輯並預覽 Mermaid 流程圖、序列圖與更多圖表"
      actions={
        <>
          <ToolButton onClick={() => setCode(SAMPLE_DIAGRAM)} icon={<Eye size={16} />}>
            載入範例
          </ToolButton>
          <ToolButton onClick={() => setCode('')} variant="secondary" icon={<RefreshCw size={16} />}>
            清空
          </ToolButton>
          <CopyButton text={code} label="複製 Mermaid" />
          <CopyButton text={svg} label="複製 SVG" />
        </>
      }
    >
      <TwoColumnLayout
        left={
          <ToolSection title="Mermaid 語法">
            <textarea
              value={code}
              onChange={(event) => setCode(event.target.value)}
              placeholder="在此輸入 Mermaid 程式碼..."
              className="tool-textarea min-h-[520px] resize-y font-mono text-sm"
            />
          </ToolSection>
        }
        right={
          <ToolSection title="即時預覽">
            <div className="min-h-[520px] bg-gray-50 dark:bg-gray-900/30 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
              {previewContent}
            </div>
          </ToolSection>
        }
      />

      <ToolSection title="常用語法範例">
        <div className="text-sm text-gray-600 dark:text-gray-400 grid grid-cols-1 md:grid-cols-2 gap-3">
          <div><code>flowchart TD</code>：流程圖</div>
          <div><code>sequenceDiagram</code>：序列圖</div>
          <div><code>classDiagram</code>：類別圖</div>
          <div><code>stateDiagram-v2</code>：狀態圖</div>
          <div><code>erDiagram</code>：ER 圖</div>
          <div><code>gantt</code>：甘特圖</div>
        </div>
      </ToolSection>
    </ToolPageWrapper>
  );
}
