import { useLocation } from "react-router-dom";
import AuthorNavbar from "../Components/AuthorNavbar";
import axios from 'axios'
import { useEffect, useState } from "react";
import BooksTable from '../Components/BooksTable';
import AuthorBookCard from "../Components/AuthorBookCard";
import Stars from '../Components/Stars';
import ReviewCard from "../Components/ReviewCard";
import authorStyles from './authorStyle.css';
import BookModal from '../Components/BookModal'

const Author = () => {
   
    const location = useLocation();
    const {username} = location.state;
    const [id,setId] = useState();
    const [books,setBooks] = useState([]);  
    const [showDetails,setShowDetails] = useState(false)
    const [reviews,setReviews] = useState([]);
    const [selectedBook,setSelectedBook] = useState({});
    const [selectedReview,setSelectedReview] = useState({});
    const [index,setIndex] = useState();
    const [qnt,setQnt] = useState(0);
    const author =  async () => {
         await axios.get('http://localhost:8000/api/getAuthoInfo/' + username)
        .then(async (res) => {
            // console.log('AUTHOR INFO : ' + res.data[0].id);
            setId(res.data[0].id);
        })
    }
    const getBooks =async () => {
        if(id){
         await axios.get('http://localhost:8000/api/getAuthorsBooks/' + id)
        .then((res) => {
            console.log(res.data);
            setBooks(res.data);
        })
    }
    }

    useEffect(()=> {
        author();
        getBooks();
    },[id])

    function renderBookCard(book) {
        // console.log('Maping books current: ' + book.title)
        return(
            <AuthorBookCard imagesrc={book.imagesrc} title={book.title} category={book.category} review={book.reviews}/>    
        )
    }

    async function getQuantity(title){
        await axios.get('http://localhost:8000/api/getQuantity/' + title)
        .then((res) => {setQnt(res.data[0].sum)
            console.log(res.data[0].sum);
        })
    }

    async function getReviews(id){
        // console.log('Trying to get reviews for book with id: ' + id);
        await axios.get('http://localhost:8000/api/getReviews/' + id)
        .then((res) => {
            console.log(res.data);
            setReviews(res.data);
        })
    }

    function handleNext() {
        if(reviews.length>index){
            setIndex(index+1);
            setSelectedReview(reviews[index]);
        }else if(reviews.length==index && index!=0){
            setIndex(0);
        }
    }

    function handlePrev(){
        if(index!=0){
            setIndex(index-1);
            setSelectedReview(reviews[index]);
        }else{
            setIndex(reviews.length - 1);
        }
    }

    return (
    <div className="container-fluid text-center" style={{
        // background: "rgb(238,174,202)",
        //background: 'radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)'
    }}
    >
        <div className="">
            <AuthorNavbar username={username}/>
        </div>

        <div className="text-center mt-3">
            <h3>Welcome {username}</h3>
        </div>
        <div className="mt-3 h6">
            Listed Books 
        </div>
        <div className="d-flex justify-content-center card-deck ">
            {/* <AuthorBookCard /> */}
            {/* {books.length>0 ?  renderBookCard(books[0])  : <>No listed books</>} */}
            {books.length > 0 ? books.map((book) => {return <div onClick={ () => {
                    setSelectedReview(undefined);
                    getQuantity(book.title);
                    setSelectedBook(book);
                    getReviews(book.id);
                    setShowDetails(true);
                    if(reviews.length>0){
                        setSelectedReview(reviews[0]);
                        setIndex(0);
                    }
                }}
                >
                {renderBookCard(book)}</div>}) : null}
                <BookModal username={username} id={id}/>

                {/* <div className="card m-3 customDiv authorCard bg-warning">
                    <div className="card-body">
                        <h5 className="card-title">Add book</h5>
                        <h6 className="card-subtitle mb-2 text-muted h1 mt-2" style={{border:'1px solid black',borderRadius:'50%'}}><i class="bi bi-plus-lg"></i></h6>
                        
                        
                    </div>
            </div> */}
        </div>
        {/* <div className="d-flex justify-content-center">
            <BooksTable books={books}/>
        </div> */}
        {showDetails ? 
        <div className="container-fluid rounded mt-4 d-flex flex-column" style={{height:"500px"}}>
            <div className="row">
            <div className="col rounded mt-3 mx-1 h-100" style={{boxShadow:"rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset"}}>
                <div className="text-center h3 mt-3">{selectedBook.title}</div>
                <div className="text-center h6">{selectedBook.category}</div>
                <div className="container">
                    <div className="row">
                        <div className="text-center rounded col-6" ><img className="border rounded" src={selectedBook.imagesrc}  style={{height:'300px'}}/></div>
                        <div className="col-3 text-center rounded">
                            <div className="mt-5 h5">Total sold </div>
                            <div className="mt-5 display-1 text-primary">{qnt===null?0:qnt}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col border border-black rounded mt-3 mx-1">
                <div className="text-center h3 mt-3">Reviews</div>
                {selectedReview ? 
                    <div className="d-flex justify-content-center align-items-center">
                        <div className=" m-2"><i className="bi bi-caret-left-fill fs-6 display-1 p-3" onClick={handlePrev}></i></div>
                            <div className="h-100">  
                                <ReviewCard title={selectedReview.user_name} text={selectedReview.review_text} date={selectedReview.review_date} review={selectedReview.rating}/>
                            </div>
                        <div className="m-2"><i class="bi bi-caret-right-fill fs-6 p-3" onClick={handleNext}></i></div>
                    </div> 
                    :
                     <div className="d-flex justify-content-center align-items-center h-90 display-6 text-danger">No reviews available</div>}
            </div>
            </div>
        </div>
        :
         <div className="container-fluid border rounded d-flex text-center  display-4 justify-content-center align-items-center" style={{height:"500px"}}>
            Select a book to display Data
         </div>
        }

        
    </div>
    )
} 

export default Author