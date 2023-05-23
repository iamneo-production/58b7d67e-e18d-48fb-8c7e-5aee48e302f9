import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React, { useState } from 'react';
import axios from 'axios';
import AddCenter from './AddCenter';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import moment from 'moment';

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

  const handleCenterIdChange = (value) => {
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
    setCost(value);
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

  const handleAdd = () => {
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
    const url = 'https://localhost:44303/api/ServiceCenter/addServiceCenter';
    axios.post(url, data).then((result) => {
     toast.success(result.data)
    }).catch((error) => {
      toast.warning("Failed to Add Service Center");
    })
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
        <Form style={formStyle} className="my-form">
          <center>
            <Form.Label className='form-label'>Add Center</Form.Label>
            <Form.Group className="mb-3">
              <Form.Control className='form-control' type="text" id="addCenterId" onChange={(e) => handleCenterIdChange(e.target.value)} placeholder="Enter CenterId" required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control className='form-control' type="text" id="addName" onChange={(e) => handleNameChange(e.target.value)} placeholder="Enter the Name" required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control className='form-control' type="text" id="addNumber" onChange={(e) => handleNumberChange(e.target.value)} placeholder="Enter the Phone number" required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control className='form-control' type="text" id="addAddress" onChange={(e) => handleAddressChange(e.target.value)} placeholder="Enter the address" required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control className='form-control' type="url" id="addImageUrl" onChange={(e) => handleImageUrlChange(e.target.value)} placeholder="Enter the Image Url" required/>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control className='form-control' type="email" id="addEmail" onChange={(e) => handleEmailChange(e.target.value)} placeholder="Enter Email" required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control className='form-control' type="number" id="addCost" onChange={(e) => handleCostChange(e.target.value)} placeholder="Service Cost" required />
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
            <Button type="submit" onClick={() => handleAdd()} id="addButton">Add</Button>
          </center>
        </Form>
      </div>
    </div>
    
  );
}

export default AddServiceCenter