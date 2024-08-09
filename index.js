import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { Book } from './models/book.js';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.set('view engine', 'ejs');

const connectionString = "mongodb+srv://tjaffarov:sUkPG5IkmAvmV35m@cluster0.drlyzrq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(connectionString, {
    dbName: 'SCCPROJECT',
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('open', () => {
    console.log('Mongoose connected.');
});

app.get('/', (req, res) => {
    Book.find({}).lean()
        .then((items) => {
            res.render('home', { items: JSON.stringify(items) });
        })
        .catch(err => {
            res.status(500).send('Database Error occurred');
        });
});

app.get('/details', (req, res) => {
    const title = req.query.title;

    Book.findOne({ title: title }).lean()
        .then((item) => {
            if (item) {
                res.render('details', { item: JSON.stringify(item) });
            } else {
                res.status(404).send('Book not found');
            }
        })
        .catch(err => {
            res.status(500).send('Database Error occurred');
        });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
