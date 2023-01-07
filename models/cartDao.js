const { myDataSource } = require("./myDataSource");

// 1. 장바구니 상품 추가 / 수정 (주문수량 증가/감소)
const upsertCart = async (userId, productId, productOptionId, quantity) => {
  try {
    // 장바구니 수량 수정
    await myDataSource.query(
      `INSERT INTO 
      carts(user_id, product_id, product_option_id, quantity ) 
      VALUES (?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE 
      quantity = ?;
        `,
      [userId, productId, productOptionId, quantity, quantity]
    );
  } catch (err) {
    const error = new Error("DB_SELECT_FAILED");
    error.statusCode = 500;
    throw error;
  }
};

// 2. 장바구니 상품 조회
// DB 에서 꺼낼 것 : user_id 로 row 조회 -> 상품 id, 두께, 수량 조회
// 꺼낸 상품 id 를 이용해 해당 상품의 썸네일, name, 개당 가격 조회
// 최종 리턴 배열 : [{썸네일, 상품명, 옵션, 수량, 가격}, {}...]
/*
      `SELECT 
      users.id AS userId, 
      users.profileImageUrl AS userProfileImage,
      posts.id AS postingId,
      posts.imageUrl AS postingImageUrl,
      posts.content AS postingContent
      FROM users
      INNER JOIN posts ON posts.userId = users.id`
      */
/* carts
`id`, `quantity`, `user_id`, `product_id`, `product_option_id`
*/

/* products
`id`, `name`, `price`, `thumbnail_image`, `base_unit`, `stock`, `sold`, `category_id`
*/
const readCart = async (userId) => {
  try {
    return await myDataSource.query(
      `SELECT
        product_id, 
        product_option_id,
        quantity
        FROM carts
        WHERE users.id = ?;`,
      [userId]`SELECT
        thumbnail_image,
        products.name,
        product_options.name
        products.quantity,
        products.price
        FROM products
        INNER JOIN product_options ON product_options.id = products.product_option_id;
        WHERE products.id = ?;`,
      [productId]
    );
  } catch (err) {
    console.log(err);
    const error = new Error("DB_SELECT_FAILED");
    error.statusCode = 500;
    throw error;
  }
};

const getStock = async (productOptionId) => {
  try {
    // item DB로부터 itemId 에 해당하는 재고(stock) 을 가져옴
    const [{ stock }] = await myDataSource.query(
      `SELECT stock
        FROM product_options
        WHERE id = ?;
        `,
      [productOptionId]
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
  readCart,
  upsertCart,
  deleteCart,
  getStock,
};
