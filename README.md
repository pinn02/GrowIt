# 🌱 GrowIT 

> 턴제 경영 시뮬레이션 웹게임

[![React](https://img.shields.io/badge/React-19.1.1-61DAFB?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7.1.2-646CFF?logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.12-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)

---

## 📋 목차
- [프로젝트 개요](#-프로젝트-개요)
- [주요 기능](#️-주요-기능)
- [기술 스택](#️-기술-스택)
- [프로젝트 구조](#-프로젝트-구조)
- [시작하기](#-시작하기)
- [아키텍처](#️-아키텍처)
- [팀 소개](#-팀-소개)

---

## 🏢 프로젝트 개요

**팀명:** 쌀과자  
**개발기간:** 2025.09.01 - 2025.09.29 (4주)  
**팀원:** 6명

본 프로젝트는 **턴제 경영 시뮬레이션 게임**으로,
매 턴 선택한 행동에 따라 **자본·생산성·기업 가치**가 변동되며,  
랜덤 이벤트와 복지 시설 업그레이드를 통해  
**30턴 후 기업 가치 수준에 따라 엔딩이 결정**됩니다.

---

## ⚙️ 주요 기능

## 🎯 게임 목표
- 30턴 안에 회사를 성공적으로 성장시키세요.  
- 매 턴 전략적 의사결정을 내려 자본, 기업 가치, 생산성을 관리하세요.  
- 자본이 0G 이하가 되면 파산합니다.  

---

## 📊 핵심 지표
- **자본**, **기업 가치**, **생산성**  

---

## 🎲 게임 플레이
- **생산성 향상**: 직원 고용, 투자 (설비, R&D 투자)  
- **기업 가치 증대**: 마케팅 (신문, SNS, TV)
- **자본 획득**: 프로젝트 (공공/정부 프로젝트, 사내 프로젝트, 글로벌 프로젝트)  

턴 종료 후 투자 유치·파트너십 체결 같은 **긍정적 이벤트**,  
데이터 유출 사고·인력 이탈 같은 **부정적 이벤트**가 무작위로 발생합니다.  

---

## 🏢 복지 시설 스토어
- 시설 업그레이드로 기업 가치와 생산성을 향상  
- 업그레이드 순서: 통근버스 → 기숙사 → 헬스장 → 카페테리아 → 병원 → 어린이집 → 북카페 → 본사 건물  
- 각 시설은 Lv1~Lv3까지 업그레이드 가능
- 건물 업그레이드 시 UI 변경으로 시각적 재미 요소

---

## 🎬 엔딩 시스템
30턴 후 **기업 가치 수준**에 따라 네 가지 엔딩이 준비되어 있습니다:  
- 스타트업 · 중견기업 · 대기업 · 유니콘기업


---

## 🛠️ 기술 스택

### 🎮 Frontend (Game Layer)
```
React 19.1.1 + TypeScript 5.8.3
├── Vite 7.1.2              # 빌드 도구
├── React Router DOM 7.8.2  # 라우팅
├── Zustand 5.0.8           # 상태 관리
├── Tailwind CSS 4.1.12     # 스타일링
├── Axios 1.12.2            # HTTP 클라이언트
├── FontAwesome             # 아이콘
└── Google Analytics 4      # 사용자 분석
```

---

## 📁 프로젝트 구조

```
S13P21C201/
├── GrowIT-FE/              # Frontend (React + TypeScript)
│   ├── src/
│   │   ├── api/            # API 통신 레이어
│   │   ├── app/            # 라우팅 설정
│   │   ├── components/     # UI 컴포넌트 (Atomic Design)
│   │   │   ├── atoms/
│   │   │   ├── molecules/
│   │   │   ├── organisms/
│   │   │   └── templates_work/
│   │   ├── config/         # 설정 (OAuth, GA4 등)
│   │   ├── hooks/          # 커스텀 훅
│   │   ├── pages/          # 페이지 컴포넌트
│   │   ├── stores/         # Zustand 상태 관리
│   │   └── types/          # TypeScript 타입
│   └── package.json
│
├── GrowIT-BE/              # Backend (Spring Boot)
│   └── src/
│
└── GrowIT-DATA/            # Data Pipeline (Spark, Airflow)
    └── ...
```

### 🗂️ Frontend 상세 구조
```
src/
├── stores/                 # Zustand 상태 관리
│   ├── userStore.tsx       # 사용자 정보, 로그인 상태
│   ├── gameDataStore.tsx   # 게임 데이터, 턴 정보
│   ├── actionStore.tsx     # 플레이어 액션
│   ├── buttonStore.tsx     # UI 버튼 상태
│   └── saveStore.tsx       # 세이브 파일 관리
│
├── pages/                  # 라우팅 페이지
│   ├── StartPage.tsx       # 로그인/시작
│   ├── MainPage.tsx        # 메인 게임
│   ├── BankruptcyPage.tsx  # 파산
│   ├── EndingPage.tsx      # 엔딩
│   └── Auth2SuccessHandler.tsx  # OAuth 콜백
│
└── components/             # Atomic Design Pattern
    ├── atoms/              # 버튼, 인풋 등 기본 UI
    ├── molecules/          # 조합 컴포넌트
    ├── organisms/          # 복합 컴포넌트
    └── templates_work/     # 페이지 템플릿
```

---

## 🚀 시작하기

### 사전 요구사항
- Node.js >= 18.0.0
- npm or yarn
- Git

### Frontend 설치 및 실행

```bash
# 저장소 클론
git clone <repository-url>
cd S13P21C201/GrowIT-FE

# 의존성 설치
npm install

# 환경 변수 설정 (.env 파일 생성 필요)
# VITE_KAKAO_REST_API_KEY=your_key
# VITE_GA4_MEASUREMENT_ID=your_id

# 개발 서버 실행
npm run dev
# → http://localhost:5173

# 프로덕션 빌드
npm run build

# 빌드 미리보기
npm run preview
```

### Backend 실행

```bash
cd GrowIT-BE
./gradlew bootRun
```

---

## 🏗️ 아키텍처

### 전체 시스템 아키텍처

```
┌─────────────┐     ┌──────────────┐     ┌─────────────────┐
│   Browser   │────▶│  React App   │────▶│  Spring Boot    │
│  (Client)   │◀────│  (Frontend)  │◀────│   (Backend)     │
└─────────────┘     └──────────────┘     └─────────────────┘
                            │                      │
                            │                      ▼
                            │              ┌─────────────────┐
                            │              │     MySQL       │
                            │              │  (Game Data)    │
                            │              └─────────────────┘
                            │
                            ▼
                    ┌──────────────────────────────────┐
                    │      Kakao OAuth 2.0             │
                    │  (Direct Frontend Integration)   │
                    └──────────────────────────────────┘
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
8. Frontend → Zustand Store 저장 & localStorage 영속화
9. Frontend → /oauth2/success 리디렉트
10. 로그인 완료
```

**특징**: 백엔드를 거치지 않고 프론트엔드에서 직접 OAuth 처리

### 상태 관리 패턴 (Zustand)

```typescript
// 5개의 독립적인 Store로 관심사 분리
├── userStore      → 사용자 인증 정보
├── gameDataStore  → 게임 진행 데이터
├── actionStore    → 플레이어 액션
├── buttonStore    → UI 상태
└── saveStore      → 세이브/로드
```

### 게임 플로우

```
┌─────────┐   ┌──────────────┐   ┌──────────┐
│  Login  │──▶│  CEO Select  │──▶│   Main   │
│  Page   │   │    Page      │   │   Game   │
└─────────┘   └──────────────┘   └──────────┘
                               │
                               ▼
                         ┌──────────┐
                    ┌───▶│Bankruptcy│
                    │    └──────────┘
                    │
                    │    ┌──────────┐
                    └───▶│  Ending  │
                         └──────────┘

```

---

## 👥 팀 소개

| 역할 | 인원 | 팀원 |
|------|------|------|
| **Frontend** | 3명 | 이다혜, 김민우, 김선우 |
| **Backend** | 3명 | 성경준, 박시은, 전준영 |


---

## 🚀 기대 효과
- **전략적 사고 훈련**  
  제한된 자원(자본, 생산성, 기업 가치) 관리와 의사결정을 통해 경영 전략적 사고를 훈련할 수 있습니다.

- **게임 몰입도 향상**  
  랜덤 이벤트와 시설 업그레이드 시스템으로 매 판마다 다른 전개가 발생하여 높은 리플레이 가치를 제공합니다.

- **경영 시뮬레이션 이해도 제고**  
  지표 관리(자본, 생산성, 기업 가치)를 통해 실제 경영 요소를 단순화해 체험할 수 있으며,
  기업 성장과 의사결정의 상관관계를 쉽게 이해할 수 있습니다.

---

## 📄 라이선스

이 프로젝트는 SSAFY 13기 특화 프로젝트로 개발되었습니다.

---
