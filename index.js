import express from 'express';
import { getAll, getItem } from './data.js';

const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.static('public')); // Serve static files from the "public" directory

app.get('/', (req, res) => {
  const books = getAll();
  res.render('home', { books });
});

app.get('/detail', (req, res) => {
  const book = getItem(req.query.id);
  if (book) {
    res.render('detail', { book });
  } else {
    res.status(404).send('Book not found');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
