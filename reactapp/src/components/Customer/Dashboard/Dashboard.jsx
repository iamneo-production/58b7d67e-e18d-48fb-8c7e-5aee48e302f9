import React, { useState, useEffect } from 'react';
import { Card, Form, Button, Row, Col, Container, Image } from 'react-bootstrap';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import StarRatings from 'react-star-ratings';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-bootstrap/Modal';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {Box} from '@mui/material';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import '../../Styling/LoadingScreen.css';
import { ClockLoader } from 'react-spinners';
import Usersidebar from '../../Navbar/Usersidebar';
import Usertopbar from '../../Navbar/Usertopbar';
import { API_URLS } from '../../Apis/config.js';

function Dashboard() {

/* The above code is a React component written in JavaScript. It defines multiple state variables using
the useState hook. These state variables are used to manage the state of various data in the
component. */
  const[userPage] = useState('Dashboard')
  const [location, setLocation] = useState('');
  const [originalData, setOriginalData] = useState([]);
  const [data, setData] = useState([]);
  const [position, setPosition] = useState({ latitude: null, longitude: null });
  const [selectedCard, setSelectedCard] = useState(null);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [enterProductName, setProductName] = useState();
  const [enterModelNo, setModelNo] = useState();
  const [enterDateOfPurchase, setDateOfPurchase] = useState( );
  const [enterContactNumber, setContactNumber] = useState();
  const [enterProblem, setProblem] = useState();
  const [selectedTime, setSelectedTime] = useState();
  const [selectedDate, setSelectedDate] = useState();
  const [email, setEmail] = useState("");
  const[username, setUsername] = useState("")
  const [availableSlots, setAvailableSlots] = useState([])
  const [modalShow, setModalShow] = useState(false);
  const [selectedCardCenterName, setselectedCardCenterName] = useState('');
  const [selectedCardServiceCost, setselectedCardServiceCost] = useState('');
  const [selectedCardServiceMailId, setselectedCardServiceMailId] = useState('');
  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);
  const [selectedRating, setSelectedRating] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  
  let navigate = useNavigate();

  const today = new Date();
  const fiveDaysLater = new Date();
  fiveDaysLater.setDate(today.getDate() + 4);
  const handleProductNameChange = (value) => {
    setProductName(value);
  };

  const handleModelNoChange = (value) => {
    setModelNo(value);
  };
  const handleDateOfPurchaseChange = (date) => {
    const utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    setDateOfPurchase(utcDate);

  };

  const handleContactNumberChange = (value) => {
    setContactNumber(value);
  };
  const handleProblemChange = (value) => {
    setProblem(value);
  };
  const handleTimeChange = (value) => {
    setSelectedTime(value);
  }

  const [receivedValues, setReceivedValues] = useState();

  /**
   * The function `handleDateChange` takes a date as input, converts it to UTC format, formats it as
   * "yyyy-mm-dd", and makes an API call to retrieve slot details for that date.
   */
  function handleDateChange(date) {
    const utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    setSelectedDate(utcDate);

    const formattedDate = utcDate.toISOString().split('T')[0];

    const data3 = {
      serviceCenterId: selectedCard.serviceCenterId,
      appointmentDate: formattedDate,
    };
 
    axios.get(`${API_URLS.getSlotDetailsByDate}/${selectedCard.serviceCenterId},${formattedDate}`, data3)
    .then((result) => {
      setReceivedValues(result.data);
    });
  }

