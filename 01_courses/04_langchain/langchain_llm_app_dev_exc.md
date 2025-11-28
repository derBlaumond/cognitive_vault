## 0. 공통 세팅 (한 번만 하면 됨)

```bash
npm init -y
npm install typescript ts-node @types/node dotenv
npm install @langchain/openai @langchain/core langchain
```

`tsconfig.json` (최소 예시):

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "node",
    "esModuleInterop": true,
    "strict": true,
    "skipLibCheck": true
  }
}
```

`.env`:

```bash
OPENAI_API_KEY=sk-...
```

아래 예제들은 전부 **ESM + TS** 기준이야.

---

## 1. Models, Prompts, Parsers

### 1-1. 기본 Chat 모델 호출

```ts
// 01_models_prompts_parsers_basic.ts
import "dotenv/config";
import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage } from "@langchain/core/messages";

async function main() {
  const model = new ChatOpenAI({
    modelName: "gpt-4o-mini", // 또는 gpt-3.5-turbo 등
    temperature: 0,
  });

  const res = await model.invoke([
    new HumanMessage("1 + 1은 얼마야? 아주 짧게 답해."),
  ]);

  console.log(res.content);
}

main();
```

- 강의에서 `get_completion` 헬퍼 함수를 쓰던 걸, JS/TS에선 `model.invoke()`로 생각해도 됨.
    
- `temperature: 0` → 재현 가능한, 덜 랜덤한 출력.
    

---

### 1-2. ChatPromptTemplate + f-string 대체

Andrew 예시:

> “triple backticks로 감싼 text를 style에 맞게 번역해줘…”

이걸 LangChain JS로:

```ts
// 01_models_prompts_parsers_prompt.ts
import "dotenv/config";
import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";

async function main() {
  const model = new ChatOpenAI({
    modelName: "gpt-4o-mini",
    temperature: 0,
  });

  const prompt = ChatPromptTemplate.fromTemplate(
    `Translate the text delimited by triple backticks
into a style that is: {style}.

\`\`\`
{text}
\`\`\``
  );

  const chain = prompt.pipe(model).pipe(new StringOutputParser());

  const customerStyle = "American English in a calm and respectful tone";

  const pirateEmail = `
I'd be fuming that me blender lid flew off
and splattered me kitchen walls with smoothie.
And to make matters worse, the warranty don't
cover the cost of cleaning up me kitchen.
I need your help right now, matey.
`;

  const result = await chain.invoke({
    style: customerStyle,
    text: pirateEmail,
  });

  console.log(result);
}

main();
```

- 강의의 `prompt_template.format(style=..., text=...)` →  
    JS/TS에선 `chain.invoke({ style, text })`.
    
- `pipe` 패턴: `prompt → model → parser` 를 하나의 체인처럼 사용.
    

---

### 1-3. JSON 구조 파싱(Structured Output) – 리뷰 → JSON

강의 후반 JSON 파싱 예제를 **LangChain JS**로 구현.

아이디어:

1. `zod`로 스키마 정의
    
2. `StructuredOutputParser` 생성
    
3. parser에서 요구하는 `formatInstructions`를 prompt에 삽입
    
4. LLM 출력 → `.parse()`로 JS 객체로 변환
    

```ts
// 01_models_prompts_parsers_json.ts
import "dotenv/config";
import { z } from "zod";
import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import {
  StructuredOutputParser,
  OutputParserException,
} from "@langchain/core/output_parsers";

async function main() {
  const model = new ChatOpenAI({
    modelName: "gpt-4o-mini",
    temperature: 0,
  });

  // 1) 스키마 정의 (강의의 gift / delivery_days / price_value)
  const reviewSchema = z.object({
    gift: z
      .boolean()
      .describe("Was the item purchased as a gift for someone else?"),
    delivery_days: z
      .number()
      .int()
      .describe("How many days did it take for the product to arrive?"),
    price_value: z
      .string()
      .describe("Overall price/value sentiment, e.g. 'cheap', 'affordable', 'expensive'."),
  });

  const parser = StructuredOutputParser.fromZodSchema(reviewSchema);

  const formatInstructions = parser.getFormatInstructions();

  const prompt = ChatPromptTemplate.fromTemplate(
    `You are an information extraction assistant.
Extract the following information from the customer review.

- gift: boolean
- delivery_days: integer
- price_value: short text sentiment

Return the result in the exact JSON format described below.

{format_instructions}

Review:
\`\`\`
{review}
\`\`\``
  );

  const chain = prompt.pipe(model);

  const reviewText = `
This leaf blower is pretty amazing. It has four settings:
candle blower, gentle breeze, windy city, and tornado.

It arrived in two days, just in time for my wife's anniversary present.
I think my wife liked it so much she was speechless.
So far, I've been the only one using it, but it's worth every penny!
`;

  const aiMessage = await chain.invoke({
    review: reviewText,
    format_instructions: formatInstructions,
  });

  const rawOutput = aiMessage.content;
  console.log("LLM raw output:", rawOutput);

  try {
    const parsed = await parser.parse(String(rawOutput));
    console.log("Parsed object:", parsed);
    console.log("gift:", parsed.gift);
    console.log("delivery_days:", parsed.delivery_days);
    console.log("price_value:", parsed.price_value);
  } catch (e) {
    if (e instanceof OutputParserException) {
      console.log("Parsing failed:", e.output);
    } else {
      throw e;
    }
  }
}

