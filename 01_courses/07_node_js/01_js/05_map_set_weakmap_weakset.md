좋아. 붙여준 스크립트를 바탕으로 **Map / Set / WeakMap / WeakSet**을 실무 감각으로 정리해줄게.  
구성은 **개념 → 표준 메서드/패턴 → 자주 틀리는 포인트 → Node.js 실전 활용 → 연습 과제 & 체크리스트** 순서야.

---

# 17. Map / Set / WeakMap / WeakSet

## 1) 왜 쓸까 — “의도를 드러내는 전용 컬렉션”

- `Object`/`Array`로도 대부분 구현 가능하지만, **용도·성능·가독성** 측면에서 전용 컬렉션이 더 낫다.
    
- **Map = 키/값 사전**, **Set = 중복 없는 집합**.  
    → 코드 읽는 사람에게 “이건 사전이다”, “이건 집합이다”를 즉시 전달.
    
- **WeakMap/WeakSet = 가비지 컬렉션을 방해하지 않는(약한 참조) 컬렉션**.
    

---

## 2) Map — 키/값 사전 (키 타입 제한 없음)

### 핵심 특징

- 키 타입: **원시/객체/함수 무엇이든 가능**. (Object는 `string/symbol`만)
    
- 크기: `.size` (배열의 `.length`와 유사)
    
- 반복: 순회가 **넣은 순서**를 유지.
    

### 기본 사용

```js
const m = new Map();

m.set('a', 1).set('b', 2);      // 체이닝 가능
m.get('a');                      // 1
m.has('b');                      // true
m.delete('a');                   // true
m.size;                          // 1
m.clear();                       // 비우기
```

### 객체를 키로 쓸 때 주의(참조 동일성)

```js
const obj = { id: 1 };
const m = new Map();
m.set(obj, { role: 'admin' });

m.get({ id: 1 });   // undefined (다른 참조)
m.get(obj);         // { role: 'admin' }  ✅
```

→ **동일한 객체 참조**를 써야 한다. 임시 리터럴로 재작성하면 못 찾는다.

### 반복 패턴

```js
for (const [k, v] of m) { /* ... */ }     // 기본 이터레이터가 [k,v]
m.forEach((v, k) => { /* ... */ });       // forEach도 지원
[...m.keys()], [...m.values()], [...m.entries()];
```

---

## 3) Set — 중복 없는 집합

### 핵심 특징

- 값 타입: 무엇이든 가능(동일성 비교는 `SameValueZero`, `NaN`도 자신과 같다).
    
- **중복 자동 제거**, 삽입 순서 유지, `.size` 보유.
    

### 기본 사용

```js
const s = new Set([1,2,2,3]);
s.has(2);         // true
s.add(3).add(4);  // {1,2,3,4}
s.delete(1);      // true
s.size;           // 3
for (const v of s) { /* ... */ }
s.clear();
```

### 배열 중복 제거 치트키

```js
const arr = [1,2,3,2,3,5,2];
const deduped = [...new Set(arr)];     // [1,2,3,5]
```

- 면접 단골. “세트로 중복 제거 → 다시 배열로”.
    

---

## 4) WeakMap / WeakSet — 약한 참조(자동 메모리 해제)

### 공통 개념

- **키(WeakMap)** / **요소(WeakSet)** 가 **객체일 때만** 허용. (원시는 불가)
    
- **가비지 컬렉션이 가능**: 외부에서 객체를 더 이상 참조하지 않으면 컬렉션 항목도 **자동 제거**.
    
- **열거 불가**: `size`, `keys()`, 반복문 미지원 → 메모리 관리 목적이라 순회가 의미 없음.
    

### WeakMap — 객체 → 부가정보 (원본 객체는 불변 유지)

```js
const meta = new WeakMap();

function tagUser(user) {
  meta.set(user, { married: false });
}

let user = { name: 'ZeroCho' };
tagUser(user);
meta.get(user);          // { married: false }

user = null;             // 외부 참조 해제 → GC 시 메타도 함께 정리
```

- **원본 객체를 오염시키지 않고** 메타데이터를 붙이고 싶을 때 최적.
    

### WeakSet — “객체가 집합에 속해 있는가” 정도만 필요할 때

```js
const visited = new WeakSet();
let node = { id: 1 };
visited.add(node);
visited.has(node);   // true
node = null;         // 외부 참조 사라지면 자동 정리
```

- 실전에서 쓰임새가 제한적이지만, **순회 없이 “표식(visited)만 붙이기”** 용도로 간혹 사용.
    

---

## 5) 자주 틀리는 포인트 & 팁

1. **Map에서 `.length` 찾기**  
    → `m.length`가 아니라 **`m.size`**.
    
2. **객체 키 재생성**  
    → `m.get({ id: 1 })`는 실패. **같은 참조**를 써라.
    
3. **Object vs Map 성능**
    
    - 다수의 삽입/삭제/탐색이 반복되고 **키 타입이 다양**하면 Map이 유리.
        
    - “딱히 연산이 많지 않고 직렬화(JSON)해야 한다” → 평범한 Object가 편하다.
        
4. **Set과 깊은 동등성**
    
    - `Set`의 동일성은 참조/원시 값 기준. 객체 구조가 같아도 **다른 참조면 다른 요소**.
        
