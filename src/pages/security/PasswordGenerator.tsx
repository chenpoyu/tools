import { useState } from 'react';
import ToolPageWrapper, {
  ToolSection,
  ToolButton,
  CopyButton,
} from '../../components/ToolPageWrapper';
import { Shield, RefreshCw } from 'lucide-react';
import {
  generatePassword,
  calculatePasswordStrength,
  type PasswordOptions,
} from '../../utils/passwordGenerator';

export default function PasswordGenerator() {
  const [options, setOptions] = useState<PasswordOptions>({
    length: 16,
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  });
  const [password, setPassword] = useState(() => generatePassword({
    length: 16,
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  }));

  const strength = calculatePasswordStrength(password);

  const handleGenerate = () => {
    try {
      const newPassword = generatePassword(options);
      setPassword(newPassword);
    } catch (err) {
      alert(err instanceof Error ? err.message : '產生密碼失敗');
    }
  };

  // Auto-regenerate when options change
  const handleOptionChange = (key: keyof PasswordOptions, value: boolean | number) => {
    const newOptions = { ...options, [key]: value };
    setOptions(newOptions);
    try {
      const newPassword = generatePassword(newOptions);
      setPassword(newPassword);
    } catch {
      // Ignore errors on option change
    }
  };

  const getStrengthBarColor = () => {
    switch (strength.color) {
      case 'red':
        return 'bg-red-500';
      case 'yellow':
        return 'bg-yellow-500';
      case 'green':
        return 'bg-green-500';
      case 'emerald':
        return 'bg-emerald-500';
      default:
        return 'bg-gray-300';
    }
  };

  return (
    <ToolPageWrapper
      title="密碼產生器"
      description="產生高強度隨機密碼，保護你的帳號安全"
      actions={
        <>
          <ToolButton onClick={handleGenerate} icon={<RefreshCw size={16} />}>
            重新產生
          </ToolButton>
        </>
      }
    >
      {/* Password Display */}
      <ToolSection>
        <div className="space-y-4">
          <div>
            <label className="input-label flex items-center gap-2">
              <Shield size={16} />
              產生的密碼
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={password}
                readOnly
                className="flex-1 p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white font-mono text-xl font-bold"
              />
              <CopyButton text={password} label="複製" />
            </div>
          </div>

          {/* Strength Indicator */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                密碼強度
              </span>
              <span
                className={`text-sm font-bold ${
                  strength.color === 'red'
                    ? 'text-red-600'
                    : strength.color === 'yellow'
                    ? 'text-yellow-600'
                    : strength.color === 'green'
                    ? 'text-green-600'
                    : 'text-emerald-600'
                }`}
              >
                {strength.label}
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
              <div
                className={`h-full transition-all duration-300 ${getStrengthBarColor()}`}
                style={{ width: `${(strength.score / 7) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </ToolSection>

      {/* Options */}
      <ToolSection title="密碼選項">
        <div className="space-y-6">
          {/* Length Slider */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                長度
              </label>
              <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                {options.length}
              </span>
            </div>
            <input
              type="range"
              min="4"
              max="64"
              value={options.length}
              onChange={(e) => handleOptionChange('length', parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
              <span>4</span>
              <span>64</span>
            </div>
          </div>

          {/* Character Types */}
          <div className="grid grid-cols-2 gap-4">
            <label className="flex items-center gap-3 p-3 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <input
                type="checkbox"
                checked={options.uppercase}
                onChange={(e) => handleOptionChange('uppercase', e.target.checked)}
                className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
              />
              <div className="flex-1">
                <div className="font-medium text-gray-800 dark:text-white">大寫字母</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">A-Z</div>
              </div>
            </label>

            <label className="flex items-center gap-3 p-3 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <input
                type="checkbox"
                checked={options.lowercase}
                onChange={(e) => handleOptionChange('lowercase', e.target.checked)}
                className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
              />
              <div className="flex-1">
                <div className="font-medium text-gray-800 dark:text-white">小寫字母</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">a-z</div>
              </div>
            </label>

            <label className="flex items-center gap-3 p-3 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <input
                type="checkbox"
                checked={options.numbers}
                onChange={(e) => handleOptionChange('numbers', e.target.checked)}
                className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
              />
              <div className="flex-1">
                <div className="font-medium text-gray-800 dark:text-white">數字</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">0-9</div>
              </div>
            </label>

            <label className="flex items-center gap-3 p-3 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <input
                type="checkbox"
                checked={options.symbols}
                onChange={(e) => handleOptionChange('symbols', e.target.checked)}
                className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
              />
              <div className="flex-1">
                <div className="font-medium text-gray-800 dark:text-white">特殊符號</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">!@#$%</div>
              </div>
            </label>
          </div>
        </div>
      </ToolSection>

      <ToolSection>
        <div className="prose dark:prose-invert max-w-none">
          <h3 className="text-lg font-semibold mb-2">密碼安全建議</h3>
          <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
            <li>✅ 建議密碼長度至少 12 個字元</li>
            <li>✅ 混合使用大小寫字母、數字和符號</li>
            <li>✅ 避免使用個人資訊（生日、姓名等）</li>
            <li>✅ 每個帳號使用不同的密碼</li>
            <li>✅ 定期更換重要帳號的密碼</li>
            <li>🔒 使用密碼管理器安全儲存密碼</li>
          </ul>
        </div>
      </ToolSection>
    </ToolPageWrapper>
  );
}
