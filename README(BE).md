# 🥩 Weat (Back-End)
### Back-End 팀원

[👑 최민주 (Project Manager)](https://github.com/Judy-Choi), [SW Park](https://github.com/Jetkick)

<br>

## 💻 기술 스택

Back-End : 
<img src="https://img.shields.io/badge/Node.js-339933?style=flat&amp;logo=Node.js&amp;logoColor=white">
<img src="https://img.shields.io/badge/Nodemon-76D04B?style=flat&amp;logo=Nodemon&amp;logoColor=white">
<img src="https://img.shields.io/badge/Express-000000?style=flat&amp;logo=Express&amp;logoColor=white">
<img src="https://img.shields.io/badge/MySQL-4479A1?style=flat&amp;logo=MySQL&amp;logoColor=white">
<img src="https://img.shields.io/badge/JWT-CC6699?style=flat&amp;logo=JSON&amp;logoColor=white">
<img src="https://img.shields.io/badge/Dbmate-009DC7?style=flat&amp;logo=Bcrypt&amp;logoColor=white">
<img src="https://img.shields.io/badge/Bcrypt-CA424?style=flat&amp;logo=Bcrypt&amp;logoColor=white">

Common : 
<img src="https://img.shields.io/badge/Git-F05032?style=flat&amp;logo=Git&amp;logoColor=white">
<img src="https://img.shields.io/badge/GitHub-181717?style=flat&amp;logo=GitHub&amp;logoColor=white">
<img src="https://img.shields.io/badge/Prettier-F7B93E?style=flat&amp;logo=prettier&amp;logoColor=white">
<img src="https://img.shields.io/badge/RestfulAPI-F7533E?style=flat&amp;logo=RestfulAPII&amp;logoColor=white">
<img src="https://img.shields.io/badge/VSCode-007ACC?style=flat&amp;logo=Visual Studio Code&amp;logoColor=white">
<img src="https://img.shields.io/badge/Postman-FF6C37?style=flat&amp;logo=Postman Code&amp;logoColor=white">

<br>

## 🛠️ 구현 상세

### 👨‍👩‍👧‍👦 Users
#### Sign Up
- Bcypt를 사용하여 비밀번호를 암호화하여 DB에 저장
>- 사용자의 정보를 더욱 안전하게 관리할 수 있다
- 정규표현식을 사용하여 비밀번호 생성 규칙을 만족하는지 빠르게 확인

#### Login
- 로그인 성공 시 서버에서 secret key 를 이용하여 JWT 생성
>- 로그인 후, 사용자 인증/인가에 패스워드 대신 JWT 를 이용하여 보안성 향상

<br>

### 🍖 Products
#### Main page
- 판매량을 기준으로 상위 6개 제품만 DB에서 추출
#### Category page
- 쿼리 파라미터를 이용하여 다양한 필터링 조건 충족?
- Page Nation 을 지원하기 위해 DB에서 Page Nation 단위인 6개씩만 데이터 추출
#### Detail page
- 한 상품의 세부 정보들을 볼 수 있도록 함

<br>

### 🛒 Carts

모든 API에서 JWT 사용하여 유저 확인
#### 장바구니 추가/수량 변경
- UPSERT 구문을 사용하여 한 쿼리 내에서 INSERT와 UPDATE가 동시에 이루어지도록 한 메소드 내에서 구현.
- 수량 변경: 장바구니 내 상품의 수량이 변경되는 것이 DB에 바로 UPDATE 될 수 있도록 구현.
#### 장바구니 조회 / 삭제

<br>

### 💳 Orders
모든 API에서 JWT 사용하여 유저 확인
결제 완료: 주문이 이루어진 후의 쿼리들을 트랜잭션을 사용하여 DB 내 데이터의 CRUD가 부분적으로 실행되거나 중단되지 않도록 안정성을 보장.
결제 취소: 결제 취소 후 환불까지의 쿼리를 트랜잭션을 사용하여 DB 데이터의 안정성을 보장.
주문 목록: 해당 유저의 모든 주문 목록을 조회함.

<br>

## 📑 API Documentation
[Postman Link](https://documenter.getpostman.com/view/24998473/2s8Z76x9km)

<br>

## 🤔 아쉬웠던 점 & 개선방법
### JWT 만으로는 보안상 취약하다
>- 💡 추가적인 보안 기능을 도입한다. (MFA)
>- 💡 JWT 이외에 Refresh token 을 추가로 사용한다.

### DB가 팀 멤버 각각의 로컬에 존재한다
- 완전히 동일한 DB를 사용할 수 없어서 테스트 환경에 차이가 난다
>- 💡 AWS RDS 나 S3 를 써보자!

### 비효율적인 FE-BE 연결 테스트
- 한 번에 서버 1개만 켤 수 있었다
- 관리자(멘토) 가 PR에 피드백을 주고 Main 브랜치에 merge 할 때까지 기다려야 했다.
- 기능이 각 브랜치에 나누어 구현되어 있으므로 서로 다른 기능을 테스트하기 위해서는 브랜치를 계속 전환해야 했다.
>- 💡 포트 번호를 바꿔서 서버를 켠다.
>- 💡 테스트 브랜치를 한 개 생성하여 모든 코드를 통합하여 사용한다.

### MySQL 쿼리만을 이용한 API 작성 
- 현업에서는 MySQL 쿼리를 쌩짜(?) 로 안 짠다한것같은데?
>- 💡 MyBatis
>- Mysql 이랑 같이 씀
>- 자바(스프링) 에서 많이 씀
>- mysql 에 없는 쉬운 방법이 많음
>- 같은 기능을 구현하더라도 쌩짜 mysql 보다 쉬움
>- 💡 Query Builder
>- TypeORM
디비 다루 ㄹ때 더 쉽고 가독성 좋고 효율적
우린 로우쿼리만 썼지 (쿼리빌더 안 쓰고)
현업에선 쿼리빌더 많이 씀
말그대로 쿼리를 빌드한다

### 개발 완성도
- 개발 후 테스트해보니 버그가 너무 많다 🐞
>- 💡 개발 단계에서 Jest 등을 이용하여 테스트 코드를 작성하고 테스트한다.

### 코드가 더 클린했으면 좋겠다
- 같은 백엔드 팀원이 내 코드를 쉽게 이해할 수 없었다 (가끔은 나도 내 코드를 알아보기 쉽지 않았다 😂)
>- 💡 리팩토링
>- 코드를 클래스로 분리
>- 함수 이름(메소드 이름 a.k.a API) 바꾼다던지…
