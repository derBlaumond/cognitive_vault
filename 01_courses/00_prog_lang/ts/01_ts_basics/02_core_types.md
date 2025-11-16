## Primitive Types (기본 타입)

### 1. TypeScript 기본 타입 개요

TypeScript는 JavaScript의 기본 타입을 그대로 확장한다. 기본 타입들은 프로그램에서 가장 자주 쓰이며, TS의 정적 타입 시스템의 핵심 역할을 한다.

TypeScript의 주요 기본 타입들은 아래와 같다:
- **number**, **string**, **boolean**, **null**, **undefined**, **symbol**, **bigint**

각 타입은 JS와 동일한 의미를 가지지만, TS에서는 정적 타입 검사 덕분에 훨씬 더 안정적으로 사용할 수 있다.
### 2. number
- TS에서는 ==모든 숫자 타입이 **number**== 하나로 통합. 정수, 부동소수점 모두 포함
```ts
let count: number = 10;
let price: number = 19.99;
```
### 3. string
- 텍스트 데이터를 나타냄, ==템플릿 문자열(백틱) 포함==
```ts
let greeting: string = "Hello";
let message: string = `Hello ${greeting}`;
```
### 4. boolean
- true/false 값을 다룬다.
```ts
let isActive: boolean = true;
```
### 5. null & undefined

둘 다 “값이 없음”을 의미하지만 의미가 다름. TypeScript에서는 strictNullChecks 옵션 여부에 따라 동작이 달라진다.

- **undefined**: ==값이 할당되지 않음==
- **null**: 명시적으로 ==값이 없음==을 지정
### 6. symbol

- ES6에서 추가된 유일(unique)한 값. 주로 식별자(identifier)로 사용됨.

```ts
const id: symbol = Symbol("id");
```
### 7. bigint

- 매우 큰 정수를 다루기 위한 타입. ==숫자 뒤에 `n`==을 붙여 사용

```ts
let big: bigint = 9007199254740991n;
```

---
## The Type System (타입 시스템의 개념)

### 1. TypeScript의 타입 시스템 정의

TypeScript의 핵심은 강력한 **정적 타입 시스템** → 코드 실행 전에 오류를 잡도록 설계됨.
### 2. 왜 타입 시스템이 중요한가?

- 코드 신뢰성 증가
    
- 팀 협업 시 의도 명확
    
- 함수, 객체 구조 등을 정교하게 관리
    
- JavaScript의 동적 타입 단점을 보완
### 3. 타입 시스템 구성 요소

TypeScript 타입 시스템은 다음 요소들로 구성된다:

- 타입 추론(inference)
    
- 타입 선언(annotation)
    
- 타입 호환성(compatibility)
    
- 유니온 타입
    
- 리터럴 타입
    
- 객체 타입
    
- 인터페이스
    
- 함수 타입
    
- 고급 타입(제네릭 등)

이 구조 덕분에 TypeScript는 대규모 애플리케이션에서도 일관성 있고 안전한 코드를 제공함.
### 4. JavaScript 대비 강점

JS는 런타임에 타입 오류가 발생하는 반면  
TS는 컴파일 단계에서 오류를 발견할 수 있어 개발 효율성을 높임.

---
## The “any” Type

### 1. any 타입의 개념

`any`는 **모든 타입을 허용**하는 특별한 타입이다.  
TypeScript의 타입 시스템을 임시로 우회할 수 있는 "안전장치 해제" 타입이라고 보면 된다.

### 2. 특징

- 어떤 값이든 저장 가능
    
- 어떤 연산도 가능
    
- 타입 오류가 발생하지 않음
    
- **타입 안정성을 잃게 되므로 남용하면 안 됨**

```ts
let value: any = 10;
value = "hello";
value = true;
```

### 3. 언제 사용해야 하는가?

- JavaScript에서 마이그레이션할 때
    
- 타입을 알 수 없는 외부 라이브러리 사용 시
    
- 점진적 타입 적용이 필요할 때

그러나 프로젝트가 커질수록 **any는 유지보수 비용을 증가시키므로 최소화해야 한다.**

---
## The “unknown” Type
### 1. unknown 타입 개요

