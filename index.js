import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import apiRoutes from './apiRoutes.js';

const app = express();

mongoose.connect('mongodb+srv://tjaffarov:sUkPG5IkmAvmV35m@cluster0.drlyzrq.mongodb.net/SCCPROJECT?retryWrites=true&w=majority&appName=Cluster0', 
    { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(path.resolve(), 'public')));
app.use(apiRoutes);
app.set('view engine', 'ejs');
app.set('views', path.join(path.resolve(), 'views'));

app.get('/', async (req, res) => {
    const items = await Book.find();
    res.render('home', { items });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
