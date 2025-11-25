# DCP AI Expert Service - 발표 슬라이드

---

## 슬라이드 1: 제목

# DCP AI Expert Service
## 프로젝트 현황 및 기술 소개

---

## 슬라이드 2: 목차

## 발표 내용

1. 프로젝트 개요
2. 핵심 기능
3. 아키텍처
4. 주요 구성 요소
5. 에이전트 현황
6. 기술 스택

---

## 슬라이드 3: 프로젝트 소개

## DCP AI Expert Service

**RAG 기반 AI 서비스**

- SAP Digital Commerce Platform (DCP) 문서 기반 질의응답
- Retrieval Augmented Generation (RAG) 기술 활용
- Agent-to-Agent (A2A) 프로토콜 준수

---

## 슬라이드 4: 핵심 목적

## 핵심 목적

1. **문서 기반 질의응답**
   - DCP 비즈니스 시나리오 및 기술 문서에 대한 지능형 답변

2. **A2A 프로토콜 준수**
   - 다른 A2A 에이전트와의 통합 가능

3. **SAP HANA 통합**
   - Vector Engine을 활용한 효율적인 문서 검색

4. **SAP AI Hub 통합**
   - LLM 기반 응답 생성

---

## 슬라이드 5: 애플리케이션 실행 흐름

## 애플리케이션 실행 흐름

1. **AIExpertService 초기화**
   - 에이전트 로드 및 라우트 등록

2. **Flask 앱 및 SocketIO 서버 시작**
   - 웹 인터페이스 제공

3. **웹 인터페이스 제공**
   - 포트 5000에서 서비스 시작

---

## 슬라이드 6: 메인 애플리케이션 초기화

## 메인 애플리케이션 초기화

**AIExpertService 클래스 초기화 단계:**

1. 설정 파일 로드 (`app.yaml`)
2. 환경 변수 로드 (`.env`)
3. 로거 초기화
4. 에이전트 라우터 초기화
5. Flask 라우트 및 SocketIO 이벤트 등록

---

## 슬라이드 7: RAG (Retrieval Augmented Generation)

## RAG란?

**Retrieval Augmented Generation**

- 문서 검색 + LLM 기반 답변 생성
- 컨텍스트 기반 정확한 답변 제공
- 출처 추적 가능

---

## 슬라이드 8: RAG 에이전트 구조

## RAG 에이전트 구조

**주요 구성 요소:**

- HANA 연결 컨텍스트
- 임베딩 모델
- 벡터 스토어 (청킹 전략별)
- LLM 모델
- RAG 체인 (Retriever + Document Chain)

---

## 슬라이드 9: RAG 초기화 프로세스

## RAG 초기화 프로세스

1. **HANA 연결** - Vector Engine 연결
2. **임베딩 모델 초기화** - OpenAI Embeddings
3. **벡터 스토어 설정** - 청킹 전략별 테이블 생성
4. **LLM 모델 초기화** - GPT-4O Mini
5. **RAG 체인 구성** - Retriever + Document Chain

---

## 슬라이드 10: RAG 체인 구성

## RAG 체인 구성 요소

- **Retriever**: 벡터 스토어에서 유사 문서 검색
  - MMR, Similarity, Score Threshold 지원
- **Prompt Template**: 에이전트별 프롬프트
- **Document Chain**: 검색된 문서를 LLM에 전달
- **Retrieval Chain**: 통합된 최종 체인

---

## 슬라이드 11: 다중 에이전트 지원

## 다중 에이전트 지원

**AgentRouter 클래스**

- 모든 에이전트를 중앙에서 관리
- 요청을 적절한 에이전트로 라우팅
- 응답을 일관된 형식으로 래핑

---

## 슬라이드 12: 에이전트 초기화

## 에이전트 초기화 프로세스

1. `agents.yaml`에서 설정 읽기
2. `active: true`인 에이전트만 로드
3. 동적 임포트로 클래스 인스턴스 생성
4. 에이전트 딕셔너리에 저장

**장점**: UI 코드 변경 없이 새 에이전트 추가 가능

---

## 슬라이드 13: 에이전트 호출 흐름

## 에이전트 호출 흐름

1. 질문 전처리 (autocorrect 옵션)
2. 세션 메시지에 질문 추가
3. 선택된 에이전트의 `invoke()` 호출
4. 응답 래핑 (메타데이터 추가)

