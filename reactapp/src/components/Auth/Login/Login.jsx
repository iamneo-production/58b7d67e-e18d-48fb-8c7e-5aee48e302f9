/* The code is a React component for a login page. It imports necessary dependencies such as React,
axios, react-bootstrap, react-router-dom, react-toastify, and react-spinners. It also imports a
configuration file for API URLs. */
import React, { Fragment, useState } from 'react';
import axios from "axios";
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../Styling/LoadingScreen.css';
import '../../Styling/login.css';
import 'react-toastify/dist/ReactToastify.css'
import { RiseLoader } from 'react-spinners';
import { API_URLS } from '../../Apis/config.js';


export const UserContext = React.createContext();

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { userLogin, adminLogin } = API_URLS;

  const navigate = useNavigate();
  const handleEmailChange = (value) => {
    setEmail(value);
  };
  const handlePasswordChange = (value) => {
    setPassword(value);
  };
  /* The `handleSave` function is triggered when the user clicks on the login button. It prevents the
  default form submission behavior, sets the `isLoading` state to `true` to display a loading
  screen, and creates a `data` object with the email and password entered by the user. */
  const handleSave = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const data = {
      email: email,
      password: password
    };
 
    axios.post(userLogin, data).then((result) => {
      if (result.data === true) {
        localStorage.setItem("email", email)
        setIsLoading(false);
        toast.success("User Logged in Successfully");
        setTimeout(() => {
          navigate('/user/Homepage', { state: { email } });
        }, 1000);
      } else {
        axios.post(adminLogin, data).then((result) => {
          if (result.data === true) {
            localStorage.setItem("email", email)
            setIsLoading(false);
            toast.success("Admin Logged in Successfully");
            setTimeout(() => {
              navigate('/admin/AddCenter');
            }, 1000);
            // navigate to the admin page
          } else {
            setIsLoading(false);
            toast.warning("User not found!")
          }
        });
      }
    });
  };
  
  return (
    <Fragment>
      {isLoading && (
    <div className="loading-screen">
      <div className="loading-popup">
        <div className="loading-content">
          <div style={{ fontFamily: 'Times New Roman', fontWeight: 'bold', fontSize: '1.2em' }}>
            Hold ON...
          </div>&nbsp;&nbsp;
          <RiseLoader color="blue" loading={true} size={15} /> 
        </div>
      </div>
    </div>
  )}
  
  <div className={isLoading ? "blur-background" : ""}></div>
      <ToastContainer />
      <div className="login-page">
      <div className="login-container">
        <div className="login-card" data-testid='loginBox'>
          <h1 className="login-heading">Kraft-Cam Services</h1>
      <div className='form-container'>
        <Form  className='login-form' onSubmit={handleSave}>
          <center>
            <Form.Group className='input-field'>
            <Form.Control className='form-control' type="email" id="email" placeholder="Enter Email" data-testid='email' onChange={(e) => handleEmailChange(e.target.value)}
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" title='Enter valid email address' required />
            </Form.Group>
            <Form.Group className='mb-3'>
              <div className='password-input-wrapper'>
                <Form.Control
                  className='form-control password-input'
                  type={showPassword ? 'text' : 'password'}
                  id='password'
                  placeholder='Password'
                  data-testid='password'
                  onChange={(e) => handlePasswordChange(e.target.value)}
                  required
                />
                <span
                  className={`password-toggle-icon ${showPassword ? 'active' : ''}`}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? '🙈' : '👁️'}
                </span>
              </div>
            </Form.Group>
            <Button type='submit' data-testid='loginButton' id='loginButton'>
              Login
            </Button>
            <Form.Text>
              <br/>
              &nbsp; New User/admin?
              <a className="link-btn"  href='/signup' data-testid='signupLink' id='signupLink'>
                Signup
              </a>
              {/* <Link  to="/signup" id='signupLink'>Sign Up</Link>  */}
            </Form.Text>
          </center>
        </Form>
      </div>
      </div></div></div>
    </Fragment>
  );
}
export default Login;









