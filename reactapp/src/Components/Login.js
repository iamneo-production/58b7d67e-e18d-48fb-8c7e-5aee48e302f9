import React, { Fragment, useState } from 'react';
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export const UserContext = React.createContext();


function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  

  const navigate = useNavigate();


  const handleEmailChange = (value) => {
    setEmail(value);
  };

  const handlePasswordChange = (value) => {
    setPassword(value);
  };

  const handleSave = () => {
    const data = {
      Email: email,
      Password: password
    };

    const url1 = '';
    const url2 = '';

    axios.post(url1, data).then((result) => {
      if (result.data === true) {
        alert("User Logged in Successfully");
     
        navigate('/');
      } else {
        axios.post(url2, data).then((result) => {
          if (result.data === true) {
            alert("Admin Logged in Successfully");
         
            navigate('/');
          } else {
            alert("Invalid");
          }
        });
      }
    });
  };
    return (
      <Fragment>
        

        <div>Login</div>
        <input type="email"  id="email" placeholder="Enter Email" onChange={(e) => handleEmailChange(e.target.value)} required></input><br></br>
        <input type="password" id="Password" placeholder="Password" onChange={(e) => handlePasswordChange(e.target.value)} required></input><br></br>
        <button type="submit" onClick={() => handleSave()} id="loginButton">Login</button>
        <div id='signuplink'>
          New User/admin?<a><Link to="/Signup">Sign Up</Link></a>
        </div>

      </Fragment>
    );
  
}

export default Login;