`unknown`은 any와 비슷해 보이지만 **타입 안전성을 보장하는 any**에 가까운 개념이다.
### 2. 특징

- 모든 값을 담을 수 있음
    
- **사용하기 전에 반드시 타입 체크 필요**

```ts
let data: unknown = "hello";

if (typeof data === "string") {
  console.log(data.toUpperCase());
}
```
### 3. any와 unknown 비교

| 특징           | any | unknown        |
| ------------ | --- | -------------- |
| 어떤 값이든 할당 가능 | ✔   | ✔              |
| 모든 연산 가능     | ✔   | ✘ (타입 체크 후 가능) |
| 타입 안전성       | 없음  | 있음             |
### 4. 언제 사용해야 하는가?

- 외부 API 응답처럼 “무엇이 올지 모를 때”
    
- 타입 강제 체크를 원할 때
    
- any 대신 **unknown → narrowing → 안전한 접근** 패턴을 권장
---
## The “never” Type

### 1. never 타입 개념

`never`는 **절대 발생할 수 없는 값**을 의미한다.
### 2. 언제 등장하는가?

- 예외를 던지는 함수
    
- 무한 루프를 도는 함수
    
- 타입 검사에서 “불가능한 케이스”를 표시할 때
### 예시 1: 예외 발생

```ts
function fail(msg: string): never {
  throw new Error(msg);
}
```

### 예시 2: 무한 루프

```ts
function loopForever(): never {
  while (true) {}
}
```
### 3. 사용 목적

- exhaustive checking (모든 case 처리 보장)
    
- switch 문에서 누락된 케이스를 컴파일 타임에 잡아줌
---
## Union Types (유니온 타입)
### 1. 개념
Union type은 **여러 타입 중 하나가 될 수 있음**을 나타낸다.

```ts
let value: string | number;
value = "hello";
value = 42;
```
### 2. 특징

- 값이 가질 수 있는 타입의 범위를 넓힘
    
- 타입 가드를 사용해야 안전하게 사용할 수 있음
### 3. 사용 예시: 함수 파라미터

```ts
function printId(id: string | number) {
  console.log(id);
}
```
### 4. Narrowing 필요

유니온 타입은 바로 특정 타입의 메서드를 사용할 수 없음 → narrowing 필요

```ts
function getLength(x: string | string[]) {
  if (typeof x === "string") return x.length;
  return x.length;  // 배열의 length
}
```

---
## Intersection Types (인터섹션 타입)
### 1. 개념
Intersection은 두 타입을 **모두 만족해야 함**을 의미한다.

```ts
type A = { x: number };
type B = { y: string };
type C = A & B; // { x: number; y: string }
```
### 2. 특징

- 여러 타입을 “합성”하는 방식
    
- 객체 타입을 결합할 때 주로 사용
---
##  Literal Types (리터럴 타입)
### 1. 개념

리터럴 타입은 **특정 값만 허용하는 타입**을 의미한다.

```ts
let direction: "left" | "right" | "up" | "down";
```
### 2. 특징

- enum 없이도 특정 값을 제한할 수 있음
    
- 오타를 컴파일 단계에서 잡아줌
    
- 타입 안정성을 크게 향상
### 3. 사용 예시

```ts
function setSize(size: "small" | "medium" | "large") {
  console.log(size);
}
```

---
## Tuple Types (튜플)
### 1. 개념

Tuple은 **고정된 길이와 고정된 타입 순서를 가진 배열**이다.

```ts
let user: [string, number];
user = ["john", 25];
```
### 2. 특징

- 일반 배열과 다르게 “순서 + 타입”이 고정됨
    
- API 데이터 구조를 표현할 때 유용
### 3. Optional 요소

```ts
let rgb: [number, number, number?];
```
### 4. readonly 튜플

```ts
let position: readonly [number, number] = [10, 20];
```

배열처럼 수정 불가능.

---
## Enums (열거형)
### 1. 개념

Enum은 **관련된 상수 값들을 하나의 집합**으로 표현.
### 2. 숫자 기반 Enum

```ts
enum Direction {
  Up,
  Down,
  Left,
  Right
}
```

