import { useState, useCallback } from 'react';
import ToolPageWrapper, {
  ToolSection,
  ToolInput,
  ToolSelect,
  ToolButton,
  TwoColumnLayout,
  CopyButton,
} from '../../components/ToolPageWrapper';
import { FileCode, RefreshCw } from 'lucide-react';
import { format } from 'sql-formatter';

const LANGUAGE_OPTIONS = [
  { value: 'sql', label: 'SQL (Standard)' },
  { value: 'mysql', label: 'MySQL' },
  { value: 'postgresql', label: 'PostgreSQL' },
  { value: 'mariadb', label: 'MariaDB' },
  { value: 'sqlite', label: 'SQLite' },
  { value: 'tsql', label: 'T-SQL (SQL Server)' },
  { value: 'plsql', label: 'PL/SQL (Oracle)' },
];

export default function SqlFormatter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [language, setLanguage] = useState('sql');
  const [error, setError] = useState('');

  const handleFormat = useCallback(() => {
    if (!input.trim()) {
      setOutput('');
      setError('');
      return;
    }

    try {
      const formatted = format(input, {
        language: language as any,
        tabWidth: 2,
        keywordCase: 'upper',
        linesBetweenQueries: 2,
      });
      setOutput(formatted);
      setError('');
    } catch (err) {
      setError(err instanceof Error ? err.message : '格式化失敗');
      setOutput('');
    }
  }, [input, language]);

  const handleMinify = useCallback(() => {
    if (!input.trim()) {
      setOutput('');
      setError('');
      return;
    }

    try {
      // Simple minification: remove extra whitespace and newlines
      const minified = input
        .replace(/\s+/g, ' ')
        .replace(/\s*([(),;])\s*/g, '$1')
        .trim();
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
      `select u.id,u.name,u.email,count(o.id) as order_count from users u left join orders o on u.id=o.user_id where u.status='active' group by u.id,u.name,u.email having count(o.id)>0 order by order_count desc limit 10;`
    );
  }, []);

  return (
    <ToolPageWrapper
      title="SQL 格式化工具"
      description="格式化與美化 SQL 查詢語句"
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
      <ToolSection title="SQL 語言">
        <div className="max-w-xs">
          <ToolSelect
            label="選擇 SQL 方言"
            value={language}
            onChange={setLanguage}
            options={LANGUAGE_OPTIONS}
          />
        </div>
      </ToolSection>

      {error && (
        <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg text-sm">
          {error}
        </div>
      )}

      <TwoColumnLayout>
        <ToolSection title="輸入 SQL">
          <ToolInput
            label="原始 SQL"
            value={input}
            onChange={setInput}
            placeholder="輸入要格式化的 SQL 語句..."
            rows={12}
            monospace
          />
          <div className="mt-3 flex gap-2">
            <ToolButton onClick={handleFormat}>格式化</ToolButton>
            <ToolButton onClick={handleMinify} variant="secondary">
              壓縮
            </ToolButton>
          </div>
        </ToolSection>

        <ToolSection title="格式化結果">
          <ToolInput
            label="輸出 SQL"
            value={output}
            onChange={setOutput}
            placeholder="格式化後的 SQL 將顯示在這裡..."
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
          <h3 className="text-lg font-semibold mb-2">格式化選項</h3>
          <div className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
            <p>此工具會自動：</p>
            <ul className="list-disc list-inside space-y-1">
              <li>將 SQL 關鍵字轉為大寫（SELECT, FROM, WHERE 等）</li>
              <li>適當縮排子查詢和條件</li>
              <li>分行顯示長查詢，提高可讀性</li>
              <li>在多個查詢之間增加空行</li>
              <li>統一使用 2 個空格縮排</li>
            </ul>
            <p className="mt-2">支援的 SQL 方言：</p>
            <ul className="list-disc list-inside space-y-1">
              <li><strong>SQL</strong> - 標準 SQL</li>
              <li><strong>MySQL</strong> - MySQL 特定語法</li>
              <li><strong>PostgreSQL</strong> - PostgreSQL 特定語法</li>
              <li><strong>SQLite</strong> - SQLite 特定語法</li>
              <li><strong>T-SQL</strong> - Microsoft SQL Server</li>
              <li><strong>PL/SQL</strong> - Oracle 資料庫</li>
            </ul>
          </div>
        </div>
      </ToolSection>
    </ToolPageWrapper>
  );
}
