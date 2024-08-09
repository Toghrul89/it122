import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import { Book } from './models/book.js';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(express.json());
app.use('/api', cors());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    Book.find({}).lean()
        .then((items) => {
            res.render('home', { items: JSON.stringify(items) });
        })
        .catch(err => {
            res.status(500).send('Database Error occurred');
        });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
