const express = require("express");
const { getRecipes, createRecipe } = require("../controllers/recipeController");

const router = express.Router();
router.get("/", getRecipes);
router.post("/", createRecipe);

module.exports = router;
