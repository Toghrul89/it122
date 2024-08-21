const express = require('express');
const router = express.Router();
const Book = require('./models/book'); 

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
        res.status(500).send("Error updating item");
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
