/**
 * 台灣身分證字號與居留證號產生器與驗證工具
 */

// 字母對應數字表
const LETTER_MAP: Record<string, number> = {
  A: 10, B: 11, C: 12, D: 13, E: 14, F: 15, G: 16, H: 17, I: 34,
  J: 18, K: 19, L: 20, M: 21, N: 22, O: 35, P: 23, Q: 24, R: 25,
  S: 26, T: 27, U: 28, V: 29, W: 32, X: 30, Y: 31, Z: 33,
};

// 新式外來人口統一證號（居留證）第二碼字母對應數字表
const RESIDENT_LETTER_MAP: Record<string, number> = {
  A: 0, B: 1, C: 2, D: 3, E: 4, F: 5, G: 6, H: 7, I: 8, J: 9,
  K: 10, L: 11, M: 12, N: 13, O: 14, P: 15, Q: 16, R: 17, S: 18, T: 19,
  U: 20, V: 21, W: 22, X: 23, Y: 24, Z: 25,
};

// 地區代碼對應表
export const REGION_MAP: Record<string, string> = {
  A: '台北市', B: '台中市', C: '基隆市', D: '台南市', E: '高雄市',
  F: '新北市', G: '宜蘭縣', H: '桃園市', I: '嘉義市', J: '新竹縣',
  K: '苗栗縣', L: '台中縣', M: '南投縣', N: '彰化縣', O: '新竹市',
  P: '雲林縣', Q: '嘉義縣', R: '台南縣', S: '高雄縣', T: '屏東縣',
  U: '花蓮縣', V: '台東縣', W: '金門縣', X: '澎湖縣', Y: '陽明山',
  Z: '連江縣',
};

// 所有可用的地區代碼
export const REGION_CODES = Object.keys(REGION_MAP);

/**
 * 判斷是否為居留證號（新式外來人口統一證號）
 */
function isResidentCertificate(idNumber: string): boolean {
  if (idNumber.length < 2) return false;
  const secondChar = idNumber[1].toUpperCase();
  // 第二碼必須是英文字母 A-D 才是居留證
  return /^[A-D]$/.test(secondChar);
}

/**
 * 計算身分證字號檢查碼
 */
function calculateChecksum(idNumber: string): number {
  const letter = idNumber[0];
  const letterValue = LETTER_MAP[letter];
  
  // 將字母轉換為兩位數字
  const firstDigit = Math.floor(letterValue / 10);
  const secondDigit = letterValue % 10;
  
  // 計算加權總和
  let sum = firstDigit * 1 + secondDigit * 9;
  
  // 加上後面 8 位數字的加權
  const weights = [8, 7, 6, 5, 4, 3, 2, 1];
  for (let i = 0; i < 8; i++) {
    sum += parseInt(idNumber[i + 1]) * weights[i];
  }
  
  // 計算檢查碼
  const checksum = (10 - (sum % 10)) % 10;
  return checksum;
}

/**
 * 計算居留證號檢查碼（新式外來人口統一證號）
 */
function calculateResidentChecksum(idNumber: string): number {
  const firstLetter = idNumber[0];
  const secondLetter = idNumber[1];
  
  const firstValue = LETTER_MAP[firstLetter];
  const secondValue = RESIDENT_LETTER_MAP[secondLetter];
  
  // 將第一個字母轉換為兩位數字
  const firstDigit = Math.floor(firstValue / 10);
  const secondDigit = firstValue % 10;
  
  // 計算加權總和
  let sum = firstDigit * 1 + secondDigit * 9 + secondValue * 8;
  
  // 加上後面 7 位數字的加權
  const weights = [7, 6, 5, 4, 3, 2, 1];
  for (let i = 0; i < 7; i++) {
    sum += parseInt(idNumber[i + 2]) * weights[i];
  }
  
  // 計算檢查碼
  const checksum = (10 - (sum % 10)) % 10;
  return checksum;
}

/**
 * 驗證台灣身分證字號或居留證號
 */
