require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userDao = require("../models/userDao");

const saltRounds = 12;
const secretKey = process.env.SECRET_KEY; // (3)

// 1. 회원가입
const signUp = async (email, password, name, phoneNumber) => {
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
    name,
    phoneNumber
  );

  return createUser;
};

// 2. 로그인
const login = async (email, password) => {
  // password validation using REGEX
  const pwValidation = new RegExp(
    "^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,20})"
  );
  if (!pwValidation.test(password)) {
    const err = new Error("PASSWORD_IS_NOT_VALID");
    err.statusCode = 409;
    throw err;
  }

  // 2-1. DB로부터 해쉬된 패스워드를 가져옴
  const hashedPassword = await userDao.getHashedPassword(email);
  console.log(hashedPassword);

  // 2-2. 입력받은 패스워드 != 해쉬된 패스워드면 에러처리
  if (!(await bcrypt.compare(password, hashedPassword))) {
    const err = new Error("PASSWORD_IS_NOT_VALID");
    err.statusCode = 401;
    throw err;
  }

  // 2-3. DB로부터 user ID 받아 옴
  const userId = await userDao.getUserID(email);

  // 2-4. JWT 토큰 생성 & 토큰 리턴
  const payLoad = { userId: userId };
  const jwtToken = jwt.sign(payLoad, secretKey); // (4)

  return jwtToken;
};

module.exports = {
  signUp,
  login,
};
