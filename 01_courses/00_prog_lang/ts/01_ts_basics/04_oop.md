## Introduction to Classes, Properties, and Methods
_(클래스, 프로퍼티, 메서드 소개)_
### 1. 클래스의 개념

클래스는 **객체를 만들기 위한 설계도(blueprint)**이다.  
집을 짓기 위해 설계도가 필요하듯, 객체를 만들기 위해 클래스가 필요하다.

클래스는 다음 두 요소를 묶어서 표현한다:

- **Properties(속성)**: 객체가 가진 데이터
    
- **Methods(메서드)**: 객체가 수행할 행동

TypeScript에서 클래스는 단순히 구조만 정의하는 것이 아니라, **타입**으로도 동작한다.  
따라서 클래스 기반으로 생성되는 객체는 일정한 형태를 반드시 따라야 한다.
### 2. 기본 클래스 예시

```ts
class Person {
  name: string;
  age: number;

  greet() {
    console.log(`Hello, my name is ${this.name}`);
  }
}
```

여기서:

- `name`, `age` → properties
    
- `greet()` → method
    
- 클래스 자체가 TypeScript 타입으로 사용되며,  
    해당 구조를 따르지 않으면 TS에서 오류를 발생시킨다.
### 3. 객체(Instance) 생성

```ts
const user = new Person();
user.name = "Alice";
user.age = 25;
user.greet(); 
// Hello, my name is Alice
```

**객체 = 클래스 설계도를 기반으로 실제로 만들어진 구체적인 실체**
### 4. this 키워드

클래스 내에서 자기 자신의 property나 method에 접근할 때 사용한다.

예:

- `this.name`
    
- `this.age
### 5. Properties

속성은 객체의 상태(State)를 나타낸다.

예시:

- Car: model, year
    
- User: name, email
    
- Product: id, price
    

속성에는 타입을 지정할 수 있고, 기본값을 넣을 수도 있다.
### 6. Methods

메서드는 객체의 행동을 나타낸다.

예:

- Calculator: add(), subtract()
    
- User: login(), logout()
    
- Car: accelerate(), brake()

메서드는 클래스 내부 property를 조작하거나, 기능을 수행한다.
## Access Modifiers, Static, and Readonly Members

_(접근제어자, static, readonly)_
### 1. 접근 제어자(Access Modifiers)

클래스의 필드와 메서드에 접근할 수 있는 범위를 결정한다.

|Modifier|접근 가능 범위|설명|
|---|---|---|
|**public**|어디서나 접근 가능|기본값|
|**private**|클래스 내부만|외부/자식 클래스 접근 불가|
|**protected**|클래스 + 자식 클래스|외부에서는 접근 불가|
### 2. 실제 예시

```ts
class Vehicle {
  public brand: string;        // 어디서나 접근 가능
  private engineNumber: string; // 클래스 내부 전용
  protected wheels: number;     // 클래스 + 자식 클래스에서 접근 가능
}
```

이를 통해 **캡슐화(encapsulation)**를 구현할 수 있다.  
불필요한 외부 접근을 막고, 데이터 안정성을 보장한다.
### 3. Static Members

static은 **클래스 자체에 속하는 멤버**다.

```ts
class MathUtil {
  static pi = 3.14;
  static areaOfCircle(r: number) {
    return this.pi * r * r;
  }
}

MathUtil.areaOfCircle(10);
```

특징:

- 객체(instance) 없이 클래스 이름으로 직접 사용
    
- 모든 객체들이 공유해야 하는 값에 적합
    
- 유틸리티 함수나 상수에 자주 사용
### 4. Readonly Members

readonly는 **한 번만 할당 가능**한 property다.

```ts
class Car {
  readonly vin: string;

  constructor(vin: string) {
    this.vin = vin;
  }
}
```

특징:

- 선언 시 또는 constructor에서만 초기화 가능
    
- 이후 값 수정 불가 → TS 오류 발생
    
- 변경되면 안 되는 값(ID, 초기 구성값)에 적합
## TypeScript Classes (Classes 전체 정리 섹션)

이 섹션은 클래스 전체 개념을 종합적으로 설명한다.
### 1. 클래스 구조

클래스는 다음 요소들로 구성된다:

- properties
    
- methods
    
- constructor
    
- access modifiers
    
- static members
    
- readonly
    
- getters/setters
    

클래스를 통해 설계된 구조를 기반으로 객체를 여러 개 만들 수 있다.
### 2. Constructors

constructor는 객체가 생성될 때 자동으로 실행된다.

사용 예시:

```ts
class User {
  constructor(public name: string, public age: number) {}
}
```
### 3. Getters / Setters

직접 속성을 노출하지 않고, 접근을 제어하는 방식.

```ts
class Person {
  private _age: number = 0;

