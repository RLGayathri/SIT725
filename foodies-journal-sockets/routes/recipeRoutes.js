const express = require('express');
const recipeController = require('../controllers/recipeController');

module.exports = (io) => {
  const router = express.Router();

  router.get('/', recipeController.getAllRecipes);

  router.post('/', async (req, res) => {
    const newRecipe = await recipeController.addRecipe(req, res);

    if (newRecipe && newRecipe.name) {
      io.emit('new-recipe', newRecipe.name); // Broadcast to all connected clients
    }
  });

  return router;
};
