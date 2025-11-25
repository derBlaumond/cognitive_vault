# DCP AI Expert Service - 프로젝트 문서

**프로젝트명**: DCP AI Expert Service (wikiAgent)  
**버전**: v3

> 이 문서는 프로젝트의 현재 상태와 구조를 설명하는 기술 문서입니다.

---

## 📋 목차

1. [프로젝트 개요](#프로젝트-개요)
2. [핵심 기능](#핵심-기능)
3. [아키텍처](#아키텍처)
4. [주요 구성 요소](#주요-구성-요소)
5. [에이전트 현황](#에이전트-현황)
6. [기술 스택](#기술-스택)
7. [배포 및 빌드](#배포-및-빌드)
8. [테스트 프레임워크](#테스트-프레임워크)
9. [현재 상태 및 완료된 작업](#현재-상태-및-완료된-작업)

---

## 🎯 프로젝트 개요

**DCP AI Expert Service**는 SAP Digital Commerce Platform (DCP) 관련 문서를 기반으로 질문에 답변하는 RAG (Retrieval Augmented Generation) 기반 AI 서비스입니다.

### 주요 목적
- DCP 관련 비즈니스 시나리오 및 기술 문서에 대한 지능형 질의응답
- Agent-to-Agent (A2A) 프로토콜 준수
- SAP HANA Cloud Vector Engine을 활용한 문서 검색
- SAP Generative AI Hub를 통한 LLM 기반 응답 생성

---

## ✨ 핵심 기능

### 1. **RAG (Retrieval Augmented Generation)**
- 문서 기반 정확한 답변 생성
- 컨텍스트 인식 응답
- 출처 추적 및 인용

### 2. **다중 에이전트 지원**
- 비즈니스 전문가 에이전트
- 기술 문서 전문가 에이전트
- GitOps 워크로드 에이전트
- SAP AI Core 통합 서비스

### 3. **연결 모드**
- **Direct Mode**: SAP AI Core 직접 연결 (빠른 응답)
- **Agent Proxy**: A2A 서버를 통한 연결 (안정적)
- **Hybrid Mode**: 지능형 폴백 (최적 경험)

### 4. **웹 인터페이스**
- Flask 기반 웹 애플리케이션
- Socket.IO 실시간 통신
- 세션 관리 및 메시지 히스토리
- OAuth 인증 지원

### 5. **문서 처리**
- PDF 문서 처리 (PyPDF2)
- Markdown 문서 처리
- 다양한 청킹 전략 지원
- MMR (Maximal Marginal Relevance) 검색

---

## 🏗️ 아키텍처

```
┌─────────────────────────────────────────────────────────┐
│                    Web UI (Flask)                       │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ │
│  │  Workspace   │  │     RAG      │  │   Settings   │ │
│  └──────────────┘  └──────────────┘  └──────────────┘ │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│              Agent Router (중앙 라우터)                  │
└─────────────────────────────────────────────────────────┘
                          │
        ┌─────────────────┼─────────────────┐
        ▼                 ▼                 ▼
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│ RAG Agent    │  │ AICore Agent │  │ Future Agents│
│ (wiki,       │  │ (Integration)│  │ (Legal,      │
│  business,   │  │              │  │  Finance)    │
│  gitops)     │  │              │  │              │
└──────────────┘  └──────────────┘  └──────────────┘
        │                 │
        ▼                 ▼
┌──────────────┐  ┌──────────────┐
│ SAP HANA     │  │ SAP Gen AI   │
│ Vector DB    │  │ Hub          │
└──────────────┘  └──────────────┘
```

---

## 🔧 주요 구성 요소

### 1. **에이전트 시스템**
- **위치**: `app/dcp-ai-expert/agents/`
- **구조**:
  - `rag/`: RAG 에이전트 로직
  - `aicore/`: SAP AI Core 통합 서비스
  - `common/`: 공통 클라이언트/서버 컴포넌트

### 2. **웹 모듈**
- **위치**: `app/dcp-ai-expert/modules/web/`
- **기능**:
  - Flask 라우팅
  - Socket.IO 이벤트 처리
  - OAuth 인증
  - 세션 관리

### 3. **설정 관리**
- **위치**: `app/dcp-ai-expert/configs/`
- **파일**:
  - `app.yaml`: 애플리케이션 설정
  - `agents.yaml`: 에이전트 구성

### 4. **템플릿 및 정적 파일**
- **위치**: `app/dcp-ai-expert/templates/`, `static/`
- **템플릿**: Jinja2 기반 HTML 템플릿
- **정적 파일**: CSS, JavaScript, 이미지

---

## 🤖 에이전트 현황

### 활성 에이전트

#### 1. **📚 DCP Wiki MD (wikiv4)**
- **상태**: ✅ Active
- **설명**: Confluence에서 내보낸 Markdown 문서 기반
- **청킹**: RTCS (Recursive Text Character Splitter), 1000/150
- **검색**: MMR (k=10, fetch_k=50, lambda_mult=0.7)
- **전문 분야**:
  - Checkout order processes
  - Configuration service manuals
  - API reference documentation
  - System implementation guides

#### 2. **🧠 SAP AICore Service (aicore)**
- **상태**: ✅ Active
- **설명**: 범용 AI 어시스턴트 (통합 작업용)
- **타입**: Integration Agent
- **전문 분야**:
  - 사용자 입력 기반 지원
  - 세션 히스토리 기반 도움

#### 3. **🛠️ GitOps Workload (gitops-workload)**
- **상태**: ✅ Active
- **설명**: GitOps 워크로드 문서 전문
- **지원 형식**: txt, md, json, py, sh, yaml, config
- **청킹**: RTCS, 1000/150

### 비활성 에이전트

#### 4. **📚 DCP Wiki PDF (wiki)**
- **상태**: ⚠️ Active (비활성화 가능)
- **설명**: PDF 문서 기반 (chunked multipage PDF)

#### 5. **🏢 DCP Business Expert (business)**
- **상태**: ⚠️ Active: false
- **설명**: 비즈니스 시나리오 및 고객 워크플로우 전문

#### 6. **📚 DCP Wiki v2/v3 (wikiv2, wikiv3)**
- **상태**: ⚠️ Active: false
- **설명**: 이전 버전 (Markdown 기반)

### 향후 계획 에이전트

#### 7. **⚖️ Legal Expert**
- **상태**: 📅 Planned
- **전문 분야**:
  - Contract terms
  - Privacy protection
  - Compliance requirements

#### 8. **💰 Finance Expert**
- **상태**: 📅 Planned
- **전문 분야**:
  - Pricing policies
  - Discount calculations
  - Billing processes

---

## 💻 기술 스택

### 백엔드
- **Python**: 3.12+ (권장: 3.13+)
- **웹 프레임워크**: Flask 3.1.2+
- **실시간 통신**: Flask-SocketIO 5.5.1+
- **세션 관리**: Flask-Session 0.8.0+
- **서버**: Gunicorn 23.0.0+ (Eventlet worker)

### AI/ML 라이브러리
- **LangChain**: 0.3.27
  - langchain-community: 0.3.21
  - langchain-core: 0.3.79
  - langchain-openai: 0.3.35
- **SAP AI Hub SDK**: generative-ai-hub-sdk[all] 4.4.3
- **HANA ML**: hana-ml 2.26.25111700
- **LangChain HANA**: langchain-hana 0.2.1

### 데이터베이스
- **SAP HANA Cloud**: Vector Engine
- **클라이언트**: hdbcli 2.26.25

### 문서 처리
- **PDF**: PyPDF2 3.0.1
- **텍스트 처리**: NLTK 3.9.2 (문장 토크나이저)

### 인증 및 보안
- **OAuth**: Authlib 1.6.5
- **JWT**: pyjwt, jwcrypto

### 기타
- **환경 변수**: python-dotenv 1.0.0
- **HTTP 클라이언트**: requests 2.25.0+
- **비동기**: eventlet 0.40.3+

---

## 🚀 배포 및 빌드

### 빌드 구조
```
build/
├── build.sh          # Docker 이미지 빌드 스크립트
├── create-venv.sh    # Python 가상환경 생성
├── Dockerfile        # 로컬 Dockerfile
├── Dockerfile-kaniko # CI/CD용 Dockerfile (Jenkins)
├── requirements.txt  # Python 의존성
└── start.sh          # 로컬 시작 스크립트
```

### 배포 요구사항
- **도구**: bash > 4.2, git, docker
- **환경 변수**: `.env` 파일 필요
  - AICORE_AUTH_URL
  - AICORE_CLIENT_ID
  - LLM_DEPLOYMENT_GPT4OMINI
  - EMBEDDING_DEPLOYMENT_ADA
  - HANA DB 연결 정보

### 실행 방법
```bash
# 1. 의존성 설치
pip install -e .

# 2. 애플리케이션 실행
python __main__.py
```

---

## 🧪 테스트 프레임워크

### 테스트 구조
```
tests/
├── run_tests.py              # 메인 테스트 러너
├── README.md                 # 테스트 문서
├── ui/                       # UI 컴포넌트 테스트
│   └── test_simple.py
├── integration/              # 통합 테스트
│   ├── manual_test_runner.py
│   └── comprehensive_test_guide.py
├── unit/                     # 단위 테스트 (향후)
└── performance/              # 성능 테스트 (향후)
```

### 테스트 실행
```bash
# 전체 테스트
python tests/run_tests.py --all

# UI 테스트
python tests/run_tests.py --ui

# 통합 테스트 (수동)
python tests/run_tests.py --integration manual

# 통합 테스트 (자동화)
python tests/run_tests.py --integration comprehensive
```

### 테스트 커버리지
- ✅ UI 컴포넌트 렌더링
- ✅ 에이전트 초기화 및 라우팅
- ✅ SAP AI Core 연결
- ✅ 다중 연결 모드
- ✅ 소스 추적 통합
- ✅ 성능 메트릭
- ✅ 에러 핸들링

---

## 📊 프로젝트 통계

### 코드베이스
- **주요 모듈**: 4개 (app, agents, modules, web)
- **에이전트 타입**: 2개 (RAG, AICore)
- **활성 에이전트**: 3개
- **설정 파일**: 2개 (YAML)
- **템플릿**: 7개 (HTML)

### 문서
- **README**: 프로젝트 개요 및 설치 가이드
- **테스트 가이드**: 포괄적인 테스트 문서
- **에이전트 설계**: 확장 가능한 에이전트 레지스트리 설계

---

## ✅ 현재 상태 및 완료된 작업

### 완료된 주요 작업
- ✅ Document Scanner 제거 (DB 전용 작업으로 전환)
- ✅ Usage Analytics 간소화 (Session stats, Connection mode usage만 유지)
- ✅ Integrated Mode 비활성화 ("Coming Soon" 처리)
- ✅ render_sources() 개선 (Tab 구조로 변경)
- ✅ 코드 리팩토링 (Early Return 패턴 적용, 함수 분리, 50라인 이내 유지)

### 알려진 이슈 및 개선 사항
- Performance charts 지표 정의 필요
- render_sources 디자인 최종 검토 필요
- 단위 테스트 프레임워크 구축 필요
- 향후 Legal Expert, Finance Expert 에이전트 추가 계획 (설정 파일에 정의됨)

---

## 🎯 프로젝트 특징

### 기술적 특징
1. **확장 가능한 아키텍처**: 설정 기반 에이전트 등록으로 UI 코드 변경 없이 확장 가능
2. **다양한 문서 형식 지원**: PDF, Markdown, 텍스트 등 다양한 형식 처리
3. **유연한 검색 전략**: Similarity, MMR, Score Threshold 등 다양한 검색 방식 지원
4. **실시간 통신**: Socket.IO를 통한 실시간 응답 스트리밍

### 주요 기능
1. **DCP 문서 기반 질의응답**: 복잡한 문서를 쉽게 검색하고 이해
2. **빠른 응답**: 전문가 수준의 답변 제공
3. **출처 추적**: 모든 답변에 대한 문서 출처 제공으로 신뢰성 확보
4. **다중 전문 영역 지원**: 비즈니스, 기술, GitOps 등 다양한 영역 커버

---

## 📝 참고 자료

- **A2A 프로토콜**: https://github.com/google-a2a/a2a-samples
- **SAP HANA Cloud**: Vector Engine 문서
- **SAP Generative AI Hub**: 공식 문서
- **LangChain**: 공식 문서

---

## 🔍 주요 파일 위치

### 설정 파일
- `app/dcp-ai-expert/configs/app.yaml`: 애플리케이션 설정
- `app/dcp-ai-expert/configs/agents.yaml`: 에이전트 구성

### 핵심 코드
- `app/dcp-ai-expert/modules/app.py`: 메인 애플리케이션 클래스
- `app/dcp-ai-expert/modules/agents.py`: 에이전트 라우터
- `app/dcp-ai-expert/agents/rag/agent.py`: RAG 에이전트 로직
- `app/dcp-ai-expert/agents/aicore/agent.py`: SAP AI Core 통합

### 문서
- `README.md`: 프로젝트 개요 및 설치 가이드
- `tests/README.md`: 테스트 가이드
- `agent_registry_design.md`: 에이전트 레지스트리 설계 문서

