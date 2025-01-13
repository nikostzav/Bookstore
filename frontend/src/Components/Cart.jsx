import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Cart(props) {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  // const [cart,setCart] = useState({'title': 'asd' , 'qnt' : 2});
  const handleClose = async () => {
    setShow(false)
    console.log('NEW ORDER NOOK TITLE: ' + props.title + '  QNT: ' + props.num )
     try{
        const response = await axios.post("http://localhost:8000/api/postOrder",{
          'title': props.title,
          'id': props.id,
          'qnt': props.num
        })
        console.log(response);
      }
      catch{
        console.log("Error uploading Order")
      }
      navigate('/books',{state:{username: props.username,cart:props.cart}});
    
  };
  const handleShow = () => setShow(true);


  const [title,setTitle] = useState(props.title);

  const handleClose2 = () => { 
    setTitle(null)
    setShow(false);
    navigate('/books',{state:{username: props.username,cart:props.cart}});
  }

  useEffect(()=>{
    setTitle(props.title);
  },[props.title])

  const [number,setNumber] = useState(props.num);
  useEffect(() => {
    setNumber();
  },[number])

  return (
    <>
      {/* <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button> */}
      <i class="bi bi-cart-fill fs-4 d-inline mx-2" style={{cursor:'pointer'}} onClick={handleShow} >Cart</i>
        {console.log('BOOK TITLE AND ID : ' + props.title + props.id)}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Shoping cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>{title && props.qnt!=0 ? <div className='container d-flex justify-content-center'> <div className='col'><h4>{props.title}</h4></div><div><h3>{props.num} </h3> </div></div> : <div>Cart is empty</div>}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose2}>
            Continue Shopping
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Buy
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Cart;