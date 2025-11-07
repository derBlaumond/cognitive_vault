# var, const, let & 템플릿 문자열 & 객체 리터럴

> 📚 **사전 지식**: 이 문서는 JavaScript의 기본 변수 선언과 객체 문법을 이해한 개발자를 대상으로 합니다.  
> `var`, `let`, `const`의 기본 사용법과 객체 리터럴 문법을 알고 있다면 충분합니다.

---

## 1. `var`, `let`, `const` — 스코프·호이스팅·재할당의 본질

### 1.1 왜 이제 `var`를 거의 쓰지 않는가

- **핵심 차이**는 “스코프”와 “호이스팅 동작”.
    
- `var`는 **함수 스코프(function scope)** 만 존중하고, **블록 스코프(block scope)** 를 **무시**한다.  
    → `{}`(if/for/while/단순 블록) 밖에서도 접근되는 버그를 유발.
    
- `let`/`const`는 **블록 스코프**를 **철저히** 존중한다.  
    → `{}` 바깥에선 참조 불가 → 의도치 않은 변수 유출 방지.
    

### 최소 규칙

- **기본은 `const`**: 재할당이 필요 없으면 언제나 `const`
    
- **필요할 때만 `let`**: 상태가 변해야 하는 로컬 변수
    
- **`var`는 지양**: 레거시 코드 읽을 줄만 알면 충분
    

---

## 2. 스코프 차이 — 블록 vs 함수

```js
if (true) {
  var x = 1;
  let y = 2;
  const z = 3;
}
console.log(x); // 예상: 1  (var: 블록 스코프 무시)
console.log(y); // 예상: ReferenceError
console.log(z); // 예상: ReferenceError
```

**실제 출력:**
```
1
ReferenceError: y is not defined
```

- `var x`는 **블록 밖**에서도 보인다.
    
- `let/const`는 블록 안에서만 유효.
    

```js
function f() {
  var a = 10;   // 함수 스코프
}
console.log(typeof a); // 'undefined'  (함수 밖에서는 접근 불가)
```

> 요약:
> 
> - `var`는 “함수 경계”만 스코프로 인정.
>     
> - `let/const`는 “블록 경계”도 스코프로 인정.
>     

---

## 3. 호이스팅 & TDZ(Temporal Dead Zone)

> 🔥 **중급 주제**: TDZ 개념은 초보자에게 어려울 수 있습니다.  
> 기본 스코프 개념을 이해한 후 학습하는 것을 권장합니다.

모든 선언(`var/let/const/function/class`)은 **호이스팅**된다.  
차이는 **초기화 시점**과 **접근 가능 시점**.

- `var`: 선언 + **초기화(undefined)**가 함께 호이스팅 → 선언 이전 접근 시 `undefined`(침묵 버그)
    
- `let/const`: 선언만 호이스팅되고, **초기화 전 구간(TDZ)** 에서 접근 시 **ReferenceError**
    

```js
console.log(a); // 예상: undefined  (var는 이상하게도 통과)
var a = 10;

console.log(b); // 예상: ReferenceError (TDZ)
let b = 10;

console.log(c); // 예상: ReferenceError (TDZ)
const c = 10;
```

**실제 출력:**
```
undefined
ReferenceError: Cannot access 'b' before initialization
ReferenceError: Cannot access 'c' before initialization
```

> 스크립트처럼 “`const/let`은 호이스팅 안된다”라고 흔히 말하지만,  
> **정확히는 호이스팅되지만 TDZ 때문에 초기화 전 접근이 불가능**한 것.

---

## 4. 재할당/재선언 규칙

```js
var a = 1;
var a = 2; // 재선언 허용(문제 유발 가능)

let b = 1;
// let b = 2; // SyntaxError (같은 스코프 재선언 불가)
b = 2;      // 재할당 OK

const c = { name: 'ZeroCho' };
// c = {}       // 재할당 불가 (TypeError)
c.name = 'Hyunyoung'; // 객체 “내부” 변경은 가능
```

- **`const`는 “식별자 재바인딩 금지”**일 뿐, **객체 불변**이 아니다.  
    불변이 필요하면 `Object.freeze`(얕은 고정) 또는 유틸로 **deep-freeze**를 적용.
    

---

