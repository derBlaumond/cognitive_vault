# 콘텐츠 계층 구조 명세서

**작성일**: 2026-01-23  
**목적**: 주제글 vs 일반글 계층 구조 정의 및 관계 설정

---

## 🎯 핵심 컨셉

**문제**: 현재는 `category: String`만 있어서 주제글과 일반글 구분 불가  
**해결**: `type` Enum + `parentId` 관계로 계층 구조 명확화

---

## 📊 계층 구조

```
주제글 1개 선택 시:
├─ 주제글 #다이어트 (parentId: null)
│  ├─ 일반글 1: 체질별 맞춤 다이어트 식단 (parentId: 주제글 ID)
│  ├─ 일반글 2: 한방 다이어트로 체중 감량 (parentId: 주제글 ID)
│  ├─ 일반글 3: 다이어트 중 폭식 충동 대처 (parentId: 주제글 ID)
│  ├─ 일반글 4: 운동 없이 살 빠지는 생활습관 (parentId: 주제글 ID)
│  └─ 일반글 5: 다이어트 정체기 극복 방법 (parentId: 주제글 ID)

주제글 2개 선택 시:
├─ 주제글 #다이어트 (parentId: null)
│  ├─ 일반글 1-5 (parentId: 주제글 #다이어트 ID)
│
└─ 주제글 #교통사고 (parentId: null)
   ├─ 일반글 1: 교통사고 후 목 디스크 예방 (parentId: 주제글 #교통사고 ID)
   ├─ 일반글 2: 교통사고 치료, 한의원 이유 (parentId: 주제글 #교통사고 ID)
   ├─ 일반글 3: 사고 후 두통 관리법 (parentId: 주제글 #교통사고 ID)
   ├─ 일반글 4: 교통사고 보험 청구 (parentId: 주제글 #교통사고 ID)
   └─ 일반글 5: 한방 추나 치료 (parentId: 주제글 #교통사고 ID)
```

---

## 🗂️ 데이터베이스 설계

### Schema 변경

```prisma
// apps/backend/prisma/schema.prisma

enum ContentType {
  THEME    // 주제글 (월간 메인 콘텐츠)
  GENERAL  // 일반글 (주제글 하위 콘텐츠)
  
  @@map("content_type")
}

model Content {
  id              String        @id @default(uuid())
  hospitalId      String        @map("hospital_id")
  surveyId        String?       @map("survey_id")
  
  // [신규] 콘텐츠 타입 및 계층 구조
  type            ContentType   @default(GENERAL)  // 주제글 or 일반글
  parentId        String?       @map("parent_id")  // 주제글 ID (일반글인 경우)
  hashtag         String?       // "#다이어트", "#교통사고"
  
  title           String
  body            String        @db.Text
  category        String        // "건강", "치료" (기존 유지)
  status          ContentStatus
  feedbackRequest String?       @map("feedback_request") @db.Text
  createdBy       String        @map("created_by")
  
  // AI 생성 메타데이터
  aiGenerated       Boolean @default(false) @map("ai_generated")
  aiModel           String? @map("ai_model")
  aiPrompt          String? @map("ai_prompt") @db.Text
  aiStyleConfidence Float?  @map("ai_style_confidence")
  
  // SEO 메타데이터
  seoKeywords    String[] @default([]) @map("seo_keywords")
  seoTitle       String?  @map("seo_title")
  seoDescription String?  @map("seo_description") @db.Text
  
  // Relations
  hospital         Hospital  @relation(fields: [hospitalId], references: [id])
  survey           Survey?   @relation(fields: [surveyId], references: [id])
  creator          User      @relation("ContentCreator", fields: [createdBy], references: [id])
  approvalWorkflow ContentApprovalWorkflow[]
  
  // [신규] 계층 관계
  parent           Content?  @relation("ContentHierarchy", fields: [parentId], references: [id])
  relatedPosts     Content[] @relation("ContentHierarchy")
  
  createdAt DateTime @default(now()) @map("created_at")
  updatedAt DateTime @updatedAt @map("updated_at")
  
  @@index([hospitalId, status])
  @@index([type, parentId])  // [신규] 계층 쿼리 최적화
  @@index([hashtag])         // [신규] 해시태그 필터링
  @@index([status])
  @@index([createdAt])
  @@index([aiGenerated])
  @@map("contents")
}
```

