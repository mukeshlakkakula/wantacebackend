const Recipe = require("../models/Recipe");

// ✅ Fetch All Recipes
exports.getRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching recipes", error });
  }
};

// ✅ Fetch a Single Recipe
exports.getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });
    res.json(recipe);
  } catch (error) {
    res.status(500).json({ message: "Error fetching recipe", error });
  }
};

// ✅ Create a Recipe (Upload Image to Cloudinary)
exports.createRecipe = async (req, res) => {
  try {
    const { title, ingredients, instructions } = req.body;

    let imageUrl = "";
    if (req.file) {
      imageUrl = req.file.path; // ✅ Cloudinary returns image URL here
    }

    const recipe = await Recipe.create({
      title,
      ingredients: ingredients.split(","), // Convert string to array
      instructions,
      image: imageUrl, // ✅ Store Cloudinary image URL in DB
    });

    res.status(201).json(recipe);
  } catch (error) {
    res.status(500).json({ message: "Error creating recipe", error });
  }
};

// ✅ Update a Recipe (Handle Image Update in Cloudinary)
exports.updateRecipe = async (req, res) => {
  try {
    const { title, ingredients, instructions } = req.body;
    let imageUrl = req.body.image; // Keep old image if not updated

    if (req.file) {
      imageUrl = req.file.path; // ✅ Use new Cloudinary image URL
    }

    const updatedRecipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      {
        title,
        ingredients: ingredients.split(","), // Convert to array
        instructions,
        image: imageUrl, // ✅ Updated Image URL
      },
      { new: true }
    );

    if (!updatedRecipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    res.json({ message: "Recipe updated!", recipe: updatedRecipe });
  } catch (error) {
    res.status(500).json({ message: "Error updating recipe", error });
  }
};

// ✅ Delete a Recipe
exports.deleteRecipe = async (req, res) => {
  try {
    const deletedRecipe = await Recipe.findByIdAndDelete(req.params.id);
    if (!deletedRecipe)
      return res.status(404).json({ message: "Recipe not found" });

    res.json({ message: "Recipe deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting recipe", error });
  }
};

// ✅ "Surprise Me" - Fetch a Random Recipe
exports.getRandomRecipe = async (req, res) => {
  try {
    const recipes = await Recipe.find();
    if (recipes.length === 0) return res.json({ message: "No recipes found!" });

    const randomRecipe = recipes[Math.floor(Math.random() * recipes.length)];
    res.json(randomRecipe);
  } catch (error) {
    res.status(500).json({ message: "Error fetching random recipe", error });
  }
};
