# From LLM to AI Agent

## 1. 기초 용어: AI에서 딥러닝까지

### 1.1 인공지능(AI) vs 머신러닝(ML) vs 딥러닝(DL)
![[Pasted image 20251128143547.png]]

- **AI (Artificial Intelligence, 인공지능)**
  - 인간의 지능(학습, 추론, 계획, 인식 등)을 모방하는 모든 기술.
  - 규칙 기반 시스템(룰 엔진)도 넓은 의미의 AI에 포함.

- **ML (Machine Learning, 머신러닝)**
  - “규칙을 사람이 일일이 짜지 않고, 데이터를 통해 규칙을 스스로 학습하는 방법”.
  - 예: 스팸메일 분류기, 추천 시스템, 수요 예측 등.

- **DL (Deep Learning, 딥러닝)**
  - 다층 신경망(Deep Neural Network)을 이용한 머신러닝.
  - 이미지 인식, 음성 인식, LLM(언어 모델) 등 **최근 대부분의 획기적 성능 향상**은 딥러닝에서 나왔다.

> [!note] 한 줄 요약  
> AI ⊇ ML ⊇ DL  
> 인공지능 안에 머신러닝이 있고, 그 안에 딥러닝이 있다.

---

### 1.2 학습 방식: 지도/비지도/강화/자기지도

- **지도 학습 (Supervised Learning)**
  - “입력 + 정답 레이블”이 있는 데이터로 학습
  - 예: 스팸메일 여부(스팸/정상), 이미지에 무엇이 있는지(고양이/개)

- **비지도 학습 (Unsupervised Learning)**
  - 정답 레이블 없이 데이터 구조를 파악
  - 예: 고객 군집화, 이상치 탐지

- **강화 학습 (Reinforcement Learning)**
  - 환경과 상호작용하며 보상을 최대화하는 행동 전략을 학습
  - 예: 알파고, 게임 AI, 로봇 제어

- **자기지도 학습 (Self-Supervised Learning)**
  - 레이블이 없는 방대한 데이터를 스스로 “문제–정답” 형태로 만들어 학습
  - LLM의 사전학습(Pretraining)이 여기에 해당  
    → 문장에서 다음 단어 예측, 빈칸 채우기 등

---

### 1.3 자연어처리(NLP)와 신경망

- **NLP (Natural Language Processing)**
  - 기계 번역, 감정 분석, 질의응답, 요약, 챗봇 등 “언어를 다루는 모든 기술”
- **신경망(Neural Network)**
  - 입력층 – 여러 개의 은닉층 – 출력층 구조
  - 각각의 연결에는 가중치가 있고, 학습 과정에서 이 가중치를 조정