main();
```

이게 강의에서 말한:

- **Prompt**에 “꼭 이 필드 이름으로 JSON으로 내놔라”
    
- **Parser**가 그 형식을 가정하고 파싱
    
- 최종적으로 Python dictionary 대신 **TS 객체**가 되는 구조.
    

---

### 1-4. 이 섹션 실습 아이디어

1. **번역 스타일 실험**
    
    - `style`을 여러 개 만들어서 반복 호출:
        
        - 고객센터 톤
            
        - 해적 말투
            
        - 존댓말/반말 한국어 등
            
    - 같은 `text`에 대해 style만 바꿔서 결과 비교.
        
2. **JSON 스키마 바꿔 보기**
    
    - `reviewSchema`에 `rating: number (1-5)` 같은 필드 추가.
        
    - LLM이 적당히 추론하도록 프롬프트 수정.
        
    - 실제 서비스라면 이 JSON을 바로 DB insert/ES document로 쓰는 상상까지.
        
3. **실제 SAP/업무 도메인 적용**
    
    - 제품 리뷰 대신,
        
        - **로그 라인** (에러 로그)
            
        - **JIRA 티켓 설명**  
            등을 입력으로 하고,
            
        - `severity`, `component`, `is_bug`, `needs_followup` 같은 필드 구조화.
            

---

## 2. Memory – 대화 히스토리 관리

LangChain JS에서도 Python과 비슷하게 **메모리** 개념이 있지만,  
실무에서는 직접 “history string”을 만들어 프롬프트에 넣는 방식도 자주 씀.  
여기서는 둘 다 보여줄게.

### 2-1. 간단한 “수동 메모리” 방식

```ts
// 02_memory_manual.ts
import "dotenv/config";
import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";

async function main() {
  const model = new ChatOpenAI({
    modelName: "gpt-4o-mini",
    temperature: 0,
  });

  const prompt = ChatPromptTemplate.fromTemplate(
    `You are a helpful chat assistant.
Here is the conversation so far:
{history}

User: {input}
Assistant:`
  );

  const chain = prompt.pipe(model).pipe(new StringOutputParser());

  let history = "";

  async function ask(input: string) {
    const answer = await chain.invoke({ history, input });
    history += `\nUser: ${input}\nAssistant: ${answer}`;
    console.log("Assistant:", answer);
  }

  await ask("내 이름은 Andrew야.");
  await ask("1 + 1은?");
  await ask("내 이름이 뭐야?");
}

main();
```

- 강의에서 말하는 “LLM은 stateless, memory는 우리가 관리”를  
    직접 문자열 `history`로 구현한 버전.
    

---

### 2-2. LangChain Memory(ConversationSummaryBuffer 비슷한 것) – JS 쪽

LangChain JS에는 Python만큼 다양한 memory helper가 있진 않지만,  
**요약 기반** memory는 직접 체인으로 만드는 게 더 명확해서,  
아예 “요약 memory”를 만드는 미니 구현을 보여줄게.

아이디어:

1. `history`가 너무 길어지면,
    
2. 요약 모델을 한 번 호출해서 “Summary: …”로 줄여서 저장.
    

```ts
// 02_memory_summarized.ts
import "dotenv/config";
import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";

const MAX_HISTORY_CHARS = 400;

