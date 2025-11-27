# Module 4 — Practical Tips for Building Agentic AI

Agentic AI 워크플로우를 실제로 구축할 때 필요한 실전적 팁과 개발 프로세스 전반의 효율화 전략을 다룬다.  
핵심은 **빠른 프로토타입 → 문제 탐지 → Eval 구성 → Error Analysis → Component-level 개선 → 비용·지연시간 최적화 → 반복 개선** 흐름이다.

---

## 1. 빠른 프로토타입의 중요성

### 1.1 왜 빠르게 만들어야 하는가

- Agentic workflow는 **사전에 어디가 잘 될지, 어디가 실패할지** 판단하기 어렵다.
    
- 너무 오래 설계만 하면 오히려 비효율적.
    
- “안전하게” 기본적인 시스템을 빠르게 만든 후 직접 관찰하는 것이 핵심.
    

### 1.2 초기 프로토타입의 역할

- 작은 규모라도 실제 입력·출력 결과를 보며 문제 구간을 탐색한다.
    
- 초기 분석을 바탕으로 **어디에 평가(Eval)를 먼저 적용할지** 결정할 수 있다.
    

---

## 2. 예시 1 — 송장(invoice) 정보 추출 워크플로우

### 2.1 문제 예시

- 시스템은 4개 필수 필드를 추출 후 데이터베이스에 저장.
    
- 테스트로 **10~20개의 송장 문서**를 수작업으로 확인.
    

### 2.2 발견된 문제

예)

- Invoice 1: 정상
    
- Invoice 2: `invoice date`와 `due date` 혼동
    
- Invoice 3, 4: 정상  
    → 여러 문서에서 **날짜 혼동** 오류가 반복됨을 발견.
    

### 2.3 중요한 판단

- 오류가 많이 발생하는 부분이 있으면, 해당 항목(여기서는 **due date**)에 대해 별도 Eval을 만들기 시작한다.
    

---

## 3. Eval(평가 세트) 구성하기 (Invoice 예시)

### 3.1 Eval 데이터셋 구축

- 10~20개의 송장을 수동으로 열고 **정답(ground truth)을 직접 기록**한다.  
    예: `2025-08-20` 형식으로 표준화.
    

### 3.2 LLM 출력 포맷 강제

- Prompt에서 LLM에게 반드시 `YYYY-MM-DD` 형식으로 due date를 출력하라고 지시.
    
- 정규표현식(Regex)으로 날짜 추출 가능하도록 구조화.
    

### 3.3 Eval 실행

- LLM 출력과 수작업 ground truth가 동일한지 비교.
    
- 개선 시 마다 accuracy가 올라가는지 측정.
    

### 3.4 핵심 포인트

- **작은 Eval(약 20개)**로도 방향성을 판단할 수 있다.
    
- Eval은 고정된 것이 아니라 **필요하면 점진적으로 확장**한다.
    

---

## 4. 예시 2 — Instagram 광고용 Caption 생성

### 4.1 문제 예시

- 이미지 기반으로 10단어 이하의 마케팅 문구 생성.
    
- 결과가 만족스럽지만 **자주 길이를 초과**함.
    

예:

- Sunglasses → 17 words
    
- Coffee machine → OK
    
- Blue shirt → 14 words
    
- Blender → 11 words
    

### 4.2 해결 방향

- 길이 준수 여부를 측정하는 Eval 구축.
    

### 4.3 Length Eval 구성법

1. 테스트 예시 10~20개 준비(여러 제품 이미지·프롬프트)
    
2. 각 예시를 시스템에 통과
    
3. Python으로 단어 수 계산
    
4. `word_count <= 10` 여부를 측정
    

여기서는 per-example ground truth가 없음.  
→ 목표는 “10 단어 이하”라는 **고정 조건**.

---

## 5. 예시 3 — Research Agent: 핵심 포인트 누락 문제

### 5.1 문제 예시

- “Latest breakthroughs in black hole science” 요청 → 중요한 주요 결과 일부 누락
    
- “Renting vs buying in Seattle” → 양호
    
- “Robotics for harvesting fruits” → 중요한 장비 회사 언급 누락
    

### 5.2 평가 전략

- 각 주제별로 **3~5개의 “gold standard discussion points”** 정의.
    
- Eval 구성 시 per-example ground truth가 필요.
    

### 5.3 LLM-as-a-judge 활용

- 단순 패턴 매칭으로는 핵심 논점 포함 여부 판단 어려움.
    