자동으로 0,1,2,3 할당됨.
### 3. 문자열 기반 Enum

```ts
enum Status {
  Success = "SUCCESS",
  Error = "ERROR"
}
```
### 4. 장점

- 코드 가독성 증가
    
- Magic number 제거
    
- 실수를 줄임
---
## Type Assertions (타입 단언)
### 1. 개념

TypeScript에게 **“내가 타입을 알고 있으니 이 타입으로 처리해라”**라고 지시
### 2. 예시

```ts
let value: unknown = "hello";
let len = (value as string).length;
```
### 3. 사용 시 주의

- 컴파일러의 타입 체크 우회
    
- 잘못 사용하면 런타임 오류 발생 가능
    
- 남용 금지

---
## Working with Objects (객체 타입)
### 1. 객체 타입의 기본 개념

TypeScript는 객체 구조를 타입으로 명시적으로 지정할 수 있다.  
이는 JavaScript의 자유로운 객체 구조에 정적 안정성을 부여하는 방식이다.

```ts
let user: {
  name: string;
  age: number;
};
user = { name: "Alice", age: 25 };
```
### 2. 선택적 프로퍼티(Optional Properties)

키 뒤에 `?`를 붙여 해당 속성이 선택적으로 존재할 수 있음을 나타냄.

```ts
let user: {
  name: string;
  age?: number;
};
```
### 3. 객체 타입의 이점

- 팀 협업 시 데이터 구조 명확
    
- API 응답/요청 구조 정의에 매우 유용
    
- 입력 오류 판단 용이
---
## Type Aliases (타입 별칭)
### 1. 개념

타입 별칭은 특정 타입 구조에 “이름”을 붙여 재사용성을 높이는 기능이다.

```ts
type Point = {
  x: number;
  y: number;
};

let p: Point = { x: 10, y: 20 };
```
### 2. 장점

- 긴 타입을 축약
    
- 재사용성 향상
    
- 코드 구조 정리 및 가독성 증가
### 3. 함수 타입도 alias 가능

```ts
type Add = (a: number, b: number) => number;
```

---
## Interfaces (인터페이스)
### 1. 인터페이스의 목적

TypeScript에서 객체의 구조(shape)를 정의하기 위한 가장 강력한 기능 중 하나.
### 2. 기본 예시

```ts
interface User {
  name: string;
  age: number;
}
```
### 3. optional / readonly 지원

```ts
interface User {
  name: string;
  age?: number;
  readonly id: number;
}
```
### 4. 인터페이스 확장(extends)

Java의 인터페이스 상속과 유사

```ts
interface Person { name: string; }
interface Employee extends Person { department: string; }
```
### 5. 인터페이스 vs 타입 alias

둘 다 객체 구조를 정의하지만 다음 차이가 있다:

|항목|interface|type|
|---|---|---|
|확장(extends)|매우 강함, 다중 확장 가능|인터섹션 사용 (&)|
|선언 병합 가능|✔|✘|
|함수 타입 표현|가능|가능|

일반적으로 객체 모델링 = interface 추천.

---
## Functions and Return Types (함수와 반환 타입)
### 1. 함수 타입 명시

파라미터 & 반환 타입을 지정하여 오류 예방

```ts
function add(a: number, b: number): number {
  return a + b;
}
```
### 2. 반환 타입 생략 → 타입 추론

하지만 명시하면 의도가 분명해짐.
### 3. void

반환값 없음

```ts
function logMessage(msg: string): void {
  console.log(msg);
}
```
### 4. never

함수가 정상적으로 끝나지 않는 경우 (throw 또는 infinite loop)

---
## Optional & Default Parameters (선택적 매개변수 & 기본값)
### 1. optional parameter

```ts
function greet(name?: string) {
  return name ? `Hello, ${name}` : "Hello";
}
```
### 2. default parameter

JavaScript 동일 문법

```ts
function multiply(a: number, b: number = 2) {
  return a * b;
}
```

---
##  Rest Parameters (rest 파라미터)
### 1. 개념

여러 개의 인자를 하나의 배열로 받는 기능.

