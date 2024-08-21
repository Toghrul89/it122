import { Router } from 'express';
import Book from './models/book.js';

const router = Router();

router.get('/api/items', async (req, res) => {
    try {
        const items = await Book.find();
        res.json(items);
    } catch (error) {
        res.status(500).send("Error fetching items");
    }
});

router.get('/api/items/:id', async (req, res) => {
    try {
        const item = await Book.findById(req.params.id);
        res.json(item);
    } catch (error) {
        res.status(500).send("Error fetching item details");
    }
});

router.put('/api/items/:id', async (req, res) => {
    try {
        const updatedItem = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedItem);
    } catch (error) {
        res.status(500).send("Error saving item");
    }
});

router.delete('/api/items/:id', async (req, res) => {
    try {
        await Book.findByIdAndDelete(req.params.id);
        res.send("Item deleted");
    } catch (error) {
        res.status(500).send("Error deleting item");
    }
});

export default router;
