# # TypeScript Classes — 구조, 문법, 확장 기능 정리

이 노트는 **TypeScript Classes.pdf** 의 전체 내용을 기반으로  
실제 개발자가 TS 클래스를 이해하고 활용하기 위해 필요한 모든 요소를 정리한 문서이다.

---

# ## 1. TypeScript 클래스의 구성 요소

TS 클래스는 ES2015 JavaScript 클래스에 **타입 기반 기능이 추가**된 확장 버전이다.

클래스는:

- **값(value)**
    
- **타입(type)**

두 가지 역할을 동시에 가진다.

```ts
class User {}

const u: User = new User();  
// User는 타입이자 new 가능한 값
```

---

# ## 2. 클래스 생성 (constructor)

```ts
class User {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}

const u = new User("A");
```

- new User(…)로 인스턴스 생성
    
- constructor의 파라미터와 필드 타입은 전부 TS에서 검사된다

---

# ## 3. private vs #private — TS에서 가장 중요한 구분

### 1) `private`

타입 시스템 상에서만 보호  
런타임에서는 접근 가능 (JS는 모름)

```ts
class Bag {
  private item: any;
}
const b = new Bag();
// b.item  // TS 에러, JS에선 가능
```

### 2) `#item`

**JS 엔진 수준의 실제 private**  
런타임에서도 접근 불가

```ts
class Bag {
  #item: any;
}
const b = new Bag();
// b.#item // JS에서도 오류
```

### 차이점 요약

|키워드|TS 타입체커|JS 런타임|설명|
|---|---|---|---|
|private|보호됨|접근 가능|타입 전용|
|#private|보호됨|접근 불가|엔진 enforced|

---

# ## 4. public / private / protected

- **public (default)**: 어디서나 접근 가능
    
- **private**: 해당 클래스 내부에서만
    
- **protected**: 하위 클래스에서도 접근 가능

```ts
class A {
  protected x = 1;
}
class B extends A {
  getX() { return this.x; }
}
```

---

# ## 5. this binding 문제

PDF에서 강조되는 중요한 내용

TS의 클래스 메서드는 JS와 동일한 this 규칙을 따른다.

### 문제 예시:

```ts
class A {
  log() {
    console.log(this);
  }
}

const a = new A();
const f = a.log;
f();  // this가 undefined로 바뀔 수 있음
```

### 해결 방법 1: arrow function

```ts
log = () => {
  console.log(this);
};
```

arrow function은 this가 항상 인스턴스로 고정된다.

### 해결 방법 2: bind

```ts
this.log = this.log.bind(this);
```

---

# ## 6. Method 정의 방식

PDF는 세 가지 방식이 있다고 명시한다.

### 1) 일반 method

```ts
class A {  
  do() {}
}
```

### 2) arrow function field

```ts
class A {
  do = () => {};
}
```

### 3) function signature 형태

```ts
class A {
  do(): number {
    return 1;
  }
}
```

---

# ## 7. readonly / optional / definite assignment (`!`)

```ts
class User {
  name!: string;         // definite assignment
  roles: string[] = [];  // default value
  readonly createdAt = new Date(); // 읽기 전용
  isActive?: boolean;    // optional
}
```

---

# ## 8. Getter & Setter

```ts
class Ruler {
  private _size = 0;

  get size() {
    return this._size;
  }

  set size(value: number) {
    this._size = value;
  }
}
```

---

# ## 9. static 변수와 메서드, static block

```ts
class Counter {
  static count = 0;

  static increment() {
    this.count++;
  }

  static {
    this.count = 1;  // static 초기화 블록
  }
}
```

- static: 인스턴스가 아닌 클래스에 속함
    
- static block: 선언 시 1회 실행

---

# ## 10. Method Overloading

TS는 실제로는 **하나의 구현부**를 가지며  
다수의 “타입 시그니처”를 선언한다.

```ts
class Service {
  do(): Promise<string>;
  do(cb: (v: string) => void): void;
  
  do(cb?: (v: string) => void) {
    if (cb) return cb("done");
    return Promise.resolve("done");
  }
}
```

---

# ## 11. abstract 클래스

인스턴스화할 수 없고, 반드시 상속해서 사용해야 하는 클래스

```ts
abstract class Animal {
  abstract getName(): string;

  print() {
    console.log("Hello " + this.getName());
  }
}

class Dog extends Animal {
  getName() { return "Dog"; }
}
```

---

# ## 12. Parameter Properties (TS만의 기능)

PDF 속 핵심 예시:

```ts
class Location {
  constructor(
    public x: number,
    public y: number
  ) {}
}

const loc = new Location(20, 40);
loc.x;  // 20
loc.y;  // 40
```

constructor 파라미터에 `public`, `private`, `readonly`를 붙이면  
자동으로 인스턴스 필드가 생성됨.

---

# ## 13. 클래스를 타입으로, 값으로 동시에 사용하는 패턴

```ts
class Bag {}
const a: Bag = new Bag();   // 타입
```

---

# ## 14. 클래스와 Interface 연결 (implements)

```ts
interface Syncable {
  sync(): void;
}

class Account implements Syncable {
  sync() {}
}
```

구조를 강제로 맞추도록 유도한다.

---

# ## 15. Generics in Classes

PDF에서 소개된 예시:

```ts
class Box<Type> {
  contents: Type;

  constructor(value: Type) {
    this.contents = value;
  }
}

const box = new Box<string>("data");
```

---

# ## 16. Decorators (PDF 맨 뒤에 언급된 기능)

```ts
class User {
  @triggersSync()
  save() {}

  @preferCache(false)
  get displayName() { ... }

  update(@required info: Partial<User>) {}
}
```

특징:

- class, method, accessor, property, parameter에 적용 가능
    
- 메타프로그래밍 용도
    
- Angular, NestJS, TypeORM 등에서 많이 사용
    
- 런타임 동작 (TS 컴파일 옵션 필요)
    

---

# ## 17. 실무에서 Class가 중요한 이유

- SAP SDK / HANA Client / BTP Framework 대부분 Class 기반
    
- Node.js 서비스 계층(Service Layer) 구성
    
- OOP 패턴 기반 Workflow Engine 구현(IWA 등)
    
- private/#private 기반 보안적 캡슐화
    
- abstract + implements 조합으로 구조 통제
    
- Decorators로 API/DB layer 자동화(NestJS, TypeORM)
    

---

# ## 18. 최종 종합 정리

- 클래스는 **type + value** 두 역할을 한다
    
- TS의 private 과 JS의 #private를 구분해야 한다
    
- arrow function과 일반 메서드의 this 차이를 이해해야 한다
    
- getter/setter, static, overloads, parameter properties는 TS의 주요 기능
    
- abstract 클래스는 상속 기반 설계에 필수
    
- decorators는 대형 프로젝트에서 자주 사용됨
    
- interface + implements 로 구조 강제 가능
    
- generics 로 클래스 구조를 유연하게 확장 가능