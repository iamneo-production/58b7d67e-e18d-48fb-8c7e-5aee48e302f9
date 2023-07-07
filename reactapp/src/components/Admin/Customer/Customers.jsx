/* The above code is a React component that renders a user management page. It includes a top bar, a
sidebar, and a main content area. The main content area displays a table of users with their details
such as username, email, mobile number, and role. The table also includes checkboxes to select
multiple users for deletion. The component also includes functionality to search for users by
username, add new users, edit existing users, and navigate through paginated results. It also
includes loading indicators and error handling. */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { PencilSquare, Eye, EyeSlash } from 'react-bootstrap-icons';
import { Form, Button } from 'react-bootstrap';
import {  MDBCol } from 'mdbreact';
import Modal from 'react-bootstrap/Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Box} from '@mui/material';
import Adminsidebar from '../../Navbar/Adminsidebar';
import Admintopbar from '../../Navbar/Admintopbar';
import Swal from 'sweetalert2';
import {  BeatLoader } from 'react-spinners';
import '../../Styling/LoadingScreen.css';
import { API_URLS } from '../../Apis/config.js';

function Customers() {
  const[adminPage] = useState('Customers');
  const [data, setData] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const[editUserrole, seteditUserrole] = useState('');
  const[editUsername, seteditUsername] = useState('');
  const[editEmailId, seteditEmailId] = useState('');
  const[editContactNumber, seteditContactNumber] = useState('');
  const[editPassword, seteditPassword] = useState('');
  const [editedId, setEditedId] = useState('');
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);
  const [selectAllChecked, setSelectAllChecked] = useState(false)
  const [isLoading, setIsLoading] = useState(false);
  let navigate = useNavigate();
  /**
   * The function `getData` makes an HTTP GET request to `API_URLS.getAllUsers` and sets the response
   * data to the `data` state variable, or displays a warning toast if there is an error.
   */
  const getData = () =>{
    axios
    .get(API_URLS.getAllUsers)
    .then((result) => {
      setData(result.data);
    })
    .catch((error) => {
      toast.warning(error)
    });
  }
  /* The above code is a React useEffect hook that is used to fetch data from an API and perform some
  actions based on the response. */
  useEffect(() => {
    const email = localStorage.getItem('email');
    localStorage.setItem('adminPage', adminPage)
    axios
    .get(API_URLS.getAllUsers)
    .then((result) => {
      setData(result.data);
    })
    .catch((error) => {
      toast.warning(error)
    });
    axios
      .get(`${API_URLS.getUserByEmailId}?email=${email}`)
      .then((result) => {
        if (result.data.userRole === "user") {
          localStorage.removeItem("email");
          navigate('/');
        }
      })
      .catch((error) => {
        toast.warning(error)
      });
  
  }, [navigate, adminPage]);

  useEffect(() => {
    if (data) {
      const filteredData = data.filter((item) =>
        item.userName.toLowerCase().includes(searchInput.toLowerCase())
      );
      setSuggestions(filteredData);
    }
  }, [searchInput, data]);
 /**
  * The function `handleEdit` is used to fetch user data by ID and set the fetched data to state
  * variables for editing.
  */
  const handleEdit = (ID) => {
    setIsLoading(true);
    setEditedId(ID)
    axios.get(`${API_URLS.getUserByUserId}/${ID}`)
    .then((result)=>{

      seteditUserrole(result.data.userRole)
      seteditUsername(result.data.userName)
      seteditEmailId(result.data.email)
      seteditContactNumber(result.data.mobileNumber)
      seteditPassword(result.data.password)
      setIsLoading(false);
      handleShow();
    })
  };

  /**
   * The `handleUpdate` function updates user details by making a PUT request to the server with the
   * edited data.
   */
  const handleUpdate = () =>{
    setIsLoading(true);
    const data = {
      Email : editEmailId,
      Password : editPassword,
      UserName : editUsername,
      MobileNumber : editContactNumber,
      UserRole : editUserrole
    }
    axios.put(`${API_URLS.editUserById}/${editedId}`, data)
    .then((result)=>{
      setShow(false)
      getData();
      setIsLoading(false);
      toast.success("User details updated successfully!")
    })
  }
  /**
   * The `handleCheckBox` function is used to handle the checkbox state changes in a React component,
   * updating the `isChecked` property of the corresponding item in the `suggestions` array.
   */
  const handleCheckBox = (e) => {
    const { value, checked } = e.target;
    
    if (value === 'allselect') {
      const updatedSuggestions = suggestions.map((item) => ({
        ...item,
        isChecked: checked,
      }));
      setSelectAllChecked(checked);
      setSuggestions(updatedSuggestions);
    } else {
      const updatedSuggestions = suggestions.map((item) =>
        item.userId === parseInt(value) ? { ...item, isChecked: checked } : item
      );
  
      const isAllChecked = updatedSuggestions.every((item) => item.isChecked);
  
      setSelectAllChecked(isAllChecked);
      setSuggestions(updatedSuggestions);
    }
  };
 /**
  * The handleDelete function is used to delete selected users by sending a DELETE request to the
  * server and displaying a confirmation dialog to the user.
  */
  const handleDelete = () => {

    const checkedIds = suggestions
      .filter((item) => item.isChecked && item.userId != null)
      .map((item) => item.userId);
     
    Swal.fire({
      title: 'Confirm Deletion',
      text: 'Are you sure you want to delete the selected users?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
      reverseButtons: true,
      
    }).then((result) => {
      if (result.isConfirmed) {
        setIsLoading(true);
        axios
          .delete(API_URLS.deleteUsers, { data: checkedIds })
          .then((response) => {
            setIsLoading(false);
            toast.info('Users Deleted!');
            getData();
          })
          .catch((error) => {
            toast.warning('Error deleting records:', error);
          });
      }
    });
  };
