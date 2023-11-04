import React from 'react'
import styles from './assets/css/header.module.css';
import {Link} from 'react-router-dom';
import Button from '@mui/material/Button'

const Header = () => {
  return (
    <div id={styles.containerr}>
      <div className={styles.innerContainer}>
          <div className={styles.logoLeft}>
          <Link to="/" className={styles.logo} >KITABEVIM</Link>
          </div>
    
          <nav id={styles.nav}>
          <Link to="/"><Button variant={'contained'}  className={styles.links} color="success">Kitaplar</Button></Link> 
          <Link to="/addBook"><Button variant={'contained'}  className={styles.links} color="success">Yeni Kitap Ekle</Button></Link> 
          </nav>
      
      
      </div>
    </div>
  )
}

export default Header