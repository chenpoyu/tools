export interface UserAgentInfo {
  browserName: string;
  browserVersion: string;
  osName: string;
  osVersion: string;
  deviceType: string;
  engineName: string;
  engineVersion: string;
  platform: string;
}

/**
 * Parse User-Agent string
 */
export function parseUserAgent(ua: string): UserAgentInfo {
  const result: UserAgentInfo = {
    browserName: 'Unknown',
    browserVersion: '',
    osName: 'Unknown',
    osVersion: '',
    deviceType: 'Desktop',
    engineName: 'Unknown',
    engineVersion: '',
    platform: '',
  };

  // Detect OS
  if (ua.includes('Windows NT 10.0')) {
    result.osName = 'Windows';
    result.osVersion = '10/11';
  } else if (ua.includes('Windows NT 6.3')) {
    result.osName = 'Windows';
    result.osVersion = '8.1';
  } else if (ua.includes('Windows NT 6.2')) {
    result.osName = 'Windows';
    result.osVersion = '8';
  } else if (ua.includes('Windows NT 6.1')) {
    result.osName = 'Windows';
    result.osVersion = '7';
  } else if (ua.includes('Mac OS X')) {
    result.osName = 'macOS';
    const match = ua.match(/Mac OS X (\d+[._]\d+[._]\d+)/);
    if (match) {
      result.osVersion = match[1].replace(/_/g, '.');
    }
  } else if (ua.includes('Android')) {
    result.osName = 'Android';
    const match = ua.match(/Android (\d+\.?\d*)/);
    if (match) {
      result.osVersion = match[1];
    }
  } else if (ua.includes('iPhone') || ua.includes('iPad')) {
    result.osName = 'iOS';
    const match = ua.match(/OS (\d+_\d+)/);
    if (match) {
      result.osVersion = match[1].replace(/_/g, '.');
    }
  } else if (ua.includes('Linux')) {
    result.osName = 'Linux';
  }

  // Detect Device Type
  if (ua.includes('Mobile') || ua.includes('Android') || ua.includes('iPhone')) {
    result.deviceType = 'Mobile';
  } else if (ua.includes('Tablet') || ua.includes('iPad')) {
    result.deviceType = 'Tablet';
  }

  // Detect Browser
  if (ua.includes('Edg/')) {
    result.browserName = 'Microsoft Edge';
    const match = ua.match(/Edg\/(\d+\.?\d*)/);
    if (match) result.browserVersion = match[1];
  } else if (ua.includes('Chrome/') && !ua.includes('Edg')) {
    result.browserName = 'Google Chrome';
    const match = ua.match(/Chrome\/(\d+\.?\d*)/);
    if (match) result.browserVersion = match[1];
  } else if (ua.includes('Firefox/')) {
    result.browserName = 'Mozilla Firefox';
    const match = ua.match(/Firefox\/(\d+\.?\d*)/);
    if (match) result.browserVersion = match[1];
  } else if (ua.includes('Safari/') && !ua.includes('Chrome')) {
    result.browserName = 'Safari';
    const match = ua.match(/Version\/(\d+\.?\d*)/);
    if (match) result.browserVersion = match[1];
  } else if (ua.includes('OPR/') || ua.includes('Opera/')) {
    result.browserName = 'Opera';
    const match = ua.match(/(?:OPR|Opera)\/(\d+\.?\d*)/);
    if (match) result.browserVersion = match[1];
  }

  // Detect Engine
  if (ua.includes('AppleWebKit')) {
    result.engineName = 'WebKit';
    const match = ua.match(/AppleWebKit\/(\d+\.?\d*)/);
    if (match) result.engineVersion = match[1];
  }
  if (ua.includes('Gecko/')) {
    result.engineName = 'Gecko';
    const match = ua.match(/rv:(\d+\.?\d*)/);
    if (match) result.engineVersion = match[1];
  }
  if (ua.includes('Blink')) {
    result.engineName = 'Blink';
  }

  // Detect Platform
  if (ua.includes('Win64') || ua.includes('WOW64')) {
    result.platform = 'Windows 64-bit';
  } else if (ua.includes('Win32')) {
    result.platform = 'Windows 32-bit';
  } else if (ua.includes('Intel Mac')) {
    result.platform = 'Intel Mac';
  } else if (ua.includes('ARM Mac')) {
    result.platform = 'Apple Silicon';
  } else if (ua.includes('Linux x86_64')) {
    result.platform = 'Linux 64-bit';
  } else if (ua.includes('Linux')) {
    result.platform = 'Linux';
  }

  return result;
}

/**
 * Get current browser's User-Agent
 */
export function getCurrentUserAgent(): string {
  return navigator.userAgent;
}
