/* The above code is a React component that renders a user interface for a service center search
application. It includes a top bar, a side bar, and a main content area. The main content area
contains a search form, a list of service centers, and a placeholder service center card. The search
form allows users to search for service centers based on a keyword. The list of service centers is
dynamically rendered based on the data provided. Each service center card displays information such
as the service center name, address, and operating hours. */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Form, Button, Row, Col, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import Usertopbar from '../../Navbar/Usertopbar';
import Usersidebar from '../../Navbar/Usersidebar';
import { API_URLS } from '../../Apis/config.js';

function HomePage() {

 /* The code snippet is using the `useState` hook to declare and initialize multiple state variables. */
  const [userPage] = useState('Homepage')
  const [originalData, setOriginalData] = useState([]);
  const [data, setData] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

/* The `useEffect` hook is used to perform side effects in functional components. In this code snippet,
the `useEffect` hook is used to fetch data from the server and check if the logged-in user is an
admin or not. */

  useEffect(() => {
    getServiceCenterData();
    const email = localStorage.getItem('email')
    localStorage.setItem('userPage', userPage)
    axios.get(`${API_URLS.getAdminByEmailId}/?email=${email}`)
      .then((result) => {
        if (result.data.userRole === "admin") {
          localStorage.removeItem("email");
          navigate("/")
        }
      }).catch((error) => { 
      })

  }, [navigate, userPage]);
 
  /**
   * The function `getServiceCenterData` makes an HTTP GET request to `API_URLS.getServiceCenterData`
   * and sets the response data to `originalData` and `data`.
   */
  const getServiceCenterData = () => {
    axios
      .get(API_URLS.getServiceCenterData, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((result) => {
        setOriginalData(result.data);
        setData(result.data);
      })
      .catch((error) => {
      });
  };

  const handleSearch = () => {
    if (searchKeyword.trim() === '') {
      setData(originalData);
    } else {
      const filteredData = originalData.filter((item) =>
        item.serviceCenterName.toLowerCase().includes(searchKeyword.toLowerCase())
      );
      setData(filteredData);
    }
  };

 /**
  * The function `handleInputChange` updates the search keyword state and filters a list of suggestions
  * based on the input value.
  */
  const handleInputChange = (event) => {
    const input = event.target.value;
    setSearchKeyword(input);
    if (input.trim() === '') {
      setSuggestions([]);
    } else {
      const filteredSuggestions = originalData
        .filter((item) =>
          item.serviceCenterName.toLowerCase().includes(input.toLowerCase())
        )
        .slice(0, 5)
        .map((item) => item.serviceCenterName);
      setSuggestions(filteredSuggestions);
    }
  };

  const handleCardClick = (serviceCenterId, card) => {
    if (serviceCenterId) {
      localStorage.setItem('selectedcard', JSON.stringify(card));
      navigate(`/user/Dashboard`)
    }
  };

  const cardStyle = {
    width: '18rem',
    position: 'static',
    border: '1px solid black',
    borderRadius: '10px',
    padding: '10px',
    height: '400px',
  };

  /* The above code is a React component that renders a user interface for a service center search
  application. It includes a top bar, a side bar, and a main content area. The main content area
  contains a search form, a list of service centers, and a placeholder service center card. The
  search form allows users to search for service centers based on a keyword. The list of service
  centers is dynamically rendered based on the data provided. Each service center card displays
  information such as the service center name, address, and operating hours. */
  return (
    <div>
    <Box sx={{ display: "flex", flexDirection: "column", background: "linear-gradient(to bottom, rgba(7, 150, 238, 0.947), rgb(246, 246, 246))" }}>
      <Box
        sx={{
          display: "flex",
          minHeight: "80px",
          width: "100%",
          position: "fixed",
        }}
      >
        <Usertopbar />
      </Box>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          marginTop: "80px",
          flexDirection: "row",
          height: "100%",
        }}
      >
        <Box
          component="nav"
          sx={{
            width: "80px",
            flexShrink: 0,
            height: "100%",
          }}
        >
          <Usersidebar />
        </Box>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            minHeight: "100%",
            background: "linear-gradient(to bottom, rgba(7, 150, 238, 0.947), rgb(246, 246, 246))",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              display: "flex",
              width: "100%",
              minHeight: "100%",
              overflow: "auto",
            }}
          >
            <Container className="mt-3">
              <br />
              <Col sm={12} className="d-flex justify-content-center">
                <Form className="d-flex">
                  <Form.Control
                    type="search"
                    placeholder="Type here to search"
                    className="me-2"
                    aria-label="Search"
                    style={{ width: "300px" }}
                    value={searchKeyword}
                    onChange={handleInputChange}
                    list="service-centers"
                  />
                  <datalist id="service-centers">
                    {suggestions.map((suggestion, index) => (
                      <option key={index} value={suggestion} />
                    ))}
                  </datalist>
                  <Button className="btn btn-success" onClick={handleSearch}>
                    Search
                  </Button>
                </Form>
              </Col>
              <br />
              <br />
              <Row xs={1} sm={2} md={3} lg={4}>
                {data.map((item, index) => (
                  <Col xs={12} sm={6} md={4} key={index}>
                    <Card
                      id="grid1"
                      className="mb-4"
                      style={cardStyle}
                      onClick={() => handleCardClick(item.serviceCenterId, item)}
                    >
                      <Card.Img
                        variant="top"
                        src={item.serviceCenterImageUrl}
                        onError={(e) => {
                          e.target.src =
                            "https://via.placeholder.com/300x200?text=Image+not+found";
                        }}
                      />
                      <Card.Body className="d-flex flex-column">
                        <Card.Title>{item.serviceCenterName}</Card.Title>
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
              <Row xs={1} sm={2} md={3} lg={4}>
                <Col xs={12} sm={6} md={4} key={1}>
                  <Card id="grid1" className="mb-4" style={cardStyle}>
                    <Card.Img
                      variant="top"
                      src="https://www.shutterstock.com/image-photo/precision-prime-optical-dslr-lens-260nw-403854763.jpg"
                      onError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/300x200?text=Image+not+found";
                      }}
                    />
                    <Card.Body className="d-flex flex-column">
                      <Card.Title data-testid="centerName">
                        Dummy Service Center
                      </Card.Title>
                      <div className="d-flex justify-content-between mb-3">
                        <div className="text-start">
                          <Card.Text data-testid="place">
                            <strong>
                              <em>Place: </em>
                            </strong>
                            123 Dummy Street, Dummy City
                          </Card.Text>
                          <Card.Text>
                            <strong>
                              <em>Timing: </em>
                            </strong>
                            09:00:00 - 18:00:00
                          </Card.Text>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Container>
          </Box>
        </Box>
      </Box>
    </Box>
  </div>
  
  );
}
export default HomePage;