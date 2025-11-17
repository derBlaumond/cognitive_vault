- (코딩테스트 DFS/BFS의 핵심 단원)
	이 단원은 이후의 **Graphs(그래프)** 단원과 **DFS/BFS 심화**로 자연스럽게 이어지는 매우 중요한 챕터다.
# 1) **핵심 개념을 가장 빠르게 이해하기**

Trees는 Linked List보다 한 단계 확장된 자료구조다.  
가장 중요한 특징은:

- **계층 구조(부모 → 자식)**
    
- **순환(cycle)이 없다**
    
- **루트(root)에서 시작된다**
    
- **배열 대신 노드 기반**
    

Typescript에서 TreeNode는 이렇게 정의한다:

```ts
interface TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
}
```

---

## **① DFS(깊이 우선 탐색)**

트리를 탐색할 때 가장 많이 쓰는 방식. 재귀 기반이 기본이다.

세 가지 순회 방식:

### **1) Preorder (전위순회)**

root → left → right  
대표적 활용:

- Tree 구조를 문자열로 직렬화할 때
    
- DFS 기반 문제 대부분
    

### **2) Inorder (중위순회)**

left → root → right  
→ **BST에서는 정렬된 순서로 값이 나온다!**

### **3) Postorder (후위순회)**

left → right → root  
→ 서브트리 계산 후 부모로 결과 올릴 때 유용  
(트리 높이 계산 등)

DFS 기본 패턴:

```ts
function dfs(node: TreeNode | null) {
  if (!node) return;
  dfs(node.left);
  dfs(node.right);
}
```

---

## **② BFS(너비 우선 탐색 = Queue 기반)**

Queue를 사용한다.

→ Tree Level-Order Traversal

```ts
function bfs(root: TreeNode | null) {
  if (!root) return;
  const queue: TreeNode[] = [root];

  while (queue.length > 0) {
    const node = queue.shift()!;
    if (node.left) queue.push(node.left);
    if (node.right) queue.push(node.right);
  }
}
```

BFS는 “층별”로 문제를 해결할 때 매우 강력하다.

---

## **③ Binary Search Tree(BST)**

BST의 핵심 규칙:

- left subtree < root
    
- right subtree > root
    

이 규칙 하나로 단번에 문제 난이도가 떨어진다.

BST에서 자주 쓰는 패턴:

### **탐색**

```ts
while (root !== null) {
  if (target < root.val) root = root.left;
  else if (target > root.val) root = root.right;
  else return true;
}
return false;
```

### **최소값**

BST의 가장 왼쪽 노드가 최소값.

---

# 2) **Typescript 실전 템플릿**

---

## **① DFS — Inorder Traversal**

```ts
function inorder(node: TreeNode | null, result: number[]) {
  if (!node) return;
  inorder(node.left, result);
  result.push(node.val);
  inorder(node.right, result);
}
```

---

## **② BFS — Level Order Traversal**

```ts
function levelOrder(root: TreeNode | null): number[][] {
  if (!root) return [];
  const result: number[][] = [];
  const queue: TreeNode[] = [root];

  while (queue.length > 0) {
    const size = queue.length;
    const level: number[] = [];

    for (let i = 0; i < size; i++) {
      const node = queue.shift()!;
      level.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    result.push(level);
  }

  return result;
}
```

---

## **③ BST search**

```ts
function searchBST(root: TreeNode | null, target: number): boolean {
  while (root) {
    if (target < root.val) root = root.left;
    else if (target > root.val) root = root.right;
    else return true;
  }
  return false;
}
```

---

## **④ 트리 높이(height, depth) 계산**

```ts
function maxDepth(node: TreeNode | null): number {
  if (!node) return 0;
  return 1 + Math.max(maxDepth(node.left), maxDepth(node.right));
}
```

이 문제는 실전에서 매우 많이 등장한다.

---

# 3) **간단 연습문제 2개**

---

## **연습문제 1 — 트리 높이 계산**

입력:

```
    1
   / \
  2   3
```

출력: `2`

---

## **연습문제 2 — BST에서 값 찾기**

입력:  
BST:

```
   5
  / \
 3   7
```

target = 7  
출력: true

---

# 4) **Trees & BST 체크리스트**

아래 12개 중 8개 이상 “YES”면 충분하다.

### ✔ 구조 이해

- TreeNode 구조를 설명할 수 있다.
    
- left/right 포인터를 이용해 트리를 순회할 수 있다.
    

### ✔ DFS

- preorder/inorder/postorder 차이를 알고 있다.
    
- DFS를 재귀로 구현할 수 있다.
    
- inorder가 BST에서 정렬된 결과라는 것을 알고 있다.
    

### ✔ BFS

- BFS는 Queue 기반이라는 감각이 있다.
    
- level-order traversal 구현 가능하다.
    

### ✔ BST

- BST의 규칙(left < root < right)을 설명할 수 있다.
    
- BST search를 직접 구현할 수 있다.
    
- BST 최소값/최대값을 빠르게 찾는 법을 안다.
    

### ✔ 공통

- 트리의 높이 계산이 가능하다.
    
- DFS/BFS 둘의 차이를 설명할 수 있다.
    

---

# 5) **HackerRank Easy 실전 문제 추천**

Tree 단원에서 Easy 난이도로 감각을 잡기 좋은 문제들:

---

## ✔ 추천 문제 3개

### **1) "Tree: Preorder Traversal"**

→ DFS 기본기 점검

### **2) "Tree: Level Order Traversal"**

→ BFS Queue 사고 완성

### **3) "Binary Search Tree: Insertion"**

→ BST 규칙 기반 구현 능력 확보

---

# 6) 다음 과목

Tree 단원 다음에 가장 자연스럽게 이어지는 과목은:

➡ **9단원: Graphs (그래프)**

이유:

- Tree는 graph의 특수 형태
    
- DFS/BFS 패턴을 graph로 확장하는 순서가 가장 자연스러움
    
- 방문 배열, 인접 리스트, 사이클 탐지 등 심화 내용으로 연결
    

---

원하면 지금 바로 **9단원: Graphs** 진행할게.