# AI Agent Implementation Roadmap
## Phase별 상세 구현 체크리스트

**최종 업데이트**: 2025-01-06  
**현재 Phase**: Phase 0 완료, Phase 0.5 대기 중

---

## 📋 진행 상황 요약

| Phase | 상태 | 시작일 | 완료일 | 소요 시간 |
|-------|------|--------|--------|----------|
| Phase 0 | ✅ 완료 | 2024-12 | 2025-01-05 | 4주 |
| Phase 0.5 | ⏳ 대기 | - | - | 1-2일 (예상) |
| Phase 1 | ⬜ 대기 | - | - | 2주 (예상) |
| Phase 2 | ⬜ 대기 | - | - | 2-3주 (예상) |
| Phase 3 | ⬜ 대기 | - | - | 3-4주 (예상) |

---

## Phase 0: 기본 온보딩 시스템 (✅ 완료)

### ✅ 완료된 작업

- [x] Step 1-4 온보딩 페이지 구현
- [x] OpenAI API Provider 구현
- [x] URL 크롤링 서비스
- [x] 파일 업로드 파서
- [x] Progressive Learning (1-3차 글 생성)
- [x] Analysis Result 페이지
- [x] 재시도 로직 (Backend Exponential Backoff)
- [x] Step4Page 재시도 UI
- [x] Database 스키마 (Hospital, WritingSample)

### 📊 현재 성능

- 품질: 40%
- 스타일 일치도: 20%
- 비용: $0.005/글
- OpenAI Tier: Tier 1 ($5 결제 완료)

---

## Phase 0.5: 재시도 UI 확산 (⏳ 1-2일)

### 목표

모든 OpenAI API 호출 지점에 사용자 친화적 재시도 UI 적용

### Day 1: Step2Page 재시도 적용

#### ✅ 작업 1: SEO 키워드 생성 재시도

**파일**: `/apps/frontend/src/pages/Onboarding/Step2Page.tsx`

**체크리스트**:
```typescript
// 1. Import 추가
- [ ] import { useApiRetry } from '../../hooks/useApiRetry';
- [ ] import { RetryBanner } from '../../components/RetryBanner';

// 2. useApiRetry Hook 사용
- [ ] const {
        execute: generateKeywords,
        loading: keywordsLoading,
        error: keywordsError,
        retryCount: keywordsRetryCount,
        reset: resetKeywords,
      } = useApiRetry();

// 3. API 호출 래핑
- [ ] 기존: await onboardingService.saveStep2(data);
- [ ] 변경: await generateKeywords(() => onboardingService.saveStep2(data));

// 4. UI에 RetryBanner 추가
- [ ] {keywordsError && (
        <RetryBanner
          message="SEO 키워드 생성 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요."
          onRetry={generateKeywords}
          onDismiss={resetKeywords}
          retryCount={keywordsRetryCount}
        />
      )}

// 5. 로딩 상태 처리
- [ ] 버튼 disabled={keywordsLoading || ...}
- [ ] 로딩 스피너 표시
```

**테스트**:
- [ ] SEO 키워드 생성 중 Rate Limit 에러 발생 시 재시도 배너 표시
- [ ] 재시도 버튼 클릭 시 정상 동작
- [ ] 취소 버튼 클릭 시 배너 숨김

#### ✅ 작업 2: 추천 주제 생성 재시도

**체크리스트**:
- [ ] 동일한 패턴으로 추천 주제 생성에도 적용
- [ ] 별도의 `useApiRetry` 인스턴스 사용
- [ ] 에러 메시지: "추천 주제 생성 중 오류가 발생했습니다..."

**테스트**:
- [ ] 추천 주제 생성 중 에러 발생 시 재시도 배너 표시
- [ ] 재시도 동작 확인

### Day 2: Step3Page 재시도 적용

#### ✅ 작업 1: URL 크롤링 재시도

**파일**: `/apps/frontend/src/pages/Onboarding/Step3Page.tsx`

**체크리스트**:
```typescript
// 1. URL 크롤링 재시도
- [ ] useApiRetry Hook 추가
- [ ] handleUrlCrawl 함수 래핑
- [ ] RetryBanner 추가
- [ ] 에러 메시지: "URL 크롤링 중 오류가 발생했습니다..."

// 2. 로딩 상태 처리
- [ ] 크롤링 중 "추가" 버튼 disabled
- [ ] 로딩 스피너 표시
```

**테스트**:
- [ ] 네이버 블로그 크롤링 실패 시 재시도 배너 표시
- [ ] 재시도 버튼 클릭 시 정상 동작

#### ✅ 작업 2: 스타일 분석 재시도

**체크리스트**:
```typescript
// 1. 스타일 분석 재시도
- [ ] useApiRetry Hook 추가
- [ ] handleAnalyze 함수 래핑
- [ ] RetryBanner 추가
- [ ] 에러 메시지: "스타일 분석 중 오류가 발생했습니다..."

// 2. 로딩 상태 처리
- [ ] 분석 중 "다음 단계" 버튼 disabled
- [ ] 로딩 스피너 + 진행 메시지
```

**테스트**:
- [ ] 스타일 분석 중 Rate Limit 에러 발생 시 재시도 배너 표시
- [ ] 재시도 동작 확인

#### ✅ 작업 3 (선택): AnalysisResultPage 재시도

**파일**: `/apps/frontend/src/pages/Onboarding/AnalysisResultPage.tsx`

