const mongoose = require("mongoose");

const RecipeSchema = new mongoose.Schema({
  title: String,
  ingredients: [String],
  instructions: String,
  category: String,
  userId: mongoose.Schema.Types.ObjectId,
});

module.exports = mongoose.model("Recipe", RecipeSchema);
