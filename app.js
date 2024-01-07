require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
