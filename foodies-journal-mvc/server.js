const express = require('express');
const mongoose = require('mongoose');
const app = express();
const recipeRoutes = require('./routes/recipeRoutes');

const PORT = process.env.PORT || 8000;

app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose.connect('mongodb://localhost:27017/foodieDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB'));

app.use('/api/recipes', recipeRoutes);

app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));