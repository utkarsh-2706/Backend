const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://sharmautkarsh2706_db_user:IMVeB9Ilg8jbMvjg@cluster0.e4dbl4o.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    age: Number
});

module.exports = mongoose.model('User', userSchema);