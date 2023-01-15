# 🥩 Weat (Back-End)
### Back-End Team Members

[👑 MJ Choi (Judy) (Project Manager)](https://github.com/Judy-Choi), [SW Park](https://github.com/Jetkick)

<br>
<br>

## 💻 Tech Stack

Back-End
<img src="https://img.shields.io/badge/Node.js-339933?style=flat&amp;logo=Node.js&amp;logoColor=white">
<img src="https://img.shields.io/badge/Nodemon-76D04B?style=flat&amp;logo=Nodemon&amp;logoColor=white">
<img src="https://img.shields.io/badge/Express-000000?style=flat&amp;logo=Express&amp;logoColor=white">
<img src="https://img.shields.io/badge/MySQL-4479A1?style=flat&amp;logo=MySQL&amp;logoColor=white">
<img src="https://img.shields.io/badge/JWT-CC6699?style=flat&amp;logo=JSON&amp;logoColor=white">
<img src="https://img.shields.io/badge/Dbmate-009DC7?style=flat&amp;logo=Bcrypt&amp;logoColor=white">
<img src="https://img.shields.io/badge/Bcrypt-CA424?style=flat&amp;logo=Bcrypt&amp;logoColor=white">

Common
<img src="https://img.shields.io/badge/Git-F05032?style=flat&amp;logo=Git&amp;logoColor=white">
<img src="https://img.shields.io/badge/GitHub-181717?style=flat&amp;logo=GitHub&amp;logoColor=white">
<img src="https://img.shields.io/badge/Prettier-F7B93E?style=flat&amp;logo=prettier&amp;logoColor=white">
<img src="https://img.shields.io/badge/RestfulAPI-F7533E?style=flat&amp;logo=RestfulAPII&amp;logoColor=white">
<img src="https://img.shields.io/badge/VSCode-007ACC?style=flat&amp;logo=Visual Studio Code&amp;logoColor=white">
<img src="https://img.shields.io/badge/Postman-FF6C37?style=flat&amp;logo=Postman Code&amp;logoColor=white">

<br>
<br>

## 🛠️ Dev Details
### 👨‍👩‍👧‍👦 Users
#### Sign Up
- Bcypt를 사용하여 비밀번호를 암호화하여 DB에 저장
- 정규표현식을 사용하여 비밀번호의 보안성을 높임. 
- 
#### Login
- Bcrypt
암호화되어 저장된 비밀번호를 복호화하여 유저가 입력한 비밀번호와 DB 내 저장된 비밀번호를 비교하고, 로그인 성공 시 JWT를 발급
유저 정보 불러오기: JWT 토큰을 사용하여 해당 유저의 이름과 보유하고 있는 포인트를 조회

<br>

### 🍖 Products
#### Main page
#### Category page
#### Detail page상세 페이지(한 상품 불러오기): 한 상품의 세부 정보들을 볼 수 있도록 함

<br>

### 🛒 Carts

모든 API에서 JWT 사용하여 유저 확인

장바구니 목록: 해당 유저의 장바구니 목록을 조회.
장바구니 넣기: UPSERT 구문을 사용하여 한 쿼리 내에서 INSERT와 UPDATE가 동시에 이루어지도록 한 메소드 내에서 구현.
수량 변경: 장바구니 내 상품의 수량이 변경되는 것이 DB에 바로 UPDATE 될 수 있도록 구현.
장바구니 빼기: 한 개 혹은 한 개 이상의 상품을 장바구니에서 삭제하는 것을 한 메소드에서 구현.

<br>

### 💳 Orders
모든 API에서 JWT 사용하여 유저 확인
결제 완료: 주문이 이루어진 후의 쿼리들을 트랜잭션을 사용하여 DB 내 데이터의 CRUD가 부분적으로 실행되거나 중단되지 않도록 안정성을 보장.
결제 취소: 결제 취소 후 환불까지의 쿼리를 트랜잭션을 사용하여 DB 데이터의 안정성을 보장.
주문 목록: 해당 유저의 모든 주문 목록을 조회함.

<br>
<br>

## 📑 API Documentation
[Postman Link](https://documenter.getpostman.com/view/24998473/2s8Z76x9km)

<br>
<br>

## 🤔 Future Works
- JWT is too weak...
>- 💡 We need to use ......

- Our DB are in each member's local...
>- Can't share same DB & can't test our BE module in the same environment
>- 💡 Let's try AWS next time!
