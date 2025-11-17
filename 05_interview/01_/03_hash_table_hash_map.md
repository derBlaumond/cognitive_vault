- (코딩테스트 난이도에 가장 큰 영향력을 가진 단원)
# 1) **핵심 개념을 가장 빠르게 이해하기**

해시 테이블(= Map, Object, Dictionary)은 코딩테스트에서 **가장 많이 쓰이고, 난이도를 가장 크게 낮추는 도구**이다.

---
## **① 조회(lookup)가 평균 $O(1)$**

→ 특정 값이 “있는지” 찾는 데 가장 빠르다.  
→ `Map` 은 내부적으로 해시 함수(Hash Function)를 써서 데이터가 저장된 주소를 **즉시 계산**해냅니다. 그래서 반복문 없이 바로 찾아냅니다.

```ts
const map = new Map<string, number>();
map.set("a", 1); // Map 에 "a" key 를 가진 value 1 을 저장함.
map.get("a"); // Output: 1
map.has("a"); // Output: true
```

## **② “빈도수 세기” 문제의 거의 모든 정답이 Map**

- 알고리즘 문제에서 **"가장 많이 등장한 단어는?", "숫자들의 개수를 세어라"** 같은 유형은 90% 이상 **Map**을 사용합니다.

```ts
for (const x of arr) {
  count.set(x, (count.get(x) ?? 0) + 1);
	// 1. count.get(x): "지금까지 x가 몇 번 나왔어?"라고 맵에 물어봅니다. 
	// 2. ?? 0: "아직 한 번도 안 나왔으면(undefined) 0으로 쳐줘." 
	// 3. + 1: 조회한 횟수(혹은 0)에 1을 더합니다. (이번에 나왔으니까!) 
	// 4. count.set(x, ...): 계산된 새로운 횟수를 다시 x의 자리에 덮어씌워 저장합니다.
}
```

## **③ Set: “존재 여부만 필요한 경우” 더 빠르고 깔끔**
 
중복 체크 / 방문 여부 / 존재 검사

```ts
const seen = new Set<number>();
seen.add(5); // 숫자 5를 집어넣지만, 이미 존재한다면 아무일도 일어나지 않는다.
seen.has(5); // true
```

---
# 2) **Typescript 실전 템플릿 (해시 문제에서 90% 쓰는 조합)**

## **① 빈도수 카운팅 Map**

```ts
const freq = new Map<string, number>();

for (const ch of s) {
  freq.set(ch, (freq.get(ch) ?? 0) + 1);
}
```

## **② Set으로 중복 체크**

```ts
function containsDuplicate(nums: number[]): boolean {
  const set = new Set(nums); // list 를 Set 으로 변경시키면서 중복 삭제
  return set.size !== nums.length; // boolean 으로 중복이 없다면 True
}
```

## **③ Two Sum (가장 대표 해시 문제)**

```ts
function twoSum(nums: number[], target: number): number[] {
  const map = new Map<number, number>();

  for (let i = 0; i < nums.length; i++) {
    const comp = target - nums[i];
    if (map.has(comp)) return [map.get(comp)!, i];
    map.set(nums[i], i);
  }
  return [-1, -1];
}
```

## **④ 슬라이딩 윈도우 + 해시맵 조합**

문자/부분 문자열 문제에서 자주 등장.

```ts
const count = new Map<string, number>();
// 문자 개수 감소/증가 조절
```

---
# 3) **간단 연습문제 2개**

## **연습문제 1 — 배열에서 각 숫자의 빈도수 구하기**

입력:  
`[1, 2, 2, 3, 3, 3]`  
출력:  
`{1:1, 2:2, 3:3}`

핵심: Map으로 해결.

---

## **연습문제 2 — 중복된 값이 있는지 검사하기**

입력:  
`[1, 4, 6, 4]`  
출력:  
`true`

핵심: Set의 크기 비교.

---

# 4) **체크리스트 (Hash Tables 편)**

8개 중 6개 이상 YES면 이 단원은 충분하다.

- Map을 “키-값 저장소(딕셔너리)”로 정확히 이해했다.
    
- Map.get(), Map.set(), Map.has() 사용법이 자연스럽다.
    
- “빈도수 세기 = Map” 패턴을 외웠다.
    
- Set이 “존재 여부만 필요할 때” 유리하다는 감각이 있다.
    
- 해시를 이용하면 중복 체크가 O(N)에 가능함을 이해했다.
    
- “Two Sum = Map 기반”이 자연스럽다.
    
- 문자열 문제에서 해시맵 카운팅을 사용할 수 있다.
    
- Map을 이용해 슬라이딩 윈도우 문제를 해결할 수 있다.
    

---

# 5) **HackerRank Easy 실전 문제 추천**

해시 기반 사고를 완전히 익히려면 아래 3개가 최적이다.

---

## ✔ 추천 문제 3개 (Hash 단원에 완벽히 맞는 Easy)

### **1) "Sparse Arrays"**

→ 문자열 빈도수 세기 (Map 기본기 100%)

### **2) "Sales by Match"**

→ 짝(pair) 세기 = Map 문제의 정석

### **3) "Migratory Birds"**

→ 가장 많이 등장한 숫자 찾기  
→ 빈도 카운팅 → 최대값 찾기 패턴 완전 정리됨