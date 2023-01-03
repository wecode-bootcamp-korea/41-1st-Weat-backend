require("dotenv").config();

const cartDao = require("../models/cartDao");

// 1. 장바구니에 상품 추가
// await cartService.create(itemId, thick, count);
const create = async (itemId, thick, count) => {
  // 1-1. DB로부터 재고 무게를 가져옴
  const stock = await cartDao.getStock(itemId);
  // 1-2. 장바구니에 담을 고기 무게보다 재고가 부족하면 품절 에러 반환
  if (thick * count > stock) {
    const err = new Error("SOLD_OUT");
    // 에러 코드는 409 가 맞을지, 다른 코드가 더 적절할지?
    err.statusCode = 409;
    throw err;
  }
  // 1-3. thick * count 즉 장바구니에 담을 고기 무게보다 재고 수가 크거나 같으면
  // 1-4. 장바구니에 고기를 담는다.
  return await cartDao.create(itemId, thick, count);
};

// 2. 장바구니 조회
const read = async (userId) => {
  return await cartDao.read(userId);
};

// 3. 장바구니 상품 수정 (주문수량 증가/감소)
const update = async (count, cartId, userId) => {
  return await cartDao.update(count, cartId, userId);
};

// // 7. 게시글 삭제
// const deletePost = async (postId) => {
//   await postDao.deletePost(postId);
// };

module.exports = {
  create,
  read,
  update,
  // delete,
};
