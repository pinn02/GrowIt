# 🌱 GrowIT - 회사를 키우자

> 프론트엔드 기반 턴제 경영 시뮬레이션 웹게임

[![React](https://img.shields.io/badge/React-19.1.1-61DAFB?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7.1.2-646CFF?logo=vite)](https://vitejs.dev/)
[![Zustand](https://img.shields.io/badge/Zustand-5.0.8-orange)](https://zustand-demo.pmnd.rs/)

---

## 🎯 프로젝트 개요

**팀명:** 쌀과자  
**개발기간:** 2025.09.01 - 2025.09.29 (4주)  
**팀원:** 6명

**순수 프론트엔드 기술만으로 구현한** 경영 시뮬레이션 게임입니다.

플레이어는 CEO가 되어 **고용, 마케팅, 투자, 프로젝트 등 전략적 의사결정**을 내리며, 
**30턴 동안 회사를 성장**시키는 것이 목표입니다.

### ✨ 핵심 특징
- 🎮 **Complete Frontend Game** - 모든 게임 로직을 클라이언트에서 처리
- 🎯 **전략적 의사결정** - 고용, 마케팅, 투자 등 다양한 선택지
- 🎲 **동적 이벤트 시스템** - 확률 기반 랜덤 이벤트 발생
- 💾 **자동 세이브 시스템** - localStorage 기반 게임 진행 저장
- 🏆 **30턴 생존 챌린지** - 파산 or 엔딩 도달

---

## ⚙️ 주요 기능

### 1. 기업 스탯 관리
- 💼 **소비자 신뢰 지수** - 기업 가치 지표
- 📈 **생산성** - 직원 효율성
- 💰 **기업 자산** - 게임 머니

### 2. 게임 데이터 시스템
- 15명의 다양한 직원 풀
- 30+ 랜덤 이벤트 시나리오
- 다양한 마케팅/투자/프로젝트 옵션
- 8가지 업그레이드 가능한 시설

### 3. 월간 의사결정
- **고용** - 신입/경력 직원 채용
- **마케팅** - TV, SNS, 지역 이벤트
- **투자** - 설비 확충, R&D
- **프로젝트** - 수익 창출 활동

### 4. 랜덤 이벤트
- **긍정 이벤트**: 정부 지원금, 바이럴 성공, 특허 등록
- **부정 이벤트**: 파업, 경쟁사 등장, 자연재해

### 5. 엔딩 시스템
- **파산** → 즉시 게임 종료
- **30턴 생존** → 기업 점수 확인

---

## 🛠️ 기술 스택

### 🎮 Frontend (Core)
```
React 19.1.1 + TypeScript 5.8.3
├── Vite 7.1.2              # 빌드 도구
├── React Router DOM 7.8.2  # 라우팅
├── Zustand 5.0.8           # 상태 관리 ⭐
├── Tailwind CSS 4.1.12     # 스타일링
├── Axios 1.12.2            # HTTP 클라이언트
└── Google Analytics 4      # 사용자 분석
```

**인증**: Kakao OAuth 2.0 (프론트엔드 직접 연동)

### 🔧 Backend (Optional)
- **Spring Boot** - RESTful API 서버 (확장용)
- **MySQL** - 데이터베이스 (확장용)

---

## 📁 프로젝트 구조

```
GrowIT-FE/
├── src/
│   ├── api/                # API 레이어 (OAuth)
│   ├── app/                # 라우팅 설정
│   ├── assets/
│   │   └── data/           # 게임 데이터 (JSON) ⭐
│   │       ├── randomApplicants.json
│   │       ├── randomEvents.json
│   │       ├── randomInvestment.json
│   │       ├── randomMarketing.json
│   │       └── randomProject.json
│   ├── components/         # UI 컴포넌트 (Atomic Design)
│   │   ├── atoms/
│   │   ├── molecules/
│   │   ├── organisms/
│   │   └── templates_work/
│   ├── config/             # OAuth, GA4 설정
│   ├── hooks/              # 커스텀 훅
│   ├── pages/              # 페이지
│   ├── stores/             # Zustand Store ⭐
│   │   ├── userStore.tsx
│   │   ├── gameDataStore.tsx  # 핵심 게임 로직
│   │   ├── actionStore.tsx
│   │   ├── buttonStore.tsx
│   │   └── saveStore.tsx      # 세이브/로드
│   └── types/              # TypeScript 타입
```

---

## 🏗️ 아키텍처

### 게임 엔진 구조

```typescript
🎮 5개의 Zustand Store로 관리되는 게임 엔진

┌─────────────────────────────────────┐
│         gameDataStore               │
│  ─────────────────────────────────  │
│  • enterpriseValue (기업 가치)      │
│  • productivity (생산성)            │
│  • finance (자산)                   │
│  • turn (턴 진행)                   │
│  • 30+ 게임 변수 실시간 계산        │
└─────────────────────────────────────┘
           ↓
┌─────────────────────────────────────┐
│         actionStore                 │
│  ─────────────────────────────────  │
│  • 고용/마케팅/투자/프로젝트 처리   │
│  • 랜덤 이벤트 발생 로직            │
└─────────────────────────────────────┘
           ↓
┌─────────────────────────────────────┐
│         saveStore                   │
│  ─────────────────────────────────  │
│  • localStorage 자동 저장           │
│  • 세이브/로드 시스템               │
└─────────────────────────────────────┘
```

### OAuth 인증 플로우 (Frontend Only)

```
1. 사용자 → 카카오 로그인 버튼 클릭
2. Frontend → 카카오 인증 서버 리디렉트
3. 카카오 → Authorization Code 반환
4. Frontend → 카카오 Token API 호출
5. 카카오 → Access Token 반환
6. Frontend → 카카오 User Info API 호출
7. 카카오 → 사용자 정보 반환
8. Frontend → userStore 저장 & localStorage 영속화
9. 로그인 완료
```

### 게임 플로우

```
Login → CEO 선택 → 난이도 선택 → 메인 게임
                                    ↓
                              매 턴마다:
                              1. 월간 리포트
                              2. 의사결정 (4가지 액션)
                              3. 랜덤 이벤트
                              4. 스탯 계산
                                    ↓
                              파산 or 30턴 도달
                                    ↓
                              엔딩 & 점수 확인
```

---

## 🎲 게임 시스템 상세

### 경제 시스템 계산 로직

```typescript
📊 매 턴 실행되는 계산
├── 고용 선택
│   └── productivity += 직원 생산성
│       finance -= 직원 연봉
│
├── 마케팅 선택
│   └── enterpriseValue += 마케팅 효과
│       finance -= 마케팅 비용
│
├── 투자 선택
│   └── productivity += 투자 효과
│       finance -= 투자 금액
│
└── 프로젝트 선택
    └── finance += 프로젝트 보상
        (N턴 후 지급)
```

### 랜덤 이벤트 시스템

```typescript
🎲 확률 기반 이벤트 발생
├── 긍정 이벤트 (30% 확률)
│   ├── SNS 챌린지 성공 → 자산 +30만원
│   ├── 정부 지원금 획득 → 자산 +50만원
│   └── 특허 등록 성공 → 기업가치 +50
│
└── 부정 이벤트 (20% 확률)
    ├── 직원 파업 → 생산성 -30%
    ├── 경쟁사 등장 → 기업가치 -40
    └── 자연재해 → 자산 -20만원
```

---

## 🚀 기술적 도전과 해결

### 1. 복잡한 게임 로직 클라이언트 구현
**문제**: 일반적으로 서버에서 처리하는 경제 계산을 프론트엔드에서 처리  
**해결**: Zustand Store + TypeScript로 30+ 변수를 실시간 관리

### 2. 데이터 영속성
**문제**: 백엔드 DB 없이 게임 진행 저장  
**해결**: Zustand persist middleware + localStorage

### 3. OAuth 인증
**문제**: 인증 서버 없이 소셜 로그인 구현  
**해결**: 카카오 OAuth를 프론트엔드에서 직접 처리

### 4. 게임 밸런스
**문제**: 매번 다른 게임 경험 제공  
**해결**: JSON 데이터 + 확률 기반 랜덤 알고리즘

---

## 💡 핵심 기술 구현

### 1. 상태 관리 (Zustand)
```typescript
// gameDataStore.tsx - 30+ 게임 변수 관리
const useGameDataStore = create<GameDataState>()(
  persist(
    (set) => ({
      enterpriseValue: 100,
      productivity: 100,
      finance: 1000000,
      turn: 1,
      // ... 30+ 변수
      
      // 실시간 계산 함수들
      updateStats: (action) => { /* 로직 */ },
      processTurn: () => { /* 턴 진행 */ },
    }),
    { name: 'game-data' } // localStorage 저장
  )
)
```

### 2. 랜덤 시스템
```typescript
// CreateRandomArray.tsx - 확률 기반 데이터 조합
const createRandomArray = (dataLength: number) => {
  const array: number[] = []
  for (let i = 0; i < 3; i++) {
    const random = Math.floor(Math.random() * dataLength)
    if (!array.includes(random)) {
      array.push(random)
    }
  }
  return array
}
```

### 3. OAuth 직접 연동
```typescript
// authApi.ts
const getKakaoToken = async (code: string) => {
  const response = await axios.post(
    'https://kauth.kakao.com/oauth/token',
    { /* params */ }
  )
  return response.data.access_token
}
```

---

## 📊 게임 데이터 구조

### 직원 데이터 예시
```json
{
  "id": 0,
  "name": "김민수",
  "position": "주니어 백엔드 개발자",
  "productivity": 500,
  "salary": 500000
}
```

### 이벤트 데이터 예시
```json
{
  "title": "SNS 챌린지 성공",
  "content": "바이럴 마케팅 확산",
  "finance": 300000,
  "enterpriseValue": 30,
  "productivity": 100
}
```

---

## 🎯 향후 확장 계획

### Phase 1: Backend Integration
- 🌐 백엔드 서버 연동 → 글로벌 랭킹 시스템
- 💾 MySQL DB 연동 → 영구 세이브 데이터
- 🔐 JWT 인증 시스템 도입

### Phase 2: Data Enhancement
- 📊 실제 경제 데이터 API 연동
- 🤖 AI 기반 이벤트 생성
- 📈 빅데이터 분석 기반 게임 밸런싱

### Phase 3: Multiplayer
- 👥 멀티플레이어 모드
- 🏆 실시간 리더보드
- 💬 채팅 시스템

---

## 🚀 시작하기

```bash
# 저장소 클론
git clone <repository-url>
cd S13P21C201/GrowIT-FE

# 의존성 설치
npm install

# 환경 변수 설정
# .env 파일 생성
VITE_KAKAO_REST_API_KEY=your_key

# 개발 서버 실행
npm run dev
# → http://localhost:5173

# 프로덕션 빌드
npm run build
```

---

## 👥 팀 소개

**쌀과자** (6명)

| 역할 | 인원 | 담당 업무 |
|------|------|-----------|
| **Frontend** | 3명 | 게임 로직, UI/UX, 상태 관리 |
| **Backend** | 2명 | API 서버, 인프라 (확장용) |
| **Data** | 1명 | 게임 데이터 설계, 밸런싱 |

---

## 📄 라이선스

이 프로젝트는 SSAFY 13기 자율 프로젝트로 개발되었습니다.