---

## 슬라이드 14: 연결 모드

## 연결 모드

**구현된 모드:**
- **Direct Mode**: SAP AI Core 직접 연결 (빠른 응답)

**향후 구현:**
- **Agent Proxy Mode**: A2A 서버를 통한 연결
- **Hybrid Mode**: 지능형 폴백

---

## 슬라이드 15: 웹 인터페이스

## 웹 인터페이스

**주요 페이지:**

- `/` - Workspace (랜딩/워크스페이스)
- `/rag` - RAG 질의응답 인터페이스 (로그인 필요)
- `/sidebar` - 사이드바
- `/settings` - 설정 페이지 (관리자 권한)

---

## 슬라이드 16: RAG 페이지 처리

## RAG 페이지 처리

**POST 요청 (질문 제출):**
- Clear 버튼: 세션 메시지 초기화
- 질문 제출: 에이전트 호출 및 응답 저장

**GET 요청 (페이지 렌더링):**
- 활성 에이전트 목록 전달
- 세션 메시지 히스토리 전달

---

## 슬라이드 17: 문서 처리

## 문서 처리

**지원하는 청킹 전략:**
- RTCS (Recursive Text Character Splitter)
- Sentence Tokenizer (NLTK)
- PDF Loader (PyPDF2)

**지원 형식:**
PDF, Markdown, 텍스트, 코드 파일, 설정 파일

---

## 슬라이드 18: 시스템 아키텍처

## 시스템 아키텍처

```
Web UI (Flask)
    ↓
Agent Router (중앙 라우터)
    ↓
┌──────────┬──────────┬──────────┐
│RAG Agent │AICore    │Future    │
│          │Agent     │Agents    │
└──────────┴──────────┴──────────┘
    ↓           ↓
SAP HANA    SAP Gen AI
Vector DB    Hub
```

---

## 슬라이드 19: 데이터 흐름

## 데이터 흐름

1. 사용자 질문 입력 → Flask 웹 인터페이스
2. 세션 관리 → Flask Session
3. 에이전트 라우팅 → AgentRouter
4. RAG 처리:
   - 질문 임베딩 생성
   - HANA Vector DB 검색
   - LLM에 컨텍스트 전달
   - 답변 생성
5. 응답 반환 → 웹 인터페이스

---

## 슬라이드 20: 컴포넌트 간 상호작용

## 컴포넌트 간 상호작용

- **AIExpertService** ↔ **AgentRouter**: 에이전트 관리 및 호출
- **AgentRouter** ↔ **RAGAgentLogic**: RAG 질의 처리
- **RAGAgentLogic** ↔ **HanaDB**: 벡터 검색
- **RAGAgentLogic** ↔ **SAP AI Hub**: LLM 호출
- **Flask App** ↔ **SocketIO**: 실시간 통신

---

## 슬라이드 21: 주요 구성 요소 - 에이전트 시스템

## 에이전트 시스템

**RAG 에이전트:**
- 문서 로드 및 청킹
- 벡터 스토어 관리
- RAG 체인 구성 및 실행

**AICore 에이전트:**
- SAP AI Core 직접 연결
- 범용 AI 어시스턴트 기능
- 오타 수정 등 지원

---

## 슬라이드 22: 주요 구성 요소 - 웹 모듈

## 웹 모듈

**Flask 서버:**
- Flask 앱 인스턴스
- SocketIO 인스턴스 (실시간 통신)
- Session 관리 (Flask-Session)

**인증:**
- OAuth 인증 지원
- `@login_required` 데코레이터
- `@permitted` 데코레이터 (권한 체크)

---

## 슬라이드 23: 주요 구성 요소 - 설정 관리

## 설정 관리

**설정 클래스 (Cfg):**
- YAML 파일 로드
- 객체식 접근 (`cfg.webserver.loglevel`)
- 환경 변수 로드

**설정 파일:**
- `app.yaml`: 애플리케이션 설정
- `agents.yaml`: 에이전트 구성

---

## 슬라이드 24: 주요 구성 요소 - 벡터 스토어

## HANA 벡터 스토어

**주요 기능:**
- SAP HANA Cloud Vector Engine 통합
- 벡터 임베딩 저장 및 검색
- MMR 검색 지원
- Similarity 검색 지원

