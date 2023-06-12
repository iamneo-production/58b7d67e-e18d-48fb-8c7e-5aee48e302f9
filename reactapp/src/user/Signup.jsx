import React, { Fragment, useState } from 'react';
import axios from "axios";
import { Link } from "react-router-dom";
import { Form, Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import {  useNavigate } from "react-router-dom";

function Signup(){
    const [Usertype, setAdminOrUser] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUserName] = useState('');
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

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
    const handleSave = (e) => {
        e.preventDefault();        

        const data = {
            
            email: email,
            username : username,
            mobilenumber: mobile,
            password: password,
            userrole : Usertype
        };
        if (password !== confirmPassword) {
            toast.warning("Passwords do not match");
            return;
        }
         if (Usertype === "user") {
                         
            const url1 = 'https://8080-cddafbcbabccadefcdadfcefbadbddebabfddbdad.project.examly.io/api/Auth/user/signup';
            axios.post(url1, data).then((result) => {
                if (result.data === 'User Added'){
                toast.success("User Added");

                setTimeout(() => {
                    navigate("/");
                }, 3000);
                }else{
                    toast.error("Email Id or Mobile Number already exist")
                }
            }).catch((error) => {
                alert(error);
            })
        }
        
    }

    const formStyle = {
        width: '400px',
        margin: '0 auto',
        border: '2px solid black',
        padding: '20px',
        marginTop: '120px'
      }

    return (
        <Fragment>
        <ToastContainer/>
        <Form style={formStyle} className="my-form" onSubmit={handleSave} >
        <center>

        <Form.Label>Registration</Form.Label>
        <Form.Group className="mb-3">
            
        <Form.Control
    className="form-control"
    type="text"
    data-testid="adminuser"
    placeholder='type - "user"'
    onChange={(e) => handleAdminUserChange(e.target.value)} pattern="(admin|user)" 
    title="Enter admin or user only"  required/>
        </Form.Group>

        <Form.Group className="mb-3">
        <Form.Control className='form-control' type="email" id="email" placeholder="Enter Email"  onChange={(e) => handleEmailChange(e.target.value)} 
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" title="Enter valid email" required/>
        </Form.Group>
        <Form.Group className="mb-3">
        <Form.Control type="text" id="username" placeholder="Enter Username"  onChange={(e) => handleUsernameChange(e.target.value)} 
            pattern='^[A-za-z]+$' title="Enter only alphabets" required/>
        </Form.Group>
        <Form.Group className="mb-3">
        <Form.Control className='form-control' type="number" id="mobileNumber" placeholder="Enter Mobilenumber"  onChange={(e) => handleMobileChange(e.target.value)}
          pattern="^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6789]\d{9}$" title="Enter valid phone number" required/>
        </Form.Group>
        <Form.Group className="mb-3">
        <Form.Control className='form-control' type="password" id="password" placeholder="Password" onChange={(e) => handlePasswordChange(e.target.value)} 
         pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" required />
        </Form.Group>
        <Form.Group className="mb-3">
        <Form.Control className='form-control' type="password" id="confirmPassword" placeholder="Confirm Password" onChange={(e) => handleConfrimPasswordChange(e.target.value)} required/>
        </Form.Group>
        <Button type='submit'   id="submitButton">Register</Button><br></br>
        <Form.Text id='signupLink'>
            Already a user?&nbsp;&nbsp;<Link to="/">Login</Link>
        </Form.Text>
        </center>
        </Form>
    </Fragment>

    )
}

export default Signup