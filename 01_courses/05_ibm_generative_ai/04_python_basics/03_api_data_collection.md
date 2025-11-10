### Application Programming Interfaces
- API는 소프트웨어 구성 요소가 상호 작용하는 방식을 정의하고 직접적인 구현 없이 다양한 제품 및 서비스 간의 통신을 지원합니다.

- API는 모든 엔지니어에게 필수적입니다. 다른 시스템의 데이터와 기능에 접근할 수 있는 방법을 제공하여 시간과 리소스를 절약할 수 있기 때문입니다. 
	- 예를 들어, API를 사용하여 애플리케이션을 기존 서버 또는 애플리케이션 아키텍처에 통합할 수 있으며, 개발자는 직접적인 구현 없이 다양한 제품 및 서비스 간에 통신할 수 있습니다.
	- 소셜 미디어 플랫폼: Facebook, Twitter, Instagram과 같은 소셜 미디어 플랫폼은 API를 사용하여 개발자가 데이터와 기능에 접근할 수 있도록 합니다. 이를 통해 개발자는 이러한 플랫폼과 상호 작용하고 사용자에게 추가 기능을 제공하는 애플리케이션을 만들 수 있습니다.


# Web Scraping과 HTML 기본 노트 (Python + BeautifulSoup + Pandas)

---

## 1. 목표

이 노트의 목표는 다음과 같다:

- HTML 문서 구조와 태그 구성 이해
    
- HTML Document Tree 개념 학습
    
- HTML 테이블 구조 익히기
    
- BeautifulSoup를 이용한 웹 스크래핑 기본 이해
    
- Pandas를 이용한 HTML 테이블 데이터 수집
    

---

## 2. 웹 스크래핑(Web Scraping) 개요

**웹 스크래핑(Web Scraping)** 또는 **웹 하베스팅(Web Harvesting)** 은  
웹사이트나 웹페이지로부터 데이터를 자동으로 수집하는 과정이다.  
데이터 분석, 가격 비교, 뉴스 수집, 콘텐츠 통합 등에 널리 사용된다.

---

## 3. 웹 스크래핑의 동작 과정

### 3.1 HTTP 요청 (HTTP Request)

- 스크래퍼는 URL에 대해 **HTTP GET 요청**을 보낸다.
- 웹 브라우저가 페이지를 여는 것과 동일한 방식이다.    

### 3.2 웹 페이지 수신 (Web Page Retrieval)

- 웹 서버는 요청을 받아 HTML 페이지를 반환한다.
    
- 이 HTML에는 텍스트, 이미지, 링크, 구조 정보 등이 포함된다.
    

### 3.3 HTML 파싱 (HTML Parsing)

- 수신된 HTML은 BeautifulSoup 같은 도구로 **파싱(parsing)** 된다.
    
- 파싱은 HTML 태그, 속성, 텍스트를 구조화된 객체 트리로 변환하는 과정이다.
    

### 3.4 데이터 추출 (Data Extraction)

- 스크래퍼는 특정 태그나 속성, 패턴을 찾아 원하는 데이터를 추출한다.
    
- 예: 뉴스 제목, 제품 가격, 이미지 링크 등.
    

### 3.5 데이터 변환 (Data Transformation)

- 추출된 데이터는 정제(cleaning) 또는 형식 변환을 거칠 수 있다.
    
- 예: 태그 제거, 숫자 변환, 포맷 통일 등.
    

### 3.6 저장 (Storage)

- 변환된 데이터는 **CSV, JSON, 데이터베이스** 등에 저장된다.
    

### 3.7 자동화 (Automation)

- Python 스크립트를 자동 실행해 여러 페이지의 데이터를 주기적으로 수집할 수 있다.
    

---

## 4. HTML 구조 이해

### 4.1 HTML 기본 구조

|요소|설명|
|---|---|
|`<html>`|HTML 문서의 루트 요소|
|`<head>`|문서의 메타데이터 포함|
|`<body>`|실제 웹페이지의 콘텐츠 부분|
|`<h3>`|제목 헤딩 (굵고 큰 텍스트)|
|`<p>`|문단(paragraph) 표시|

---

### 4.2 HTML 태그 구성

- HTML 태그는 **시작 태그**와 **종료 태그**로 구성된다.
    
- 태그에는 **속성(attribute)** 이 포함될 수 있다.
    

예시:

```html
<a href="https://example.com">링크</a>
```

- `<a>` : 태그 이름 (anchor)
    
- `href="..."` : 속성명과 값
    
- `"링크"` : 태그 내용
    

---

### 4.3 HTML Document Tree (문서 트리)

HTML 문서는 트리 구조로 표현된다.

- **부모(Parent)** : 상위 태그
    
- **자식(Child)** : 내부에 포함된 태그
    
- **형제(Sibling)** : 같은 부모를 공유하는 태그들
    

예시:

```html
<html>
  <head></head>
  <body></body>
</html>
```

- `<html>` 은 루트 요소이며
    
- `<head>` 와 `<body>` 는 **형제**이자 `<html>`의 **자식**이다.
    

---

### 4.4 HTML Table 구조

HTML 테이블은 표 형식의 데이터를 표현할 때 사용한다.

|태그|역할|
|---|---|
|`<table>`|표 전체를 정의|
|`<tr>`|한 행(row) 정의|
|`<th>`|표의 헤더 셀 정의|
|`<td>`|일반 셀 정의|

예시:

```html
<table>
  <tr><th>이름</th><th>나이</th></tr>
  <tr><td>Injun</td><td>28</td></tr>
</table>
```

---

