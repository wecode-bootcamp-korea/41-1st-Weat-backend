require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userDao = require("../models/userDao");

const saltRounds = 12;
const secretKey = process.env.SECRET_KEY; // (3)

// 1. 회원가입
const signUp = async (email, password, username, mobile) => {
  // 이미 가입된 사용자인지 확인 (메일주소가 DB에 이미 존재하는지 확인)
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

  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const createUser = await userDao.createUser(
    email,
    hashedPassword,
    username,
    mobile
  );

  return createUser;
};

// 2. 로그인
const login = async (email, password) => {
  // 이미 가입된 사용자인지 확인 (메일주소가 DB에 이미 존재하는지 확인)
  // const [{ hashedPassword, userId }] = await userDao.getUserData(email);
  const userData = await userDao.getUserData(email);

  if (!userData.length) {
    const err = new Error("INVALID_USER");
    err.statusCode = 409;
    throw err;
  }

  const { hashedPassword, userId } = userData[0];

  // password validation using REGEX
  const pwValidation = new RegExp(
    "^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,20})"
  );
  if (!pwValidation.test(password)) {
    const err = new Error("PASSWORD_IS_NOT_VALID");
    err.statusCode = 409;
    throw err;
  }

  // 2-2. 입력받은 패스워드 != 해쉬된 패스워드면 에러처리
  if (!(await bcrypt.compare(password, hashedPassword))) {
    const err = new Error("PASSWORD_IS_NOT_VALID");
    err.statusCode = 409;
    throw err;
  }

  // 2-4. JWT 토큰 생성 & 토큰 리턴
  const payLoad = { userId: userId };
  const jwtToken = jwt.sign(payLoad, secretKey); // (4)

  return jwtToken;
};

module.exports = {
  signUp,
  login,
};
