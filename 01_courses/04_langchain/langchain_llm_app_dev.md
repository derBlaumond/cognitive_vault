# LangChain for LLM Application Development

---
## 0. 코스/프레임워크 소개

### 0.1 LangChain이 등장한 배경

- LLM(대형 언어 모델)을 이용하면 “프롬프트만 잘 작성해도” 예전보다 훨씬 빠르게 AI 앱을 만들 수 있다.

- 하지만 실제 애플리케이션은: 모델을 **여러 번 호출**하고, **매번 프롬프트를 구성**하고, **출력 텍스트를 다시 파싱해서 구조화**해야 한다.

- 이 과정에서 ==**끈끈이(glue) 코드**==가 엄청나게 많이 생긴다:
    
    - 모델 호출 로직
        
    - 프롬프트 템플릿 관리
        
    - 출력 파싱
        
    - 체이닝, 도구 호출, 메모리 관리 등
        

→ **LangChain**은 이 “반복적인 공통 패턴”을 추상화해서,  
LLM 기반 애플리케이션 개발을 쉽게 해주는 프레임워크.

### 0.2 LangChain 개요

- **오픈소스 프레임워크 ** with Python, JavaScript(TS)
        
- 핵심 철학:
    
    1. **모듈성(Modularity)**
        
        - ==모델(LLM, chat models), 프롬프트, 메모리, 체인, 에이전트, 도구 등 각각을 독립 컴포넌트==로 제공
            
        - 각각 따로 써도 되고, 조합해서 end-to-end 앱을 만들 수 있음
            
    2. **조합성(Composition)**
        
        - 여러 컴포넌트를 **체인(chain)** 형태로 묶어서 복잡한 워크플로를 구현
            
- 이미 수많은 사용자 + 수백 명의 오픈소스 기여자들이 발전시켜온 프로젝트.
    

### 0.3 이 코스에서 다루는 핵심 컴포넌트

1. **Models (LLMs, Chat Models)**
    
2. **Prompts (프롬프트 템플릿)**
    
3. **Parsers (출력 파서)**
    
4. **Indexes (임베딩 & 벡터스토어)**
    
5. **Chains (여러 단계를 묶은 파이프라인)**
    
6. **Agents (LLM을 “추론 엔진 + 도구 호출”로 쓰는 고급 패턴)**
    
7. **Memory (대화/상태 관리)**
    
8. **Evaluation (체인/앱 평가 프레임워크)**
    

---

## 1. Lesson 1 – Models, Prompts, Parsers

### 1.1 기본 모델 호출 – 헬퍼 함수

먼저 OpenAI를 직접 호출하는 기본 코드가 있다:

```python
import os
import openai

openai.api_key = os.getenv("OPENAI_API_KEY")

def get_completion(prompt, model="gpt-3.5-turbo"):
    messages = [{"role": "user", "content": prompt}]
    response = openai.ChatCompletion.create(
        model=model,
        messages=messages,
        temperature=0,
    )
    return response.choices[0].message["content"]
```

- `get_completion("What is 1+1?")` → GPT-3.5 Turbo에게 질문
    
- 이런 방식으로 앱을 만들면:
    
    - 프롬프트 조합
        
    - 모델 여러 번 호출
        
    - 결과 파싱  
        → 같은 패턴이 반복된다.
        

LangChain은 이 반복 패턴을 **모델/프롬프트/파서** 수준으로 추상화해서 편하게 쓸 수 있게 해준다.

---
### 1.2 예제 시나리오 – 해적 영어 고객 이메일 번역

**상황**

- 고객이 이상한 “English pirate” 스타일로 클레임 메일을 보냄:
    

```text
I'd be fuming that me blender lid flew off and splattered my kitchen walls with smoothie.
And to make matters worse, the warranty don't cover the cost of cleaning up me kitchen.
I need your help right now, matey.
```

**목표**

- 이 텍스트를  
    “미국 영어 + 차분하고 공손한 톤”으로 번역.
    

기본적으로는 f-string으로 프롬프트를 만든다:

````python
style = "American English in a calm and respectful tone"
text = """...pirate email..."""

prompt = f"""
Translate the text that is delimited by triple backticks into a style that is {style}.
```{text}```
"""
response = get_completion(prompt)
````

이렇게 해도 되지만,  
**여러 고객 메일, 여러 스타일**에 대해 같은 패턴을 계속 쓰려면  
프롬프트를 템플릿으로 관리하는 게 훨씬 낫다 → LangChain의 **PromptTemplate**.

---

### 1.3 LangChain의 ChatOpenAI + ChatPromptTemplate

```python
from langchain.chat_models import ChatOpenAI
from langchain.prompts import ChatPromptTemplate

chat = ChatOpenAI(temperature=0.0)

template_string = """
Translate the text that is delimited by triple backticks
into a style that is {style}.
Text: ```{text}```
"""

prompt_template = ChatPromptTemplate.from_template(template_string)
```

- `prompt_template`는 **입력 변수**를 가진 템플릿:
    
    - `style`
        
    - `text`
        
- LangChain이 자동으로:
    
    - 템플릿에서 `{style}`, `{text}` 같은 변수명을 추출
        
    - 필요 입력을 관리해준다.
        

사용 예:

```python
customer_style = "American English in a calm and respectful tone"
customer_email = """...pirate email..."""

customer_messages = prompt_template.format_messages(
    style=customer_style,
    text=customer_email,
)
# customer_messages는 "LLM에 보낼 메시지 리스트" 형태

customer_response = chat(customer_messages)
print(customer_response.content)
```

→ LLM이 해적 영어를 공손한 미국 영어로 번역해줌.

이제 같은 템플릿을,  
다른 `style`과 `text`로 재사용 가능:

- 프랑스어 → 정중한 영어
    
- 고객 서비스 답변 → pirate 스타일로 번역 등
    

---

### 1.4 왜 PromptTemplate이 중요한가?

- 실제 프로덕션급 LLM 앱에서는 프롬프트가 매우 길고 복잡해짐:
    
    - 문제 설명
        
    - 예시 (few-shot)
        
    - 출력 포맷 지정
        
    - 제약 조건
        
- 이걸 문자열/f-string으로만 관리하면:
    
    - 재사용/버전 관리가 힘들고
        
    - 실수로 변수 누락/오타가 발생하기 쉽다.
        
- LangChain의 역할:
    
    1. **템플릿 관리** – 프롬프트를 구조화된 객체로 관리
        
    2. **공용 템플릿 제공** – 요약, 질의응답, SQL 질의, API 호출 등
        
    3. **파서와 결합** – 특정 포맷으로 출력시키고, 그걸 파서로 곧장 파싱
        

---

### 1.5 출력 파싱(Output Parsing) – JSON 예제

#### 1.5.1 문제 설정

- 고객 리뷰 텍스트에서 다음 정보를 추출하고 싶다:
    
    - `gift`: 선물인지 여부 (true/false)
        
    - `delivery_days`: 배송 소요 일수
        
    - `price_value`: 가격에 대한 평가 (예: "slightly more expensive…")
        

예시 출력(파이썬 dict/JSON):

```python
{
  "gift": false,
  "delivery_days": 5,
  "price_value": "pretty affordable"
}
```

#### 1.5.2 기본 방식 – 그냥 프롬프트로 JSON 생성

````python
review_template = """
For the following text, extract the following information:
1. Was this purchased as a gift? (true/false)
2. How many days did it take for the product to be delivered?
3. What is the price value?

Format the answer as JSON with keys: gift, delivery_days, price_value.

Review:
```{text}```
"""
````

이 템플릿을 LangChain의 `ChatPromptTemplate`으로 감싸고  
LLM에 보내면 겉으로 보기엔 JSON처럼 생긴 문자열이 돌아온다.

문제:

- LLM의 응답은 **진짜 파이썬 dict가 아니라 문자열**이다.
    
- `response["gift"]` 같은 인덱싱을 하면 에러가 난다.
    

---

#### 1.5.3 LangChain의 Structured Output Parser

```python
from langchain.output_parsers import StructuredOutputParser, ResponseSchema

response_schemas = [
    ResponseSchema(
        name="gift",
        description="Was the item purchased as a gift for someone else? true if yes, false if not or unknown."
    ),
    ResponseSchema(
        name="delivery_days",
        description="How many days did it take for the product to arrive?"
    ),
    ResponseSchema(
        name="price_value",
        description="Describe the price value."
    ),
]

output_parser = StructuredOutputParser.from_response_schemas(response_schemas)
format_instructions = output_parser.get_format_instructions()
```

- `response_schemas`로 **필드 이름 + 설명**을 정의
    
- `output_parser.get_format_instructions()`  
    → LLM에게 “어떤 JSON 형식으로 출력하라”는 구체적인 안내 문자열 생성
    

새 템플릿:

````python
review_template = """
For the following review text, extract the following information:

gift, delivery_days, price_value.

Review:
```{text}```

{format_instructions}
"""
prompt = ChatPromptTemplate.from_template(review_template)
````

- `{format_instructions}` 위치에  
    파서가 생성한 “이런 JSON 형식으로 출력해라” 안내문이 삽입된다.
    

LLM 호출 후 파싱:

```python
messages = prompt.format_messages(text=customer_review, format_instructions=format_instructions)
model_response = chat(messages)

output_dict = output_parser.parse(model_response.content)
# output_dict는 실제 파이썬 dict
```

이제:

```python
output_dict["gift"]         # True / False
output_dict["delivery_days"]  # 정수
output_dict["price_value"]
```

처럼 바로 사용 가능.

---

### 1.6 Models + Prompts + Parsers 요약

- **Model**: LLM/Chat 모델 자체
    
- **Prompt**: 모델에 전달할 입력을 구조화하는 틀
    
- **Parser**: 출력 문자열을 **딕셔너리·리스트 등 구조화된 데이터**로 변환
    

LangChain은 이 세 가지를 잘 결합해서:

1. 프롬프트 재사용/공유가 쉬워지고
    
2. 파서를 활용해 안정적인 출력 형식 확보
    
3. 이후 체인/에이전트에서 이 구조화된 데이터를 그대로 활용
    

---

## 2. Lesson 2 – Memory (대화 기억)

### 2.1 왜 메모리가 필요한가?

- 기본적으로 **LLM API 호출은 stateless**:
    
    - 매번 호출은 독립적
        
    - 모델은 “이전에 무슨 대화가 있었는지” 자동으로 기억하지 않는다.
        
- 그래서 챗봇이 “기억하는 것처럼” 보이게 하려면:
    
    1. 이전 대화들을 어딘가에 저장하고
        
    2. 다음 프롬프트에 계속 **컨텍스트로 포함**해 줘야 한다.

