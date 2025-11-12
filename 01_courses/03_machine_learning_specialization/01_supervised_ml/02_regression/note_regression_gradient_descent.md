# 5.1 Multiple Linear Regression (다중 선형 회귀)

지금까지는 하나의 feature(x)만 사용한 단순 선형 회귀를 다뤘다.  
하지만 실제 문제는 여러 개의 feature들을 동시에 사용해야 정확한 예측이 가능하다.

예: 부동산 가격 예측

- x₁: 집 크기(제곱피트)
    
- x₂: 방 개수
    
- x₃: 층수
    
- x₄: 집의 연식
    

이제 **하나의 입력이 아니라 n개의 feature를 가진 X(벡터)** 를 사용한다.

---

## 5.1.1 새로운 표기법 정리

### 주요 기호

|기호|의미|
|---|---|
|n|feature 개수|
|xⱼ|j번째 feature|
|x⁽ⁱ⁾|i번째 training example의 feature 전체 벡터(list)|
|x⁽ⁱ⁾ⱼ|i번째 example의 j번째 feature|
|wⱼ|j번째 feature의 파라미터|
|w|모든 w를 하나로 묶은 vector|
|b|bias(편향)|

예시 데이터 (i=2일 때):

x⁽²⁾ = [1416, 3, 2, 40]  
→ 2번째 집의 모든 feature를 나타내는 벡터

x⁽²⁾₃ = 2  
→ 2번째 집의 3번 feature(층수)

※ Andrew Ng가 말했듯, 이 벡터를 시각적으로 구분하기 위해 화살표(→)를 그리기도 하지만 필수는 아니다.

---

## 5.1.2 Multiple Linear Regression 모델 정의

단일 feature일 때:

f(x) = wx + b

다중 feature일 때:

f(x) = w₁x₁ + w₂x₂ + ... + wₙxₙ + b

예:

f(x) = 0.1x₁ + 4x₂ + 10x₃ - 2x₄ + 80

해석:

- w₁ = 0.1 → 크기 1 sqft 증가 시 가격 0.1(= $100) 증가
    
- w₂ = 4 → 방이 하나 늘면 가격 $4,000 증가
    
- w₃ = 10 → 층수가 1 증가하면 가격 $10,000 증가
    
- w₄ = -2 → 연식 1년 증가하면 가격 $2,000 감소
    
- b = 80 → 기본 가격 $80,000
    

---

## 5.1.3 벡터화(vectorization)를 이용한 모델 표현

w = [w₁, w₂, ..., wₙ]  
x = [x₁, x₂, ..., xₙ]

dot product(내적)을 사용하면:

f(x) = w · x + b  
= Σ(wⱼ xⱼ)

→ 훨씬 깔끔하고, 이후 gradient descent 계산에도 필수적인 형태가 된다.

---

# 5.2 Vectorization (벡터화)

Andrew Ng가 매우 강조하는 핵심 주제이다.  
이 기법을 사용하면:

1. 코드가 짧아지고
    
2. **엄청나게 빠르게 실행**된다 (특히 numpy + GPU 환경에서는 극적으로 빨라짐)
    

---

## 5.2.1 Vectorization 없이 계산하는 방법 (비효율적)

### 1) 모든 항목을 다 더하는 하드코딩 방식

w[0] * x[0] + w[1] * x[1] + w[2] * x[2] …  
→ n이 커지면 절대 불가능

### 2) for loop 방식

Python 기준:

```python
f = 0
for j in range(n):
    f += w[j] * x[j]
f += b
```

가능은 하지만 여전히 느리다.

---

## 5.2.2 Vectorization을 사용한 단 한 줄의 코드

```python
f = np.dot(w, x) + b
```

이 한 줄로 모든 항목을 **병렬 처리**한다.

### 왜 더 빠른가?

numpy는 다음을 수행하기 때문:

1. CPU 또는 GPU의 벡터 연산 명령어(병렬 처리 기능) 사용
    
2. 모든 곱셈(wⱼ·xⱼ)을 한 번에 실행
    
3. 모든 합을 한 번에 실행 (SIMD 패턴)
    

