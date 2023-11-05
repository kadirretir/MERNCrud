import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import styles from "./assets/css/createbook.module.css";
import axios from "axios";
import { styled } from "@mui/material/styles";
import { v4 as uuidv4 } from 'uuid';


const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const CreateBook = () => {
  const navigate = useNavigate();
  const [newBook, setNewBook] = useState({
    bookname: "",
    authorname: "",
    publishor: "",
    publishyear: "",
    pagecount: "",
  });

  // Resim dosyasının yükleneceği state
  const [imageFile, setImageFile] = useState();


  // Validasyon hatalarının tutulacağı state
  const [validationErrors, setValidationErrors] = useState({
    booknameError: "",
    authornameError: "",
    publishorError: "",
    publishyearError: "",
    pagecountError: "",
    imageFileError: "",
  });


  // Kitap bilgilerinin gönderileceği form ve validasyon işlemleri
  const submitAddBook = async (e) => {
    e.preventDefault();

    let checkIfAnyError = false;

    // BOOKNAME ERROR HANDLER
    if (newBook.bookname.trim() === "") {
      setValidationErrors((prev) => ({
        ...prev,
        booknameError: "*Lütfen bir kitap ismi giriniz...",
      }));

      checkIfAnyError = true;
    } else {
      setValidationErrors((prev) => ({
        ...prev,
        booknameError: "",
      }));
    }

    // AUTHORNAME ERROR HANDLER
    if (newBook.authorname.trim() === "") {
      setValidationErrors((prev) => ({
        ...prev,
        authornameError: "*Lütfen yazar ismi giriniz...",
      }));

      checkIfAnyError = true;
    } else {
      setValidationErrors((prev) => ({
        ...prev,
        authornameError: "",
      }));
    }

    // PUBLISHOR ERROR HANDLER
    if (newBook.publishor.trim() === "") {
      setValidationErrors((prev) => ({
        ...prev,
        publishorError: "*Lütfen yayınevi giriniz...",
      }));

      checkIfAnyError = true;
    } else {
      setValidationErrors((prev) => ({
        ...prev,
        publishorError: "",
      }));
    }

    // publishyear error handler
    if (newBook.publishyear.trim() === "") {
      setValidationErrors((prev) => ({
        ...prev,
        publishyearError: "*Lütfen kitabın yayın yılını yazınız...",
      }));

      checkIfAnyError = true;
    } else {
      setValidationErrors((prev) => ({
        ...prev,
        publishyearError: "",
      }));
    }

    // pagecount error handler
    if (newBook.pagecount.trim() === "") {
      setValidationErrors((prev) => ({
        ...prev,
        pagecountError: "*Lütfen kitabın sayfa sayısını giriniz...",
      }));

      checkIfAnyError = true;
    } else {
      setValidationErrors((prev) => ({
        ...prev,
        pagecountError: "",
      }));
    }


    //  IMAGE ERROR HANDLER
    if (typeof imageFile === "undefined") {
      setValidationErrors((prev) => ({
        ...prev,
        imageFileError: "*Lütfen bir resim seçiniz...",
      }));

      checkIfAnyError = true;
    } else {
      setValidationErrors((prev) => ({
        ...prev,
        imageFileError: "",
      }));
    }

    // Hata yoksa axios post isteği gönder 
    if (!checkIfAnyError) {
      try {
         const formData = new FormData();
         formData.append("uploadmyfile", imageFile);
         // Bir ID oluştur ve aynı ID ile dinamik olarak kitap bilgisini back-end'e gönder
        const getID = uuidv4();
        // KİTAP OLUŞTUR
         const sendBookData = await axios.post(`https://mern-project-kadir.onrender.com/submitBook/newBook/${getID}`, newBook);
         // OLUŞTURULAN KİTABA BİR RESİM EKLE
        const sendImageData = await axios.post(`https://mern-project-kadir.onrender.com/submitBook/${getID}`, formData);
    
        if (sendBookData && sendImageData ) {
          navigate("/");
        }
      } catch (error) {
        throw new Error(error);
      }
    }
  };

  // Input girdilerini newBook state'ine aktar
  const handleChange = (e) => {
    setNewBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // GET IMAGE NAME TO THE STATE
  const imageHandler = (e) => {
    // const altDize = e.target.value.split("fakepath\\")[1];
    setImageFile(e.target.files[0]);
  };

  return (
    <Grid container maxWidth={"lg"} style={{ margin: "5rem auto" }}>
      <Box
        onSubmit={submitAddBook}
        action="/submitBook"
        method="POST"
        component="form"
        encType="multipart/form-data"
        style={{ margin: "0 auto" }}
        sx={{
          "& .MuiTextField-root": { m: 1 },
          width: 500,
          maxWidth: "100%",
        }}
      >
        <h1 style={{ textAlign: "center" }}>KİTAP EKLE</h1>
        <Grid item md={"auto"}>
          <TextField
            onChange={handleChange}
            required
            fullWidth
            id="bookname"
            name="bookname"
            label="Kitap İsmi"
            variant="standard"
          />
          <h5 style={{ color: "red" }}>
            {validationErrors.booknameError !== ""
              ? validationErrors.booknameError
              : null}
          </h5>
        </Grid>

        <Grid item md={"auto"}>
          <TextField
            onChange={handleChange}
            required
            fullWidth
            id="authorname"
            name="authorname"
            label="Kitabın Yazarı"
            variant="standard"
          />
          <h5 style={{ color: "red" }}>
            {validationErrors.authornameError !== ""
              ? validationErrors.authornameError
              : null}
          </h5>
        </Grid>

        <Grid item md={"auto"}>
          <TextField
            onChange={handleChange}
            required
            fullWidth
            id="publishor"
            name="publishor"
            label="Yayınıevi"
            variant="standard"
          />
          <h5 style={{ color: "red" }}>
            {validationErrors.publishorError !== ""
              ? validationErrors.publishorError
              : null}
          </h5>
        </Grid>

        <Grid item md={"auto"}>
          <TextField
            onChange={handleChange}
            required
            fullWidth
            id="publishyear"
            type="number"
            name="publishyear"
            label="Yayın Yılı"
            variant="standard"
          />
          <h5 style={{ color: "red" }}>
            {validationErrors.publishyearError !== ""
              ? validationErrors.publishyearError
              : null}
          </h5>
        </Grid>

        <Grid item md={"auto"}>
          <TextField
            onChange={handleChange}
            required
            fullWidth
            id="pagecount"
            type="number"
            name="pagecount"
            label="Sayfa Sayısı"
            variant="standard"
          />
          <h5 style={{ color: "red" }}>
            {validationErrors.pagecountError !== ""
              ? validationErrors.pagecountError
              : null}
          </h5>
        </Grid>

        <Grid item md={"auto"}>
          <Button
            style={{ display: "flex", margin: "2rem auto" }}
            component="label"
            variant="contained"
            startIcon={<CloudUploadIcon />}
            color="secondary"
          >
            Bir Resim Yükleyin
            <VisuallyHiddenInput
              type="file"
              accept="image/png, image/jpeg, image/jpg"
              name="uploadmyfile"
              id="uploadmyfile"
              onChange={imageHandler}
            />
          </Button>
          <h5 style={{ color: "red" }}>
            {validationErrors.imageFileError !== ""
              ? validationErrors.imageFileError
              : null}
          </h5>
        </Grid>

        <input
        className={styles.button}
          type="submit"
          value="Ekle"
          style={{margin: "1rem auto", display: "flex" }}
        />
      </Box>
    </Grid>

  );
};

export default CreateBook;
