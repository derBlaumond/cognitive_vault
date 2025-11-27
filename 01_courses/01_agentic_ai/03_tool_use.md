# Module 3: Tool Use

LLM이 함수/도구를 쓰는 법과 MCP까지 한 번에 정리

---

## 1. Tool Use 개념

### 1.1 Tool Use란 무엇인가?

- **정의**
    
    - Tool use = LLM이 필요할 때 **함수 호출을 요청**해서
        
        - 정보를 가져오거나(get)
            
        - 어떤 동작을 수행하거나(act)
            
        - 계산/조회 등을 실행하도록 하는 것.
            
- 사람 비유:
    
    - 맨손보다 **망치, 드라이버**가 있으면 훨씬 많은 일을 할 수 있듯이
        
    - LLM도 “텍스트 생성”만 하는 것보다,
        
        - **함수(도구)**를 사용할 수 있을 때 훨씬 강력해짐.
            

### 1.2 간단한 예: 현재 시각 조회

- 순수 LLM만 있을 때:
    
    - “지금 몇 시야?” → 모델은 학습 시점 이후의 현재 시간을 모름.
        
    - 이상적인 답: “현재 시간에 접근할 수 없다.”
        
- 도구 제공 후:
    
    - `getCurrentTime()` 같은 함수를 구현해 LLM에게 “이 도구가 있다”고 알려주면,
        
    - LLM은 필요할 때:
        
        1. `getCurrentTime` 호출 요청
            
        2. 함수가 실제로 현재 시각 리턴
            
        3. 결과를 다시 컨텍스트로 받아
            
        4. “지금은 오후 3시 20분입니다.” 같은 답을 생성.
            

### 1.3 Tool Use의 실행 흐름 (기본 패턴)

1. **사용자 입력**
    
    - 예: “지금 몇 시야?”
        
2. **LLM이 도구 목록을 보고 판단**
    
    - 사용 가능한 tool: `getCurrentTime`
        
    - 이 질문은 시간이 필요 → 도구 사용 결정을 내림.
        
3. **도구 호출 요청**
    
    - LLM이 “이 함수를 호출해 달라”는 형태로 출력을 생성.
        
4. **개발자가 실제 함수 실행**
    
    - `getCurrentTime()` → 예: `"15:20"`
        
5. **결과를 다시 LLM에 전달**
    
    - 대화 히스토리에 “도구 호출 결과”로 넣음.
        
6. **LLM이 최종 응답 생성**
    
    - “현재 시간은 오후 3시 20분입니다.”
        

### 1.4 “도구를 사용할지 말지”는 LLM이 결정

- 같은 세팅에서 질문이 바뀌면:
    
    - “녹차에는 카페인이 얼마나 들어 있어?”
        
    - 현재 시각과 무관 → LLM은 **도구를 호출하지 않고** 자체 지식으로 답변.
        
- 슬라이드 표기:
    
    - LLM 위에 **점선 박스(dashed box)**로 “tools”가 붙어 있으면  
        → 이 LLM은 현재 도구 세트를 사용할 수 있다는 의미.
        
    - 이전 영상에서의 “개발자가 항상 이 시점에 웹 검색을 수행”처럼  
        **하드코딩된 호출**과 대비:
        
        - Tool use는 “LLM이 필요할 때 decide해서 호출 요청”한다는 점이 핵심.
            

---

## 2. Tool Use 활용 예시들

### 2.1 Web Search 도구

- 질문: “Mountain View, California 근처 이탈리안 레스토랑 추천해줘.”
    
- LLM이 web search tool을 가지고 있다면:
    
    - 검색 쿼리: “restaurants near Mountain View, California”
        
    - 웹 검색 API 호출 → 결과 페이지들 획득
        
    - 이를 바탕으로 레스토랑 리스트/설명을 생성.
        

### 2.2 데이터베이스 조회 도구

- 예: 소매점(retail store)에서
    
    - 질문: “화이트 선글라스를 구매한 고객들을 보여줘.”
        
- LLM이 `query_database` 같은 tool을 갖고 있다면:
    
    - 판매 테이블에서 `item = 'white sunglasses'` 조건으로 조회하는 쿼리를 생성
        
    - 해당 결과를 받아 고객 목록/정보를 답변에 포함.
        

### 2.3 금융/이자 계산 도구

