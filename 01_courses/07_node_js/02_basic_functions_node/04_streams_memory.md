---

title: Streams & Buffers in Node.js — Concepts, Patterns, Memory, and Pipes  
slug: 32-33_streams-buffers-pipe-memory  
tags:

- topic/nodejs
    
- topic/javascript
    
- topic/streams
    
- topic/performance
    
- level/intermediate  
    created: 2025-10-22  
    updated: 2025-10-22  
    links: []
    

---

# Streams & Buffers in Node.js — Concepts, Patterns, Memory, and Pipes

> Goal: Understand **Buffer** vs **Stream**, read/write large files efficiently, control **chunk size** (`highWaterMark`), and **pipe** streams (including on-the-fly compression). We’ll also compare **memory footprint** of buffered vs streaming approaches.

---

## 1) Concepts at a glance

- **Buffer**: A chunk of raw binary data (Node’s `Buffer`); e.g. a snapshot of bytes such as `0x48 0x65 0x6c…`.
    
- **Buffering**: Accumulating data until a certain size before processing/transmitting.
    
- **Stream**: A **sequence of buffers (chunks)** arriving over time. Lets you **process data progressively** (low memory, sooner time-to-first-byte).
    
- **Why streams**: With a 1 GB file, buffering requires ~1 GB RAM; streaming can work with ~KB–MB RAM.
    

---

## 2) Working with `Buffer`

```js
// Create from string / to string
const b = Buffer.from('Convert me to a buffer');
console.log(b.length);                // byte length
console.log(b.toString('utf8'));      // back to string

// Concatenate multiple chunks (e.g., reassemble stream parts)
const chunks = [Buffer.from('Hello, '), Buffer.from('world!')];
const whole = Buffer.concat(chunks);
console.log(whole.toString());

// Allocate an empty buffer (zero-filled vs unsafe)
const safe = Buffer.alloc(1024);          // zero-filled
const fast = Buffer.allocUnsafe(1024);    // faster, but contains old memory (must overwrite!)
```

---

## 3) Reading files: **buffered** vs **streaming**

### 3.1 Buffered (read whole file into memory)

```js
const fs = require('node:fs/promises');

const data = await fs.readFile('big.txt');      // Buffer of entire file
console.log(data.length);
```

- **Pros**: Simple.
    
- **Cons**: Scales poorly; memory = file size.
    

### 3.2 Streaming (progressive, chunked)

```js
const fs = require('node:fs');
const path = require('node:path');

const reader = fs.createReadStream(path.join(__dirname, 'big.txt'), {
  highWaterMark: 16 * 1024, // 16KB chunks (default is ~64KB for files)
});

const chunks = [];
reader.on('data', (chunk) => {
  chunks.push(chunk);             // process/write/pipe instead of storing in real apps
});

reader.on('end', () => {
  console.log('done, chunks:', chunks.length);
});

reader.on('error', (err) => {
  console.error('read error:', err);
});
```

- **Events**: `data` (chunk), `end` (finished), `error` (always handle).
    
- **`highWaterMark`** controls chunk size; _streaming still guarantees order_ of chunks.
    

> Tip: In production, **pipe** to a destination or transform instead of pushing all chunks into an array (which defeats streaming).

---

## 4) Writing files with a **write stream**

```js
const fs = require('node:fs');

const writer = fs.createWriteStream('out.txt');  // accepts Buffers/strings

writer.write('First line\n');
writer.write(Buffer.from('Second line\n'));
writer.end('Final line\n');                      // flush and close

writer.on('finish', () => console.log('write finished'));
writer.on('error',  (e) => console.error('write error:', e));
```

- Events: `finish` (all data flushed), `error`.
    
- Writes can return `false`; respect **backpressure** (wait for `drain`) when writing in tight loops.
    

---

## 5) **Pipe**: connect readable → writable (and transforms)

Simple copy (streaming):

