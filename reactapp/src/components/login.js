import React from 'react';
import { Link } from "react-router-dom";
//import './login.css'

function Login() {
    return (
        <div style={myStyle}>
            <div style={{ display: "flex", height: "100vh", alignItems: "center"}}>
                <center style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", width: "50%", }}>
                    <div className="colors" style={{ display: "flex", flexDirection: "column",  padding: "50px", borderRadius: "10px" }}>

                        <h2 style={{ color: "black" , fontSize:"25px" }}>Login</h2><br></br>
                         
                        <form method="post">
                        <div class="txt_field" id='email'>
                            <input type="text" required placeholder='Enter Email'></input>
                        </div>
                        <div class="txt_field" id='password'>
                            <input type="password" required placeholder='Enter Password'></input>
                        </div>
                            < input type="submit" value="Login" id='loginbutton' classname ="login"></input>
                        <div class="signup_link" id='signuplink'>
                            New User/admin?<a><Link to="/signup">Sign Up</Link></a>
                        </div>
                        </form>
                    </div>
                </center>
            </div>
        </div>
    );
}

const myStyle = {
    backgroundColor: 'light brown',
    backgroundSize: 'cover',
    //backgroundRepeat: 'no-repeat',
};

export default Login;