import React, {useEffect, useState} from 'react'
import { useNavigate  } from "react-router-dom";
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button'
import styles from './assets/css/createbook.module.css'
import axios from 'axios';

const CreateBook = () => {

  const navigate = useNavigate();
  const [newBook, setNewBook] = useState({
    bookname: "",
    authorname: "",
    publishor: "",
    publishyear: "",
    pagecount: ""
  });

  const [validationErrors, setValidationErrors] = useState({
    booknameError: "",
    authornameError: "",
    publishorError: "",
    publishyearError: "",
    pagecountError: ""
  });


  
  
const submitAddBook = async (e) => {
  e.preventDefault();

  let checkIfAnyError;

  // BOOKNAME ERROR HANDLER
  if (newBook.bookname.trim() === "") {
       setValidationErrors((prev) => ({
      ...prev,
      booknameError: "*Lütfen bir kitap ismi giriniz..."
    }));


    checkIfAnyError = true;
  } else {
    setValidationErrors((prev) => ({
      ...prev,
      booknameError: ""
    }));

    checkIfAnyError = false;
  }

   // AUTHORNAME ERROR HANDLER
  if (newBook.authorname.trim() === "") {
       setValidationErrors((prev) => ({
      ...prev,
      authornameError: "*Lütfen yazar ismi giriniz..."
    }));

    checkIfAnyError = true;
  } else {
    setValidationErrors((prev) => ({
      ...prev,
      authornameError: ""
    }));

    checkIfAnyError = false;
  }


  // PUBLISHOR ERROR HANDLER
  if (newBook.publishor.trim() === "") {
    setValidationErrors((prev) => ({
   ...prev,
   publishorError: "*Lütfen yayınevi giriniz..."
 }));

 checkIfAnyError = true;
} else {
 setValidationErrors((prev) => ({
   ...prev,
   publishorError: ""
 }));

 checkIfAnyError = false;
}


// publishyear error handler
if (newBook.publishyear.trim() === "") {
  setValidationErrors((prev) => ({
 ...prev,
 publishyearError: "*Lütfen kitabın yayın yılını yazınız..."
}));

checkIfAnyError = true;
} else {
setValidationErrors((prev) => ({
 ...prev,
 publishyearError: ""
}));

checkIfAnyError = false;
}

// pagecount error handler
if (newBook.pagecount.trim() === "") {
  setValidationErrors((prev) => ({
 ...prev,
 pagecountError: "*Lütfen kitabın sayfa sayısını giriniz..."
}));

checkIfAnyError = true;
} else {
setValidationErrors((prev) => ({
 ...prev,
 pagecountError: ""
}));


checkIfAnyError = false;
}

if(!checkIfAnyError) {
try {
      const sendData = await axios.post("http://localhost:3000/submitBook", newBook);

      if(sendData) {
        navigate("/");
      }
    } catch (error) {
      throw new Error(error)
    }
  
}

}

const handleChange = (e) => {
setNewBook((prev) => ({...prev, [e.target.name]: e.target.value}));
}

  return (
    <Grid container maxWidth={'lg'} style={{ margin: "5rem auto" }}>
          <Box
        onSubmit={submitAddBook}
        action='/submitBook'
        method='POST'
        component="form"
        style={{margin: "0 auto"}}
        sx={{
          '& .MuiTextField-root': { m: 1 },
          width: 500,
          maxWidth: '100%',
        }}
        noValidate
        autoComplete="off"
      >

        <h1 style={{textAlign: "center"}}>KİTAP EKLE</h1>
        <Grid item md={"auto"}>
           <TextField onChange={handleChange} required fullWidth id="bookname" name='bookname' label="Kitap İsmi" variant="standard" />
           <h5 style={{color: "red"}}>{validationErrors.booknameError !== "" ? validationErrors.booknameError : null}</h5>
        </Grid>

        <Grid item md={"auto"}>
        <TextField onChange={handleChange} required fullWidth id="authorname" name='authorname' label="Kitabın Yazarı" variant="standard" /> 
        <h5 style={{color: "red"}}>{validationErrors.authornameError !== "" ? validationErrors.authornameError : null}</h5>
        </Grid>

        <Grid item md={"auto"}>
        <TextField onChange={handleChange} required fullWidth id="publishor" name='publishor' label="Yayınıevi" variant="standard" />
        <h5 style={{color: "red"}}>{validationErrors.publishorError !== "" ? validationErrors.publishorError : null}</h5>
        </Grid>

        <Grid item md={"auto"}>
        <TextField onChange={handleChange} required fullWidth id="publishyear" type='number' name='publishyear' label="Yayın Yılı" variant="standard" />
        <h5 style={{color: "red"}}>{validationErrors.publishyearError !== "" ? validationErrors.publishyearError : null}</h5>
        </Grid>

        <Grid item md={"auto"}>
        <TextField onChange={handleChange} required fullWidth id="pagecount" type='number' name='pagecount' label="Sayfa Sayısı" variant="standard" />
        <h5 style={{color: "red"}}>{validationErrors.pagecountError !== "" ? validationErrors.pagecountError : null}</h5>
        
        </Grid>
     
            <Button type='submit' variant={'contained'} style={{width: "400px", margin: "1rem auto", display: "flex"}} color="success">Ekle</Button>
          
        </Box>

    </Grid>
    
  )
}

export default CreateBook