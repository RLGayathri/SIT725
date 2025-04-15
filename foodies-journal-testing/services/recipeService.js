const Recipe = require('../models/recipeModel');

const getAllRecipes = async () => {
    return await Recipe.find();
};

const addNewRecipe = async (data) => {
    const newRecipe = new Recipe(data);
    return await newRecipe.save();
};

module.exports = {
    getAllRecipes,
    addNewRecipe
};
