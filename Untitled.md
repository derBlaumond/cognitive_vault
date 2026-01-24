# Feature 3: 콘텐츠 계층 구조 - 구현 상태 문서

  

**작성일**: 2026-01-23  

**Feature 번호**: Feature 3  

**Feature 이름**: 콘텐츠 계층 구조 (Content Hierarchy)

  

---

  

## 📋 개요

  

### Feature 설명

주제글(THEME) 1개와 일반글(GENERAL) 5개의 계층 관계를 DB Schema와 UI에서 명확하게 표현합니다. 주제글 삭제 시 하위 일반글도 함께 관리 가능합니다.

  

### 목적

- 주제글과 일반글 구분 명확화

- 계층 구조 기반 콘텐츠 관리

- 해시태그 기반 콘텐츠 그룹화

  

### 우선순위

- 🟡 **P1 (High)**

  

---

  

## ✅ 구현 상태

  

### 전체 진행률

- **Backend**: ✅ 100% 완료

- **Frontend**: ⏳ 0% 미구현

- **테스트**: ✅ 100% 완료 (E2E)

- **문서화**: ✅ 100% 완료

  

### 완료된 작업

- [x] ContentType Enum 추가 (THEME, GENERAL)

- [x] Content.type 필드 추가

- [x] Content.parentId 필드 추가 (자기 참조 관계)

- [x] Content.hashtag 필드 추가 (주제글 그룹화)

- [x] Migration 실행 및 인덱스 최적화

- [x] GET /api/contents/theme/:id/generals API

- [x] GET /api/contents/by-hashtag/:hashtag API

- [x] POST /api/contents/bulk-create API

- [x] Backend E2E 테스트 완료

  

### 남은 작업

- [ ] Frontend: 계층 구조 UI 반영 (펼치기/접기)

- [ ] Frontend API 연동

- [ ] Frontend E2E 테스트

  

---

  

## 🏗️ 아키텍처

  

### Backend 구조

```

apps/backend/src/

├── contents/

│   ├── contents.controller.ts

│   ├── contents.service.ts

│   ├── contents.module.ts

│   └── dto/

│       ├── create-content.dto.ts (수정)

│       └── bulk-create-content.dto.ts (신규)

```

  

### Database Schema

```prisma

enum ContentType {

  THEME    // 주제글

  GENERAL  // 일반글

}

  

model Content {

  type            ContentType   @default(GENERAL)

  parentId        String?       @map("parent_id")

  hashtag         String?

  parent           Content?  @relation("ContentHierarchy", fields: [parentId])

  relatedPosts     Content[] @relation("ContentHierarchy")

  @@index([type, parentId])

  @@index([hashtag])

}

```

  

---

  

## 🔌 API 엔드포인트

  

### 1. 주제글 + 일반글 일괄 생성

```

POST /api/contents/bulk-create

```

  

**Request**:

```typescript

{

  hospitalId: "uuid",

  surveyId: "uuid",

  contents: [

    {

      type: "THEME",

      hashtag: "#다이어트",

      title: "요요 없는 건강한 다이어트...",

      body: "...",

      category: "건강"

    },

    {

      type: "GENERAL",

      hashtag: "#다이어트",

      title: "체질별 맞춤 다이어트 식단...",

      body: "...",

      category: "건강"

    }

  ]

}

```

  

**Response**:

```typescript

{

  message: "콘텐츠 일괄 생성 완료",

  data: {

    themeContents: [

      { id: "uuid", title: "...", type: "THEME", hashtag: "#다이어트", relatedCount: 5 }

    ],

    generalContents: [

      { id: "uuid", title: "...", type: "GENERAL", parentId: "uuid" }

    ],

    totalCount: 6

  }

}

```

  

### 2. 주제글별 일반글 조회

```

GET /api/contents/theme/:id/generals

```

  

**Response**:

```typescript

{

  theme: {

    id: "uuid",

    title: "요요 없는 건강한 다이어트...",

    hashtag: "#다이어트",

    type: "THEME",

    status: "revising",

    category: "건강",

    hospital: { ... },

    creator: { ... }

  },

  generals: [

    { id: "uuid", title: "...", type: "GENERAL", parentId: "uuid" }

  ]

}

```

  

