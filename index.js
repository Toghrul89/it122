import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import apiRoutes from './routes/api.js';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(cors());
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', path.join(path.resolve(), 'views'));

app.use('/api', apiRoutes);

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/detail/:title', async (req, res) => {
  try {
    const book = await Book.findOne({ title: req.params.title }).lean();
    res.render('detail', { book });
  } catch (err) {
    res.status(500).send('Database error occurred');
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