async function main() {
  const chatModel = new ChatOpenAI({
    modelName: "gpt-4o-mini",
    temperature: 0,
  });

  const chatPrompt = ChatPromptTemplate.fromTemplate(
    `You are a helpful assistant.
Conversation so far:
{history}

User: {input}
Assistant:`
  );
  const chatChain = chatPrompt.pipe(chatModel).pipe(new StringOutputParser());

  const summaryModel = new ChatOpenAI({
    modelName: "gpt-4o-mini",
    temperature: 0,
  });
  const summaryPrompt = ChatPromptTemplate.fromTemplate(
    `You are a conversation summarizer.
Summarize the following conversation in Korean, keeping important facts and user preferences.

Conversation:
\`\`\`
{history}
\`\`\`

Summary (짧게):`
  );
  const summaryChain = summaryPrompt
    .pipe(summaryModel)
    .pipe(new StringOutputParser());

  let history = "";

  async function maybeSummarizeHistory() {
    if (history.length <= MAX_HISTORY_CHARS) return;

    const summary = await summaryChain.invoke({ history });
    history = `Summary: ${summary}`;
  }

  async function ask(input: string) {
    await maybeSummarizeHistory();
    const answer = await chatChain.invoke({ history, input });
    history += `\nUser: ${input}\nAssistant: ${answer}`;
    console.log("Assistant:", answer);
  }

  await ask("내 이름은 Andrew야. 앞으로 잘 부탁해.");
  await ask("나는 LangChain과 Typescript를 공부 중이야.");
  await ask("내가 뭐 공부하고 있다고 했지?");
  await ask("내 이름이 뭐라고 했지?");
}

main();
```

- 이게 강의의 `ConversationSummaryBufferMemory`와 거의 같은 아이디어.
    
- 실제로는 token 기준으로 자르는 게 더 좋지만,  
    학습용으로는 `length` 기준도 충분.
    

---

### 2-3. 이 섹션 실습 아이디어

1. **history 길이 / 요약 임계값 변경**
    
    - `MAX_HISTORY_CHARS`를 200, 1000 등으로 바꿔보고  
        언제 요약이 발생하는지 로그 찍어보기.
        
2. **요약 품질 실험**
    
    - summary를 한국어/영어 버전 각각 만들어보고  
        대화가 길어진 상태에서 “지금까지 대화를 bullet point로 정리해줘” 같은 질문 던져보기.
        
3. **“entity memory” 흉내내기**
    
    - 예: 사용자가 언급한 사람/회사/프로젝트만 따로 배열에 저장:
        
        - `entities.push({ type: "project", name: "IWA", stack: [...] })`
            
    - 이후 프롬프트에 `known_projects` 블록으로 넣어서 “이전에 말한 프로젝트 목록”처럼 사용.
        

---

## 3. Chains – LLM + Prompt 조합, 순차 실행, 라우팅

LangChain JS에서는 Python의 `LLMChain` 대신  
**Runnable + pipe** 패턴을 쓰는 게 가장 자연스러워.

### 3-1. LLMChain에 해당하는 기본 체인

강의의 “product → 회사 이름 짓기” 예제.

```ts
// 03_chains_basic.ts
import "dotenv/config";
import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";

async function main() {
  const model = new ChatOpenAI({
    modelName: "gpt-4o-mini",
    temperature: 0.9, // 창의적인 이름 뽑기
  });

  const prompt = ChatPromptTemplate.fromTemplate(
    `You are a creative branding expert.
Given a product description, generate a fun and memorable company name.

Product: {product}

Company name:`
  );

  const chain = prompt.pipe(model).pipe(new StringOutputParser());

  const product = "queen-size sheet set made of organic cotton";
  const result = await chain.invoke({ product });

  console.log("Generated company name:", result);
}

main();
```

---

### 3-2. SimpleSequentialChain – 체인 2개 직렬 연결

1. 체인 A: product → companyName
    
2. 체인 B: companyName → 20-word description
    

```ts
// 03_chains_sequential.ts
import "dotenv/config";
import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { RunnableSequence } from "@langchain/core/runnables";

async function main() {
  const model = new ChatOpenAI({
    modelName: "gpt-4o-mini",
    temperature: 0.9,
  });

  const namePrompt = ChatPromptTemplate.fromTemplate(
    `You are a creative branding expert.
Given a product description, generate a fun and memorable company name.

Product: {product}

Company name:`
  );
  const nameChain = namePrompt
    .pipe(model)
    .pipe(new StringOutputParser());

  const descPrompt = ChatPromptTemplate.fromTemplate(
    `You are a marketing copy writer.
Write a 20-word description for the company named "{companyName}".`
  );
  const descChain = descPrompt
    .pipe(model)
    .pipe(new StringOutputParser());

  // RunnableSequence로 A → B 연결
  const overallChain = RunnableSequence.from([
    {
      // input: { product }
      companyName: nameChain, // companyName 필드를 먼저 만든다
    },
    descChain.map((description) => ({ description })),
  ]);

  const result = await overallChain.invoke({
    product: "queen-size sheet set made of organic cotton",
  });

  console.log(result);
}

