require("dotenv").config();
const myPageDao = require("../models/myPageDao");

// 메일주소를 수정할 경우 이미 존재하는 사용자인지 확인
const userDao = require("../models/userDao");

// 비밀번호를 수정할 경우 필요한 암호화 모듈 & 키 값
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 12;
const secretKey = process.env.SECRET_KEY; // (3)

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

const readPrivateInfo = async (userId) => {
  return await myPageDao.readPrivateInfo(userId);
};

const updatePrivateInfo = async (userId, email, password, userName, mobile) => {
  // 이메일이 이미 DB에 있는지 확인한다.
  const userData = await userDao.getUserData(email);

  if (userData.length) {
    const err = new Error("ALREADY_SIGNED_UP");
    err.statusCode = 409;
    throw err;
  }

  // 비밀번호 검증
  // password validation using REGEX
  const pwValidation = new RegExp(
    "^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,20})"
  );
  if (!pwValidation.test(password)) {
    const err = new Error("PASSWORD_IS_NOT_VALID");
    err.statusCode = 409;
    throw err;
  }

  // 비번은 bcrypt 로 암호화해서 저장한다.
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  await myPageDao.updatePrivateInfo(userId);
};

module.exports = {
  userInfo,
  readPrivateInfo,
  updatePrivateInfo,
};