**체크리스트**:
```typescript
// 1. 분석 결과 로드 재시도
- [ ] useApiRetry Hook 추가
- [ ] loadAnalysisResult 함수 래핑
- [ ] RetryBanner 추가 (페이지 상단)
- [ ] 에러 메시지: "분석 결과 로드 중 오류가 발생했습니다..."

// 2. 로딩 상태 처리
- [ ] 로딩 스피너 전체 페이지
- [ ] 재시도 시 자동 새로고침
```

**테스트**:
- [ ] 분석 결과 로드 실패 시 재시도 배너 표시
- [ ] 재시도 동작 확인

### Phase 0.5 완료 조건

- [ ] Step2Page 재시도 UI 적용 완료
- [ ] Step3Page 재시도 UI 적용 완료
- [ ] AnalysisResultPage 재시도 UI 적용 완료 (선택)
- [ ] 모든 테스트 케이스 통과
- [ ] Rate Limit 에러 시 사용자 친화적 UI 동작 확인

---

## Phase 1: Few-Shot Learning Agent (⬜ 2주)

### 목표

원장 스타일 학습 & 개인화 (품질 40% → 70%)

### Week 1: 인프라 구축 (Day 1-5)

#### Day 1: DoctorProfile 스키마 설계

**파일**: `/apps/backend/prisma/schema.prisma`

**체크리스트**:
```prisma
// 1. DoctorProfile 모델 추가
- [ ] model DoctorProfile {
        id                String   @id @default(uuid())
        hospitalId        String   @unique
        hospital          Hospital @relation(fields: [hospitalId], references: [id])
        
        // 글쓰기 스타일
        tone              String   // "친근한", "전문적인", "유머러스한"
        frequentPhrases   String[] // ["환자분들", "건강하세요"]
        emojiUsage        String   // "frequent", "moderate", "rare"
        sentenceStyle     String   // "short", "medium", "long"
        
        // 글쓰기 통계
        avgSentenceLength Int      // 평균 문장 길이
        avgWordCount      Int      // 평균 글자 수
        techTermDensity   Float    // 전문 용어 밀도
        
        // Few-Shot 샘플
        fewShotSamples    Json?
        
        // 학습 메타데이터
        learningHistory   Json?
        
        createdAt         DateTime @default(now())
        updatedAt         DateTime @updatedAt
        
        @@map("doctor_profiles")
      }

// 2. Hospital 모델에 relation 추가
- [ ] model Hospital {
        ...
        doctorProfile DoctorProfile?
        ...
      }
```

**검증**:
- [ ] Prisma Schema 문법 검증 (`npx prisma validate`)
- [ ] 타입 안전성 확인

#### Day 2: Database 마이그레이션

**작업 디렉토리**: `/apps/backend`

**체크리스트**:
```bash
// 1. 마이그레이션 생성
- [ ] cd apps/backend
- [ ] npx prisma migrate dev --name add_doctor_profile
- [ ] 마이그레이션 파일 확인 (prisma/migrations/XXX_add_doctor_profile/)

// 2. Prisma Client 재생성
- [ ] npx prisma generate

// 3. 타입 확인
- [ ] import { DoctorProfile } from '@prisma/client';
- [ ] TypeScript 컴파일 에러 없음 확인
```

**테스트**:
```typescript
// 3. 수동 테스트 (Prisma Studio 또는 API)
- [ ] const profile = await prisma.doctorProfile.create({
        data: {
          hospitalId: 'test-hospital-id',
          tone: '친근한',
          frequentPhrases: ['환자분들', '건강하세요'],
          emojiUsage: 'moderate',
          sentenceStyle: 'medium',
          avgSentenceLength: 120,
          avgWordCount: 1500,
          techTermDensity: 0.15,
        },
      });
- [ ] 생성 성공 확인
- [ ] relation (hospital) 동작 확인
```

#### Day 3: PersonalizedContentAgent 파일 생성

**파일**: `/apps/backend/src/ai/agents/personalized-content.agent.ts`

**체크리스트**:
```typescript
// 1. 파일 생성 및 기본 구조
- [ ] import { Injectable } from '@nestjs/common';
- [ ] import { PrismaService } from '../../prisma/prisma.service';
- [ ] import { OpenAIProvider } from '../providers/openai.provider';
- [ ] import { DoctorProfile, WritingSample } from '@prisma/client';

// 2. 클래스 선언
- [ ] @Injectable()
- [ ] export class PersonalizedContentAgent {
        constructor(
          private prisma: PrismaService,
          private openai: OpenAIProvider,
        ) {}
      }

// 3. 주요 메서드 스케l톤
- [ ] async generate(params: GenerateParams): Promise<string> {}
- [ ] private buildFewShotPrompt(data: FewShotData): string {}
- [ ] private buildSystemPrompt(profile: DoctorProfile): string {}
- [ ] private async loadDoctorProfile(hospitalId: string): Promise<DoctorProfile> {}
- [ ] private async selectFewShotSamples(profile: DoctorProfile, topic: string): Promise<WritingSample[]> {}
- [ ] private calculateSimilarity(text1: string, text2: string): number {}
- [ ] private async saveGeneration(profile: DoctorProfile, topic: string, content: string): Promise<void> {}
```

**검증**:
- [ ] TypeScript 컴파일 에러 없음
- [ ] Import 경로 확인

#### Day 4: PersonalizedContentAgent 핵심 로직 구현

**메서드 1: `generate()`**

