# 🤖 AI 코드베이스 종합 분석 리포트

생성일: 2026-01-15
분석 대상: `/apps/backend/`, `/apps/frontend/`

---

## 📋 목차

1. [코드베이스 구조 개요](#1-코드베이스-구조-개요)
2. [OpenAI API 사용 현황](#2-openai-api-사용-현황)
3. [Langchain 사용 여부](#3-langchain-사용-여부)
4. [프롬프트 관리 시스템](#4-프롬프트-관리-시스템)
5. [AI 아키텍처 설계](#5-ai-아키텍처-설계)
6. [주요 AI 기능 분석](#6-주요-ai-기능-분석)
7. [비용 및 성능 최적화](#7-비용-및-성능-최적화)
8. [개선 권장사항](#8-개선-권장사항)

---

## 1. 코드베이스 구조 개요

### 1.1 백엔드 구조 (`/apps/backend/src/`)

```
apps/backend/src/
├── ai/                          # AI 모듈 (핵심)
│   ├── agents/                  # Agent 패턴
│   │   ├── base/                # BaseAgent 추상 클래스
│   │   │   └── base.agent.ts
│   │   └── content-generation/  # 콘텐츠 생성 Agents
│   │       ├── few-shot.agent.ts   # Phase 1: Few-Shot Learning
│   │       └── rag.agent.ts        # Phase 2: RAG (준비 중)
│   ├── providers/               # AI Provider 인터페이스
│   │   ├── ai-provider.interface.ts
│   │   └── openai.provider.ts   # ⭐ OpenAI API 클라이언트
│   ├── services/                # AI 관련 서비스
│   │   ├── prompt.service.ts    # ⭐ 프롬프트 중앙 관리
│   │   ├── quality-tracking.service.ts
│   │   └── embedding.service.ts  # Phase 2 준비
│   ├── ai.config.ts             # ⭐ AI 설정 중앙 관리
│   ├── ai.module.ts
│   ├── ai.service.ts
│   └── ai.controller.ts
├── onboarding/                  # 온보딩 (AI 주요 사용처)
│   ├── onboarding.service.ts    # ⭐ 7-8개 OpenAI 호출
│   └── onboarding.controller.ts
├── common/
│   └── helpers/
│       └── json.helper.ts       # ⭐ AI 응답 파싱 유틸
└── ...
```

**핵심 파일**:
- `ai/providers/openai.provider.ts`: OpenAI API 직접 호출 (227줄)
- `ai/services/prompt.service.ts`: 모든 프롬프트 관리 (470줄)
- `ai/ai.config.ts`: AI 설정 (온도, 토큰, 모델 등) (217줄)
- `onboarding/onboarding.service.ts`: 온보딩 로직 + AI 호출 (2,415줄)
- `ai/agents/content-generation/few-shot.agent.ts`: Few-Shot Agent (193줄)

### 1.2 프론트엔드 구조 (`/apps/frontend/src/`)

```
apps/frontend/src/
├── services/
│   ├── aiService.ts            # AI API 호출 (50줄)
│   └── onboardingService.ts    # 온보딩 API 호출 (195줄)
├── pages/
│   └── Onboarding/
│       ├── Step1Page.tsx
│       ├── Step2Page.tsx
│       ├── Step3Page.tsx
│       └── Step4Page.tsx       # AI 생성 UI
└── components/
    ├── AIGenerationProgress.tsx
    ├── LearningStageIndicator.tsx
    └── EditEncouragementBanner.tsx
```

**특징**:
- 프론트엔드는 **백엔드 API만 호출**
- **OpenAI API 직접 호출 없음** (보안상 올바른 설계)

---

## 2. OpenAI API 사용 현황

### 2.1 OpenAI Provider (`openai.provider.ts`)

**핵심 기능**:
```typescript
@Injectable()
export class OpenAIProvider implements AIProvider {
  private readonly logger = new Logger(OpenAIProvider.name);
  readonly name = 'OpenAI';
  private apiKey: string;
  private baseURL = 'https://api.openai.com/v1';
  
  // 재시도 설정
  private readonly MAX_RETRIES = 3;
  private readonly RETRY_DELAY = 1000;
  private readonly TIMEOUT = 60000;

  async generateContent(request: GenerateContentRequest): Promise<GenerateContentResponse> {
    // fetch()로 직접 호출 (Langchain 없음)
    const response = await fetch(`${this.baseURL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages,
        temperature: request.temperature ?? 0.7,
        max_tokens: request.maxTokens ?? 1000,
      }),
      signal: controller.signal,
    });
  }
}
```

**특징**:
1. ✅ **Native fetch() 사용** (Langchain 의존성 없음)
2. ✅ **Exponential Backoff 재시도** (Rate Limit 대응)
3. ✅ **Timeout 관리** (60초 기본, 120초 확장)
4. ✅ **Mock 모드** (API 키 없을 때)
5. ✅ **에러 분류** (429, 5xx, 4xx 별도 처리)
6. ✅ **로깅** (토큰 사용량, 응답 시간)

### 2.2 OpenAI API 호출 위치 (총 11곳)

#### **A. `FewShotAgent` (1곳)**
- **파일**: `ai/agents/content-generation/few-shot.agent.ts`
- **메서드**: `generate()`
- **목적**: Phase 1 Few-Shot Learning 기반 콘텐츠 생성
- **모델**: `gpt-4o`
- **프롬프트**: `PromptService.buildFewShotPrompt()` + System Prompt

```typescript
const response = await this.openai.generateContent({
  model: 'gpt-4o',
  systemPrompt,
  prompt: fewShotPrompt,
  temperature: 0.7,
  maxTokens: 2000,
});
```

#### **B. `OnboardingService` (10곳)**
| # | 메서드 | 목적 | 모델 | Temperature |
|---|--------|------|------|-------------|
| 1 | `generateComprehensiveAnalysisWithGPT()` | 온보딩 종합 분석 | 기본 | 0.7 |
| 2 | `generateKeywordsWithGPT()` | SEO 키워드 생성 | 기본 | 0.7 |
| 3 | `generateTopicsWithGPT()` | 콘텐츠 주제 생성 | 기본 | 0.8 |
| 4 | `analyzeWritingStyleWithGPT()` | ⭐ 글쓰기 스타일 분석 (Phase 1 핵심) | 기본 | 0.5 |
| 5 | `generateSimpleArticle()` | AI 도우미 샘플 생성 | 기본 | 0.7 |
| 6 | `generatePersonalizedArticleFromTemplate()` | ⭐ 템플릿 기반 생성 (Case B) | 기본 | 0.7 |
| 7 | `analyzeEditPatterns()` | 수정 패턴 분석 | 기본 | 0.3 |
| 8 | `generateArticleWithLearning()` | ⭐ Progressive Learning (Case B 2차, 3차) | 기본 | 0.7 |
| 9 | `identifyLearnedPatterns()` | 학습 패턴 추출 | 기본 | 0.3 |
| 10 | `generateAISampleWithExisting()` | ⭐ Few-Shot Learning (Case A) | `gpt-4o` | FewShotAgent 위임 |

**온보딩 흐름에서의 AI 호출**:
```
Step 2 → generateKeywordsWithGPT() (SEO 키워드)
      → generateTopicsWithGPT() (추천 주제 10개)
      
Step 3 → analyzeWritingStyleWithGPT() (⭐ 핵심: 스타일 분석)
      → generateAISampleWithExisting() (Case A: Few-Shot)
      
Step 4 → generatePersonalizedArticleFromTemplate() (Case B: 1차)
      → analyzeEditPatterns() (수정 패턴 학습)
      → generateArticleWithLearning() (Case B: 2차, 3차)
      
완료   → generateComprehensiveAnalysisWithGPT() (종합 리포트)
```

---

## 3. Langchain 사용 여부

### 결론: **Langchain 미사용** ❌

**검증 결과**:
```bash
grep -r "langchain|LangChain" apps/backend/src
# → No matches found
```

**package.json 확인**:
```json
{
  "dependencies": {
    // Langchain 관련 패키지 없음
    // OpenAI SDK도 없음 (fetch()로 직접 구현)
  }
}
```

**현재 접근 방식**:
- ✅ **Native Fetch API** 사용
- ✅ **직접 구현한 OpenAI Provider**
- ✅ **경량화, 의존성 최소화**

**장점**:
1. 패키지 크기 감소 (Langchain ~10MB)
2. 의존성 충돌 방지
3. 완전한 제어권 (타임아웃, 재시도, 로깅)
4. 디버깅 용이

**단점**:
1. Langchain의 고급 기능 미사용:
   - Memory (대화 컨텍스트 관리)
   - Chains (복잡한 워크플로우)
   - Vector Stores (RAG Phase 2에서 필요)
   - Agents (자율 에이전트)

**Phase 2 RAG 구현 시 고려사항**:
- Langchain 도입 vs. 직접 구현
- 권장: **Langchain 부분 도입** (Vector Store만)
  - `@langchain/community` (Pinecone, Weaviate 등)
  - 나머지는 현재 구조 유지

---

## 4. 프롬프트 관리 시스템

### 4.1 `PromptService` 아키텍처

**파일**: `ai/services/prompt.service.ts` (470줄)

**핵심 메서드**:
```typescript
@Injectable()
export class PromptService {
  // 1. System Prompts (AI 역할 정의)
  getSystemPrompt(params: {
    type: 'onboarding' | 'content-generation' | 'style-analysis' | 'topic-generation' | 'progressive-learning';
    context?: any;
  }): string;

  // 2. Few-Shot Prompts (⭐ Phase 1 핵심)
  buildFewShotPrompt(params: {
    samples: Array<{ topic: string; content: string }>;
    topic: string;
    targetLength?: number;
    additionalInstructions?: string;
    writingStyle?: {
      tone?: string;
      avgSentenceLength?: number;
      avgWordCount?: number;
      frequentPhrases?: string[];
      forbidden?: string[];
    };
  }): string;

  // 3. User Prompts
  buildContentGenerationPrompt(params: { ... }): string;
  buildProgressiveLearningPrompt(params: { ... }): string;
}
```

### 4.2 Few-Shot Prompt 구조 (⭐ 핵심)

**Phase 1 품질 개선 적용**:
```typescript
buildFewShotPrompt(params) {
  let prompt = `당신은 이 병원의 전문 의료 콘텐츠 작가입니다. 
아래 과거 글들을 **정확히** 분석하고 그 스타일을 **완벽히** 재현하세요.\n\n`;
  
  // ⭐ 1. 스타일 특징 명시적 강조
  if (writingStyle) {
    prompt += `## 📋 이 병원의 글쓰기 스타일 특징\n\n`;
    
    if (writingStyle.tone) {
      prompt += `**톤**: ${writingStyle.tone}\n`;
    }
    
    if (writingStyle.avgSentenceLength) {
      prompt += `**평균 문장 길이**: ${writingStyle.avgSentenceLength}자\n`;
      prompt += `→ 이 길이를 반드시 유지하세요. 너무 길거나 짧으면 안 됩니다.\n\n`;
    }
    
    // ⭐ 2. 자주 쓰는 표현 명시 (필수 사용)
    if (writingStyle.frequentPhrases && writingStyle.frequentPhrases.length > 0) {
      prompt += `**자주 사용하는 표현** (필수 사용):\n`;
      writingStyle.frequentPhrases.slice(0, 10).forEach((phrase, i) => {
        prompt += `${i + 1}. "${phrase}"\n`;
      });
      prompt += `→ 위 표현들을 글에서 최소 3-5회 이상 자연스럽게 사용하세요.\n\n`;
    }
    
    // ⭐ 3. 금지 표현 명확화
    if (writingStyle.forbidden && writingStyle.forbidden.length > 0) {
      prompt += `**❌ 절대 사용 금지 표현**:\n`;
      writingStyle.forbidden.forEach((phrase) => {
        prompt += `- "${phrase}"\n`;
      });
      prompt += `\n`;
    }
  }
  
  // ⭐ 4. Few-Shot 예시 추가
  prompt += `## 📚 과거 글 예시 (스타일 학습용)\n\n`;
  prompt += `다음 ${samples.length}개의 글을 꼼꼼히 읽고, 문장 구조, 표현 방식, 톤을 정확히 파악하세요:\n\n`;
  
  samples.forEach((sample, index) => {
    prompt += `### 예시 ${index + 1}\n`;
    prompt += `**주제**: ${sample.topic}\n\n`;
    prompt += `${sample.content}\n\n`;
    prompt += `---\n\n`;
  });
  
  // ⭐ 5. 필수 준수사항
  prompt += `**필수 준수사항**:\n`;
  prompt += `1. **스타일 일치**: 위 예시들의 문장 길이, 톤, 표현 방식을 **정확히** 모방하세요\n`;
  prompt += `2. **표현 재사용**: 예시에서 자주 사용된 표현을 **반드시** 활용하세요\n`;
  prompt += `3. **길이 엄수**: ${targetLength}자 (±100자 이내)\n`;
  prompt += `4. **구조 유지**: 예시와 동일한 문단 구조 사용\n`;
  prompt += `5. **톤 일관성**: 예시의 톤을 절대 벗어나지 마세요\n\n`;
  
  // ⭐ 6. 금지사항 (ChatGPT스러운 표현 차단)
  prompt += `**❌ 금지사항**:\n`;
  prompt += `- 예시에 없는 말투나 표현 사용\n`;
  prompt += `- ChatGPT스러운 뻔한 표현 ("여러분", "~해보세요", "~하시길 바랍니다" 등 - 예시에 없다면 금지)\n`;
  prompt += `- 지나치게 긴 문장 (예시보다 50% 이상 길면 안 됨)\n`;
  prompt += `- 과도한 전문 용어 (예시의 전문 용어 수준 유지)\n\n`;
  
  return prompt;
}
```

**효과**:
1. ✅ **명시적 스타일 지시** (avgSentenceLength, frequentPhrases)
2. ✅ **금지 표현 차단** (ChatGPT스러운 표현 방지)
3. ✅ **정량적 목표** (길이 ±100자)
4. ✅ **예시 강조** (3-5개 Few-Shot Samples)

### 4.3 System Prompt 예시

**Content Generation System Prompt**:
```typescript
private getContentGenerationSystemPrompt(context) {
  return `당신은 **${hospital}**의 전문 의료 콘텐츠 작성자입니다.

**병원 정보:**
- 병원명: ${hospital}
- 대표원장: ${director}
- 전문 분야: ${specialties}

**작성 지침:**
1. **스타일 일치**: 아래에 제공된 과거 글 예시의 스타일, 톤, 문장 구조를 철저히 분석하고 그대로 따라 하세요.
2. **전문 용어 수준**: ${techLevelGuide}
3. **길이**: 1500-2000자 (공백 포함)
4. **구조**: 서론(문제 제기) - 본론(설명 및 해결책) - 결론(병원 소개 및 CTA)
5. **SEO**: 자연스럽게 키워드 포함 (과도한 반복 금지)

**금지사항:**
- 의료법 위반 표현 (최고, 최상, 1등, 유일 등)
- 과장 광고
- 부정확한 의료 정보
- 타 병원 비교
- 과도한 마케팅 문구

**출력 형식:**
제목과 본문만 출력하세요. 추가 설명이나 메타 정보는 포함하지 마세요.`;
}
```

**특징**:
- 의료법 준수 강조
- 병원별 맞춤화 (이름, 전문성)
- 출력 형식 명확화 (JSON 없이 순수 텍스트)

---

## 5. AI 아키텍처 설계

### 5.1 Agent 패턴 (Phase 1)

**BaseAgent 추상 클래스**:
```typescript
// ai/agents/base/base.agent.ts
export abstract class BaseAgent {
  protected readonly logger = new Logger(BaseAgent.name);

  constructor(
    protected readonly prisma: PrismaService,
    protected readonly openai: OpenAIProvider,
    protected readonly promptService: PromptService,
  ) {}

  // 공통 메서드
  protected async loadHospitalData(hospitalId: string, skipOnboardingCheck: boolean): Promise<Hospital>;
  protected async saveGenerationMetadata(hospital: Hospital, metadata: GenerationMetadata): Promise<void>;
  protected handleError(error: any, context: string): never;

  // 추상 메서드 (하위 Agent 구현 필요)
  abstract generate(params: GenerateParams): Promise<GenerateResult>;
}
```

**FewShotAgent 구현**:
```typescript
// ai/agents/content-generation/few-shot.agent.ts
@Injectable()
export class FewShotAgent extends BaseAgent {
  async generate(params: GenerateParams): Promise<GenerateResult> {
    // 1. Hospital 데이터 로드
    const hospital = await this.loadHospitalData(hospitalId, skipOnboardingCheck);

    // 2. 과거 글 샘플 선택 (Jaccard Similarity)
    const samples = await this.selectFewShotSamples(hospital, topic);

    // 3. Few-Shot Prompt 구성
    const fewShotPrompt = this.promptService.buildFewShotPrompt({
      samples: samples.map(s => ({ topic: s.title || '', content: s.content })),
      topic,
      targetLength,
      writingStyle: { ... }
    });

    // 4. OpenAI API 호출
    const response = await this.openai.generateContent({
      model: 'gpt-4o',
      systemPrompt,
      prompt: fewShotPrompt,
      temperature: 0.7,
      maxTokens: 2000,
    });

    // 5. 품질 추적
    await this.qualityTrackingService.trackGeneration(hospitalId, { ... });

    return {
      content: response.content,
      tokensUsed: response.tokensUsed,
      responseTime,
      metadata: { samplesCount: samples.length, agentType: 'FewShotAgent' },
    };
  }

  // Jaccard Similarity 기반 샘플 선택
  private async selectFewShotSamples(hospital: Hospital, topic: string): Promise<WritingSample[]> {
    // 1. 모든 WritingSample 로드
    const allSamples = await this.prisma.writingSample.findMany({ ... });

    // 2. Jaccard Similarity 계산
    const samplesWithScore = allSamples.map(sample => {
      const text = `${sample.title || ''} ${sample.content}`.toLowerCase();
      const similarity = this.calculateSimilarity(topic.toLowerCase(), text);
      return { sample, similarity };
    });

    // 3. 상위 3-5개 선택
    samplesWithScore.sort((a, b) => b.similarity - a.similarity);
    return samplesWithScore.slice(0, targetCount).map(s => s.sample);
  }
}
```

**Jaccard Similarity**:
```typescript
private calculateSimilarity(text1: string, text2: string): number {
  const words1 = new Set(text1.split(/\s+/).filter(w => w.length > 1));
  const words2 = new Set(text2.split(/\s+/).filter(w => w.length > 1));

  const intersection = new Set([...words1].filter(w => words2.has(w)));
  const union = new Set([...words1, ...words2]);

  return intersection.size / union.size;
}
```

### 5.2 Phase 2 RAG Agent 준비

**RAGAgent (Placeholder)**:
```typescript
// ai/agents/content-generation/rag.agent.ts
@Injectable()
export class RAGAgent extends BaseAgent {
  constructor(
    prisma: PrismaService,
    openai: OpenAIProvider,
    promptService: PromptService,
    private embeddingService: EmbeddingService,
  ) {
    super(prisma, openai, promptService);
  }

  async generate(params: GenerateParams): Promise<GenerateResult> {
    // Phase 2 구현 예정:
    // 1. Query Embedding 생성
    // 2. Vector DB 검색 (Pinecone/Weaviate)
    // 3. Top-K 유사 문서 검색
    // 4. RAG Prompt 구성 (검색된 문서 + Few-Shot)
    // 5. OpenAI API 호출
    throw new Error('RAGAgent is not implemented yet (Phase 2)');
  }
}
```

**EmbeddingService Interface**:
```typescript
// ai/services/embedding.service.ts
export interface EmbeddingService {
  createEmbedding(text: string): Promise<number[]>;
  searchSimilar(query: string, topK: number): Promise<SearchResult[]>;
}
```

---

## 6. 주요 AI 기능 분석

### 6.1 글쓰기 스타일 분석 (Phase 1 핵심)

**메서드**: `analyzeWritingStyleWithGPT()`  
**파일**: `onboarding/onboarding.service.ts`

**하이브리드 접근**:
```typescript
async analyzeWritingStyle(hospitalId: string) {
  // 1. WritingSample 로드
  const samples = await this.prisma.writingSample.findMany({
    where: { hospitalId, selected: true },
  });

  // ⭐ 2. 알고리즘 분석 (통계 계산)
  const statistics = this.calculateWritingStatistics(samples);
  // → avgSentenceLength: 평균 문장 길이
  // → avgWordCount: 평균 어절 수
  // → topPhrases: 자주 쓰는 표현 (빈도 상위 10개)

  // ⭐ 3. GPT-4 정성 분석
  const gptAnalysis = await this.analyzeWritingStyleWithGPT(samples);
  // → tone, sentenceStructure, vocabularyLevel, frequentPhrases, etc.

  // ⭐ 4. 하이브리드 결합
  const writingStyle = {
    ...gptAnalysis, // GPT-4 정성 분석
    avgSentenceLength: statistics.avgSentenceLength, // 알고리즘
    avgWordCount: statistics.avgWordCount,           // 알고리즘
    frequentPhrases: gptAnalysis.frequentPhrases || statistics.topPhrases,
  };

  // 5. Hospital.writingStyle 업데이트
  await this.prisma.hospital.update({
    where: { id: hospitalId },
    data: { writingStyle },
  });
}
```

**GPT-4 프롬프트** (Style Analysis):
```typescript
const prompt = `
다음 텍스트들을 분석하여 작성자의 글쓰기 스타일을 추출하세요.

**분석 대상 글:**
${samples.map((s, i) => `
[글 ${i + 1}]
제목: ${s.title}
본문: ${s.content}
---
`).join('\n')}

**추출할 스타일 요소:**
1. tone (전체 톤: "친근하고 공감적", "전문적이고 신뢰감 있는" 등)
2. sentenceLength ("short", "medium", "long")
3. paragraphStructure (문단당 문장 수: 1-3, 4-6, 7+ 중 하나)
4. vocabularyLevel (1-5, 1=매우 쉬움, 5=전문적)
5. tone (구체적 톤 설명)
6. formalityLevel (1-5, 1=매우 친근, 5=매우 격식)
7. emotionalExpression ("minimal", "moderate", "strong")
8. exampleUsage (예시 사용 빈도: "rarely", "moderate", "frequently")
9. metaphorUsage (비유 사용: "rare", "occasional", "frequent")
10. questioningStyle (질문 사용: "no", "occasional", "frequent")
11. callToAction (행동 유도 방식)
12. transitionWords (전환어 사용 패턴)
13. dataUsage (통계/데이터 인용 빈도)
14. medicalTermDensity (의료 용어 밀도: "low", "medium", "high")

⭐ **Phase 1 Few-Shot Learning 핵심 데이터:**
15. frequentPhrases: 작성자가 자주 사용하는 특징적인 표현 10개
   - 단순 단어가 아닌 의미 있는 구절/표현
   - 말투를 반영하는 종결어미 포함
   - 예: ["환자분들께서는", "~하시기 바랍니다", "건강하시길 바라며" 등]

**출력 형식:**
{
  "tone": "...",
  "sentenceLength": "medium",
  "paragraphStructure": 4,
  "vocabularyLevel": 3,
  ...
  "frequentPhrases": ["...", "...", ...]
}

⚠️ 중요: 반드시 유효한 JSON만 반환하세요. 마크다운 코드 블록을 사용하지 마세요.
`;
```

**JSON 파싱** (Robust):
```typescript
// common/helpers/json.helper.ts
static parseOpenAIResponse<T = any>(content: string): T {
  // 1. 마크다운 코드 블록 제거
  let cleaned = content.trim();
  cleaned = cleaned.replace(/```json\n?/gi, '');
  cleaned = cleaned.replace(/```\n?/g, '');
  cleaned = cleaned.trim();

  // 2. JSON 파싱 시도
  try {
    return JSON.parse(cleaned) as T;
  } catch (error) {
    // 3. Fallback: 수동 필드 추출
    // ...
  }
}
```

### 6.2 Few-Shot Learning (Case A)

**메서드**: `generateAISampleWithExisting()`  
**흐름**:
```
1. WritingSample 3-5개 선택 (Jaccard Similarity)
   ↓
2. WritingStyle 로드 (avgSentenceLength, frequentPhrases 등)
   ↓
3. FewShotAgent.generate() 호출
   ↓
4. Few-Shot Prompt 구성:
   - System Prompt (병원 정보, 전문성)
   - Few-Shot Examples (과거 글 3-5개)
   - Style Features (평균 문장 길이, 자주 쓰는 표현)
   - 금지 표현
   ↓
5. GPT-4o 호출 (temperature: 0.7, maxTokens: 2000)
   ↓
6. fewShotMetadata 저장 (샘플 수, 품질, 비용)
```

**품질 지표**:
- **Case A (Few-Shot)**: 목표 품질 **70%**
- `AI_CONFIG.quality.targetScore = 70`

### 6.3 Progressive Learning (Case B)

**메서드**: `generateArticleWithLearning()`  
**흐름**:
```
1차 글 생성 (템플릿 기반)
   ↓
원장 수정 → analyzeEditPatterns() 학습
   ↓
2차 글 생성 (1차 수정 반영)
   ↓
원장 수정 → analyzeEditPatterns() 추가 학습
   ↓
3차 글 생성 (1,2차 종합 학습)
   ↓
완료 (품질 향상: 50% → 58% → 65%)
```

**각 차수별 System Prompt**:
```typescript
// 1차
systemPrompt = `You are a blog writer for ${hospital.name}. This is your first article.`;

// 2차
systemPrompt = `You are a blog writer for ${hospital.name}. You have learned from the director's editing preferences.`;
userPrompt += `
**1차 글 학습 내용:**
- 원장님이 수정한 패턴: ${JSON.stringify(learnedPatterns)}
- 선호하는 톤, 문장 길이, 표현 방식
`;

// 3차
systemPrompt = `You are the director of ${hospital.name}. You have fully mastered the director's writing style.`;
userPrompt += `
**1,2차 종합 학습:**
- 일관된 수정 패턴
- 반복적으로 수정된 부분
- 원장님만의 독특한 스타일
`;
```

**목표 품질** (Phase 1):
- 1차: **50%** (템플릿 기반)
- 2차: **58%** (1차 학습 반영)
- 3차: **65%** (1,2차 종합)

---

## 7. 비용 및 성능 최적화

### 7.1 AI 설정 (`ai.config.ts`)

**모델 전략**:
```typescript
export const AI_CONFIG = {
  models: {
    default: 'gpt-4o-mini',  // 기본: 빠르고 저렴
    premium: 'gpt-4o',       // 고품질 필요 시
    fallback: 'gpt-3.5-turbo', // Fallback
  },
  
  // 모델별 비용 (2024년 기준)
  cost: {
    'gpt-4o': {
      inputPer1M: 5.0,   // $5 / 1M tokens
      outputPer1M: 15.0, // $15 / 1M tokens
    },
    'gpt-4o-mini': {
      inputPer1M: 0.15,  // $0.15 / 1M tokens
      outputPer1M: 0.60, // $0.60 / 1M tokens
    },
  },
};
```

**비용 계산**:
```typescript
export function calculateCost(
  model: string,
  inputTokens: number,
  outputTokens: number,
): number {
  const costConfig = AI_CONFIG.cost[model];
  const inputCost = (inputTokens / 1000000) * costConfig.inputPer1M;
  const outputCost = (outputTokens / 1000000) * costConfig.outputPer1M;
  return inputCost + outputCost;
}
```

**예시** (1,500자 블로그 글 생성):
```
Few-Shot Prompt (5개 샘플):
- Input: ~3,000 tokens
- Output: ~600 tokens

gpt-4o-mini:
- Input: (3000 / 1M) * $0.15 = $0.00045
- Output: (600 / 1M) * $0.60 = $0.00036
- 총: $0.00081 (약 1.1원)

gpt-4o:
- Input: (3000 / 1M) * $5 = $0.015
- Output: (600 / 1M) * $15 = $0.009
- 총: $0.024 (약 32원)

→ gpt-4o-mini가 30배 저렴!
```

### 7.2 성능 최적화

**Retry 전략** (Exponential Backoff):
```typescript
retry: {
  maxRetries: 3,
  backoffMultiplier: 2,
  initialDelay: 2000, // 2초
}

// 재시도 지연:
// 1차: 2초
// 2차: 4초
// 3차: 8초
```

**Timeout 설정**:
```typescript
timeout: {
  default: 60000,    // 60초 (일반 API 호출)
  extended: 120000,  // 120초 (온보딩, 긴 콘텐츠)
  critical: 180000,  // 180초 (복잡한 분석)
}
```

**병렬 처리 가능 영역**:
```typescript
// Step 2: 키워드 + 주제 생성 (동시 실행 가능)
const [keywords, topics] = await Promise.all([
  this.generateKeywordsWithGPT(hospital),
  this.generateTopicsWithGPT(hospital),
]);
```

### 7.3 품질 추적

**QualityTrackingService**:
```typescript
// ai/services/quality-tracking.service.ts
async trackGeneration(hospitalId: string, data: {
  topic: string;
  content: string;
  responseTime: number;
  tokensUsed: number;
}) {
  // 1. fewShotMetadata.generations 배열에 추가
  // 2. 품질 점수 계산 (styleMatch, qualityScore)
  // 3. 평균 품질, 개선율 추적
}
```

**Hospital.fewShotMetadata 구조**:
```typescript
{
  phase: "Phase 1: Few-Shot Learning",
  generatedAt: "2026-01-15T10:00:00Z",
  basedOnExisting: true,
  summary: {
    avgQuality: 67.2,
    avgStyleMatch: 52.1,
    avgUserRating: 0,
    improvementRate: 5.3 // %
  },
  generations: [
    {
      id: "uuid",
      topic: "겨울철 허리 건강",
      cost: 0.0079875,
      tokensUsed: 639,
      styleMatch: 54.75,
      qualityScore: 71.9,
      responseTime: 3.2,
      edited: true,
      editTime: 120, // 초
      userRating: null
    },
    // ...
  ]
}
```

---

## 8. 개선 권장사항

### 8.1 단기 개선 (1-2주)

#### ✅ **1. Prompt Versioning**
**문제**: 프롬프트 변경 시 이전 버전 추적 불가  
**해결책**:
```typescript
export const PROMPT_VERSIONS = {
  'few-shot-v1': { /* ... */ },
  'few-shot-v2': { /* ... */ },
  'few-shot-v3-phase1': { /* ... */ }, // ← 현재
};

buildFewShotPrompt(params, version = 'few-shot-v3-phase1') {
  const template = PROMPT_VERSIONS[version];
  // ...
}
```

**장점**:
- A/B 테스트 가능
- 롤백 용이
- 성능 비교 가능

#### ✅ **2. Prompt 테스트 자동화**
```typescript
// ai/services/prompt.service.spec.ts
describe('PromptService', () => {
  it('buildFewShotPrompt should include frequentPhrases', () => {
    const result = promptService.buildFewShotPrompt({
      writingStyle: { frequentPhrases: ['환자분들께서는'] }
    });
    expect(result).toContain('환자분들께서는');
  });
});
```

#### ✅ **3. 비용 알림 시스템**
```typescript
// 일일 OpenAI 비용이 $10 초과 시 알림
if (dailyCost > 10) {
  await notificationService.sendAlert({
    type: 'COST_THRESHOLD',
    message: `OpenAI 비용 초과: $${dailyCost}`,
  });
}
```

### 8.2 중기 개선 (1-2개월, Phase 2)

#### 🔧 **1. RAG 구현**
**목표**: Few-Shot보다 정확한 스타일 재현

**아키텍처**:
```
1. Vector DB (Pinecone / Weaviate)
   ↓
2. Embedding (OpenAI text-embedding-3-small)
   ↓
3. Semantic Search (Top-K 유사 문서)
   ↓
4. RAG Prompt = Few-Shot + 검색된 문서
   ↓
5. GPT-4o 생성
```

**예상 효과**:
- 품질 향상: **70% → 80%+**
- 더 정확한 스타일 매칭
- 긴 글(3,000자+) 지원

#### 🔧 **2. Fine-Tuning (선택적)**
**조건**: 병원당 100개+ 샘플 확보 시

**장점**:
- 극도로 정확한 스타일 재현
- 토큰 비용 절감 (Few-Shot Prompt 불필요)

**단점**:
- Fine-Tuning 비용 ($2.40 / 1M tokens)
- 업데이트 시 재훈련 필요

**권장**: RAG로 충분하면 Fine-Tuning 불필요

#### 🔧 **3. 멀티 모델 전략**
```typescript
models: {
  fast: 'gpt-4o-mini',      // 초안, SEO 키워드
  balanced: 'gpt-4o',       // 일반 콘텐츠
  premium: 'gpt-4o',        // 최종 검토
  experimental: 'claude-3-opus', // A/B 테스트
}
```

**Claude 3 장점**:
- 더 긴 컨텍스트 (200K tokens)
- 한국어 품질 우수
- OpenAI 장애 시 Fallback

### 8.3 장기 개선 (3-6개월)

#### 🚀 **1. 자율 에이전트 (Autonomous Agent)**
**목표**: 원장 피드백 없이 자동 개선

**워크플로우**:
```
1. 콘텐츠 생성
   ↓
2. 자체 평가 (GPT-4 Critic)
   ↓
3. 개선점 추출
   ↓
4. 재생성 (2-3회 반복)
   ↓
5. 최종 버전 제출
```

#### 🚀 **2. 멀티모달 콘텐츠**
- 이미지 생성 (DALL-E 3)
- 인포그래픽 자동 생성
- 동영상 스크립트

#### 🚀 **3. 예측 분석**
- 콘텐츠 성과 예측 (조회수, 체류시간)
- 최적 발행 시간 추천
- 트렌드 감지 및 주제 추천

---

## 9. 결론 및 요약

### 9.1 현재 상태 평가

| 항목 | 상태 | 평가 |
|------|------|------|
| **OpenAI API 통합** | ✅ 완료 | Fetch() 직접 구현, 재시도 로직 완벽 |
| **Langchain 사용** | ❌ 미사용 | 경량화 전략, Phase 2에서 부분 도입 고려 |
| **프롬프트 관리** | ✅ 우수 | PromptService 중앙 관리, 버전 관리 필요 |
| **Agent 아키텍처** | ✅ 우수 | BaseAgent + FewShotAgent, RAG 준비 완료 |
| **Few-Shot Learning** | ✅ 구현 완료 | Jaccard Similarity, 품질 목표 70% |
| **Progressive Learning** | ✅ 구현 완료 | Case B, 3차 반복 학습 |
| **비용 최적화** | ✅ 양호 | gpt-4o-mini 기본, 비용 추적 |
| **품질 추적** | ✅ 구현 완료 | QualityTrackingService, fewShotMetadata |

### 9.2 OpenAI API 호출 요약

**총 11곳**:
- **FewShotAgent**: 1곳 (Phase 1 핵심)
- **OnboardingService**: 10곳 (온보딩 전반)

**모델 사용**:
- **gpt-4o**: Few-Shot Learning (고품질 필요)
- **기본 모델** (gpt-4o-mini 추정): 나머지 (비용 절감)

**평균 비용** (온보딩 1회):
- Case A (Few-Shot): 약 $0.05-0.10 (70-130원)
- Case B (Progressive): 약 $0.03-0.07 (40-90원)

### 9.3 핵심 강점

1. ✅ **경량 아키텍처** (Langchain 없이 구현)
2. ✅ **중앙화된 프롬프트 관리** (PromptService)
3. ✅ **Robust Error Handling** (재시도, 타임아웃, Fallback)
4. ✅ **하이브리드 스타일 분석** (알고리즘 + GPT-4)
5. ✅ **확장 가능한 Agent 패턴** (BaseAgent)

### 9.4 개선 우선순위

**단기 (1-2주)**:
1. Prompt Versioning 시스템
2. 비용 알림 시스템
3. Prompt 테스트 자동화

**중기 (1-2개월, Phase 2)**:
1. **RAG 구현** (최우선)
2. 멀티 모델 전략 (Claude 3)
3. Vector DB 도입 (Pinecone)

**장기 (3-6개월)**:
1. 자율 에이전트
2. 멀티모달 콘텐츠
3. 예측 분석

---

## 10. 부록

### 10.1 주요 파일 목록

| 파일 경로 | 줄 수 | 설명 |
|----------|-------|------|
| `ai/providers/openai.provider.ts` | 227 | OpenAI API 클라이언트 |
| `ai/services/prompt.service.ts` | 470 | 프롬프트 중앙 관리 |
| `ai/ai.config.ts` | 217 | AI 설정 (모델, 비용 등) |
| `ai/agents/base/base.agent.ts` | ~80 | BaseAgent 추상 클래스 |
| `ai/agents/content-generation/few-shot.agent.ts` | 193 | FewShotAgent |
| `onboarding/onboarding.service.ts` | 2,415 | 온보딩 로직 + AI 호출 |
| `common/helpers/json.helper.ts` | ~150 | AI 응답 파싱 |

### 10.2 관련 문서

- `@AI_AGENT_MASTER_PLAN.md`: Agent 아키텍처 마스터 플랜
- `@PHASE1_COMPLETION_REPORT.md`: Phase 1 완료 리포트
- `@QUALITY_IMPROVEMENT_REPORT.md`: 품질 개선 리포트
- `@REFACTORING_PLAN.md`: 리팩토링 계획

---

**작성자**: AI Assistant  
**검토자**: @injunpark  
**최종 업데이트**: 2026-01-15
