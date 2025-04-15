const mongoose = require('mongoose');
const Recipe = require('./models/recipeModel');

mongoose.connect('mongodb://localhost:27017/foodieDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const recipes = [
  {
    name: "Spicy Chicken Biryani",
    image: "images/biryani.jpg",
    description: "Aromatic basmati rice cooked with tender chicken and flavorful spices.",
    fullRecipe: "https://youtu.be/-KbvRRrTSbo"
  },
  {
    name: "Chilli Garlic Noodles",
    image: "images/noodles.jpeg",
    description: "Delicious stir-fried noodles with garlic, butter, and soy sauce.",
    fullRecipe: "https://youtu.be/aQHr9Zsnzbw"
  },
  {
    name: "Cheesy Pasta",
    image: "images/pasta.jpg",
    description: "Creamy, cheesy pasta baked to perfection with a crispy golden top.",
    fullRecipe: "https://youtu.be/AK0dcuydkiM"
  }
];

Recipe.insertMany(recipes).then(() => {
  console.log('✅ Sample recipes added!');
  mongoose.connection.close();
});