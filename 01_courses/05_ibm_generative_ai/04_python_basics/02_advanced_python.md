## 1. Object-Oriented Programming Core

### 1.1 클래스 기본 구조

-  **데이터(속성)** + **행동(메서드)** 을 하나로 묶는 구조
- `__init__()`의 역할은 “**객체의 초기 상태를 정의**”하는 것.
- `self`는 **객체 자신(instance itself)** 를 가리키는 참조 (`this` in Java)
```python
class Person:
	# 생성자 (Constructor)
    def __init__(self, name, age): 
        self.name = name
        self.age = age
	# 인스턴스 메서드
    def greet(self): 
        print(f"안녕하세요, 저는 {self.name}이고 {self.age}살입니다.")
```



---
### 1.2 인스턴스 변수와 클래스 변수

```python
class Circle(object): # Circle 이 object 의 자식 클래스. `(object)`는 생략가능
    def __init__(self, radius=3, color='blue'):
        self.radius = radius
        self.color = color

    def add_radius(self, r):
        self.radius = self.radius + r
        return self.radius

c1 = Circle(5, 'red') # `__init__()이 자동 호출돼서 `radius=5`, `color='red'`를 설정
c1.add_radius(3)     # 반지름이 5 → 8 로 변경

```

- 결과적으로 `c1` 객체 안에는 아래의 상태가 저장된다. :
```python
c1.radius == 5
c1.color == 'red'
```

| 구분      | 선언 위치         | 공유 여부    |
| ------- | ------------- | -------- |
| 인스턴스 변수 | `__init__` 내부 | 객체마다 독립  |
| 클래스 변수  | 클래스 블록 상단     | 모든 객체 공유 |
#### `self`
1. self의 본질: “객체 자신을 가리키는 첫 번째 인자”
	- `__init__()`는 **클래스의 인스턴스(객체)가 만들어질 때 자동으로 호출되는 생성자**이다. `self.`는 “이 변수는 **객체 속성(instance variable)** 이다” 라는 걸 명확히 구분해줌
```python
def __init__(self, ...)
# 이 구조는 “객체 자신을 받을 준비가 되어있다”는 뜻이다. 이 덕분에 그 객체에 `self.radius`, `self.color`처럼 속성을 붙일 수 있는 것이다.
```
2. `self.` 를 꼭 써야 하는 이유
- `radius = 3` (self 없이)  
    → 그냥 함수 안의 **지역 변수(local variable)** 로 끝남.  
    객체에 저장되지 않음.
- `self.radius = 3`  
    → **객체(c1)** 내부에 저장됨 → 나중에도 접근 가능
- `self`는 “이 메서드를 호출한 객체 자신”(여기선 `Circle`)을 가리킨다. 그래서 `self.radius`는 “그 객체 안에 있는 radius 값”을 의미해.

#### `__main__` — 프로그램의 시작점(Main Entry Point)
- 자바의 `public static void main(String[] args)`  에 해당하는 부분이 파이썬에서는 다음처럼 됩니다 👇
```python
def main():     
	print("프로그램 시작")  
	
if __name__ == "__main__":      
	main()
```

- 의미: “이 파일이 다른 파일에 import된 게 아니라, 지금 직접 실행되고 있을 때만 `main()` 함수를 실행해라.”

- 동작 원리
	- 파이썬에서 모든 `.py` 파일은 실행될 때,  **특별한 전역 변수 `__name__`** 을 자동으로 갖게 된다.
	- 이 파일이 **직접 실행될 때** (`python myfile.py`):  
	    → `__name__` 의 값은 `"__main__"`
	- 이 파일이 **다른 파일에서 import될 때** (`import myfile`):  
	    → `__name__` 의 값은 `"myfile"` (즉, 파일 이름)
---
### 1.3 메서드 종류

|종류|선언|설명|
|---|---|---|
|인스턴스 메서드|`def method(self):`|객체별 동작|
|클래스 메서드|`@classmethod`|클래스 전체에 적용|
|정적 메서드|`@staticmethod`|self/cls 없이 독립 동작|

```python
class MathUtil:
    PI = 3.14
    @classmethod
    def circle_area(cls, r): return cls.PI * r**2
    @staticmethod
    def add(a, b): return a + b
```

---
### 1.4 상속 (Inheritance)

```python
class Animal:
    def speak(self):
        print("소리를 냅니다.")

class Dog(Animal):          # Dog 가 Animal 의 자식클래스
    def speak(self):
        print("멍멍!")
        super().speak()     # 부모의 메서드 호출
```

부모 메서드 호출: `super().`

---
### 1.5 다형성 (Polymorphism)

- 자바의 “한 인터페이스, 여러 구현체” 개념을 파이썬에서도 동일하게 표현할 수 있습니다.
- 객체 타입이 다르더라도 ==**같은 메서드명(speak)**== 으로 호출 가능  → 이것이 바로 다형성(polymorphism)

```python
class Animal:
    def speak(self):
        pass

class Dog(Animal):
    def speak(self):
        return "멍멍"

class Cat(Animal):
    def speak(self):
        return "야옹"

animals = [Dog(), Cat()]
for a in animals:
    print(a.speak())

```

---
### 1.6 추상화 (Abstraction)

- 추상 클래스는 기본적으로 하위 클래스들이 상속받아 사용할 공통의 뼈대나 템플릿 역할을 하도록 설계되어있다.

```python
from abc import ABC, abstractmethod

class Shape(ABC):
    @abstractmethod
    def area(self):
        pass

# 상속을 통해 오버라이딩(구현) 해야한다.
class Rectangle(Shape): 
    def __init__(self, w, h):
        self.w = w
        self.h = h

    def area(self):
        return self.w * self.h

