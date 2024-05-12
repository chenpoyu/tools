export interface StorageItem {
  key: string;
  value: string;
  size: number;
}

/**
 * Get all items from localStorage
 */
export function getLocalStorageItems(): StorageItem[] {
  const items: StorageItem[] = [];
  
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key) {
      const value = localStorage.getItem(key) || '';
      items.push({
        key,
        value,
        size: new Blob([value]).size,
      });
    }
  }
  
  return items.sort((a, b) => a.key.localeCompare(b.key));
}

/**
 * Get all items from sessionStorage
 */
export function getSessionStorageItems(): StorageItem[] {
  const items: StorageItem[] = [];
  
  for (let i = 0; i < sessionStorage.length; i++) {
    const key = sessionStorage.key(i);
    if (key) {
      const value = sessionStorage.getItem(key) || '';
      items.push({
        key,
        value,
        size: new Blob([value]).size,
      });
    }
  }
  
  return items.sort((a, b) => a.key.localeCompare(b.key));
}

/**
 * Set item in storage
 */
export function setStorageItem(
  storageType: 'local' | 'session',
  key: string,
  value: string
): void {
  const storage = storageType === 'local' ? localStorage : sessionStorage;
  storage.setItem(key, value);
}

/**
 * Delete item from storage
 */
export function deleteStorageItem(storageType: 'local' | 'session', key: string): void {
  const storage = storageType === 'local' ? localStorage : sessionStorage;
  storage.removeItem(key);
}

/**
 * Clear all items from storage
 */
export function clearStorage(storageType: 'local' | 'session'): void {
  const storage = storageType === 'local' ? localStorage : sessionStorage;
  storage.clear();
}

/**
 * Get total storage size
 */
export function getTotalStorageSize(storageType: 'local' | 'session'): number {
  const items =
    storageType === 'local' ? getLocalStorageItems() : getSessionStorageItems();
  return items.reduce((total, item) => total + item.size, 0);
}

/**
 * Format bytes to human readable
 */
export function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}
