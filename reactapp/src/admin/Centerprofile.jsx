
import React, { useState, useEffect} from 'react';
import { Card, Form, Button, Row, Col, Container } from 'react-bootstrap';
import { PencilSquare, Trash } from 'react-bootstrap-icons';
import AddCenter from '../components/addCenter';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

function Centerprofile() {
  
  const [data, setData] = useState([]);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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

  useEffect(() => {
    getServiceCenterData();
    const email =localStorage.getItem('email')
    axios.get(`https://8080-cddafbcbabccadefcdadfcefbadbddebabfddbdad.project.examly.io/api/Auth/getAdminByEmailId/?email=${email}`)
    .then((result)=>{

      if(result.data.userRole==="user"){
        localStorage.removeItem("email");
        navigate("/")
      }
    }).catch((error)=>{

    })
  }, []);


  const getServiceCenterData = () => {
    axios.get('https://8080-cddafbcbabccadefcdadfcefbadbddebabfddbdad.project.examly.io/api/ServiceCenter/admin/getservicecenter', {
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


  const handleEdit = (serviceCenterId) => {
    axios.get(`https://8080-cddafbcbabccadefcdadfcefbadbddebabfddbdad.project.examly.io/api/ServiceCenter/viewServiceCenterByID/${serviceCenterId}`)
      .then((result) => {
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
          // Assuming the object has hours and minutes properties
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
  const handleDelete = (serviceCenterId) => {
    if (window.confirm("Are you sure to delete?") === true) {
      axios.delete(`https://8080-cddafbcbabccadefcdadfcefbadbddebabfddbdad.project.examly.io/api/ServiceCenter/admin/deleteServiceCenter/${serviceCenterId}`)
      .then((result)=>{
        if(result.data === "Service center deleted"){
          toast.warning(result.data)
          axios.delete(`https://8080-cddafbcbabccadefcdadfcefbadbddebabfddbdad.project.examly.io/api/ServiceCenter/deleteAvailableSlots/${serviceCenterId}`)
        .then((result)=>{
          getServiceCenterData();
        }).catch((error)=>{

        })
        }else{
            toast.error("Cant Delete Service Center, Appointments were already booked!")
        }
      }).catch((error)=>{
        alert("Failed to Delete")
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

  const handleUpdate = (e) => {

    const intervals = calculateTotalTime(editserviceCenterStartTime,editserviceCenterEndTime );
    const intervalStrings = intervals.map((interval) => {
      const intervalEnd = moment(interval).add(90, 'minutes');
      return `${interval.format('HH:mm')} - ${intervalEnd.format('HH:mm')}`;
    });
e.preventDefault();
    const data1 = {
      serviceCenterId: editserviceCenterId,
      availableSlots : intervalStrings
       };
       const url1 = `https://8080-cddafbcbabccadefcdadfcefbadbddebabfddbdad.project.examly.io/api/ServiceCenter/updateGetSlots/${editserviceCenterId}`;
       axios.put(url1, data1).then((result)=>{

       }).catch((error)=>{

       })

    const url = `https://8080-cddafbcbabccadefcdadfcefbadbddebabfddbdad.project.examly.io/api/ServiceCenter/admin/editServiceCenter/${editserviceCenterId}`;
    e.preventDefault();

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
    axios.put(url, data)
      .then((result) => {
        toast.success("Service center has been updated successfully!");
        getServiceCenterData();
        handleClose();
      })
      .catch((error) => {
        toast.warning("Failed to Update Service Center!")
      })
  }
  
  

  const cardStyle = {
    width: '18rem',
    position: 'relative',
    border: '1px solid black',
    borderRadius: '10px',
    padding: '10px',
    height: '400px'
  };

  const modalStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    }

  
    

  return (
    <div >
     <AddCenter/>
     <ToastContainer/>
       <Container className='mt-3'>
          <Row xs={1} sm={2} md={3} lg={3}>
      {data.map(item => (
            <Col xs={12} sm={6} md={4}>
              <Card key={item.id} className='mb-4' style={cardStyle}>
                <Card.Img variant="top" src={item.serviceCenterImageUrl} onError={(e) => { e.target.src = 'https://via.placeholder.com/300x200?text=Image+not+found'; }} />
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
                      <Button variant="link" onClick={() => handleEdit(item.serviceCenterId)}><PencilSquare size={24} /></Button>
                      <span variant="danger" onClick={() => handleDelete(item.serviceCenterId)}><Trash size={24} className='mt-4' /></span>
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
                required />
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
              <Button type='submit' variant="primary" id="updateButton" >
              Update
            </Button>
            </Form>
          </Modal.Body>
          <Modal.Footer >
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            
          </Modal.Footer>
        </Modal>

      </>
    </div>)
}

export default Centerprofile;