main();
```

여기서는 일부러 조금 변형했는데,  
처음에는 **A의 output을 B의 input으로 넘기는 변수 이름**을 좀 더 explicit 하게 다뤄봤어.

실제로는 훨씬 단순하게도 쓸 수 있고,  
핵심은 **“하나의 invoke로 여러 단계 LLM 호출이 연속적으로 수행된다”**는 느낌 잡기.

---

### 3-3. Router Chain – 질문에 따라 다른 프롬프트로 보내기

강의에서: 물리/수학/역사/CS 등에 맞춰 라우팅.  
TS로는 “LLM이 어떤 domain인지 판단 → 각각 다른 chain으로 보내기”를 직접 구현할 수 있음.

```ts
// 03_chains_router.ts
import "dotenv/config";
import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";

type Domain = "physics" | "math" | "history" | "cs" | "default";

async function main() {
  const routerModel = new ChatOpenAI({
    modelName: "gpt-4o-mini",
    temperature: 0,
  });

  const routerPrompt = ChatPromptTemplate.fromTemplate(
    `You are a classifier that chooses the most relevant subject domain for a question.

Domains:
- physics: Physics concepts, mechanics, thermodynamics, etc.
- math: Pure mathematics, algebra, calculus, probability, etc.
- history: Historical events, people, timelines.
- cs: Computer science, programming, algorithms, data structures.

Given the user question, answer with ONLY ONE word from:
"physics", "math", "history", "cs", "default".

Question:
{question}

Domain:`
  );
  const routerChain = routerPrompt
    .pipe(routerModel)
    .pipe(new StringOutputParser());

  // 각 도메인별 체인
  const answerModel = new ChatOpenAI({
    modelName: "gpt-4o-mini",
    temperature: 0,
  });

  function domainPrompt(domain: Domain) {
    const base = {
      physics: "You are a physics tutor.",
      math: "You are a math tutor.",
      history: "You are a history teacher.",
      cs: "You are a computer science TA.",
      default: "You are a general tutor.",
    }[domain];

    return ChatPromptTemplate.fromTemplate(
      `${base}
Explain the answer in Korean, clearly but concisely.

Question:
{question}

Answer:`
    )
      .pipe(answerModel)
      .pipe(new StringOutputParser());
  }

  async function answer(question: string) {
    const domain = (await routerChain.invoke({ question })).trim() as Domain;
    console.log("Detected domain:", domain);

    const chain = domainPrompt(
      ["physics", "math", "history", "cs"].includes(domain)
        ? domain
        : "default"
    );

    const result = await chain.invoke({ question });
    console.log("Answer:\n", result);
  }

  await answer("What is blackbody radiation?");
  await answer("적분이 뭐야?");
  await answer("Who was the first emperor of Rome?");
  await answer("What is a binary search tree?");
  await answer("오늘 저녁 뭐 먹을까?");
}

main();
```

- 강의의 `MultiPromptChain` + `RouterChain` 개념을 TS로 옮긴 것.
    
- 실무에서는 “FAQ 라우터”, “도메인별 RAG 라우팅” 등에 이런 패턴을 그대로 쓴다고 보면 됨.
    

---

### 3-4. 이 섹션 실습 아이디어

1. **제품 이름 짓기 체인**
    
    - 입력: 제품 목록 배열 (`string[]`)
        
    - 결과: `[{ product, companyName, description }]` 형태로 map 돌려보기.
        
2. **Sequential 체인 → 3단계 이상으로 늘리기**
    
    - 예: `product → target user persona → company name → slogan`
        
    - `RunnableSequence`로 여러 단계 연결.
        
3. **Router 도메인 추가**
    
    - `finance`, `psychology` 등 추가해서  
        도메인별 설명 스타일을 다르게 만들어보기.
        

---
## 4. 문서 기반 질의응답 (Embeddings + Vector Store, RAG)

강의 아이디어를 TS로 구현하면 구조는 이렇게 보면 편해:

1. **문서 로딩** (CSV, PDF, MD …)
    
2. **임베딩 생성** (텍스트 → 벡터)
    
3. **벡터스토어에 저장** (index)
    
4. 쿼리 들어오면
    
    - 쿼리 임베딩 생성
        
    - 비슷한 문서 `k`개 검색
        
    - 이 문서를 context로 LLM에 질의 → 최종 답변
        

여기서는 CSV + `MemoryVectorStore`로 간단한 RAG를 만들어보자.

### 4-1. CSV 로드 + 임베딩 + Vector Store

```ts
// 04_rag_build_index.ts
import "dotenv/config";
import { ChatOpenAI, OpenAIEmbeddings } from "@langchain/openai";
import { CSVLoader } from "langchain/document_loaders/fs/csv";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";

