# 1) 스코프 · 클로저 · 호이스팅 🔥(빈도·중요도 최상)

**Q1. 클로저(closure)란? 왜 쓰나?**  
A. 함수가 **자신이 생성될 때의 렉시컬 스코프**를 캡처해, 바깥 변수를 **생존시켜** 접근 가능하게 하는 것. 은닉화·상태 유지·함수 팩토리에 유용.

**Q2. `var` 반복문 콜백에서 i가 모두 같은 값으로 찍히는 이유? 해결책은?**  
A. `var`는 함수 스코프라 **하나의 i**가 캡처됨. `let`(블록 스코프)로 교체하거나 IIFE/클로저로 **각 i를 캡처**.

**Q3. 호이스팅(hoisting)은?**  
A. `var` 선언과 함수 선언이 **스코프의 최상단으로 끌어올려지는** 현상. 단, `var`는 **선언만** 호이스팅되고 초기화는 안 됨.

**Q4. 다음이 3이 아닌 이유?**

```js
var b = 1;
function outer(){
  var b = 2;
  function inner(){
    b++;
    var b = 3;
    console.log(b);
  }
  inner();
}
outer(); // 출력?
```

A. `inner`의 `var b`가 호이스팅되어 `undefined`→`b++`가 NaN, 이어서 `b=3`, **결과 3**.

**Q5. IIFE(즉시실행함수)를 파일 전체를 감싸는 이유?**  
A. **전역 오염 방지**, 프라이빗 스코프 확보, 모듈화.

---

# 2) `this` 바인딩 규칙 · `call/apply/bind` · 화살표 함수 🔥

**Q6. `this` 바인딩 우선순위는?**  
A. `new` > 명시적(`call/apply/bind`) > 암시적(점 앞 객체) > 기본(전역/`undefined` in strict). 화살표 함수는 **자체 `this` 없음**(상위 스코프 캡처).

**Q7. 메서드를 변수에 뺄 때 `this`가 깨지는 이유와 대책?**  
A. **암시적 바인딩 상실**로 기본 바인딩 발생. `obj.m.bind(obj)` 또는 화살표/클래스 필드로 **고정**.

**Q8. `self = this` 패턴이 쓰이는 맥락은?**  
A. 중첩 일반함수에서 `this`가 바뀌는 문제를 피하기 위한 **레거시 우회**. 현대엔 **화살표 함수** 추천.

---

# 3) 타입 · 동등성 · 암묵적 변환 · `typeof` · `NaN` 🔥

**Q9. `==` vs `===` 차이?**  
A. `==`는 **형 변환 후 비교**, `===`는 **형 변환 없이** 엄격 비교. 인터뷰·실무는 **`===` 기본**.

**Q10. `typeof null`이 `"object"`인 이유와 함정 회피?**  
A. 역사적 버그. 객체 판정은 `value !== null && typeof value === 'object'` 또는 `Object.prototype.toString.call(value)` 사용.

**Q11. `NaN`은 무엇이고 비교 방법은?**  
A. 숫자형의 **특수 값**(자기 자신과도 불일치). ES6 이후 **`Number.isNaN(x)`** 사용(전역 `isNaN`은 암묵변환이 있어 부정확).

**Q12. 다음 결과? 왜?**

```js
console.log(1 + "2" + "2");   // "122"
console.log(1 + +"2" + "2");  // "32"
console.log(1 + -"1" + "2");  // "02"
console.log(+"1" + "1" + "2");// "112"
console.log("A" - "B" + "2"); // "NaN2"
console.log("A" - "B" + 2);   // NaN
```

A. 문자열 결합/단항 `+`로 **수 변환**/산술 시 **NaN** 규칙이 적용된 결과.

**Q13. `0.1 + 0.2 === 0.3`이 `false`인 이유?**  
A. IEEE-754 **부동소수 오차**. 허용 오차로 비교: `Math.abs(a-b) < Number.EPSILON`.

**Q14. `"10" + 20 + 30` 결과?**  
A. `"1020" + 30 → "102030"`(좌결합·문자열 우세).

