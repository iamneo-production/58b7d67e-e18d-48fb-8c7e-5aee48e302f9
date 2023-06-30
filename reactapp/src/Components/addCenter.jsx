import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css'; 
import {Box} from '@mui/material';


function AddCenter() {

  return (
    <div>
<Box sx={{ display: "flex" ,flexDirection:"column" }}>
    <Box sx={{
       display: "flex",
       minHeight: "80px" ,
       width:"100%",
       position:"fixed"
     }}> </Box></Box>
     </div>
  );
}

export default AddCenter;