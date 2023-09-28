import { useState, useMemo } from 'react';
import ToolPageWrapper, { ToolSection } from '../../components/ToolPageWrapper';
import { Search } from 'lucide-react';
import { httpStatusCodes, searchStatusCodes, type HTTPStatusCode } from '../../utils/httpStatusCodes';

export default function HttpStatusCodes() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCodes = useMemo(() => {
    if (!searchQuery.trim()) {
      return httpStatusCodes;
    }
    return searchStatusCodes(searchQuery);
  }, [searchQuery]);

  const getCategoryColor = (category: HTTPStatusCode['category']) => {
    switch (category) {
      case 'Informational':
        return 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800';
      case 'Success':
        return 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800';
      case 'Redirection':
        return 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800';
      case 'Client Error':
        return 'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800';
      case 'Server Error':
        return 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800';
    }
  };

  const getCategoryTextColor = (category: HTTPStatusCode['category']) => {
    switch (category) {
      case 'Informational':
        return 'text-blue-700 dark:text-blue-300';
      case 'Success':
        return 'text-green-700 dark:text-green-300';
      case 'Redirection':
        return 'text-yellow-700 dark:text-yellow-300';
      case 'Client Error':
        return 'text-orange-700 dark:text-orange-300';
      case 'Server Error':
        return 'text-red-700 dark:text-red-300';
    }
  };

  const categories = [
    { name: '1xx 資訊回應', key: 'Informational' as const },
    { name: '2xx 成功回應', key: 'Success' as const },
    { name: '3xx 重定向', key: 'Redirection' as const },
    { name: '4xx 客戶端錯誤', key: 'Client Error' as const },
    { name: '5xx 伺服器錯誤', key: 'Server Error' as const },
  ];

  return (
    <ToolPageWrapper
      title="HTTP 狀態碼參考"
      description="完整的 HTTP 狀態碼列表與說明"
    >
      <ToolSection title="搜尋狀態碼">
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="搜尋狀態碼、名稱或說明..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          />
        </div>
        {searchQuery && (
          <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            找到 {filteredCodes.length} 個結果
          </div>
        )}
      </ToolSection>

      {categories.map(({ name, key }) => {
        const categoryCodes = filteredCodes.filter((code) => code.category === key);
        if (categoryCodes.length === 0) return null;

        return (
          <ToolSection key={key} title={name}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
              {categoryCodes.map((status) => (
                <div
                  key={status.code}
                  className={`p-4 rounded-lg border ${getCategoryColor(status.category)} transition-all hover:shadow-md`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-2xl font-bold ${getCategoryTextColor(status.category)}`}>
                      {status.code}
                    </span>
                  </div>
                  <div className="text-sm font-semibold text-gray-800 dark:text-white mb-1">
                    {status.name}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                    {status.description}
                  </div>
                </div>
              ))}
            </div>
          </ToolSection>
        );
      })}

      <ToolSection>
        <div className="prose dark:prose-invert max-w-none">
          <h3 className="text-lg font-semibold mb-2">狀態碼分類</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <div className="font-bold text-blue-700 dark:text-blue-300 mb-2">🔵 1xx 資訊回應</div>
              <div className="text-gray-600 dark:text-gray-400">表示請求已被接收，繼續處理中</div>
            </div>
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
              <div className="font-bold text-green-700 dark:text-green-300 mb-2">🟢 2xx 成功</div>
              <div className="text-gray-600 dark:text-gray-400">請求已成功被伺服器接收、理解並接受</div>
            </div>
            <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
              <div className="font-bold text-yellow-700 dark:text-yellow-300 mb-2">🟡 3xx 重定向</div>
              <div className="text-gray-600 dark:text-gray-400">需要進一步操作以完成請求</div>
            </div>
            <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
              <div className="font-bold text-orange-700 dark:text-orange-300 mb-2">🟠 4xx 客戶端錯誤</div>
              <div className="text-gray-600 dark:text-gray-400">請求包含錯誤語法或無法完成</div>
            </div>
            <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
              <div className="font-bold text-red-700 dark:text-red-300 mb-2">🔴 5xx 伺服器錯誤</div>
              <div className="text-gray-600 dark:text-gray-400">伺服器在處理請求時發生錯誤</div>
            </div>
          </div>
        </div>
      </ToolSection>
    </ToolPageWrapper>
  );
}
