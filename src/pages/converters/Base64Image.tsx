import { useState, useCallback, useRef } from 'react';
import ToolPageWrapper, {
  ToolSection,
  ToolInput,
  ToolButton,
  TwoColumnLayout,
  CopyButton,
} from '../../components/ToolPageWrapper';
import { Image as ImageIcon, Upload, RefreshCw } from 'lucide-react';

export default function Base64Image() {
  const [base64String, setBase64String] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [error, setError] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleBase64ToImage = useCallback(() => {
    if (!base64String.trim()) {
      setImagePreview('');
      setError('');
      return;
    }

    try {
      // Check if it's a valid data URL or just base64
      let dataUrl = base64String.trim();
      
      if (!dataUrl.startsWith('data:')) {
        // Assume it's image/png if no mime type specified
        dataUrl = `data:image/png;base64,${dataUrl}`;
      }

      // Validate by creating an image
      const img = new Image();
      img.onload = () => {
        setImagePreview(dataUrl);
        setError('');
      };
      img.onerror = () => {
        setError('無效的 Base64 圖片格式');
        setImagePreview('');
      };
      img.src = dataUrl;
    } catch {
      setError('解析 Base64 字串失敗');
      setImagePreview('');
    }
  }, [base64String]);

  const handleFileSelect = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('請選擇圖片檔案');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setBase64String(result);
      setImagePreview(result);
      setError('');
    };
    reader.onerror = () => {
      setError('讀取檔案失敗');
    };
    reader.readAsDataURL(file);
  }, []);

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        handleFileSelect(file);
      }
    },
    [handleFileSelect]
  );

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);

      const file = e.dataTransfer.files[0];
      if (file) {
        handleFileSelect(file);
      }
    },
    [handleFileSelect]
  );

  const handleClear = useCallback(() => {
    setBase64String('');
    setImagePreview('');
    setError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, []);

  const loadSample = useCallback(() => {
    // Small 1x1 red pixel PNG
    const sampleBase64 =
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8DwHwAFBQIAX8jx0gAAAABJRU5ErkJggg==';
    setBase64String(sampleBase64);
    setImagePreview(sampleBase64);
    setError('');
  }, []);

  // Trigger preview when base64 changes
  useState(() => {
    handleBase64ToImage();
  });

  return (
    <ToolPageWrapper
      title="Base64 圖片工具"
      description="Base64 字串轉圖片預覽，或上傳圖片轉 Base64"
      actions={
        <>
          <ToolButton onClick={loadSample} icon={<ImageIcon size={16} />}>
            載入範例
          </ToolButton>
          <ToolButton onClick={handleClear} variant="secondary" icon={<RefreshCw size={16} />}>
            清空
          </ToolButton>
        </>
      }
    >
      {error && (
        <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg text-sm">
          {error}
        </div>
      )}

      <TwoColumnLayout>
        <ToolSection title="Base64 字串">
          <ToolInput
            label="Base64 編碼"
            value={base64String}
            onChange={(value) => {
              setBase64String(value);
              // Auto-preview on change
              setTimeout(() => handleBase64ToImage(), 100);
            }}
            placeholder="貼上 Base64 字串或 Data URL..."
            rows={8}
            monospace
          />
          <div className="mt-3 flex gap-2">
            <ToolButton onClick={handleBase64ToImage}>預覽圖片</ToolButton>
            <CopyButton text={base64String} label="複製" />
          </div>
        </ToolSection>

        <ToolSection title="圖片預覽">
          {imagePreview ? (
            <div className="border-2 border-gray-300 dark:border-gray-600 rounded-lg p-4 bg-gray-50 dark:bg-gray-800 flex items-center justify-center min-h-[200px]">
              <img
                src={imagePreview}
                alt="Preview"
                className="max-w-full max-h-[400px] object-contain"
              />
            </div>
          ) : (
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center text-gray-400 dark:text-gray-500 min-h-[200px] flex items-center justify-center">
              <div>
                <ImageIcon size={48} className="mx-auto mb-2 opacity-50" />
                <p>圖片預覽將顯示在這裡</p>
              </div>
            </div>
          )}
        </ToolSection>
      </TwoColumnLayout>

      <ToolSection title="上傳圖片">
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragActive
              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
              : 'border-gray-300 dark:border-gray-600'
          }`}
        >
          <Upload
            size={48}
            className={`mx-auto mb-4 ${
              dragActive ? 'text-blue-500' : 'text-gray-400 dark:text-gray-500'
            }`}
          />
          <p className="text-gray-600 dark:text-gray-400 mb-2">
            拖放圖片到這裡，或點擊下方按鈕選擇檔案
          </p>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileInput}
            className="hidden"
            id="file-upload"
          />
          <label htmlFor="file-upload" className="cursor-pointer">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 font-medium">
              <Upload size={16} />
              選擇圖片檔案
            </span>
          </label>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
            支援 JPG、PNG、GIF、WebP 等格式
          </p>
        </div>
      </ToolSection>

      <ToolSection>
        <div className="prose dark:prose-invert max-w-none">
          <h3 className="text-lg font-semibold mb-2">功能說明</h3>
          <div className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
            <p><strong>Base64 轉圖片：</strong></p>
            <ul className="list-disc list-inside space-y-1">
              <li>貼上 Base64 字串或完整的 Data URL</li>
              <li>自動檢測並預覽圖片</li>
              <li>支援所有常見圖片格式</li>
            </ul>
            <p className="mt-2"><strong>圖片轉 Base64：</strong></p>
            <ul className="list-disc list-inside space-y-1">
              <li>拖放圖片檔案到上傳區</li>
              <li>或點擊按鈕選擇檔案</li>
              <li>自動產生 Base64 Data URL</li>
              <li>可直接複製使用在 HTML/CSS 中</li>
            </ul>
            <p className="mt-2"><strong>常見用途：</strong></p>
            <ul className="list-disc list-inside space-y-1">
              <li>在 CSS 中內嵌小圖示</li>
              <li>在 HTML 中嵌入圖片</li>
              <li>減少 HTTP 請求次數</li>
              <li>在 JSON API 中傳輸圖片</li>
            </ul>
          </div>
        </div>
      </ToolSection>
    </ToolPageWrapper>
  );
}
