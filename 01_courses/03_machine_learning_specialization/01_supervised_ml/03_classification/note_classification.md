## Chapter 6. Logistic Regression & Overfitting

# 6.1 Binary Classification & Logistic Regression

이전까지는 연속적인 값(y ∈ ℝ)을 예측하는 **회귀(regression)** 문제를 다뤘다.  
이번 장에서는 **이진 분류(binary classification)** 문제를 다룬다.

예:

- 종양이 악성인가? (1) / 양성인가? (0)
    
- 이메일이 스팸인가?
    
- 결제 사기가 맞는가?
    

이 경우 **y ∈ {0, 1}**

---

## 6.1.1 데이터 구성

training set:

- m개의 예제
    
- 각 예제는 n개의 feature (x₁…xₙ)  
    예: 종양 크기, 나이, 가족력 등
    
- y는 0 또는 1
    

Logistic regression의 목적:  
**입력 x가 주어졌을 때 y=1일 확률을 예측하는 것**

즉,

f(x) = P(y=1 | x)

---

## 6.1.2 Linear regression을 그대로 쓰면 안 되는 이유

선형 회귀를 그대로 사용하면:

f(x) = w·x + b

→ 출력이 **-∞에서 +∞까지** 가능  
→ 확률(0~1)을 표현할 수 없음  
→ 특정 상황에서는 심각하게 잘못된 예측 가능

따라서 **출력을 0~1 구간으로 압축하는 함수**가 필요함.

---

## 6.1.3 Logistic (Sigmoid) Function

z = w·x + b

f(x) = 1 / (1 + e^(-z))

sigmoid의 성질:

- z → +∞: f(x) → 1
    
- z → -∞: f(x) → 0
    
- z = 0일 때 f(x)=0.5
    
- 부드럽고 미분 가능
    

분류 문제에서 매우 적합.

---

# 6.2 Squared Error Cost Function이 Logistic Regression에 부적합한 이유

선형 회귀에서 사용하던 cost:

J(w,b) = (1/2m) Σ (f(x⁽ⁱ⁾) − y⁽ⁱ⁾)²

Logistic regression에서도 그대로 사용하면 어떤 일이 생길까?

Andrew Ng의 설명:

- f(x)는 sigmoid이므로 **비선형**
    
- 제곱 오차 cost를 적용하면 **cost surface가 비볼록(non-convex)**
    
- 여러 개의 지역 최소(local minima)가 생김
    
- gradient descent가 global minimum을 보장할 수 없음
    

결론: **Squared error cost는 logistic regression에 적합하지 않다.**

---

# 6.3 Logistic Regression의 Loss Function 정의

새로운 loss를 정의해야 함.

training example (x, y)에 대한 loss L(f(x), y):

### y = 1인 경우

L = −log(f(x))

해석:

- f(x) → 1이면 loss → 0
    
- f(x) → 0이면 loss → ∞
    
- 즉, y=1인데 모델이 1이라고 강하게 믿지 않으면 큰 패널티
    

---

### y = 0인 경우

L = −log(1 − f(x))

해석:

- f(x) → 0이면 loss → 0
    
- f(x) → 1이면 loss → ∞
    
- 즉, y=0일 때, 모델이 1이라고 예측하면 매우 큰 패널티
    

---

## 6.3.1 Loss 해석 그래프

Andrew가 영상에서 자세히 설명한 곡선:

### y=1일 때

- f(x)=1 → loss=0
    
- f(x)=0.5 → 작은 loss
    
- f(x)=0.1 → 큰 loss
    
- f(x)=0 → 무한대
    

### y=0일 때

- f(x)=0 → loss=0
    
- f(x)=0.3 → moderate loss
    
- f(x)=0.9 → large loss
    
- f(x)=1 → 무한대
    

이 형태 덕분에:

- 예측이 정확할 때 loss가 낮음
    
- 틀릴수록 loss가 급격히 커짐
    
- cost function이 **convex 형태**를 갖게 되어 gradient descent 수렴 보장
    

---

# 6.4 Logistic Loss를 하나의 식으로 통합

지금까지:

- y=1일 때: −log(f)
    
- y=0일 때: −log(1−f)
    

이를 y ∈ {0,1} 조건을 이용해 **하나의 공식**으로 정리할 수 있다.

L(f,y) = − y log(f) − (1−y) log(1−f)

y=1, y=0일 때 어떻게 동작하는지 영상에서 증명:

- y=1 → 첫 항은 −log(f), 두 번째 항은 0
    
- y=0 → 첫 항은 0, 두 번째 항이 −log(1−f)
    

즉, 완전히 동일한 의미.

---

# 6.5 Logistic Regression의 Cost Function

전체 cost는 training set loss 평균

J(w,b) = (1/m) Σ L(f(x⁽ⁱ⁾), y⁽ⁱ⁾)

