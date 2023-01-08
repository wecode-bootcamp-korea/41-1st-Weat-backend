const { myDataSource } = require("./myDataSource");

const userInfo = async (userId) => {
  try {
    return await myDataSource.query(
      `SELECT 
      name AS userName, 
      level,
      point,
      (SELECT COUNT(id) FROM orders WHERE orders.user_id = ?) AS orderCount,
      DATE_FORMAT(created_at, "%Y%m%d %H%i%s") AS userNumber
      FROM users 
      WHERE id = ?;`,
      [userId, userId]
    );
  } catch (err) {
    const error = new Error("INQUIRE_USER_INFO_FAILED");
    error.statusCode = 500;
    throw error;
  }
};

const readPrivateInfo = async (userId) => {
  try {
    return await myDataSource.query(
      `SELECT
        name AS userName,
        email,
        mobile
      FROM users
      WHERE id = ?;`,
      [userId]
    );
  } catch (err) {
    const error = new Error("INQUIRE_PRIVATE_INFO_FAILED");
    error.statusCode = 500;
    throw error;
  }
};

module.exports = {
  userInfo,
  readPrivateInfo,
};
