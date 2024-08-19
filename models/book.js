import mongoose from 'mongoose';

const { Schema } = mongoose;

const BookSchema = new Schema({
    name: {
        type: String,
        required: true
    },
});

const Book = mongoose.model('Book', BookSchema);
export default Book;