const handleUserChange = (value) => {
  seteditUserrole(value.toLowerCase());
};
const handleEmailChange = (value) => {
  seteditEmailId(value.toLowerCase());
};
const handleUsernameChange = (value) => {
  seteditUsername(value);
};
const handleMobileChange  = (value) => {
  seteditContactNumber(value);
};
const handlePasswordChange = (value) => {
  seteditPassword(value);
};
const Add = () =>{
  handleShow1();
}
/**
 * The AddUser function sends a POST request to the API to add a new user and updates the state
 * accordingly.
 */
const AddUser = () =>{
  setIsLoading(true);
  const data1 = {
    Email : editEmailId,
    Password : editPassword,
    UserName : editUsername,
    MobileNumber: editContactNumber,
    UserRole : editUserrole
  }
  axios.post(API_URLS.addUser, data1)
  .then((result)=>{
    setIsLoading(false);
    toast.success("User Added")
    handleClose1();
    getData();
  })
}
const handleNextPage = () => {
  setCurrentPage(currentPage + 1);
};
const handlePreviousPage = () => {
  if (currentPage > 1) {
    setCurrentPage(currentPage - 1);
  }
};
const [currentPage, setCurrentPage] = useState(1);
const pageSize = 10; 
const isDeleteButtonVisible = suggestions.some((item) => item.isChecked);
const startIndex = (currentPage - 1) * pageSize;
const endIndex = startIndex + pageSize;
  /* The above code is a React component that renders a user management page. It includes a top bar, a
  sidebar, and a main content area. The main content area displays a table of users with their
  details such as username, email, mobile number, and role. The table also includes checkboxes to
  select multiple users for deletion. The component also includes functionality to search for users
  by username, add new users, edit existing users, and navigate through paginated results. It also
  includes loading indicators and error handling. */
  return (
    <div>
    <Box sx={{ display: "flex" ,flexDirection:"column", background: "linear-gradient(to bottom, rgba(7, 150, 238, 0.947), rgb(246, 246, 246))"  }}>
    <Box sx={{
       display: "flex",
       minHeight: "80px" ,
       width:"100%",
       position:"fixed"
     }}> <Admintopbar/> </Box>
   <Box sx={{ 
     display: "flex",
     width:"100%",
     marginTop:"80px",
     flexDirection:"row",
     height:"100%",
     
     }}>
     <Box component="nav"
     sx={{
       width: "80px",
       flexShrink: 0,
       height:"100%"
     }}><Adminsidebar/>
     </Box>
     <Box sx={{
       display:"flex",
       width:"100%",
       minHeight: "100%",
       flexDirection:"column"
         }}>
{isLoading && (
    <div className="loading-screen">
      <div className="loading-popup">
        <div className="loading-content">
          <div style={{ fontFamily: 'Times New Roman', fontWeight: 'bold', fontSize: '1.2em' }}>
            Hold on...
          </div>&nbsp;&nbsp;
          <BeatLoader color="Blue" loading={true} size={20} /> 
        </div>
      </div>
    </div>
  )}
  <div className={isLoading ? "blur-background" : ""}></div>
      <ToastContainer/>
      <br />
      <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <MDBCol md="6">
    <Form.Control
      type="text"
      placeholder="Type username to Search"
      value={searchInput}
      onChange={(e) => setSearchInput(e.target.value)}
    />
  </MDBCol>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  {isDeleteButtonVisible && (
  <button
    type="button"
    className="btn btn-danger"
    onClick={handleDelete}
  >
    Delete Users
  </button>
)} 
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <button type="button" className="btn btn-success" onClick={Add}>
    Add User
  </button>
</div>
<br/> <br/>
      </div>
      {suggestions.length > 0 ? (
        <table className="table table-hover">
          <thead>
            <tr>
              <th>
                <input type='checkbox' value='allselect' checked={selectAllChecked} onChange={handleCheckBox} />
              </th>
              <th scope="col">S.No</th>
              <th scope="col">User Name</th>
              <th scope="col">Email Id</th>
              <th scope="col">Mobile Number</th>
              <th scope="col">Role</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {suggestions.slice(startIndex, endIndex).map((item, index)=> {
              const serialNumber = startIndex + index + 1;
              return (
                <tr key={item.index}>
                  <th> <Form.Check type='checkbox' value={item.userId} checked={item.isChecked||false} onChange= {handleCheckBox} /> </th>
                  <td>{serialNumber}</td>
                  <td>{item.userName}</td>
                  <td>{item.email}</td>
                  <td>{item.mobileNumber}</td>
                  <td>{item.userRole}</td>
                  <td>
                    <Button
                      variant="link"
                      onClick={() => handleEdit(item.userId)}
                    >
                      <PencilSquare size={24} />
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <h6>No Users....</h6>
      )}
       <div>
        <button variant="info"  onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        <button variant="secondary" onClick={handleNextPage} disabled={endIndex >= suggestions.length}>
          Next
        </button>
      </div>
 <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form.Group className="mb-3">
            
            <Form.Control
        className="form-control"
        type="text"
        data-testid="admin/user"
        value={editUserrole}
        onChange={(e) => seteditUserrole(e.target.value)}
        disabled/>
            </Form.Group>
            <Form.Group className="mb-3">
            <Form.Control className='form-control' placeholder='Update email' type="email"   value={editEmailId} 
              onChange={(e) => seteditEmailId(e.target.value)}  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"  required/>
            </Form.Group>
            <Form.Group className="mb-3">
            <Form.Control type="text"  placeholder="Update Username" value={editUsername} onChange={(e) => seteditUsername(e.target.value)} required/>
            </Form.Group>
            <Form.Group className="mb-3">
            <Form.Control className='form-control' type="tel"  placeholder="Update Mobilenumber" onChange={(e) => seteditContactNumber(e.target.value)}
              pattern="^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$" title="invalid mobile" value={editContactNumber} required/>
            </Form.Group>
            <Form.Group className="mb-3">
      <div className="input-group">
        <Form.Control
          className="form-control"
          type={showPassword ? 'text' : 'password'}
          onChange={(e) => seteditPassword(e.target.value)}
          value={editPassword}
          placeholder=" Update Password"
          required
        />
        <div className="input-group-append">
          <Button
            variant="outline-secondary"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? <EyeSlash /> : <Eye />}
          </Button>
        </div>
      </div>
    </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="info"  onClick={() => handleUpdate()} >Update</Button>
        </Modal.Footer>
      </Modal>
    </>
    <>
      <Modal
        show={show1}
        onHide={handleClose1}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={AddUser} >
        <Form.Group className="mb-3">
            <Form.Control
        className="form-control"
        type="text"
        placeholder='type - "user"'
        onChange={(e) => handleUserChange(e.target.value)}
        required
        />
            </Form.Group>
            <Form.Group className="mb-3">
            <Form.Control className='form-control' placeholder='email' type="email"
              onChange={(e) => handleEmailChange(e.target.value)}  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"  required/>
            </Form.Group>
            <Form.Group className="mb-3">
            <Form.Control type="text"  placeholder="Username" onChange={(e) => handleUsernameChange(e.target.value)} required/>
            </Form.Group>
            <Form.Group className="mb-3">
            <Form.Control className='form-control' type="tel"  placeholder="Mobilenumber" onChange={(e) => handleMobileChange(e.target.value)}
              pattern="^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$" title="invalid mobile" required/>
            </Form.Group>
            <Form.Group className="mb-3">
      <div className="input-group">
        <Form.Control
          className="form-control"
          type={showPassword ? 'text' : 'password'}
          onChange={(e) => handlePasswordChange(e.target.value)}
          placeholder="Password"
          required
        />
        <div className="input-group-append">
          <Button
            variant="outline-secondary"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? <EyeSlash /> : <Eye />}
          </Button>
        </div>
      </div>
    </Form.Group>
    <Button type = 'submit' variant="info">Add User</Button>
    </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button  variant="secondary" onClick={handleClose1}>
            Close
          </Button>
       
        </Modal.Footer>
      </Modal>
    </>
    </Box></Box></Box>
    </div>  
  );
}
export default Customers;