require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userDao = require("../models/userDao");

const saltRounds = 12;
const secretKey = process.env.SECRET_KEY; // (3)

// 1. 회원가입
const signUp = async (email, password, name, mobile) => {
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
    mobile
  );

  return createUser;
};

module.exports = {
  signUp,
};
