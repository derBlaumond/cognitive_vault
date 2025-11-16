## Introduction to Decorators and Enabling Them

_(데코레이터 소개 및 설정 방법)_
### 1. 데코레이터란 무엇인가?

데코레이터는 **클래스, 메서드, 프로퍼티, 파라미터에 추가 기능을 부여하는 함수 기반 메타프로그래밍 도구**이다.

핵심 목적:

- 공통 기능을 재사용성 있게 적용
    
- 로깅, 검증, 권한 체크 같은 “공통 관심사(cross-cutting concerns)” 분리
    
- 원래 코드 로직을 수정하지 않고 기능 확장
    
- 코드를 더 깔끔하고 유지보수하기 쉽게 만듦
    

데코레이터는 **@ 기호로 적용**된다:

```ts
@Logger
class User {}
```
### 2. 데코레이터가 특별한 이유

- “추가 기능”을 **코드 외부**에 정의하고
    
- “대상 요소(클래스/메서드 등)”를 **감싸(wrap)** 확장한다.
    
- 원래 메서드/프로퍼티/클래스는 변경하지 않고, 주변 동작만 추가한다.
    
- Java/Spring의 AOP 느낌과 비슷한 구조.
    

> 즉, “코어 로직은 그대로 두고, 공통 규칙만 확장하는 방식”
### 3. 데코레이터 실행 시점

> 데코레이터는 **런타임 이전, 클래스가 선언되는 시점(Design time)** 에 실행된다.

즉:
- 인스턴스 생성 시점이 아니라, “클래스가 정의될 때” 실행됨
    
- 런타임 코드가 더 가벼워짐
    
- 메타데이터 기반 구조를 미리 준비할 수 있음
### 4. 데코레이터를 활성화하는 방법 (tsconfig.json)

TypeScript에서 데코레이터는 **실험적 기능(Experimental Feature)**로  
**반드시 설정을 켜야 한다.**

```json
{
  "experimentalDecorators": true
}
```

이 설정이 없으면 `@` 문법이 오류를 낸다.

CI, 팀 환경에서도 동일한 설정을 유지해야 한다.
### 5. 데코레이터 종류 (4가지)

|종류|설명|
|---|---|
|**Class Decorator**|클래스 전체에 동작 추가 / 수정|
|**Method Decorator**|메서드 호출 전후 확장 (로깅 등)|
|**Property Decorator**|프로퍼티에 대한 설정, 검증, 메타데이터 추가|
|**Parameter Decorator**|특정 파라미터에 규칙 적용|

각 대상에 따라 적용범위와 기능이 달라지므로, 목적에 맞는 데코레이터를 사용해야 한다.
### 6. 데코레이터가 해결하는 문제들

- 중복 코드 제거
    
- 로깅/검증/권한 같은 공통 관심사 분리
    
- 코드 가독성 증가
    
- 유지보수성 향상
    
- 메타데이터 기반 구조 설계 가능
## TypeScript Decorators

_(데코레이터 구체 설명 및 실전 활용)_
### 1. 데코레이터의 작동 방식

> 데코레이터 = “타겟 요소를 감싸는(wrap) 함수”

즉:

- 데코레이터는 함수
    
- 대상 요소(클래스/메서드/프로퍼티/파라미터)에 붙는다
    
- 대상 요소를 수정하거나 대체하거나, 메타데이터를 추가할 수 있다
### 2. 데코레이터 실전 활용 사례

#### (1) **Class Decorator – 클래스 전체 기능 확장**

예: 인스턴스 자동 등록, 의존성 주입, 초기 설정

```ts
@Register
class User {}
```
#### (2) **Method Decorator – 메서드 동작 확장 (로깅 등)**

예: 메서드가 실행될 때마다 실행 전/후 동작을 삽입

```ts
class UserService {
  @Log
  getUser() { ... }
}
```

활용:

- 실행 시간 측정
    
- 입력/출력 로깅
    
- 권한 체크
#### (3) **Property Decorator – 프로퍼티 규칙 적용**

예:

- 변경 금지
    
- 값 변환
    
- 메타데이터 부착
    

```ts
class Product {
  @Uppercase
  name: string;
}
```
#### (4) **Parameter Decorator – 파라미터 규칙 지정**

예:

- 특정 파라미터가 required
    
