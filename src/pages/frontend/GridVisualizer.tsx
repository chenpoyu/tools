import { useState } from 'react';
import ToolPageWrapper, {
  ToolSection,
  ToolButton,
  ToolInput,
} from '../../components/ToolPageWrapper';
import { Grid3x3, RefreshCw } from 'lucide-react';

export default function GridVisualizer() {
  const [columns, setColumns] = useState('1fr 1fr 1fr');
  const [rows, setRows] = useState('auto');
  const [gap, setGap] = useState('10');
  const [itemCount, setItemCount] = useState('6');

  const generateCSS = () => {
    return `.container {
  display: grid;
  grid-template-columns: ${columns};
  grid-template-rows: ${rows};
  gap: ${gap}px;
}`;
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(generateCSS());
    alert('CSS 已複製到剪貼簿！');
  };

  const handleReset = () => {
    setColumns('1fr 1fr 1fr');
    setRows('auto');
    setGap('10');
    setItemCount('6');
  };

  const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4', '#84cc16'];
  const count = parseInt(itemCount) || 6;

  return (
    <ToolPageWrapper
      title="Grid 視覺化工具"
      description="視覺化調整 CSS Grid 屬性並產生程式碼"
      actions={
        <>
          <ToolButton onClick={handleCopy} icon={<Grid3x3 size={16} />}>
            複製 CSS
          </ToolButton>
          <ToolButton onClick={handleReset} variant="secondary" icon={<RefreshCw size={16} />}>
            重置
          </ToolButton>
        </>
      }
    >
      {/* Preview */}
      <ToolSection title="預覽">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: columns,
            gridTemplateRows: rows,
            gap: `${gap}px`,
            padding: '20px',
            backgroundColor: '#f3f4f6',
            border: '2px dashed #d1d5db',
            borderRadius: '8px',
          }}
        >
          {Array.from({ length: count }).map((_, index) => (
            <div
              key={index}
              style={{
                backgroundColor: colors[index % colors.length],
                color: 'white',
                padding: '30px',
                borderRadius: '8px',
                fontSize: '20px',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100px',
              }}
            >
              {index + 1}
            </div>
          ))}
        </div>
      </ToolSection>

      {/* Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ToolSection title="grid-template-columns">
          <ToolInput
            label="Columns"
            value={columns}
            onChange={setColumns}
            placeholder="例如：1fr 1fr 1fr 或 repeat(3, 1fr)"
          />
          <div className="mt-2 text-xs text-gray-600 dark:text-gray-400">
            <p>範例：</p>
            <ul className="list-disc list-inside">
              <li>1fr 1fr - 兩欄等寬</li>
              <li>200px 1fr - 固定寬度 + 自動填滿</li>
              <li>repeat(3, 1fr) - 三欄等寬</li>
            </ul>
          </div>
        </ToolSection>

        <ToolSection title="grid-template-rows">
          <ToolInput
            label="Rows"
            value={rows}
            onChange={setRows}
            placeholder="例如：auto 或 100px 200px"
          />
          <div className="mt-2 text-xs text-gray-600 dark:text-gray-400">
            <p>範例：</p>
            <ul className="list-disc list-inside">
              <li>auto - 自動高度</li>
              <li>100px 200px - 固定高度</li>
              <li>repeat(2, 150px) - 兩列固定高度</li>
            </ul>
          </div>
        </ToolSection>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ToolSection title={`間距 (gap): ${gap}px`}>
          <input
            type="range"
            min="0"
            max="50"
            value={gap}
            onChange={(e) => setGap(e.target.value)}
            className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
        </ToolSection>

        <ToolSection title="項目數量">
          <input
            type="number"
            min="1"
            max="20"
            value={itemCount}
            onChange={(e) => setItemCount(e.target.value)}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          />
        </ToolSection>
      </div>

      {/* Generated CSS */}
      <ToolSection title="產生的 CSS">
        <pre className="p-4 bg-gray-900 text-green-400 rounded-lg font-mono text-sm overflow-x-auto">
          {generateCSS()}
        </pre>
      </ToolSection>

      <ToolSection>
        <div className="prose dark:prose-invert max-w-none">
          <h3 className="text-lg font-semibold mb-2">Grid 單位說明</h3>
          <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
            <li><strong>fr</strong>: 彈性單位，代表可用空間的比例</li>
            <li><strong>px</strong>: 固定像素</li>
            <li><strong>auto</strong>: 根據內容自動調整</li>
            <li><strong>%</strong>: 百分比</li>
            <li><strong>repeat()</strong>: 重複模式，如 repeat(3, 1fr)</li>
            <li><strong>minmax()</strong>: 最小和最大值，如 minmax(100px, 1fr)</li>
          </ul>
        </div>
      </ToolSection>
    </ToolPageWrapper>
  );
}
