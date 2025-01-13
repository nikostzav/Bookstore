import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';


function Example() {
  const navigate = useNavigate;
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = () => {
    console.log("Signing user with username: " + username + " password: " + password + " email: " + email + " Role: " + role);
    navigate('/books');
    setShow(false);
  }

  const [username,setUsername] = useState();
  const [password,setPassword] = useState();
  const [email,setEmail] = useState();
  const [role,setRole] = useState();

  return (
    <>
      <Button variant="link" onClick={handleShow}>
        SignUp
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Register Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                onChange={e => {setUsername(e.target.value)}}
                autoFocus
              />
            </Form.Group>
             <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder=""
                onChange={e => {setPassword(e.target.value)}}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="example@email.com"
                onChange={e => {setEmail(e.target.value)}}
              />
            </Form.Group>
            
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Register as</Form.Label>
              <Form.Select onChange={choise => {setRole(choise.target.value)}}>
                <option value="0">Select</option>
                <option value="1">User</option>
                <option value="2">Author</option>
              </Form.Select>             
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Example;