- 질문: “500달러를 10년 동안 연 5% 이자로 넣으면 얼마가 돼?”
    
- 방법 1:
    
    - `interest_calculation` 함수(tool)를 미리 만들어 두고, LLM이 이를 호출.
        
- 방법 2:
    
    - LLM이 **수학 식/코드(예: Python)**를 작성 → code execution tool로 평가.
        

### 2.4 여러 도구를 가진 Calendar Assistant 예시

- 목표: “목요일 중에 빈 시간대를 찾아서 Alice와 미팅 일정 잡아줘.”
    
- 제공 도구:
    
    - `check_calendar` : 내 캘린더에서 빈 시간 조회
        
    - `make_appointment` : 일정 생성 + 초대장 전송
        
    - `delete_appointment` : 기존 일정 삭제
        
- 플로우:
    
    1. LLM이 먼저 `check_calendar` 호출 요청  
        → 목요일 빈 시간 목록 획득
        
    2. 결과를 보고 적절한 시간(예: 3pm)을 선택
        
    3. `make_appointment` 도구 호출 요청  
        → Alice에게 초대, 내 캘린더에 등록
        
    4. 도구 결과(성공 여부)를 다시 받아
        
    5. 최종 답변: “목요일 오후 3시에 Alice와 약속을 잡았습니다.”
        

---

## 3. 도구 호출의 내부 메커니즘 (옛 방식 이해하기)

### 3.1 “LLM은 어떻게 함수 호출을 ‘요청’하는가?”

- LLM은 기본적으로 **텍스트 토큰 생성기**.
    
- 실제로 함수(코드)를 직접 실행하지 못하고,  
    “내가 이런 함수를 호출하고 싶다”는 **특정 포맷의 텍스트**를 출력함.
    
- 개발자가 그 텍스트를 파싱해서:
    
    - 적절한 함수를 호출하고,
        
    - 그 결과를 다시 LLM에게 전달.
        

### 3.2 옛 방식: FUNCTION 마커를 사용하는 프로토콜

- 예: `getCurrentTime` 함수 사용을 허용하려면,
    
    - 시스템 프롬프트에:
        
        - “네가 이 함수를 쓰고 싶으면 `FUNCTION: getCurrentTime` 라고 출력해라.”
            
    - 라고 명시해둘 수 있음.
        
- 실행 흐름:
    
    1. 유저: “지금 몇 시야?”
        
    2. LLM: `FUNCTION: getCurrentTime`
        
    3. 개발자 코드:
        
        - LLM 출력에서 `"FUNCTION:"` 토큰을 탐색
            
        - 뒤에 붙은 함수 이름(`getCurrentTime`) 파싱
            
        - 실제 `getCurrentTime()` 실행 → 예: `"8am"`
            
    4. 결과 `"8am"`을 대화 히스토리에 “도구 결과”로 추가
        
    5. LLM: “현재 시간은 오전 8시입니다.”라는 최종 답변 생성
        
- 요약:
    
    - **LLM → “함수 호출 요청 텍스트”**
        
    - **개발자 → 실제 함수 실행 + 결과 다시 전달**
        

### 3.3 인자(argument)가 있는 함수 케이스

- 예: `getCurrentTime(timezone: string)`
    
    - time zone을 받아 해당 지역 시간을 리턴.
        
- 시스템 프롬프트:
    
    - “함수를 쓰고 싶으면 `FUNCTION: getCurrentTime <timezone>` 형식으로 출력하라.”
        
- 질문: “뉴질랜드는 지금 몇 시야?”
    
- 예상 동작:
    
    1. LLM 출력:
        
        - `FUNCTION: getCurrentTime Pacific/Auckland`  
            (`Pacific/Auckland`은 뉴질랜드 주요 타임존)
            
    2. 개발자 코드:
        
        - `"FUNCTION:"` 검사 → `getCurrentTime`와 `Pacific/Auckland` 추출
            
        - 실제 `getCurrentTime("Pacific/Auckland")` 실행 → `"4am"`
            
    3. `"4am"`을 다시 LLM에 넘김
        
    4. LLM: “뉴질랜드는 현재 오전 4시입니다.” 출력
        

### 3.4 정리

