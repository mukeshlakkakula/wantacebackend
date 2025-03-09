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

router.get("/", getRecipes);
router.get("/random", getRandomRecipe);
router.get("/:id", getRecipeById);
router.post("/", upload.single("image"), createRecipe);
router.put("/:id", upload.single("image"), updateRecipe);
router.delete("/:id", deleteRecipe);

module.exports = router;
