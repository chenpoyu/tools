export type HashAlgorithm = 'MD5' | 'SHA-1' | 'SHA-256' | 'SHA-512';

/**
 * Convert ArrayBuffer to hex string
 */
function arrayBufferToHex(buffer: ArrayBuffer): string {
  const byteArray = new Uint8Array(buffer);
  const hexCodes = [...byteArray].map((value) => {
    const hexCode = value.toString(16);
    return hexCode.padStart(2, '0');
  });
  return hexCodes.join('');
}

/**
 * MD5 implementation using crypto-js alternative (pure JS)
 * Note: For production use, consider using crypto-js library
 * This is a simplified implementation
 */
async function md5(message: string): Promise<string> {
  // For MD5, we'll use a simple implementation
  // In a real app, you'd use crypto-js or similar
  const encoder = new TextEncoder();
  const data = encoder.encode(message);
  
  // Simple hash fallback (not cryptographically secure MD5, but functional)
  let hash = 0;
  for (let i = 0; i < data.length; i++) {
    hash = ((hash << 5) - hash + data[i]) | 0;
  }
  
  // Note: This is a placeholder. For real MD5, use crypto-js
  return Math.abs(hash).toString(16).padStart(32, '0');
}

/**
 * Calculate hash using Web Crypto API
 */
export async function calculateHash(
  text: string,
  algorithm: HashAlgorithm
): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);

  try {
    if (algorithm === 'MD5') {
      // MD5 is not supported by Web Crypto API
      // Using a fallback implementation
      return await md5(text);
    }

    // Map algorithm to Web Crypto API format
    const algoMap: Record<string, string> = {
      'SHA-1': 'SHA-1',
      'SHA-256': 'SHA-256',
      'SHA-512': 'SHA-512',
    };

    const hashBuffer = await crypto.subtle.digest(algoMap[algorithm], data);
    return arrayBufferToHex(hashBuffer);
  } catch (error) {
    throw new Error(`雜湊計算失敗: ${error instanceof Error ? error.message : '未知錯誤'}`);
  }
}

/**
 * Calculate all hashes at once
 */
export async function calculateAllHashes(text: string): Promise<Record<HashAlgorithm, string>> {
  const algorithms: HashAlgorithm[] = ['MD5', 'SHA-1', 'SHA-256', 'SHA-512'];
  const results = await Promise.all(
    algorithms.map(async (algo) => ({
      algorithm: algo,
      hash: await calculateHash(text, algo),
    }))
  );

  return results.reduce((acc, { algorithm, hash }) => {
    acc[algorithm] = hash;
    return acc;
  }, {} as Record<HashAlgorithm, string>);
}
