/**
 * Format JavaScript with proper indentation
 */
export function formatJavaScript(js: string, indentSize: number = 2): string {
  if (!js || !js.trim()) {
    throw new Error('請輸入 JavaScript 內容');
  }

  let formatted = '';
  let indent = 0;
  const tab = ' '.repeat(indentSize);
  let inString = false;
  let stringChar = '';
  let inComment = false;
  let inMultiComment = false;
  
  for (let i = 0; i < js.length; i++) {
    const char = js[i];
    const nextChar = js[i + 1];
    const prevChar = js[i - 1];
    
    // Handle multi-line comments
    if (!inString && char === '/' && nextChar === '*') {
      inMultiComment = true;
      formatted += char;
      continue;
    }
    if (inMultiComment && char === '*' && nextChar === '/') {
      formatted += char;
      continue;
    }
    if (inMultiComment && char === '/' && prevChar === '*') {
      inMultiComment = false;
      formatted += char;
      continue;
    }
    if (inMultiComment) {
      formatted += char;
      continue;
    }
    
    // Handle single-line comments
    if (!inString && char === '/' && nextChar === '/') {
      inComment = true;
      formatted += char;
      continue;
    }
    if (inComment && char === '\n') {
      inComment = false;
      formatted += char;
      continue;
    }
    if (inComment) {
      formatted += char;
      continue;
    }
    
    // Handle strings
    if ((char === '"' || char === "'" || char === '`') && prevChar !== '\\') {
      if (!inString) {
        inString = true;
        stringChar = char;
      } else if (char === stringChar) {
        inString = false;
        stringChar = '';
      }
      formatted += char;
      continue;
    }
    
    if (inString) {
      formatted += char;
      continue;
    }
    
    // Format non-string content
    if (char === '{' || char === '[') {
      formatted += char;
      indent++;
      if (nextChar !== '}' && nextChar !== ']') {
        formatted += '\n' + tab.repeat(indent);
      }
    } else if (char === '}' || char === ']') {
      indent = Math.max(0, indent - 1);
      if (prevChar !== '{' && prevChar !== '[' && formatted.trim()) {
        formatted = formatted.trimEnd() + '\n' + tab.repeat(indent);
      }
      formatted += char;
    } else if (char === ';') {
      formatted += char;
      if (nextChar && nextChar !== '\n' && nextChar !== '\r') {
        formatted += '\n' + tab.repeat(indent);
      }
    } else if (char === ',') {
      formatted += char + ' ';
    } else if (char === '\n' || char === '\r') {
      // Skip extra newlines
      if (formatted && !formatted.endsWith('\n')) {
        formatted += '\n' + tab.repeat(indent);
      }
    } else if (char === ' ' || char === '\t') {
      // Skip if previous char was whitespace or newline
      if (formatted && !formatted.endsWith(' ') && !formatted.endsWith('\n')) {
        formatted += ' ';
      }
    } else {
      formatted += char;
    }
  }
  
  return formatted
    .split('\n')
    .map(line => line.trimEnd())
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

/**
 * Minify JavaScript by removing unnecessary whitespace and comments
 */
export function minifyJavaScript(js: string): string {
  if (!js || !js.trim()) {
    throw new Error('請輸入 JavaScript 內容');
  }
  
  let minified = js;
  
  // Remove single-line comments (but preserve URLs like http://)
  minified = minified.replace(/(?<![:/])\/\/.*$/gm, '');
  
  // Remove multi-line comments
  minified = minified.replace(/\/\*[\s\S]*?\*\//g, '');
  
  // Remove extra whitespace
  minified = minified
    .replace(/\s{2,}/g, ' ')
    .replace(/\n\s*/g, '')
    .replace(/\s*([{}\[\];,:])\s*/g, '$1')
    .trim();
  
  return minified;
}

/**
 * Validate if string is valid JavaScript (basic check)
 */
export function isValidJavaScript(js: string): boolean {
  try {
    new Function(js);
    return true;
  } catch (e) {
    return false;
  }
}
