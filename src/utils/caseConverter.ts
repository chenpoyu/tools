/**
 * Case conversion utilities for transforming strings between different naming conventions
 */

export type CaseType = 
  | 'camelCase'
  | 'PascalCase'
  | 'snake_case'
  | 'SCREAMING_SNAKE_CASE'
  | 'kebab-case'
  | 'SCREAMING-KEBAB-CASE'
  | 'Title Case'
  | 'Sentence case'
  | 'lowercase'
  | 'UPPERCASE';

/**
 * Split string into words by detecting separators and case changes
 */
function splitIntoWords(str: string): string[] {
  if (!str) return [];
  
  // Replace common separators with spaces
  let normalized = str
    .replace(/([a-z])([A-Z])/g, '$1 $2') // camelCase -> camel Case
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2') // ABCDef -> ABC Def
    .replace(/[_-]+/g, ' ') // snake_case, kebab-case -> spaces
    .replace(/\s+/g, ' ') // multiple spaces -> single space
    .trim();
  
  // Split by spaces and filter empty strings
  return normalized.split(' ').filter(word => word.length > 0);
}

/**
 * Convert string to camelCase
 * Example: hello_world -> helloWorld
 */
export function toCamelCase(str: string): string {
  const words = splitIntoWords(str);
  if (words.length === 0) return '';
  
  return words
    .map((word, index) => {
      const lower = word.toLowerCase();
      return index === 0 ? lower : lower.charAt(0).toUpperCase() + lower.slice(1);
    })
    .join('');
}

/**
 * Convert string to PascalCase
 * Example: hello_world -> HelloWorld
 */
export function toPascalCase(str: string): string {
  const words = splitIntoWords(str);
  return words
    .map(word => {
      const lower = word.toLowerCase();
      return lower.charAt(0).toUpperCase() + lower.slice(1);
    })
    .join('');
}

/**
 * Convert string to snake_case
 * Example: HelloWorld -> hello_world
 */
export function toSnakeCase(str: string): string {
  const words = splitIntoWords(str);
  return words.map(word => word.toLowerCase()).join('_');
}

/**
 * Convert string to SCREAMING_SNAKE_CASE
 * Example: helloWorld -> HELLO_WORLD
 */
export function toScreamingSnakeCase(str: string): string {
  const words = splitIntoWords(str);
  return words.map(word => word.toUpperCase()).join('_');
}

/**
 * Convert string to kebab-case
 * Example: HelloWorld -> hello-world
 */
export function toKebabCase(str: string): string {
  const words = splitIntoWords(str);
  return words.map(word => word.toLowerCase()).join('-');
}

/**
 * Convert string to SCREAMING-KEBAB-CASE
 * Example: helloWorld -> HELLO-WORLD
 */
export function toScreamingKebabCase(str: string): string {
  const words = splitIntoWords(str);
  return words.map(word => word.toUpperCase()).join('-');
}

/**
 * Convert string to Title Case
 * Example: hello world -> Hello World
 */
export function toTitleCase(str: string): string {
  const words = splitIntoWords(str);
  return words
    .map(word => {
      const lower = word.toLowerCase();
      return lower.charAt(0).toUpperCase() + lower.slice(1);
    })
    .join(' ');
}

/**
 * Convert string to Sentence case
 * Example: HELLO WORLD -> Hello world
 */
export function toSentenceCase(str: string): string {
  const words = splitIntoWords(str);
  if (words.length === 0) return '';
  
  const sentence = words.map(word => word.toLowerCase()).join(' ');
  return sentence.charAt(0).toUpperCase() + sentence.slice(1);
}

/**
 * Convert string to lowercase
 */
export function toLowerCase(str: string): string {
  return str.toLowerCase();
}

/**
 * Convert string to UPPERCASE
 */
export function toUpperCase(str: string): string {
  return str.toUpperCase();
}

/**
 * Convert string to specified case type
 */
export function convertCase(str: string, caseType: CaseType): string {
  switch (caseType) {
    case 'camelCase':
      return toCamelCase(str);
    case 'PascalCase':
      return toPascalCase(str);
    case 'snake_case':
      return toSnakeCase(str);
    case 'SCREAMING_SNAKE_CASE':
      return toScreamingSnakeCase(str);
    case 'kebab-case':
      return toKebabCase(str);
    case 'SCREAMING-KEBAB-CASE':
      return toScreamingKebabCase(str);
    case 'Title Case':
      return toTitleCase(str);
    case 'Sentence case':
      return toSentenceCase(str);
    case 'lowercase':
      return toLowerCase(str);
    case 'UPPERCASE':
      return toUpperCase(str);
    default:
      return str;
  }
}

/**
 * Detect the case type of a string
 */
export function detectCase(str: string): CaseType | 'mixed' {
  if (!str) return 'mixed';
  
  const hasUnderscore = str.includes('_');
  const hasHyphen = str.includes('-');
  const hasSpace = str.includes(' ');
  const hasLower = /[a-z]/.test(str);
  const hasUpper = /[A-Z]/.test(str);
  const startsWithUpper = /^[A-Z]/.test(str);
  
  // Check for all uppercase
  if (!hasLower && hasUpper && !hasSpace) {
    if (hasUnderscore) return 'SCREAMING_SNAKE_CASE';
    if (hasHyphen) return 'SCREAMING-KEBAB-CASE';
    return 'UPPERCASE';
  }
  
  // Check for all lowercase
  if (hasLower && !hasUpper && !hasSpace) {
    if (hasUnderscore) return 'snake_case';
    if (hasHyphen) return 'kebab-case';
    return 'lowercase';
  }
  
  // Check for space-separated
  if (hasSpace) {
    const words = str.split(' ');
    const allWordsCapitalized = words.every(w => /^[A-Z]/.test(w));
    if (allWordsCapitalized) return 'Title Case';
    if (startsWithUpper && words.length > 1) return 'Sentence case';
  }
  
  // Check for camelCase or PascalCase
  if (!hasUnderscore && !hasHyphen && !hasSpace && hasLower && hasUpper) {
    return startsWithUpper ? 'PascalCase' : 'camelCase';
  }
  
  return 'mixed';
}