**체크리스트**:
```typescript
// 1. 파라미터 타입 정의
- [ ] interface GenerateParams {
        hospitalId: string;
        topic: string;
        targetLength?: number;
      }

// 2. 메서드 구현
- [ ] DoctorProfile 로드
- [ ] 과거 글 샘플 선택 (3-5개)
- [ ] Few-Shot 프롬프트 구성
- [ ] OpenAI Provider 호출
- [ ] 결과 저장 (학습용)
- [ ] 에러 처리 (과거 글 없음 등)

// 3. 로깅 추가
- [ ] console.log(`[PersonalizedContentAgent] Generating for hospital ${hospitalId}`)
- [ ] console.log(`[PersonalizedContentAgent] Found ${samples.length} samples`)
- [ ] console.log(`[PersonalizedContentAgent] Generation completed`)
```

**메서드 2: `loadDoctorProfile()`**

**체크리스트**:
```typescript
// 1. 프로필 조회
- [ ] const profile = await this.prisma.doctorProfile.findUnique({
        where: { hospitalId },
        include: { hospital: true },
      });

// 2. 프로필 없을 경우 자동 생성
- [ ] if (!profile) {
        profile = await this.createProfileFromWritingStyle(hospitalId);
      }

// 3. createProfileFromWritingStyle() 구현
- [ ] Hospital.writingStyle 데이터 로드
- [ ] DoctorProfile 형식으로 변환
- [ ] prisma.doctorProfile.create()
```

**메서드 3: `selectFewShotSamples()`**

**체크리스트**:
```typescript
// 1. 전체 샘플 로드
- [ ] const allSamples = await this.prisma.writingSample.findMany({
        where: { hospitalId: profile.hospitalId },
        orderBy: { createdAt: 'desc' },
      });

// 2. 빈 샘플 처리
- [ ] if (allSamples.length === 0) {
        throw new Error('과거 글이 없습니다. Step 3을 먼저 완료해주세요.');
      }

// 3. 유사도 계산 (Jaccard Similarity)
- [ ] calculateSimilarity(sample.title + sample.content, topic)

// 4. Top 3-5 선택
- [ ] scored.sort((a, b) => b.similarity - a.similarity).slice(0, 5)
```

**메서드 4: `buildFewShotPrompt()`**

**체크리스트**:
```typescript
// 1. 프롬프트 구조
- [ ] # 원장님의 글쓰기 스타일 특징
- [ ] ## 말투 및 표현
- [ ] ## 문장 스타일
- [ ] ## 과거 작성한 글 예시 (3-5개)
- [ ] ---
- [ ] # 요청사항

// 2. 동적 데이터 삽입
- [ ] ${data.profile.tone}
- [ ] ${data.profile.frequentPhrases.join(', ')}
- [ ] ${data.samples.map((s, i) => ...)}
- [ ] ${data.topic}
```

**검증**:
- [ ] 프롬프트 길이 확인 (너무 길지 않은지)
- [ ] 샘플 글이 정확히 포함되는지

#### Day 5: PersonalizedContentAgent 보조 메서드 구현

**메서드 5: `buildSystemPrompt()`**

**체크리스트**:
```typescript
// 1. System Prompt 구성
- [ ] 당신은 ${profile.hospital.name}의 전문 원장입니다.
- [ ] 전문 분야: ${profile.expertiseAreas.join(', ')}
- [ ] 말투: ${profile.tone}

// 2. 지시사항 추가
- [ ] "위 스타일을 절대 벗어나지 마세요."
```

**메서드 6: `calculateSimilarity()`**

**체크리스트**:
```typescript
// 1. Jaccard Similarity 구현
- [ ] const words1 = new Set(text1.toLowerCase().split(/\s+/));
- [ ] const words2 = new Set(text2.toLowerCase().split(/\s+/));
- [ ] const intersection = new Set([...words1].filter(w => words2.has(w)));
- [ ] const union = new Set([...words1, ...words2]);
- [ ] return intersection.size / union.size;
```

**메서드 7: `saveGeneration()`**

**체크리스트**:
```typescript
// 1. 학습 히스토리 업데이트
- [ ] const history = profile.learningHistory as any || { totalGenerations: 0, generations: [] };
- [ ] history.totalGenerations += 1;
- [ ] history.generations.push({ topic, timestamp, contentLength });

// 2. 최근 100개만 유지
- [ ] if (history.generations.length > 100) {
        history.generations = history.generations.slice(-100);
      }

// 3. DB 업데이트
- [ ] await this.prisma.doctorProfile.update({
        where: { id: profile.id },
        data: { learningHistory: history, updatedAt: new Date() },
      });
```

**Day 5 완료 체크**:
- [ ] 모든 메서드 구현 완료
- [ ] TypeScript 컴파일 에러 없음
- [ ] 로깅 추가 완료

### Week 2: 통합 & 테스트 (Day 6-10)

#### Day 6: AI Module 업데이트

**파일**: `/apps/backend/src/ai/ai.module.ts`

**체크리스트**:
```typescript
// 1. Import 추가
- [ ] import { PersonalizedContentAgent } from './agents/personalized-content.agent';

// 2. providers 배열에 추가
- [ ] providers: [
        OpenAIProvider,
        PersonalizedContentAgent, // NEW!
      ]

// 3. exports 배열에 추가
- [ ] exports: [
        OpenAIProvider,
        PersonalizedContentAgent, // NEW!
      ]
```

