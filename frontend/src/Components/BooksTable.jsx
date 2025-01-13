import Table from 'react-bootstrap/Table';
import BookCard from '../Components/BookCard'

const BooksTable = (props) => {

    function renderBook(book) {
        console.log('Book fron function' + book.title);
        return(
            <tr>
                <td>{book.title}</td>
                <td>{book.reviews}</td>
                <td>Some actions</td>
            </tr>
        )

    }

    return(
    // <div className='bg-white mt-5' style={{width:'600px'}}>
    //     <Table striped bordered hover size="sm">
    //         <thead>
    //             <th>Title</th>
    //             <th>Reviews</th>
    //             <th>Actions</th>
    //         </thead>
    //         <tbody>
    //             <tr>
    //                 <td>{props.books[0].title}</td>
    //                 <td>{props.books[0].reviews}</td>
    //             </tr>
    //         </tbody>

    //     </Table>
    // </div>
    <div className='bg-white mt-5' style={{width:'800px'}}>
        <Table striped bordered hover>
            <thead className='border'>
                <th className='border'>Title</th>
                <th className='border'>Reviews</th>
                <th>Actions</th>
            </thead>
            <tbody>
                {props.books.map((book) => {
                        //renderBook(book);
                        return(
                        <tr>
                            <td className='d-flex'>{book.title}</td>
                            <td>{book.reviews}</td>
                            <td>Some actions</td>
                        </tr>

                        )
                    })}
            </tbody>

        </Table>
    </div>
    )
}

export default BooksTable;