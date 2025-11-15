## How to Declare a Function

### 1. 함수란 무엇인가

TypeScript에서 함수는 **특정 작업을 수행하기 위한 독립적인 코드 블록**이다.  
함수는 다음과 같은 장점을 가진다:

- **코드 재사용성 증가**
    
- **구조적 프로그램 구성 용이**
    
- **여러 입력을 받아 실행 가능**
    
- **결과값을 반환할 수도 있고, side effect만 수행할 수도 있음**
    

TypeScript에서는 다양한 형태의 함수가 존재한다:

- **Named Function(이름 있는 함수)**
    
- **Anonymous Function(익명 함수)**
    
- **Arrow Function**
    

각 형태는 상황에 따라 다른 사용 목적을 가진다.

---

### 2. 기본 용어 정리

- **Function Declaration(함수 선언)**
    
    - 함수 이름, 입력 파라미터, 구조를 코드에 도입하는 문장
        
- **Function Definition(함수 정의)**
    
    - 함수 내부의 **구체적 실행 로직(body)**
        
- **Function Call(함수 호출)**
    
    - 함수를 실행시키는 동작
        
    - 입력값(Arguments)을 전달할 수 있음
        

이 용어들을 이해하는 것은 TypeScript 함수 구조를 명확하게 이해하는 데 필수적이다.

---

### 3. 함수 선언 Syntax

함수 선언 형태:

```ts
function functionName(param1: type, param2: type): returnType {
  // function body
}
```

- `function` 키워드로 시작
    
- 함수 이름 뒤에 `()` 안에 파라미터와 타입을 작성
    
- `{}` 안에 실제 코드 작성
    
- TypeScript는 파라미터 타입을 통해 **정적 타입 검사**를 수행하면서 오류를 예방함
    

함수 선언을 숙달하는 것은 TypeScript 애플리케이션의 유지보수성과 예측 가능성을 높이는 핵심 스킬이다.

---

# ## Types of Functions

_(함수의 종류: Named, Anonymous, Arrow Functions)_

### 1. Named Function (이름 있는 함수)

특징:

- 선언과 함께 이름을 가진 함수
    
- 이름을 통해 호출
    
- 프로젝트 내에서 재사용성이 매우 높음
    
- 가독성과 유지보수성 증가
    

예시:

```ts
function multiply(a: number, b: number): number {
  return a * b;
}
```

호출 시:

```ts
multiply(10, 20); // 200
```

Named Function은 **클래스 메서드**, **공용 유틸 함수**, **핵심 로직 구현** 등에서 자주 사용된다.

---

### 2. Anonymous Function (익명 함수)

특징:

- 이름 없이 **변수에 저장하여 사용**
    
- inline callback, event handler, 비동기 흐름 등에서 자주 사용
    

예:

```ts
const division = function(a: number, b: number): number {
  return a / b;
};
```

호출:

```ts
division(35, 5); // 7
```

특징 요약:

- “특정 한 번의 동작”에 적합
    
- 재사용보다는 **특정 위치에서 즉시 활용**되는 함수 패턴
    

---

### 3. Arrow Function (화살표 함수)

화살표 함수는 익명 함수의 최신·간결한 버전:

```ts
const greet = (name: string): string => {
  return `hi ${name}`;
};
```

장점:

- 가장 간결한 함수 문법
    
- functional programming 패턴(map, filter, forEach 등)에 적합
    
- 가장 중요한 특징 → **this 바인딩을 선언 위치의 lexical this로 유지**
    

이는 클래스 내부 이벤트 핸들러나 비동기 콜백에서 매우 유리하다.

---

# ## Default and Optional Parameters

_(기본값 파라미터 & 선택적 파라미터)_

### 1. Optional Parameters (선택적 파라미터)

파라미터 뒤에 `?` 를 붙여 optional 지정:

```ts
function add(x: number, y?: number) {
  return x + (y ?? 0);
}
```

특징:

- 값이 전달되지 않을 수 있음
    
- 내부에서 값 존재 여부 체크 필요
    
- NaN을 방지하고, 함수의 다양한 호출 방식을 허용
    

---

### 2. Default Parameters (기본 매개변수)

