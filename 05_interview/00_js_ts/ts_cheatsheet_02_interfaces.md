# # TypeScript Interfaces — 객체 구조 정의의 핵심

이 노트는 **TypeScript Interfaces.pdf**의 내용을 100% 포함하고,  
JS 객체 구조를 TS에서 어떻게 “형태화(shape)”하는지 이해하기 쉽게 구성한 정리다.

---

## ## 1. Interface란 무엇인가?

Interface는 **“객체의 구조(shape)”를 정의하는 문법**이다.

JS에서 대부분의 값은 객체이며,  
TS에서는 그 객체의 형태를 interface로 명확히 표현한다.

```ts
interface User {
  id: number;
  name: string;
}
```

---

## ## 2. 필드 정의 규칙

### 기본 필드

```ts
interface User {
  id: number;
  name: string;
}
```

### Optional 필드 (`?`)

```ts
interface User {
  email?: string;
}
```

### readonly 필드

```ts
interface User {
  readonly id: number;
}
```

→ 객체 생성 후 id는 변경 불가 (타입 차원에서 보호)

---

## ## 3. 함수 타입 정의 (두 가지 방식 모두 가능)

### 함수 시그니처 방식

```ts
interface Login {
  (email: string, password: string): boolean;
}
```

### 객체의 메서드 방식

```ts
interface User {
  login(email: string, pw: string): boolean;
}
```

### 둘 다 흔히 쓰임

PDF에도 이 두가지가 동등하게 가능하다고 명시됨.

---

## ## 4. Callable / Newable 타입

interface는 **“함수처럼 호출 가능”**한 구조도 정의할 수 있다.

### Callable

```ts
interface Transformer {
  (input: string): number;
}
```

### Newable

```ts
interface Factory {
  new (config: string): Instance;
}
```

---

## ## 5. Index Signature

어떤 키든 허용하고, value 타입만 규정

```ts
interface UserMap {
  [key: string]: number;
}
```

---

## ## 6. Built-in JS 객체 구조

PDF에 언급된 기본 객체 구조:

- Date
- Error
- Array
- Map
- Set
- RegExp
- Promise

TS에서는 interface로 이들의 구조를 설명하고 있음.

---

## ## 7. Interface Extends (확장)

다른 인터페이스를 상속하여 구조를 확장

```ts
interface Response {
  status: number;
}

interface JSONResponse extends Response {
  payloadSize: number;
}
```

→ 실무에서 정말 많이 사용  (API Response, DTO Layer, Common Config 등)

---

## ## 8. Interface Merging (중요)

**interface만 가능한 기능**

동일 이름을 가진 인터페이스가 여러 번 선언되면  
자동으로 병합(merge)된다.

```ts
interface Request {
  user?: string;
}

interface Request {
  device?: string;
}
```

→ 최종 Request 구조는 아래와 같다.

```ts
{
  user?: string;
  device?: string;
}
```

실무 사례:

- Express Request 확장
- UI5 Component 타입 확장
- SAP BTP SDK 타입 커스터마이징

---

## ## 9. Overloading (다중 시그니처)

하나의 callable interface에 여러 함수 시그니처를 선언할 수 있음.

```ts
interface Expect {
  (v: boolean): string;
  (v: string): boolean;
}
```

---

## ## 10. Interface + Generics

타입을 외부에서 주입받아 구조가 바뀌는 형태

```ts
interface APICall<Response> {
  data: Response;
}
```

### extends로 타입 제한 가능

```ts
interface APICall<Response extends { status: number }> {
  data: Response;
}
```

---

## ## 11. Class implements

클래스가 특정 인터페이스 구조를 반드시 따르도록 강제한다.

```ts
interface Syncable {
  sync(): void;
}

class Account implements Syncable {
  sync() {}
}
```

---

## ## 12. Getter & Setter (Interface로도 선언 가능)

```ts
interface Ruler {
  get size(): number;
  set size(v: string | number);
}
```

PDF에서 “Avoid” 항목이 있는 이유:  
과도한 setter type overload는 복잡함을 유발하기 때문.

---

## ## 13. Interface 특징 종합 정리

- 객체의 형태(shape)를 정의하는 공식 문법
- optional/readonly/callable/newable 지원
- extends로 확장 가능
- interface 병합(merging)은 interface 전용 기능
- 클래스 implements로 구조 강제 가능
- 함수 타입, getter/setter, 인덱스 시그니처 모두 지원
- generic interface로 구조를 동적 구성

---

## ## 14. Type vs Interface 비교 요약

|항목|interface|type|
|---|---|---|
|목적|객체 구조 정의|모든 타입 표현 가능|
|확장|extends O|& 사용|
|병합|O (중요!)|X|
|callable/newable|있음|있음|
|실무 활용|DTO, 클래스 구조, API Spec|복잡 타입, union, 조건부 타입|

---

## ## 15. 실무에서 Interface를 꼭 써야 하는 경우

- SAP BTP SDK의 DTO 구조 정의
- Node.js Express Request 확장
- UI5 컴포넌트 Props 정의
- Config object의 shape 보장
- 클래스와 연동할 때 (implements)
- 데이터 구조 표준화가 필요한 팀 프로젝트
