import React, { useState, useEffect } from 'react';
import Home from './Home';
import { Card, Form, Button, Row, Col, Container,Image } from 'react-bootstrap';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import Modal from 'react-bootstrap/Modal';

function Dashboard() {
  const [location, setLocation] = useState('');
  const [originalData, setOriginalData] = useState([]);
  const [data, setData] = useState([]);
  const [position, setPosition] = useState({ latitude: null, longitude: null });
  const [selectedCard, setSelectedCard] = useState(null);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`;
        fetch(url)
          .then(response => response.json())
          .then(data => {
            const city = data.address.city || data.address.town || data.address.village || data.address.hamlet;
            setLocation(city);
            setPosition({ latitude, longitude });
          });
      });
    } else {
      setLocation('Geolocation is not supported by this browser.');
    }
  }, []);

  useEffect(() => {
    getServiceCenterData();
  }, []);

  const getServiceCenterData = () => {
    axios
      .get('https://localhost:44303/api/ServiceCenter/viewServiceCenter', {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((result) => {
        setOriginalData(result.data);
        setData(result.data);
      })
      .catch((error) => {
        alert(error);
      });
  };

  const filterByLocation = () => {
    const filteredData = originalData.filter((item) =>
      item.serviceCenterAddress.toLowerCase().includes(location.toLowerCase())
    );
    const sortedData = filteredData.sort((a, b) => {
      const aDistance = calculateDistance(a);
      const bDistance = calculateDistance(b);
      return aDistance - bDistance;
    });
    setData(sortedData); // Update the state with sorted and filtered results
  toast.success('Filtered service center based on location')
  };
  

  const calculateDistance = (item) => {
    const latitude = item.latitude;
    const longitude = item.longitude;
    const userLatitude = position.latitude;
    const userLongitude = position.longitude;
    const distance = getDistanceFromLatLonInKm(latitude, longitude, userLatitude, userLongitude);
    console.log('Distance', distance);
    return distance;
  };

  const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1); // deg2rad below
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    console.log(d);
    return d;
  };

  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };
  const handleCardClick = (card) => {
    setSelectedCard(card);
    handleShow();
  }

  const cardStyle = {
    width: '18rem',
    position: 'relative',
    border: '1px solid black',
    borderRadius: '10px',
    padding: '10px',
    height: '400px'
  };
  const imageStyle = {
    width: '18rem',
    position: 'relative',
    padding: '10px',
    borderRadius: '50%',
    height: '300px',
    overflow: 'hidden'
  };

  const formStyle = {
    width: '700px',
    margin: '0 auto',
    border: '1px solid black',
    padding: '20px'
  }  
  
  return (
    <>
      <Home />
      <ToastContainer/>
      <Container>
        <Row className="mt-4 mb-4 ">
          <Col>
            <Form>
              <Form.Group controlId="formLocation">
                <Form.Label>Your current location</Form.Label>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Form.Control type="text" placeholder="Enter location" value={location} onChange={(e) => {
  setLocation(e.target.value);

}} style={{ width: '30%' }} />
                  <Button variant="primary" onClick={filterByLocation} style={{ marginLeft: '10px' }}>Filter by Location</Button>
                  
                </div>
              </Form.Group>
            </Form>
          </Col>
        </Row>
        <Row>
          {data.map((item, index) => (
            <Col key={index}>
              <Card style={cardStyle} onClick={() => handleCardClick(item)}>
                <Card.Img
                  variant="top"
                  src={item.serviceCenterImageUrl}
                  onError={(e) => {
                    e.target.src =
                      'https://via.placeholder.com/300x200?text=Image+not+found';
                  }}
                />
                <Card.Body className="d-flex flex-column">
                  <Card.Title className='text-center'>{item.serviceCenterName}</Card.Title>
                  <div className="d-flex justify-content-between mb-3">
                    <div className="text-start">
                      <Card.Text>
                        <strong>
                          <em>Place: </em>
                        </strong>
                        {item.serviceCenterAddress}
                      </Card.Text>
                      <Card.Text>
                        <strong>
                          <em>Timing: </em>
                        </strong>
                        {item.serviceCenterStartTime}-{item.serviceCenterEndTime}
                      </Card.Text>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
          </Row>
      </Container>
      <>
          {selectedCard && (
            <Modal show={show} onHide={handleClose} dialogClassName='modal-xl' contentClassName='h-100'>
            <Modal.Header className='d-flex justify-content-center' closeButton>
            </Modal.Header>
            <Modal.Body >
            <Container fluid>
              <Row>
                <Col xs={12} md={4} className='text-start'>
            <div>
            <Image style={imageStyle} variant="top" src= {selectedCard.serviceCenterImageUrl} alt="image" onError={(e) => {
                  e.target.src='https://via.placeholder.com/300x200?text=Image+not+found';
                }} />
              <Card style={cardStyle}>
                <Card.Body className='d-flex flex-column'>
                <Card.Title className='text-center'>{selectedCard.serviceCenterName}</Card.Title>
                <Card.Text>
                        <strong>
                          <em>Address: </em>
                        </strong>
                        {selectedCard.serviceCenterAddress}
                </Card.Text>
                <Card.Text>
                        <strong>
                          <em>Timing: </em>
                        </strong>
                        {selectedCard.serviceCenterStartTime}-{selectedCard.serviceCenterEndTime}
                </Card.Text>
                <Card.Text>
                        <strong>
                          <em>Phone: </em>
                        </strong>
                        {selectedCard.serviceCenterPhone}
                </Card.Text>
                </Card.Body>
              </Card>
              </div>
              </Col>
              <Col xs={12} md={8} className='d-flex justify-content-center align-items-start'>
              <div className='form' style={{maxWidth:'800px'}}>
              <Form style={formStyle} className="my-form text-start">
              <Form.Label className='form-label'>Enter the details</Form.Label>
              <Form.Group className="mb-3">
              <Form.Control className='form-control' type="text" id="enterProductName" placeholder="Enter the name of the product" required />
            </Form.Group>
            <Button variant="primary" id="bookButton">
              Book
            </Button>
                </Form>
              </div>
              </Col>
              </Row>
              </Container>
              </Modal.Body>
              <Modal.Footer >
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
              </Modal>
          )}
          </>
    </>
  );
}

export default Dashboard;