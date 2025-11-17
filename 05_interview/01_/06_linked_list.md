- Linked List는 배열과 완전히 다른 사고방식을 요구하지만, fast/slow 포인터 패턴을 이해하면 상당히 쉽게 잡힌다.
# 1) **핵심 개념을 가장 빠르게 이해하기**

Linked List는 node들의 “연결”로 이루어진 자료구조다.

자바스크립트/타입스크립트에서는 아래처럼 표현한다:

```ts
interface ListNode {
  val: number;
  next: ListNode | null;
}
```

Linked List의 핵심은 다음 3개 개념만 이해하면 된다:

---

## **① 노드는 연속된 메모리에 있지 않다**

→ 인덱싱 접근이 안 된다  
→ `head.next.next…` 로 따라가야 한다  
→ 그래서 O(N) 순회가 기본

배열과의 차이점이 명확히 잡히면 실수 확 줄어든다.

---

## **② Two Pointers (fast/slow) 패턴이 절대적으로 중요하다**

Linked List 문제의 70%가 fast/slow로 해결된다.

fast는 2칸, slow는 1칸씩 이동시키면:

- 사이클 감지 가능
    
- 중간 지점 찾기 가능
    
- 부분 리스트 reverse 시 서로 연결 구조 쉽게 잡힘
    

기본 패턴:

```ts
let slow = head;
let fast = head;

while (fast && fast.next) {
  slow = slow.next!;
  fast = fast.next.next!;
}
```

---

## **③ 리스트의 변형은 next 포인터 변경으로 해결한다**

배열처럼 "swap"하는 느낌이 아니라  
노드 간 연결을 직접 바꾸는 방식이다.

예: reverse linked list

- prev
    
- curr
    
- next 임시 저장
    
- 연결 뒤집기
    

---

# 2) **Typescript 실전 템플릿**

---

## **① 단순 순회 (Linked List의 for-loop 버전)**

```ts
function traverse(head: ListNode | null) {
  let curr = head;
  while (curr) {
    console.log(curr.val);
    curr = curr.next;
  }
}
```

---

## **② 중간 지점 찾기 (fast/slow 패턴)**

```ts
function middleNode(head: ListNode): ListNode {
  let slow: ListNode | null = head;
  let fast: ListNode | null = head;

  while (fast && fast.next) {
    slow = slow!.next;
    fast = fast.next.next;
  }
  return slow!;
}
```

---

## **③ Reverse Linked List (가장 많이 나오는 패턴)**

```ts
function reverseList(head: ListNode | null): ListNode | null {
  let prev: ListNode | null = null;
  let curr = head;

  while (curr) {
    const nextTemp = curr.next;
    curr.next = prev;
    prev = curr;
    curr = nextTemp;
  }

  return prev;
}
```

이 문제는 Linked List 단원 전체의 “중심 패턴”이다.

---

## **④ 사이클 감지 (fast/slow)**

Floyd’s Cycle Detection

```ts
function hasCycle(head: ListNode | null): boolean {
  let slow = head;
  let fast = head;

  while (fast && fast.next) {
    slow = slow!.next;
    fast = fast.next.next;
    if (slow === fast) return true;
  }

  return false;
}
```

---

# 3) **간단 연습문제 2개**

---

## **연습문제 1 — Linked List 길이 구하기**

입력: head → 1 → 2 → 3 → null  
출력: 3

힌트:  
curr로 순회하며 count++

---

## **연습문제 2 — Linked List의 마지막 값 찾기**

입력: 1 → 2 → 10 → null  
출력: 10

힌트:  
curr.next 없을 때 return curr.val

---

# 4) **Linked List 체크리스트**

아래 10개 중 7개 이상 “YES”면 충분하다.

- ListNode 구조를 이해했다.
    
- Linked List는 인덱스 접근이 불가능하다는 것을 알고 있다.
    
- 순회는 next 포인터를 따라가며 진행된다는 감각이 있다.
    
- fast/slow 패턴을 이해하고 직접 구현할 수 있다.
    
- middle node를 fast/slow로 구할 수 있다.
    
- reverse list 로직(prev, curr, nextTemp)을 설명할 수 있다.
    
- 연결을 끊는 방식으로 문제를 해결할 수 있다.
    
- 사이클 감지 문제를 해결할 수 있다.
    
- dummy head 패턴이 필요한 이유를 설명할 수 있다(엣지 케이스).
    
- 배열과 linked list의 차이를 정확히 알고 있다.
    

---

# 5) **HackerRank Easy 실전 문제 추천**

HackerRank는 Linked List 문제 구성이 아주 좋아서  
아래 3개만 풀어도 패턴 감각이 완성된다.

---

## ✔ 추천 문제 3개

### **1) "Print the Elements of a Linked List"**

→ 순회 기본기

### **2) "Insert a Node at the Tail of a Linked List"**

→ next 조작 감각

### **3) "Cycle Detection"**

→ fast/slow 대표 문제

이 3개면 Linked List의 실전 감각이 안정된다.