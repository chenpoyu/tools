import { useState, useCallback, useMemo } from 'react';
import ToolPageWrapper, {
  ToolSection,
  ToolInput,
  ToolButton,
  CopyButton,
} from '../../components/ToolPageWrapper';
import { Shield, RefreshCw } from 'lucide-react';

interface CSPDirectives {
  defaultSrc: string;
  scriptSrc: string;
  styleSrc: string;
  imgSrc: string;
  fontSrc: string;
  connectSrc: string;
  mediaSrc: string;
  objectSrc: string;
  frameSrc: string;
}

export default function CspGenerator() {
  const [directives, setDirectives] = useState<CSPDirectives>({
    defaultSrc: "'self'",
    scriptSrc: "'self'",
    styleSrc: "'self'",
    imgSrc: "'self' data:",
    fontSrc: "'self'",
    connectSrc: "'self'",
    mediaSrc: "'self'",
    objectSrc: "'none'",
    frameSrc: "'none'",
  });

  const cspHeader = useMemo(() => {
    const parts: string[] = [];
    
    Object.entries(directives).forEach(([key, value]) => {
      if (value.trim()) {
        const directiveName = key.replace(/([A-Z])/g, '-$1').toLowerCase();
        parts.push(`${directiveName} ${value.trim()}`);
      }
    });

    return parts.join('; ');
  }, [directives]);

  const updateDirective = useCallback((key: keyof CSPDirectives, value: string) => {
    setDirectives((prev) => ({ ...prev, [key]: value }));
  }, []);

  const handleReset = useCallback(() => {
    setDirectives({
      defaultSrc: "'self'",
      scriptSrc: "'self'",
      styleSrc: "'self'",
      imgSrc: "'self' data:",
      fontSrc: "'self'",
      connectSrc: "'self'",
      mediaSrc: "'self'",
      objectSrc: "'none'",
      frameSrc: "'none'",
    });
  }, []);

  const loadPreset = useCallback((preset: string) => {
    switch (preset) {
      case 'strict':
        setDirectives({
          defaultSrc: "'none'",
          scriptSrc: "'self'",
          styleSrc: "'self'",
          imgSrc: "'self'",
          fontSrc: "'self'",
          connectSrc: "'self'",
          mediaSrc: "'none'",
          objectSrc: "'none'",
          frameSrc: "'none'",
        });
        break;
      case 'moderate':
        setDirectives({
          defaultSrc: "'self'",
          scriptSrc: "'self' 'unsafe-inline'",
          styleSrc: "'self' 'unsafe-inline'",
          imgSrc: "'self' data: https:",
          fontSrc: "'self' data:",
          connectSrc: "'self'",
          mediaSrc: "'self'",
          objectSrc: "'none'",
          frameSrc: "'self'",
        });
        break;
      case 'development':
        setDirectives({
          defaultSrc: "'self'",
          scriptSrc: "'self' 'unsafe-inline' 'unsafe-eval'",
          styleSrc: "'self' 'unsafe-inline'",
          imgSrc: "'self' data: blob: https:",
          fontSrc: "'self' data:",
          connectSrc: "'self' ws: wss:",
          mediaSrc: "'self'",
          objectSrc: "'self'",
          frameSrc: "'self'",
        });
        break;
    }
  }, []);

  return (
    <ToolPageWrapper
      title="CSP 產生器"
      description="產生 Content Security Policy 安全標頭"
      actions={
        <ToolButton onClick={handleReset} variant="secondary" icon={<RefreshCw size={16} />}>
          重設
        </ToolButton>
      }
    >
      <ToolSection title="安全等級預設">
        <div className="flex flex-wrap gap-2">
          <ToolButton onClick={() => loadPreset('strict')} icon={<Shield size={16} />}>
            嚴格模式
          </ToolButton>
          <ToolButton onClick={() => loadPreset('moderate')} icon={<Shield size={16} />}>
            一般模式
          </ToolButton>
          <ToolButton onClick={() => loadPreset('development')} icon={<Shield size={16} />}>
            開發模式
          </ToolButton>
        </div>
      </ToolSection>

      <ToolSection title="設定 CSP 指令">
        <div className="space-y-4">
          <ToolInput
            label="default-src"
            value={directives.defaultSrc}
            onChange={(value) => updateDirective('defaultSrc', value)}
            placeholder="例如: 'self' https:"
          />
          <ToolInput
            label="script-src"
            value={directives.scriptSrc}
            onChange={(value) => updateDirective('scriptSrc', value)}
            placeholder="例如: 'self' 'unsafe-inline'"
          />
          <ToolInput
            label="style-src"
            value={directives.styleSrc}
            onChange={(value) => updateDirective('styleSrc', value)}
            placeholder="例如: 'self' 'unsafe-inline'"
          />
          <ToolInput
            label="img-src"
            value={directives.imgSrc}
            onChange={(value) => updateDirective('imgSrc', value)}
            placeholder="例如: 'self' data: https:"
          />
          <ToolInput
            label="font-src"
            value={directives.fontSrc}
            onChange={(value) => updateDirective('fontSrc', value)}
            placeholder="例如: 'self' data:"
          />
          <ToolInput
            label="connect-src"
            value={directives.connectSrc}
            onChange={(value) => updateDirective('connectSrc', value)}
            placeholder="例如: 'self' https://api.example.com"
          />
          <ToolInput
            label="media-src"
            value={directives.mediaSrc}
            onChange={(value) => updateDirective('mediaSrc', value)}
            placeholder="例如: 'self' https://cdn.example.com"
          />
          <ToolInput
            label="object-src"
            value={directives.objectSrc}
            onChange={(value) => updateDirective('objectSrc', value)}
            placeholder="例如: 'none'"
          />
          <ToolInput
            label="frame-src"
            value={directives.frameSrc}
            onChange={(value) => updateDirective('frameSrc', value)}
            placeholder="例如: 'self' https://trusted.com"
          />
        </div>
      </ToolSection>

      <ToolSection title="產生的 CSP 標頭">
        <div className="space-y-4">
          <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm break-all">
            {cspHeader}
          </div>
          <CopyButton text={cspHeader} label="複製 CSP 標頭" />
        </div>
      </ToolSection>

      <ToolSection>
        <div className="prose dark:prose-invert max-w-none">
          <h3 className="text-lg font-semibold mb-2">CSP 說明</h3>
          <div className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
            <p>Content Security Policy (CSP) 是一個安全標準，用於防止 XSS 攻擊和資料注入攻擊。</p>
            <p className="mt-2">常用的來源值：</p>
            <ul className="list-disc list-inside space-y-1">
              <li><code className="text-blue-600 dark:text-blue-400">'self'</code> - 同源資源</li>
              <li><code className="text-blue-600 dark:text-blue-400">'none'</code> - 不允許任何來源</li>
              <li><code className="text-blue-600 dark:text-blue-400">'unsafe-inline'</code> - 允許內嵌腳本/樣式（不建議）</li>
              <li><code className="text-blue-600 dark:text-blue-400">'unsafe-eval'</code> - 允許 eval() 等動態程式碼執行（不建議）</li>
              <li><code className="text-blue-600 dark:text-blue-400">data:</code> - 允許 data: URI</li>
              <li><code className="text-blue-600 dark:text-blue-400">https:</code> - 允許所有 HTTPS 資源</li>
            </ul>
            <p className="mt-2">使用方式：</p>
            <ul className="list-disc list-inside space-y-1">
              <li>HTTP 標頭：<code>Content-Security-Policy: {'{CSP 值}'}</code></li>
              <li>HTML Meta 標籤：<code>&lt;meta http-equiv="Content-Security-Policy" content="{'{CSP 值}'}"&gt;</code></li>
            </ul>
          </div>
        </div>
      </ToolSection>
    </ToolPageWrapper>
  );
}
