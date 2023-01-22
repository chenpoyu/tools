import { Code2, Wrench, Sparkles } from 'lucide-react';

export default function Home() {
  return (
    <div className="tool-container">
      <div className="text-center py-12">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-blue-100 dark:bg-blue-900 rounded-full">
            <Wrench size={48} className="text-blue-600 dark:text-blue-400" />
          </div>
        </div>

        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
          歡迎使用 Poyu 的常用開發工具
        </h1>
        
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
          為開發者打造的實用工具集，提升你的日常開發效率。<br />
          從左側選單選擇工具開始使用。
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="flex justify-center mb-4">
              <Code2 className="text-blue-600 dark:text-blue-400" size={32} />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
              轉換工具
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Base64、URL、Unicode、JWT、時間戳記等轉換器
            </p>
          </div>

          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="flex justify-center mb-4">
              <Sparkles className="text-purple-600 dark:text-purple-400" size={32} />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
              格式化工具
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              JSON、SQL、XML 格式化與美化工具
            </p>
          </div>

          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="flex justify-center mb-4">
              <Wrench className="text-green-600 dark:text-green-400" size={32} />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
              更多工具
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              安全性、前端開發、網路工具等
            </p>
          </div>
        </div>

        <div className="mt-12 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <p className="text-sm text-blue-800 dark:text-blue-300">
            💡 <strong>提示：</strong>所有工具都在瀏覽器中運行，
            你的資料不會離開裝置，確保隱私安全。
          </p>
        </div>
      </div>
    </div>
  );
}
