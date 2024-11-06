/**
 * Convert string to Unicode escape sequences
 */
export function stringToUnicode(str: string): string {
  return str
    .split('')
    .map((char) => {
      const code = char.charCodeAt(0);
      // Only escape non-ASCII characters
      if (code > 127) {
        return '\\u' + ('0000' + code.toString(16)).slice(-4);
      }
      return char;
    })
    .join('');
}

/**
 * Convert Unicode escape sequences to string
 */
export function unicodeToString(unicode: string): string {
  try {
    // Replace \uXXXX with actual characters
    return unicode.replace(/\\u([\dA-F]{4})/gi, (_match, group) => {
      return String.fromCharCode(parseInt(group, 16));
    });
  } catch (error) {
    throw new Error('無效的 Unicode 格式');
  }
}

/**
 * Get character code point information
 */
export function getCharInfo(char: string): {
  char: string;
  unicode: string;
  decimal: number;
  hex: string;
  html: string;
} {
  const code = char.charCodeAt(0);
  return {
    char,
    unicode: '\\u' + ('0000' + code.toString(16)).slice(-4),
    decimal: code,
    hex: '0x' + code.toString(16).toUpperCase(),
    html: '&#' + code + ';',
  };
}
