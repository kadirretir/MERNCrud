const express = require("express")
const app = express();
const port = 3000;
const cors = require('cors');
const connectToDb = require("./models/db");
const Book = require("./models/booksSchema");
const upload = require("./middlewares/imageUpload");

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())
app.use(express.static('uploads'))


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
    console.log(`SERVER, ${port}.portta çalışıyor!`)
})