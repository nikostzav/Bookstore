import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import {FaStar} from 'react-icons/fa'
import axios from 'axios'



  const  Modal2 = (props) =>  {

    const [show, setShow] = useState(false);
    const [desc,setDesc] = useState("");

    const changeHandler = (event) => {
        event.preventDefault();
        setDesc(event.target.value);
    }

    const handleClose = () => {
        setShow(false);
    }

    const handleSubmit =async  () => {
      setShow(false);
      const id = props.book_id;
      const username = props.username;
      const date = new Date()
      const today = date.getDate();
      const month = date.getMonth()+1;
      const year = date.getFullYear();
      const fullDate = today + "-" + month + "-" + year
      // console.log("Review added for book with id: " + props.book_id , desc,rating + "\n from user: " + props.username + "\n Date: " + fullDate);
      // try{
      //   // const response = await axios.post(`http://localhost:8000/api/setReview/${props.book_id}/${props.username}/${desc}/${rating}/${fullDate}`);
      //   const response = await axios.post("http://localhost:8000/api/setReview",null,{
      //     params:{
      //       id,
      //       username,
      //       desc,
      //       rating,
      //       fullDate
      //     }
      //   })
      //   console.log(response.data);
      // }
      try{
        const response = await  axios.post("http://localhost:8000/api/setReview",{
          'rating': rating,
          'bookId': id,
          'desc': desc,
          'users_name': username,
          'date': fullDate
        })
        console.log(response);
      }
      catch{
        console.log("Error uploading review")
      }
      
      
    }
    const handleShow = () => setShow(true);

    const [rating,setRating] = useState(null);
    const [hover,setHover] = useState(null);

    return (
    <>
      <Button variant="" onClick={handleShow} className='btn btn-outline-warning w-25'>
        Add Review
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label ><div className='mx-4'>Rating out of 5: </div></Form.Label>
              {[...Array(5)].map( (star,index) => {
                    const currentRating = index+1
                    return (
                        <label>
                            <input type='radio' style={{display:'none'}} name='rating' value={currentRating} onClick={() => {setRating(currentRating)}} />
                            <FaStar size={30} color={currentRating <= (hover || rating) ? "#ffc107" : "e4e5e9"} onMouseEnter={() => {setHover(currentRating)}} onMouseLeave={() =>{setHover(null)}} />
                        </label>
                    )
              })}
              
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Leave the review below</Form.Label>
              <Form.Control as="textarea" rows={3} onChange={changeHandler} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type="submit" onClick={handleSubmit}>
            Save Review
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Modal2;