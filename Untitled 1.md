# Survey DTO 및 Schema 검토 보고서

  

**작성일**: 2026-01-23  

**목적**: Survey DTO와 Schema의 불필요한 필드 검토 및 PM 플로우 일치성 확인

  

---

  

## 1. Survey Schema 검토

  

### 현재 Schema (prisma/schema.prisma)

  

```prisma

model Survey {

  id          String      @id @default(uuid())

  hospitalId  String      @map("hospital_id")

  title       String

  description String?     @db.Text

  surveyType  SurveyType  @default(MONTHLY)

  month       Int?        // 1-12 (MONTHLY일 때 필수)

  year        Int?        // 2026 (MONTHLY일 때 필수)

  questions   Json        // 설문 질문 (JSON) - q1-q5

  responses   Json        // 설문 응답 (JSON) - q1-q5 응답

  message     String?     @db.Text  // q6: 유저가 관리자에게 남기는 메시지

  status      String      @default("active") // active, completed, archived

  createdBy   String      @map("created_by") // Admin ID

  hospital Hospital  @relation(fields: [hospitalId], references: [id])

  contents Content[]

  creator  User      @relation("SurveyCreator", fields: [createdBy], references: [id])

  createdAt DateTime @default(now()) @map("created_at")

  updatedAt DateTime @updatedAt @map("updated_at")

  @@unique([hospitalId, year, month, surveyType])

  @@index([hospitalId, year, month])

  @@index([status])

  @@index([surveyType])

}

```

  

### 필드 분석

  

| 필드 | 타입 | 필수 | 용도 | PRD 일치 | 비고 |

|------|------|------|------|----------|------|

| `id` | String (UUID) | ✅ | 고유 ID | ✅ | 필요 |

| `hospitalId` | String | ✅ | 병원 연결 | ✅ | 필요 |

| `title` | String | ✅ | 설문 제목 | ✅ | 필요 ("2026년 1월 월간 설문") |

| `description` | String? | ❌ | 설문 설명 | ⚠️ | 선택사항 (사용 여부 확인 필요) |

| `surveyType` | SurveyType | ✅ | 설문 타입 | ✅ | 필요 (MONTHLY, ONBOARDING) |

| `month` | Int? | ⚠️ | 월 (1-12) | ✅ | MONTHLY일 때 필수 |

| `year` | Int? | ⚠️ | 년도 | ✅ | MONTHLY일 때 필수 |

| `questions` | Json | ✅ | q1-q5 질문 | ✅ | 필요 |

| `responses` | Json | ✅ | q1-q5 응답 | ✅ | 필요 |

| `message` | String? | ❌ | q6 메시지 | ⚠️ | PRD에 명시되지 않음 (구현됨) |

| `status` | String | ✅ | 상태 | ✅ | 필요 (active, completed, archived) |

| `createdBy` | String | ✅ | 생성자 (Admin) | ✅ | 필요 |

| `createdAt` | DateTime | ✅ | 생성 시간 | ✅ | 필요 |

| `updatedAt` | DateTime | ✅ | 수정 시간 | ✅ | 필요 |

  

---

  

## 2. Survey DTO 검토

  

### CreateMonthlySurveyDto

  

```typescript

export class CreateMonthlySurveyDto {

  hospitalId: string;      // ✅ 필요

  month: number;           // ✅ 필요 (1-12)

  year: number;            // ✅ 필요 (2025+)

  title: string;           // ✅ 필요 ("2026년 1월 월간 설문")

  description?: string;    // ⚠️ 선택사항 (사용 여부 확인 필요)

  createdBy?: string;       // ✅ 필요 (Controller에서 자동 추가)

}

```

  

**검토 결과**:

- ✅ 모든 필드 필요

- ⚠️ `description`: 선택사항이지만 실제 사용 여부 확인 필요

  

---

  

### MonthlySurveyResponseDto (q1-q5)

  

```typescript

export class MonthlySurveyResponseDto {

  themeCount: number;              // ✅ q1: 주제글 갯수 (1 or 2)

  selectedTopics: string[];        // ✅ q2: 주제 선택 (TopicTemplate ID 배열)

  customTopics?: string[];        // ✅ q2: 기타 주제 (직접 입력)

  targetAudience: string[];        // ✅ q3: 타겟 독자

  goals?: string[];               // ✅ q4: 이번달 목표 (선택)

  forbiddenExpressions?: string[]; // ✅ q5: 금지 문구

  emphasizedPhrases?: string[];    // ✅ q5: 강조 문구

}

```

  