**검증**:
- [ ] NestJS 앱 시작 시 에러 없음
- [ ] PersonalizedContentAgent 주입 가능 확인

#### Day 7: OnboardingService 통합

**파일**: `/apps/backend/src/onboarding/onboarding.service.ts`

**체크리스트**:
```typescript
// 1. Import 추가
- [ ] import { PersonalizedContentAgent } from '../ai/agents/personalized-content.agent';

// 2. Constructor에 주입
- [ ] constructor(
        private prisma: PrismaService,
        private openaiProvider: OpenAIProvider,
        private crawlerService: CrawlerService,
        private personalizedContentAgent: PersonalizedContentAgent, // NEW!
      ) {}

// 3. generateStep4Article 메서드 수정
- [ ] try {
        return await this.personalizedContentAgent.generate({
          hospitalId: dto.hospitalId,
          topic: dto.topic,
          targetLength: 1500,
        });
      } catch (error) {
        if (error.message.includes('과거 글이 없습니다')) {
          return await this.generateArticleWithoutSamples(dto);
        }
        throw error;
      }

// 4. Fallback 메서드 추가
- [ ] private async generateArticleWithoutSamples(dto: GenerateStep4Dto) {
        // 기존 Phase 0 로직 유지
      }
```

**검증**:
- [x] TypeScript 컴파일 에러 없음
- [ ] 의존성 주입 확인

#### Day 8: OnboardingModule 업데이트

**파일**: `/apps/backend/src/onboarding/onboarding.module.ts`

**체크리스트**:
```typescript
// 1. AIModule import 확인
- [ ] imports: [
        AIModule, // PersonalizedContentAgent 사용
      ]

// 2. providers에 OnboardingService만 있는지 확인
- [ ] providers: [OnboardingService]

// 3. NestJS 앱 재시작
- [ ] npm run start:dev
- [ ] 에러 없이 시작되는지 확인
```

#### Day 9-10: 통합 테스트

**테스트 1: DoctorProfile 자동 생성**

**체크리스트**:
```typescript
// 1. 새 병원 생성 (Step 1-3 완료)
- [ ] 병원 A: 친근한 말투, 3개 샘플 글
- [ ] 병원 B: 전문적 말투, 5개 샘플 글

// 2. Step 4 샘플 글 생성 요청
- [ ] POST /api/onboarding/step4/generate

// 3. DoctorProfile 자동 생성 확인
- [ ] const profile = await prisma.doctorProfile.findUnique({ where: { hospitalId } });
- [ ] expect(profile).toBeDefined();
- [ ] expect(profile.tone).toBe('친근한');
- [ ] expect(profile.frequentPhrases.length).toBeGreaterThan(0);
```

**테스트 2: Few-Shot 글 생성**

**체크리스트**:
```typescript
// 1. 병원 A 샘플 글 생성
- [ ] const article = await generate({ hospitalId: 'hospital-A', topic: '허리 건강 관리법' });

// 2. 스타일 일치도 확인
- [ ] expect(article).toContain('환자분들');
- [ ] expect(article).toContain('건강하세요');
- [ ] expect(article.length).toBeGreaterThan(1000);

// 3. 품질 점수 확인 (수동 검증)
- [ ] 원장 스타일 반영 정도: 60% 이상
- [ ] 자주 쓰는 표현 사용: 3회 이상
- [ ] 문장 길이: 평균 120자 ± 20자
```

**테스트 3: Fallback 동작 확인**

**체크리스트**:
```typescript
// 1. 과거 글이 없는 병원 생성
- [ ] 병원 C: Step 1-2만 완료, Step 3 건너뜀

// 2. 샘플 글 생성 요청
- [ ] POST /api/onboarding/step4/generate

// 3. Fallback 로직 동작 확인
- [ ] 에러 발생하지 않음
- [ ] 기존 Phase 0 방식으로 생성됨
- [ ] 로그에 "Fallback to Phase 0" 메시지 확인
```

**테스트 4: 학습 히스토리 저장**

**체크리스트**:
```typescript
// 1. 3회 글 생성 (Progressive Learning)
- [ ] 1차 생성
- [ ] 2차 생성
- [ ] 3차 생성

// 2. DoctorProfile 확인
- [ ] const profile = await prisma.doctorProfile.findUnique({ where: { hospitalId } });
- [ ] expect(profile.learningHistory.totalGenerations).toBe(3);
- [ ] expect(profile.learningHistory.generations.length).toBe(3);
```

**테스트 5: 성능 테스트**

**체크리스트**:
```typescript
// 1. 응답 시간 측정
- [ ] const start = Date.now();
- [ ] await generate({ hospitalId, topic });
- [ ] const duration = Date.now() - start;
- [ ] expect(duration).toBeLessThan(20000); // 20초 이내

// 2. 메모리 사용량 확인
- [ ] process.memoryUsage()
- [ ] 메모리 누수 없는지 확인
```

### Phase 1 완료 조건

#### 기능 체크리스트
- [ ] DoctorProfile 스키마 추가 완료
- [ ] PersonalizedContentAgent 구현 완료
- [ ] OnboardingService 통합 완료
- [ ] AI Module 등록 완료
- [ ] 모든 테스트 통과

#### 품질 목표
- [ ] 스타일 일치도: 20% → 60% 이상 (+40%p)
- [ ] 품질 점수: 40% → 70% 이상 (+30%p)
- [ ] 응답 시간: 10-15초 이내
- [ ] 비용: $0.02/글 (4배, 허용 범위)

