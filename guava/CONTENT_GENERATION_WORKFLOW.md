# 콘텐츠 생성 워크플로우 명세서

**작성일**: 2026-01-23  
**목적**: 제목 생성 → 수정 → 본문 생성 2단계 워크플로우 정의

---

## 🎯 핵심 컨셉

**문제**: 현재는 제목 + 본문을 한 번에 생성 → 제목 수정 불가  
**해결**: 제목 먼저 생성 → 관리자 수정 → 본문 생성 (2단계 프로세스)

---

## 📊 전체 워크플로우

```
[1단계] 주제 선택 (월간 설문 q1-q2)
  ↓
[2단계] 제목 리스트 생성 (OpenAI API)
  - 주제글 N개
  - 일반글 M개 (주제글당 5개)
  ↓
[3단계] 제목 수정 (관리자)
  - 다시 생성 (전체 재생성)
  - 직접 수정 (개별 수정)
  ↓
[4단계] 본문 생성 (Personalized OpenAI API)
  - 각 제목별 본문 생성
  - Few-Shot Learning 적용
  ↓
[5단계] 본문 검토 및 수정
  - 재생성 (개별 본문 재생성)
  - 직접 수정 (텍스트 편집)
  ↓
[6단계] 생성 완료 → 유저 전송
```

---

## 🔌 API 설계

### 1. 제목 리스트 생성

```typescript
POST /api/ai/generate-titles

Request:
{
  hospitalId: "uuid",
  surveyId: "uuid",
  topics: [
    { id: "uuid", hashtag: "#다이어트", title: "다이어트" },
    { id: "uuid", hashtag: "#교통사고", title: "교통사고" }
  ],
  themeCount: 2,  // 주제글 2개
  generalCountPerTheme: 5  // 주제글당 일반글 5개
}

Response:
{
  message: "제목 생성 완료",
  data: {
    hashtags: ["#다이어트", "#교통사고"],
    titles: [
      {
        hashtag: "#다이어트",
        theme: {
          id: "gen-uuid-1",
          title: "요요 없는 건강한 다이어트, 어떻게 시작할까요?",
          type: "THEME"
        },
        generals: [
          { id: "gen-uuid-2", title: "체질별 맞춤 다이어트 식단 가이드", type: "GENERAL" },
          { id: "gen-uuid-3", title: "한방 다이어트로 건강하게 체중 감량하기", type: "GENERAL" },
          ...
        ]
      },
      {
        hashtag: "#교통사고",
        theme: { ... },
        generals: [ ... ]
      }
    ],
    metadata: {
      model: "gpt-4o",
      tokensUsed: 1500,
      timestamp: "2026-01-23T10:00:00.000Z"
    }
  }
}
```

---

### 2. 제목 재생성 (전체 or 부분)

```typescript
POST /api/ai/regenerate-titles

Request:
{
  hospitalId: "uuid",
  surveyId: "uuid",
  hashtag: "#다이어트",  // 특정 해시태그만 재생성 (선택)
  type: "all" | "theme" | "general",
  count: 5  // 재생성할 갯수
}

Response:
{
  message: "제목 재생성 완료",
  data: {
    hashtag: "#다이어트",
    newTitles: [ ... ]
  }
}
```

---

### 3. 본문 생성 (제목 → 본문)

```typescript
POST /api/ai/generate-from-title

Request:
{
  hospitalId: "uuid",
  surveyId: "uuid",
  titles: [
    { id: "gen-uuid-1", title: "요요 없는 건강한 다이어트...", hashtag: "#다이어트", type: "THEME" },
    { id: "gen-uuid-2", title: "체질별 맞춤 다이어트...", hashtag: "#다이어트", type: "GENERAL" },
    ...
  ]
}

Response:
{
  message: "본문 생성 완료",
  data: {
    contents: [
      {
        id: "gen-uuid-1",
        title: "요요 없는 건강한 다이어트...",
        body: "다이어트는 단순히 체중을 줄이는 것이 아니라...",
        type: "THEME",
        hashtag: "#다이어트",
        category: "건강",
        metadata: {
          wordCount: 1500,
          tokensUsed: 2000,
          styleConfidence: 0.85
        }
      },
      ...
    ]
  }
}
```

