
import React, { Fragment, useState } from 'react';
import axios from "axios";
import { Link } from "react-router-dom";
import { Form, Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

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
    const handleSave = () => {
        const data = {
            Usertype : Usertype,
            Email: email,
            Username : username,
            Mobilenumber: mobile,
            Password: password
        };
        if (password !== confirmPassword) {
            toast.warning("Passwords do not match");
            return;
        }
        if (Usertype === "admin") {
            const url2 = 'https://localhost:44303/api/Auth/saveAdmin';
            axios.post(url2, data).then((result) => {
                if (result.data === 'Admin Successfully Registered'){
                setAdminOrUser('')
                setEmail('')
                setUserName('')
                setMobile('')
                setPassword('')
                setConfirmPassword('')
                alert(result.data);
                window.location.reload();
                }
            }).catch((error) => {
                alert(error);
            })
        } else if (Usertype === "user") {
            const url1 = 'https://localhost:44303/api/Auth/saveUser';
            axios.post(url1, data).then((result) => {
                if (result.data === 'User Successfully Registered');
                alert(result.data);
                setAdminOrUser(null)
                setEmail('')
                setUserName('')
                setMobile('')
                setPassword('')
                setConfirmPassword('')
                window.location.reload();
            }).catch((error) => {
                alert('Failed! Email Id or Mobile Number already exist');
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
            <Form style={formStyle} className="my-form">
            <center>
            <Form.Label>Registration</Form.Label>
            <Form.Group className="mb-3">
            <Form.Control className='form-control' type="text" id="admin/user" placeholder="Enter admin/user"  onChange={(e) => handleAdminUserChange(e.target.value)} required/>
            </Form.Group>
            <Form.Group className="mb-3">
            <Form.Control className='form-control' type="email" id="email" placeholder="Enter Email"  onChange={(e) => handleEmailChange(e.target.value)} required/>
            </Form.Group>
            <Form.Group className="mb-3">
            <Form.Control type="text" id="username" placeholder="Enter Username"  onChange={(e) => handleUsernameChange(e.target.value)} required/>
            </Form.Group>
            <Form.Group className="mb-3">
            <Form.Control className='form-control' type="text" id="mobileNumber" placeholder="Enter Mobilenumber"  onChange={(e) => handleMobileChange(e.target.value)} required/>
            </Form.Group>
            <Form.Group className="mb-3">
            <Form.Control className='form-control' type="password" id="password" placeholder="Password" onChange={(e) => handlePasswordChange(e.target.value)} required />
            </Form.Group>
            <Form.Group className="mb-3">
            <Form.Control className='form-control' type="password" id="confirmPassword" placeholder="Confirm Password" onChange={(e) => handleConfrimPasswordChange(e.target.value)} required/>
            </Form.Group>
            <Button onClick={() => handleSave()} id="submitButton">Register</Button><br></br>
            <Form.Text id='signuplink'>
                Already a user?&nbsp;&nbsp;<Link to="/">Login</Link>
            </Form.Text>
            </center>
            </Form>
        </Fragment>
    )
}

export default Signup