## 5. 전역 오염과 최상위 `var`

- 브라우저: 최상위 `var`는 `window`에 붙어 전역 오염 위험.
    
- **Node.js(모듈)**: 파일이 **모듈 스코프**이므로 최상위 `var`도 전역 객체(`global`)에 안 붙는다.  
    하지만 **Node REPL**에선 전역에 붙는 동작을 볼 수 있다.
    
- 결론: 환경마다 달라 **혼란**을 낳으므로 전역 레벨에서 `var` 지양.
    

---

## 6. for-루프 클로저 함정 — `var`의 대표적인 버그

```js
const fns = [];
for (var i = 0; i < 3; i++) {
  fns.push(() => console.log(i));
}
fns[0](); fns[1](); fns[2](); // 예상: 3, 3, 3  (의도와 다름)
```

**실제 출력:**
```
3
3
3
```

```js
const fns = [];
for (let i = 0; i < 3; i++) {
  fns.push(() => console.log(i));
}
fns[0](); fns[1](); fns[2](); // 예상: 0, 1, 2  (블록 스코프라 의도대로)
```

**실제 출력:**
```
0
1
2
```

---

## 7. 실무 가이드(요약)

- 기본은 **`const`** → 바뀌어야 하면 **`let`**
    
- **`var`는 사용 금지** (레거시 분석용 지식으로만 보유)
    
- **TDZ로 초기화 순서**를 엄격히 지켜라(버그 예방)
    
- 멀티라인/복잡 로직에서 블록 스코프를 적극 활용해 **사이드 이펙트 축소**
    

---

## 8. 템플릿 문자열 & 객체 리터럴 개선

### 8.1 템플릿 문자열(Template Literals)

#### 문자열 결합의 가독성 개선

```js
const name = 'ZeroCho';
const score = 98;

// 과거
const s1 = '이름: ' + name + ', 점수: ' + score + '점';

// ES6
const s2 = `이름: ${name}, 점수: ${score}점`;
```

- 공백/구두점 누락 같은 사소한 버그를 줄이고, **가독성**을 대폭 향상.
    

#### 멀티라인 문자열

```js
const html = `
<ul>
  <li>${name}</li>
  <li>${score}</li>
</ul>
`;
```

#### 태그드 템플릿(Tagged Template)

> 🔥 **중급 주제**: Tagged Template은 실무에서 자주 사용되지 않지만,  
> 고급 문자열 처리나 국제화(i18n) 라이브러리에서 활용됩니다.

문자열 렌더링 전 **가공**할 수 있는 고급 문법.

```js
function safe(strings, ...values) {
  // strings: 리터럴 조각 배열, values: ${} 값들
  return strings.reduce((acc, s, i) => {
    const v = i < values.length ? String(values[i]).replaceAll('<', '&lt;') : '';
    return acc + s + v;
  }, '');
}

const user = '<script>alert(1)</script>';
const out = safe`Hello, ${user}!`; 
// "Hello, &lt;script>alert(1)&lt;/script>!"
```

- 국제화(i18n), XSS 방어, 포매팅 등에서 유용.
    

---

### 8.2 객체 리터럴(Object Literal) 개선 포인트

#### 프로퍼티 축약(Property Shorthand)

```js
const x = 1, y = 2;
// 과거
const p1 = { x: x, y: y };
// ES6
const p2 = { x, y };
```

#### 계산된 프로퍼티명(Computed Property Name)

```js
const key = 'dynamic';
const obj = {
  [key]: 123,       // obj.dynamic === 123
  ['prefix_' + 1]: 'v1'
};
```

#### 메서드 축약(Method Shorthand)

```js
const obj = {
  old: function() { return 1; },
  modern() { return 2; }  // function 키워드 생략
};
```

#### 스프레드/나머지(Rest)와의 궁합(보너스)

```js
const base = { a: 1, b: 2 };
const ext  = { ...base, b: 9, c: 3 }; // 병합/오버라이드
const { a, ...rest } = ext;           // 분해 + 나머지
```

- 데이터 병합/분해에서 **가독성**과 **생산성** 상승.
    

---

## 9. Node.js 실무 연결 포인트

1. **환경변수·설정 주입**
    

