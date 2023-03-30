const cookieParser = require('cookie-parser');
const cors = require('cors');
const express = require('express');
const productRoute = require('./src/routes/productRoute');
require('dotenv').config();

const app = express();

const { HOST, PORT } = process.env;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: 'http://localhost:3000',
  })
);
app.use(productRoute);

app.listen(PORT, () => {
  console.log(`Server listening to ${HOST}:${PORT}`);
});
