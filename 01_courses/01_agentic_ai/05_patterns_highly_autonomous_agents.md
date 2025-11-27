# Module 5 — Patterns for Highly Autonomous Agents

고도로 자율적인 에이전트를 만들기 위한 핵심 디자인 패턴  
(Planning, Multi-agent Systems)

---

# 1. Introduction: Highly Autonomous Agents

- 목표: **사전에 step-by-step 로직을 하드코딩하지 않아도**, LLM이 스스로 적절한 절차를 계획하고 실행하게 만들기.
    
- 핵심 개념:
    
    - **Planning Design Pattern**
        
    - **Multi-agent Systems**
        

---

# 2. Planning Design Pattern

## 2.1 동기 예시 — 선글라스 고객 지원 Agent

### 고객 질문

> “Do you have any round sunglasses in stock under $100?”

### 해결하려면:

1. 상품 설명에서 둥근(sunglasses that are round) 제품 식별
    
2. 재고 확인
    
3. 가격 확인
    
4. 최종 응답 생성
    

### LLM이 활용할 수 있는 Tools 예시

- `get_item_descriptions`
    
- `check_inventory`
    
- `get_item_price`
    
- `process_item_sale`
    
- `process_item_return`
    
- `check_past_transactions`  
    등 다양한 tool 셋을 제공
    

---

## 2.2 Planning Prompt 작성

LLM에게 다음을 제공:

- 사용할 수 있는 Tool 목록
    
- 각 Tool의 기능 설명
    
- “사용자 요청을 해결하기 위한 step-by-step plan을 생성하라”
    

### LLM이 생성하는 예시 Plan

1. **Step 1**: `get_item_descriptions` 를 사용해 round sunglasses를 찾음
    
2. **Step 2**: `check_inventory` 로 해당 제품 재고 조회
    
3. **Step 3**: `get_item_price` 로 가격 확인
    

이후 최종 답변을 생성.

---

## 2.3 Plan 실행 흐름

- Step 1 텍스트를 → LLM에게 전달 → 적절한 tool call 실행
    
- Step 1의 결과를 Step 2와 함께 LLM에게 전달
    
- Step 2 결과를 Step 3과 함께 LLM에게 전달
    
- Step 3 결과로 최종 답변 생성
    

> LLM이 직접 Tool sequence를 설계하므로, 개발자가 사전에 모든 절차를 하드코딩할 필요 없음.

---

## 2.4 다른 Planning 예시 — 이메일 Assistant

사용자 요청:  
“Reply to that invitation from Bob in New York, confirm attendance, then archive the email.”

사용 가능한 Tools:

- `search_email`
    
- `send_email`
    
- `move_email`
    
- `delete_email`
    

LLM이 만드는 계획:

1. `search_email`로 Bob의 초대 이메일 검색
    
2. 이메일 응답 작성 및 전송
    
3. 해당 이메일 `archive` 폴더로 이동
    

이후 Plan의 각 Step을 순서대로 실행.

---

## 2.5 Planning 기술의 현재 상태

- **Agentic Coding 분야에서는 매우 잘 작동**
    
- 일반 비즈니스/일반 사용자 업무에서는 아직 실험적 요소가 많음
    
- 단점:
    
    - developer가 runtime에 어떤 plan이 나올지 **예측하기 어려움**
        
- 장점:
    
    - 복잡한 태스크에도 확장 가능성 매우 큼
        

---

# 3. How to Prompt for Planning (JSON 기반)

## 3.1 왜 JSON인가?

- 명확하고 구조적인 형태
    
- downstream 실행 코드가 쉽게 파싱 가능
    
- 주요 LLM들이 JSON 출력에 매우 능숙
    

### Prompt 예시 구성

- “You have access to the following tools…”
    
- Plan을 JSON format으로 출력하라고 지시
    
- 각 Step을 아래 필드로 구성하도록 유도:
    
    - `step_number`
        
    - `description`
        
    - `tool_name`
        
    - `tool_arguments`
        

### 예시 JSON 출력

```json
[
  {
    "step": 1,
    "description": "Find all round sunglasses",
    "tool": "get_item_descriptions",
    "args": {...}
  },
  {
    "step": 2,
    "description": "Check inventory",
    "tool": "check_inventory",
    "args": {...}
  }
]
```

### 다른 포맷

- XML: 구조화는 좋지만 JSON보다 덜 선호됨
    
- Markdown: 파싱 어려움 → 비추천
    
- Plain text: 가장 비구조화 → 비추천
    

---

# 4. Planning via Code Execution

## 4.1 왜 “Plan을 Code로 표현”하는가?

일부 쿼리는 Tool 기반으로 해결하기 매우 복잡함.

예시 데이터: Coffee machine sales 스프레드시트  
사용 가능한 Tool들:

- `get_column_max`
    
- `get_column_min`
    
- `filter_rows`
    
- `sum_rows`  
    등
    

하지만 예를 들어:

> “Which month had the highest sales of hot chocolate?”

이런 질의는 Tool 조합이 매우 복잡해지고,  
Tool이 부족하면 Tool을 계속 추가해야 하는 문제 발생.

---

## 4.2 Code Execution 기반 Planning

Prompt 예:

```
Please write code to solve the user’s query.
Output Python code between <execute_python> tags.
```

LLM 출력 예시:

```python
import pandas as pd
df = pd.read_csv("coffee.csv")
df['date'] = pd.to_datetime(df['date'])
df = df.sort_values('date')
last5 = df.tail(5)
last5["price"]
```

이 과정에서 LLM은 본질적으로 아래와 같은 **Plan을 코드로 기록**:

1. CSV parse
    
2. Date column을 datetime으로 변환
    
3. 정렬
    
4. 조건에 맞게 필터링
    
5. 결과 출력
    

---

## 4.3 장점

- Python + pandas 등 강력한 생태계를 LLM이 활용 가능
    
- Tool을 계속 추가할 필요 없음
    
- 복잡한 logical chaining을 코드로 자연스럽게 표현
    
- 연구 결과:
    
    - **Code-as-action > JSON plan > plain text plan**
        

## 4.4 주의점

- Sandbox에서 실행하는 것이 안전
    
- 실제로 많은 개발자들은 sandbox 없이도 실행하기도 함 (비권장)
    

---

# 5. Multi-Agent Systems

## 5.1 왜 Multiple Agents?

- 현실에서도 복잡한 업무는 여러 역할(Researcher, Designer, Writer 등)로 분리
    
- Agentic 시스템에서도 동일하게 "역할 기반 분리"가 효과적
    

### 인간 팀 구조와 비슷한 reasoning:

- 하나의 에이전트로 모든 일을 하려는 것보다
    
- 역할 기반 분해 → 효율적 설계/개발/테스트 가능
    

---

## 5.2 Example: Marketing Content Creation

### 필요한 역할:

1. Researcher
    
    - 시장 조사 / 경쟁사 분석
        
    - 필요한 Tool: web search
        
2. Graphic Designer
    
    - 시각 자료, 차트 생성
        
    - 필요한 Tool: 이미지 생성 API, 코드 실행(pandas/matplotlib 등)
        
3. Writer
    
    - 최종 마케팅 글 작성
        
    - Tool 필요 없음 (LLM 자체 기능 활용)
        

### 각 Agent Prompt 예시

- **Researcher Prompt**  
    “You are a research agent… analyze market trends…”
    
- **Designer Prompt**  
    “You are a graphic designer agent… create visualizations…”
    
- **Writer Prompt**  
    “You are a writing agent… produce final marketing copy…”
    

---

## 5.3 Linear Multi-agent Workflow

1 → 2 → 3 순서 실행  
Research → Design → Write

장점:

- 단순함
    
- 에이전트 분업 구조가 명확함
    
- 여러 팀원이 병렬로 각 agent 개발 후 조합 가능
    

---

# 6. Multi-agent Planning with a "Manager" Agent

## 6.1 Manager Agent 등장

- LLM을 "Marketing Manager" 역할로 설정
    
- Manager가 하위 agent들에게 task를 계획·분배
    
- Tools 대신 다른 Agents를 호출하는 구조
    

Prompt:

```
You are a marketing manager.
You have the following agents available: researcher, designer, writer.
Return a step-by-step plan.
```

Manager가 작성한 Plan 예시:

1. Researcher에게 시장 조사 요청
    
2. Designer에게 이미지 생성 요청
    
3. Writer에게 최종 보고서 요청
    
4. Manager가 마지막 검토/반영 후 최종 산출
    

---

# 7. Multi-agent Communication Patterns

## 7.1 Pattern 1: Linear Communication

Research → Designer → Writer

- 가장 흔한 방식
    
- 간단하고 통제 쉬움
    

---

## 7.2 Pattern 2: Hierarchical (Manager → Agents)

Manager  
→ Researcher  
→ Designer  
→ Writer

- Manager가 모든 결과를 받아보고 다음 작업 분배
    
- 현실 조직의 "Team Lead" 구조와 유사
    
- 두 번째로 흔한 방식
    

---

## 7.3 Pattern 3: Deep Hierarchy

Manager  
→ Sub-agents  
→ Sub-sub-agents

예:

- Researcher  
    → Web researcher  
    → Fact checker
    
- Writer  
    → Style writer  
    → Citation checker
    
- 아주 복잡함
    
- 사용 빈도 낮음
    

---

## 7.4 Pattern 4: All-to-All Communication

- 모든 Agent가 서로 자유롭게 대화
    
- chaotic하고 예측 불가능
    
- 품질이 들쭉날쭉하지만
    
- "run multiple times until good output appears" 방식 가능
    
- 실험적 프로젝트에서 사용됨
    

---

# 8. Final Summary (Course Wrap-up)

## 8.1 이 과정에서 다룬 주요 요소

- Agentic AI로 새로운 응용 프로그램 가능
    
- Reflection pattern
    
- Tool use & Function calling
    
- Code execution
    
- Eval & Error analysis
    
- Planning pattern
    
- Multi-agent Systems
    

## 8.2 핵심 개발 프로세스

- Build ↔ Analyze 반복
    
- Small Evals → Error Analysis → Component Improvements
    
- Planning & Multi-agent 구조로 확장
    

## 8.3 산업적 중요성

- 실제로 많은 기업의 인터뷰에서  
    **이 강의에서 설명한 개발 능력**을 평가함.
    

## 8.4 마지막 메시지

- 배운 기술들을 책임감 있게 활용
    
- 흥미로운 Agentic AI 시스템을 계속 만들기
    
- 새로운 직업적 기회를 열 수 있음