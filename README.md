<div align="center">
  
# 🎬 KPlex : Movie Information App

[![React](https://img.shields.io/badge/React-19.2.1-61DAFB?style=flat-square&logo=react&logoColor=white)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![React Router](https://img.shields.io/badge/React_Router-7.1.5-CA4245?style=flat-square&logo=react-router&logoColor=white)](https://reactrouter.com/)
[![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=flat-square&logo=supabase&logoColor=white)](https://supabase.io/)
[![TMDB API](https://img.shields.io/badge/TMDB_API-01B4E4?style=flat-square&logo=themoviedb&logoColor=white)](https://www.themoviedb.org/)

**TMDB API**와 **Supabase**를 활용하여 제작한 영화 정보 및 커뮤니티 애플리케이션입니다.

[**🔗 라이브 데모 보러가기 (https://kplex.pages.dev)**](https://kplex.pages.dev) 
</div>

<br/>

## 📸 Preview

| 홈 (Home) | 상세 정보 (Detail) | 리스트 (List) | 검색 (Search) |
| :---: | :---: | :---: | :---: |
| <img src="https://raw.githubusercontent.com/kimkee/kimkee/main/img/tmdb/ss_01.jpg" width="220px" /> | <img src="https://raw.githubusercontent.com/kimkee/kimkee/main/img/tmdb/ss_02.jpg" width="220px" /> | <img src="https://raw.githubusercontent.com/kimkee/kimkee/main/img/tmdb/ss_03.jpg" width="220px" /> | <img src="https://raw.githubusercontent.com/kimkee/kimkee/main/img/tmdb/ss_04.jpg" width="220px" /> |

<br/>

## ✨ Key Features

- **영화 탐색**: 인기 영화, 추천 영화, 장르별 영화 리스트 제공
- **직관적인 평점 UI**: 10점 만점의 데이터를 5점 만점의 **별점 UI(반 스크롤 포함)** 로 변환하여 시각화 구현
- **검색 기능**: 실시간 영화 검색 기능
- **회원 인증 (Supabase)**: 빠르고 안전한 소셜 로그인 (Google, Kakao 등) 지원
- **마이페이지 기능**: 관심 영화 스크랩 및 보관 기능
- **커뮤니티 (리뷰)**: 영화에 대한 리뷰 작성, 수정 및 삭제 기능

<br/>

## 🛠️ Tech Stack

- **Frontend**: `React (v18)`, `React-Router-Dom`, `Axios`, `Swiper`
- **Backend & Auth / DB**: `Supabase`
- **Build Tool**: `Vite`
- **External API**: `TMDB API`

<br/>

## 🚀 Getting Started

### Prerequisites
- Node.js 설치 
- 환경 변수 세팅 (`.env` 파일에 TMDB API Key 및 Supabase API 정보 입력 필요)

### Installation & Run

```bash
# 1. 패키지 설치
$ npm install

# 2. 로컬 서버 실행
$ npm run dev

# 3. 배포용 빌드 (Production)
$ npm run build
```

<br/>

## 📚 API Reference (TMDB)

해당 프로젝트는 [TMDB API](https://developer.themoviedb.org/docs)를 기반으로 작성되었습니다.
- **현재 상영작 (Now Playing)**: `/movie/now_playing`
- **인기 영화 (Popular)**: `/movie/popular`
- **장르 (Genre)**: `/genre/movie/list`
- **영화 검색 (Search)**: `/search/movie`
- **영화 상세 스태프 크레딧**: `/movie/{movie_id}/credits`
- **영화 발견 (Discover)**: `/discover/movie`

<br/>

## 🔗 References & Tools
- [영화 API 사용법 참고 (Velog)](https://velog.io/@letgodchan0/TIL-%EC%98%81%ED%99%94-API-%EC%82%AC%EC%9A%A9%EB%B2%95)
- [React에서 Axios 사용하기 (Velog)](https://velog.io/@mgk8609/React%EC%97%90%EC%84%9C-Axios-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0)
- [JSON View Chrome Extension](https://chrome.google.com/webstore/detail/jsonview/gmegofmjomhknnokphhckolhcffdaihd)
