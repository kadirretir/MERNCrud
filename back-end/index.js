const express = require("express")
const app = express();
const port = 3000;
const cors = require('cors');
const connectToDb = require("./models/db");
const Book = require("./models/booksSchema");

app.use(express.urlencoded({extended: true, limit: "50mb", parameterLimit: 50000 }))
app.use(express.json({limit: "50mb", extended: true}))
app.use(cors())
app.use(express.static('uploads'))

// GÖNDERİLEN KİTABI VERİTABANINA KAYDET
app.post("/submitBook/newBook", async (req,res) => {
  try {
      await connectToDb();
      Book.create({
        ad: req.body.bookname,
        yazar: req.body.authorname,
        yayinevi: req.body.publishor,
        yayinYili: req.body.publishyear,
        sayfaSayisi: req.body.pagecount,
        bookImage: req.body.bookImage,
      })
      res.status(204).end()
  } catch (error) {
    throw new Error(error)
  }
})


// GÖNDERİLEN BELGE İLE, VERİTABANINDA BULUNAN BELGE SADECE FARKLI İSE DEĞİŞİKLİK YAP.
app.post("/updateBook", async (req,res) => {
  try {
      await connectToDb();
      const doc1 = await Book.findById(req.body._id).lean();
      const doc2 = req.body

      const isDifferent = JSON.stringify(doc1) !== JSON.stringify(doc2);

      if (isDifferent) {
        await Book.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true });
      }
  } catch (error) {
    throw new Error(error)
  }
})


// SİLİNEN KİTABI VERİTABANINDAN BUL VE SİL
app.post("/deleteBook/:id", async (req,res) => {
  try {
    await connectToDb();
    await Book.findOneAndDelete({_id: req.params.id})
  } catch (error) {
    throw new Error(error)
  }
})

// KİTAPLARI BUL VE GÖSTER
app.get("/getBooks", async (req,res) => {
  try {
    await connectToDb();
   const findAllBooks =  await Book.find({});
    res.json(findAllBooks)
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})

app.listen(port, () => {
  console.log(`Server, ${port}. portta çalışıyor!`)
})

