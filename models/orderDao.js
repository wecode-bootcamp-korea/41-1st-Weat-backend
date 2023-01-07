const { myDataSource } = require("./myDataSource");

const getUserPoint = async (userId) => {
  try {
    return await myDataSource.query(
      `SELECT poinr
        FROM users
        WHERE id = ?;`,
      [userId]
    );
  } catch (err) {
    const error = new Error("DB_SELECT_FAILED");
    error.statusCode = 500;
    throw error;
  }
};

// orders : `id`, `total_price`, `user_id`
// order_products : `id`, `quantity`, `order_id`, `product_id`, `product_option_id`
// carts : `id`, `user_id`, `quantity`, `product_id`, `product_option_id`
// deliveries : `id`, `from_name`, `from_mobile`, `from_email`, `to_name`, `to_mobile`, `to_address`, `order_id`

const order = async (orderObj) => {
  try {
    // 주문정보 생성 (orders)
    await myDataSource.query(
      `INSERT INTO orders(
		    , user_id, total_price
		) VALUES (?, ?);
		`,
      [userId, totalPrice]
    );

    return orderList;
  } catch (err) {
    const error = new Error("DB_SELECT_FAILED");
    error.statusCode = 500;
    throw error;
  }
};

// 4. 장바구니 상품 삭제
const deleteorder = async (orderId) => {
  try {
    await myDataSource.query(
      `DELETE FROM orders
          WHERE orders.id = ${orderId}
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
  getUserPoint,
};