**Q15. `typeof typeof 1`?**  
A. `"number"`의 타입은 `"string"` → 결과 `"string"`.

---

# 4) 배열 · 객체 동작(희소 배열, `delete`, 키 변환) 🔥

**Q16. `delete`가 배열 길이에 미치는 영향?**

```js
var trees = ["pine","apple","oak","maple","cherry"];
delete trees[3];
console.log(trees.length); // ?
```

A. **길이 유지**(5). `delete`는 **구멍만 만듦**. 요소 제거·길이 변경은 `splice`.

**Q17. 희소 배열 예측**

```js
var a=[1,2,3]; a[10]=99; console.log(a[6]); // ?
```

A. **`undefined`**. 인덱스 사이가 빈 슬롯.

**Q18. 객체 키로 객체를 쓰면?**

```js
var a={}, b={key:'b'}, c={key:'c'};
a[b]=123; a[c]=456; console.log(a[b]); // ?
```

A. 키가 문자열로 **"[object Object]"**로 동일해 **456**.

**Q19. `Array()` vs `[]` 차이?**  
A. `[]`는 리터럴. `Array(n)`은 **길이 n의 희소 배열**, `Array(1,2)`는 `[1,2]`.

**Q20. 앞/뒤에 요소 추가**  
A. 앞: `unshift`, 뒤: `push`.

---

# 5) 프로토타입 · 상속 · 구성(컴포지션) 🔥

**Q21. 클래스 상속 vs 프로토타입 상속 차이는?**  
A. 클래스: **계층/타이트 커플링**. 프로토타입: **객체에서 직접 상속**, `Object.create`/팩토리/믹스인으로 **유연한 합성**.

**Q22. 왜 “상속보다 합성”을 선호하나?**  
A. **취약한 기반 클래스**·**강한 결합**·**경직된 계층** 회피, 작은 기능을 **조합**해 재사용 극대화.

**Q23. 프로토타입 상속 언제 쓰나?**  
A. 모듈/FP만으로 애매할 때, **여러 소스에서 선택적 기능 합성**이 필요할 때(`Object.assign`, 믹스인, 팩토리).

**Q24. `prototype` 프로퍼티란?**  
A. **생성자 함수**가 가지는 링크로, 인스턴스의 **[[Prototype]]**이 가리킬 객체.

---

# 6) 비동기 · 이벤트 루프(마이크로태스크/매크로태스크) 🔥

**Q25. 자바스크립트 비동기의 핵심은?**  
A. **이벤트 루프** + 태스크 큐. 블로킹 I/O를 요청만 던지고, 완료 시 **콜백/마이크로태스크**로 이어감.

**Q26. 출력 순서 예측**

```js
(function() {
  console.log(1);
  setTimeout(()=>console.log(2), 1000);
  setTimeout(()=>console.log(3), 0);
  console.log(4);
})();
```

A. `1, 4, 3, 2` (동기 → 0ms 타이머(매크로) → 1000ms 타이머).  
※ `Promise.then/queueMicrotask`는 **매크로 이전에 전부 비움**.

---

# 7) 엄격 모드 · 파일 래핑 🔥

**Q27. `'use strict'`의 이점은?**  
A. **암묵 전역 금지**, `this` 기본 바인딩 안전화(`undefined`), 중복 프로퍼티/삭제 제한 등 **에러 조기 노출**.

**Q28. 파일을 함수로 감싸는(모듈 패턴) 이유?**  
A. **전역 스코프 오염 방지**, 의존성 주입 용이, 번들러 이전 시대의 모듈화 패턴.

---

# 8) 동등성·정의 상태·에러 포인트 (중요)

**Q29. `undefined` vs `not defined` 차이?**  
A. 전자는 **선언됐으나 값 없음**, 후자는 **식별자 자체가 미정의(ReferenceError)**.

**Q30. `false == '0'`와 `false === '0'`**  
A. 느슨한 비교는 **true**(암묵 변환), 엄격 비교는 **false**.

**Q31. `"undefined == typeof NULL"`의 값?**  
A. `"undefined" == "object"` → **false**.

---

# 9) 리턴·ASI(자동 세미콜론 삽입) 함정 (중요)

