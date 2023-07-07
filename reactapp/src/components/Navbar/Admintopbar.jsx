/* The code you provided is a functional component in JavaScript React that renders a top bar for an
admin page. */
import { Avatar,AppBar, Toolbar, Typography } from "@mui/material";
import React, { useEffect, useState } from 'react';
import { Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
import { API_URLS } from "../Apis/config";

function Admintopbar  ()  {
 
  const[UserName, setUserName] = useState("")
  const[adminPage,setAdminPage] = useState("");


  /* The `useEffect` hook is used to perform side effects in a functional component. In this case, it
  is used to fetch data from an API and update the component's state. */
  useEffect(() => {
    const email = localStorage.getItem("email")
    axios.get(`${API_URLS.getAdminByEmailId}/?email=${email}`)
    .then((result)=>{
      setUserName(result.data.userName)
      localStorage.setItem("username", result.data.userName)
      setAdminPage(localStorage.getItem("adminPage"))
    }).catch((error)=>{
    })    
  }, [])


  return (
    /* The code you provided is a functional component in JavaScript React that renders a top bar for
    an admin page. */
    <AppBar
    position="static"
    sx={{
      backgroundColor: "#fff",
      color: "#000",
      paddingTop :"10px"
  }}>
        <Toolbar>
      <Nav style={{fontFamily:"sans-serif", fontSize:"x-large",fontWeight:"600"}}> {adminPage} &nbsp;</Nav>
        <Typography variant="h4" sx = {{flexGrow : 1}} align="center"fontFamily="serif" fontWeight="900"  >
          Kraft Cam            
        <img
              src={API_URLS.imageSrc}
              alt=""
              style={{ width: '50px'}}
            />
        </Typography>
        <Nav style={{fontFamily:"cursive",fontSize:"larger",fontWeight:"500"}}>Hello, {UserName} &nbsp;</Nav>
        <Avatar/>        
        </Toolbar>
    </AppBar>
  );
};

export default Admintopbar;