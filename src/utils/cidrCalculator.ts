export interface CIDRInfo {
  ipAddress: string;
  cidrNotation: string;
  subnetMask: string;
  wildcardMask: string;
  networkAddress: string;
  broadcastAddress: string;
  firstUsableIP: string;
  lastUsableIP: string;
  totalHosts: number;
  usableHosts: number;
  ipClass: string;
}

/**
 * Convert IP address to 32-bit integer
 */
function ipToInt(ip: string): number {
  const parts = ip.split('.').map(Number);
  return (
    (parts[0] << 24) | (parts[1] << 16) | (parts[2] << 8) | parts[3]
  ) >>> 0;
}

/**
 * Convert 32-bit integer to IP address
 */
function intToIp(int: number): string {
  return [
    (int >>> 24) & 0xff,
    (int >>> 16) & 0xff,
    (int >>> 8) & 0xff,
    int & 0xff,
  ].join('.');
}

/**
 * Validate IP address format
 */
export function validateIP(ip: string): boolean {
  const parts = ip.split('.');
  if (parts.length !== 4) return false;
  
  return parts.every((part) => {
    const num = parseInt(part, 10);
    return !isNaN(num) && num >= 0 && num <= 255 && part === num.toString();
  });
}

/**
 * Get IP class
 */
function getIPClass(firstOctet: number): string {
  if (firstOctet >= 1 && firstOctet <= 126) return 'A';
  if (firstOctet >= 128 && firstOctet <= 191) return 'B';
  if (firstOctet >= 192 && firstOctet <= 223) return 'C';
  if (firstOctet >= 224 && firstOctet <= 239) return 'D (多播)';
  if (firstOctet >= 240 && firstOctet <= 255) return 'E (保留)';
  return '未知';
}

/**
 * Calculate CIDR information
 */
export function calculateCIDR(ip: string, cidr: number): CIDRInfo {
  if (!validateIP(ip)) {
    throw new Error('無效的 IP 位址格式');
  }

  if (cidr < 0 || cidr > 32) {
    throw new Error('CIDR 前綴長度必須在 0-32 之間');
  }

  const ipInt = ipToInt(ip);
  const maskInt = cidr === 0 ? 0 : (0xffffffff << (32 - cidr)) >>> 0;
  const wildcardInt = (~maskInt) >>> 0;
  const networkInt = (ipInt & maskInt) >>> 0;
  const broadcastInt = (networkInt | wildcardInt) >>> 0;
  const totalHosts = Math.pow(2, 32 - cidr);
  const usableHosts = cidr === 31 ? 2 : cidr === 32 ? 1 : Math.max(0, totalHosts - 2);

  const firstOctet = parseInt(ip.split('.')[0]);

  return {
    ipAddress: ip,
    cidrNotation: `${ip}/${cidr}`,
    subnetMask: intToIp(maskInt),
    wildcardMask: intToIp(wildcardInt),
    networkAddress: intToIp(networkInt),
    broadcastAddress: intToIp(broadcastInt),
    firstUsableIP: cidr === 32 ? ip : intToIp(networkInt + 1),
    lastUsableIP: cidr === 32 ? ip : intToIp(broadcastInt - 1),
    totalHosts,
    usableHosts,
    ipClass: getIPClass(firstOctet),
  };
}
