- 다른 파일에 있는 변수를 `module.exports` 했을 때, `require()` 로 받은 변수명을 마음대로 정해도 된다. 그러나 구조분해 할당의 경우는 속성명과 변수명은 동일해야 한다.
---

title: Node Runtime & Module Systems (CommonJS vs ES Modules)  
slug: 20-23_node-runtime-and-modules  
tags:

- topic/nodejs
    
- topic/javascript
    
- level/intermediate
    
- source/zerocho-node-textbook  
    created: 2025-10-22  
    updated: 2025-10-22  
    links: []
    

---

# Node Runtime & Module Systems (CommonJS vs ES Modules)

One-sentence purpose: Understand how Node loads and links code (CommonJS vs ESM), how `module.exports`/`exports`/`require` work, what circular requires do, and how to use ESM features like dynamic import and top-level `await`.

---

## 📘 Concepts

- **Module** — A file with its own scope that can _export_ values and be _imported_ by others.
    
- **CommonJS (CJS)** — Historic Node module system using `require` and `module.exports`. File extension usually `.js`/`.cjs`.
    
- **ES Modules (ESM)** — Standard JavaScript modules using `import`/`export`. File extension `.mjs` or `.js` with `"type": "module"`.
    
- **Exports object** — In CJS, `module.exports` is the actual exported value; `exports` is a convenience reference to it (an initially aliased object).
    
- **Require cache** — Node caches loaded modules in `require.cache` (by absolute path) so subsequent `require` calls reuse the same instance.
    
- **Circular require** — When A requires B and B requires A. Node breaks the cycle by providing a _partial_ export to the dependent.
    
- **Dynamic import** — CJS: `require()` can be used anywhere. ESM: `import()` function returns a Promise; static `import` must be at top-level.
    
- **Top-level await (TLA)** — In ESM only: `await` is allowed at the top level of a module.
    

---

## ⚙️ Rules & Gotchas

### CommonJS

- **Exporting one vs many**
    
    - One value: `module.exports = fnOrObject`
        
    - Many named: `exports.foo = foo; exports.bar = bar;` _(do not reassign `exports`)_
        
- **`exports` vs `module.exports`**
    
    - Initially: `exports === module.exports` (aliases).
        
    - If you set `module.exports = someValue`, the alias is broken; further `exports.x = ...` does nothing to the new export.
        
    - **Rule:** If you assign a single thing, use `module.exports = ...`. If you attach many, only use `exports.x = ...` and never reassign either afterward.
        
- **`require` behavior**
    
    - Resolution: relative paths `./x`, parent `../x`, or package names (via Node resolution).
        
    - Caching: first `require` reads and executes the file, caches the module object; subsequent `require` returns the cached one.
        
    - Side-effects: `require('./x')` without assigning still runs `x` once (for side effects).
        
    - Location: unlike `import`, `require` can appear _anywhere_ in the file.
        
- **Circular requires**
    
    - On cycle detection, Node provides a _partially initialized_ export (often `{}`) to break the recursion. Accessing members that aren’t yet assigned yields `undefined`. Prefer designing modules to avoid cycles.
        

### ES Modules

- **Enabling ESM**
    
    - Use `.mjs`, **or** set `"type": "module"` in `package.json` and use `.js`.
        
- **Syntax**
    
    - Named export: `export const foo = 1;`
        
    - Default export: `export default function(){...}`
        
    - Static import (top-level only): `import { foo } from './mod.js'`
        
    - Dynamic import (anywhere): `const mod = await import('./mod.js')`
        
- **Top-level await**
    
    - Allowed only in ESM; `await` at top-level pauses module evaluation.
        
- **File metadata**
    
    - No `__filename`/`__dirname`. Use `import.meta.url` and convert if needed.
        
- **Extensions & indexes**
    
    - In ESM, you **must** include file extensions (`.js/.mjs/.cjs`) and cannot rely on implicit `index.js`. Use full paths.
        
