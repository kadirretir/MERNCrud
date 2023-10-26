const express = require("express")
const app = express();
const port = 3000;
const cors = require('cors')
const connectToDb = require("./models/db");
const Book = require("./models/booksSchema")


app.use(express.json())
app.use(cors())


app.get("/", async (req,res,next) => {
    try {
        await connectToDb(); // Veritabanı bağlantısı oluşturuluyor
        next(); // Bir sonraki middleware'e veya rota işlemine geç
      } catch (error) {
        throw new Error(error);
      }

      res.send("başarılı bir bağlantı oldu kardeşim!")
})

app.post("/submitBook", async (req,res) => {
  try {
      await connectToDb();
      Book.create({
        ad: req.body.bookname,
        yazar: req.body.authorname,
        yayinevi: req.body.publishor,
        yayinYili: req.body.publishyear,
        sayfaSayisi: req.body.pagecount
      })

      res.end()
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