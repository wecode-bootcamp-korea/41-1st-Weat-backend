require('dotenv').config()

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.get("/ping", function (req, res, next) {
    res.json({ message: "pong"});
});

const PORT = process.env.PORT;

const start = async () => {
    app.listen(PORT, () => console.log(`server is listening on ${PORT}`))
};

start();