#### 문서화
- [ ] API 문서 업데이트
- [ ] 코드 주석 추가
- [ ] Phase 1 완료 보고서 작성

---

## Phase 2: RAG Agent (⬜ 2-3주)

### 목표

Vector Store를 활용한 효율적인 과거 글 검색 (품질 70% → 85%)

### Week 1: Vector Store 설정 (Day 1-5)

#### Day 1: Supabase pgvector 설정

**작업**: Supabase SQL Editor에서 실행

**체크리스트**:
```sql
// 1. pgvector extension 활성화
- [ ] create extension if not exists vector;
- [ ] 활성화 확인: select * from pg_extension where extname = 'vector';

// 2. Embedding 테이블 생성
- [ ] create table doctor_content_embeddings (
        id uuid primary key default gen_random_uuid(),
        hospital_id uuid references hospitals(id) on delete cascade,
        writing_sample_id uuid references writing_samples(id) on delete cascade,
        content text not null,
        embedding vector(1536),
        created_at timestamp with time zone default now()
      );

// 3. 인덱스 생성
- [ ] create index on doctor_content_embeddings using hnsw (embedding vector_cosine_ops);
- [ ] create index on doctor_content_embeddings (hospital_id);
- [ ] create unique index on doctor_content_embeddings (writing_sample_id);
```

**검증**:
- [ ] 테이블 생성 확인: `select * from doctor_content_embeddings limit 1;`
- [ ] 인덱스 확인: `\d doctor_content_embeddings`

#### Day 2-3: EmbeddingService 구현

**파일**: `/apps/backend/src/ai/services/embedding.service.ts`

**체크리스트**:
```typescript
// 1. 파일 생성 및 기본 구조
- [ ] import { Injectable } from '@nestjs/common';
- [ ] import { PrismaService } from '../../prisma/prisma.service';
- [ ] import { OpenAIProvider } from '../providers/openai.provider';

// 2. 클래스 선언
- [ ] @Injectable()
- [ ] export class EmbeddingService {
        constructor(
          private prisma: PrismaService,
          private openai: OpenAIProvider,
        ) {}
      }

// 3. embedText() 메서드
- [ ] async embedText(text: string): Promise<number[]> {
        const response = await this.openai.createEmbedding({
          model: 'text-embedding-3-small',
          input: text,
        });
        return response.embedding;
      }

// 4. embedWritingSample() 메서드
- [ ] WritingSample 로드
- [ ] 제목 + 내용 합치기
- [ ] embedText() 호출
- [ ] Raw SQL로 vector 삽입
- [ ] ON CONFLICT 처리 (업데이트)

// 5. findSimilarWritings() 메서드
- [ ] 쿼리 임베딩 생성
- [ ] Vector 검색 (cosine similarity)
- [ ] JOIN으로 WritingSample 가져오기
- [ ] similarity 점수와 함께 반환
```

**OpenAIProvider에 Embedding API 추가**:

**파일**: `/apps/backend/src/ai/providers/openai.provider.ts`

**체크리스트**:
```typescript
// 1. createEmbedding() 메서드 추가
- [ ] async createEmbedding(dto: CreateEmbeddingDto): Promise<CreateEmbeddingResponse> {
        return this.callWithRetry(
          async () => {
            const response = await this.openai.embeddings.create({
              model: dto.model || 'text-embedding-3-small',
              input: dto.input,
            });
            return {
              embedding: response.data[0].embedding,
              model: response.model,
              usage: response.usage,
            };
          },
          'Embedding Generation'
        );
      }

// 2. 타입 정의
- [ ] interface CreateEmbeddingDto {
        model?: string;
        input: string;
      }
- [ ] interface CreateEmbeddingResponse {
        embedding: number[];
        model: string;
        usage: { prompt_tokens: number; total_tokens: number };
      }
```

**검증**:
- [ ] 단위 테스트: `embedText('테스트 문장')` → 1536 차원 벡터 반환
- [ ] 통합 테스트: `embedWritingSample(sampleId)` → DB에 저장 확인

#### Day 4-5: 기존 WritingSample 임베딩

**스크립트**: `/apps/backend/src/scripts/embed-existing-samples.ts`

**체크리스트**:
```typescript
// 1. 스크립트 파일 생성
- [ ] import { NestFactory } from '@nestjs/core';
- [ ] import { AppModule } from '../app.module';
- [ ] import { EmbeddingService } from '../ai/services/embedding.service';

// 2. 메인 함수
- [ ] async function main() {
        const app = await NestFactory.createApplicationContext(AppModule);
        const embeddingService = app.get(EmbeddingService);
        
        // 모든 WritingSample 로드
        const samples = await prisma.writingSample.findMany();
        
        // 배치 처리 (10개씩, Rate Limit 대응)
        for (let i = 0; i < samples.length; i += 10) {
          const batch = samples.slice(i, i + 10);
          await Promise.all(batch.map(s => embeddingService.embedWritingSample(s.id)));
          console.log(`Processed ${Math.min(i + 10, samples.length)}/${samples.length}`);
          await sleep(10000); // 10초 대기 (Rate Limit 방지)
        }
        
        await app.close();
      }

// 3. 실행
- [ ] ts-node src/scripts/embed-existing-samples.ts
```

**검증**:
- [ ] 모든 샘플 임베딩 완료 확인
- [ ] Vector Store 레코드 수 = WritingSample 레코드 수

