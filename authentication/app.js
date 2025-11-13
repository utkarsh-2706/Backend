const express = require('express');
const app = express();

const cookieParser = require('cookie-parser');
app.use(cookieParser());

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const port = 3000;

app.get('/', (req, res) => {
    res.cookie('username', 'utkarsh2706');
    res.send('Cookie has been set');
});

app.get('/read', (req, res) => {
    const username = req.cookies['username'];
    res.send(`Cookie value: ${username}`);
});

app.get('/password', (req, res) => {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash('myPlaintextPassword', salt, (err, hash) => {
            console.log(salt);
            console.log(`Hashed password : ${hash}`);
        });
    });
});

app.get('/compare', (req, res) => {
    bcrypt.compare('myPlaintextPassword', '$2b$10$qnIty2s/o.wsVX47q9xgKOYaj6C7Dhs/7vPvLKVX7kOwYX53DIWFK', (err, result) => {
        console.log(result);
    });
});

app.get('/jwt', (req, res) => {
    let token = jwt.sign({ email: "utkarshsharma2706@gmail.com" }, "secret");
    console.log(token);
    res.cookie('token', token);
    res.send(token);
});

app.get('/read-jwt', (req, res) => {
    let data = jwt.verify(req.cookies.token, "secret");
    console.log(data);
    res.send(data);
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});

