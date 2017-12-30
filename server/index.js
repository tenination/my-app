const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const User = require('../db/User.js');

const app = express();
const PORT = process.env.PORT || 5000;

mongoose.connect('mongodb://test:test@ds135747.mlab.com:35747/my-app-db');


// Priority serve any static files
app.use(express.static(path.resolve(__dirname, '../client/build')));

// Answer API requests
app.get('/api', (req, res) => {
  res.set('Content-Type', 'application/json');
  res.send('{"message": "Hello from the only custom server in the world!"}');
});

app.get('/db', (req, res) => {
  User.getAllUsers()
    .then(result => res.send(result))
    .catch(err => res.send(err));
});

// All remaining requests return the React app, so it can handle routing.
app.get('*', (request, response) => {
  response.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
  console.log('process.env.PORT is ', process.env.PORT);
});
