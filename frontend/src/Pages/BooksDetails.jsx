import { useParams } from "react-router-dom"
import axios from 'axios'
import { useState , useEffect, useContext } from "react"
import Image from "react-bootstrap/esm/Image"
import Navbar from "../Components/Navbar"
import "bootstrap-icons/font/bootstrap-icons.css";
import Stars from "../Components/Stars"
import Reviews from "../Components/Reviews"
import Modal2 from "../Components/Modal"
import { useLocation } from "react-router-dom"
import { Context } from "../App"


const BooksDetails = (props) => {

    const res = useParams()
    const location = useLocation();
    const {username} = location.state;
    // //CART LOGIC
    // const {cart} = location.state
    // console.log('CART FROM BOOKDETAILS: ' , cart);
    // const [currentCart,setCurrentCart] = useState([cart]);
    // //CART LOGIC
    const [book,setBook] = useState([]) ;
    const [number,setNumber] = useState(1);

    const [cartQnt,setCartQnt] = useState(0);

    const book1 = async () => {
        await axios.get(`http://localhost:8000/api/searchBook/${res.title}`)
        .then(response => {
            const bookToRender = response.data[0];
            console.log(response.data[0]);
            setBook(bookToRender);
        })
        .catch(err => {console.log("Error: " + err)})
        
    }

    

    useEffect( () => {
        book1();
    },[])

    const incrementNumber = () => {
        setNumber(number + 1);
        console.log("Increment clicked with username: " + username);
    }

    const decreaseNumber = () => {
        number > 0 ? setNumber(number-1) : setNumber(0) ;
    }
    const [passTitle,setPassTitle] = useState();
    const [passNumber,setPassNumber] = useState(0);
    function handleBuy(){
        setCartQnt(cartQnt + number);
        setPassNumber(number);
        setPassTitle(book.title)
        console.log('current book: ' + book.title + 'Qnt: ' + (number));
    }

    return(
    <div>
    <Navbar username={username} title={passTitle} num={passNumber} id={book.id} />
    <div className="container bg-white mt-5 text-center rounded border">
        <div className="row row-cols-1 row-cols-md-1 row-cols-lg-2 g-4  bg-white rounded">
            <div className="col my-5 bg-white">
                <Image src={book.imagesrc} style={{height: "500px"}} /> 
            </div>
            <div className="col pt-4 text-center justify-content-center border-left">
                <h1 className="display-4 ">{book.title}</h1>
                <h5 className="text-muted lead">Author: {book.author}</h5>
                <p className="mt-5 mx-5 h6 text-start mb-5 p-0 lead">{book.description}</p>
                <div className="lead">Category: {book.category}</div>
                <hr className="m-4" />
                <div className="">
                    <h4 className="p-3">Reviews: <Stars reviews={book.reviews}/> </h4>
                </div>
                <hr  className=" m-4"/>

                {/* <h3 className="bg-dark text-center text-warning m-5 p-3 rounded">$ {book.price}</h3> */}
                <div className="d-flex justify-content-center gap-5">
                    <div className="border border-dark p-3 rounded bg-muted" style={{boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px, rgb(51, 51, 51) 0px 0px 0px 3px;"}}>
                        <div className="d-flex justify-content-center text-center">
                        <h6 className="m-2">Quantity:</h6> 
                            <button className="btn btn-danger p-0 m-2" onClick={decreaseNumber} >
                                <i class="bi bi-dash-lg m-2"></i>
                            </button>
                            <h6 className="m-2 p-1">{number}</h6>
                            <button className="btn btn-success p-0 m-2" onClick={incrementNumber}>
                                <i class="bi bi-plus-lg  m-2"></i>
                            </button>
                        </div>
                </div>
                </div>
                <div className="d-flex justify-content-center gap-5 mt-5">
                    <button className="btn btn-outline-success w-25 fs-3" onClick={handleBuy}>To Cart ${book.price}</button>
                    <Modal2 book_id={book.id} username={username}/>
                </div>
                
            </div>
        </div>
        <div className="m-5">
            <Reviews id={book.id}/>
        </div>
    </div>
    </div>
    )

}

export default BooksDetails