const myPageService = require("../services/myPageService");
const { asyncErrorHandler } = require("../middlewares/errorHandling");

// 상세내역
// 주문내역 (주문/결제 조회 API 호출)
// 적립금내역 (이전 사용내역까지?) (적립금 히스토리 테이블 파야 함)
// 개인정보관리 (사용자 정보 조회(read) / 수정(update) 가능하게?)

// 1. 사용자 기본정보 조회
const userInfo = asyncErrorHandler(async (req, res) => {
  const userId = req.userId;

  if (!userId) {
    const err = new Error("PARAMS_ERROR");
    err.statusCode = 400;
    throw err;
  }

  const userInfoObj = await myPageService.userInfo(userId);
  return res.status(201).json(userInfoObj);
});

// 2. 개인정보관리
// 2-1.사용자 정보 조회
const readPrivateInfo = asyncErrorHandler(async (req, res) => {
  const userId = req.userId;

  if (!userId) {
    const err = new Error("PARAMS_ERROR");
    err.statusCode = 400;
    throw err;
  }

  const [privateInfoObj] = await myPageService.readPrivateInfo(userId);
  return res.status(201).json(privateInfoObj);
});

// 2-2. 사용자 정보 수정
const updatePrivateInfo = asyncErrorHandler(async (req, res) => {
  const userId = req.userId;
  const { email, password, userName, mobile } = req.body;

  if (!userId) {
    const err = new Error("PARAMS_ERROR");
    err.statusCode = 400;
    throw err;
  }

  if (!email || !password || !userName || !mobile) {
    const err = new Error("KEY_ERROR");
    err.statusCode = 400;
    throw err;
  }

  await myPageService.updatePrivateInfo(
    userId,
    email,
    password,
    userName,
    mobile
  );
  res.status(201).json({ message: "UPDATE_SUCCESS" });
});

module.exports = {
  userInfo,
  readPrivateInfo,
  updatePrivateInfo,
};
