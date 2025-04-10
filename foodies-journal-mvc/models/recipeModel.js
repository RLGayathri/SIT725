const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String,
  fullRecipe: String
});

module.exports = mongoose.model('Recipe', recipeSchema);