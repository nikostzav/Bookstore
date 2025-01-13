import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';

function Example(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const [title,setTitle] = useState('');
  const [desc,setDesc] = useState('');
  const [price,setPrice] = useState();
  const [category,setCategory] = useState('');
  const [img,setImg] = useState('');

  const handleClose2 = async () => {
    setShow(false);
    console.log('TITLE: ' + title + '\n DESCRIPTION : ' + desc + '\n Price : ' + price + '\n Category : ' + category + '\n Image : ' + img);
    try{
        const response = await  axios.post("http://localhost:8000/api/postBook",{
          'title': title,
          'username': props.username,
          'id': props.id,
          'desc': desc,
          'price': price,
          'img': img,
          'category': category
        })
        console.log(response);
      }
      catch{
        console.log("Error uploading review")
      }
}


  return (
    <>
      {/* <Button variant="warning" onClick={handleShow}>

      </Button> */}
      <div className="card m-3 customDiv authorCard bg-warning" onClick={handleShow}>
                    <div className="card-body">
                        <h5 className="card-title">Add book</h5>
                        <h6 className="card-subtitle mb-2 text-muted h1 mt-2" style={{border:'1px solid black',borderRadius:'50%'}}><i class="bi bi-plus-lg"></i></h6>
                        
                        {/* <button className="btn btn-primary">Details</button> */}
                    </div>
            </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Book</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
          <Form.Group className="mb-3">
              <Form.Label>Author</Form.Label>
              <Form.Control
                type="text"
                placeholder={props.username}
                readOnly
               
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                autoFocus
                onChange={(e) => {setTitle(e.target.value)}}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={3} onChange={(e) => {setDesc(e.target.value)}}/>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                onChange={(e) => {setPrice(e.target.value)}}
              
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Fiction, Romance, Sci-Fi"
                onChange={(e) => {setCategory(e.target.value)}}
               
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Image Url</Form.Label>
              <Form.Control
                type="text"
                 onChange={(e) => {setImg(e.target.value)}}
               
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose2}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Example;