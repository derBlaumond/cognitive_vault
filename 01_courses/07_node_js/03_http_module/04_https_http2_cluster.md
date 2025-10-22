Here’s your **Obsidian-style** note for **Group 4 — HTTPS, HTTP/2, and Clustering** (English first; Korean wrap-up at the end as one prose section).

---

# 🔐 Group 4 — HTTPS, HTTP/2, and Clustering

## 1) Why HTTPS (TLS) is essential

- HTTP traffic is **plaintext**: headers, cookies, query strings, credentials can be sniffed/altered.
    
- **HTTPS = HTTP over TLS**: encrypts in transit, thwarts credential/cookie theft and MITM.
    
- In production, always:
    
    - Use **Secure** cookies (sent only over HTTPS) + **HttpOnly** + appropriate **SameSite**.
        
    - Redirect `http://` → `https://` and set **HSTS** (`Strict-Transport-Security`).
        

---

## 2) Enabling HTTPS in Node

- Use Node’s `https` module and load a **certificate chain**:
    
    - **key** (private key), **cert** (server cert), **ca** (intermediate chain).
        
- One-time sync reads are acceptable at **startup** only (initialization path).
    

```js
const https = require('https');
const fs = require('fs');

const options = {
  key:  fs.readFileSync('/path/to/privkey.pem'),
  cert: fs.readFileSync('/path/to/fullchain.pem'), // or cert + ca separately
  // ca: [fs.readFileSync('/path/to/chain.pem')]
};

https.createServer(options, (req, res) => {
  // handle like an http server
}).listen(443, () => console.log('HTTPS on :443'));
```

**Notes**

- Public sites commonly use **Let’s Encrypt** (free, automated renewal).
    
- Default ports: **443** (HTTPS), **80** (HTTP). Browsers omit these in URLs.
    
- For local dev without a real cert, you’ll see a browser warning unless you add a trusted dev CA.
    

---

## 3) HTTP/2: speed + efficiency

- **HTTP/1.1**: limited parallelism (connection-per-asset/limited pipelining).
    
- **HTTP/2**: **multiplexing** (many streams over one TCP), header compression, server push (mostly legacy now), lower latency—especially for pages with many small assets.
    
- In Node:
    
    - Use `http2` (usually over TLS with ALPN negotiation).
        
    - Most CDNs/ingress proxies speak HTTP/2 for you; your app can still be plain HTTP behind a proxy.
        

```js
const http2 = require('http2');
const fs = require('fs');

const server = http2.createSecureServer({
  key:  fs.readFileSync('/path/to/privkey.pem'),
  cert: fs.readFileSync('/path/to/fullchain.pem')
}, (req, res) => {
  res.stream.respond({ ':status': 200, 'content-type': 'text/html; charset=utf-8' });
  res.stream.end('<h1>Hello HTTP/2</h1>');
});

server.listen(443, () => console.log('HTTP/2 on :443'));
```

**Pragmatics**

- **Dev**: HTTP/1.1 is fine; **Prod**: enable HTTPS; HTTP/2 is typically enabled automatically by your proxy (e.g., Nginx, Caddy, Cloudflare, ALB).
    
- If you terminate TLS at a proxy, keep **app→proxy** either on a trusted network or mTLS.
    

---

## 4) Clustering: using all CPU cores

- A single Node process runs JS on **one core**; to scale on a single machine, start **N workers** (≈ CPU cores).
    
- **Cluster** (multi-process) spreads connections across workers on the **same port** (internally round-robin).
    
- Caveats:
    
    - **No shared memory** for JS state. Sessions stored in-process will be inconsistent across workers.
        
    - Use a **shared store** (e.g., Redis) for sessions, rate limits, sockets presence, etc.
        
    - Graceful restarts and crash recovery are required.
        

```js
const cluster = require('cluster');
const os = require('os');
const http = require('http');

if (cluster.isMaster) {
  const n = os.cpus().length;
  for (let i = 0; i < n; i++) cluster.fork();
  cluster.on('exit', (worker) => {
    console.error('Worker died', worker.process.pid);
    cluster.fork(); // respawn
  });
} else {
  http.createServer((req, res) => {
    res.writeHead(200); res.end(`Handled by ${process.pid}\n`);
    // (Demo) process.exit() to simulate failure
  }).listen(8080);
}
```

**Operational tips**

- Prefer a **process manager** (e.g., PM2/systemd/docker) for clustering, logs, health checks, and zero-downtime reloads.
    
- For **sticky sessions** (WebSocket/long-polling), use a load balancer with stickiness or a shared socket adapter (e.g., Socket.IO + Redis adapter).
    
- **Monitoring**: collect per-worker metrics; watch for uneven load or memory leaks.
    

---

## 5) Security & deployment checklist

-  Real certs from a CA (automate renewal).
    
-  Force HTTPS; set HSTS.
    
-  **Secure + HttpOnly + SameSite** on auth cookies.
    
-  Terminate TLS at edge/proxy; enable **HTTP/2** via ALPN.
    
-  Use **cluster/process manager** to utilize all cores; handle crashes with auto-respawn.
    
-  Externalize **session store** (Redis) when clustering.
    
-  Plan for **graceful shutdown** (drain connections, close server, then exit).
    
-  Load test: confirm HTTP/2 gains and cluster scaling.
    

---

## 🇰🇷 한국어 요약 (줄글)

HTTPS는 요청·응답의 헤더, 쿠키, 쿼리스트링, 로그인 정보가 중간에서 탈취되지 않도록 **TLS로 암호화**하는 기술이며, 실제 서비스에서는 필수입니다. Node에서는 `https` 모듈로 인증서(`key/cert/ca`)를 로드해 서버를 띄우고, 운영 환경에서는 보통 Let’s Encrypt로 자동 갱신을 설정합니다. HTTPS 위에서 **HTTP/2**를 사용하면 하나의 연결로 여러 요청을 **동시에** 처리(멀티플렉싱)하여 리소스가 많은 페이지에서 속도가 크게 개선됩니다. 배포 시에는 프록시/로드밸런서가 TLS 종료와 HTTP/2를 대신 처리하는 경우가 일반적입니다. Node는 단일 프로세스가 한 코어만 쓰므로, **cluster**로 워커를 코어 수만큼 띄워 포트 하나로 분산 처리합니다. 다만 프로세스 간 메모리를 공유하지 못하므로, 로그인 세션 등 상태는 **Redis 같은 공용 저장소**에 두어야 하며, 장애 시 자동 재기동, 그레이스풀 셧다운, 로드밸런서 스티키 설정(필요 시) 등을 갖추는 것이 좋습니다. 최종적으로는 **HTTPS 강제 + HSTS**, **Secure/HttpOnly/SameSite 쿠키**, **HTTP/2 활성화**, **클러스터/프로세스 매니저 적용**, **세션 외부화**를 체크리스트로 삼아 배포하면 됩니다.