import React, { useEffect, useState } from 'react';
import { Nav, Navbar, Container, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {  Link, useNavigate } from 'react-router-dom';
function Home() {


  const navigate = useNavigate();
  const [email, setEmail] = useState("")


  useEffect(() => {
    const email = localStorage.getItem("email")
    setEmail(email)
  }, [])


  const Logout = () => {
    localStorage.removeItem("email");
    navigate("/")
  }
  return (
    <div>
      <Navbar bg="primary" expand="md">
        <Container>
          <Navbar.Brand href="#home">Kraft Cam</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link to='/user/Homepage' activeClassName='active' style={{ color: 'black', marginRight: '10px', textDecoration: 'none' }}>Home</Link>
              <Link to='/user/Dashboard' activeClassName='active' style={{ color: 'black', marginRight: '10px', textDecoration: 'none' }}>
                Dashboard
              </Link>
              <Link to='/user/Appointment' activeClassName='active' style={{ color: 'black', marginRight: '10px', textDecoration: 'none' }}>
                My Bookings
              </Link>
            </Nav>
            <Nav class="collapse navbar-collapse justify-content-end">
              {email} &nbsp;
              <Button onClick={Logout} activeClassName='active' style={{color:'black', textDecoration: 'none'}}>Logout</Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Home;