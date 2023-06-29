import { Avatar,AppBar, Toolbar, Typography } from "@mui/material";
import React, { useEffect, useState } from 'react';
import { Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
import { API_URLS } from "../Apis/config";

function Admintopbar  ()  {
 
  const[userName, setUserName] = useState("")
  const[adminPage,setAdminPage] = useState("");


  useEffect(() => {
    const email = localStorage.getItem("email")
    axios.get(`${API_URLS.getAdminByEmailId}/?email=${email}`)
    .then((result)=>{
      setUserName(result.data.username)
      localStorage.setItem("username", result.data.username)
      setAdminPage(localStorage.getItem("adminPage"))
    }).catch((error)=>{
    })    
  }, [])


  return (
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
        <Nav style={{fontFamily:"cursive",fontSize:"larger",fontWeight:"500"}}>Hello, {userName} &nbsp;</Nav>
        <Avatar/>        
        </Toolbar>
    </AppBar>
  );
};

export default Admintopbar;