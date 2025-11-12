## 1. Overview of Web and Cloud Development

웹 개발을 시작할 때, 무엇을 배우고 어떤 순서로 배워야 하는지는 혼란스러울 수 있다.  
웹사이트가 어떻게 구성되고 사용자에게 전달되는지 이해하는 것이 좋은 출발점이다.

웹사이트는 다음 단계로 작동한다.

1. 사용자가 인터넷 브라우저(Chrome, Edge, Firefox, Safari 등)를 연다.
2. 주소창에 URL(예: [www.ibm.com)을](http://www.ibm.xn--com\)-jy1s/) 입력한다.
3. 브라우저가 해당 서버에 요청(request)을 보낸다.
4. 서버는 웹사이트를 구성하는 데이터를 응답(response)으로 반환한다.

서버가 반환하는 주요 요소:

- **HTML**: 페이지의 구조를 정의한다.
- **CSS**: 페이지의 스타일을 담당한다.
- **JavaScript**: 상호작용 및 동적 기능을 구현한다.

웹사이트의 콘텐츠는 정적(static) 또는 동적(dynamic)일 수 있다. 대부분의 웹사이트는 정적 요소와 동적 요소를 함께 사용한다.

1. 정적 콘텐츠는 서버에 미리 저장된 정보이며,  
2. 동적 콘텐츠는 사용자의 요청마다 새롭게 생성되는 정보다.  

- 클라우드 애플리케이션은 웹사이트와 유사하지만,  
	클라우드 기반의 백엔드 인프라, 데이터 저장소, 데이터 처리, 기타 서비스와 통합되어 **확장성과 복원력**이 뛰어나다.

웹 및 클라우드 애플리케이션 개발 환경은 **프론트엔드(front-end)** 와 **백엔드(back-end)** 로 구분된다.

- **프론트엔드**: 사용자가 보고 상호작용하는 클라이언트 측 부분. (HTML, CSS, JS 등 사용)
- **백엔드**: 서버 측 로직과 데이터 처리를 담당하며 인증, 데이터 흐름 등을 관리한다.
- **풀스택(full-stack)** 개발자는 두 영역 모두를 다룰 수 있다.

---
## 2. Learning Front-End Development

프론트엔드는 사용자가 직접 보고 상호작용하는 웹사이트의 영역이다.  
일반적으로 HTML, CSS, JavaScript를 함께 사용해 개발한다.

- **HTML**: 웹사이트의 기본 구조를 만든다. (텍스트, 링크, 이미지, 동영상, 버튼 등)
- **CSS**: 스타일과 레이아웃을 정의한다. 웹사이트의 색상, 폰트, 배치 등을 통일적으로 적용한다.
- **JavaScript**: HTML/CSS로 정의된 요소에 기능과 상호작용을 추가한다.

예를 들어, HTML로 로그인 버튼을 만들고 CSS로 디자인한 뒤, JavaScript로 버튼의 동작을 구현한다.

프론트엔드 개발자는 **CSS 확장 언어**도 활용한다.

- **SASS (Syntactically Awesome Style Sheets)**: CSS에 변수, 중첩 규칙, 인라인 import 등을 추가한 언어.
    
- **LESS (Leaner Style Sheets)**: CSS를 확장해 더 많은 기능을 제공하며, JS 도구(less.js)로 CSS로 변환한다.

또한 프론트엔드 웹사이트는 **적응형(adaptive)** 또는 **반응형(responsive)** 디자인을 사용한다.

- **적응형**: 특정 화면 크기에 맞춘 별도 버전 제공.
    
- **반응형**: 화면 크기에 따라 자동으로 크기가 조정됨.

프론트엔드 개발자는 여러 브라우저와 운영체제, 기기에서 작동하도록 지속적으로 코드를 개선해야 한다.

---

## 3. The Importance of Back-End Development

백엔드는 사용자가 입력한 데이터와 요청을 처리하고, 필요한 정보를 응답하는 서버 측 구성 요소다.  
예를 들어, 로그인, 제품 검색, 결제 과정에서 사용되는 모든 데이터 처리는 백엔드에서 이루어진다.

백엔드 개발자는 다음과 같은 기능을 구현한다.

- 사용자 입력 처리
    
- 데이터 요청 및 응답 처리
    
- 사용자 인증, 권한 관리
    
- 민감한 정보의 안전한 저장 및 전송

프론트엔드와 백엔드는 긴밀하게 협력해야 하며, **API**를 통해 상호작용한다.

주요 개념:

- **API (Application Programming Interface)**: 데이터 교환 규칙을 정의 (JSON, XML 등 사용)
    
- **Route**: 사용자 요청이 들어오는 경로
    
- **Endpoint**: 요청이 처리되는 실제 코드 위치  
    ==Endpoint가 없을 경우 서버는 404 오류를 반환==한다.

백엔드 개발에 사용되는 주요 언어:

- **JavaScript (Node.js, Express)**
    
- **Python (Django, Flask)**
    

데이터베이스 작업을 위해 **SQL** 또는 **ORM(Object Relational Mapping)** 도구를 사용한다.  
ORM은 쿼리 복잡성을 줄이지만, 데이터베이스의 기본 구조 이해는 여전히 중요하다.

백엔드 개발은 사용자 계정, 인증, 데이터 처리, 보안, API 제공 등 보이지 않는 핵심 기능을 담당한다.

---

## 4. Teamwork and Squads

팀워크는 공통의 목표를 위해 함께 일하는 사람들의 협력이다.  
다양한 기술과 경험을 가진 구성원이 함께 일할 때 창의성이 높아진다.

팀워크의 핵심 요소:

- 상호 신뢰와 존중
    
- 명확한 목표 설정
    
- 역할 분담
    
- 성과 공유 및 문제 분석
    
- 효과적인 의사소통

소프트웨어 엔지니어링에서의 팀워크는 다음과 같은 형태로 이루어진다.

- **킥오프 미팅**: 프로젝트 목표, 역할, 일정 설정
    
- **정기 회의 및 코드 리뷰**: 진행 상황 점검 및 품질 개선
    
- **멘토링**: 선임 개발자 또는 동료 간 지식 공유
    
- **레트로스펙티브(회고)**: 개선점 및 성공 요인 분석

Agile 개발 방식에서는 소규모 팀을 **Squad**라 부른다.  
일반적으로 10명 이하로 구성되며, **Squad Leader**와 **Software Engineers**, **UX 디자이너** 등이 포함된다.  
일부 Squad는 **Pair Programming**을 수행한다.

---
## 5. Pair Programming

페어 프로그래밍은 두 명의 개발자가 한 컴퓨터(또는 공유 화면)에서 함께 코드를 작성하는 Agile 방식이다.

### 주요 스타일

- **Driver/Navigator**: 한 명은 코드를 작성(Driver), 다른 한 명은 검토 및 방향 제시(Navigator). 정기적 역할 교대 필요.
    
- **Ping-Pong**: 테스트 주도 개발(TDD) 기반. 한 명이 테스트를 작성하고 다른 한 명이 이를 통과시키는 코드 작성 후 교대.
    
- **Strong Style**: 주로 ==시니어가 Navigator, 주니어가 Driver==. 아이디어가 “다른 사람의 손을 거쳐야 코드가 된다”는 원칙.

### 장점

- 지식과 기술의 상호 전파
    
- 새 팀원이 빠르게 프로젝트에 적응
    
- 실시간 코드 리뷰와 오류 감소
    
- 협력적 문제 해결 능력 향상

### 단점

- 장시간 집중으로 인한 피로
    
- 역할 불균형(한쪽이 과도하게 주도)
    
- 일정 충돌 또는 성격 차이 문제
    
- 다수의 페어 팀이 동시에 있을 경우 소음 유발

---
## 6. Introducing Application Development Tools

클라우드 애플리케이션을 설계하고 배포하기까지 여러 도구가 필요하다.  
대표적으로 **버전 관리 시스템, 라이브러리, 프레임워크**가 있다.

- **버전 관리 (Version Control)**: 코드 변경 이력 추적 및 충돌 해결 (Git, GitHub 등).
    
- **라이브러리 (Library)**: 특정 기능을 재사용 가능한 코드 형태로 제공 (예: jQuery, Email-validator, Apache Commons).
    
- **프레임워크 (Framework)**: 애플리케이션 구조를 표준화해 개발 효율성을 높임 (예: AngularJS, Vue.js, Django).
    

프레임워크는 “Inversion of Control(제어의 역전)” 원칙을 따른다.  
즉, 개발자가 프레임워크를 호출하는 대신, 프레임워크가 개발자의 코드를 호출한다.  
이로 인해 코드 일관성과 표준화가 향상되지만 유연성은 줄어든다.

---
## 7. More Application Development Tools

### CI/CD (Continuous Integration / Continuous Deployment)

- 코드 변경 사항을 자동 통합 및 배포하는 DevOps 실천 방식.
    
- 빌드 자동화 서버를 통해 신뢰성 있는 코드 통합과 테스트 수행.

### 빌드 도구 (Build Tools)

- 소스 코드를 실행 가능한 형태로 변환.
    
- 의존성 관리, 테스트, 배포를 자동화.
    
- 예시: Webpack, Babel, WebAssembly.

### 패키지 및 패키지 매니저 (Packages & Package Managers)

- 앱의 실행 파일, 메타데이터, 설치 지침 등을 포함한 파일 묶음.
    
- 패키지 매니저는 설치, 업데이트, 의존성 해결을 자동으로 처리.
    

주요 패키지 매니저:

- Linux: DPKG, RPM
    
- Windows: Chocolatey
    
- MacOS: Homebrew, MacPorts
    
- Node.js: npm
    
- Java: Gradle, Maven
    
- Python: Pip, Conda
    
- Ruby: RubyGems

---
## 8. Introduction to Software Stacks

소프트웨어 스택은 응용 프로그램 개발에 필요한 기술의 조합이다.  
프론트엔드·백엔드 언어, 데이터베이스, 프레임워크, 서버, 운영체제 등을 포함한다.

일반적으로 세 가지 계층으로 구성된다.

1. **Presentation Layer** – 사용자 인터페이스(UI)
    
2. **Business Logic Layer** – 애플리케이션 로직
    
3. **Data Layer** – 데이터베이스 관리

대표적인 소프트웨어 스택:

- **LAMP**: Linux, Apache, MySQL, PHP – 오픈소스, 안정적이지만 플랫폼 종속적
    
- **MEAN**: MongoDB, Express, Angular, Node.js – 전부 JavaScript 기반, 빠른 개발
    
- **MERN**: MongoDB, Express, React, Node.js – React 기반, 높은 성능
    
- **MEVN**: MongoDB, Express, Vue, Node.js – 경량, 성능 우수

MEAN/MEVN의 장점:

- 모든 계층이 JavaScript로 통일되어 개발 효율이 높다.  
    단점:
    
- 대규모 시스템에는 비효율적이며, MongoDB는 관계형 기능이 부족하다.

LAMP의 장점:

- 오랜 역사와 커뮤니티 지원, 풍부한 코드 재사용성  
    단점:
    
- 플랫폼 종속성(Linux 기반), 언어 불일치(PHP/Python vs JavaScript)

---
## 9. Insiders' Viewpoint: Tools and Technologies

전문가들의 실무 도구 및 기술 사용 경험:

- 대부분의 개발팀은 **Git/GitHub**를 사용해 코드 버전 관리, 협업, 이슈 추적을 수행한다.
    
- **VS Code**는 자동 포매팅(Prettier)과 린팅(ESLint)으로 코드 품질을 유지한다.
    
- **React.js**는 빠른 속도, 효율성, JSX 지원으로 인기 높음.
    
- **Express.js**는 Node.js 기반 백엔드 개발에 최적화되어 있으며, 캐싱 기능으로 성능을 향상시킨다.
    
- **Axios**는 외부 API 요청 처리에 사용된다.
    
- **ES6**의 최신 문법(화살표 함수, 전개 연산자 등)은 코드 가독성과 간결성을 높인다.