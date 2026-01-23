# AI Agent Master Plan
## 100% Personalized Content Generation System

**최종 업데이트**: 2025-01-06  
**상태**: Phase 0 완료, Phase 1 준비 중

---

## 📋 목차

1. [프로젝트 개요](#프로젝트-개요)
2. [현재 상태 (Phase 0)](#현재-상태-phase-0)
3. [Phase별 로드맵](#phase별-로드맵)
4. [아키텍처 비교](#아키텍처-비교)
5. [비용 및 ROI 분석](#비용-및-roi-분석)
6. [구현 우선순위](#구현-우선순위)

---

## 프로젝트 개요

### 🎯 목표

**원장(사용자)별로 100% 맞춤화된**, 해당 원장이 직접 썼다고 장담할 만한 블로그 글 생성

### ❌ 현재 시스템의 한계

```typescript
// 현재: 단순 프롬프트 기반
async generateContent(dto) {
  const prompt = `${hospital}의 ${topic}에 대한 글`;
  return await openai.create({ prompt });
}
```

**문제점**:
- ❌ 일반적이고 평범한 콘텐츠 (품질 40%)
- ❌ 원장의 말투/스타일 반영 불가 (스타일 일치 20%)
- ❌ 병원의 특색 반영 불가
- ❌ 일관성 없는 품질
- ❌ 모든 병원이 비슷한 글

### ✅ AI Agent 접근 방식

**핵심 개념**: Few-Shot Learning → RAG → Multi-Agent

```
Phase 0 (현재): 단순 OpenAI API
  → 품질 40%, 비용 $0.005/글

Phase 1 (Few-Shot): 과거 글 학습
  → 품질 70% (+30%p), 비용 $0.02/글 (4배)
  → ROI: 매우 높음 ⭐⭐⭐

Phase 2 (RAG): Vector Store 활용
  → 품질 85% (+15%p), 비용 $0.03/글 (1.5배)
  → ROI: 높음 ⭐⭐

Phase 3 (Multi-Agent): 품질 자동 검증
  → 품질 95% (+10%p), 비용 $0.10/글 (3.3배)
  → ROI: 중간 ⭐
```

---

## 현재 상태 (Phase 0)

### ✅ 완료된 작업

#### 1. 온보딩 시스템 구축
- **Step 1**: 병원 정보 입력
- **Step 2**: AI 콘텐츠 설정 (SEO 키워드, 추천 주제)
- **Step 3**: 과거 글 수집 (URL 크롤링, 파일 업로드, 직접 입력)
- **Step 4**: AI 샘플 생성 (Progressive Learning 1-3차)
- **Analysis Result**: 종합 분석 및 피드백

#### 2. OpenAI API 통합
- **위치**: `/apps/backend/src/ai/providers/openai.provider.ts`
- **기능**:
  - Exponential Backoff 재시도 (최대 3회)
  - Rate Limit 에러 처리 (429, 503)
  - 지수적 백오프 (2s, 4s, 8s)
  - Rate Limit 시 20초 대기

#### 3. Frontend 재시도 로직
- **`useApiRetry` Hook**: `/apps/frontend/src/hooks/useApiRetry.ts`
- **`RetryBanner` Component**: `/apps/frontend/src/components/RetryBanner.tsx`
- **Step4Page 통합 완료**: Case A/B 모두 재시도 지원

#### 4. 데이터베이스 스키마
```prisma
model Hospital {
  id                String   @id @default(uuid())
  name              String
  address           Json
  contact           Json
  
  // 온보딩 데이터
  director          Json?
  specialties       Json?
  targetAudience    Json?
  contentKeywords   Json?
  contentTopics     Json?
  contentStyle      Json?
  faqList           Json?
  
  // 글쓰기 스타일 (Step 3 분석 결과)
  writingStyle      Json?
  
  writingSamples    WritingSample[]
  
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt
}

model WritingSample {
  id                String   @id @default(uuid())
  hospitalId        String
  hospital          Hospital @relation(...)
  
  title             String
  content           String   @db.Text
  source            String   // 'url', 'file', 'direct'
  sourceUrl         String?
  
  // 분석 데이터
  wordCount         Int
  charCount         Int
  individualAnalysis Json?  // 13개 항목 분석
  
  createdAt         DateTime @default(now())
}
```

### 📊 현재 성능 지표

| 항목 | 현재 | 목표 (Phase 1) |
|-----|------|---------------|
| **품질** | 40% | 70% (+30%p) |
| **스타일 일치** | 20% | 60% (+40%p) |
| **비용/글** | $0.005 | $0.02 (4배) |
| **생성 시간** | 5-10초 | 10-15초 |
| **OpenAI 호출** | 1회 | 1회 |

### ⚠️ 현재 문제점

1. **일반적인 콘텐츠**: 모든 병원이 비슷한 글
2. **스타일 미반영**: 원장의 말투, 자주 쓰는 표현 없음
3. **개인화 부족**: DoctorProfile 없음
4. **데이터 활용 부족**: 과거 글은 수집만 하고 생성에 미활용

---

## Phase별 로드맵

### Phase 0.5: 재시도 UI 확산 (1-2일) ⚠️ 선택 사항

**목적**: 모든 OpenAI API 호출 지점에 재시도 UI 적용

**작업**:
```
Day 1:
✅ Step4Page 재시도 (완료)
⬜ Step2Page 재시도
   - SEO 키워드 생성
   - 추천 주제 생성

Day 2:
⬜ Step3Page 재시도
   - URL 크롤링
   - 스타일 분석
⬜ AnalysisResultPage 재시도 (선택)
   - 분석 결과 로드
```

**결과**:
- ✅ 사용자 경험 개선
- ✅ Rate Limit 대응 강화
- ✅ Phase 1 준비 완료

**우선순위**: 🟡 Medium (Phase 1 전에 완료 권장)

---

### Phase 1: Few-Shot Learning Agent (2주) ⭐⭐⭐ 최고 우선순위

**목적**: 원장 스타일 학습 & 개인화

#### Week 1: 인프라 구축 (3-5일)

##### Day 1-3: DoctorProfile 스키마 추가

```prisma
model DoctorProfile {
  id        String   @id @default(uuid())
  hospitalId String  @unique
  hospital   Hospital @relation(...)
  
  // 글쓰기 스타일
  tone              String   // "친근한", "전문적인", "유머러스한"
  frequentPhrases   String[] // ["환자분들", "건강하세요", "~하시기 바랍니다"]
  emojiUsage        String   // "frequent", "moderate", "rare"
  sentenceStyle     String   // "short", "medium", "long"
  
  // 전문성
  expertiseAreas    String[] // ["척추", "디스크", "통증치료"]
  
  // 글쓰기 통계
  avgSentenceLength Int      // 평균 문장 길이
  avgWordCount      Int      // 평균 글자 수
  techTermDensity   Float    // 전문 용어 밀도
  
  // Few-Shot 샘플 (JSON으로 저장)
  fewShotSamples    Json?    // { samples: [{ topic, content, style }] }
  
  // 학습 메타데이터
  learningHistory   Json?    // { totalGenerations, avgQuality, lastUpdated }
  
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

**마이그레이션**:
```bash
cd apps/backend
npx prisma migrate dev --name add_doctor_profile
```

##### Day 4-5: PersonalizedContentAgent 구현

```typescript
// NEW: /apps/backend/src/ai/agents/personalized-content.agent.ts

export class PersonalizedContentAgent {
  constructor(
    private prisma: PrismaService,
    private openai: OpenAIProvider, // 기존 재사용!
  ) {}
  
  async generate(params: {
    hospitalId: string;
    topic: string;
    targetLength?: number;
  }): Promise<string> {
    // 1. DoctorProfile 로드
    const profile = await this.loadDoctorProfile(params.hospitalId);
    
    // 2. 과거 글 샘플 선택 (3-5개)
    const samples = await this.selectFewShotSamples(profile, params.topic);
    
    // 3. Few-Shot 프롬프트 구성
    const fewShotPrompt = this.buildFewShotPrompt({
      profile,
      samples,
      topic: params.topic,
      targetLength: params.targetLength || 1500,
    });
    
    // 4. OpenAI Provider 호출 (기존 인프라 재사용!)
    const result = await this.openai.generateContent({
      prompt: fewShotPrompt,
      systemPrompt: this.buildSystemPrompt(profile),
      temperature: 0.7,
      maxTokens: 2000,
    });
    
    // 5. 결과 저장 (학습용)
    await this.saveGeneration(profile, params.topic, result);
    
    return result.content;
  }
  
  private buildFewShotPrompt(data: FewShotData): string {
    return `
# 원장님의 글쓰기 스타일 특징

## 말투 및 표현
- 말투: ${data.profile.tone}
- 자주 쓰는 표현: ${data.profile.frequentPhrases.join(', ')}
- 이모지 사용: ${data.profile.emojiUsage}

## 문장 스타일
- 평균 문장 길이: ${data.profile.avgSentenceLength}자
- 문장 스타일: ${data.profile.sentenceStyle}
- 전문 용어 밀도: ${(data.profile.techTermDensity * 100).toFixed(1)}%

## 과거 작성한 글 예시

${data.samples.map((s, i) => `
### 예시 ${i + 1}: ${s.title}
${s.content}
`).join('\n')}

---

# 요청사항

위 스타일을 **완벽하게 따라** 다음 주제로 블로그 글을 작성해주세요:

**주제**: ${data.topic}
**목표 길이**: ${data.targetLength}자 내외
**요구사항**:
- 위 예시들과 동일한 말투 사용
- 자주 쓰는 표현 적절히 활용
- 문장 길이 및 스타일 유지
- 전문 용어 밀도 유지
    `;
  }
  
  private buildSystemPrompt(profile: DoctorProfile): string {
    return `
당신은 ${profile.hospital.name}의 전문 원장입니다.
전문 분야: ${profile.expertiseAreas.join(', ')}
말투: ${profile.tone}

환자분들에게 신뢰감을 주면서도 이해하기 쉽게 설명하는 것이 중요합니다.
위 스타일을 절대 벗어나지 마세요.
    `.trim();
  }
  
  private async loadDoctorProfile(hospitalId: string): Promise<DoctorProfile> {
    let profile = await this.prisma.doctorProfile.findUnique({
      where: { hospitalId },
      include: { hospital: true },
    });
    
    if (!profile) {
      // 프로필이 없으면 Step 3 분석 데이터로 자동 생성
      profile = await this.createProfileFromWritingStyle(hospitalId);
    }
    
    return profile;
  }
  
  private async selectFewShotSamples(
    profile: DoctorProfile,
    topic: string,
  ): Promise<WritingSample[]> {
    // 1. 전체 샘플 로드
    const allSamples = await this.prisma.writingSample.findMany({
      where: { hospitalId: profile.hospitalId },
      orderBy: { createdAt: 'desc' },
    });
    
    if (allSamples.length === 0) {
      throw new Error('과거 글이 없습니다. Step 3을 먼저 완료해주세요.');
    }
    
    // 2. 주제와 유사한 샘플 선택 (간단한 키워드 매칭)
    const scored = allSamples.map(sample => {
      const similarity = this.calculateSimilarity(sample.title + sample.content, topic);
      return { sample, similarity };
    });
    
    // 3. 상위 3-5개 선택
    const topSamples = scored
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, 5)
      .map(s => s.sample);
    
    return topSamples.length >= 3 ? topSamples : allSamples.slice(0, 3);
  }
  
  private calculateSimilarity(text1: string, text2: string): number {
    // 간단한 Jaccard Similarity (Phase 2에서 Embedding으로 개선)
    const words1 = new Set(text1.toLowerCase().split(/\s+/));
    const words2 = new Set(text2.toLowerCase().split(/\s+/));
    
    const intersection = new Set([...words1].filter(w => words2.has(w)));
    const union = new Set([...words1, ...words2]);
    
    return intersection.size / union.size;
  }
  
  private async saveGeneration(
    profile: DoctorProfile,
    topic: string,
    content: string,
  ): Promise<void> {
    // 학습 히스토리 업데이트
    const history = profile.learningHistory as any || {
      totalGenerations: 0,
      generations: [],
    };
    
    history.totalGenerations += 1;
    history.generations.push({
      topic,
      timestamp: new Date().toISOString(),
      contentLength: content.length,
    });
    
    // 최근 100개만 유지
    if (history.generations.length > 100) {
      history.generations = history.generations.slice(-100);
    }
    
    await this.prisma.doctorProfile.update({
      where: { id: profile.id },
      data: {
        learningHistory: history,
        updatedAt: new Date(),
      },
    });
  }
}
```

#### Week 2: 통합 & 테스트 (5-7일)

##### Day 6-8: 온보딩 서비스 통합

```typescript
// MODIFY: /apps/backend/src/onboarding/onboarding.service.ts

import { PersonalizedContentAgent } from '../ai/agents/personalized-content.agent';

export class OnboardingService {
  constructor(
    private prisma: PrismaService,
    // 기존
    private openaiProvider: OpenAIProvider,
    private crawlerService: CrawlerService,
    // NEW!
    private personalizedContentAgent: PersonalizedContentAgent,
  ) {}
  
  // Before (Phase 0):
  // async generateStep4Article(dto: GenerateStep4Dto) {
  //   const prompt = `병원: ${hospital.name}, 주제: ${dto.topic}...`;
  //   return await this.openaiProvider.generateContent({ prompt });
  // }
  
  // After (Phase 1):
  async generateStep4Article(dto: GenerateStep4Dto) {
    try {
      // PersonalizedContentAgent 사용!
      return await this.personalizedContentAgent.generate({
        hospitalId: dto.hospitalId,
        topic: dto.topic,
        targetLength: 1500,
      });
    } catch (error) {
      // Fallback: 과거 글이 없는 경우 기존 방식 사용
      if (error.message.includes('과거 글이 없습니다')) {
        return await this.generateArticleWithoutSamples(dto);
      }
      throw error;
    }
  }
  
  // Fallback 메서드
  private async generateArticleWithoutSamples(dto: GenerateStep4Dto) {
    // 기존 Phase 0 로직 유지
    const hospital = await this.prisma.hospital.findUnique({
      where: { id: dto.hospitalId },
    });
    
    const prompt = `
병원: ${hospital.name}
주제: ${dto.topic}
타겟: ${JSON.stringify(hospital.targetAudience)}

위 정보로 블로그 글을 작성하세요.
    `;
    
    return await this.openaiProvider.generateContent({ prompt });
  }
}
```

##### Day 9-10: Module 등록

```typescript
// /apps/backend/src/ai/ai.module.ts

import { Module } from '@nestjs/common';
import { PersonalizedContentAgent } from './agents/personalized-content.agent';
import { OpenAIProvider } from './providers/openai.provider';

@Module({
  providers: [
    OpenAIProvider,
    PersonalizedContentAgent, // NEW!
  ],
  exports: [
    OpenAIProvider,
    PersonalizedContentAgent, // NEW!
  ],
})
export class AIModule {}

// /apps/backend/src/onboarding/onboarding.module.ts

import { Module } from '@nestjs/common';
import { AIModule } from '../ai/ai.module';
import { OnboardingService } from './onboarding.service';
import { OnboardingController } from './onboarding.controller';

@Module({
  imports: [
    AIModule, // PersonalizedContentAgent 사용
  ],
  controllers: [OnboardingController],
  providers: [OnboardingService],
})
export class OnboardingModule {}
```

##### Day 11-14: 테스트 & 품질 검증

**테스트 케이스**:
```typescript
describe('PersonalizedContentAgent', () => {
  it('병원 A (친근한 말투) - 스타일 일치도 60% 이상', async () => {
    const article = await agent.generate({
      hospitalId: 'hospital-A',
      topic: '허리 건강 관리법',
    });
    
    expect(article).toContain('환자분들');
    expect(article).toContain('건강하세요');
    expect(calculateStyleMatch(article, profileA)).toBeGreaterThan(0.6);
  });
  
  it('병원 B (전문적 말투) - 스타일 일치도 60% 이상', async () => {
    const article = await agent.generate({
      hospitalId: 'hospital-B',
      topic: '추나 치료의 효과',
    });
    
    expect(article).not.toContain('ㅎㅎ');
    expect(article).toContain('환자');
    expect(calculateStyleMatch(article, profileB)).toBeGreaterThan(0.6);
  });
});
```

**품질 목표**:
- ✅ 스타일 일치도: 20% → 60% (+40%p)
- ✅ 품질: 40% → 70% (+30%p)
- ✅ 비용: 기준 → 4배 (허용)
- ✅ 속도: 5-10초 → 10-15초 (허용)

**Phase 1 완료 조건**:
- [ ] DoctorProfile 스키마 추가 완료
- [ ] PersonalizedContentAgent 구현 완료
- [ ] OnboardingService 통합 완료
- [ ] 테스트 케이스 통과
- [ ] 품질 목표 달성

---

### Phase 2: RAG Agent (2-3주) ⭐⭐ 높은 우선순위

**목적**: Vector Store를 활용한 효율적인 과거 글 검색

#### Week 1: Vector Store 설정 (5-7일)

##### Step 1: Supabase pgvector 설정

```sql
-- Supabase에서 실행
create extension if not exists vector;

-- Embedding 테이블
create table doctor_content_embeddings (
  id uuid primary key default gen_random_uuid(),
  hospital_id uuid references hospitals(id) on delete cascade,
  writing_sample_id uuid references writing_samples(id) on delete cascade,
  
  content text not null,
  embedding vector(1536), -- OpenAI text-embedding-3-small
  
  created_at timestamp with time zone default now()
);

-- Vector 검색 인덱스 (HNSW)
create index on doctor_content_embeddings 
  using hnsw (embedding vector_cosine_ops);

-- Hospital ID 인덱스
create index on doctor_content_embeddings (hospital_id);
```

##### Step 2: Embedding Service 구현

```typescript
// NEW: /apps/backend/src/ai/services/embedding.service.ts

export class EmbeddingService {
  constructor(
    private prisma: PrismaService,
    private openai: OpenAIProvider,
  ) {}
  
  async embedText(text: string): Promise<number[]> {
    const response = await this.openai.createEmbedding({
      model: 'text-embedding-3-small',
      input: text,
    });
    return response.embedding;
  }
  
  async embedWritingSample(sampleId: string): Promise<void> {
    const sample = await this.prisma.writingSample.findUnique({
      where: { id: sampleId },
    });
    
    if (!sample) {
      throw new Error(`WritingSample ${sampleId} not found`);
    }
    
    // 제목 + 내용을 합쳐서 임베딩
    const text = `${sample.title}\n\n${sample.content}`;
    const embedding = await this.embedText(text);
    
    // Vector Store에 저장
    await this.prisma.$executeRaw`
      INSERT INTO doctor_content_embeddings (hospital_id, writing_sample_id, content, embedding)
      VALUES (
        ${sample.hospitalId}::uuid,
        ${sample.id}::uuid,
        ${text},
        ${embedding}::vector
      )
      ON CONFLICT (writing_sample_id) DO UPDATE
      SET embedding = EXCLUDED.embedding, updated_at = NOW()
    `;
  }
  
  async findSimilarWritings(
    hospitalId: string,
    query: string,
    limit: number = 5,
  ): Promise<WritingSample[]> {
    // 1. 쿼리 임베딩
    const queryEmbedding = await this.embedText(query);
    
    // 2. Vector 검색
    const results = await this.prisma.$queryRaw<any[]>`
      SELECT 
        ws.*,
        1 - (dce.embedding <=> ${queryEmbedding}::vector) as similarity
      FROM doctor_content_embeddings dce
      JOIN writing_samples ws ON ws.id = dce.writing_sample_id
      WHERE dce.hospital_id = ${hospitalId}::uuid
      ORDER BY dce.embedding <=> ${queryEmbedding}::vector
      LIMIT ${limit}
    `;
    
    return results;
  }
}
```

#### Week 2-3: RAG Agent 구현 (7-10일)

```typescript
// NEW: /apps/backend/src/ai/agents/rag-content.agent.ts

export class RAGContentAgent {
  constructor(
    private prisma: PrismaService,
    private openai: OpenAIProvider,
    private embeddingService: EmbeddingService, // NEW!
  ) {}
  
  async generate(params: {
    hospitalId: string;
    topic: string;
  }): Promise<string> {
    // 1. Vector Store에서 유사 글 검색
    const similarWritings = await this.embeddingService.findSimilarWritings(
      params.hospitalId,
      params.topic,
      10, // Top 10
    );
    
    if (similarWritings.length === 0) {
      throw new Error('과거 글이 없습니다. Step 3을 먼저 완료해주세요.');
    }
    
    // 2. DoctorProfile 로드
    const profile = await this.loadDoctorProfile(params.hospitalId);
    
    // 3. RAG 프롬프트 구성
    const ragPrompt = this.buildRAGPrompt({
      profile,
      similarWritings,
      topic: params.topic,
    });
    
    // 4. OpenAI Provider 호출
    const result = await this.openai.generateContent({
      prompt: ragPrompt,
      systemPrompt: this.buildSystemPrompt(profile),
      temperature: 0.7,
      maxTokens: 2000,
    });
    
    return result.content;
  }
  
  private buildRAGPrompt(data: RAGData): string {
    // Few-Shot 예시 (Top 5)
    const fewShotSamples = data.similarWritings.slice(0, 5);
    
    // 추가 컨텍스트 (6-10위)
    const additionalContext = data.similarWritings.slice(5, 10);
    
    return `
# 원장님의 글쓰기 스타일 특징

- 말투: ${data.profile.tone}
- 자주 쓰는 표현: ${data.profile.frequentPhrases.join(', ')}

## 과거 작성한 유사 주제의 글 예시

${fewShotSamples.map((s, i) => `
### 예시 ${i + 1}: ${s.title}
${s.content}
`).join('\n')}

## 추가 참고 자료

${additionalContext.map((s, i) => `
- ${s.title}: ${s.content.substring(0, 200)}...
`).join('\n')}

---

# 요청사항

위 스타일과 참고 자료를 활용하여 다음 주제로 블로그 글을 작성해주세요:

**주제**: ${data.topic}
    `;
  }
}
```

**Phase 2 완료 조건**:
- [ ] Supabase pgvector 설정 완료
- [ ] EmbeddingService 구현 완료
- [ ] RAGContentAgent 구현 완료
- [ ] 기존 WritingSample 자동 임베딩
- [ ] 품질 70% → 85% 달성

---

### Phase 3: Multi-Agent System (3-4주) ⭐ 장기 목표

**목적**: Agent 간 협업으로 품질 자동 검증

#### Week 1-2: LangGraph 설정 (7-10일)

```typescript
// NEW: /apps/backend/src/ai/orchestrator/multi-agent.orchestrator.ts

import { StateGraph } from "@langchain/langgraph";

interface ContentState {
  topic: string;
  hospitalId: string;
  research: string;
  draft: string;
  styled: string;
  review: { score: number; feedback: string };
  final: string;
}

export class MultiAgentOrchestrator {
  private workflow: StateGraph<ContentState>;
  
  constructor(
    private researchAgent: ResearchAgent,
    private writerAgent: WriterAgent,
    private styleAgent: StyleAgent,
    private reviewAgent: ReviewAgent,
  ) {
    this.buildWorkflow();
  }
  
  private buildWorkflow() {
    this.workflow = new StateGraph<ContentState>();
    
    // 1. Research Agent: 주제 조사
    this.workflow.addNode("research", async (state) => {
      const research = await this.researchAgent.execute(state.topic);
      return { ...state, research };
    });
    
    // 2. Writer Agent: 초안 작성
    this.workflow.addNode("writer", async (state) => {
      const draft = await this.writerAgent.execute({
        topic: state.topic,
        research: state.research,
      });
      return { ...state, draft };
    });
    
    // 3. Style Agent: 원장 스타일 적용
    this.workflow.addNode("style", async (state) => {
      const styled = await this.styleAgent.execute({
        draft: state.draft,
        hospitalId: state.hospitalId,
      });
      return { ...state, styled };
    });
    
    // 4. Review Agent: 품질 검증
    this.workflow.addNode("review", async (state) => {
      const review = await this.reviewAgent.execute(state.styled);
      
      if (review.score < 0.8) {
        // 품질 미달 → 피드백과 함께 Writer로 돌아가기
        return { ...state, review, draft: '' };
      }
      
      return { ...state, review, final: state.styled };
    });
    
    // 워크플로우 연결
    this.workflow.addEdge("research", "writer");
    this.workflow.addEdge("writer", "style");
    this.workflow.addEdge("style", "review");
    
    // 조건부 분기
    this.workflow.addConditionalEdge("review", (state) => {
      return state.review.score < 0.8 ? "writer" : "END";
    });
    
    this.workflow.setEntryPoint("research");
  }
  
  async generate(params: {
    hospitalId: string;
    topic: string;
  }): Promise<string> {
    const app = this.workflow.compile();
    const result = await app.invoke(params);
    return result.final;
  }
}
```

#### Week 3-4: 개별 Agent 구현 (7-10일)

**4개 Agent**:
1. **ResearchAgent**: 주제 조사 (최신 의료 정보 검색)
2. **WriterAgent**: 초안 작성 (RAGContentAgent 재사용)
3. **StyleAgent**: 원장 스타일 적용 (DoctorProfile 기반)
4. **ReviewAgent**: 품질 검증 (점수 + 피드백)

**Phase 3 완료 조건**:
- [ ] LangGraph 워크플로우 구축
- [ ] 4개 Agent 구현 완료
- [ ] 품질 85% → 95% 달성
- [ ] 자동 품질 검증 동작

---

## 아키텍처 비교

### 현재 시스템 (Phase 0)

```
Frontend → Backend Service → OpenAI API
              ↓
         단순 프롬프트
         현재 요청 데이터만
         
품질: 40%
비용: $0.005/글
시간: 5-10초
```

### Phase 1 시스템

```
Frontend → Backend Service → PersonalizedContentAgent
                                  ↓
                             DoctorProfile 로드
                             과거 글 3-5개 로드
                             Few-Shot 프롬프트 구성
                                  ↓
                             OpenAI API
                             
품질: 70% (+30%p)
비용: $0.02/글 (4배)
시간: 10-15초
```

### Phase 2 시스템

```
Frontend → Backend Service → RAGContentAgent
                                  ↓
                             Vector Store 검색
                             유사 글 10개 추출
                             RAG 프롬프트 구성
                                  ↓
                             OpenAI API
                             
품질: 85% (+15%p)
비용: $0.03/글 (1.5배)
시간: 15-20초
```

### Phase 3 시스템

```
Frontend → Backend Service → MultiAgentOrchestrator
                                  ↓
                    ┌─────────────┴─────────────┐
                    ↓             ↓             ↓
              ResearchAgent  WriterAgent  StyleAgent
                    ↓             ↓             ↓
                    └─────────────┬─────────────┘
                                  ↓
                            ReviewAgent
                            (품질 < 0.8?)
                                  ↓
                        Yes → 재작성 / No → 완료
                        
품질: 95% (+10%p)
비용: $0.10/글 (3.3배)
시간: 30-60초
```

---

## 비용 및 ROI 분석

### 월 비용 추정 (병원 100개 가정)

| Phase | API 호출/글 | 비용/글 | 글 생산량 | 월 비용 | 대비 |
|-------|-----------|---------|----------|---------|------|
| Phase 0 | 1회 | $0.005 | 300글/월 | **$150** | 기준 |
| Phase 1 | 1회 | $0.02 | 300글/월 | **$600** | 4배 |
| Phase 2 | 2회 | $0.03 | 300글/월 | **$900** | 6배 |
| Phase 3 | 4-6회 | $0.10 | 300글/월 | **$3,000** | 20배 |

### ROI 분석

#### Phase 1 ROI ⭐⭐⭐ 매우 높음

```
비용 증가: $450/월 (4배)
효과:
- 품질 +30%p → 원장 만족도 ↑ 70%
- 스타일 일치 +40%p → 브랜드 일관성 ↑
- 이탈률 ↓ 40%
- 구독료 유지율 ↑ 50%

예상 매출 증가: $2,000/월 (이탈 방지)
순익: $1,550/월
ROI: 344%
```

#### Phase 2 ROI ⭐⭐ 높음

```
비용 증가: $300/월 (1.5배 from Phase 1)
효과:
- 품질 +15%p
- 검색 효율 ↑ 80%
- 생성 속도 유지

예상 매출 증가: $800/월
순익: $500/월
ROI: 166%
```

#### Phase 3 ROI ⭐ 중간

```
비용 증가: $2,100/월 (3.3배 from Phase 2)
효과:
- 품질 +10%p
- 자동 품질 검증
- 일관성 ↑ 95%

예상 매출 증가: $1,200/월
순익: -$900/월
ROI: 57%
⚠️ 대규모 서비스에서만 권장
```

---

## 구현 우선순위

### ✅ 즉시 시작 (이번 달)

**Phase 1: Few-Shot Learning**
- 기간: 2주
- 비용: 4배
- ROI: 344%
- 복잡도: 중간

**이유**:
1. ✅ 즉각적인 품질 향상 (40% → 70%)
2. ✅ 기존 인프라 재사용 (OpenAIProvider)
3. ✅ 투자 대비 효과 최고
4. ✅ 2주 내 완료 가능

---

### 🔄 Phase 1 성과 검증 후 진행 (다음 달)

**Phase 2: RAG**
- 기간: 2-3주
- 비용: 1.5배 (Phase 1 대비)
- ROI: 166%
- 복잡도: 높음

**조건**:
- Phase 1 품질 목표 달성
- 사용자 피드백 긍정적
- 예산 확보

---

### ⚠️ 장기 계획 (3-6개월 후)

**Phase 3: Multi-Agent**
- 기간: 3-4주
- 비용: 3.3배 (Phase 2 대비)
- ROI: 57%
- 복잡도: 매우 높음

**조건**:
- 병원 수 300개 이상
- Phase 2 안정화
- 대규모 자동화 필요성 확인

---

## 다음 단계

### 즉시 실행 가능 (선택)

**Option 1: 온보딩 시스템 안정화** (1-2일)
- 전체 테스트 시나리오 실행
- 버그 수정
- 중간 저장 검증

**Option 2: Phase 0.5 - 재시도 UI 확산** (1-2일)
- Step2/3/AnalysisResult에 재시도 UI 추가
- 사용자 경험 개선

---

### 핵심 구현 (필수)

**Phase 1 시작** (2주)

**Week 1**:
- [ ] DoctorProfile 스키마 추가 (3일)
- [ ] PersonalizedContentAgent 구현 (2일)

**Week 2**:
- [ ] OnboardingService 통합 (2일)
- [ ] Module 등록 (1일)
- [ ] 테스트 & 품질 검증 (4일)

---

## 참고 문서

- `AI_AGENT_PROPOSAL.md`: 초기 제안 (Phase 1-3 개요)
- `AI_AGENT_INTEGRATION_PLAN.md`: 재시도 로직 통합
- `AI_AGENT_ARCHITECTURE_ANALYSIS.md`: 상세 아키텍처 분석
- `ONBOARDING_FINAL_TEST_SCENARIOS.md`: 테스트 시나리오

---

**최종 업데이트**: 2025-01-06  
**다음 리뷰**: Phase 1 완료 후
