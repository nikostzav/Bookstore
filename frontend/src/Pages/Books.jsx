import { useLocation } from "react-router-dom"
import Navbar from "../Components/Navbar";
import BookCard from "../Components/BookCard";
import Sidebar from "../Components/Sidebar";
import BooksContainer from "../Components/BooksContainer";
import { useState } from 'react'
const Books = (props) => { 
    const location = useLocation();
    const {username} = location.state;
    const {cart} = location.state;


    console.log("Username from Books page: " + username);
    //console.log('CART FROM BOOKS PAGE: ' + cart[0].title );
    
    return(
        //style={{background:"rgb(51,51,51);",background: "linear-gradient(90deg, rgba(51,51,51,1) 0%, rgba(0,0,0,1) 2%, rgba(250,201,0,1) 100%)",minHeight:"100%"}} //paste this for background
        <div >   
            <Navbar  username={username}/>
            {/* {cart.length > 0 ? console.log('CART FROM BOOKS: ', cart) : null}     */}
            <div className="container-fluid d-flex" style={{}}>
                {/* <div  className="col-3"><Sidebar /></div> */}
                <div className="col-12  my-2 mx-0"><BooksContainer username={username} cart={cart}/></div>
            </div>
          
        </div>
        
    )
}

export default Books; 