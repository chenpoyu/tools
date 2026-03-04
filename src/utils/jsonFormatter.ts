export function formatJson(input: string, spacing: number): string {
  if (!input.trim()) {
    return '';
  }
  
  try {
    const parsed = JSON.parse(input);
    return JSON.stringify(parsed, null, spacing);
  } catch (error) {
    throw new Error('無效的 JSON 格式');
  }
}

export function minifyJson(input: string): string {
  if (!input.trim()) {
    return '';
  }
  
  try {
    const parsed = JSON.parse(input);
    return JSON.stringify(parsed);
  } catch (error) {
    throw new Error('無效的 JSON 格式');
  }
}

/**
 * 將「已 escape 的字串」還原為原始字元，再格式化為 JSON。
 * 例如：字面上的 \n → 換行、\" → "、\t → tab
 */
export function unescapeJsonString(input: string): string {
  if (!input) {
    return '';
  }

  // Replace literal escape sequences (two-character sequences) with real characters
  return input
    .replace(/\\n/g, '\n')
    .replace(/\\r/g, '\r')
    .replace(/\\t/g, '\t')
    .replace(/\\"/g, '"')
    .replace(/\\\\/g, '\\');
}
