You’re right—my bad. I’ll stick to your Obsidian format: English notes, with a Korean prose summary at the end. Here’s Group 5 reformatted properly.

# Node.js — Group 5: Parallelism & Event Management

## Overview

- Use **`worker_threads`** for CPU-bound JS work across cores.
    
- Use **libuv thread pool** for parallel native tasks (fs/crypto/zlib/dns).
    
- Use **`child_process`** to run external programs or separate Node processes.
    
- Use **`events`** (`EventEmitter`) for decoupled in-process signaling.
    
- Always design **error handling** to keep the process healthy and support graceful shutdowns.
    

---

## worker_threads

- Each worker has its own event loop/heap/stack; communicate via `postMessage`.
    
- Zero-copy with **transferables** (e.g., `ArrayBuffer`) and shared state via **`SharedArrayBuffer` + `Atomics`**.
    
- Prefer a **worker pool** (reuse workers) to avoid spawn overhead.
    
- Great for: image transforms, crypto, parsing, compression, pathfinding, etc.
    

**Minimal pattern**

```js
// main.js
const { Worker, isMainThread, workerData, parentPort } = require('node:worker_threads');

if (isMainThread) {
  const w = new Worker(__filename, { workerData: { n: 45 } });
  w.on('message', (v) => console.log('result:', v));
  w.on('error', console.error);
} else {
  const fib = (x) => (x < 2 ? x : fib(x-1) + fib(x-2));
  parentPort.postMessage(fib(workerData.n));
}
```

---

## libuv Thread Pool

- Powers native async ops: **`crypto.pbkdf2/scrypt`**, **`zlib`**, parts of **`fs`**, **`dns.lookup`**.
    
- Default size **4**; tune with `UV_THREADPOOL_SIZE` (set **before** `node app.js`).
    
- Tuning guideline: try `min(cpus, 8~16)` and benchmark; too large can slow due to context switching.
    

```bash
UV_THREADPOOL_SIZE=8 node app.js
```

---

## child_process

- **`spawn(cmd, args, opts)`**: stream stdio (best for large output; no shell).
    
- **`exec(cmd, opts, cb)`**: via shell; buffers whole output (small output only).
    
- **`execFile(file, args, opts, cb)`**: like spawn but buffers; no shell (safer).
    
- **`fork(module, args, opts)`**: Node-to-Node with IPC (`child.send`/`process.on('message')`).
    

**Streaming example**

```js
const { spawn } = require('node:child_process');
const ls = spawn('ls', ['-la']);
ls.stdout.on('data', (d) => process.stdout.write(d));
ls.stderr.on('data', (d) => process.stderr.write(d));
ls.on('close', (code) => console.log('exit', code));
```

---

## events (EventEmitter)

- Decouple modules via **publish/subscribe**: `on`/`once`/`emit`.
    
- Add an **`error`** listener on emitters that can fail; otherwise process may crash.
    
- Prevent listener leaks: restructure or `emitter.setMaxListeners(n)`.
    

```js
const { EventEmitter } = require('node:events');
const bus = new EventEmitter();
bus.once('boot', () => console.log('booted'));
bus.on('job:done', (id) => console.log('done', id));
bus.emit('boot');
bus.emit('job:done', 42);
```

---

## Error Handling (Process Safety)

- **Synchronous**: `try/catch` around risky blocks.
    
- **Callback style**: first arg is `err`; handle and return early.
    
- **Promises/async**: always `.catch()` or `try { await } catch {}`.
    
- **Global fallbacks** _(logging only; no guaranteed recovery)_:
    
    - `process.on('unhandledRejection', handler)`
        
    - `process.on('uncaughtException', handler)`
        
- **Graceful shutdown**: trap `SIGTERM`/`SIGINT`, stop accepting new work, drain, close resources, then `process.exit(0)` or set `process.exitCode`.
    

```js
process.on('unhandledRejection', (reason, p) => {
  console.error('UNHANDLED REJECTION', reason);
});

process.on('uncaughtException', (err) => {
  console.error('UNCAUGHT EXCEPTION', err);
  // initiate graceful shutdown if needed
});
```

---

## When to Use What (Cheat Sheet)

|Scenario|Tool|
|---|---|
|CPU-bound JS work|`worker_threads` (use a pool)|
|Heavy native ops (crypto/zlib/fs)|libuv pool (`UV_THREADPOOL_SIZE`)|
|Call external tools / huge stdout|`spawn`|
|Small one-off command|`exec` / `execFile`|
|Node↔Node with IPC|`fork`|
|In-process decoupling/signals|`EventEmitter`|
|Process-wide safety net|`unhandledRejection` / `uncaughtException` + graceful shutdown|

---

## Korean Summary (한국어 요약)

`worker_threads`는 JS 로직을 코어별로 병렬 실행할 때 쓰고, `libuv` 스레드풀은 fs/crypto/zlib 같은 **내장 네이티브 작업**의 동시성을 높일 때 씁니다. 외부 프로그램을 돌리거나 Node 프로세스를 분리하고 싶으면 `child_process`(특히 `spawn`/`fork`)가 적합해요. 모듈 간 느슨한 연결은 `EventEmitter`로 이벤트를 발행/구독하면 되고, 스트림이나 이벤트에는 `error` 리스너를 반드시 붙이세요. 에러 처리는 “근처에서 즉시 처리”가 원칙이고, 마지막 방어선으로 `unhandledRejection`/`uncaughtException`에서 로깅 후 **우아한 종료**(새 작업 수락 차단 → 진행 중 작업 마무리 → 리소스 정리)를 설계해야 프로세스가 안정적으로 살아남습니다.