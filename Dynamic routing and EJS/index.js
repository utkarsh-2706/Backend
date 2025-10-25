const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index', { message: 'Hello, Utkarsh! Welcome to Express.js with EJS' });
});

app.get('/profile/:username', (req, res) => {
    const username = req.params.username;
    res.send(`This is the profile page of ${username}`);
});

app.get('/author/:name/:age', (req, res) => {
    const name = req.params.name;
    const age = req.params.age;
    res.send(`This is the author page of ${name} and age is ${age}`);
});

app.listen(port, () => {
  console.log(`Express server running on http://localhost:${port}`);
});