---

### 4. 개별 본문 재생성

```typescript
POST /api/ai/regenerate-content/:contentId

Request:
{
  hospitalId: "uuid",
  contentId: "gen-uuid-1",
  title: "요요 없는 건강한 다이어트...",
  feedback: "더 전문적인 톤으로 작성해주세요"  // 선택
}

Response:
{
  message: "본문 재생성 완료",
  data: {
    id: "gen-uuid-1-v2",
    title: "요요 없는 건강한 다이어트...",
    body: "...",
    version: 2
  }
}
```

---

## 🧠 AI 프롬프트 구성

### 제목 생성 프롬프트

```typescript
// apps/backend/src/ai/services/prompt.service.ts

buildTitleGenerationPrompt(options: {
  hashtag: string;
  category: string;
  themeCount: number;
  generalCount: number;
  targetAudience: string[];
  goals: string[];
  writingStyle: WritingStyleProfile;
}) {
  return `
# 역할
당신은 한의원 블로그 콘텐츠 제목 전문가입니다.

# 주제
해시태그: ${options.hashtag}
카테고리: ${options.category}

# 요구사항
1. 주제글 ${options.themeCount}개 생성
   - 검색 최적화된 제목 (SEO)
   - 타겟 독자 관심 유발
   - 30-50자 길이
   
2. 일반글 ${options.generalCount}개 생성
   - 주제글과 연관된 하위 주제
   - 구체적이고 실용적인 제목
   - 20-40자 길이

# 타겟 독자
${options.targetAudience.join(', ')}

# 목표
${options.goals.join(', ')}

# 톤앤매너
${options.writingStyle.tone}

# 금지 표현
${options.writingStyle.forbiddenExpressions.join(', ')}

# 출력 형식
JSON 배열:
[
  { type: "THEME", title: "..." },
  { type: "GENERAL", title: "..." },
  ...
]
`;
}
```

---

### 본문 생성 프롬프트 (Few-Shot)

```typescript
buildContentFromTitlePrompt(options: {
  title: string;
  hashtag: string;
  type: 'THEME' | 'GENERAL';
  hospital: Hospital;
  surveyData: MonthlySurveyResponse;
  fewShotSamples: WritingSample[];
}) {
  return `
# 역할
당신은 ${options.hospital.name}의 블로그 작성자입니다.

# 작성할 글
제목: ${options.title}
유형: ${options.type === 'THEME' ? '주제글 (메인 콘텐츠)' : '일반글 (보조 콘텐츠)'}
해시태그: ${options.hashtag}

# 원장 정보
${JSON.stringify(options.hospital.director)}

# 병원 철학
${JSON.stringify(options.hospital.philosophy)}

# 글쓰기 스타일 (Few-Shot Learning)
다음은 원장님의 과거 글 샘플입니다:

${options.fewShotSamples.map((sample, i) => `
## 샘플 ${i + 1}: ${sample.title}
${sample.content}
`).join('\n---\n')}

# 글쓰기 특징
- 평균 문장 길이: ${options.hospital.writingStyle.avgSentenceLength}자
- 평균 단락 길이: ${options.hospital.writingStyle.avgParagraphLength}자
- 자주 쓰는 표현: ${options.hospital.writingStyle.frequentPhrases.join(', ')}
- 톤앤매너: ${options.hospital.writingStyle.tone}

# 금지 표현
${options.surveyData.q5.forbidden.join(', ')}

# 강조 표현
${options.surveyData.q5.emphasis.join(', ')}

