const mongoose = require("mongoose")


const bookSchema = new mongoose.Schema({
    ad: {
      type: String,
      required: true
    },
    yazar: String,
    yayinevi: String,
    yayinYili: Number,
    sayfaSayisi: Number,
    bookImage: String,
  });


const Book = mongoose.model('Book', bookSchema, "Kitaplar");

module.exports = Book;