- **Interop**
    
    - Importing a CJS module from ESM: `import mod from './cjs-file.cjs'` → the CJS `module.exports` arrives under the **`default`** export.
        
    - Importing an ESM from CJS must use dynamic `import()` which returns a Promise.
        

---

## 🧩 Examples

### 1) CommonJS — exporting/consuming multiple utilities

```js
// math.js (CJS)
const isOdd = n => n % 2 === 1;
const isEven = n => !isOdd(n);

exports.isOdd = isOdd;        // attach, do not reassign exports
exports.isEven = isEven;
```

```js
// index.js (CJS)
const { isOdd, isEven } = require('./math'); // structure like named picks
console.log(isOdd(3), isEven(4)); // true, true
```

### 2) CommonJS — single export vs `exports` alias trap

```js
// bad.js (CJS) ❌
exports.foo = 1;
module.exports = function() {}; // breaks alias; `exports.foo` is ignored

// good.js (CJS) ✅ single value
module.exports = function() {};
// or, many named:
exports.a = 1;
exports.b = 2;
```

### 3) `require` cache and side effects

```js
// once.js
console.log('I run once');
module.exports = { ran: true };

// main.js
require('./once');     // logs once
require('./once');     // no second log (cached)
console.log(Object.keys(require.cache)); // absolute paths cached
```

### 4) Circular require (partial export)

```js
// a.js
console.log('a start');
exports.fromA = 'A';
const b = require('./b');         // b may be partially initialized here
console.log('in a, b.fromB =', b.fromB); // possibly undefined
console.log('a end');

// b.js
console.log('b start');
exports.fromB = 'B';
const a = require('./a');         // triggers cycle
console.log('in b, a.fromA =', a.fromA);
console.log('b end');
```

### 5) ES Modules — named & default exports

```js
// math.mjs
export const isOdd = n => n % 2 === 1;
export default function isEven(n){ return !isOdd(n); }
```

```js
// index.mjs
import isEven, { isOdd } from './math.mjs';
console.log(isOdd(3), isEven(4)); // true, true
```

### 6) ESM dynamic import + top-level await

```js
// main.mjs
const mod = await import('./math.mjs');   // TLA in ESM
console.log(mod.default(2), mod.isOdd(5));
```

### 7) ESM metadata replacements

```js
// meta.mjs
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = dirname(__filename);

console.log({ __filename, __dirname });
```

### 8) Interop — importing CJS from ESM

```js
// cjs-file.cjs
module.exports = function sayHi(){ console.log('hi'); };
```

```js
// use.mjs
const mod = await import('./cjs-file.cjs');
mod.default(); // 'hi'  (CJS export appears as default)
```

---

## 💻 Practical Patterns (Runtime-Ready)

- **Pattern: choose export style by intent**
    
    - _Library-style, multiple utilities (CJS)_:
        
        ```js
        // utils.js
        exports.parse = parse;
        exports.format = format;
        ```
        
    - _Single entry (CJS)_:
        
        ```js
        module.exports = createApp;
        ```
        
    - _ESM library_:
        
        ```js
        export function parse() {}
        export function format() {}
        export default { parse, format };
        ```
        
- **Pattern: lazy loading in ESM**
    
    ```js
    // heavy.mjs
    export function expensive() {/*...*/}
    // consumer.mjs
    let heavy;
    async function run() {
      heavy ??= await import('./heavy.mjs');
      heavy.expensive();
    }
    ```
    
- **Pattern: avoiding circular deps**
    
    - Extract shared constants/interfaces to a _third_ module `shared.(mjs|js)` that both sides import.
        
    - Defer cross-module calls until after initialization (e.g., import inside a function), or pass dependencies via function parameters.
        

---

## 🔁 Drills (Retrieval Practice)

1. Explain why `exports = { a: 1 }` breaks in CJS and how to fix it.
    
2. Predict the logs for the circular example in **Example 4** (note potential `undefined`).
    
3. Convert a CJS module with `module.exports = fn` to ESM and import it properly.
    
4. Write an ESM snippet that uses top-level `await` to load config JSON and export a parsed object.
    
5. In ESM, reconstruct `__dirname` from `import.meta.url`.
    

