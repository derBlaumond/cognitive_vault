Awesome — this set maps perfectly to “REST API Design & Request Handling.”  
Below is your **Obsidian-style note in English** with code snippets, then a **Korean prose summary** at the end.

---

# 🧩 Node.js — Group 2: REST API Design & Request Handling

## 1) REST & URL Design (Pragmatic)

- **REST** gives naming and structure conventions for resources:
    
    - Nouns in paths: `/users`, `/posts`, `/posts/42/comments`.
        
    - No verbs in paths (ideally). Use **HTTP methods** as verbs.
        
- **Readable, guessable, consistent** URLs help clients explore:
    
    - `/category/javascript`, `/posts/123`, `/profile`, `/about`.
        
- ⚠️ Predictable paths can also aid attackers → pair with auth/rate-limit/validation.
    

## 2) HTTP Methods (meaning & typical usage)

|Method|Typical Use|Idempotent?|Notes|
|---|---|--:|---|
|`GET`|Fetch a resource (no body)|✅|Safe (no state change)|
|`POST`|Create / perform non-idempotent action|❌|Use for login, transfers, searches with payload|
|`PUT`|**Replace** entire resource|✅|Full-object update semantics|
|`PATCH`|**Modify** part of a resource|❌ (often treated as)|Partial update (e.g., just `nickname`)|
|`DELETE`|Remove a resource|✅|Return 204 or 200 w/ details|

> Practical tip: If action doesn’t cleanly fit REST (e.g., `/login`), still prefer `POST /login`.

## 3) Status Codes (minimal working set)

- **200 OK**: generic success (GET/PUT/PATCH/DELETE).
    
- **201 Created**: new resource created (POST).
    
- **204 No Content**: success with no body (often DELETE/PUT/PATCH).
    
- **400 Bad Request**: invalid input.
    
- **401 Unauthorized** / **403 Forbidden**: auth/permission failures.
    
- **404 Not Found**: no such path/resource.
    
- **409 Conflict**: versioning/duplicate constraints.
    
- **500/502/503/504**: server/infra failures.
    

## 4) Requests & Responses: what to look at

- **Request**: `req.method`, `req.url`, headers (auth, content-type, accept), optional **body** (POST/PUT/PATCH/DELETE).
    
- **Response**: set **status** + **headers** (e.g., `Content-Type`) and **body**.
    

### Content-Type essentials

- HTML: `text/html; charset=utf-8`
    
- JSON: `application/json; charset=utf-8`
    
- CSS/JS: `text/css`, `text/javascript` (or `application/javascript`)
    
- Always set charset for Korean text.
    

## 5) Bare HTTP server with routing (no framework)

```js
// rest-server.js
const http = require('http');
const fs = require('fs').promises;
const users = new Map(); // in-memory store: id -> { id, name }

function send(res, code, type, body = '') {
  res.writeHead(code, { 'Content-Type': type });
  res.end(body);
}

function notFound(res) {
  send(res, 404, 'text/plain; charset=utf-8', 'Not Found');
}

async function serveStatic(res, path, type) {
  try {
    const data = await fs.readFile(path);
    send(res, 200, `${type}; charset=utf-8`, data);
  } catch {
    notFound(res);
  }
}

function collectBody(req) { // stream → Buffer → string
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', (c) => chunks.push(c));
    req.on('end', () => resolve(Buffer.concat(chunks).toString()));
    req.on('error', reject);
  });
}

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  // Static HTML/CSS/JS (examples)
  if (method === 'GET' && url === '/') {
    return serveStatic(res, './public/index.html', 'text/html');
  }
  if (method === 'GET' && url === '/about') {
    return serveStatic(res, './public/about.html', 'text/html');
  }
  if (method === 'GET' && url === '/app.css') {
    return serveStatic(res, './public/app.css', 'text/css');
  }
  if (method === 'GET' && url === '/app.js') {
    return serveStatic(res, './public/app.js', 'application/javascript');
  }

  // Users API
  if (url === '/users' && method === 'GET') {
    const payload = JSON.stringify([...users.values()]);
    return send(res, 200, 'application/json; charset=utf-8', payload);
  }

  if (url === '/users' && method === 'POST') {
    try {
      const body = await collectBody(req);
      const { id, name } = JSON.parse(body);
      if (!id || !name) return send(res, 400, 'text/plain; charset=utf-8', 'id & name required');
      if (users.has(id)) return send(res, 409, 'text/plain; charset=utf-8', 'duplicate id');
      users.set(id, { id, name });
      return send(res, 201, 'application/json; charset=utf-8', JSON.stringify({ ok: true }));
    } catch {
      return send(res, 400, 'text/plain; charset=utf-8', 'invalid JSON');
    }
  }

  // PUT /users/:id  (full replace)
  if (method === 'PUT' && url.startsWith('/users/')) {
    const id = url.split('/')[2];
    if (!users.has(id)) return notFound(res);
    try {
      const body = await collectBody(req);
      const updated = JSON.parse(body); // expect full object { id, name, ... }
      if (updated.id && updated.id !== id) return send(res, 409, 'text/plain; charset=utf-8', 'id mismatch');
      updated.id = id;
      users.set(id, updated);
      return send(res, 200, 'application/json; charset=utf-8', JSON.stringify(updated));
    } catch {
      return send(res, 400, 'text/plain; charset=utf-8', 'invalid JSON');
    }
  }

  // PATCH /users/:id  (partial update)
  if (method === 'PATCH' && url.startsWith('/users/')) {
    const id = url.split('/')[2];
    if (!users.has(id)) return notFound(res);
    try {
      const body = await collectBody(req);
      const patch = JSON.parse(body); // e.g., { name: "new" }
      users.set(id, { ...users.get(id), ...patch, id });
      return send(res, 200, 'application/json; charset=utf-8', JSON.stringify(users.get(id)));
    } catch {
      return send(res, 400, 'text/plain; charset=utf-8', 'invalid JSON');
    }
  }

  // DELETE /users/:id
  if (method === 'DELETE' && url.startsWith('/users/')) {
    const id = url.split('/')[2];
    if (!users.has(id)) return notFound(res);
    users.delete(id);
    return send(res, 204, 'text/plain; charset=utf-8');
  }

  // Fallback 404
  notFound(res);
});

server.on('error', (e) => console.error(e));
server.listen(8082, () => console.log('REST server on :8082'));
```