= − (1/m) Σ [ y⁽ⁱ⁾ log(f(x⁽ⁱ⁾)) + (1 − y⁽ⁱ⁾) log(1 − f(x⁽ⁱ⁾)) ]

이 cost는 **convex**  
→ gradient descent로 global minimum을 찾을 수 있다.

---

# 6.6 Gradient Descent for Logistic Regression

목표:  
J(w,b)를 최소화하는 w, b 찾기

반복:

wⱼ := wⱼ − α * ∂J/∂wⱼ  
b := b − α * ∂J/∂b

Andrew Ng가 제공한 gradient:

∂J/∂wⱼ = (1/m) Σ (f(x⁽ⁱ⁾) − y⁽ⁱ⁾) xⱼ⁽ⁱ⁾  
∂J/∂b = (1/m) Σ (f(x⁽ⁱ⁾) − y⁽ⁱ⁾)

중요한 포인트:

- 식은 **linear regression과 완전히 동일**해 보인다.
    
- 하지만 logistic regression은 f(x)가 **sigmoid(wx+b)**  
    → 두 알고리즘은 전혀 다르다.
    

실제 구현은:

1. z = w·x + b
    
2. f = sigmoid(z)
    
3. gradient dW, dB 계산
    
4. simultaneous update 적용
    

---

## 6.6.1 Logistic Regression에서도 Feature Scaling 필요

- x, x², x³ 등 다양한 범위의 feature들은  
    → gradient descent 수렴을 느리게 한다
    
- linear regression 때와 동일하게  
    → normalization 또는 standardization 필수
    

---

# 6.7 Classification에서도 Gradient Descent Convergence 확인

linear regression 때처럼:

- 학습 곡선(cost vs iteration)을 그려서
    
- cost가 매 iteration 감소하는지 확인
    
- learning rate가 너무 작거나, 너무 크면 조정
    
- 이상 행동 시 **learning rate를 매우 작게** 해서 디버깅  
    → 그래도 cost가 증가 → 코드 버그
    

# 6.8 Underfitting vs Overfitting

머신러닝 모델은 크게 세 가지 상태 중 하나에 놓인다.

1. Underfitting (과소적합)
    
2. Just Right (적절한 모델)
    
3. Overfitting (과적합)
    

---

## 6.8.1 Underfitting (과소적합)

정의:  
**모델이 너무 단순**해서 데이터의 패턴을 학습하지 못하는 상태.

예:  
x와 y의 관계가 곡선인데  
모델이 직선(linear)만 사용하면 패턴을 잡지 못한다.

특징:

- training error 높음
    
- cross validation error도 높음
    
- 모델 복잡도가 너무 낮음
    
- feature 부족 / 단순 모델 / 파라미터 수 부족
    

---

## 6.8.2 Overfitting (과적합)

정의:  
**모델이 너무 복잡해서 training data에만 딱 맞고, 새로운 데이터에 잘 맞지 않는 상태.**

예시:

- x와 y의 관계가 매끄러운 곡선인데
    
- 모델이 10차 polynomial을 사용
    
- 실제 데이터의 노이즈까지 그대로 외워버림
    

특징:

- training error는 매우 낮음
    
- 하지만 test/cv error는 매우 높음
    
- high variance
    
- 모델 복잡도가 너무 높음
    
- feature를 과도하게 사용
    
- 파라미터 w가 아주 큰 값들을 가짐
    

---

# 6.9 고차 다항식(overly high degree polynomial) 예시 분석

Andrew Ng가 영상에서 설명한 전형적인 예:

데이터 분포는 대략 선형적이거나 단순한 곡선  
하지만 모델이 다음처럼 지나치게 복잡하면:

- training points를 완벽하게 통과
    
- 하지만 곡선은 이상하게 출렁이며
    
- 새로운 데이터에서 오차가 매우 큼
    

→ 이것이 overfitting의 대표적 형태.

---

# 6.10 Overfitting을 해결하는 세 가지 방법

머신러닝 산업 현장에서 가장 널리 쓰이는 3가지 전략.

---

## 방법 1. **More training data** 수집하기

- 가장 이상적이고 강력한 해결책
    
- 데이터가 많으면 variance가 줄어듦
    
- 하지만 얻기 어려운 경우가 많음
    
- 비용/시간 문제 존재
    

---

## 방법 2. **Feature Reduction / Model Simplification**

즉 모델 단순화.

- feature 개수를 줄이기
    
- 다항식 차수를 줄이기
    
- 파라미터 수 줄이기
    
- tree depth 줄이기(트리 기반 모델)
    
- less complex model 사용
    

→ 모델이 너무 복잡해서 생기는 overfitting을 완화

---

## 방법 3. **Regularization (정규화)**

핵심 전략.  
deep learning에서도 필수적으로 사용되는 방법.