### 3. 해시태그별 콘텐츠 조회

```

GET /api/contents/by-hashtag/:hashtag?hospitalId=uuid

```

  

**Response**:

```typescript

{

  hashtag: "#다이어트",

  theme: { id: "...", title: "...", type: "THEME" },

  generals: [

    { id: "...", title: "...", type: "GENERAL", parentId: "..." }

  ],

  totalCount: 6

}

```

  

---

  

## 🧪 테스트

  

### E2E Tests

- **파일**: `test/contents-hierarchy.e2e-spec.ts`

- **테스트 시나리오**:

  - [x] 주제글 1개 + 일반글 5개 일괄 생성

  - [x] 주제글별 일반글 조회

  - [x] 해시태그별 콘텐츠 조회

  - [x] Integration: 주제글 2개 + 일반글 10개 생성 → 조회 플로우

  

### 엣지 케이스

- [x] 존재하지 않는 병원 ID (404)

- [x] 존재하지 않는 설문 ID (404)

- [x] 일반글만 생성 시 (주제글 없음) (400)

- [x] 존재하지 않는 주제글 ID 조회 (404)

- [x] 일반글 ID로 주제글 조회 (400)

- [x] 일반글 생성 시 부모 검증 (주제글이어야 함)

  

### 테스트 결과

```

✅ Test Suites: 5 passed, 5 total

✅ Tests:       83 passed, 83 total

```

  

---

  

## 🐛 알려진 이슈

  

### 해결된 이슈

1. **TypeScript Type Error**: ContentType export 누락 - 해결일: 2026-01-23

2. **Nullable Type**: dto.hashtag 타입 불일치 (string | null vs string | undefined) - 해결일: 2026-01-23

3. **Implicit Any**: createdContents 배열 타입 명시 - 해결일: 2026-01-23

  

### 미해결 이슈

없음

  

---

  

## 📊 성능 지표

  

### API 응답 시간

- 일괄 생성: < 500ms (6개 콘텐츠)

- 주제글 조회: < 100ms

- 해시태그 조회: < 150ms

  

### 데이터베이스 쿼리

- 일괄 생성: 트랜잭션 사용 (원자성 보장)

- 주제글 조회: 1개 쿼리 (include 사용)

- 최적화 여부: ✅ (인덱스 적용)

  

---

  

## 🔄 PRD 매핑

  

### PRD Acceptance Criteria (Section 4.1.3)

- [x] `ContentType` Enum 추가 (`THEME`, `GENERAL`)

- [x] `Content.type` 필드 추가

- [x] `Content.parentId` 필드 추가 (자기 참조 관계)

- [x] `Content.hashtag` 필드 추가 (주제글 그룹화)

- [x] Migration 실행 및 인덱스 최적화

- [x] GET `/api/contents/theme/:id/generals` API

- [x] GET `/api/contents/by-hashtag/:hashtag` API

- [x] POST `/api/contents/bulk-create` API (주제글 + 일반글 일괄 생성)

- [ ] Frontend: 계층 구조 UI 반영 (펼치기/접기)

  

### Backend 완성도: 100%

### Frontend 완성도: 0%

  

---

  

## 🚀 향후 작업

  

### Frontend 통합 (Day 9)

- [ ] `ContentHierarchyCard` 컴포넌트 생성

- [ ] 주제글/일반글 필터링 UI

- [ ] 해시태그별 그룹화 UI

- [ ] 펼치기/접기 기능

- [ ] API 연동 (contentService)

  

---

  

## 📝 변경 이력

  

| 날짜 | 변경 내용 | 작성자 |

|------|----------|--------|

| 2026-01-23 | Backend 구현 완료 | AI Assistant |

| 2026-01-23 | E2E 테스트 완료 | AI Assistant |

  

---

  

## 🔗 관련 문서

  

- [PRD - Feature 3](./PRODUCT_REQUIREMENTS_DOCUMENT.md#feature-3-콘텐츠-계층-구조)

- [Feature 3 구현 계획](./FEATURE3_IMPLEMENTATION_PLAN.md)

- [콘텐츠 계층 구조 명세서](./CONTENT_HIERARCHY_SPECIFICATION.md)