# 📚 기술 면접 준비 노트 - SAP Developer Associate

## 📝 면접에 대한 고찰

면접을 많이 다녀보다보니 기술면접에서 회사의 이미지나 같이 일하게 될 개발 팀원들의 수준, 그리고 이 회사에서 성장할 수 있는 성장성을 가늠할 수 있겠다는 생각이 들게 된 부분이 기술면접이였던 것 같습니다. 코딩테스트를 보는 건 본인의 실력을 뽐낼 순 있지만, 같이 일하게 될 시니어 개발자나 개발팀들의 실력은 면접을 통해 알 수가 없습니다. 주니어 개발자로 들어왔지만 자신의 분야를 깊이 배울 수 없는 회사면 굳이 오래다닐 이유가 없다는 거죠. 그래서 면접을 볼때 참여하는 개발자의 질문 수준에서 그 회사의 수준 깊이가 보인다는 걸 직감할 수 있었습니다. 

저의 경우에는 질문에 대한 답변을 하지 못했을 경우 그 질문에 대한 답변을 알려주실 수 있냐고 하였습니다. 프로페셔널한 개발자분들은 성심성의껏 답변해주시는 분들이 많았고 답을 틀렸다고 불합격을 주지도 않았습니다. 오히려 이런 열의를 좋게 봐주셔서 면접을 본 곳 모두 합격을 하였습니다.

> **참고**: 이 노트는 SAP Developer Associate 포지션 (JavaScript/TypeScript, Node.js, CI/CD, Cloud Native, DevOps)에 맞춰 작성되었습니다.

---

## 📑 목차