**검토 결과**:

- ✅ 모든 필드 필요 (PRD q1-q5와 일치)

- ✅ 구조 정확함

  

---

  

### SubmitMonthlySurveyDto

  

```typescript

export class SubmitMonthlySurveyDto {

  surveyId: string;                    // ✅ 필요

  response: MonthlySurveyResponseDto;   // ✅ 필요 (q1-q5)

  message?: string;                     // ✅ q6: 유저가 관리자에게 남기는 메시지

  timeSpent?: number;                   // ⚠️ 선택사항 (초) - 분석용?

}

```

  

**검토 결과**:

- ✅ `surveyId`, `response`: 필요

- ✅ `message`: q6 (구현됨, PRD에 명시되지 않음)

- ⚠️ `timeSpent`: 선택사항 (분석/통계용으로 보임, 사용 여부 확인 필요)

  

---

  

## 3. 불필요한 필드 후보

  

### 후보 1: `description` (Survey Schema)

  

**현재 상태**: 선택사항 (`String?`)  

**사용 여부**: 

- `CreateMonthlySurveyDto`에 포함됨

- 실제 사용 여부 불명확

  

**권장사항**:

- 사용하지 않으면 제거

- 사용한다면 PRD에 명시

  

---

  

### 후보 2: `timeSpent` (SubmitMonthlySurveyDto)

  

**현재 상태**: 선택사항 (`number?`)  

**용도**: 설문 응답 소요 시간 (초)  

**사용 여부**: 분석/통계용으로 보이지만 실제 사용 여부 불명확

  

**권장사항**:

- 분석이 필요하면 유지

- 불필요하면 제거

  

---

  

## 4. 누락된 필드 검토

  

### q6: 메시지 필드

  

**현재 상태**: ✅ 구현됨 (`Survey.message`, `SubmitMonthlySurveyDto.message`)  

**PRD 상태**: ❌ PRD에 명시되지 않음  

**권장사항**: PRD에 q6 추가 또는 `message` 필드를 q6로 명시

  

---

  

## 5. 최종 권장사항

  

### 유지할 필드

- ✅ 모든 필드 유지 (현재 구조가 적절함)

  

### 확인 필요

- ⚠️ `description`: 실제 사용 여부 확인

- ⚠️ `timeSpent`: 분석/통계 필요 여부 확인

  

### 문서화 필요

- 📝 q6 (`message` 필드)를 PRD에 추가

  

---

  

## 6. Survey - Hospital 관계 확인

  

**질문**: Survey.id와 Hospital.id가 일치해야 하나?

  

**답변**: ❌ **아니요**

  

- `Survey.id`: 설문의 고유 ID (UUID)

- `Survey.hospitalId`: Hospital.id를 참조 (Foreign Key)

- 관계: 하나의 병원은 여러 설문을 가질 수 있음 (월별 설문)

- 제약: `@@unique([hospitalId, year, month, surveyType])` - 같은 병원, 같은 년월, 같은 타입의 설문은 1개만

  

**예시**:

```

Hospital.id = "hospital-123"

  ├─ Survey.id = "survey-001" (hospitalId: "hospital-123", year: 2026, month: 1)

  ├─ Survey.id = "survey-002" (hospitalId: "hospital-123", year: 2026, month: 2)

  └─ Survey.id = "survey-003" (hospitalId: "hospital-123", year: 2026, month: 3)

```

  

---

  

## 7. Feature 3 테스트 수정 완료

  

**변경 사항**:

- ✅ PM 플로우 테스트 추가 (제목 생성 → 본문 생성)

- ✅ 기존 일괄 생성 테스트 유지 (계층 구조 검증용)

- ✅ `generateFromTitle`에 `type`, `parentId`, `hashtag` 필드 추가

  

**테스트 구조**:

1. PM 플로우 테스트 (새로 추가)

   - Step 1: 제목 생성 (`POST /api/ai/generate-titles`)

   - Step 2: 주제글 본문 생성 (`POST /api/ai/generate-from-title`)

   - Step 3: 일반글 본문 생성 (5개)

   - Step 4: 계층 구조 조회 확인

2. 일괄 생성 테스트 (기존 유지)

   - `POST /api/contents/bulk-create` (계층 구조 검증용)