/**
 * Format HTML with proper indentation
 */
export function formatHtml(html: string, indentSize: number = 2): string {
  if (!html || !html.trim()) {
    throw new Error('請輸入 HTML 內容');
  }

  let formatted = '';
  let indent = 0;
  const tab = ' '.repeat(indentSize);
  
  // Remove all existing whitespace between tags
  html = html.replace(/>\s+</g, '><').trim();
  
  // Self-closing tags
  const selfClosing = /^(area|base|br|col|embed|hr|img|input|link|meta|param|source|track|wbr)$/i;
  
  // Inline tags that should not trigger newlines
  const inline = /^(a|abbr|acronym|b|bdo|big|br|button|cite|code|dfn|em|i|img|input|kbd|label|map|object|q|samp|script|select|small|span|strong|sub|sup|textarea|tt|var)$/i;
  
  const tokens = html.match(/<\/?[^>]+>|[^<]+/g) || [];
  
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i].trim();
    if (!token) continue;
    
    if (token.startsWith('</')) {
      // Closing tag
      const tagName = token.match(/<\/(\w+)/)?.[1] || '';
      if (!inline.test(tagName)) {
        indent = Math.max(0, indent - 1);
        formatted += '\n' + tab.repeat(indent);
      }
      formatted += token;
    } else if (token.startsWith('<')) {
      // Opening or self-closing tag
      const tagName = token.match(/<(\w+)/)?.[1] || '';
      const isSelfClosing = selfClosing.test(tagName) || token.endsWith('/>');
      const isInline = inline.test(tagName);
      
      if (!isInline && formatted && !formatted.endsWith('\n')) {
        formatted += '\n' + tab.repeat(indent);
      } else if (isInline && formatted && !formatted.endsWith('>')) {
        formatted += '\n' + tab.repeat(indent);
      }
      
      formatted += token;
      
      if (!isSelfClosing && !isInline) {
        indent++;
      }
    } else {
      // Text content
      const trimmedText = token.trim();
      if (trimmedText) {
        formatted += trimmedText;
      }
    }
  }
  
  return formatted.trim();
}

/**
 * Minify HTML by removing unnecessary whitespace
 */
export function minifyHtml(html: string): string {
  if (!html || !html.trim()) {
    throw new Error('請輸入 HTML 內容');
  }
  
  return html
    .replace(/<!--[\s\S]*?-->/g, '') // Remove comments
    .replace(/>\s+</g, '><') // Remove whitespace between tags
    .replace(/\s{2,}/g, ' ') // Replace multiple spaces with single space
    .trim();
}

/**
 * Validate if string is valid HTML
 */
export function isValidHtml(html: string): boolean {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  return !doc.querySelector('parsererror');
}
