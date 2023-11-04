const mongoose = require("mongoose")


const bookSchema = new mongoose.Schema({
  customId: {
    type: String,
    unique: true, // Eşsiz olmasını istiyorsanız
  },
    ad: {
      type: String,
      required: true
    },
    yazar: String,
    yayinevi: String,
    yayinYili: Number,
    sayfaSayisi: Number,
    imagePath: String
  });


const Book = mongoose.model('Book', bookSchema, "Kitaplar");

module.exports = Book;