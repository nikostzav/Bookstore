import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SignUpModal from './SignUpModal'
import axios from 'axios'
import { Navigate } from "react-router-dom";
import Cart from "./Cart";
const LoginForm = () => {

    const [alert,setAlert] = useState(false);

    const [username,setUsername] = useState();
    const [password,setPassword] = useState();
    const [id,setId] = useState();
    
    const navigate = useNavigate();


    const [data,setData] = useState();

    async function handleSubmit2(event) {
        event.preventDefault();
        console.log("Button clicked with info: " + username + " " + password);
        //console.log(user);
        

            await axios.get(`http://localhost:8000/api/getUser/${username}/${password}`)
            .then( res => {
                setData(res.data)
                //console.log(data)
            })
            // .then(() => {
            //     if(data=="2"){
            //         navigate('/books', {state:{username:username}});
            //     }
            // })    
            .catch(err => console.log(err))
            setAlert(true);
    }

    //Cart initialize
    const [cart,setCart] = useState([
        {
            title:'StartingTitle',
            qnt: 3
        }
    ]) ;

    const User = {
        username: "nikos",
        password: "12345"
    }

    function checkUser(username,password) {
        if(username===User.username && password===User.password){
            //console.log("Found user"); 
            return true;
        }else { 
            //console.log("User not found");
            return false;
        }
        
    }

    

    return(
        <div className="form m-5 rounded bg-white opacity-75">
            <label className="mt-5 " htmlFor="username"> Username </label> <br />
            <input className="mt-1" type="text" onChange={(e) => {setUsername(e.target.value)}}></input> <br />
            <label className="mt-4 " htmlFor="password">Password</label> <br />
            <input className="mt-1" type="password" onChange={(e) => {setPassword(e.target.value)}}></input> <br />
            {/* <Link to="/books" state={{username: username}}><button className="m-5 btn btn-primary rounded" onClick={handleSubmit2}>Sign in</button></Link> */}
            <button className="m-5 btn btn-primary rounded border border-black" onClick={handleSubmit2}>Sign in</button>
                <hr className="mt-0 mx-5 text-light " /> <br />
                {/* {
                   alert ? (data=="0" || data=="1") ? navigate('/books', {state:{username:username,cart:cart}}) : <div className="alert alert-danger">No user found</div> : null 
                }  */}

                {/* Redirect user if exists to the apropriate page (user page or author page) */}
                {data=="0" ? navigate('/books', {state:{username:username,cart:cart}}) : null}
                {data=="1" ? navigate('/author', {state:{username:username}}) : null}
                {alert && data!="0" && data!="1"? <div className="alert alert-danger">No user found</div> : null}
        </div>
    )
}

export default LoginForm