## 1️⃣ 기본 자료형 (Data Types)

| 타입        | 설명   | 예시            |
| --------- | ---- | ------------- |
| **int**   | 정수형  | `x = 10`      |
| **float** | 실수형  | `y = 3.14`    |
| **bool**  | 참/거짓 | `a = True`    |
| **str**   | 문자열  | `s = "Hello"` |
### 주요 함수 및 메서드

```python
s = "Python"
len(s)          # 6
s.upper()       # 'PYTHON'
s.find("t")     # 2
s.replace("Py", "My")  # 'Mython'
```

---
## 2️⃣ 자료구조 (Collections)

### [ List ]
- **순서 있음 / 변경 가능**

```python
fruits = ["apple", "banana"]
fruits.append("cherry")
fruits[1] = "orange"
del fruits[0]
print(fruits)  # ['orange', 'cherry']
```

```python
numbers = [1, 2, 3, 4]
print(sum(numbers))          # 10
print(numbers[:2])           # [1, 2]
print(3 in numbers)          # True
```

### 주요 함수

```python
fruits = ["apple", "banana", "orange"]

fruits.append("apple") # ["apple", "banana", "orange", "apple"]
fruits_2 = fruits.copy()
fruits.count("apple") # 2
del fruits[3] # index 값에 맞는 엘리먼트 제거. output: ["apple", "banana", "orange"]

more_fruits = ["mango", "grape"]
fruits.extend(more_fruits) # add mutiple elements. output: ["apple", "banana", "orange", "mango", "grape"]

fruits.insert(1, "melon") # .insert(index, element). output: ["apple", "melon", "banana", "orange", "mango", "grape"]

removed_element = fruits.pop() # Removes and returns the last element. output: grape"

fruits.remove("melon") # output: ["apple", "banana", "orange", "mango"]

my_list.reverse()

print(my_list[1:3]) # ["banana", "orange"]

my_list = [5, 2, 8, 1, 9] 
my_list.sort() # Output: [1, 2, 5, 8, 9] 
my_list.sort(reverse=True) # Output: [9, 8, 5, 2, 1]
  ```
---
### ( Tuple )
- **순서 있음 / 변경 불가능**

```python
t = (10, 20, 30)
print(t[1])  # 20
# t[1] = 50 ❌ (오류) -> immutable
```

### 주요 함수
```python
fruits = ("apple", "banana", "apple", "orange")

fruits.count("apple") # 1
fruits.index("apple") # 1

numbers = (10, 20, 5, 30)
sum(numbers) # 65
min(numbers) # 5
max(numbers) # 30
len(numbers) # 4
```
---
### { Dictionary }
- **키-값 쌍 저장 구조**

```python
person = {"name": "Alice", "age": 30}
print(person["name"])     # Alice
person["city"] = "Berlin"
for key, value in person.items():
    print(key, value)
```
### 주요 함수
```python
person = { 
   "name": "John", 
   "age": 30, 
   "city": "New York"
}

name = person["name"]                   # name 에 "John" 할당

person["Country"] = "USA"               # add or modify 
del person["Country"].                  # delete

person.update({"Profession": "Doctor"}) # merge dict into existing dict
new_person = person.copy()              
person_keys = list(person.keys())       # 모든 키를 가져와 리스트로 변환. ['name', 'age', 'city']
person_values = list(person.values())   # 모든 밸류를 가져와 리스트로 변환. ['John', 30, 'New York']
info = list(person.items())             # 모든 키-값 쌍을 튜플 형태로 가져와서 튜플 목록으로 변환. [('name', 'John'), ('age', 30), ('city', 'New York')]

```

---
### { Set } 집합
- **중복 없음 / 순서 없음**

```python
a = {1, 2, 3}
b = {3, 4, 5}
print(a.union(b))         # {1,2,3,4,5}
print(a.intersection(b))  # {3}
```

#### 리스트 중복 제거 --> set 변환 후 되돌리기

```python
emails = ["a@x.com", "b@x.com", "a@x.com"]
unique = list(set(emails)) # list -> set 변환 + set -> list 변환 동시에
```

---

## 3️⃣ 제어문 (Control Flow)

### 조건문 (if / elif / else)

```python
age = 20
if age >= 18:
    print("성인")
elif age >= 13:
    print("청소년")
else:
    print("어린이")

is_do_not_disturb = True
if not is_do_not_disturb:
    send_notification("New message received")
    
friend1_likes_comedy = True
friend2_likes_action = False
friend3_likes_drama = False
if friend1_likes_comedy or friend2_likes_action or friend3_likes_drama:
    choose a movie()
```

---

### 반복문 (for / while)

```python
for i in range(5):
    print(i)  # 0~4

x = 0
while x < 3:
    print(x)
    x += 1
```

- 루프 제어

```python
for i in range(5): # range from 0 to 5
    if i == 2:
        continue
    if i == 4:
        break
    print(i)
```

- 중첩 루프 예시
```python
for i in range(1, 4): ## range from 1 to 4
    for j in range(1, 4):
        print(i, j)
```

---

## 4️⃣ 함수 (Functions)

### 기본 구조

```python
def add(a, b):
    return a + b
```
### 기본값 매개변수

```python
def greet(name="Guest"):
    print(f"Hello, {name}")
```
### 키워드 인자

```python
def show(name, age):
    print(f"{name} - {age}")
show(age=25, name="Alice")
```
### 가변 인자

- 함수로 전달되는 키워드 없는 인자들을 모두 모아서 **튜플(tuple)** 형태로 저장
```python
def add_all(*args):
    return sum(args)
print(add_all(1, 2, 3)) # func(1, 2, 3)
```
### 가변 키워드 인자

