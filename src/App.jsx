import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from "axios";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField"
import {Link} from 'react-router-dom';


function App() {
  const [Books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedBook, setEditedBook] = useState(null);


  // DÜZENLEME KAYDEDİLDİĞİNDE VERİTABANINDAKI API'YE ISTEKTE BULUN
  const handleSaveChanges = async () => {
    setIsEditing(!isEditing)
    try {
      await axios.post("https://mern-project-kadir.onrender.com/updateBook", editedBook)
      // useEffect hook'unu çalıştır ve güncel kitap bilgilerini al
      fetchBooks();
    } catch (error) {
      throw new Error(error)
    }
  }
  // Route yüklendiğinde kitapları al
  useEffect(() => {
    fetchBooks();
  }, [handleSaveChanges]);

  const fetchBooks = async () => {
    try {
      const res = await axios.get("https://mern-project-kadir.onrender.com/getBooks");
        setBooks(res.data);
      
      setIsLoading(false); 
    } catch (error) {
      console.error(error);
    }
  };


  // Düzenleye tıklandığında IsEditing State'ini güncelle ve editedBook'a düzenlenen kitabı yerleştir
  const handleEditClick = (id, book) => {
    setIsEditing(true);
    setEditedBook(book);
  };

 
  // Düzenleme modunda düzenlenen input içeriklerini editedBooks içerisindekilerden değiştir(ONCHANGE)
  const handleInputChanges = (e) => {
    setEditedBook((prevBook) => ({
      ...prevBook,
      [e.target.name]: e.target.value,
    }));
  }

  // TIKLANAN SİL BUTONUNA AİT KİTABI SİLECEK API'YE ISTEKTE BULUN
  const handleDelete = async (id) => {
    try {
      await axios.post(`https://mern-project-kadir.onrender.com/deleteBook/${id}`)
    } catch (error) {
      throw new Error(error)
    }
  }

  return (
    <div style={{ margin: "5rem 0" }}>
      <h1 align="center" style={{ marginBottom: "2rem" }}>
        Kitaplar
      </h1>
      <Grid   direction="row"
  justifyContent="center"
  alignItems="center" spacing={2} container maxWidth={"xl"}  style={{ margin: "0 auto" }}>
                    {isLoading ? (
            <Box sx={{ width: "100%" }}>
              <LinearProgress color="success" />
            </Box>
          ) : Books.length === 0 ? (
            <>
            <h1 align="center">Herhangi bir kitap bulunamadı. <br />

            <Link to="/addBook"  color="green">Kitap Ekleyebilirsiniz</Link>
            </h1>
    
            </>

          ) : (
            Books.map((book, id) => {
              return (
                <Grid item lg={3} key={id} >
                      {/* Düzenleme moduna girildiyse tıklanan kitaba özel farklı bir UI ver ve diğerlerini olduğu gibi sırala*/}
                  {isEditing ? (
                    book._id === editedBook._id ? (
                      <Card sx={{ maxWidth: 345 }}>
                        <CardMedia
                          component="img"
                          alt="green iguana"
                          height="500"
                          src={book.bookImage}
                        />
                        <CardContent>
                        <TextField id="ad" onChange={handleInputChanges} name="ad" margin="dense" value={editedBook.ad} label="Kitap İsmini Giriniz..." variant="standard" />
                       <TextField id="yazar" onChange={handleInputChanges} name="yazar" value={editedBook.yazar} label="Kitabın Yazarını Giriniz..." variant="standard" />
                       <TextField id="sayfaSayisi" onChange={handleInputChanges} type="number" name="sayfaSayisi" value={editedBook.sayfaSayisi} label="Kitabın Sayfa Sayısı..." variant="standard" />
                       <TextField id="yayinYili" onChange={handleInputChanges} name="yayinYili" value={editedBook.yayinYili} label="Kitabın Yayın Yılı..." variant="standard" />
                       <TextField id="yayinevi" onChange={handleInputChanges} name="yayinevi" value={editedBook.yayinevi} label="Kitabın Yayınevi..." variant="standard" />
                        </CardContent>
    
                        <CardActions>
                          <Button size="small" onClick={handleSaveChanges}>Kaydet</Button>
                          <Button size="small" onClick={() => setIsEditing(!isEditing)}>Düzenlemeden Çık</Button>
                        </CardActions>
                      </Card>
                    ) : (
                      <Card sx={{ maxWidth: 345 }}>
                        <CardMedia
                          component="img"
                          alt="green iguana"
                          height="500"
                          src={book.bookImage}
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
                          <Button
                            onClick={() => handleEditClick(id, book)}
                            size="small"
                          >
                            Düzenle
                          </Button>
                          <Button color="error" size="small">Sil</Button>
                        </CardActions>
                      </Card>
                    )
                  ) : (
                    <Card sx={{ maxWidth: 345 }}>
                      <CardMedia
                        component="img"
                        alt="green iguana"
                        height="500"
                        src={book.bookImage}
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
                        <Button
                          onClick={() => handleEditClick(id, book)}
                          size="small"
                        >
                          Düzenle
                        </Button>
                        <Button onClick={() => handleDelete(book._id)} color="error" size="small">Sil</Button>
                      </CardActions>
                    </Card>
                  )}
                </Grid>
              );
            })
          )}
      
      </Grid>
    </div>
  );
}

export default App;
