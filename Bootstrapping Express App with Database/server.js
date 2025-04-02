const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json()); // To parse JSON data
app.use(bodyParser.urlencoded({ extended: true })); // To parse URL-encoded form data
app.use(cors());

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/foodiesjournal", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.once("open", () => console.log("Connected to MongoDB"));

// Define Recipe Schema
const recipeSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    fullRecipe: String
});

const Recipe = mongoose.model("Recipe", recipeSchema);

// Get user-added recipes
app.get("/recipes", async (req, res) => {
    try {
        const recipes = await Recipe.find();
        res.json(recipes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Add a new recipe
app.post("/addRecipe", async (req, res) => {
    try {
        const newRecipe = new Recipe(req.body); // Save the new recipe from the body
        await newRecipe.save(); // Save to MongoDB
        res.status(201).json(newRecipe); // Respond with the newly added recipe
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(port, () => {
    console.log(`Foodie's Journal is running at http://localhost:${port}`);
});
