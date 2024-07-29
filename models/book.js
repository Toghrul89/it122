import mongoose from 'mongoose';
const { Schema } = mongoose;

import { connectionString } from '../config/db.js';

mongoose.connect(connectionString, {
    dbName: 'tjaffarov',
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('open', () => {
  console.log('Mongoose connected.');
});

const bookSchema = new Schema({
 title: { type: String, required: true },
 author: String,
 publicationdate: Number,
 genre: String
});

export const Book = mongoose.model('Book', bookSchema);
