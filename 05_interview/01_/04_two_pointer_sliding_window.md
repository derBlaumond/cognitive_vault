- (Typescript 코딩테스트에서 가장 중요) - 코딩테스트에서 **가장 출현 빈도가 높고**, 실력 상승 체감이 가장 큰 핵심 파트다.
# 1) **핵심 개념을 가장 빠르게 이해하기**

Two Pointers(두 포인터)와 Sliding Window(슬라이딩 윈도우)는  
문자열/배열 문제의 **50% 이상을 커버하는 패턴**이다.

둘은 비슷하지만 목적이 다르다.

---

## **① Two Pointers = “정렬된 배열의 문제를 빠르게 해결하는 방법”**

두 인덱트를 사용해, 전체 공간을 효율적으로 탐색하는 방식.

대표 문제:

- 두 수의 합(Two Sum) — 정렬 기반 버전
    
- 회문 검사
    
- 서로 가까운 값 찾기
    
- 중복 제거
    

기본 패턴:

```ts
let left = 0;
let right = arr.length - 1;

while (left < right) {
  if (arr[left] + arr[right] === target) return [left, right];
  if (arr[left] + arr[right] < target) left++;
  else right--;
}
```

핵심은  
➡ **“조건에 따라 포인터 중 하나를 움직여 공간을 줄인다.”**

---

## **② Sliding Window = “연속된 구간(substring/subarray) 문제 해결”**

윈도우(연속된 범위)를 유지하면서  
조건에 따라 크기를 늘리거나 줄인다.

대표 문제:

- 가장 긴 부분 문자열
    
- 조건을 만족하는 최소 길이 subarray
    
- 특정 문자 빈도 포함 구간 찾기
    

기본 템플릿:

```ts
let left = 0;

for (let right = 0; right < s.length; right++) {
  // 오른쪽 확장

  while (조건을 만족하지 않음) {
    // 왼쪽 축소
    left++;
  }

  // 정답 갱신
}
```

핵심은  
➡ **“확장하고, 필요할 때 축소한다.”**

---

## 두 패턴을 비교 요약

|패턴|언제 쓰는가|특징|
|---|---|---|
|Two Pointers|정렬된 배열 / 양쪽에서 좁히기|O(N), 공간 효율 높음|
|Sliding Window|연속된 구간(subarray/substring)|Map/Set과 함께 자주 사용|

---

# 2) **Typescript 실전 템플릿 (최상위 중요도)**

---

## **① 정렬된 배열에서 Two Sum**

```ts
function twoSumSorted(arr: number[], target: number): number[] {
  let left = 0, right = arr.length - 1;

  while (left < right) {
    const sum = arr[left] + arr[right];
    if (sum === target) return [left, right];
    if (sum < target) left++;
    else right--;
  }
  return [-1, -1];
}
```

---

## **② 문자열에서 가장 긴 부분 문자열 길이 (Sliding Window + Set)**

→ 코딩테스트 출현 빈도 TOP 5

```ts
function longestSubstring(s: string): number {
  const set = new Set<string>();
  let left = 0, maxLen = 0;

  for (let right = 0; right < s.length; right++) {
    while (set.has(s[right])) {
      set.delete(s[left]);
      left++;
    }
    set.add(s[right]);
    maxLen = Math.max(maxLen, right - left + 1);
  }

  return maxLen;
}
```

---

## **③ 최소 길이 subarray 찾기 (Sliding Window + 합 조건)**

```ts
function minSubArrayLen(target: number, nums: number[]): number {
  let left = 0, sum = 0, minLen = Infinity;

  for (let right = 0; right < nums.length; right++) {
    sum += nums[right];

    while (sum >= target) {
      minLen = Math.min(minLen, right - left + 1);
      sum -= nums[left];
      left++;
    }
  }

  return minLen === Infinity ? 0 : minLen;
}
```

---

# 3) **간단 연습문제 2개**

## **연습문제 1 — 회문 검사 (Two Pointers)**

입력: `"racecar"`  
출력: `true`

힌트:  
양끝에서 좁혀가며 비교.

---

## **연습문제 2 — 최대 부분 문자열 길이 (Sliding Window)**

입력: `"abcabcbb"`  
출력: `3`  
설명: `"abc"`

힌트:  
Set + left 이동.

---

# 4) **체크리스트 (Two Pointers & Sliding Window)**

아래 10개 중 7개 이상 “YES”면 충분하다.

### **Two Pointers**

- 정렬된 배열에서 포인터 두 개로 문제를 해결할 수 있는가?
    
- 어떤 경우 left/right 를 움직여야 하는지 이해했다.
    
- 회문 문제를 두 포인터로 풀 수 있다.
    
- “조건 만족 → 포인터 이동” 흐름이 자연스럽다.
    

### **Sliding Window**

- 연속된 구간(substring/subarray) 문제에서 윈도우가 유용함을 알고 있다.
    
- Set 또는 Map을 사용해 윈도우 조건을 체크할 수 있다.
    
- “확장하고 → 조건 위반 시 축소” 흐름이 이해된다.
    
- longest substring 문제를 직접 구현할 수 있다.
    
- sum, count 등 누적값을 윈도우로 관리할 수 있다.
    

---

# 5) **HackerRank Easy 실전 문제 추천**

이 단원과 가장 잘 맞는 문제들:

## ✔ 추천 문제 3개 (Easy)

### **1) "Subarray Division"**

→ 연속된 subarray 합 = 슬라이딩 윈도우 기본

### **2) "Two Strings"**

→ 부분 문자열 존재 여부 = Set + 윈도우 사고 필요

### **3) "Alternating Characters"**

→ 문자열 비교 + 포인터 이동

모두 Two Pointer/Window 사고 훈련에 매우 적합하다.