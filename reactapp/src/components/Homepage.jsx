import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Form, Button, Row, Col, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Home from './Home';


function HomePage() {
  const [originalData, setOriginalData] = useState([]);
  const [data, setData] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

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

  const handleCardClick = (serviceCenterId) => {
    if (serviceCenterId) {
    navigate('/user/Dashboard', { state: { serviceCenterId } });
    }
  };

  const cardStyle = {
    width: '18rem',
    position: 'relative',
    border: '1px solid black',
    borderRadius: '10px',
    padding: '10px',
    height: '400px'
  };

  return (
    <>
    <Home/>
    <Container className="mt-3">
      <br/>
      <Col sm={12} className="d-flex justify-content-center">
        <Form className="d-flex">
          <Form.Control
            type="search"
            placeholder="Type here to search"
            className="me-2"
            aria-label="Search"
            style={{ width: '500px' }}
            value={searchKeyword}
            onChange={handleInputChange}
            list="service-centers"
          />
          <datalist id="service-centers">
            {suggestions.map((suggestion, index) => (
              <option key={index} value={suggestion} />
            ))}
          </datalist>
          <Button id="submitButton" class="btn btn-success" onClick={handleSearch}>
            Search 
          </Button>
        </Form>
      </Col>
      <br/><br/>
      <Row xs={1} sm={2} md={3} lg={3}>
        {data.map((item, index) => (
          <Col xs={12} sm={6} md={4} key={index}>
            <Card
              id={`grid${index}`}
              className="mb-4"
              style={cardStyle}
              onClick={() => handleCardClick(item.serviceCenterId)}
            >
                            <Card.Img
                                variant="top"
                                src={item.serviceCenterImageUrl}
                                onError={(e) => {
                                    e.target.src =
                                        'https://via.placeholder.com/300x200?text=Image+not+found';
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
        </>
    );
}

export default HomePage;