![Bildmotiv: neural network architecture input hidden output layers](https://encrypted-tbn3.gstatic.com/licensed-image?q=tbn:ANd9GcRJs2NJokGm4Dgrr4HIQ-SriDXBBn6Cp532C24J3Gp-1Y6t9e0m05IEgQoaHXqjLCt6XNqFGCYRtYOPH--Z1LCwIaV1KUdljEwcLH0ctLE8ffCViEs)

<이미지: Feedforward Neural Network>
- Input layer 에서 하나 이상의 Hidden layer 를 거쳐 Output layer 로 정보가 흐르는 방식
	- 각 층은 서로 연결된 노드 또는 뉴런으로 구성되며, 이런 연결의 강도는 학습 과정에서 조정되는 가중치로 표현된다.
1. Input layer & node:
	- 입력층은 네트워크가 학습할 원시데이터를 수신한다. $x_1$  부터 $x_n$ 까지 레이블이 지정된 이 층의 각 노드는 입력 데이터의 단일 특징 or 속성을 나타낸다. ex. 이미지 인식 작업에서는 이것은 이미지의 픽셀 값일수도 있다. 
	- 입력 노드는 $x_1$ 과 $x_2$ 와 같은 입력 노드 자체는 어떠한 계산도 수행하지 않는다. 입력 값을 다음 층으로 전달하기만 하고, 이러한 노드에서 시작하는 화살표는 정보 흐름 방향을 나타내며, 이런 유형의 네트워크에서는 순방향이다.
2. Hidden layer & node:
	- 은닉층: 대부분의 계산이 발생하는 구간. 은닉층의 각 노드는 연결선으로 표시된 것처럼 이전 층의 모든 노드로부터 입력을 받는다.
	- 은닉 노드는 $h(1)_1$ 에서 $h(1)_m$ 까지 레이블이 지정된 은닉층의 노드는 입력의 가중 합을 계산한 다음 이 합에 비선형 활성화 함수를 적용한다. 이러한 비선형성은 네트워크가 데이터 내의 복잡한 패턴과 관계를 학습할 수 있도록 해주므로 매우 중요하다. 첨자 $(1)$ 는 이것이 첫번재 은닉층임을 나타낸다. 심층 신경망에는 이러한 층이 여러개 있다.
3. Output


여기까지가 **전통적인 “AI 기초”**에 해당한다.  
이제 핵심인 **LLM·트랜스포머 시대**로 넘어간다.

---

## 2. LLM 생태계와 모델 아키텍처

### 2.1 트랜스포머(Transformer)의 등장

![Bildmotiv: Transformer model architecture diagram simplified](https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcRsAfWXAl7V0jp9LVHabmJDUJGqxx4sMle453pftUQtr8HV8K9QXu0Jg-rbM8I3ZBBABIfkriIO6Dz9GXxS4WjTeNHUkQTJpdx9C5j6j3tsCGRKNfY)

- 2017년 논문 **“Attention Is All You Need”**에서 제안
- 핵심 아이디어: **Self-Attention**
  - 문장 내 단어들 사이의 관계·중요도를 한 번에 계산
  - 순차 처리(RNN)와 달리 병렬 처리가 가능 → **훈련 속도·성능 둘 다 비약적 향상**

> [!note] GPT의 T = Transformer  
> GPT, LLaMA 등 현대 LLM 대부분은 Transformer 아키텍처 기반이다.

---

### 2.2 LLM(Large Language Model)의 기본 개념

- 거대한 파라미터 수(수십억~수천억)를 가진 언어 모델
- 대규모 텍스트 코퍼스를 기반으로 **다음 토큰 예측**을 학습
- 학습 후에는:
  - 글쓰기, 번역, 코딩, 요약, 분석, 질의응답, 추론 등 다양한 태스크 수행 가능

대표 예시:
- GPT 계열, Claude, Gemini, LLaMA, Mistral 등

---

### 2.3 LLM 학습 파이프라인: Pretrain → SFT → RLHF/DPO

LLM은 보통 **3단계**를 거쳐 탄생한다.

1. **Pretraining (사전학습)**
   - 대규모 웹/문서/코드 데이터로 “다음 토큰 예측” 학습
   - 언어 패턴·세계 상식·코드 구조 등 **기본 지식**을 습득

2. **SFT (Supervised Fine-Tuning, 지도 미세조정)**
   - 사람이 만든 **고품질 예시 데이터**로 추가 학습
   - 예: “질문 → 좋은 답변” 페어

3. **RLHF / RLAIF / DPO**
   - **RLHF**: Reinforcement Learning from Human Feedback
   - **RLAIF**: AI Feedback을 사용하는 변형
   - **DPO**: Direct Preference Optimization
   - 목적: “어떤 답변이 더 유용하고 안전한지”에 대한 **선호 정보**를 반영해 모델을 정렬(Alignment)시키는 단계

이 과정을 통해:
- 욕설/혐오 표현 감소
- 사용자 의도에 더 잘 맞는 응답
- 기업 규범/정책 기준에 맞는 답변

---

### 2.4 sLLM, SLM, 온디바이스 AI

- **sLLM (small Large Language Model)**
  - 기존 대형 LLM을 압축·경량화하여 만든 작은 버전
  - 여전히 “대형 모델 계열”이지만 크기와 비용을 줄인 형태

- **SLM (Small Language Model)**
  - 처음부터 작은 크기로 설계된 모델
  - 특정 태스크/도메인에 최적화
  - 예: Phi 계열, Gemma, 모바일/PC 온디바이스 모델

- **온디바이스(On-device) AI**
  - 클라우드가 아니라 스마트폰·노트북·엣지 디바이스에서 직접 실행
  - 장점:
    - 개인정보 보호(데이터가 밖으로 나가지 않음)
    - 네트워크 연결 없이 동작
    - 지연(latency) 감소

---

### 2.5 모델 효율화: MoE, Quantization, Distillation

#### 2.5.1 MoE (Mixture of Experts)

- 하나의 거대한 모델 대신, 여러 “전문가 모델(Expert)”들로 구성
- 입력마다 일부 전문가만 활성화 → **고성능 + 비용 절감**
- 예:
  - 일반 대화는 일반 전문가,
  - 코드 관련 질문은 코드 전문가가 담당

#### 2.5.2 Quantization (양자화)

- 파라미터를 32bit float → 8bit, 4bit 등으로 줄이는 기술
- 메모리 사용량과 연산량을 크게 줄여 **온디바이스 / sLLM 구현의 핵심**

#### 2.5.3 Distillation (지식 증류)

- 큰 모델(Teacher)의 지식을 작은 모델(Student)에 “요약 전달”
- 목표:  
  - 성능은 최대한 유지하면서  
  - 모델 크기와 추론 비용을 줄이기

---

### 2.6 컨텍스트 윈도우(Context Window)

- 모델이 한 번에 읽고 이해할 수 있는 토큰(token) 수
- 컨텍스트 윈도우가 크면:
  - 책 한 권, 코드베이스 전체, 여러 문서를 한 번에 주고 질의응답 가능
- 최근 추세:
  - 수십만~수백만 토큰까지 확장
  - “긴 컨텍스트 vs RAG”가 중요한 논쟁 포인트
    - 긴 컨텍스트만으로는 **최신/대용량 지식 관리**에 한계
    - 그래서 RAG와 병행하는 패턴이 여전히 강력하다.

---

## 3. 실전 AI 구현 기술

이 섹션은 실제로 LLM을 “서비스/제품”에 붙일 때 필수로 고려해야 할 요소들이다.

---

### 3.1 토큰(Token)

- LLM이 텍스트를 처리하는 최소 단위
  - 영어: 보통 1 토큰 ≈ 0.75단어 정도
  - 한국어: 과거에는 비효율적(1글자에 여러 토큰)인 경우가 많았으나  
    최신 토크나이저는 많이 개선된 상태

**토큰 = 비용 + 속도 + 컨텍스트 제한과 직결**  
→ 프롬프트 설계, 문서 chunking, RAG 설계에 중요하다.

---

### 3.2 임베딩(Embedding)과 벡터(Vector)

- **임베딩(Embedding)**
  - 텍스트·이미지·오디오 등을 의미 공간에서의 벡터로 변환하는 작업/결과
  - 의미가 비슷한 것들은 벡터 공간에서 서로 가깝게 위치

- 비유:
  - 음식 맛을 “단맛, 짠맛, 매운맛, 신맛” 등 숫자 벡터로 표현한다고 하면  
    - 사과 = [0.8, 0.2, 0.0, 0.1]  
    - 김치 = [0.1, 0.9, 0.7, 0.8]
  - AI는 단어/문장을 이런 벡터로 표현해 의미적 유사성을 계산한다.

---

### 3.3 벡터 데이터베이스(Vector Database)

- 임베딩된 벡터를 저장·검색하는 데 특화된 DB
- 특징:
  - 코사인 유사도, Inner Product 등으로 **“가까운 벡터”를 매우 빠르게 찾는 기능**
- 활용:
  - RAG, 추천 시스템, 이미지 검색, 유사 문서 검색 등

대표 솔루션: Pinecone, Weaviate, Qdrant, Milvus, Chroma 등

---

### 3.4 RAG (Retrieval-Augmented Generation)와 RAG 2.0


![Bildmotiv: Retrieval Augmented Generation RAG architecture diagram](https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcQGcMf6BBtT1h64HE2953wrusskMcXSJNO6S-ez83PFuFfcDeFLO951WRUuvC_LXdbIpMqQZXhKPBNhJwAeDkV0caKeSXMPSysrFkpdR-tsnFH1ROU)

- RAG를 사용하면 LLM은 외부 지식 베이스에서 검색된 사실 정보를 기반으로 답변을 생성하여 더욱 정확하고 상세한 답변을 제공할 수 있습니다.
#### 3.4.1 기본 RAG

- LLM의 한계를 보완하기 위한 구조:
  1. 사용자의 질문을 임베딩으로 변환
  2. 벡터DB에서 관련 문서/조각(chunk)을 검색
  3. 검색 결과를 LLM에 “컨텍스트”로 주고 답변 생성

- 장점:
  - 최신 정보 / 사내 문서 / 특정 도메인 지식 연결 가능
  - 할루시네이션 감소
  - 기업 내부 데이터와 안전하게 연동 가능

#### 3.4.2 RAG 2.0 / 고급 RAG

실전에서는 단순 RAG로 부족하다. 그래서 다음 기술들이 쓰인다.

- **Chunking 전략**
  - 고정 길이가 아닌, 의미 단위로 자르는 Semantic Chunking
  - 문단/제목/구조를 반영한 Recursive Chunking

- **Hybrid Search**
  - BM25 같은 키워드 검색 + 벡터 검색을 함께 사용
  - 예: “법 조문 번호 같은 키워드”와 “의미적 유사성”을 모두 반영

- **Re-ranking**
  - 1차로 가져온 문서들을 별도 모델로 다시 점수화
  - 가장 관련 높은 문서만 컨텍스트에 넣기

- **GraphRAG**
  - 문서들 간의 관계(인물–사건–법조문 등)를 **그래프 구조**로 표현
  - “전체 사건의 흐름 요약”, “A와 B의 관계 정리” 같은 고차원 질의에 강함

---

### 3.5 파인튜닝(Fine-tuning) vs RAG 비교

많은 사람들이 헷갈리는 부분이라 표로 정리한다.

| 구분 | RAG (검색 증강 생성) | Fine-tuning (파인튜닝) |
| --- | --- | --- |
| 목적 | 최신/외부 지식 연결, 사실 기반 답변 | 모델의 말투·스타일·도메인 적응 |
| 비유 | 오픈북 시험 (책을 보면서 답) | 교과서를 통째로 외운 상태로 시험 |
| 데이터 위치 | 외부 DB(벡터DB 등)에 유지 | 모델 파라미터 안에 녹아들어감 |
| 장점 | 최신 정보 반영, 데이터 교체 쉬움, 보안에 유리 | 특정 포맷, 스타일, 태스크에 매우 강력 |
| 단점 | RAG 파이프라인 설계 필요 | 재학습 비용·리스크(할루시네이션 악화 가능) |
| 예시 | 사내 위키·법령·문서 검색 후 답변 | “우리 회사 말투”, 특정 포맷 보고서 자동화 |

실전에서는 **RAG + 소규모 파인튜닝(또는 SFT)** 조합이 많이 쓰인다.

---

### 3.6 프롬프트 엔지니어링(Prompt Engineering)

- LLM에게 “어떻게 질문하느냐”를 설계하는 기술
- 구성 요소:
  - 역할 지정 (You are …)
  - 입력 형식 정의
  - 출력 형식 강제 (JSON, 마크다운 등)
  - 예시 제공(Few-shot)

실제 운영 단계에서는 프롬프트만으로 문제를 해결하기보다:
- **시스템 프롬프트 + 도구 호출 + RAG + 평가(LLM Eval)**를 함께 설계한다.

---

### 3.7 평가(Eval), 가드레일(Guardrails), Observability

LLM 서비스를 운영하려면 **“모델이 잘 동작하는지, 위험하지 않은지”** 측정해야 한다.

- **LLM Eval**
  - 정답률, 사실성, 유용성, 톤 등 평가
  - 자동 평가(LLM이 LLM을 평가) + 휴먼 평가 병행

- **Guardrails**
  - 욕설, 혐오, 개인정보(PII) 노출, 프롬프트 인젝션 등 방지
  - 정책 기반 필터 + 모델 기반 안전 레이어 조합

- **Observability**
  - 어떤 프롬프트에 어떤 응답이 나왔는지, 오류/할루시네이션 패턴은 무엇인지 추적
  - 로그, 대시보드, 실패 케이스 리플레이 등

---

## 4. AI Agent 시대

이제 “질문–응답” 수준을 넘어, **목표를 달성하기 위해 스스로 행동하는 AI**가 주목받고 있다.

---

### 4.1 AI Agent란 무엇인가

- 단순 Q&A 챗봇:  
  - 입력 질문 → 출력 답변
- **AI Agent:**
  - “목표를 받아 스스로 계획을 세우고, 도구를 사용하고, 중간 결과를 검토하며, 최종 결과를 도출하는 시스템”

구성 요소(개념적으로):

1. 목표 이해 (Goal Understanding)
2. 계획 수립 (Planning)
3. 도구 사용 (Tool / API Calling)
4. 기억 관리 (Memory)
5. 결과 검증 및 수정 (Reflection / Critique)

---

### 4.2 기존 챗봇 vs AI Agent

| 항목 | 기존 챗봇 | AI Agent |
| --- | --- | --- |
| 인터랙션 | 질문–답변 중심 | 목표–계획–실행–검증 |
| 데이터 접근 | 고정된 FAQ/시나리오 | DB, API, 웹, 워크플로우 등 다양한 도구 |
| 적응력 | 정해진 패턴 내에서만 응답 | 상황에 따라 다른 전략/도구 사용 가능 |
| 활용 예 | 고객센터 FAQ | 법률 분석, 재무 모델링, 업무 자동화, RPA 대체/보완 |

---

### 4.3 Agent의 핵심 기술: Planning, Reasoning, Memory

#### 4.3.1 Planning & Reasoning 패턴

최근 많이 언급되는 **“Reasoning(추론 강화) 모델”**들과 함께 다음 패턴들이 쓰인다.

- **ReAct (Reason + Act)**
  - “생각(Reasoning)”과 “도구 호출(Action)”을 번갈아 수행
  - 예:  
    1) 문제 분석  
    2) 웹 검색 도구 호출  
    3) 검색 결과 요약  
    4) 다음 단계 판단 …

