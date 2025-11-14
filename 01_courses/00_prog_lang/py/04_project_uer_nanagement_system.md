파이썬으로 자바식 엔지니어링 사고(모듈, 계층, 책임 분리, 테스트)를 완벽히 연습할 수 있게 설계했습니다.
## 🎯 목표

1. **OOP 기반 구조 설계**
    
2. **Type Hint + 예외 계층 적용**
    
3. **모듈 구조 설계 (models, services, utils)**
    
4. **단위 테스트 작성**
    
5. **`__main__` 기반 실행 엔트리 구성**
    

---

## 📁 프로젝트 구조

```
user_system/
│── main.py
│── models/
│     ├── __init__.py
│     └── user.py
│── services/
│     ├── __init__.py
│     └── user_service.py
│── utils/
│     ├── __init__.py
│     └── validators.py
│── exceptions/
│     ├── __init__.py
│     └── custom_exceptions.py
│── tests/
      └── test_user_service.py
```

---

## 🧱 1️⃣ models/user.py — 사용자 클래스 (OOP 기본)

```python
class User:
    def __init__(self, name: str, email: str):
        self.name = name
        self.email = email

    def __repr__(self):
        return f"User(name='{self.name}', email='{self.email}')"
```

➡ 역할: 엔티티 (Entity) — 데이터 구조 자체를 정의

---

## ⚙️ 2️⃣ utils/validators.py — 입력 검증 로직

```python
def validate_name(name: str) -> bool:
    return len(name.strip()) > 0

def validate_email(email: str) -> bool:
    return "@" in email and "." in email
```

➡ 역할: 재사용 가능한 유틸리티 — “검증(validation)” 책임 분리

---

## ⚠️ 3️⃣ exceptions/custom_exceptions.py — 예외 계층 설계

```python
class AppError(Exception):
    """전체 앱 예외의 상위 클래스"""
    pass

class ValidationError(AppError):
    """입력값 검증 오류"""
    pass

class DuplicateUserError(AppError):
    """중복 사용자 오류"""
    pass
```

➡ 역할: 문제 상황을 의미별로 구분 → 유지보수 쉬움

---

## 💼 4️⃣ services/user_service.py — 비즈니스 로직 계층

```python
from models.user import User
from utils.validators import validate_name, validate_email
from exceptions.custom_exceptions import ValidationError, DuplicateUserError
from typing import List

class UserService:
    def __init__(self):
        self.users: List[User] = []

    def add_user(self, name: str, email: str) -> User:
        if not validate_name(name):
            raise ValidationError("이름이 비어 있습니다.")
        if not validate_email(email):
            raise ValidationError("잘못된 이메일 형식입니다.")
        if any(u.email == email for u in self.users):
            raise DuplicateUserError(f"이미 존재하는 이메일: {email}")

        user = User(name, email)
        self.users.append(user)
        return user

    def list_users(self) -> List[User]:
        return self.users
```

➡ 역할: **Service Layer** (자바의 Service 클래스 역할)  
→ 로직 + 예외처리 + 데이터 관리 담당

---

## 🖥 5️⃣ main.py — 프로그램의 시작점 (`__main__`)

```python
from services.user_service import UserService
from exceptions.custom_exceptions import AppError

def main():
    service = UserService()

    try:
        service.add_user("Injun", "injun@example.com")
        service.add_user("Alex", "alex@example.com")
        # service.add_user("", "abc@")  # ValidationError 예시
        print("등록된 사용자 목록:")
        for user in service.list_users():
            print(user)

    except AppError as e:
        print("❌ 오류 발생:", e)

if __name__ == "__main__":
    main()
```

**출력 예시:**

```
등록된 사용자 목록:
User(name='Injun', email='injun@example.com')
User(name='Alex', email='alex@example.com')
```

---

## 🧪 6️⃣ tests/test_user_service.py — 단위 테스트

```python
import unittest
from services.user_service import UserService
from exceptions.custom_exceptions import ValidationError, DuplicateUserError

class TestUserService(unittest.TestCase):
    def setUp(self):
        self.service = UserService()

    def test_add_user_success(self):
        user = self.service.add_user("Injun", "injun@example.com")
        self.assertEqual(user.name, "Injun")

    def test_add_user_invalid_name(self):
        with self.assertRaises(ValidationError):
            self.service.add_user("", "test@example.com")

    def test_add_user_duplicate(self):
        self.service.add_user("A", "a@example.com")
        with self.assertRaises(DuplicateUserError):
            self.service.add_user("B", "a@example.com")

if __name__ == "__main__":
    unittest.main()
```

**출력**

```
...
----------------------------------------------------------------------
Ran 3 tests in 0.002s

OK
```

---

## ✅ 전체 설계 요약

|계층|역할|자바식 대응|
|---|---|---|
|models|데이터 클래스|Entity|
|utils|검증, 변환 로직|Helper / Utility|
|services|핵심 로직|Service Layer|
|exceptions|예외 관리|Exception Hierarchy|
|tests|단위 테스트|JUnit Test|
|main|프로그램 진입점|Main Class|

---

## 💬 이 구조에서 배울 수 있는 핵심

|개념|의미|파이썬 구현|
|---|---|---|
|OOP|데이터 + 행위 결합|클래스 설계|
|Type Hint|정적 안정성|함수 및 속성 타입 명시|
|Exception Hierarchy|문제별 예외 구분|AppError 상속 구조|
|Modularization|계층별 책임 분리|models / utils / services|
|Unit Test|품질 보증|unittest / pytest|
|Entry Point|실행 제어|`if __name__ == "__main__"`|

---

## 🧠 결론 — Advanced Python 통합 마무리

이제 당신은

> “파이썬으로 자바 수준의 구조적 사고를 구현하는 개발자”

즉,

- **코드테스트용 단순 로직 구현 능력 (Python Basics)**
    
- **객체지향 설계 및 타입 안정성 (Advanced Python 1)**
    
- **모듈·예외·테스트 기반의 구조적 사고 (Advanced Python 2~3)**
    

모두 완성한 상태입니다.

---

다음 단계로는 두 가지 선택이 있습니다 👇  
1️⃣ **“실전 코드테스트 문제 세트 (주니어~실무형)”** 로 이어가서 문제풀이 중심으로 전환  
2️⃣ **“Enterprise Python: Framework & Architecture (Django/FastAPI 기반 설계)”** 로 확장

어떤 방향으로 진행할까요?