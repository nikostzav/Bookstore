import { renderMatches } from "react-router-dom";
import { useEffect, useState } from "react";
import BookCard from "./BookCard";
import axios from 'axios';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
// import DropDown from "cdbreact/dist/components/DropDown";



const BooksContainer = (props) => {

    const [apiBooks,setApiBooks] = useState([]);
    const [searchBook,setSearchBook] = useState('');

    const [authors,setAuthors] = useState([]);
    const [currAuthor,setCurrAuthor] = useState('');
    
    const getResults = async () => {
            await axios.get('http://localhost:8000/api/getAllBooks')
            .then(response => {
                const allBooks = response.data;
                setApiBooks(allBooks);
            })
            .catch( err => {console.log(err)})    
    }
    
    useEffect( () => {
        getResults()
    },[])

    // console.log(apiBooks);

    //console.log('CART FROM BOOKCONTAINER: ' + props.cart[0].title);

    function renderCards(book) {
        return (
            <div className="col mb-3">
                <BookCard title={book.title} reviews= {book.reviews} price={book.price} author={book.author} imageSrc={book.imagesrc} username={props.username} cart={props.cart} />
            </div>
        )
    }

    async function searchHandler(event){
        
        setSearchBook(event.target.value)

        await axios.get(`http://localhost:8000/api/searchByTitle/${event.target.value}`)
            .then( response => {
                setApiBooks(response.data);
                //console.log(response.data);
            } )
            .catch( err => {console.log(err)})
    }

    const getAuthors = async() => {
         await axios.get('http://localhost:8000/api/getAuthors')
        .then((response)=>{setAuthors(response.data)});
       // console.log(authors);
    }
   

    function renderAuthors(author){
        // return (<Dropdown.Item as="button">{author}asd</Dropdown.Item>)
        return(<Dropdown.Item as="button" value={author.author} onClick={ (e) => {
            setCurrAuthor(e.target.value);
            console.log('AUTHOR CLICKED: ',e.target.value);
            axios.get('http://localhost:8000/api/searchByAuthor/' + e.target.value ).then((result) => { 
                console.log(result); 
                setApiBooks(result.data);
                }).catch()
            
            }
            }>{author.author}</Dropdown.Item>)
    }


    const [categories,setCategories] = useState([]);
    const getCategories = async () => {
        await axios.get('http://localhost:8000/api/getCategories')
        .then((res) => {
            setCategories(res.data);
            console.log('Categories: ' + res.data);
        })


    }

     useEffect( () => {
        getAuthors();
        getCategories();
    },[])

    const [currCategory,setCurrentCategory] = useState();
    function renderCategories(category){
        
            return(
            <Dropdown.Item as="button" value={category} onClick={ (e) => {
                setCurrentCategory(e.target.value);
                console.log('Category clicked : ',e.target.value);
                axios.get('http://localhost:8000/api/searchByCategory/' + e.target.value ).then((result) => { 
                console.log(result); 
                setApiBooks(result.data);
                }).catch()
            
            }
            }>{category}</Dropdown.Item>)
    }

    return(
        <div className="container text-center">
                <div className="mb-2 p-2 text-white justify-content-center lead display-4">Available books</div>
                <div className="input-group rounded mx-5 p-5">
                    <input type="search" class="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" onChange={searchHandler} />
                    <span class="input-group-text border-0" id="search-addon">
                        <i class="fas fa-search"></i>
                    </span> 
                    
                </div>
                <div className="mb-5 d-flex gap-5 justify-content-center">
                <DropdownButton  variant="primary" className="" title="Author">
                    <Dropdown.ItemText className="h3">Our Authors</Dropdown.ItemText>
                     {authors.map((auth) => renderAuthors(auth))}
                </DropdownButton>

                <DropdownButton  className="" title="Category">
                    <Dropdown.ItemText className="h3">Categories</Dropdown.ItemText>
                    {categories.map((cat) => renderCategories(cat))}
                </DropdownButton>
                <button className="btn btn-primary" onClick={() => {getResults()}}>remove filters</button>
                </div>
                <div className="card-deck">
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4 py-0 rounded d-flex flex-fill" style={{boxShadow: "rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px"}}>
                    
                    {apiBooks.map(book => (renderCards(book)))}
                </div>
                </div>
                {apiBooks.length===0 ? <div className=" alert alert-danger">No book found</div> : null}
            </div>
    );
}

export default BooksContainer;