### Week 2-3: RAG Agent 구현 (Day 6-14)

#### Day 6-8: RAGContentAgent 구현

**파일**: `/apps/backend/src/ai/agents/rag-content.agent.ts`

**체크리스트**:
```typescript
// 1. 파일 생성 및 기본 구조
- [ ] import { Injectable } from '@nestjs/common';
- [ ] import { PrismaService } from '../../prisma/prisma.service';
- [ ] import { OpenAIProvider } from '../providers/openai.provider';
- [ ] import { EmbeddingService } from '../services/embedding.service';

// 2. 클래스 선언
- [ ] @Injectable()
- [ ] export class RAGContentAgent {
        constructor(
          private prisma: PrismaService,
          private openai: OpenAIProvider,
          private embeddingService: EmbeddingService,
        ) {}
      }

// 3. generate() 메서드
- [ ] Vector Store에서 유사 글 검색 (Top 10)
- [ ] DoctorProfile 로드
- [ ] RAG 프롬프트 구성
- [ ] OpenAI Provider 호출
- [ ] 결과 저장

// 4. buildRAGPrompt() 메서드
- [ ] Few-Shot 예시 (Top 5)
- [ ] 추가 컨텍스트 (6-10위)
- [ ] 스타일 특징
- [ ] 요청사항
```

**검증**:
- [ ] TypeScript 컴파일 에러 없음
- [ ] EmbeddingService 주입 확인

#### Day 9-10: AI Module 업데이트

**파일**: `/apps/backend/src/ai/ai.module.ts`

**체크리스트**:
```typescript
// 1. Import 추가
- [ ] import { EmbeddingService } from './services/embedding.service';
- [ ] import { RAGContentAgent } from './agents/rag-content.agent';

// 2. providers 배열 업데이트
- [ ] providers: [
        OpenAIProvider,
        EmbeddingService, // NEW!
        PersonalizedContentAgent,
        RAGContentAgent, // NEW!
      ]

// 3. exports 배열 업데이트
- [ ] exports: [
        OpenAIProvider,
        EmbeddingService, // NEW!
        PersonalizedContentAgent,
        RAGContentAgent, // NEW!
      ]
```

#### Day 11-12: OnboardingService 업데이트

**파일**: `/apps/backend/src/onboarding/onboarding.service.ts`

**체크리스트**:
```typescript
// 1. Import 추가
- [ ] import { RAGContentAgent } from '../ai/agents/rag-content.agent';

// 2. Constructor에 주입
- [ ] constructor(
        ...
        private ragContentAgent: RAGContentAgent, // NEW!
      ) {}

// 3. generateStep4Article 메서드 수정
- [ ] // Phase 2: RAG Agent 사용
      try {
        return await this.ragContentAgent.generate({
          hospitalId: dto.hospitalId,
          topic: dto.topic,
        });
      } catch (error) {
        // Fallback to Phase 1
        return await this.personalizedContentAgent.generate(...);
      }
```

#### Day 13-14: 통합 테스트

**테스트 1: Vector 검색 정확도**

**체크리스트**:
```typescript
// 1. 유사 글 검색
- [ ] const similar = await embeddingService.findSimilarWritings(
        hospitalId,
        '허리 건강 관리법',
        10
      );

// 2. 검증
- [ ] expect(similar.length).toBeGreaterThan(0);
- [ ] expect(similar[0].similarity).toBeGreaterThan(0.5);
- [ ] similar 중 '허리', '건강' 키워드 포함 확인
```

**테스트 2: RAG 글 생성**

**체크리스트**:
```typescript
// 1. 글 생성
- [ ] const article = await ragContentAgent.generate({
        hospitalId,
        topic: '척추 측만증 치료법',
      });

// 2. 품질 검증
- [ ] expect(article.length).toBeGreaterThan(1000);
- [ ] 스타일 일치도: 75% 이상
- [ ] 관련 과거 글 내용 반영 확인
```

**테스트 3: Phase 1 vs Phase 2 비교**

**체크리스트**:
```typescript
// 1. 동일 주제로 양쪽 생성
- [ ] const phase1 = await personalizedContentAgent.generate(...);
- [ ] const phase2 = await ragContentAgent.generate(...);

// 2. 품질 비교
- [ ] Phase 1 품질: 70%
- [ ] Phase 2 품질: 85% (+15%p 확인)
- [ ] Phase 2가 더 관련성 높은 내용 포함
```

### Phase 2 완료 조건

#### 기능 체크리스트
- [ ] Supabase pgvector 설정 완료
- [ ] EmbeddingService 구현 완료
- [ ] RAGContentAgent 구현 완료
- [ ] 기존 샘플 임베딩 완료
- [ ] OnboardingService 통합 완료

#### 품질 목표
- [ ] 품질: 70% → 85% 이상 (+15%p)
- [ ] 검색 정확도: 80% 이상
- [ ] 응답 시간: 15-20초 이내
- [ ] 비용: $0.03/글 (1.5배, 허용 범위)

#### 문서화
- [ ] RAG 아키텍처 문서 작성
- [ ] Vector 검색 가이드 작성
- [ ] Phase 2 완료 보고서 작성

---

## Phase 3: Multi-Agent System (⬜ 3-4주)

### 목표

Agent 간 협업으로 품질 자동 검증 (품질 85% → 95%)

### Week 1: LangGraph 설정 (Day 1-7)

