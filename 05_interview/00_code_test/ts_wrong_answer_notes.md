## 1. 배열의 합 구하기 (Sum of Array)

### 문제

정수 배열이 주어졌을 때, 모든 원소의 합을 구하는 함수를 작성하라.

### 요구사항

- 입력: `number[]`
    
- 출력: `number`
    
- 빈 배열이면 0을 반환
    

### 함수 시그니처

```ts
function sumArray(nums: number[]): number;
```

### 정답 (TS)

```ts
function sumArray(nums: number[]): number {
  let sum = 0;

  for (const n of nums) {
    sum += n;
  }

  return sum;
}
```

### 해설 (TS 포인트)

- 배열 타입을 `number[]` 로 명시.
    
- `for...of` 는 `nums` 요소 타입을 자동으로 `number` 로 추론한다.
    
- Easy 문제에서 가장 기본적인 “반복 + 누적” 패턴.
    

---

## 2. 배열에서 최댓값 찾기 (Max in Array)

### 문제

정수 배열에서 가장 큰 값을 반환하는 함수를 작성하라.

### 요구사항

- 배열이 비어 있으면 `null` 반환
    
- 그렇지 않으면 최댓값 반환
    

### 함수 시그니처

```ts
function maxInArray(nums: number[]): number | null;
```

### 정답 (TS)

```ts
function maxInArray(nums: number[]): number | null {
  if (nums.length === 0) {
    return null;
  }

  let max = nums[0];

  for (let i = 1; i < nums.length; i++) {
    if (nums[i] > max) {
      max = nums[i];
    }
  }

  return max;
}
```

### 해설 (TS 포인트)

- 반환 타입을 `number | null` 로 union 타입으로 명시.
    
- `nums[0]` 를 기준으로 시작하므로, 빈 배열 처리 분기가 필수.
    
- Easy 문제에서 “nullable 반환”을 union 타입으로 표현하는 기본 패턴.
    

---

## 3. 문자열 뒤집기 (Reverse String)

### 문제

문자열을 뒤집어서 반환하는 함수를 작성하라.  
예: `"abcd"` → `"dcba"`

### 함수 시그니처

```ts
function reverseString(s: string): string;
```

### 정답 (TS)

```ts
function reverseString(s: string): string {
  // 가장 간단한 JS식
  return s.split("").reverse().join("");
}
```

### 해설 (TS 포인트)

- 문자열 타입 `string` 쓰면 끝이라 TS 포인트보다는 로직이 핵심.
    
- 코테에서 “내장 함수 써도 되냐?”를 안 막으면 이게 베스트.
    
- 직접 구현 버전도 연습해두면 좋다:
    

```ts
function reverseStringManual(s: string): string {
  let result = "";

  for (let i = s.length - 1; i >= 0; i--) {
    result += s[i];
  }

  return result;
}
```

---

## 4. 팰린드롬 확인 (Palindrome Check)

### 문제

문자열이 앞뒤가 같은지(팰린드롬) 확인하는 함수를 작성하라.  
예: `"racecar"` → true, `"hello"` → false

### 함수 시그니처

```ts
function isPalindrome(s: string): boolean;
```

### 정답 (TS)

```ts
function isPalindrome(s: string): boolean {
  let left = 0;
  let right = s.length - 1;

  while (left < right) {
    if (s[left] !== s[right]) {
      return false;
    }
    left++;
    right--;
  }

  return true;
}
```

### 해설 (TS 포인트)

- 투 포인터(two pointers) 기본 패턴.
    
- Easy 난이도에서 자주 나오는 “양 끝에서 안쪽으로 좁혀가기” 로직.
    
- 타입은 단순하지만, 이 패턴은 Medium에서도 계속 나온다.
    

---

## 5. 배열에서 target 존재 여부 (Linear Search)

### 문제

정수 배열 `nums` 와 정수 `target` 이 주어졌을 때,  
target이 배열 안에 존재하면 true, 아니면 false를 반환하라.