- 특정 파라미터의 타입 정보 기록
    
- 프레임워크용 메타데이터 생성
    

```ts
class Controller {
  create(@Body data: any) {}
}
```
### 3. 데코레이터 적용 전후 비교

|요구사항|데코레이터 없이|데코레이터 사용 시|
|---|---|---|
|클래스 레벨 등록|각 클래스 constructor에 직접 입력|@Register만 적용|
|메서드 로깅|모든 메서드 안에 console.log 추가|@Log 하나로 해결|
|property 검증|setter/getter 직접 작성|@Validate로 단일 적용|
|기존 메서드 수정|비즈니스 코드에 로직 섞임|데코레이터로 외부 분리|
### 4. 데코레이터 사용 시 주의사항 / Best Practices

- 남용하지 말 것  
    → 너무 많은 데코레이터는 코드 추적을 어렵게 한다
    
- 공통 기능을 담되, 너무 구체적인 비즈니스 로직은 데코레이터에 넣지 말 것
    
- 데코레이터는 **범용적이고 재사용 가능한 모듈**이어야 한다
    
- 비즈니스 로직은 항상 클래스/메서드 본체에 유지

---
## Type Inference and Strict Type Checking

_(타입 추론 + 엄격 모드)_
### 1. 타입 추론(Type Inference)이란?

타입스크립트 컴파일러가 **명시적 타입을 쓰지 않아도 자동으로 타입을 유추**하는 기능이다.

예:

```ts
let a = 10;  // number로 자동 추론
```

장점:

- 불필요한 타입 작성 감소
    
- 코드 간결
    
- 타입 안정성 유지
### 2. 타입 추론이 적용되는 곳

- 변수 선언
    
- 함수 파라미터
    
- 반환 타입
    
- 구조 분해 할당 등
### 3. Strict Type Checking (엄격 타입 체크)

strict mode = **타입 안정성을 강화하는 옵션 묶음**

대표 옵션:

|옵션|설명|
|---|---|
|**noImplicitAny**|암묵적 any 방지|
|**strictNullChecks**|null/undefined 안전 처리|
|**strictBindCallApply**|call/apply/bind 안전 검사|

엄격 타입 검사는 “실행 전”에 오류를 찾아주므로 대규모 프로젝트에서 필수적이다.
### 4. strict mode의 효과

- 더 안전한 코드
    
- 예측가능한 동작
    
- null 관련 버그 감소
    
- 타입이 숨어 들어가는 실수를 막아줌
    
- 코드 품질 일관 유지
### 5. 이 섹션 핵심 포인트 정리

- 타입 추론은 자동 타입 도구
    
- strict mode는 오류 발생 가능성을 줄이는 보호막
    
- 둘의 조합은 “간결하면서 안전한 코드”를 만든
## Advanced Features in TypeScript

_(고급 타입 기능: Union, Intersection, Narrowing, Special Types)_
### 1. 복잡한 데이터를 모델링하는 방법

TypeScript는 다음 고급 기능을 제공해 복잡한 데이터 구조를 **유연하면서도 안전하게** 표현할 수 있다:

- **Union Types (유니온 타입)**
    
- **Intersection Types (인터섹션 타입)**
    
- **Type Narrowing (타입 좁히기)**
    
- **Special Types (any, unknown, never, void)*

이 기능들은 TypeScript 코드가 커지더라도 **정확성, 가독성, 유지보수성**을 유지하도록 도와준다.
## 1) Union Types (유니온 타입)

### 개념

Union 타입은 **하나의 값이 여러 타입 중 하나가 될 수 있음**을 의미한다.

```ts
let value: string | number;
```
### 장점

- 유연하면서도 타입 안정성 유지
    
- 비즈니스 로직에서 다양한 입력을 자연스럽게 처리 가능
    
- JS의 “너무 자유로운 타입”을 TS의 “안전한 자유”로 변환
### 사용 시 패턴

→ 꼭 narrowing(타입 좁히기)로 실제 타입을 확인해야 한다.

```ts
function print(v: string | number) {
  if (typeof v === "string") console.log(v.toUpperCase());
  else console.log(v.toFixed(2));
}
```
## 2) Intersection Types (인터섹션 타입)

### 개념

