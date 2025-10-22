Excellent — this pair (36–37) is exactly the foundation of Node’s networking model.  
Here’s your **Obsidian note** in English (for your GitHub “Cognitive Vault”),  
ending with a detailed Korean summary section as you requested.

---

# 🧩 Node.js — Group 1: HTTP Server & Static File Delivery

## 1. HTTP Server Basics

The **HTTP server** is not part of the browser; it’s a process that listens for incoming HTTP requests and responds with data.  
Node .js allows you to create such a server using its built-in `http` module.

### Core Concepts

- **Client ⇄ Server Model**  
    A **client** (browser, app, or API consumer) sends an HTTP request.  
    A **server** receives that request and replies with an HTTP response.  
    Both sides communicate using the **HTTP protocol**, a standardized “language” (verbs + headers + body).
    
- **Ports**  
    A **port** identifies which program on a host handles the connection.  
    Common defaults:
    
    - `80` → HTTP
        
    - `443` → HTTPS
        
    - `8080`, `3000`, etc. → custom development servers  
        You can run multiple servers on the same machine if each listens on a different port.
        
- **Localhost**  
    `localhost` (or `127.0.0.1`) is a loopback address only accessible from your own machine—ideal for development.
    

### Minimal Server Example

```js
// server1.js
const http = require('http');

const server = http.createServer((req, res) => {
  res.write('<h1>Hello Node</h1>');
  res.end('<p>This is the first Node server</p>');
});

server.listen(8080, () => console.log('Server running on port 8080'));
```

- `http.createServer(callback)` returns a server instance.
    
- The callback receives `(req, res)` for each request.
    
- `res.write()` streams partial data; `res.end()` finishes the response.
    
- `server.listen(port)` starts the event loop listening on that port.
    
- When the terminal shows no prompt after running `node server1.js`, the process is now _persistently listening_.
    

### Error & Event Hooks

```js
server.on('error', (err) => console.error(err));
server.on('listening', () => console.log('Listening …'));
```

### Restart Rule

When server code changes, restart the process manually (e.g., Ctrl +C → rerun)  
or use a watcher like `nodemon` for auto-reload during development.

---

## 2. Serving HTML Files via `fs`

Writing HTML directly inside `res.write()` quickly becomes messy.  
Instead, store your markup in an external `.html` file and serve it through Node’s `fs` module.

### Why Content-Type Matters

Browsers must know the MIME type to render correctly.

```js
res.writeHead(200, {
  'Content-Type': 'text/html; charset=utf-8',
});
```

Without this, some browsers (notably Safari) may display the page as plain text or mis-encode Korean characters.

### File Serving Example

```js
// server2.js
const http = require('http');
const fs = require('fs').promises;

const server = http.createServer(async (req, res) => {
  try {
    const data = await fs.readFile('./server.html');
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(data);
  } catch (err) {
    res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Server Error – Cannot load HTML file');
  }
});

server.listen(8080, () => console.log('Server running on port 8080'));
```

### Notes

- Use **`async/await` + `try … catch`** to prevent crashes on file errors.
    
- For multiple servers, assign different ports (e.g., 8080, 8081).
    
- Restart whenever you modify code or files.
    
- Later, in deployment, use port 80 to make `http://yourdomain.com` accessible without `:8080`.
    

---

## 3. Key Concept Recap

|Concept|Description|
|---|---|
|**HTTP protocol**|Defines the request–response structure between client & server.|
|**Port**|Communication endpoint allowing multiple services on one host.|
|**`http.createServer()`**|Creates a server instance bound to an event loop.|
|**`res.write()` / `res.end()`**|Stream response data.|
|**`Content-Type` header**|Informs the browser of the data’s MIME type and encoding.|
|**`fs.readFile` + async/await**|Reads external HTML efficiently.|
|**Manual restart**|Required after code edits unless using a watcher tool.|

---

## 🗣 Korean Summary (한국어 설명)

이 챕터에서는 **Node.js 기반 HTTP 서버의 작동 원리**를 배웠다.  
HTTP 서버는 클라이언트(브라우저)의 요청을 받아 응답하는 **프로세스**이며, Node는 `http` 모듈을 통해 이를 간단히 생성할 수 있다.

`createServer()`는 요청과 응답 객체(`req`, `res`)를 전달받아, `res.write()`로 데이터를 스트리밍하고 `res.end()`로 전송을 마친다.  
서버는 특정 포트(예: 8080)에 **리스닝(listening)** 상태로 존재하며, 각 포트는 서로 다른 프로그램을 구분한다.

HTML 코드를 직접 문자열로 보내는 대신, `fs.readFile()`로 파일을 읽어 응답하는 방식이 훨씬 효율적이다.  
이때 `Content-Type: text/html; charset=utf-8` 헤더를 지정해야 브라우저가 올바르게 렌더링하며,  
에러가 발생하면 `try … catch`로 처리해 프로세스가 멈추지 않도록 해야 한다.

결국 이 단계는 “**Node를 이용한 순수 HTTP 서버의 기본 구조 + 정적 파일 전송**”을 이해하기 위한 핵심이다.  
이 개념을 익히면 이후 REST API 서버(다음 그룹)나 Express 프레임워크의 동작 원리도 자연스럽게 이해할 수 있다.

---