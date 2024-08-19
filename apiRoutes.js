const express = require('express');
const router = express.Router();
const Book = require('./models/book');

router.get('/api/items', async (req, res) => {
    try {
        const items = await Book.find(); // Adjust this to your actual model
        res.json(items);
    } catch (error) {
        res.status(500).send("Error fetching items");
    }
});

router.put('/api/items/:id', async (req, res) => {
    try {
        const item = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(item);
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

module.exports = router;
