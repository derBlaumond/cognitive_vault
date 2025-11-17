# 1) **핵심 개념을 가장 빠르게 이해하기**

배열 문제의 핵심은 총 4가지다:

## **① 반복(loop)**

모든 배열 문제는 궁극적으로 “하나씩 보면서 판단하는 과정”이다.

TS 기본 패턴:

```ts
for (let i = 0; i < arr.length; i++) { ... }
```

또는:

```ts
for (const num of arr) { ... }
```

---

## **② 정렬(sort)**

많은 문제는 **==정렬 후 해결==**하면 훨씬 단순해진다.

```ts
arr.sort((a, b) => a - b);
```

---

## **③ 보조 메모리 구조(예: Set, Map)**

==중복 제거, 존재 여부 체크==에 절대적으로 유리하다.

```ts
const seen = new Set<number>();
```

---

## **④ Prefix Sum (누적합)**

합 계산을 빠르게 하려면 ==prefix sum==이 핵심이다.

```ts
const prefix = new Array(arr.length + 1).fill(0);
for (let i = 0; i < arr.length; i++) {
  prefix[i+1] = prefix[i] + arr[i];
}
//---
nums = [3, 1, 4] // 예시
sum(l, r) = prefix[r+1] - prefix[l] // 구간합(from l to r) 구하기
// index 1-2 요소 합 => 오른쪽 구간 합 - 왼쪽 구간 합
sum(1,2) =  prefix[2+1] - prefix[1] = 8 - 3 = 5
```

---

# 2) **Typescript 실전 패턴 템플릿**

## **① 배열에서 최대/최소 찾기**

```ts
// 가장 작은 수 (마이너스 무한대)를 설정해서 어떤 수도 이보다 더 클 수 있도록 설정
let max = -Infinity; 

for (const num of arr) {
  if (num > max) max = num;
}
```

---

## **② 배열에서 특정 조건 찾기(filter 방식 X)**

코딩테스트에서는 filter를 크게 쓰지 않는다.  
**직접 탐색이 시간 복잡도에 더 안전**하다.

---

## **③ Two Sum (브루트포스 → 해시맵 패턴)**

가장 대표적인 문제.

```ts
function twoSum(nums: number[], target: number): number[] {
  const map = new Map<number, number>();

  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement)!, i];
    }
    map.set(nums[i], i);
  }

  return [-1, -1];
}
```

이 한 문제로 배열 + 해시맵의 70%를 익힐 수 있다.

---

# 3) **간단 연습문제 2개**

아래 두 문제는 배열 단원에서 반드시 풀어야 하는 “기초 체력 문제”다.

---

## **연습문제 1 — 배열의 최대값 찾기**

**입력:**  
`nums = [2, 7, 1, 9, 4]`

**출력:**  
`9`

**힌트:**  
반복문 하나로 해결.

---

## **연습문제 2 — 배열에서 target 개수 세기**

**입력:**  
`nums = [1, 3, 2, 3, 3, 5], target = 3`  
**출력:**  
`3`

**힌트:**  
단순 반복문 + count 증가.

---

필요하면 바로 TS 코드도 예시로 작성해줄 수 있어.

---

# 4) **체크리스트 (Arrays 편)**

아래 8개 중 6개 이상 “YES”면 배열 단원은 충분히 이해한 것.

- 배열을 순회하는 3가지 방식(for, for of, index 접근)을 구분할 수 있다.
    
- 배열의 정렬이 O(N log N)임을 알고 있다.
    
- 중복 체크를 Set으로 처리할 수 있다.
    
- “정렬 후 해결되는 문제”가 뭔지 감이 온다.
    
- 누적합(prefix sum)을 만들어 본 적 있다.
    
- 해시맵(Map)을 이용한 Two Sum 로직이 이해된다.
    
- 배열과 문자열 변환(`split`, `join`)이 익숙하다.
    
- 단순 반복문으로 빈도수 세기가 가능하다.
---

# 5) **HackerRank Easy 실전 문제 추천**

아래 4문제는 Arrays 단원에 가장 최적화된 Easy 레벨이다.

## ✔ 필수 4문제

1. **"Simple Array Sum"**
    
2. **"Compare the Triplets"**
    
3. **"A Very Big Sum"**
    
4. **"Diagonal Difference"**
    

(모두 HackerRank “Problem Solving (Basic)” 카테고리)

이 문제들을 풀면:

- 반복문 감각
    
- 배열 인덱싱
    
- 최소/최대
    
- 단순 조건 비교
    

이 완전히 잡힌다.