값이 전달되지 않으면 지정된 기본값을 사용:

```ts
function add(x: number, y: number = 20) {
  return x + y;
}
```

장점:

- 불필요한 `if (!y)` 체크 제거
    
- 명확한 기본 동작 정의 가능
    
- 코드를 깔끔하게 유지
    

Optional vs Default 비교:

|방식|의미|
|---|---|
|Optional (?)|값이 올 수도 있고 안 올 수도 있음|
|Default|값이 없으면 기본값 자동 할당|

---

# ## Custom Parameters and Return Types

_(사용자 정의 파라미터/반환 타입)_

### 1. Type Alias를 활용한 복잡한 구조 관리

Type Alias(타입 별칭)을 통해 복잡한 객체 구조를 한 번 정의하면  
다양한 함수에서 재사용할 수 있음.

예:

```ts
type Person = {
  name: string;
  age: number;
  email: string;
};
```

이제 함수에서:

```ts
function processPerson(p: Person): Person {
  // ...
}
```

장점:

- 데이터 구조가 통일됨
    
- 팀 개발에서 구조 변경 시 전체 코드 유지보수 용이
    
- 타입 안정성 증가
    

---

### 2. Enum을 함께 사용한 안전성 강화

예:

```ts
enum AgeUnit {
  Years,
  Months
}
```

적용한 Person 구조:

```ts
type Person = {
  name: string;
  age: number;
  ageUnit: AgeUnit;
  country: string;
};
```

Enum 사용 이점:

- 문자열 오타 제거
    
- 제한된 값만 사용할 수 있어 안정성이 증가
    

---

### 3. 함수의 입력과 출력 모두를 Type Alias로 강제

입력·출력 모두에 타입을 적용:

```ts
function convertAge(p: Person): Person {
  return {
    ...p,
    age: p.age * 12,
    ageUnit: AgeUnit.Months
  };
}
```

장점:

- 반환값의 형태 보장
    
- 팀원이 작성한 함수라도 안정적으로 사용할 수 있음
    
- 대규모 프로젝트에서 예상치 못한 타입 구조 변화 방지
    

---

# ## Function Signature

_(함수 시그니처 - 함수 형태를 타입으로 정의)_

### 1. 함수 시그니처의 목적

함수 시그니처는 **함수가 어떤 입력을 받고 어떤 타입을 반환하는지 규약(Contract)을 정의**한다.

예:

```ts
type Greet = (msg: string) => string;
```

이제 이 타입을 가진 객체는 항상 같은 형태의 greet 함수를 가져야 한다.

---

### 2. 객체 내 함수 정의 시 활용

```ts
type Person = {
  name: string;
  greet: (msg: string) => string;
};
```

이제 Person 타입을 만족하려면 greet이 반드시 위 시그니처를 충족해야 한다.

---

### 3. 함수 시그니처를 Type Alias로 재사용

```ts
type GreetFunction = (msg: string) => string;

type User = {
  name: string;
  greet: GreetFunction;
};
```

이제 다양한 객체가 동일한 함수 형식을 공유할 수 있어  
복잡한 구조를 가지는 프로젝트에서도 **통일된 API**를 유지할 수 있다.

---
# ## Void and Never Types in Functions

_(함수에서의 void & never)_

### 1. void

void는 **함수가 값을 반환하지 않음을 의미**한다.

```ts
function log(message: string): void {
  console.log(message);
}
```

특징:

- return 문이 없거나
    
- return; 만 있을 때 사용
    
- 실제 JS에서는 `undefined` 반환
    

---

### 2. never

never는 **함수가 정상적으로 종료되지 않음을 의미**한다.

예:

- 예외를 던지는 함수
    
- 무한 루프 함수
    

```ts
function throwError(msg: string): never {
  throw new Error(msg);
}

function infiniteLoop(): never {
  while (true) {}
}
```

never를 반환 타입으로 명시하는 목적:

- 제어 흐름상 절대 도달해서는 안 되는 영역을 확인
    
- exhaustive checking과 함께 사용해야 함
    

---

# ## Async Functions in TypeScript

_(비동기 함수)_

