# Guava 플랫폼 PRD (Product Requirements Document)

**버전**: 1.0  
**작성일**: 2026-01-23  
**최종 수정**: 2026-01-23  
**작성자**: Product Team

---

## 📋 문서 정보

| 항목 | 내용 |
|-----|------|
| **제품명** | Guava (구아바) - AI 기반 병원 블로그 자동화 플랫폼 |
| **대상 고객** | 한의원, 치과, 피부과, 성형외과 등 의료기관 |
| **개발 단계** | Phase 1 (MVP) |
| **목표 일치도** | 65% → 85% (Phase 1 완료 시) |
| **배포 목표** | 2주 후 MVP 배포 |

---

## 📖 목차

1. [Executive Summary](#1-executive-summary)
2. [Product Vision & Strategy](#2-product-vision--strategy)
3. [Target Users](#3-target-users)
4. [Features & Requirements](#4-features--requirements)
5. [Technical Specifications](#5-technical-specifications)
6. [Success Metrics](#6-success-metrics)
7. [Timeline & Milestones](#7-timeline--milestones)
8. [Risks & Mitigation](#8-risks--mitigation)
9. [Dependencies](#9-dependencies)
10. [Appendix](#10-appendix)

---

## 1. Executive Summary

### 1.1 제품 개요

Guava는 **AI 기반 병원 블로그 콘텐츠 자동 생성 플랫폼**으로, 병원이 원장의 글쓰기 스타일을 학습하여 100% 개인화된 블로그 글을 자동으로 생성합니다.

### 1.2 핵심 가치 제안

> **"원장님이 직접 쓴 것처럼 완벽한 블로그 글을 AI가 자동 생성"**

- ✅ **시간 절약**: 월 10개 블로그 글 작성 시간 **20시간 → 2시간** (90% 단축)
- ✅ **스타일 재현**: Few-Shot Learning으로 원장 고유 문체 **85% 일치**
- ✅ **SEO 최적화**: 검색 엔진 최적화된 제목 + 본문 자동 생성
- ✅ **품질 보장**: 관리자 검토 + 유저 승인 워크플로우

### 1.3 MVP 목표

**Phase 1 (1-2주)**:
- PM 워크플로우 일치도: **65% → 85%**
- 핵심 기능 3개 구현 (P0 Features)
- MVP 배포 가능 상태 달성

**Phase 2 (2-3주)**:
- 일치도: **85% → 95%**
- 투자자 발표 가능

**Phase 3 (2-4개월)**:
- AI 품질: **50% → 95%**
- Production Ready

---

## 2. Product Vision & Strategy

### 2.1 비전

> **"모든 병원이 AI로 환자와 소통하는 미래"**

### 2.2 미션

병원이 블로그 마케팅에 드는 시간과 비용을 90% 절감하고, AI로 원장의 전문성과 신뢰를 환자에게 효과적으로 전달합니다.

### 2.3 시장 분석

#### 타겟 시장
- **1차 타겟**: 한의원 (15,000개)
- **2차 타겟**: 치과 (19,000개), 피부과 (3,000개), 성형외과 (2,000개)
- **TAM**: 39,000개 병원 × ₩300,000/월 = **₩140억/월**

#### 시장 문제점
1. **시간 부족**: 원장이 직접 글 쓸 시간 없음 (주당 2-4시간 필요)
2. **외주 품질**: 외주 작가는 병원 철학/스타일 모름 (만족도 30%)
3. **높은 비용**: 외주 비용 월 ₩500,000-1,000,000

#### 경쟁 우위
| 항목 | Guava | 외주 작가 | 자체 작성 |
|-----|-------|----------|----------|
| **비용** | ₩300,000/월 | ₩700,000/월 | 무료 (시간 비용 高) |
| **품질** | 85% 스타일 일치 | 30% 일치 | 100% 일치 |
| **속도** | 10분/글 | 2-3일/글 | 2-4시간/글 |
| **개인화** | ✅ Few-Shot Learning | ❌ 일반적 | ✅ 완벽 |
| **지속 학습** | ✅ RAG + Fine-Tuning | ❌ 없음 | ❌ 없음 |

---

## 3. Target Users

### 3.1 Primary Users

#### User 1: 병원 원장 (USER 역할)
**프로필**:
- 연령: 35-55세
- 직업: 한의원/치과/피부과 원장
- 기술 수준: 중급 (스마트폰 사용 능숙)

**니즈**:
- ✅ 블로그 글 자동 생성
- ✅ 본인 스타일 유지
- ✅ 최소한의 수정으로 즉시 게시
- ✅ SEO 최적화 (환자 유입)

**페인 포인트**:
- ❌ 시간 부족 (진료 + 경영)
- ❌ 글쓰기 어려움
- ❌ 외주 작가 불만족
- ❌ 매달 주제 선정 고민

---

#### User 2: 구아바 관리자 (ADMIN 역할)
**프로필**:
- 연령: 25-35세
- 직업: 콘텐츠 마케터, 에디터
- 기술 수준: 고급

**니즈**:
- ✅ 병원별 콘텐츠 생성 관리
- ✅ AI 품질 모니터링
- ✅ 효율적인 검토 워크플로우
- ✅ 병원 피드백 반영

**페인 포인트**:
- ❌ 100개 병원 관리 어려움
- ❌ 수동 콘텐츠 생성 시간 부족
- ❌ 병원별 스타일 기억 불가

---

### 3.2 User Personas

#### Persona 1: 김한의 원장 (45세, 한의원)
- **목표**: 환자 유입 증가 (예약 +30%)
- **블로그**: 주 2회 게시 (월 8개)
- **주제**: 다이어트, 갱년기, 면역력
- **스타일**: 따뜻하고 전문적, 환자 공감 중시
- **현재 문제**: 외주 작가가 한의학 전문성 부족, 비용 월 ₩700,000

#### Persona 2: 이치과 원장 (38세, 치과)
- **목표**: 브랜딩 (지역 1위 인지도)
- **블로그**: 주 3회 게시 (월 12개)
- **주제**: 임플란트, 치아교정, 미백
- **스타일**: 과학적이고 정확, 데이터 중심
- **현재 문제**: 직접 작성 시간 부족, 주당 6시간 소요

---

## 4. Features & Requirements

### 4.1 Phase 1: Critical Features (P0, 1-2주)

#### Feature 1: 월간 설문 (q1-q5)

**User Story**:
> "병원은 **매월 1일** 원하는 주제글을 선택할 수 있어야 한다"

**Description**:
병원이 매달 콘텐츠 주제와 목표를 설정하는 간단한 5개 질문 설문. 온보딩 데이터를 디폴트로 사용하여 최소 입력으로 완료 가능.

**Acceptance Criteria**:
- [ ] **q1**: 주제글 갯수 선택 (1개 or 2개)
- [ ] **q2**: 주제 선택 (매달 업데이트되는 리스트 + 기타 입력)
- [ ] **q3**: 타겟 독자 확인 (온보딩 디폴트, 수정 가능)
- [ ] **q4**: 이번달 목표 선택 (예약 증가, 브랜딩 등, 선택)
- [ ] **q5**: 금지/강조 문구 확인 (온보딩 디폴트, 수정 가능)
- [ ] 매월 1일 00:00 자동 알림 전송
- [ ] 기존 설문 응답이 있으면 **업데이트 (추가 X, 수정 O)**
- [ ] 설문 미완료 시 지난 달 데이터 재사용

**Technical Requirements**:
- Backend: `TopicTemplate` 테이블 생성 (주제 리스트 DB)
- Backend: `Survey.surveyType = 'MONTHLY'` 추가
- Backend: Cron Job (매월 1일 알림)
- Frontend: `MonthlySurveyPage` 컴포넌트 생성
- Frontend: 온보딩 데이터 → 설문 디폴트 자동 매핑

**UI/UX Requirements**:
```
[진행 단계] 1/5 → 2/5 → 3/5 → 4/5 → 5/5

[질문 카드]
q1: 주제글 갯수
  [1개] [2개]

q2: 주제 선택 (최대 q1 개수)
  ☑️ #다이어트
  ☐ #교통사고
  ☐ 기타 [___입력___]

q3: 타겟 독자 (온보딩 값 자동 설정)
  ☑️ 20-30대 직장인
  ☑️ 40-50대 중장년층

q4: 이번달 목표 (선택)
  ☑️ 예약/상담 증가
  ☐ 브랜딩

q5: 금지/강조 문구 (온보딩 값 자동 설정)
  금지: [과장된 표현] [+]
  강조: [한의학] [+]

[이전] [다음] [제출]
```

**Priority**: 🔴 **P0 (Blocker)**  
**Estimate**: 2-3일 (Backend: 1.5일, Frontend: 1일)  
**Dependencies**: 온보딩 시스템 완료 (✅ 완료)

**Related Documents**:
- [월간 설문 명세서](./MONTHLY_SURVEY_SPECIFICATION.md)
- [구현 계획](./PM_WORKFLOW_IMPLEMENTATION_PLAN.md) - Task 1

---

#### Feature 2: 제목 생성 → 수정 → 본문 생성 워크플로우

**User Story**:
> "관리자는 **제목을 먼저 생성**하고 수정한 후 **본문을 생성**할 수 있어야 한다"

**Description**:
기존 "제목 + 본문 한 번에 생성" 방식에서 벗어나, 제목을 먼저 생성하고 관리자가 수정한 후 각 제목별로 본문을 생성하는 2단계 프로세스.

**Workflow**:
```
[1단계] 월간 설문 응답 확인
  ↓
[2단계] 제목 리스트 생성 (OpenAI API)
  - 주제글 N개 (q1)
  - 일반글 M개 (주제글당 5개)
  ↓
[3단계] 제목 수정 (관리자)
  - [다시 생성] (전체 재생성)
  - [직접 수정] (개별 수정)
  ↓
[4단계] 본문 생성 (Personalized)
  - 각 제목별 본문 생성
  - Few-Shot Learning 적용
  ↓
[5단계] 본문 검토 및 수정
  - [재생성] (개별 재생성)
  - [직접 수정] (텍스트 편집)
  ↓
[6단계] 생성 완료 → 유저 전송
```

**Acceptance Criteria**:
- [ ] POST `/api/ai/generate-titles` API 구현
- [ ] POST `/api/ai/regenerate-titles` API 구현
- [ ] POST `/api/ai/generate-from-title` API 구현
- [ ] POST `/api/ai/regenerate-content/:id` API 구현
- [ ] Frontend: Mock 데이터 → 실제 API 연동
- [ ] 제목 품질 평가 로직 (길이, 키워드, 금지 표현 체크)
- [ ] 해시태그별 제목/본문 그룹화

**Technical Requirements**:
- Backend: `buildTitleGenerationPrompt()` 서비스
- Backend: `buildContentFromTitlePrompt()` 서비스 (Few-Shot)
- Backend: OpenAI API 호출 (GPT-4o)
- Frontend: `AdminContentCreatePage` Mock 데이터 제거
- Frontend: `generateContents()` 함수 실제 API 호출로 교체

**UI/UX Requirements**:
```
[AdminContentCreatePage] ✅ 이미 구현됨 (Mock 데이터)

[해시태그 탭] #다이어트 | #교통사고

[월간 주제글]
  [썸네일] 요요 없는 건강한 다이어트...
           [수정 ✏️]

[월간 일반글]
  [썸네일] 1. 체질별 맞춤 다이어트... [수정 ✏️]
  [썸네일] 2. 한방 다이어트로 체중 감량... [수정 ✏️]
  ...

[다시 생성] [직접 수정] [생성 완료]
```

**Priority**: 🔴 **P0 (Blocker)**  
**Estimate**: 3-4일 (Backend: 3일, Frontend: 1일 API 연동)  
**Dependencies**: 월간 설문 (Feature 1) 완료

**Related Documents**:
- [콘텐츠 생성 워크플로우](./CONTENT_GENERATION_WORKFLOW.md)
- [구현 계획](./PM_WORKFLOW_IMPLEMENTATION_PLAN.md) - Task 2

---

#### Feature 3: 콘텐츠 계층 구조 (주제글 vs 일반글)

**User Story**:
> "주제글과 일반글을 **계층 구조**로 구분하여 관리할 수 있어야 한다"

**Description**:
주제글 1개 → 일반글 5개의 계층 관계를 DB Schema와 UI에서 명확하게 표현. 주제글 삭제 시 하위 일반글도 함께 관리 가능.

**Hierarchy Structure**:
```
주제글 #다이어트 (parentId: null, type: THEME)
├─ 일반글 1 (parentId: 주제글 ID, type: GENERAL)
├─ 일반글 2
├─ 일반글 3
├─ 일반글 4
└─ 일반글 5
```

**Acceptance Criteria**:
- [ ] `ContentType` Enum 추가 (`THEME`, `GENERAL`)
- [ ] `Content.type` 필드 추가
- [ ] `Content.parentId` 필드 추가 (자기 참조 관계)
- [ ] `Content.hashtag` 필드 추가 (주제글 그룹화)
- [ ] Migration 실행 및 인덱스 최적화
- [ ] GET `/api/contents/theme/:id/generals` API
- [ ] GET `/api/contents/by-hashtag/:hashtag` API
- [ ] POST `/api/contents/bulk-create` API (주제글 + 일반글 일괄 생성)
- [ ] Frontend: 계층 구조 UI 반영 (펼치기/접기)

**Technical Requirements**:
```prisma
enum ContentType {
  THEME    // 주제글
  GENERAL  // 일반글
}

model Content {
  type          ContentType   @default(GENERAL)
  parentId      String?       @map("parent_id")
  hashtag       String?
  
  parent        Content?      @relation("ContentHierarchy", fields: [parentId])
  relatedPosts  Content[]     @relation("ContentHierarchy")
  
  @@index([type, parentId])
  @@index([hashtag])
}
```

**UI/UX Requirements**:
```
[콘텐츠 관리]

필터: [전체] [주제글만] [일반글만]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📌 주제글 | #다이어트
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[썸네일] 요요 없는 건강한 다이어트...
         [수정] [삭제]

  ├─ 일반글 1: 체질별 맞춤 다이어트...
  │  [수정] [삭제]
  │
  ├─ 일반글 2: 한방 다이어트로...
  │  [수정] [삭제]
  │
  └─ 일반글 3-5
     [펼치기 ▼]
```

**Priority**: 🟡 **P1 (High)**  
**Estimate**: 2일 (Backend: 1.5일, Frontend: 0.5일)  
**Dependencies**: 제목 생성 워크플로우 (Feature 2) 완료

**Related Documents**:
- [콘텐츠 계층 구조 명세서](./CONTENT_HIERARCHY_SPECIFICATION.md)
- [구현 계획](./PM_WORKFLOW_IMPLEMENTATION_PLAN.md) - Task 3

---

### 4.2 Phase 2: Important Features (P1-P2, 2-3주)

#### Feature 4: 콘텐츠 상태 관리 확장

**User Story**:
> "관리자는 콘텐츠 생성 단계를 **명확히 구분**하여 관리할 수 있어야 한다"

**Description**:
PM 워크플로우에 맞춰 "생성전", "생성중", "생성됨" 상태를 Schema에 추가하여 콘텐츠 생성 진행 상황을 명확히 표시.

**Current State (문제)**:
```typescript
// 현재 (5개 상태)
enum ContentStatus {
  approval_requested  // 승인 요청
  revision_requested  // 수정 요청
  revising            // 수정 중
  revision_completed  // 수정 완료
  published           // 게시 완료
}
```

**New State (해결)**:
```typescript
// 개선 (8개 상태)
enum ContentStatus {
  draft              // 생성전 (관리자가 아직 시작 안 함)
  generating         // 생성중 (AI 생성 중 or 임시저장)
  generated          // 생성됨 (유저 확인 대기)
  approval_requested // 승인요청 (유저 → 관리자)
  revision_requested // 수정요청 (유저 → 관리자)
  revising           // 수정중 (관리자 작업)
  revision_completed // 수정완료 (유저 재확인)
  published          // 게시완료 (블로그 업로드)
}
```

**Acceptance Criteria**:
- [ ] `ContentStatus` Enum 재정의 (3개 상태 추가)
- [ ] Migration 실행 (기존 데이터 보존)
- [ ] Frontend: 상태별 탭 필터링 UI
- [ ] Frontend: 상태 전환 버튼 (임시저장, 생성완료 등)

**Priority**: 🟡 **P1 (High)**  
**Estimate**: 1일

---

#### Feature 5: 블로그 자동 업로드 API (Phase 2 후반 or Phase 3)

**User Story**:
> "승인된 콘텐츠는 **블로그에 자동으로 업로드**되어야 한다"

**Description**:
네이버 블로그, 티스토리 API 연동하여 승인 완료 시 자동으로 게시. 현재는 수동 업로드로 운영.

**Acceptance Criteria**:
- [ ] 네이버 블로그 API 연동
- [ ] 티스토리 API 연동
- [ ] 발행 결과 저장 (publishedAt, publishChannels)
- [ ] 발행 실패 시 에러 핸들링

**Priority**: 🟡 **P2 (Medium)** → Phase 2 후반 or Phase 3  
**Estimate**: 3-5일

---

### 4.3 Phase 3: AI Enhancement (P3, 2-4개월)

#### Phase 1 품질 개선 (1-2주)

**목표**: AI 품질 50% → 60%

**Tasks**:
1. 프롬프트 튜닝: System Prompt 최적화
2. Few-Shot 샘플 선택 알고리즘 개선 (Jaccard → TF-IDF)
3. `writingStyle` 필드 활용 강화
4. GPT-4 프롬프트 구조 개선
5. Temperature 파라미터 조정 (0.7 → 0.65)
6. 품질 평가 메트릭 추가
7. A/B 테스트: GPT-4 vs GPT-4o-mini
8. 에러 핸들링 강화

**Priority**: 🟡 **P3 (Phase Dependent)**  
**Estimate**: 1-2주

---

#### Phase 2: RAG Agent (2-3주)

**목표**: AI 품질 60% → 85%

**Tasks**:
1. Vector DB 선택 및 설정 (Pinecone or Qdrant)
2. Embedding 서비스 구현 (OpenAI Embeddings API)
3. **승인된 콘텐츠 자동 수집 스케줄러** (매주 월요일)
4. Semantic Search 구현 (Top-K 유사 콘텐츠)
5. RAG Agent 생성 (`rag.agent.ts`)
6. Hybrid Search (Few-Shot + RAG)
7. 캐싱 최적화 (Redis)
8. 품질 측정 (RAG 적용 전후 비교)

**보편적 학습 포함**:
```typescript
// 매주 월요일 새벽 2시 실행
@Cron('0 2 * * 1')
async weeklyLearning() {
  // 1. 승인된 콘텐츠 수집
  const approved = await collectApprovedContents();
  
  // 2. Vector Store 저장
  await storeInVectorDB(approved);
  
  // 3. 학습 로그 저장
  await logLearningSession(approved.length);
}
```

**Admin UI (선택)**:
- 학습 대시보드 (학습된 콘텐츠 수, 병원별 분포)
- 수동 학습 트리거 버튼
- Vector DB 상태 모니터링

**Priority**: 🟡 **P3 (Phase Dependent)**  
**Estimate**: 2-3주

---

#### Phase 3: Multi-Agent System (3-4주)

**목표**: AI 품질 85% → 95%

**Tasks**:
1. ContentAgent (콘텐츠 생성)
2. CriticAgent (품질 평가)
3. EditorAgent (자동 수정)
4. Feedback Loop (수정메시지 학습)
5. **승인된 글 + 수정메시지 학습 강화**
6. 에이전트 간 협업 프로토콜

**Admin UI (필수)**:
- Feedback Loop 모니터링
- 수정메시지 분석 대시보드
- 에이전트별 성능 비교

**Priority**: 🟡 **P3 (Phase Dependent)**  
**Estimate**: 3-4주

---

#### Phase 4: Fine-Tuning (4주+)

**목표**: AI 품질 95% → 99%

**Tasks**:
1. 100개+ 병원 데이터 수집
2. GPT-4 Fine-Tuning
3. 병원별 개인화 모델
4. 품질 최종 검증

**Priority**: 🟡 **P3 (Phase Dependent)**  
**Estimate**: 4주+

---

## 5. Technical Specifications

### 5.1 System Architecture

```
┌─────────────────────────────────────────────────────┐
│                    Frontend                          │
│  React 18 + TypeScript + Vite                       │
│  - USER: Dashboard, Survey, Content Review          │
│  - ADMIN: Hospital List, Content Create/Edit        │
└─────────────────┬───────────────────────────────────┘
                  │ HTTPS / REST API
┌─────────────────┴───────────────────────────────────┐
│                    Backend                           │
│  NestJS + Prisma + PostgreSQL                       │
│  - Auth: JWT                                         │
│  - AI: Few-Shot Agent → RAG Agent → Multi-Agent     │
│  - Cron: 월간 설문 알림, 보편적 학습                  │
└─────────────────┬───────────────────────────────────┘
                  │
┌─────────────────┴───────────────────────────────────┐
│              External Services                       │
│  - OpenAI GPT-4o (콘텐츠 생성)                        │
│  - Vector DB (Phase 2: Pinecone/Qdrant)             │
│  - 블로그 API (Phase 2: 네이버, 티스토리)              │
└─────────────────────────────────────────────────────┘
```

### 5.2 Technology Stack

#### Frontend
- **Framework**: React 18
- **Language**: TypeScript 5
- **Build Tool**: Vite
- **Routing**: React Router v6
- **State**: React Context API
- **Styling**: CSS Modules
- **API Client**: Axios

#### Backend
- **Framework**: NestJS 10
- **Language**: TypeScript 5
- **ORM**: Prisma 5
- **Database**: PostgreSQL 15
- **Auth**: JWT + bcrypt
- **Cron**: @nestjs/schedule
- **AI**: OpenAI SDK (GPT-4o, GPT-4o-mini)

#### Infrastructure
- **Monorepo**: pnpm + Turborepo
- **Version Control**: Git + GitHub
- **CI/CD**: (TBD)
- **Hosting**: (TBD)

### 5.3 Database Schema Changes

#### 신규 테이블

##### TopicTemplate
```prisma
model TopicTemplate {
  id          String   @id @default(uuid())
  title       String   // "다이어트"
  category    String   // "건강"
  hashtag     String   // "#다이어트"
  season      String?  // "봄", "여름", "가을", "겨울"
  month       Int?     // 1-12
  isActive    Boolean  @default(true)
  order       Int      @default(0)
  
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  @@index([isActive, order])
  @@map("topic_templates")
}
```

#### 테이블 수정

##### Survey
```prisma
model Survey {
  // ... 기존 필드
  
  // [신규] 설문 타입 및 월간 정보
  surveyType  SurveyType @default(MONTHLY)
  month       Int?       // 1-12
  year        Int?       // 2026
  
  @@index([hospitalId, year, month])
  @@index([surveyType])
}

enum SurveyType {
  MONTHLY      // q1-q5 월간 설문
  ONBOARDING   // 16개 질문 온보딩 설문
}
```

##### Content
```prisma
model Content {
  // ... 기존 필드
  
  // [신규] 콘텐츠 타입 및 계층 구조
  type          ContentType   @default(GENERAL)
  parentId      String?       @map("parent_id")
  hashtag       String?
  
  // [신규] 관계
  parent        Content?      @relation("ContentHierarchy", fields: [parentId])
  relatedPosts  Content[]     @relation("ContentHierarchy")
  
  @@index([type, parentId])
  @@index([hashtag])
}

enum ContentType {
  THEME    // 주제글
  GENERAL  // 일반글
}
```

##### ContentStatus (수정)
```prisma
enum ContentStatus {
  draft              // [신규] 생성전
  generating         // [신규] 생성중
  generated          // [신규] 생성됨
  approval_requested // 승인 요청
  revision_requested // 수정 요청
  revising           // 수정 중
  revision_completed // 수정 완료
  published          // 게시 완료
}
```

### 5.4 API Endpoints

#### 월간 설문 (Feature 1)
```
GET    /api/surveys/monthly/topics?month=1&year=2026  # 주제 리스트
POST   /api/surveys/monthly                           # 설문 생성
POST   /api/surveys/:id/monthly-response              # 설문 제출
GET    /api/surveys/:id/analytics                     # 분석
```

#### AI 콘텐츠 생성 (Feature 2)
```
POST   /api/ai/generate-titles                        # 제목 생성
POST   /api/ai/regenerate-titles                      # 제목 재생성
POST   /api/ai/generate-from-title                    # 본문 생성
POST   /api/ai/regenerate-content/:id                 # 본문 재생성
```

#### 콘텐츠 계층 (Feature 3)
```
GET    /api/contents/theme/:id/generals               # 주제글 하위 일반글
GET    /api/contents/by-hashtag/:hashtag              # 해시태그별 조회
POST   /api/contents/bulk-create                      # 일괄 생성
```

### 5.5 AI Prompt Strategy

#### 제목 생성 프롬프트
```typescript
buildTitleGenerationPrompt({
  hashtag: "#다이어트",
  themeCount: 1,
  generalCount: 5,
  targetAudience: ["20-30대 직장인"],
  goals: ["예약 증가"],
  forbiddenExpressions: ["과장된 표현"],
})

// Output: JSON 배열
[
  { type: "THEME", title: "요요 없는 건강한 다이어트..." },
  { type: "GENERAL", title: "체질별 맞춤 다이어트..." },
  ...
]
```

#### 본문 생성 프롬프트 (Few-Shot)
```typescript
buildContentFromTitlePrompt({
  title: "요요 없는 건강한 다이어트...",
  hospital: { ... },
  surveyData: { ... },
  fewShotSamples: [
    { title: "샘플 1", content: "..." },
    { title: "샘플 2", content: "..." },
  ],
})

// Output: 마크다운 본문 (1200-1500자)
```

---

## 6. Success Metrics

### 6.1 MVP 목표 (Week 1-2)

| 지표 | 현재 | 목표 | 측정 방법 |
|-----|------|------|----------|
| **PM 플로우 일치도** | 65% | 85% | 구현된 기능 / 요구사항 |
| **Critical Features 완료** | 0/3 | 3/3 | Feature 1-3 체크리스트 |
| **Backend API 완성도** | 70% | 95% | 구현된 API / 전체 API |
| **Frontend 통합** | 60% | 90% | Mock 데이터 제거율 |

### 6.2 AI 품질 지표

| Phase | 기간 | 스타일 일치도 | 사용자 만족도 | 수정 횟수 |
|-------|------|-------------|-------------|----------|
| **Phase 1 (Few-Shot)** | Week 1-2 | 50% → 60% | 3.0/5.0 | 2-3회 |
| **Phase 2 (RAG)** | Week 3-5 | 60% → 85% | 4.0/5.0 | 1-2회 |
| **Phase 3 (Multi-Agent)** | Month 2-3 | 85% → 95% | 4.5/5.0 | 0-1회 |
| **Phase 4 (Fine-Tuning)** | Month 4-5 | 95% → 99% | 4.8/5.0 | 0회 |

### 6.3 비즈니스 지표

#### 사용성 지표
- **월간 콘텐츠 생성 수**: 10개/병원 (목표: 12개)
- **콘텐츠 승인률**: 80%+ (목표: 90%)
- **평균 수정 시간**: 10분/글 (목표: 5분)
- **관리자 처리 시간**: 15분/병원 (목표: 10분)

#### 고객 만족도
- **NPS (Net Promoter Score)**: 50+ (목표: 70+)
- **사용자 만족도**: 4.0/5.0 (목표: 4.5/5.0)
- **재구매율**: 85%+ (목표: 90%+)
- **추천율**: 60%+ (목표: 75%+)

#### 비즈니스 성과
- **시간 절감**: 20시간 → 2시간/월 (90% 절감)
- **비용 절감**: ₩700,000 → ₩300,000/월 (57% 절감)
- **환자 유입**: +30% (블로그 통한 예약 증가)
- **검색 노출**: +50% (SEO 최적화 효과)

### 6.4 기술 지표

- **API 응답 시간**: < 5초 (제목 생성), < 10초 (본문 생성)
- **AI 생성 시간**: < 30초/글
- **시스템 가용성**: 99.5%+
- **에러율**: < 1%

---

## 7. Timeline & Milestones

### 7.1 Phase 1: Critical Features (Week 1-2)

```
Week 1 (Day 1-5):
├─ Day 1-2: Task 1 (q1-q5 설문) Backend 완료
│  - TopicTemplate 테이블 생성
│  - MonthlySurveyDto 정의
│  - POST /api/surveys/monthly API
│  - Cron Job (매월 1일 알림)
│
├─ Day 3-5: Task 2 (제목 생성) Backend 시작
│  - POST /api/ai/generate-titles API
│  - buildTitleGenerationPrompt() 구현
│  - OpenAI API 연동

Week 2 (Day 6-10):
├─ Day 6-7: Task 2 Backend 완료
│  - POST /api/ai/generate-from-title API
│  - buildContentFromTitlePrompt() 구현
│
├─ Day 8-9: Task 3 (계층 구조) Backend 완료
│  - ContentType Enum 추가
│  - Migration 실행
│  - GET /api/contents/theme/:id/generals API
│
└─ Day 10: Frontend 통합 테스트
   - Mock 데이터 제거
   - 실제 API 연동 테스트
   - E2E 테스트

Milestone 1 달성: MVP 배포 가능 ✅
```

### 7.2 Phase 2: Important Features (Week 3-4)

```
Week 3-4:
├─ Day 11-12: Task 4 (상태 관리) 완료
│  - ContentStatus Enum 수정
│  - Migration 실행
│
└─ Day 13-17: Task 5 (블로그 API) 완료 (선택)
   - 네이버 블로그 API 연동
   - 티스토리 API 연동

Milestone 2 달성: 투자자 발표 가능 ✅
```

### 7.3 Phase 3: AI Enhancement (Month 2-5)

```
Month 2:
├─ Week 5-6: Phase 1 품질 개선 (50% → 60%)
│  - 프롬프트 튜닝
│  - Few-Shot 알고리즘 개선

Month 3:
├─ Week 7-9: Phase 2 RAG (60% → 85%)
│  - Vector DB 설정
│  - 승인된 콘텐츠 자동 수집
│  - Hybrid Search

Month 4:
├─ Week 10-13: Phase 3 Multi-Agent (85% → 95%)
│  - ContentAgent, CriticAgent, EditorAgent
│  - Feedback Loop

Month 5:
└─ Week 14-17: Phase 4 Fine-Tuning (95% → 99%)
   - 100개+ 병원 데이터 수집
   - GPT-4 Fine-Tuning

Milestone 3 달성: Production Ready ✅
```

---

## 8. Risks & Mitigation

### 8.1 Technical Risks

#### Risk 1: OpenAI API 비용 증가
**영향도**: 🔴 **High**  
**발생 가능성**: 🟡 **Medium**

**상세**:
- 월 100개 병원 × 10글/병원 = 1,000글
- 1글당 토큰: 제목 500 + 본문 2,000 = 2,500 토큰
- 월 총 토큰: 2,500,000 토큰 = ₩150,000/월 (GPT-4o 기준)

**Mitigation**:
- ✅ **캐싱**: Redis로 유사 제목 캐싱 (30% 절감)
- ✅ **GPT-4o-mini 활용**: 일반글은 mini 사용 (50% 절감)
- ✅ **토큰 최적화**: 프롬프트 압축 (20% 절감)
- ✅ **예산 알림**: 일일 토큰 사용량 모니터링

---

#### Risk 2: Frontend Mock 데이터 의존성
**영향도**: 🟡 **Medium**  
**발생 가능성**: 🟢 **Low**

**상세**:
- 현재 Frontend가 Mock 데이터로 구현됨
- Backend API 완성 전까지 통합 테스트 불가

**Mitigation**:
- ✅ **Backend 우선 구현**: API 먼저 완성 후 Frontend 연동
- ✅ **API 명세 공유**: Swagger/Postman으로 사전 공유
- ✅ **Parallel 작업**: Backend API 완성 전 Frontend UI 완성

---

#### Risk 3: Phase 1 AI 품질 50% 낮음
**영향도**: 🟡 **Medium**  
**발생 가능성**: 🔴 **High**

**상세**:
- Few-Shot Learning만으로는 스타일 일치도 50% 수준
- 병원 불만족 시 이탈 가능

**Mitigation**:
- ✅ **점진적 개선**: Phase 2 (RAG) 빠른 진행 (2-3주)
- ✅ **사전 기대치 관리**: "AI 초안이며 수정 필요" 안내
- ✅ **관리자 검토 필수**: 유저에게 보내기 전 관리자 필터링

---

### 8.2 Business Risks

#### Risk 4: 병원 온보딩 데이터 부족
**영향도**: 🟡 **Medium**  
**발생 가능성**: 🟡 **Medium**

**상세**:
- Few-Shot Learning은 3-5개 과거 글 필요
- 과거 글 없는 신규 병원은 품질 낮음

**Mitigation**:
- ✅ **최소 3개 필수**: 온보딩 시 과거 글 3개 필수 입력
- ✅ **대체 방안**: 과거 글 없으면 설문 상세 입력 (16개 질문)
- ✅ **샘플 제공**: 관리자가 유사 병원 샘플 수동 선택

---

#### Risk 5: 경쟁사 출현
**영향도**: 🟡 **Medium**  
**발생 가능성**: 🟡 **Medium**

**상세**:
- OpenAI API는 공개되어 누구나 사용 가능
- 유사 서비스 출현 가능

**Mitigation**:
- ✅ **데이터 경쟁력**: 승인된 글 학습 (RAG, Fine-Tuning)
- ✅ **빠른 실행**: 1년 내 100개 병원 확보
- ✅ **관리자 밀착 지원**: 외주 작가 수준의 서비스

---

## 9. Dependencies

### 9.1 Internal Dependencies

| Task | Depends On | Status |
|------|-----------|--------|
| Feature 1 (q1-q5) | 온보딩 시스템 | ✅ 완료 |
| Feature 2 (제목 생성) | Feature 1 | ⏳ 대기 |
| Feature 3 (계층 구조) | Feature 2 | ⏳ 대기 |
| Feature 4 (상태 관리) | Feature 3 | ⏳ 대기 |
| Phase 2 (RAG) | Phase 1 품질 개선 | ⏳ 대기 |
| Phase 3 (Multi-Agent) | Phase 2 (RAG) | ⏳ 대기 |

### 9.2 External Dependencies

| 항목 | 제공자 | 상태 | 리스크 |
|-----|-------|------|--------|
| **OpenAI GPT-4o API** | OpenAI | ✅ 사용 중 | 비용, Rate Limit |
| **PostgreSQL** | Self-hosted | ✅ 설치 완료 | 성능, 백업 |
| **Vector DB** | Pinecone/Qdrant | ⏳ Phase 2 | 비용, 마이그레이션 |
| **네이버 블로그 API** | 네이버 | ⏳ Phase 2 | API 변경, 제한 |
| **티스토리 API** | Kakao | ⏳ Phase 2 | API 변경, 제한 |

### 9.3 Team Dependencies

| 역할 | 담당자 | 작업 | 우선순위 |
|-----|-------|------|----------|
| **Backend Developer** | (TBD) | Feature 1-3 Backend | P0 |
| **Frontend Developer** | (TBD) | Mock 데이터 제거 | P0 |
| **AI Engineer** | (TBD) | Phase 2-4 AI | P3 |
| **DevOps** | (TBD) | 배포 환경 설정 | P1 |
| **PM** | (TBD) | 병원 피드백 수집 | P1 |

---

## 10. Appendix

### 10.1 관련 문서

#### 상세 스펙 문서
- **[월간 설문 명세서](./MONTHLY_SURVEY_SPECIFICATION.md)** - q1-q5 설문 상세 스펙 (347줄)
- **[콘텐츠 생성 워크플로우](./CONTENT_GENERATION_WORKFLOW.md)** - 제목 → 본문 2단계 생성 (432줄)
- **[콘텐츠 계층 구조 명세서](./CONTENT_HIERARCHY_SPECIFICATION.md)** - 주제글/일반글 구분 (411줄)

#### 분석 문서
- **[PM 워크플로우 요약 (한글)](./PM_WORKFLOW_SUMMARY_KR.md)** - 5분 완독 요약 (218줄)
- **[PM 워크플로우 분석](./PM_WORKFLOW_ANALYSIS.md)** - 갭 분석 60페이지 (1098줄)
- **[PM 워크플로우 문서 검토](./PM_WORKFLOW_DOCUMENTATION_REVIEW_PLAN.md)** - 문서 일치성 검토 (762줄)
- **[PM 워크플로우 구현 계획](./PM_WORKFLOW_IMPLEMENTATION_PLAN.md)** - 단계별 구현 계획 (1294줄)

#### 시스템 문서
- **[설문 시스템 문서](./SURVEY_SYSTEM_DOCUMENTATION.md)** - 기존 16개 질문 설문 (566줄)
- **[AI Agent 마스터 플랜](./AI_AGENT_MASTER_PLAN.md)** - Phase 0-4 로드맵 (1083줄)
- **[AI 코드베이스 분석](./AI_CODEBASE_ANALYSIS.md)** - OpenAI/Langchain 사용 분석 (1055줄)
- **[관리자/사용자 아키텍처](./ADMIN_USER_ARCHITECTURE_ANALYSIS.md)** - 권한 시스템 분석

#### 배포 문서
- **[배포 가능성 리포트](./DEPLOYMENT_READINESS_REPORT.md)** - 배포 가능성 종합 분석
- **[배포 빠른 요약](./DEPLOYMENT_QUICK_SUMMARY.md)** - 배포 가능성 요약

### 10.2 Glossary (용어집)

| 용어 | 설명 |
|-----|------|
| **Few-Shot Learning** | 소량의 샘플(3-5개)로 학습하여 스타일 재현 |
| **RAG** | Retrieval Augmented Generation (검색 증강 생성) |
| **Vector DB** | 벡터 검색을 위한 데이터베이스 (Pinecone, Qdrant) |
| **주제글** | 월간 메인 콘텐츠 (1-2개) |
| **일반글** | 주제글과 연관된 하위 콘텐츠 (5개) |
| **Embedding** | 텍스트를 벡터로 변환 (OpenAI Embeddings API) |
| **Semantic Search** | 의미 기반 검색 (키워드가 아닌 의미로 검색) |

### 10.3 Revision History

| 버전 | 날짜 | 변경 사항 | 작성자 |
|-----|------|----------|--------|
| 1.0 | 2026-01-23 | 초안 작성 | Product Team |

---

## ✅ Sign-Off

| 역할 | 이름 | 승인 | 날짜 |
|-----|------|------|------|
| **Product Manager** | (TBD) | [ ] | 2026-01-__ |
| **Tech Lead** | (TBD) | [ ] | 2026-01-__ |
| **CEO** | (TBD) | [ ] | 2026-01-__ |

---

**문서 소유자**: Product Team  
**검토 주기**: 매주 월요일  
**다음 검토일**: 2026-01-27

---

## 📞 Contact

질문이나 피드백이 있으시면 아래로 연락주세요:
- **PM**: (TBD)
- **Tech Lead**: (TBD)
- **Slack**: #guava-product

---

**END OF DOCUMENT**