#### Day 1-2: LangGraph 설치 및 설정

**작업 디렉토리**: `/apps/backend`

**체크리스트**:
```bash
// 1. 패키지 설치
- [ ] npm install @langchain/langgraph @langchain/core langchain

// 2. 타입 정의 확인
- [ ] import { StateGraph } from "@langchain/langgraph";
- [ ] TypeScript 컴파일 에러 없음
```

#### Day 3-5: MultiAgentOrchestrator 구현

**파일**: `/apps/backend/src/ai/orchestrator/multi-agent.orchestrator.ts`

**체크리스트**:
```typescript
// 1. State 인터페이스 정의
- [ ] interface ContentState {
        topic: string;
        hospitalId: string;
        research: string;
        draft: string;
        styled: string;
        review: { score: number; feedback: string };
        final: string;
      }

// 2. 클래스 선언
- [ ] @Injectable()
- [ ] export class MultiAgentOrchestrator {
        private workflow: StateGraph<ContentState>;
        constructor(
          private researchAgent: ResearchAgent,
          private writerAgent: WriterAgent,
          private styleAgent: StyleAgent,
          private reviewAgent: ReviewAgent,
        ) {
          this.buildWorkflow();
        }
      }

// 3. buildWorkflow() 메서드
- [ ] workflow.addNode("research", researchHandler)
- [ ] workflow.addNode("writer", writerHandler)
- [ ] workflow.addNode("style", styleHandler)
- [ ] workflow.addNode("review", reviewHandler)
- [ ] workflow.addEdge("research", "writer")
- [ ] workflow.addEdge("writer", "style")
- [ ] workflow.addEdge("style", "review")
- [ ] workflow.addConditionalEdge("review", scoreCheck)
- [ ] workflow.setEntryPoint("research")

// 4. generate() 메서드
- [ ] const app = this.workflow.compile();
- [ ] const result = await app.invoke(params);
- [ ] return result.final;
```

#### Day 6-7: Agent 인터페이스 정의

**파일**: `/apps/backend/src/ai/agents/base.agent.ts`

**체크리스트**:
```typescript
// 1. BaseAgent 추상 클래스
- [ ] export abstract class BaseAgent {
        abstract execute(input: any): Promise<any>;
      }

// 2. 각 Agent 인터페이스
- [ ] interface ResearchAgentInput { topic: string; }
- [ ] interface WriterAgentInput { topic: string; research: string; }
- [ ] interface StyleAgentInput { draft: string; hospitalId: string; }
- [ ] interface ReviewAgentInput { content: string; }
```

### Week 2-3: 개별 Agent 구현 (Day 8-18)

#### Day 8-10: ResearchAgent 구현

**파일**: `/apps/backend/src/ai/agents/research.agent.ts`

**체크리스트**:
```typescript
// 1. 클래스 선언
- [ ] @Injectable()
- [ ] export class ResearchAgent extends BaseAgent {
        constructor(private openai: OpenAIProvider) { super(); }
      }

// 2. execute() 메서드
- [ ] 주제 분석
- [ ] 최신 의료 정보 검색 (Google Search API 또는 Serp API)
- [ ] 결과 요약
- [ ] OpenAI API 호출 (정보 정리)

// 3. 검증
- [ ] 단위 테스트: research('허리 건강') → 관련 정보 반환
```

#### Day 11-13: WriterAgent 구현

**파일**: `/apps/backend/src/ai/agents/writer.agent.ts`

**체크리스트**:
```typescript
// 1. 클래스 선언
- [ ] @Injectable()
- [ ] export class WriterAgent extends BaseAgent {
        constructor(
          private openai: OpenAIProvider,
          private ragContentAgent: RAGContentAgent, // 재사용!
        ) { super(); }
      }

// 2. execute() 메서드
- [ ] Research 결과 활용
- [ ] RAGContentAgent 사용 (재사용)
- [ ] 초안 생성

// 3. 검증
- [ ] 단위 테스트: write({ topic, research }) → 초안 반환
```

#### Day 14-15: StyleAgent 구현

**파일**: `/apps/backend/src/ai/agents/style.agent.ts`

**체크리스트**:
```typescript
// 1. 클래스 선언
- [ ] @Injectable()
- [ ] export class StyleAgent extends BaseAgent {
        constructor(
          private prisma: PrismaService,
          private openai: OpenAIProvider,
        ) { super(); }
      }

// 2. execute() 메서드
- [ ] DoctorProfile 로드
- [ ] 초안에 스타일 적용
- [ ] 말투, 표현, 문장 길이 조정

// 3. 검증
- [ ] 단위 테스트: style({ draft, hospitalId }) → 스타일 적용된 글 반환
```

#### Day 16-18: ReviewAgent 구현

**파일**: `/apps/backend/src/ai/agents/review.agent.ts`

**체크리스트**:
```typescript
// 1. 클래스 선언
- [ ] @Injectable()
- [ ] export class ReviewAgent extends BaseAgent {
        constructor(private openai: OpenAIProvider) { super(); }
      }

// 2. execute() 메서드
- [ ] 콘텐츠 품질 평가 (6가지 차원)
- [ ] 점수 계산 (0.0 - 1.0)
- [ ] 피드백 생성
- [ ] { score, feedback } 반환

// 3. 검증
- [ ] 단위 테스트: review(content) → { score: 0.85, feedback: '...' }
```

### Week 4: 통합 & 테스트 (Day 19-24)

