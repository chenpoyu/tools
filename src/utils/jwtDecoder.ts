export interface JWTDecoded {
  header: object;
  payload: object;
  signature: string;
}

/**
 * Base64 URL decode (JWT uses base64url encoding)
 */
function base64UrlDecode(str: string): string {
  // Replace URL-safe characters with standard base64
  let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
  
  // Add padding if needed
  while (base64.length % 4) {
    base64 += '=';
  }
  
  try {
    // Decode base64
    const decoded = atob(base64);
    // Convert to UTF-8
    return decodeURIComponent(
      decoded
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
  } catch {
    throw new Error('Base64 解碼失敗');
  }
}

/**
 * Decode a JWT token
 */
export function decodeJWT(token: string): JWTDecoded {
  const parts = token.split('.');
  
  if (parts.length !== 3) {
    throw new Error('無效的 JWT 格式，應包含三個部分（Header.Payload.Signature）');
  }

  try {
    const header = JSON.parse(base64UrlDecode(parts[0]));
    const payload = JSON.parse(base64UrlDecode(parts[1]));
    const signature = parts[2];

    return {
      header,
      payload,
      signature,
    };
  } catch (error) {
    if (error instanceof Error && error.message.includes('Base64')) {
      throw error;
    }
    throw new Error('JWT 解碼失敗，請確認 Token 格式正確');
  }
}

/**
 * Validate JWT format without decoding
 */
export function validateJWTFormat(token: string): boolean {
  const parts = token.split('.');
  return parts.length === 3 && parts.every((part) => part.length > 0);
}

/**
 * Parse timestamp fields in JWT payload
 */
export function parseJWTTimestamps(payload: { iat?: number; exp?: number; nbf?: number }): {
  iat?: string;
  exp?: string;
  nbf?: string;
} {
  const result: { iat?: string; exp?: string; nbf?: string } = {};

  if (payload.iat) {
    result.iat = new Date(payload.iat * 1000).toLocaleString('zh-TW');
  }
  if (payload.exp) {
    result.exp = new Date(payload.exp * 1000).toLocaleString('zh-TW');
  }
  if (payload.nbf) {
    result.nbf = new Date(payload.nbf * 1000).toLocaleString('zh-TW');
  }

  return result;
}