---

### Migration 스크립트

```bash
# 1. Migration 생성
npx prisma migrate dev --name add_content_hierarchy

# 2. 기존 데이터 마이그레이션 (선택)
# apps/backend/prisma/migrations/[timestamp]_add_content_hierarchy/migration.sql

-- ContentType Enum 생성
CREATE TYPE "content_type" AS ENUM ('THEME', 'GENERAL');

-- Content 테이블에 컬럼 추가
ALTER TABLE "contents" ADD COLUMN "type" "content_type" NOT NULL DEFAULT 'GENERAL';
ALTER TABLE "contents" ADD COLUMN "parent_id" TEXT;
ALTER TABLE "contents" ADD COLUMN "hashtag" TEXT;

-- 인덱스 생성
CREATE INDEX "contents_type_parent_id_idx" ON "contents"("type", "parent_id");
CREATE INDEX "contents_hashtag_idx" ON "contents"("hashtag");

-- Foreign Key 설정
ALTER TABLE "contents" ADD CONSTRAINT "contents_parent_id_fkey" 
  FOREIGN KEY ("parent_id") REFERENCES "contents"("id") ON DELETE SET NULL ON UPDATE CASCADE;
```

---

## 🔌 API 설계

### 1. 주제글 + 일반글 일괄 생성

```typescript
POST /api/contents/bulk-create

Request:
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
      parentId: null,  // 주제글 ID는 생성 후 자동 설정
      title: "체질별 맞춤 다이어트 식단...",
      body: "...",
      category: "건강"
    },
    ...
  ]
}

Response:
{
  message: "콘텐츠 일괄 생성 완료",
  data: {
    themeContents: [
      { id: "uuid-theme-1", title: "...", type: "THEME", relatedCount: 5 }
    ],
    generalContents: [
      { id: "uuid-gen-1", title: "...", type: "GENERAL", parentId: "uuid-theme-1" },
      ...
    ]
  }
}
```

---

### 2. 주제글별 일반글 조회

```typescript
GET /api/contents/theme/:themeId/generals

Response:
{
  theme: {
    id: "uuid-theme-1",
    title: "요요 없는 건강한 다이어트...",
    hashtag: "#다이어트",
    type: "THEME"
  },
  generals: [
    { id: "uuid-gen-1", title: "체질별 맞춤 다이어트 식단...", type: "GENERAL" },
    { id: "uuid-gen-2", title: "한방 다이어트로 체중 감량...", type: "GENERAL" },
    ...
  ]
}
```

---

### 3. 해시태그별 콘텐츠 조회

```typescript
GET /api/contents/by-hashtag/:hashtag?hospitalId=uuid

Response:
{
  hashtag: "#다이어트",
  theme: { id: "...", title: "...", type: "THEME" },
  generals: [
    { id: "...", title: "...", type: "GENERAL", parentId: "..." },
    ...
  ],
  totalCount: 6
}
```

---

### 4. 콘텐츠 목록 조회 (계층 구조 포함)

```typescript
GET /api/contents?hospitalId=uuid&includeHierarchy=true

Response:
{
  contents: [
    {
      id: "uuid-theme-1",
      type: "THEME",
      title: "요요 없는 건강한 다이어트...",
      hashtag: "#다이어트",
      relatedPosts: [
        { id: "uuid-gen-1", title: "체질별 맞춤 다이어트...", type: "GENERAL" },
        ...
      ]
    },
    ...
  ]
}
```

---

## 🎨 Frontend UI 스펙

### 콘텐츠 목록 (계층 보기)

