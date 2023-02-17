export function encodeBase64(input: string): string {
  if (!input) {
    return '';
  }
  
  try {
    return btoa(unescape(encodeURIComponent(input)));
  } catch (error) {
    throw new Error('編碼失敗：無效的輸入字元');
  }
}

export function decodeBase64(input: string): string {
  if (!input) {
    return '';
  }
  
  try {
    return decodeURIComponent(escape(atob(input)));
  } catch (error) {
    throw new Error('解碼失敗：無效的 Base64 字串');
  }
}
