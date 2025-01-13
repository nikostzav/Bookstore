import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Books from './Pages/Books';
import { createBrowserRouter,RouterProvider,Route } from "react-router-dom";
import BooksDetails from './Pages/BooksDetails';
import Author from './Pages/Author';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/books",
    element: <Books /> 
  },
  {
    path: "/BooksDetails/:title",
    element: <BooksDetails />
  },
  {
    path: 'author',
    element: <Author />
  }

])


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
