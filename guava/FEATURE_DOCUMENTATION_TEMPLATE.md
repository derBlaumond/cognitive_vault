# Feature 문서화 템플릿

**작성일**: YYYY-MM-DD  
**Feature 번호**: Feature X  
**Feature 이름**: [Feature 이름]

---

## 📋 개요

### Feature 설명
[Feature에 대한 간단한 설명]

### 목적
[이 Feature를 구현하는 목적]

### 우선순위
- 🟢 P0 (Critical)
- 🟡 P1 (High)
- 🔵 P2 (Medium)
- ⚪ P3 (Low)

---

## ✅ 구현 상태

### 전체 진행률
- **Backend**: X% 완료
- **Frontend**: X% 완료
- **테스트**: X% 완료
- **문서화**: X% 완료

### 완료된 작업
- [ ] 작업 1
- [ ] 작업 2
- [ ] 작업 3

### 진행 중인 작업
- [ ] 작업 4
- [ ] 작업 5

### 남은 작업
- [ ] 작업 6
- [ ] 작업 7

---

## 🏗️ 아키텍처

### Backend 구조
```
apps/backend/src/
├── [feature-name]/
│   ├── [feature-name].controller.ts
│   ├── [feature-name].service.ts
│   ├── dto/
│   │   ├── create-[feature-name].dto.ts
│   │   └── update-[feature-name].dto.ts
│   └── [feature-name].module.ts
```

### Frontend 구조
```
apps/frontend/src/
├── pages/
│   └── [FeatureName]Page.tsx
├── components/
│   └── [FeatureName]Component.tsx
└── services/
    └── [featureName]Service.ts
```

### Database Schema
```prisma
model [ModelName] {
  // Schema 정의
}
```

---

## 🔌 API 엔드포인트

### 1. [API 이름]
```
[HTTP Method] /api/[endpoint]
```

**Request**:
```typescript
{
  // Request body
}
```

**Response**:
```typescript
{
  // Response body
}
```

**에러 케이스**:
- `400 Bad Request`: [에러 설명]
- `401 Unauthorized`: [에러 설명]
- `404 Not Found`: [에러 설명]

---

## 🧪 테스트

### Unit Tests
- **파일**: `[feature-name].service.spec.ts`
- **커버리지**: X%
- **테스트 케이스**:
  - [ ] 케이스 1
  - [ ] 케이스 2
  - [ ] 케이스 3

### E2E Tests
- **파일**: `test/[feature-name].e2e-spec.ts`
- **테스트 시나리오**:
  - [ ] 시나리오 1
  - [ ] 시나리오 2
  - [ ] 시나리오 3

### 엣지 케이스
- [ ] 엣지 케이스 1
- [ ] 엣지 케이스 2
- [ ] 엣지 케이스 3

---

## 🐛 알려진 이슈

### 해결된 이슈
1. **이슈 1**: [설명] - 해결일: YYYY-MM-DD
2. **이슈 2**: [설명] - 해결일: YYYY-MM-DD

### 미해결 이슈
1. **이슈 3**: [설명] - 우선순위: [P0/P1/P2/P3]
2. **이슈 4**: [설명] - 우선순위: [P0/P1/P2/P3]

---

## 📊 성능 지표

### API 응답 시간
- 평균: Xms
- P95: Xms
- P99: Xms

### 데이터베이스 쿼리
- 평균 쿼리 수: X개
- 최적화 여부: ✅/❌

---

## 🔄 PRD 매핑

### PRD 요구사항
- [ ] 요구사항 1
- [ ] 요구사항 2
- [ ] 요구사항 3

### Acceptance Criteria
- [ ] Criterion 1
- [ ] Criterion 2
- [ ] Criterion 3

---

## 📝 변경 이력

| 날짜 | 변경 내용 | 작성자 |
|------|----------|--------|
| YYYY-MM-DD | 초기 작성 | [이름] |
| YYYY-MM-DD | [변경 내용] | [이름] |

---

## 🔗 관련 문서

- [PRD - Feature X](./PRODUCT_REQUIREMENTS_DOCUMENT.md#feature-x)
- [구현 계획](./FEATURE[X]_IMPLEMENTATION_PLAN.md)
- [API 명세서](./API_SPECIFICATION.md)
