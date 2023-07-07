/* The above code is a React component for a signup form. It allows users to register as either an
admin or a user. The form collects the user's email, username, mobile number, password, and confirms
the password. It also includes form validation for email, username, mobile number, and password
fields. */
import React, { Fragment, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Form, Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import '../../Styling/LoadingScreen.css';
import '../../Styling/signup.css';
import {  ScaleLoader } from 'react-spinners';
import axios from "axios";
import { API_URLS } from '../../Apis/config.js';

function Signup(){
    const [Usertype, setAdminOrUser] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUserName] = useState('');
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleAdminUserChange = (value) => {
        setAdminOrUser(value.toLowerCase());
    }

    const handleEmailChange = (value) => {
        setEmail(value.toLowerCase());
    }
    const handleUsernameChange = (value) => {
        setUserName(value);
    }
    const handleMobileChange = (value) => {
        setMobile(value);
    }
    const handlePasswordChange = (value) => {
        setPassword(value);
    }

    const handleConfrimPasswordChange = (value) => {
        setConfirmPassword(value);
    }

    const navigate = useNavigate();
   /**
    * The `handleSave` function is used to handle the form submission for adding a user or admin,
    * making an API call to the appropriate endpoint based on the selected user role.
    * @returns The function `handleSave` does not have a return statement.
    */
    const handleSave = (e) => {
        e.preventDefault();        
        setIsLoading(true);
        const data = {
            Email: email,
            UserName : username,
            MobileNumber: mobile,
            Password: confirmPassword,
            UserRole : Usertype
        };
        if (password !== confirmPassword) {
            setIsLoading(false);
            toast.warning("Passwords do not match");
            return;
        }
         if (Usertype === "user") {      
            axios.post(API_URLS.userSignUp, data).then((result) => {
                if (result.data === 'User Added'){
                setIsLoading(false);
                toast.success("User Added");
                setTimeout(() => {
                    navigate("/");
                }, 3000);
                }else if(result.data === 'Email Id or Mobile Number already Exists!'){
                    setIsLoading(false);
                    toast.error(result.data)
                }
            }).catch((error) => {
                setIsLoading(false);
                alert(error);
            })
        }else if(Usertype === "admin"){
            axios.post(API_URLS.adminSignUp, data).then((result) => {
                if (result.data === 'Admin Added'){
                setIsLoading(false);
                toast.success("Admin Added");
                setTimeout(() => {
                    navigate("/");
                }, 3000);
                }else if(result.data === 'Email Id or Mobile Number already Exists!'){
                    setIsLoading(false);
                    toast.error(result.data)
                }
            }).catch((error) => {
                setIsLoading(false);
                alert(error);
            })
        }
    }
    return (
        <Fragment>
            {isLoading && (
    <div className="loading-screen">
      <div className="loading-popup">
        <div className="loading-content">
          <div style={{ fontFamily: 'Times New Roman', fontWeight: 'bold', fontSize: '1.2em' }}>
            Please wait...
          </div>&nbsp;&nbsp;
          <ScaleLoader color="black" loading={true} size={20} /> 
        </div>
      </div>
    </div>
  )}
  
  <div className={isLoading ? "blur-background" : ""}></div>
        <ToastContainer/>
        <div className="signup-page">
        <div className="signup-container">
        <div className="signup-card">
        <Form  className="signup-form" onSubmit={handleSave} >
            
        <center>
        <h1 className="signup-heading">Register</h1>
        <Form.Group className="mb-3">
        <Form.Control
        className="form-control"
        type="text"
        id="adminuser"
        placeholder='Enter admin/user'
        onChange={(e) => handleAdminUserChange(e.target.value)} pattern="(admin|user|User|Admin)" 
        title='Enter admin or user only '  required/>
        </Form.Group>
        <Form.Group className="mb-3">
        <Form.Control className='form-control' type="email" name="email" id="email" data-testid='email' placeholder="Enter Email"  onChange={(e) => handleEmailChange(e.target.value)} 
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" title="Enter valid email" required/>
        </Form.Group>
        <Form.Group className="mb-3">
        <Form.Control type="text" id="username" name="username" placeholder="Enter Username" data-testid='username' onChange={(e) => handleUsernameChange(e.target.value)} 
            pattern='^[A-za-z]+$' title="Enter only alphabets" required/>
        </Form.Group>
        <Form.Group className="mb-3">
        <Form.Control className='form-control' type="number" id="mobileNumber" data-testid='mobileNumber' placeholder="Enter Mobilenumber"  onChange={(e) => handleMobileChange(e.target.value)}
          pattern="^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6789]\d{9}$" title="Enter valid phone number" required/>
        </Form.Group>
        <Form.Group className="mb-3">
        <Form.Control className='form-control' type="password" id="password" data-testid='password' placeholder="Password" onChange={(e) => handlePasswordChange(e.target.value)} 
         pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain at least one number and one uppercase and lowercase letter, must contain 8 characters" required />
        </Form.Group>
        <Form.Group className="mb-3">
        <Form.Control className='form-control' type="password" id="confirmPassword" placeholder="Confirm Password" onChange={(e) => handleConfrimPasswordChange(e.target.value)} pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain at least one number and one uppercase and lowercase letter, and must contain 8 characters" required/>
        </Form.Group>
        <Button type='submit' id="submitButton" data-testid='submitButton'>Register</Button><br></br>
        <Form.Text id='signupLink' data-testid='signinLink'>
        <label className='label' style={{ color: '#f4ecec' }}>
                Already User/Admin?</label><Link to="/">Login</Link>
        </Form.Text>
        </center>
        </Form>
        </div></div></div>
    </Fragment>
    )
}
export default Signup;