LangChain의 Memory는 이 작업을 쉽게 해주는 컴포넌트.

---

### 2.2 ConversationBufferMemory – 기본 버퍼 메모리

```python
from langchain.chains import ConversationChain
from langchain.memory import ConversationBufferMemory
from langchain.chat_models import ChatOpenAI

llm = ChatOpenAI(temperature=0)
memory = ConversationBufferMemory()
conversation = ConversationChain(
    llm=llm,
    memory=memory,
    verbose=False,
)
```

사용:

```python
conversation.predict(input="Hi, my name is Andrew.")
conversation.predict(input="What is 1 + 1?")
conversation.predict(input="What is my name?")
```

- 마지막 질문에서 LLM은 “Your name is Andrew”라고 답한다.
    
- 이유:
    
    - LangChain이 내부적으로 전체 대화 로그를 합쳐서 프롬프트에 포함한다.
        

`verbose=True`로 보면:

```text
System: The following is a friendly conversation...
Human: Hi, my name is Andrew.
AI: Hello Andrew...
Human: What is 1+1?
AI: 2
Human: What is my name?
```

또한 실제 메모리 내용:

```python
print(memory.buffer)
# Human: Hi, my name is Andrew
# AI: Hello Andrew...
# Human: What is 1+1?
# AI: 2
# Human: What is my name?
```

→ 전체 대화가 **그대로 문자열**로 저장.

---

### 2.3 메모리를 수동으로 조작하기

```python
memory = ConversationBufferMemory()
memory.save_context(
    {"input": "Hi, what's up?"},
    {"output": "Not much, just hanging."}
)
print(memory.load_memory_variables({}))
# {"history": "Human: Hi, what's up?\nAI: Not much, just hanging."}
```

- `save_context()`로 직접 입력/출력을 저장할 수도 있다.
    
- `load_memory_variables({})`로 메모리 내용을 불러올 수 있다.
    

---

### 2.4 ConversationBufferWindowMemory – 최근 N턴만 유지

문제점:

- 대화가 길어질수록:
    
    - 프롬프트 길이가 증가
        
    - 토큰 비용이 커짐
        
    - 컨텍스트 조작이 어려움
        

해결: **윈도우 메모리** – 최근 몇 턴만 기억

```python
from langchain.memory import ConversationBufferWindowMemory

memory = ConversationBufferWindowMemory(k=1)
memory.save_context(
    {"input": "Hi, what's up?"},
    {"output": "Not much, just hanging."}
)
memory.save_context(
    {"input": "Cool."},
    {"output": "Nice to hear that."}
)
print(memory.load_memory_variables({}))
# 최근 1턴만 유지: "Human: Cool\nAI: Nice to hear that."
```

대화 예:

- “Hi, my name is Andrew”
    
- “What is 1+1?”
    
- “What is my name?”
    

→ `k=1`이므로 마지막 교환만 남아  
이름을 알려준 턴은 사라져서  
“너 이름은 모르겠다”라고 답하게 된다.

---

### 2.5 ConversationTokenBufferMemory – 토큰 기준 제한

- 토큰 단위로 메모리를 관리하고 싶을 때 사용
    
- `max_token_limit`을 넘으면, 오래된 내용부터 잘라낸다.
    

```python
from langchain.memory import ConversationTokenBufferMemory

memory = ConversationTokenBufferMemory(
    llm=llm,
    max_token_limit=50
)
```

- 내부적으로는 `llm`의 토큰 카운터를 사용 (모델별 토큰 규칙이 다름)
    
- 긴 대화에서도 최근 정보 위주로 유지하면서 토큰 비용을 제어.
    

---

### 2.6 ConversationSummaryBufferMemory – 요약 기반 메모리

아이디어:

- “다 잘라내기” 대신, 오래된 대화를 **LLM에게 요약시키고 그 요약을 메모리로 유지**.
    

```python
from langchain.memory import ConversationSummaryBufferMemory

memory = ConversationSummaryBufferMemory(
    llm=llm,
    max_token_limit=100
)
```

1. 처음에는 원문 대화를 그대로 저장
    
2. 토큰 한도를 넘기면:
    
    - LLM에게 기존 대화를 요약하도록 시킴
        
    - 요약 결과를 “시스템/설명” 형태로 메모리에 남김
        
3. 최근 몇 턴은 그대로, 그 이전 내용은 요약으로 유지
    

예:

- 일정에 대한 긴 설명(회의, 점심, 데모 등)을 대화 중에 전달
    
- 토큰 한도 100으로 줄이면, LLM이:
    

```text
"Human and AI engaged in small talk...
 Then AI describes today's schedule: meeting with product team...
 lunch with customer interested in AI and latest LLM demo..."
```

같은 요약을 만든 뒤, 그걸 “기존 대화의 압축된 메모리”로 사용한다.

→ 이후 질문: “What would be a good demo to show?”에 대해  
이 요약을 보고 “최신 NLP capability를 보여주는 데모” 같은 답을 준다.

---

### 2.7 기타 메모리 타입

- **Vector Store Memory**
    
    - 텍스트/대화 내용을 임베딩으로 저장
        
    - 나중에 “관련성이 높은 발화들만” 검색해서 컨텍스트로 사용
        
    - 매우 긴 대화/지식 기반 등에 적합
        
