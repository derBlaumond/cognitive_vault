- (“중복되는 부분문제를 저장해서 효율적으로 해결하는 기술”)
# 1) **핵심 개념을 가장 빠르게 이해하기**

DP(Dynamic Programming)의 본질은 사실 매우 단순하다:

➡ **큰 문제 = 작은 문제들의 반복 + 결과 저장(memoization)**  
➡ **똑같은 계산을 다시 하지 않는다**

DP는 결국 “기억하면서 재귀를 최적화”하는 형태다.  
너는 이미 Backtracking 패턴을 익혔기 때문에 훨씬 쉽게 이해될 것이다.

---

## **① DP가 필요한 문제 구조**

DP가 성립하는 조건은 아래 3개다.

### **1) Optimal Substructure (최적 부분 구조)**

큰 문제의 답을 작은 문제의 답으로 구성할 수 있다.

### **2) Overlapping Subproblems (부분 문제 중복)**

동일한 부분문제가 여러 번 반복된다.

예: 피보나치 재귀

- f(5)는 f(4) + f(3)
    
- f(4)는 f(3) + f(2)  
    → f(3) 중복!
    

### **3) DP Table 또는 Memoization으로 시간 절약**

재귀 기반 메모이제이션 OR 바텀업 테이블 방식.

---

## **② DP의 대표적인 2가지 구현 방식**

### **1) Top-down (재귀 + memoization)**

Backtracking 기반 사고에서 자연스럽게 확장됨.

```ts
const memo: Record<number, number> = {};

function fib(n: number): number {
  if (n <= 1) return n;
  if (memo[n] !== undefined) return memo[n];
  memo[n] = fib(n - 1) + fib(n - 2);
  return memo[n];
}
```

장점:

- 이해 쉽고 코드 간결
    

---

### **2) Bottom-up (반복 + DP table)**

가장 많이 쓰이는 형태.

```ts
function fibDP(n: number): number {
  const dp = new Array(n + 1).fill(0);
  dp[1] = 1;

  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }

  return dp[n];
}
```

장점:

- 시간·공간 효율 ↑
    
- 코딩테스트에서 매우 안정적
    

---

## **③ DP는 결국 “상태 정의 + 점화식 정의 + 초기값 설정”이 핵심**

예: Climbing Stairs

**상태(state)**  
dp[i] = i번째 계단까지 오르는 방법 수

**점화식(recurrence)**  
dp[i] = dp[i-1] + dp[i-2]

**초기값**  
dp[1] = 1  
dp[2] = 2

---

# 2) **Typescript 실전 템플릿**

---

## **① Fibonacci (전형적인 DP 기초 예제)**

Top-down:

```ts
function fib(n: number): number {
  const memo: Record<number, number> = {};

  function f(x: number): number {
    if (x <= 1) return x;
    if (memo[x] !== undefined) return memo[x];
    memo[x] = f(x - 1) + f(x - 2);
    return memo[x];
  }

  return f(n);
}
```

Bottom-up:

```ts
function fibDP(n: number): number {
  if (n <= 1) return n;
  let a = 0, b = 1;

  for (let i = 2; i <= n; i++) {
    const temp = a + b;
    a = b;
    b = temp;
  }

  return b;
}
```

---

## **② Climbing Stairs (DP 기본 중 기본)**

```ts
function climbStairs(n: number): number {
  if (n <= 2) return n;

  let a = 1, b = 2;
  for (let i = 3; i <= n; i++) {
    const temp = a + b;
    a = b;
    b = temp;
  }
  return b;
}
```

---

## **③ House Robber (DP 핵심 패턴)**

점화식:  
dp[i] = max(dp[i-1], dp[i-2] + nums[i])

```ts
function rob(nums: number[]): number {
  if (nums.length === 1) return nums[0];

  let prev2 = nums[0];
  let prev1 = Math.max(nums[0], nums[1]);

  for (let i = 2; i < nums.length; i++) {
    const curr = Math.max(prev1, prev2 + nums[i]);
    prev2 = prev1;
    prev1 = curr;
  }

  return prev1;
}
```

이 한 문제로 DP의 사고 흐름이 폭발적으로 잘 잡힌다.

---

# 3) **간단 연습문제 2개**

---

## **연습문제 1 — Fibonacci 6 구하기**

입력: 6  
출력: 8  
(0,1,1,2,3,5,8)

---

## **연습문제 2 — Climbing Stairs**

입력: 4  
출력: 5  
경우의 수:  
1+1+1+1  
1+1+2  
1+2+1  
2+1+1  
2+2

---

# 4) **DP 체크리스트**

아래 12개 중 8개 이상 “YES”면 충분하다.

### ✔ 기본 개념

- DP = 중복되는 부분문제 저장이라고 설명할 수 있다.
    
- Top-down과 Bottom-up의 차이를 이해했다.
    

### ✔ 상태 정의

- dp[i]가 무엇을 의미하는지 정의할 수 있다.
    
- 점화식을 직접 도출할 수 있다.
    
- 초기값(base case)을 스스로 설정할 수 있다.
    

### ✔ 대표 문제

- Fibonacci DP로 구현 가능
    
- Climbing Stairs 직접 구현 가능
    
- House Robber 점화식을 이해한다
    

### ✔ 사고 흐름

- “완전탐색 → 중복 있음 → DP로 전환”을 스스로 판단할 수 있다.
    
- Greedy/Backtracking과의 차이를 설명할 수 있다.
    
- O(N) 공간 → O(1) 공간 최적화 패턴도 이해하고 있다.
    

---

# 5) **HackerRank Easy 실전 문제 추천**

DP Easy는 HackerRank에서 많지 않지만, 다음 문제가 가장 좋다:

---

## ✔ 추천 문제 3개

### **1) "The Coin Change Problem" (Easy)**

→ 조합 DP의 기본 구조 이해

### **2) "Dynamic Array"**

→ DP사고 기반 index 관리 연습

### **3) "Fibonacci Modified"**

→ 메모이제이션 기반 사고 강화

이 3문제만 풀어도 DP 기본 감각이 확실히 잡힌다.