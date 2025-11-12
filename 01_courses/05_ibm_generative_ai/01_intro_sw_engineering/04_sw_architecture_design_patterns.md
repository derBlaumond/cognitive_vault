## 1. Introduction to Software Architecture

소프트웨어 아키텍처는 시스템의 **조직과 구조를 정의하는 청사진(blueprint)** 이다.  
이는 소프트웨어 시스템의 구성 요소가 **어떻게 상호작용하고 동작하는지**, 그리고 **운영 환경과 설계 원칙** 을 설명한다.

### 아키텍처의 역할

- 시스템의 **기본 구조와 동작 원리** 정의
    
- 각 구성 요소 간의 **상호작용 방식** 명시
    
- **운영 환경(Production Environment)** 에 적합한 구조 제시
    
- 개발 중 **변경하기 어려운 핵심 설계 결정을 사전에 정의**

### 주요 고려사항 (비기능적 요구사항)

- 성능 (Performance)
    
- 확장성 (Scalability)
    
- 유지보수성 (Maintainability)
    
- 상호운용성 (Interoperability)
    
- 보안성 (Security)
    
- 관리성 (Manageability)

### 좋은 소프트웨어 아키텍처의 중요성

1. **이해관계자 간의 커뮤니케이션 기반** 제공
    
2. **가장 초기 설계 결정을 캡처** → 이후 구현의 방향 결정
    
3. **요구사항 변경에 대한 민첩성(Agility)** 확보
    
4. **시스템 수명 연장** – 구현 세부사항이 바뀌어도 구조는 유지됨

### 기술 스택(Tech Stack)과의 관계

- 아키텍처는 어떤 기술 스택을 사용할지 결정하는 기준이 된다.
    
- 스택은 프로그래밍 언어, 라이브러리, 프레임워크, 운영 환경 등을 포함한다.
    
- 아키텍트는 각 기술의 **장단점과 제약조건** 을 이해해야 한다.

### 설계 산출물 (Artifacts)

- **Software Design Document (SDD)**
    
    - 설계 구현 지침, 기능적 요구사항, 제약조건, 가정, 방법론 포함.
        
- **Architectural Diagram**
    
    - 구성요소, 상호작용, 제약사항을 시각적으로 표현.
        
- **UML (Unified Modeling Language)**
    
    - 언어 비종속적 다이어그램으로 구조와 동작을 시각화.

### 배포 고려 (Production Deployment)

- 아키텍처는 소프트웨어가 실행될 **운영 환경 선택** 에 영향을 준다.
    
- 서버, 로드밸런서, 데이터베이스 등 인프라 구성요소를 결정.

**요약:**  
소프트웨어 아키텍처는 시스템의 청사진으로, 초기 설계 결정을 담고 있으며 기술 스택과 배포 환경, 문서화 산출물(SDD, UML)에 모두 영향을 미친다.

---

## 2. Software Design and Modeling

소프트웨어 설계는 시스템의 **구조적 구성 요소와 행동적 속성** 을 구체화하는 단계이다.  
이 과정에서 다양한 다이어그램을 통해 **시각적 모델링** 이 이루어진다.

### Structured Design (구조적 설계)

- 문제를 **모듈(Module)과 하위 모듈(Sub-Module)** 로 분할.
    
- 목적: **조직적 구조화 및 모듈 간 독립성 확보**
    
- 원칙:
    
    - **Cohesion(응집도)**: 관련된 기능이 하나의 모듈 안에 있어야 함.
        
    - **Coupling(결합도)**: 모듈 간 의존성은 낮을수록 좋음 (loose coupling).

이러한 구조는 **서비스 지향 아키텍처(SOA)** 나 **마이크로서비스(Microservices)** 설계에서 자주 사용된다.

### Behavioral Model (행위적 모델)

- 시스템이 **무엇을 하는지** 설명 (어떻게 하는지는 설명하지 않음).
    
- UML 기반으로 표현:
    
    - **State Transition Diagram (상태 전이도)**
        
        - 시스템의 상태 변화와 그를 유발하는 이벤트 표시.
            
        - 예: 병원 환자의 상태 변화 → “대기(waiting)” → “검사(testing)” → “진료 중(with doctor)”.
            
    - **Interaction Diagram (상호작용 다이어그램)**
        
        - 객체 간 상호작용을 시간 순서대로 표현.
            
        - 예: 환자가 온라인 포털에서 예약을 생성 → 시스템이 확인 응답.

### UML (Unified Modeling Language)