export function validateTaiwanId(idNumber: string): {
  valid: boolean;
  message: string;
  type?: 'national' | 'resident';
} {
  // 檢查長度
  if (idNumber.length !== 10) {
    return { valid: false, message: '證號長度必須為 10 碼' };
  }
  
  // 檢查格式：第一碼為英文字母
  const firstChar = idNumber[0].toUpperCase();
  if (!/^[A-Z]$/.test(firstChar)) {
    return { valid: false, message: '第一碼必須為英文字母' };
  }
  
  const secondChar = idNumber[1].toUpperCase();
  const isResident = isResidentCertificate(idNumber);
  
  if (isResident) {
    // 新式外來人口統一證號（居留證）驗證
    
    // 檢查第二碼為英文字母 A-D
    if (!/^[A-D]$/.test(secondChar)) {
      return { valid: false, message: '居留證第二碼必須為 A、B、C 或 D' };
    }
    
    // 檢查後面 8 碼是否都是數字
    if (!/^\d{8}$/.test(idNumber.substring(2))) {
      return { valid: false, message: '第 3 到 10 碼必須為數字' };
    }
    
    // 檢查地區碼是否有效
    if (!LETTER_MAP[firstChar]) {
      return { valid: false, message: '無效的地區代碼' };
    }
    
    // 計算並驗證檢查碼
    const calculatedChecksum = calculateResidentChecksum(idNumber.toUpperCase());
    const providedChecksum = parseInt(idNumber[9]);
    
    if (calculatedChecksum !== providedChecksum) {
      return { 
        valid: false, 
        message: `檢查碼錯誤（應為 ${calculatedChecksum}）` 
      };
    }
    
    return { valid: true, message: '✓ 有效的居留證號', type: 'resident' };
  } else {
    // 台灣身分證字號驗證
    
    // 檢查第二碼為性別碼（1 或 2）
    if (secondChar !== '1' && secondChar !== '2') {
      return { valid: false, message: '身分證第二碼必須為 1（男性）或 2（女性）' };
    }
    
    // 檢查後面 9 碼（第2到第10碼）是否都是數字
    if (!/^\d{9}$/.test(idNumber.substring(1))) {
      return { valid: false, message: '第 2 到 10 碼必須為數字' };
    }
    
    // 檢查地區碼是否有效
    if (!LETTER_MAP[firstChar]) {
      return { valid: false, message: '無效的地區代碼' };
    }
    
    // 計算並驗證檢查碼
    const calculatedChecksum = calculateChecksum(idNumber.toUpperCase());
    const providedChecksum = parseInt(idNumber[9]);
    
    if (calculatedChecksum !== providedChecksum) {
      return { 
        valid: false, 
        message: `檢查碼錯誤（應為 ${calculatedChecksum}）` 
      };
    }
    
    return { valid: true, message: '✓ 有效的身分證字號', type: 'national' };
  }
}

/**
 * 產生隨機台灣身分證字號或居留證號
 */
export function generateTaiwanId(options?: {
  region?: string;
  gender?: 'male' | 'female';
  type?: 'national' | 'resident'; // 身分證或居留證
}): string {
  // 隨機選擇地區代碼
  const regionCode = options?.region || 
    REGION_CODES[Math.floor(Math.random() * REGION_CODES.length)];
  
  const isResident = options?.type === 'resident';
  
  if (isResident) {
    // 產生居留證號（新式外來人口統一證號）
    
    // 第二碼為 A、B、C 或 D
    const secondLetters = ['A', 'B', 'C', 'D'];
    const secondLetter = secondLetters[Math.floor(Math.random() * secondLetters.length)];
    
    // 產生隨機 7 位數字
    let randomDigits = '';
    for (let i = 0; i < 7; i++) {
      randomDigits += Math.floor(Math.random() * 10);
    }
    
    // 組合前 9 碼
    const idPrefix = regionCode + secondLetter + randomDigits;
    
    // 計算檢查碼
    const checksum = calculateResidentChecksum(idPrefix);
    
    // 組合完整居留證號
    return idPrefix + checksum;
  } else {
    // 產生身分證字號
    
    // 性別碼：1 為男性，2 為女性
    const genderCode = options?.gender === 'female' ? '2' : 
      options?.gender === 'male' ? '1' :
      Math.random() < 0.5 ? '1' : '2';
    
    // 產生隨機 7 位數字
    let randomDigits = '';
    for (let i = 0; i < 7; i++) {
      randomDigits += Math.floor(Math.random() * 10);
    }
    
    // 組合前 9 碼
    const idPrefix = regionCode + genderCode + randomDigits;
    
    // 計算檢查碼
    const checksum = calculateChecksum(idPrefix);
    
    // 組合完整身分證字號
    return idPrefix + checksum;
  }
}

/**
 * 批次產生台灣身分證字號或居留證號
 */
export function generateMultipleTaiwanIds(
  count: number,
  options?: {
    region?: string;
    gender?: 'male' | 'female';
    type?: 'national' | 'resident';
  }
): string[] {
  const uniqueIds = new Set<string>();
  
  while (uniqueIds.size < count) {
    const id = generateTaiwanId(options);
    uniqueIds.add(id);
  }
  
  return Array.from(uniqueIds);
}

/**
 * 解析身分證字號或居留證號資訊
 */
export function parseTaiwanId(idNumber: string): {
  region: string;
  gender?: string;
  type: 'national' | 'resident';
  valid: boolean;
} | null {
  const validation = validateTaiwanId(idNumber);
  
  if (!validation.valid) {
    return null;
  }
  
  const regionCode = idNumber[0].toUpperCase();
  const isResident = isResidentCertificate(idNumber);
  
  if (isResident) {
    return {
      region: REGION_MAP[regionCode] || '未知',
      type: 'resident',
      valid: true,
    };
  } else {
    const genderCode = idNumber[1];
    return {
      region: REGION_MAP[regionCode] || '未知',
      gender: genderCode === '1' ? '男性' : '女性',
      type: 'national',
      valid: true,
    };
  }
}