  get age() {
    return this._age;
  }

  set age(value: number) {
    if (value < 0) throw new Error("Invalid age");
    this._age = value;
  }
}
```

장점:

- 데이터 보호
    
- 검증(validation) 가능
    
- 캡슐화 수준 강
## Inheritance Basics and the `extends` Keyword
_(상속 기본 개념과 extends 사용법)_
### 1. 상속(Inheritance) 개념

상속은 **기존 클래스의 속성과 메서드를 ‘재사용’하고 확장하는 기법**이다.

비유:

- “부모 클래스”는 기본 기능이 있는 설계도
    
- “자식 클래스”는 그 설계도를 가져와 더 많은 기능을 추가한 설계도

TypeScript는 자바와 동일하게 **단일 상속(single inheritance)** 구조를 사용한다.
### 2. extends 키워드

자식 클래스가 부모 클래스를 상속할 때 사용한다.

```ts
class Animal {
  move() {
    console.log("Moving...");
  }
}

class Dog extends Animal {
  bark() {
    console.log("Woof!");
  }
}
```

사용 예:

```ts
const d = new Dog();
d.move(); // 부모로부터 상속
d.bark(); // Dog 클래스 메서드
```
### 3. super 키워드

자식 클래스에서 부모 클래스의 constructor나 메서드를 호출할 때 사용.

```ts
class Person {
  constructor(public name: string) {}
}

class Employee extends Person {
  constructor(name: string, public role: string) {
    super(name); // 부모 constructor 호출
  }
}
```

super는 **부모가 가진 초기 설정을 수행한 뒤 자식 고유 속성을 설정**하는 데 필요하다
## Abstract Classes and Abstract Methods

_(추상 클래스와 추상 메서드)_
### 1. 추상 클래스(Abstract Class)란?

추상 클래스는 **완전한 객체를 만들 수 없는 클래스**다.  
즉, new 로 인스턴스를 생성할 수 없다.

왜 쓰는가?

- 공통 구조를 강제하기 위해
    
- 공통 로직은 구현하고, 세부 로직은 자식에게 맡기기 위해
### 2. abstract 키워드

추상 클래스 선언:

```ts
abstract class Shape {
  abstract getArea(): number; // 추상 메서드
}
```

특징:

- 추상 메서드는 **구현이 없다**
    
- 해당 클래스를 상속하는 자식 클래스는 반드시 구현해야 한다.
### 3. 자식 클래스에서 구현

```ts
class Circle extends Shape {
  constructor(public radius: number) {
    super();
  }

  getArea(): number {
    return Math.PI * this.radius * this.radius;
  }
}
```
### 4. 추상 클래스의 목적 요약

- 공통 기능 제공
    
- 특정 메서드 구현을 강제
    
- 상속 구조를 명확하게 설계
    
- 인터페이스보다 “구체 구현 + 강제 로직”을 함께 제공하는 역할
## Abstract Classes and Interfaces

_(추상 클래스 vs 인터페이스)_
### 1. 공통점

- 둘 다 “구조 강제” 가능
    
- 둘 다 특정 형태를 가지도록 강제할 수 있
### 2. 차이점

|기준|추상 클래스|인터페이스|
|---|---|---|
|인스턴스 생성|불가|불가|
|메서드 구현|가능|X (타입 구조만 정의)|
|멤버 변수|가능|제한적|
|다중 상속|X|가능 (여러 인터페이스 구현 가능)|
|목적|“공통 로직 + 강제 구조” 제공|“구조만 정의”|

자바의 추상 클래스 vs 인터페이스와 매우 유사하다.
### 3. 언제 추상 클래스 사용?

- 공통 로직을 실제 코드로 제공해야 하는 경우
    
- 일부는 구현하고, 일부는 자식에게 요구할 때
### 4. 언제 인터페이스 사용?

- 객체 구조만 정의하면 될 때
    
- 다양한 클래스가 같은 규약을 공유해야 할 때
    
- 다중 상속이 필요한 경우
---
## Declaring Interfaces and Structural Typing

_(인터페이스 선언 & 구조적 타이핑)_

이 섹션은 TypeScript를 다른 언어와 구분하는 **핵심 개념**이 포함되어 있다.
### 1. Interface 선언

객체의 구조(shape)를 정의하는 방식.

```ts
interface Person {
  name: string;
  age: number;
}
```

이 인터페이스를 사용하려면 해당 구조를 따라야 한다.
### 2. Structural Typing (구조적 타이핑)

TypeScript의 중요한 특징:

**“타입이란 것이 이름이 아니라 구조로 판단된다”**

예:

```ts
interface IPoint {
  x: number;
  y: number;
}

