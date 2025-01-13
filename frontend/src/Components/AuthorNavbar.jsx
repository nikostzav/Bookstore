import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function AuthorNavbar(props) {
  return (
    <nav className="navbar opacity-75 border-bottom border-black bg-light w-100">
            <div className="container-fluid d-flex justify-content-arround my-2">
                <div className="mx-3 "><h5>Bookstore Demo</h5></div>
                <div className="h5">User: {props.username}</div>    
            </div>
        </nav>
  );
}

export default AuthorNavbar;