---

title: Core Node I/O: OS, Paths, URLs/DNS, Crypto/Util, and the File System  
slug: 26-32_os-path-url-dns-crypto-util-fs  
tags:

- topic/nodejs
    
- topic/javascript
    
- topic/networking
    
- topic/security
    
- level/intermediate
    
- source/zerocho-node-textbook  
    created: 2025-10-22  
    updated: 2025-10-22  
    links: []
    

---

# Core Node I/O: OS, Paths, URLs/DNS, Crypto/Util, and the File System

> Goal: Learn the everyday Node built-ins for **system info (`os`)**, **path handling (`path`)**, **URL parsing & DNS**, **cryptography & utilities**, and **reading/writing files (`fs`)**—with idiomatic Promise-based patterns and event-loop awareness.

---

## 1) `os` — Operating System Information

```js
const os = require('node:os');

console.log({
  platform: os.platform(),               // 'win32' | 'linux' | 'darwin' | ...
  release: os.release(),                 // OS version
  hostname: os.hostname(),               // machine name
  homeDir: os.homedir(),                 // user home
  tmpDir: os.tmpdir(),                   // temp directory
  totalMem: os.totalmem(),               // bytes
  freeMem: os.freemem(),                 // bytes
  cpus: os.cpus().length,                // physical/logical cores (Node view)
});
```

**Why you’ll use it**

- Derive **CPU core count** to fork/cluster servers per core.
    
- Check memory/OS for diagnostics and conditional behavior.
    

> Note: “16 cores / 32 threads” in hardware docs ≠ Node’s “threads”. Use `os.cpus().length` when deciding process count.

---

## 2) `path` — Portable, Safe Path Manipulation

```js
const path = require('node:path');

// Join segments using the current OS’ separators
const appDir = path.join(__dirname, 'data', 'images');

// Normalize weird inputs (fixes duplicated separators, `..`, etc.)
const normalized = path.normalize('foo//bar/..\\baz');

// Absolute vs relative resolution
path.join('/etc', '/passwd');               // '/etc/passwd' (joins)
path.resolve('/etc', '/passwd');            // '/passwd'      (respects absolute)

const file = '/var/www/app/build/index.html';
console.log({
  dir: path.dirname(file),                  // '/var/www/app/build'
  base: path.basename(file),                // 'index.html'
  ext: path.extname(file),                  // '.html'
  parsed: path.parse(file),                 // { root, dir, base, ext, name }
});

// Relative path from A to B
const fromAtoB = path.relative('/a/b/c', '/a/static/js/app.js'); // '../../static/js/app.js'
```

