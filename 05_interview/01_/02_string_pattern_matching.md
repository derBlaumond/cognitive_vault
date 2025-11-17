# 1) **핵심 개념을 가장 빠르게 이해하기**

문자열(String)은 본질적으로 **문자 배열(char array)** 이다.  
그래서 배열 문제의 사고 방식을 그대로 가져오면 70% 해결된다.

여기서 핵심 개념은 딱 4개다:

---

## **① 문자열은 불변(immutable)**

TS/JS에서 문자열은 수정이 불가능하다.

```ts
s[0] = 'a'; // 불가
```

수정하려면 새로운 문자열을 만들어야 한다:

```ts
s = s.slice(0, i) + 'a' + s.slice(i+1);
```

---

## **② 투 포인터(two pointers)**

문자열 문제 70%는 투 포인터로 해결된다.

- 회문(palindrome)
    
- substring 비교
    
- 부분 문자열 찾기
    

기본 패턴:

```ts
let left = 0;
let right = s.length - 1;

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
}
```

---

## **④ 슬라이딩 윈도우(sliding window)**

“가장 긴 부분 문자열”  
“특정 조건을 만족하는 최소 길이”  
와 같은 문제는 모두 이 패턴으로 해결한다.

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

```ts
function reverseString(s: string): string {
  let arr = s.split('');
  let left = 0, right = arr.length - 1;

  while (left < right) {
    [arr[left], arr[right]] = [arr[right], arr[left]];
    left++;
    right--;
  }

  return arr.join('');
}
```

---

## **② 아나그램 체크 (해시맵 기반)**

```ts
function isAnagram(a: string, b: string): boolean {
  if (a.length !== b.length) return false;

  const count = new Map<string, number>();

  for (const ch of a) {
    count.set(ch, (count.get(ch) ?? 0) + 1);
  }

  for (const ch of b) {
    if (!count.has(ch)) return false;
    count.set(ch, count.get(ch)! - 1);
    if (count.get(ch)! < 0) return false;
  }

  return true;
}
```

---

## **③ 회문(palindrome) 체크**

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

대표 패턴 중 하나.

```ts
function longestSubstring(s: string): number {
  const set = new Set<string>();
  let left = 0;
  let maxLen = 0;

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