# shape = Shape() ❌ (인스턴스화 불가) --> TypeError
rect = Rectangle(3, 4)
print(rect.area())  # 12

```

---
### 1.7 캡슐화 (Encapsulation)

- 파이썬은 접근 제한자가 없지만,  관례적으로 `_protected`, `__private`를 사용한다.
```python
class BankAccount:
    def __init__(self, owner, balance):
        self.owner = owner
        self.__balance = balance   # private 변수

    def deposit(self, amount):
        self.__balance += amount

    def get_balance(self):
        return self.__balance

acc = BankAccount("Injun", 1000)
acc.deposit(500)
print(acc.get_balance())  # 1500
print(acc.__balance)      # ❌ AttributeError
```

---
### 1.8 조합 (Composition)

- “has-a” 관계를 표현하는 자바식 구조도 파이썬에서 가능합니다.

```python
class Engine:
    def start(self):
        print("엔진 시동 켜짐")

class Car:
    def __init__(self):
        self.engine = Engine()   # Car has an Engine

    def drive(self):
        self.engine.start()
        print("자동차 주행 중")

car = Car()
car.drive()
```

---
## 2. Type Hints, Modularity, Exception Hierarchy, and Testing

### 2.1 타입힌트 (Type Hint)

- 파이썬에서도 **자바식 강타입 사고**를 표현할 수 있습니다.

```python
def add(a: int, b: int) -> int:
    return a + b

from typing import List, Dict, Optional
def get_user() -> Dict[str, str]: ...
def process_scores(scores: List[int]) -> float: ...
def find_value(d: Dict[str, int], k: str) -> Optional[int]: ...
```

- 코드 문서화, IDE 자동 완성, 정적 분석(`mypy`) 가능
	-  `mypy`나 IDE의 타입 체커가 코드 안정성을 분석할 수 있음
```python
from abc import ABC, abstractmethod

class Payment(ABC):
    @abstractmethod
    def pay(self, amount: float) -> None:
        pass

class CreditCard(Payment):
    def pay(self, amount: float) -> None:
        print(f"💳 카드로 {amount}원 결제 완료")

class PayPal(Payment):
    def pay(self, amount: float) -> None:
        print(f"💻 PayPal로 {amount}원 결제 완료")

payments = [CreditCard(), PayPal()]
for method in payments:
    method.pay(10000)

```

---
### 2.2 모듈 및 패키지 구조

- 자바의 `package`, `import`, `public class` 개념이 파이썬에서는 “모듈(module)”과 “패키지(package)”로 대응됩니다.

| 목적      | 설명                |
| ------- | ----------------- |
| 유지보수성   | 파일별 책임 분리         |
| 재사용성    | 모듈 단위로 가져와 사용     |
| 확장성     | 기능 추가 시 구조 변경 최소화 |
| 테스트 용이성 | 독립적인 유닛 테스트 가능    |

```
project/
│── main.py
│── models/
│     ├── __init__.py
│     ├── user.py
│     └── product.py
│── utils/
      ├── __init__.py
      ├── file_io.py
      └── validator.py
```

`__init__.py`는 폴더를 패키지로 인식시킨다.

```python
from models.user import User
from utils.validator import validate_email
```
#### 사용 예시

📄 models/user.py
```python
class User:
    def __init__(self, name: str, email: str):
        self.name = name
        self.email = email
```

📄 utils/validator.py
```python
def validate_email(email: str) -> bool:
    return "@" in email and "." in email
```

📄 main.py
```python
from models.user import User
from utils.validator import validate_email

user = User("Injun", "injun@example.com")
if validate_email(user.email):
    print(f"{user.name}의 이메일이 유효합니다.")
```
##### `__init__.py`의 역할

- 해당 폴더를 “패키지”로 인식하게 함.   
- 내부 import 정리 시 사용.    

📄 models/**init**.py
```python
from .user import User
from .product import Product
```
→ 이제 `from models import User` 만으로도 사용 가능.
### 2.3 예외 계층 구조

```python
class AppError(Exception): pass
class ValidationError(AppError): pass
class DatabaseError(AppError): pass

try:
    raise ValidationError("입력 오류")
except ValidationError as e:
    print(e)
```

- 의미별 예외를 분리해 유지보수성을 높인다.
    

---
### 2.4 단위 테스트 (Unit Testing)

- 자바의 JUnit 과 동일 개념. 파이썬에서는 `unittest` 또는 `pytest` 로 작성합니다.

| 요소     | 설명               |
| ------ | ---------------- |
| 독립성    | 각 테스트는 독립적으로 수행  |
| 명확성    | 입력 → 처리 → 기대값 명시 |
| 반복 가능성 | 환경에 의존하지 않아야 함   |
| 자동화    | CI/CD와 연동 가능     |

##### 기본 예시 (unittest)

📄 math_utils.py
```python
def add(a: int, b: int) -> int:
    return a + b
```

📄 test_math_utils.py
```python
import unittest
from math_utils import add

class TestMathUtils(unittest.TestCase):
    def test_add(self):
        self.assertEqual(add(2, 3), 5)
        self.assertEqual(add(-1, 1), 0)

if __name__ == "__main__":
    unittest.main()
```

**출력**
```
..
----------------------------------------------------------------------
Ran 2 tests in 0.001s

OK
```
##### pytest 버전 (간결형)

```python
def add(a, b):
    return a + b

def test_add():
    assert add(2, 3) == 5
    assert add(-1, 1) == 0
```

➡ `pytest` 명령으로 테스트 자동 실행.
