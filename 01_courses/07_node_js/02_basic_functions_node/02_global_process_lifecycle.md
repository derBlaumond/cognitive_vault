---

title: Node Global Objects & Process-level APIs  
slug: 24-25_global-console-timers-process  
tags:

- topic/nodejs
    
- topic/javascript
    
- level/intermediate
    
- source/zerocho-node-textbook  
    created: 2025-10-22  
    updated: 2025-10-22  
    links: []
    

---

# Node Global Objects & Process-level APIs

> Goal: Know what Node adds to JavaScript at runtime: the **global object**, **console** utilities, **timers** (`setTimeout`/`setInterval`/`setImmediate`) and the **`process`** API. Learn their behavior, caveats, and event-loop ordering.

---

## 🌍 Global object(s)

- **`global`** — Node’s global object (browser analog: `window`).
    
- **`globalThis`** — standardized cross-env alias (works in modern browsers and Node).
    
- Many common names you “didn’t define” live here (e.g. `console`, `setTimeout`, **CommonJS** glue like `require`, `module`, `__filename`, `__dirname` in CJS).
    

### Key points

- You _can_ write `global.foo = 123` and read it anywhere, but **don’t** use it as a cross-file state bus. Prefer modules (export/import) for clarity and testability.
    
- You rarely need to write `global.thing`; Node lets you omit the receiver: `setTimeout(...)` not `global.setTimeout(...)`.
    

---

## 🖨️ `console` toolbox

Beyond `console.log`, learn these staples:

- `console.dir(obj, { depth: null })` — Better object inspection.
    
- `console.table(rows)` — Nice tabular view (arrays/objects).
    
- `console.error(err)` — Send to stderr (keeps logs separable).
    
- `console.time(label)` / `console.timeEnd(label)` — Quick timing around code blocks.
    
- `console.trace(label?)` — Prints a stack trace from the call site (great for “who called me?” debugging).
    

Example:

```js
console.time('work');
console.dir({ nested: { a: 1 } }, { depth: null });
console.table([{ id: 1, name: 'A' }, { id: 2, name: 'B' }]);
console.trace('trace here');
console.timeEnd('work');
```

---

## ⏱️ Timers & event loop ordering

### APIs

- `setTimeout(fn, ms, ...args)` / `clearTimeout(id)` — Run once after ~ms.
    
- `setInterval(fn, ms, ...args)` / `clearInterval(id)` — Repeat every ~ms.
    
- `setImmediate(fn, ...args)` / `clearImmediate(id)` — Queue for the **check** phase (near “asap”).
    

> All three return an opaque **timer handle**; keep it if you might cancel later.

### Why `setImmediate()` instead of `setTimeout(fn, 0)`?

- Both schedule “soon”, but they enter **different queues**. In Node:
    
    - **Microtasks** (✅ first): `process.nextTick()`, `Promise` callbacks.
        
    - Then phases like **timers** (`setTimeout/Interval`) and **check** (`setImmediate`).
        
- In practice, `setTimeout(fn, 0)` and `setImmediate(fn)` can swap order depending on I/O and environment; **prefer `setImmediate`** when you mean “after I/O, asap in Node”.
    

### Microtask priority (important!)

- `process.nextTick(fn)` runs **before** promise microtasks, and both run **before** timers/immediate.
    
- Rough priority:
    
    1. `process.nextTick`
        
    2. `Promise.resolve().then(...)`
        
    3. `setTimeout / setInterval` (timers phase) **vs** `setImmediate` (check phase) — order varies; don’t rely on a fixed order between these two.
        

Example ordering:

```js
setImmediate(() => console.log('immediate'));
setTimeout(() => console.log('timeout 0'), 0);
Promise.resolve().then(() => console.log('promise microtask'));
process.nextTick(() => console.log('nextTick')); // ← highest

// Likely output:
// nextTick
// promise microtask
// (then either "timeout 0" then "immediate", or vice versa)
```

