## What is Software Engineering?

- **정의:**  
    소프트웨어 공학(Software Engineering)은 **과학적 원리를 소프트웨어 설계와 개발에 적용**하는 학문이다.
    체계적인 접근을 통해 **비즈니스 요구사항을 수집·분석·설계·구현·테스트**함으로써 고품질 소프트웨어를 만든다.
    
- **Engineer vs Developer:**

| 구분  | Software Engineer | Software Developer |
| --- | ----------------- | ------------------ |
| 범위  | 시스템 전체 설계·구축      | 특정 기능 구현           |
| 접근  | 시스템적·전체적 시각       | 창의적·기능 중심          |
| 역할  | 설계·구축·유지보수·테스트    | 기능 단위 코드 작성        |
    
## Introduction to the Software Development Life Cycle

- **정의:**  
    SDLC는 **예측 가능한 기간과 예산 내에 고품질 소프트웨어를 개발하기 위한 체계적 프로세스**이다.
    
- **목표:**
    - 클라이언트의 요구사항을 충족하는 소프트웨어 생산.
    - 단계별 명확한 산출물(deliverables)을 통해 위험과 비용 최소화.
        

- **장점:**
    1. 일관된 개발 절차 제공 → 효율 향상
    2. 명확한 단계 구분으로 팀 간 의사소통 용이
    3. 역할 명확화로 충돌 방지
    4. 반복 적용 가능 (요구사항 변경 대응)
    5. 문제 조기 발견 가능
## SDLC의 6단계 (Phases of the SDLC)

| 단계                       | 설명                             | 주요 산출물                                      |
| ------------------------ | ------------------------------ | ------------------------------------------- |
| ① **Planning (계획)**      | 요구사항 수집, 분석, 우선순위 지정, 자원·예산 산정 | SRS(Software Requirements Specification) 초안 |
| ② **Design (설계)**        | 아키텍처 설계, UI/DB 설계, 비즈니스 로직 구상  | Design Document                             |
| ③ **Development (개발)**   | 코딩 수행, 표준 및 도구 활용              | 코드 및 빌드                                     |
| ④ **Testing (테스트)**      | 단위·통합·시스템·인수 테스트 수행            | 테스트 리포트                                     |
| ⑤ **Deployment (배포)**    | 실제 환경(UAT → Production)에 릴리즈   | 릴리즈 버전                                      |
| ⑥ **Maintenance (유지보수)** | 버그 수정, 개선 요청 반영, UI 개선         | 버전 업데이트                                     |

- 각 단계는 순차적이지만 현대에는 **부분적 반복(Iteration)** 가능.
- **프로토타입(Prototype)** 은 초기 요구 명확화나 UI 피드백 용도로 사용됨.

---

## 고품질 소프트웨어 구축 (Building Quality Software)

- **공통 프로세스 6단계:**
    1. Requirements (요구사항 수집)
    2. Design (설계)
    3. Coding for Quality (품질 중심 개발)
    4. Testing (테스트)
    5. Releases (릴리즈)
    6. Documenting (문서화)
        
- **Requirements 유형:**
    - 기능적(Functional)
    - 외부 인터페이스(External/UI)
    - 시스템(System Features)
    - 비기능적(Non-Functional: 성능·보안·품질 등)
        
- Coding Quality의 핵심 요소:**
    - 유지보수성, 가독성, 테스트 용이성, 보안성
    - 코딩 표준 준수, 자동 검사(Linter), 주석 작성 필수
        
- **릴리즈 유형:**
    - **Alpha:** 내부용 초기 기능 버전
    - **Beta:** 외부 제한 공개, 실제 사용환경 테스트
    - **GA (General Availability):** 안정된 정식 버전
        
- **Documenting:**
    - 시스템 문서(개발자용)
    - 사용자 문서(비기술 사용자용)

---

## Requirements

- **요구사항 수집 6단계:**
    
    1. 이해관계자 식별
    2. 목표 및 목적 정의
    3. 요구사항 도출 (인터뷰, 설문 등)
    4. 요구사항 문서화
    5. 분석·확인 (정합성, 완전성 검토)
    6. 우선순위 결정 (“Must-have”, “Nice-to-have”)
        
- **주요 문서:**

| 문서                                           | 내용                                   |
| -------------------------------------------- | ------------------------------------ |
| **URS (User Requirement Specification)**     | 사용자 요구 및 시나리오 (User Story, Use Case) |
| **SRS (Software Requirement Specification)** | 기능적·비기능적 요구사항, 제약조건 등                |
| **SysRS (System Requirement Specification)** | 시스템 전체 요건 (하드웨어, 정책, 보안 등 포함)        |

- **SRS 구성요소:**
    - 목적, 범위, 제약조건, 가정 및 종속성
    - 기능적/외부/시스템/비기능적 요구사항

---

## 개발 방법론 (Software Development Methodologies)

