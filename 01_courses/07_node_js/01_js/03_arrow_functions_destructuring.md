좋아. 붙여준 스크립트를 기준으로 **화살표 함수(=>)** 와 **구조분해 할당(Destructuring)** 을 실무 감각으로 정리해줄게.  
구성은 **개념 → 코드/실행 결과 → 자주 틀리는 포인트 → Node.js 적용 예 → 연습 과제 & 체크리스트** 순서다.

---

# 13. 화살표 함수 (Arrow Functions)

## 1) 무엇이 바뀌었나 — 핵심 요약

- **문법 축약**: `function` 키워드 없이 `const f = (a,b) => a + b;`
    
- **암시적 반환**: 중괄호 없이 한 줄이면 `return` 생략 가능.
    
- **`this` 바인딩 고정**: **자신만의 `this`를 만들지 않고, 상위 스코프의 `this`를 캡처**한다(렉시컬 this).
    
- **대체 불가 케이스 존재**: 이벤트 핸들러처럼 **독립적인 `this`가 필요한 경우**엔 전통적 `function`을 유지해야 한다.
    

### 축약 규칙

```js
// 매개변수 1개 → 괄호 생략 가능
const square = x => x * x;

// 본문이 한 줄 + 바로 반환 → { } / return 생략
const add = (a, b) => a + b;

// 객체 리터럴을 "그대로" 반환하려면 ()로 감싸기 (중요!)
const makeUser = (name) => ({ name, role: 'member' });
```

> 객체를 바로 반환할 때 `({ ... })`가 필수인 이유: `{}`를 함수 바디로 오해하지 않도록 엔진에 의도를 명확히 알려준다.

---

## 2) `this` 차이 — 화살표 vs. 전통 함수

### 전통 함수는 **자기만의 `this`** 를 가진다

```js
const obj = {
  label: 'OBJ',
  show() { console.log(this.label); } // this === obj
};

const show = obj.show;
show(); // 브라우저: undefined/'' , Node(strict): undefined
```

### 화살표 함수는 **상위 스코프의 `this`** 를 캡처

```js
function Counter() {
  this.count = 0;
  setInterval(() => {
    // 화살표: 외부(Counter 인스턴스)의 this를 그대로 사용
    this.count++;
  }, 100);
}
```

### DOM/이벤트 핸들러(브라우저)에서의 차이

```js
// 전통 함수: this === 클릭된 버튼
button.addEventListener('click', function() {
  console.log(this.textContent); // OK
});

// 화살표 함수: this는 상위 스코프(보통 window/undefined)
// button.addEventListener('click', () => {
//   console.log(this.textContent); // 의도와 다르게 동작
// });
```

**권장 요령**

- **`this`를 써야 한다** → 전통 `function`
    
- **`this`가 필요 없다** → 화살표 함수로 통일
    

---

## 3) 자주 틀리는 포인트

1. **객체 즉시 반환 시 괄호 누락**
    

```js
const f = () => { a: 1 }; // 블록으로 해석 → undefined 반환
const fOK = () => ({ a: 1 });
```

2. **중괄호 사용 시 `return` 누락**
    

```js
const sum = (a,b) => { a + b }; // undefined
const sumOK = (a,b) => { return a + b; };
```

3. **`arguments`가 없다**  
    화살표 함수에는 `arguments`가 없다. 필요하면 **나머지 매개변수** 사용:
    

```js
const sum = (...args) => args.reduce((s,v) => s+v, 0);
```

---

## 4) Node.js 실무 연결

- **콜백/고차함수**: 간결한 핸들러 작성
    

```js
app.get('/health', (_req, res) => res.json({ ok: true }));
```

- **Promise 체인/배열 처리**
    

```js
const list = await repo.findAll();
const ids = list.map(x => x.id).filter(id => id > 0);
```

- **클래스 내부 비동기 콜백에서 `this` 유지**
    

```js
class Job {
  constructor(queue) {
    this.queue = queue;
  }
  start() {
    this.queue.on('done', (msg) => {
      this.log(msg);     // this 안전
    });
  }
  log(m) { /* ... */ }
}
```

---

## 5) 연습 과제

1. **객체 즉시 반환 실수 고치기**  
    `const mk = (k,v) => { [k]: v };` 를 올바르게 수정하라.
    
2. **이벤트 핸들러에서 this**  
    전통 함수/화살표 함수로 각각 클릭한 요소의 `dataset.id`를 출력해보며 차이를 설명하라.
    
3. **`arguments` 대신 나머지 매개변수**  
    가변 인자 합계를 화살표 함수로 작성하라.
    

---

# 14. 구조분해 할당 (Destructuring)

## 1) 왜 쓰나 — 목적

- **중간 다리 객체 접근(code noise)** 제거
    
- **명시적 인터페이스**: 필요한 값만 뽑아 쓰고, 이름을 바꿔 주입 가능
    
- **기본값/옵셔널 처리**가 깔끔해짐
    

---

## 2) 객체 구조분해

