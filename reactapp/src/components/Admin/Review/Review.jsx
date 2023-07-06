/* The code is a React functional component called "Review". It imports necessary dependencies such as
React, useEffect, useState, axios, StarRatings, Adminsidebar, Admintopbar, Box, API_URLS, and
useNavigate. */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import StarRatings from 'react-star-ratings';
import Adminsidebar from '../../Navbar/Adminsidebar';
import Admintopbar from '../../Navbar/Admintopbar';
import { Box } from '@mui/material';
import { API_URLS } from '../../Apis/config.js';
import { useNavigate } from 'react-router-dom';

function Review() {

  const[adminPage] = useState('Customer Reviews');
  const [reviews, setReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [reviewsPerPage] = useState(10);
  let navigate = useNavigate();

/* The `useEffect` hook is used to perform side effects in a functional component. In this case, the
`useEffect` hook is used to fetch the reviews, set the `adminPage` value in the local storage, and
check the user role based on the email stored in the local storage. */
  useEffect(() => {
    fetchReviews();
    localStorage.setItem('adminPage', adminPage)
    const email =localStorage.getItem('email')
    axios.get(`${API_URLS.getUserByEmailId}?email=${email}`)
    .then((result)=>{
      if(result.data.userRole==="user"){
        localStorage.removeItem("email");
        navigate("/")
      }
    }).catch((error)=>{
    })
  }, [adminPage, navigate]);

  const fetchReviews = async () => {
    try {
      const response = await axios.get(API_URLS.getAllReviews);
      setReviews(response.data);
    } catch (error) {
      
    }
  };

  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <Box sx={{ display: 'flex', flexDirection: 'column', background: "linear-gradient(to bottom, rgba(7, 150, 238, 0.947), rgb(246, 246, 246))"  }}>
        <Box sx={{ display: 'flex', minHeight: '80px', width: '100%', position: 'fixed' }}>
          <Admintopbar />
        </Box>
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            marginTop: '80px',
            flexDirection: 'row',
            height: '100%',
          }}
        >
          <Box component="nav" sx={{ width: '80px', flexShrink: 0, height: '100%' }}>
            <Adminsidebar />
          </Box>
          <Box sx={{ display: 'flex', width: '100%', minHeight: '100%', flexDirection: 'column' }}>
            
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">Serial Number</th>
                    <th scope="col">Username</th>
                    <th scope="col" data-testid='customerId'>Email</th>
                    <th scope="col">Review</th>
                    <th scope="col">Rating</th>
                  </tr>
                </thead>
                <tbody>
                  {currentReviews.map((review, index) => (
                    <tr key={index}>
                      <td>{index + 1 + indexOfFirstReview}</td>
                      <td>{review.userName}</td>
                      <td>{review.userEmail}</td>
                      <td>{review.review}</td>
                      <td>
                      <StarRatings
  rating={review.rating}
  starRatedColor="gold"
  numberOfStars={5}
  starDimension="20px"
  starSpacing="2px"
  style={{ position: 'fixed' }}
/>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            {reviews.length > reviewsPerPage && (
              <div className="pagination">
                <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
                  Previous
                </button>
                <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === Math.ceil(reviews.length / reviewsPerPage)}>
                  Next
                </button>
              </div>
            )}
          </Box>
        </Box>
      </Box>
    </div>
  );
}

export default Review;
