const userService = require("../services/userService");

// 1. 회원가입
const signUp = async (req, res) => {
  try {
    // 가입 필수 정보 : 메일주소, 비밀번호, 실명, 핸드폰번호
    const { email, password, name, mobile } = req.body;

    if (!email || !password || !name || !mobile) {
      const err = new Error("KEY_ERROR");
      err.statusCode = 400;
      throw err;
    }

    await userService.signUp(email, password, name, mobile);
    return res.status(201).json({
      message: "SIGNUP_SUCCESS",
    });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

module.exports = {
  signUp,
};
