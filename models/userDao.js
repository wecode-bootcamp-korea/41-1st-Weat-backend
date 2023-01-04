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
    console.log(err);
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 500;
    throw error;
  }
};

module.exports = {
  createUser,
};
