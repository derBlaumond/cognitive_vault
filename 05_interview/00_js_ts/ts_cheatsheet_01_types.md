## # TypeScript Types — 전체 핵심 정리

이 노트는 “TypeScript Types.pdf”의 내용을 **전체 포함 + 이해 중심 + 실무형 예제**로 구성한다.

---

## ## 1. Type Alias란 무엇인가?

`type` 키워드를 사용해 **타입에 이름을 붙이는 문법**  
변수에 이름을 붙이듯, 타입도 이름을 붙여 재사용

```ts
type UserName = string;
type Age = number;
```

### 특징

- 코드 전체에서 재사용 가능
- 복잡한 타입을 명료하게 표현
- interface보다 더 광범위한 구조 표현 가능

---

## ## 2. Primitive Types

대표적인 원시 타입:

- string
- number
- boolean
- null
- undefined
- bigint
- symbol
- void
- never
- unknown
- any

```ts
type ID = number;
type Username = string;
```

---

## ## 3. Object Literal Types

```ts
type User = {
  id: number;
  name: string;
  isActive?: boolean;
};
```

특징

- 구조(shape)를 명확하게 표현
- optional field(`?`)로 조건적 속성 설정 가능

---

## ## 4. Function Types

```ts
type Login = (email: string, pw: string) => boolean;
```

---

## ## 5. Tuple Types

각 인덱스의 타입이 고정된 배열

```ts
type Location = [lat: number, lon: number];
```

실무에서 자주 사용 (좌표, 벡터, 파싱된 토큰)

---

## ## 6. Union Types

여러 값 중 하나를 의미

```ts
type Size = "small" | "medium" | "large";
```

---

## ## 7. Intersection Types

타입들을 합침

```ts
type Position = { x: number };
type Size = { w: number; h: number };
type Rect = Position & Size;
```

---

## ## 8. typeof — 값에서 타입 추출

```ts
const data = { id: 1, name: "A" };
type Data = typeof data;
```

JS 런타임 값을 기반으로 TS 타입 자동 생성

---

## ## 9. ReturnType — 함수의 반환 타입 추출

```ts
function createUser() {
  return { id: 1, name: "A" };
}
type User = ReturnType<typeof createUser>;
```

---

## ## 10. Type Indexing

객체의 특정 속성 타입 추출

```ts
type Response = { data: { name: string } };
type Data = Response["data"];
```

---

## ## 11. Conditional Types

조건문 같은 타입 연산

```ts
type HasFourLegs<A> = A extends { legs: 4 } ? A : never;
```

---

## ## 12. Template Literal Types

문자열 조합으로 새로운 타입 생성

```ts
type Lang = "en" | "pt" | "zh";
type Area = "header" | "footer";
type LocaleID = `${Lang}_${Area}_id`;
```

---

## ## 13. Mapped Types

key들을 순회하며 새로운 타입 구성

```ts
type Subscriber<T> = {
  [P in keyof T]: (v: T[P]) => void;
};
```

---

## ## 14. Readonly / Optional / Callable / newable

```ts
type X = {
  readonly id: string;     // 수정 불가
  optional?: string;       // optional
  call(): void;            // callable
  new (s: string): X;      // newable
};
```

---

## ## 15. 실무에서 Type Alias를 반드시 쓰는 부분

- API Response 타입
- SAP SDK의 config 타입
- UI 컴포넌트 Props
- Agent State / Workflow State
- Node.js service layer 반환 타입
- 반복되는 구조에서 mapped type으로 자동화

---

## ## 16. Interface vs Type 요약

|항목|type|interface|
|---|---|---|
|목적|모든 타입 표현|객체 구조 표현|
|기능|union/tuple/조건부/템플릿 타입 등 강력|extends/merging|
|실무 비중|매우 높음|DTO, 클래스 구조|
