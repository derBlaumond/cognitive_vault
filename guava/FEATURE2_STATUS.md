# Feature 2: AI 콘텐츠 생성 - 구현 상태 문서

**작성일**: 2026-01-23  
**Feature 번호**: Feature 2  
**Feature 이름**: AI 콘텐츠 생성 (AI Content Generation)

---

## 📋 개요

### Feature 설명
Few-Shot Learning을 활용하여 병원 관리자의 글쓰기 스타일을 학습하고, 월간 설문 응답을 기반으로 맞춤형 콘텐츠 제목과 본문을 생성하는 기능입니다.

### 목적
- 병원별 맞춤 콘텐츠 자동 생성
- 관리자 글쓰기 스타일 학습 및 반영
- 콘텐츠 생성 효율성 향상

### 우선순위
- 🟢 **P0 (Critical)**

---

## ✅ 구현 상태

### 전체 진행률
- **Backend**: ✅ 100% 완료
- **Frontend**: ⚠️ 부분 완료 (Mock 데이터 사용 중)
- **테스트**: ✅ 100% 완료 (Unit + E2E)
- **문서화**: ✅ 100% 완료

### 완료된 작업
- [x] POST /api/ai/generate-titles API
- [x] POST /api/ai/generate-from-title API
- [x] 재생성 API 구현 (제목/본문)
- [x] Few-Shot Learning 통합
- [x] OpenAI API 연동
- [x] Backend API 테스트 (Unit + E2E)
- [x] OpenAI API Mock Provider 구현

### 진행 중인 작업
- [ ] AI Config 분리 (프롬프트 템플릿 외부화)

### 남은 작업
- [ ] Frontend Mock 데이터 제거
- [ ] API 연동 (generateTitles, generateFromTitle)
- [ ] 에러 핸들링 강화 (Loading, Error State)

---

## 🏗️ 아키텍처

### Backend 구조
```
apps/backend/src/
├── ai/
│   ├── ai.controller.ts
│   ├── ai.service.ts
│   ├── ai.module.ts
│   ├── providers/
│   │   ├── openai.provider.ts
│   │   └── ai-provider.interface.ts
│   ├── agents/
│   │   ├── base.agent.ts
│   │   ├── few-shot.agent.ts
│   │   └── rag.agent.ts (Phase 2)
│   └── services/
│       ├── prompt.service.ts
│       └── quality-tracking.service.ts
```

### AI 워크플로우
```
1. 제목 생성 (generateTitles)
   ├─ 월간 설문 응답 분석
   ├─ TopicTemplate 조회
   ├─ Few-Shot 샘플 선택 (Jaccard Similarity)
   └─ OpenAI API 호출 (GPT-4o-mini)

2. 본문 생성 (generateFromTitle)
   ├─ 제목 기반 프롬프트 생성
   ├─ Few-Shot 샘플 선택
   ├─ Writing Style 분석 반영
   └─ OpenAI API 호출 (GPT-4)

3. 재생성 (regenerateTitles, regenerateContent)
   ├─ 기존 콘텐츠 분석
   ├─ 추가 지시사항 반영
   └─ OpenAI API 호출
```

---

## 🔌 API 엔드포인트

### 1. 제목 생성
```
POST /api/ai/generate-titles
```

**Request**:
```typescript
{
  hospitalId: "uuid",
  surveyId: "uuid",
  themeCount: 2,
  selectedTopics: ["topic-1", "topic-2"],
  generalsPerTheme: 5
}
```

**Response**:
```typescript
{
  themeTitle: {
    id: "uuid",
    title: "요요 없는 건강한 다이어트...",
    contentType: "THEME",
    hashtag: "#다이어트"
  },
  generalTitles: [
    {
      id: "uuid",
      title: "체질별 맞춤 다이어트 식단...",
      contentType: "GENERAL"
    }
  ]
}
```

### 2. 제목 기반 본문 생성
```
POST /api/ai/generate-from-title
```

**Request**:
```typescript
{
  hospitalId: "uuid",
  surveyId: "uuid",
  title: "다이어트 성공의 비결",
  contentType: "THEME",
  hashtag: "#다이어트"
}
```

**Response**:
```typescript
{
  id: "uuid",
  title: "다이어트 성공의 비결",
  body: "# 다이어트 성공의 비결\n\n## 도입부\n...",
  contentType: "THEME",
  hashtag: "#다이어트",
  aiGenerated: true,
  aiModel: "gpt-4",
  aiStyleConfidence: 0.75
}
```

### 3. 제목 재생성
```
POST /api/ai/regenerate-titles
```

**Request**:
```typescript
{
  hospitalId: "uuid",
  surveyId: "uuid",
  hashtag: "#다이어트",
  count: 6
}
```