### Cancelation patterns

```js
const t1 = setTimeout(fn, 1500);
clearTimeout(t1);

const int = setInterval(tick, 2000);
setTimeout(() => clearInterval(int), 10_000); // stop after 10s

const imm = setImmediate(fn);
clearImmediate(imm);
```

---

## 🧠 `process` — the running Node process

`process` exposes runtime, platform, env, and control knobs.

### Quick tour

- Identity & platform
    
    - `process.pid` — OS process id
        
    - `process.platform` — `'win32' | 'linux' | 'darwin' | ...'`
        
    - `process.arch` — CPU arch (`'x64'`, `'arm64'`, …)
        
    - `process.version`, `process.versions` — Node & deps versions
        
- Lifecycle
    
    - `process.uptime()` — Seconds since start
        
    - `process.cwd()` — Current working directory
        
    - `process.exit(code=0)` — Exit (use non-zero on error)
        
- Environment
    
    - `process.env` — Env vars (place **secrets** here, not in source)
        
    - Example: `process.env.SECRET_TOKEN`
        
- Resources & options (selected)
    
    - `NODE_OPTIONS` — Pass Node flags via env (e.g. `--max-old-space-size=4096`)
        
    - `UV_THREADPOOL_SIZE` — Size of libuv thread pool (defaults ~4; set to e.g. `8` for more parallel file/crypto/compress tasks)
        

### Microtask queue: `process.nextTick`

- Runs **before** any other pending I/O or timer callbacks.
    
- Use sparingly; overuse can starve the event loop.
    

```js
process.nextTick(() => console.log('I run before timers'));
```

### Exit codes

- `0` = success; non-zero indicates failure. In CL/CD, you’ll often `process.exit(1)` on unrecoverable errors to fail the job.
    

### Common path helpers (CJS vs ESM)

- **CJS**: `__filename`, `__dirname` are available.
    
- **ESM**: use `import.meta.url` + `fileURLToPath`:
    

```js
// ESM
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
const __filename = fileURLToPath(import.meta.url);
const __dirname  = dirname(__filename);
```

---

## ✅ Best practices

- Avoid `global` for shared state; prefer explicit module exports.
    
- Log intentionally: `console.error` for errors, `console.table`/`dir` for clarity.
    
- Time hot paths with `console.time/End` during dev; remove or guard in prod.
    
- Prefer `setImmediate()` over `setTimeout(fn, 0)` for “asap” in Node.
    
- Keep timer handles to cancel later; always clear intervals.
    
- Place secrets in `process.env`; **never** commit secrets to source.
    
- Use `process.nextTick` sparingly; prefer Promises for async sequencing.
    
- Signal error exits with `process.exit(1)` (after flushing logs/cleanup).
    

---

## 🧩 Exercises (Retrieval practice)

1. What’s the difference between `setImmediate(fn)` and `setTimeout(fn, 0)` in Node, and which should you prefer?
    
2. Put these in run order: `Promise.then`, `process.nextTick`, `setImmediate`, `setTimeout(...,0)`.
    
3. Print a table of environment keys and values that start with `MY_APP_` using `console.table`.
    
4. Write a function that starts an interval every 500ms and auto-stops after 5 seconds.
    
5. In ESM, reconstruct `__dirname` and explain why `import.meta.url` is required.
    

---

## 🗂️ Snippets you’ll reuse

**Interval with auto-cancel**

```js
function runFor(durationMs, everyMs, fn) {
  const id = setInterval(fn, everyMs);
  setTimeout(() => clearInterval(id), durationMs);
}
runFor(5000, 500, () => console.log('tick'));
```

**Env-config pattern**

```js
const cfg = {
  port: Number(process.env.PORT ?? 3000),
  nodeEnv: process.env.NODE_ENV ?? 'development',
  secret: process.env.SECRET ?? '',
};
if (!cfg.secret) {
  console.error('Missing SECRET'); process.exit(1);
}
```

