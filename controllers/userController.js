const userService = require("../services/userService");

// 1. 회원가입
const signUp = async (req, res) => {
  try {
    // 가입 필수 정보 : 메일주소, 비밀번호, 실명, 핸드폰번호
    const { email, password, name, phoneNumber } = req.body;

    if (!email || !password || !name || !phoneNumber) {
      const err = new Error("KEY_ERROR");
      err.statusCode = 400;
      throw err;
    }

    await userService.signUp(email, password, name, phoneNumber);
    return res.status(201).json({
      message: "SIGNUP_SUCCESS",
    });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

// 2. 로그인
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      const err = new Error("KEY_ERROR");
      err.statusCode = 400;
      throw err;
    }

    jwtToken = await userService.login(email, password);
    return res.status(201).json({ accessToken: jwtToken });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

module.exports = {
  signUp,
  login,
};
