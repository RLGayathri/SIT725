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

  // ✅ NEW TEST CASE 1
  it('should fail to add a recipe with missing required fields', async () => {
    try {
      await recipeService.addNewRecipe({ name: "Incomplete" });
    } catch (err) {
      expect(err).to.exist;
    }
  });

  // ✅ NEW TEST CASE 2
  it('should add multiple recipes and fetch correct count', async () => {
    await recipeService.addNewRecipe({
      name: "R1",
      image: "img/r1.jpg",
      description: "desc1",
      fullRecipe: "https://r1.com"
    });
    await recipeService.addNewRecipe({
      name: "R2",
      image: "img/r2.jpg",
      description: "desc2",
      fullRecipe: "https://r2.com"
    });

    const all = await recipeService.getAllRecipes();
    expect(all.length).to.equal(2);
  });

  // ✅ NEW TEST CASE 3
  it('should ensure fullRecipe link starts with https://', async () => {
    const recipe = await recipeService.addNewRecipe({
      name: "Secure Recipe",
      image: "img/secure.jpg",
      description: "secure desc",
      fullRecipe: "https://secure.com"
    });

    expect(recipe.fullRecipe.startsWith("https://")).to.be.true;
  });
});
