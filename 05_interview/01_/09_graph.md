# 1) **핵심 개념을 가장 빠르게 이해하기**

Graph는 Tree보다 훨씬 일반화된 자료구조다.  
가장 중요한 차이점은 **사이클(cycle)** 이 존재할 수 있다는 것.

Graph 문제를 풀려면 아래 4개 개념만 잡아도 충분하다.

---

## **① Graph = Node + Edges**

두 가지 표현 방식이 핵심이다:

### **1) 인접 리스트 (Adjacency List)**

TS 기준 가장 많이 쓰는 방식.

```ts
const graph: number[][] = [
  [1, 2],   // 0의 이웃
  [3],      // 1의 이웃
  [3],      // 2의 이웃
  []        // 3의 이웃
];
```

### **2) 인접 행렬 (Adjacency Matrix)**

0/1로 나타내지만 메모리 비효율적 → 코테에서는 거의 안 씀.

---

## **② 방문 체크(visited)가 가장 중요**

Tree는 cycle이 없어서 visited 불필요하지만,  
Graph는 cycle이 있어 무한루프에 빠질 수 있다.

기본 구조:

```ts
const visited = new Set<number>();
visited.add(start);
```

---

## **③ DFS(깊이 우선 탐색)** = Stack or 재귀

재귀 기반 템플릿:

```ts
function dfs(node: number) {
  visited.add(node);

  for (const next of graph[node]) {
    if (!visited.has(next)) {
      dfs(next);
    }
  }
}
```

대표 문제:

- 경로 존재 여부
    
- 컴포넌트 수 세기
    
- 사이클 감지
    
- 섬의 개수(2D grid → graph로 변환)
    

---

## **④ BFS(너비 우선 탐색)** = Queue

Queue 기반 템플릿:

```ts
function bfs(start: number) {
  const queue = [start];
  visited.add(start);

  while (queue.length > 0) {
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

대표 문제:

- 최단 거리 (무가중치 그래프)
    
- 레벨 탐색
    
- 연결 여부 판별
    

---

## **⑤ Graph 문제는 결국 “3가지를 빠르게 선택하는 문제”**

1. DFS인가 BFS인가
    
2. 방문 체크는 어떻게 하는가
    
3. 그래프 표현을 adjacency list로 만들 수 있는가
    

이 세 가지가 자동화되면 Graph는 더 이상 어렵지 않다.

---

# 2) **Typescript 실전 템플릿**

---

## **① 인접 리스트 생성 (가장 중요한 기본기)**

```ts
function buildGraph(edges: number[][], n: number): number[][] {
  const graph = Array.from({ length: n }, () => [] as number[]);
  for (const [a, b] of edges) {
    graph[a].push(b);
    graph[b].push(a); // undirected 기준
  }
  return graph;
}
```

---

## **② DFS**

```ts
function dfs(node: number, graph: number[][], visited: Set<number>) {
  visited.add(node);

  for (const next of graph[node]) {
    if (!visited.has(next)) {
      dfs(next, graph, visited);
    }
  }
}
```

---

## **③ BFS (최단 거리 탐색)**

```ts
function shortestPath(start: number, graph: number[][]): number[] {
  const dist = Array(graph.length).fill(-1);
  const queue: number[] = [];

  queue.push(start);
  dist[start] = 0;

  while (queue.length > 0) {
    const node = queue.shift()!;

    for (const next of graph[node]) {
      if (dist[next] === -1) {
        dist[next] = dist[node] + 1;
        queue.push(next);
      }
    }
  }

  return dist;
}
```

---

## **④ 사이클 탐지(DFS)**

```ts
function hasCycle(node: number, parent: number, graph: number[][], visited: Set<number>): boolean {
  visited.add(node);

  for (const next of graph[node]) {
    if (!visited.has(next)) {
      if (hasCycle(next, node, graph, visited)) return true;
    } else if (next !== parent) {
      return true; // cycle
    }
  }
  return false;
}
```

---

# 3) **간단 연습문제 2개**

---

## **연습문제 1 — 두 노드가 연결되어 있는가?**

입력:

```
edges = [[0,1],[1,2],[3,4]]
n = 5
start = 0, target = 2
```

출력:  
`true`

힌트:  
graph 만들기 → DFS 또는 BFS로 탐색 → visited 확인

---

## **연습문제 2 — 그래프의 connected components 수 구하기**

입력:

```
edges = [[0,1],[1,2],[3,4]]
n = 5
```

출력:  
`2`

힌트:  
방문 안 된 노드를 DFS 시작 포인트로 잡는다.

---

# 4) **Graph 체크리스트**

아래 12개 중 8개 이상 YES면 충분하다.

### ✔ Graph 구조

- 인접 리스트를 직접 만들 수 있다.
    
- 그래프에서 방문 배열이 필요한 이유를 설명할 수 있다.
    

### ✔ DFS

- DFS 템플릿을 암기했다.
    
- 경로 탐색(resursive) 구현이 가능하다.
    
- cycle detection 로직을 이해한다.
    

### ✔ BFS

- BFS는 queue 기반임을 정확히 이해했다.
    
- BFS로 최단 거리 탐색 구현 가능하다.
    
- level-order 개념이 있다.
    

### ✔ 응용

- connected components 문제 해결 가능
    
- undirected vs directed 그래프 차이를 설명할 수 있다.
    
- 2D grid(섬 문제)를 그래프로 변환하는 사고가 가능하다.
    

### ✔ 사고 흐름

- “DFS/BFS로 이 문제를 풀면 되는지” 판단이 가능하다.
    
- 그래프 문제를 보면 adjacency list부터 떠오른다.
    

---

# 5) **HackerRank Easy 실전 문제 추천**

Graph 단원에서 기본기를 다지는 Easy 문제들:

---

## ✔ 추천 문제 3개

### **1) "Breadth First Search: Shortest Reach"**

→ BFS 최단거리 기본

### **2) "Connected Cells in a Grid"**

→ DFS 기반 그래프 탐색(2D grid → graph 사고)

### **3) "Roads and Libraries"**

→ 컴포넌트 계산 + 그래프 조립 감각