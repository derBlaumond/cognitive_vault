좋아. 지금 **“0단원: TS 코딩테스트 실전 문법 & 패턴 요약 노트”**를 바로 완성해줄게.  
이 노트는 **코딩테스트에서 실제로 필요한 TS 기능만** 남기고,  
불필요한 문법 설명을 모두 제거한 **압축·실전 중심 자료**다.

이 0단원이 있으면 12개 단원의 알고리즘 노트와 완전히 맞물려서  
“언어 → 알고리즘 → 문제풀이” 전체 흐름이 구조적으로 완성된다.

---

# 📘 0단원: Typescript 코딩테스트 실전 문법 & 패턴 요약

(목표: 코딩테스트에 필요한 TS 문법을 10분 안에 정리하고,  
실전 제출 가능한 패턴 템플릿을 모두 확보하는 것)

---

# 1) **기본 타입 (코테에 필요한 최소한)**

### **배열 타입**

```ts
const nums: number[] = [1, 2, 3];
const strs: string[] = ["a", "b"];
```

### **튜플**

```ts
const p: [number, number] = [2, 3];
```

### **빈도수/카운팅 맵**

```ts
const freq: Record<string, number> = {};
```

### **Set / Map**

```ts
const seen = new Set<number>();
const map = new Map<string, number>();
```

→ JS 기반 테스트에서는 Object보다 **Map/Set**이 더 안정적이고 빠르다.

---

# 2) **반복문 (코테에서 주로 쓰는 3개만)**

### **for-loop**

```ts
for (let i = 0; i < arr.length; i++) { }
```

### **for...of (가장 코테 친화적)**

```ts
for (const x of arr) { }
```

### **for...in 은 사용 X**

객체 key 순회용 → 배열은 비추천.

---

# 3) **배열 메서드 (실전에서 90% 쓰는 것만)**

### **정렬**

```ts
nums.sort((a, b) => a - b);
```

### **map / filter (가벼운 전처리)**

```ts
const doubled = nums.map(x => x * 2);
const odds = nums.filter(x => x % 2 === 1);
```

### reduce (코테에서는 거의 사용 안 함, prefix나 누적 합 정도만)

```ts
const sum = nums.reduce((a, b) => a + b, 0);
```

---

# 4) **Node 구조 타입 정의 (Linked List, Tree 기본형)**

### LinkedList Node

```ts
interface ListNode {
  val: number;
  next: ListNode | null;
}
```

### Tree Node

```ts
interface TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
}
```

→ 이렇게 선언해 두면 이후 단원(Linked List / Tree / Graph)에서 모든 템플릿이 바로 적용된다.

---

# 5) **슬라이딩 윈도우 기본 템플릿**

(문자열·배열 문제 40% 커버)

```ts
let left = 0;

for (let right = 0; right < s.length; right++) {

    // window 확장

    while (조건을 만족하지 않으면) {
        // window 축소
        left++;
    }
}
```

---

# 6) **투 포인터 정석 패턴**

### 정렬 후 양끝 포인터

```ts
let left = 0;
let right = nums.length - 1;

while (left < right) {
  const sum = nums[left] + nums[right];
  if (sum === target) break;
  if (sum < target) left++;
  else right--;
}
```

### 중앙에서 시작하는 포인터: 회문/문자열 처리

```ts
let l = 0, r = s.length - 1;
while (l < r) {
  if (s[l] !== s[r]) return false;
  l++;
  r--;
}
```

---

# 7) **이진탐색 템플릿**

### 기본형

```ts
let left = 0, right = nums.length - 1;

while (left <= right) {
  const mid = left + Math.floor((right - left) / 2);

  if (nums[mid] === target) return mid;
  if (nums[mid] < target) left = mid + 1;
  else right = mid - 1;
}

return -1;
```

### lowerBound

```ts
function lowerBound(arr: number[], x: number): number {
  let l = 0, r = arr.length;
  while (l < r) {
    const mid = Math.floor((l + r) / 2);
    if (arr[mid] < x) l = mid + 1;
    else r = mid;
  }
  return l;
}
```

---

# 8) **Stack / Queue 실전 패턴**

### Stack

```ts
const stack: number[] = [];
stack.push(x);
stack.pop();
```

### Monotonic Stack (전형)

```ts
const st: number[] = [];
for (let i = 0; i < nums.length; i++) {
  while (st.length && nums[st[st.length - 1]] < nums[i]) {
    const idx = st.pop()!;
  }
  st.push(i);
}
```

### Queue (BFS)

```ts
const queue: number[] = [start];

while (queue.length) {
  const node = queue.shift()!;
  for (const next of graph[node]) {
    queue.push(next);
  }
}
```

---

# 9) **DFS / BFS 템플릿 (Graph & Tree 공용)**

### DFS (재귀)

```ts
function dfs(node: number) {
  visited.add(node);
  for (const next of graph[node]) {
    if (!visited.has(next)) dfs(next);
  }
}
```

### BFS (Queue)

```ts
function bfs(start: number) {
  const queue = [start];
  const visited = new Set([start]);

  while (queue.length) {
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

---

# 10) **Backtracking 템플릿**

(모든 백트래킹 문제의 공통 구조)

```ts
function backtrack(path: number[], start: number) {
  result.push([...path]);

  for (let i = start; i < nums.length; i++) {
    path.push(nums[i]);
    backtrack(path, i + 1);
    path.pop();
  }
}
```

---

# 11) **DP (Bottom-up) 기본 형태**

(상태 정의 → 점화식 → 초기값)

```ts
const dp = Array(n + 1).fill(0);
dp[0] = 1;

for (let i = 1; i <= n; i++) {
  dp[i] = dp[i-1] + dp[i-2];
}

return dp[n];
```

### Top-down

```ts
function solve(n: number, memo: Record<number, number> = {}) {
  if (n <= 1) return n;
  if (memo[n]) return memo[n];
  memo[n] = solve(n - 1, memo) + solve(n - 2, memo);
  return memo[n];
}
```

---

# ✔ 최종 요약

이 0단원은 TS 코딩테스트에서 **반드시 필요한 것만** 담은 실전 요약이다.  
이제 이 노트 + 앞에서 작성된 12개 단원 = **완성된 전체 커리큘럼**.

---

원하면:

- 0단원 + 12단원 전체를 하나의 **PDF / 마크다운 통합 정리본**으로 만들어주거나
    
- “문제풀이 전용 TS 템플릿 20개 세트”를 따로 만들어줄게.
    

어떤 방식으로 출력해줄까?