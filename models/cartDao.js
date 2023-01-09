const { myDataSource } = require("./myDataSource");

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
          'baseUnit', product.base_unit,
          'price', products.price,
          'quantity', carts.quantity
          )
        ) AS cartOption
      FROM carts
      INNER JOIN product_options ON product_options.id = carts.product_option_id
      INNER JOIN products ON products.id = carts.product_id
      WHERE carts.user_id = ?;`,
      [userId]
    );
    return cartList;
  } catch (err) {
    const error = new Error("DB_SELECT_FAILED");
    error.statusCode = 400;
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
};
