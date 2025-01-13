import Image from 'react-bootstrap/Image';
import axios from 'axios'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Cart from './Cart';

const BookCard = (props) => {

    async function handleClick(){
        console.log("Book clicked with title:" + props.title + "    and username is " + props.username);
    }

    //console.log('CART FROM BOOKCARDS: ' + props.cart[0].title);

    return(
        <Link to={`/BooksDetails/${props.title}`} state={{username:props.username, cart:props.cart}} >
        <div className='card d-flex h-100' onClick={handleClick} style={{boxShadow: "rgba(0, 0, 0, 0.15) 0px 15px 20px, rgba(0, 0, 0, 0.05) 0px 5px 10px",}}>
            <Image className='card-img-top bg-image hover-zoom mt-2' src={props.imageSrc} rounded />
            <div className='card-body d-flex flex-column text-center h-100 '>
                <div className='d-flex justify-content-between'>
                    <h5 className='' style={{maxHeight:"auto"}} title={props.title}>{props.title}</h5>
                    <p className='' style={{maxHeight:"auto"}}>{props.author}</p>
                </div>

                <div className='mb-0 m-5 class-body justify-content-between mt-2'>
                        <h5 className='mt-3 mb-0'> 
                        <i className='fa fa-star'></i>
                        {props.reviews}     
                        </h5>
                    </div>
                    <div className='w-100 card-footer mb-0 mt-auto '>
                        <h5 className=' text-warning bg-dark p-2 rounded align-text-bottom'>${props.price}</h5>
                </div>
            </div> 
                    
        </div>
        </Link>
    );
}

export default BookCard; 