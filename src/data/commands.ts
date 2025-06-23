export interface Command {
  category: string;
  command: string;
  description: string;
  tags: string[];
}

export const commands: Command[] = [
  // Git Commands
  {
    category: 'Git',
    command: 'git init',
    description: '初始化新的 Git 儲存庫',
    tags: ['init', 'new', 'repository'],
  },
  {
    category: 'Git',
    command: 'git clone <url>',
    description: '複製遠端儲存庫到本地',
    tags: ['clone', 'download', 'remote'],
  },
  {
    category: 'Git',
    command: 'git status',
    description: '查看工作區狀態',
    tags: ['status', 'check', 'changes'],
  },
  {
    category: 'Git',
    command: 'git add .',
    description: '將所有變更加入暫存區',
    tags: ['add', 'stage', 'all'],
  },
  {
    category: 'Git',
    command: 'git commit -m "message"',
    description: '提交暫存區的變更',
    tags: ['commit', 'save', 'message'],
  },
  {
    category: 'Git',
    command: 'git push origin main',
    description: '推送提交到遠端 main 分支',
    tags: ['push', 'upload', 'remote'],
  },
  {
    category: 'Git',
    command: 'git pull origin main',
    description: '拉取遠端 main 分支的變更',
    tags: ['pull', 'download', 'sync'],
  },
  {
    category: 'Git',
    command: 'git checkout -b <branch-name>',
    description: '建立並切換到新分支',
    tags: ['branch', 'new', 'checkout'],
  },
  {
    category: 'Git',
    command: 'git merge <branch-name>',
    description: '合併指定分支到當前分支',
    tags: ['merge', 'combine', 'branch'],
  },
  {
    category: 'Git',
    command: 'git log --oneline',
    description: '以簡潔格式查看提交歷史',
    tags: ['log', 'history', 'commits'],
  },
  {
    category: 'Git',
    command: 'git reset --hard HEAD',
    description: '重置所有變更到最後一次提交',
    tags: ['reset', 'undo', 'discard'],
  },
  {
    category: 'Git',
    command: 'git stash',
    description: '暫存當前變更',
    tags: ['stash', 'save', 'temporary'],
  },
  {
    category: 'Git',
    command: 'git stash pop',
    description: '還原暫存的變更',
    tags: ['stash', 'restore', 'apply'],
  },

  // Docker Commands
  {
    category: 'Docker',
    command: 'docker ps',
    description: '列出正在執行的容器',
    tags: ['list', 'containers', 'running'],
  },
  {
    category: 'Docker',
    command: 'docker ps -a',
    description: '列出所有容器（包含已停止）',
    tags: ['list', 'containers', 'all'],
  },
  {
    category: 'Docker',
    command: 'docker images',
    description: '列出所有映像檔',
    tags: ['images', 'list', 'show'],
  },
  {
    category: 'Docker',
    command: 'docker run -d -p 8080:80 <image>',
    description: '背景執行容器並映射埠號',
    tags: ['run', 'port', 'detached'],
  },
  {
    category: 'Docker',
    command: 'docker stop <container-id>',
    description: '停止執行中的容器',
    tags: ['stop', 'halt', 'container'],
  },
  {
    category: 'Docker',
    command: 'docker rm <container-id>',
    description: '刪除容器',
    tags: ['remove', 'delete', 'container'],
  },
  {
    category: 'Docker',
    command: 'docker rmi <image-id>',
    description: '刪除映像檔',
    tags: ['remove', 'delete', 'image'],
  },
  {
    category: 'Docker',
    command: 'docker exec -it <container-id> bash',
    description: '進入容器的 bash shell',
    tags: ['exec', 'shell', 'interactive'],
  },
  {
    category: 'Docker',
    command: 'docker logs <container-id>',
    description: '查看容器日誌',
    tags: ['logs', 'output', 'debug'],
  },
  {
    category: 'Docker',
    command: 'docker build -t <name>:<tag> .',
    description: '從 Dockerfile 建置映像檔',
    tags: ['build', 'image', 'dockerfile'],
  },
  {
    category: 'Docker',
    command: 'docker-compose up -d',
    description: '啟動 docker-compose 服務',
    tags: ['compose', 'up', 'start'],
  },
  {
    category: 'Docker',
    command: 'docker system prune -a',
    description: '清理所有未使用的資源',
    tags: ['clean', 'prune', 'cleanup'],
  },

  // Linux Commands
  {
    category: 'Linux',
    command: 'ls -la',
    description: '列出所有檔案（包含隱藏檔案）',
    tags: ['list', 'files', 'all'],
  },
  {
    category: 'Linux',
    command: 'cd <directory>',
    description: '切換目錄',
    tags: ['change', 'directory', 'navigate'],
  },
  {
    category: 'Linux',
    command: 'pwd',
    description: '顯示當前目錄路徑',
    tags: ['path', 'current', 'directory'],
  },
  {
    category: 'Linux',
    command: 'mkdir -p <path>',
    description: '建立目錄（包含父目錄）',
    tags: ['create', 'directory', 'folder'],
  },
  {
    category: 'Linux',
    command: 'rm -rf <path>',
    description: '強制刪除目錄及其內容',
    tags: ['delete', 'remove', 'recursive'],
  },
  {
    category: 'Linux',
    command: 'cp -r <source> <dest>',
    description: '遞迴複製目錄',
    tags: ['copy', 'recursive', 'directory'],
  },
  {
    category: 'Linux',
    command: 'mv <source> <dest>',
    description: '移動或重新命名檔案',
    tags: ['move', 'rename', 'file'],
  },
  {
    category: 'Linux',
    command: 'cat <file>',
    description: '顯示檔案內容',
    tags: ['read', 'view', 'file'],
  },
  {
    category: 'Linux',
    command: 'grep -r "pattern" .',
    description: '遞迴搜尋檔案內容',
    tags: ['search', 'find', 'recursive'],
  },
  {
    category: 'Linux',
    command: 'chmod +x <file>',
    description: '賦予檔案執行權限',
    tags: ['permission', 'executable', 'chmod'],
  },
  {
    category: 'Linux',
    command: 'ps aux | grep <process>',
    description: '搜尋執行中的程序',
    tags: ['process', 'search', 'running'],
  },
  {
    category: 'Linux',
    command: 'kill -9 <pid>',
    description: '強制終止程序',
    tags: ['kill', 'terminate', 'process'],
  },
  {
    category: 'Linux',
    command: 'df -h',
    description: '查看磁碟使用狀況',
    tags: ['disk', 'space', 'usage'],
  },
  {
    category: 'Linux',
    command: 'du -sh <path>',
    description: '查看目錄大小',
    tags: ['disk', 'size', 'directory'],
  },

  // OpenSSL/SSL Commands
  {
    category: 'OpenSSL',
    command: 'openssl genrsa -out private.key 2048',
    description: '產生 2048 位元 RSA 私鑰',
    tags: ['generate', 'key', 'rsa'],
  },
  {
    category: 'OpenSSL',
    command: 'openssl rsa -in private.key -pubout -out public.key',
    description: '從私鑰產生公鑰',
    tags: ['public', 'key', 'extract'],
  },
  {
    category: 'OpenSSL',
    command: 'openssl req -new -key private.key -out cert.csr',
    description: '產生憑證簽署請求（CSR）',
    tags: ['certificate', 'csr', 'request'],
  },
  {
    category: 'OpenSSL',
    command: 'openssl x509 -req -in cert.csr -signkey private.key -out cert.crt',
    description: '自簽署憑證',
    tags: ['certificate', 'self-signed', 'sign'],
  },
  {
    category: 'OpenSSL',
    command: 'openssl x509 -in cert.crt -text -noout',
    description: '查看憑證內容',
    tags: ['view', 'certificate', 'details'],
  },
  {
    category: 'OpenSSL',
    command: 'openssl s_client -connect example.com:443',
    description: '測試 SSL/TLS 連線',
    tags: ['test', 'ssl', 'connection'],
  },
  {
    category: 'OpenSSL',
    command: 'openssl enc -aes-256-cbc -salt -in file.txt -out file.enc',
    description: '使用 AES-256 加密檔案',
    tags: ['encrypt', 'aes', 'file'],
  },
  {
    category: 'OpenSSL',
    command: 'openssl enc -aes-256-cbc -d -in file.enc -out file.txt',
    description: '解密 AES-256 加密的檔案',
    tags: ['decrypt', 'aes', 'file'],
  },
  {
    category: 'OpenSSL',
    command: 'openssl dgst -sha256 <file>',
    description: '計算檔案的 SHA-256 雜湊值',
    tags: ['hash', 'sha256', 'checksum'],
  },
  {
    category: 'OpenSSL',
    command: 'openssl rand -base64 32',
    description: '產生 32 位元組的隨機 Base64 字串',
    tags: ['random', 'generate', 'base64'],
  },

  // npm Commands
  {
    category: 'npm',
    command: 'npm init -y',
    description: '快速初始化 package.json',
    tags: ['init', 'initialize', 'package'],
  },
  {
    category: 'npm',
    command: 'npm install <package>',
    description: '安裝套件',
    tags: ['install', 'add', 'package'],
  },
  {
    category: 'npm',
    command: 'npm install -D <package>',
    description: '安裝開發依賴套件',
    tags: ['install', 'dev', 'development'],
  },
  {
    category: 'npm',
    command: 'npm uninstall <package>',
    description: '移除套件',
    tags: ['remove', 'uninstall', 'delete'],
  },
  {
    category: 'npm',
    command: 'npm update',
    description: '更新所有套件',
    tags: ['update', 'upgrade', 'packages'],
  },
  {
    category: 'npm',
    command: 'npm run <script>',
    description: '執行 package.json 中的腳本',
    tags: ['run', 'script', 'execute'],
  },
  {
    category: 'npm',
    command: 'npm list --depth=0',
    description: '列出已安裝的套件（僅頂層）',
    tags: ['list', 'packages', 'installed'],
  },
  {
    category: 'npm',
    command: 'npm outdated',
    description: '檢查過期的套件',
    tags: ['outdated', 'check', 'version'],
  },
  {
    category: 'npm',
    command: 'npm audit',
    description: '檢查安全性漏洞',
    tags: ['security', 'audit', 'vulnerabilities'],
  },
  {
    category: 'npm',
    command: 'npx <package>',
    description: '執行 npm 套件而不安裝',
    tags: ['execute', 'npx', 'temporary'],
  },

  // Kubernetes Commands
  {
    category: 'Kubernetes',
    command: 'kubectl get pods',
    description: '列出所有 Pod',
    tags: ['list', 'pods', 'get'],
  },
  {
    category: 'Kubernetes',
    command: 'kubectl get services',
    description: '列出所有服務',
    tags: ['list', 'services', 'get'],
  },
  {
    category: 'Kubernetes',
    command: 'kubectl describe pod <pod-name>',
    description: '查看 Pod 詳細資訊',
    tags: ['describe', 'details', 'pod'],
  },
  {
    category: 'Kubernetes',
    command: 'kubectl logs <pod-name>',
    description: '查看 Pod 日誌',
    tags: ['logs', 'output', 'debug'],
  },
  {
    category: 'Kubernetes',
    command: 'kubectl exec -it <pod-name> -- bash',
    description: '進入 Pod 的 bash shell',
    tags: ['exec', 'shell', 'interactive'],
  },
  {
    category: 'Kubernetes',
    command: 'kubectl apply -f <file.yaml>',
    description: '套用設定檔',
    tags: ['apply', 'deploy', 'yaml'],
  },
  {
    category: 'Kubernetes',
    command: 'kubectl delete pod <pod-name>',
    description: '刪除 Pod',
    tags: ['delete', 'remove', 'pod'],
  },
  {
    category: 'Kubernetes',
    command: 'kubectl get nodes',
    description: '列出所有節點',
    tags: ['nodes', 'list', 'cluster'],
  },
  {
    category: 'Kubernetes',
    command: 'kubectl port-forward <pod-name> 8080:80',
    description: '將本地埠號映射到 Pod',
    tags: ['port', 'forward', 'tunnel'],
  },
  {
    category: 'Kubernetes',
    command: 'kubectl scale deployment <name> --replicas=3',
    description: '調整部署的副本數量',
    tags: ['scale', 'replicas', 'deployment'],
  },
];

export const categories = Array.from(new Set(commands.map((cmd) => cmd.category)));
