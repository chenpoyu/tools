import { useState, useCallback, useEffect } from 'react';
import ToolPageWrapper, {
  ToolSection,
  ToolButton,
  CopyButton,
} from '../../components/ToolPageWrapper';
import { Globe, MapPin, Search, RefreshCw } from 'lucide-react';
import { fetchIpInfo, lookupIp, isValidIp } from '../../utils/ipLookup';
import type { IpInfo } from '../../utils/ipLookup';

const InfoCard = ({ 
  label, 
  value, 
  icon 
}: { 
  label: string; 
  value?: string; 
  icon?: React.ReactNode 
}) => (
  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
    <div className="flex items-center text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
      {icon && <span className="mr-1.5">{icon}</span>}
      {label}
    </div>
    <div className="text-lg font-semibold text-gray-900 dark:text-white break-all">
      {value || '未知'}
    </div>
  </div>
);

export default function IpLookup() {
  const [input, setInput] = useState('');
  const [currentIpInfo, setCurrentIpInfo] = useState<IpInfo | null>(null);
  const [lookupInfo, setLookupInfo] = useState<IpInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [lookupLoading, setLookupLoading] = useState(false);
  const [error, setError] = useState('');

  // Load current IP on component mount
  useEffect(() => {
    loadCurrentIp();
  }, []);

  const loadCurrentIp = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const info = await fetchIpInfo();
      setCurrentIpInfo(info);
    } catch (err) {
      setError(err instanceof Error ? err.message : '無法取得 IP 資訊');
    } finally {
      setLoading(false);
    }
  }, []);

  const handleLookup = useCallback(async () => {
    const trimmedInput = input.trim();
    
    if (!trimmedInput) {
      setError('請輸入 IP 地址');
      return;
    }

    if (!isValidIp(trimmedInput)) {
      setError('無效的 IP 地址格式');
      return;
    }

    setLookupLoading(true);
    setError('');
    setLookupInfo(null);
    
    try {
      const info = await lookupIp(trimmedInput);
      setLookupInfo(info);
    } catch (err) {
      setError(err instanceof Error ? err.message : '查詢失敗');
    } finally {
      setLookupLoading(false);
    }
  }, [input]);

  const handleClear = useCallback(() => {
    setInput('');
    setLookupInfo(null);
    setError('');
  }, []);

  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleLookup();
    }
  }, [handleLookup]);

  return (
    <ToolPageWrapper
      title="IP 地址查詢"
      description="查詢 IP 地址的地理位置和詳細資訊"
      actions={
        <>
          <ToolButton 
            onClick={loadCurrentIp} 
            icon={<RefreshCw size={16} />}
            disabled={loading}
          >
            {loading ? '載入中...' : '重新載入'}
          </ToolButton>
        </>
      }
    >
      {/* Current IP Section */}
      <ToolSection title="我的 IP 地址">
        {loading ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            載入中...
          </div>
        ) : currentIpInfo ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">您的 IP 地址</div>
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {currentIpInfo.ip}
                </div>
              </div>
              <CopyButton text={currentIpInfo.ip} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <InfoCard 
                label="國家/地區" 
                value={currentIpInfo.country}
                icon={<Globe size={14} />}
              />
              <InfoCard 
                label="城市" 
                value={currentIpInfo.city}
                icon={<MapPin size={14} />}
              />
              <InfoCard 
                label="地區" 
                value={currentIpInfo.region}
              />
              <InfoCard 
                label="ISP/組織" 
                value={currentIpInfo.org}
              />
              <InfoCard 
                label="時區" 
                value={currentIpInfo.timezone}
              />
              <InfoCard 
                label="郵遞區號" 
                value={currentIpInfo.postal}
              />
              {currentIpInfo.loc && (
                <InfoCard 
                  label="座標" 
                  value={currentIpInfo.loc}
                />
              )}
            </div>
          </div>
        ) : (
          <div className="text-center py-8 text-red-500">
            {error || '無法取得 IP 資訊'}
          </div>
        )}
      </ToolSection>

      {/* Lookup Section */}
      <ToolSection title="查詢其他 IP">
        <div className="space-y-4">
          <div className="flex gap-2">
            <div className="flex-1">
              <input
                type="text"
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  setError('');
                }}
                onKeyPress={handleKeyPress}
                placeholder="輸入 IP 地址 (例如: 8.8.8.8)"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <ToolButton 
              onClick={handleLookup}
              icon={<Search size={16} />}
              disabled={lookupLoading}
            >
              查詢
            </ToolButton>
            <ToolButton 
              onClick={handleClear}
              variant="secondary"
              icon={<RefreshCw size={16} />}
            >
              清空
            </ToolButton>
          </div>

          {error && (
            <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg border border-red-200 dark:border-red-800">
              {error}
            </div>
          )}

          {lookupLoading && (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              查詢中...
            </div>
          )}

          {lookupInfo && !lookupLoading && (
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                <div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">查詢結果</div>
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {lookupInfo.ip}
                  </div>
                </div>
                <CopyButton text={lookupInfo.ip} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <InfoCard 
                  label="國家/地區" 
                  value={lookupInfo.country}
                  icon={<Globe size={14} />}
                />
                <InfoCard 
                  label="城市" 
                  value={lookupInfo.city}
                  icon={<MapPin size={14} />}
                />
                <InfoCard 
                  label="地區" 
                  value={lookupInfo.region}
                />
                <InfoCard 
                  label="ISP/組織" 
                  value={lookupInfo.org}
                />
                <InfoCard 
                  label="時區" 
                  value={lookupInfo.timezone}
                />
                <InfoCard 
                  label="郵遞區號" 
                  value={lookupInfo.postal}
                />
                {lookupInfo.loc && (
                  <InfoCard 
                    label="座標" 
                    value={lookupInfo.loc}
                  />
                )}
              </div>
            </div>
          )}
        </div>
      </ToolSection>
    </ToolPageWrapper>
  );
}