```js
const fs = require('node:fs');

fs.createReadStream('in.txt')
  .pipe(fs.createWriteStream('out.txt'))
  .on('finish', () => console.log('copied'));
```

On-the-fly compression:

```js
const fs = require('node:fs');
const zlib = require('node:zlib');

fs.createReadStream('in.txt', { highWaterMark: 16 * 1024 })
  .pipe(zlib.createGzip())
  .pipe(fs.createWriteStream('in.txt.gz'))
  .on('finish', () => console.log('gzipped'));
```

- You can pipe through multiple transforms (e.g., `read → gunzip → parse → transform → gzip → write`).
    
- Prefer `stream/promises` or `stream.pipeline` for robust piping with proper error propagation:
    

```js
const { pipeline } = require('node:stream/promises');
await pipeline(
  fs.createReadStream('in.txt'),
  zlib.createGzip(),
  fs.createWriteStream('in.txt.gz')
);
```

---

## 6) Memory comparison: buffered vs streaming

```js
const fs = require('node:fs');
const { pipeline } = require('node:stream/promises');

function memMB() {
  return Math.round(process.memoryUsage().rss / 1024 / 1024);
}

// 1) Buffered copy (read entire file, then write)
async function copyBuffered(src, dst) {
  const before = memMB();
  const data = await fs.promises.readFile(src);           // RAM spikes to file size
  await fs.promises.writeFile(dst, data);
  console.log('buffered rss(MB):', before, '→', memMB());
}

// 2) Streaming copy (constant memory)
async function copyStreaming(src, dst) {
  const before = memMB();
  await pipeline(fs.createReadStream(src), fs.createWriteStream(dst));
  console.log('streaming rss(MB):', before, '→', memMB());
}
```

- Expect **buffered** to rise roughly by file size; **streaming** should increase minimally (overheads, not file-sized).
    

---

## 7) Tuning, pitfalls, and best practices

- **Choose chunk size**: Use `highWaterMark` thoughtfully (too small → overhead; too large → memory). Defaults are fine for most cases; increase for throughput-heavy workloads.
    
- **Backpressure**: When `write()` returns `false`, pause reading (or let `pipe` manage it), and resume after `drain`.
    
- **Don’t subvert streaming**: Avoid collecting all chunks into one giant `Buffer` unless you truly need it.
    
- **Always handle errors** on both readable and writable (or use `pipeline`).
    
- **Text vs binary**: For text, you can set `encoding` on streams or call `chunk.toString('utf8')`. For binary, keep `Buffer`s.
    
- **Alternatives**: For pure file→file copies, `fs.copyFile` is simplest and very fast. Use streams when you need _transformations_ (compression, filtering, parsing) or _progressive I/O_.
    
- **Watching files**: `fs.watch` lets you react to file changes (`change` vs `rename`), but semantics vary by platform—treat as hints and re-check the filesystem.
    

---

## 8) Mini “cookbook”

**A. Throttle writes with backpressure**

```js
const fs = require('node:fs');

const writer = fs.createWriteStream('big-out.bin');
let i = 0;

function pump() {
  let ok = true;
  while (ok && i < 1_000_000) {
    const buf = Buffer.allocUnsafe(1024); // write 1KB
    ok = writer.write(buf);
    i++;
  }
  if (i < 1_000_000) writer.once('drain', pump);
  else writer.end();
}
pump();
```

**B. Read line-by-line without loading whole file**

```js
const fs = require('node:fs');
const readline = require('node:readline');

const rl = readline.createInterface({
  input: fs.createReadStream('huge.log', { encoding: 'utf8' }),
  crlfDelay: Infinity,
});

let n = 0;
for await (const line of rl) {
  // process line
  n++;
}
console.log('lines:', n);
```

**C. Stream HTTP response (Express example)**

```js
app.get('/download', (req, res) => {
  res.setHeader('Content-Type', 'application/octet-stream');
  fs.createReadStream('big.bin').pipe(res);
});
```