- 도구 사용 프로세스 일반 형태:
    
    1. **도구 구현 및 LLM에게 “이 함수를 사용할 수 있다”라고 설명**
        
    2. LLM이 도구 호출 요청 포맷으로 텍스트 출력
        
    3. 개발자 코드가 요청을 파싱하여 실제 함수 실행
        
    4. 함수 결과를 다시 LLM에 입력
        
    5. LLM이 결과를 이용해 다음 행동(추가 도구 호출 or 최종 답변)을 결정
        
- 이 옛 방식은 “FUNCTION:” 같은 prefix를 직접 관리해야 해서 다소 번거로움.  
    → 최신 LLM API에서는 **도구 호출 포맷을 표준화**하고, 이를 자동 처리하는 라이브러리가 등장.
    

---

## 4. 현대적 Tool Use 구현: AISuite + JSON Schema

### 4.1 AISuite를 사용한 함수 호출 코드 구조

- 예제 함수: 시간 조회 (인자 없는 버전)
    

```python
def get_current_time() -> str:
    """현재 시간을 문자열로 반환합니다."""
    ...
```

- AISuite 기반 호출 예시 구조(개념):
    

```python
response = client.chat.completions.create(
    model="gpt-4o",
    messages=messages,   # 사용자/시스템 대화 기록
    tools=[get_current_time],  # LLM이 사용할 수 있는 툴 목록
    max_turns=5
)
```

- 주요 요소:
    
    - `model`: 사용할 LLM (예: GPT-4o)
        
    - `messages`: 프롬프트 대화 기록
        
    - `tools`: LLM이 사용할 수 있는 함수 목록
        
    - `max_turns`:
        
        - LLM이 도구를 연속으로 여러 번 호출할 수 있는데,
            
        - 무한 루프 방지용 상한(예: 5).
            

### 4.2 AISuite가 하는 일

- AISuite는 `get_current_time` 함수의:
    
    - 이름
        
    - docstring (설명)
        
    - 파라미터 타입 힌트
        
- 를 읽어 **JSON Schema**를 자동 생성.
    
- 실제로 LLM에게 전달되는 것은 이런 형태의 JSON Schema:
    
    - `name`: `"get_current_time"`
        
    - `description`: docstring 내용
        
    - `parameters`: 각 인자의 타입/설명 등
        
- 일부 API에서는 이 JSON Schema를 **직접 작성**해야 하지만,  
    AISuite는 이를 자동으로 생성하고 넘겨줌.
    

### 4.3 파라미터 있는 함수 예시

- 예: `get_current_time(timezone: str)`
    
- AISuite가 생성하는 JSON Schema의 주요 요소:
    
    - `name`: `"get_current_time"`
        
    - `description`: docstring에서 추출
        
    - `parameters`:
        
        - `timezone`: string
            
        - 설명: `"America/New_York"`, `"Pacific/Auckland"` 등 지원 예시
            
- 전체 흐름:
    
    1. `tools=[get_current_time]`로 LLM에게 함수 제공
        
    2. LLM이 내부적으로:
        
        - “어떤 time zone 문자열을 인자로 넣을지”를 스스로 결정
            
    3. LLM이 도구 호출을 요청하면,
        
        - AISuite가 함수 실행 + 결과 반환
            
        - 결과를 다시 LLM에게 전달
            
    4. LLM이 최종 답변 생성
        

### 4.4 AISuite의 자동 처리

- AISuite 사용 시:
    
    - **직접 “FUNCTION:” 텍스트를 파싱하거나,  
        도구 호출을 수동 구현할 필요 없음.**
        
- `client.chat.completions.create(...)` 한 번으로:
    
    - LLM ↔ 도구 호출 요청 ↔ 실제 함수 실행 ↔ 결과 전달  
        전체 루프를 자동으로 관리.
        

---

## 5. Code Execution Tool: 가장 강력한 Tool 중 하나

### 5.1 코드 실행을 도구로 줄 때의 힘

- Code execution tool을 허용하면:
    
    - LLM이 “코드 자체를 생성하고 실행시켜서”  
        매우 다양한 작업을 수행할 수 있음.
        
- 간단한 예시에서 시작:
    

#### 5.1.1 기본 산술 도구만 있을 때

- 제공 도구:
    
    - `add(a, b)`, `subtract(a, b)`, `multiply(a, b)`, `divide(a, b)`
        
- 질문:
    
    - “13.2 + 18.9를 계산해줘”  
        → `add` 호출로 해결 가능.
        
