const mongoose = require('mongoose');
const chai = require('chai');
const expect = chai.expect;
const recipeService = require('../services/recipeService');

const Recipe = require('../models/recipeModel');


describe('Recipe Service Unit Tests', () => {
  before(async () => {
    await mongoose.connect('mongodb://localhost:27017/foodiesjournal_test', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  });

  beforeEach(async () => {
    await Recipe.deleteMany({});
  });

  after(async () => {
    await mongoose.connection.close();
  });

  it('should create a new recipe', async () => {
    const recipeData = {
      name: "Test Recipe",
      image: "images/test.jpg",
      description: "Just a test recipe",
      fullRecipe: "https://example.com/test"
    };

    const result = await recipeService.addNewRecipe(recipeData);

    expect(result).to.have.property('_id');
    expect(result.name).to.equal("Test Recipe");
  });

  it('should fetch all recipes', async () => {
    await recipeService.addNewRecipe({
      name: "Another Recipe",
      image: "images/another.jpg",
      description: "Yum again",
      fullRecipe: "https://example.com/again"
    });

    const all = await recipeService.getAllRecipes();
    expect(all).to.be.an('array').with.lengthOf.at.least(1);
  });
});
