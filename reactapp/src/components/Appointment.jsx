import React from 'react'
import Home from './Home';
import { useLocation } from 'react-router-dom';


function MyBookings() {
  const location = useLocation();
  const email = location.state?.email;

  return (
    <div>
      <Home />
      <h1>My Bookings for {email}!</h1>
    </div>
  )
}
export default MyBookings