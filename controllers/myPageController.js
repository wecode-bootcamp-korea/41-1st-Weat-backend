const myPageService = require("../services/myPageService");
const { asyncErrorHandler } = require("../middlewares/errorHandling");

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

// 2. 주문내역 (cart 모듈에 구현한 주문/결제 조회 API 호출)
// 추후 구현 담당 : 최민주

module.exports = {
  userInfo,
};