목표:  
**파라미터 w들이 너무 큰 값을 갖지 못하도록 해서 모델의 복잡도를 낮추기.**

장점:

- training data는 그대로 유지
    
- feature 제거 없이도 단순한 모델 효과
    
- 가장 실용적인 방식
    

---

# 6.11 Regularization의 핵심 아이디어

기본 원리:

- “모델이 너무 복잡해지는 이유 = w 값들이 너무 크기 때문”
    
- 따라서 cost function에 “w가 큰 것을 패널티 주는 항”을 추가
    
- 그러면 학습 과정에서 w가 자연스럽게 작은 값으로 유지됨
    
- 결과적으로 모델이 덜 요동치고 less curved → overfitting 방지
    

---

## 6.11.1 Linear Regression에서 Regularized Cost

원래 cost:

J(w,b) = (1/2m) Σ (f(x) − y)²

Regularization term 추가:

J(w,b) = (1/2m)[ Σ (f(x) − y)² ] + (λ/2m) Σ(wⱼ²)

여기서:

- λ(lambda): regularization strength
    
- λ가 크면 → w가 강하게 제약됨
    
- w가 작아지면 → 모델은 단순해짐
    

주의:  
b는 regularization 대상에서 제외한다.  
(편향 항까지 제약하면 모델 표현력이 과도하게 줄어듦)

---

# 6.12 Regularization이 polynomial 모델에 미치는 효과

예: 5차 polynomial

f(x) = w₁x + w₂x² + w₃x³ + w₄x⁴ + w₅x⁵ + b

w들이 너무 크면 곡선이 심하게 뒤틀린다 → overfitting

λ를 크게 하면:

- w₂, w₃, w₄, w₅가 모두 작아짐
    
- 곡선이 부드럽게 flatten
    
- degree는 여전히 5지만  
    **실질적으로 low-degree polynomial처럼 작동**
    

→ feature는 그대로 두고 모델 복잡도만 낮추는 효과

---

# 6.13 Regularized Gradient Descent

원래 gradient update는:

wⱼ := wⱼ − α * (1/m) Σ(f − y)xⱼ

Regularization이 적용되면:

wⱼ := wⱼ − α * [(1/m) Σ(f − y)xⱼ + (λ/m) wⱼ]

b := b − α * (1/m) Σ(f − y)

여기서 변화된 부분은:

- wⱼ 업데이트에 (λ/m) wⱼ 추가
    
- b는 regularization 제외
    

해석:

- wⱼ가 업데이트될 때마다  
    → “(1 − αλ/m)” 만큼 자동으로 shrink되는 효과
    
- 결국 w를 크게 만들기 어려움 → overfitting 방지
    

---

## 6.13.1 Direct shrink interpretation

wₖ_new = wₖ_old − α*(1/m)_gradient − α_(λ/m)*wₖ_old  
= (1 − αλ/m)_wₖ_old − α_(1/m)*gradient

즉,

- 매 스텝마다 파라미터가 일정 비율로 자동 축소
    
- shrinkage(damping) 효과 발생
    
- 모델이 더 smooth하게 됨
    

---

# 6.14 Logistic Regression에서도 동일하게 Regularization 적용 가능

Linear regression에서 사용한 regularization cost는  
logistic regression에서도 그대로 사용 가능.

Regularized logistic cost:

J(w,b) = −(1/m) Σ [y log f + (1−y) log(1−f)] + (λ/2m) Σ(wⱼ²)

Gradient update:

wⱼ := wⱼ − α * [ (1/m) Σ(f − y)xⱼ + (λ/m) wⱼ ]  
b := b − α * (1/m) Σ(f − y)

완전히 동일한 구조  
→ 단지 f(x)는 logistic regression이므로 sigmoid(wx+b)

---

# 6.15 λ(lambda)의 역할과 선택

### λ가 너무 큰 경우:

- wⱼ들이 거의 0으로 수렴
    
- 모델이 지나치게 평평해짐
    
- underfitting 발생
    

### λ가 너무 작은 경우:

- regularization 효과 부족
    
- 모델이 training data 노이즈까지 학습 → overfitting
    

### λ 선택 방법:

- cross-validation
    
- 여러 λ값 실험
    
- 일반적으로 {0, 0.01, 0.1, 1, 3, 10} 세트로 테스트
    

---

# 6.16 Regularization 정리

Regularization은 다음을 동시에 만족하는 매우 강력한 기법:

- overfitting을 해결
    
- 모델 단순화
    
- training data 삭제 필요 없음
    
- feature engineering 없이도 안정적인 결과
    
- linear regression과 logistic regression 모두 적용
    
- gradient descent에도 간단한 항만 추가하면 됨
    

→ 머신러닝에서 가장 많이 사용되는 일반적 기법 중 하나.