**테이블 구조:**
- VEC_TEXT: 문서 내용
- VEC_META: 메타데이터 (JSON)
- VEC_VECTOR: 벡터 임베딩

---

## 슬라이드 25: 활성 에이전트 - DCP Wiki MD

## DCP Wiki MD (wikiv4)

**특징:**
- ✅ Active
- Confluence에서 내보낸 Markdown 문서
- 청킹: RTCS (1000/150)
- 검색: MMR (k=10, fetch_k=50)

**전문 분야:**
- Checkout order processes
- Configuration service manuals
- API reference documentation
- System implementation guides

---

## 슬라이드 26: 활성 에이전트 - AICore

## SAP AICore Service (aicore)

**특징:**
- ✅ Active
- Integration Agent
- 범용 AI 어시스턴트

**용도:**
- 질문 오타 수정
- 일반적인 AI 대화
- 통합 작업

---

## 슬라이드 27: 활성 에이전트 - GitOps

## GitOps Workload (gitops-workload)

**특징:**
- ✅ Active
- 문서 형식: txt, md, json, py, sh, yaml, config
- 청킹: RTCS (1000/150)
- 검색: MMR (k=10, fetch_k=50)

---

## 슬라이드 28: 비활성 및 계획 에이전트

## 기타 에이전트

**비활성 에이전트:**
- wiki (PDF 기반)
- business (비즈니스 시나리오)
- wikiv2, wikiv3 (이전 버전)

**향후 계획:**
- Legal Expert (법률 전문)
- Finance Expert (가격 정책 전문)

---

## 슬라이드 29: 기술 스택 - 백엔드

## 기술 스택 - 백엔드

- **Python**: 3.12+ (권장: 3.13+)
- **Flask**: 3.1.2+ (웹 프레임워크)
- **Flask-SocketIO**: 5.5.1+ (실시간 통신)
- **Flask-Session**: 0.8.0+ (세션 관리)
- **Gunicorn**: 23.0.0+ (WSGI 서버)

---

## 슬라이드 30: 기술 스택 - AI/ML

## 기술 스택 - AI/ML

- **LangChain**: 0.3.27
  - langchain-community, langchain-core, langchain-openai
- **SAP AI Hub SDK**: 4.4.3
- **HANA ML**: 2.26.25111700
- **LangChain HANA**: 0.2.1

---

## 슬라이드 31: 기술 스택 - 데이터베이스 및 문서 처리

## 기술 스택 - 기타

**데이터베이스:**
- SAP HANA Cloud Vector Engine
- hdbcli 2.26.25

**문서 처리:**
- PyPDF2 3.0.1
- NLTK 3.9.2

**인증:**
- Authlib 1.6.5 (OAuth)
- pyjwt, jwcrypto (JWT)

---

## 슬라이드 32: 핵심 아키텍처 특징

## 핵심 아키텍처 특징

1. **설정 기반 확장성**
   - YAML 설정만으로 새 에이전트 추가

2. **모듈화된 구조**
   - 각 컴포넌트 독립 동작

3. **RAG 파이프라인**
   - 문서 검색 + LLM 답변 생성

4. **실시간 통신**
   - SocketIO 스트리밍

5. **세션 관리**
   - 사용자별 대화 히스토리

---

## 슬라이드 33: 주요 데이터 흐름

## 주요 데이터 흐름

1. 사용자 질문 입력
2. AgentRouter → 에이전트 선택
3. RAG 에이전트 → HANA Vector DB 검색
4. 검색된 문서 → LLM (SAP AI Hub)
5. 생성된 답변 → 웹 인터페이스 표시

---

## 슬라이드 34: 확장 포인트

## 확장 포인트

1. **새 에이전트 추가**
   - `agents.yaml` 설정 추가

2. **새 문서 형식 지원**
   - `docs_split()` 메서드 확장

3. **새 검색 전략 추가**
   - RAG 체인 구성 확장

4. **새 연결 모드 추가**
   - `AgentRouter.invoke()` 확장

---

## 슬라이드 35: 요약

## 요약

**DCP AI Expert Service는:**

- RAG 기반 문서 질의응답 시스템
- 설정 기반 확장 가능한 아키텍처
- 다중 에이전트 지원
- SAP HANA 및 AI Hub 통합
- 실시간 웹 인터페이스 제공

---

## 슬라이드 36: Q&A

## 질문과 답변

**감사합니다!**

