import express from 'express';
import { Book } from './models/book.js';

const router = express.Router();

router.get('/books', async (req, res) => {
  try {
    const books = await Book.find({}).lean();
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: 'Database error occurred' });
  }
});

router.get('/books/:title', async (req, res) => {
  try {
    const book = await Book.findOne({ title: req.params.title }).lean();
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.json(book);
  } catch (err) {
    res.status(500).json({ error: 'Database error occurred' });
  }
});

router.post('/books', async (req, res) => {
  const { title, author, publicationdate, genre } = req.body;
  try {
    const book = await Book.updateOne(
      { title },
      { title, author, publicationdate, genre },
      { upsert: true }
    );
    res.json({ success: true, book });
  } catch (err) {
    res.status(500).json({ error: 'Database error occurred' });
  }
});

router.delete('/books/:title', async (req, res) => {
  try {
    const result = await Book.deleteOne({ title: req.params.title });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Database error occurred' });
  }
});

export default router;