| 모델            | 특징                                     | 장점                  | 단점              |
| ------------- | -------------------------------------- | ------------------- | --------------- |
| **Waterfall** | 순차적 단계 진행 (계획→설계→개발→테스트→배포)            | 구조 명확, 일정·예산 예측 용이  | 요구 변경에 비유연      |
| **V-Model**   | 좌측(Verification)과 우측(Validation) 대응 구조 | 테스트 계획이 설계 단계에서 준비됨 | 유연성 부족          |
| **Agile**     | 반복적·점진적 개발 (Sprint 단위)                 | 빠른 피드백, 유연성, 협업 중심  | 전체 예산/일정 예측 어려움 |

- **Agile의 핵심 가치 (Agile Manifesto):**
    1. 개인과 상호작용 > 절차와 도구
    2. 작동하는 소프트웨어 > 포괄적 문서
    3. 고객 협업 > 계약 협상
    4. 변화 대응 > 계획 고수

---

## 소프트웨어 버전 (Software Versions)

- **버전 번호의 의미 (Semantic Versioning):**
```
Major.Minor.Patch.Build
예: 2.5.3.124
```
    
    - **Major:** 대규모 기능 변경
    - **Minor:** 소규모 기능 추가
    - **Patch:** 버그 수정
    - **Build:** 내부 빌드 번호 또는 날짜
        
- **예시:**
    - `1.0` → 첫 정식 릴리즈
    - `0.9` → 베타 버전
    - `Ubuntu 18.04.2` → 2018년 4월 릴리즈, 2번째 패치
        
- **호환성:**
    - **Backward Compatible:** 이전 버전의 파일과 호환
    - 구버전-신버전 간 충돌 시, 최신 버전 업데이트로 해결 가능
        

---

## Software Testing

- **테스트 목적:**  
    요구사항 충족 및 버그 없는 안정적 제품 보장.
    
- **테스트 종류:**

|분류|설명|
|---|---|
|**Functional**|기능 중심, 입력-출력 검증 (Black-box)|
|**Non-functional**|성능, 보안, 확장성 등 비기능적 속성|
|**Regression**|수정된 코드가 기존 기능에 영향 없는지 확인|
    
- **테스트 수준(Levels):**
    
    1. **Unit Testing:** 개별 함수/모듈 검증 (개발자 수행)
    2. **Integration Testing:** 모듈 간 연동 확인
    3. **System Testing:** 완성 시스템 전체 검증
    4. **Acceptance Testing:** 고객/사용자 검증 (UAT)

---

## 소프트웨어 문서화 (Software Documentation)

- **형식:**
    - 텍스트, 영상, 그래픽
        
- **분류:**    
    - **Product Documentation:** 제품 기능 중심
    - **Process Documentation:** 절차 중심 (업무 수행 방법 명시)
        
- **제품 문서의 5가지 유형:**    
    1. 요구사항 문서 (SRS, URS, SysRS)
    2. 설계 문서 (Conceptual + Technical)
    3. 기술 문서 (코드 주석, 아키텍처 다이어그램 등)
    4. 품질보증 문서 (Test Plan, Traceability Matrix 등)
    5. 사용자 문서 (가이드, FAQ, 튜토리얼)
        
- **SOP (Standard Operating Procedure):** 
    - 조직별 특정 작업 절차를 상세히 명시한 문서.
    - 예: 코드 병합 절차, 배포 승인 프로세스 등.

---

## 소프트웨어 엔지니어링 프로젝트 내 역할 (Roles in SE Projects)

| 역할                                  | 설명                                                 |
| ----------------------------------- | -------------------------------------------------- |
| **Project Manager / Scrum Master**  | 일정, 자원, 커뮤니케이션 관리 (Agile에서는 Scrum Master가 팀 진행 지원) |
| **Stakeholder**                     | 고객·사용자·관리자 등 요구사항 제공 및 피드백 담당                      |
| **System / Software Architect**     | 시스템 구조 및 기술 아키텍처 설계                                |
| **UX Designer**                     | 사용자 경험(UX) 설계 및 UI 인터랙션 정의                         |
| **Developer**                       | 코드 작성 및 시스템 구현                                     |
| **Tester / QA Engineer**            | 테스트 케이스 작성, 버그 탐지 및 품질 보증                          |
| **Site Reliability Engineer (SRE)** | 운영 및 자동화, 장애 대응                                    |
| **Product Manager / Owner**         | 제품 비전 및 요구사항 정의, 개발 방향 관리                          |
| **Technical Writer**                | 사용자 및 기술 문서 작성, 가이드 제작                             |


## 전문가 관점: SW 팀 내 역할

- **팀 구조 예시:**  
    Product Manager, Tech Lead, QA, UX Designer, Software Engineer 등으로 구성.
    
- **역할 간 협업:**
    
    - **PM/PO:** 기능 기획 및 비즈니스 요구 조율
    - **UX Designer:** 디자인 시안(Figma 등) 전달 → 개발자는 이를 코드로 구현
    - **QA:** 테스트 플랜 작성 및 결함 보고
    - **Tech Lead:** 코드 리뷰 및 아키텍처 관리
    - **SRE:** 배포, 모니터링, 안정성 관리
        
- **핵심 포인트:**
    
    - 현대 소프트웨어 팀은 **지속적 커뮤니케이션과 협업 중심 구조**
    - Agile 방식에서는 매일 스탠드업, JIRA 티켓 관리, 정기 피드백 루프 운영