# Module 2: Reflection Design Pattern

---

## 1. Reflection 패턴 개요

### 1.1 개념과 인간 행동 유사성

- Reflection(반성·재검토) 패턴은 **LLM이 자기 출력을 다시 읽고 더 나은 버전으로 개선**하도록 만드는 구조.
    
- 사람도 이메일 초안(first draft)을 쓰고,
    
    - “날짜가 불명확하네”,
        
    - “오타가 있네”,
        
    - “서명을 깜빡했네”
        
    - 같은 부분을 발견하며 수정함.
        
- LLM도 동일한 방식으로:
    
    1. **초안(v1)을 생성**
        
    2. **초안을 LLM에 다시 입력**
        
    3. “문제점 검토 + 개선된 버전(v2) 출력”  
        을 수행할 수 있음.
        
- 이 과정은 단순하고 구현도 쉬우며, 여러 유형의 작업(이메일, 코드 등)에 적용 가능.
    

### 1.2 기본 Reflection Workflow

1. **Generation step**
    
    - LLM이 이메일/코드/에세이의 **v1 초안** 생성.
        
2. **Reflection step**
    
    - 동일하거나 다른 LLM에 v1을 전달하여:
        
        - 오류 검토
            
        - 스타일 개선
            
        - 누락된 정보 보완
            
    - 개선된 **v2 출력** 생성.
        

- 디자인 특징:
    
    - 구조는 하드코딩할 수 있음.
        
    - 즉, “1회 생성 → 1회 반성”이라는 **정해진 2-step workflow**를 만들면 됨.
        

---

## 2. Reflection을 다양한 작업에 적용

### 2.1 이메일 개선

- v1 이메일 생성 →  
    "내용 명확성, 톤, 누락 항목"을 기준으로 v2 개선.
    
- 예:
    
    - 날짜가 vague → 구체적으로 “5~7일” 등으로 다시 작성되도록 유도.
        
    - 오타, 빠진 서명 등을 반영하여 깔끔한 버전 생성.
        

### 2.2 코드 개선

- LLM이 작성한 코드 v1은 종종 오류나 비효율을 포함.
    
- Reflection 단계에서:
    
    - 같은 LLM 또는 **더 나은 reasoning 능력이 있는 LLM**이 문제를 식별.
        
    - reasoning/thinking 모델이 **bug 찾기**에 특히 뛰어남.
        

### 2.3 외부 정보(external feedback)를 사용할 때 Reflection은 훨씬 강해짐

- Reflection의 진정한 힘은 “새로운 정보”가 있을 때 발휘됨:
    
    - 코드 실행 결과
        
    - 에러 메시지
        
    - 외부 데이터
        
    - 패턴 탐지 결과
        
- 단순히 LLM이 자기 출력을 다시 평가하는 것보다 훨씬 큰 향상.
    
- 예시:
    
    - v1 코드 실행 → syntax error 발생
        
    - error log를 Reflection 단계에 입력  
        → LLM이 정확한 수정안(v2)을 생성  
        → v1 alone 보다 향상폭이 훨씬 커짐.
        

### 2.4 Reflection 패턴의 성능 향상 정도

- Reflection이 만능은 아님.
    
    - “모든 문제를 100% 해결”하지 않음.
        
    - 하지만 많은 경우 **작지 않지만 의미 있는 성능 향상**을 제공.
        
- 핵심:
    
    - Reflection은 **외부 정보가 제공될 때** 강력함.
        

---

## 3. Reflection vs Direct Generation (Zero-shot Prompting)

### 3.1 Zero-shot Prompting이란?

- Prompt에 **예시 없이** 바로 “코드 작성해줘 / 에세이 작성해줘”라고 하는 일반적인 방식.
    
- Zero-shot = 예시를 0개 제공  
    (참고: 1-shot/2-shot/few-shot prompting은 프롬프트에 예시 포함)
    

### 3.2 Zero-shot vs Reflection의 성능 비교 (연구 결과)

- 연구(Madaan 외 다수)에서 확인된 패턴:
    
    - Light bar = Zero-shot
        
    - Dark bar = Reflection 적용
        
    - 모델(GPT-3.5, GPT-4 등)별로 모두 **Reflection(어두운 막대)가 더 높음**.
        
- 대다수 작업에서 Reflection은 성능을 실질적으로 향상시킴.
    

### 3.3 Reflection이 특히 유효한 작업 유형

1. **구조화된 데이터 생성**
    
    - HTML, JSON 등 복잡한 구조 생성 시 구조 오류 또는 형식 오류가 발생할 수 있음.
        
    - Reflection은 누락, 중첩 문제 등을 발견해 수정함.
        
