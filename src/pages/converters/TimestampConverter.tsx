import { useState, useEffect, useCallback } from 'react';
import ToolPageWrapper, {
  ToolSection,
  ToolButton,
  CopyButton,
  ClearButton,
} from '../../components/ToolPageWrapper';
import { useTool } from '../../hooks/useTool';
import {
  timestampToDate,
  dateToTimestamp,
  formatDate,
  formatLocalDate,
  getCurrentTimestamp,
} from '../../utils/timestamp';
import { Clock } from 'lucide-react';

export default function TimestampConverter() {
  const { input, setInput, setError, error, clear } = useTool();
  const [unit, setUnit] = useState<'seconds' | 'milliseconds'>('seconds');
  const [isoDate, setIsoDate] = useState('');
  const [localDate, setLocalDate] = useState('');
  const [currentTime, setCurrentTime] = useState(getCurrentTimestamp('seconds'));

  // Update current time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(getCurrentTimestamp(unit));
    }, 1000);
    return () => clearInterval(interval);
  }, [unit]);

  const handleTimestampConvert = useCallback(() => {
    try {
      setError('');
      const date = timestampToDate(input, unit);
      setIsoDate(formatDate(date));
      setLocalDate(formatLocalDate(date));
    } catch (err) {
      setError(err instanceof Error ? err.message : '轉換失敗');
      setIsoDate('');
      setLocalDate('');
    }
  }, [input, unit, setError]);

  const handleLoadCurrent = () => {
    const current = getCurrentTimestamp(unit);
    setInput(current.toString());
    setError('');
  };

  const handleDateToTimestamp = () => {
    try {
      setError('');
      const date = new Date(isoDate);
      if (isNaN(date.getTime())) {
        throw new Error('無效的日期格式');
      }
      const timestamp = dateToTimestamp(date, unit);
      setInput(timestamp.toString());
    } catch (err) {
      setError(err instanceof Error ? err.message : '轉換失敗');
    }
  };

  // Auto-convert when input changes
  useEffect(() => {
    if (input.trim()) {
      handleTimestampConvert();
    } else {
      setIsoDate('');
      setLocalDate('');
      setError('');
    }
  }, [input, handleTimestampConvert, setError]);

  return (
    <ToolPageWrapper
      title="Unix 時間戳記轉換工具"
      description="Unix 時間戳記與日期時間相互轉換"
      actions={
        <>
          <ToolButton onClick={handleLoadCurrent} icon={<Clock size={16} />}>
            當前時間
          </ToolButton>
          <ClearButton onClear={clear} label="清空" />
          
          <div className="flex items-center gap-2 ml-auto">
            <label className="text-sm text-gray-700 dark:text-gray-300">單位：</label>
            <div className="flex bg-gray-200 dark:bg-gray-700 rounded-lg p-1">
              <button
                onClick={() => setUnit('seconds')}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  unit === 'seconds'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                秒 (10位)
              </button>
              <button
                onClick={() => setUnit('milliseconds')}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  unit === 'milliseconds'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                毫秒 (13位)
              </button>
            </div>
          </div>
        </>
      }
    >
      {/* Current Time Display */}
      <ToolSection>
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">當前時間戳記</p>
            <p className="text-2xl font-mono font-bold text-blue-600 dark:text-blue-400">
              {currentTime}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">當前時間</p>
            <p className="text-lg font-medium text-gray-800 dark:text-white">
              {formatLocalDate(new Date())}
            </p>
          </div>
        </div>
      </ToolSection>

      {/* Timestamp to Date */}
      <ToolSection title="時間戳記 → 日期時間">
        <div className="space-y-4">
          <div>
            <label className="input-label">輸入時間戳記</label>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={unit === 'seconds' ? '例如：1704038400' : '例如：1704038400000'}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-mono"
            />
          </div>

          {error && (
            <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-sm text-red-800 dark:text-red-300">❌ {error}</p>
            </div>
          )}

          {isoDate && (
            <div className="space-y-3">
              <div>
                <label className="input-label">ISO 8601 格式（UTC）</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={isoDate}
                    readOnly
                    className="flex-1 p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white font-mono"
                  />
                  <CopyButton text={isoDate} label="複製" />
                </div>
              </div>

              <div>
                <label className="input-label">本地時間（台灣）</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={localDate}
                    readOnly
                    className="flex-1 p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white font-mono"
                  />
                  <CopyButton text={localDate} label="複製" />
                </div>
              </div>
            </div>
          )}
        </div>
      </ToolSection>

      {/* Date to Timestamp */}
      <ToolSection title="日期時間 → 時間戳記">
        <div className="space-y-4">
          <div>
            <label className="input-label">輸入日期時間（ISO 格式）</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={isoDate}
                onChange={(e) => setIsoDate(e.target.value)}
                placeholder="例如：2024-01-01T00:00:00.000Z"
                className="flex-1 p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-mono"
              />
              <ToolButton onClick={handleDateToTimestamp}>轉換</ToolButton>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              或使用瀏覽器的日期選擇器：
            </p>
            <input
              type="datetime-local"
              onChange={(e) => {
                const date = new Date(e.target.value);
                setIsoDate(date.toISOString());
              }}
              className="mt-2 p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>
        </div>
      </ToolSection>

      <ToolSection>
        <div className="prose dark:prose-invert max-w-none">
          <h3 className="text-lg font-semibold mb-2">使用說明</h3>
          <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
            <li>✅ 支援秒（10位）和毫秒（13位）時間戳記</li>
            <li>✅ 顯示 UTC 和本地時間（台灣時區）</li>
            <li>✅ 即時顯示當前時間戳記</li>
            <li>✅ 雙向轉換：時間戳記 ⇄ 日期時間</li>
          </ul>
        </div>
      </ToolSection>
    </ToolPageWrapper>
  );
}