### 1. async 함수는 자동으로 **Promise 타입**을 반환

```ts
async function greet(): Promise<string> {
  return "Hello";
}
```

### 2. await는 **Promise를 해제한 값**을 반환

```ts
async function example() {
  let result = await greet(); // string
}
```

### 3. async 함수 내부에서 error 발생 → rejected Promise

따라서 async 함수도 try/catch가 필수적인 상황이 많음.

---

# ## Rest Parameters and the Arguments Object

_(rest 파라미터 & arguments)_

### 1. arguments — 비추천

arguments는 **유사 배열(Liked Array)**  
→ 타입이 any  
→ TS에서 안전하지 않음

```ts
function test() {
  console.log(arguments);
}
```

### 2. Rest Parameters — 권장

```ts
function sum(...nums: number[]) {
  return nums.reduce((a, c) => a + c, 0);
}
```

장점:

- 올바른 타입 지정 가능
    
- 실제 배열
    
- map/filter 등 고급 배열 메서드 사용 가능
    

---

# ## Parameter Destructuring

_(파라미터 구조분해)_

### 1. 구조분해와 타입을 함께 작성

```ts
function formatUser({ name, age }: { name: string; age: number }) {
  return `${name} (${age})`;
}
```

### 2. 객체나 배열 데이터를 깔끔하게 다룰 때 매우 유용

React, Express, NestJS에서도 자주 사용되는 패턴.

---

# ## Function Overloading in TypeScript

_(함수 오버로딩)_

### 1. 개념

TypeScript는 JS와 달리 **여러 개의 함수 시그니처를 선언하여 하나의 함수 구현에서 처리**할 수 있다.

### 2. 예시 (문자열 → 배열 or 숫자 → 배열)

#### 오버로드 시그니처들:

```ts
function getUsers(value: string): string[];
function getUsers(value: number): number[];
```

#### 실제 구현:

```ts
function getUsers(value: any): any[] {
  return [];
}
```

### 3. 특징

- 구현부에는 하나의 함수만 존재
    
- 컴파일 타임에 “사용 가능한 시그니처들”을 기반으로 타입 체크
    
- 런타임에서는 JS처럼 하나의 함수만 실행됨
    

---

# ## Implementing Function Overloading

_(오버로딩 구현 방법)_

### 1. 여러 개의 오버로드 시그니처 작성 → 하나의 구현부 작성

예:

```ts
function getDetails(id: number): string;
function getDetails(name: string): string;
function getDetails(value: any): string {
  return `Details for ${value}`;
}
```

### 2. 내부에서 type narrowing을 사용하여 처리 분기

```ts
if (typeof value === "number") {
  // number 처리
} else {
  // string 처리
}
```

### 3. 잘못된 시그니처 호출을 컴파일 단계에서 막을 수 있음

예:

```ts
getDetails(true); 
// 오류! 올바른 오버로드 시그니처 없음.
```

---

# ## What Are Generics?

_(제네릭이란?)_

### 1. 정의

Generics는 **타입을 파라미터화하는 문법**  
→ “함수/클래스/타입”이 다양한 타입을 유연하게 다룰 수 있게 해준다.

Java의 제네릭, C#의 제네릭과 동일 개념.

### 2. 문제 해결

제네릭이 없다면 다음과 같은 일이 발생:

- 타입을 any로 처리해야 함
    
- 타입 안정성을 잃음
    
- 코드 재사용 어려움
    

제네릭을 쓰면:

- 함수가 받는 타입을 **호출 시점**에 결정
    
- 타입 안전성 유지
    
- 재사용성 증가
    

---

# ## Generic Function Declarations

_(제네릭 함수 선언)_

### 1. 기본 형태

```ts
function identity<T>(value: T): T {
  return value;
}
```

매개변수 타입과 반환 타입이 동일하게 “호출된 타입”에 따라 결정됨.

### 2. 호출 방법

#### (1) 타입 직접 지정

```ts
identity<number>(10);
```

#### (2) 타입 추론

```ts
identity("hello"); // T는 자동으로 string
```

### 3. 장점

- any보다 안전
    
- 코드 중복 제거
    
- 다양한 데이터 구조에 재사용 가능
    

