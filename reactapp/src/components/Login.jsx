import React, { Fragment, useState } from 'react';
import axios from "axios";
import {  Button ,Form} from 'react-bootstrap';
import {  useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

export const UserContext = React.createContext();

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  

  const navigate = useNavigate();


  const handleEmailChange = (value) => {
    setEmail(value);
  };

  const handlePasswordChange = (value) => {
    setPassword(value);
  };

  const handleSave = (e) => {
    e.preventDefault();
    const data = {
      Email: email,
      Password: password
    };
  
    const url1 = 'https://localhost:44303/api/Auth/isUserPresent';
    const url2 = 'https://localhost:44303/api/Auth/isAdminPresent';
    // const url3 = `https://localhost:44303/api/Auth/getUserDetails/?email=${email}`
  
    axios.post(url1, data).then((result) => {
      if (result.data === true) {
        toast.success("User Logged in Successfully");
      localStorage.setItem("email", email)
        navigate('/user/Homepage', { state: { email } });
        // navigate to the home page
      } else {
        axios.post(url2, data).then((result) => {
          if (result.data === true) {
            toast.success("Admin Logged in Successfully");
            localStorage.setItem("email", email)
            navigate('/admin/addServiceCenter'); // navigate to the admin page
          } else {
            toast.warning("User not found!")
          }
        });
      }
    });
  };

  const formStyle = {
    width: '400px',
    margin: '0 auto',
    border: '2px solid black',
    padding: '20px',
    marginTop: '200px'
  }
   return (
     
      <Fragment>
              <ToastContainer/>
     <div className='form-container'>
    
    <Form style={formStyle} className="my-form" onSubmit={handleSave}>
      <center>
      <Form.Label className='form-label'>Login</Form.Label>
    <Form.Group className="mb-3">
    <Form.Control className='form-control' type="text"  id="email" placeholder="Enter Email" onChange={(e) => handleEmailChange(e.target.value)} required/>
    </Form.Group>
    <Form.Group className="mb-3">
    <Form.Control className='form-control' type="password" id="Password" placeholder="Password" onChange={(e) => handlePasswordChange(e.target.value)} required/>
    </Form.Group>
    <Button type="submit" id="loginButton">Login</Button>
    <Form.Text id='signuplink'>
        New User/admin?<Link to="/signup">Sign Up</Link>
    </Form.Text>
    </center>
    </Form>
    </div>
      </Fragment>
    );
  
}

export default Login;

    
    
    
    /*
     <input type="email"  id="email" placeholder="Enter Email" onChange={(e) => handleEmailChange(e.target.value)} required></input><br/><br/>
        <input type="password" id="Password" placeholder="Password" onChange={(e) => handlePasswordChange(e.target.value)} required></input><br/>
        <Button type="submit" onClick={() => handleSave()} id="loginButton">Login</Button>
        New User/admin?<Link to="/Signup">Sign Up</Link>
    */




