
import React, { useState, useEffect} from 'react';
import { Card, Form, Button, Row, Col, Container } from 'react-bootstrap';
import { PencilSquare, Trash } from 'react-bootstrap-icons';
import AddCenter from './AddCenter';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 



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

  useEffect(() => {
    getServiceCenterData();
  }, []);

  const getServiceCenterData = () => {
    axios.get('https://localhost:44303/api/ServiceCenter/viewServiceCenter', {
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
    
    axios.get(`https://localhost:44303/api/ServiceCenter/viewServiceCenterByID/${serviceCenterId}`)
      .then((result) => {
        handleShow();
        seteditserviceCenterName(result.data.serviceCenterName);
        seteditServiceCenterPhone(result.data.serviceCenterPhone);
        seteditserviceCenterAddress(result.data.serviceCenterAddress);
        seteditserviceCenterImageUrl(result.data.serviceCenterImageUrl);
        seteditServiceCenterMailId(result.data.serviceCenterMailId);
        seteditserviceCenterCost(result.data.serviceCost);
        seteditserviceCenterStartTime(result.data.serviceCenterStartTime);
        seteditserviceCenterEndTime(result.data.serviceCenterEndTime);
        seteditServiceCenterDescription(result.data.serviceCenterDescription);

        seteditServiceCenterId(serviceCenterId);

      })
      .catch((error) => {
        alert(error);
      });
    // Set the data object to the state and show the form
    // alert(serviceCenterId)
  }
  const handleDelete = (serviceCenterId) => {
    if (window.confirm("Are you sure to delete?") === true) {
      axios.delete(`https://localhost:44303/api/ServiceCenter/deleteServiceCenter/${serviceCenterId}`)
      .then((result)=>{
        toast.warning("Service Center Deleted Successfully")
        getServiceCenterData();

      }).catch((error)=>{
        alert("Failed to Delete")
      })
    }
  }

  const handleUpdate = () => {
    const url = `https://localhost:44303/api/ServiceCenter/editServiceCenter/${editserviceCenterId}`;
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
                      <Card.Text><em>Available Timing: </em>{item.serviceCenterStartTime} - {item.serviceCenterEndTime}</Card.Text>
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
            <Form>
              <Form.Group className="mb-3">
              <label><strong>Name</strong></label>
                <Form.Control className='form-control' type="text" value={editserviceCenterName} onChange={(e)=>seteditserviceCenterName(e.target.value)} placeholder="Enter the Name" required />
              </Form.Group>
              <Form.Group className="mb-3">
              <label><strong>Phone Number</strong></label>
                <Form.Control className='form-control' id="editName" type="text" value={editserviceCenterPhone} onChange={(e)=>seteditServiceCenterPhone(e.target.value)} placeholder="Enter the Phone number" required />
              </Form.Group>
              <Form.Group className="mb-3">
              <label><strong>Address</strong></label>
                <Form.Control className='form-control' id="editNumber"  type="text" value={editserviceCenterAddress} onChange={(e)=>seteditserviceCenterAddress(e.target.value)} placeholder="Enter the address" required />
              </Form.Group>
              <Form.Group className="mb-3">
              <label><strong>Image URL</strong></label>
                <Form.Control className='form-control' id="editAddress"  type="url" value={editserviceCenterImageUrl} onChange={(e)=>seteditserviceCenterImageUrl(e.target.value)} placeholder="Enter the Image Url" required />
              </Form.Group>
              <Form.Group className="mb-3">
              <label><strong>Mail Id</strong></label>
                <Form.Control className='form-control' id="editImageUrl" type="email" value={editserviceCenterMailId} onChange={(e)=>seteditServiceCenterMailId(e.target.value)} placeholder="Enter the mail id" required />
              </Form.Group>


              <Form.Group className="mb-3">
              <label><strong>Service Cost</strong></label>
              <Form.Control className='form-control' type="number" id="editCost" value={editserviceCenterCost} onChange={(e)=>seteditserviceCenterCost(e.target.value)} placeholder="Service Cost" required />
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
    </div>)
}

export default Centerprofile;