# 요구사항
1. ${options.type === 'THEME' ? '1200-1500자' : '800-1000자'}
2. 위 샘플과 동일한 문체 사용
3. 금지 표현 절대 사용 금지
4. 강조 표현 자연스럽게 포함
5. 검색 최적화 (SEO)
6. 전문성 + 신뢰감 + 친근함 균형

# 출력 형식
마크다운 형식으로 작성
`;
}
```

---

## 🎨 Frontend 구현 (이미 완성)

### AdminContentCreatePage.tsx (현재 상태)

**이미 구현된 기능**:
- ✅ 제목 생성 UI (Mock 데이터)
- ✅ 해시태그 탭 (주제별 분리)
- ✅ 주제글/일반글 구분
- ✅ 다시 생성 버튼
- ✅ 직접 수정 버튼 (Input 필드)
- ✅ 생성 완료 버튼

**필요한 변경**:
```typescript
// Mock 데이터 → 실제 API 호출
const generateContents = async (hashtagCount: number) => {
  // Before (Mock)
  await new Promise(resolve => setTimeout(resolve, 2000));
  setHashtags(['#다이어트', '#교통사고']);
  
  // After (실제 API)
  const response = await aiService.generateTitles({
    hospitalId,
    surveyId,
    topics: selectedTopics,
    themeCount: hashtagCount,
    generalCountPerTheme: 5
  });
  setHashtags(response.data.hashtags);
  setTopicContents(response.data.titles.map(t => t.theme));
  setGeneralContents(response.data.titles.flatMap(t => t.generals));
};
```

---

## 🔄 상태 관리

### Content 상태 추가

기존 `ContentStatus`에 생성 단계 추가:

```prisma
enum ContentStatus {
  draft              // 생성전 (제목 미생성)
  title_generated    // 제목 생성됨 (본문 미생성)
  generating         // 본문 생성 중
  generated          // 본문 생성됨 (= approval_requested)
  approval_requested // 승인 요청
  revision_requested // 수정 요청
  revising           // 수정 중
  revision_completed // 수정 완료
  published          // 게시 완료
}
```

---

## 📈 품질 개선 전략

### 제목 품질 평가
```typescript
// apps/backend/src/ai/services/title-quality.service.ts

evaluateTitleQuality(title: string, options: {
  minLength: number;
  maxLength: number;
  keywords: string[];
  forbiddenWords: string[];
}) {
  let score = 100;
  
  // 길이 체크
  if (title.length < options.minLength || title.length > options.maxLength) {
    score -= 20;
  }
  
  // 키워드 포함 여부
  const keywordMatches = options.keywords.filter(kw => title.includes(kw)).length;
  score += keywordMatches * 5;
  
  // 금지 표현 체크
  const forbiddenMatches = options.forbiddenWords.filter(fw => title.includes(fw)).length;
  score -= forbiddenMatches * 30;
  
  return Math.max(0, Math.min(100, score));
}
```

---

## ✅ 구현 체크리스트

### Backend
- [ ] POST /api/ai/generate-titles API
- [ ] POST /api/ai/regenerate-titles API
- [ ] POST /api/ai/generate-from-title API
- [ ] POST /api/ai/regenerate-content/:id API
- [ ] buildTitleGenerationPrompt() 서비스
- [ ] buildContentFromTitlePrompt() 서비스
- [ ] Title Quality 평가 로직

### Frontend
- [ ] Mock 데이터 → 실제 API 연동
- [ ] 로딩 상태 관리
- [ ] 에러 핸들링
- [ ] 제목 재생성 버튼 추가 (해시태그별)

### 테스트
- [ ] API 테스트 (Postman)
- [ ] E2E 테스트 (제목 생성 → 수정 → 본문 생성)

---

**예상 공수**: 3-4일

**관련 문서**:
- [PM 워크플로우 구현 계획](./PM_WORKFLOW_IMPLEMENTATION_PLAN.md) - Task 2 상세 구현
- [AI 코드베이스 분석](./AI_CODEBASE_ANALYSIS.md) - 현재 AI 서비스 구조
