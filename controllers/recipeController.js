const Recipe = require("../models/Recipe");

exports.getRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching recipes", error });
  }
};

exports.getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });
    res.json(recipe);
  } catch (error) {
    res.status(500).json({ message: "Error fetching recipe", error });
  }
};

exports.createRecipe = async (req, res) => {
  try {
    const { title, ingredients, instructions } = req.body;

    let imageUrl = "";
    if (req.file) {
      imageUrl = req.file.path;
    }

    const recipe = await Recipe.create({
      title,
      ingredients: ingredients.split(","),
      instructions,
      image: imageUrl,
    });

    res.status(201).json(recipe);
  } catch (error) {
    res.status(500).json({ message: "Error creating recipe", error });
  }
};

exports.updateRecipe = async (req, res) => {
  try {
    const { title, ingredients, instructions } = req.body;
    let imageUrl = req.body.image;

    if (req.file) {
      imageUrl = req.file.path;
    }

    const updatedRecipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      {
        title,
        ingredients: ingredients.split(","),
        instructions,
        image: imageUrl,
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