2. **단계(sequence) 작성**
    
    - 예: “완벽한 티 brewing 절차”
        
    - Reflection은 coherence·completeness를 검증함.
        
3. **도메인 이름 생성**
    
    - 발음 어려움/의도치 않은 의미 검출
        
    - Reflection으로 의미·발음·부정적 컨텍스트 확인
        
    - 강의자의 팀에서 실제 스타트업 네이밍용으로 사용.
        

### 3.4 Reflection Prompt 작성 예시

- 도메인 이름 검사:
    
    - 발음 용이성, 부정적 의미 여부, 언어별 의미 평가 후 통과한 후보만 반환.
        
- 이메일 개선:
    
    - 톤 체크, 사실 관계 검증, 날짜/수치/약속 내용 재확인,
        
    - 발견된 문제 기반으로 v2 이메일 작성.
        

### 3.5 좋은 Reflection Prompt 작성 팁

- 다음을 명시하면 성능이 좋아짐:
    
    1. “이 초안을 **검토/반성(reflect)**하라”는 명확한 지시
        
    2. 구체적인 평가 기준(criteria) 제공
        
        - 발음 용이성
            
        - 톤
            
        - 정확성
            
        - 완전성
            
        - coherence 등
            
- 또 하나의 팁:
    
    - “잘 작성된 프롬프트”를 많이 읽어보는 것.
        
    - 강의자는 오픈소스 프로젝트에서 프롬프트를 직접 찾아 읽으며 배웠다고 소개.
        

---

## 4. 멀티모달 Reflection 사례: 차트 생성 개선

### 4.1 사례: 커피 머신 판매 데이터 시각화

- 목표: 2024년 vs 2025년 Q1 커피 종류별 판매 비교.
    
- LLM이 생성한 v1 코드 실행 결과:
    
    - **stacked bar chart**
        
    - 보기 어렵고 직관적이지 않은 시각화.
        

### 4.2 멀티모달 Reflection

- v1 코드 + v1 이미지(차트)를 **이미지 입력 지원 LLM**에게 전달
    
- Reflection 단계:
    
    - 이미지 시각적 품질 분석
        
    - 더 적절한 plot type 제안
        
    - 새로운 코드(v2) 생성
        
- 결과:
    
    - stacked-bar → 개별 bar chart 형태로 개선
        
    - 더 명확하고 읽기 쉬운 시각화 생성
        

### 4.3 서로 다른 LLM 조합

- 초기 코드 생성:
    
    - GPT-4o, GPT-5 등 일반 모델
        
- Reflection:
    
    - reasoning 모델(추론 특화)이 더 나은 경우도 많음
        
- 각 단계에서 LLM을 달리 조합하며 테스트 권장.
    

### 4.4 성능 차이는 애플리케이션마다 다름

- 어떤 작업은 Reflection 적용 시 “조금만 향상”
    
- 어떤 작업은 “크게 향상”
    
- 어떤 작업은 “별로 차이 없음”
    
- 따라서 **반드시 eval로 실제 효과를 확인**해야 함.
    

---

## 5. Reflection Workflow의 Eval 구축

### 5.1 Reflection 포함 여부가 실제 성능 개선을 만드는가?

- Reflection은 느려지고 비용도 증가.
    
- 따라서 Reflection을 유지할지 결정하기 위해 **정량 평가(evaluation)**가 필요.
    

### 5.2 사례: DB 질의를 개선하는 Reflection Workflow Eval

- 예시 질문:
    
    - “어떤 색깔 제품 매출이 가장 높은가?”
        
- Workflow:
    
    1. LLM이 SQL(query) v1 생성
        
    2. Reflection LLM이 SQL v2 생성
        
    3. DB에 실행해 결과를 구함
        
- Eval을 위한 ground truth 데이터셋 만들기:
    
    - 10~15개 질문
        
    - 각 질문의 정답을 미리 기록
        
- 평가 방법:
    
    - **No Reflection** → v1 SQL로 정답률 측정
        
    - **With Reflection** → v2 SQL로 정답률 측정
        
    - 예시 결과:
        
        - No Reflection: **87%**
            
        - With Reflection: **95%**  
            → **Reflection이 품질 향상에 실질적으로 기여**
            

### 5.3 Reflection Prompt 조정

- Reflection prompt 개선을 위해 다음 내용 변경·추가 가능:
    
    - 쿼리 효율/속도 개선 요청
        
    - 더 명확한 구조 요구
        
    - 특정한 오류 방지 규칙 추가
        