→ for loop와는 비교도 안 되는 속도

### 실제로 속도 차이는 어떤가?

Andrew가 설명한 핵심:

- 벡터화 코드: 한 번에 16개를 모두 처리
    
- 비벡터화(for loop) 코드: 16번 반복해야 처리
    

→ feature 수가 수천~수만 개가 되면 차이는 수백~수천 배 이상

---

# 5.3 Vectorization을 사용한 Gradient Descent 업데이트

다중 선형 회귀에서 파라미터 w = [w₁…wₙ]이 많을 때,  
각 항목을 업데이트하는 것은 다음 두 방법으로 가능하다.

---

## 5.3.1 비벡터화 방식 (for loop)

```python
for j in range(n):
    w[j] = w[j] - alpha * d[j]
```

여기서 d[j] = ∂J/∂wⱼ

---

## 5.3.2 Vectorized 업데이트 (한 줄)

```python
w = w - alpha * d
```

d는 gradient 벡터

→ 실제 계산은 GPU/CPU가 병렬 처리하므로 훨씬 빠르다.

---

# 5.4 Gradient Descent for Multiple Linear Regression (수식 기반)

다중 특징에서도 cost function은 동일하다:

J(w,b) = (1/2m) Σ (f(x⁽ⁱ⁾) − y⁽ⁱ⁾)²

각 파라미터 wⱼ 업데이트:

wⱼ := wⱼ − α * (1/m) Σ (f(x⁽ⁱ⁾) − y⁽ⁱ⁾) x⁽ⁱ⁾ⱼ  
b := b − α * (1/m) Σ (f(x⁽ⁱ⁾) − y⁽ⁱ⁾)

### 전체 gradient descent:

반복 until convergence:  
 w := w − α * gradient_w  
 b := b − α * gradient_b

---

# 5.5 Normal Equation (정규방정식) — 선택적 방법

Andrew Ng가 언급한 ‘대안적 방법’.

### 특징

- 반복(gradient descent) 없이 **한 번에 w,b를 계산하는 공식**
    
- 하지만 **선형 회귀에만** 적용 가능
    
- feature 수가 많을 때(n이 매우 크면) **매우 느림**
    
- 로지스틱 회귀, 신경망 등 대부분 알고리즘에는 사용 불가
    

### 결론

실무에서는 거의 사용되지 않으며, scikit-learn 내부에서 자동 사용될 수도 있지만  
직접 구현하는 경우 gradient descent가 훨씬 일반적이고 중요하다.


# 5.6 Feature Scaling (특징 스케일링)

Gradient Descent를 빠르고 안정적으로 수렴시키기 위해 필수적으로 사용되는 기술이다.

### 왜 스케일링이 필요한가?

feature들의 값의 스케일이 서로 크게 다르면  
→ cost function의 contour(등고선)가 “길쭉한 타원” 모양이 된다.  
→ gradient 방향이 계속 튀면서 지그재그로 이동 → 수렴이 매우 느려짐

예시:

- x₁: 집 크기(300 ~ 2000)
    
- x₂: 방 개수(0 ~ 5)
    

두 feature의 scale이 크게 다르다.

### 스케일링 이전:

- x₁ 크기 변화(크면) w₁이 작은 값이어도 출력에 큰 영향
    
- x₂ 변화(작음)는 w₂가 커야만 영향이 생김
    

→ cost function이 길고 좁은 타원 모양

### 스케일링 이후:

모든 feature가 **비슷한 범위(예: −1 ~ +1)** 를 가지면  
→ cost function은 “원형”에 가깝게 된다  
→ gradient descent가 곧바로 최소값으로 빠르게 이동  
→ 학습이 극적으로 빨라짐

---

# 5.7 Feature Scaling 방법

Feature scaling에는 크게 3가지 방법이 있다.

---

## 5.7.1 단순 스케일링 (Divide by max)

방법:

- X₁의 값이 0~2000이라면  
    X₁_scaled = X₁ / 2000
    
- X₂의 값이 0~5라면  
    X₂_scaled = X₂ / 5
    

