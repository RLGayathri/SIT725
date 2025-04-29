const express = require('express');
const mongoose = require('mongoose');
const app = express();
const http = require('http').createServer(app); // Use http
const io = require('socket.io')(http);           // Attach socket.io to http
const recipeRoutes = require('./routes/recipeRoutes');

const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose.connect('mongodb://localhost:27017/foodieDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB'));

app.use('/api/recipes', recipeRoutes(io)); // Pass io to routes

io.on('connection', (socket) => {
  console.log(' A user connected');

  socket.on('disconnect', () => {
    console.log(' A user disconnected');
  });
});

http.listen(PORT, () => console.log(` Server running at http://localhost:${PORT}`));
