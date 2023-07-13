import React, { useState, useEffect} from 'react';
import { Card, Form, Button, Row, Col, Container } from 'react-bootstrap';
import { PencilSquare, Trash } from 'react-bootstrap-icons';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import {Box} from '@mui/material';
import Adminsidebar from '../../Navbar/Adminsidebar';
import Admintopbar from '../../Navbar/Admintopbar';
import '../../Styling/LoadingScreen.css';
import {  BounceLoader } from 'react-spinners';
import { API_URLS } from '../../Apis/config.js';


function Centerprofile() {
  
  const [data, setData] = useState([]);
  const[adminPage] = useState('Center Profile')
  const [show, setShow] = useState(false);
  const [selectedCards, setSelectedCards] = useState([]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [selectAll, setSelectAll] = useState(false);
  const [isLoading, setIsLoading] = useState(false);


  const [editserviceCenterId, seteditServiceCenterId] = useState('');
  const [editserviceCenterName, seteditserviceCenterName] = useState('');
  const [editserviceCenterPhone, seteditServiceCenterPhone] = useState('');
  const [editserviceCenterAddress, seteditserviceCenterAddress] = useState('');
  const [editserviceCenterImageUrl, seteditserviceCenterImageUrl] = useState('');
  const [editserviceCenterMailId, seteditServiceCenterMailId] = useState('');
  const [editserviceCenterCost, seteditserviceCenterCost] = useState('');
  const [editserviceCenterStartTime, seteditserviceCenterStartTime] = useState('');
  const [editserviceCenterEndTime, seteditserviceCenterEndTime] = useState('');
  const [editserviceCenterDescription, seteditServiceCenterDescription] = useState('');

  let navigate =useNavigate();

 /* The above code is a useEffect hook in a React component. It is used to perform side effects in a
 functional component. */
  useEffect(() => {
    localStorage.setItem('adminPage', adminPage)
    getServiceCenterData();
    const email =localStorage.getItem('email')
    axios.get(`${API_URLS.getUserByEmailId}?email=${email}`)
    .then((result)=>{
      if(result.data.userRole==="user"){
        localStorage.removeItem("email");
        navigate("/")
      }
    }).catch((error)=>{
    })
  }, [navigate, adminPage]);


/**
 * The function `getServiceCenterData` makes an HTTP GET request to `API_URLS.getServiceCenterData` and
 * sets the response data to the `data` state variable, or displays an error alert if there is an
 * error.
 */
  const getServiceCenterData = () => {
    axios.get(API_URLS.getServiceCenterData, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((result) => {
        setData(result.data);
      })
      .catch((error) => {
        alert(error);
      });
  };

/**
 * The `handleEdit` function retrieves data from an API and sets the values of various state variables
 * based on the response.
 */

  const handleEdit = (serviceCenterId) => {
    setIsLoading(true);
    axios.get(`${API_URLS.viewServiceCenterByID}/${serviceCenterId}`)
      .then((result) => {
        setIsLoading(false);
        handleShow();
        seteditserviceCenterName(result.data.serviceCenterName);
        seteditServiceCenterPhone(result.data.serviceCenterPhone);
        seteditserviceCenterAddress(result.data.serviceCenterAddress);
        seteditserviceCenterImageUrl(result.data.serviceCenterImageUrl);
        seteditServiceCenterMailId(result.data.serviceCenterMailId);
        seteditserviceCenterCost(result.data.serviceCost);
  
        let startTime = '';
        if (typeof result.data.serviceCenterStartTime === 'string') {
          startTime = result.data.serviceCenterStartTime;
        } else if (typeof result.data.serviceCenterStartTime === 'object' && result.data.serviceCenterStartTime !== null) {
          const startHours = result.data.serviceCenterStartTime.hours || 0;
          const startMinutes = result.data.serviceCenterStartTime.minutes || 0;
          startTime = `${startHours.toString().padStart(2, '0')}:${startMinutes.toString().padStart(2, '0')}`;
        }
  
        let endTime = '';
        if (typeof result.data.serviceCenterEndTime === 'string') {
          endTime = result.data.serviceCenterEndTime;
        } else if (typeof result.data.serviceCenterEndTime === 'object' && result.data.serviceCenterEndTime !== null) {
          // Assuming the object has hours and minutes properties
          const endHours = result.data.serviceCenterEndTime.hours || 0;
          const endMinutes = result.data.serviceCenterEndTime.minutes || 0;
          endTime = `${endHours.toString().padStart(2, '0')}:${endMinutes.toString().padStart(2, '0')}`;
        }
  
        seteditserviceCenterStartTime(startTime);
        seteditserviceCenterEndTime(endTime);
        seteditServiceCenterDescription(result.data.serviceCenterDescription);
        seteditServiceCenterId(serviceCenterId);
      })
      .catch((error) => {
        alert(error);
      });
  }

 /**
  * The function `handleDelete` is used to delete a service center and its associated available slots,
  * with a confirmation prompt and error handling.
  */
  const handleDelete = (serviceCenterId) => {
    
    if (window.confirm("Are you sure to delete?") === true) {
      axios.delete(`${API_URLS.deleteServiceCenter}/${serviceCenterId}`)
      .then((result)=>{
        if(result.data === "Service center deleted"){
          setIsLoading(false);
          toast.warning(result.data)
          axios.delete(`${API_URLS.deleteAvailableSlots}/${serviceCenterId}`)
        .then((result)=>{
          getServiceCenterData();
          setIsLoading(false);
        }).catch((error)=>{
          setIsLoading(false);
        })
        }else{
          setIsLoading(false);
            toast.error("Cant Delete Service Center, Appointments were already booked!")
        }
      }).catch((error)=>{
        setIsLoading(false);
        toast.error("Failed to Delete")
      })
    }
  }

  function calculateTotalTime(editserviceCenterStartTime, editserviceCenterEndTime) {
    const start = moment(editserviceCenterStartTime, 'hh:mm A');
    const end = moment(editserviceCenterEndTime, 'hh:mm A');
  
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
   * The `handleUpdate` function is used to update a service center's information and available slots
   * in a React application.
   */
  const handleUpdate = () => {

    setIsLoading(true);
    const intervals = calculateTotalTime(editserviceCenterStartTime,editserviceCenterEndTime );
    const intervalStrings = intervals.map((interval) => {
      const intervalEnd = moment(interval).add(90, 'minutes');
      return `${interval.format('HH:mm')} - ${intervalEnd.format('HH:mm')}`;
    });
    const data1 = {
      serviceCenterId: editserviceCenterId,
      availableSlots : intervalStrings
       };
       axios.put(`${API_URLS.updateGetSlots}/${editserviceCenterId}`, data1).then((result)=>{

       }).catch((error)=>{

       })

    const data = {
      serviceCenterName: editserviceCenterName,
      serviceCenterPhone: editserviceCenterPhone,
      serviceCenterAddress: editserviceCenterAddress,
      serviceCenterImageUrl: editserviceCenterImageUrl,
      serviceCenterMailId: editserviceCenterMailId,
      serviceCost: editserviceCenterCost,
      serviceCenterStartTime : editserviceCenterStartTime,
      serviceCenterEndTime : editserviceCenterEndTime,
      serviceCenterDescription: editserviceCenterDescription
    }
    axios.put(`${API_URLS.editServiceCenter}/${editserviceCenterId}`, data)
      .then((result) => {
        setIsLoading(false);
        toast.success("Service center has been updated successfully!");
        getServiceCenterData();
        handleClose();
      })
      .catch((error) => {
        setIsLoading(false);
        toast.warning(error)
      })
  }

  const handleCardSelect = (serviceCenterId) => {
    if(selectedCards.includes(serviceCenterId)) {
      setSelectedCards(selectedCards.filter((id) => id !== serviceCenterId));
    } else {
      setSelectedCards([...selectedCards, serviceCenterId]);
    }
  };
 
  const handleSelectAll = () => {
    if(selectAll) {
      setSelectedCards([]);
      setSelectAll(false);
    } else {
      const allServiceCenterIds = data.map((item) => item.serviceCenterId);
      setSelectedCards(allServiceCenterIds);
      setSelectAll(true);
    }
  };

 /* The above code is a JavaScript React function that handles the deletion of selected service
 centers. */
  const handleDeleteSelected = async () => {
    const result = await Swal.fire({
      title: 'Confirm Deletion',
      text: 'Are you sure you want to delete the selected Service Centers?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
      reverseButtons: true,
    });  
    if(result.isConfirmed) {
      setIsLoading(true);
    try {
      const deleteRequests = selectedCards.map(serviceCenterId => {
        return axios.delete(`${API_URLS.deleteServiceCenter}/${serviceCenterId}`);
      });
  
      await axios.all(deleteRequests);
  
      const deleteSlotsRequests = selectedCards.map(serviceCenterId => {
        return axios.delete(`${API_URLS.deleteAvailableSlots}/${serviceCenterId}`);
      });
  
      await axios.all(deleteSlotsRequests);
  
      getServiceCenterData();
      setSelectedCards([]);
      setIsLoading(false);
      toast.warning("Selected service centers deleted");
    } catch (error) {
      setIsLoading(false);
      toast.error("Failed to delete selected service centers");
    }
}
  };
  const cardStyle = {
    width: '18rem',
    position: 'static',
    border: '1px solid black',
    borderRadius: '10px',
    padding: '10px',
    height: '400px',
    cursor: 'pointer',
  };
  const modalStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    }
    const selectedCardStyle = {
      ...cardStyle,
      backgroundColor: '#c7ddf9',
      position: 'static',
      display: 'flex',
      alignItems: 'center',
    };
    const hiddenCheckboxStyle = {
      position: 'absolute',
      top: '-9999px',
      left: '-9999px',
    };
  /* The above code is a React component that renders a user interface for an admin dashboard. It
  includes a top bar, a sidebar, and a main content area. The main content area displays a list of
  cards, each representing a service center. The user can select multiple cards, delete selected
  cards, and edit individual cards. The component also includes a loading screen and a toast
  container for displaying notifications. */
  return (
    <div >
     <Box sx={{ display: "flex" ,flexDirection:"column" , background: "linear-gradient(to bottom, rgba(7, 150, 238, 0.947), rgb(246, 246, 246))" }}>
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
       minHeight: "100%",
         }}>

{isLoading && (
    <div className="loading-screen">
      <div className="loading-popup">
        <div className="loading-content">
          <div style={{ fontFamily: 'Times New Roman', fontWeight: 'bold', fontSize: '1.2em' }}>
            Please Wait...
          </div>&nbsp;&nbsp;
          <BounceLoader color="Blue" loading={true} size={30} /> 
        </div>
      </div>
    </div>
  )}
  
  <div className={isLoading ? "blur-background" : ""}></div>
     <ToastContainer/>
       <Container className='mt-3'>
        {selectedCards.length >0 && (
          <div className='mb-3 d-flex justify-content-start align-items-center' >
            <Button variant='primary' className='ms-3' onClick={handleSelectAll}>{selectAll ? 'Deselect All' : 'Select All'}</Button>
            <Button variant='danger' className='ms-3' onClick={handleDeleteSelected} style={{marginLeft: '10px'}}>Delete</Button>
          </div>
        )}
          <Row xs={1} sm={2} md={3} lg={3}>
  {data.map((item) => (
    <Col xs={12} sm={6} md={4} key={item.id}>
      <Card
        key={item.id}
        className='mb-4'
        style={selectedCards.includes(item.serviceCenterId) ? selectedCardStyle : cardStyle}
        onClick={() => handleCardSelect(item.serviceCenterId)}
      >
        <label>
          <input
            type='checkbox'
            checked={selectedCards.includes(item.serviceCenterId)}
            onChange={() => handleCardSelect(item.serviceCenterId)}
            style={hiddenCheckboxStyle}
          /></label>
                <Card.Img variant="top" src={item.serviceCenterImageUrl} 
                onError={(e) => { e.target.src = 'https://via.placeholder.com/300x200?text=Image+not+found'; }} />
                <Card.Body className='d-flex flex-column'>
                  <Card.Title>{item.serviceCenterName}</Card.Title>
                  <div className='d-flex justify-content-between mb-3'>
                    <div className='text-start'>
                      <Card.Text><strong><em>Address: </em></strong>{item.serviceCenterAddress}</Card.Text>
                      <Card.Text>
  <em>Available Timing: </em>
  {item.serviceCenterStartTime.hours.toString().padStart(2, '0')}:
  {item.serviceCenterStartTime.minutes.toString().padStart(2, '0')}:
  {item.serviceCenterStartTime.seconds.toString().padStart(2, '0')} - 
  {item.serviceCenterEndTime.hours.toString().padStart(2, '0')}:
  {item.serviceCenterEndTime.minutes.toString().padStart(2, '0')}:
  {item.serviceCenterEndTime.seconds.toString().padStart(2, '0')}
</Card.Text>

                    </div>
                    <div className='text-right'>
                      <Button variant="link" onClick={(e) => {e.stopPropagation(); handleEdit(item.serviceCenterId)}}><PencilSquare size={24} /></Button>
                      <span variant="danger" onClick={(e) => {e.stopPropagation(); handleDelete(item.serviceCenterId)}}><Trash size={24} className='mt-4' /></span>
                    </div>
                  </div>

                </Card.Body>
              </Card>

            </Col>
      ))}
       </Row>
</Container>
      <>
        <Modal style={ modalStyle} show={show} onHide={handleClose}>
          <Modal.Header className='d-flex justify-content-center' closeButton>
            <Modal.Title className='text-center w-100'>Edit Centre</Modal.Title>
          </Modal.Header>
          <Modal.Body >
            <Form onSubmit={handleUpdate}>
              <Form.Group className="mb-3">
              <label><strong>Name</strong></label>
                <Form.Control className='form-control'id="editName" type="text" value={editserviceCenterName} onChange={(e)=>seteditserviceCenterName(e.target.value)} placeholder="Enter the Name"
                 pattern='^[A-za-z]+$' title="Enter only alphabets" required />
              </Form.Group>
              <Form.Group className="mb-3">
              <label><strong>Phone Number</strong></label>
                <Form.Control className='form-control' id="editNumber"  type="text" value={editserviceCenterPhone} onChange={(e)=>seteditServiceCenterPhone(e.target.value)} placeholder="Enter the Phone number" 
                 pattern="^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6789]\d{9}$" title="Enter valid mobile number" required />
              </Form.Group>
              <Form.Group className="mb-3">
              <label><strong>Address</strong></label>
                <Form.Control className='form-control' id="editAddress"  type="text" value={editserviceCenterAddress} onChange={(e)=>seteditserviceCenterAddress(e.target.value)} placeholder="Enter the address" required />
              </Form.Group>
              <Form.Group className="mb-3">
              <label><strong>Image URL</strong></label>
                <Form.Control className='form-control' id="editImageUrl"   type="url" value={editserviceCenterImageUrl} onChange={(e)=>seteditserviceCenterImageUrl(e.target.value)} placeholder="Enter the Image Url" required />
              </Form.Group>
              <Form.Group className="mb-3">
              <label><strong>Mail Id</strong></label>
                <Form.Control className='form-control' id="editMailId"  type="email" value={editserviceCenterMailId} onChange={(e)=>seteditServiceCenterMailId(e.target.value)} placeholder="Enter the mail id" 
                 pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" title='Enter valid email' required />
              </Form.Group>


              <Form.Group className="mb-3">
              <label><strong>Service Cost</strong></label>
              <Form.Control className='form-control' type="number" id="editCost" value={editserviceCenterCost} onChange={(e)=>seteditserviceCenterCost(e.target.value)} placeholder="Service Cost"
                pattern='[0-9]\d{0,7}(?:\.\d{1,4})?$' title='Enter valid cost price, it should not start with zero' required />
            </Form.Group>
           
            <Form.Group className="mb-3">
              <div className='d-flex align-items-center'>
                <div className='me-2'>
                  <strong>Available timings:</strong>
                </div>
                <div className='d-flex'>
                  <div className='me-2'>
                    <label className='form-label small-label' htmlFor="addStartTime">Starts From</label>
                    <Form.Control className='form-control' type="time" id="editStartTime" value={editserviceCenterStartTime} onChange={(e) => seteditserviceCenterStartTime(e.target.value)} required />
                  </div>
                  <div className='d-flex align-items-center'>
                    <label className='form-label small-label mb-0' htmlFor="addEndTime">to</label>
                  </div>
                  <div className='ms-2'>
                    <label className='form-label small-label' htmlFor="addEndTime">Ends At</label>
                    <Form.Control className='form-control' type="time" id="addEndTime" value={editserviceCenterEndTime} onChange={(e) => seteditserviceCenterEndTime(e.target.value)} required />
                  </div>
                </div>

              </div>
            </Form.Group>
              <Form.Group className="mb-3">
              <label><strong>Description</strong></label>
                <Form.Control className='form-control' id="editCentreDescription" as="textarea" rows={3} value={editserviceCenterDescription} onChange={(e)=>seteditServiceCenterDescription(e.target.value)}  placeholder="Description about service center" required />
              </Form.Group>
            </Form>

          </Modal.Body>
          <Modal.Footer >
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" id="updateButton" onClick={handleUpdate}>
              Update
            </Button>
          </Modal.Footer>
        </Modal>
      </>
      </Box></Box></Box>
    </div>)
}

export default Centerprofile;