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
### 🗄️ DataBase
- ERD를 이용한 DB 설계 및 구현
- MySQL WorkBench를 이용한 데이터 관리

<br>

### 👨‍👩‍👧‍👦 Users
#### Sign Up
- Bcypt를 사용하여 비밀번호를 암호화하여 DB에 저장
  - 사용자의 계정 정보를 더욱 안전하게 관리
- 정규표현식을 사용하여 비밀번호 생성 규칙을 만족하는지 빠르게 확인

#### Login
- 로그인 성공 시 서버에서 secret key 를 이용하여 JWT 생성
- 로그인 후, 사용자 인증/인가에 패스워드 대신 JWT 를 사용하여 보안성 향상

<br>

### 🍖 Products
#### Main page
- 판매량을 기준으로 내림차순 정렬 후 상위 6개 제품만 DB에서 추출
- 코드 재사용성 증대
  - Main 및 Category 페이지에서 비슷한 SQL 쿼리가 반복하여 사용되는 것을 최소화하고자 중복되는 쿼리는 defaultQuery 문자열로 한 번만 선언한 뒤 각 페이지에서 필요한 추가 쿼리를 덧붙여 사용

#### Category page
- 쿼리 파라미터를 이용하여 FE에서 요청하는 카테고리 페이지 정보를 효율적으로 요청받음
- FE 의 Page Nation 을 효과적으로 지원하기 위해 DB에서 데이터 추출 시 Page Nation 단위만큼 6개씩만 데이터 추출하여 FE에 제공
  - 한번에 너무 많은 데이터를 전달할 경우 발생하는 트래픽 과부하 및 수행 시간을 줄이는 효과도 있음.

#### Detail page
- 특정 제품의 세부 정보 조회
- (BE 한정) 상품 리뷰 조회 기능 구현

<br>

### 🛒 Carts
모든 API가 수행되기 전에 로그인한 사용자의 JWT 를 검증하여 사용자 인증 후 인가.

#### 장바구니 추가/수량 변경
- UPSERT 구문을 사용하여 하나의 API 및 하나의 쿼리 내에서 INSERT와 UPDATE가 동시에 이루어지도록 구현

#### 장바구니 조회 / 삭제
INNER JOIN 쿼리를 조합하여 JWT 단 하나만으로 사용자 장바구니의 모든 정보를 조회할 수 있도록 구현 (정보 노출 최소화 및 보안 강화)

<br>

### 💳 Orders
모든 API가 수행되기 전에 로그인한 사용자의 JWT 를 검증하여 사용자 인증 후 인가.

#### 주문/결제
트랜잭션을 사용하여 DB 내 데이터의 CRUD가 부분적으로 실행되거나 중단되지 않도록 안정성 보장
#### 주문 목록 조회
INNER JOIN 쿼리를 조합하여 단 하나의 주문정보(주문 ID)만으로 사용자의 모든 주문목록을 조회할 수 있도록 구현 (정보 노출 최소화)

<br>

## 📑 API Documentation
[Postman Link](https://documenter.getpostman.com/view/24998473/2s8Z76x9km)

<br>

## 🤔 아쉬웠던 점 & 개선방법
### JWT 만으로는 보안상 취약하다
- 💡 추가적인 보안 기능을 도입한다. (MFA)
- 💡 JWT 이외에 Refresh token 을 추가로 사용한다.

### DB가 팀 멤버 각각의 로컬에 존재한다
- 완전히 동일한 DB를 사용할 수 없어서 테스트 환경에 차이가 난다
  - 💡 AWS RDS 나 S3 를 써보자!

### 비효율적인 FE-BE 연결 테스트
- 한 번에 서버 1개만 켤 수 있었다
- 관리자(멘토) 가 PR에 피드백을 주고 Main 브랜치에 merge 할 때까지 기다려야 했다.
- 기능이 각 브랜치에 나누어 구현되어 있으므로 서로 다른 기능을 테스트하기 위해서는 브랜치를 계속 전환해야 했다.
  - 💡 포트 번호를 바꿔서 서버를 켠다.
  - 💡 테스트 브랜치를 한 개 생성하여 모든 코드를 통합하여 사용한다.

### MySQL 쿼리만을 이용한 API 작성  
- 현업에서는 순수한(?) MySQL 쿼리만을 사용하여 개발하지 않는다던데...!?
- 💡 MyBatis
  - Java(Spring) 에서 DB 연동을 도와주는 프레임워크
  - 쿼리 기반 웹 애플리케이션을 개발할 때 가장 많이 사용되는 SQL 매퍼(Mapper) 프레임워크
  - MySQL 쿼리와 함께 사용하며, MySQL 에 없는 쉬운 방법이 많음
  - 같은 기능을 구현하더라도 MySQL 만을 사용하여 구현하는 것보다 쉬움
- 💡 Query Builder
  - TypeORM 의 가장 강력한 기능 중 하나
  - DB 를 더욱 쉽게 다룰 수 있고 가독성이 좋고 효율적
  - 41기 동기들은 Query Builder 를 사용하지 않고 MySQL low query 만 사용했지만 현업에서는 Query Builder 를 많이 사용한다고...

말그대로 쿼리를 빌드한다

### 개발 완성도
- 개발 후 테스트해보니 버그가 너무 많다 🐞
- 💡 개발 단계에서 Jest 등을 이용하여 테스트 코드를 작성하고 테스트한다.

### 코드가 더 클린했으면 좋겠다
- 같은 백엔드 팀원이 내 코드를 쉽게 이해할 수 없었다 (가끔은 나도 내 코드를 알아보기 쉽지 않았다 😂)
- 💡 리팩토링!
  - ex) 코드를 클래스로 분리한다 (모듈화)
  - ex) 메소드(API) 이름을 좀더 가독성 좋게 바꾼다
