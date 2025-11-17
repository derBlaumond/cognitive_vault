# 1) **핵심 개념을 가장 빠르게 이해하기**

==문자열(String)은 본질적으로 **문자 배열(char array)**== 이다.  
그래서 배열 문제의 사고 방식을 그대로 가져오면 70% 해결된다.

---

## **① 문자열은 불변(immutable)**

TS/JS에서 문자열은 수정이 불가능하다.

### BUT!
- Primitive Type 값 자체는 불변이지만, **변수가 그 값을 계속 쥐고 있을지(const), 놓아버리고 다른 값을 잡을지(let)**를 결정하는 것은 코드의 안정성과 타입 추론에 매우 중요합니다.
- "값의 불변성(Immutability)"과 "변수의 재할당(Reassignment)"은 서로 다른 차원의 이야기이다

```ts
s[0] = 'a'; // 불가
```

수정하려면 새로운 문자열을 만들어야 한다:

```ts
s = s.slice(0, i) + 'a' + s.slice(i+1);
```

---
## **② 투 포인터(two pointers)**

문자열 문제 70%는 투 포인터로 해결된다. 투포인터로 이중 반복문($O(n^2)$)을 써야 할 문제를 **단일 반복문($O(n)$)으로 풀 수 있게 해주는 강력한 효율성을 가집니다.

- 회문(palindrome)
    
- substring 비교
    
- 부분 문자열 찾기

기본 패턴:

```ts
// 왼쪽 포인터를 문자열의 가장 왼쪽, 오른쪽 포인터를 문자열의 가장 오른쪽에 배치
let left = 0;
let right = s.length - 1;

// 두 포인터가 만나거나 교차하기 전까지 반복
while (left < right) {
  if (s[left] !== s[right]) return false;
  left++;
  right--;
}
return true;
```

---
## **③ 해시맵 기반 문자 카운팅**

문자 관련 문제에서 가장 많이 쓰는 패턴.

예: 아나그램(anagram) 체크

```ts
const count = new Map<string, number>();

for (const ch of s) {
  count.set(ch, (count.get(ch) ?? 0) + 1);
	// 맵에서 현재 글자(`ch`)가 있는지 찾아보고 값을 가져옵니다.
	// 만약 가져온 값이 없다면(`undefined`), **0**으로 취급합니다.
	// 가져온 값(혹은 0)에 1을 더합니다.
	// 계산된 최종 값을 다시 맵의 `ch` 자리에 저장(업데이트) 합니다.
}
```

---

## **④ 슬라이딩 윈도우(sliding window)**

- 배열이나 문자열 같은 일렬로 된 데이터에서 **창문(Window)을 옆으로 밀면서 이동하듯이** 특정 범위를 탐색하는 알고리즘 기법.
	- **핵심 아이디어:** 매번 범위를 새로 계산하는 것이 아니라, **겹치는 부분은 유지하고** 새로 들어오는 데이터는 더하고, 나가는 데이터는 빼는 방식으로 효율성을 극대화합니다.
    
	- **작동 방식:** 두 개의 포인터(`left`, `right`)를 사용하여 창문의 시작과 끝을 조절합니다. 
	    1. **확장:** `right`를 오른쪽으로 이동시켜 창문을 넓힙니다.
	    2. **축소:** 특정 조건(예: 합이 너무 큼)에 걸리면 `left`를 오른쪽으로 이동시켜 창문을 줄입니다.

“가장 긴 부분 문자열”, “특정 조건을 만족하는 최소 길이” 와 같은 문제는 모두 이 패턴으로 해결한다.

기본 템플릿:

```ts
let left = 0;

for (let right = 0; right < s.length; right++) {
  // 윈도우 확장

  // 조건이 깨질 때 left 이동
  while (조건이_깨짐) {
    left++;
  }

  // 필요한 경우 정답 갱신
}
```

이건 나중에 Two Pointers / Sliding Window 챕터에서 더 심화되지만,  
문자열에서도 아주 자주 등장한다.

---

# 2) **Typescript 실전 패턴 템플릿**

## **① 문자열 뒤집기**

- 문자열 길이가 **홀수**일 때(예: "ABCDE", 길이 5), 가운데 글자는 교환될 필요가 없기 때문에 루프가 자연스럽게 종료됩니다.
```ts
function reverseString(s: string): string {
  let arr = s.split(''); // 문자열 s 를 한 글자씩 쪼갠다.
  let left = 0, right = arr.length - 1; // 투포인터

  while (left < right) {
    [arr[left], arr[right]] = [arr[right], arr[left]]; // 뒤집기
    left++;
    right--;
  }

  return arr.join(''); // 배열로 쪼개진 문자열을 합침
}
```