- 언어에 독립적인 **표준 시각화 언어**.
    
- 구조적(Structural)과 행위적(Behavioral) 다이어그램으로 구분됨.
    
- 주요 장점:
    
    1. **개발 전 단계에서 기능 계획 가능 → 비용 절감**
        
    2. **새로운 팀원 온보딩에 도움**
        
    3. **기술자와 비기술자 간 커뮤니케이션 용이**
        
    4. **코드 간 관계를 시각화하여 유지보수 용이**

**요약:**  
구조적 설계는 모듈화와 응집도를, 행위적 모델은 시스템 동작을 시각화한다.  
UML은 이러한 두 가지 설계를 통합적으로 표현하는 표준 도구이다.

---

## 3. Object-Oriented Analysis and Design (OOAD)

객체지향 분석 및 설계는 **객체(Object) 중심으로 시스템을 모델링** 하는 접근법이다.  
Java, C++, Python 등의 **객체지향 언어(OOP)** 기반 시스템에 적합하다.

### 핵심 개념

- **Object (객체)**: 데이터와 행동(메서드)을 함께 가지는 단위.  
    예: `환자(Patient)` → 속성(name, ID), 행동(예약, 취소 등)
    
- **Class (클래스)**: 객체의 청사진(blueprint).  
    예: `Patient` 클래스 → 객체 생성 시 속성과 행동이 구체화됨.
    
- **Instance (인스턴스)**: 클래스로부터 생성된 구체적인 객체.  
    예: `Naya Patel` 은 `Patient` 클래스의 인스턴스.

객체는 **속성(Attributes)** 과 **메서드(Methods)** 를 가진다.  
예를 들어:

```
Class: Doctor
Attributes: name, specialization
Methods: diagnose(), prescribe()
```

### Class Diagram (클래스 다이어그램)

- **객체 간 관계 및 상속 구조** 를 시각화하는 UML 구조 다이어그램.
    
- 상속(Inheritance): 하위 클래스가 상위 클래스의 속성과 메서드를 물려받음.
    
    - 예: `Specialist` → `Doctor` → `MedicalPersonnel`
        
- 관계는 상속, 포함, 의존 등으로 표시됨.

**요약:**  
OOAD는 객체 중심의 설계 방법론이며, 클래스 다이어그램을 통해 구조적 관계를 표현한다.  
클래스는 객체의 청사진이고, 객체는 데이터와 행동을 함께 가진다.

---

## 4. Insiders' Viewpoint: Importance of Design and Software Architecture

전문가들은 다음과 같이 강조한다.

- 설계와 아키텍처는 **프로젝트의 방향성을 정하는 핵심 요소**이다.
    
- 명확한 아키텍처 없이 개발을 시작하면, 추후 **코드 수정과 리팩토링 비용이 급증**한다.
    
- 시스템은 **확장성(Scalability)**, **지속 가능성(Sustainability)**, **호환성(Compatibility)** 을 고려해야 한다.
    
- 마이크로서비스 환경에서는 데이터 흐름, 권한 관리, 서비스 간 호출 방식 등  
    **아키텍처적 결정이 전체 성능과 신뢰성에 직접적 영향**을 미친다.
    
- 좋은 아키텍처는 **10년 이상 유지 가능한 시스템 설계 기반**이 된다.

**핵심 인사이트:**  
“좋은 코드보다 좋은 구조가 더 오래간다.”  
즉, 시스템을 처음 설계할 때의 결정이 장기적 안정성을 좌우한다.

---

## 5. Approaches to Application Architecture

### Component-Based Architecture (컴포넌트 기반 아키텍처)

- **컴포넌트(Component)**: 독립적 기능 단위로 캡슐화된 모듈.
    
- 주요 특징 (6가지 원칙):
    
    1. **Reusable** – 재사용 가능
        
    2. **Replaceable** – 교체 용이
        
    3. **Independent** – 다른 컴포넌트에 의존하지 않음
        
    4. **Extensible** – 기능 확장 가능
        
    5. **Encapsulated** – 내부 상태 은닉
        
    6. **Non-context specific** – 다양한 환경에서 작동

예시:

- 데이터베이스 접근용 DAO(Data Access Object)
    
- API 컴포넌트 (다수의 시스템에서 재사용 가능)
    
- Controller 컴포넌트 (데이터 흐름 제어)

### Service-Oriented Architecture (SOA)

- **서비스(Service)**: 독립적으로 배포되고 여러 시스템에서 재사용 가능한 기능 단위.
    
