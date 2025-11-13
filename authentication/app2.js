const express = require('express');
const app = express();

const userModel = require('./models/user' );
const cookieParser = require('cookie-parser');
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const port = 3000;

app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());


app.get('/', (req, res) => {
    res.render('index');
}); 

app.post("/create", async (req, res) => {
    let { username, email, password, age } = req.body;

    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(password, salt, async function(err, hash) {

            let createdUser = await userModel.create({
                username,
                email,
                password: hash,
                age
            });

            let token = jwt.sign({email}, "secretkey");
            res.cookie('token', token);

            res.send(createdUser);
        });
    });
});

app.get("/login", (req, res) => {
    res.render('login');
});

app.post("/login", async (req, res) => {
    let { email, password } = req.body;
    let user = await userModel.findOne({ email });

    if (!user) {
        return res.status(400).send("User not found");
    }
    bcrypt.compare(password, user.password, function(err, result) {
        if (result) {
            let token = jwt.sign({email}, "secretkey");
            res.cookie('token', token);
            res.send("Login successful");
        } else {
            res.status(400).send("Invalid credentials");
        }
    });
});

app.get("/logout", (req, res) => {
    res.clearCookie('token');
    res.send("Logged out successfully");
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});