async function buildStoreFromCsv(csvPath: string) {
  // 1) CSV → Documents
  const loader = new CSVLoader(csvPath, {
    // 필요하면 column 지정 가능
    columnSeparator: ",",
  });
  const docs = await loader.load();
  console.log(`Loaded docs: ${docs.length}`);

  // 2) Embeddings
  const embeddings = new OpenAIEmbeddings({
    modelName: "text-embedding-3-small",
  });

  // 3) Vector Store
  const store = await MemoryVectorStore.fromDocuments(docs, embeddings);
  return store;
}

async function main() {
  const vectorStore = await buildStoreFromCsv("./data/outdoor_clothing_catalog.csv");

  // 4) 단순 similarity search
  const query = "sun protection 기능이 있는 셔츠 추천해줘";
  const results = await vectorStore.similaritySearch(query, 4);

  console.log("=== Top 4 similar documents ===");
  for (const doc of results) {
    console.log("----");
    console.log("ID:", doc.metadata?.id);
    console.log("Content:", doc.pageContent.slice(0, 200), "...");
  }
}

main();
```

- 강의에서 `DocArrayInMemorySearch` 쓰던 부분을 TS에서는 `MemoryVectorStore`로 단순화.
    
- `CSVLoader`가 각 row를 `Document`로 만들어주고, `pageContent` 안에 텍스트가 들어감.
    

---

### 4-2. Retrieval QA 체인 직접 만들기 (stuff 방식)

`retriever.getRelevantDocuments(query)` → context string → LLM에 prompt.

```ts
// 04_rag_qa.ts
import "dotenv/config";
import { ChatOpenAI, OpenAIEmbeddings } from "@langchain/openai";
import { CSVLoader } from "langchain/document_loaders/fs/csv";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";

async function buildRetriever(csvPath: string) {
  const loader = new CSVLoader(csvPath);
  const docs = await loader.load();

  const embeddings = new OpenAIEmbeddings({
    modelName: "text-embedding-3-small",
  });

  const store = await MemoryVectorStore.fromDocuments(docs, embeddings);
  // 여기서 retriever로 추상화 (k=4)
  return store.asRetriever(4);
}

async function main() {
  const retriever = await buildRetriever("./data/outdoor_clothing_catalog.csv");

  const llm = new ChatOpenAI({
    modelName: "gpt-4o-mini",
    temperature: 0,
  });

  // stuff 방식: 관련 문서를 몽땅 컨텍스트로 넣고 한 번에 호출
  const qaPrompt = ChatPromptTemplate.fromTemplate(
    `You are a product expert for an outdoor clothing shop.
Use ONLY the following context to answer the question.
If you don't know from the context, say you don't know.

Context:
{context}

Question:
{question}

Answer in Korean, and if possible, provide a short markdown table
for the recommended products.`
  );

  const qaChain = qaPrompt.pipe(llm).pipe(new StringOutputParser());

  async function ask(question: string) {
    // 1) 검색
    const docs = await retriever.getRelevantDocuments(question);

    const context = docs
      .map((d, idx) => `[#${idx + 1}] ${d.pageContent}`)
      .join("\n\n");

    const answer = await qaChain.invoke({ context, question });

    console.log("\n==============================");
    console.log("Q:", question);
    console.log("\n[Context Snippet]");
    console.log(context.slice(0, 400), "...\n");
    console.log("[Answer]");
    console.log(answer);
    console.log("==============================\n");
  }

  await ask("sun protection 기능이 있는 셔츠를 모두 표로 정리해줘");
  await ask("겨울용 방수 재킷 중에서 가장 따뜻한 제품을 추천해줘");
}

