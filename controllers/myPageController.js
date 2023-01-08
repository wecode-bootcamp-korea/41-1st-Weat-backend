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

// 3. 적립금내역 (이전 사용내역까지?)
// 간단히 구현하려면 orders 테이블을 조회하여 total_price 만 가져와서 뿌려도 됨.

module.exports = {
  userInfo,
};
