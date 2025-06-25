import { useState, useMemo } from 'react';
import { Search, Copy, Check } from 'lucide-react';
import { commands, categories } from '../../data/commands';
import { useToast } from '../../contexts/ToastContext';

export default function CheatSheet() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null);
  const { showToast } = useToast();

  const filteredCommands = useMemo(() => {
    let filtered = commands;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter((cmd) => cmd.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (cmd) =>
          cmd.command.toLowerCase().includes(query) ||
          cmd.description.toLowerCase().includes(query) ||
          cmd.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    return filtered;
  }, [searchQuery, selectedCategory]);

  const handleCopy = async (command: string) => {
    try {
      await navigator.clipboard.writeText(command);
      setCopiedCommand(command);
      showToast('已複製指令到剪貼簿！');
      setTimeout(() => setCopiedCommand(null), 2000);
    } catch {
      showToast('複製失敗', 'error');
    }
  };

  return (
    <div className="tool-container">
      <div className="mb-6">
        <h1 className="tool-header">開發者指令速查表</h1>
        <p className="tool-description">
          快速查找常用的 Git、Docker、Linux、OpenSSL 等指令
        </p>
      </div>

      {/* Search and Filter */}
      <div className="mb-6 space-y-4">
        {/* Search Box */}
        <div className="relative">
          <Search
            size={20}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="搜尋指令、描述或標籤..."
            className="w-full pl-10 pr-4 py-3 text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-gray-100"
          />
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedCategory === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            全部
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
        顯示 {filteredCommands.length} 個指令
        {searchQuery && ` · 搜尋結果：「${searchQuery}」`}
      </div>

      {/* Commands List */}
      <div className="space-y-3">
        {filteredCommands.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">找不到符合的指令</p>
            <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
              試試其他關鍵字或選擇不同的分類
            </p>
          </div>
        ) : (
          filteredCommands.map((cmd, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  {/* Category Badge */}
                  <span className="inline-block px-2 py-1 text-xs font-medium rounded bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 mb-2">
                    {cmd.category}
                  </span>

                  {/* Command */}
                  <div className="bg-gray-900 text-green-400 px-4 py-3 rounded-lg font-mono text-sm mb-2 overflow-x-auto">
                    {cmd.command}
                  </div>

                  {/* Description */}
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    {cmd.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1">
                    {cmd.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Copy Button */}
                <button
                  onClick={() => handleCopy(cmd.command)}
                  className="flex-shrink-0 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  title="複製指令"
                >
                  {copiedCommand === cmd.command ? (
                    <Check size={20} className="text-green-600" />
                  ) : (
                    <Copy size={20} className="text-gray-600 dark:text-gray-400" />
                  )}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
