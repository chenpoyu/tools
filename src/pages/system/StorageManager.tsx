import { useState, useCallback, useMemo } from 'react';
import ToolPageWrapper, {
  ToolSection,
  ToolButton,
} from '../../components/ToolPageWrapper';
import { Database, Trash2, Plus, RefreshCw, Edit } from 'lucide-react';
import {
  getLocalStorageItems,
  getSessionStorageItems,
  setStorageItem,
  deleteStorageItem,
  clearStorage,
  getTotalStorageSize,
  formatBytes,
} from '../../utils/storageManager';

export default function StorageManager() {
  const [storageType, setStorageType] = useState<'local' | 'session'>('local');
  const [newKey, setNewKey] = useState('');
  const [newValue, setNewValue] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const items = useMemo(() => {
    // refreshKey forces re-computation when storage changes
    void refreshKey;
    return storageType === 'local' ? getLocalStorageItems() : getSessionStorageItems();
  }, [storageType, refreshKey]);

  const handleAdd = useCallback(() => {
    if (!newKey.trim()) {
      alert('請輸入鍵名');
      return;
    }

    setStorageItem(storageType, newKey, newValue);
    setNewKey('');
    setNewValue('');
    setShowAddForm(false);
    setRefreshKey(k => k + 1);
  }, [storageType, newKey, newValue]);

  const handleDelete = useCallback(
    (key: string) => {
      if (confirm(`確定要刪除「${key}」嗎？`)) {
        deleteStorageItem(storageType, key);
        setRefreshKey(k => k + 1);
      }
    },
    [storageType]
  );

  const handleClearAll = useCallback(() => {
    if (confirm(`確定要清空所有 ${storageType === 'local' ? 'LocalStorage' : 'SessionStorage'} 項目嗎？`)) {
      clearStorage(storageType);
      setRefreshKey(k => k + 1);
    }
  }, [storageType]);

  const handleEdit = useCallback(
    (key: string, currentValue: string) => {
      const newValue = prompt(`編輯「${key}」的值：`, currentValue);
      if (newValue !== null) {
        setStorageItem(storageType, key, newValue);
        setRefreshKey(k => k + 1);
      }
    },
    [storageType]
  );

  const totalSize = getTotalStorageSize(storageType);

  return (
    <ToolPageWrapper
      title="Storage 管理器"
      description="管理瀏覽器的 LocalStorage 和 SessionStorage"
      actions={
        <>
          <ToolButton onClick={() => setShowAddForm(!showAddForm)} icon={<Plus size={16} />}>
            新增項目
          </ToolButton>
          <ToolButton onClick={() => setRefreshKey(k => k + 1)} variant="secondary" icon={<RefreshCw size={16} />}>
            重新整理
          </ToolButton>
          <ToolButton onClick={handleClearAll} variant="secondary" icon={<Trash2 size={16} />}>
            清空全部
          </ToolButton>
        </>
      }
    >
      {/* Storage Type Selector */}
      <ToolSection>
        <div className="flex gap-4">
          <button
            onClick={() => setStorageType('local')}
            className={`flex-1 p-4 rounded-lg border-2 transition-all ${
              storageType === 'local'
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
            }`}
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <Database size={20} />
              <span className="font-bold text-gray-800 dark:text-white">LocalStorage</span>
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              永久儲存（直到手動清除）
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-500 mt-2">
              {items.length} 個項目 • {formatBytes(totalSize)}
            </div>
          </button>

          <button
            onClick={() => setStorageType('session')}
            className={`flex-1 p-4 rounded-lg border-2 transition-all ${
              storageType === 'session'
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
            }`}
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <Database size={20} />
              <span className="font-bold text-gray-800 dark:text-white">SessionStorage</span>
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              僅在當前分頁有效
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-500 mt-2">
              {storageType === 'session' ? `${items.length} 個項目 • ${formatBytes(totalSize)}` : '切換以查看'}
            </div>
          </button>
        </div>
      </ToolSection>

      {/* Add New Item Form */}
      {showAddForm && (
        <ToolSection title="新增項目">
          <div className="space-y-3">
            <div>
              <label className="input-label">鍵名（Key）</label>
              <input
                type="text"
                value={newKey}
                onChange={(e) => setNewKey(e.target.value)}
                placeholder="例如：username"
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label className="input-label">值（Value）</label>
              <textarea
                value={newValue}
                onChange={(e) => setNewValue(e.target.value)}
                placeholder="例如：John Doe"
                rows={3}
                className="tool-textarea"
              />
            </div>
            <div className="flex gap-2">
              <ToolButton onClick={handleAdd}>儲存</ToolButton>
              <ToolButton
                onClick={() => {
                  setShowAddForm(false);
                  setNewKey('');
                  setNewValue('');
                }}
                variant="secondary"
              >
                取消
              </ToolButton>
            </div>
          </div>
        </ToolSection>
      )}

      {/* Storage Items List */}
      <ToolSection title={`${storageType === 'local' ? 'LocalStorage' : 'SessionStorage'} 項目`}>
        {items.length === 0 ? (
          <div className="text-center py-12 text-gray-400 dark:text-gray-500">
            <Database size={48} className="mx-auto mb-3 opacity-50" />
            <p>目前沒有任何項目</p>
          </div>
        ) : (
          <div className="space-y-3">
            {items.map((item) => (
              <div
                key={item.key}
                className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-mono font-semibold text-blue-600 dark:text-blue-400 text-sm">
                        {item.key}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        ({formatBytes(item.size)})
                      </span>
                    </div>
                    <pre className="text-xs text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-900 p-3 rounded border border-gray-200 dark:border-gray-700 overflow-x-auto break-all whitespace-pre-wrap">
                      {item.value}
                    </pre>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(item.key, item.value)}
                      className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded transition-colors"
                      title="編輯"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(item.key)}
                      className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
                      title="刪除"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </ToolSection>

      <ToolSection>
        <div className="prose dark:prose-invert max-w-none">
          <h3 className="text-lg font-semibold mb-2">關於 Web Storage</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-400">
            <div>
              <h4 className="font-semibold text-gray-800 dark:text-white mb-2">LocalStorage</h4>
              <ul className="space-y-1">
                <li>✅ 永久儲存在瀏覽器中</li>
                <li>✅ 容量約 5-10MB</li>
                <li>✅ 同源所有分頁共享</li>
                <li>⚠️ 只能儲存字串</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 dark:text-white mb-2">SessionStorage</h4>
              <ul className="space-y-1">
                <li>✅ 分頁關閉後自動清除</li>
                <li>✅ 容量約 5-10MB</li>
                <li>⚠️ 僅限當前分頁使用</li>
                <li>⚠️ 只能儲存字串</li>
              </ul>
            </div>
          </div>
        </div>
      </ToolSection>
    </ToolPageWrapper>
  );
}
