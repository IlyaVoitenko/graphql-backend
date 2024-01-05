const mongoose = require("mongoose");

const { Schema } = mongoose;

const movieSchema = Schema({
  name: String,
  genre: String,
  directorId: String,
});

module.exports = mongoose.model("Movie", movieSchema);