- **Entity Memory**
    
    - 특정 “엔티티(사람, 회사, 제품 등)”에 대한 정보를 따로 저장
        
    - 예: “친구 Alice에 대해서는 이러이러한 정보를 기억해라”
        
    - 일반 대화 요약 + 엔티티별 정보 저장을 동시에 사용할 수 있다.
        

또한, 실무에서는:

- LangChain 메모리에 더해
    
- 전체 대화를 기존 DB(SQL, key-value 등)에 그대로 저장해서
    
    - 감사(audit)
        
    - 향후 모델 개선
        
    - 리플레이/디버깅 등에 활용하기도 한다.
        

---

## 3. Lesson 3 – Chains (체인)

### 3.1 체인의 개념

- 체인은 **LLM + 프롬프트 + (옵션) 기타 단계**를 묶은 “하나의 작업 단위”.
    
- 여러 체인을 순차/분기/라우팅 등으로 연결하면 복잡한 워크플로 구성 가능.
    

이 레슨에서 나오는 체인 종류:

1. **LLMChain** – 가장 기본. LLM + Prompt
    
2. **SimpleSequentialChain** – 단일 입력/출력 체인들을 순서대로 실행
    
3. **SequentialChain** – 여러 입력/출력 키를 가진 복잡한 체인들 연결
    
4. **Router Chains (MultiPromptChain)** – 입력에 따라 적절한 서브 체인으로 라우팅
    

---

### 3.2 데이터 준비 – Pandas DataFrame

- CSV에서 `product`, `review` 등의 컬럼을 읽어와서  
    여러 행(데이터 포인트)을 가진 DataFrame으로 만든다.
    
- LangChain 체인은 이런 많은 행에 대해 반복적으로 적용할 수 있다.  
    (여기선 구조만 이해하면 되고, pandas 디테일은 중요하지 않음.)
    

---

### 3.3 LLMChain – 가장 기본적인 체인

```python
from langchain.chat_models import ChatOpenAI
from langchain.prompts import ChatPromptTemplate
from langchain.chains import LLMChain

llm = ChatOpenAI(temperature=0.9)

prompt = ChatPromptTemplate.from_template(
    "What is a good name for a company that makes {product}?"
)

chain = LLMChain(llm=llm, prompt=prompt)

product = "queen-size sheet set"
result = chain.run(product=product)
# 예: "Royal Bedding"
```

- 구성 요소:
    
    - LLM: `ChatOpenAI`
        
    - Prompt: `ChatPromptTemplate`
        
    - Chain: `LLMChain`
        
- `chain.run()`을 호출하면:
    
    - 내부적으로 템플릿 변수를 채움
        
    - 완성된 프롬프트를 LLM에 전달
        
    - 결과를 문자열로 반환
        

이 **LLMChain**이 이후 모든 복잡한 체인의 기본 단위가 된다.

---

### 3.4 SimpleSequentialChain – 직렬 체인 (단일 입/출력)

구성 예:

1. **체인 1**: 제품 이름을 회사 이름으로 변환
    
2. **체인 2**: 그 회사 이름을 20단어 설명으로 확장
    

```python
from langchain.chains import SimpleSequentialChain

# chain 1: product -> company_name
chain1 = LLMChain(
    llm=llm,
    prompt=ChatPromptTemplate.from_template(
        "What is a good name for a company that makes {product}?"
    ),
)

# chain 2: company_name -> description
chain2 = LLMChain(
    llm=llm,
    prompt=ChatPromptTemplate.from_template(
        "Write a 20-word description for a company named {company_name}."
    ),
)

overall_chain = SimpleSequentialChain(
    chains=[chain1, chain2],
    verbose=True,
)

overall_chain.run("queen-size sheet set")
```

- `SimpleSequentialChain`은:
    
    - **각 체인이 입력 1개 / 출력 1개**일 때 적합
        
    - 앞 체인의 출력이 **그대로** 다음 체인의 입력으로 들어간다.
        

---

### 3.5 SequentialChain – 다중 입력/출력 체인

예제: 리뷰 처리 파이프라인

1. 리뷰를 영어로 번역 → `english_review`
    
2. 영어 리뷰를 한 문장 요약 → `summary`
    
3. 원 리뷰의 언어 감지 → `language`
    
4. `summary` + `language`를 사용해 **원 언어로 후속 답장** 생성 → `followup_message`
    

구성:

```python
from langchain.chains import SequentialChain

# 1) review -> english_review
chain_translate = LLMChain(
    llm=llm,
    prompt=ChatPromptTemplate.from_template(
        "Translate the following review to English:\n\n{review}"
    ),
    output_key="english_review",
)

# 2) english_review -> summary
chain_summarize = LLMChain(
    llm=llm,
    prompt=ChatPromptTemplate.from_template(
        "Summarize the following review in one sentence:\n\n{english_review}"
    ),
    output_key="summary",
)

# 3) review -> language
chain_detect_lang = LLMChain(
    llm=llm,
    prompt=ChatPromptTemplate.from_template(
        "What language is this review written in?\n\n{review}"
    ),
    output_key="language",
)

# 4) summary + language -> followup_message
chain_followup = LLMChain(
    llm=llm,
    prompt=ChatPromptTemplate.from_template(
        "Write a follow-up response to the following review summary in {language}:\n\n{summary}"
    ),
    output_key="followup_message",
)

overall_chain = SequentialChain(
    chains=[chain_translate, chain_summarize, chain_detect_lang, chain_followup],
    input_variables=["review"],
    output_variables=["english_review", "summary", "language", "followup_message"],
    verbose=True,
)
```

