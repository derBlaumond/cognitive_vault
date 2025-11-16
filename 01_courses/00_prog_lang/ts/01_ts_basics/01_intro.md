##  What is TypeScript, and Why Use It?

### 1. TypeScript란 무엇인가

- **TypeScript는 Microsoft가 개발한 오픈소스 프로그래밍 언어**
- **JavaScript의 Superset**
    - 기존 JS 위에 기능을 확장한 언어
    - JS 코드 그대로 동작

- 핵심 목적:
    - **==정적 타입(static typing)==** 제공
    - 코드의 안정성 증가
    - 오류를 실행 전에 사전에 발견
    - 대규모 프로젝트에서 유지보수 용이

### 2. TypeScript의 핵심 특징

#### (1) 정적 타입

- 변수, 함수, 객체 등의 타입을 명시
- ==런타임 오류를 컴파일 단계에서 찾아줌==

#### (2) OOP 지원

- 클래스, 인터페이스, 상속 등 명확한 구조 설계 가능

#### (3) 인터페이스와 타입 별칭

- 데이터 구조(Shape)를 명확히 정의
- 팀 프로젝트에서 코드 이해도가 증가

#### (4) JavaScript와 100% 호환

- 기존 JS 라이브러리/프레임워크 그대로 사용 가능
    

#### (5) 고급 개발자 도구 지원(IDE 친화적)

- 자동완성(IntelliSense), 리팩토링, 타입 검사 등 강력한 개발 경험 제공
    

요약: **JavaScript의 유연함 + 정적 타입 언어의 안정성을 결합한 현대적 개발 언어**

---

## ## History and Evolution of TypeScript

### 1. JavaScript의 시작

- 1995년 Brendan Eich가 Netscape에서 개발
    
- 초기 이름: Mocha → LiveScript → JavaScript로 변경
    
- 웹에 상호작용성을 넣기 위해 10일 만에 개발
    
- Netscape Navigator 2.0과 함께 배포되며 빠르게 확산
    

하지만 JavaScript의 급성장과 함께 한계도 드러났음:

- 대규모 프로젝트에서 유지보수 어려움
    
- 정적 타입 부재로 오류가 늦게 발견됨
    
- 복잡한 애플리케이션을 다루기 어려움
    

### 2. TypeScript의 등장 (2012, Microsoft)