---

# ## Generics and Constraints with Arrays

_(배열과 제네릭 & 제약조건)_

### 1. 기본 예시

```ts
function getFirstElement<T>(arr: T[]): T {
  return arr[0];
}
```

### 2. 제한(Constraints) 주기

특정 조건을 만족하는 타입만 받도록 제한할 수 있다.

```ts
function printLength<T extends { length: number }>(value: T) {
  console.log(value.length);
}
```

적용 가능한 타입:

- string
    
- 배열
    
- length가 있는 커스텀 객체
    

이렇게 "extends" 제약을 걸면, T가 반드시 length 프로퍼티를 가진 객체만 가능하도록 제한된다.

---

# ## Generics with Objects

_(객체 기반 제네릭)_

### 1. 객체를 타입 파라미터로 받기

```ts
function getProp<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}
```

위 함수는 TypeScript 제네릭의 정점 중 하나다.

특징:

- obj의 key만 인자로 허용
    
- key에 따른 정확한 값의 타입 반환
    

### 2. 잘못된 key 사용 시 컴파일 오류

```ts
getProp({ name: "Alice" }, "age"); 
// 오류: age는 존재하지 않음
```

---

# ## Polymorphic Functions

_(다형성 함수)_

제네릭은 함수가 다양한 타입에서 동작하면서도  
정확한 타입을 유지할 수 있게 만든다.

```ts
function wrapInArray<T>(value: T): T[] {
  return [value];
}
```

다형성 특징:

- T가 number → number[]
    
- T가 string → string[]
    
- T가 Person → Person[]
    

실제 값의 타입이 무엇이든 “일관된 동작”을 수행할 수 있다.

---

# ## Function Overloading vs Generics

_(오버로딩 vs 제네릭)_

### 공통점

- 둘 다 다양한 타입을 다루기 위한 기능
    

### 차이

|기능|기능 설명|장점|단점|
|---|---|---|---|
|**Function Overloading**|여러 개의 시그니처 제공|각 타입별 명확한 로직 분기 가능|시그니처가 많아지면 복잡해짐|
|**Generics**|타입을 파라미터화|유연함, 중복 제거|타입 제약을 잘못 걸면 오류 증가|

### 정리

- **입력 타입별 완전히 다른 처리 로직 → 오버로딩**
    
- **유연한 타입 재사용 / 공통 동작 → 제네릭**
    

---

# ## Generic Interfaces

_(제네릭 인터페이스)_

### 1. 인터페이스에 제네릭 적용

인터페이스는 객체의 구조를 정의하는데, 여기에 제네릭을 도입하면  
**여러 형태의 객체에 대해 유연한 구조**를 만들 수 있다.

```ts
interface Box<T> {
  value: T;
}
```

사용:

```ts
let numberBox: Box<number> = { value: 10 };
let stringBox: Box<string> = { value: "hello" };
```

### 2. 제네릭 인터페이스의 장점

- 다양한 타입을 하나의 인터페이스로 대응
    
- 재사용성↑
    
- API 응답/요청 모델링 시 매우 유용
    
- 타입 안정성 유지
    

### 3. 함수 타입을 포함한 제네릭 인터페이스

```ts
interface Wrapped<T> {
  item: T;
  transform: (v: T) => T;
}
```

객체 형태의 일관성을 유지하면서도 다양한 타입에서 활용 가능하다.

---

# ## Generic Classes

_(제네릭 클래스)_

### 1. 클래스도 제네릭을 사용할 수 있음

```ts
class DataHolder<T> {
  constructor(public value: T) {}
  getValue(): T {
    return this.value;
  }
}
```

사용:

```ts
const userData = new DataHolder<string>("John");
const numData = new DataHolder<number>(100);
```

### 2. 제네릭 클래스의 특징

- 클래스 레벨에서 타입을 고정
    
- 멤버 변수, 메서드 모두 해당 타입을 따름
    
- 재사용성 극대화
    

### 3. 복잡한 데이터 모델링에 유용

예: Repository 패턴, Cache 클래스, APIClient 등.

---

# ## Generic Constraints (extends 키워드)

_(제네릭 제약조건)_

