import express from 'express';
import Book from './models/book.js'; 

const router = express.Router();

router.get('/api/items/:id', async (req, res) => {
    try {
        const item = await Book.findById(req.params.id);
        res.json(item);
    } catch (error) {
        console.error("Error fetching item details:", error);
        res.status(500).send("Error fetching item details");
    }
});

router.put('/api/items/:id', async (req, res) => {
    try {
        const updatedItem = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedItem);
    } catch (error) {
        console.error("Error updating item:", error);
        res.status(500).send("Error updating item");
    }
});

router.delete('/api/items/:id', async (req, res) => {
    try {
        await Book.findByIdAndDelete(req.params.id);
        res.send("Item deleted");
    } catch (error) {
        console.error("Error deleting item:", error);
        res.status(500).send("Error deleting item");
    }
});

router.post('/api/items', async (req, res) => {
    try {
        const newItem = new Book(req.body);
        const savedItem = await newItem.save();
        res.json(savedItem);
    } catch (error) {
        console.error("Error creating new item:", error);
        res.status(500).send("Error creating new item");
    }
});

export default router;