- 창시자: Anders Hejlsberg (C#의 창시자)
    
- JS의 한계를 개선하기 위해 개발
    
- 주요 특징:
    
    - 선택적 정적 타입
        
    - 인터페이스
        
    - 클래스 기반 OOP
        
    - 기존 JS와 완전 호환
        
- JS로 컴파일되기 때문에 브라우저/Node 환경에서 문제 없음
    

### 3. TypeScript의 성장

- Angular가 TS를 공식 언어로 채택하면서 급확산
    
- 대규모 기업·오픈소스 커뮤니티에서 적극 채택
    
- 개발자 설문조사에서 상위권 언어로 지속 선정
    
- 대형 엔터프라이즈 프로젝트에서 기본 언어로 자리잡음
    

---

## ## TypeScript vs. JavaScript

### 1. 주요 비교 포인트

#### (1) 타입 시스템

- **TS: 정적 타입**
    
    - 컴파일 단계에서 오류 발견
        
- **JS: 동적 타입**
    
    - 런타임에서 오류 발생
        

#### (2) 개발 도구(IDE) 지원

- TS는 IntelliSense, 자동완성, 타입 기반 제안이 매우 강력
    
- JS는 상대적으로 단순한 기능
    

#### (3) 문법 및 기능

- TS는 클래스 기반 OOP, 인터페이스, Enum 등 고급 기능 제공
    
- JS는 전통적인 문법 기반
    

### 2. 코드 실행

- TS는 JS로 컴파일해야 실행 가능
    
- JS는 브라우저/Node가 바로 실행
    

### 3. 학습 난이도

- JS → 쉽고 빠르게 시작 가능
    
- TS → 타입 시스템을 이해해야 하므로 초기 진입 장벽 존재
    

요약:  
JS는 시작하기 쉽고 유연한 언어,  
TS는 팀 개발·대규모 프로젝트에 적합한 확장형 언어.

---

## ## Extensions to Work with TypeScript (VS Code 확장 추천)

### 주요 확장 목록

#### 1. ESLint

- 코드 품질 검사
    
- 오류 및 스타일 규칙 강제
    
- 팀 협업에서 필수적
    

#### 2. JavaScript and TypeScript Nightly

- TypeScript 최신 빌드 적용
    
- 최신 기능 또는 버그 수정 테스트용
    

#### 3. Live Server

- HTML/CSS/JS 파일 변화 시 자동 새로고침
    
- 프론트 개발 시 필수
    

#### 4. Material Icon Theme

- 폴더/파일 아이콘 가독성 증가
    

#### 5. Prettier

- 코드 자동 포매팅
    

#### 6. Prettier ESLint

- Prettier + ESLint 통합
    
- 팀 프로젝트에서 많이 사용
    

#### 7. Pretty TypeScript Errors

- VS Code에서 TS 에러 메시지를 더 보기 좋게 표시
    
- 디버깅 편의성 증가
    

---

## ## TypeScript Ecosystem vs. JavaScript Ecosystem

### 1. JavaScript Ecosystem 특징

- 20년 이상 웹의 중심 언어
    
- 프론트·백엔드·모바일·데스크톱 등 전 영역 활용
    
- 수많은 라이브러리(NPM), 프레임워크(React, Vue, AngularJS) 보유
    
- 매우 큰 개발자 커뮤니티
    

### 2. TypeScript Ecosystem 특징

- JS 기반이므로 전체 JS 생태계를 그대로 상속
    
- 엔터프라이즈 개발에 적합
    
- Angular는 TS 기반
    
- React, Vue, Next.js, NestJS는 TS 적용률 높음
    
- 강력한 IDE 및 타입 지원으로 협업 효율 증가
    

### 3. 비교 테이블 (요약)

|항목|JavaScript|TypeScript|
|---|---|---|
|타입|동적|정적|
|성숙도|1995년부터, 매우 큼|2012년부터, 빠르게 성장|
|학습 난이도|매우 쉬움|타입 개념 필요|
|오류 검출|런타임|컴파일 타임|
|적합한 프로젝트|소규모·프로토타입|대규모·엔터프라이즈|

---

## ## Configuring tsconfig.json

### tsconfig.json의 역할

- 프로젝트 루트 설정
    
- 컴파일 옵션 설정
    
- 타입 검사 범위 및 빌드 동작 제어
    

### 생성 방법

1. `tsc --init`
    
    - 기본 설정 자동 생성
        
2. 수동 생성
    
    - 직접 파일 만들고 `compilerOptions` 구성
        

### 주요 옵션

- **target**: 컴파일될 JS 버전 (ex. ES5, ES6)
    
- **module**: CommonJS / ES Module
    
- **strict**: 모든 strict 옵션 활성화
    
- **esModuleInterop**: ES Module ↔ CommonJS 호환성 향상
    
- **skipLibCheck**: 라이브러리 타입 체크 생략 (속도 증가)
    
- **baseUrl / paths**: 모듈 경로 정리
    
- **outDir**: 컴파일된 파일이 위치할 폴더
    
- **rootDir**: TS 소스 파일이 있는 루트 경로
    
- **removeComments**: JS 출력에서 주석 제거
    
- **sourceMap**: TS ↔ JS 매핑 파일 생성
    

---

## ## TypeScript Compiler Options (심화 설명)

### 1. 핵심 옵션

- **target**: 최종 JS 버전
    
- **module**: CommonJS, ES6 등
    
- **strict**: 강력한 타입 검사
    
- **esModuleInterop**: 모듈 호환성
    

### 2. 추가 옵션

- **skipLibCheck**: .d.ts 타입 검사 제외
    
- **baseUrl**: 경로 기반 import 간소화
    
- **paths**: alias 가능
    
- **outDir**: JS 출력 경로 지정
    
- **rootDir**: 소스 루트
    
- **removeComments**
    
- **lib**: ES2015, DOM 등 포함 라이브러리 결정
    
- **sourceMap**: 디버깅을 위한 매핑 파일 생성
    

---

##  How TypeScript Compiles to JavaScript

### 1. 컴파일러(TSC)의 역할

- TypeScript → JavaScript 변환
    
- 타입 검사, 오류 확인
    
- 브라우저·Node.js에서 실행 가능한 코드 생성
    

### 2. TypeScript의 특징

- JS의 superset → TS 기능은 JS로 변환되며 실행
    
- TS는 JS를 “대체”하는 게 아니라 “확장”하는 언어
    

### 3. 컴파일 단계

#### (1) Parsing (파싱)

- .ts 파일 읽기
    
- AST(Abstract Syntax Tree) 생성
    
- 문법 오류 확인
    

#### (2) Type Checking (타입 검사)

- 타입 일치 여부 분석
    
- 오타, 잘못된 타입 사용 등을 컴파일 단계에서 잡아냄
    

#### (3) Transformation (변환)

- TS 전용 기능 제거·변환
    
    - 예: interface는 JS에서는 사라짐
        
- JS로 변환 가능한 코드로 변형
    

#### (4) Emitting (출력)

- 최종 JavaScript 파일 생성
    
- 필요하면 .map 파일도 생성하여 디버깅 개선
    

---

##  Abstract Syntax Tree (AST)

### 1. AST란?

- 컴파일러가 코드 구조를 표현하는 트리 구조
    
- 함수, 변수, 표현식 등을 “노드”로 변환
    
- 코드의 의미적 구조를 이해하기 위한 기반
    

### 2. 생성 과정

1. **parse**: 코드 → 토큰
    
2. **analyze**: 문법 검사
    
3. **abstract**: 불필요한 세부정보 제거
    
4. **compile**: AST 기반 JS 생성
    

### 3. 예시

TypeScript 함수 → AST 트리 형태로 세부 노드 구성

- 함수 선언
    
- 파라미터
    
- 타입
    
- 내부 코드 등
    

### 4. 역할

- 컴파일러의 핵심 구조
    
- 정적 분석, 리팩토링 자동화, IDE 기능의 기반
    

---

##  How Compiler Does Type Checking (타입 검사 과정)

### 1. 목적

- 타입 오류를 실행 전에 미리 잡기
    
- 변수, 함수, 반환값 등의 타입 검증
    

### 2. 과정 구성 요소

#### (1) Type Inference (타입 추론)

- `let x = 10` → 자동으로 number 타입 판별
    

#### (2) Type Annotations (타입 명시)

- `let name: string`
    
- 의도를 명확히 하고 오류 예방
    

#### (3) Type Compatibility (타입 호환성 검사)

- 서로 다른 타입이 할당 가능한지 검사
    

#### (4) Type Guards

- `typeof`, `instanceof`, user-defined guard
    
- 런타임 조건 기반으로 타입 좁히기
    

#### (5) Type Aliases / Mapped Types

- 기존 타입 재사용
    
- 새로운 타입 구조 생성
    

#### (6) Generics

- 다양한 타입에 대해 재사용 가능한 구조 제공
    

#### (7) Type Declaration Files (.d.ts)

- 외부 JS 라이브러리의 타입 정의
    
- 자동 완성, 타입 검사 제공
    

---

##  Type Inference

### 1. Type Inference란?

- 타입을 직접 지정하지 않아도 컴파일러가 추론
    
- 초기값 기반으로 타입 결정 → 불필요한 타입 선언 감소
    

### 2. 적용 범위

- 변수
    
- 표현식
    
- 함수 반환값
    

### 3. 추론 과정

- 타입 체크 과정에서 자동 실행
    
- “Best Common Type”, Widening, Control Flow Analysis 등 다양한 전략 사용