## 5. Python으로 웹 스크래핑하기

### 5.1 필수 모듈 설치

```bash
pip install requests beautifulsoup4
```

### 5.2 HTML 요청 및 파싱

```python
import requests
from bs4 import BeautifulSoup

url = 'https://en.wikipedia.org/wiki/IBM'
response = requests.get(url)
html_content = response.text

soup = BeautifulSoup(html_content, 'html.parser')
print(html_content[:500])
```

---

### 5.3 HTML 탐색 및 데이터 추출

```python
# 모든 <a> 태그 찾기
links = soup.find_all('a')

for link in links:
    print(link.text)
```

- `find()` : 첫 번째 매칭 요소 찾기
    
- `find_all()` : 모든 매칭 요소 리스트로 반환
    
- `select()` : CSS 선택자 기반 탐색
    

---

### 5.4 BeautifulSoup의 주요 기능

|메서드|설명|
|---|---|
|`find(tag, attrs)`|첫 번째 일치 태그 검색|
|`find_all(tag, attrs)`|모든 일치 태그 리스트 반환|
|`findChildren()`|하위 요소 반환|
|`find_next_sibling()`|다음 형제 요소 찾기|
|`parent`|부모 요소 접근|
|`select(selector)`|CSS 선택자 기반 탐색|
|`.text`|태그 내부 텍스트 반환|

---

## 6. Pandas로 웹 테이블 추출

### 6.1 `read_html()` 함수

Pandas의 `read_html()` 함수는 HTML 페이지의 **표 데이터**를 자동으로 추출해 DataFrame으로 변환한다.

```python
import pandas as pd

URL = 'https://en.wikipedia.org/wiki/List_of_largest_banks'
tables = pd.read_html(URL)
df = tables[0]  # 첫 번째 테이블 선택
print(df.head())
```

---

### 6.2 주의사항

- 모든 표가 실제 `<table>` 태그로 작성된 것은 아님.
    
- 이미지, 하이퍼링크가 포함된 경우 추가 정제가 필요하다.
    
- 일부 테이블에는 불필요한 링크 텍스트가 포함될 수 있음.
    

예시:

```python
URL = 'https://en.wikipedia.org/wiki/List_of_countries_by_GDP_(nominal)'
tables = pd.read_html(URL)
df = tables[2]
print(df)
```

출력 결과에 하이퍼링크 텍스트가 그대로 포함될 수 있다.

---

### 6.3 BeautifulSoup vs Pandas

|구분|BeautifulSoup|Pandas|
|---|---|---|
|용도|일반적인 HTML 구조 탐색|테이블 자동 추출|
|장점|세밀한 제어 가능|빠르고 간단한 데이터프레임 변환|
|한계|직접 태그 탐색 필요|표 데이터에만 적용 가능|

---

## 7. Python에서 사용하는 주요 Web Scraping 라이브러리

|라이브러리|설명|예시|
|---|---|---|
|**BeautifulSoup**|HTML/XML 파싱 및 탐색|`soup.find_all('a')`|
|**Scrapy**|대규모 크롤링 프레임워크|Spider 클래스 기반|
|**Selenium**|브라우저 자동화 도구 (동적 페이지 처리)|`webdriver.Firefox().get(url)`|

---

## 8. Web Scraping의 데이터 과학적 활용

- **데이터 수집(Data Collection):** 웹에서 데이터 수집
    
- **실시간 응용(Real-time):** 가격 비교, 날씨 정보
    
- **머신러닝(Machine Learning):** 학습용 데이터 수집
    
- **소셜 분석(Social Media Scraping):** 트렌드, 감성 분석 등
    

---

## 9. API & Data Collection Cheat Sheet

|기능|설명|코드 예시|
|---|---|---|
|**GET 요청**|데이터 조회|`response = requests.get(url)`|
|**POST 요청**|데이터 생성/업데이트|`requests.post(url, data={})`|
|**PUT 요청**|기존 데이터 수정|`requests.put(url, data={})`|
|**DELETE 요청**|데이터 삭제|`requests.delete(url)`|
|**Headers**|사용자 인증/형식 지정|`headers = {"Authorization": "Bearer TOKEN"}`|
|**Query Params**|URL 쿼리 파라미터 지정|`requests.get(url, params={"page":1})`|
|**JSON 처리**|API 응답을 Python 객체로 변환|`data = response.json()`|
|**Status Code**|응답 상태 코드 확인|`response.status_code`|
|**BeautifulSoup()**|HTML 파싱|`soup = BeautifulSoup(html, 'html.parser')`|
|**find / find_all**|특정 태그 탐색|`soup.find_all('a')`|
|**select()**|CSS 선택자 탐색|`soup.select('h1')`|
|**text 속성**|요소 텍스트 추출|`title = element.text`|

---

## 10. 결론

- 웹 스크래핑은 웹 데이터를 **구조화된 형태**로 변환하는 핵심 기술이다.
    
- **BeautifulSoup**은 HTML 파싱과 특정 요소 추출에 적합하고,
    
- **Pandas**의 `read_html()`은 표(table) 형태 데이터를 빠르게 분석용으로 변환한다.
    
- **Scrapy**, **Selenium** 등을 이용하면 대규모 또는 동적 웹사이트 데이터도 수집 가능하다.
    
- 항상 **robots.txt** 및 **웹사이트 이용 약관**을 준수하여 윤리적이고 합법적으로 데이터를 수집해야 한다.
    

---

원하면 이 내용을 `Web_Scraping_Basics.md` 파일로 생성해줄 수 있다.  
지금 바로 `.md` 파일로 만들어줄까?