**Q32. 두 함수의 반환이 다른 이유?**

```js
function foo1(){ return { bar:"hello" }; }
function foo2(){
  return
  {
    bar:"hello"
  };
}
```

A. ASI로 `return;`으로 끝나 **`foo2`는 `undefined` 반환**.

---

# 10) 숫자/정수 판정 · 재귀 최적화 (중요)

**Q33. `isInteger(x)`를 구현하는 방법?**  
A. `Number.isInteger(x)` 사용. 폴리필: `typeof x==='number' && isFinite(x) && Math.floor(x)===x`.

**Q34. 큰 배열 재귀가 스택 오버플로우나는 경우 해결?**  
A. **Trampoline/이벤트 루프 분할**: `setTimeout(next,0)`로 재귀를 큐에 쪼개거나 꼬리재귀(엔진 지원 시).

---

# 11) 문자열/알고리즘 소품 (실전 빈출)

**Q35. 160자 이내 팔린드롬 판정**  
A. `s=s.toLowerCase().replace(/[^a-z0-9]/g,''); return s===s.split('').reverse().join('');`

**Q36. 커리/일반 호출 모두 동작하는 `sum`**  
A.

```js
const sum=(a,b)=>(b!==undefined?a+b:(c)=>a+c);
```

---

# 12) DOM/브라우저 (필수)

**Q37. DOM 요소와 모든 자손을 방문하며 콜백 호출**  
A. DFS:

```js
function visit(el, cb){ cb(el); for(const ch of el.children) visit(ch, cb); }
```

---

# 13) 데이터 바인딩 · 아키텍처 (개념 질문)

**Q38. 양방향 바인딩 vs 단방향 데이터 흐름?**  
A. 양방향: **뷰↔모델 동기화**(상호 업데이트). 단방향: **단일 진실원**(상태는 스토어만 변경), 예측 가능·디버깅 용이.

**Q39. 모놀리식 vs 마이크로서비스 장단점?**  
A. 모놀리식: 초기 단순·공통 관심사 통합 용이, **장기 결합/복잡화**.  
마이크로서비스: **독립 배포/스케일**·조합 용이, 초기 **운영 오버헤드**·크로스컷팅 관리 필요.

---

# 14) 기타 퍼즐·케이스

**Q40. `var a = b = 3;`의 함정?**  
A. `b`가 **암묵 전역**이 됨(Strict 모드면 ReferenceError). `var a=b=3`는 `b=3; var a=b;`.

**Q41. 인자/arguments 트릭 출력**

```js
var length=10;
function fn(){ console.log(this.length); }
var obj={ length:5, method:function(fn){ fn(); arguments[0](); } };
obj.method(fn,1); // ?
```

A. 첫 호출: 전역 length(브라우저 10/strict면 undefined). 두 번째는 `arguments`가 this라 **2**.

**Q42. 타입 가드 없이 `typeof bar==="object"`의 함정?**  
A. **`null`도 object**. 배열·함수 구분도 안 됨. `Array.isArray`, `typeof bar==='function'`, `bar!==null` 조합.

---

## 빠른 연습(3문제)

1. 출력 순서:
    

```js
console.log('A'); setTimeout(()=>console.log('B'),0);
Promise.resolve().then(()=>console.log('C'));
queueMicrotask(()=>console.log('D')); console.log('E');
```

→ **A, E, C, D, B**

2. 결과 예측:
    

```js
let x = { n:1, d:{k:1} }; let y = {...x}; y.d.k=2; console.log(x.d.k);
```

→ **2** (얕은 복사)

3. 동등성:
    

```js
console.log([1] == 1, [1] === 1);
```

→ **true, false** (좌측이 원시로 변환되어 비교)

---

## 다음 단계 제안

- 네가 인터뷰에서 주로 받을 영역 2~3개를 골라주면, 각 영역별 **심화 OX 20제 + 실전 코드 5제**를 바로 만들어줄게.
    
- 원하면 위 목록을 **타입스크립트 관점(내로잉/제네릭/`unknown`/`never`)**도 곁들여 정리해줄 수 있어.