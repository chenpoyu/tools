export interface IpInfo {
  ip: string;
  city?: string;
  region?: string;
  country?: string;
  loc?: string;
  org?: string;
  timezone?: string;
  postal?: string;
}

/**
 * Fetch current IP information using ipify API for IP and ipapi for details
 */
export async function fetchIpInfo(): Promise<IpInfo> {
  try {
    // First get the IP address from ipify (simple and reliable)
    const ipResponse = await fetch('https://api.ipify.org?format=json');
    const ipData = await ipResponse.json();
    const ip = ipData.ip;

    // Then get detailed info from ipapi.co (free, no API key required)
    const detailsResponse = await fetch(`https://ipapi.co/${ip}/json/`);
    const details = await detailsResponse.json();

    return {
      ip: ip,
      city: details.city,
      region: details.region,
      country: details.country_name,
      loc: details.latitude && details.longitude ? `${details.latitude},${details.longitude}` : undefined,
      org: details.org,
      timezone: details.timezone,
      postal: details.postal,
    };
  } catch (error) {
    console.error('Error fetching IP info:', error);
    throw new Error('無法取得 IP 資訊');
  }
}

/**
 * Lookup information for a specific IP address
 */
export async function lookupIp(ip: string): Promise<IpInfo> {
  try {
    const response = await fetch(`https://ipapi.co/${ip}/json/`);
    const details = await response.json();

    if (details.error) {
      throw new Error(details.reason || '無效的 IP 地址');
    }

    return {
      ip: ip,
      city: details.city,
      region: details.region,
      country: details.country_name,
      loc: details.latitude && details.longitude ? `${details.latitude},${details.longitude}` : undefined,
      org: details.org,
      timezone: details.timezone,
      postal: details.postal,
    };
  } catch (error) {
    console.error('Error looking up IP:', error);
    throw error;
  }
}

/**
 * Validate IP address format (IPv4 and IPv6)
 */
export function isValidIp(ip: string): boolean {
  // IPv4 regex
  const ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  
  // IPv6 regex (simplified)
  const ipv6Regex = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/;
  
  return ipv4Regex.test(ip) || ipv6Regex.test(ip);
}
