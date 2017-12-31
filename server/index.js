const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const User = require('../db/User.js');
const session = require('express-session');

const app = express();
const PORT = process.env.PORT || 5000;

mongoose.connect('mongodb://test:test@ds135747.mlab.com:35747/my-app-db');


app.use(bodyParser.json());
// Priority serve any static files
app.use(express.static(path.resolve(__dirname, '../client/build')));

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
}));

app.use((req, res, next) => {
  req.session.awesome = 100;
  next();
});

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

app.get('/test', (req, res) => {
  bcrypt.compare('kermitfrog907', '$2a$10$AMt2EF1/k2RVKftMtc206.x.D9okKi2rVzrZbQspbziPn35XR9J66')
    .then(result => res.send(result));
});

app.post('/signup', (req, res) => {
  console.log('/signup endpoint reached!');
  const { username, password } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => {
      User.signup(username, hash, (err) => {
        if (err) {
          res.status(400).send(err);
        } else {
          res.status(201).send('Successful signup!');
        }
      });
    });
});

app.post('/login', (req, res) => {
  console.log('/login endpoint reached');
  const { username, password } = req.body;
  User.login(username)
    .then((result) => {
      if (result) {
        bcrypt.compare(password, result.password)
          .then((match) => {
            if (match) req.session.user = result;
            res.status(201).send(match);
          });
      } else {
        res.status(400).send('error');
      }
    });
});

app.get('/logout', (req, res) => {
  console.log('/logout endpoint reached');
  req.session.destroy();
  res.status(201).send();
});

app.get('/dashboard', (req, res) => {
  if (!req.session.user) {
    res.status(401).send();
  } else {
    res.status(201).send('Welcome to super-secret API');
  }
});

// All remaining requests return the React app, so it can handle routing.
app.get('*', (request, response) => {
  response.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
  console.log('process.env.PORT is ', process.env.PORT);
});
