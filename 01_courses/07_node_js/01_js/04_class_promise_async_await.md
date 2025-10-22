좋아. 붙여준 스크립트를 토대로 **클래스(= 프로토타입 문법의 설탕)**와 **Promise / async-await**를 실무 관점에서 정리해줄게.  
구성은 **개념 → 코드/실행 흐름 → 자주 틀리는 포인트 → Node.js 적용 예 → 연습 과제 & 체크리스트** 순서야.

---

# 15. 클래스(Class) — “프로토타입”을 읽기 쉽게 만드는 문법

## 1) 핵심 요약

- 자바스크립트 **클래스는 프로토타입 기반 OOP의 문법 설탕**이다.  
    동작 원리는 동일하고, **가독성/그룹화(생성자·정적 메서드·인스턴스 메서드)**를 위해 도입되었다.
    
- **`extends` + `super`** 로 상속과 부모 호출을 간결하게 표현한다.
    
- 여전히 **프로토타입 체인**으로 동작하므로 프로토타입 개념은 알아야 한다.
    

## 2) “예전 방식(프로토타입)” vs “클래스 방식”

```js
// ⛳️ 예전(생성자 함수 + prototype)
function Human(name) {
  this.name = name;
}
Human.staticHello = () => 'hello(static)';
Human.prototype.breathe = function () {
  return `${this.name} breathing...`;
};

function Zero(name) {
  Human.call(this, name);            // super(...)
}
Zero.prototype = Object.create(Human.prototype);
Zero.prototype.constructor = Zero;
Zero.prototype.code = function () {
  return `${this.name} coding...`;
};

// ✅ 클래스 문법
class HumanC {
  constructor(name) { this.name = name; }
  static hello()    { return 'hello(static)'; }  // 정적 메서드
  breathe()         { return `${this.name} breathing...`; }
}

class ZeroC extends HumanC {
  constructor(name) {
    super(name);                        // 부모 생성자 호출
  }
  code() { return `${this.name} coding...`; }
}
```

- 같은 일을 훨씬 **읽기 쉽게** 표현한다.
    
- `extends`는 **프로토타입 체인을 세팅**하고, `super`는 **부모 생성자/메서드 호출**을 담당.
    

## 3) 클래스 추가 문법(실무에서 자주 씀)

```js
class Counter {
  // 🔒 private 필드
  #value = 0;

  // 🧱 public 필드(클래스 필드)
  step = 1;

  get value() { return this.#value; }     // getter
  set value(v) { this.#value = Number(v); } // setter

  inc() { this.#value += this.step; }

  // 🧊 정적 필드/메서드
  static ZERO = 0;
  static from(n) { const c = new Counter(); c.value = n; return c; }
}
```

