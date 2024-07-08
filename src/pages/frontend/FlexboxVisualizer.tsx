import { useState } from 'react';
import ToolPageWrapper, {
  ToolSection,
  ToolButton,
} from '../../components/ToolPageWrapper';
import { Layout, RefreshCw } from 'lucide-react';

type FlexDirection = 'row' | 'row-reverse' | 'column' | 'column-reverse';
type JustifyContent = 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
type AlignItems = 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
type FlexWrap = 'nowrap' | 'wrap' | 'wrap-reverse';

export default function FlexboxVisualizer() {
  const [flexDirection, setFlexDirection] = useState<FlexDirection>('row');
  const [justifyContent, setJustifyContent] = useState<JustifyContent>('flex-start');
  const [alignItems, setAlignItems] = useState<AlignItems>('stretch');
  const [flexWrap, setFlexWrap] = useState<FlexWrap>('nowrap');
  const [gap, setGap] = useState('10');

  const generateCSS = () => {
    return `.container {
  display: flex;
  flex-direction: ${flexDirection};
  justify-content: ${justifyContent};
  align-items: ${alignItems};
  flex-wrap: ${flexWrap};
  gap: ${gap}px;
}`;
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(generateCSS());
    alert('CSS 已複製到剪貼簿！');
  };

  const handleReset = () => {
    setFlexDirection('row');
    setJustifyContent('flex-start');
    setAlignItems('stretch');
    setFlexWrap('nowrap');
    setGap('10');
  };

  const items = [
    { color: '#3b82f6', label: '1' },
    { color: '#10b981', label: '2' },
    { color: '#f59e0b', label: '3' },
    { color: '#ef4444', label: '4' },
    { color: '#8b5cf6', label: '5' },
  ];

  return (
    <ToolPageWrapper
      title="Flexbox 視覺化工具"
      description="視覺化調整 CSS Flexbox 屬性並產生程式碼"
      actions={
        <>
          <ToolButton onClick={handleCopy} icon={<Layout size={16} />}>
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
            display: 'flex',
            flexDirection,
            justifyContent,
            alignItems,
            flexWrap,
            gap: `${gap}px`,
            minHeight: '300px',
            padding: '20px',
            backgroundColor: '#f3f4f6',
            border: '2px dashed #d1d5db',
            borderRadius: '8px',
          }}
        >
          {items.map((item) => (
            <div
              key={item.label}
              style={{
                backgroundColor: item.color,
                color: 'white',
                padding: '20px',
                borderRadius: '8px',
                fontSize: '24px',
                fontWeight: 'bold',
                minWidth: '80px',
                minHeight: '80px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {item.label}
            </div>
          ))}
        </div>
      </ToolSection>

      {/* Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ToolSection title="flex-direction">
          <select
            value={flexDirection}
            onChange={(e) => setFlexDirection(e.target.value as FlexDirection)}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          >
            <option value="row">row</option>
            <option value="row-reverse">row-reverse</option>
            <option value="column">column</option>
            <option value="column-reverse">column-reverse</option>
          </select>
        </ToolSection>

        <ToolSection title="justify-content">
          <select
            value={justifyContent}
            onChange={(e) => setJustifyContent(e.target.value as JustifyContent)}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          >
            <option value="flex-start">flex-start</option>
            <option value="flex-end">flex-end</option>
            <option value="center">center</option>
            <option value="space-between">space-between</option>
            <option value="space-around">space-around</option>
            <option value="space-evenly">space-evenly</option>
          </select>
        </ToolSection>

        <ToolSection title="align-items">
          <select
            value={alignItems}
            onChange={(e) => setAlignItems(e.target.value as AlignItems)}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          >
            <option value="flex-start">flex-start</option>
            <option value="flex-end">flex-end</option>
            <option value="center">center</option>
            <option value="stretch">stretch</option>
            <option value="baseline">baseline</option>
          </select>
        </ToolSection>

        <ToolSection title="flex-wrap">
          <select
            value={flexWrap}
            onChange={(e) => setFlexWrap(e.target.value as FlexWrap)}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          >
            <option value="nowrap">nowrap</option>
            <option value="wrap">wrap</option>
            <option value="wrap-reverse">wrap-reverse</option>
          </select>
        </ToolSection>
      </div>

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

      {/* Generated CSS */}
      <ToolSection title="產生的 CSS">
        <pre className="p-4 bg-gray-900 text-green-400 rounded-lg font-mono text-sm overflow-x-auto">
          {generateCSS()}
        </pre>
      </ToolSection>

      <ToolSection>
        <div className="prose dark:prose-invert max-w-none">
          <h3 className="text-lg font-semibold mb-2">Flexbox 屬性說明</h3>
          <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
            <li><strong>flex-direction</strong>: 定義主軸方向（橫向或縱向）</li>
            <li><strong>justify-content</strong>: 定義項目在主軸上的對齊方式</li>
            <li><strong>align-items</strong>: 定義項目在交叉軸上的對齊方式</li>
            <li><strong>flex-wrap</strong>: 定義是否換行</li>
            <li><strong>gap</strong>: 定義項目之間的間距</li>
          </ul>
        </div>
      </ToolSection>
    </ToolPageWrapper>
  );
}