- LLM에게 JSON 형태로 점수 계산을 요청.
    

JSON 예시:

```json
{
  "score": 3,
  "explanation": "Included points 1, 3, 5"
}
```

---

## 6. Eval 유형 2x2 매트릭스

||Per-example Ground Truth 있음|없음|
|---|---|---|
|**Objective (code 기반)**|Invoice due date accuracy|Caption length check|
|**LLM-as-a-judge**|Research agent talking points|Chart rubric 평가|

### 6.1 용어

- **End-to-end eval**: 입력(prompt)부터 최종 출력까지 전체 흐름 평가
    
- **Trace**: workflow 실행 시 각 단계별 출력의 전체 모음
    
- **Span**: 한 단계(step)의 출력
    

---

## 7. End-to-end Eval 설계 팁

### 7.1 "Quick and dirty" eval도 충분히 가치 있음

- 10~20개만으로도 초기 방향성 판단 가능.
    
- 점차 eval을 개선하고 확장해야 함.
    

### 7.2 Eval이 잘못된 경우

- 사람이 보기에 개선된 버전인데 eval metric이 개선되지 않는 경우  
    → Eval 자체가 부족한 것이므로 다시 설계 필요.
    

### 7.3 인간 전문가 대비 부족한 부분을 찾는 전략

- 인간이 항상 수행하는 일부 태스크에서 성능이 낮은 구간이 개선 포인트.
    

---

# Module 4 Part 2 — Error Analysis (첫 번째 상세 영상)

## 1. 에러 분석의 필요성

- Agentic workflow에는 많은 구성 요소가 있고,  
    **어디를 개선해야 성능 향상이 가장 큰지 판단하는 것이 핵심**이다.
    
- 단순한 “감”으로 개선 포인트를 정하면 수주~수개월을 허비할 수 있음.
    

---

## 2. Research Agent 예시 — 어떤 컴포넌트가 문제인가?

### 2.1 가능한 오류 지점

1. LLM이 잘못된 검색어 생성
    
2. 검색 엔진 자체 문제
    
3. LLM이 검색 결과 중 좋은 문서 선정 실패
    
4. Web fetch 오류
    
5. LLM이 문서 내용을 잘 반영하지 못함
    

### 2.2 Trace 기반 분석

- 각 단계의 출력(spans)을 직접 확인.
    
- 전문가의 판단과 비교하여 어디서 품질 저하가 발생했는지 식별.
    

---

## 3. 에러 분석 절차 (Research Agent)

### 3.1 문제 있는 예시만 모으기

- 모든 예시를 평가하는 대신 **문제가 발생한 예시만 집중 분석**.
    

### 3.2 스프레드시트 기반 분석

예시 항목:

- Search terms 품질
    
- Search results 품질
    
- Document selection 품질
    
- Essay synthesis 품질
    

### 3.3 예시 결과

- Search terms 오류: 5%
    
- Search results 오류: 45%  
    → 검색 엔진/검색 세팅을 조정할 이유가 높음.
    

---

# Module 4 Part 3 — Error Analysis Additional Examples

## 1. Invoice Processing Error Analysis

### 1.1 두 가지 주요 오류 후보

1. PDF-to-text 변환이 날짜를 잘못 추출
    
2. LLM이 올바른 날짜를 선택하지 못함
    

### 1.2 분석 절차

- 오류가 발생한 10~100개 문서만 수집.
    
- 각 문서별로 어떤 컴포넌트가 오류를 유발했는지 분리.
    
- 스프레드시트로 빈도 카운트.
    

### 1.3 결과 해석

- 대부분의 오류가 **LLM의 date extraction 문제**에서 기인.  
    → 여기부터 개선해야 효율적.
    

---

## 2. Customer Email Response Workflow Example

### 2.1 가능한 실패 지점

- LLM이 잘못된 DB query 생성
    
- DB 자체의 데이터가 잘못됨
    
- LLM이 최종 이메일을 부정확하게 작성
    

### 2.2 분석 결과 예시

- Query generation: 주요 오류 원인 (75%)
    
- DB 오류: 소수
    
- Email drafting 오류: 일부 존재
    

→ 개선 우선순위: Query generation → Email drafting → DB 정합성

### 2.3 핵심

- Error analysis는 **개발 우선순위를 명확히** 해준다.
    
- 많은 팀이 “아무거나 먼저 고치는” 실수를 한다.
    

---

# Module 4 Part 4 — Component-level Evals

## 1. 왜 Component-level Eval인가?

- End-to-end eval은 좋지만 비용·시간이 크다.
    
