import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from "axios";
import styles from "./assets/css/app.module.css";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";


// KITAPLARIN GÖSTERİLECEĞİ KOMPONENT

// const [InputValues, setInputValues] = useState({
//   bookname: "",
//   bookauthor: "",
//   bookpagecount: "",
//   bookpublishyear: "",
//   bookpublishor: "",
// })



// const handleInputChange = (e) => {
//   const { name, value } = e.target;
//   setInputValues((prev) => ({
//     ...prev,
//     [name]: value,
//   }));
// }
// Değişikliklerin yapılacağı komponent

function App() {
  const [changeToUpdate, setChangeToUpdate] = useState(false);
  const [Books, setBooks] = useState([]);
  const [ChosenBook, setChosenBook] = useState();

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const res = await axios.get("http://localhost:3000/getBooks");
        setBooks(res.data);
      } catch (error) {
        throw new Error(error);
      }
    };
    fetchAll();
  }, []);

  const handleChange = (id, book) => {
    setChangeToUpdate(!changeToUpdate)
    setChosenBook(book)
  }

  return (
    <div style={{ margin: "5rem 0" }}>
      <h1 align="center" style={{ marginBottom: "2rem" }}>
        Kitaplar
      </h1>
      <Grid spacing={2} container maxWidth={"lg"} style={{ margin: "0 auto" }}>
      {Books.length === 0 && (
    <>
      <Box sx={{ width: "100%" }}>
        <LinearProgress color="success" />
      </Box>
    </>
  )}
      {console.log(Books)}
  {Books.map((book, id) => {

    return (
      <Grid item md={3} key={id}>
        <Card sx={{ maxWidth: 345 }}>
                <CardMedia
            component="img"
            alt="green iguana"
            height="450"
            src={`../back-end/${book.imagePath}`}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {book.ad}
            </Typography>

            <Typography gutterBottom variant="h6" component="div">
              Yazar {book.yazar}
            </Typography>
            <Typography variant="body3" color="text.secondary">
              Toplam {book.sayfaSayisi} Sayfa
            </Typography>

            <Typography variant="body2" color="text.secondary">
              {book.yayinYili} Yılında Yayınlanmış
            </Typography>

            <Typography variant="body3" color="text.secondary">
              Yayınevi {book.yayinevi}
            </Typography>
          </CardContent>
           
          <CardActions>
            <Button onClick={() => handleChange(id, book)} size="small">Düzenle</Button>
            <Button size="small">Sil</Button>
          </CardActions>
        </Card>
      </Grid>
    );
  })}
      
      </Grid>
    </div>
  );
}

export default App;