---

## Exercises

1. **Chunk Visualizer**: Create a small file, stream it with `highWaterMark: 16`, and log chunk sizes to see ordering and boundaries.
    
2. **Streaming Transform**: Implement a Transform stream that uppercases ASCII letters and pipe `in.txt → transform → out.txt`.
    
3. **Backpressure Drill**: Write 500 MB in 64 KB chunks to disk; pause on `false`, resume on `drain`. Measure throughput.
    
4. **Compression Bench**: Compare sizes and times of `gzip` vs `brotli` for a large text. (Use `zlib.createBrotliCompress()`.)
    
5. **Memory A/B**: For a ~1 GB test file, measure `rss` change for **buffered copy** vs **streaming copy**.
    

---

## Quick Reference

|Topic|API|Notes|
|---|---|---|
|Buffer basics|`Buffer.from`, `Buffer.concat`, `Buffer.alloc`|Binary data blocks|
|Read stream|`fs.createReadStream(path, { highWaterMark })`|`data`, `end`, `error`|
|Write stream|`fs.createWriteStream(path)`|`write`, `drain`, `finish`, `error`|
|Piping|`readable.pipe(writable)` / `pipeline(...)`|Propagates backpressure|
|Compression|`zlib.createGzip()`, `createBrotliCompress()`|Pipe through for on-the-fly compression|
|Copy (simple)|`fs.copyFile(src, dst)`|Fast file→file copy|
|Memory usage|`process.memoryUsage().rss`|Rough resident set size in bytes|

---

## 🇰🇷 한국어 설명 (친절한 마무리)

이 노트는 **버퍼와 스트림**을 직관적으로 비교하고, 실제 코드 패턴을 통해 **대용량 파일 처리에서의 메모리 절감** 포인트를 정리했습니다.

- **버퍼(Buffer)**는 한 번에 데이터를 **통째로** 메모리에 올립니다. 파일 크기만큼의 RAM이 필요하죠. 단순하지만 1 GB 파일이면 RAM도 1 GB가 필요해서 서버가 쉽게 터질 수 있습니다.
    
- **스트림(Stream)**은 데이터를 **조각(chunk)**으로 나눠 순서대로 흘려보냅니다. `highWaterMark`로 조각 크기를 조절할 수 있고, **메모리는 일정량만 사용**합니다. 실전에서는 파이프(`pipe`)를 이용해 읽기→변환→쓰기 흐름을 구성하고, 압축(`zlib`) 같은 작업도 **전송 중에** 처리합니다.
    
- **핵심 이벤트**: 읽기 스트림은 `data`/`end`/`error`, 쓰기 스트림은 `drain`/`finish`/`error`를 꼭 챙기세요. 특히 `write()`가 `false`를 반환하면 **백프레셔(backpressure)**가 발생한 것이므로 `drain`을 기다렸다가 다시 쓰는 패턴이 중요합니다.
    
- **메모리 비교**: 통버퍼 방식은 RSS가 파일 크기만큼 튀지만, 스트리밍은 오버헤드 정도만 증가합니다. 대용량 파일(수백 MB~GB) 처리 시 **스트림이 사실상 필수**입니다.
    
- **실무 팁**:
    
    - 경량 복사는 `fs.copyFile`이 빠르고 간단합니다.
        
    - 변환·압축·필터링 등 **중간 처리**가 필요하면 스트림 파이프라인을 쓰세요.
        
    - 에러 처리는 항상 양쪽 스트림에서 하거나 `stream.pipeline`(또는 `stream/promises`)로 **종단 간 에러 전파**를 보장하세요.
        
    - 텍스트는 인코딩(`utf8`) 설정이나 `toString`으로, 바이너리는 `Buffer`로 다룹니다.
        

이 가이드를 바탕으로 작은 파일은 버퍼로 간단히, 큰 파일·네트워크 전송·실시간 처리에는 스트림으로 확장성 있게 구성해 보세요.