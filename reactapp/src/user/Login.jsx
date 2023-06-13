import React, { Fragment, useState } from 'react';
import axios from "axios";
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css'


export const UserContext = React.createContext();

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false)
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
      email: email,
      password: password
    };
    const url1 = 'https://8080-cddafbcbabccadefcdadfcefbadbddebabfddbdad.project.examly.io/api/Auth/user/login';
    const url2 = 'https://8080-cddafbcbabccadefcdadfcefbadbddebabfddbdad.project.examly.io/api/Auth/admin/login';
    // const url3 = `https://localhost:44303/api/Auth/getUserDetails/?email=${email}`
    axios.post(url1, data).then((result) => {
      if (result.data === true) {
        localStorage.setItem("email", email)
        toast.success("User Logged in Successfully");
        
        setTimeout(() => {
          navigate('/user/Homepage', { state: { email } });
        }, 1000);

      } else {
        axios.post(url2, data).then((result) => {
          if (result.data === true) {
            localStorage.setItem("email", email)
            toast.success("Admin Logged in Successfully");
            setTimeout(() => {
              navigate('/admin/addServiceCenter');
            }, 1000);
            // navigate to the admin page
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
      <ToastContainer />
      <div className='form-container'>
        <Form style={formStyle} className="my-form" onSubmit={handleSave}>
          <center>
            <Form.Label className='form-label'>Login</Form.Label>
            <Form.Group className="mb-3">
            <Form.Control className='form-control' type="email" id="email" placeholder="Enter Email" onChange={(e) => handleEmailChange(e.target.value)}
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" title='Enter valid email address' required />
            </Form.Group>
            <Form.Group className="mb-3">
              <div className="password-input-wrapper">
                <Form.Control
                  className='form-control password-input'
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  placeholder="Password"
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
            <Button type="submit" id="loginButton">Login</Button>
            <Form.Text >
              &nbsp; New User/admin?
              <a href='/signup' id='signupLink'>Signup</a>
              {/* <Link  to="/signup" id='signupLink'>Sign Up</Link>  */}
            </Form.Text>
          </center>
        </Form>
      </div>
    </Fragment>
  );
}
export default Login;