5. **Weak 계열의 한계**
    
    - **순회/크기 확인 불가**. “메모리 누수 방지” 목적일 때만 채택.
        
6. **정렬 필요?**
    
    - Map/Set은 삽입 순서를 기억하지만 **정렬 컬렉션은 아니다**. 정렬이 필요하면 펼쳐서 배열로 변환 후 정렬:
        
        ```js
        const sorted = [...m.entries()].sort((a,b) => a[0]-b[0]);
        ```
        

---

## 6) Node.js 실전 활용 패턴

### (1) 요청 단위 캐시(메모이제이션)

```js
const cache = new Map(); // 키: 문자열/객체/튜플 등 자유

export async function getUser(id) {
  if (cache.has(id)) return cache.get(id);
  const user = await repo.findById(id);
  cache.set(id, user);
  return user;
}
```

### (2) 객체에 메타 붙이기(원본 불변) — WeakMap

```js
const meta = new WeakMap();

function attach(ctx, data) { meta.set(ctx, data); }
function info(ctx) { return meta.get(ctx); }

// 예) Express 미들웨어 컨텍스트/소켓 클라이언트 소켓 객체에 부가정보 부착
```

### (3) 중복 작업 방지 — Set

```js
const inFlight = new Set();

async function runOnce(key, job) {
  if (inFlight.has(key)) return;    // 이미 진행 중
  inFlight.add(key);
  try { await job(); }
  finally { inFlight.delete(key); }
}
```

### (4) 순환 참조 탐지 — WeakSet

```js
function toJSONSafe(obj, seen = new WeakSet()) {
  if (obj && typeof obj === 'object') {
    if (seen.has(obj)) return '[Circular]';
    seen.add(obj);
    // ... 재귀 직렬화
  }
  return obj;
}
```

### (5) 세션/연결 관리

- **Map**: `clientId → socket`, `jobId → AbortController` 등 키/값 매핑.
    
- **Set**: 현재 활성 클라이언트 목록, 구독 채널 참여자 집합.
    
- **WeakMap**: 외부 라이브러리 객체에 상태 부착(원본 타입을 침범하지 않음).
    

---

## 7) 메서드 레퍼런스(암기 표)

|컬렉션|추가|읽기|존재|삭제|비우기|크기|반복|
|---|---|---|---|---|---|---|---|
|**Map**|`set(k,v)`|`get(k)`|`has(k)`|`delete(k)`|`clear()`|`.size`|`for..of`, `forEach`, `keys/values/entries`|
|**Set**|`add(v)`|_(없음)_|`has(v)`|`delete(v)`|`clear()`|`.size`|`for..of`, `forEach`, `values()`(=entries)|
|**WeakMap**|`set(obj,v)`|`get(obj)`|`has(obj)`|`delete(obj)`|_(없음)_|_(없음)_|_(불가)_|
|**WeakSet**|`add(obj)`|_(없음)_|`has(obj)`|`delete(obj)`|_(없음)_|_(없음)_|_(불가)_|

---

## 8) 연습 과제

1. **LRU 스타일 캐시 스케치 (Map 활용)**
    
    - 고정 용량 `capacity`를 가진 `LruCache` 클래스를 만들어라.
        
    - `get(k)`가 호출되면 항목을 최신으로 갱신, `set(k,v)`에서 넘치면 **가장 오래된** 항목 제거.
        
    - 힌트: Map은 삽입 순서를 기억한다. 재삽입으로 최신화 가능.
        
2. **배열 중복 제거/교집합/합집합(Set 활용)**
    
    - `uniq(arr)`, `intersect(a,b)`, `union(a,b)` 작성.
        
3. **메타데이터 부착(WeakMap)**
    
    - 외부에서 받은 불변 객체 `user`에 대해, 로컬 권한/플래그를 WeakMap으로 부착하고,  
        외부 참조를 끊었을 때 메타도 자동 해제되는 시나리오를 코드로 시뮬레이션.
        
4. **순환 직렬화 방지(WeakSet)**
    
    - 순환 구조가 있는 객체를 안전하게 문자열화하는 `safeStringify` 작성(중복 객체는 `"[Circular]"`로 치환).
        

---

## 9) 최종 체크리스트

-  Map에서 **객체 키**는 **동일 참조**일 때만 일치한다.
    
-  Map/Set은 크기를 `.size`로 확인한다.
    
-  Set은 **중복을 자동 제거**하며, 배열 ↔ Set 변환을 유연하게 할 수 있다.
    
-  WeakMap/WeakSet은 **가비지 컬렉션을 방해하지 않는다**(순회·size 없음).
    
-  “원본 객체를 오염시키지 않고 메타를 붙인다” → **WeakMap**을 떠올린다.
    
-  “중복 없는 컬렉션” 또는 “중복 제거” → **Set**부터 적용한다.
    
-  “키/값 매핑이 많고 타입이 다양” → **Map**이 `Object`보다 선호된다.
    

---

원하면 이어서 **18. 옵셔널 체이닝(?.), 널 병합(??)** 로 넘어가서, 방금 배운 패턴에 안전 접근/디폴트 전략을 얹어 실전 난이도를 올려보자.