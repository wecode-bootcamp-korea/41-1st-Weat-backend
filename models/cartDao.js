const { myDataSource } = require("./myDataSource");

// await cartDao.create(itemId, thick, count);
const create = async (itemId, thick, count) => {
  try {
    return await myDataSource.query(
      `INSERT INTO cart(
		    item_id,
		    thick,
            count
		) VALUES (?, ?, ?);
		`,
      [itemId, thick, count]
    );
  } catch (err) {
    console.log(err);
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 500;
    throw error;
  }
};

const getStock = async (itemId) => {
  try {
    // item DB로부터 itemId 에 해당하는 재고(stock) 을 가져옴
    const [{ stock }] = await myDataSource.query(
      `SELECT stock
        FROM item 
        WHERE item_id = ?;
        `,
      [itemId]
    );
    return stock;
  } catch (err) {
    console.log(err);
    const error = new Error("GET_STOCK_FAILED");
    error.statusCode = 500;
    throw error;
  }
};

// const getUserID = async (email) => {
//   try {
//     const [{ userId }] = await myDataSource.query(
//       `
//                 SELECT id AS userId
//                 FROM users
//                 WHERE email = ?;
//                 `,
//       [email]
//     );
//     return userId;
//   } catch (err) {
//     console.log(err);
//     const error = new Error("GET_USER_ID_FAILED");
//     error.statusCode = 500;
//     throw error;
//   }
// };

module.exports = {
  create,
  getStock,
};