main();
```

- 이게 강의에서 말하는 **“stuff” 체인**의 수동 버전.
    
- 실제 LangChain에는 `createStuffDocumentsChain`, `createRetrievalChain` 같은 helper가 있지만,  
    지금은 “내 손으로 다 구현해보는” 연습이라고 생각하면 좋음.
    

---

### 4-3. Map_reduce / Refine / Rerank 개념만 정리

TS로 직접 구현하려면 꽤 길어지니까, 개념만 짧게:

- **stuff**
    
    - 지금 한 방식.
        
    - 문서가 많아지면 context가 너무 길어져서 토큰 한계/비용 문제.
        
- **map_reduce**
    
    - 각 문서에 대해
        
        - (map) `doc + question -> partial_answer`
            
    - 마지막에
        
        - (reduce) `partial_answers[] -> final_answer`
            
    - 완전 병렬화 가능, 문서 수 많을 때 좋음.
        
- **refine**
    
    - 문서들을 순차적으로 돌면서
        
        - 현재까지의 답 + 새 문서 → 좀 더 refine된 답
            
    - 답이 점점 누적/업데이트됨.
        
- **map_rerank**
    
    - 각 문서에 대해
        
        - `doc + question -> (answer, score)`
            
    - 가장 score 높은 문서의 answer만 사용.
        

실습할 때:

- 지금 만든 `qaChain`을 기준으로,
    
- 한 번은 stuff, 한 번은 “각 문서에 대해 개별 답변 후 요약”식 `map_reduce`를 직접 만들어보면 좋음.
    

---

### 4-4. 이 섹션 실습 아이디어

1. **CSV 대신 MD/텍스트 파일**
    
    - `TextLoader`나 `DirectoryLoader`로 Markdown 문서 여러 개 로딩 → 같은 구조로 RAG 만들어보기.
        
2. **한국어 Q&A 특화 prompt**
    
    - `Answer in Korean` 대신
        
        - “반말/존댓말”
            
        - “항상 bullet point로 정리”
            
        - “마지막에 요약 한 줄”  
            등 스타일 지정.
            
3. **SAP 문서/사내 위키 상상**
    
    - 실제론 사내 위키/Confluence export를 CSV/MD로 떨궈놓고,  
        그 위에 비슷한 RAG QA를 올리는 구조 그대로라 생각하면 됨.
        

---

## 5. Evaluation – 체인 평가 자동화

강의에서 핵심 포인트:

- 단일 예제 디버깅 → `debug` 모드로 내부 prompt/context 확인
    
- 다수 예제 평가:
    
    - 직접 눈으로 보거나
        
    - **LLM을 evaluator로 사용하는 체인** 작성
        

JS/TS에서도 간단한 “LLM 평가자”를 만들 수 있음.

### 5-1. 작은 QA 데이터셋 + RAG 체인 재사용

먼저 4번에서 만든 `qaChain` 스타일을 재사용해서,  
간단한 평가 루프를 만들어보자.

```ts
// 05_eval_dataset.ts
import "dotenv/config";
import { ChatOpenAI, OpenAIEmbeddings } from "@langchain/openai";
import { CSVLoader } from "langchain/document_loaders/fs/csv";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";

type QAExample = {
  question: string;
  // “정답”을 완전히 동일 문자열로 보진 않고,
  // “포함되었는지” 정도만 보거나 / LLM-eval에 넘겨서 semantic하게 비교.
  expectedContains: string;
};

async function buildRetriever(csvPath: string) {
  const loader = new CSVLoader(csvPath);
  const docs = await loader.load();

  const embeddings = new OpenAIEmbeddings({
    modelName: "text-embedding-3-small",
  });

  const store = await MemoryVectorStore.fromDocuments(docs, embeddings);
  return store.asRetriever(4);
}

async function createQaChain(retriever: any) {
  const llm = new ChatOpenAI({
    modelName: "gpt-4o-mini",
    temperature: 0,
  });

  const qaPrompt = ChatPromptTemplate.fromTemplate(
    `You are a product QA assistant.
Use ONLY the following context to answer the user's question.
If you don't know from the context, say "모르겠습니다".

Context:
{context}

Question:
{question}

Answer in Korean.`
  );

  const qaChain = qaPrompt.pipe(llm).pipe(new StringOutputParser());

  async function answer(question: string) {
    const docs = await retriever.getRelevantDocuments(question);
    const context = docs.map((d) => d.pageContent).join("\n\n");
    const res = await qaChain.invoke({ context, question });
    return res;
  }

  return { answer };
}

async function main() {
  const retriever = await buildRetriever("./data/outdoor_clothing_catalog.csv");
  const { answer } = await createQaChain(retriever);

  const examples: QAExample[] = [
    {
      question: "Cozy Comfort Pullover Set에 사이드 포켓이 있는지 알려줘.",
      expectedContains: "사이드 포켓",
    },
    {
      question: "DownTek 컬렉션에 속한 재킷은 어느 제품인지 알려줘.",
      expectedContains: "DownTek",
    },
  ];

  for (const ex of examples) {
    const prediction = await answer(ex.question);

    const contains =
      prediction.includes(ex.expectedContains) ||
      prediction.toLowerCase().includes(ex.expectedContains.toLowerCase());

    console.log("==================================");
    console.log("Q:", ex.question);
    console.log("Pred:", prediction);
    console.log("Expected contains:", ex.expectedContains);
    console.log("Result:", contains ? "✅ PASS" : "❌ FAIL");
  }
}

