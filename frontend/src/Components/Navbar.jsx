import { TiArrowSortedDown } from "react-icons/ti";
import { useState } from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Cart from '../Components/Cart'
const Navbar = (props) => {

    return (
        <nav className="navbar opacity-75 border-bottom border-black">
            <div className="container-fluid d-flex justify-content-arround">
                <div className="mx-3 "><h5>Bookstore Demo</h5></div>
                <div className="h5">User: {props.username}</div>
                
                <div className="mx-5 my-0 d-flex">
                    {/* <i class="bi bi-person-fill mx-3 h4" onMouseEnter={handleProfileClick} onMouseLeave={handleProfileClick} >{color?<TiArrowSortedDown />:<TiArrowSortedDown color="white"/>}</i>  */}
                    {/* <DropdownButton variant="success" title="Profile">
                        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Sign out</Dropdown.Item>
                    </DropdownButton> */}
                    
                    <Cart qnt={props.cartQnt} title={props.title} username={props.username} cart={props.cart} num={props.num} id={props.id}/>
                    {props.cartQnt ? <p className="rounded-pill px-2 " style={{backgroundColor:'red'}}>{props.cartQnt}</p> : null}
                </div>
            </div>
        </nav>
    )
}

export default Navbar;