- **Chain-of-Thought (CoT)**
  - 중간 사고 과정을 단계별로 표현
  - 특히 수학/논리 문제에서 유용

- **Tree-of-Thought (ToT) / Graph-of-Thought**
  - 여러 후보 사고 경로를 나무/그래프 구조로 탐색
  - 복잡한 문제에서 다양한 경로를 비교하며 더 나은 해를 찾는 방식

- **Reflexion**
  - 한 번 시도 후 결과를 스스로 평가하고, 개선된 시도를 반복

이러한 패턴을 **Reasoning 특화 모델**(소위 System 2 스타일 모델)과 결합해 성능을 높인다.

---

#### 4.3.2 Memory (기억)

에이전트는 한 번의 대화만이 아니라, **시간에 따른 상태**를 다뤄야 한다.

- **Short-term Memory**
  - 현재 대화/작업 내에서의 최근 컨텍스트
- **Long-term Memory**
  - 벡터DB 등에 저장되는 사용자 이력, 과거 작업, 문서
- **Episodic Memory**
  - “세션 단위”의 경험 기록
- **Profile / Preference Memory**
  - 사용자의 선호, 역할, 권한 등

Memory 설계는 **개인화된 Agent**의 핵심이다.

---

### 4.4 Tool Calling과 MCP(Model Context Protocol)

