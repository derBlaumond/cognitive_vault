# 구아바 플랫폼 백엔드 설계 및 배포 계획서

## 📋 목차

1. [프로젝트 개요](#1-프로젝트-개요)
2. [기술 스택 선정](#2-기술-스택-선정)
3. [시스템 아키텍처](#3-시스템-아키텍처)
4. [데이터베이스 설계](#4-데이터베이스-설계)
5. [API 설계](#5-api-설계)
6. [AI 시스템 설계](#6-ai-시스템-설계)
7. [보안 및 권한 관리](#7-보안-및-권한-관리)
8. [배포 전략](#8-배포-전략)
9. [개발 일정](#9-개발-일정)
10. [리스크 관리](#10-리스크-관리)
11. [비용 산정](#11-비용-산정)

---

## 1. 프로젝트 개요

### 1.1 목적

구아바 플랫폼의 백엔드 시스템을 구축하여 User(병원 관계자)와 Admin(구아바 관리자) 간의 콘텐츠 관리 워크플로우를 지원하고, AI 기반 콘텐츠 자동 생성 기능을 제공합니다.

### 1.2 핵심 요구사항

#### User 모드
- 로그인/회원가입 및 이메일 인증
- 병원 정보 관리 및 월간 설문 제출
- 콘텐츠 승인/수정 요청
- 실시간 알림 수신
- 월간 콘텐츠 현황 대시보드

#### Admin 모드
- 모든 병원 정보 관리 (Feature 6)
- 병원별 콘텐츠 현황 관리 (Feature 7)
- AI 기반 콘텐츠 자동 생성 (Feature 8) ⭐ 핵심
- 뉴스레터 발송 (Feature 9)
- 실시간 알림 전송

### 1.3 성공 지표

- API 응답 시간: 평균 200ms 이하
- AI 콘텐츠 생성 시간: 20초 이내
- 99.9% 가동률 (월 43분 이하 다운타임)
- 동시 사용자 100명 지원

---

## 2. 기술 스택 선정

### 2.1 백엔드 프레임워크: **NestJS + TypeScript**

#### 선정 근거
```typescript
// 프론트-백엔드 타입 공유
// guava_platform/src/types/content.ts
export interface Content {
  id: string;
  status: ContentStatus;
  // ...
}

// guava_backend/src/types/content.types.ts
export interface Content {
  id: string;
  status: ContentStatus;
  // ... 동일한 타입
}
```

| 장점 | 설명 |
|------|------|
| **타입 시스템 통일** | 프론트엔드(React + TS)와 동일한 타입 사용 가능 |
| **모듈 시스템** | Feature별 명확한 분리 (Auth, Hospital, Content, AI 등) |
| **의존성 주입** | 테스트 용이, 유지보수 향상 |
| **Swagger 자동 생성** | API 문서 자동화 |
| **생태계 풍부** | Prisma, Passport, JWT 등 다양한 라이브러리 |

#### 대안 비교

| Framework | 장점 | 단점 | 평가 |
|-----------|------|------|------|
| **NestJS** | 구조화, TS 네이티브, 엔터프라이즈급 | 학습 곡선 | ⭐⭐⭐⭐⭐ |
| Express.js | 간단, 빠른 개발 | 구조화 부족 | ⭐⭐⭐ |
| Fastify | 빠른 성능 | 작은 생태계 | ⭐⭐⭐ |

### 2.2 데이터베이스: **PostgreSQL + Prisma ORM**

#### 선정 근거

구아바의 데이터 구조는 **관계형 특징**이 강합니다:

```
Users ←→ Hospital_Users ←→ Hospitals
                              ↓
                          Contents
                              ↓
                          Surveys
```

| 요구사항 | PostgreSQL | MongoDB |
|---------|-----------|---------|
| **다대다 관계** (User-Hospital) | ✅ JOIN 우수 | ❌ $lookup 비효율 |
| **ACID 트랜잭션** (상태 변경 + 알림) | ✅ 강력 | ⚠️ 제한적 |
| **타입 강제** | ✅ Enum 지원 | ❌ 느슨 |
| **복잡한 쿼리** | ✅ SQL 강력 | ❌ Aggregation 복잡 |

#### Prisma ORM 선택 이유

```prisma
// schema.prisma - 타입 안정성 + 마이그레이션 자동화

model Content {
  id         String        @id @default(uuid())
  status     ContentStatus // Enum 타입 강제
  hospital   Hospital      @relation(...)
  
  @@index([hospitalId, status]) // 인덱스 선언
}

enum ContentStatus {
  approval_requested
  revision_requested
  revising
  revision_completed
  published
}
```

- **타입 안전성**: TypeScript 타입 자동 생성
- **마이그레이션**: `prisma migrate` 자동화
- **쿼리 빌더**: SQL Injection 방지
- **IDE 지원**: 자동완성, 타입 체크

### 2.3 AI 서비스: **OpenAI GPT-4 + 확장 가능 설계**

#### 확장성 아키텍처

```typescript
// Provider 패턴으로 모델 추가 용이
interface AIProvider {
  generateContent(prompt: string): Promise<string>;
  getName(): string;
}

class OpenAIProvider implements AIProvider { }
class ClaudeProvider implements AIProvider { } // 추후 추가

class AIService {
  private providers = new Map([
    ['openai', new OpenAIProvider()],
    ['claude', new ClaudeProvider()], // 쉽게 추가
  ]);
  
  async generate(prompt: string, provider = 'openai') {
    return this.providers.get(provider).generateContent(prompt);
  }
}
```

#### Fallback 메커니즘

```typescript
// 메인 모델 실패 시 자동 전환
try {
  return await this.generate(prompt, 'openai');
} catch (error) {
  console.error('OpenAI failed, trying Claude...');
  return await this.generate(prompt, 'claude');
}
```

---

## 3. 시스템 아키텍처

### 3.1 전체 구조

```
┌─────────────────────────────────────────────────┐
│  Client (Browser)                               │
│  - React App (Vercel)                          │
└────────────────┬────────────────────────────────┘
                 │ HTTPS
                 ↓
┌─────────────────────────────────────────────────┐
│  AWS Application Load Balancer (ALB)           │
│  - SSL/TLS Termination                         │
│  - Health Check                                │
└────────────────┬────────────────────────────────┘
                 │
                 ↓
┌─────────────────────────────────────────────────┐
│  NestJS Backend (ECS Fargate)                  │
│  ┌──────────────────────────────────────────┐  │
│  │  Auth Module    │  Hospital Module       │  │
│  │  Content Module │  AI Module             │  │
│  │  Notification Module (WebSocket)         │  │
│  └──────────────────────────────────────────┘  │
└─────┬──────────────────────┬───────────────────┘
      │                      │
      ↓                      ↓
┌──────────────┐      ┌──────────────┐
│ RDS          │      │ ElastiCache  │
│ PostgreSQL   │      │ (Redis)      │
│              │      │ - Session    │
│              │      │ - Cache      │
└──────────────┘      └──────────────┘
      │
      ↓
┌──────────────────────────────────────┐
│  S3 (Image Storage)                  │
│  - User Uploads                      │
│  - Generated Images                  │
└──────────────────────────────────────┘

External Services:
├── OpenAI API (GPT-4)
├── SendGrid (Email)
└── CloudWatch (Monitoring)
```

### 3.2 배포 환경 선택: **Vercel (프론트) + AWS (백엔드)**

#### 왜 Vercel만으로는 부족한가?

| 요구사항 | Vercel Serverless | AWS ECS/EC2 |
|---------|-------------------|-------------|
| **AI 생성 시간** | ❌ 10초/60초 제한 | ✅ 무제한 |
| **WebSocket** | ❌ 불가능 | ✅ 가능 |
| **PostgreSQL** | ⚠️ 외부 연결 | ✅ RDS 직접 연결 |
| **장시간 작업** | ❌ Timeout | ✅ 무제한 |

**결론**: 프론트는 Vercel, 백엔드는 AWS

### 3.3 모듈 구조

```
guava_backend/
├── src/
│   ├── auth/                 # 인증 모듈
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   ├── auth.module.ts
│   │   ├── guards/
│   │   │   ├── jwt-auth.guard.ts
│   │   │   └── roles.guard.ts
│   │   └── strategies/
│   │       └── jwt.strategy.ts
│   │
│   ├── hospitals/            # 병원 관리
│   │   ├── hospitals.controller.ts
│   │   ├── hospitals.service.ts
│   │   └── dto/
│   │       ├── create-hospital.dto.ts
│   │       └── update-hospital.dto.ts
│   │
│   ├── contents/             # 콘텐츠 관리
│   │   ├── contents.controller.ts
│   │   ├── contents.service.ts
│   │   └── dto/
│   │       ├── create-content.dto.ts
│   │       └── update-status.dto.ts
│   │
│   ├── ai/                   # AI 생성 (핵심!)
│   │   ├── ai.controller.ts
│   │   ├── ai.service.ts
│   │   ├── providers/
│   │   │   ├── ai-provider.interface.ts
│   │   │   ├── openai.provider.ts
│   │   │   └── claude.provider.ts (추후)
│   │   └── dto/
│   │       └── generate-content.dto.ts
│   │
│   ├── surveys/              # 설문 조사
│   │   ├── surveys.controller.ts
│   │   └── surveys.service.ts
│   │
│   ├── notifications/        # 알림
│   │   ├── notifications.gateway.ts (WebSocket)
│   │   ├── notifications.service.ts
│   │   └── notifications.controller.ts
│   │
│   ├── newsletters/          # 뉴스레터
│   │   ├── newsletters.controller.ts
│   │   └── newsletters.service.ts
│   │
│   ├── common/               # 공통 모듈
│   │   ├── decorators/
│   │   ├── filters/
│   │   └── interceptors/
│   │
│   └── prisma/               # Prisma 서비스
│       └── prisma.service.ts
│
├── prisma/
│   ├── schema.prisma         # DB 스키마
│   └── migrations/           # 마이그레이션
│
├── test/                     # E2E 테스트
├── .env                      # 환경 변수
└── nest-cli.json
```

---

## 4. 데이터베이스 설계

### 4.1 ERD (Entity Relationship Diagram)

```
┌─────────────┐         ┌──────────────┐         ┌─────────────┐
│   Users     │────┐    │ Hospital     │    ┌────│  Contents   │
│             │    │    │   Users      │    │    │             │
│ - id        │    └────│              │────┘    │ - id        │
│ - email     │         │ - hospitalId │         │ - title     │
│ - username  │         │ - userId     │         │ - body      │
│ - password  │         │ - role       │         │ - status    │
│ - role      │         └──────────────┘         │ - feedback  │
└─────────────┘                                  └─────────────┘
      │                                                 │
      │                                                 │
      │         ┌──────────────┐                       │
      └─────────│  Hospitals   │───────────────────────┘
                │              │
                │ - id         │
                │ - name       │
                │ - type       │
                │ - address    │
                └──────────────┘
                       │
                       │
                ┌──────▼───────┐         ┌──────────────┐
                │   Surveys    │         │Notifications │
                │              │         │              │
                │ - id         │         │ - id         │
                │ - hospitalId │         │ - userId     │
                │ - month      │         │ - type       │
                │ - responses  │         │ - message    │
                │ - status     │         │ - isRead     │
                └──────────────┘         └──────────────┘
```

### 4.2 Prisma Schema

```prisma
// prisma/schema.prisma

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

// ─────────────────────────────────────────────────
// User (유저)
// ─────────────────────────────────────────────────
model User {
  id            String    @id @default(uuid())
  email         String    @unique
  username      String    @unique
  passwordHash  String
  role          Role      @default(USER)
  isEmailVerified Boolean @default(false)
  
  // Relations
  hospitalUsers HospitalUser[]
  notifications Notification[]
  createdContents Content[]    @relation("ContentCreator")
  
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  @@map("users")
}

enum Role {
  USER   // 병원 관계자
  ADMIN  // 구아바 관리자
}

// ─────────────────────────────────────────────────
// Hospital (병원)
// ─────────────────────────────────────────────────
model Hospital {
  id        String    @id @default(uuid())
  name      String
  type      String?   // 한의원, 치과, 병원 등
  address   String?
  contact   String?
  
  // Relations
  hospitalUsers HospitalUser[]
  contents      Content[]
  surveys       Survey[]
  
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  @@map("hospitals")
}

// ─────────────────────────────────────────────────
// HospitalUser (병원-유저 다대다 관계)
// ─────────────────────────────────────────────────
model HospitalUser {
  id         String   @id @default(uuid())
  hospitalId String
  userId     String
  role       String   @default("member") // owner, member 등
  
  hospital Hospital @relation(fields: [hospitalId], references: [id], onDelete: Cascade)
  user     User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  createdAt DateTime @default(now())
  
  @@unique([hospitalId, userId])
  @@index([hospitalId])
  @@index([userId])
  @@map("hospital_users")
}

// ─────────────────────────────────────────────────
// Content (콘텐츠) - 핵심 테이블
// ─────────────────────────────────────────────────
model Content {
  id              String        @id @default(uuid())
  hospitalId      String
  surveyId        String?
  title           String
  body            String        @db.Text
  category        String
  status          ContentStatus
  feedbackRequest String?       @db.Text
  createdBy       String        // Admin ID
  
  hospital Hospital @relation(fields: [hospitalId], references: [id])
  survey   Survey?  @relation(fields: [surveyId], references: [id])
  creator  User     @relation("ContentCreator", fields: [createdBy], references: [id])
  
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  @@index([hospitalId, status])
  @@index([status])
  @@index([createdAt])
  @@map("contents")
}

enum ContentStatus {
  approval_requested  // 승인 요청 (User: 미확인)
  revision_requested  // 수정 요청 (User: 확인)
  revising            // 수정중 (Admin 작업)
  revision_completed  // 수정 완료 (User: 확인)
  published           // 게시 완료
}

// ─────────────────────────────────────────────────
// Survey (설문 조사)
// ─────────────────────────────────────────────────
model Survey {
  id          String   @id @default(uuid())
  hospitalId  String
  month       String   // 2025-10
  responses   Json     // 설문 응답 (JSON)
  status      String   @default("draft") // draft, submitted
  submittedAt DateTime?
  
  hospital Hospital  @relation(fields: [hospitalId], references: [id])
  contents Content[]
  
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  @@unique([hospitalId, month])
  @@map("surveys")
}

// ─────────────────────────────────────────────────
// Notification (알림)
// ─────────────────────────────────────────────────
model Notification {
  id        String   @id @default(uuid())
  userId    String
  type      String   // content_published, survey_reminder 등
  message   String
  relatedId String?  // 관련 콘텐츠/설문 ID
  isRead    Boolean  @default(false)
  
  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  createdAt DateTime @default(now())
  
  @@index([userId, isRead])
  @@map("notifications")
}

// ─────────────────────────────────────────────────
// Newsletter (뉴스레터)
// ─────────────────────────────────────────────────
model Newsletter {
  id        String    @id @default(uuid())
  title     String
  body      String    @db.Text
  sentAt    DateTime?
  createdBy String
  
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  @@map("newsletters")
}
```

### 4.3 인덱스 전략

```sql
-- 자주 사용되는 쿼리 최적화

-- 1. 병원별 콘텐츠 조회
CREATE INDEX idx_contents_hospital_status ON contents(hospital_id, status);

-- 2. 사용자별 미읽음 알림
CREATE INDEX idx_notifications_user_read ON notifications(user_id, is_read);

-- 3. 월별 설문 조회
CREATE UNIQUE INDEX idx_surveys_hospital_month ON surveys(hospital_id, month);

-- 4. 최신 콘텐츠 정렬
CREATE INDEX idx_contents_created_at ON contents(created_at DESC);
```

---

## 5. API 설계

### 5.1 API 엔드포인트 전체 목록

#### 인증 (Authentication)

```typescript
POST   /api/auth/signup
Body: { email, username, password }
Response: { user, token }

POST   /api/auth/login
Body: { email, password }
Response: { user, token }

POST   /api/auth/logout
Headers: Authorization: Bearer <token>

GET    /api/auth/me
Headers: Authorization: Bearer <token>
Response: { user }

POST   /api/auth/verify-email
Body: { token }

POST   /api/auth/forgot-password
Body: { email }

POST   /api/auth/reset-password
Body: { token, newPassword }
```

#### 병원 (Hospitals) - Feature 6

```typescript
GET    /api/hospitals
Headers: Authorization: Bearer <token> (Admin only)
Query: ?search=xxx&type=xxx
Response: [{ id, name, type, address, ... }]

GET    /api/hospitals/:id
Headers: Authorization: Bearer <token>
Response: { id, name, type, address, users[], contents[] }

POST   /api/hospitals
Headers: Authorization: Bearer <token> (Admin only)
Body: { name, type, address, contact }

PUT    /api/hospitals/:id
Headers: Authorization: Bearer <token>
Body: { name, type, address, contact }

DELETE /api/hospitals/:id
Headers: Authorization: Bearer <token> (Admin only)
```

#### 콘텐츠 (Contents) - Feature 7

```typescript
GET    /api/contents
Headers: Authorization: Bearer <token>
Query: ?hospitalId=xxx&status=approval_requested&month=2025-10&page=1&limit=20
Response: {
  data: [{ id, title, body, status, hospital, ... }],
  pagination: { total, page, limit }
}

GET    /api/contents/:id
Headers: Authorization: Bearer <token>
Response: { id, title, body, status, feedbackRequest, ... }

POST   /api/contents
Headers: Authorization: Bearer <token> (Admin only)
Body: { hospitalId, title, body, category, status }
Response: { id, ... }

PUT    /api/contents/:id
Headers: Authorization: Bearer <token> (Admin only)
Body: { title, body, category }

PATCH  /api/contents/:id/status
Headers: Authorization: Bearer <token>
Body: { status: 'published', feedbackRequest?: '수정 요청 내용' }
Response: { id, status, ... }

DELETE /api/contents/:id
Headers: Authorization: Bearer <token> (Admin only)

GET    /api/contents/stats
Headers: Authorization: Bearer <token>
Query: ?hospitalId=xxx&month=2025-10
Response: {
  total: 45,
  approval_requested: 5,
  revision_requested: 3,
  revising: 2,
  revision_completed: 10,
  published: 25
}
```

#### AI 생성 (AI) - Feature 8 ⭐ 핵심

```typescript
POST   /api/ai/generate
Headers: Authorization: Bearer <token> (Admin only)
Body: {
  hospitalId: string,
  surveyId: string,
  mainTopicCount: 1 | 2,
  preferences?: {
    tone: 'professional' | 'friendly',
    keywords: string[],
  }
}
Response: {
  contentId: string,
  mainTopics: [
    { title, body, category }
  ],
  generalArticles: [
    { title, body, category }
    // 1개 생성: 14개
    // 2개 생성: 13개
  ],
  generatedAt: timestamp
}

POST   /api/ai/regenerate
Headers: Authorization: Bearer <token> (Admin only)
Body: {
  contentId: string,
  partId: string,
  feedbackRequest: string
}
Response: { title, body, category }

GET    /api/ai/usage
Headers: Authorization: Bearer <token> (Admin only)
Query: ?month=2025-10
Response: {
  totalRequests: 150,
  totalTokens: 450000,
  estimatedCost: 45.00,
  byProvider: {
    openai: { requests: 150, tokens: 450000, cost: 45.00 }
  }
}
```

#### 설문 (Surveys)

```typescript
GET    /api/surveys
Headers: Authorization: Bearer <token>
Query: ?hospitalId=xxx&month=2025-10

GET    /api/surveys/:id
Headers: Authorization: Bearer <token>

POST   /api/surveys
Headers: Authorization: Bearer <token>
Body: {
  hospitalId, month, responses: { ... }, status: 'draft'
}

PUT    /api/surveys/:id
Headers: Authorization: Bearer <token>
Body: { responses: { ... }, status: 'submitted' }
```

#### 알림 (Notifications)

```typescript
GET    /api/notifications
Headers: Authorization: Bearer <token>
Query: ?page=1&limit=20

GET    /api/notifications/unread
Headers: Authorization: Bearer <token>
Response: { count: 5 }

PATCH  /api/notifications/:id/read
Headers: Authorization: Bearer <token>

DELETE /api/notifications/:id
Headers: Authorization: Bearer <token>

// WebSocket
WS     /api/notifications/ws
Event: 'notification'
Data: { type, message, relatedId }
```

#### 뉴스레터 (Newsletters) - Feature 9

```typescript
GET    /api/newsletters
Headers: Authorization: Bearer <token> (Admin only)

POST   /api/newsletters
Headers: Authorization: Bearer <token> (Admin only)
Body: { title, body }

POST   /api/newsletters/:id/send
Headers: Authorization: Bearer <token> (Admin only)
Query: ?recipients=all|hospital-1,hospital-2

GET    /api/newsletters/:id/analytics
Headers: Authorization: Bearer <token> (Admin only)
Response: {
  sentCount: 150,
  openRate: 0.65,
  clickRate: 0.32
}
```

### 5.2 에러 응답 표준

```typescript
// 에러 응답 형식
{
  statusCode: 400 | 401 | 403 | 404 | 500,
  message: string | string[],
  error: 'Bad Request' | 'Unauthorized' | 'Forbidden' | 'Not Found' | 'Internal Server Error',
  timestamp: '2025-12-27T12:00:00.000Z',
  path: '/api/contents/123'
}

// 예시
{
  statusCode: 403,
  message: '이 병원의 콘텐츠에 접근 권한이 없습니다.',
  error: 'Forbidden',
  timestamp: '2025-12-27T12:00:00.000Z',
  path: '/api/contents/abc-123'
}
```

---

## 6. AI 시스템 설계

### 6.1 AI 콘텐츠 생성 플로우 (Feature 8)

```
┌─────────────────────────────────────────┐
│ 1. User가 월간 설문 제출               │
│    - 4개 카테고리, 16개 질문           │
│    - DB에 저장 (surveys 테이블)        │
└────────────┬────────────────────────────┘
             ↓
┌─────────────────────────────────────────┐
│ 2. Admin이 AI 생성 요청                │
│    POST /api/ai/generate               │
│    { hospitalId, surveyId, count: 1|2 }│
└────────────┬────────────────────────────┘
             ↓
┌─────────────────────────────────────────┐
│ 3. 설문 응답 분석 & 프롬프트 생성      │
│    - 병원 특성 추출                    │
│    - 키워드 추출                       │
│    - 톤 분석 (전문적/친근함)           │
└────────────┬────────────────────────────┘
             ↓
┌─────────────────────────────────────────┐
│ 4. GPT-4 API 호출                      │
│    - 메인 주제: 1개 or 2개             │
│    - 일반 글: 14개 or 13개             │
│    - 각 300-500자                      │
│    - JSON 형식 응답                    │
└────────────┬────────────────────────────┘
             ↓
┌─────────────────────────────────────────┐
│ 5. 응답 파싱 & 검증                    │
│    - JSON 유효성 체크                  │
│    - 필수 필드 확인                    │
│    - 길이 제한 확인                    │
└────────────┬────────────────────────────┘
             ↓
┌─────────────────────────────────────────┐
│ 6. DB 저장                             │
│    - contents 테이블에 저장            │
│    - status: 'revising'                │
│    - createdBy: admin_id               │
└────────────┬────────────────────────────┘
             ↓
┌─────────────────────────────────────────┐
│ 7. 프론트 반환                         │
│    - 13페이지 플로우에서 표시          │
│    - Admin이 직접 수정 가능            │
└─────────────────────────────────────────┘
```

### 6.2 프롬프트 설계

```typescript
// src/ai/ai.service.ts

private buildPrompt(survey: Survey, mainTopicCount: number): string {
  const { responses } = survey;
  
  return `
당신은 한의원 전문 콘텐츠 작성자입니다.
아래 설문 응답을 기반으로 월간 콘텐츠를 생성해주세요.

[병원 정보]
- 병원명: ${hospital.name}
- 유형: ${hospital.type}
- 주요 치료 분야: ${responses.치료처방.주요치료분야.join(', ')}
- 콘텐츠 톤: ${responses.전략방향.톤}
- 주요 키워드: ${responses.키워드표현.키워드.join(', ')}

[콘텐츠 주제선정]
${JSON.stringify(responses.콘텐츠주제선정, null, 2)}

[요구사항]
1. 메인 주제 글: ${mainTopicCount}개
   - 깊이 있는 내용
   - 500-700자
   - 전문성 + 따뜻함

2. 일반 글: ${mainTopicCount === 1 ? 14 : 13}개
   - 짧고 유익한 팁
   - 300-400자
   - 카테고리: ${responses.콘텐츠주제선정.희망카테고리.join(', ')}

[JSON 형식으로 응답]
{
  "mainTopics": [
    {
      "title": "...",
      "body": "...",
      "category": "..."
    }
  ],
  "generalArticles": [
    {
      "title": "...",
      "body": "...",
      "category": "..."
    }
  ]
}
`;
}
```

### 6.3 비용 최적화

| 항목 | 전략 |
|------|------|
| **토큰 사용량** | 프롬프트 최소화, 응답 길이 제한 |
| **캐싱** | 유사 설문 응답 캐싱 (Redis) |
| **Batch 처리** | 여러 글을 한 번에 생성 |
| **Fallback** | GPT-4 실패 시 GPT-3.5-turbo 사용 |

**예상 비용 (월 100회 생성 기준)**:
- GPT-4: $0.03/1K tokens (input), $0.06/1K tokens (output)
- 1회 생성: ~3K tokens input + 5K tokens output = $0.39
- 월 100회: **$39**

---

## 7. 보안 및 권한 관리

### 7.1 인증 (Authentication)

```typescript
// JWT 기반 인증
// src/auth/auth.service.ts

async login(dto: LoginDto) {
  // 1. 유저 찾기
  const user = await this.prisma.user.findUnique({
    where: { email: dto.email }
  });
  
  // 2. 비밀번호 확인 (bcrypt)
  const valid = await bcrypt.compare(dto.password, user.passwordHash);
  if (!valid) throw new UnauthorizedException('비밀번호가 틀렸습니다');
  
  // 3. JWT 발급
  const payload = {
    sub: user.id,
    email: user.email,
    role: user.role, // USER or ADMIN
  };
  
  const token = this.jwtService.sign(payload, {
    secret: process.env.JWT_SECRET,
    expiresIn: '7d',
  });
  
  return { user, token };
}
```

### 7.2 권한 관리 (Authorization)

```typescript
// Role-based Access Control (RBAC)

// 1. JwtAuthGuard: 로그인 여부 확인
@UseGuards(JwtAuthGuard)
@Get('hospitals')
async findAll() { ... }

// 2. RolesGuard: 권한 확인
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN')
@Post('hospitals')
async create() { ... }

// 3. 병원 소속 확인 (User)
async checkHospitalAccess(userId: string, hospitalId: string) {
  const membership = await this.prisma.hospitalUser.findUnique({
    where: {
      hospitalId_userId: { hospitalId, userId }
    }
  });
  
  if (!membership) {
    throw new ForbiddenException('이 병원에 접근 권한이 없습니다');
  }
}
```

### 7.3 보안 체크리스트

| 항목 | 구현 방법 |
|------|----------|
| **비밀번호 암호화** | bcrypt (salt rounds: 10) |
| **SQL Injection** | Prisma ORM (자동 방지) |
| **XSS** | Input validation + sanitization |
| **CSRF** | SameSite Cookie + CSRF Token |
| **Rate Limiting** | @nestjs/throttler (100 req/min) |
| **HTTPS** | ALB SSL/TLS Termination |
| **CORS** | 프론트 도메인만 허용 |
| **환경 변수** | AWS Secrets Manager |

---

## 8. 배포 전략

### 8.1 인프라 구성 (AWS)

```yaml
# AWS 서비스 맵핑

Compute:
  Service: ECS Fargate
  Spec: 0.5 vCPU, 1GB RAM (시작)
  Auto Scaling: CPU 70% 기준
  Container: Docker (Node.js 18 Alpine)

Database:
  Service: RDS PostgreSQL 15
  Instance: db.t3.micro (시작) → db.t3.small (확장)
  Storage: 20GB (자동 증가)
  Backup: 자동 백업 (7일 보관)
  Multi-AZ: Phase 2에서 활성화

Caching:
  Service: ElastiCache Redis 7
  Instance: cache.t3.micro
  Usage: Session, API 캐싱

Storage:
  Service: S3
  Bucket: guava-platform-uploads
  Usage: 이미지 업로드

Load Balancer:
  Service: Application Load Balancer (ALB)
  SSL: ACM Certificate
  Health Check: /health (30초 간격)

Monitoring:
  Service: CloudWatch
  Metrics: CPU, Memory, Disk, API Latency
  Alarms: Error rate > 5%, CPU > 80%
  Logs: 30일 보관

DNS:
  Service: Route 53
  Domain: api.guava-platform.com
```

### 8.2 배포 프로세스

```bash
# 1. Docker 이미지 빌드
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npx prisma generate
RUN npm run build

FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma
EXPOSE 3000
CMD ["node", "dist/main"]

# 2. ECR에 푸시
aws ecr get-login-password --region ap-northeast-2 | \
  docker login --username AWS --password-stdin <account>.dkr.ecr.ap-northeast-2.amazonaws.com

docker build -t guava-backend .
docker tag guava-backend:latest <account>.dkr.ecr.ap-northeast-2.amazonaws.com/guava-backend:latest
docker push <account>.dkr.ecr.ap-northeast-2.amazonaws.com/guava-backend:latest

# 3. ECS 배포 (Zero-Downtime)
aws ecs update-service \
  --cluster guava-cluster \
  --service guava-backend-service \
  --force-new-deployment

# 4. 헬스 체크 확인
curl https://api.guava-platform.com/health
```

### 8.3 CI/CD 파이프라인 (GitHub Actions)

```yaml
# .github/workflows/deploy.yml

name: Deploy Backend

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Run Tests
        run: |
          npm ci
          npm run test
          npm run test:e2e
      
      - name: Build & Push Docker Image
        run: |
          docker build -t guava-backend .
          docker push <ECR_URI>
      
      - name: Deploy to ECS
        run: |
          aws ecs update-service --force-new-deployment
      
      - name: Run Prisma Migration
        run: |
          npx prisma migrate deploy
      
      - name: Notify Slack
        run: |
          curl -X POST -H 'Content-type: application/json' \
            --data '{"text":"✅ 배포 완료!"}' \
            ${{ secrets.SLACK_WEBHOOK }}
```

---

## 9. 개발 일정

### 9.1 4주 Sprint 계획

| Week | Sprint | 주요 작업 | 결과물 | 담당 |
|------|--------|----------|--------|------|
| **Week 1** | Foundation | - NestJS 초기화<br>- Prisma Schema<br>- Auth Module<br>- Hospital CRUD<br>- DB Migration | - 로그인/회원가입 완료<br>- 병원 관리 API 완료<br>- JWT 인증 완료 | Backend Team |
| **Week 2** | Content Management | - Content CRUD<br>- 상태 변경 로직<br>- 통계 API<br>- 프론트 연동 (Feature 7)<br>- 테스트 작성 | - Feature 7 완료<br>- User-Admin 상호작용<br>- API 문서 (Swagger) | Backend + Frontend |
| **Week 3** | AI Generation ⭐ | - OpenAI Provider<br>- AI Service 아키텍처<br>- 콘텐츠 생성 플로우<br>- 프롬프트 최적화<br>- 프론트 연동 (Feature 8) | - Feature 8 완료<br>- AI 자동 생성 작동<br>- 확장 가능 설계 | Backend + Frontend + AI Specialist |
| **Week 4** | Polish & Deploy | - Newsletter Module<br>- 실시간 알림 (WebSocket)<br>- 리팩토링<br>- AWS 배포<br>- 통합 테스트 | - Feature 9 완료<br>- 프로덕션 배포<br>- 모니터링 설정 | Full Team |

### 9.2 상세 일정

#### Week 1: Foundation (기초)

| Day | 작업 | 시간 | 완료 기준 |
|-----|------|------|----------|
| Day 1 | Prisma Schema 작성 | 3h | schema.prisma 완성 |
| Day 1 | 타입 정의 | 2h | types/ 폴더 완성 |
| Day 2 | NestJS 초기화 | 2h | 프로젝트 생성, 모듈 구조 |
| Day 2-3 | Auth Module | 8h | 로그인/회원가입 API |
| Day 3-4 | Hospital Module | 6h | 병원 CRUD API |
| Day 5 | DB Migration & 테스트 | 4h | RDS 연결, 데이터 확인 |

#### Week 2: Content Management (콘텐츠 관리)

| Day | 작업 | 시간 | 완료 기준 |
|-----|------|------|----------|
| Day 6-7 | Content CRUD API | 8h | 기본 API 완성 |
| Day 7-8 | 상태 변경 로직 | 6h | 5개 상태 워크플로우 |
| Day 8 | 통계 API | 3h | /api/contents/stats |
| Day 9 | 프론트 연동 (Feature 7) | 6h | Admin 페이지 작동 |
| Day 10 | 테스트 작성 | 4h | Unit + E2E 테스트 |

#### Week 3: AI Generation ⭐ (AI 생성)

| Day | 작업 | 시간 | 완료 기준 |
|-----|------|------|----------|
| Day 11-12 | OpenAI Provider | 8h | GPT-4 연동 완료 |
| Day 12-13 | AI Service 아키텍처 | 6h | 확장 가능 설계 |
| Day 13-14 | 콘텐츠 생성 플로우 | 10h | 1개/2개 생성 로직 |
| Day 14-15 | 프롬프트 최적화 | 6h | 프롬프트 튜닝 |
| Day 15 | 프론트 연동 (Feature 8) | 6h | 13페이지 플로우 작동 |

#### Week 4: Polish & Deploy (마무리 & 배포)

| Day | 작업 | 시간 | 완료 기준 |
|-----|------|------|----------|
| Day 16-17 | Newsletter Module | 6h | Feature 9 API |
| Day 17-18 | 실시간 알림 (WebSocket) | 8h | 알림 시스템 완료 |
| Day 18 | 리팩토링 | 4h | 코드 정리 |
| Day 19 | AWS 배포 | 6h | ECS + RDS 설정 |
| Day 20 | 통합 테스트 & 문서화 | 4h | API 문서 완성 |

---

## 10. 리스크 관리

### 10.1 기술적 리스크

| 리스크 | 확률 | 영향 | 완화 방안 |
|--------|------|------|----------|
| **AI API 응답 시간 초과** | 중 | 높음 | - Timeout 30초 설정<br>- Retry 메커니즘<br>- Fallback to GPT-3.5-turbo |
| **AI API 비용 초과** | 중 | 중 | - 월별 예산 알림<br>- 요청 수 제한<br>- 캐싱 적극 활용 |
| **데이터베이스 병목** | 낮 | 높음 | - 인덱스 최적화<br>- Redis 캐싱<br>- Connection Pool 설정 |
| **WebSocket 연결 불안정** | 중 | 중 | - Reconnect 로직<br>- Heartbeat 구현<br>- Fallback to Polling |
| **대용량 트래픽** | 낮 | 높음 | - Auto Scaling 설정<br>- CDN 사용<br>- Rate Limiting |

### 10.2 일정 리스크

| 리스크 | 완화 방안 |
|--------|----------|
| **AI 프롬프트 최적화 지연** | Week 3 Day 14-15를 buffer로 확보 |
| **프론트-백엔드 연동 이슈** | Week 2 Day 9, Week 3 Day 15를 연동 전용일로 배정 |
| **배포 이슈** | Week 4 Day 19를 배포 전용일로 확보 |

### 10.3 비즈니스 리스크

| 리스크 | 완화 방안 |
|--------|----------|
| **요구사항 변경** | - Agile 방식 (주 단위 Sprint)<br>- Feature별 독립적 개발 |
| **데이터 유실** | - 자동 백업 (일 1회)<br>- Point-in-time Recovery |
| **서비스 중단** | - Multi-AZ 배포 (Phase 2)<br>- Health Check 자동화 |

---

## 11. 비용 산정

### 11.1 초기 비용 (월별, USD)

| 항목 | 사양 | 비용 |
|------|------|------|
| **ECS Fargate** | 0.5 vCPU, 1GB RAM | $15 |
| **RDS PostgreSQL** | db.t3.micro, 20GB | $25 |
| **ElastiCache Redis** | cache.t3.micro | $15 |
| **ALB** | - | $20 |
| **S3 + CloudFront** | 10GB 저장 | $5 |
| **Route 53** | 1 Hosted Zone | $1 |
| **CloudWatch** | 로그 + 메트릭 | $10 |
| **OpenAI API** | 100회 생성/월 | $40 |
| **SendGrid** | 10K 이메일/월 | $15 |
| **합계** | | **$146/월** |

### 11.2 확장 시 비용 (100명 동시 사용자)

| 항목 | 확장 사양 | 비용 |
|------|-----------|------|
| **ECS Fargate** | 1 vCPU, 2GB RAM (3 tasks) | $90 |
| **RDS PostgreSQL** | db.t3.small, 50GB | $50 |
| **ElastiCache Redis** | cache.t3.small | $30 |
| **ALB** | - | $25 |
| **S3 + CloudFront** | 50GB 저장 | $15 |
| **OpenAI API** | 500회 생성/월 | $200 |
| **SendGrid** | 50K 이메일/월 | $30 |
| **합계** | | **$440/월** |

### 11.3 개발 비용

| 항목 | 인력 | 기간 | 비용 (예상) |
|------|------|------|-------------|
| **백엔드 개발** | Senior 1명 | 4주 | - |
| **프론트 연동** | Fullstack 1명 | 2주 | - |
| **DevOps 설정** | DevOps 1명 | 1주 | - |
| **QA & 테스트** | QA 1명 | 1주 | - |

---

## 12. 성공 지표 (KPI)

### 12.1 기술 지표

| 지표 | 목표 | 측정 방법 |
|------|------|----------|
| **API 응답 시간** | p95 < 200ms | CloudWatch |
| **AI 생성 시간** | 평균 20초 | Custom Metric |
| **가동률 (Uptime)** | 99.9% | CloudWatch Alarms |
| **에러율** | < 0.1% | Sentry |

### 12.2 비즈니스 지표

| 지표 | 목표 | 측정 방법 |
|------|------|----------|
| **병원 가입 수** | 20개 (3개월) | DB Count |
| **콘텐츠 생성 수** | 100개/월 | DB Count |
| **AI 사용률** | 80% 콘텐츠 AI 생성 | Analytics |
| **User 만족도** | NPS > 50 | 설문 조사 |

---

## 13. 다음 단계 (Phase 2)

현재 계획은 **MVP (Minimum Viable Product)** 입니다.  
Phase 2에서 추가될 기능:

### 13.1 고급 기능
- 월간 레포트 자동 생성 (PDF)
- 콘텐츠 성과 분석 (조회수, 클릭률)
- A/B 테스트 (콘텐츠 버전 비교)
- 다국어 지원 (i18n)

### 13.2 인프라 개선
- Multi-AZ 배포 (고가용성)
- CDN 적극 활용
- Redis Cluster (캐싱 강화)
- 로그 분석 (ELK Stack)

### 13.3 AI 고도화
- Claude 3 추가
- Fine-tuning (병원별 맞춤 모델)
- 이미지 생성 (DALL-E 3)
- 음성 콘텐츠 (TTS)

---

## 부록 A: 환경 변수

```bash
# .env

# Database
DATABASE_URL="postgresql://user:password@localhost:5432/guava_db"

# JWT
JWT_SECRET="your-super-secret-key-change-in-production"
JWT_EXPIRES_IN="7d"

# OpenAI
OPENAI_API_KEY="sk-..."

# SendGrid
SENDGRID_API_KEY="SG..."
SENDGRID_FROM_EMAIL="noreply@guava-platform.com"

# AWS
AWS_REGION="ap-northeast-2"
AWS_S3_BUCKET="guava-platform-uploads"
AWS_ACCESS_KEY_ID="AKIA..."
AWS_SECRET_ACCESS_KEY="..."

# Redis
REDIS_URL="redis://localhost:6379"

# Frontend
FRONTEND_URL="https://guava-platform.com"
CORS_ORIGIN="https://guava-platform.com"

# Monitoring
SENTRY_DSN="https://..."
```

---

## 부록 B: 참고 문서

- [NestJS 공식 문서](https://docs.nestjs.com/)
- [Prisma 공식 문서](https://www.prisma.io/docs/)
- [OpenAI API 문서](https://platform.openai.com/docs/)
- [AWS ECS 가이드](https://docs.aws.amazon.com/ecs/)
- [PostgreSQL 성능 튜닝](https://www.postgresql.org/docs/current/performance-tips.html)

---

## 변경 이력

| 날짜 | 버전 | 변경 내용 | 작성자 |
|------|------|----------|--------|
| 2025-12-27 | 1.0 | 초안 작성 | Backend Team |

---

**문의사항이 있으시면 백엔드 팀에 연락주세요.**

📧 backend@guava-platform.com