let point = { x: 10, y: 20, z: 30 };
```

`point`는 x와 y를 가지고 있으므로  
**구조가 같으므로** IPoint 타입으로 인정된다.

Structure-based, 즉 “duck typing”:

> 오리가 아니어도, 오리처럼 걷고 소리 내면 오리로 본다.
### 3. Interface 확장

```ts
interface Animal {
  name: string;
}

interface Dog extends Animal {
  breed: string;
}
```

다중 상속도 가능:

```ts
interface Pet extends Animal, Runnable {
  owner: string;
}
```
### 4. 함수의 인터페이스 정의

함수 시그니처도 인터페이스로 정의 가능.

```ts
interface Formatter {
  (value: string): string;
}
```
### 5. Index Signatures

동적으로 key가 생길 수 있는 객체를 표현:

```ts
interface Dictionary {
  [key: string]: string;
}
```
### 6. Structural Typing 정리

TypeScript의 OOP는 클래스보다  
**인터페이스 + 구조적 타이핑**이 중심이다.

→ 이 점이 자바/C#과의 가장 큰 차이이며,  
→ TypeScript는 더 유연하고 실용적인 방식으로 객체 구조를 강제한다.

---
## Interface Extensions

_(인터페이스 확장)_
### 1. 기본 개념

인터페이스는 **다른 인터페이스를 확장(extends)**할 수 있다.  
이는 클래스의 상속과 비슷하지만, 구조적 모델링에 초점이 맞춰져 있다.

```ts
interface Person {
  name: string;
}

interface Employee extends Person {
  department: string;
}
```

Employee는 Person + department를 모두 가진 구조가 된다.
### 2. 다중 확장 가능

인터페이스는 여러 개의 인터페이스를 동시에 확장할 수 있다.

```ts
interface Living {
  breathes: boolean;
}

interface Named {
  name: string;
}

interface Human extends Living, Named {
  age: number;
}
```

→ 클래스가 아닌 인터페이스는 **다중 상속이 완전히 허용**된다.
### 3. 확장 목적

- 공통 속성 구조를 강제
    
- 다양한 객체 타입 간 일관된 모델링
    
- 타입 중복 제거
    
- 복잡한 도메인 모델을 안전하게 표현

---
## Classes Implementing Interfaces

_(클래스가 인터페이스를 구현하는 방법)_
### 1. 클래스는 여러 개의 인터페이스를 구현 가능

자바와 동일하게 `implements`를 사용한다.

```ts
interface Logger {
  log(message: string): void;
}

interface Serializer {
  serialize(): string;
}

class User implements Logger, Serializer {
  constructor(public name: string) {}

  log(message: string) {
    console.log(message);
  }

  serialize() {
    return JSON.stringify({ name: this.name });
  }
}
```
### 2. 목적

- 클래스가 특정 “규약(contract)”을 반드시 준수하도록 강제
    
- 설계 단계에서 예상치 못한 구조 불일치 방지
    
- 팀 개발 시 강력한 코드 일관성 제공
### 3. 인터페이스는 구조만 정의

구현(implementation)은 전부 클래스 책임.

---
## Understanding Polymorphism

_(다형성 이해하기)_

이 파트는 TypeScript OOP 개념 중에서 가장 중요한 부분에 해당한다.
### 1. 다형성(Polymorphism) 정의

여러 형태를 가진다는 의미로,  
**부모 타입 하나로 여러 자식 타입을 다룰 수 있는 기능**이다.

예:

```ts
abstract class Shape {
  abstract area(): number;
}

class Circle extends Shape {
  constructor(public radius: number) { super(); }
  area() {
    return Math.PI * this.radius ** 2;
  }
}

class Square extends Shape {
  constructor(public side: number) { super(); }
  area() {
    return this.side * this.side;
  }
}

function printArea(shape: Shape) {
  console.log(shape.area());
}
```
### 2. 결과

```ts
printArea(new Circle(10));
printArea(new Square(5));
```

→ 같은 함수가 Circle도 받고 Square도 받아서 처리 가능  
→ 동일한 “Shape” 계약을 따르기 때문.
### 3. 다형성의 장점

- 코드 재사용성 증가
    
- 유연한 설계
    
- 변경에 강함(확장 가능, 수정 최소화)
    
- 느슨한 결합(loose coupling) 구조 형성

TypeScript OOP를 활용하는 핵심 기반이 바로 이 다형성이다.

---
## Using Access Modifiers with OOP

_(접근 제어자를 객체지향적으로 활용하기)_

이제 본격적으로 캡슐화(encapsulation)가 등장한다.
### 1. public

- 어디서든 접근 가능
    
- 외부 사용을 위한 공개 API
### 2. private

- **클래스 내부에서만 접근 가능**
    
- 외부 접근을 완전히 차단
    
- 상태를 보호하고, 오용을 방지

```ts
class BankAccount {
  private balance = 0;
  deposit(amount: number) {
    this.balance += amount;
  }
}
```
### 3. protected

- 클래스 + 자식 클래스에서 접근 가능
    
- 외부에서는 접근 불가
    
- 상속 구조에서 재사용 가능

```ts
class Animal {
  protected eat() {}
}

