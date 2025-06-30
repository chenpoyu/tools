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
