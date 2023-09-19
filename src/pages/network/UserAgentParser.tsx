import { useState, useCallback } from 'react';
import ToolPageWrapper, {
  ToolSection,
  ToolInput,
  ToolButton,
  CopyButton,
} from '../../components/ToolPageWrapper';
import { Smartphone, RefreshCw } from 'lucide-react';
import { parseUserAgent, getCurrentUserAgent } from '../../utils/userAgentParser';

const InfoCard = ({ label, value, icon }: { label: string; value: string; icon?: string }) => (
  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
    <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
      {icon && <span className="mr-1">{icon}</span>}
      {label}
    </div>
    <div className="text-lg font-semibold text-gray-900 dark:text-white">
      {value || '未知'}
    </div>
  </div>
);

export default function UserAgentParser() {
  const [input, setInput] = useState(() => getCurrentUserAgent());
  
  // Parse directly from input - no need for separate state
  const parsedInfo = input.trim() ? parseUserAgent(input) : null;

  const handleClear = useCallback(() => {
    setInput('');
  }, []);

  const loadCurrentUA = useCallback(() => {
    const currentUA = getCurrentUserAgent();
    setInput(currentUA);
  }, []);

  return (
    <ToolPageWrapper
      title="User-Agent 解析器"
      description="解析瀏覽器 User-Agent 字串，取得瀏覽器、作業系統等資訊"
      actions={
        <>
          <ToolButton onClick={loadCurrentUA} icon={<Smartphone size={16} />}>
            使用目前瀏覽器
          </ToolButton>
          <ToolButton onClick={handleClear} variant="secondary" icon={<RefreshCw size={16} />}>
            清空
          </ToolButton>
        </>
      }
    >
      <ToolSection title="User-Agent 字串">
        <ToolInput
          label="User-Agent"
          value={input}
          onChange={setInput}
          placeholder="貼上 User-Agent 字串或點擊「使用目前瀏覽器」"
          rows={3}
        />
      </ToolSection>

      {parsedInfo && (
        <>
          <ToolSection title="瀏覽器資訊">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <InfoCard label="瀏覽器" value={parsedInfo.browserName} icon="🌐" />
              <InfoCard label="版本" value={parsedInfo.browserVersion} icon="🔢" />
              <InfoCard label="渲染引擎" value={parsedInfo.engineName} icon="⚙️" />
              <InfoCard label="引擎版本" value={parsedInfo.engineVersion} icon="📦" />
            </div>
          </ToolSection>

          <ToolSection title="系統資訊">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <InfoCard label="作業系統" value={parsedInfo.osName} icon="💻" />
              <InfoCard label="系統版本" value={parsedInfo.osVersion} icon="🔧" />
              <InfoCard label="裝置類型" value={parsedInfo.deviceType} icon="📱" />
              <InfoCard label="平台" value={parsedInfo.platform} icon="🖥️" />
            </div>
          </ToolSection>

          <ToolSection title="原始 User-Agent">
            <div className="relative">
              <pre className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 font-mono text-xs break-all text-gray-900 dark:text-white">
                {input}
              </pre>
              <div className="absolute top-2 right-2">
                <CopyButton text={input} label="複製" />
              </div>
            </div>
          </ToolSection>
        </>
      )}

      <ToolSection>
        <div className="prose dark:prose-invert max-w-none">
          <h3 className="text-lg font-semibold mb-2">關於 User-Agent</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            User-Agent 是瀏覽器在發送 HTTP 請求時告訴伺服器的識別字串，
            包含瀏覽器類型、版本、作業系統等資訊。開發者可以用它來實現響應式設計或相容性處理。
          </p>
        </div>
      </ToolSection>
    </ToolPageWrapper>
  );
}
