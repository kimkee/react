# React + TMDB API + Supabase
 

## https://kplex.pages.dev
 


<br>

## 기능구현
- 인기영화,추천영화, 장르별 리스트
- 10점만점의 추천정보 점수를 5점 만점의 별점UI로 추가구현
- 영화 검색 기능 구현
- Supabase 로그인
- 관심영화 스크랩기능
- 영화 리뷰 쓰기,수정,삭제

|  홈 | 상세 | 리스트 | 검색 |
| :-: | :-: | :-: | :-: |
| <img src="https://raw.githubusercontent.com/kimkee/kimkee/main/img/tmdb/ss_01.jpg" width="200px" align="top"> | <img src="https://raw.githubusercontent.com/kimkee/kimkee/main/img/tmdb/ss_02.jpg" width="200px" align="top"> | <img src="https://raw.githubusercontent.com/kimkee/kimkee/main/img/tmdb/ss_03.jpg" width="200px" align="top"> | <img src="https://raw.githubusercontent.com/kimkee/kimkee/main/img/tmdb/ss_04.jpg" width="200px" align="top"> |

<br>

## React Version
- "react": "^18.2.0",
- "react-router-dom": "^6.8.1",
- "axios": "^1.3.3",
- "swiper": "^9.0.3", (https://swiperjs.com/react)
## Tools

- JSON View  https://chrome.google.com/webstore/detail/jsonview/gmegofmjomhknnokphhckolhcffdaihd<br>
크롬에서 JSON API 미리보기기능
- 


## Reference

- [영화 API 사용법](https://velog.io/@letgodchan0/TIL-%EC%98%81%ED%99%94-API-%EC%82%AC%EC%9A%A9%EB%B2%95)
- [React에서 Axios 사용하기](https://velog.io/@mgk8609/React%EC%97%90%EC%84%9C-Axios-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0)

<br>

## TMDB API

- 상영작
https://api.themoviedb.org/3/movie/now_playing?language=ko&region=kr&page=1&sort_by=release_date.desc&api_key=[API_KEY]

- Discover
https://api.themoviedb.org/3/discover/movie?language=ko&region=kr&page=1&sort_by=release_date.desc&api_key=[API_KEY]

- 인기작
https://api.themoviedb.org/3/movie/popular?language=ko&region=kr&api_key=[API_KEY]

- 장르
https://api.themoviedb.org/3/genre/movie/list?language=ko&region=kr&api_key=[API_KEY]

- 영화상세
https://api.themoviedb.org/3/movie/496243/credits?&region=kr&language=ko&api_key=[API_KEY]

- 검색
https://api.themoviedb.org/3/search/movie?language=ko&region=kr&query=기생충&api_key=[API_KEY]
- 이미지
https://image.tmdb.org/t/p/w200/jjHccoFjbqlfr4VGLVLT7yek0Xn.jpg
<br><br><br><br>


## Project setup
``` 
npm create vite@latest
```

### Compiles and hot-reloads for development
```
npm run dev
```

### Compiles and minifies for production
```
npm run build
```
# Vite

- https://vitejs.dev/

- https://vitejs-kr.github.io/


<!-- # Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify) 

--> 
