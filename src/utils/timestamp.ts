export function timestampToDate(timestamp: string | number, unit: 'seconds' | 'milliseconds'): Date {
  const ts = typeof timestamp === 'string' ? parseInt(timestamp, 10) : timestamp;
  
  if (isNaN(ts)) {
    throw new Error('無效的時間戳記格式');
  }
  
  const msTimestamp = unit === 'seconds' ? ts * 1000 : ts;
  return new Date(msTimestamp);
}

export function dateToTimestamp(date: Date, unit: 'seconds' | 'milliseconds'): number {
  const ms = date.getTime();
  return unit === 'seconds' ? Math.floor(ms / 1000) : ms;
}

export function formatDate(date: Date): string {
  return date.toISOString();
}

export function formatLocalDate(date: Date): string {
  return date.toLocaleString('zh-TW', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });
}

export function getCurrentTimestamp(unit: 'seconds' | 'milliseconds'): number {
  const now = Date.now();
  return unit === 'seconds' ? Math.floor(now / 1000) : now;
}