#### 4.4.1 Tool / Function Calling

- LLM이 JSON 형식으로 “어떤 도구를 어떤 파라미터로 호출할지” 결정
- 예:
  - 검색 API
  - 사내 ERP 시스템 조회
  - 캘린더/이메일 처리
  - 계산기, 번역기, 외부 LLM 등

#### 4.4.2 MCP (Model Context Protocol)

- 다양한 데이터 소스와 도구를 **표준화된 방식으로** LLM과 연결하는 프로토콜
- 특징:
  - 파일 시스템, DB, HTTP API 등을 공통 인터페이스로 다루기
  - 보안·권한 관리 일관성 확보
  - 여러 에이전트/모델에서 재사용 가능

MCP는 **복수의 Agent·LLM·도구**가 동시에 협업하는 환경에서 중요도가 높다.

---

### 4.5 멀티 에이전트 시스템(Multi-Agent System)

- 하나의 거대 Agent 대신, 여러 전문 에이전트가 역할 분담
  - 예:
    - 계약서 분석 Agent
    - 법령 검색 Agent
    - 판례 요약 Agent
    - 리스크 평가 Agent
- 오케스트레이션 프레임워크:
  - LangGraph
  - AutoGen
  - CrewAI 등

이 구조는 **복잡한 업무 프로세스를 AI가 수행**하게 만들기 위한 핵심 패턴이다.

