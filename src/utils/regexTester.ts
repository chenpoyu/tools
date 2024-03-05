export interface RegexMatch {
  fullMatch: string;
  groups: string[];
  index: number;
  lastIndex: number;
}

/**
 * Test regex against text and return all matches
 */
export function testRegex(pattern: string, flags: string, text: string): RegexMatch[] {
  try {
    const regex = new RegExp(pattern, flags);
    const matches: RegexMatch[] = [];
    
    if (flags.includes('g')) {
      // Global flag - find all matches
      let match;
      while ((match = regex.exec(text)) !== null) {
        matches.push({
          fullMatch: match[0],
          groups: match.slice(1),
          index: match.index,
          lastIndex: regex.lastIndex,
        });
        
        // Prevent infinite loop for zero-length matches
        if (match.index === regex.lastIndex) {
          regex.lastIndex++;
        }
      }
    } else {
      // Single match
      const match = regex.exec(text);
      if (match) {
        matches.push({
          fullMatch: match[0],
          groups: match.slice(1),
          index: match.index,
          lastIndex: match.index + match[0].length,
        });
      }
    }
    
    return matches;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : '正則表達式錯誤');
  }
}

/**
 * Validate regex pattern
 */
export function validateRegex(pattern: string, flags: string): { valid: boolean; error?: string } {
  if (!pattern) {
    return { valid: false, error: '請輸入正則表達式' };
  }

  try {
    new RegExp(pattern, flags);
    return { valid: true };
  } catch (error) {
    return {
      valid: false,
      error: error instanceof Error ? error.message : '無效的正則表達式',
    };
  }
}

/**
 * Highlight matches in text
 */
export function highlightMatches(text: string, matches: RegexMatch[]): string {
  if (matches.length === 0) return text;

  // Sort matches by index in reverse order
  const sortedMatches = [...matches].sort((a, b) => b.index - a.index);

  let result = text;
  sortedMatches.forEach((match) => {
    const before = result.slice(0, match.index);
    const matched = result.slice(match.index, match.lastIndex);
    const after = result.slice(match.lastIndex);
    result = before + `<mark>${matched}</mark>` + after;
  });

  return result;
}

/**
 * Common regex patterns
 */
export const commonPatterns = [
  { name: 'Email 信箱', pattern: '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}', flags: 'g' },
  { name: 'URL 網址', pattern: 'https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)', flags: 'g' },
  { name: 'IPv4 位址', pattern: '\\b(?:\\d{1,3}\\.){3}\\d{1,3}\\b', flags: 'g' },
  { name: '電話號號碼（台灣）', pattern: '09\\d{8}', flags: 'g' },
  { name: '日期 (YYYY-MM-DD)', pattern: '\\d{4}-\\d{2}-\\d{2}', flags: 'g' },
  { name: '時間 (HH:MM)', pattern: '([01]?\\d|2[0-3]):[0-5]\\d', flags: 'g' },
  { name: 'HTML 標籤', pattern: '<[^>]+>', flags: 'g' },
  { name: '16進位顏色碼', pattern: '#[0-9a-fA-F]{6}\\b|#[0-9a-fA-F]{3}\\b', flags: 'g' },
];
