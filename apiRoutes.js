router.get('/api/items/:id', async (req, res) => {
    try {
        const item = await Book.findById(req.params.id);
        res.json(item);
    } catch (error) {
        res.status(500).send("Error fetching item details");
    }
});