- 하지만:
    
    - “√2는 얼마야?” → 새로 `sqrt` 도구를 만들어야 함.
        
    - “제곱, 로그, 삼각함수, 통계…” 등등 계산이 늘어날수록  
        각각의 전용 tool을 만드는 것은 비효율적.
        

#### 5.1.2 코드 실행 도구로 일반화

- 대신 “코드 실행”이라는 단 하나의 강력한 tool을 제공:
    
    - LLM에게:
        
        - “사용자의 질문을 해결할 **Python 코드**를 작성해라.”
            
        - “코드를 `execute_python ... execute_python` 태그로 감싸서 출력해라.”
            
    - 예: 질문 “√2는?” →  
        LLM 출력:
        

```text
execute_python
import math
result = math.sqrt(2)
print(result)
execute_python
```

- 개발자 코드:
    
    - 정규식 등으로 `execute_python` 태그 사이의 코드를 추출
        
    - 실제로 Python 코드 실행
        
    - 출력값(예: `1.4142...`)을 다시 LLM에게 전달
        
- LLM:
    
    - “√2는 약 1.4142입니다.” 같은 자연어 응답 작성.
        

### 5.2 코드 실행 방식

- 방법 1: Python `exec` 사용
    
    - LLM이 생성한 코드 문자열 전체를 실행하는 방식.
        
    - 매우 강력하지만, 보안/안전 이슈가 있을 수 있음.
        
- 방법 2: 샌드박스 환경
    
    - Docker 컨테이너나 E2B 같은 샌드박스에서 код을 실행해
        
    - 시스템 파일 삭제, 민감 데이터 노출 등 리스크를 줄임.
        

### 5.3 Reflection + 코드 실행의 결합

- 코드 실행 중 오류가 날 수도 있음.
    
- 이때:
    
    1. v1 코드 실행 → 에러 발생
        
    2. **에러 메시지**와 코드를 Reflection LLM에 전달
        
    3. LLM이 문제 분석 후 코드 v2 생성
        
    4. 다시 실행 → 성공할 확률 상승
        
- 코드 실행 tool + reflection은  
    **수학·데이터 처리·복잡한 로직**에서 매우 높은 정확도를 제공.
    

### 5.4 보안 리스크와 모범 사례

- 실제 사례:
    
    - 한 팀에서 매우 agentic한 coder를 사용했는데,
        
    - 잘못된 로직으로 `*.py` 파일들을 삭제하는 코드를 실행하는 일이 발생.
        
    - GitHub에 백업이 있어서 피해는 없었지만,  
        “임의 코드 실행의 위험성”을 잘 보여주는 사례.
        
- 실제 개발자들:
    
    - 솔직히 말하면, 종종 LLM 코드를 그냥 실행하기도 함.
        
    - 하지만 안전하게 하려면:
        
        - **샌드박스 환경(Docker, E2B 등)**을 사용하는 것이 좋음.
            
        - 민감 데이터, 파일 삭제, 네트워크 접근 등을 제한.
            
- 요약:
    
    - Code execution은 **엄청 강력한 도구**이지만  
        **반드시 안전장치와 함께** 사용해야 함.
        

---

## 6. MCP (Model Context Protocol)

### 6.1 MCP가 해결하려는 문제

- 문제 상황:
    
    - 여러 팀이 비슷한 통합을 각자 직접 구현:
        
        - Slack API → 래퍼 작성
            
        - Google Drive → 래퍼 작성
            
        - GitHub → 래퍼 작성
            
        - Postgres DB → 래퍼 작성
            
    - 애플리케이션이 M개, 도구/서비스가 N개라면:
        
        - **전체 작업량 ≈ M × N**
            
        - 모든 팀이 각 도구마다 중복 작업을 반복.
            
- MCP의 목표:
    
    - **표준 프로토콜**을 정의하여:
        
        - “도구/데이터 제공자”와
            
        - “도구/데이터 소비자(애플리케이션)”를 분리.
            
    - 결과:
        
        - 전체 작업량 ≈ **M + N**으로 줄이려는 것.
            

### 6.2 MCP의 개념 구조

- MCP에서:
    
    - **Client**:
        
        - 도구/데이터를 쓰고 싶은 애플리케이션
            
        - 예: 에이전트형 앱, IDE 플러그인, Chat UI 등
            
    - **Server**:
        
        - 도구/데이터를 제공하는 쪽
            
        - 예: GitHub, Slack, Google Drive, Postgres 등과 연결된 래퍼
            