1. [JavaScript & TypeScript](#1-javascript--typescript)
2. [Node.js](#2-nodejs)
3. [CI/CD & DevOps](#3-cicd--devops)
4. [운영체제](#4-운영체제)
5. [네트워크](#5-네트워크)
6. [데이터베이스](#6-데이터베이스)
7. [객체지향 프로그래밍](#7-객체지향-프로그래밍)
8. [자료구조 & 알고리즘](#8-자료구조--알고리즘)
9. [Cloud Native & Distributed Systems](#9-cloud-native--distributed-systems)
10. [Generative AI & LLM](#10-generative-ai--llm)
11. [개발 상식](#11-개발-상식)
12. [디자인 패턴](#12-디자인-패턴)

---

## 1. JavaScript & TypeScript

### Q. JavaScript의 특징은?

**A.**
- **인터프리터 언어**: 컴파일 없이 실행
- **동적 타입 언어**: 변수 타입이 런타임에 결정
- **프로토타입 기반**: 클래스 없이도 객체 생성 가능
- **일급 함수**: 함수를 변수처럼 사용 가능
- **이벤트 루프**: 비동기 처리 메커니즘

### Q. 호이스팅(Hoisting)이란?

**A.** 변수 선언이 그 범위에 따라 선언과 할당으로 분리되는 것을 의미합니다.

- `var`로 선언된 변수는 선언 부분이 함수의 최상위로 끌어올려짐
- 함수 선언문도 호이스팅됨
- `let`, `const`는 호이스팅되지만 TDZ(Temporal Dead Zone)에 의해 초기화 전 접근 불가

```javascript
console.log(x); // undefined (에러가 아님)
var x = 100;

// 실제 동작 순서
var x;
console.log(x);
x = 100;
```

### Q. 클로저(Closure)란?

**A.** 두 개의 함수로 만들어진 환경으로 이루어진 특별한 객체입니다. 내부 함수가 외부 함수의 변수에 접근할 수 있는 메커니즘입니다.

**특징:**
- 외부 함수 호출이 종료되어도 외부 함수의 지역 변수에 접근 가능
- 비공개 속성/메소드를 구현할 수 있음
- 데이터 은닉과 캡슐화 가능

```javascript
function outer() {
  var name = 'closure';
  return function inner() {
    console.log(name); // 외부 함수의 변수 접근
  };
}
var callFunc = outer();
callFunc(); // 'closure'
```

### Q. this 바인딩에 대해 설명하세요.

**A.** JavaScript에서 `this`는 함수가 호출된 상황에 따라 달라집니다.

**1. 객체의 메서드를 호출할 때**
- 메서드를 호출한 객체를 참조

**2. 함수를 호출할 때**
- 전역 객체를 참조 (strict mode에서는 undefined)

**3. 생성자 함수를 통해 객체를 생성할 때**
- 새로 생성된 객체를 참조

**4. apply, call, bind를 통한 호출**
- 명시적으로 `this`를 지정 가능
- `bind`: 함수 선언 시 `this` 지정
- `call`: 함수 호출 시 `this`와 인자 전달
- `apply`: 함수 호출 시 `this`와 배열 형태의 인자 전달

### Q. Promise란?

**A.** 비동기 작업의 완료 또는 실패를 나타내는 객체입니다.

**상태:**
- **pending**: 초기 상태
- **fulfilled**: 작업이 성공적으로 완료
- **rejected**: 작업이 실패

**장점:**
- 콜백 지옥 해결
- 비동기 작업을 순차적으로 또는 병렬로 처리 가능
- 예외 처리 구조 제공

```javascript
const promise = new Promise((resolve, reject) => {
  // 비동기 작업
  if (success) {
    resolve(value);
  } else {
    reject(error);
  }
});
```

### Q. async/await란?

**A.** 비동기 코드를 작성하는 새로운 방법으로, Promise 기반입니다.

**특징:**
- `async` 함수는 항상 Promise를 반환
- `await`는 Promise가 완료될 때까지 기다림
- 동기 코드처럼 보이지만 비동기로 동작
- try-catch로 에러 처리 가능

```javascript
async function fetchData() {
  try {
    const data = await fetch('/api/data');
    const json = await data.json();
    return json;
  } catch (error) {
    console.error('Error:', error);
  }
}
```

### Q. 이벤트 루프(Event Loop)란?

**A.** JavaScript의 비동기 처리 메커니즘입니다.

**동작 방식:**
1. Call Stack에서 함수 실행
2. 비동기 작업은 Web API에 위임
3. Web API 작업 완료 시 Callback Queue에 추가
4. Call Stack이 비어있을 때 Event Loop가 Callback Queue에서 작업을 가져와 실행

**Queue 종류:**
- **Call Stack**: 실행 중인 함수들의 스택
- **Callback Queue (Task Queue)**: 일반 비동기 콜백
- **Microtask Queue**: Promise, queueMicrotask (우선순위 높음)

### Q. 화살표 함수(Arrow Function)의 특징은?

**A.**
- **간결한 문법**: `() => {}` 형태
- **자신의 this 바인딩 없음**: 상위 스코프의 `this`를 상속
- **arguments 바인딩 없음**
- **생성자로 사용 불가**: `new` 키워드 사용 불가
- **prototype 속성 없음**

```javascript
// 일반 함수
function Person() {
  this.age = 0;
  setInterval(function() {
    this.age++; // this는 전역 객체
  }, 1000);
}

// 화살표 함수
function Person() {
  this.age = 0;
  setInterval(() => {
    this.age++; // this는 Person 인스턴스
  }, 1000);
}
```

### Q. TypeScript란? JavaScript와의 차이는?

**A.** TypeScript는 JavaScript에 정적 타입 시스템을 추가한 언어입니다.

**주요 차이점:**

| 특징 | JavaScript | TypeScript |
|------|-----------|-----------|
| 타입 시스템 | 동적 타입 | 정적 타입 |
| 컴파일 | 필요 없음 | 필요 (트랜스파일) |
| 타입 체크 | 런타임 | 컴파일 타임 |
| 에러 발견 | 런타임 | 개발 시점 |

**TypeScript의 장점:**
- 타입 안정성으로 런타임 에러 감소
- IDE 자동완성 및 리팩토링 지원
- 코드 가독성 향상
- 대규모 프로젝트에 적합

**TypeScript의 단점:**
- 컴파일 시간 필요
- 학습 곡선 존재
- 초기 설정 필요

### Q. TypeScript의 주요 타입은?

**A.**
- **기본 타입**: `number`, `string`, `boolean`, `null`, `undefined`
- **배열**: `number[]` 또는 `Array<number>`
- **튜플**: `[string, number]`
- **열거형**: `enum`
- **Any**: `any` (타입 체크 없음)
- **Void**: 반환값 없음
- **Never**: 절대 발생하지 않는 값
- **Union**: `string | number`
- **Intersection**: `A & B`
- **제네릭**: `<T>`

### Q. var, let, const의 차이는?

**A.**

| 특징 | var | let | const |
|------|-----|-----|-------|
| 스코프 | 함수 스코프 | 블록 스코프 | 블록 스코프 |
| 재선언 | 가능 | 불가능 | 불가능 |
| 재할당 | 가능 | 가능 | 불가능 |
| 호이스팅 | 선언만 호이스팅 | TDZ | TDZ |

**권장사항:**
- 기본적으로 `const` 사용
- 재할당이 필요한 경우에만 `let` 사용
- `var`는 사용하지 않음

### Q. 스프레드 연산자와 구조 분해 할당은?

**A.**

**스프레드 연산자 (`...`)**
- 배열이나 객체를 펼칠 수 있음
- 배열 복사, 병합에 사용
- 함수 인자로 전달

```javascript
const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5]; // [1, 2, 3, 4, 5]

const obj1 = { a: 1, b: 2 };
const obj2 = { ...obj1, c: 3 }; // { a: 1, b: 2, c: 3 }
```

**구조 분해 할당**
- 배열이나 객체에서 값을 추출하여 변수에 할당

```javascript
const [a, b] = [1, 2];
const { name, age } = { name: 'John', age: 30 };
```

---

## 2. Node.js

### Q. Node.js란?

**A.** Chrome의 V8 JavaScript 엔진으로 빌드된 JavaScript 런타임입니다.

**특징:**
- 서버 사이드 JavaScript 실행 환경
- 비동기, 이벤트 기반
- 단일 스레드 이벤트 루프
- NPM을 통한 패키지 관리

### Q. Node.js의 이벤트 루프는 어떻게 동작하나요?

**A.** Node.js는 이벤트 루프를 사용하여 비동기 작업을 처리합니다.

**단계:**
1. **Timer**: `setTimeout`, `setInterval` 콜백 실행
2. **Pending callbacks**: 지연된 I/O 콜백 실행
3. **Idle, prepare**: 내부 사용
4. **Poll**: 새로운 I/O 이벤트 가져오기
5. **Check**: `setImmediate` 콜백 실행
6. **Close callbacks**: `close` 이벤트 콜백 실행

### Q. Node.js에서 동기 vs 비동기 I/O의 차이는?

**A.**

**동기 I/O (Blocking)**
- 작업이 완료될 때까지 다음 코드 실행 불가
- 멀티 사용자 환경에서 비효율적

**비동기 I/O (Non-blocking)**
- 작업을 시작하고 즉시 반환
- 완료 시 콜백 실행
- 동시에 여러 작업 처리 가능

```javascript
// 동기
const data = fs.readFileSync('file.txt');

// 비동기
fs.readFile('file.txt', (err, data) => {
  // 콜백 실행
});
```

### Q. Node.js의 모듈 시스템은?

**A.**

**CommonJS (Node.js 기본)**
```javascript
// export
module.exports = { ... };

// import
const module = require('./module');
```

**ES Modules (ES6)**
```javascript
// export
export const func = () => { ... };

// import
import { func } from './module';
```

### Q. NPM이란?

**A.** Node Package Manager의 약자로, Node.js 패키지 관리 도구입니다.

**주요 명령어:**
- `npm install`: 패키지 설치
- `npm install --save`: dependencies에 추가
- `npm install --save-dev`: devDependencies에 추가
- `npm run`: package.json의 scripts 실행
- `npm publish`: 패키지 배포

**package.json의 역할:**
- 프로젝트 메타데이터
- 의존성 관리
- 스크립트 정의

### Q. Node.js에서 에러 처리는?

**A.**
- **try-catch**: 동기 코드의 에러 처리
- **콜백의 첫 번째 인자**: 전통적인 Node.js 에러 처리
- **Promise의 catch**: Promise 기반 에러 처리
- **async/await의 try-catch**: async 함수의 에러 처리

```javascript
// 콜백
fs.readFile('file.txt', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  // 처리
});

// Promise
promise
  .then(data => {})
  .catch(err => {});

// async/await
try {
  const data = await promise;
} catch (err) {
  console.error(err);
}
```

### Q. Node.js의 스레드 모델은?

**A.**
- **단일 스레드 이벤트 루프**: 메인 스레드
- **Worker Threads**: CPU 집약적 작업을 위한 워커 스레드
- **libuv Thread Pool**: 파일 I/O, DNS 등 블로킹 작업 처리

---

## 3. CI/CD & DevOps

### Q. CI/CD란?

**A.**

**CI (Continuous Integration, 지속적 통합)**
- 개발자들이 코드 변경사항을 자주 통합하는 것
- 자동화된 빌드 및 테스트 실행
- 조기 버그 발견

**CD (Continuous Deployment/Delivery, 지속적 배포/전달)**
- **Continuous Delivery**: 프로덕션 배포 준비 완료 상태 유지
- **Continuous Deployment**: 자동으로 프로덕션 배포

**장점:**
- 빠른 피드백
- 자동화로 인한 시간 절약
- 배포 위험 감소
- 코드 품질 향상

### Q. GitHub Actions란?

**A.** GitHub에서 제공하는 CI/CD 플랫폼입니다.

**주요 개념:**
- **Workflow**: 자동화된 프로세스 정의 파일 (`.github/workflows/`)
- **Job**: 하나의 실행 단위
- **Step**: Job 내의 개별 작업
- **Action**: 재사용 가능한 작업 단위
- **Runner**: 워크플로우를 실행하는 서버

**기본 구조:**
```yaml
name: CI
on: [push, pull_request]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Install dependencies
        run: npm install
      - name: Run tests
        run: npm test
```

### Q. GitHub Actions의 주요 이벤트는?

**A.**
- **push**: 코드 푸시 시
- **pull_request**: PR 생성/업데이트 시
- **schedule**: cron 스케줄에 따라
- **workflow_dispatch**: 수동 실행
- **release**: 릴리스 생성 시

### Q. CI/CD 파이프라인의 단계는?

**A.**
1. **Source**: 코드 저장소에서 코드 가져오기
2. **Build**: 코드 컴파일/빌드
3. **Test**: 단위 테스트, 통합 테스트 실행
4. **Deploy**: 스테이징/프로덕션 환경에 배포
5. **Monitor**: 배포 후 모니터링

### Q. DevOps란?

**A.** Development와 Operations의 합성어로, 개발과 운영의 협업을 강조하는 문화/방법론입니다.

**핵심 원칙:**
- 자동화
- 지속적 통합/배포
- 모니터링 및 로깅
- 인프라스트럭처 as Code
- 협업 및 커뮤니케이션

**주요 도구:**
- **CI/CD**: GitHub Actions, Jenkins, GitLab CI
- **컨테이너**: Docker, Kubernetes
- **모니터링**: Prometheus, Grafana
- **IaC**: Terraform, Ansible

### Q. Docker란?

**A.** 컨테이너 기반 가상화 플랫폼입니다.

**주요 개념:**
- **Image**: 실행 가능한 패키지
- **Container**: 이미지의 실행 인스턴스
- **Dockerfile**: 이미지 빌드 명령어 정의

**장점:**
- 환경 일관성
- 빠른 배포
- 리소스 효율성
- 확장성

### Q. Git의 주요 개념은?

**A.**
- **Repository**: 코드 저장소
- **Commit**: 변경사항 기록
- **Branch**: 독립적인 개발 라인
- **Merge**: 브랜치 병합
- **Pull Request**: 코드 리뷰 요청

**주요 명령어:**
- `git clone`: 저장소 복제
- `git add`: 변경사항 스테이징
- `git commit`: 변경사항 커밋
- `git push`: 원격 저장소에 푸시
- `git pull`: 원격 저장소에서 가져오기
- `git branch`: 브랜치 관리
- `git merge`: 브랜치 병합

---

## 4. 운영체제

### Q. 프로세스와 스레드의 차이점은?

**A.**

| 구분 | 프로세스 | 스레드 |
|------|---------|--------|
| 정의 | 운영체제로부터 자원을 할당 받는 작업의 단위 | 할당 받은 자원을 이용하는 실행 단위 |
| 메모리 | 독립적인 메모리 공간 | 프로세스의 메모리 공유 |
| 통신 | IPC(Inter-Process Communication) 필요 | 공유 메모리로 통신 가능 |
| 생성 비용 | 높음 | 낮음 |

### Q. 멀티프로세스와 멀티스레드의 차이점은?

**A.**

**멀티 프로세스**
- 프로그램을 여러 개의 프로세스로 구성
- **장점**: 하나의 프로세스가 잘못되어도 프로그램은 동작
- **단점**: Context Switching 비용 발생, 메모리 사용량 증가

**멀티 스레드**
- 프로그램을 여러 개의 스레드로 구성
- **장점**: 시스템 자원 소모 감소, 처리 비용 감소, 스레드간 자원 공유
- **단점**: 디버깅이 어려움, 동기화 이슈 발생, 하나의 스레드 오류로 전체 프로세스에 문제 발생

### Q. 메모리 구조에 대해 설명하세요.

**A.** 메모리는 크게 4가지 영역으로 구분됩니다:

1. **Code 영역**: 소스코드가 저장되는 영역
2. **Data 영역**: 전역변수, 정적변수가 할당되는 영역
3. **Heap 영역**: 사용자가 직접 관리하는 영역으로 데이터가 동적으로 할당되는 공간
4. **Stack 영역**: 함수의 호출 정보, 지역변수, 매개변수들이 저장되는 영역

---

## 5. 네트워크

### Q. HTTP란?

**A.** HyperText Transfer Protocol의 약자로, 웹 상에서 클라이언트와 서버 간에 요청과 응답으로 데이터를 주고 받을 수 있는 프로토콜입니다.

### Q. GET vs POST 차이점은?

**A.**

**GET**
- 클라이언트에서 리소스로부터 정보를 요청
- 데이터를 읽거나, 검색할 때 사용
- URL에 파라미터가 포함됨
- 캐시 가능
- 멱등성 (idempotent)

**POST**
- 리소스를 생성, 업데이트 하기 위해 서버에 데이터를 보냄
- 데이터를 body에 담아서 전송
- 캐시 불가능
- 멱등성 없음

### Q. RESTful API란?

**A.** 자원을 이름으로 구분하여 해당 자원의 상태를 주고 받는 모든 것을 의미합니다.

- URL을 통해 자원을 명시
- HTTP Method를 통해 해당 자원에 대한 CRUD를 적용
- **원칙**:
  1. 리소스와 행위를 명시적으로 분리 (URI는 명사, HTTP Method는 동사)
  2. Message는 Header와 Body를 명확하게 분리
  3. API 버전 관리
  4. 서버와 클라이언트가 같은 방식을 사용

### Q. CORS란?

**A.** Cross-Origin Resource Sharing의 약자로, 다른 출처(Origin)의 리소스를 공유하는 것을 의미합니다.

- 브라우저는 기본적으로 동일 출처 정책(Same-Origin Policy)에 따라 다른 출처의 리소스 접근을 제한
- CORS는 서버에서 특정 헤더를 통해 다른 출처의 접근을 허용하는 메커니즘

### Q. Preflight란?

**A.** Preflight는 실제 요청 전에 브라우저가 보내는 사전 요청입니다.

- **OPTIONS 메서드**로 실제 요청 전에 서버에 허용 여부를 확인
- **CORS Preflight 헤더**:
  - `Access-Control-Request-Method`: 실제 요청에서 사용할 HTTP 메서드
  - `Access-Control-Request-Headers`: 실제 요청에서 사용할 헤더 목록
- 서버는 `Access-Control-Allow-Origin`, `Access-Control-Allow-Methods`, `Access-Control-Allow-Headers` 등으로 응답

### Q. TCP와 UDP의 차이점은?

**A.**

**TCP (Transmission Control Protocol)**
- 신뢰성 있는 통신을 위해 사용
- 높은 신뢰성을 보장하지만, UDP보다 속도가 느림
- 3-way, 4-way handshake로 연결
- 흐름 제어와 혼잡 제어

**UDP (User Datagram Protocol)**
- 비연결형 프로토콜
- 손상된 데이터에 대해서 재전송하지 않음
- 신뢰성이 낮지만, TCP보다 속도가 빠름
- 스트리밍 같은 서비스에 주로 사용

---

## 6. 데이터베이스

### Q. 트랜잭션의 ACID 특징에 대해 설명하세요.

**A.** 데이터베이스의 무결성과 일관성을 위해서 트랜잭션 4가지 특징을 만족해야 합니다.

1. **A (Atomicity, 원자성)**: 한 트랜잭션 내 실행한 작업이 모두 성공하거나 또는 실패해야 함
2. **C (Consistency, 일관성)**: 데이터베이스 상태를 유지시켜야 함
3. **I (Isolation, 격리성)**: 동시에 실행되는 트랜잭션은 서로에게 영향을 미치지 않아야 함
4. **D (Durability, 지속성)**: 트랜잭션 완료 시 결과가 영구적으로 반영되어야 함

### Q. 인덱스(Index)란?

**A.** 인덱스는 책의 색인과 같습니다. 칼럼의 값과 해당 레코드가 저장된 주소를 키와 값의 쌍으로 만들어 두는 것입니다.

**특징:**
- 항상 정렬된 상태를 유지
- 데이터의 저장 성능을 희생하고 읽기 속도를 높임
- SELECT 쿼리문의 WHERE 조건절에 사용되는 칼럼이라고 전부 인덱스로 생성하면 역효과

**인덱스 자료구조:**
- **B+-Tree**: 일반적으로 사용되는 인덱스 알고리즘
- **Hash**: 해시 값을 계산해서 인덱싱, 매우 빠른 검색이지만 전방 일치 검색 불가

### Q. NoSQL이란?

**A.** 관계형 데이터 모델을 지양하며 대량의 분산된 데이터를 저장하고 조회하는 데 특화되었으며 스키마 없이 사용 가능하거나 느슨한 스키마를 제공하는 저장소입니다.

**CAP 이론:**
- **일관성(Consistency)**: 동시에 조회하는 데이터는 항상 동일한 데이터
- **가용성(Availability)**: 모든 클라이언트의 읽기와 쓰기 요청에 항상 응답 가능
- **네트워크 분할 허용성(Partition tolerance)**: 네트워크가 단절되어도 각 지역 내 시스템은 정상 동작

**저장 방식에 따른 분류:**
1. **Key-Value Model**: 키 하나로 데이터 하나를 저장 (ex: Redis)
2. **Document Model**: 키에 구조화된 문서를 저장 (ex: MongoDB)
3. **Column Model**: 키에 여러 개의 컬럼 이름과 컬럼 값의 쌍으로 저장

---

## 7. 객체지향 프로그래밍

### Q. 객체지향 프로그래밍(OOP)이란?

**A.** 컴퓨터 프로그래밍 방식 중 하나로, 프로그래밍에서 필요한 데이터를 추상화시켜 상태와 행위를 가진 객체를 만들고 그 객체들간의 유기적인 상호작용을 통해 로직을 구성하는 프로그래밍 방법입니다.

### Q. OOP의 4가지 원칙은?

**A.**

1. **캡슐화 (Encapsulation)**
   - 실제 구현 부분을 외부에 드러나지 않게 함
   - 변수와 메서드를 하나로 묶고, 데이터를 외부에서 직접 접근하지 않고 함수를 통해서만 접근
   - 정보은닉

2. **상속 (Inheritance)**
   - 이미 정의된 클래스의 모든 속성과 연산을 하위 클래스가 물려받는 것

3. **추상화 (Abstraction)**
   - 인터페이스로 클래스들의 공통적인 특성들을 묶어 표현하는 것

4. **다형성 (Polymorphism)**
   - 하나의 참조 변수로 여러 타입의 객체를 참조할 수 있는 것

### Q. SOLID 원칙에 대해 설명하세요.

**A.**

1. **SRP (Single Responsibility Principle, 단일 책임 원칙)**: 한 클래스는 하나의 책임만 가져야 함
2. **OCP (Open-Closed Principle, 개방-폐쇄 원칙)**: 소프트웨어 요소는 확장에는 열려 있어야 하고 변경에는 닫혀 있어야 함
3. **LSP (Liskov Substitution Principle, 리스코프 치환 원칙)**: 상위 타입의 객체를 하위 타입의 객체로 치환해도 정상적으로 동작해야 함
4. **ISP (Interface Segregation Principle, 인터페이스 분리 원칙)**: 인터페이스는 그 인터페이스를 사용하는 클라이언트를 기준으로 분리해야 함
5. **DIP (Dependency Inversion Principle, 의존관계 역전 원칙)**: 고수준 모듈은 저수준 모듈의 구현에 의존해서는 안됨

---

## 8. 자료구조 & 알고리즘

### Q. Array vs Linked List 차이는?

**A.**

**Array (배열)**
- 논리적 저장 순서와 물리적 저장 순서가 일치
- 인덱스로 해당 원소에 접근 가능 (Random Access)
- **시간 복잡도**: 
  - 접근: O(1)
  - 삽입/삭제: O(n) - shift 작업 필요

**Linked List (연결 리스트)**
- 논리적 저장 순서와 물리적 저장 순서가 일치하지 않음
- 각 원소는 자기 자신 다음에 어떤 원소인지만 기억
- **시간 복잡도**:
  - 접근: O(n)
  - 삽입/삭제: O(1) - 위치를 알고 있다면, O(n) - 위치를 찾아야 한다면

### Q. Stack과 Queue란?

**A.**

**Stack (스택)**
- Last In First Out (LIFO)
- 선형 자료구조
- 가장 위에 있는 원소가 호출됨

**Queue (큐)**
- First In First Out (FIFO)
- 선형 자료구조
- 먼저 들어간 원소가 먼저 나옴

### Q. Hash Table이란?

**A.** hash는 내부적으로 배열을 사용하여 데이터를 저장하기 때문에 빠른 검색 속도를 갖습니다.

- 특정한 값을 Search 하는데 데이터 고유의 인덱스로 접근하게 되므로 average case에 대하여 Time Complexity가 O(1)
- **Hash Function**: 저장할 데이터와 연관된 고유한 숫자를 만들어 내는 알고리즘

**Collision (충돌) 해결 방법:**
1. **Open Addressing (개방주소법)**: 해시 충돌이 발생하면 다른 해시 버킷에 해당 자료를 삽입
2. **Separate Chaining (분리 연결법)**: 해시 충돌이 발생하면 해당 bucket의 list에 추가

### Q. Tree란?

**A.** 트리는 비선형 자료구조로 계층적 관계를 표현합니다.

**Binary Search Tree (BST)**
- 이진 트리의 일종
- **규칙**:
  1. 노드에 저장된 키는 유일
  2. 부모의 키가 왼쪽 자식 노드의 키보다 큼
  3. 부모의 키가 오른쪽 자식 노드의 키보다 작음
- **시간 복잡도**: 평균 O(log n), 최악 O(n)

### Q. Graph란?

**A.** 정점(Vertex)과 간선(Edge)의 집합입니다.

**Graph 탐색:**
- **DFS (Depth First Search)**: 깊이 우선 탐색, Stack 사용, O(V+E)
- **BFS (Breadth First Search)**: 너비 우선 탐색, Queue 사용, O(V+E)

### Q. 시간 복잡도와 공간 복잡도란?

**A.**

**시간 복잡도 (Time Complexity)**
- 알고리즘이 실행되는 데 걸리는 시간
- Big-O 표기법 사용
- 예: O(1), O(log n), O(n), O(n log n), O(n²)

**공간 복잡도 (Space Complexity)**
- 알고리즘이 실행되는 데 필요한 메모리 공간
- 입력 크기에 따라 필요한 메모리 공간

---

## 9. Cloud Native & Distributed Systems

### Q. Cloud Native란?

**A.** 클라우드 환경에서 애플리케이션을 구축하고 실행하는 접근 방식입니다.

**특징:**
- 컨테이너 기반
- 마이크로서비스 아키텍처
- 동적 오케스트레이션
- DevOps 문화

**장점:**
- 확장성
- 유연성
- 비용 효율성
- 빠른 배포

### Q. 마이크로서비스 아키텍처(MSA)란?

**A.** 애플리케이션을 작은 독립적인 서비스들로 구성하는 아키텍처입니다.

**특징:**
- 각 서비스는 독립적으로 개발, 배포, 확장 가능
- 서비스 간 통신은 API를 통해 이루어짐
- 각 서비스는 자체 데이터베이스를 가질 수 있음

**장점:**
- 독립적인 배포
- 기술 스택 다양성
- 확장성
- 장애 격리

**단점:**
- 복잡성 증가
- 네트워크 지연
- 데이터 일관성 관리 어려움

### Q. 분산 시스템의 주요 개념은?

**A.**

**장애 처리 (Fault Tolerance)**
- 시스템 일부가 실패해도 전체 시스템이 계속 동작

**일관성 (Consistency)**
- 모든 노드에서 동일한 데이터를 볼 수 있음

**가용성 (Availability)**
- 시스템이 항상 사용 가능한 상태

**확장성 (Scalability)**
- 부하 증가에 대응할 수 있는 능력

**로드 밸런싱**
- 트래픽을 여러 서버에 분산

### Q. API Gateway란?

**A.** 클라이언트와 마이크로서비스 사이의 단일 진입점 역할을 하는 서비스입니다.

**기능:**
- 요청 라우팅
- 인증/인가
- 로드 밸런싱
- 요청/응답 변환
- 로깅 및 모니터링

---

## 10. Generative AI & LLM

### Q. Generative AI란?

**A.** 새로운 콘텐츠(텍스트, 이미지, 음성 등)를 생성하는 인공지능입니다.

**특징:**
- 기존 데이터를 학습하여 새로운 데이터 생성
- 창의적인 콘텐츠 생성 가능
- 다양한 도메인에 적용 가능

### Q. LLM (Large Language Model)이란?

**A.** 대규모 언어 모델로, 방대한 텍스트 데이터를 학습하여 자연어를 이해하고 생성하는 모델입니다.

**주요 특징:**
- **Transformer 아키텍처**: Attention 메커니즘 사용
- **사전 학습**: 대량의 텍스트 데이터로 학습
- **Fine-tuning**: 특정 작업에 맞게 미세 조정
- **Few-shot Learning**: 적은 예제로도 학습 가능

**예시:**
- GPT (Generative Pre-trained Transformer)
- BERT (Bidirectional Encoder Representations from Transformers)
- T5 (Text-To-Text Transfer Transformer)

### Q. LLM의 주요 구성 요소는?

**A.**
- **토크나이저 (Tokenizer)**: 텍스트를 토큰으로 분할
- **임베딩 (Embedding)**: 토큰을 벡터로 변환
- **트랜스포머 레이어**: 어텐션 메커니즘을 통한 처리
- **출력 레이어**: 최종 예측 생성

### Q. Prompt Engineering이란?

**A.** LLM에 효과적인 입력(Prompt)을 설계하는 기술입니다.

**기법:**
- **Few-shot Learning**: 예제를 포함한 프롬프트
- **Chain of Thought**: 단계별 추론 과정 포함
- **Role Playing**: 특정 역할을 부여
- **Format Specification**: 출력 형식 명시

### Q. RAG (Retrieval-Augmented Generation)란?

**A.** 검색과 생성을 결합한 기법으로, 외부 지식 베이스에서 관련 정보를 검색하여 LLM의 응답을 향상시킵니다.

**동작 방식:**
1. 사용자 쿼리 수신
2. 관련 문서 검색 (Retrieval)
3. 검색된 문서를 컨텍스트로 LLM에 전달
4. LLM이 컨텍스트를 기반으로 응답 생성

**장점:**
- 최신 정보 활용 가능
- 도메인 특화 지식 활용
- 환각(Hallucination) 감소

---

## 11. 개발 상식

### Q. 좋은 코드란 무엇인가?

**A.** 좋은 코드의 기준은 다양하지만, 일반적으로 다음과 같은 특징을 가집니다:

- **읽기 쉬운 코드**: 다른 개발자가 이해하기 쉬운 코드
- **중복이 없는 코드**: DRY (Don't Repeat Yourself) 원칙 준수
- **테스트가 용이한 코드**: 단위 테스트 작성이 쉬운 코드
- **유지보수가 쉬운 코드**: 변경이 용이한 코드
- **명확한 네이밍**: 변수명, 함수명이 명확한 코드

### Q. TDD란?

**A.** Test-Driven Development(테스트 주도 개발)는 매우 짧은 개발 사이클의 반복에 의존하는 소프트웨어 개발 프로세스입니다.

**TDD 사이클:**
1. **Add a test**: 새로운 기능을 추가하기 전 테스트를 먼저 작성
2. **Run all tests**: 모든 테스트를 실행하고 새로운 테스트가 실패하는지 확인
3. **Write code**: 테스트를 통과하는 가장 간단한 코드 작성
4. **Refactor code**: 코드 리팩토링

**장점:**
- 요구사항에 집중할 수 있음
- 기존 기능이 잘 작동하는지 확인 가능
- 리팩토링 시 안심하고 진행 가능
- 코드 퀄리티 향상

### Q. 함수형 프로그래밍이란?

**A.** 함수형 프로그래밍의 가장 큰 특징 두 가지는 `immutable data`와 `first class citizen으로서의 function`입니다.

**Immutable vs Mutable:**
- **Immutable**: 변경 불가능함, 값이 변경될 경우 새로운 객체를 생성
- **Mutable**: 해당 객체의 값이 변경될 경우 값을 변경

**First-class citizen:**
- 함수를 변수나 데이터 구조안에 담을 수 있음
- 함수의 파라미터로 전달할 수 있고, 함수의 반환값으로 사용 가능

### Q. Git과 GitHub에 대해서

**A.**

**Git**
- VCS(Version Control System)로 소스 코드의 버전을 관리하는 도구
- 분산 버전 관리 시스템

**GitHub**
- Git을 사용하는 프로젝트를 위한 웹 기반 호스팅 서비스
- 코드 저장소, 협업 도구, 이슈 트래킹 등 제공

**Git 전략:**
- **Gitflow**: master, develop, feature, release, hotfix 브랜치 사용
- **GitHub flow**: master 브랜치와 feature 브랜치만 사용하는 간단한 전략

---

## 12. 디자인 패턴

### Q. 디자인 패턴에 대해서 아는 것을 말해보세요.

**A.** 디자인 패턴은 소프트웨어 설계에서 자주 발생하는 문제에 대한 재사용 가능한 해결책입니다.

**주요 디자인 패턴:**

**1. 싱글톤 패턴 (Singleton Pattern)**
- 전역 변수를 사용하지 않고 객체를 하나만 생성하도록 하는 패턴
- getInstance 메서드를 통해 동일한 인스턴스 반환

**2. 팩토리 패턴 (Factory Pattern)**
- 객체 생성 로직을 분리하여 클라이언트 코드와 결합도를 낮추는 패턴
- 객체 생성의 책임을 팩토리 클래스에 위임

**3. 옵저버 패턴 (Observer Pattern)**
- 객체의 상태 변화를 관찰하는 관찰자들의 목록을 객체에 등록하여 상태 변화가 있을 때마다 통지하도록 하는 패턴

**4. 전략 패턴 (Strategy Pattern)**
- 알고리즘을 정의하고 각각을 캡슐화하여 상호 교환 가능하게 만드는 패턴

**5. 어댑터 패턴 (Adapter Pattern)**
- 호환되지 않는 인터페이스를 가진 클래스들을 함께 작동하도록 해주는 패턴

**디자인 패턴의 목적:**
- 코드 재사용성 향상
- 유지보수 용이성
- 확장성
- 코드의 가독성 향상

---

## 📌 면접 팁

- 질문에 대한 답변을 모를 경우, 질문에 대한 답변을 알려주실 수 있냐고 물어보는 것이 좋습니다.
- 프로페셔널한 개발자분들은 성심성의껏 답변해주시는 분들이 많고, 답을 틀렸다고 불합격을 주지도 않습니다.
- 오히려 이런 열의를 좋게 봐주시는 경우가 많습니다.
- 모르는 것을 아는 것처럼 말하지 말고, 솔직하게 모른다고 말하되, 관련된 지식이라도 말해보는 것이 좋습니다.
- 질문을 정확히 이해했는지 확인하고 답변하는 것이 중요합니다.
- Take home test 이후의 기술 면접이므로, 테스트에서 작성한 코드에 대한 질문이 나올 수 있습니다. 자신이 작성한 코드를 설명할 수 있도록 준비하세요.

---

## 📋 추가로 준비하면 좋을 내용

### 1. JavaScript/TypeScript 실무 경험
- 실제 프로젝트에서 사용한 패턴이나 라이브러리
- 성능 최적화 경험
- 에러 처리 경험

### 2. Node.js 실무 경험
- Express.js 또는 다른 프레임워크 사용 경험
- 비동기 처리 경험
- API 개발 경험

### 3. CI/CD 실무 경험
- GitHub Actions를 사용한 자동화 경험
- 테스트 자동화
- 배포 프로세스

### 4. 코드 리뷰 경험
- 코드 리뷰를 받거나 한 경험
- 코드 품질 개선 사례

### 5. 협업 경험
- Git을 사용한 협업 경험
- Agile/Scrum 경험
- 팀 프로젝트 경험

### 6. 문제 해결 경험
- 디버깅 경험
- 성능 문제 해결 경험
- 기술적 도전과 해결 과정

---

## 🔍 면접 전 체크리스트

- [ ] JavaScript 핵심 개념 정리 (호이스팅, 클로저, this, Promise, async/await)
- [ ] TypeScript 기본 문법 및 타입 시스템 이해
- [ ] Node.js 기본 개념 및 이벤트 루프 이해
- [ ] CI/CD 및 GitHub Actions 기본 사용법
- [ ] 자료구조와 알고리즘 기본 개념
- [ ] OOP 원칙 및 SOLID 원칙
- [ ] 네트워크 기본 개념 (HTTP, REST, CORS)
- [ ] 데이터베이스 기본 개념 (트랜잭션, 인덱스)
- [ ] Cloud Native 및 분산 시스템 기본 개념
- [ ] Generative AI 및 LLM 기본 개념 (Nice to have)
- [ ] Take home test 코드 리뷰 및 설명 준비