---

## **② 아나그램 체크 (해시맵 기반)**

- 두 문자열이 **같은 알파벳을 같은 개수만큼** 가지고 있는지 확인하는 로직입니다.

#### `!` 위치의 차이
1. 앞에 붙은 경우(!count.has(ch)): Logical NOT
2. 뒤에 붙은 경우(==`count.get(ch)!`==): Non-null Assertion Operation
	- 이 값은 절대 `null` 이나 `undefined` 가 아님은 보장한다!

```ts
function isAnagram(a: string, b: string): boolean {
  if (a.length !== b.length) return false; // 가드레일: 길이가 다르면 불가능

  const count = new Map<string, number>();
	
  // 첫 스트링을 순회하면서 카운트
  for (const ch of a) {
    count.set(ch, (count.get(ch) ?? 0) + 1);
  }
  
  // 두번째 스트링 b 와의 작업
  for (const ch of b) {
    if (!count.has(ch)) return false; // b 의 글자 중 하나가 a 에 없으면 false 반환
    count.set(ch, count.get(ch)! - 1); // 소거법: 있다면 갯수 1 차감 
    if (count.get(ch)! < 0) return false; // 순회중에 b
  }

  return true;
}
```

---

## **③ 회문(palindrome) 체크**

- palindrome: 기러기, 토마토 등
```ts
function isPalindrome(s: string): boolean {
  let left = 0, right = s.length - 1;

  while (left < right) {
    if (s[left] !== s[right]) return false;
    left++;
    right--;
  }
  return true;
}
```

---

## **④ 슬라이딩 윈도우로 “가장 긴 부분 문자열 길이”**

대표 패턴 중 하나: 리스트에섯 =="중복 없는 가장 긴 부분 문자열"의 길이==를 구하기

```ts
function longestSubstring(s: string): number {
  const set = new Set<string>();
  let left = 0;
  let maxLen = 0;

  for (let right = 0; right < s.length; right++) {
  
	// 3. [조건 위배 감지] 
	// 방금 들어오려는 글자(s[right])가 이미 Set 안에 있다면 중복입니다! 
	// 중복이 사라질 때까지 왼쪽(left)을 줄여나갑니다.
    while (set.has(s[right])) {
      set.delete(s[left]); // 4. 윈도우의 맨 왼쪽 글자를 Set에서 제거하고
      left++;              // 5. 왼쪽 포인터를 오른쪽으로 당깁니다 (윈도우 축소)
    }
    set.add(s[right]);
    maxLen = Math.max(maxLen, right - left + 1);
  }

  return maxLen;
}
```

---

# 3) **간단 연습문제 2개**

## **연습문제 1 — 문자열 뒤집기**

입력: `"hello"`  
출력: `"olleh"`

핵심:

- 투포인터 또는 `split → reverse → join` 둘 다 가능
    
- 하지만 코딩테스트는 투포인터가 더 좋다(연습 목적)
    

---

## **연습문제 2 — 문자열 내에서 특정 문자 개수 세기**

입력:  
`s = "abcaab", target = "a"`  
출력: `3`

힌트:  
단순 반복문 + count.

---

# 4) **체크리스트 (Strings 편)**

아래 8개 중 6개 이상 “YES”면 문자열 단원 완료.

- 문자열이 불변이라 직접 수정할 수 없다는 점을 알고 있다.
    
- 문자열을 배열처럼 다룰 수 있다는 감각이 있다.
    
- 투 포인터로 회문 검사가 가능하다.
    
- 해시맵으로 문자 빈도수를 세는 방법을 알고 있다.
    
- 아나그램을 Map 기반으로 해결할 수 있다.
    
- 문자열 슬라이싱(`slice`)이 익숙하다.
    
- 슬라이딩 윈도우 패턴이 어떤 문제에서 필요한지 감이 온다.
    
- 문자열 문제에서도 Set이 유용함을 이해하고 있다.
    

---

# 5) **HackerRank Easy 실전 문제 추천**

문자열 단원에 가장 최적화된 3문제:

1. **"Strings: camelCase"**
    
2. **"Two Characters"**
    
3. **"Funny String"**
    

이 문제들은 문자열 탐색, 비교, 패턴 체크를 정확히 요구한다.  
너의 문자열 실전력이 바로 올라갈 것.