결과: 모든 feature가 0~1 사이로 정규화됨.

---

## 5.7.2 Mean Normalization (평균 정규화)

원 데이터 → (X − μ) / (max − min)

절차:

1. 전체 feature 값의 평균 μ 계산
    
2. 각 값에서 μ를 뺌
    
3. (max − min)으로 나눔
    

예:

- X₁ 평균: 600
    
- min=300, max=2000
    
- X₁_norm = (X₁ − 600) / (2000 − 300)  
    → 범위가 대략 −1 ~ +1 사이가 됨
    

스케일링 후 예시:

- X₁_norm ≈ −0.18 ~ +0.82
    
- X₂_norm ≈ −0.46 ~ +0.54
    

---

## 5.7.3 Z-score Normalization (표준 정규화)

X_norm = (X − μ) / σ

- μ: 평균
    
- σ: 표준편차
    

예시:

- X₁: μ=600, σ=450
    
- 범위: −0.67 ~ +3.1
    
- X₂: μ=2.3, σ=1.4
    
- 범위: −1.6 ~ +1.9
    

---

## 5.7.4 스케일링 언제 해야 하나?

다음에 해당하면 반드시 스케일링:

- 어떤 feature가 −100~100처럼 다른 feature보다 너무 큰 범위
    
- 어떤 feature가 매우 작은 범위 −0.001~0.001
    
- 치수 단위가 다른 경우(예: feet vs years)
    
- polynomial feature(제곱, 세제곱)이 있는 경우  
    → x², x³의 값이 너무 커지므로 필수
    

Andrew Ng의 조언:

- 거의 항상 feature scaling을 하는 것이 안전
    
- 잘못될 위험은 없고, 도움은 커서 **“그냥 하는 게 낫다”**
    

---

# 5.8 Gradient Descent Convergence (수렴 여부 확인)

Gradient descent가 제대로 작동하는지 확인하는 가장 좋은 방법:

### “Learning Curve(학습 곡선)” 그리기

- x축: iteration(반복횟수)
    
- y축: cost J(w, b)
    

### 올바른 학습 곡선의 특징

1. cost J가 **iteration마다 감소**해야 한다.
    
2. 감소폭이 점점 줄어들며 **평탄해지면(converge)** 학습 완료
    
3. 중간에 cost가 증가하면?
    
    - learning rate α가 너무 큼
        
    - 혹은 코드에 버그
        

### 예시 그래프 해석:

- 300번 반복 후부터 기울기 거의 0 → 수렴
    
- 400번 반복 시 완전히 평탄 → 학습 종료
    

### 자동 종료 기준 (optional)

- J가 iteration마다 줄어드는 폭이 ε 이하  
    (ε = 0.001 등)  
    → 자동으로 종료
    

하지만 Andrew Ng는  
**직접 곡선을 보는 것이 더 실용적**이라고 말함.

---

# 5.9 Learning Rate α 선택 방법

learning rate는 gradient descent 성능을 좌우하는 핵심 요소다.

---

## 5.9.1 learning rate가 너무 큰 경우

증상:

- cost가 증가
    
- 미니멈을 “넘어가서” 발산
    
- 그래프가 지그재그로 위아래 튐
    

해결:

- α를 줄이기 (예: 0.1 → 0.01)
    

---

## 5.9.2 learning rate가 너무 작은 경우

- cost가 줄어들긴 하지만 매우 매우 느림
    
- 수백~수천 번의 iteration 필요
    

---

## 5.9.3 Andrew Ng의 실제 조언

α는 다음과 같은 값들을 **직접 실험**하면서 고른다:

0.001  
0.003  
0.01  
0.03  
0.1  
0.3  
1.0

각 α에 대해 몇 번 반복 후 learning curve를 확인  
→ cost가 빠르게 감소하고, 불안정하지 않은 α 선택

---

## 5.9.4 Debugging tip

gradient descent가 이상하면:

1. α를 매우 매우 작게 설정해본다
    
2. 그래도 cost가 증가하면 → **코드 버그**
    

이 방식으로 문제 원인을 빠르게 잡을 수 있다.

