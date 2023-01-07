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
    // 최종 리턴 배열 : [{썸네일, 상품명, 옵션, 수량, 가격}, {}...]
    throw error;
  }
};

// 2. 장바구니 상품 조회
const readCart = async (userId) => {
  try {
    const [cartList] = await myDataSource.query(
      `SELECT
        JSON_ARRAYAGG(
          JSON_OBJECT(
          'cartId', carts.id,
          'thumbnail', products.thumbnail_image,
          'productName', products.name,
          'optionName', product_options.name, 
          'price', products.price,
          'quantity', carts.quantity
          )
        ) AS cartList
      FROM carts
      INNER JOIN product_options ON product_options.id = carts.product_option_id
      INNER JOIN products ON products.id = carts.product_id
      WHERE carts.user_id = ?;`,
      [userId]
    );
    return cartList;
  } catch (err) {
    console.log(err);
    const error = new Error("DB_SELECT_FAILED");
    error.statusCode = 500;
    throw error;
  }
};

// 4. 장바구니 상품 삭제
const deleteCart = async (cartId) => {
  try {
    await myDataSource.query(
      `DELETE FROM carts
          WHERE carts.id = ${cartId}
          `
    );
  } catch (err) {
    console.log(err);
    const error = new Error("DB_DELETE_FAILED");
    error.statusCode = 500;
    throw error;
  }
};

// 99. 재고 조회
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

module.exports = {
  readCart,
  upsertCart,
  deleteCart,
  getStock,
};
