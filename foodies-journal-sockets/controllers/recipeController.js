const recipeService = require('../services/recipeService');

exports.getAllRecipes = async (req, res) => {
  const recipes = await recipeService.getAllRecipes();
  res.json({ statusCode: 200, data: recipes });
};

exports.addRecipe = async (req, res) => {
  const newRecipe = await recipeService.addNewRecipe(req.body);
  res.json({ statusCode: 201, data: newRecipe, message: 'Recipe added successfully' });
  return newRecipe; // Important: return the recipe for socket emit
};