#### Day 19-20: AI Module 최종 업데이트

**파일**: `/apps/backend/src/ai/ai.module.ts`

**체크리스트**:
```typescript
// 1. Import 추가
- [ ] import { MultiAgentOrchestrator } from './orchestrator/multi-agent.orchestrator';
- [ ] import { ResearchAgent } from './agents/research.agent';
- [ ] import { WriterAgent } from './agents/writer.agent';
- [ ] import { StyleAgent } from './agents/style.agent';
- [ ] import { ReviewAgent } from './agents/review.agent';

// 2. providers 배열 최종
- [ ] providers: [
        OpenAIProvider,
        EmbeddingService,
        PersonalizedContentAgent,
        RAGContentAgent,
        ResearchAgent, // NEW!
        WriterAgent, // NEW!
        StyleAgent, // NEW!
        ReviewAgent, // NEW!
        MultiAgentOrchestrator, // NEW!
      ]

// 3. exports 배열 최종
- [ ] exports: [
        OpenAIProvider,
        EmbeddingService,
        PersonalizedContentAgent,
        RAGContentAgent,
        MultiAgentOrchestrator, // NEW!
      ]
```

#### Day 21-22: OnboardingService 최종 업데이트

**파일**: `/apps/backend/src/onboarding/onboarding.service.ts`

**체크리스트**:
```typescript
// 1. Import 추가
- [ ] import { MultiAgentOrchestrator } from '../ai/orchestrator/multi-agent.orchestrator';

// 2. Constructor에 주입
- [ ] constructor(
        ...
        private multiAgentOrchestrator: MultiAgentOrchestrator, // NEW!
      ) {}

// 3. generateStep4Article 최종 버전
- [ ] // Phase 3: Multi-Agent System 사용
      try {
        return await this.multiAgentOrchestrator.generate({
          hospitalId: dto.hospitalId,
          topic: dto.topic,
        });
      } catch (error) {
        // Fallback to Phase 2
        return await this.ragContentAgent.generate(...);
      }
```

#### Day 23-24: 통합 테스트

**테스트 1: 워크플로우 동작 확인**

**체크리스트**:
```typescript
// 1. 전체 워크플로우 실행
- [ ] const result = await multiAgentOrchestrator.generate({
        hospitalId,
        topic: '목 디스크 예방법',
      });

// 2. 각 단계 확인
- [ ] Research Agent 실행 확인 (로그)
- [ ] Writer Agent 실행 확인
- [ ] Style Agent 실행 확인
- [ ] Review Agent 실행 확인

// 3. 결과 검증
- [ ] expect(result.length).toBeGreaterThan(1000);
- [ ] expect(result).toBeDefined();
```

**테스트 2: 품질 자동 검증**

**체크리스트**:
```typescript
// 1. 저품질 초안 생성 (의도적)
- [ ] Mock WriterAgent (품질 낮은 글 반환)

// 2. Review Agent 실행
- [ ] score < 0.8 확인

// 3. 재작성 트리거 확인
- [ ] WriterAgent 재호출 확인 (로그)
- [ ] 최종 결과 품질 향상 확인
```

**테스트 3: Phase 2 vs Phase 3 비교**

**체크리스트**:
```typescript
// 1. 동일 주제로 양쪽 생성
- [ ] const phase2 = await ragContentAgent.generate(...);
- [ ] const phase3 = await multiAgentOrchestrator.generate(...);

// 2. 품질 비교
- [ ] Phase 2 품질: 85%
- [ ] Phase 3 품질: 95% (+10%p 확인)
- [ ] Phase 3가 더 일관성 높음
```

### Phase 3 완료 조건

#### 기능 체크리스트
- [ ] LangGraph 워크플로우 구축 완료
- [ ] 4개 Agent 구현 완료 (Research, Writer, Style, Review)
- [ ] MultiAgentOrchestrator 구현 완료
- [ ] OnboardingService 통합 완료
- [ ] 모든 테스트 통과

#### 품질 목표
- [ ] 품질: 85% → 95% 이상 (+10%p)
- [ ] 일관성: 95% 이상
- [ ] 자동 품질 검증 동작 확인
- [ ] 응답 시간: 30-60초 이내
- [ ] 비용: $0.10/글 (3.3배, 허용 범위)

#### 문서화
- [ ] Multi-Agent 아키텍처 문서 작성
- [ ] LangGraph 워크플로우 다이어그램
- [ ] Phase 3 완료 보고서 작성
- [ ] 전체 시스템 최종 문서화

---

## 📝 체크리스트 사용 방법

### 개발 중

```markdown
- [ ] 작업 시작 전: Phase 선택
- [ ] 작업 중: Day별 체크리스트 순차 진행
- [ ] 각 항목 완료 시: [ ] → [x] 변경
- [ ] 문제 발생 시: 체크리스트에 메모 추가
```

### 리뷰 시

```markdown
- [ ] Phase 완료 후: "완료 조건" 모두 충족 확인
- [ ] 품질 목표 달성 확인
- [ ] 다음 Phase 진행 여부 결정
```

### 보고 시

```markdown
- [ ] 진행 상황 요약 테이블 업데이트
- [ ] 완료된 체크리스트 개수 / 전체 개수
- [ ] 남은 시간 예상
- [ ] 발견된 이슈 리스트
```

---

**최종 업데이트**: 2025-01-06  
**다음 업데이트**: Phase 0.5 완료 후
