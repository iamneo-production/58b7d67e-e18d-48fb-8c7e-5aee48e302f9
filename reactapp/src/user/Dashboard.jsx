import React, { useState, useEffect } from 'react';
import Home from '../components/Home';
import { Card, Form, Button, Row, Col, Container, Image } from 'react-bootstrap';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import StarRatings from 'react-star-ratings';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-bootstrap/Modal';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
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
  const [selectedDate, setSelectedDate] = useState(new Date());
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

  function handleDateChange(date) {
    const utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    setSelectedDate(utcDate);

    const formattedDate = utcDate.toISOString().split('T')[0]; // Format date as "yyyy-mm-dd"

    const data3 = {
      serviceCenterId: selectedCard.serviceCenterId,
      appointmentDate: formattedDate,
    };


    const url = `https://8080-cddafbcbabccadefcdadfcefbadbddebabfddbdad.project.examly.io/api/Appointment/getSlotDetailsByDate/${selectedCard.serviceCenterId},${formattedDate}`;    axios.get(url, data3).then((result) => {
      setReceivedValues(result.data);
    });
  }
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
    axios.get(`https://8080-cddafbcbabccadefcdadfcefbadbddebabfddbdad.project.examly.io/api/Auth/getAdminByEmailId/?email=${email}`)
      .then((result) => {
        if (result.data.userRole === "admin") {
          localStorage.removeItem("email");
          navigate('/')
        }
        console.log(result)
      }).catch((error) => {
      });
      getServiceCenterData();
  }, [])
  useEffect(() => {
  const fetchData = async () => {
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
          })
          .catch(error => {
            // Handle any errors that occur during the fetch or data processing
            console.error(error);
          });
      });
    }
  };
  fetchData();
}, []);
  useEffect(() => {
    getServiceCenterData();
  }, []);

  const getServiceCenterData = () => {
    axios
    .get('https://8080-cddafbcbabccadefcdadfcefbadbddebabfddbdad.project.examly.io/api/ServiceCenter/admin/getservicecenter', {
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
        alert(error);
      });
  };

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
    const dLat = deg2rad(lat2 - lat1);
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

   
    axios
    .get(`https://8080-cddafbcbabccadefcdadfcefbadbddebabfddbdad.project.examly.io/api/Review/getReviews/${selectedCard.serviceCenterId}`)
    .then((result) => {
      handleShow();
        const rating = result.data.rating; 
        const displayedRating = rating < 2 ? 3 : rating;
        setSelectedRating(displayedRating);
      })
      .catch((error) => {
        console.log(error);
      });
    
    
    setDateOfPurchase('');
    setSelectedDate('');
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      filterByLocationOrName();
    }
  }

 
  function handleButtonClick(event) {
    event.preventDefault();
    const bookData = {
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
    const url1 = 'https://8080-cddafbcbabccadefcdadfcefbadbddebabfddbdad.project.examly.io/api/Appointment/user/appointment'; 
    axios.post(url1, bookData)
      .then((result) => {
        if (result.data === "Appointment Booked Successfully") {

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
          const url1 = 'https://8080-cddafbcbabccadefcdadfcefbadbddebabfddbdad.project.examly.io/api/Appointment/postAvailableSlots' 
          axios.post(url1, SlotData)
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
    handleShow1(true);
    setModalShow();
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
    width: '250px',
    position: 'relative',
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
    position: 'relative',
    border: '1px solid black',
    borderRadius: '10px',
    padding: '10px',
    height: '350px',
    overflowX: 'auto'
  };
  return (
    <>
      <Home />
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
          <Modal
            show={modalShow}
            onHide={() => setModalShow(false)}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Appointment Booked Successfully!
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form className="my-form text-start">
                <Form.Group className="mb-4">
                  <Form.Text style={{ fontSize: '15px' }}> Camera Name : </Form.Text>
                  <Form.Text style={{ fontSize: '15px' }}>{enterProductName}</Form.Text>
                </Form.Group>
                <Form.Group className="mb-4">
                  <Form.Text style={{ fontSize: '15px' }}> Model Number : </Form.Text>
                  <Form.Text style={{ fontSize: '15px' }}>{enterModelNo}</Form.Text>
                </Form.Group>
                <Form.Group className="mb-4">
                  <Form.Text style={{ fontSize: '15px' }}> Contact Number : </Form.Text>
                  <Form.Text style={{ fontSize: '15px' }}>{enterContactNumber}</Form.Text>
                </Form.Group>
                <Form.Group className="mb-4">
                  <Form.Text style={{ fontSize: '15px' }}> Appointment Date : </Form.Text>
                  <Form.Text style={{ fontSize: '15px' }}>
                    {new Date(selectedDate).toLocaleDateString('en-GB')}
                  </Form.Text>
                </Form.Group>
                <Form.Group className="mb-4">
                  <Form.Text style={{ fontSize: '15px' }}> Booked Slot : </Form.Text>
                  <Form.Text style={{ fontSize: '15px' }} >{selectedTime}</Form.Text>
                </Form.Group>
                <Form.Group className="mb-4">
                  <Form.Text style={{ fontSize: '15px' }}> Problem : </Form.Text>
                  <Form.Text style={{ fontSize: '15px' }}>{enterProblem}</Form.Text>
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={BillGeneration}>Show Bill</Button>
            </Modal.Footer>
          </Modal>
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
                    <a href="/user/Appointment" style={{ color: '#007bff', marginLeft: '5px' }}>MyBookings!</a>
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
    </>
  );
}
export default Dashboard;
