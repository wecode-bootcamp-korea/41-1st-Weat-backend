const { myDataSource } = require("./myDataSource");

const createUser = async (email, hashedPassword, name, mobile) => {
  try {
    return await myDataSource.query(
      `INSERT INTO users(
		    email,
		    password,
        name,
		    mobile
		) VALUES (?, ?, ?, ?);
		`,
      [email, hashedPassword, name, mobile]
    );
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 400;
    throw error;
  }
};

const userExists = async (email) => {
  try {
    const result_array = await myDataSource.query(
      `SELECT EXISTS 
      (SELECT * 
        FROM users 
        WHERE email=?
        limit 1) 
        AS exist;
		  `,
      [email]
    );
    return result_array[0];
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 400;
    throw error;
  }
};

const getHashedPassword = async (email) => {
  try {
    // 1. 입력받은 email 과 매치되는 hashedPassword 를 DB 로부터 가져오기
    const [{ hashedPassword }] = await myDataSource.query(
      `SELECT password AS hashedPassword 
            FROM users 
            WHERE email = ?;
      `,
      [email]
    );
    return hashedPassword;
  } catch (err) {
    const error = new Error("GET_HASHED_PASSWORD_FAILED");
    error.statusCode = 400;
    throw error;
  }
};

const getUserID = async (email) => {
  try {
    const [{ userId }] = await myDataSource.query(
      `
                SELECT id AS userId
                FROM users
                WHERE email = ?;
                `,
      [email]
    );
    return userId;
  } catch (err) {
    const error = new Error("GET_USER_ID_FAILED");
    error.statusCode = 400;
    throw error;
  }
};

module.exports = {
  createUser,
  getHashedPassword,
  getUserID,
  userExists,
};
