require("dotenv").config();
const myPageDao = require("../models/myPageDao");

// 1. 사용자 기본정보 조회
const userInfo = async (userId) => {
  const [userInfoObj] = await myPageDao.userInfo(userId);

  // created_at 을 이용해 userId 를 4자리-4자리-4자리-4자리 회원번호로 변환
  let time2number = userInfoObj.userNumber;
  time2number += userId.toString();

  const RegExp = /[^0-9]/g;
  time2number = time2number.replace(RegExp, "");
  time2number = time2number.match(/[0-9●]{1,4}/g)?.join("-");

  userInfoObj.userNumber = time2number;

  return userInfoObj;
};

// 2. 주문내역 (cart 모듈에 구현한 주문/결제 조회 API 호출)

// 3. 적립금내역 (이전 사용내역까지?)
// 간단히 구현하려면 orders 테이블을 조회하여 total_price 만 가져와서 뿌려도 됨.

module.exports = {
  userInfo,
};
