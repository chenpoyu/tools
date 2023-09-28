export interface HTTPStatusCode {
  code: number;
  name: string;
  description: string;
  category: 'Informational' | 'Success' | 'Redirection' | 'Client Error' | 'Server Error';
}

export const httpStatusCodes: HTTPStatusCode[] = [
  // 1xx Informational
  { code: 100, name: 'Continue', description: '繼續。客戶端應繼續其請求', category: 'Informational' },
  { code: 101, name: 'Switching Protocols', description: '切換協定。伺服器根據客戶端的請求切換協定', category: 'Informational' },
  { code: 102, name: 'Processing', description: '處理中。伺服器已收到並正在處理請求', category: 'Informational' },
  { code: 103, name: 'Early Hints', description: '早期提示。在最終回應前返回一些回應標頭', category: 'Informational' },

  // 2xx Success
  { code: 200, name: 'OK', description: '請求成功。一般用於 GET 與 POST 請求', category: 'Success' },
  { code: 201, name: 'Created', description: '已建立。成功請求並建立了新的資源', category: 'Success' },
  { code: 202, name: 'Accepted', description: '已接受。已經接受請求，但未完成處理', category: 'Success' },
  { code: 203, name: 'Non-Authoritative Information', description: '非授權資訊。請求成功但返回的資訊可能來自另一來源', category: 'Success' },
  { code: 204, name: 'No Content', description: '無內容。伺服器成功處理，但未返回內容', category: 'Success' },
  { code: 205, name: 'Reset Content', description: '重置內容。伺服器處理成功，使用者終端應重置文件檢視', category: 'Success' },
  { code: 206, name: 'Partial Content', description: '部分內容。伺服器成功處理了部分 GET 請求', category: 'Success' },

  // 3xx Redirection
  { code: 300, name: 'Multiple Choices', description: '多種選擇。請求的資源可包括多個位置', category: 'Redirection' },
  { code: 301, name: 'Moved Permanently', description: '永久移動。請求的資源已被永久移動到新 URI', category: 'Redirection' },
  { code: 302, name: 'Found', description: '臨時移動。資源臨時從不同的 URI 回應請求', category: 'Redirection' },
  { code: 303, name: 'See Other', description: '查看其他位置。使用 GET 請求檢索回應', category: 'Redirection' },
  { code: 304, name: 'Not Modified', description: '未修改。請求的資源未修改，可使用快取版本', category: 'Redirection' },
  { code: 307, name: 'Temporary Redirect', description: '臨時重定向。與 302 類似，但不允許改變請求方法', category: 'Redirection' },
  { code: 308, name: 'Permanent Redirect', description: '永久重定向。與 301 類似，但不允許改變請求方法', category: 'Redirection' },

  // 4xx Client Errors
  { code: 400, name: 'Bad Request', description: '錯誤的請求。伺服器無法理解請求的格式', category: 'Client Error' },
  { code: 401, name: 'Unauthorized', description: '未授權。請求要求使用者的身份驗證', category: 'Client Error' },
  { code: 402, name: 'Payment Required', description: '保留，將來使用', category: 'Client Error' },
  { code: 403, name: 'Forbidden', description: '禁止。伺服器理解請求但拒絕執行', category: 'Client Error' },
  { code: 404, name: 'Not Found', description: '找不到。請求的資源不存在', category: 'Client Error' },
  { code: 405, name: 'Method Not Allowed', description: '方法不被允許。請求方法不支援', category: 'Client Error' },
  { code: 406, name: 'Not Acceptable', description: '不可接受。無法使用請求的內容特性回應', category: 'Client Error' },
  { code: 407, name: 'Proxy Authentication Required', description: '需要代理伺服器授權', category: 'Client Error' },
  { code: 408, name: 'Request Timeout', description: '請求逾時。伺服器等待請求時間過長', category: 'Client Error' },
  { code: 409, name: 'Conflict', description: '衝突。請求存在衝突無法處理', category: 'Client Error' },
  { code: 410, name: 'Gone', description: '已刪除。請求的資源已被永久刪除', category: 'Client Error' },
  { code: 411, name: 'Length Required', description: '需要有效長度。請求未定義 Content-Length', category: 'Client Error' },
  { code: 412, name: 'Precondition Failed', description: '先決條件失敗。請求頭中的先決條件錯誤', category: 'Client Error' },
  { code: 413, name: 'Payload Too Large', description: '請求實體過大。伺服器無法處理', category: 'Client Error' },
  { code: 414, name: 'URI Too Long', description: '請求的 URI 過長。伺服器無法處理', category: 'Client Error' },
  { code: 415, name: 'Unsupported Media Type', description: '不支援的媒體類型', category: 'Client Error' },
  { code: 416, name: 'Range Not Satisfiable', description: '請求範圍不符合要求', category: 'Client Error' },
  { code: 417, name: 'Expectation Failed', description: '伺服器無法滿足 Expect 請求標頭', category: 'Client Error' },
  { code: 418, name: "I'm a teapot", description: '我是茶壺（愚人節笑話，RFC 2324）', category: 'Client Error' },
  { code: 421, name: 'Misdirected Request', description: '請求被導向到無法產生回應的伺服器', category: 'Client Error' },
  { code: 422, name: 'Unprocessable Entity', description: '無法處理的實體。請求格式正確但語意錯誤', category: 'Client Error' },
  { code: 423, name: 'Locked', description: '已鎖定。請求的資源被鎖定', category: 'Client Error' },
  { code: 424, name: 'Failed Dependency', description: '因為先前的請求失敗，所以此次請求失敗', category: 'Client Error' },
  { code: 425, name: 'Too Early', description: '伺服器不願意處理可能被重放的請求', category: 'Client Error' },
  { code: 426, name: 'Upgrade Required', description: '需要升級協定', category: 'Client Error' },
  { code: 428, name: 'Precondition Required', description: '需要先決條件。請求必須是條件式的', category: 'Client Error' },
  { code: 429, name: 'Too Many Requests', description: '請求過多。使用者在給定時間內發送了太多請求', category: 'Client Error' },
  { code: 431, name: 'Request Header Fields Too Large', description: '請求標頭欄位太大', category: 'Client Error' },
  { code: 451, name: 'Unavailable For Legal Reasons', description: '因法律原因不可用', category: 'Client Error' },

  // 5xx Server Errors
  { code: 500, name: 'Internal Server Error', description: '伺服器內部錯誤。伺服器遇到錯誤，無法完成請求', category: 'Server Error' },
  { code: 501, name: 'Not Implemented', description: '尚未實作。伺服器不支援請求的功能', category: 'Server Error' },
  { code: 502, name: 'Bad Gateway', description: '錯誤閘道。伺服器作為閘道或代理，從上游伺服器收到無效回應', category: 'Server Error' },
  { code: 503, name: 'Service Unavailable', description: '服務不可用。伺服器暫時過載或維護中', category: 'Server Error' },
  { code: 504, name: 'Gateway Timeout', description: '閘道逾時。閘道或代理伺服器未及時收到回應', category: 'Server Error' },
  { code: 505, name: 'HTTP Version Not Supported', description: '不支援的 HTTP 版本', category: 'Server Error' },
  { code: 506, name: 'Variant Also Negotiates', description: '伺服器內部配置錯誤', category: 'Server Error' },
  { code: 507, name: 'Insufficient Storage', description: '儲存空間不足。伺服器無法儲存完成請求所需的內容', category: 'Server Error' },
  { code: 508, name: 'Loop Detected', description: '偵測到無限迴圈', category: 'Server Error' },
  { code: 510, name: 'Not Extended', description: '未延伸。需要進一步延伸請求', category: 'Server Error' },
  { code: 511, name: 'Network Authentication Required', description: '需要網路認證', category: 'Server Error' },
];

/**
 * Get status codes by category
 */
export function getStatusCodesByCategory(category: HTTPStatusCode['category']): HTTPStatusCode[] {
  return httpStatusCodes.filter((status) => status.category === category);
}

/**
 * Search status codes
 */
export function searchStatusCodes(query: string): HTTPStatusCode[] {
  const lowerQuery = query.toLowerCase();
  return httpStatusCodes.filter(
    (status) =>
      status.code.toString().includes(lowerQuery) ||
      status.name.toLowerCase().includes(lowerQuery) ||
      status.description.toLowerCase().includes(lowerQuery)
  );
}

/**
 * Get status code info by code number
 */
export function getStatusCodeInfo(code: number): HTTPStatusCode | undefined {
  return httpStatusCodes.find((status) => status.code === code);
}
