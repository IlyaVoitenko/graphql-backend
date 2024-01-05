const mongoose = require("mongoose");

const { Schema } = mongoose;

const directorSchema = Schema({
  name: String,
  age: Number,
});

module.exports = mongoose.model("Director", directorSchema);