```ts
function sum(...nums: number[]) {
  return nums.reduce((a, c) => a + c, 0);
}
```
### 2. 특징

- 타입을 배열로 지정해야 함
    
- 인자 개수 제한 없음

---
## Readonly Properties (읽기 전용 프로퍼티)
### 1. 개념

값이 초기화된 이후 변경 불가

```ts
interface User {
  readonly id: number;
  name: string;
}
```
### 2. 목적

- 데이터 불변성 유지
    
- 객체 변형으로 인한 버그 예방

---
## The “object” Type (object 타입)
### 1. object 타입

JavaScript의 모든 non-primitive 값을 의미

```ts
let obj: object = { x: 10 };
```
### 2. 하지만 object는 구조 지정이 불가

그래서 실제로는 거의 사용하지 않고  
**명확한 구조 타입**을 지정하는 것이 기본 원칙이다.

---
## Working with Arrays (배열)
### 1. 기본 array 타입

```ts
let nums: number[] = [1, 2, 3];
```
### 2. 제네릭 배열 타입

```ts
let nums: Array<number> = [1, 2, 3];
```
### 3. readonly 배열

```ts
let coords: readonly number[] = [10, 20];
```

변경 불가.

---
## Type Narrowing (타입 좁히기)
### 1. 개념

유니온 타입 등에서 실제 타입을 “좁혀” 특정 타입처럼 사용 가능하게 하는 과정
### 2. 주요 방법
#### (1) typeof

```ts
if (typeof value === "string") { ... }
```
#### (2) instanceof

```ts
if (input instanceof Date) { ... }
```
#### (3) in 연산자

```ts
if ("name" in obj) { ... }
```
#### (4) 사용자 정의 type guard

```ts
function isString(v: unknown): v is string {
  return typeof v === "string";
}
```

---
## Exhaustiveness Checking (철저한 체크)
### 1. 목적

모든 가능한 케이스를 처리하는지 검사하기 위한 기법.
### 2. never 타입 사용

switch 문에서 빠진 case를 컴파일 타임에 잡을 수 있음.

```ts
function check(value: string | number) {
  switch (value) {
    case "text": ...
    case 10: ...
    default:
      const _exhaustive: never = value;
  }
}
```

누락된 타입이 있을 경우 컴파일 오류 발생.

---
## Working with Functions (함수 고급 개념)
### 1. 함수 타입(Function Types)

TypeScript에서는 함수도 “하나의 타입”으로 명시할 수 있다.

```ts
let fn: (a: number, b: number) => number;
fn = (x, y) => x + y;
```
### 2. 파라미터 타입 지정

- 매개변수 각각에 타입 지정
    
- 작성하지 않으면 any로 추론될 수 있으므로 명시하는 것이 좋다.
### 3. 반환 타입(Return Type)

TypeScript는 반환 타입을 추론할 수 있지만,  
함수의 의도를 명확히 하기 위해 직접 지정하는 것을 권장함.

```ts
function greet(name: string): string {
  return `Hello, ${name}`;
}
```
### 4. void 함수

아무것도 반환하지 않는 함수

```ts
function log(msg: string): void {
  console.log(msg);
}
```
### 5. never 함수

정상적으로 종료되지 않는 함수

```ts
function fail(): never {
  throw new Error("Error");
}
```

---
## Working with Classes (클래스)
### 1. 기본 문법

TypeScript 클라스는 JavaScript 클래스를 기반으로 하지만 타입 시스템을 포함하여 더 안전하다.

```ts
class Person {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}
```
### 2. 접근 제어자

Java/C#/C++처럼 **public, private, protected** 지원

```ts
class Animal {
  private age: number;
  protected name: string;
  public type: string;
}
```
### 3. readonly 프로퍼티

초기화 이후 수정 불가

```ts
class Car {
  readonly id: number = 1;
}
```
### 4. 상속

JS 동일 문법 + 타입 안정성 보장

```ts
class Employee extends Person {
  salary: number;
  constructor(name: string, salary: number) {
    super(name);
    this.salary = salary;
  }
}
```

---
## Advanced Object Types (고급 객체 타입)
### 1. optional property

