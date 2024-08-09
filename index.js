import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { Book } from './models/book.js';

const app = express();
const PORT = process.env.PORT || 3000;

const connectionString = 'your-mongodb-connection-string-here';

mongoose.connect(connectionString, {
    dbName: 'your-db-name-here', 
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB connection error:', err));

app.use(express.json());

app.use('/api', cors());

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.get('/', (req, res) => {
    Book.find({}).lean()
        .then((items) => {
            res.render('home', { items: JSON.stringify(items) });
        })
        .catch(err => {
            res.status(500).send('Database Error occurred');
        });
});

app.get('/api/books', (req, res) => {
    Book.find({}).lean()
        .then((books) => res.json(books))
        .catch(err => res.status(500).send('Database Error occurred'));
});

app.get('/api/books/:title', (req, res) => {
    Book.findOne({ title: req.params.title }).lean()
        .then((book) => res.json(book))
        .catch(err => res.status(500).send('Database Error occurred'));
});

app.delete('/api/books/:title', (req, res) => {
    Book.deleteOne({ title: req.params.title })
        .then((result) => res.json(result))
        .catch(err => res.status(500).send('Database Error occurred'));
});

app.post('/api/books', (req, res) => {
    const book = req.body;
    Book.updateOne({ title: book.title }, book, { upsert: true })
        .then((result) => res.json(result))
        .catch(err => res.status(500).send('Database Error occurred'));
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
