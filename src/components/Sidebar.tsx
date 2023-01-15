import { NavLink } from 'react-router-dom';
import {
  Code2,
  Braces,
  Shield,
  Palette,
  Network,
  ChevronDown,
  ChevronRight,
  X,
  Search,
  Settings,
} from 'lucide-react';
import { useState, useMemo } from 'react';
import { categories, getToolsByCategory, type Tool } from '../config/tools';

const categoryIcons: Record<Tool['category'], React.ReactNode> = {
  Converters: <Code2 size={18} />,
  Formatters: <Braces size={18} />,
  Security: <Shield size={18} />,
  Frontend: <Palette size={18} />,
  Network: <Network size={18} />,
  System: <Settings size={18} />,
};

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function Sidebar({ isOpen = true, onClose }: SidebarProps) {
  const [expandedCategories, setExpandedCategories] = useState<string[]>(
    categories
  );
  const [searchQuery, setSearchQuery] = useState('');

  const toggleCategory = (categoryName: string) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryName)
        ? prev.filter((name) => name !== categoryName)
        : [...prev, categoryName]
    );
  };

  // Filter tools based on search query
  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) {
      return categories.map((cat) => ({
        name: cat,
        tools: getToolsByCategory(cat),
      }));
    }

    const query = searchQuery.toLowerCase();
    return categories
      .map((cat) => ({
        name: cat,
        tools: getToolsByCategory(cat).filter(
          (tool) =>
            tool.name.toLowerCase().includes(query) ||
            tool.description.toLowerCase().includes(query)
        ),
      }))
      .filter((cat) => cat.tools.length > 0);
  }, [searchQuery]);

  return (
    <aside
      className={`w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 h-screen overflow-y-auto fixed left-0 top-0 z-40 transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0`}
    >
      {/* Mobile close button */}
      <button
        onClick={onClose}
        className="lg:hidden absolute top-4 right-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
        aria-label="Close sidebar"
      >
        <X size={20} className="text-gray-600 dark:text-gray-400" />
      </button>

      <NavLink 
        to="/"
        onClick={onClose}
        className="block p-4 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
      >
        <h1 className="text-xl font-bold text-gray-800 dark:text-white">
          Poyu 的常用開發工具
        </h1>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          開發者工具集
        </p>
      </NavLink>

      {/* Search Bar */}
      <div className="p-3 border-b border-gray-200 dark:border-gray-700">
        <div className="relative">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="搜尋工具..."
            className="w-full pl-10 pr-3 py-2 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-gray-900 dark:text-gray-100"
          />
        </div>
      </div>

      <nav className="p-2">
        {filteredCategories.map(({ name: categoryName, tools }) => {
          const isExpanded = expandedCategories.includes(categoryName);

          return (
            <div key={categoryName} className="mb-2">
              <button
                onClick={() => toggleCategory(categoryName)}
                className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                <div className="flex items-center gap-2">
                  {categoryIcons[categoryName]}
                  <span>{categoryName}</span>
                </div>
                {isExpanded ? (
                  <ChevronDown size={16} />
                ) : (
                  <ChevronRight size={16} />
                )}
              </button>

              {isExpanded && (
                <div className="ml-4 mt-1 space-y-1">
                  {tools.map((tool) => (
                    <NavLink
                      key={tool.id}
                      to={tool.path}
                      onClick={onClose}
                      className={({ isActive }) =>
                        `block px-3 py-2 text-sm rounded-lg transition-colors ${
                          isActive
                            ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 font-medium'
                            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                        }`
                      }
                    >
                      {tool.name}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
