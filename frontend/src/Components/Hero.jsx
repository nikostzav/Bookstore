import { useState } from "react";
import { Link } from "react-router-dom";
import SignUpModal from './SignUpModal';
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";

const Hero = () => {
    const [loginForm,setLoginForm] = useState(true)
    return(
        <div className="p-3 vh-100" style={{overflow:"auto",minHeight:"100%", backgroundImage:"url('https://assets-global.website-files.com/6452fc5f71b71358e5f0d512/646fb86b1290570260e81265_61afaf738e3ac728b1f1a25f_Blog%2520headers%2520(1).png')", backgroundSize:"cover"}} >
            <div className="container my-3 justify-content-center" >
                <div className="row vh-80">
                    <div className="col text-start text-center bg-dark bg-opacity-75 rounded-pill">
                        <div className="container-fluid h">
                            <h1 className="display-4 mt-5 p-4  text-light">Empowering Minds Through Books</h1><br />
                            <p className=" col-lg-10 fs-4 mx-5 mt-4 p-4 text-white lead">Welcome to our treasure trove of book reviews! Here, you'll find insights into the latest literary wonders. Whether it's mystery, romance, or sci-fi, we've got you covered. Let our reviews guide you through the sea of literature</p>
                        </div>
                    </div>
                    <div className="col">
                        <div className="form mt-4 mx-5 rounded bg-white opacity-75 " style={{boxShadow: "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px"}}>
                            {loginForm ? <> <LoginForm /> <p className="p-3 mb-0 bg-primary rounded text-white border border-black opacity-60">Don't have an account? <button className="btn btn-link text-white " onClick={() => {setLoginForm(false)} } >Sign up</button></p> </> : <><SignUpForm /> <p className="fs-6 p-3 mb-0 bg-primary rounded border border-black opacity-60 text-white">Already have an account?<button className="btn btn-link text-white" onClick={()=>{setLoginForm(true)}}>Sign in</button></p></>}
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero;