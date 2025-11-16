## Overview of Built-in Utility Types

_(빌트인 유틸리티 타입 개요)_
### 1. 유틸리티 타입의 목적

TypeScript는 타입을 단순히 정의하는 것을 넘어서,  
**타입을 재구성(reshape)** 하고  
**특정 목적에 맞게 변형(transform)** 할 수 있게 하는 내장 유틸리티 타입들을 제공한다.

핵심 목적:

- 기존 타입을 다시 작성하지 않고 “조합·변형”
    
- 유지보수성과 일관성 향상
    
- 반복되는 boilerplate 제거
    
- 컴파일 단계에서 안전성 강화
    
- 런타임 비용 없음 (모두 타입 시스템에서만 동작)
### 2. 왜 유틸리티 타입이 중요한가

실제 대규모 시스템에서는 다음 일이 반복된다:

- 일부 필드만 optional하게 쓰고 싶다
    
- 전체 필드를 readonly로 만들고 싶다
    
- 특정 필드만 선택적으로 가져오고 싶다
    
- 함수의 return type을 자동으로 추출하고 싶다
    
- union 타입에서 특정 타입만 제외하고 싶다

이걸 매번 새 타입으로 다시 정의하면:

- 중복 증가
    
- 변경 시 위험 증가
    
- 가독성 저하

그래서 **유틸리티 타입이 필수적 도구**가 된다.
### 3. Utility Types의 전체 맥락

유틸리티 타입은 다음을 제공한다:

- Optionality 제어: Partial, Required
    
- Immutability 제어: Readonly
    
- Object 구조 변형: Pick, Omit, Record
    
- Union 필터링: Exclude, Extract
    
- Function 타입 분석: ReturnType, Parameters
    
- 문자열 패턴 모델링
    
- 비동기 결과 표현(예: Awaited)

또한 다음 특징을 가진다:

- shallow transformation (얕은 변환 → nested 구조는 별도 처리 필요)
    
- 입력 타입이 정확히 정의되어 있어야 안정적으로 동작
    
- 타입 안정성 유지하면서 선언형(declarative)으로 변형 가능
### 4. Object-shape 유틸리티

이 그룹은 객체 형태를 변형하는 도구다.
#### Partial

모든 필드를 optional로 만들기  
→ 초기 빌드 단계, 폼 입력 단계 등에 유용
#### Required

모든 필드를 필수로 만들기  
→ API의 응답/도메인 데이터의 완전성 보장
#### Readonly

모든 필드를 읽기 전용으로 만들어 불변성 강화  
→ 설정값(config), 상수(constant) 관리에 유용

이들은 상호 반대 속성을 지닌다.

### 5. Pick / Omit / Record
#### Pick<T, K>

T에서 특정 key만 선택
#### Omit<T, K>

T에서 특정 key만 제외
#### Record<K, T>

모든 key가 동일한 타입을 가지는 딕셔너리 구조 생성  
→ 다국어 번역 key, status mapping, id-value map 등에 자주 사용
### 6. Union에 대한 제어: Exclude / Extract
#### Exclude<T, U>

유니온에서 U를 제거한 나머지를 반환
#### Extract<T, U>

유니온에서 U에 해당하는 부분만 추출

→ 복잡한 union 타입 모델링에서 매우 강력
### 7. Function Introspection: ReturnType / Parameters
#### ReturnType

함수 반환 타입 추출
#### Parameters

함수의 파라미터 타입을 tuple 형태로 추출

→ 리팩토링시 타입과 코드가 항상 일치하도록 유지하는 핵심 도구
### 8. Nullability를 제어하는 Helpers

여러 유틸리티가 널/옵셔널을 관리한다:

- NonNullable
    
- Awaited
    
- Required
    
- Extract<...> 기반 분기

이런 도구들은 null / undefined 처리 논리를 더 명확하게 만든다.
### 9. Discriminated Union(태그 기반 분기)의 기여

각 union member에 `"type"` 또는 `"kind"` 같은 literal tag를 추가하면 타입 시스템이:

- 정확한 분기(branch) 판단
    
- 안전한 narrowing
    
- exhaustiveness check (누락된 분기 감지)
    

를 가능하게 한다.

---
## Built-in Utility Types

_(유틸리티 타입 상세 설명)_

이 섹션은 다시 한번 주요 유틸리티 타입을 functional grouping으로 자세히 설명한다.
### 1. Object Property Adjustments

#### Partial

필드를 optional 처리  
단계별 객체 생성, patch 데이터 처리 등에 사용
#### Required

모든 필드를 필수로 강제  
서버에서 온 전체 데이터 보장 시 유용
#### Readonly

재할당 방지  
설정값, 초기화 이후 불변값에서 사용

→ Optional / Required / Readonly는 “제어 레벨”을 바꾸는 도구다.
### 2. Object Structure Transformations
#### Pick<T, K>

필요한 속성만 골라내 바운더리 객체(APIs, DTOs)를 만들 때 유용
#### Omit<T, K>

특정 속성을 제외  
민감 데이터 제거(예: password)에서 자주 사용
#### Record<K, T>

key-value dictionary 생성

```ts
type Flags = Record<'info' | 'warning' | 'error', boolean>
```
### 3. Function and Union Helpers
#### ReturnType

함수의 반환 타입을 동적으로 얻는 도구  
→ 함수 변경 시 타입도 자동으로 업데이트됨
#### Parameters

함수의 인자 타입 tuple을 얻음
#### Exclude<T, U>

유니온에서 특정 타입 제거
#### Extract<T, U>

유니온에서 특정 타입만 추출
### 4. 주의해야 할 점

- Partial과 Readonly는 너무 넓게 적용하면 오히려 개발을 어렵게 만들 수 있음
    
- 내장 유틸리티는 결합해 사용할 때 매우 강력
    
- ReturnType/Parameters는 리팩토링 안정성을 극대화
    
- Record는 구조가 단순한 mapping에서 이상적

---
## Conditional Types and the `infer` Keyword

_(조건부 타입 + infer 키워드)_
### 1. 조건부 타입(Conditional Types)이란?

조건부 타입은 타입 시스템에서 **if-else 로직을 구현하는 문법**이다.

형식:

```ts
T extends U ? X : Y
```

의미:

- T가 U를 만족하면 → X
    
- 만족하지 않으면 → Y
    

예:

```ts
type IsString<T> = T extends string ? true : false;
```
### 2. 조건부 타입의 실제 활용

#### (1) 기본 조건 분기

```ts
type ToArray<T> = T extends any ? T[] : never;

type A = ToArray<number>; // number[]
```
#### (2) 유니온 타입 처리

Conditional Types는 **유니온 타입에 대해 분배적(distributive)** 특성을 가진다.

```ts
type A = string | number;
type R = A extends string ? “YES” : “NO”;
// = “YES” | “NO”
```

→ 이 특징 덕분에 복잡한 유니온 타입을 필터링하거나 변환할 수 있다.
### 3. infer 키워드

infer는 “타입을 추론해서 변수로 꺼내라”는 뜻이다.

가장 자주 쓰는 형태:

```ts
T extends Promise<infer R> ? R : T
```

Promise 안의 타입을 꺼낼 때 사용.
### 4. infer를 이용한 ReturnType 직접 구현

TypeScript 내장 ReturnType은 다음과 같은 조건부 타입으로 만들어져 있다:

```ts
type MyReturnType<T> =
  T extends (...args: any[]) => infer R
    ? R
    : never;
```

→ infer R 부분에서 함수의 반환 타입을 자동으로 추론함.
### 5. infer로 Promise 내부 타입 꺼내기

```ts
type UnwrapPromise<T> =
  T extends Promise<infer R> ? R : T;

type A = UnwrapPromise<Promise<number>>; // number
type B = UnwrapPromise<string>;          // string
```
### 6. 왜 중요한가?

Conditional Types + infer 조합은 다음을 가능하게 한다:

- API 응답 타입 추출
    
- 비동기 로직 타입 자동화
    
- 제네릭 기반 라이브러리 개발
    
- 복잡한 union 타입을 “분해 → 재조합”
    

현대 TypeScript 라이브러리(React, Zod, Prisma 등)의 70%가 이 기법으로 만들어져 있다.

---
## Type Transformation

_(타입 변환: 매핑 + 조합 + 조건부 변환)_
### 타입 변환의 핵심 원리

타입 변환(Type Transformation)은 아래 세 요소를 조합하여 이루어진다:

- **Mapped Types** (매핑 타입)
    
- **Keyof / Lookup Types**
    
- **Conditional Types**
    
- **Utility Types**
    
- **infer 기반 추론**

이 조합을 통해, TypeScript는 **데이터 구조를 직접 변형할 수 있는 강력한 타입 시스템**을 만든다.
### 1. 매핑 타입 기반 변환

```ts
type Mutable<T> = {
  -readonly [K in keyof T]: T[K];
};
```

→ readonly 제거
### 2. optional / required 변환

```ts
type AllRequired<T> = {
  [K in keyof T]-?: T[K];
};
```

→ optional 속성 제거
### 3. Union 필터링: Exclude

```ts
type RemoveBoolean<T> = Exclude<T, boolean>;
```
### 4. 특수 타입 제어

```ts
type NonNull<T> = T extends null | undefined ? never : T;
```
### 5. Deep transformation (재귀 변환)도 가능

```ts
type DeepReadonly<T> = {
  readonly [K in keyof T]: T[K] extends object
    ? DeepReadonly<T[K]>
    : T[K];
};
```

→ 중첩된 object 전체 readonly로 변환
### 6. 실제 적용 예

#### API 응답 모델 변환

- 서버에서 받은 타입 → Optional 제거
    
- Partial로 만든 patch 타입
    
- DTO 변환
    
- 비동기 응답 타입 자동 추출
    
- 특정 필드만 선택적 가공
    

→ 대규모 백엔드-프론트엔드 시스템에서 매우 중요

---
## What Are Type Guards and Why They Matter

_(타입 가드: 안전한 narrowing 도구)_
### 1. 타입 가드(Type Guard)란?

조건문 안에서 특정 타입이라고 **확정하는 역할**을 하는 함수.

예:

```ts
function isString(value: unknown): value is string {
  return typeof value === "string";
}
```
### 2. Type Guard의 형식

반환 타입이 아래와 같은 형태여야 한다:

```
value is SomeType
```

이 표현이 있으면 TS 컴파일러는:

- 이 함수가 true면 value는 SomeType임
    
- false면 그 타입이 아님
    

을 정확히 이해한다.
### 3. 왜 필요한가?

다음 상황에서 필수:

- unknown 타입 처리
    
- API 응답 검증
    
- 런타임 타입에 따라 분기하는 로직
    
- union 타입 narrowing
    
- 타입 안전한 error handling
### 4. 예: 유니온 타입 narrowing

```ts
type Animal = Dog | Cat;

function isDog(a: Animal): a is Dog {
  return (a as Dog).bark !== undefined;
}

function speak(a: Animal) {
  if (isDog(a)) a.bark();
  else a.meow();
}
```
### 5. 사용자 정의 Type Guard의 장점

- 복잡한 runtime 검사 로직을 함수로 묶고
    
- 타입 시스템과 자동으로 연결
    
- 조건문을 안전하고 깔끔하게 유지
---
## Error Handling with Types

_(타입 기반 에러 처리 전략)_
### 1. 전통적 error 처리 문제

일반적으로 error를 throw하거나 try/catch로 처리하는데:

- 타입이 섞임
    
- 함수가 무엇을 반환하는지 명확하지 않음
    
- error 문자열 의존
    
- 런타임에서만 문제 발견
### 2. 타입 기반 에러 모델 사용하기

TypeScript는 error를 타입으로 모델링할 수 있다.

예:

```ts
type Success<T> = { ok: true; value: T };
type Failure<E> = { ok: false; error: E };

type Result<T, E> = Success<T> | Failure<E>;
```

→ Rust의 Result 패턴
### 3. 장점

- 에러도 타입으로 관리 → 예측 가능
    
- 모든 경우를 exhaustive check로 커버 가능
    
- 런타임이 아닌 컴파일 단계에서 누락 감지
    
- 팀 협업 시 API 일관성 확보
### 4. 예시

```ts
function parseJSON(s: string): Result<any, string> {
  try {
    return { ok: true, value: JSON.parse(s) };
  } catch {
    return { ok: false, error: "Invalid JSON" };
  }
}

const r = parseJSON(str);

if (r.ok) {
  console.log(r.value);
} else {
  console.log(r.error);
}
```
### 5. 이 방식의 실제 활용

- API result 처리
    
- Validation 결과
    
- 비동기 로직에서 에러 타입 구분
    
- 함수형 스타일 코드 분기