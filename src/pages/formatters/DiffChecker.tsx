import { useState, useCallback, useMemo } from 'react';
import { diffLines } from 'diff';
import type { Change } from 'diff';
import ToolPageWrapper, {
  ToolSection,
  ToolInput,
  ToolButton,
  TwoColumnLayout,
} from '../../components/ToolPageWrapper';
import { FileCode, RefreshCw } from 'lucide-react';

export default function DiffChecker() {
  const [original, setOriginal] = useState('');
  const [changed, setChanged] = useState('');

  const diffResult = useMemo(() => {
    if (!original && !changed) return [];
    return diffLines(original, changed);
  }, [original, changed]);

  const handleClear = useCallback(() => {
    setOriginal('');
    setChanged('');
  }, []);

  const loadSample = useCallback(() => {
    setOriginal(
      `function hello() {
  console.log('Hello World');
  return true;
}

const name = 'John';
const age = 30;`
    );
    setChanged(
      `function hello() {
  console.log('Hello World!');
  console.log('Welcome');
  return true;
}

const name = 'Jane';
const age = 25;
const city = 'Tokyo';`
    );
  }, []);

  const getDiffStats = () => {
    const added = diffResult.filter((part) => part.added).length;
    const removed = diffResult.filter((part) => part.removed).length;
    const unchanged = diffResult.filter((part) => !part.added && !part.removed).length;
    return { added, removed, unchanged };
  };

  const stats = getDiffStats();

  return (
    <ToolPageWrapper
      title="文字差異比對工具"
      description="比對兩段文字的差異，顯示新增、刪除和修改的內容"
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
      <TwoColumnLayout>
        <ToolSection title="原始文字">
          <ToolInput
            label="Original"
            value={original}
            onChange={setOriginal}
            placeholder="輸入原始文字..."
            rows={12}
            monospace
          />
        </ToolSection>

        <ToolSection title="修改後文字">
          <ToolInput
            label="Changed"
            value={changed}
            onChange={setChanged}
            placeholder="輸入修改後的文字..."
            rows={12}
            monospace
          />
        </ToolSection>
      </TwoColumnLayout>

      {/* Stats */}
      {(original || changed) && (
        <ToolSection title="差異統計">
          <div className="flex gap-4 text-sm">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-green-500 rounded"></span>
              <span className="text-gray-600 dark:text-gray-400">
                新增：<strong className="text-green-600 dark:text-green-400">{stats.added}</strong> 行
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-red-500 rounded"></span>
              <span className="text-gray-600 dark:text-gray-400">
                刪除：<strong className="text-red-600 dark:text-red-400">{stats.removed}</strong> 行
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-gray-400 rounded"></span>
              <span className="text-gray-600 dark:text-gray-400">
                未改變：<strong>{stats.unchanged}</strong> 行
              </span>
            </div>
          </div>
        </ToolSection>
      )}

      {/* Diff Result */}
      <ToolSection title="差異結果">
        {diffResult.length === 0 ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            請輸入要比對的文字
          </div>
        ) : (
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
            {diffResult.map((part: Change, index: number) => {
              const lines = part.value.split('\n').filter((line) => line !== '');
              
              return lines.map((line, lineIndex) => (
                <div
                  key={`${index}-${lineIndex}`}
                  className={`px-2 py-0.5 ${
                    part.added
                      ? 'bg-green-900/50 text-green-300'
                      : part.removed
                      ? 'bg-red-900/50 text-red-300'
                      : 'text-gray-300'
                  }`}
                >
                  <span className="select-none mr-2 text-gray-500">
                    {part.added ? '+' : part.removed ? '-' : ' '}
                  </span>
                  {line}
                </div>
              ));
            })}
          </div>
        )}
      </ToolSection>

      <ToolSection>
        <div className="prose dark:prose-invert max-w-none">
          <h3 className="text-lg font-semibold mb-2">使用說明</h3>
          <div className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
            <p>此工具會逐行比對兩段文字的差異：</p>
            <ul className="list-disc list-inside space-y-1">
              <li>
                <span className="text-green-600 dark:text-green-400">綠色背景</span> - 新增的行
              </li>
              <li>
                <span className="text-red-600 dark:text-red-400">紅色背景</span> - 刪除的行
              </li>
              <li>
                <span className="text-gray-600 dark:text-gray-400">灰色文字</span> - 未改變的行
              </li>
            </ul>
            <p className="mt-2">適用場景：</p>
            <ul className="list-disc list-inside space-y-1">
              <li>程式碼版本比對</li>
              <li>設定檔差異檢查</li>
              <li>文件修訂比較</li>
              <li>API 回應比對</li>
            </ul>
          </div>
        </div>
      </ToolSection>
    </ToolPageWrapper>
  );
}
