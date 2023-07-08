import { useState, useCallback } from 'react';
import ToolPageWrapper, {
  ToolSection,
  ToolInput,
  ToolButton,
  CopyButton,
} from '../../components/ToolPageWrapper';
import { KeyRound, RefreshCw } from 'lucide-react';
import { decodeJWT, parseJWTTimestamps } from '../../utils/jwtDecoder';

export default function JwtDecoder() {
  const [input, setInput] = useState('');
  const [header, setHeader] = useState('');
  const [payload, setPayload] = useState('');
  const [signature, setSignature] = useState('');
  const [timestamps, setTimestamps] = useState<{
    iat?: string;
    exp?: string;
    nbf?: string;
  }>({});
  const [error, setError] = useState('');

  const handleDecode = useCallback(() => {
    if (!input.trim()) {
      setHeader('');
      setPayload('');
      setSignature('');
      setTimestamps({});
      setError('');
      return;
    }

    try {
      const decoded = decodeJWT(input.trim());
      setHeader(JSON.stringify(decoded.header, null, 2));
      setPayload(JSON.stringify(decoded.payload, null, 2));
      setSignature(decoded.signature);
      setTimestamps(parseJWTTimestamps(decoded.payload));
      setError('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'JWT 解碼失敗');
      setHeader('');
      setPayload('');
      setSignature('');
      setTimestamps({});
    }
  }, [input]);

  const handleClear = useCallback(() => {
    setInput('');
    setHeader('');
    setPayload('');
    setSignature('');
    setTimestamps({});
    setError('');
  }, []);

  const loadSample = useCallback(() => {
    const sampleJWT =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjE3Mzc4MTY2MjJ9.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
    setInput(sampleJWT);
  }, []);

  return (
    <ToolPageWrapper
      title="JWT 解碼器"
      description="解析 JSON Web Token 的 Header、Payload 和 Signature"
      actions={
        <>
          <ToolButton onClick={handleDecode} icon={<KeyRound size={16} />}>
            解碼 JWT
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
      <ToolSection title="JWT Token">
        <ToolInput
          label="JWT Token"
          value={input}
          onChange={setInput}
          placeholder="貼上 JWT Token（格式：header.payload.signature）"
          rows={3}
        />
        {error && (
          <div className="mt-2 p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg text-sm">
            {error}
          </div>
        )}
      </ToolSection>

      {/* Three Column Layout for Header, Payload, Signature */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ToolSection title="Header">
          <div className="relative">
            <pre className="tool-textarea min-h-[200px] text-xs">{header || '等待解碼...'}</pre>
            {header && (
              <div className="absolute top-2 right-2">
                <CopyButton text={header} label="複製" />
              </div>
            )}
          </div>
        </ToolSection>

        <ToolSection title="Payload">
          <div className="relative">
            <pre className="tool-textarea min-h-[200px] text-xs">{payload || '等待解碼...'}</pre>
            {payload && (
              <div className="absolute top-2 right-2">
                <CopyButton text={payload} label="複製" />
              </div>
            )}
          </div>
        </ToolSection>

        <ToolSection title="Signature">
          <div className="relative">
            <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded border border-gray-200 dark:border-gray-700 font-mono text-xs break-all min-h-[200px] text-gray-900 dark:text-white">
              {signature || '等待解碼...'}
            </div>
            {signature && (
              <div className="absolute top-2 right-2">
                <CopyButton text={signature} label="複製" />
              </div>
            )}
          </div>
        </ToolSection>
      </div>

      {/* Timestamp Information */}
      {(timestamps.iat || timestamps.exp || timestamps.nbf) && (
        <ToolSection title="時間戳記資訊">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {timestamps.iat && (
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <div className="text-xs font-medium text-blue-600 dark:text-blue-400 mb-1">
                  Issued At (iat)
                </div>
                <div className="text-sm text-gray-800 dark:text-white">{timestamps.iat}</div>
              </div>
            )}
            {timestamps.exp && (
              <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
                <div className="text-xs font-medium text-orange-600 dark:text-orange-400 mb-1">
                  Expires (exp)
                </div>
                <div className="text-sm text-gray-800 dark:text-white">{timestamps.exp}</div>
              </div>
            )}
            {timestamps.nbf && (
              <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
                <div className="text-xs font-medium text-purple-600 dark:text-purple-400 mb-1">
                  Not Before (nbf)
                </div>
                <div className="text-sm text-gray-800 dark:text-white">{timestamps.nbf}</div>
              </div>
            )}
          </div>
        </ToolSection>
      )}

      <ToolSection>
        <div className="prose dark:prose-invert max-w-none">
          <h3 className="text-lg font-semibold mb-2">關於 JWT</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            JSON Web Token (JWT) 是一種開放標準 (RFC 7519)，用於在各方之間安全地傳輸資訊。
            JWT 由三個部分組成：Header（標頭）、Payload（載荷）和 Signature（簽章）。
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            ⚠️ 此工具僅解碼 JWT 內容，不驗證簽章。請勿將敏感的 JWT Token 貼到公開網站。
          </p>
        </div>
      </ToolSection>
    </ToolPageWrapper>
  );
}
