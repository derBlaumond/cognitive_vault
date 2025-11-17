- (Typescript 코딩테스트에서 반드시 익혀야 하는 핵심 탐색 패턴)
	- Binary Search는 코딩테스트에서 **중요도 TOP 3** 안에 들어가는 핵심 단원이며, Two Pointers와 함께 “정렬된 배열 관련 문제”의 양대 패턴이다.
# 1) **핵심 개념을 가장 빠르게 이해하기**

이진탐색(Binary Search)은 **정렬된 배열**에서 O(log N)에 값을 찾는 기법이다.  
핵심은 **범위를 절반씩 제거하는 것**.

---

## **① 전제 조건: 배열이 정렬(sorted) 되어 있어야 한다**

정렬되지 않았다 → 절대 Binary Search 사용 불가.

---

## **② mid(중앙값)을 기준으로 탐색 범위를 좁힌다**

기본 템플릿:

```ts
let left = 0;
let right = nums.length - 1;

while (left <= right) {
  const mid = Math.floor((left + right) / 2);

  if (nums[mid] === target) return mid;
  if (nums[mid] < target) left = mid + 1;
  else right = mid - 1;
}

return -1;
```

핵심은  
➡ **mid 값과 비교해서 탐색 범위를 반으로 줄이는 과정** 단 하나.

---

## **③ Binary Search는 배열 탐색뿐 아니라 “최적화 문제”에도 쓰인다**

아래 유형에서 자주 등장:

- “조건을 만족하는 최소/최대 값을 찾기”
    
- “true/false 조건 전환 지점 찾기”
    
- “배치 가능한 최소 거리 찾기”
    
- “Threshold 기반 문제”
    

이걸 이해하면 이진탐색이 **단순 검색 알고리즘이 아니라 범위 탐색 알고리즘**이라는 걸 느낄 수 있다.

---

## **④ Overflow 방지 mid 계산 패턴 (TS는 사실상 불필요하지만 습관!)**

```ts
const mid = left + Math.floor((right - left) / 2);
```

---

# 2) **Typescript 실전 템플릿**

---

## **① 정렬 배열에서 값 찾기**

```ts
function binarySearch(nums: number[], target: number): number {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (nums[mid] === target) return mid;
    if (nums[mid] < target) left = mid + 1;
    else right = mid - 1;
  }

  return -1;
}
```

---

## **② Lower Bound (target 이상 처음 위치)**

→ 정렬된 배열에서 특정 값의 첫 위치 찾기

```ts
function lowerBound(nums: number[], target: number): number {
  let left = 0;
  let right = nums.length;

  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] < target) left = mid + 1;
    else right = mid;
  }

  return left;
}
```

---

## **③ 조건 기반 탐색 (최소 시간/최소 길이 문제에 자주 쓰임)**

패턴 형태:

```ts
let left = 최소값;
let right = 최대값;

while (left < right) {
  const mid = Math.floor((left + right) / 2);

  if (조건(mid)) right = mid;
  else left = mid + 1;
}

return left;
```

이 패턴은 뒤에서 “투포인터/슬라이딩 윈도우 → 최적화 문제 → 이진 탐색”으로 연결된다.

---

# 3) **간단 연습문제 2개**

---

## **연습문제 1 — 기본 이진 탐색**

입력:  
`nums = [1, 3, 5, 7, 9], target = 7`  
출력:  
`3`

힌트:  
정확한 mid 계산 + left/right 조절.

---

## **연습문제 2 — Lower Bound 기본**

입력:  
`nums = [2, 4, 6, 8, 10], target = 6`  
출력:  
`2`

힌트:  
nums[mid] < target → left 이동.

---

# 4) **체크리스트 (Binary Search)**

아래 10개 중 7개 이상 “YES”면 충분하다.

- 배열이 정렬되어 있어야 한다는 기본 조건을 완벽히 이해했다.
    
- mid 계산과 left/right 조절 루틴이 자연스럽다.
    
- “== target” 인 경우 return mid 를 할 수 있다.
    
- “< target” → left 이동, “> target” → right 이동을 헷갈리지 않는다.
    
- 시간복잡도가 O(log N)임을 이해한다.
    
- Lower Bound / Upper Bound 개념을 알고 있다.
    
- 조건 기반 이진탐색 템플릿을 이해했다.
    
- “정답이 범위 안에서 단조 증가/감소하면 이진탐색 가능”이라는 감각이 있다.
    
- mid 계산 시 floor가 필요한 이유를 알고 있다.
    
- 탐색 종료 조건 `left <= right` 논리를 설명할 수 있다.
    

---

# 5) **HackerRank Easy 실전 문제 추천**

이진탐색 감각을 가장 빠르게 올려주는 Easy 문제 3개.

---

## ✔ 추천 문제 3개

### **1) "Binary Search: Ice Cream Parlor"**

→ 두 포인터 + 이진탐색 조합 감각 UP

### **2) "Sherlock and Array"**

→ 조건 기반 탐색 + 배열 조작

### **3) "Find the Median"**

→ 정렬 + 중간값 = mid 개념 강화

HackerRank는 순수 이진탐색 문제는 적지만,  
위 문제들이 “이진탐색 사고”를 강하게 요구한다.