main();
```

- 이건 아주 단순한 “substring 기반” 평가.
    
- 문제: LLM이 똑같은 단어를 안 쓰고 말만 돌려도 FAIL이 될 수 있음 → 이걸 LLM으로 보완.
    

---

### 5-2. LLM을 evaluator로 사용하기

**Evaluator Prompt**:

- input:
    
    - question
        
    - groundTruth
        
    - prediction
        
- output:
    
    - `CORRECT` / `INCORRECT`
        
    - - 짧은 이유
            

```ts
// 05_eval_llm_judge.ts
import "dotenv/config";
import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";

type QAExample = {
  question: string;
  groundTruth: string; // 사람이 만든 or “전체 문서를 보고 만든” 정답
  prediction: string;
};

async function main() {
  const judgeModel = new ChatOpenAI({
    modelName: "gpt-4o-mini",
    temperature: 0,
  });

  const judgePrompt = ChatPromptTemplate.fromTemplate(
    `You are an evaluator for a QA system.

You will receive:
- question (Korean)
- ground_truth answer (Korean)
- prediction from the QA system (Korean)

Task:
1. Decide if the prediction is semantically consistent with the ground truth.
2. Output ONLY a JSON object with fields:
   - "grade": "CORRECT" or "INCORRECT"
   - "reason": short Korean explanation

question:
{question}

ground_truth:
{groundTruth}

prediction:
{prediction}

Now output the JSON:`
  );

  const judgeChain = judgePrompt
    .pipe(judgeModel)
    .pipe(new StringOutputParser());

  const examples: QAExample[] = [
    {
      question: "Cozy Comfort Pullover Set에 사이드 포켓이 있는지 알려줘.",
      groundTruth: "네, Cozy Comfort Pullover Set에는 사이드 포켓이 있다.",
      prediction:
        "Cozy Comfort Pullover Set에는 사이드 포켓이 포함되어 있어 작은 물건을 보관할 수 있습니다.",
    },
    {
      question: "이 셔츠는 방수 기능이 있나요?",
      groundTruth: "방수 기능은 없다.",
      prediction: "방수 기능이 있다고 나와 있지 않으므로, 방수 기능은 없는 것으로 보입니다.",
    },
  ];

  for (const ex of examples) {
    const evalJson = await judgeChain.invoke(ex);
    console.log("==================================");
    console.log("Question:", ex.question);
    console.log("Ground Truth:", ex.groundTruth);
    console.log("Prediction:", ex.prediction);
    console.log("Eval:", evalJson);
  }
}

main();
```

- 강의에서 말한 것처럼, 문자열 매칭 대신 “semantic 일치”를 판단.
    
- 실제 프로젝트에서는 이 evaluator를
    
    - PR마다,
        
    - prompt/모델 버전 바뀔 때마다,  
        자동으로 돌려서 성능 비교하는 패턴으로 많이 씀.
        

---

### 5-3. 이 섹션 실습 아이디어

1. **실제 에러 로그/내 도메인 QA로 바꾸기**
    
    - `question`: “이 에러 메시지는 왜 발생했어?”
        
    - `groundTruth`: 직접 설명.
        
    - `prediction`: LLM chain 결과.
        
    - evaluator로 “설명 충분함/부족함” 평가.
        
2. **평가지표 확장**
    
    - grade를
        
        - `CORRECT`, `PARTIAL`, `INCORRECT`
            
    - 로 바꾸고, 각 케이스별 reason을 더 길게 적게 해보기.
        
3. **비용 모니터링**
    
    - `judgeModel`과 QA model 모두 token 사용량 로그 찍어서  
        “테스트 1세트당 비용” 감 잡기.
        

---

## 6. Agents – 도구 호출, 외부 정보 사용

강의 포인트:

- LLM을 **“지식창고”** 라기보다 **“추론 엔진”**으로 보고,
    
- 툴(검색, DB, API, 함수)에 연결해서
    
    - 어떤 툴을 언제 호출할지 스스로 결정하게 하는 프레임워크.
        

LangChain JS 쪽에서 간단히 쓰는 패턴은:

1. 사용할 툴 정의 (`tool` 헬퍼 or `DynamicTool`)
    
2. LLM 준비
    
3. `initializeAgentExecutorWithOptions`로 agent 생성
    
4. `executor.invoke({ input })`로 실행
    

### 6-1. 간단한 커스텀 Tool + Agent

```ts
// 06_agents_basic.ts
import "dotenv/config";
import { ChatOpenAI } from "@langchain/openai";
import { tool, DynamicTool } from "@langchain/core/tools";
import { initializeAgentExecutorWithOptions } from "langchain/agents";