객체의 일부 필드를 선택적(optional)으로 지정

```ts
type User = {
  id: number;
  email?: string;
};
```
### 2. readonly property

읽기 전용

```ts
type Config = {
  readonly port: number;
};
```
### 3. union이 포함된 객체 타입

```ts
type Shape = 
  | { type: "circle"; radius: number }
  | { type: "square"; side: number };
```
### 4. intersection이 포함된 객체 타입

```ts
type A = { x: number };
type B = { y: string };
type C = A & B; // { x: number, y: string }
```

---
## Index Signatures (인덱스 시그니처)
### 1. 개념

객체 키가 동적으로 생성될 수 있을 때 사용.

```ts
type Scores = {
  [key: string]: number;
};
```
### 2. 특징

- 모든 key의 타입을 지정해야 할 때 유용
    
- JSON 객체, API 응답 모델링에 자주 쓰임
### 3. key 타입

string 또는 number만 가능  
(ES의 객체 키 특성상 symbol 제외)

---
## keyof 연산자 (keyof Operator)
### 1. keyof의 역할

객체 타입의 “모든 키 이름”을 union 타입으로 가져온다.

```ts
type Person = { name: string; age: number };
type Keys = keyof Person; 
// "name" | "age"
```
### 2. 사용 목적

- 객체 속성 접근 강제
    
- 타입 안전한 key 사용
    
- 매핑 타입과 결합하여 강력한 타입 변환 가능

---
## Lookup Types (조회 타입)
### 1. 개념

객체 타입에서 특정 프로퍼티의 타입을 추출하는 기능.

```ts
type Person = { name: string; age: number };
type AgeType = Person["age"]; // number
```
### 2. 특징

- key를 문자열로 지정
    
- keyof와 함께 사용하면 더 강력해짐

```ts
type ValueOfPerson<T extends keyof Person> = Person[T];
```

---
## Mapped Types (매핑된 타입)

### 1. 개념

객체의 모든 속성을 기반으로 새로운 타입을 생성하는 기능.

```ts
type ReadonlyPerson = {
  readonly [K in keyof Person]: Person[K];
};
```
### 2. 주요 특징

- 타입 변환 자동화
    
- 하나의 객체 구조 기반으로 변형 타입 생성
    
- TypeScript의 핵심 고급 기능 중 하나
### 3. 예: Partial

```ts
type Partial<T> = {
  [K in keyof T]?: T[K];
};
```

---
## Conditional Types (조건부 타입)
### 1. 개념

“타입으로 조건문을 작성한다”고 보면 된다.

```ts
type IsString<T> = T extends string ? true : false;
```
### 2. 특징

- 제네릭 기반 조건부 타입 작성 가능
    
- 복잡한 타입 조건을 표현할 수 있는 매우 강력한 기능
### 3. 실제 예: Exclude

```ts
type Exclude<T, U> = T extends U ? never : T;
```

---
## Template Literal Types (템플릿 리터럴 타입)
### 1. 개념

문자열 리터럴을 조합하여 새로운 문자열 타입 생성.

```ts
type EventName = `on${string}`;
```
### 2. 활용

- 엄격한 문자열 패턴 지정
    
- React style events, CSS property 등에서 매우 유용
### 3. 예시

```ts
type SuccessStatus = "success";
type ErrorStatus = "error";
type Status = `${SuccessStatus}_${ErrorStatus}`; 
// "success_error"
```

---
## Utility Types (유틸리티 타입)

TypeScript 내장 기능으로, 복잡한 타입 변환을 간편하게 해주는 도구들.
### 주요 유틸리티 타입
#### 1. Partial

모든 속성을 optional로 변환

```ts
type PartialUser = Partial<User>;
```
#### 2. Required

모든 속성을 필수로 변환
#### 3. Readonly

모든 속성을 readonly로 변환
#### 4. Pick<T, K>

특정 속성들만 선택

```ts
type UserName = Pick<User, "name">;
```
#### 5. Omit<T, K>

특정 속성들 제외
#### 6. Record<K, T>

동적 key-value 구조 생성

```ts
type Scores = Record<string, number>;
```