- 컴포넌트보다 상위 개념이며, 네트워크 프로토콜(HTTP 등)을 통해 상호작용.
    
- 특징:
    
    - 느슨한 결합(loose coupling)
        
    - 재사용성
        
    - 비즈니스 로직 중심 설계

### Distributed Systems (분산 시스템)

- 여러 서비스가 **서로 다른 서버나 노드에서 동작**하며 메시지 교환으로 통신.
    
- 특징:
    
    - 장애 허용성 (Fault Tolerance)
        
    - 확장성 (Scalability)
        
    - 동시성 (Concurrency)
        
    - 이기종 환경 지원 (OS, 언어 상이해도 가능)

대표 구조:

- Client-Server
    
- 3-Tier
    
- Peer-to-Peer
    
- Microservices

**요약:**  
컴포넌트 기반 설계는 모듈 단위, SOA는 서비스 단위, 분산 시스템은 네트워크 단위에서 구조를 정의한다.

---

## 6. Architectural Patterns in Software

### 1) 2-Tier (Client–Server)

- 클라이언트와 서버로 구성된 단순한 구조.
    
- 예시: 텍스트 메시지 앱, DB 클라이언트–서버 구조.

### 2) 3-Tier (Presentation–Application–Data)

- 세 계층으로 분리된 가장 일반적 구조.
    
- 예시: 웹앱 (웹 서버 → 애플리케이션 서버 → 데이터베이스)

### 3) Peer-to-Peer (P2P)

- 중앙 서버 없이 노드가 **서로 클라이언트이자 서버로 작동**.
    
- 예시: 비트코인, 이더리움 등 블록체인 네트워크.

### 4) Event-Driven

- 이벤트 생산자(Producer)와 소비자(Consumer) 간의 비동기 통신 구조.
    
- 예시: 라이드쉐어 앱 (이벤트 → 라우팅 → 소비자)

### 5) Microservices

- 애플리케이션을 **작은 독립 서비스 단위**로 분리.
    
- API Gateway가 클라이언트 요청을 라우팅하고, 서비스 간 통신은 오케스트레이션이 담당.
    
- 예시: SNS (친구추가, 피드, 추천 등 개별 서비스)

**특징**

- 느슨한 결합, 독립 배포 가능.
    
- 서로 다른 패턴을 조합 가능 (예: 3-Tier + Microservices).

---

## 7. Application Deployment Environments & Components

### 환경 구분

1. **Development (개발 환경)** – 코드 작성 및 초기 테스트용.
    
2. **QA / Testing (품질 보증 환경)** – QA팀이 기능 검증.
    
3. **Staging (준운영 환경)** – 실제 운영 환경과 거의 동일하게 구성.
    
4. **Production (운영 환경)** – 최종 사용자 대상, 보안·확장성·신뢰성 중점.

### 배포 방식

- **On-Premises**: 자체 서버 내 구축, 높은 보안/유지비용.
    
- **Cloud Deployment**
    
    - **Public Cloud** – AWS, GCP, Azure, IBM Cloud 등
        
    - **Private Cloud** – 단일 조직 전용, 높은 보안성
        
    - **Hybrid Cloud** – 공용+사설 혼합, 유연성 극대화

### Production 구성 요소

- **Firewall**: 네트워크 트래픽 감시 및 차단
    
- **Load Balancer**: 서버 간 트래픽 분산
    
- **Web Server**: 정적 콘텐츠(HTML, 이미지 등) 제공
    
- **Application Server**: 비즈니스 로직 실행
    
- **Proxy Server**: 중간 계층, 캐싱/보안/로드밸런싱 역할
    
- **Database Server (DBMS)**: 데이터 저장 및 관리

---

## 8. Insiders' Viewpoint: Deployment Architecture

전문가 의견 요약:

- **규모(Scale)**, **데이터 흐름(Data Flow)**, **지역성(Regionality)**, **보안(Privacy)** 을 먼저 고려해야 함.
    
- **시스템 SLO(Service Level Objectives)** 를 정의하고 모니터링해야 함.
    
- **마이크로서비스와 모듈화(Modularization)** 로 복잡도를 줄이고, 빠른 배포 가능.
    
- **테스트 주도 개발(TDD)** 은 안정적인 배포의 핵심.
    
- **Canary Deployment** (부분적 배포 테스트) 로 리스크 최소화.
    
- 배포 후에는 **로그/모니터링 체계** 로 시스템의 지속적 개선이 필요.
