const Recipe = require('../models/recipeModel');

const getAllRecipes = () => Recipe.find({});
const addRecipe = (data) => new Recipe(data).save();

module.exports = { getAllRecipes, addRecipe };