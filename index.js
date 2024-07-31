import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import { Book } from './models/book.js';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(cors());
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', path.join(path.resolve(), 'views'));

app.use('/api', apiRoutes);

app.get('/', async (req, res) => {
  try {
    const books = await Book.find({}).lean();
    res.render('home', { books });
  } catch (err) {
    console.error('Error fetching book list:', err);
    res.status(500).send('Database error occurred');
  }
});

app.get('/detail/:title', async (req, res) => {
  try {
    console.log('Fetching details for book:', req.params.title);
    const book = await Book.findOne({ title: req.params.title }).lean();
    if (!book) {
      return res.status(404).send('Book not found');
    }
    res.render('detail', { book });
  } catch (err) {
    console.error('Error fetching book details:', err);
    res.status(500).send('Database error occurred');
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
