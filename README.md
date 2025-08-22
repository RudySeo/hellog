

# 식단 운동 일지 등록하기
다이어트 및 운동을 하는 사람들에게 도움을 주기 위하여
Hellog 만들었습니다

Workout: 운동 종류, 칼로리, 운동 소요시간 

Melas:음식 종류, 식사 타입(아침, 점심, 저녁)

칼로리 입력하여 Modal 창을 활용해서 댓글 및 사용자가 입력한 데이터를 확인할 수 있습니다


## 실서버 링크
준비중

## 기능 설명 

* 로그인 및 회원 가입 : Node.js Express API 설계해서 Login, Register 구현 했습니다  

* 이미지 업로딩 기능 : Meals 이미지 등록, multer 라이브러리 사용하여 uploads 폴더에 저장하도록 만들

* 스타일 Scss : Scss 사용하여 웹디자인 구성 하고 수정시 효율성을 위하여 컴포넌트화 하여 파일을 만들었습니다

* Redux-ToolKit : 리덕스 툴킷을 로그인,Total_list, 사용해서 중앙 처리를 이용했습니다

* 비동기 처리 - 비동기 적인 중앙 처리 부분은 Redux-Thunk 사용하여 

* 모바일, 테블릿, PC 크기에 따른 반응형 렌더링 구현

* MongoDB로 데이터 관리, Express에서 mongoose로 쿼리 실행


## 영상
준비중

## 실행 방법
```
$https://github.com/DongKwonSeo/portfolio/
// 백서버 실행
$ cd back 
$ npm run dev

//프론트 실행
$ cd front
$ yarn start
```
# 서버(DB&API) 명세서
### * DB 명세
------------------
-------
### * API 명세
 * user
    * 유저등록
      * POST api/users
    * 유저조회
       * GET api/users
    * 로그인
      * POST api/users/login
    * 로그아웃
      * GET api/users/logout
    
 * meals
    * 식단 리스트 조회
        * GET api/meals
    * 식단 조회
        * GET api/meals:id
    * 식단 등록
         * POST api/meals
    * 식단 수정
         * PUT api/meals/:id
    * 식단 이미지 등록
         * POUST api/meals/uploadfiles
 * workout
    * 운동 리스트 조회
       * GET api/workout
    * 운동 조회
       * GET api/workout/:id
    * 운동 등록
       * POST api/workout
    * 운동 수정
       * PUT api/workout/:id
    

    

## References
* [페이지기획서](https://xd.adobe.com/view/5ad807c2-7465-4ec9-9257-b4da75e81bc4-0f8b/) 
* [기능 설명서](https://www.notion.so/97a1417317de469da0d3289e54ca17ee)
* DB 명세서
* [API 명세서](https://www.notion.so/API-d8e57069feae44d299991c6c65a71566) 

