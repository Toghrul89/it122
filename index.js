import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import apiRoutes from './apiRoutes.js';
import Book from './models/book.js';

const app = express();

mongoose.connect('mongodb+srv://tjaffarov:sUkPG5IkmAvmV35m@cluster0.drlyzrq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', 
    { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(path.resolve(), 'public')));
app.use(apiRoutes);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(path.resolve(), 'client', 'build')));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(path.resolve(), 'client', 'build', 'index.html'));
    });
} else {
    // In development mode, simply render the home view or other EJS views if needed.
    app.get('/', async (req, res) => {
        try {
            console.log("Fetching items from MongoDB...");
            const items = await Book.find();
            console.log("Items fetched successfully:", items);
            res.render('home', { items });
        } catch (error) {
            console.error("Error fetching items:", error);
            res.status(500).send("Error fetching items");
        }
    });
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
