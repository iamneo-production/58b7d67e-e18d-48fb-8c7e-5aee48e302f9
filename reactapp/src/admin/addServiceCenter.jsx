import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddCenter from '../components/addCenter';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

import moment from 'moment';
import { useNavigate } from 'react-router-dom';
function AddServiceCenter() {
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
 let navigate =useNavigate();

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
    const stringValue = value.toString(); // Convert value to string
    setCost(stringValue); // Update the state with the converted string value
  };
  const handleStartTimeChange = (value) => {
    setStartTime(value);
  }
  const handleEndTimeChange = (value) => {
    const formattedTime = moment(value, 'hh:mm A').format('HH:mm');
    setEndTime(formattedTime);
  }
  const handleDescriptionChange = (value) => {
    setDescription(value);
  };



  useEffect(()=>{
    const email =localStorage.getItem('email')
    axios.get(`https://8080-cddafbcbabccadefcdadfcefbadbddebabfddbdad.project.examly.io/api/Auth/getAdminByEmailId/?email=${email}`)
    .then((result)=>{
      // setUserName(result.data.username)
      // setUserRole(result.data.userRole)
      if(result.data.userRole==="user"){
        localStorage.removeItem("email");
        navigate("/")
      }
     
    }).catch((error)=>{

    })
  },[])

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


  const handleAdd = (e) => {

    const intervals = calculateTotalTime(addStartTime,addEndTime );
    const intervalStrings = intervals.map((interval) => {
      const intervalEnd = moment(interval).add(90, 'minutes');
      return `${interval.format('HH:mm')} - ${intervalEnd.format('HH:mm')}`;
    });
    e.preventDefault();
    const data1 = {
      serviceCenterId: addCenterId,
      availableSlots : intervalStrings
       };
      
    const url1 = 'https://8080-cddafbcbabccadefcdadfcefbadbddebabfddbdad.project.examly.io/api/ServiceCenter/availableSlots';
    axios
      .post(url1, data1)
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
        const url = 'https://8080-cddafbcbabccadefcdadfcefbadbddebabfddbdad.project.examly.io/api/ServiceCenter/admin/addServiceCenter';
        axios.post(url, data).then((result) => {
          if(result.data === 'Service Center added'){
         toast.success('Service Center added');
         setTimeout(() => {
          window.location.reload();
      }, 1200);
    
          }else {
          toast.warning(result.data);
         }
        }).catch((error) => {
          toast.warning(error);
        })    
      })
      .catch((error) => {
      });   
  }

  const formStyle = {
    width: '500px',
    margin: '0 auto',
    border: '2px solid black',
    padding: '20px'
  }

  return (
    <div>
      <AddCenter />
      <ToastContainer/>
      <div className='form-container'>
      <Form style={formStyle} className="my-form" onSubmit={handleAdd}>
          <center>
            <Form.Label className='form-label'>Add Center</Form.Label>
            <Form.Group className="mb-3">
              <Form.Control className='form-control' type="text" id="addCenterId" onChange={(e) => handleCenterIdChange(e.target.value)} placeholder="Enter Service CenterId" 
               required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control className='form-control' type="text" id="addName" onChange={(e) => handleNameChange(e.target.value)} placeholder="Enter the Name" 
              required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control className='form-control' type="tel" id="addNumber" onChange={(e) => handleNumberChange(e.target.value)} placeholder="Enter the Phone number" 
              pattern="^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6789]\d{9}$" title="Enter valid mobile number" required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control className='form-control' type="text" id="addAddress" onChange={(e) => handleAddressChange(e.target.value)} placeholder="Enter the address" required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control className='form-control' type="url" id="addImageUrl" onChange={(e) => handleImageUrlChange(e.target.value)} placeholder="Enter the Image Url" required/>
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
    </div>
    
  );
}

export default AddServiceCenter