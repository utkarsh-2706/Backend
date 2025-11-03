const express = require('express');
const app = express();
const path = require('path');
const port = 3000;

const userModel = require('./models/user');
const user = require('./models/user');

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/read' , async (req, res) => {
    let allUsers = await userModel.find({});
    res.render('read', {users: allUsers});
});

app.post('/create', async (req, res) => {
    
    let { name, email, image } = req.body;

    let createdUser = await userModel.create({
        name,
        email,
        image
    });

    res.redirect('/read');

});

app.post('/delete/:id', async (req, res) => {
    let { id } = req.params;
    let deletedUser = await userModel.findOneAndDelete({ _id: id });
    res.redirect('/read');
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});

