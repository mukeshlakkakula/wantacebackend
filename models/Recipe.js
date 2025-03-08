const mongoose = require("mongoose");

const RecipeSchema = new mongoose.Schema({
  title: String,
  ingredients: [String],
  instructions: String,
  image: String, // <-- Added field for image URL
});

module.exports = mongoose.model("Recipe", RecipeSchema);
