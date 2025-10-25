const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello, Utkarsh! Welcome to Express.js Server');
});

app.get('/about', (req, res) => {
  res.send('This is the about page');
});

app.get('/profile', (req, res, next) => {
    return next(new Error('Something went wrong in /profile route!'));
});

// Error-handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke! ' + err.message);
});

app.listen(port, () => {
  console.log(`Express server running on http://localhost:${port}`);
});