![[Pasted image 20251128143507.png]]

---

## 5. 주목받는 AI 패러다임과 미래 방향

### 5.1 AGI(Artificial General Intelligence)

- 특정 과제가 아니라 **“인간 수준의 일반 지능”**을 목표로 하는 개념
- 현재의 LLM/Agent는 **“좁은 의미의 강력한 도구”**에 가깝고,
- AGI는 여전히 연구·철학·윤리 논쟁의 중심에 있다.

---

### 5.2 온디바이스 AI와 개인화

- 스마트폰·PC·엣지 기기에서 돌아가는 sLLM/SLM
- 개개인의:
  - 스타일
  - 일정
  - 문서
  - 건강 데이터 등을 기반으로 **초개인화된 AI 비서** 구현 가능
- 프라이버시·보안·에너지 효율이 핵심 이슈

---

### 5.3 Multi-Agent + Enterprise Workflow

- 기업에서는:
  - 문서 관리 시스템
  - ERP/CRM
  - 개발/배포 파이프라인
  - 보안·거버넌스 시스템
- 여기에 Agent와 RAG·MCP를 결합해:
  - 업무 자동화
  - 의사결정 지원
  - 컴플라이언스 체크
  - 코드 리뷰·배포 자동화 등을 구현

---

### 5.4 Responsible AI, Safety, Alignment