### 함수 시그니처

```ts
function contains(nums: number[], target: number): boolean;
```

### 정답 (TS)

```ts
function contains(nums: number[], target: number): boolean {
  for (const n of nums) {
    if (n === target) {
      return true;
    }
  }
  return false;
}
```

### 해설 (TS 포인트)

- 가장 기본적인 순차 탐색(linear search).
    
- JS에서 `includes` 를 사용해도 무방:
    

```ts
function contains2(nums: number[], target: number): boolean {
  return nums.includes(target);
}
```

- TS 관점에서는 별다른 고급 문법 필요 없음.
    

---

## 6. 두 수의 합 (Two Sum – boolean 버전)

### 문제

정수 배열 `nums` 와 정수 `target` 이 주어질 때,  
서로 다른 두 원소를 더해서 `target` 을 만들 수 있으면 true,  
그렇지 않으면 false를 반환하라.  
인덱스를 반환하는 버전은 Medium에서 더 자주 나오므로 여기선 boolean 버전.

### 함수 시그니처

```ts
function twoSumExists(nums: number[], target: number): boolean;
```

### 정답 (TS, HashSet 이용 O(n))

```ts
function twoSumExists(nums: number[], target: number): boolean {
  const seen = new Set<number>();

  for (const n of nums) {
    const needed = target - n;
    if (seen.has(needed)) {
      return true;
    }
    seen.add(n);
  }

  return false;
}
```

### 해설 (TS 포인트)

- `Set<number>` 활용 → HashSet 패턴 익히기.
    
- 시간 복잡도 O(n), Easy/Medium 사이에서 매우 자주 나오는 기본 패턴.
    
- TS에서는 `Set<number>` 로 타입을 명확히 지정.
    

---

## 7. 배열 중복 제거 (Remove Duplicates)

### 문제

정수 배열 `nums` 가 주어졌을 때, 중복된 원소를 제거하고  
유일한 값만 포함하는 새 배열을 반환하라. 순서는 상관 없다고 가정.

### 함수 시그니처

```ts
function uniqueArray(nums: number[]): number[];
```

### 정답 (TS, Set 활용)

```ts
function uniqueArray(nums: number[]): number[] {
  return Array.from(new Set<number>(nums));
}
```

### 수동 구현 버전

```ts
function uniqueArrayManual(nums: number[]): number[] {
  const seen = new Set<number>();
  const result: number[] = [];

  for (const n of nums) {
    if (!seen.has(n)) {
      seen.add(n);
      result.push(n);
    }
  }

  return result;
}
```

### 해설 (TS 포인트)

- `Set<number>`로 타입 지정.
    
- `Array.from` 으로 Set → 배열 변환.
    
- 코테에서 Set/Map 패턴은 반드시 익숙해져야 한다.
    

---

## 8. 가장 많이 등장하는 문자 찾기 (Max Character Frequency)

### 문제

문자열 `s` 가 주어졌을 때, 가장 자주 등장하는 문자를 반환하라.  
여러 개면 그 중 아무거나 반환해도 된다.

### 함수 시그니처

```ts
function maxChar(s: string): string | null;
```

### 정답 (TS)

```ts
function maxChar(s: string): string | null {
  if (s.length === 0) return null;

  const freq: Record<string, number> = {};
  // 혹은: const freq: { [key: string]: number } = {};

  for (const ch of s) {
    freq[ch] = (freq[ch] ?? 0) + 1;
  }

  let maxCount = 0;
  let maxChar = s[0];

  for (const ch in freq) {
    if (freq[ch] > maxCount) {
      maxCount = freq[ch];
      maxChar = ch;
    }
  }

  return maxChar;
}
```

### 해설 (TS 포인트)

- `Record<string, number>` 로 frequency map 타입을 선언.
    
- `freq[ch] ?? 0` 처럼 nullish coalescing 사용.
    
