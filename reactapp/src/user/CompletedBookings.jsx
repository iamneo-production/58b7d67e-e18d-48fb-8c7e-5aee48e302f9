import React, { Fragment, useState, useEffect } from 'react';
import Home from '../components/Home';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import StarRatings from 'react-star-ratings';
import { Form, Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CompletedBookings = ({ completedBookings }) => {
  const [data, setData] = useState([]);
  const [rating, setRating] = useState(0);
  const [username, setUsername] = useState();
  const[email, setEmail] = useState();
  const [feedback, setFeedback] = useState('');
  const [smShow, setSmShow] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const[serviceCenterId, setServiceCenterId] = useState();
  
  const navigate = useNavigate();

  useEffect(() => {
    const email = localStorage.getItem('email');
    const username = localStorage.getItem('username');
    setUsername(username);
    setEmail(email);
    getData(email);
    axios
      .get(`https://8080-cddafbcbabccadefcdadfcefbadbddebabfddbdad.project.examly.io/api/Auth/getAdminByEmailId/?email=${email}`)
      .then((result) => {
        if (result.data.userRole === 'admin') {
          localStorage.removeItem('email');
          navigate('/');
        }
      })
      .catch((error) => {console.log(error)});
  }, []);

  const getData = (email) => {
    axios
      .get(`https://8080-cddafbcbabccadefcdadfcefbadbddebabfddbdad.project.examly.io/api/Appointment/getAppointment/?email=${email}`)
      .then((result) => {

        const currentDate = new Date().toLocaleDateString('en-GB');
        const currentTime = new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
        const currentBookings = result.data.filter((booking) => {
          const [startTime, endTime] = booking.bookedSlots.split(' - ');
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
        alert(error);
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
    // Handle the submission of rating and feedback data

    const updatedRating = String(rating);

         const data = {
          userEmail : localStorage.getItem('email'),
          serviceCenterId : serviceCenterId,
          rating : updatedRating,
          review : feedback
    }
    axios
    .post('https://8080-cddafbcbabccadefcdadfcefbadbddebabfddbdad.project.examly.io/api/Review/AddReview' , data)
    .then((result)=>{
        setSmShow(false);
        setRating(0);
      toast.success(result.data)
    })
  }

  return (
    <div>
      <Home />
      <Fragment>
        <ToastContainer/>
        {data && data.length > 0 ? (
          <table id="centerName1" className="table table-hover">
            <thead>
              <tr>
                <th scope="col">S.No</th>
                <th scope="col">Name</th>
                <th scope="col">Date</th>
                <th scope="col">Timing</th>
                <th scope="col">Service cost</th>
                <th scope="col">Rating</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td id="centerName1">{item.serviceCenterName}</td>
                    <td>{new Date(item.dateOfAppointment).toLocaleDateString('en-GB')}</td>
                    <td>{item.bookedSlots}</td>
                    <td>{item.serviceCost}/-</td>
                    <td>
                    <Button onClick={() => handleReview(item)} data-service-center-id={item.serviceCenterId}>Review</Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <p>No Completed Bookings....</p>
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
              
            <Form.Label style={{fontWeight:'normal'}}>Rate Our Service :    </Form.Label>
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
            <Form.Label style={{fontWeight:'normal'}}>Any Suggestions? </Form.Label>
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

export default CompletedBookings;