- AI가:
  - 차별적이지 않고
  - 안전하며
  - 개인정보를 보호하고
  - 법·규제를 준수하도록
- 기술 + 프로세스 + 정책을 함께 설계하는 분야

핵심 키워드:
- Alignment
- Safety Evaluation
- Policy Enforcement
- Audit Log
- Red Teaming

---

## 6. 마무리 정리

이 노트는 다음 축으로 AI/LLM/Agent를 정리했다.

1. **기초 개념**  
   - AI/ML/DL, 지도/비지도/강화/자기지도, NLP, 신경망

2. **LLM 생태계**  
   - Transformer, LLM 학습 파이프라인(Pretrain–SFT–RLHF/DPO)  
   - sLLM/SLM, 온디바이스, MoE/Quantization/Distillation, 컨텍스트 윈도우

3. **실전 구현 기술**  
   - 임베딩, 벡터DB, RAG/RAG 2.0, GraphRAG  
   - 프롬프트 엔지니어링, Fine-tuning vs RAG  
   - Eval, Guardrails, Observability

4. **AI Agent 시대**  
   - Agent 정의, Planning/Reasoning 패턴(ReAct, CoT, ToT, Reflexion)  
   - Memory 설계, Tool Calling, MCP, Multi-Agent 시스템

5. **미래 방향**  
   - AGI, 온디바이스 AI, Enterprise Agent, Responsible AI

이 기본 축을 이해하고 있으면,
- 새로운 논문/모델/프레임워크가 나와도 **“이게 어느 층에 해당하는지”**를 빠르게 파악할 수 있고,
- 실제 서비스나 제품을 설계할 때 **어디서 무엇을 더 배워야 하는지** 방향을 잡을 수 있다.