/* The above code is written in JavaScript using the React framework. */
  useEffect(() => {
    const selectedCardData = localStorage.getItem('selectedcard');
    const card = JSON.parse(selectedCardData);
    if(selectedCardData) {
      setSelectedCard(card);
      handleShow();
      localStorage.removeItem('selectedcard');
    }
  }, []);

  useEffect(() => {
    if (receivedValues) {
      const availableSlots = receivedValues[0].availableSlots;
      const filteredSlots = availableSlots.filter(slot => slot.date !== selectedDate);
      setAvailableSlots(filteredSlots);
    }
  }, [receivedValues, selectedDate]);

  useEffect(() => {
    const email = localStorage.getItem('email')
    setEmail(email);
    const username = localStorage.getItem('username')
    setUsername(username)
    localStorage.setItem('userPage', userPage)
  

    axios.get(`${API_URLS.getAdminByEmailId}/?email=${email}`)
      .then((result) => {
        if (result.data.userRole === "admin") {
          localStorage.removeItem("email");
          navigate('/')
        }
      }).catch((error) => {
      });
      getServiceCenterData();
  }, [navigate,userPage])

  useEffect(() => {
    const fetchData = async () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          fetch(`${API_URLS.reverseGeocoding}&lat=${latitude}&lon=${longitude}`)
            .then(response => response.json())
            .then(data => {
              const city = data.address.city || data.address.town || data.address.village || data.address.hamlet;
              setLocation(city);
              setPosition({ latitude, longitude });
            })
            .catch(error => {
              toast.error(error)
            });
        });
      }
    };  
    fetchData();
  }, []);

  useEffect(() => {
    getServiceCenterData();
  }, []);

 /**
  * The function `getServiceCenterData` makes an HTTP GET request to a specified API URL, sets the
  * received data to state variables, and sets the available slots based on the received data.
  */
  const getServiceCenterData = () => {
    axios
    .get(API_URLS.getServiceCenterData, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((result) => {
        setOriginalData(result.data);
        setData(result.data);
        setAvailableSlots(result.data.map(item => item.availableSlots).flat());
      })
      .catch((error) => {
        toast.error(error)
      });
  };

  /**
   * The function filters and sorts data based on location or name, and updates the state with the
   * sorted data.
   */
  const filterByLocationOrName = () => {
    const filteredData = originalData.filter((item) =>
      item.serviceCenterAddress.toLowerCase().includes(location.toLowerCase()) ||
      item.serviceCenterName.toLowerCase().includes(location.toLowerCase())
    );
    const sortedData = filteredData.sort((a, b) => {
      const aDistance = calculateDistance(a);
      const bDistance = calculateDistance(b);
      return aDistance - bDistance;
    });
    setData(sortedData);
    toast.success('Filtered service center successfully')
  };

  /**
   * The function calculates the distance between two sets of latitude and longitude coordinates.
   * @returns The distance between the item's latitude and longitude and the user's latitude and
   * longitude.
   */
  const calculateDistance = (item) => {
    const latitude = item.latitude;
    const longitude = item.longitude;
    const userLatitude = position.latitude;
    const userLongitude = position.longitude;
    const distance = getDistanceFromLatLonInKm(latitude, longitude, userLatitude, userLongitude);
    return distance;
  };

 /**
  * The function calculates the distance in kilometers between two sets of latitude and longitude
  * coordinates using the Haversine formula.
  * @returns The function `getDistanceFromLatLonInKm` returns the distance between two points on the
  * Earth's surface in kilometers.
  */
  const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return d;
  };
  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };

  const fetchRatings = (serviceCenterId) => {
    axios.get(`${API_URLS.getReviews}/${serviceCenterId}`)
    .then(response => {
      const fetchedRating = response.data.rating;
      setSelectedRating(fetchedRating);
    })
    .catch(error => {
      toast.error(error)
    });
  };


  const handleCardClick = (card) => {
    fetchRatings(card.serviceCenterId);
    setSelectedCard(card);
    handleShow();
    setDateOfPurchase('');
    setSelectedDate('');        
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      filterByLocationOrName();
    }
  }


 /**
  * The function `handleButtonClick` is used to handle the button click event and make a POST request
  * to save an appointment with the provided data.
  */
  function handleButtonClick(event) {
    event.preventDefault();
    setIsLoading(true);
    const bookData = {
      customerName : username,
      productName: enterProductName,
      productModelNo: enterModelNo,
      dateOfPurchase: enterDateOfPurchase,
      contactNumber: enterContactNumber,
      problemDescription: enterProblem,
      bookedSlots: selectedTime,
      dateOfAppointment: selectedDate,
      email: email,
      serviceCenterId: selectedCard.serviceCenterId,
      serviceCenterName: selectedCard.serviceCenterName,
      serviceCost: selectedCard.serviceCost
    };
    
    axios.post(API_URLS.saveAppointment, bookData)
      .then((result) => {
        setIsLoading(false);
        if (result.data === "Appointment Booked Successfully") {
          Swal.fire({
            icon: 'success',
            title: 'Appointment Booked Successfully',
            text: 'Your appointment has been successfully booked. A confirmation mail has been sent to your registered mail Id. Please check your email.',
          });
          const updatedSlots = availableSlots.filter((slot) => slot !== selectedTime);
          setAvailableSlots(updatedSlots);
          //  toast.success(result.data);
          setselectedCardCenterName(selectedCard.serviceCenterName);
          setselectedCardServiceCost(selectedCard.serviceCost);
          setselectedCardServiceMailId(selectedCard.serviceCenterMailId)
          
          setModalShow(true);
          handleClose();
          const SlotData = {
            serviceCenterId: selectedCard.serviceCenterId,
            Appointmentdate: selectedDate,
            availableSlots: updatedSlots
          }
       
          axios.post(API_URLS.postAvailableSlots, SlotData)
            .then((result) => {
            }).catch((error) => {

            })
        } else {
          toast.warning(result.data);
        }
        
      })
      .catch((error) => {
        toast.error(error);
      });
  }

 
  function BillGeneration() {
    handleShow1();
    setModalShow();
  }
  const cardStyle = {
    width: '18rem',
    position: 'static',
    border: '1px solid black',
    borderRadius: '10px',
    padding: '10px',
    height: '400px',
  };
  const imageStyle = {
    width: '250px',
    position: 'static',
    padding: '10px',
    borderRadius: '50%',
    height: '250px',
    overflow: 'hidden',
    marginLeft: '45px'
  };
  const formStyle = {
    width: '700px',
    margin: '0 auto',
    border: '1px solid black',
    borderRadius: '10px',
    padding: '20px',
    height: '600px'
  }
  const cardStyle1 = {
    width: '340px',
    position: 'static',
    border: '1px solid black',
    borderRadius: '10px',
    padding: '10px',
    height: '350px',
    overflowX: 'auto'
  };
  
 /* The above code is a React component that renders a user interface for a service booking
 application. It includes a top bar, a sidebar, and a main content area. The main content area
 displays a list of service centers with their details such as name, address, timing, and rating.
 Users can search for service centers by location or service name. They can also click on a service
 center card to view more details and book an appointment. The code also includes modals for
 displaying loading screens, appointment details, and service bills. */
  return (
    <div>
     <Box sx={{ display: "flex" ,flexDirection:"column", background: "linear-gradient(to bottom, rgba(7, 150, 238, 0.947), rgb(246, 246, 246))"  }}>
    <Box sx={{
       display: "flex",
       minHeight: "80px" ,
       width:"100%",
       position:"fixed"
     }}> <Usertopbar/> </Box>
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
     }}><Usersidebar/>
     </Box>

     <Box sx={{
       display:"flex",
       width:"100%",
       minHeight: "100%",
        }}>
      <ToastContainer />
      <Container>
 
        <Row className="mt-4 mb-4 ">
          <Col>
            <Form>
              <Form.Group controlId="formLocation">
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <Form.Control type="text" placeholder="Search by location or Service Name" value={location} onKeyDown={handleKeyDown} onChange={(e) => {
                    setLocation(e.target.value); // current location of user
                  }} style={{ width: '30%' }} />
                  <Button variant="primary" onClick={filterByLocationOrName} style={{ marginLeft: '10px' }}>Search</Button>
                </div>
              </Form.Group>
            </Form>
          </Col>
        </Row>
        <Row>
          {data.map((item, index) => (
            <Col key={index}>
              <Card className='mb-4' id='grid1' style={cardStyle} onClick={() => handleCardClick(item)}  >  
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
                        {item.serviceCenterStartTime.hours.toString().padStart(2, '0')}:
                                                {item.serviceCenterStartTime.minutes.toString().padStart(2, '0')}:
                                                {item.serviceCenterStartTime.seconds.toString().padStart(2, '0')} -
                                                {item.serviceCenterEndTime.hours.toString().padStart(2, '0')}:
                                                {item.serviceCenterEndTime.minutes.toString().padStart(2, '0')}:
                                                {item.serviceCenterEndTime.seconds.toString().padStart(2, '0')}
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
        <ToastContainer />

        {selectedCard && (
          <Modal show={show} onHide={handleClose} dialogClassName='modal-xl' contentClassName='h-100'>
            <Modal.Header className='d-flex justify-content-center' closeButton>
            </Modal.Header>
            <Modal.Body >
                     
              <Container fluid>
                <Row>
                <div style= {{overflowX: 'auto', overflowY: 'auto'}}> 
                <div className='d-flex flex-wrap'>
                  <Col xs={12} sm={12} md={12} lg={4} xl={4} className='mb-4'>
                    <div className='d-flex'>
                      <Image id='productImage' style={imageStyle} variant="top" src={selectedCard.serviceCenterImageUrl} alt="image" onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/300x200?text=Image+not+found';
                      }} />
                    </div>
                    <Card id='grid1' style={cardStyle1}>
                      <Card.Header>
                        <Card.Title className='text-center'>{selectedCard.serviceCenterName}</Card.Title>
                      </Card.Header>
                      <Card.Body className='d-flex flex-column'>
                        <Card.Text>
                          <strong>
                            <em>Address: </em>
                          </strong>
                          {selectedCard.serviceCenterAddress}
                        </Card.Text>
                        <Card.Text>
                          <strong>
                            <em>Phone no: </em>
                          </strong>
                          {selectedCard.serviceCenterPhone}
                        </Card.Text>
                        <Card.Text>
                          <strong>
                            <em>Email id: </em>
                          </strong>
                          {selectedCard.serviceCenterMailId}
                        </Card.Text>
                        <Card.Text>
                          <strong>
                            <em>Timing: </em>
                          </strong>
                            {selectedCard.serviceCenterStartTime.hours.toString().padStart(2, '0')}:
                            {selectedCard.serviceCenterStartTime.minutes.toString().padStart(2, '0')}:
                            {selectedCard.serviceCenterStartTime.seconds.toString().padStart(2, '0')} -
                            {selectedCard.serviceCenterEndTime.hours.toString().padStart(2, '0')}:
                            {selectedCard.serviceCenterEndTime.minutes.toString().padStart(2, '0')}:
                            {selectedCard.serviceCenterEndTime.seconds.toString().padStart(2, '0')}
                        </Card.Text>
                        <Card.Text>
                          <strong>
                            <em>Rating: </em>
                          </strong>
                          <StarRatings
                            rating={selectedRating}
                            starRatedColor="#FFD700"
                            starEmptyColor="#CCCCCC"
                            starDimension="25px"
                            starSpacing="4px"
                          />
                        </Card.Text>
                      </Card.Body>
                    </Card>
                    <ToastContainer />
                  </Col>
                  <Col xs={12} sm={6} md ={6} lg={8} xl={8} className='d-flex flex-grow-1 align-items-start'>
                    <div className='form' style={{ maxWidth: '800px' }}>
                    {<Form style={formStyle} className="my-form text-start" onSubmit={handleButtonClick}>
                        <Form.Group className="mb-4 text-center">
                          <Form.Label className='form-label'>Enter the details</Form.Label>
                        </Form.Group>
                        <Form.Group className="mb-4">
                          <Form.Control className='form-control' type="text" id="enterProductName" placeholder="Enter the name of the product" onChange={(e) => handleProductNameChange(e.target.value)} required />
                        </Form.Group>
                        <Form.Group className="mb-4">
                          <Form.Control className='form-control' type="text" id="enterModelNo" placeholder="Enter the model no of the product" onChange={(e) => handleModelNoChange(e.target.value)} required />
                        </Form.Group>
                        <Form.Group className="mb-4">
                          <DatePicker selected={enterDateOfPurchase}
                            className='form-control'
                            dateFormat="dd/MM/yyyy"
                            id="enterDateOfPurchase"
                            placeholderText="Enter the date of purchase"
                            onChange={handleDateOfPurchaseChange}
                            maxDate={new Date()}
                            showYearDropdown
                            showMonthDropdown
                            dropdownMode="select" required />
                        </Form.Group>
                        <Form.Group className="mb-4">
                          <Form.Control className='form-control' type="number" id="enterContactNumber" placeholder="Enter the contact number" onChange={(e) => handleContactNumberChange(e.target.value)}
                          pattern="^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6789]\d{9}$" title="Enter valid mobile number" required />
                        </Form.Group>
                        <Form.Group className="mb-4">
                          <Form.Control className='form-control' as="textarea" rows={3} id="enterProblem" placeholder="Enter the problem of the product" onChange={(e) => handleProblemChange(e.target.value)} required />
                        </Form.Group>
                        <Form.Group className="mb-4">
                          <Form.Text style={{ fontSize: '16px' }}> Select date </Form.Text>
                          <DatePicker
                            selected={selectedDate}
                            className='form-control'
                            onChange={handleDateChange}
                            dateFormat="dd/MM/yyyy"
                            minDate={today}
                            maxDate={fiveDaysLater}
                            required
                          />
                        </Form.Group>
                        <Form.Group className="mb-4">
                          <Form.Text style={{ fontSize: '16px' }}> Available Slot </Form.Text>
                          <Row>
                            <Col sm="8">
                              <Form.Control
                                className='mb-3'
                                style={{ width: '300px' }}
                                type="time"
                                as="select"
                                value={selectedTime}
                                onChange={(e) => handleTimeChange(e.target.value)}
                                disabled={!selectedDate}
                              >
                                <option>Select time slot</option>
                                <optgroup label='Available Slot'>
                                  {availableSlots.map((slot, index) => {
                                    const currentTime = moment().format('h:mm A');
                                    const isToday = moment(selectedDate).isSame(moment(), 'day');
                                    if (!isToday || moment(slot, 'h:mm A').isAfter(moment(currentTime, 'h:mm A'))) {
                                      return (
                                        <option key={index} value={slot}>
                                          {slot}
                                        </option>
                                      );
                                    }
                                    return null;
                                  })}
                                </optgroup>

                              </Form.Control>
                            </Col>
                            <Col sm="4">
                              <Button type='submit' id="bookButton" >Book</Button>
                            </Col>
                          </Row>
                        </Form.Group>
                      </Form>}

                    </div>
                  </Col>
                  </div>
                  </div>
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
        <>
        {isLoading && (
        <div className="loading-screen">
          <div className="loading-popup">
            <div className="loading-content">
              <div style={{ fontFamily: 'Times New Roman', fontWeight: 'bold', fontSize: '1.2em' }}>
                Please wait while we're booking your Appointment...
              </div>&nbsp;&nbsp;
              <ClockLoader color="green" loading={true} size={45} /> 
            </div>
          </div>
        </div>
      )}
      <div className={isLoading ? "blur-background" : ""} >
      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <div>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Appointment Details!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body >
          <Form className="my-form text-start">
            <Form.Group className="mb-4">
            <Form.Label style={{fontWeight:'bold',fontSize: '15px' }}> Camera Name : </Form.Label>
            <Form.Label style={{ fontSize: '15px' }}>{enterProductName}</Form.Label>
            </Form.Group>
            <Form.Group className="mb-4">
            <Form.Label style={{fontWeight:'bold',fontSize: '15px' }}> Model Number : </Form.Label>
            <Form.Label style={{ fontSize: '15px' }}>{enterModelNo}</Form.Label>
            </Form.Group>
            <Form.Group className="mb-4">
            <Form.Label style={{fontWeight:'bold',fontSize: '15px' }}> Contact Number : </Form.Label>
            <Form.Label style={{ fontSize: '15px' }}>{enterContactNumber}</Form.Label>
            </Form.Group>
            <Form.Group className="mb-4">
            <Form.Label style={{fontWeight:'bold',fontSize: '15px' }}> Appointment Date : </Form.Label>
              <Form.Label style={{ fontSize: '15px' }}>
                {new Date(selectedDate).toLocaleDateString('en-GB')}
                </Form.Label>
            </Form.Group>
            <Form.Group className="mb-4">
            <Form.Label style={{fontWeight:'bold',fontSize: '15px' }}> Booked Slot : </Form.Label>
            <Form.Label style={{ fontSize: '15px' }}>{selectedTime}</Form.Label>
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label style={{fontWeight:'bold',fontSize: '15px' }}> Problem : </Form.Label>
              <Form.Label style={{ fontSize: '15px' }}>{enterProblem}</Form.Label>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={BillGeneration}>Show Bill</Button>
        </Modal.Footer>
        </div>
      </Modal>
      </div>

       
    
            <>
            <Modal show={show1} onHide={handleClose1} animation={false}>
              <Modal.Header closeButton>
                <Modal.Title>Service Bill</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form.Group className="mb-4">
                  <Form.Text style={{ fontSize: '15px', color: '#555555', fontWeight: 'bold' }}>
                    Service Name :
                  </Form.Text>
                  <Form.Text style={{ fontSize: '18px', color: '#333333' }}>
                    &nbsp; {selectedCardCenterName}
                  </Form.Text>
                </Form.Group>
                <Form.Group className="mb-4">
                  <Form.Text style={{ fontSize: '15px', color: '#555555', fontWeight: 'bold' }}>
                    Your Camera Name :
                  </Form.Text>
                  <Form.Text style={{ fontSize: '18px', color: '#333333' }}>
                    &nbsp;  {enterProductName}
                  </Form.Text>
                </Form.Group>
                <Form.Group className="mb-4">
                  <Form.Text style={{ fontSize: '15px', color: '#555555', fontWeight: 'bold' }}>
                    Basic Service Cost :
                  </Form.Text>
                  <Form.Text style={{ fontSize: '18px', color: '#333333' }}>
                    &nbsp;   {selectedCardServiceCost}/-
                  </Form.Text><br></br>
                  <Form.Text style={{ fontSize: '15px', color: '#777777' }}>
                    Note: Additional charges may apply based after the service based on your product.
                  </Form.Text>
                </Form.Group>
                <Form.Group className="mb-4">
                  <Form.Text style={{ fontSize: '15px', color: '#555555', fontWeight: 'bold' }}>
                    Your Contact Number :
                  </Form.Text>
                  <Form.Text style={{ fontSize: '20px', color: '#333333' }}>
                    &nbsp;  {enterContactNumber}
                  </Form.Text>
                </Form.Group>
                <Form.Group className="mb-4">
                  <Form.Text style={{ fontSize: '15px', color: '#555555', fontWeight: 'bold' }}>
                    Any Queries - Contact us:
                  </Form.Text>
                  <Form.Text style={{ fontSize: '18px', color: '#333333' }}>
                    &nbsp; {selectedCardServiceMailId}
                  </Form.Text>
                </Form.Group>
                <Form.Group className="mb-4">
                  <Form.Text style={{ fontSize: '15px', color: '#555555', fontWeight: 'bold' }}>
                    You can download your bill from
                    <a href="/user/Cart" style={{ color: '#007bff', marginLeft: '5px' }}>MyBookings!</a>
                  </Form.Text>
                </Form.Group>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="success" >
                  Pay Online!
                </Button>
                <Button variant="secondary" onClick={handleClose1}>
                  Pay after service
                </Button>
              </Modal.Footer>
            </Modal>
          </>
        </>
      </>
      </Box>
      </Box>
      </Box>
    </div>
  );
}
export default Dashboard;