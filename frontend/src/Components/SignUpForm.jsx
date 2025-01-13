import { Link } from "react-router-dom";
import { useState } from "react";
import Form from 'react-bootstrap/Form';
import axios from 'axios';
const SignUpForm = () => {


    const [alert,setAlert] = useState(false);
    const [emailValidationAlert,setEmailValidationAlert] = useState(false)

    const signUpHandler =async () => {
        
        console.log("Sign up clicked with username: " + username + " email: " + email + " password: " + password + " role: " + role);
        if(checkRegisterInfo(username,email,password)){
          const result = await axios.post('http://localhost:8000/api/registerUser',{
            'username': username,
            'password': password,
            'email': email,
            'role': role
          }).then(()=>{console.log("Signed up user succeffuley")})
      }
    }

    function checkRegisterInfo(username,email,password) {
      if(username && email && password){
        setAlert(false);
        return true;
      }else{
        setAlert(true);
      }
    }

    const [role,setRole] = useState(0);

    const [username,setUsername] = useState();
    const [password,setPassword] = useState();
    const [email,setEmail] = useState();

    return(
        <div>
            <div className="form m-5 bg-white opacity-75">
            <label className="mt-5 " htmlFor="username"> Username </label> <br />
            <input className="mt-1" type="text" onChange={(e) => {setUsername(e.target.value)}} ></input> <br />
            <label className="mt-4" htmlFor="email"> Email </label> <br />
            <input className="mt-1" type="email" onChange={(e) => {setEmail(e.target.value)}} ></input> <br />
            <label className="mt-4 " htmlFor="password">Password</label> <br />
            <input className="mt-1" type="password" onChange={(e) => {setPassword(e.target.value)}} ></input> <br />
            {/* <input className="mt-1" type="select"></input> <br />
            <button className="m-5 btn btn-primary rounded" onClick={signUpHandler}>Sign Up</button> */}
            <div className="container text-center">
            <Form.Label className="mt-4 justify-content-center text-center">Register as</Form.Label>
              <Form.Select className="ml-5 p-2 text-center mt-1  pl-5 border border-dark" defaultValue={role} onChange={choise => {setRole(choise.target.value)}}>
                <option value="0">User</option>
                <option value="1">Author</option>
              </Form.Select>  
              </div>
              {alert ? <div className="alert alert-danger mt-3">Not valid data</div> : null }
              <button className="mt-4 btn btn-primary rounded border border-black" onClick={signUpHandler}>Sign Up</button> 
        </div>
        </div>
    )

}

export default SignUpForm;