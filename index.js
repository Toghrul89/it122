import express from 'express';
import { connectDB } from './config/db.js';
import { Book } from './models/book.js';

const app = express();
const port = process.env.PORT || 3000;

connectDB();

app.set('view engine', 'ejs');
app.use(express.static('public')); 

app.get('/', (req, res, next) => {
  Book.find({}).lean()
    .then((books) => {
      res.render('home', { books });
    })
    .catch(err => next(err));
});

app.get('/detail', (req, res, next) => {
  Book.findOne({ _id: req.query.id }).lean()
    .then((book) => {
      res.render('detail', { book });
    })
    .catch(err => next(err));
});

app.get('/delete', (req, res, next) => {
  Book.deleteOne({ _id: req.query.id })
    .then((result) => {
      if (result.deletedCount > 0) {
        res.send('Delete succeeded');
      } else {
        res.send('Delete failed: Book not found');
      }
    })
    .catch(err => next(err));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