### 1. 제약 조건이 필요한 이유

제네릭을 너무 자유롭게 허용하면 타입 안전성이 떨어짐 →  
이를 방지하기 위해 제약 조건 사용.

### 2. 기본 구조

```ts
function logLength<T extends { length: number }>(value: T) {
  console.log(value.length);
}
```

가능한 값:

- string
    
- array
    
- length 프로퍼티가 있는 객체
    

### 3. 여러 제약 결합

```ts
function merge<T extends object, U extends object>(a: T, b: U) {
  return Object.assign(a, b);
}
```

### 4. key 제한 (extends keyof)

```ts
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}
```

TypeScript 제네릭 시스템에서 가장 중요한 패턴 중 하나다.

---

# ## Using keyof with Generics

_(keyof를 활용한 제네릭)_

### 1. keyof로 객체의 key를 union 타입으로 얻음

```ts
type Person = { name: string; age: number };
type Keys = keyof Person; // "name" | "age"
```

### 2. 제네릭과 조합

```ts
function pick<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}
```

- key가 존재하는 경우에만 접근 허용
    
- 타입 안전성 극대화
    
- 다양한 라이브러리가 이 패턴을 기본으로 사용
    
    - 예: Redux Toolkit, Prisma, TypeORM 등
        

---

# ## Conditional Types with Generics

_(제네릭 기반 조건부 타입)_

### 1. 기본 개념

Conditional type은 타입 레벨 if-else.

```ts
type IsString<T> = T extends string ? true : false;
```

### 2. 제네릭과 결합하여 강력한 타입 변환 가능

```ts
type ReturnTypeOrNever<T> =
  T extends (...args: any[]) => infer R ? R : never;
```

### 3. infer 키워드

infer는 “타입을 추론하라”는 의미.

예:

```ts
type Unpacked<T> = T extends Promise<infer R> ? R : T;
```

사용:

```ts
type A = Unpacked<Promise<string>>; // string
type B = Unpacked<number>;          // number
```

조건부 타입 + infer는 고급 TS 라이브러리 구현의 핵심이다.

---

# ## Utility Types with Generics

_(제네릭 기반 유틸리티 타입)_

이 섹션에서는 TypeScript가 내장 제공하는 유틸리티 타입이  
사실상 모두 “제네릭 + 조건부 타입 + 매핑 타입”의 조합으로 구현되어 있다는 사실을 다룬다.

### 1. Partial

모든 속성을 optional로 변환

```ts
type PartialUser = Partial<User>;
```

### 2. Required

모든 속성을 필수(required)로 변환

### 3. Readonly

모든 속성을 읽기 전용으로 변환

### 4. Record<K, T>

key/value 매핑 타입 생성

```ts
type Scores = Record<string, number>;
```

### 5. Pick<T, K>

특정 속성만 선택

### 6. Omit<T, K>

특정 속성들 제외

---

# ## Putting It All Together

_(모든 개념 종합)_

이 마지막 섹션은 원문에서 전체 내용을 요약하며 다음을 강조한다:

### 1. 함수는 TypeScript의 중심

- 타입 지정된 입력/출력
    
- optional / default / rest parameters
    
- 함수 시그니처 정의로 구조 명확화
    

### 2. 오버로딩

- 타입별로 다른 동작을 제공해야 할 때 사용
    

### 3. 제네릭

- 코드 재사용 극대화
    
- 타입 안전성 유지
    
- 객체/배열/클래스/인터페이스 모든 곳에서 활용 가능
    
- 제약 조건(extends)을 통해 더욱 안전한 구조 설계 가능
    

### 4. 제네릭 + keyof + infer + 조건부 타입

이 조합이 가능해지면 TS의 “고급 타입 시스템”을 완전히 이해한 상태가 된다.

→ 실제 프레임워크(React, Angular, NestJS, Prisma, Redux Toolkit 등)의 타입 시스템이 바로 이 조합을 기반으로 만들어져 있다.

### 5. 전체 코드 품질의 향상

- 런타임 버그 감소
    
- 팀 협업 효율 증가
    
- IDE 자동완성 강화
    
- 프로젝트 구조가 단단해짐
    