---

## ✅ Checklist

-  I can choose between `module.exports = ...` vs `exports.x = ...` and explain why.
    
-  I know `require` is cached and can describe what `require.cache` holds.
    
-  I can avoid/mitigate circular requires by refactoring dependencies.
    
-  I can enable ESM with `.mjs` or `"type": "module"` and know extension/index rules.
    
-  I can use `import()` and top-level `await` correctly in ESM.
    
-  I can get `__filename`/`__dirname` equivalents via `import.meta.url`.
    

---

## 🔗 References

- MDN: CommonJS modules — [https://developer.mozilla.org/docs/Web/JavaScript/Guide/Modules#commonjs](https://developer.mozilla.org/docs/Web/JavaScript/Guide/Modules#commonjs)
    
- MDN: ES modules — [https://developer.mozilla.org/docs/Web/JavaScript/Guide/Modules](https://developer.mozilla.org/docs/Web/JavaScript/Guide/Modules)
    
- Node.js Docs: Modules: CommonJS — [https://nodejs.org/api/modules.html](https://nodejs.org/api/modules.html)
    
- Node.js Docs: ECMAScript Modules — [https://nodejs.org/api/esm.html](https://nodejs.org/api/esm.html)
    

---

## 🇰🇷 요약 설명 (Korean Wrap-up)

이 노트는 Node.js에서 **코드를 분할·연결하는 방식**을 CommonJS와 ES 모듈로 나누어 정리했다.  
CommonJS는 `require`/`module.exports` 기반이며, 단일 값을 내보낼 때는 `module.exports = ...`, 여러 값을 내보낼 때는 `exports.x = ...`처럼 **붙이기 방식**을 쓰는 것이 안전하다. `exports`는 초기에 `module.exports`의 참조일 뿐이라서, `module.exports`를 재할당하면 둘의 연결이 끊어진다. `require`는 **캐시**를 사용해 한 번 로드한 모듈을 재활용하며, 파일 상단이 아니라 **어디서든 호출** 가능하다. 순환 참조가 발생하면 Node는 **부분 초기화된 export**(종종 `{}`)를 넘겨 사이클을 끊는다. 따라서 초기화 순서에 의존하는 API는 설계상 분리하거나, 공통 의존성을 제3의 모듈로 뽑아내는 편이 좋다.

ES 모듈은 표준 문법인 `import`/`export`를 사용한다. ESM에서는 **정적 import는 반드시 최상단**에 있어야 하고, 동적 로딩은 `import()` 함수(프로미스 반환)로 처리한다. 또한 ESM은 **Top-level await**을 지원하므로 모듈 최상단에서 `await`로 비동기 초기화를 수행할 수 있다. 다만 ESM에는 `__filename`/`__dirname`이 없으므로 `import.meta.url`로 대체하고 필요 시 경로 변환을 수행한다. 파일 확장자 표기는 **반드시 명시**해야 하며, 암묵적 `index.js` 해석도 기대하지 않는 것이 원칙이다. CJS를 ESM에서 불러올 경우 CJS의 `module.exports`는 **`default`로 매핑**되므로 `mod.default`로 접근해야 한다.

핵심은 다음과 같다: **(1)** CJS에서 export 방식의 규칙을 지켜 참조 깨짐을 피할 것, **(2)** `require` 캐시와 사이드이펙트 실행 타이밍을 이해할 것, **(3)** 순환 참조는 피하거나 의존을 리팩터링할 것, **(4)** ESM에서는 정적 import 위치, 확장자, `import.meta.url`, TLA 규칙을 철저히 지킬 것, **(5)** CJS ↔︎ ESM 상호 운용 시 `default` 매핑 차이를 인지할 것.  
이 원칙을 익히면 모듈 구조가 명확해지고, 런타임 초기화/성능/안정성 면에서 예측 가능성이 크게 높아진다.
- 전역 객체란, 코드가 실행되는 환경(브라우저, Node.js)이 기본적으로 제공하는, 코드 어디서나 접근할 수 있는 공용 기능과 정보들의 모음집