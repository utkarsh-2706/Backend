const express = require('express');
const app = express();

app.use(function (req, res, next) {
    console.log('Time:', Date.now());
    next();
});

app.get('/', (req, res) => {
  res.send('Hello, Utkarsh! Welcome to Latest Express.js Server');
});

app.get('/about', (req, res) => {
  res.send('This is the about page');
});

app.listen(3000, () => {
  console.log('Express server running on http://localhost:3000');
});