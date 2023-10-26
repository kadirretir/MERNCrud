import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx';
import CreateBook from './CreateBook.jsx';
import Header from './Header.jsx';
import './assets/css/main.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";


const router = createBrowserRouter([
  {
    path: "/",
    element: <>
    <Header />
    <App />
    </>,
  },
  {
    path: "addBook",
    element: <>
    <Header/>
    <CreateBook />
    </>,
  }
]);


ReactDOM.createRoot(document.getElementById('root')).render(
<React.StrictMode>

    <RouterProvider router={router} />

  </React.StrictMode>
)
