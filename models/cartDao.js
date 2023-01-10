const { myDataSource } = require("./myDataSource");

// 3. 장바구니 상품 삭제
const deleteCart = async (cartId) => {
  try {
    await myDataSource.query(
      `DELETE FROM carts
          WHERE carts.id = ${cartId}
          `
    );
  } catch (err) {
    const error = new Error("DB_DELETE_FAILED");
    error.statusCode = 500;
    throw error;
  }
};

module.exports = {
  deleteCart,
};