async function main() {
  // 1) LLM (추론 엔진)
  const model = new ChatOpenAI({
    modelName: "gpt-4o-mini",
    temperature: 0,
  });

  // 2) 커스텀 Tool 1: 오늘 날짜
  const timeTool = tool(
    async () => {
      const now = new Date();
      return now.toISOString().split("T")[0]; // YYYY-MM-DD
    },
    {
      name: "current_date",
      description:
        "오늘 날짜를 YYYY-MM-DD 형식으로 알려준다. 입력은 항상 빈 문자열이어야 한다.",
    }
  );

  // 3) 커스텀 Tool 2: 간단한 메모리 없는 “currency converter 흉내”
  const fakeFxTool = new DynamicTool({
    name: "eur_to_krw_estimator",
    description:
      "EUR 금액을 KRW로 대략 환산한다. 입력 형식은 숫자만 포함된 문자열 (예: '1000'). 내부적으로 고정 환율(예: 1 EUR = 1500 KRW)을 사용한다.",
    async call(input: string) {
      const rate = 1500; // 데모용 고정값
      const value = Number(input.trim());
      if (Number.isNaN(value)) {
        return "유효한 숫자가 아닙니다.";
      }
      const result = value * rate;
      return `${value} EUR ≈ ${result.toLocaleString("ko-KR")} KRW (대략적인 값)`;
    },
  });

  const tools = [timeTool, fakeFxTool];

  // 4) Agent 생성
  const executor = await initializeAgentExecutorWithOptions(tools, model, {
    agentType: "chat-zero-shot-react-description",
    verbose: true, // 내부 추론 과정을 보고 싶으면 true
    handleParsingErrors: true,
  });

  async function ask(input: string) {
    console.log("\n=================================");
    console.log("User:", input);
    const res = await executor.invoke({ input });
    console.log("Agent:", res.output);
  }

  await ask("오늘 날짜가 뭐야?");
  await ask("내가 3500 EUR를 가지고 있는데, 대략 KRW로 얼마인지 알려줘.");

  // 일부러 툴 설명을 활용하는 질문
  await ask(
    "향후 6개월 동안 유럽에서 10,000 EUR를 쓸 것 같은데, 얼추 KRW로 얼마가 필요한지 계산해 줄 수 있어?"
  );
}

main();
```

- `description`이 **툴 사용 설명서** 역할을 함 → LLM이 언제 어떻게 호출할지 결정.
    
- `chat-zero-shot-react-description` 타입이 바로 강의에서 말한 **React 스타일** agent.
    

---

### 6-2. 외부 API 검색 툴 (선택 실습)

실제 검색을 붙이려면:

- `SerpAPI`, `Tavily`, `DuckDuckGo` 같은 툴을 가져다 쓰면 됨.
    
- 예시 (실행하려면 각각 키/패키지 설치 필요):
    

```ts
/*
import { TavilySearchResults } from "@langchain/community/tools/tavily_search";

const searchTool = new TavilySearchResults({
  apiKey: process.env.TAVILY_API_KEY!,
  maxResults: 5,
});

const tools = [timeTool, fakeFxTool, searchTool];
*/
```

그 후 agent에 `tools`에 포함시키면,  
“최근 LangChain JS 릴리즈 노트 요약해줘” 같이 **모델이 모르는 최신 정보**도 가져오게 만들 수 있음.

---

### 6-3. 에이전트 설계 시 생각해야 할 포인트

실무에서 특히 중요:

1. **툴의 입력/출력 스키마를 엄청 구체적으로 써라**
    
    - “input format은 항상 XXX” 를 docstring에 명시.
        
    - 잘못된 input 들어왔을 때 어떻게 처리할지도 결정.
        
2. **툴 남용 방지**
    
    - 모든 질문에 검색을 때려버리면 비싸지고 느려짐.
        
    - description에 “최근 정보가 필요할 때만 사용해라” 같은 가이드 넣기.
        
3. **회사 환경 연결 시**
    
    - SAP BTP, 내부 REST API, DB 쿼리 등을 `DynamicTool`로 감싸서 agent가 호출하게 만들 수 있음.
        
    - 이때도 반드시 **권한/로깅/트랜잭션 범위**를 신경 써야 함.
        

---

### 6-4. 이 섹션 실습 아이디어

1. **“가계부 에이전트” 느낌으로 커스텀 툴 설계**
    
    - `add_expense`, `get_monthly_summary` 같은 툴을 만들어서  
        메모리 대신 JSON 파일/인메모리 배열에 기록.
        
2. **“TODO 관리 에이전트”**
    
    - 툴: `add_task`, `list_tasks`, `complete_task`.
        
    - 사용자의 자연어 입력을 받아 어떤 툴을 호출해야 하는지 agent가 결정.
        
3. **RAG + Agent 결합**
    
    - 4번의 `retriever`를 툴로 감싸서  
        “사내 문서를 보고 답해야 할 때만 retriever 툴을 사용”하도록 만들기.