### Why this structure

- **Routing** via `method + url` checks (raw `http` module).
    
- **Static assets** still need explicit handling (CSS/JS are separate requests).
    
- **Body parsing** is manual (stream → buffer → string → `JSON.parse`).
    
- **Error handling**: 4xx for client mistakes, 5xx for server bugs.
    

## 6) Client-side calls (examples)

- **GET** `/users` from a web page:
    
    ```js
    fetch('/users').then(r => r.json()).then(renderUsers);
    ```
    
- **POST** new user:
    
    ```js
    fetch('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({ id: 'jzero', name: '제로초' }),
    });
    ```
    
- **PUT/PATCH/DELETE** follow the same pattern with method + body (when applicable).
    

## 7) Common pitfalls

- Forgetting to set **`Content-Type`** → browser mis-renders or `fetch` can’t parse JSON.
    
- Not restarting server after code changes (unless using a watcher).
    
- Mixing up **PUT (replace)** vs **PATCH (partial)** semantics.
    
- Not handling unknown routes → add a **404** fallback.
    
- Blocking anything for too long → replies should generally complete <30s.
    

---

## 🗣 Korean Summary (한국어 설명)

이 그룹에서는 **REST 스타일의 URL 설계**와 **HTTP 메서드 처리 방식**을, Node의 순정 `http` 모듈로 직접 구현하는 흐름으로 익혔습니다. 주소는 **명사 중심**(예: `/users`, `/posts/42`)으로 통일하고, 동작은 **HTTP 메서드**(GET/POST/PUT/PATCH/DELETE)로 표현합니다. `GET`은 조회, `POST`는 생성·행위, `PUT`은 전체 교체, `PATCH`는 부분 수정, `DELETE`는 삭제로 사용하며, 결과에 맞춰 **상태 코드**(200/201/204/4xx/5xx)를 정확히 내려야 합니다.

Node 순정 서버에서는 라우팅을 `req.method + req.url`로 분기하고, **정적 파일(CSS/JS)** 또한 각각 별도의 요청으로 오므로 직접 제공해야 합니다. `POST/PUT/PATCH` 요청의 **본문(body)** 은 스트림으로 들어오므로 조각을 모아 문자열로 만든 뒤 `JSON.parse`로 해석합니다. 응답 시에는 **`Content-Type`과 `charset`** 을 정확히 지정해야 브라우저(특히 한글 처리)가 올바르게 렌더링합니다. 마지막으로, 모든 분기에서 에러와 미스매치를 **적절한 상태 코드**로 반환하고, 정의되지 않은 경로는 **404** 로 응답하는 **기본 가드**를 반드시 넣어야 안정적인 REST 서버가 됩니다.