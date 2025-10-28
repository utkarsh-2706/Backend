const express = require('express');
const app = express();
const port = 3000;
const userModel = require('./userModel');

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/create', async (req, res) => {
    let userData = await userModel.create({
        username: "utkarshSharma2",
        password: "utkarsh12345",
        email: "utkarsh27065@gmail.com"
    })

    res.send(userData);

});

app.get('/update', async (req, res) => {

    let userData = await userModel.findOneAndUpdate({ email: "utkarsh2706@gmail.com" }, { username: "utkarsh" }, { new: true })

    res.send(userData);

});

app.get('/read', async (req, res) => {

    let userData = await userModel.find({});

    res.send(userData);

});

app.get('/delete', async (req, res) => {

    let userData = await userModel.findOneAndDelete({ username: "utkarshSharma" });

    res.send(userData);

});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});

