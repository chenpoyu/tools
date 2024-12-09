import { useState, useCallback, useMemo } from 'react';
import ToolPageWrapper, {
  ToolSection,
  ToolSelect,
  ToolButton,
  CopyButton,
} from '../../components/ToolPageWrapper';
import { Clock, RefreshCw } from 'lucide-react';
import cronstrue from 'cronstrue/i18n';

const MINUTE_OPTIONS = [
  { value: '*', label: '每分鐘' },
  { value: '0', label: '第 0 分' },
  { value: '*/5', label: '每 5 分鐘' },
  { value: '*/10', label: '每 10 分鐘' },
  { value: '*/15', label: '每 15 分鐘' },
  { value: '*/30', label: '每 30 分鐘' },
];

const HOUR_OPTIONS = [
  { value: '*', label: '每小時' },
  { value: '0', label: '午夜 (00:00)' },
  { value: '6', label: '早上 6 點' },
  { value: '9', label: '早上 9 點' },
  { value: '12', label: '中午 (12:00)' },
  { value: '18', label: '下午 6 點' },
  { value: '*/2', label: '每 2 小時' },
  { value: '*/6', label: '每 6 小時' },
];

const DAY_OPTIONS = [
  { value: '*', label: '每天' },
  { value: '1', label: '每月 1 號' },
  { value: '15', label: '每月 15 號' },
  { value: '*/5', label: '每 5 天' },
];

const MONTH_OPTIONS = [
  { value: '*', label: '每月' },
  { value: '1', label: '1 月' },
  { value: '6', label: '6 月' },
  { value: '12', label: '12 月' },
  { value: '*/3', label: '每 3 個月' },
];

const WEEKDAY_OPTIONS = [
  { value: '*', label: '每天' },
  { value: '0', label: '星期日' },
  { value: '1', label: '星期一' },
  { value: '2', label: '星期二' },
  { value: '3', label: '星期三' },
  { value: '4', label: '星期四' },
  { value: '5', label: '星期五' },
  { value: '6', label: '星期六' },
  { value: '1-5', label: '平日 (週一到週五)' },
];

export default function CronGenerator() {
  const [minute, setMinute] = useState('0');
  const [hour, setHour] = useState('0');
  const [day, setDay] = useState('*');
  const [month, setMonth] = useState('*');
  const [weekday, setWeekday] = useState('*');

  const cronExpression = useMemo(() => {
    return `${minute} ${hour} ${day} ${month} ${weekday}`;
  }, [minute, hour, day, month, weekday]);

  const humanReadable = useMemo(() => {
    try {
      return cronstrue.toString(cronExpression, { locale: 'zh_TW' });
    } catch (error) {
      return '無效的 Cron 表達式';
    }
  }, [cronExpression]);

  const handleReset = useCallback(() => {
    setMinute('0');
    setHour('0');
    setDay('*');
    setMonth('*');
    setWeekday('*');
  }, []);

  const loadPreset = useCallback((preset: string) => {
    switch (preset) {
      case 'daily':
        setMinute('0');
        setHour('0');
        setDay('*');
        setMonth('*');
        setWeekday('*');
        break;
      case 'hourly':
        setMinute('0');
        setHour('*');
        setDay('*');
        setMonth('*');
        setWeekday('*');
        break;
      case 'weekly':
        setMinute('0');
        setHour('0');
        setDay('*');
        setMonth('*');
        setWeekday('1');
        break;
      case 'monthly':
        setMinute('0');
        setHour('0');
        setDay('1');
        setMonth('*');
        setWeekday('*');
        break;
    }
  }, []);

  return (
    <ToolPageWrapper
      title="Cron 表達式產生器"
      description="視覺化方式產生 Cron 排程表達式"
      actions={
        <ToolButton onClick={handleReset} variant="secondary" icon={<RefreshCw size={16} />}>
          重設
        </ToolButton>
      }
    >
      <ToolSection title="快速預設">
        <div className="flex flex-wrap gap-2">
          <ToolButton onClick={() => loadPreset('hourly')} icon={<Clock size={16} />}>
            每小時
          </ToolButton>
          <ToolButton onClick={() => loadPreset('daily')} icon={<Clock size={16} />}>
            每天
          </ToolButton>
          <ToolButton onClick={() => loadPreset('weekly')} icon={<Clock size={16} />}>
            每週
          </ToolButton>
          <ToolButton onClick={() => loadPreset('monthly')} icon={<Clock size={16} />}>
            每月
          </ToolButton>
        </div>
      </ToolSection>

      <ToolSection title="設定排程">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <ToolSelect
            label="分鐘"
            value={minute}
            onChange={setMinute}
            options={MINUTE_OPTIONS}
          />
          <ToolSelect
            label="小時"
            value={hour}
            onChange={setHour}
            options={HOUR_OPTIONS}
          />
          <ToolSelect
            label="日期"
            value={day}
            onChange={setDay}
            options={DAY_OPTIONS}
          />
          <ToolSelect
            label="月份"
            value={month}
            onChange={setMonth}
            options={MONTH_OPTIONS}
          />
          <ToolSelect
            label="星期"
            value={weekday}
            onChange={setWeekday}
            options={WEEKDAY_OPTIONS}
          />
        </div>
      </ToolSection>

      <ToolSection title="產生的 Cron 表達式">
        <div className="space-y-4">
          <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-lg">
            {cronExpression}
          </div>
          <CopyButton text={cronExpression} label="複製表達式" />
        </div>
      </ToolSection>

      <ToolSection title="人類可讀的描述">
        <div className="bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 p-4 rounded-lg">
          {humanReadable}
        </div>
      </ToolSection>

      <ToolSection>
        <div className="prose dark:prose-invert max-w-none">
          <h3 className="text-lg font-semibold mb-2">Cron 表達式說明</h3>
          <div className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
            <p>Cron 表達式由 5 個欄位組成：</p>
            <ul className="list-disc list-inside space-y-1">
              <li><code className="text-blue-600 dark:text-blue-400">分鐘</code> (0-59)</li>
              <li><code className="text-blue-600 dark:text-blue-400">小時</code> (0-23)</li>
              <li><code className="text-blue-600 dark:text-blue-400">日期</code> (1-31)</li>
              <li><code className="text-blue-600 dark:text-blue-400">月份</code> (1-12)</li>
              <li><code className="text-blue-600 dark:text-blue-400">星期</code> (0-6, 0=星期日)</li>
            </ul>
            <p className="mt-2">特殊符號：</p>
            <ul className="list-disc list-inside space-y-1">
              <li><code>*</code> - 任何值</li>
              <li><code>*/n</code> - 每 n 個單位</li>
              <li><code>n-m</code> - 範圍從 n 到 m</li>
              <li><code>n,m</code> - 特定值 n 和 m</li>
            </ul>
          </div>
        </div>
      </ToolSection>
    </ToolPageWrapper>
  );
}
