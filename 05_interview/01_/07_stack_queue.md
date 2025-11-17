- (코딩테스트 자료구조의 중심) - **Tree, Graph, BFS/DFS**로 자연스럽게 이어지는 매우 중요한 연결 파트다.
# 1) **핵심 개념을 가장 빠르게 이해하기**

Stacks(스택)과 Queues(큐)는 동작 방식이 아주 단순하다.  
하지만 문제 해결 능력엔 매우 큰 영향을 준다.

---

## **① Stack: LIFO (Last In First Out)**

가장 “나중에 push된 것부터 pop하는 구조”.

대표 문제:

- 괄호 유효성 검사
    
- 문자열 뒤집기
    
- Monotonic Stack(단조 스택)
    
- DFS
    

TS 기본 구조:

```ts
const stack: number[] = [];
stack.push(10);
const x = stack.pop();
```

스택으로 풀리는 문제의 공통점은  
➡ **“지나간 정보를 잠깐 저장했다가 적절한 시점에 꺼낸다.”**

---

## **② Queue: FIFO (First In First Out)**

가장 “먼저 들어온 것부터 나가는 구조”.

대표 문제:

- BFS (Breadth-First Search)
    
- 일정/프로세스 관리
    
- Window sliding queue 버전
    

TS 기본 구조:

```ts
const queue: number[] = [];
queue.push(10);
const x = queue.shift();   // O(N) → array 기반이면 비효율적
```

실전에서는 **deque(양방향 큐) 구현**이 필요할 수 있다.

하지만 코딩테스트에서는 보통  
“Queue = BFS”만 알면 충분하다.

---

## **③ Monotonic Stack: 스택 단원 최중요 개념**

정렬된 성질을 유지하는 스택.

예:

- Next Greater Element
    
- 주식 가격 문제
    
- 기온 문제
    

템플릿:

```ts
const stack: number[] = [];

for (let i = 0; i < arr.length; i++) {
  while (stack.length > 0 && arr[stack[stack.length - 1]] < arr[i]) {
    const idx = stack.pop()!;
    // idx의 답은 arr[i]
  }
  stack.push(i);
}
```

이 패턴 하나면 “스택 난이도 급 상승 문제”가 다 해결된다.

---

## **④ Queue = BFS (필수 패턴)**

```ts
function bfs(start: number) {
  const queue = [start];
  const visited = new Set<number>([start]);

  while (queue.length > 0) {
    const node = queue.shift()!;

    for (const next of graph[node]) {
      if (!visited.has(next)) {
        visited.add(next);
        queue.push(next);
      }
    }
  }
}
```

지금은 기본 구조만 익히면 충분하고,  
Tree/Graph 단원에서 완전히 체화된다.

---

# 2) **Typescript 실전 템플릿**

---

## **① 괄호 유효성 검사 (Stack 핵심 문제)**

```ts
function isValid(s: string): boolean {
  const stack: string[] = [];
  const map: Record<string, string> = { ')': '(', ']': '[', '}': '{' };

  for (const ch of s) {
    if (ch in map) {
      if (stack.pop() !== map[ch]) return false;
    } else {
      stack.push(ch);
    }
  }

  return stack.length === 0;
}
```

이 한 문제로 스택 감각의 70%가 생긴다.

---

## **② Next Greater Element (Monotonic Stack)**

```ts
function nextGreaterElement(nums: number[]): number[] {
  const res = new Array(nums.length).fill(-1);
  const stack: number[] = [];

  for (let i = 0; i < nums.length; i++) {
    while (stack.length && nums[stack[stack.length - 1]] < nums[i]) {
      const idx = stack.pop()!;
      res[idx] = nums[i];
    }
    stack.push(i);
  }

  return res;
}
```

난이도 올라가면 거의 무조건 이 패턴이 나온다.

---

## **③ BFS용 Queue 템플릿**

```ts
function bfs(start: number, graph: number[][]): number[] {
  const queue: number[] = [start];
  const visited = new Set([start]);
  const result: number[] = [];

  while (queue.length > 0) {
    const node = queue.shift()!;
    result.push(node);

    for (const next of graph[node]) {
      if (!visited.has(next)) {
        visited.add(next);
        queue.push(next);
      }
    }
  }

  return result;
}
```

---

# 3) **간단 연습문제 2개**

---

## **연습문제 1 — 괄호 유효성 검사**

입력: `"()[]{}"`  
출력: `true`

핵심:

- 스택 push/pop
    
- 짝이 맞는지 확인
    

---

## **연습문제 2 — 큐를 이용한 BFS 출력**

그래프:

```
0 → [1, 2]
1 → [3]
2 → []
3 → []
```

출력: `0 1 2 3`

핵심:  
queue.shift()로 BFS 탐색 순서 유지

---

# 4) **Stacks & Queues 체크리스트**

아래 12개 중 8개 이상 YES면 충분하다.

### ✔ Stack

- LIFO 구조를 설명할 수 있다.
    
- push/pop 동작을 이해한다.
    
- 괄호 유효성 문제를 스택으로 해결할 수 있다.
    
- Monotonic Stack 패턴이 무엇인지 이해했다.
    
- Next Greater Element 구현이 가능하다.
    

### ✔ Queue

- FIFO 구조를 설명할 수 있다.
    
- push/shift 흐름을 이해했다.
    
- BFS는 Queue 기반이라는 사실을 알고 있다.
    
- Queue로 level-order traversal 감각이 있다.
    
- visited 집합을 Queue와 함께 사용한다.
    

### ✔ 공통

- 배열과 Linked List 기반 구현 차이를 설명할 수 있다.
    
- Stack/Queue 자료구조가 Tree/Graph 단원의 기반이라는 감각이 있다.
    

---

# 5) **HackerRank Easy 실전 문제 추천**

Stack/Queue 감각을 빠르게 키우는 Easy 문제 3개.

---

## ✔ 추천 문제 3개

### **1) "Balanced Brackets"**

→ 스택 기본 패턴

### **2) "Queue using Two Stacks"**

→ 자료구조 구현 감각 상승

### **3) "Down to Zero II"**

→ BFS 사고 요구 (Queue 감각)