import { useState, useEffect } from 'react';
import ToolPageWrapper, {
  ToolSection,
  ToolButton,
} from '../../components/ToolPageWrapper';
import { Palette, RefreshCw } from 'lucide-react';
import {
  calculateContrastRatio,
  getWCAGCompliance,
  isValidHex,
} from '../../utils/colorContrast';

export default function ColorContrastChecker() {
  const [foreground, setForeground] = useState('#000000');
  const [background, setBackground] = useState('#ffffff');
  const [ratio, setRatio] = useState(21);

  useEffect(() => {
    if (isValidHex(foreground) && isValidHex(background)) {
      const contrastRatio = calculateContrastRatio(foreground, background);
      setRatio(contrastRatio);
    }
  }, [foreground, background]);

  const compliance = getWCAGCompliance(ratio);

  const handleReset = () => {
    setForeground('#000000');
    setBackground('#ffffff');
  };

  const handleSwap = () => {
    const temp = foreground;
    setForeground(background);
    setBackground(temp);
  };

  const StatusBadge = ({ pass, label }: { pass: boolean; label: string }) => (
    <div
      className={`px-4 py-2 rounded-lg font-semibold ${
        pass
          ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
          : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
      }`}
    >
      {pass ? '✅' : '❌'} {label}
    </div>
  );

  return (
    <ToolPageWrapper
      title="色彩對比檢查器"
      description="檢查色彩對比度是否符合 WCAG 無障礙標準"
      actions={
        <>
          <ToolButton onClick={handleSwap} icon={<Palette size={16} />}>
            交換顏色
          </ToolButton>
          <ToolButton onClick={handleReset} variant="secondary" icon={<RefreshCw size={16} />}>
            重置
          </ToolButton>
        </>
      }
    >
      {/* Color Pickers */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ToolSection title="前景色（文字）">
          <div className="space-y-3">
            <div className="flex gap-3 items-center">
              <input
                type="color"
                value={foreground}
                onChange={(e) => setForeground(e.target.value)}
                className="w-20 h-20 rounded-lg cursor-pointer border-2 border-gray-300 dark:border-gray-600"
              />
              <input
                type="text"
                value={foreground}
                onChange={(e) => setForeground(e.target.value)}
                placeholder="#000000"
                className="flex-1 p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-mono uppercase"
                maxLength={7}
              />
            </div>
          </div>
        </ToolSection>

        <ToolSection title="背景色">
          <div className="space-y-3">
            <div className="flex gap-3 items-center">
              <input
                type="color"
                value={background}
                onChange={(e) => setBackground(e.target.value)}
                className="w-20 h-20 rounded-lg cursor-pointer border-2 border-gray-300 dark:border-gray-600"
              />
              <input
                type="text"
                value={background}
                onChange={(e) => setBackground(e.target.value)}
                placeholder="#FFFFFF"
                className="flex-1 p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-mono uppercase"
                maxLength={7}
              />
            </div>
          </div>
        </ToolSection>
      </div>

      {/* Preview */}
      <ToolSection title="預覽">
        <div
          style={{
            backgroundColor: background,
            padding: '40px',
            borderRadius: '12px',
            border: '2px solid #d1d5db',
          }}
        >
          <div style={{ color: foreground }}>
            <h2 className="text-3xl font-bold mb-4">這是標題文字範例</h2>
            <p className="text-lg mb-4">這是一般文字範例，用於展示色彩對比效果。</p>
            <p className="text-sm">小字體文字也需要有足夠的對比度才能清楚閱讀。</p>
          </div>
        </div>
      </ToolSection>

      {/* Contrast Ratio */}
      <ToolSection title="對比度">
        <div className="text-center p-8 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg">
          <div className="text-6xl font-bold text-gray-900 dark:text-white mb-2">
            {ratio.toFixed(2)}:1
          </div>
          <div className="text-gray-600 dark:text-gray-400">對比比率</div>
        </div>
      </ToolSection>

      {/* WCAG Compliance */}
      <ToolSection title="WCAG 合規性">
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-gray-800 dark:text-white mb-3">一般文字（小於 18pt）</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <StatusBadge pass={compliance.normalAA} label="AA 級別（需要 4.5:1）" />
              <StatusBadge pass={compliance.normalAAA} label="AAA 級別（需要 7:1）" />
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-800 dark:text-white mb-3">大型文字（≥ 18pt 或 14pt 粗體）</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <StatusBadge pass={compliance.largeAA} label="AA 級別（需要 3:1）" />
              <StatusBadge pass={compliance.largeAAA} label="AAA 級別（需要 4.5:1）" />
            </div>
          </div>
        </div>
      </ToolSection>

      <ToolSection>
        <div className="prose dark:prose-invert max-w-none">
          <h3 className="text-lg font-semibold mb-2">WCAG 標準說明</h3>
          <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
            <li><strong>AA 級別</strong>: 最低合規標準，適用於大多數網站</li>
            <li><strong>AAA 級別</strong>: 最高合規標準，提供更好的可讀性</li>
            <li><strong>一般文字</strong>: 小於 18 點（或 14 點粗體）的文字</li>
            <li><strong>大型文字</strong>: 18 點以上（或 14 點粗體以上）的文字</li>
            <li>💡 建議至少達到 AA 級別以確保無障礙訪問</li>
          </ul>
        </div>
      </ToolSection>
    </ToolPageWrapper>
  );
}