중요한 점:

- **입력/출력 변수 이름 관리가 핵심**
    
    - `output_key="english_review"`로 지정한 이름을  
        다음 체인에서 `{english_review}`로 그대로 사용해야 한다.
        
- `SequentialChain`은:
    
    - 각 단계가 **여러 입력을 받거나** 여러 출력을 낼 수 있다.
        
    - 내부적으로 **키-값 딕셔너리**를 주고받는다.
        

---

### 3.6 Router + MultiPromptChain – 입력 종류에 따라 라우팅

문제:

- 서로 다른 도메인(물리, 수학, 역사, 컴퓨터과학)에 대해  
    각기 다른 프롬프트/체인을 쓰고 싶다.
    
- 입력 질문에 따라:
    
    - “이건 물리 문제다 → 물리 체인으로”
        
    - “이건 수학이다 → 수학 체인으로”
        
    - “아무것도 아니면 → 기본 체인으로”
        

#### 3.6.1 도메인별 프롬프트 템플릿

```python
physics_template = "You are a physics expert. Answer the question:\n{input}"
math_template = "You are a math expert. Answer the question:\n{input}"
history_template = "You are a history expert. Answer the question:\n{input}"
cs_template = "You are a computer science expert. Answer the question:\n{input}"
```

각 템플릿에 대해:

- 이름(name)
    
- 설명(description)을 붙인다 (라우터가 참조):
    

```python
prompt_infos = [
    {
        "name": "physics",
        "description": "Good for answering physics questions",
        "prompt_template": physics_template,
    },
    ...
]
```

#### 3.6.2 라우터 chain 구성

필요 컴포넌트:

- **LLMRouterChain**
    
- **RouterOutputParser**
    
- **MultiPromptChain** (또는 유사 라우팅 체인)
    

구조 개념:

1. Router LLM에 “각 도메인 설명 + 입력 질문”을 전달
    
2. Router LLM이:
    
    - 어떤 도메인 체인을 사용할지
        
    - 그 체인에 넘길 입력이 무엇인지  
        → 구조화된 형태로 반환
        
3. `RouterOutputParser`가 LLM 출력에서:
    
    - `destination` (어느 체인)
        
    - `next_inputs` (그 체인에 넘길 딕셔너리)  
        를 파싱
        
4. `MultiPromptChain`이 실제 서브 체인을 호출
    

사용 예:

```python
overall_chain.run("What is blackbody radiation?")
# → physics 체인으로 라우팅

overall_chain.run("What is 2+2?")
# → math 체인

overall_chain.run("What is DNA?")
# physics/math/history/CS 어느 것도 아니면 default 체인 사용
```

---

## 4. Lesson 4 – Question Answering over Documents (임베딩 & 벡터스토어)

### 4.1 문제 정의

- PDF/웹페이지/사내 문서 등 **자신의 문서들**에 대해:
    
    - “이 문서를 기반으로 질문에 답하는 시스템” 만들기
        
- LLM만 단독으로 쓰면:
    
    - 최대 컨텍스트 길이(수천~수만 토큰) 제한
        
    - 전체 문서를 모두 넣기 어려움
        
- 해결:
    
    - 문서를 쪼개고(chunking)
        
    - 각 조각의 의미를 임베딩 벡터로 표현하고
        
    - 질문과 비슷한 조각 몇 개만 골라 LLM에게 전달
        

→ **임베딩(embeddings) + 벡터 DB(vector store)** 패턴.

---

### 4.2 고수준: VectorStoreIndexCreator + index.query

필요 모듈:

- `RetrievalQA`
    
- `ChatOpenAI`
    
- `CSVLoader` (문서 로더)
    
- `DocArrayInMemorySearch` (간단한 인메모리 벡터스토어)
    
- `VectorStoreIndexCreator`
    

```python
from langchain.chat_models import ChatOpenAI
from langchain.document_loaders import CSVLoader
from langchain.vectorstores import DocArrayInMemorySearch
from langchain.indexes import VectorStoreIndexCreator

loader = CSVLoader("OutdoorClothingCatalog_1000.csv")

index = VectorStoreIndexCreator(
    vectorstore_cls=DocArrayInMemorySearch,
).from_loaders([loader])
```

질문:

```python
query = "Please list all your shirts with sun protection in a table in markdown and summarize each one."
response = index.query(query)
# → 마크다운 테이블 + 요약 반환
```

- 내부적으로:
    
    - CSV를 문서 리스트로 로드
        
    - 임베딩 생성
        
    - 벡터스토어 구축
        
    - 질의 임베딩
        
    - 유사 문서 검색
        
    - LLM에 전달 후 응답 생성
        

---

### 4.3 임베딩(Embeddings)의 개념

- 텍스트 → **고차원 숫자 벡터**
    
- 의미가 비슷한 텍스트끼리는 벡터 공간에서 **가까운 위치**에 놓인다.
    
- 예:
    
    - “I like my dog”
        
    - “I love my cat”
        
    - “The car is fast”
        
- 앞 두 문장은 “pet/애완동물” 관련 → 벡터가 서로 가깝다.
    
- 세 번째 문장은 “자동차” → 전혀 다른 방향.
    

이런 벡터 표현을 이용해:

- 의미 기반 검색(semantic search)
    
