import React, { useEffect, useState } from 'react';
import { Nav, Navbar, Container, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


function Home() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const email = localStorage.getItem("email");
    setEmail(email);

    axios
      .get(`https://8080-cddafbcbabccadefcdadfcefbadbddebabfddbdad.project.examly.io/api/Auth/getUserByEmailId?email=${email}`)
      .then((result) => {
        setUserName(result.data.username);
        localStorage.setItem("username", result.data.username);
        setUserRole(result.data.userRole);
      })
      .catch((error) => {
        alert(userRole);
      });
  }, []);

  const Logout = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("username");
    navigate("/");
  };

  return (
    <div>
      <Navbar bg="primary" expand="md">
        <Container>
          <Navbar.Brand href="#home">Kraft Cam</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link
                to="/user/Homepage"
                id="homeButton"
                activeClassName="active"
                className="nav-link"
              >
                Home
              </Link>
              <Link
                to="/user/Dashboard"
                id="dashBoardButton"
                activeClassName="active"
                className="nav-link"
              >
                Dashboard
              </Link>
              <Link
                to="/user/Appointment"
                id="myBookingButton"
                activeClassName="active"
                className="nav-link"
              >
                My Bookings
              </Link>
              <Link to='/user/CompletedBookings' activeClassName='active' className="nav-link">
                Completed Services
              </Link>
            </Nav>
            
            <Nav className="ml-auto">
              <Navbar.Text className="mr-md-3" style={{ color: "black" }}>
                Hello, {userName}
              </Navbar.Text>
              <Button
                onClick={Logout}
                id="logoutButton"
                activeClassName="active"
                style={{ color: "black", textDecoration: "none" }}
              >
                Logout
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Home;