**Measure block time**

```js
console.time('work');
await doWork();
console.timeEnd('work');
```

---

## 🔎 Quick reference

|Topic|API|Notes|
|---|---|---|
|Global|`global`, `globalThis`|Avoid storing app state here|
|Console|`log`, `error`, `dir`, `table`, `time/End`, `trace`|Use the right tool for clearer logs|
|Timers|`setTimeout/Interval/Immediate` + `clear*`|Keep handles; prefer `setImmediate` over `setTimeout(0)`|
|Microtasks|`process.nextTick`, `Promise.then`|nextTick > Promise > timers/immediate|
|Process info|`pid`, `platform`, `arch`, `version(s)`|Diagnostics & conditional logic|
|Process env|`process.env.*`|Source of truth for secrets/config|
|Paths|`cwd()`, `__filename/__dirname` (CJS), `import.meta.url` (ESM)|Convert URL to path in ESM|
|Exit|`process.exit(code)`|Non-zero to signal failure|

---

## 🇰🇷 한국어 정리 (읽기 쉬운 설명)

이 노트는 Node가 **자바스크립트에 추가로 제공하는 런타임 기능**을 모아서 정리했습니다.  
브라우저의 `window`처럼 Node에는 `global`(표준화된 이름은 `globalThis`)이 있고, `console`, `setTimeout` 같은 것들도 여기 포함돼 있어서 어디서든 바로 쓸 수 있어요. 하지만 `global`에 값을 넣어서 파일 간 상태를 공유하는 방식은 **강력히 비추천**입니다. 가독성·테스트 모두 나빠지므로 **모듈 export/import**로 명시적으로 주고받으세요.

`console`은 `log`만 쓰지 말고, **`dir`(깊은 객체 보기), `table`(표 형태 출력), `time/timeEnd`(수행시간 측정), `trace`(호출 스택 확인)**을 함께 써 보세요. 디버깅 체감 효율이 확 오릅니다.

타이머는 `setTimeout`, `setInterval`, `setImmediate`가 있고 모두 취소용 `clear*`가 있습니다. “가능한 빨리” 실행하려면 `setTimeout(fn, 0)` 대신 **`setImmediate(fn)`**를 권합니다(이벤트 루프 단계가 다름). 이벤트 루프 순서에서는 **`process.nextTick` → `Promise.then` → (`setTimeout`/`setImmediate`)** 순으로 이해하면 됩니다. `nextTick`은 너무 강력해서 남용하면 다른 작업이 굶주릴 수 있어요.

`process` 객체는 현재 프로세스의 정보와 환경을 제공합니다. `pid`, `platform`, `arch`, `version` 같은 식별 정보, `uptime()`/`cwd()` 같은 런타임 상태, 그리고 **환경변수(`process.env`)**를 통해 **비밀키와 설정**을 안전하게 주입합니다(소스에 직접 비밀번호를 적지 마세요). 종료 시에는 `process.exit(1)`처럼 **비정상 종료 코드를 명확히** 남겨 CI/CD가 실패를 감지하도록 하세요. 또한 ESM(모듈)에서는 `__dirname`이 없으므로 `import.meta.url`로 대체해야 합니다.

핵심 정리:

1. `global` 남용 금지, 모듈로 상태를 주고받기
    
2. `console`의 다양한 메서드로 **가독성 높은 로그** 작성
    
3. ASAP 작업은 `setImmediate`; 마이크로태스크 우선순위( nextTick > Promise ) 숙지
    
4. 타이머 핸들은 **반드시 보관 후 필요 시 `clear*`**
    
5. 설정/비밀은 **`process.env`**에서 관리, 종료 코드는 의도적으로 지정
    

이 원칙을 지키면 Node 런타임에서의 동작 순서가 선명해지고, 디버깅과 운영 품질이 크게 좋아집니다.