```js
const user = {
  id: 1,
  name: 'Injun',
  profile: { email: 'a@b.com', city: 'Berlin' }
};

// 기본
const { id, name } = user;

// 중첩 + 별칭 + 기본값
const {
  profile: { email: mail, phone = 'N/A' }
} = user;
```

- **별칭(리네이밍)**: `email: mail`
    
- **기본값**: 존재하지 않으면 `phone = 'N/A'`
    
- **주의**: `profile` 자체는 변수로 안 나온다(필요하면 분리해 추출).
    

### 존재하지 않을 수 있는 경로는 옵셔널 체이닝과 조합

```js
const city = user.profile?.city ?? 'unknown';
```

---

## 3) 배열 구조분해

```js
const arr = [10, 20, 30, 40];
const [a, b, , d] = arr; // 10, 20, 40  (건너뛰기 가능)
const [head, ...tail] = arr; // head=10, tail=[20,30,40]

// 스왑
let x = 1, y = 2;
[x, y] = [y, x]; // y와 x 교환
```

- **자리 기반**: 키가 아니라 **인덱스**로 매칭
    
- **나머지 패턴**: `...rest` 로 남은 요소 수집
    

---

## 4) 함수 매개변수에서의 구조분해 (실무 핵심)

### 옵션 객체 패턴

```js
function connect({ host, user, pass, port = 3306 }) {
  // 필요한 것만 구조적으로 받는다 + 기본값
}
connect({ host: 'db', user: 'u', pass: 'p' });
```

- 호출부 가독성↑, 매개변수 순서 실수↓
    
- **필수/옵셔널**이 명확해지고, 디폴트 지정 쉬움
    

### Express 핸들러에서 자주 쓰는 패턴

```js
app.post('/signup', (req, res) => {
  const { email, password } = req.body ?? {};
  // ...
});
```

---

## 5) 메서드 구조분해 시 `this` 손실 주의 (중요)

```js
const service = {
  value: 42,
  get() { return this.value; }
};

const { get } = service;
get(); // TypeError 또는 undefined (this 분실)

const boundGet = service.get.bind(service);
boundGet(); // 42
```

- **해결**: `bind`, 혹은 **호출할 때 원 객체를 통해 호출**
    
- **요지**: “`this`를 쓰는 메서드는 구조분해로 꺼내 쓰지 말자”가 안전한 기본기.
    

---

## 6) Node.js 실무 연결

1. **환경변수/설정 분해**
    

```js
const {
  DB_HOST, DB_USER, DB_PASS,
  DB_PORT = 5432
} = process.env;
```

2. **모듈 가져오기**
    

```js
const { readFile, writeFile } = require('fs/promises');
// or
import { readFile, writeFile } from 'node:fs/promises';
```

3. **쿼리/파라미터 추출**
    

```js
const { id } = req.params;
const { page = 1, size = 20 } = req.query;
```

4. **응답 셰이핑**
    

```js
const shapeUser = ({ id, name, profile: { email } }) => ({ id, name, email });
```

---

## 7) 자주 틀리는 포인트

1. **이름 불일치**
    

```js
const person = { firstName: 'Lee' };
const { name } = person; // undefined (키가 다름)
const { firstName: name2 } = person; // OK
```

2. **중첩 경로 미존재**
    

```js
const user = {};
// const { profile: { email } } = user; // TypeError
const email = user.profile?.email ?? null; // 안전
```

3. **배열 길이 가정**
    

```js
const [h, m, s = 0] = '12:30'.split(':'); // s에 기본값 필요
```

---

## 8) 연습 과제

1. **옵션 객체 디폴팅**  
    `sendMail({ to, subject, html, cc, bcc })`에 대해, `cc/bcc` 기본값과 필수 `to/subject` 검증을 구조분해로 구현하라.
    
2. **중첩 추출 + 별칭**  
    `const post = { id: 7, author: { id: 3, name: 'A' } }`에서 `postId`, `authorId`, `authorName`을 한 줄로 추출하라.
    
3. **메서드 분리와 this**  
    메서드를 구조분해로 꺼냈을 때 실패하는 예를 만들고, `bind`로 해결하라.
    

---

## 최종 체크리스트

-  화살표 함수의 **암시적 반환/객체 즉시 반환 괄호** 규칙을 설명할 수 있다.
    
-  화살표 함수와 전통 함수의 **`this` 바인딩 차이**를 실제 예제로 증명할 수 있다.
    
-  화살표 함수에는 **`arguments`가 없어서** 나머지 매개변수를 써야 함을 안다.
    
-  구조분해에서 **별칭/기본값/중첩**을 능숙히 사용한다.
    
-  **메서드 구조분해 → this 손실** 문제를 인지하고 `bind`로 해결할 수 있다.
    
-  Node.js에서 **환경변수/요청데이터/모듈**에 구조분해를 적용해 코드를 간결화한다.
    

---

다음 묶음은 **16. Promise/async-await** 과 **17. Map/Set/WeakMap/WeakSet**이야.  
원한다면 이 두 개도 같은 방식으로 이어서 정리해줄게.