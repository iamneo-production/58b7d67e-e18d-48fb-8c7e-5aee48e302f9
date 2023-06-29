import React, { Fragment, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import StarRatings from 'react-star-ratings';
import { Form, Button, Table } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../Styling/LoadingScreen.css';
import { BarLoader } from 'react-spinners';
import { API_URLS } from '../../Apis/config.js';


const Review = () => {
  
  const [data, setData] = useState([]);
  const [rating, setRating] = useState(0);
  const [username, setUsername] = useState();
  const [feedback, setFeedback] = useState('');
  const [smShow, setSmShow] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [itemsPerPage] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const[serviceCenterId, setServiceCenterId] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const email = localStorage.getItem('email');
    const username = localStorage.getItem('username');
    setUsername(username);
    getData(email);
    axios
      .get(`${API_URLS.getAdminByEmailId}/?email=${email}`)
      .then((result) => {
        if (result.data.userRole === 'admin') {
          localStorage.removeItem('email');
          navigate('/');
        }
      })
      .catch((error) => {
      });
  }, [navigate]);

  const getData = (email) => {
    axios
      .get(`${API_URLS.getAppointmentByMailId}?email=${email}`)
      .then((result) => {
          const currentDate = new Date().toLocaleDateString('en-GB');
          const currentTime = new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
          const currentBookings = result.data.filter((booking) => {
          const [startTime, endTime] = booking.bookedSlots.split(' - ');
          startTime.split(':')
          const [hours, minutes] = endTime.split(':');
          const appointmentEndTime = new Date();
          appointmentEndTime.setHours(hours);
          appointmentEndTime.setMinutes(minutes);
          const formattedEndTime = new Date(appointmentEndTime).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
          const formattedDateOfAppointment = new Date(booking.dateOfAppointment).toLocaleDateString('en-GB');
          return formattedDateOfAppointment < currentDate || (formattedDateOfAppointment === currentDate && formattedEndTime < currentTime);
        });
        setData(currentBookings);
      })
      .catch((error) => {
        toast.error(error)
      });
  };

  const handleReview = (booking) => {
    setSelectedBooking(booking);
    const serviceCenterId = booking.serviceCenterId;
    setServiceCenterId(serviceCenterId);
    setSmShow(true);
  };

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleFeedbackChange = (event) => {
    setFeedback(event.target.value);
  };

  const handleSubmit = () => {
    setIsLoading(true);
    const updatedRating = String(rating);
    const data = {
      userEmail : localStorage.getItem('email'),
      userName : username,
      serviceCenterId : serviceCenterId,
      rating : updatedRating,
      review : feedback
    }
    axios
    .post(`${API_URLS.addReview}`, data)
    .then((result)=>{
      setSmShow(false);
      setRating(0);
      setIsLoading(false)
      toast.success(result.data);
    });
  };

  const handleNextPage = () => {
    setPageNumber(pageNumber + 1);
  };

  const handlePreviousPage = () => {
    setPageNumber(pageNumber - 1);
  };

  const indexOfLastItem = pageNumber * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div>
      <Fragment>
      {isLoading && (
    <div className="loading-screen">
      <div className="loading-popup">
        <div className="loading-content">
          <div style={{ fontFamily: 'Times New Roman', fontWeight: 'bold', fontSize: '1.2em' }}>
            Submitting...
          </div>&nbsp;&nbsp;
          <BarLoader color="Blue" loading={true} size={20} /> 
        </div>
      </div>
    </div>
  )}
  
  <div className={isLoading ? "blur-background" : ""}></div>
        <ToastContainer/>
          <Table id="centerName1" bordered hover>
            <thead>
              <tr>
                <th scope="col">S.No</th>
                <th scope="col">Name</th>
                <th scope="col">Date</th>
                <th scope="col">Timing</th>
                <th scope="col" data-testid='comments'>Service cost</th>
                <th scope="col" data-testid="submitReview">Rating</th>
            
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1 + (pageNumber - 1) * itemsPerPage}</td>
                    <td id="centerName1">{item.serviceCenterName}</td>
                    <td>{new Date(item.dateOfAppointment).toLocaleDateString('en-GB')}</td>
                    <td>{item.bookedSlots}</td>
                    <td>{item.serviceCost}/-</td>
                    <td>
                      <Button onClick={() => handleReview(item)} data-service-center-id={item.serviceCenterId}>Rate us</Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        {data && data.length > itemsPerPage && (
          <div>
            <Button onClick={handlePreviousPage} disabled={pageNumber === 1}>Previous</Button>
            <Button onClick={handleNextPage} disabled={indexOfLastItem >= data.length}>Next</Button>
          </div>
        )}

        <Modal size="md" show={smShow} onHide={() => setSmShow(false)} aria-labelledby="example-modal-sizes-title-sm">
          <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-sm">Rate our Service</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Label style={{fontWeight:'normal'}}>Your feedback is valuable to us.</Form.Label>
            <Form.Group>
              <Form.Label style={{fontWeight:'normal'}}> Service Name : {selectedBooking && selectedBooking.serviceCenterName} </Form.Label>
            </Form.Group>
            <Form.Group controlId="rating">
              <Form.Label style={{fontWeight:'normal'}}>Rate Our Service :</Form.Label>
              <StarRatings
                rating={rating}
                starRatedColor="#FFD700"
                starHoverColor="#FFD700"
                starEmptyColor="#CCCCCC"
                starDimension="25px"
                starSpacing="5px"
                changeRating={handleRatingChange}
                onChange={handleRatingChange}
                numberOfStars={5}
                name="rating"
              />
            </Form.Group>
            <Form.Group controlId="feedback">
              <Form.Label style={{fontWeight:'normal'}}>Any Suggestions?</Form.Label>
              <Form.Control as="textarea" rows={3} onChange={handleFeedbackChange} />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="info" onClick={handleSubmit}>
              Submit
            </Button>
          </Modal.Footer>
        </Modal>
      </Fragment>
    </div>
  );
};

export default Review;
