# # TypeScript Control Flow Analysis (CFA)

이 노트는 **TypeScript Control Flow Analysis.pdf** 의 내용을 기반으로,  
TS가 “코드의 흐름(조건문, 분기, 함수 호출)”을 어떻게 분석하여  
**타입을 자동으로 좁혀(narrowing)** 나가는지 정리한다.

CFA는 TypeScript를 실제로 잘 쓰는 개발자와 그렇지 않은 개발자를 명확히 구분짓는 핵심 개념이다.

---

## ## 1. Control Flow Analysis란?

TypeScript는 **코드 흐름을 따라**  
“이 시점에서 어떤 타입이 실제로 가능한가?” 를 판단한다.

예시:

```ts
const input = getUserInput();  
// input: string | number

if (typeof input === "string") {
  // input: string
}
```

즉, **조건문을 판단하며 타입을 줄여준다** = narrowing.

---

# ## 2. Narrowing의 주요 방법들

TypeScript는 다음 요소를 기반으로 타입을 좁힌다.

1. typeof
2. instanceof
3. Array.isArray
4. "key" in obj
5. switch-case (특히 literal union 기반)
6. 논리 연산자
7. 사용자 정의 type guard
8. assertion function
9. 재할당(widening rules 포함)

---

# ## 3. typeof Narrowing

문자열 기반의 원시타입 판단에 사용

```ts
const input = getUserInput();
// input: string | number

if (typeof input === "string") {
  input.toUpperCase();  // OK
}
```

**지원되는 typeof 타입**

- `"string", "number", "boolean", "bigint", "symbol", "undefined", "object", "function"`

---

# ## 4. instanceof Narrowing

클래스 기반 객체에 사용

```ts
if (response instanceof Error) {
  response.message;  // Error 타입으로 좁혀짐
}
```

---

# ## 5. Array.isArray Narrowing

PDF에서도 별도 예제로 강조됨.

```ts
if (Array.isArray(input)) {
  // input: any[]
}
```

---

# ## 6. “key in obj” Narrowing

객체에 특정 키가 존재하면 해당 분기 내부에서 타입이 좁혀짐.

```ts
type Result =
  | { data: string }
  | { error: Error };

if ("error" in result) {
  result.error;  // Error 타입으로 좁혀짐
}
```

---

# ## 7. Switch-case Narrowing (Discriminated Union 기반)

PDF의 대표 예시:

```ts
type Responses =
  | { status: 200, data: any }
  | { status: 301, to: string }
  | { status: 400, error: Error };

switch (response.status) {
  case 200:
    return response.data;
  case 301:
    return redirect(response.to);
  case 400:
    return response.error;
}
```

**핵심 포인트**:  
모든 union 멤버가 **공통된 literal 필드(status)** 를 가지고 있기 때문에  
해당 필드를 기준으로 TS가 정확하게 narrowing 한다.

---

# ## 8. Boolean 연산 기반 Narrowing

이 줄에서도 narrowing이 일어난다:

```ts
const inputLength =
  (typeof input === "string" && input.length) || input;
```

조건이 true일 경우  
`input` 타입이 string으로 좁아진다는 것을 TS가 분석한다.

---

# ## 9. 사용자 정의 Type Guard (obj is Type)

PDF 핵심 예시:

```ts
function isErrorResponse(obj: Response): obj is APIErrorResponse {
  return obj instanceof APIErrorResponse;
}

const response = getResponse();

if (isErrorResponse(response)) {
  response.error;  // APIErrorResponse로 좁혀짐
}
```

핵심 구조:

```ts
function fn(arg: A): arg is B {
  return someCheck(arg);
}
```

---

# ## 10. Assertion Functions (asserts)

PDF에서 강조된 TypeScript 3.7 기능.

```ts
function assertResponse(obj: any): asserts obj is SuccessResponse {
  if (!(obj instanceof SuccessResponse)) {
    throw new Error("Not a success!");
  }
}

const res = getResponse();
assertResponse(res);
res.data;  // SuccessResponse로 좁혀짐
```

특징

- true/false를 반환하지 않는다
- 실패 시 throw
- 성공 시 "현재 scope 전체에서" 타입이 좁혀진다

---

# ## 11. Narrowing은 재할당에도 영향을 받음 (widening 포함)

PDF에서의 대표 예시:

```ts
let data: string | number = ...

data = "Hello";
data; // now string
```

하지만 literal value는 기본적으로 widening됨:

```ts
let x = "hello";
// x: string (not "hello")
```

### literal 타입을 고정하려면?

```ts
const x = "hello" as const;
// x: "hello"
```

---

# ## 12. “as const” — literal narrowing 고정

PDF에서 최종적으로 정리된 핵심 표현:

```ts
const data1 = { name: "Zagreus" };
typeof data1;
// { name: string }

const data2 = { name: "Zagreus" } as const;
typeof data2;
// { name: "Zagreus" }
```

---

# ## 13. Control Flow가 “연결된 변수들”에도 영향을 줌

PDF 마지막 부분의 포인트:

```ts
const res = getResponse();
const isSuccessResponse = res instanceof SuccessResponse;

if (isSuccessResponse) {
  res.data;  // SuccessResponse로 좁혀짐
}
```

TypeScript는 boolean 변수가  
**어떤 narrowing 조건의 결과인지**도 추적한다.

---

# ## 14. CFA 핵심 정리

- if / switch / instanceof / typeof 등 코드를 읽으면서 타입을 줄여간다
    
- boolean 연산, 함수 호출, guard 함수에서도 narrowing 발생
    
- `obj is Type` 형태의 guard 함수는 매우 강력
    
- assertion function은 전체 scope에 대해 narrowing
    
- literal 타입을 고정하려면 `as const`
    
- 재할당은 widening 규칙이 적용됨
    
- discriminated union은 실무에서 거의 100% 사용됨