**Use `path` ALWAYS** for portability (Windows `\` vs POSIX `/`) and correctness.

---

## 3) Modern URL Handling + DNS

### 3.1 URL (WHATWG standard in Node)

```js
// No require needed in ESM; in CJS: const { URL, URLSearchParams } = require('node:url');
const { URL, URLSearchParams } = require('node:url');

const u = new URL('https://user:pass@example.com:8443/login?role=admin&role=user#section');

console.log(u.protocol);      // 'https:'
console.log(u.username);      // 'user'
console.log(u.password);      // 'pass'
console.log(u.hostname);      // 'example.com'
console.log(u.port);          // '8443'
console.log(u.pathname);      // '/login'
console.log(u.search);        // '?role=admin&role=user'
console.log(u.hash);          // '#section'

const sp = u.searchParams;    // URLSearchParams (iterable)
console.log(sp.get('role'));      // 'admin'
console.log(sp.getAll('role'));   // ['admin','user']
sp.append('mode', 'readonly');
sp.delete('role');
console.log(sp.toString());       // 'mode=readonly'
```

**Tips**

- **`URLSearchParams`** handles multi-valued keys and rendering back to query strings.
    
- Prefer this over legacy `querystring` (deprecated in practice).
    

### 3.2 DNS lookups & records

```js
// Promise-based DNS (Node has both callback and promise APIs)
const dns = require('node:dns').promises;

const host = 'example.com';
const [a, aaaa, mx, cname, any] = await Promise.all([
  dns.resolve4(host),            // IPv4 A records
  dns.resolve6(host),            // IPv6 AAAA records
  dns.resolveMx(host),           // Mail exchangers
  dns.resolveCname(host),        // Canonical names
  dns.resolveAny(host),          // Mixed records (A/AAAA/TXT/MX/…)
]);

console.log({ a, aaaa, mx, cname, any });
```

**Common record types**

- **A / AAAA**: IPv4 / IPv6 addresses
    
- **CNAME**: canonical alias (e.g., `www → root`)
    
- **MX**: mail exchange servers
    

---

## 4) `crypto` and `util` — Security & Interop Helpers

### 4.1 Hashing (one-way; store checksums/password digests)

```js
const crypto = require('node:crypto');

function sha512Base64(input) {
  return crypto.createHash('sha512').update(input).digest('base64');
}

console.log(sha512Base64('password')); // store this digest, not the plaintext
```

**Guidance**

- For **passwords**, use slow, salted KDFs (**bcrypt**, **scrypt**, or `crypto.pbkdf2`) — not plain hashes.
    
- Avoid outdated algorithms (MD5, SHA1).
    

**PBKDF2 (built-in, good baseline)**

```js
const { randomBytes, pbkdf2Sync } = require('node:crypto');

function hashPassword(password) {
  const salt = randomBytes(16).toString('hex');
  const iterations = 310000;                 // modern baseline
  const keylen = 32;                          // 256-bit
  const digest = 'sha256';

  const derived = pbkdf2Sync(password, salt, iterations, keylen, digest).toString('hex');
  return { salt, iterations, digest, derived };
}

function verifyPassword(password, record) {
  const { salt, iterations, digest, derived } = record;
  const check = pbkdf2Sync(password, salt, iterations, 32, digest).toString('hex');
  return crypto.timingSafeEqual(Buffer.from(check, 'hex'), Buffer.from(derived, 'hex'));
}
```

### 4.2 Symmetric encryption (two-way; same key for encrypt/decrypt)

> Prefer high-level libs for production (e.g., libsodium). If using Node’s `crypto`, use **AEAD** ciphers like `aes-256-gcm` and unique IVs.

```js
const crypto = require('node:crypto');

function encrypt(plaintext, key) {
  // key: 32 bytes (Buffer); iv: 12 bytes for GCM
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
  const enc = Buffer.concat([cipher.update(plaintext, 'utf8'), cipher.final()]);
  const tag = cipher.getAuthTag();
  return Buffer.concat([iv, tag, enc]).toString('base64');
}

function decrypt(b64, key) {
  const buf = Buffer.from(b64, 'base64');
  const iv = buf.subarray(0, 12);
  const tag = buf.subarray(12, 28);
  const enc = buf.subarray(28);
  const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
  decipher.setAuthTag(tag);
  const dec = Buffer.concat([decipher.update(enc), decipher.final()]);
  return dec.toString('utf8');
}
```

**Key management**: never hardcode keys. Load from **`process.env`** or a KMS (AWS KMS, GCP KMS, HashiCorp Vault). Rotate periodically.

### 4.3 `util` highlights

- **`util.deprecate(fn, message)`**: wrap legacy APIs to warn consumers before removal.
    
- **`util.promisify(fn)`**: convert Node-style `(err, data)` callbacks to Promises.
    

```js
const { promisify, deprecate } = require('node:util');
const fs = require('node:fs');

const readFileP = promisify(fs.readFile);
const oldFn = deprecate(() => {}, 'oldFn() is deprecated; use newFn()');

// now you can:
const text = await readFileP('README.md', 'utf8');
```

> `util.promisify` requires the function to be **Node callback style** (`(err, data)`).

---

## 5) `fs` — File System (Callback vs Promises vs Sync)

Prefer **Promises API** (`require('node:fs/promises')`) for clean async flows and `async/await`.

```js
const fs = require('node:fs/promises');
const path = require('node:path');

// Write then read
await fs.writeFile('README.txt', 'Hello from Node\n', 'utf8');
const data = await fs.readFile('README.txt', 'utf8');
console.log(data);

// Ensure directory then write a file inside
const dir = path.join(process.cwd(), 'out');
await fs.mkdir(dir, { recursive: true });
await fs.writeFile(path.join(dir, 'result.json'), JSON.stringify({ ok: true }), 'utf8');
```

### Concurrency & ordering

**Async (non-blocking)**: work may complete in _any_ order unless you `await` or chain.

```js
// Unordered (fire-and-forget)
const tasks = [1,2,3,4].map(i => fs.readFile(`./files/${i}.txt`, 'utf8'));
const results = await Promise.all(tasks); // completes when all finish (any order internally)
```

**Enforce order** by awaiting each step (keeps non-blocking I/O, preserves sequence):

```js
for (const name of ['1.txt','2.txt','3.txt','4.txt']) {
  const t = await fs.readFile(path.join('files', name), 'utf8');
  console.log(name, t.length);
}
```

**Sync APIs** (`fs.readFileSync`, `fs.writeFileSync`, …) block the event loop.  
Use **only** for startup/one-off tooling—not in hot server paths.

### Useful patterns

- **Check existence** without races: attempt the operation and handle errors; or use `fs.access`:
    

```js
try {
  await fs.access('config.json');
} catch {
  await fs.writeFile('config.json', JSON.stringify({}), 'utf8');
}
```

- **Streams** (when file is large): prefer streams over reading entire file into memory. (Covered deeper in streaming chapters.)
    

---

## Best Practices & Pitfalls

- **Path safety**: never concatenate with `+`; use `path.join/resolve/normalize`.
    
- **URL parsing**: use **WHATWG `URL`** and **`URLSearchParams`**; avoid legacy `querystring`.
    
- **DNS**: `dns.promises.*` is convenient; be aware of caching and timeouts in real systems.
    
- **Crypto**:
    
    - Passwords → **bcrypt/scrypt/pbkdf2** (slow, salted).
        
    - One-way hashing → SHA-2 family (`sha256/sha512`).
        
    - Symmetric encryption → **AES-GCM**; unique IV per message; no hardcoded keys.
        
    - Keep secrets in **`process.env`**/**KMS**, not in code or git.
        
- **FS**:
    
    - Prefer `fs/promises` + `async/await`.
        
    - Avoid sync FS in servers; okay during startup/setup.
        
    - Control concurrency with `Promise.all`, `p-limit`, or simple loops w/ `await`.
        
- **Error handling**: wrap `await` in `try/catch`, surface meaningful messages, and use `console.error` for stderr.
    

---

## Quick Reference

|Area|Use this|Notes|
|---|---|---|
|OS info|`require('node:os')`|`cpus()`, `totalmem()`, `platform()`|
|Paths|`require('node:path')`|`join`, `resolve`, `normalize`, `parse`, `relative`|
|URL|`require('node:url')`|`URL`, `URLSearchParams`; modern standard|
|DNS|`require('node:dns').promises`|`resolve4/6`, `resolveMx`, `resolveCname`, `resolveAny`|
|Crypto (hash)|`crypto.createHash('sha512')`|For passwords, use KDFs (`pbkdf2`, `bcrypt`, `scrypt`)|
|Crypto (enc)|`aes-256-gcm` via `createCipheriv`|Unique IVs, manage keys securely|
|Promisify|`require('node:util').promisify`|Convert Node-style callbacks to Promise|
|Deprecation|`util.deprecate(fn, msg)`|Warn consumers before removal|
|FS (async)|`require('node:fs/promises')`|`readFile`, `writeFile`, `mkdir`, `access`, etc.|
|FS (sync)|`require('node:fs')`|Use only at startup or CLI scripts|

---

## Exercises

1. Build a function that writes N files in parallel, then reads them back and prints the total bytes (use `Promise.all`).
    
2. Parse a URL with multiple repeated query keys and normalize them to a map of `key → string[]`.
    
3. Resolve `MX` and `A/AAAA` for your domain and print an annotated report.
    
4. Hash a password with PBKDF2 and verify it; then switch to `scrypt` or `bcrypt` and compare code complexity.
    
5. Implement `safeJoin(baseDir, ...segments)` that prevents path traversal (normalize, ensure final path starts with `baseDir`).
    

---

## 🇰🇷 한국어 설명 (친절한 마무리)

이 노트는 Node의 핵심 I/O 내장 모듈을 **실무 중심으로 묶어** 정리했습니다.

1. **`os`**는 운영체제 정보를 줍니다. CPU 코어 수(`os.cpus().length`)를 읽어 **클러스터/멀티 프로세스 개수**를 결정하거나, 메모리/플랫폼을 확인할 때 유용합니다. 하드웨어 문서의 “코어/스레드”와 Node의 스레드 개념은 다르니 혼동하지 마세요.
    
2. **`path`**는 경로를 OS별로 안전하게 다루게 해줍니다. 문자열 더하기 대신 **`path.join/resolve/normalize/parse/relative`**를 사용하세요. 이렇게 해야 Windows/POSIX에서 모두 정상 동작하고, “/ vs \” 문제를 자동으로 해결합니다.
    
3. **URL/DNS**
    
    - URL은 **WHATWG 표준 `URL`**과 **`URLSearchParams`**로 다루세요. 다중 키(`getAll`)나 렌더링(`toString`)이 깔끔합니다. 과거의 `querystring`은 이제 권장되지 않습니다.
        
    - **DNS**는 `dns.promises`로 A/AAAA/MX/CNAME 등 레코드를 조회할 수 있습니다. 웹 접속(IP), 메일서버(MX), 별칭(CNAME) 등 **도메인의 다양한 역할**을 직접 확인해 보세요.
        
4. **`crypto`**
    
    - **비밀번호**는 빠른 해시가 아닌 **느린 KDF**(PBKDF2/bcrypt/scrypt)를 쓰고, **솔트**와 **반복 횟수**를 관리합니다.
        
    - **단방향 해시**는 SHA-2 계열을 사용하고, **양방향 대칭 암호화**는 `aes-256-gcm` 같은 **AEAD**로 구현하세요(IV는 매번 새로 만들기).
        
    - **키/비밀은 코드에 하드코딩 금지**. `process.env`나 **KMS**로 관리하고 주기적으로 교체(로테이션)합니다.
        
5. **`fs`**
    
    - 기본은 **`fs/promises` + `async/await`**. 동시 실행은 `Promise.all`, 순차 실행은 간단한 `for-await`/`for` 루프로 처리하면 됩니다.
        
    - **동기 FS**는 서버 런타임에서 이벤트 루프를 멈추므로 지양하고, **서버 시작 전 초기화** 같은 1회 작업에만 쓰는 것이 안전합니다.
        

전반적인 원칙은 **이식성(path)**, **표준(URL/URLSearchParams)**, **보안(crypto/KMS)**, **논블로킹(fs/promises)**, **명확한 에러 처리**입니다. 이 틀만 지키면 운영 환경에서의 안전성/가독성/성능이 모두 좋아집니다.