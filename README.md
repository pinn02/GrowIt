# 🌱 GrowIT 

> 빅데이터 기반 턴제 경영 시뮬레이션 웹게임

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

## 🕹️ 프로젝트 개요

**팀명:** 쌀과자  
**개발기간:** 2025.09.01 - 2025.09.29 (4주)  
**팀원:** 6명

본 프로젝트는 단순한 경영 시뮬레이션 게임을 넘어, **빅데이터 분산처리(Hadoop/Spark 기반)**를 활용해 **현실 데이터를 반영한 경제 리포트**를 제공하는 것이 특징입니다.

플레이어는 CEO가 되어 매월 제공되는 **분석 리포트**를 기반으로 의사결정을 하며, 분산 데이터 처리 결과가 곧 게임 플레이에 직접 반영됩니다.

### ✨ 핵심 특징
- 📊 **실시간 경제 데이터 반영** - 통계청(KOSIS), 기상자료개방포털 등 실제 데이터 활용
- 🎯 **전략적 의사결정** - 고용, 마케팅, 투자 등 다양한 선택지
- 🎲 **동적 이벤트 시스템** - 데이터 기반 랜덤 이벤트 발생
- 🏆 **30턴 생존 챌린지** - 파산 or 엔딩 후 랭킹 시스템

---

## ⚙️ 주요 기능

### 1. 기업 스탯 관리
- 💼 **소비자 신뢰 지수** - 기업 가치 지표
- 📈 **생산성** - 직원 효율성
- 💰 **기업 자산** - 게임 머니

### 2. 분산 기반 경제 리포트 생성
- 통계청(KOSIS), 기상자료개방포털, 국제경제 API 등을 Hadoop/Spark 클러스터에서 가공
- 월별 지표를 축약하여 플레이어에게 리포트 형태로 제공

### 3. 월간 의사결정
- **고용** - 신입/경력 직원 채용
- **마케팅** - TV, SNS, 지역 이벤트
- **투자** - 설비 확충, R&D
- **금융 활동** - 프로젝트 참여

### 4. 랜덤 이벤트
- **긍정 이벤트**: 정부 지원금, 바이럴 성공, 스타 직원 영입
- **부정 이벤트**: 파업, 경쟁사 등장, 자연재해

### 5. 엔딩 시스템
- **파산** → 즉시 게임 종료
- **30턴 생존** → 기업 점수 & 자산 랭킹 공개

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

**인증**: Kakao OAuth 2.0 (프론트엔드 단독 처리)

### 🔧 Backend (Game Layer)
- **Spring Boot** - RESTful API 서버
- **MySQL** - 게임 데이터 저장

### 📊 Data Layer (빅데이터 분산처리)
- **HDFS** - 원천 데이터 저장소
- **Apache Spark** - 분산 데이터 처리 (월간 경제 리포트 생성)
- **Kafka** - 실시간 이벤트 스트림 처리
- **Airflow** - 데이터 파이프라인 스케줄링

### 🚀 Infrastructure
- **Docker + Kubernetes** - 컨테이너 오케스트레이션
- **AWS EMR / GCP Dataproc** - Spark 클러스터 운영

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
┌─────────┐   ┌────────────┐   ┌──────────────┐   ┌──────────┐
│  Login  │──▶│ CEO Select │──▶│  Difficulty  │──▶│   Main   │
│  Page   │   │    Page    │   │    Select    │   │   Game   │
└─────────┘   └────────────┘   └──────────────┘   └──────────┘
                                                          │
                                                          ▼
                                                    ┌──────────┐
                                              ┌────▶│Bankruptcy│
                                              │     └──────────┘
                                              │
                                              │     ┌──────────┐
                                              └────▶│  Ending  │
                                                    └──────────┘
```

---

## 📅 개발 일정

| 주차 | 목표 |
|------|------|
| **1주차** | 게임 기획 확정, 빅데이터 아키텍처 설계 (HDFS/Spark 클러스터) |
| **2주차** | 웹게임 기본 루프 구현, 데이터 수집/전처리 파이프라인 구축 |
| **3주차** | Spark 월간 리포트 생성 → 게임 API 제공, 랜덤 이벤트 구현 |
| **4주차** | 밸런싱 & 리포트 시각화, 클러스터 최적화, 최종 배포 |

---

## 👥 팀 소개

**남남북녀** (6명)

| 역할 | 인원 | 담당 업무 |
|------|------|-----------|
| **Frontend** | 3명 | UI/UX, 리포트 시각화, 플레이어 인터랙션 |
| **Backend** | 2명 | 게임 서버, RESTful API, DB 관리 |
| **Data Engineer** | 1명 | Spark/Hadoop 데이터 처리, 리포트 생성 |

---

## 🚀 기대 효과

- 📊 **현실 데이터 반영**: 실제 경제/노동/기후 데이터를 분산 처리 후 리포트로 제공
- 🎮 **데이터+게임 융합**: 데이터 엔지니어링과 게임 디자인을 결합한 실험적 프로젝트
- 🔄 **높은 리플레이성**: 분산 데이터 기반이라 매 플레이마다 다른 패턴 등장

---

## 📄 라이선스

이 프로젝트는 SSAFY 13기 특화 프로젝트로 개발되었습니다.

---