- Eval이 있으면:
    
    - prompt 변경마다 **정량적으로“전·후 비교”**가 가능.
        

### 5.4 주관적 기준이 필요한 Eval

- 예: 차트 품질 비교
    
    - stacked vs regular bar
        
- 문제:
    
    - “둘 중 어느게 더 좋은가”는 **주관적** 기준.
        
- 일반적인 LLM 비교(prompting):
    
    - “두 이미지 중 어느 게 더 나은가?”  
        → 결과가:
        
        - 안정적이지 않음
            
        - 프롬프트 민감
            
        - position bias(예: 첫 번째 이미지를 더 좋아하는 경향)
            
        - 인간 전문가 판단과 불일치 가능
            

### 5.5 더 신뢰되는 LLM-as-Judge 방법: **Rubric 기반 평가**

- 더 나은 방식:
    
    - 각각의 이미지를 **독립적으로 평가**
        
    - 다중 binary rubric을 이용:
        
        - 제목 있는가? (0/1)
            
        - 축 라벨? (0/1)
            
        - 적절한 그래프 타입인가? (0/1)
            
        - 범례 명확한가? (0/1)
            
        - 기타 항목들…
            
    - 각 항목을 0/1로 평가한 뒤 총합 점수로 비교.
        
- 장점:
    
    - 1~5 스케일보다 **훨씬 안정적**.
        
    - 위치 bias 제거.
        
- Reflection vs Non-reflection 비교:
    
    - 10~15개 visualization 요청 모아서
        
    - 각 이미지에 대해 rubric 점수 측정
        
    - Reflection이 실제로 평균 점수가 더 높은지 확인.
        
- 이후:
    
    - initial generation prompt 바꾸기,
        
    - reflection prompt 바꾸기,
        
    - 모델 조합 바꾸기 등 할 때마다
        
        - **같은 eval dataset으로 빠르게 재실행**하여 개선 여부 측정.
            

### 5.6 Eval 요약

- **객관적 기준**(ground truth 있는 경우):
    
    - 코드 기반 평가가 가장 믿을 수 있음.
        
- **주관적 기준**(시각적 품질 등):
    
    - LLM을 judge로 사용하되
        
    - **루브릭 기반 binary 점수**를 사용해야 품질이 안정됨.
        

---

## 6. External Feedback이 있는 Reflection이 가장 강력한 이유

### 6.1 Prompt Engineering 한계

- Zero-shot prompt 튜닝만으로는 일정 지점에서 **성능이 plateau(평탄화)**하는 경향.
    
- 튜닝을 계속해도 향상폭이 작아짐.
    

### 6.2 Reflection 추가 시 성능 곡선

- Prompt tuning → plateau
    
- Reflection 추가 → **성능 상승 bump**
    
- Reflection prompt 튜닝 → 추가 성능 향상
    

### 6.3 External Feedback이 추가되면 최고 성능 경로 생성

- External feedback이 있는 reflection은:
    
    - plateau를 “강하게 뚫고”
        
    - 훨씬 더 높은 성능 수준으로 이끎.
        

### 6.4 External Feedback 예시

1. **코드 실행 결과**
    
    - 에러 메시지 + 출력값 = 매우 강력한 힌트
        
    - LLM이 이 정보를 사용해 더 정확하게 고침
        
2. **경쟁사 언급 감지(정규식)**
    
    - 출력에 경쟁사 이름이 있다면  
        → “경쟁사 언급 금지” 피드백 전달  
        → LLM이 수정된 텍스트 생성
        
3. **사실 체크 (web search 연동)**
    
    - 예: Taj Mahal 사례
        
    - “1648년에 지어짐” → 사실관계 더 정확히 반영 필요
        
    - 웹 검색 snippet을 reflection 단계에 추가  
        → 더 정확한 역사 설명으로 수정 가능
        
4. **word count 툴 사용**
    
    - LLM이 word limit을 잘 못 지킴
        
    - word count tool → 초안이 제한보다 길면 피드백 → 다시 작성  
        → 규격에 맞는 text 생성 가능
        

### 6.5 요약

- External feedback은 Reflection의 **가장 강력한 fuel**.
    
- LLM이 스스로 생성한 텍스트만 보고 반성하는 것과 달리,
    
    - **실제 세계의 새로운 정보**를 입력하면 성능이 크게 개선.
        
- Reflection + External_feedback =  
    **Agentic 워크플로 성능을 크게 끌어올리는 핵심 전략**