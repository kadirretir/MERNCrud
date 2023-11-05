const express = require("express")
const app = express();
const port = 3000;
const cors = require('cors');
const connectToDb = require("./models/db");
const Book = require("./models/booksSchema");
const upload = require("./middlewares/imageUpload");

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors(
  {
    origin: ["https://mern-crud-jade.vercel.app/"],
    methods: ["GET", "POST"],
    credentials: true
  }
))
app.use(express.static('uploads'))

// GÖNDERİLEN KİTABI VERİTABANINA KAYDET
app.post("/submitBook/newBook/:id", async (req,res) => {
  try {
      await connectToDb();
      Book.create({
        customId: req.params.id,
        ad: req.body.bookname,
        yazar: req.body.authorname,
        yayinevi: req.body.publishor,
        yayinYili: req.body.publishyear,
        sayfaSayisi: req.body.pagecount,
        imagePath: "",
      })
      res.status(204).end()
  } catch (error) {
    throw new Error(error)
  }
})

// VERİTABANINA KAYDEDİLEN KİTABI BUL(ID ARACILIĞIYLA) VE O BELGEYE YÜKLENİLEN RESMİN YOLUNU KAYDET
app.post("/submitBook/:id", upload.single('uploadmyfile'), async (req,res) => {
  try {
      await connectToDb();
       await Book.findOneAndUpdate(
        {customId: req.params.id},
        { $set: { imagePath: req.file.path }},
        {new: true})

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
    await Book.findOneAndDelete({customId: req.params.id})
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

