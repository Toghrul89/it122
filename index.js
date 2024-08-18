const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Book = require('./models/book');

const app = express();
app.use(express.json());
app.use(cors());
app.set('view engine', 'ejs');

mongoose.connect('mongodb://localhost:27017/bookdb', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log("DB Connection Error: ", err));

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/api/books', (req, res) => {
    Book.find({})
        .then(items => res.json(items))
        .catch(err => res.status(500).send('Database Error occurred'));
});

app.put('/api/books/:id', (req, res) => {
    Book.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(updatedItem => res.json(updatedItem))
        .catch(err => res.status(500).send("Database error occurred"));
});

app.delete('/api/books/:id', (req, res) => {
    Book.findByIdAndDelete(req.params.id)
        .then(() => res.status(204).send())
        .catch(err => res.status(500).send("Database error occurred"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
