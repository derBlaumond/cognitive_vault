- (“모든 가능한 경우를 탐색하되, 가능한 빨리 가지치기 하는 기술”)
	이 단원은 코딩테스트에서 **Sudoku, Permutation, Subset** 등 “경우의 수 탐색” 문제를 모두 해결하는 핵심

# 1) **핵심 개념을 가장 빠르게 이해하기**

Backtracking은 직역하면 **“되돌아가기”** 이다.  
즉, 하나의 후보를 선택 → 탐색 → 실패 시 되돌아와 다른 후보 선택.

대표 흐름:

➡ **선택 → 탐색 → 되돌리기(undo)**

이 과정을 재귀(recursion)로 구현한다.

---

## **① Backtracking 핵심 구조(템플릿)**

아래 3단계 패턴은 모든 백트래킹 문제에서 반복된다.

```ts
function backtrack(path: any[]) {
  if (정답 조건) {
    결과 기록;
    return;
  }

  for (선택지 of 가능한 후보들) {
    path.push(선택지);     // ① 선택
    backtrack(path);        // ② 탐색
    path.pop();             // ③ 되돌리기(undo)
  }
}
```

이 템플릿을 이해하면  
**Subsets / Permutations / Combinations / N-Queen 모두 풀린다.**

---

## **② Recursion(재귀)의 기본 원리**

재귀는 “함수가 자신을 다시 호출”하는 방식이다.

코딩테스트 재귀 문제의 핵심:

- 종료 조건(base case)을 명확히 지정
    
- 매 호출마다 문제의 크기를 줄인다
    
- 백트래킹과 같이 사용하면 완전탐색 가능
    

---

## **③ Backtracking = DFS의 “모든 후보 탐색 버전”**

너는 이미 DFS를 배웠다.  
Backtracking은 DFS에서 “선택한 후보를 되돌리는 기능”만 추가된 것이다.

---

## **④ 가지치기(pruning)의 중요성**

불필요한 탐색을 최대한 빨리 걸러내는 것이 핵심.

예:

- 조건을 만족하지 않으면 더 탐색하지 않는다
    
- 정렬한 뒤 중복값을 건너뛴다
    
- 조합/순열 문제에서 used 배열을 통해 중복 제거
    

---

# 2) **Typescript 실전 템플릿**

---

## **① Subsets(부분집합) — 가장 기본적인 백트래킹**

```ts
function subsets(nums: number[]): number[][] {
  const result: number[][] = [];
  const path: number[] = [];

  function backtrack(start: number) {
    result.push([...path]);

    for (let i = start; i < nums.length; i++) {
      path.push(nums[i]);
      backtrack(i + 1);
      path.pop();
    }
  }

  backtrack(0);
  return result;
}
```

---

## **② Permutations(순열)**

```ts
function permute(nums: number[]): number[][] {
  const result: number[][] = [];
  const used = new Array(nums.length).fill(false);
  const path: number[] = [];

  function backtrack() {
    if (path.length === nums.length) {
      result.push([...path]);
      return;
    }

    for (let i = 0; i < nums.length; i++) {
      if (used[i]) continue;

      used[i] = true;
      path.push(nums[i]);

      backtrack();

      used[i] = false;
      path.pop();
    }
  }

  backtrack();
  return result;
}
```

---

## **③ Combinations(조합)**

```ts
function combine(n: number, k: number): number[][] {
  const result: number[][] = [];
  const path: number[] = [];

  function backtrack(start: number) {
    if (path.length === k) {
      result.push([...path]);
      return;
    }

    for (let i = start; i <= n; i++) {
      path.push(i);
      backtrack(i + 1);
      path.pop();
    }
  }

  backtrack(1);
  return result;
}
```

---

## **④ N-Queen — 백트래킹 고전 문제**

구조만 보자:

```ts
function solveNQueens(n: number): number[][] {
  const result: number[][] = [];
  const board: number[] = [];

  function isValid(row: number, col: number): boolean {
    for (let r = 0; r < row; r++) {
      const c = board[r];
      if (c === col || Math.abs(c - col) === row - r) return false;
    }
    return true;
  }

  function backtrack(row: number) {
    if (row === n) {
      result.push([...board]);
      return;
    }

    for (let col = 0; col < n; col++) {
      if (!isValid(row, col)) continue;
      board[row] = col;
      backtrack(row + 1);
      board[row] = -1; // undo
    }
  }

  board.fill(-1);
  backtrack(0);
  return result;
}
```

---

# 3) **간단 연습문제 2개**

---

## **연습문제 1 — Subsets 출력하기**

입력: `[1, 2]`  
출력:

```
[]
[1]
[2]
[1, 2]
```

핵심:  
start index 기반 backtrack

---

## **연습문제 2 — Permutation 생성하기**

입력: `[1, 2, 3]`  
출력:  
모든 순열 6개

힌트:  
used 배열 기반

---

# 4) **Backtracking 체크리스트**

아래 12개 중 8개 이상 YES면 충분하다.

### ✔ Backtracking 구조

- 선택 → 탐색 → 되돌리기 패턴을 설명할 수 있다.
    
- path push/pop의 의미를 이해했다.
    

### ✔ Recursion

- 종료 조건(base case)을 명확히 설정할 수 있다.
    
- 재귀 호출 구조를 직접 만들 수 있다.
    

### ✔ 대표 문제 패턴

- subsets 로직을 직접 구현할 수 있다.
    
- permutation 로직을 직접 구현할 수 있다.
    
- combination 로직이 이해된다.
    

### ✔ 중복 제거 / 가지치기

- used 배열 또는 start index 로 중복 제거 가능
    
- pruning 아이디어를 설명할 수 있다.
    

### ✔ 사고 흐름

- “가능한 모든 경우를 탐색해야 하는 문제”를 보면 백트래킹이 떠오른다.
    
- DFS vs Backtracking의 차이를 구분할 수 있다.
    
- Greedy/DP와 백트래킹의 차이를 설명할 수 있다.
    

---

# 5) **HackerRank Easy 실전 문제 추천**

Backtracking 문제는 LeetCode 쪽이 더 풍부하지만,  
HackerRank에서도 몇 개 연습 가능한 문제들이 있다:

---

## ✔ 추천 문제 3개

### **1) "Backtracking: Subsets" (Practice Track)**

→ 부분집합 패턴 완전 이해 가능

### **2) "Permutation: Print the Orders"**

→ 순열 생성 플로우 체화

### **3) "Recursion: Fibonacci Numbers"**

→ 재귀 기본기 연습