```js
const { DB_HOST, DB_USER, DB_PASS } = process.env; // 구조분해 + const
const connStr = `mysql://${DB_USER}:${DB_PASS}@${DB_HOST}/app`;
```

2. **응답 포맷팅**
    

```js
const success = (data) => ({ ok: true, data });
const error   = (message, code = 400) => ({ ok: false, message, code });
```

3. **로그 메시지**
    

```js
logger.info(`[req:${req.id}] ${req.method} ${req.url} - user:${req.user?.id ?? 'guest'}`);
```

- 템플릿 문자열 + **옵셔널 체이닝/널 병합**(다음 파트 예고) 조합이 실무 최강.
    

---

## 10. 자주 틀리는 포인트(면접/코드리뷰 단골)

1. **`const`는 불변?**  
    → 식별자 재바인딩만 막는다. 객체 내부 변경은 가능. 불변이 필요하면 `Object.freeze` or 불변 라이브러리.
    
2. **`let/const`는 호이스팅 안 된다?**  
    → 호이스팅은 된다. 단, **TDZ** 때문에 초기화 전 접근이 **에러**.
    
3. **최상위 `var`는 전역?**  
    → 브라우저 스크립트에선 전역 오염. **Node 모듈 파일**에선 전역 오염 아님(모듈 스코프). REPL은 전역에 붙는다.
    
4. **for-루프에서 `var`**  
    → 클로저 캡처 문제로 의도와 다르게 동작. 면접 단골. `let`로 해결.
    
5. **템플릿 문자열 백틱(`)**  
    → 작은따옴표(') 아님. **백틱**으로 멀티라인/삽입/Tagged Template 가능.
    

---

## 11. 실습 과제(직접 해보면 체화됨)

1. **TDZ 실험**
    

```js
console.log(typeof foo); // ?
let foo = 10;
```

- 결과를 예측하고 실행해봐.
    

2. **for-클로저 테스트**
    

```js
const arr = [];
for (var i = 0; i < 3; i++) arr.push(() => i);
console.log(arr.map(f => f())); // ?
```

- `let`으로 바꾸면 어떻게 다른가?
    

3. **Tagged Template로 포매터 만들기**
    

- 숫자에 천 단위 구분자 붙여주는 `fmt` 태그 함수를 만들어서  
    `` fmt`합계: ${1234567}원` `` 형태로 써보자.
    

4. **객체 리터럴 개선 종합**
    

```js
const type = 'user';
const name = 'Injun';
const age  = 27;

const payload = {
  type,
  ['meta_' + type]: { createdAt: Date.now() },
  toJSON() { return { name, age }; },
};
```

- 각 문법이 어떤 이득을 주는지 설명해봐.
    

---

## 12. 최종 체크리스트(이해 점검)

### 지식 확인

- [ ] `var`/`let`/`const`의 **스코프 차이**를 설명할 수 있다.
    
- [ ] **호이스팅**과 **TDZ**의 차이를 예제로 설명할 수 있다.
    
- [ ] `const`에서 **식별자 재바인딩 금지**와 **객체 내부 변경**의 차이를 구분한다.
    
- [ ] for-루프에서 `var`가 만드는 **클로저 버그 원인**을 말하고, `let`으로 해결한다.
    
- [ ] 템플릿 문자열과 **Tagged Template**의 활용 예시를 직접 작성할 수 있다.
    
- [ ] 객체 리터럴의 **축약, 계산된 키, 메서드 축약**을 실제 코드에 적용할 수 있다.

### 실전 능력

- [ ] 실제 프로젝트에서 `const`를 기본으로 사용하고, 필요할 때만 `let`을 사용한다.
    
- [ ] 코드 리뷰에서 스코프 관련 버그를 발견하고 수정할 수 있다.
    
- [ ] 면접에서 `var`/`let`/`const` 차이를 설명할 수 있다.

---

## 📚 참고 자료

- [MDN: let](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Statements/let)
- [MDN: const](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Statements/const)
- [MDN: Template literals](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Template_literals)

---

## 다음 단계

이 개념을 이해했다면 다음 주제로 넘어가세요:
- **03. 화살표 함수 & 구조분해 할당** - 함수와 파라미터 처리
- **01. Call Stack & Event Loop** - 실행 구조 이해 (이전 주제)