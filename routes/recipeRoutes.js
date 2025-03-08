const express = require("express");
const upload = require("../middleware/upload.js");
const {
  getRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
  getRandomRecipe,
} = require("../controllers/recipeController");

const router = express.Router();

// ✅ Recipe Routes
router.get("/", getRecipes); // Get all recipes
router.get("/random", getRandomRecipe); // Get a random recipe
router.get("/:id", getRecipeById); // Get recipe by ID
router.post("/", upload.single("image"), createRecipe); // Create recipe with image
router.put("/:id", upload.single("image"), updateRecipe); // Update recipe
router.delete("/:id", deleteRecipe); // Delete recipe

module.exports = router;
