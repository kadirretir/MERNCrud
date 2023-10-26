import React, {useEffect, useState} from 'react'
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import {Link} from 'react-router-dom';
import styles from './assets/css/app.module.css';

function App() {

  const [Books, setBooks] = useState([])
  
useEffect(() => {
  const fetchAll = async () => {
    try {
      const res = await axios.get("http://localhost:3000/getBooks");
      setBooks(res.data)
    } catch (error) {
      throw new Error(error)
    }
  }

  fetchAll()
}, [])
  return (
    <div style={{margin: "5rem 0"}}>
         <h1 align="center">Kitaplar</h1>
      <Grid spacing={2} container maxWidth={'lg'} style={{ margin: "0 auto" }}>
        {Books.map((book, id) => {
          {console.log(book)}
          return (
            <Grid item md={3} key={id}>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                alt="green iguana"
                height="140"
           
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
                <Button size="small">Düzenle</Button>
                <Button size="small">Sil</Button>
              </CardActions>
            </Card>
          </Grid>
          )
        })}
      </Grid>

     
    </div>
  )
}

export default App