- `key=value` 형태로 전달되는 인자들을 모두 모아서 **딕셔너리(dictionary)** 형태로 저장
```python
def show_info(**kwargs):
    for key, val in kwargs.items():
        print(key, val)
show_info(name="Alice", age=25) # func(a=1, b=2)
```
### 스코프 (Scope)

```python
x = 10
def change():
    global x
    x = 20
change()
print(x)  # 20
```
#### 안전한 방식 (return 활용)

```python
def multiply(val):
    return val * 2
x = multiply(x)
```

---
## 5️⃣ 예외 처리 (Exception Handling)

### 기본 구조

```python
try:
    x = int("abc")
except ValueError:
    print("숫자만 입력하세요.")
```
### 여러 예외

```python
try:
    n = int(input())
    print(10 / n)
except ValueError:
    print("유효하지 않은 값")
except ZeroDivisionError:
    print("0으로 나눌 수 없습니다.")
```
### else / finally

```python
try:
    n = 5
except:
    print("예외 발생")
else:
    print("정상 실행")
finally:
    print("항상 실행됨")
```
### 사용자 정의 예외

```python
class NegativeError(Exception):
    pass

def sqrt(x):
    if x < 0:
        raise NegativeError("음수는 불가능합니다.")
    return x ** 0.5
```

---
## 6️⃣ 파일 입출력 (File I/O)

### 쓰기 / 읽기

```python
with open("data.txt", "w") as f: # 변수 할당이 아닌 with as 를 쓰면 자동으로 open -> close 가 된다.
    f.write("Hello\nPython")

with open("data.txt", "r") as f:
    print(f.read())
```
### 줄 단위 읽기

```python
with open("data.txt", "r") as f:
    for line in f:
        print(line.strip())
```

---
### 로그 파일 작성 예시

```python
from datetime import datetime

def log(msg):
    with open("app.log", "a") as f:
        f.write(f"[{datetime.now()}] {msg}\n")
```

---

## 🧩 7️⃣ HTTP 요청 (Requests)

```python
import requests

url = "https://jsonplaceholder.typicode.com/users"
res = requests.get(url)

if res.status_code == 200:
    data = res.json()
    for user in data:
        print(user["name"], user["email"])
else:
    print("요청 실패:", res.status_code)
```

### 📘 POST 요청

```python
payload = {"title": "test", "body": "hello", "userId": 1}
res = requests.post("https://jsonplaceholder.typicode.com/posts", json=payload)
print(res.json())
```

---

## 🧩 8️⃣ 웹스크래핑 (BeautifulSoup)

```python
from bs4 import BeautifulSoup
import requests

url = "https://example.com"
res = requests.get(url)
soup = BeautifulSoup(res.text, "html.parser")

print(soup.find("title").text)
```

### 📘 태그별 탐색

```python
for p in soup.find_all("p"):
    print(p.text)
```

---

## 🧠 핵심 문법 요약 테이블

|주제|핵심 함수 / 키워드|설명|
|---|---|---|
|문자열|`len`, `upper`, `find`, `replace`|기본 문자열 처리|
|리스트|`append`, `extend`, `del`, `sum`|변경 가능, 순서 유지|
|튜플|`()`|변경 불가|
|딕셔너리|`keys`, `values`, `items`|키-값 구조|
|셋|`union`, `intersection`|중복 제거, 집합 연산|
|제어문|`if`, `for`, `while`, `break`|흐름 제어|
|함수|`def`, `return`, `*args`, `**kwargs`|모듈화 구조|
|예외처리|`try`, `except`, `else`, `finally`, `raise`|오류 방지|
|파일 I/O|`open`, `read`, `write`, `with open`|데이터 저장/로드|
|HTTP|`requests.get/post`, `.json()`|API 통신|
|HTML 파싱|`BeautifulSoup`, `.find()`|웹 데이터 추출|

---

## 🚀 현재 수준 요약

✅ **문법 완성**  
변수, 자료형, 함수, 예외, 파일, 네트워크까지 완전 숙지

✅ **로직 구성 가능**  
조건문 + 반복문 조합으로 기본 알고리즘 구현 가능

✅ **입출력/데이터 처리**  
파일·API·텍스트 데이터 읽고 가공하는 능력 확보

✅ **실무 코드 감각**  
try/except, with open, requests, JSON 등 실전 도구 사용 가능

---

## 🎯 다음 단계: 코드테스트 실전 전환

|단계|목표|예시 문제|
|---|---|---|
|1️⃣|문자열 처리 로직 익히기|단어 세기, 회문, 중복 문자 제거|
|2️⃣|리스트/딕셔너리 조작|평균, 정렬, 필터링|
|3️⃣|함수형 사고|입력→처리→출력 구조 확립|
|4️⃣|예외 처리 포함 로직|안전한 계산기, 잘못된 입력 방지|
|5️⃣|파일 입출력 기반 문제|로그 분석, 파일 통계|

---

## 💬 마무리 요약 문장

> 이 단계에서의 파이썬 역량은 “문법 + 실전 감각”이 완전히 결합된 수준이다.  
> 즉, **주니어 개발자 코드테스트를 통과하기 위한 언어적 기반은 100% 완성**되었고,  
> 다음 단계는 “문제풀이 감각과 알고리즘 패턴 연습”으로 넘어가는 것뿐이다.

---

원하신다면 바로 이 다음으로  
📘 **“주니어 코드테스트 실전 문제 세트 (5문제 + 단계별 해설)”**  
로 이어서 훈련 시작할 수 있어요.  
진행해볼까요?