- 유사 문장 추천
    
- “질문에 가장 관련 있는 문서 조각” 추출
    

---

### 4.4 벡터 데이터베이스(Vector Store)의 개념

인덱스 생성 과정:

1. 문서 로딩
    
2. 문서 → 작은 청크로 분할 (chunking)
    
3. 각 청크에 대해 임베딩 생성
    
4. (벡터, 원본 텍스트, 메타데이터)를 벡터스토어에 저장
    

질의 과정:

1. 사용자의 질문에 대해 임베딩 계산
    
2. 벡터스토어에서 “질문 벡터와 가장 가까운 n개 청크” 검색
    
3. 이 청크들을 하나의 컨텍스트로 합쳐서 LLM에 전달
    
4. LLM이 “주어진 컨텍스트를 기반으로” 답변 작성
    

---

### 4.5 로우레벨 구현 – 직접 단계 나눠 보기

```python
from langchain.document_loaders import CSVLoader
from langchain.embeddings import OpenAIEmbeddings
from langchain.vectorstores import DocArrayInMemorySearch

# 1. 문서 로드
loader = CSVLoader("OutdoorClothingCatalog_1000.csv")
docs = loader.load()

# docs 각각이 하나의 상품 설명 문서 (이미 충분히 짧아서 chunking 생략)

# 2. 임베딩 객체
embeddings = OpenAIEmbeddings()

# 3. 벡터스토어 생성
db = DocArrayInMemorySearch.from_documents(docs, embeddings)

# 4. 유사도 검색
query = "Please suggest a shirt with sunblocking"
similar_docs = db.similarity_search(query, k=4)
```

`similar_docs[0]` 등을 보면 실제 sun blocking 셔츠 상품이 나온다.

---

### 4.6 Retriever + RetrievalQA 체인

- `retriever = db.as_retriever()`  
    → (질의 → 관련 문서 리스트) 인터페이스
    
- `ChatOpenAI`로 LLM 준비
    
- RetrievalQA 체인 구성:
    

```python
from langchain.chains import RetrievalQA

llm = ChatOpenAI(temperature=0)

qa_chain = RetrievalQA.from_chain_type(
    llm=llm,
    chain_type="stuff",   # 문서들을 통째로 넣는 가장 단순한 방식
    retriever=retriever,
    verbose=True,
)

query = "Please list all your shirts with sun protection in a table in markdown and summarize each one."
result = qa_chain({"query": query})
```

- `chain_type="stuff"`:
    
    - 검색된 문서들을 그냥 하나로 “붙여서(stuff)” LLM에 한 번에 전달
        
    - 간단, 빠름, 토큰 제한 안에 들어갈 때 적합
        
- 그 외 체인 타입:
    
    - **map_reduce**:
        
        - 각 문서+질문 → 부분 답변 생성 (병렬 가능)
            
        - 이후 “부분 답변들”을 모아 최종 요약
            
        - 문서 수가 많아도 처리 가능하지만 호출 수가 많고 비용 상승
            
    - **refine**:
        
        - 문서들을 순차적으로 보면서, 이전 답변을 점진적으로 개선
            
        - 긴 답변, 정보 누적에 좋지만, 직렬 실행이라 느리고 호출 많음
            
    - **map_rerank**:
        
        - 각 문서+질문 → (답변, 점수) 생성
            
        - 점수가 가장 높은 답변 선택
            
        - LLM이 스스로 “관련도 점수”를 매기도록 요구해야 함
            

---

### 4.7 한 줄짜리 vs 상세 구성

- `VectorStoreIndexCreator` + `index.query()` → **한 줄짜리 고수준 API**
    
- 직접:
    
    - loader
        
    - documents
        
    - embeddings
        
    - vectorstore
        
    - retriever
        
    - RetrievalQA  
        → **세밀한 제어 가능**
        

실전 팁:

- “빨리 PoC 만들 때”는 one-liner
    
- “프로덕션 튜닝/실험” 단계에서는 모든 컴포넌트를 나눠서 세밀하게 조정
    

---

## 5. Lesson 5 – Evaluation (평가)

### 5.1 왜 평가가 중요한가?

- LLM 앱은 여러 단계(chain)로 구성:
    
    - 검색
        
    - 정제
        
    - 요약
        
    - 답변 생성 등
        
- 개선 포인트:
    
    - 다른 LLM으로 바꿔 보기
        
    - vector store 전략 변경
        
    - 프롬프트 수정
        
- 문제:
    
    - “좋아졌다/나빠졌다”를 어떻게 판단할 것인가?
        

평가의 구성 요소:

1. **테스트 데이터 (질문/정답 셋)** 준비
    
2. **체인/앱 실행 → 예측값** 생성
    
3. **정답 vs 예측값 비교**
    
    - 사람 눈으로
        
    - 혹은 또 다른 LLM으로
        

---

### 5.2 평가용 체인 준비 – 문서 QA 체인 재사용

- 이전 레슨에서 만든 **RetrievalQA 체인**을 그대로 평가 대상 앱으로 사용.
    
- 데이터 로딩, 인덱스 생성, 체인 생성까지 동일.
    

---

### 5.3 평가용 예제 데이터셋 만들기

#### 5.3.1 수동 생성

- 몇 개 문서를 눈으로 보고:
    
    - 질문/정답 쌍을 직접 만든다.
        
