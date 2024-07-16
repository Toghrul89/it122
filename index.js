import express from 'express';
import { getAll, getItem } from './data.js';

const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  const items = getAll();
  res.render('home', { items });
});

app.get('/detail', (req, res) => {
  const item = getItem(req.query.id);
  if (item) {
    res.render('detail', { item });
  } else {
    res.status(404).send('Item not found');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