---

# 5.10 Feature Engineering (특징 엔지니어링)

머신러닝에서 가장 중요한 기법 중 하나.  
좋은 feature를 만들면 모델의 성능이 극적으로 향상된다.

---

## 5.10.1 예: 집값 예측 문제

feature:

- X₁: 대지의 width(전면 길이)
    
- X₂: depth(깊이)
    

모델:

f(x) = w₁X₁ + w₂X₂ + b

이 모델도 작동은 하지만,  
가장 중요한 정보는 사실 “면적”일 수 있다.

면적 = X₁ × X₂ = X₃

### 새로운 feature 추가:

X₃ = X₁ × X₂

새 모델:

f(x) = w₁X₁ + w₂X₂ + w₃X₃ + b

→ 모델이 스스로 “면적이 중요한지” 판단할 수 있게 된다.

이것이 바로 feature engineering.

---

# 5.11 Polynomial Regression (다항 회귀)

선형 회귀를 이용해 **곡선 형태의 모델**을 만들 수 있다.

---

## 5.11.1 아이디어

기존 feature x로는 직선만 가능  
그러나 x², x³ 같은 새로운 feature를 만들면 곡선도 가능해진다.

예:

1. Quadratic (2차)  
    [x, x²]
    
2. Cubic (3차)  
    [x, x², x³]
    

모델:

f(x) = w₁x + w₂x² + w₃x³ + b

→ x에 대한 polynomial 형태이지만,  
→ 여전히 “선형 회귀 모델”이다  
(파라미터 w가 선형적이기 때문)

---

## 5.11.2 예시 그래프 해석

- x²는 커지다가 다시 내려오는 형태 → 큰 집이면 다시 가격이 떨어지는 비현실적 현상
    
- x³는 다시 올라가는 형태가 가능해 더 현실적
    
- sqrt(x) 같은 feature도 가능  
    → 완만하지만 내려오진 않음 → 대체로 현실적인 가격 증가 형태
    

즉, “어떤 feature를 집어넣느냐”가 모델의 형태를 결정한다.

---

## 5.11.3 스케일링 중요성 증가

x, x², x³ 사용 시:

- x: 1~1000
    
- x²: 1~1,000,000
    
- x³: 1~1,000,000,000
    

→ 스케일 차이가 매우 커지기 때문에  
→ 반드시 feature scaling 해야 gradient descent가 제대로 작동

---

# 5.12 마무리 조언 및 다음 단계

Andrew Ng의 메시지 요약:

- Multiple Linear Regression은 **전 세계에서 가장 많이 사용되는 ML 알고리즘**
    
- Feature Scaling과 Learning Rate는 gradient descent 성능의 핵심
    
- Feature Engineering을 통해 더 강력한 모델을 만들 수 있음
    
- Polynomial Regression을 이용하면 “곡선”까지 학습 가능
    
- scikit-learn 같은 라이브러리도 사용해볼 가치가 있지만  
    → 기본 개념과 구현 방법을 직접 아는 것이 더 중요
    

---

# 업로드된 두 파일(01_multiple_linear_regression.md + 02_gradient_descent_in_practice.md) 반영 검토

체크리스트 기준 100% 반영 완료:

|파일|주요 내용|노트 반영 여부|
|---|---|---|
|01_multiple_linear_regression.md|다중 회귀 수식, 벡터화, dot product, for loop 비교, vectorized gradient descent, normal equation|전부 반영|
|02_gradient_descent_in_practice.md|feature scaling 3종, 스케일링 이유, learning curve, convergence, learning rate 선택, feature engineering, polynomial regression, scikit-learn 언급|전부 반영|

→ **누락 없음, 모든 구간을 정확하고 상세하게 포함시켰음.**

---

필요하다면 다음도 만들어줄 수 있어:

- 이 chapter 전체의 “시험 대비 핵심요약 버전”
    
- polynomial regression 실습을 위한 python 코드 템플릿
    
- feature scaling 체크리스트
    
- gradient descent debugging guide
    

계속 진행할 상위 코스 자료가 있다면 바로 줘.