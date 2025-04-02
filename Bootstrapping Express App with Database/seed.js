const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/foodiesjournal", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const recipeSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String,
  fullRecipe: String,
});

const Recipe = mongoose.model("Recipe", recipeSchema);

const recipes = [
  {
    name: "Spicy Chicken Biryani",
    image: "images/biryani.jpg",
    description: "Aromatic basmati rice cooked with tender chicken and flavorful spices.",
    fullRecipe: "https://youtu.be/-KbvRRrTSbo",
  },
  {
    name: "Chilli Garlic Noodles",
    image: "images/noodles.jpeg",
    description: "Delicious stir-fried noodles with garlic, butter, and soy sauce.",
    fullRecipe: "https://youtu.be/aQHr9Zsnzbw",
  },
  {
    name: "Cheesy Pasta",
    image: "images/pasta.jpg",
    description: "Creamy, cheesy pasta baked to perfection with a crispy golden top.",
    fullRecipe: "https://youtu.be/AK0dcuydkiM",
  },
];

Recipe.insertMany(recipes).then(() => {
  console.log("✅ Sample recipes added!");
  mongoose.connection.close();
});