인터섹션은 **여러 타입을 하나로 결합**하여, 모든 조건을 만족해야 한다.

```ts
type Manager = { name: string };
type Admin = { permissions: string[] };
type Lead = Manager & Admin;
```

Lead는 **두 역할 모두** 충족해야 한다.
### 장점

- 컴포지션 기반 타입 설계
    
- 역할(role) 조합, 기능 조합 패턴 작성에 유용
    
- 객체 기반 도메인 모델링에 매우 강력
## 3) Type Narrowing (타입 좁히기)
### 개념

런타임 조건을 통해 유니온 타입을 **하위 타입으로 좁혀 안전하게 사용**하는 과정.
### 주요 도구

- `typeof`
    
- `instanceof`
    
- `"key" in obj`
    
- 사용자 정의 type guard

예:

```ts
function handle(v: string | number) {
  if (typeof v === "string") return v.length;
  return v * 2;
}
```
### Narrowing의 핵심

- TypeScript가 “조건문을 읽고”
    
- 변수의 가능한 타입을 자동으로 좁혀줌
    
- 안전한 코드 작성 가능
    
- 비즈니스 로직의 의도를 더 명확하게 표현

## 4) Special Types

_(any, unknown, never, void)_

### any

- 모든 타입 허용
    
- 타입 검사 해제
    
- 사용 시 안전성 크게 떨어짐  
    → **최후의 수단**
### unknown

- any보다 안전한 대안
    
- 사용할 때 **반드시 narrowing** 필요

```ts
let data: unknown = "hello";
if (typeof data === "string") data.toUpperCase();
```
### never

- 절대 발생하지 않는 값
    
- 예외 발생 함수, 무한 루프
    
- exhaustive check에서 매우 유용
### void

- 반환값 없는 함수
    
- “side-effect 전용 함수” 명시
## 요약

유니온 / 인터섹션 / 타입 좁히기 / special types를 올바르게 사용하면  
대규모 복잡한 시스템에서도 타입 안정성을 유지하면서 유연하게 모델링할 수 있다.

---
## Type System Features

_(타입 시스템 구성요소 전체 요약)_

이 섹션은 TypeScript 타입 시스템의 핵심 기능을 포함한 **최종 요약**이다.
### 1. 타입 시스템의 목적

- 더 안전한 코드
    
- 더 예측 가능한 구조
    
- 데이터의 “shape”을 명확하게 정의
    
- 런타임 오류를 컴파일 단계에서 차단
    
- 협업 시 일관성 제공
# 1) **Type Inference & Strict Checking**

### 타입 추론

- 변수/함수/반환 타입을 자동으로 유추
    
- 불필요한 타입 선언 감소
    
- 가독성 증가
    

### Strict Checking (엄격 모드)

- strictNullChecks
    
- noImplicitAny 등  
    → 실수와 버그를 조기에 차단
    

강한 타입 설정은 “품질 높은 코드”를 작성하도록 개발자를 유도한다.

---

# 2) **Union & Intersection Types**

### Union

- 하나의 값이 여러 옵션 중 하나
    
- 다양한 데이터 패턴에 적합
    
- narrowing과 함께 사용해야 안전
    

### Intersection

- 여러 타입을 하나로 합성
    
- 복합 역할/모델 설계에 최적
    
- 컴포지션 기반 설계 철학과 잘 맞음
    

---

# 3) **Type Narrowing**

### Narrowing 적용 요소

- 조건문
    
- typeof / instanceof
    
- in 연산자
    
- 사용자 정의 type guard
    

TypeScript의 핵심 기능 중 하나로,  
“실행 흐름을 분석해 타입을 자동으로 좁히는 기능”이다.

---

# 4) **Special Types**

|타입|의미|
|---|---|
|any|타입 검사 없음 (위험)|
|unknown|안전한 any|
|never|절대 발생하지 않는 값|
|void|값 반환 없음|

---

# 5) **실전 적용**

- 다양한 입력 값을 처리해야 하는 API
    
- 복잡한 역할 기반 모델(User + Admin 등)
    
- 비동기 흐름에서의 타입 안전성 강화
    
- 외부 데이터(validation 필수) 처리
    

이 기능들을 적절히 조합하면,  
코드가 커질수록 오히려 더 정교하고 유지보수하기 쉬운 구조를 만들 수 있다.