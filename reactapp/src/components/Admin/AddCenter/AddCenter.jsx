/**
 * The `AddCenter` function is a React component that renders a form for adding a service center,
 * including fields for center ID, name, phone number, address, image URL, email, cost, start time, end
 * time, and description.
 * @returns The component is returning a form for adding a service center. It includes input fields for
 * service center ID, name, phone number, address, image URL, email, cost, start time, end time, and
 * description. It also includes a submit button to add the service center.
 */

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import {Box} from '@mui/material';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import Adminsidebar from '../../Navbar/Adminsidebar';
import Admintopbar from '../../Navbar/Admintopbar';
import '../../Styling/LoadingScreen.css';
import {  FadeLoader } from 'react-spinners';
import { API_URLS } from '../../Apis/config.js';


function AddCenter() {
  
  const[adminPage] = useState('Add Service Center');
  const [addCenterId, setCenterId] = useState();
  const [addName, setName] = useState();
  const [addNumber, setNumber] = useState();
  const [addAddress, setAddress] = useState();
  const [addImageUrl, setImageUrl] = useState();
  const [addEmail, setEmail] = useState();
  const [addCost, setCost] = useState();
  const [addStartTime, setStartTime] = useState();
  const [addEndTime, setEndTime] = useState();
  const [addCentreDescription, setDescription] = useState();
  const [isLoading, setIsLoading] = useState(false);

 let navigate =useNavigate();

 /**
  * The above code defines several functions that handle changes to different input values.
  */

 const  handleCenterIdChange = (value) => {
    setCenterId(value);
  };

  const handleNameChange = (value) => {
    setName(value);
  };

  const handleNumberChange = (value) => {
    setNumber(value);
  };

  const handleAddressChange = (value) => {
    setAddress(value);
  };

  const handleImageUrlChange = (value) => {
    setImageUrl(value);
  };

  const handleEmailChange = (value) => {
    setEmail(value);
  };

  const handleCostChange = (value) => {
    const stringValue = value.toString(); 
    setCost(stringValue); 
  };

  const handleStartTimeChange = (value) => {
    setStartTime(value);
  };

  const handleEndTimeChange = (value) => {
    const formattedTime = moment(value, 'hh:mm A').format('HH:mm');
    setEndTime(formattedTime);
  };

  const handleDescriptionChange = (value) => {
    setDescription(value);
  };


  /* The `useEffect` hook in React is used to perform side effects in functional components. In this
  case, the `useEffect` hook is used to fetch user data based on the email stored in the local
  storage and check if the user role is "user". If the user role is "user", the email is removed
  from the local storage and the user is redirected to the loginpage ("/"). */

  useEffect(()=>{
    const email =localStorage.getItem('email')
    localStorage.setItem('adminPage', adminPage)
    axios.get(`${API_URLS.getUserByEmailId}?email=${email}`)
    .then((result)=>{
      if(result.data.userRole==="user"){
        localStorage.removeItem("email");
        navigate("/")
      }
    }).catch((error)=>{
    })
  },[navigate, adminPage])


 /**
  * The function calculates the intervals of 90 minutes between a start time and an end time.
  * @returns an array of moment objects representing the start time of each 90-minute interval between
  * the given start and end times.
  */


  function calculateTotalTime(startTime, endTime) {
    const start = moment(startTime, 'hh:mm A');
    const end = moment(endTime, 'hh:mm A');
  
    const duration = moment.duration(end.diff(start));
    const totalMinutes = duration.asMinutes();
  
    const intervals = [];
    for (let i = 0; i < totalMinutes; i += 90) {
      const intervalStart = moment(start).add(i, 'minutes');
      intervals.push(intervalStart);
    }
  
    return intervals;
  }

  
/**
 * The function `handleAdd` is used to add a service center and its available slots to the database.
 */

  const handleAdd = (e) => {
    const intervals = calculateTotalTime(addStartTime,addEndTime );
    const intervalStrings = intervals.map((interval) => {
      const intervalEnd = moment(interval).add(90, 'minutes');
      return `${interval.format('HH:mm')} - ${intervalEnd.format('HH:mm')}`;
    });
    e.preventDefault();
    setIsLoading(true);
    const data1 = {
      serviceCenterId: addCenterId,
      availableSlots : intervalStrings
       };
      
    axios
      .post(API_URLS.availableSlots, data1)
      .then((result) => {
        e.preventDefault();
        const data = {
          serviceCenterId: addCenterId,
          serviceCenterName: addName,
          serviceCenterPhone: addNumber,
          serviceCenterAddress: addAddress,
          serviceCenterImageUrl: addImageUrl,
          serviceCenterMailId: addEmail,
          serviceCost: addCost,
          serviceCenterStartTime: addStartTime,
          serviceCenterEndTime: addEndTime,
          serviceCenterDescription: addCentreDescription,
        };
        
        axios.post(API_URLS.addServiceCenter, data).then((result) => {
          if(result.data === 'Service Center added'){
          setIsLoading(false);
         toast.success('Service Center added');
         setTimeout(() => {
          window.location.reload();
      }, 1200);
    
          }else {
            setIsLoading(false);
          toast.warning(result.data);
         }
        }).catch((error) => {
          setIsLoading(false);
          toast.warning(error);
        })    
      })
      .catch((error) => {
        setIsLoading(false);
      });   
  }

  const formStyle = {
    width: '500px',
    margin: '0 auto',
    border: '2px solid black',
    padding: '20px',
    backgroundColor: '#fff'
  }

  return (
    <div>
<Box sx={{ display: "flex" ,flexDirection:"column",background: "linear-gradient(to bottom, rgba(7, 150, 238, 0.947), rgb(246, 246, 246))"  }}>
    <Box sx={{
       display: "flex",
       minHeight: "80px" ,
       width:"100%",
       position:"fixed"
     }}> <Admintopbar/> </Box>
   <Box sx={{ 
     display: "flex",
     width:"100%",
     marginTop:"80px",
     flexDirection:"row",
     height:"100%",
     
     }}>
     <Box component="nav"
     sx={{
       width: "80px",
       flexShrink: 0,
       height:"100%"
     }}><Adminsidebar/>
     </Box>
     <Box sx={{
       display:"flex",
       width:"100%",
       justifyContent:"center",
       minHeight: "100%",
         }}>

{isLoading && (
    <div className="loading-screen">
      <div className="loading-popup">
        <div className="loading-content">
          <div style={{ fontFamily: 'Times New Roman', fontWeight: 'bold', fontSize: '1.2em' }}>
            Adding Service Center...
          </div>&nbsp;&nbsp;
          <FadeLoader color="orange" loading={true} size={15} /> 
        </div>
      </div>
    </div>
  )}
  
  <div className={isLoading ? "blur-background" : ""}></div>
      <ToastContainer/>
      <div className='form-container'>
      <Form style={formStyle} className="my-form" onSubmit={handleAdd}>
          <center>
          <Form.Label className='form-label' style={{ fontSize: '1.2rem', fontFamily: 'Times New Roman' }}>ADD SERVICE CENTERS</Form.Label>
            <Form.Group className="mb-3">
              <Form.Control className='form-control' type="text" id="addCenterId" onChange={(e) => handleCenterIdChange(e.target.value)} placeholder="Enter Service CenterId" 
               required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control className='form-control' type="text" id="addName" data-testid='enterCenterName' onChange={(e) => handleNameChange(e.target.value)} placeholder="Enter the Name" 
              required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control className='form-control' type="tel" id="addNumber" data-testid='mobile' onChange={(e) => handleNumberChange(e.target.value)} placeholder="Enter the Phone number" 
              pattern="^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6789]\d{9}$" title="Enter valid mobile number" required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control className='form-control' type="text" id="addAddress" data-testid='place' onChange={(e) => handleAddressChange(e.target.value)} placeholder="Enter the address" required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control className='form-control' type="url" id="addImageUrl" data-testid='enterImageUrl' onChange={(e) => handleImageUrlChange(e.target.value)} placeholder="Enter the Image Url" required/>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control className='form-control' type="email" id="addEmail" onChange={(e) => handleEmailChange(e.target.value)} placeholder="Enter Email" 
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" title='Enter valid email' required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control className='form-control' type="number" id="addCost" onChange={(e) => handleCostChange(e.target.value)} placeholder="Service Cost"
              pattern='[0-9]\d{0,7}(?:\.\d{1,4})?$' title='Enter valid cost price, it should not start with zero' required />
            </Form.Group>
           
            <Form.Group className="mb-3">
              <div className='d-flex align-items-center'>
                <div className='me-2'>
                  Available timings:
                </div>
                <div className='d-flex'>
                  <div className='me-2'>
                    <label className='form-label small-label' htmlFor="addStartTime">Starts From</label>
                    <Form.Control className='form-control' type="time" id="addStartTime" onChange={(e) => handleStartTimeChange(e.target.value)} required />
                  </div>
                  <div className='d-flex align-items-center'>
                    <label className='form-label small-label mb-0' htmlFor="addEndTime">to</label>
                  </div>
                  <div className='ms-2'>
                    <label className='form-label small-label' htmlFor="addEndTime">Ends At</label>
                    <Form.Control className='form-control' type="time" id="addEndTime" onChange={(e) => handleEndTimeChange(e.target.value)} required />
                  </div>
                </div>

                </div>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control className='form-control' as="textarea" rows={3} id="addCentreDescription" onChange={(e) => handleDescriptionChange(e.target.value)} placeholder="Description about service center" required />
            </Form.Group>
            <Button  type='submit' id="addButton">Add</Button>
          </center>
        </Form>
        </div>
      </Box></Box></Box>
      </div>  
  );
}

export default AddCenter;