/**
 * Minify SVG by removing unnecessary whitespace and formatting
 */
export function minifySVG(svg: string): string {
  return svg
    .replace(/\s+/g, ' ') // Replace multiple spaces with single space
    .replace(/>\s+</g, '><') // Remove spaces between tags
    .replace(/\s*=\s*/g, '=') // Remove spaces around =
    .replace(/"\s+/g, '" ') // Clean up after attributes
    .trim();
}

/**
 * Prettify SVG with proper indentation
 */
export function prettifySVG(svg: string): string {
  let formatted = '';
  let indent = 0;
  const indentSize = 2;

  // First minify to normalize
  const minified = minifySVG(svg);

  // Split by tags
  const tags = minified.split(/(<[^>]+>)/g).filter((s) => s.trim());

  tags.forEach((tag) => {
    if (!tag.startsWith('<')) {
      // Text content
      if (tag.trim()) {
        formatted += ' '.repeat(indent * indentSize) + tag.trim() + '\n';
      }
    } else if (tag.startsWith('</')) {
      // Closing tag
      indent--;
      formatted += ' '.repeat(indent * indentSize) + tag + '\n';
    } else if (tag.endsWith('/>')) {
      // Self-closing tag
      formatted += ' '.repeat(indent * indentSize) + tag + '\n';
    } else {
      // Opening tag
      formatted += ' '.repeat(indent * indentSize) + tag + '\n';
      indent++;
    }
  });

  return formatted.trim();
}

/**
 * Optimize SVG path data
 */
export function optimizeSVGPath(svg: string): string {
  // Optimize path data by removing unnecessary decimals
  return svg.replace(/d="([^"]*)"/g, (_match, path) => {
    const optimized = path
      .replace(/(\d+\.\d{3,})/g, (num: string) => parseFloat(num).toFixed(2))
      .replace(/\s+/g, ' ')
      .trim();
    return `d="${optimized}"`;
  });
}

/**
 * Get SVG statistics
 */
export function getSVGStats(svg: string): {
  size: number;
  minifiedSize: number;
  pathCount: number;
  elementCount: number;
  viewBox: string | null;
} {
  const minified = minifySVG(svg);
  const pathMatches = svg.match(/<path/g);
  const elementMatches = svg.match(/<\w+/g);
  const viewBoxMatch = svg.match(/viewBox="([^"]*)"/);

  return {
    size: svg.length,
    minifiedSize: minified.length,
    pathCount: pathMatches ? pathMatches.length : 0,
    elementCount: elementMatches ? elementMatches.length : 0,
    viewBox: viewBoxMatch ? viewBoxMatch[1] : null,
  };
}

/**
 * Validate SVG format
 */
export function validateSVG(svg: string): { valid: boolean; error?: string } {
  if (!svg.trim()) {
    return { valid: false, error: '請輸入 SVG 代碼' };
  }

  if (!svg.includes('<svg')) {
    return { valid: false, error: '無效的 SVG 格式：缺少 <svg> 標籤' };
  }

  if (!svg.includes('</svg>')) {
    return { valid: false, error: '無效的 SVG 格式：缺少 </svg> 結束標籤' };
  }

  return { valid: true };
}
