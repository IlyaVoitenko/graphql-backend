require("dotenv").config();
const express = require("express");
const cors = require("cors");

app.use(express.json());
app.use(cors());

const app = express();

app.use((_, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
