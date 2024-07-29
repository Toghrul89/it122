import mongoose from 'mongoose';
const { Schema } = mongoose;

const bookSchema = new Schema({
  title: { type: String, required: true },
  author: String,
  publicationdate: Number,
  genre: String
});

export const Book = mongoose.model('Book', bookSchema);
