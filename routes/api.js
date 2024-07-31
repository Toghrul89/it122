import express from 'express';
import { Book } from '../models/book.js';

const router = express.Router();

router.get('/books', async (req, res) => {
  try {
    const books = await Book.find({}).lean();
    res.json(books);
  } catch (err) {
    res.status(500).send('Database error occurred');
  }
});

router.get('/books/:title', async (req, res) => {
  try {
    const book = await Book.findOne({ title: req.params.title }).lean();
    res.json(book);
  } catch (err) {
    res.status(500).send('Database error occurred');
  }
});

router.post('/books', async (req, res) => {
  try {
    const { _id, ...bookData } = req.body;
    const book = await Book.updateOne({ _id }, bookData, { upsert: true });
    res.json(book);
  } catch (err) {
    res.status(500).send('Database error occurred');
  }
});

router.delete('/books/:id', async (req, res) => {
  try {
    const result = await Book.deleteOne({ _id: req.params.id });
    if (result.deletedCount === 0) {
      res.status(404).send('Book not found');
    } else {
      res.send('Book deleted');
    }
  } catch (err) {
    res.status(500).send('Database error occurred');
  }
});

export default router;

