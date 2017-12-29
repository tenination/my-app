const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

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
