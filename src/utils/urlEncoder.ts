export function encodeUrl(input: string): string {
  if (!input) {
    return '';
  }
  
  try {
    return encodeURIComponent(input);
  } catch (error) {
    throw new Error('編碼失敗：無效的輸入');
  }
}

export function decodeUrl(input: string): string {
  if (!input) {
    return '';
  }
  
  try {
    return decodeURIComponent(input);
  } catch (error) {
    throw new Error('解碼失敗：無效的 URL 編碼字串');
  }
}

export function encodeFullUrl(input: string): string {
  if (!input) {
    return '';
  }
  
  try {
    return encodeURI(input);
  } catch (error) {
    throw new Error('編碼失敗：無效的 URL');
  }
}

export function decodeFullUrl(input: string): string {
  if (!input) {
    return '';
  }
  
  try {
    return decodeURI(input);
  } catch (error) {
    throw new Error('解碼失敗：無效的 URL');
  }
}