- 다른 컴포넌트에서 발생하는 random noise 때문에 개선 효과를 보기 어렵다.
    

### 1.1 예: Web search component만 평가하기

- 각 query별 “gold standard web resources” 리스트 마련.
    
- 여러 검색 엔진(Google, Bing, DuckDuckGo, U.com 등) 비교.
    
- Standard IR metrics(F1 score 등)로 겹침 비율 비교.
    

### 1.2 장점

- 빠른 피드백
    
- 팀 단위 개발에 적합
    
- End-to-end eval을 보조하며 전체 성능 향상 속도를 높임
    

---

# Module 4 Part 5 — Improving Components

## 1. Non-LLM Components 개선 방법

- Web search: 결과 수, 날짜 범위, 엔진 교체
    
- Retrieval (RAG): chunk size, similarity threshold 조정
    
- ML model (vision/audio): detection threshold 조정
    

## 2. LLM Components 개선 방법

1. Prompt 개선
    
2. Few-shot prompting 추가
    
3. 모델 변경
    
4. 복잡한 단계를 다단계로 분해
    
5. Fine-tuning 수행
    
    - 비용·시간 많이 듦
        
    - 마지막 수 퍼센트의 성능 향상에 사용
        

---

# Module 4 Part 6 — 모델 직관(honing intuition) 기르기

## 1. 왜 필요?

- 모델마다 강점이 다름
    
    - 어떤 모델은 instruction-following에 강함
        
    - 어떤 모델은 factual Q&A에 강함
        
    - 어떤 모델은 코딩에 강함
        

## 2. PII 제거 예시

### 2.1 작은 모델(Llama 3.1 8B)

- 개인 정보 일부 누락
    
- 포맷 오류
    
- 제대로 redaction하지 못함
    

### 2.2 큰 모델(frontier model)

- 모든 PII 식별
    
- 정확한 redaction
    
- 지시에 정확히 따름
    

### 2.3 직관 키우는 방법

- 다양한 모델 실험
    
- 개인 eval 셋을 모델 비교에 활용
    
- 다른 사람들의 prompt를 적극적으로 읽기
    
- 소스코드/오픈소스 패키지에서 prompt 패턴 관찰
    

---

# Module 4 Part 7 — 비용(Cost)과 지연(Latency) 최적화

## 1. 우선순위

- 초기에 가장 중요한 것은 **품질(quality)**  
    → 그 다음 Cost / Latency
    

## 2. Latency Benchmarking

- 각 Step 시간 측정  
    예:
    
    - LLM(search terms): 7s
        
    - Web search: 5s
        
    - Fetch: 3s
        
    - Filter: 11s
        
    - Final essay: 18s
        

### 개선 방향

- 병렬 처리 가능 여부 확인
    
- 더 빠른 LLM 사용
    
- 빠른 inference를 제공하는 provider 찾기
    

---

## 3. Cost Benchmarking

- Step별 비용 측정  
    예:
    
    - LLM tokens: 0.04 cents
        
    - Web search API: 1.6 cents
        
    - PDF-to-text 비용
        

### 개선 전략

- 동일 품질에서 더 싸고 빠른 대체 컴포넌트 적용
    
- token 수나 context 길이 줄이기
    
- 모델 크기 변경
    

---

# Module 4 Part 8 — 전체 프로세스 요약 및 개발 흐름

## 1. 개발 프로세스는 선형이 아니다

- Build ↔ Analyze를 계속 반복한다.
    

## 2. 실제 워크플로우 흐름

1. 빠른 end-to-end 프로토타입 생성
    
2. Trace 관찰
    
3. 직관 기반 개선
    
4. 소규모 end-to-end eval 구축
    
5. Error analysis 적용
    
6. Component-level eval 구축
    
7. 성능 개선 및 추가 분석 반복
    

## 3. 흔한 실수

- 개발(코딩)에만 너무 집중하고
    
- 분석(error analysis, eval 설계)을 충분히 하지 않음  
    → 많은 시간 낭비로 이어짐.
    

## 4. 평가(Eval) 도구들

- 많은 추적/모니터링/비용 계산 도구 존재
    
- 그러나 대부분의 Agentic workflow는 매우 custom  
    → 최종적으로는 **자체 eval 설계가 필수**
    

## 5. 최종 메시지

- 이 모듈의 개념을 일부라도 잘 사용하면  
    대부분의 개발자보다 훨씬 효율적이고 고도화된 Agentic workflow를 구축할 수 있다.