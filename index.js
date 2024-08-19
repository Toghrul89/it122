const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const apiRoutes = require('./apiRoutes');
const app = express();

// Database connection
mongoose.connect('mongodb://localhost/SCCProject', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded

app.use(express.static(path.join(__dirname, 'public')));

app.use(apiRoutes);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/details/:id', async (req, res) => {
    const Book = require('./models/book');
    const item = await Book.findById(req.params.id);
    res.render('details', { item });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