- 예:
    
    1. “Cozy Comfort Pullover Set에 side pocket이 있는가?” → “Yes”
        
    2. “이 다운 자켓은 어떤 컬렉션에 속해 있는가?” → “DownTek collection”
        

이렇게 만든 예제는 정확하지만, **확장성이 떨어진다.**

---

#### 5.3.2 LangChain으로 자동 생성 – QAGenerationChain

LangChain은 **문서 → (질문, 정답)** 쌍을 생성하는 체인을 제공:

1. 문서를 LLM에 넘기고
    
2. “이 문서 내용에 관해 적절한 질문 1개와 그 정답을 생성하라”
    

→ 많은 문서에 대해 자동으로 QA 데이터셋을 만들 수 있다.

결과 구조:

```python
{
  "query": "What is the weight of this jacket?",
  "answer": "The weight is 1.3 pounds.",
}
```

그리고 이 (query, answer)들을 기존 수동 예제와 합쳐서  
평가용 examples 리스트를 만든다.

---

### 5.4 langchain.debug – 체인 내부 들여다보기

```python
import langchain
langchain.debug = True
```

이 상태에서 체인을 한 번 실행하면:

- 어떤 서브 체인들이 호출되는지
    
- 각 단계에서:
    
    - 들어가는 입력
        
    - 나오는 출력
        
- LLM에 실제로 전달되는 프롬프트(시스템/유저 메시지 포함)
    
- 토큰 사용량 (prompt_tokens, completion_tokens, total_tokens)
    

등을 모두 콘솔에 출력해준다.

특히 Retrieval QA에서:

- 검색된 `context` (문서 청크들)을 눈으로 확인할 수 있어서
    
    - “검색이 잘못돼서 답이 이상한지”
        
    - “검색은 맞는데 프롬프트/LLM이 이상한지”  
        를 구분해서 디버깅할 수 있다.
        

---

### 5.5 LLM을 이용한 자동 평가 – QAEvalChain

- 문자열로 된 정답 vs 예측값을 비교할 때:
    
    - 단순 문자 비교, 부분 문자열 매칭 등은 한계가 크다.
        
    - 서로 다른 표현이어도 의미가 같을 수 있다.
        
- 따라서 **LLM에게 평가를 맡긴다**:
    

```python
from langchain.evaluation.qa import QAEvalChain

eval_chain = QAEvalChain.from_llm(llm=ChatOpenAI(temperature=0))
graded_outputs = eval_chain.evaluate(
    examples=examples,
    predictions=predictions,
)
```

각 예제에 대해:

- `question` (query)
    
- `answer` (ground truth)
    
- `prediction` (앱의 답변)
    
- `grade` (LLM이 판단한 평가: “CORRECT” 등)
    

을 얻는다.

예:

- question: “Does the Cozy Comfort Pullover Set have side pockets?”
    
- real answer: “Yes”
    
- predicted answer: “The Cozy Comfort Pullover Set, Stripe does have side pockets.”
    
- grade: “CORRECT”
    

여기서:

- 문자상으로는 “Yes” vs 긴 문장이라 완전히 다르다.
    
- 하지만 LLM은 의미를 이해하고 “정답”으로 판단.
    

→ 이게 전통적인 문자열/정규식 기반 평가와 다른 점.

---

### 5.6 LangChain Evaluation Platform (UI)

- 노트북에서 실행한 체인 실행(run) 기록을  
    웹 UI에서 **시각적으로 탐색**할 수 있는 플랫폼.
    
- 기능:
    
    - 각 실행에 대해 입력/출력/중간 단계 확인
        
    - LLM 프롬프트, 응답, 토큰 사용량 시각화
        
    - 특정 실행을 “데이터셋”에 추가해서  
        나중에 재평가/비교 시 사용할 수 있음
        

사용 흐름:

1. 개발 중에 다양한 입력으로 체인을 실험
    
2. 좋은/나쁜 케이스를 UI에서 데이터셋으로 저장
    
3. 체인 버전을 바꿀 때마다 같은 데이터셋으로 다시 평가
    
4. 결과 비교 → 개선 여부 확인
    

---

## 6. Lesson 6 – Agents (에이전트)

### 6.1 LLM을 “지식 저장소”가 아니라 “추론 엔진”으로 보기

- LLM = 인터넷 텍스트를 보고 학습한 “거대한 통계 모델”
    
- 단순히 “지식 베이스”로만 쓰기보다:
    
    - **입력 텍스트 + 추가 정보(도구, 외부 데이터)**를 받아
        
    - “어떤 도구를 호출할지” 생각하고
        
    - “어떻게 문제를 풀지” 계획하고
        
    - 필요에 따라 여러 차례 행동을 수행하고
        
    - 최종 답을 반환하는 **추론 엔진**으로 활용할 수 있다.
        

LangChain의 **Agents**는 바로 이런 패턴을 구현하는 프레임워크.

---

### 6.2 Agents의 구성 요소

1. **LLM (reasoning engine)**
    
    - 어떤 도구를 쓸지, 입력은 무엇인지, 언제 멈출지를 “생각”한다.
        
2. **Tools (도구)**
    
    - 검색 엔진 (DuckDuckGo)
        
    - Wikipedia
        
    - 날짜/시간 API
        
    - 임의의 HTTP API, DB, 함수 등
        
3. **Agent Type**
    
    - 어떤 프롬프트/전략으로 도구 사용을 이끌지 지정
        
    - 예: `CHAT_ZERO_SHOT_REACT_DESCRIPTION`
        
