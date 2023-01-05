const userService = require("../services/userService");
const { asyncErrorHandler } = require("../middlewares/errorHandling");

// 1. 회원가입
const signUp = asyncErrorHandler(async (req, res) => {
  // 가입 필수 정보 : 메일주소, 비밀번호, 실명, 핸드폰번호
  const { email, password, name, mobile } = req.body;

  if (!email || !password || !name || !mobile) {
    const err = new Error("KEY_ERROR");
    err.statusCode = 400;
    throw err;
  }

  await userService.signUp(email, password, name, phoneNumber);
  res.status(201).json({ message: "SIGNUP_SUCCESS" });
});

// 2. 로그인
const login = asyncErrorHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    const err = new Error("KEY_ERROR");
    err.statusCode = 400;
    throw err;
  }

  jwtToken = await userService.login(email, password);
  return res.status(201).json({ accessToken: jwtToken });
});

module.exports = {
  signUp,
  login,
};
