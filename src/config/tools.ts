export interface Tool {
  id: string;
  name: string;
  path: string;
  category: 'Converters' | 'Formatters' | 'System' | 'Security' | 'Frontend' | 'Network';
  description: string;
  icon?: string;
}

export const toolsConfig: Tool[] = [
  // Converters
  {
    id: 'base64',
    name: 'Base64 Encoder/Decoder',
    path: '/converters/base64',
    category: 'Converters',
    description: 'Encode and decode Base64 strings',
  },
  {
    id: 'url',
    name: 'URL Encoder/Decoder',
    path: '/converters/url',
    category: 'Converters',
    description: 'Encode and decode URL strings',
  },
  {
    id: 'unicode',
    name: 'Unicode Converter',
    path: '/converters/unicode',
    category: 'Converters',
    description: 'Convert between Unicode and text',
  },
  {
    id: 'jwt-decoder',
    name: 'JWT Decoder',
    path: '/converters/jwt-decoder',
    category: 'Converters',
    description: 'Decode and inspect JWT tokens',
  },
  {
    id: 'timestamp',
    name: 'Unix Timestamp',
    path: '/converters/timestamp',
    category: 'Converters',
    description: 'Convert Unix timestamp to date and vice versa',
  },
  {
    id: 'cron',
    name: 'Cron Expression',
    path: '/converters/cron',
    category: 'Converters',
    description: 'Generate and explain cron expressions',
  },

  // Formatters
  {
    id: 'json-format',
    name: 'JSON Formatter',
    path: '/formatters/json',
    category: 'Formatters',
    description: 'Format and minify JSON data',
  },
  {
    id: 'sql-format',
    name: 'SQL Formatter',
    path: '/formatters/sql',
    category: 'Formatters',
    description: 'Format SQL queries',
  },
  {
    id: 'xml-format',
    name: 'XML Prettifier',
    path: '/formatters/xml',
    category: 'Formatters',
    description: 'Format and prettify XML documents',
  },
  {
    id: 'diff',
    name: 'Text Diff Checker',
    path: '/formatters/diff',
    category: 'Formatters',
    description: 'Compare two texts and highlight differences',
  },
  {
    id: 'markdown-preview',
    name: 'Markdown Preview',
    path: '/converters/markdown-preview',
    category: 'Formatters',
    description: 'Preview Markdown in real-time',
  },
  {
    id: 'regex-tester',
    name: 'Regex Tester',
    path: '/converters/regex-tester',
    category: 'Formatters',
    description: 'Test regular expressions with live matching',
  },
  {
    id: 'html-editor',
    name: 'HTML Editor',
    path: '/formatters/html-editor',
    category: 'Formatters',
    description: 'Edit and preview HTML templates in real-time',
  },

  // Security
  {
    id: 'password',
    name: 'Password Generator',
    path: '/security/password',
    category: 'Security',
    description: 'Generate secure random passwords',
  },
  {
    id: 'hash',
    name: 'Hash Calculator',
    path: '/security/hash',
    category: 'Security',
    description: 'Calculate MD5, SHA256 hashes',
  },
  {
    id: 'csp',
    name: 'CSP Generator',
    path: '/security/csp',
    category: 'Security',
    description: 'Generate Content Security Policy headers',
  },
  {
    id: 'taiwan-id',
    name: 'Taiwan ID Generator',
    path: '/security/taiwan-id',
    category: 'Security',
    description: 'Generate and validate Taiwan National ID and Resident Certificate numbers',
  },
  {
    id: 'guid',
    name: 'GUID Generator',
    path: '/security/guid',
    category: 'Security',
    description: 'Generate GUIDs/UUIDs with customizable format options',
  },

  // Frontend
  {
    id: 'flexbox',
    name: 'Flexbox Visualizer',
    path: '/frontend/flexbox',
    category: 'Frontend',
    description: 'Visualize CSS Flexbox layouts',
  },
  {
    id: 'grid',
    name: 'Grid Visualizer',
    path: '/frontend/grid',
    category: 'Frontend',
    description: 'Visualize CSS Grid layouts',
  },
  {
    id: 'color-contrast',
    name: 'Color Contrast',
    path: '/frontend/color-contrast',
    category: 'Frontend',
    description: 'Check color contrast for accessibility',
  },
  {
    id: 'svg-optimizer',
    name: 'SVG Optimizer',
    path: '/converters/svg-optimizer',
    category: 'Frontend',
    description: 'Minify and prettify SVG code',
  },
  {
    id: 'storage-manager',
    name: 'Storage Manager',
    path: '/system/storage-manager',
    category: 'Frontend',
    description: 'Manage localStorage and sessionStorage',
  },
  {
    id: 'base64-image',
    name: 'Base64 Image',
    path: '/converters/base64-image',
    category: 'Converters',
    description: 'Convert images to Base64 and preview Base64 images',
  },

  // Network
  {
    id: 'http-codes',
    name: 'HTTP Status Codes',
    path: '/network/http-codes',
    category: 'Network',
    description: 'Reference for HTTP status codes',
  },
  {
    id: 'cidr',
    name: 'IP CIDR Calculator',
    path: '/network/cidr',
    category: 'Network',
    description: 'Calculate IP ranges from CIDR notation',
  },
  {
    id: 'ua-parser',
    name: 'User-Agent Parser',
    path: '/network/ua-parser',
    category: 'Network',
    description: 'Parse and analyze User-Agent strings',
  },
  {
    id: 'ip-lookup',
    name: 'IP Address Lookup',
    path: '/network/ip-lookup',
    category: 'Network',
    description: 'Lookup IP address location and details',
  },

  // System
  {
    id: 'cheatsheet',
    name: 'Command Cheat Sheet',
    path: '/system/cheatsheet',
    category: 'System',
    description: 'Quick reference for Git, Docker, Linux commands',
  },
];

export const getToolsByCategory = (category: Tool['category']): Tool[] => {
  return toolsConfig.filter((tool) => tool.category === category);
};

export const getToolById = (id: string): Tool | undefined => {
  return toolsConfig.find((tool) => tool.id === id);
};

export const categories: Tool['category'][] = [
  'Converters',
  'Formatters',
  'System',
  'Security',
  'Frontend',
  'Network',
];
