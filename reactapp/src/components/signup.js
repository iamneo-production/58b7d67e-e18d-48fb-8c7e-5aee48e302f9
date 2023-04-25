import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
//import './signup.css'

function Signup() {
    return (
        <div style={myStyle}>
            <div style={{ display: "flex", height: "100vh", alignItems: "center"}}>
                <center style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", width: "50%", }}>
                <div className="color" style={{ display: "flex", flexDirection: "column",  padding: "30px", borderRadius: "25px" }}> 
                    <h2 className='signup' style={{ color: "black" ,fontSize:"25px", }}>Register</h2><br></br>
                    <form method="post">
                    <div class="txt_field" id='admin/user'>
                        <input type="text" required placeholder="Enter admin/user"></input>
                    </div>
                    <div class="txt_field" id='email'>
                        <input type="text" required placeholder='Enter Email'></input>
                    </div>
                    <div class="txt_field" id='username'>
                        <input type="text" required placeholder='Enter Username'></input>
                    </div>
                    <div class="txt_field" id='mobileNumber'>
                        <input type="number" required placeholder='Enter Mobilenumber'></input>
                    </div>
                    <div class="txt_field" id='password'>
                        <input type="password" required placeholder='Enter Password'></input>
                    </div>
                    <div class="txt_field"id='confirmPassword'>
                        <input type="password" required placeholder='Conform Password'></input>
                    </div>
                    <input type="submit" value="Submit" id="submitButton"></input>
                    <div class="signup_link" id="signinLink">
                        Already a user?<a>< Link to="/login">Login</Link></a>
                    </div>
                    </form>
                </div>
                </center>
            </div>
        </div>
    );
}

const myStyle = {
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
};

export default Signup;