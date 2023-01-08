const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const dotenv = require("dotenv");
dotenv.config();

const routes = require("./routes");
const { errorHandler } = require("./middlewares/errorHandling");
const app = express();

app.use(cors());
app.use(morgan("combined"));
app.use(express.json());
app.use(routes);
app.use(errorHandler);

app.get("/ping", (req, res) => {
  res.json({ message: "pong" });
});

const PORT = process.env.PORT;

const start = async () => {
  try {
    app.listen(PORT, () => console.log(`Server is listening on ${PORT}`));
  } catch (err) {
    console.error(err);
  }
};

start();
