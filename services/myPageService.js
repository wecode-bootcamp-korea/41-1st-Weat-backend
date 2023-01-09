require("dotenv").config();
const myPageDao = require("../models/myPageDao");

// 1. 사용자 기본정보 조회
const userInfo = async (userId) => {
  const [userInfoObj] = await myPageDao.userInfo(userId);

  // created_at 즉 가입 시간을 이용해 userId 를 정육각의 회원번호 형태인 4자리-4자리-4자리-4자리 회원번호로 변환
  let time2number = userInfoObj.userNumber;
  time2number += userId.toString();

  const RegExp = /[^0-9]/g;
  time2number = time2number.replace(RegExp, "");
  time2number = time2number.match(/[0-9●]{1,4}/g)?.join("-");

  userInfoObj.userNumber = time2number;

  return userInfoObj;
};

module.exports = {
  userInfo,
};