- 이렇게 map을 쓰는 패턴은
    
    - 아나그램 체크
        
    - 중복 문자
        
    - 투표/카운트 문제  
        등에서 계속 반복된다.
        

---

## 9. 올바른 괄호 문자열인지 확인 (Valid Parentheses)

### 문제

문자열 `s`가 `'('`, `')'`, `'{'`, `'}'`, `'['`, ']'` 만을 포함할 때,  
괄호 쌍이 올바르게 열리고 닫혀 있는지 확인하라.

예:

- `"()[]{}"` → true
    
- `"(]"` → false
    
- `"([)]"` → false
    
- `"{[]}"` → true
    

### 함수 시그니처

```ts
function isValidParentheses(s: string): boolean;
```

### 정답 (TS – 스택 사용)

```ts
function isValidParentheses(s: string): boolean {
  const stack: string[] = [];
  const pairs: Record<string, string> = {
    ")": "(",
    "}": "{",
    "]": "[",
  };

  for (const ch of s) {
    if (ch === "(" || ch === "{" || ch === "[") {
      stack.push(ch);
    } else {
      const top = stack.pop();
      if (top !== pairs[ch]) {
        return false;
      }
    }
  }

  return stack.length === 0;
}
```

### 해설 (TS 포인트)

- `stack: string[]` 로 스택 타입 명시.
    
- `pairs` 를 `Record<string, string>` 로 선언.
    
- Easy/Medium 코테에서 “스택 + 괄호” 문제는 거의 고전 중의 고전.
    

---

## 10. 두 개의 정렬된 배열 병합 (Merge Sorted Arrays)

### 문제

두 개의 오름차순 정렬된 정수 배열 `a`, `b` 가 주어질 때,  
두 배열의 모든 원소를 포함하는 **새로운 오름차순 정렬 배열**을 반환하라.

예:

- a = [1, 3, 5], b = [2, 4, 6] → [1,2,3,4,5,6]
    

### 함수 시그니처

```ts
function mergeSortedArrays(a: number[], b: number[]): number[];
```

### 정답 (TS – 투 포인터 O(n))

```ts
function mergeSortedArrays(a: number[], b: number[]): number[] {
  const result: number[] = [];
  let i = 0;
  let j = 0;

  while (i < a.length && j < b.length) {
    if (a[i] <= b[j]) {
      result.push(a[i]);
      i++;
    } else {
      result.push(b[j]);
      j++;
    }
  }

  // 남은 부분 처리
  while (i < a.length) {
    result.push(a[i]);
    i++;
  }

  while (j < b.length) {
    result.push(b[j]);
    j++;
  }

  return result;
}
```

### 해설 (TS 포인트)

- 투 포인터(two pointers) + 정렬된 배열이라는 조건 활용.
    
- 시간 복잡도 O(n + m).
    
- Easy~Medium 레벨에서 매우 자주 나오는 패턴.
    

---

## 정리: 이 10문제로 무엇을 얻는지

이 10개를 TypeScript로 자연스럽게 구현할 수 있다면:

- 배열 순회, 문자열 처리, 조건문/반복문 → 기본기 OK
    
- Set/Map/Record 사용 → 해시 기반 패턴 OK
    
- Two pointers, Stack → Easy~Medium 알고리즘 패턴 입문 OK
    
- TypeScript 타입 명시, union, Record, 배열 타입 → TS 문법 코테용 충분
    

즉,  
**“언어: TS / 난이도: Easy / 플랫폼: HackerRank/LeetCode/SAP 자체 코테”**  
조합에서는 충분히 통과 가능한 수준이다.

원하면 다음 단계로:

- 이 10문제를 실제 HackerRank 스타일 입출력 형태로 변형
    
- Medium 입문 5문제 + TS 해설
    
- 또는 “면접 때 말로 설명하는 버전(알고리즘 설명용 스크립트)”
    

중에서 골라서 이어갈 수 있다.