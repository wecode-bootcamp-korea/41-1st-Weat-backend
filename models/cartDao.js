const { myDataSource } = require("./myDataSource");

// 1. 장바구니에 상품 추가
// await cartDao.create(itemId, thick, count);
const createCart = async (userId, productId, productOptionId, quantity) => {
  try {
    return await myDataSource.query(
      `INSERT INTO carts(
		    quantity, user_id, product_id, product_option_id, 
		) VALUES (?, ?, ?, ?)
    UPDAT;
		`,
      [quantity, userId, productId, productOptionId]
    );
  } catch (err) {
    console.log(err);
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 500;
    throw error;
  }
};

// 2. 장바구니 상품 조회
// DB 에서 꺼낼 것 : user_id 로 row 조회 -> 상품 id, 두께, 수량 조회
// 꺼낸 상품 id 를 이용해 해당 상품의 썸네일, name, 개당 가격 조회
// 최종 리턴 배열 : [{썸네일, 상품명, 두께, 수량, 수량 * 개당 가격}, {}...]
const readCart = async (userId) => {
  try {
    return await myDataSource.query(
      `SELECT
        users.id AS userId,
        users.profileImageUrl AS userProfileImage,
        JSON_ARRAYAGG(
          JSON_OBJECT(
            "postingId", posts.id,
            "posingImageUrl", imageUrl,
            "postingContent", posts.content
          )
        ) AS postings
        FROM posts
        INNER JOIN users ON users.id = posts.userId
        WHERE users.id = ?
        GROUP BY users.id;`,
      [userId]
    );
  } catch (err) {
    console.log(err);
    const error = new Error("DB_SELECT_FAILED");
    error.statusCode = 500;
    throw error;
  }
};

// 3. 장바구니 상품 수정 (주문수량 증가/감소)
// DB 생성 후 아래 쿼리문 수정할 것.
const updateCart = async (count, itemId, userId) => {
  try {
    // 장바구니 수량 수정
    await myDataSource.query(
      `UPDATE posts
        SET
        content = ?
        WHERE userId = ? AND id = ?
          `,
      [count, itemId, userId]
    );

    // 만약 프론트에 수정된 정보를 리턴하지 않는다면 아래 블록 삭제
    // 수정된 장바구니 수량 리턴
    return await myDataSource.query(
      `SELECT
          posts.userId AS userId,
          users.name AS userName,
          posts.id AS postingId,
          posts.title AS postingTitle,
          posts.content AS postingContent
        FROM posts
        INNER JOIN users ON users.id = posts.userId
        WHERE posts.id = ?`,
      [itemId]
    );
  } catch (err) {
    console.log(err);
    const error = new Error("DB_SELECT_FAILED");
    error.statusCode = 500;
    throw error;
  }
};

const getStock = async (productId) => {
  try {
    // item DB로부터 itemId 에 해당하는 재고(stock) 을 가져옴
    const [{ stock }] = await myDataSource.query(
      `SELECT stock
        FROM products 
        WHERE product_id = ?;
        `,
      [productId]
    );
    return stock;
  } catch (err) {
    const error = new Error("GET_STOCK_FAILED");
    error.statusCode = 500;
    throw error;
  }
};
// 4. 장바구니 상품 삭제
const deleteCart = async (cartId) => {
  try {
    await myDataSource.query(
      `DELETE FROM posts
          WHERE posts.id = ${cartId}
          `
    );
  } catch (err) {
    console.log(err);
    const error = new Error("DB_DELETE_FAILED");
    error.statusCode = 500;
    throw error;
  }
};

module.exports = {
  createCart,
  readCart,
  updateCart,
  deleteCart,
  getStock,
};
