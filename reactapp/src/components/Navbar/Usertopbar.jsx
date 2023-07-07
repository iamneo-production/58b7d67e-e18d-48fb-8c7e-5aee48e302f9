/* The above code is a React component called "Usertopbar" that represents the top bar of a user
interface. It includes an app bar with a logo and user information, as well as a dropdown menu for
editing the user's profile. The component also includes a modal for editing the user's profile
information, such as email, username, mobile number, and password. The component uses various React
Bootstrap components and makes API requests to fetch and update user data. */
import { Avatar,AppBar, Toolbar, Typography } from "@mui/material";
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
import Modal from 'react-bootstrap/Modal';
import { Form, Button, Nav} from 'react-bootstrap';
import { Eye, EyeSlash, PencilSquare } from 'react-bootstrap-icons';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import Dropdown from 'react-bootstrap/Dropdown';
import { API_URLS } from "../Apis/config";


function Usertopbar  ()  {
  const[editUsername, seteditUsername] = useState('');
  const[editEmailId, seteditEmailId] = useState('');
  const[editContactNumber, seteditContactNumber] = useState('');
  const[editPassword, seteditPassword] = useState('');
  const [userId, setUserId] = useState();
  const[userName, setUserName] = useState("")
  const[userPage,setUserPage] = useState("");
  const[showProfile,setShowProfile] = useState(false);
  const handleShowProfile =() => setShowProfile(true);
  const [showPassword, setShowPassword] = useState(false);

const handleClose = () => {
  setShowProfile(false);
}
const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  /* The `useEffect` hook is used to perform side effects in a functional component. In this case, the
  effect is triggered only once when the component is mounted (empty dependency array `[]`), and it
  fetches user data from the server based on the email stored in the local storage. */
  useEffect(() => {
    const email = localStorage.getItem("email")
     axios.get(`${API_URLS.getUserByEmailId}?email=${email}`)
    .then((result)=>{
      setUserName(result.data.userName)
      localStorage.setItem("username", result.data.userName)
      setUserId(result.data.userId)
      setUserPage(localStorage.getItem("userPage"))
    }).catch((error)=>{
    })         
  }, [])
  
/**
 * The function "changeProfile" retrieves user data from an API and sets the retrieved data to state
 * variables.
 */
  const changeProfile = () => {
    handleShowProfile();
    axios.get(`${API_URLS.getUserByUserId}/${userId}`)
    .then((result)=>{
      seteditUsername(result.data.userName)
      seteditEmailId(result.data.email)
      seteditContactNumber(result.data.mobileNumber)
      seteditPassword(result.data.password)
  }).catch((error)=>{
  })
}
/**
 * The above code defines four functions in JavaScript React that handle changes to email, username,
 * mobile number, and password values.
 */
  const handleEmailChange = (value) => {
    seteditEmailId(value.toLowerCase());
  };
  
  const handleUsernameChange = (value) => {
    seteditUsername(value);
  };
  
  const handleMobileChange  = (value) => {
    seteditContactNumber(value);
  };
  
  const handlePasswordChange = (value) => {
    seteditPassword(value);
  };

  /**
   * The function `updateProfile` updates the user's profile information by making a PUT request to the
   * server with the updated data.
   */
  const updateProfile = () =>{
    const data = {
      Email : editEmailId,
      Password : editPassword,
      UserName : editUsername,
      MobileNumber: editContactNumber,
      UserRole:'user',
    }
    axios.put(`${API_URLS.editUserById}/${userId}`, data)
    .then((result)=>{
      setUserName(editUsername);
      setShowProfile(false);
      if(result.data === 'User Details Updated'){
      toast.success("Profile Updated");
      }else{
        toast.error("Mobile or Email Id already exists")
      }
      }).catch((error)=>{
        toast.error(error)
      })
  }

  return (
    <>
    <AppBar
    position="static"
    sx={{
      backgroundColor: "#fff",
      color: "#000",
      paddingTop :"10px"
  }}>
      <Toolbar>
      <Nav style={{fontFamily:"sans-serif", fontSize:"x-large",fontWeight:"600"}}> {userPage} &nbsp;</Nav>
        <Typography variant="h4" sx = {{flexGrow : 1}} align="center"fontFamily="serif" fontWeight="900"  >
          Kraft Cam 
           
        <img
              src={API_URLS.imageSrc}
              alt=""
              style={{ width: '50px'}}
            />
        </Typography>
        <Nav style={{fontFamily:"cursive",fontSize:"larger",fontWeight:"500"}}>Hello, {userName} &nbsp;</Nav>
        <>
      <Avatar></Avatar>
      <br />
      <div className="usertopbar">
      <Dropdown>
        <Dropdown.Toggle variant="default" id="dropdown-basic">
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={changeProfile}>
            Edit Profile &nbsp;
            <PencilSquare size={24} />
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
    </>
        </Toolbar>
        <ToastContainer/>
    </AppBar>
     
     <Modal
     show={showProfile}
     onHide={handleClose}
     backdrop="static"
     keyboard={false}
   >
     <Modal.Header closeButton>
       <Modal.Title>My Account</Modal.Title><br></br>
       
     </Modal.Header>
     <Modal.Body>
     
      <Form.Group className="mb-3">
         <Form.Control className='form-control' placeholder='email' type="email"  value={editEmailId}
           onChange={(e) => handleEmailChange(e.target.value)}  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"  required/>
         </Form.Group>
         <Form.Group className="mb-3">
         <Form.Control type="text"  placeholder="Username" 
         value={editUsername} onChange={(e) => handleUsernameChange(e.target.value)} required/>
         </Form.Group>
         <Form.Group className="mb-3">
         <Form.Control className='form-control' type="tel"  placeholder="Mobilenumber" onChange={(e) => handleMobileChange(e.target.value)}
          value={editContactNumber} pattern="^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$" title="invalid mobile" required/>
         </Form.Group>
         <Form.Group className="mb-3">
   <div className="input-group">
     <Form.Control
       className="form-control"
       type={showPassword ? 'text' : 'password'}
       
       onChange={(e) => handlePasswordChange(e.target.value)}
       value={editPassword}
       placeholder="Password"
       required
     />
     <div className="input-group-append">
       <Button
         variant="outline-secondary"
         onClick={togglePasswordVisibility}
       >
         {showPassword ? <EyeSlash /> : <Eye />}
       </Button>
     </div>
   </div>
 </Form.Group>
     </Modal.Body>
     <Modal.Footer>
       <Button variant="secondary" onClick={handleClose}>
         Close
       </Button>
       <Button variant="info" onClick={()=> updateProfile()}>Save Changes</Button>
     </Modal.Footer>
   </Modal>
   </>
   
  );
};

export default Usertopbar;