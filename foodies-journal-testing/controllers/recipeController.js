const recipeService = require('../services/recipeService');

exports.getAllRecipes = async (req, res) => {
  const recipes = await recipeService.getAllRecipes();
  res.json({ statusCode: 200, data: recipes });
};

exports.addRecipe = async (req, res) => {
  await recipeService.addRecipe(req.body);
  res.json({ statusCode: 201, message: 'Recipe added successfully' });
};