- **클래스 필드, private 필드(#), getter/setter, static 필드** 등으로 모델을 깔끔하게 구성 가능.
    
- 메서드에서 `this`를 잃지 않게 하려면, **핸들러는 화살표 필드**로 선언하는 패턴도 쓴다.
    
    ```js
    class UI {
      constructor(bus) { this.bus = bus; }
      onMessage = (m) => { this.handle(m); };  // this 고정
      handle(m) { /* ... */ }
    }
    ```
    

## 4) 자주 틀리는 포인트

1. **`super` 호출 누락**
    
    - `extends`한 클래스에서 `constructor`를 정의하면 **반드시** `super(...)`를 먼저 호출해야 `this`를 사용할 수 있다.
        
2. **메서드 구조분해로 `this` 분실**
    
    ```js
    const svc = new Service();
    const { run } = svc;
    run(); // TypeError: this가 undefined
    // 해결: const run = svc.run.bind(svc);
    ```
    
3. **클래스는 함수가 아님?**
    
    - 클래스도 **함수**이고, 메서드는 여전히 **프로토타입에 저장**된다. 메서드를 화살표로 정의하면 인스턴스 필드로 붙기 때문에 메모리 트레이드오프가 있다.
        
4. **private 필드(#)는 진짜 캡슐화**
    
    - 디버거나 리플렉션으로도 접근 불가. 테스트에서 접근하려고 하지 말고, public API를 설계하라.
        

## 5) Node.js 적용 예

- **도메인 모델·리포지토리 분리**
    
    ```js
    class User {
      constructor({ id, name, email }) { Object.assign(this, { id, name, email }); }
      mask() { return { id: this.id, name: this.name }; }
    }
    
    class UserRepo {
      constructor(db) { this.db = db; }
      async findById(id) { const row = await this.db.user.findUnique({ where: { id } }); return new User(row); }
    }
    ```
    
- **서비스 계층에서 의존성 주입**  
    테스트가 쉬워지고, 클래스/인터페이스 경계가 명확해진다.
    

## 6) 연습 과제

1. `Shape`(넓이/둘레 추상), `Rect`, `Circle` 클래스를 설계하고 `extends/super`로 구현해라.
    
2. private 필드 `#balance`를 가진 `Account`를 만들고, `deposit/withdraw` 검증 로직을 추가하라.
    
3. 이벤트 버스(`EventEmitter`)를 감싼 `NotificationService`를 클래스 필드 화살표 핸들러로 구현해 `this` 문제를 방지하라.
    

## 체크리스트

-  클래스가 프로토타입의 문법 설탕임을 설명할 수 있다.
    
-  `extends`/`super`의 역할을 구분한다.
    
-  private 필드/정적 필드/클래스 필드를 활용할 수 있다.
    
-  메서드 구조분해 시 `this` 분실과 해결법을 안다.
    

---

# 16. Promise & async/await — 비동기의 표준

## 1) 핵심 요약

- **Promise**는 “**실행은 시작되었지만, 결과는 아직**”인 작업을 표현하는 **상태 기계**다.  
    `pending → fulfilled(reolved) / rejected`.
    
- **콜백 지옥**을 피하고, **코드를 분리/조합**할 수 있게 한다.
    
- **`async/await`는 Promise 문법을 읽기 쉽게 만든 것**이며, `async` 함수는 **항상 Promise를 반환**한다.
    

## 2) Promise 기본

```js
const p = new Promise((resolve, reject) => {
  // 이 내부는 "동기"로 즉시 실행됨
  doAsyncJob((err, result) => {
    if (err) reject(err);
    else resolve(result);
  });
});

p.then(v => console.log('성공:', v))
 .catch(e => console.error('실패:', e))
 .finally(() => console.log('끝'));
```

- **성공 경로**는 `then`, **실패 경로**는 `catch`.
    
- **코드 분리** 장점: “지금 시작해두고, 나중에 필요할 때 then으로 꺼내 쓰기”가 가능.
    

## 3) async/await로 치환

```js
async function main() {
  try {
    const v = await p;         // p가 이행되면 값 반환, 거절되면 throw
    console.log('성공:', v);
  } catch (e) {
    console.error('실패:', e);
  } finally {
    console.log('끝');
  }
}
```

- `await`은 **Promise를 일시중단-재개** 패턴으로 읽기 쉽게 만든다.
    
- **Top-level await**: ESM(모듈) 환경에선 파일 최상위에서도 `await` 사용 가능.
    

## 4) 병렬 vs. 순차 — 퍼포먼스 포인트

```js
// ❌ 나쁜 순차: 앞이 끝날 때까지 뒤가 대기
const a = await fetchA();
const b = await fetchB();

// ✅ 병렬 실행
const [a2, b2] = await Promise.all([fetchA(), fetchB()]);

// ✅ 일부 실패 허용(모두 대기)
const results = await Promise.allSettled([fetchA(), fetchB()]);
// results[i].status === 'fulfilled' | 'rejected'
```

- **서로 독립인 작업**은 `Promise.all`로 병렬화.
    
- 실패를 용인하며 결과를 모두 확인하려면 **`Promise.allSettled`**.
    

## 5) 마이크로태스크 우선순위(이벤트 루프와 연결)

- `Promise.then`/`await`의 후속 작업은 **마이크로태스크 큐**에 쌓여 **`setTimeout(..., 0)`보다 먼저** 실행된다.
    
    ```js
    setTimeout(() => console.log('timeout'), 0);
    Promise.resolve().then(() => console.log('promise'));
    // 출력: promise → timeout
    ```
    

## 6) 자주 틀리는 포인트

1. **에러 누락**
    
    - `async` 함수 내부에서 `try/catch` 없이 던지면, 상위 `.catch`나 전역 `unhandledRejection`으로 간다.
        
    - **규칙**: “경계”에서 반드시 처리(라우터/잡 실행 단위 등).
        
2. **`await` 남발로 직렬화**
    
    - 독립 작업을 순차로 만들어 **불필요하게 느려짐**. 항상 병렬화 가능성 점검.
        
3. **`return await` 오용**
    
    - 단순 반환이라면 `return somePromise`면 충분. `try/catch`로 감쌀 때만 `await`로 값이 필요.
        
4. **콜백 + Promise 혼용**
    
    - 콜백 스타일 API를 무심코 Promise 체인 안에 섞어 마이크로태스크 타이밍을 꼬는 실수.
        
    - Node의 콜백 API는 `fs.promises` 또는 `util.promisify`로 통일.
        
5. **반복문 안의 `await`**
    
    - 순차가 의도면 `for...of` + `await`, 병렬이 의도면 `map`으로 배열 생성 → `Promise.all`.
        

## 7) Node.js 적용 예

- **DB/외부 API 호출**
    
    ```js
    app.get('/users', async (_req, res, next) => {
      try {
        const [users, count] = await Promise.all([repo.list(), repo.count()]);
        res.json({ users, count });
      } catch (e) { next(e); }
    });
    ```
    
- **파일/네트워크 프로미스화**
    
    ```js
    import { readFile } from 'node:fs/promises';
    const text = await readFile('data.txt', 'utf8');
    ```
    
- **재시도/타임아웃 래퍼**
    
    ```js
    const timeout = (p, ms) => Promise.race([
      p, new Promise((_, rej) => setTimeout(() => rej(new Error('TIMEOUT')), ms))
    ]);
    ```
    
- **동시 작업 제어(concurrency limit)**: p-limit 같은 유틸을 사용해 API 폭주를 방지.
    

## 8) 연습 과제

1. `fetchUser`, `fetchPosts`를 병렬로 호출해 응답을 합치고, 하나 실패 시에도 응답 형태를 유지(`allSettled`).
    
2. `retry(fn, { times:3, delay:200 })` 유틸을 Promise로 구현. 지수백오프 옵션도 추가.
    
3. `for...of + await`(순차)와 `Promise.all(map)`(병렬)의 시간을 비교하는 벤치 코드 작성.
    

## 체크리스트

-  Promise의 상태 흐름과 `then/catch/finally`의 역할을 설명할 수 있다.
    
-  `async/await`이 Promise의 문법 설탕임을 이해하고, 에러를 `try/catch`로 처리한다.
    
-  병렬·순차 실행을 구분해 `Promise.all/ allSettled`를 적절히 고른다.
    
-  이벤트 루프 우선순위(마이크로태스크 vs 태스크)를 설명할 수 있다.
    
-  Node에서 콜백 API를 프로미스화하여 일관성 있게 사용한다.
    

---

원하면 다음 묶음 **17. Map/Set/WeakMap/WeakSet → 18. 옵셔널 체이닝/널 병합**을 같은 방식으로 이어가줄게.  
혹은 지금 내용 바탕으로 **미니 과제 코드 리뷰**로 바로 실전 감각을 끌어올려도 좋다.