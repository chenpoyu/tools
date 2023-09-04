import { useState, useCallback } from 'react';
import ToolPageWrapper, {
  ToolSection,
  ToolButton,
} from '../../components/ToolPageWrapper';
import { Network, RefreshCw } from 'lucide-react';
import { calculateCIDR } from '../../utils/cidrCalculator';

const InfoRow = ({ label, value }: { label: string; value: string | number }) => (
  <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700 last:border-0">
    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">{label}</span>
    <span className="font-mono text-sm font-semibold text-gray-900 dark:text-white">
      {value}
    </span>
  </div>
);

export default function CidrCalculator() {
  const [ipAddress, setIpAddress] = useState('');
  const [cidr, setCidr] = useState('24');
  const [result, setResult] = useState<ReturnType<typeof calculateCIDR> | null>(null);
  const [error, setError] = useState('');

  const handleCalculate = useCallback(() => {
    const cidrNum = parseInt(cidr);
    
    if (!ipAddress.trim()) {
      setError('請輸入 IP 位址');
      setResult(null);
      return;
    }

    try {
      const info = calculateCIDR(ipAddress.trim(), cidrNum);
      setResult(info);
      setError('');
    } catch (err) {
      setError(err instanceof Error ? err.message : '計算失敗');
      setResult(null);
    }
  }, [ipAddress, cidr]);

  const handleClear = useCallback(() => {
    setIpAddress('');
    setCidr('24');
    setResult(null);
    setError('');
  }, []);

  const loadSample = useCallback(() => {
    setIpAddress('192.168.1.100');
    setCidr('24');
  }, []);

  return (
    <ToolPageWrapper
      title="IP CIDR 計算器"
      description="計算網路位址、廣播位址、子網路遮罩等資訊"
      actions={
        <>
          <ToolButton onClick={handleCalculate} icon={<Network size={16} />}>
            計算
          </ToolButton>
          <ToolButton onClick={loadSample} variant="secondary">
            載入範例
          </ToolButton>
          <ToolButton onClick={handleClear} variant="secondary" icon={<RefreshCw size={16} />}>
            清空
          </ToolButton>
        </>
      }
    >
      <ToolSection title="輸入 IP 位址與 CIDR">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="input-label">IP 位址</label>
            <input
              type="text"
              value={ipAddress}
              onChange={(e) => setIpAddress(e.target.value)}
              placeholder="例如：192.168.1.1"
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-mono"
            />
          </div>
          <div>
            <label className="input-label">CIDR 前綴長度 (/{cidr})</label>
            <input
              type="range"
              min="0"
              max="32"
              value={cidr}
              onChange={(e) => setCidr(e.target.value)}
              className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-600 mt-3"
            />
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
              <span>0</span>
              <span className="font-bold text-blue-600 dark:text-blue-400">{cidr}</span>
              <span>32</span>
            </div>
          </div>
        </div>
        {error && (
          <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg text-sm">
            {error}
          </div>
        )}
      </ToolSection>

      {result && (
        <>
          <ToolSection title="網路資訊">
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-600 divide-y divide-gray-200 dark:divide-gray-700">
              <InfoRow label="CIDR 表示法" value={result.cidrNotation} />
              <InfoRow label="IP 類別" value={result.ipClass} />
              <InfoRow label="子網路遮罩" value={result.subnetMask} />
              <InfoRow label="萬用字元遮罩" value={result.wildcardMask} />
            </div>
          </ToolSection>

          <ToolSection title="位址範圍">
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-600 divide-y divide-gray-200 dark:divide-gray-700">
              <InfoRow label="網路位址" value={result.networkAddress} />
              <InfoRow label="廣播位址" value={result.broadcastAddress} />
              <InfoRow label="第一個可用 IP" value={result.firstUsableIP} />
              <InfoRow label="最後一個可用 IP" value={result.lastUsableIP} />
            </div>
          </ToolSection>

          <ToolSection title="主機數量">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800 text-center">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                  {result.totalHosts.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">總主機數</div>
              </div>
              <div className="p-6 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800 text-center">
                <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                  {result.usableHosts.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">可用主機數</div>
              </div>
            </div>
          </ToolSection>
        </>
      )}

      <ToolSection>
        <div className="prose dark:prose-invert max-w-none">
          <h3 className="text-lg font-semibold mb-2">CIDR 常用參考</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
            {[
              { cidr: '/8', hosts: '16,777,216', mask: '255.0.0.0' },
              { cidr: '/16', hosts: '65,536', mask: '255.255.0.0' },
              { cidr: '/24', hosts: '256', mask: '255.255.255.0' },
              { cidr: '/25', hosts: '128', mask: '255.255.255.128' },
              { cidr: '/26', hosts: '64', mask: '255.255.255.192' },
              { cidr: '/27', hosts: '32', mask: '255.255.255.224' },
              { cidr: '/28', hosts: '16', mask: '255.255.255.240' },
              { cidr: '/32', hosts: '1', mask: '255.255.255.255' },
            ].map((item) => (
              <div
                key={item.cidr}
                className="p-2 bg-gray-100 dark:bg-gray-800 rounded border border-gray-300 dark:border-gray-600"
              >
                <div className="font-bold text-blue-600 dark:text-blue-400">{item.cidr}</div>
                <div className="text-gray-600 dark:text-gray-400">{item.hosts} 主機</div>
              </div>
            ))}
          </div>
        </div>
      </ToolSection>
    </ToolPageWrapper>
  );
}