- MCP는:
    
    - LLM이 더 많은 **context(data)**와 **tools(functions)**에 접근할 수 있게 하는 프로토콜.
        
- 초창기 MCP:
    
    - 주로 “데이터 fetch(리소스)”에 집중 → `resources`라는 용어 사용.
        
    - 현재는 **데이터 + 액션(함수)** 두 가지 모두를 포괄.
        

### 6.3 GitHub MCP 서버 예시

- MCP Client: 어떤 cloud desktop/에이전트형 앱
    
- MCP Server: GitHub와 연결된 MCP 서버
    
- 요청 1: README 요약
    
    1. 사용자:
        
        - “이 URL의 GitHub repo에서 `README.md`를 요약해줘.”
            
    2. MCP Client:
        
        - GitHub MCP Server에:
            
            - “repo = AISuite, path = README.md 파일 가져와라.”
                
    3. MCP Server:
        
        - 파일 내용을 반환 (긴 텍스트)
            
    4. Client:
        
        - 이 내용을 LLM의 context에 넣고 요약을 요청
            
    5. LLM:
        
        - README 요약 텍스트를 생성.
            
- 요청 2: 최신 Pull Request 목록
    
    1. 사용자:
        
        - “이 repo의 최신 pull request 목록 알려줘.”
            
    2. MCP Client:
        
        - GitHub MCP Server의 “list pull requests” tool 사용:
            
            - repo = AISuite, sort = updated, limit=20 등
                
    3. MCP Server:
        
        - PR 리스트 반환
            
    4. LLM:
        
        - 이를 읽고 “최근 PR 요약”을 자연어로 정리.
            

### 6.4 MCP의 가치

- MCP를 도입하면:
    
    - 내가 만드는 앱은 **MCP Client**가 될 수 있음.
        
    - 다른 사람들이 만든 MCP Server들(Slack, GitHub, DB 등)을 재사용 →  
        모든 통합을 직접 구현할 필요가 없음.
        
    - 반대로 내 서비스/데이터를 **MCP Server**로 만들어  
        다른 개발자가 쓸 수 있게 할 수도 있음.
        
- MCP는 이미 여러 회사·개발자 커뮤니티에서 채택 중이며,  
    관련 에코시스템이 빠르게 성장하는 중.
    

---

## 7. 모듈 마무리 및 다음 단계

- 이 모듈(Module 3)에서 다룬 핵심:
    

1. **Tool use 개념**
    
    - LLM이 필요 시 함수(도구)를 “요청”해 더 많은 작업 수행.
        
2. **단일/다중 도구 예시**
    
    - 현재 시간, 웹 검색, DB 조회, 이자 계산, 캘린더 조작 등.
        
3. **옛 방식의 함수 호출 프로토콜**
    
    - `FUNCTION: ...` 형식으로 LLM이 호출 의사를 표현하고,  
        개발자가 이를 파싱해 함수 실행.
        
4. **현대적 API (AISuite + JSON Schema)**
    
    - 함수 이름/설명/파라미터를 자동으로 LLM에 전달.
        
    - LLM이 스스로 인자를 구성해 도구를 호출 요청.
        
5. **코드 실행 도구**
    
    - 수많은 연산 tool을 만드는 대신, **코드 작성 + 실행**으로 일반화.
        
    - 오류 발생 시 Reflection과 결합해 코드 품질 향상.
        
    - 보안 측면에서 샌드박스 사용 권장.
        
6. **MCP (Model Context Protocol)**
    
    - 여러 애플리케이션과 여러 서비스 간의 표준 인터페이스.
        
    - 커뮤니티 작업량을 M×N → M+N 수준으로 줄이는 표준.
        
    - Client/Server 구조 및 GitHub 예시.
        

- 다음 모듈(평가와 에러 분석, evals & error analysis):
    
    - 에이전틱 워크플로우를 **잘 만드는 팀 vs 비효율적인 팀**을 가르는 핵심:  
        → **“평가 체계를 얼마나 잘 설계하고, 에러 분석을 얼마나 잘 하느냐”**
        
    - 다음 모듈에서:
        
        - end-to-end eval
            
        - component-level eval
            
        - LLM-as-judge
            
        - 오류 트레이스 분석  
            등을 심층적으로 다룰 예정.
            