4. **Parsing / Error Handling**
    
    - LLM 출력에서 “어떤 도구를, 어떤 입력으로 호출할지”를 파싱해야 한다.
        

---

### 6.3 기본 세팅 – DuckDuckGo + Wikipedia 에이전트

```python
from langchain.agents import load_tools, initialize_agent, AgentType
from langchain.chat_models import ChatOpenAI

llm = ChatOpenAI(temperature=0)
tools = load_tools(["duckduckgo-search", "wikipedia"], llm=llm)

agent = initialize_agent(
    tools=tools,
    llm=llm,
    agent=AgentType.CHAT_ZERO_SHOT_REACT_DESCRIPTION,
    handle_parsing_errors=True,
    verbose=True,
)
```

- `CHAT_ZERO_SHOT_REACT_DESCRIPTION`:
    
    - Chat 모델에 최적화된
        
    - React(Reason+Act) 스타일 에이전트
        
    - LLM이 “Thought → Action → Observation → Thought ... → Final Answer” 순서로 추론
        

---

### 6.4 예제 – 2022 월드컵 우승팀

```python
agent.run("Who won the 2022 World Cup?")
```

에이전트의 행동:

1. LLM이 훈련 시점(2021까지)만 알고 있음 → 자체 지식으로는 모름
    
2. “DuckDuckGoSearch” 도구를 사용하기로 결정
    
3. 검색 결과에서 2022 월드컵 관련 정보 획득
    
4. 처음에는 헷갈려서 “아직 진행 안 됨” 등 오답을 낼 수도 있음
    
5. 추가 검색/생각을 통해 최종적으로 “Argentina won …”이라는 답에 도달
    

→ Agents는 아직 실험적이고, 항상 완벽하지 않다.  
하지만 “외부 도구 + LLM 추론”의 대표 패턴.

---

### 6.5 Wikipedia 예제 – Tom M. Mitchell

```python
agent.run("What book did Tom M. Mitchell write?")
```

에이전트 행동:

1. “Wikipedia 도구가 적합하다”고 판단
    
2. “Tom M. Mitchell Wikipedia” 검색
    
3. 추가로 “Tom M. Mitchell Machine Learning” 검색
    
4. “Machine Learning”이라는 교과서 정보를 찾음
    
5. 최종 답: “He wrote the textbook 'Machine Learning'.”
    

---

### 6.6 커스텀 Tool 만들기 – 오늘 날짜 함수

```python
from langchain.agents import tool
from datetime import datetime

@tool
def time(text: str) -> str:
    """Use this tool to get today's date. The input should always be an empty string."""
    return str(datetime.today().date())
```

- `@tool` 데코레이터:
    
    - 임의의 파이썬 함수를 LangChain Tool로 변환
        
- docstring:
    
    - 에이전트가 이 도구를 언제, 어떻게 쓰야 하는지 이해하도록 설명
        
    - 입력 형태, 제약 등 명시
        

새 에이전트:

```python
tools = load_tools(["duckduckgo-search", "wikipedia"], llm=llm)
tools.append(time)

agent = initialize_agent(
    tools=tools,
    llm=llm,
    agent=AgentType.CHAT_ZERO_SHOT_REACT_DESCRIPTION,
    handle_parsing_errors=True,
    verbose=True,
)

agent.run("What is the date today?")
```

에이전트는:

1. “time” 도구가 적합하다고 판단
    
2. docstring에 따라 입력을 빈 문자열로 호출
    
3. `Observation: 2023-05-21` 같은 결과를 받아
    
4. “Today’s date is 2023-05-21.”처럼 답변
    

→ 이런 식으로 임의의 API, DB, 비즈니스 로직을 전부 Tool로 만들 수 있음.

---

## 7. 마무리 – 전체 정리

### 7.1 이 코스에서 만든 것들

1. **Models, Prompts, Parsers**
    
    - LLM 호출 헬퍼
        
    - LangChain의 ChatOpenAI/PromptTemplate
        
    - StructuredOutputParser로 JSON/dict 파싱
        
2. **Memory**
    
    - ConversationBufferMemory
        
    - ConversationBufferWindowMemory
        
    - ConversationTokenBufferMemory
        
    - ConversationSummaryBufferMemory
        
    - 벡터/엔티티 기반 메모리 개념
        
3. **Chains**
    
    - LLMChain
        
    - SimpleSequentialChain
        
    - SequentialChain
        
    - Router + MultiPromptChain
        
4. **Question Answering over Documents**
    
    - CSVLoader, Embeddings, VectorStores
        
    - VectorStoreIndexCreator (one-liner)
        
    - Retriever + RetrievalQA 체인
        
    - chain_type: stuff / map_reduce / refine / map_rerank
        
5. **Evaluation**
    
    - 수동/자동 QA 예제 생성 (QAGenerationChain)
        
    - langchain.debug로 체인 내부 디버깅
        
    - QAEvalChain으로 LLM 기반 평가
        
    - Evaluation Platform(UI)로 실행 기록/데이터셋 관리
        
6. **Agents**
    
    - LLM as reasoning engine
        
    - Tools (DuckDuckGo, Wikipedia, custom tool)
        
    - AgentType.CHAT_ZERO_SHOT_REACT_DESCRIPTION (React 스타일)
        
    - 도구 호출 + 관찰 + 최종 답변