class Dog extends Animal {
  doSomething() {
    this.eat(); // OK
  }
}
```
### 4. readonly

- 초기화 이후 수정 불가
    
- ID, 생성 타임스탬프, 설정값 등 변경 불가 속성에 적합
### 5. 캡슐화 요약

캡슐화는 객체 내부 상태를 보호하고,  
외부로부터 안전하게 관리하기 위한 핵심 개념이다.

접근 제어자는 이 목적을 달성하는 가장 중요한 수단이다.

---
## Composition vs Inheritance

_(구성(Composition) vs 상속(Inheritance))_  
TypeScript에서도 매우 중요한 설계 철학이다.
### 1. 상속(Inheritance)의 단점

- 부모와 자식 사이 결합도가 증가
    
- 불필요한 기능까지 물려받을 수 있음
    
- `is-a` 관계가 아닌데 억지로 상속하면 구조가 복잡해짐
예:  
Bird → FlyingBird → Penguin  
Penguin은 날 수 없지만 Bird로부터 “fly” 메서드를 강제로 상속받는다 → 문제
### 2. Composition(구성)란?

상속 대신 **필요한 기능만 조합해서 객체를 만드는 방식**  
= “has-a” 관계

```ts
class Engine {
  start() {}
}

class Car {
  constructor(private engine: Engine) {}
  start() {
    this.engine.start();
  }
}
```

Car는 Engine을 “가지고 있다(has-a)”  
→ 더 유연하고 안정적인 설계
### 3. Composition이 선호되는 이유

- 유연성 증가
    
- 테스트 용이
    
- 결합도 감소
    
- 유지보수성 상승
    
- 상속보다 안전
    
- 기능 변경에 강함
### 4. 언제 상속 vs 언제 조합?

|상황|추천 방식|
|---|---|
|명확한 is-a 관계|상속|
|코드 재사용이 주목적|조합|
|기능 단위로 조립|조합|
|공통된 ‘행동 규약’ 필요|인터페이스|
|공통 기본 구현 + 확장 필요|추상 클래스|

→ TypeScript는 상속보다는 **인터페이스 + 구성(Composition)** 조합을 더 선호한다.

---
## More OOP Patterns in TypeScript

_(추가적인 OOP 패턴)_

이 섹션에서 TypeScript 파일은 실제로 다음 개념을 다룬다:
### 1. Singleton
객체를 하나만 유지하는 패턴

```ts
class Singleton {
  private static instance: Singleton;

  private constructor() {}

  static getInstance() {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton();
    }
    return Singleton.instance;
  }
}
```
### 2. Factory Pattern

객체 생성 로직을 별도의 함수/클래스로 분리

```ts
class Animal {}
class Dog extends Animal {}
class Cat extends Animal {}

class AnimalFactory {
  static create(type: string): Animal {
    if (type === "dog") return new Dog();
    return new Cat();
  }
}
```
### 3. Strategy Pattern

행동을 교체 가능한 객체들로 분리하는 패턴

```ts
interface Strategy {
  execute(): void;
}

class StrategyA implements Strategy {
  execute() { console.log("A"); }
}

class StrategyB implements Strategy {
  execute() { console.log("B"); }
}

class Context {
  constructor(private strategy: Strategy) {}
  run() { this.strategy.execute(); }
}
```
### 4. Decorator Pattern

→ 실제 TypeScript 데코레이터 문법은 이후 파일에서 다룸  
→ 여기서는 OOP 개념적 설명만 포함됨

---
## Final OOP Wrap-up

_(OOP 전체 요약)_

TypeScript에서 배운 객체지향 개념 전체 정리:

- 클래스
    
- 인스턴스
    
- 프로퍼티 / 메서드
    
- 생성자
    
- 접근 제어자
    
- 상속
    
- 추상 클래스
    
- 인터페이스
    
- 다형성
    
- 구성(Composition)
    
- 디자인 패턴
    
- 구조적 타이핑

TypeScript의 OOP는 자바와 다르게:

- 클래스보다 **인터페이스 + 구조적 타이핑**이 중심
    
- 상속보다 **조합(Composition)**이 더 선호됨
    
- 타입 시스템이 강력하게 결합되어 에러를 컴파일 단계에서 제거함
    
- 프로젝트 규모가 커질수록 안정성이 높아지는 구조