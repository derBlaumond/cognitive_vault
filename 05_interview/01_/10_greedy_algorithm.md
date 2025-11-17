- (“지금 이 순간 최선의 선택 = 전체 최선” 전략)
	이 단원은 이후의 **Backtracking → Dynamic Programming** 으로 넘어가는 핵심 다리 역할을 한다.
# 1) **핵심 개념을 가장 빠르게 이해하기**

Greedy(탐욕법)은 아주 단순한 전략을 따른다:

➡ **“매 단계에서 가장 좋아 보이는 선택을 하면, 전체 정답이 된다.”**

하지만 모든 문제에 적용되는 게 아니라,  
**Greedy가 통하는 구조인지 판단하는 능력**이 매우 중요하다.

---

## **① Greedy가 성립하는 문제 구조**

다음 3개가 만족되면 Greedy가 높은 확률로 통한다:

1. **Optimal Substructure**
    
    - 부분문제의 최적해가 전체 문제의 일부가 됨  
        (DP도 마찬가지지만 Greedy는 구조가 더 단순)
        
2. **Local Optimal ⇒ Global Optimal**
    
    - 매 순간 “국소 최적” 선택이 전체에서도 최적
        
3. **결정이 미래에 영향을 주지 않음**
    
    - 현재의 선택이 이후의 구조를 오염시키지 않음
        

→ 이렇게 말하면 추상적이지만, 실제 문제 패턴은 매우 단순하다.

---

## **② Greedy의 대표적인 패턴 3개**

### **1) 정렬 + 선택**

대부분의 Greedy 문제는 정렬로 시작한다.

대표 문제:

- activity selection
    
- 회의실 배정
    
- interval scheduling
    
- 가장 많이 나오는 classic 그 자체
    

핵심 로직:

```ts
intervals.sort((a, b) => a[1] - b[1]); // 종료시간 기준
```

---

### **2) 큰 것부터 / 작은 것부터 선택**

예:

- 동전 최소 개수
    
- 배낭 문제(0/1이 아닌 fractional에서만 Greedy 성립)
    

핵심:

```ts
coins.sort((a, b) => b - a);
```

---

### **3) 양쪽에서 greedy하게 이동 (투포인터와 조합)**

예:

- 줄 세우기
    
- 최대 페어링 문제
    

투포인터와 함께 쓰는 경우도 많다.

---

## **③ Greedy는 구현 난이도는 낮고, 결정 판단이 핵심**

DP는 구현이 어렵고,  
Greedy는 “그 해가 맞는지 판단이 어려움”.

따라서 코테에서는 **Greedy 문제는 쉬운 단원**이다.

---

# 2) **Typescript 실전 템플릿**

---

## **① Activity Selection / Interval Scheduling (정렬 + 선택)**

```ts
function maxActivities(intervals: number[][]): number {
  intervals.sort((a, b) => a[1] - b[1]);
  let count = 0;
  let end = -Infinity;

  for (const [s, e] of intervals) {
    if (s >= end) {
      count++;
      end = e;
    }
  }

  return count;
}
```

포인트:

- 종료시간 기준 정렬
    
- 겹치지 않을 때 선택
    
- Greedy의 정석 중 정석
    

---

## **② 최소 동전 개수 (큰 단위부터 선택)**

```ts
function minCoins(amount: number, coins: number[]): number {
  coins.sort((a, b) => b - a);
  let count = 0;

  for (const c of coins) {
    while (amount >= c) {
      amount -= c;
      count++;
    }
  }

  return count;
}
```

---

## **③ 로프 묶기 / 최대 페어링 문제(오름차순 정렬)**

```ts
function maxPairs(nums: number[], k: number): number {
  nums.sort((a, b) => a - b);
  let i = 0, j = nums.length - 1, count = 0;

  while (i < j) {
    if (nums[i] + nums[j] >= k) {
      count++;
      j--;
      i++;
    } else {
      i++;
    }
  }

  return count;
}
```

정렬 + 투포인터 기반의 Greedy.

---

# 3) **간단 연습문제 2개**

---

## **연습문제 1 — Interval Scheduling**

입력:

```
[[1,2],[2,4],[1,3],[4,6]]
```

출력:  
`3`

힌트:  
종료시간 기준 정렬 → 가능한 것만 선택.

---

## **연습문제 2 — 최소 동전 개수**

입력:

```
amount = 14
coins = [10, 5, 1]
```

출력:  
`3 (10 + 1 + 1 + 1 + 1)`  
힌트:  
큰 동전부터 사용.

---

# 4) **Greedy 알고리즘 체크리스트**

아래 10개 중 7개 이상 YES면 충분하다.

- Greedy가 “국소 최적 ⇒ 전체 최적” 개념임을 설명할 수 있다.
    
- 대부분의 Greedy 문제는 정렬부터 시작한다는 감각이 있다.
    
- interval scheduling 문제를 구현할 수 있다.
    
- Greedy가 동작하는 문제와 DP가 필요한 문제의 차이를 설명할 수 있다.
    
- 동전 문제에서 Greedy가 항상 정답이 아님을 알고 있다.
    
- 투포인터 + Greedy 조합이 자연스럽다.
    
- “현재 선택이 미래에 영향을 주지 않는지” 판단할 수 있다.
    
- 문제가 “정렬 + 선택” 구조인지 바로 감지할 수 있다.
    
- Greedy는 구현이 쉽고 판단이 어렵다는 특징을 이해한다.
    
- Greedy 실패 예제를 알고 있다.
    

---

# 5) **HackerRank Easy 실전 문제 추천**

Greedy 감각을 바로 체화시켜주는 문제들:

---

## ✔ 추천 문제 3개

### **1) "Mark and Toys"**

→ 정렬 후 작은 것부터 greedy 선택

### **2) "Minimum Absolute Difference in an Array"**

→ 정렬 기반 페어링(실제는 greedy 전략)

### **3) "Jim and the Orders"**

→ 정렬 + 선택(단순하지만 greedy 감각 강화)

---

# 6) 다음 과목

Greedy까지 완료했으니 다음으로 넘어갈 순서는:

➡ **11단원: Backtracking & Recursion**

이유:

- Greedy는 “결정 과정 간단”
    
- Backtracking은 “여러 후보 탐색(분기)”
    
- DP는 “중복 부분문제 최적화”
    

즉,  
Greedy → Backtracking → DP  
이 순서가 알고리즘 학습에서 가장 자연스럽고 효율적이다.

원하면 **11단원: Backtracking & Recursion** 바로 이어서 진행할게.