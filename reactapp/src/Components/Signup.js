
import React, { Fragment, useState } from 'react';
import axios from "axios";
import { Link } from "react-router-dom"

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
            alert("Passwords do not match");
            return;
        }
        if (Usertype === "admin") {
            const url2 = '';
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
            const url1 = '';
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
                alert(error);
            })
        }

    }
    return (
        <Fragment>
            <div>Registration</div>
           
            <input type="text" id="admin/user" placeholder="Enter admin/user"  onChange={(e) => handleAdminUserChange(e.target.value)} required></input><br></br>
        
            <input type="email" id="email" placeholder="Enter Email"  onChange={(e) => handleEmailChange(e.target.value)} required></input><br></br>
            
            <input type="text" id="username" placeholder="Enter Username"  onChange={(e) => handleUsernameChange(e.target.value)} required></input><br></br>
           
            <input type="text" id="mobileNumber" placeholder="Enter Mobilenumber"  onChange={(e) => handleMobileChange(e.target.value)} required></input><br></br>
            
            <input type="password" id="password" placeholder="Password" onChange={(e) => handlePasswordChange(e.target.value)} required ></input><br></br>

            <input type="password" id="confirmPassword" placeholder="Confirm Password" onChange={(e) => handleConfrimPasswordChange(e.target.value)} required></input><br></br>
            

            <button onClick={() => handleSave()} id="submitButton">Register</button>
            <div id='signuplink'>
                Already a user?<a><Link to="/">Login</Link></a>
            </div>

        </Fragment>
    )
}

export default Signup