### 4. 본문 재생성
```
POST /api/ai/regenerate-content/:id
```

**Request**:
```typescript
{
  additionalInstructions: "더 전문적으로 작성해주세요"
}
```

---

## 🧪 테스트

### Unit Tests
- **파일**: `ai.service.spec.ts`
- **커버리지**: ✅ 100% (33/33 통과)
- **테스트 케이스**:
  - [x] 제목 생성 (정상 케이스)
  - [x] 제목 생성 (AI 응답 형식 변환)
  - [x] 제목 재생성
  - [x] 본문 생성
  - [x] 본문 재생성
  - [x] UUID validation
  - [x] 에러 핸들링

### E2E Tests
- **파일**: `test/ai-content-generation.e2e-spec.ts`
- **테스트 시나리오**:
  - [x] 전체 플로우 테스트 (제목 생성 → 본문 생성)
  - [x] Integration 테스트
  - [x] 엣지 케이스 테스트

### 엣지 케이스
- [x] 빈 주제 리스트
- [x] 제목 생성 실패 (OpenAI API 오류)
- [x] 본문 생성 중 토큰 초과
- [x] Few-Shot 샘플 없음
- [x] 동시성 요청 (Rate Limit)
- [x] 마크다운 코드 블록 제거
- [x] AI 응답 형식 변환 ({ titles: [...] } vs { theme: "...", generals: [...] })

---

## 🐛 알려진 이슈

### 해결된 이슈
1. **Markdown Code Block**: JSON 파싱 전 마크다운 코드 블록 제거 - 해결일: 2026-01-23
2. **AI Response Format**: 두 가지 응답 형식 처리 ({ titles: [...] }, { theme: "...", generals: [...] }) - 해결일: 2026-01-23
3. **Foreign Key Constraint**: `createdBy` 필드에 실제 사용자 ID 전달 - 해결일: 2026-01-23
4. **UUID Validation**: 잘못된 UUID 형식에 대해 400 반환 - 해결일: 2026-01-23
5. **Integration Timeout**: OpenAI API Mock Provider 구현 - 해결일: 2026-01-23

### 미해결 이슈
없음

---

## 📊 성능 지표

### API 응답 시간
- 제목 생성: 평균 2-3초 (Mock 사용 시 < 100ms)
- 본문 생성: 평균 5-8초 (Mock 사용 시 < 200ms)
- 재생성: 평균 3-5초 (Mock 사용 시 < 150ms)

### OpenAI API 사용량
- 제목 생성: GPT-4o-mini (200-300 tokens)
- 본문 생성: GPT-4 (800-1200 tokens)
- Mock 사용 시: 실제 API 호출 없음

---

## 🔄 PRD 매핑

### PRD 요구사항
- [x] 제목 생성 API
- [x] 본문 생성 API
- [x] 재생성 API (제목/본문)
- [x] Few-Shot Learning 통합
- [x] OpenAI API 연동

### Acceptance Criteria
- [x] POST /api/ai/generate-titles API
- [x] POST /api/ai/generate-from-title API
- [x] POST /api/ai/regenerate-titles API
- [x] POST /api/ai/regenerate-content/:id API
- [x] Backend API 테스트 완료

---

## 🚀 향후 개선 사항

### Phase 1 품질 개선 (1-2주)
- [ ] 프롬프트 튜닝: System Prompt 최적화
- [ ] Few-Shot 샘플 선택 알고리즘 개선 (Jaccard → TF-IDF)
- [ ] writingStyle 필드 활용 강화 (금지 표현, 자주 쓰는 표현)
- [ ] 온도(temperature) 파라미터 조정 (0.7 → 0.65)
- [ ] 품질 평가 메트릭 추가

### Phase 2 RAG (2-3주)
- [ ] Vector DB 선택 및 설정 (Pinecone or Qdrant)
- [ ] Embedding 서비스 구현
- [ ] RAG Agent 생성
- [ ] Hybrid Search (Few-Shot + RAG)

---

## 📝 변경 이력

| 날짜 | 변경 내용 | 작성자 |
|------|----------|--------|
| 2026-01-23 | 초기 작성 | AI Assistant |
| 2026-01-23 | E2E 테스트 완료 | AI Assistant |
| 2026-01-23 | OpenAI API Mock 추가 | AI Assistant |

---

## 🔗 관련 문서

- [PRD - Feature 2](./PRODUCT_REQUIREMENTS_DOCUMENT.md#feature-2-ai-콘텐츠-생성)
- [AI 에이전트 마스터 플랜](./AI_AGENT_MASTER_PLAN.md)
- [콘텐츠 생성 워크플로우](./CONTENT_GENERATION_WORKFLOW.md)
