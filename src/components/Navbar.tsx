import { Moon, Sun, Github, Menu, Home } from 'lucide-react';
import { useState, useEffect } from 'react';

interface NavbarProps {
  onMenuClick?: () => void;
}

export default function Navbar({ onMenuClick }: NavbarProps) {
  const [isDark, setIsDark] = useState(() => {
    // Initialize state from localStorage or system preference
    const saved = localStorage.getItem('darkMode');
    if (saved !== null) {
      return saved === 'true';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    // Apply dark mode class based on state
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleDarkMode = () => {
    const newDarkMode = !isDark;
    setIsDark(newDarkMode);
    localStorage.setItem('darkMode', String(newDarkMode));
  };

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-4 lg:px-6 py-3 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          aria-label="Open menu"
        >
          <Menu size={20} className="text-gray-600 dark:text-gray-400" />
        </button>
        
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
          開發工具
        </h2>
      </div>

      <div className="flex items-center gap-3">
        <a
          href="https://chenpoyu.github.io/"
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          aria-label="回到個人首頁"
          title="回到個人首頁"
        >
          <Home size={20} className="text-gray-600 dark:text-gray-400" />
        </a>
        
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          aria-label="Toggle dark mode"
        >
          {isDark ? (
            <Sun size={20} className="text-gray-600 dark:text-gray-400" />
          ) : (
            <Moon size={20} className="text-gray-600 dark:text-gray-400" />
          )}
        </button>

        <a
          href="https://github.com/chenpoyu/tools"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          aria-label="View on GitHub"
        >
          <Github size={20} className="text-gray-600 dark:text-gray-400" />
        </a>
      </div>
    </nav>
  );
}
