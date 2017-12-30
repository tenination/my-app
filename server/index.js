const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

mongoose.connect('mongodb://test:test@ds135747.mlab.com:35747/my-app-db');

const todoSchema = new mongoose.Schema({
  item: String,
});

const Todo = mongoose.model('Todo', todoSchema);
const itemOne = Todo({ item: 'buy flowers' }).save((err) => {
  if (err) throw err;
  console.log('item saved');
});

// Priority serve any static files
app.use(express.static(path.resolve(__dirname, '../client/build')));

// Answer API requests
app.get('/api', (req, res) => {
  console.log('/api endpoint requested!');
  res.set('Content-Type', 'application/json');
  res.send('{"message": "Hello from the only custom server in the world!"}');
});

// All remaining requests return the React app, so it can handle routing.
app.get('*', (request, response) => {
  response.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
  console.log('process.env.PORT is ', process.env.PORT);
});
