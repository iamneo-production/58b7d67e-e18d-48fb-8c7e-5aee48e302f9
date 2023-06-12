import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';  
import { Nav, Navbar, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios'


function AddCenter() {
  
  const navigate = useNavigate();
  const [email, setEmail] = useState("")
  const[userName, setUserName] = useState("")
  const[userRole, setUserRole] = useState("")

  useEffect(() => {
    const email = localStorage.getItem("email")
    setEmail(email)
    axios.get(`https://8080-cddafbcbabccadefcdadfcefbadbddebabfddbdad.project.examly.io/api/Auth/getAdminByEmailId/?email=${email}`)
    .then((result)=>{
      setUserName(result.data.username)
      setUserRole(result.data.userRole)
    }).catch((error)=>{

    })
  }, [])

  const Logout = () => {
    localStorage.removeItem("email");
    navigate("/")
  }

return(
<div>
<Navbar bg="primary" expand="md">
  <Container>
    <Navbar.Brand href="#AddCenter">Kraft Cam</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto">
        <Link
          to="/admin/addServiceCenter"
          id="adminAddCenter"
          activeclassname="active"
          style={{
            color: "black",
            marginRight: "10px",
            textDecoration: "none",
          }}
        >
          Add Center
        </Link>
        <Link
          to="/admin/Centerprofile"
          id="adminCenterProfile"
          activeclassname="active"
          style={{
            color: "black",
            marginRight: "10px",
            textDecoration: "none",
          }}
        >
          Center Profile
        </Link>
        <Link
          to="/admin/Reports"
          id="adminProfileView"
          activeclassname="active"
          style={{
            color: "black",
            marginRight: "10px",
            textDecoration: "none",
          }}
        >
          Reports
        </Link>
        <Link
          to="/admin/Customers"
          id="adminProfileView"
          activeclassname="active"
          style={{
            color: "black",
            marginRight: "10px",
            textDecoration: "none",
          }}
        >
          Customers
        </Link>
      </Nav>
      <Nav className="ml-auto">
        <Navbar.Text className="mr-3" style={{ color: "black" }}>
          Hello, {userName}
        </Navbar.Text>
        <Nav.Item>
          <Button
            onClick={Logout}
            id="logout"
            activeclassname="active"
            style={{ color: "black", textDecoration: "none" }}
          >
            Logout
          </Button>
        </Nav.Item>
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>
 
</div>
)
}

export default AddCenter;