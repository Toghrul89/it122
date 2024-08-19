import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import apiRoutes from './apiRoutes.js';

const app = express();

mongoose.connect('mongodb://tjaffarov:sUkPG5IkmAvmV35m@cluster0.drlyzrq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(path.resolve(), 'public')));

app.use(apiRoutes);

app.set('view engine', 'ejs');
app.set('views', path.join(path.resolve(), 'views'));

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/details/:id', async (req, res) => {
    const Book = await import('./models/book.js');  // Dynamically import the module
    const item = await Book.default.findById(req.params.id);
    res.render('details', { item });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
