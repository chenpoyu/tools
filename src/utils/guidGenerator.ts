export interface GuidOptions {
  includeHyphens: boolean; // true = 36 chars (8-4-4-4-12), false = 32 chars
  uppercase: boolean;
}

/**
 * Generate a random GUID/UUID (version 4)
 * @param options - Configuration options for GUID format
 * @returns A GUID string in the specified format
 */
export function generateGuid(options: GuidOptions): string {
  // Generate random bytes
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);

  // Set version (4) and variant (RFC4122)
  bytes[6] = (bytes[6] & 0x0f) | 0x40; // Version 4
  bytes[8] = (bytes[8] & 0x3f) | 0x80; // Variant RFC4122

  // Convert bytes to hex string
  let guid = '';
  for (let i = 0; i < 16; i++) {
    guid += bytes[i].toString(16).padStart(2, '0');
  }

  // Add hyphens if requested (8-4-4-4-12 format)
  if (options.includeHyphens) {
    guid = `${guid.slice(0, 8)}-${guid.slice(8, 12)}-${guid.slice(12, 16)}-${guid.slice(16, 20)}-${guid.slice(20)}`;
  }

  // Convert to uppercase if requested
  return options.uppercase ? guid.toUpperCase() : guid;
}

/**
 * Generate multiple GUIDs at once
 * @param count - Number of GUIDs to generate
 * @param options - Configuration options for GUID format
 * @returns Array of GUID strings
 */
export function generateMultipleGuids(count: number, options: GuidOptions): string[] {
  const guids: string[] = [];
  for (let i = 0; i < count; i++) {
    guids.push(generateGuid(options));
  }
  return guids;
}

/**
 * Validate if a string is a valid GUID
 * @param guid - String to validate
 * @returns true if valid GUID format
 */
export function isValidGuid(guid: string): boolean {
  // GUID with hyphens: 8-4-4-4-12
  const withHyphens = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  // GUID without hyphens: 32 hex characters
  const withoutHyphens = /^[0-9a-f]{32}$/i;
  
  return withHyphens.test(guid) || withoutHyphens.test(guid);
}

/**
 * Format a GUID string (add/remove hyphens, change case)
 * @param guid - GUID string to format
 * @param options - Format options
 * @returns Formatted GUID string or null if invalid
 */
export function formatGuid(guid: string, options: GuidOptions): string | null {
  if (!isValidGuid(guid)) {
    return null;
  }

  // Remove all hyphens
  let cleaned = guid.replace(/-/g, '');

  // Add hyphens if requested
  if (options.includeHyphens) {
    cleaned = `${cleaned.slice(0, 8)}-${cleaned.slice(8, 12)}-${cleaned.slice(12, 16)}-${cleaned.slice(16, 20)}-${cleaned.slice(20)}`;
  }

  // Apply case
  return options.uppercase ? cleaned.toUpperCase() : cleaned.toLowerCase();
}