```
[콘텐츠 관리]

필터: [전체] [주제글만] [일반글만]
해시태그: [#다이어트] [#교통사고] [#갱년기]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📌 주제글 | #다이어트
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[썸네일] 요요 없는 건강한 다이어트, 어떻게 시작할까요?
         25.01.23 | 주제글 | 생성됨 | [수정] [삭제]

  ├─ 일반글 1: 체질별 맞춤 다이어트 식단 가이드
  │  25.01.23 | 일반글 | 생성됨 | [수정] [삭제]
  │
  ├─ 일반글 2: 한방 다이어트로 건강하게 체중 감량하기
  │  25.01.23 | 일반글 | 생성됨 | [수정] [삭제]
  │
  └─ 일반글 3-5 (접힌 상태)
     [펼치기 ▼]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📌 주제글 | #교통사고
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[썸네일] 교통사고 후유증, 제때 치료해야 하는 이유
         25.01.23 | 주제글 | 생성됨 | [수정] [삭제]

  ├─ 일반글 1-5
     [펼치기 ▼]
```

---

### AdminContentCreatePage (계층 보기)

이미 구현되어 있음:
- ✅ "월간 주제글" 섹션
- ✅ "월간 일반글" 섹션
- ✅ 해시태그 탭으로 주제글별 분리

---

## 🔍 쿼리 최적화

### 주제글 + 일반글 한 번에 조회

```typescript
// apps/backend/src/contents/contents.service.ts

async findAllWithHierarchy(hospitalId: string) {
  const themes = await this.prisma.content.findMany({
    where: {
      hospitalId,
      type: 'THEME',
    },
    include: {
      relatedPosts: {
        where: { type: 'GENERAL' },
        orderBy: { createdAt: 'asc' },
      },
    },
    orderBy: { createdAt: 'desc' },
  });
  
  return themes.map(theme => ({
    theme: {
      id: theme.id,
      title: theme.title,
      hashtag: theme.hashtag,
      type: theme.type,
      status: theme.status,
    },
    generals: theme.relatedPosts.map(post => ({
      id: post.id,
      title: post.title,
      parentId: post.parentId,
      type: post.type,
      status: post.status,
    })),
  }));
}
```

---

## 📊 데이터 검증 규칙

### Backend Validation

```typescript
// apps/backend/src/contents/dto/create-content.dto.ts

export class CreateContentDto {
  @IsEnum(ContentType)
  type: ContentType;
  
  @IsOptional()
  @IsUUID()
  @ValidateIf(o => o.type === 'GENERAL')
  @IsNotEmpty({ message: '일반글은 parentId 필수' })
  parentId?: string;
  
  @IsOptional()
  @IsString()
  @ValidateIf(o => o.type === 'THEME')
  @IsNotEmpty({ message: '주제글은 hashtag 필수' })
  hashtag?: string;
  
  // ... 기존 필드
}
```

### 제약 조건

1. **주제글 (THEME)**:
   - `parentId`: null (필수)
   - `hashtag`: 필수 (예: "#다이어트")
   - `category`: 필수

2. **일반글 (GENERAL)**:
   - `parentId`: 주제글 ID (필수)
   - `hashtag`: 부모 주제글과 동일 (자동 설정)
   - `category`: 부모 주제글과 동일 (자동 설정)

---

## ✅ 구현 체크리스트

### Backend
- [ ] Migration: ContentType Enum 추가
- [ ] Migration: type, parentId, hashtag 컬럼 추가
- [ ] Migration: 인덱스 추가
- [ ] DTO: CreateContentDto 검증 로직
- [ ] Service: findAllWithHierarchy() 쿼리
- [ ] Service: bulkCreate() 일괄 생성
- [ ] API: GET /api/contents/theme/:id/generals
- [ ] API: GET /api/contents/by-hashtag/:hashtag
- [ ] API: POST /api/contents/bulk-create

### Frontend
- [ ] ContentHierarchyCard 컴포넌트 (트리 구조 UI)
- [ ] 주제글/일반글 필터링
- [ ] 해시태그별 그룹화
- [ ] 펼치기/접기 기능

### 테스트
- [ ] Migration 테스트 (기존 데이터 보존)
- [ ] API 테스트 (계층 쿼리)
- [ ] E2E 테스트 (주제글 생성 → 일반글 자동 연결)

---

**예상 공수**: 2일

**관련 문서**:
- [PM 워크플로우 구현 계획](./PM_WORKFLOW_IMPLEMENTATION_PLAN.md) - Task 3 상세 구현
- [콘텐츠 생성 워크플로우](./CONTENT_GENERATION_WORKFLOW.md) - 제목 → 본문 생성
