import React, { useState, useEffect } from 'react';
import AddCenter from '../components/addCenter';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { PencilSquare } from 'react-bootstrap-icons';
import { Form, Button } from 'react-bootstrap';
import {  MDBCol } from 'mdbreact';
import Modal from 'react-bootstrap/Modal';
import { Eye, EyeSlash } from 'react-bootstrap-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Customers() {
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

  let navigate = useNavigate();

  



  const getData = () =>{
    axios
    .get('https://8080-cddafbcbabccadefcdadfcefbadbddebabfddbdad.project.examly.io/api/User/getAllUsers')
    .then((result) => {
      setData(result.data);
    })
    .catch((error) => {
      console.error(error);
    });
  }
  useEffect(() => {
   

    const email = localStorage.getItem('email');
    axios
    .get('https://8080-cddafbcbabccadefcdadfcefbadbddebabfddbdad.project.examly.io/api/User/getAllUsers')
    .then((result) => {
      setData(result.data);
    })
    .catch((error) => {
      console.error(error);
    });
    axios
      .get(`https://8080-cddafbcbabccadefcdadfcefbadbddebabfddbdad.project.examly.io/api/Auth/getUserByEmailId/?email=${email}`)
      .then((result) => {
        if (result.data.userRole === 'user') {
          localStorage.removeItem('email');
          navigate('/');
        }
      })
      .catch((error) => {});
  }, []);

  useEffect(() => {
    const filteredData = data.filter((item) =>
      item.username.toLowerCase().includes(searchInput.toLowerCase())
    );
    setSuggestions(filteredData);
  }, [searchInput, data]);


  const handleEdit = (ID) => {
    setEditedId(ID)
    axios.get(`https://8080-cddafbcbabccadefcdadfcefbadbddebabfddbdad.project.examly.io/api/User/getUser/${ID}`)
    .then((result)=>{
      seteditUserrole(result.data.userRole)
      seteditUsername(result.data.username)
      seteditEmailId(result.data.email)
      seteditContactNumber(result.data.mobileNumber)
      seteditPassword(result.data.password)
    })
    handleShow();
  };

  const handleUpdate = () =>{
    const data = {
      email : editEmailId,
      password : editPassword,
      username : editUsername,
      mobileNumber : editContactNumber,
      userRole : editUserrole
    }
    axios.put(`https://8080-cddafbcbabccadefcdadfcefbadbddebabfddbdad.project.examly.io/api/User/editUsersById/${editedId}`, data)
    .then((result)=>{
      setShow(false)
      getData();
      toast.success("User details updated successfully!")
    })
  }

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

const handleDelete = () => {
  const checkedIds = suggestions
  .filter((item) => item.isChecked && item.userId != null)
  .map((item) => item.userId
  
  
  );

axios
  .delete('https://8080-cddafbcbabccadefcdadfcefbadbddebabfddbdad.project.examly.io/api/User/deleteUsers', { data: checkedIds })
  .then((response) => {
    toast.info("Users Deleted!")
    getData();
  })
  .catch((error) => {
    console.error('Error deleting records:', error);
  }); 
}



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


const AddUser = () =>{

  const data1 = {
    email : editEmailId,
    password : editPassword,
    username : editUsername,
    mobileNumber: editContactNumber,
    userRole : editUserrole
  }
  axios.post('https://8080-cddafbcbabccadefcdadfcefbadbddebabfddbdad.project.examly.io/api/User/addUser', data1)
  .then((result)=>{
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
const pageSize = 10; // Number of records to display per page
const isDeleteButtonDisabled = suggestions.length === 0 || suggestions.every((item) => !item.isChecked);

// Calculate the start and end indices for the current page
const startIndex = (currentPage - 1) * pageSize;
const endIndex = startIndex + pageSize;
  return (
    <div>
      <AddCenter />
      <ToastContainer/>

      <br />
      <div>
      <div style={{ display: 'flex', alignItems: 'center' }}>&nbsp;&nbsp;
      <button
      type="button"
      className="btn btn-danger"
      onClick={handleDelete}
      disabled={isDeleteButtonDisabled}
    >Delete Users
    </button>
  &nbsp;
  <button type="button" className="btn btn-success" onClick={Add}>
    Add User
  </button>
  &nbsp; &nbsp; &nbsp;
  <MDBCol md="6">
    <Form.Control
      type="text"
      placeholder="Type username to Search"
      value={searchInput}
      onChange={(e) => setSearchInput(e.target.value)}
    />
  </MDBCol>
 
</div><br/> <br/>
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
                <tr key={index}>
                  <th> <Form.Check type='checkbox' value={item.userId} checked={item.isChecked||false} onChange= {handleCheckBox} /> </th>
                  <td>{serialNumber}</td>
                  <td>{item.username}</td>
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
        <p>No Users....</p>
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
            <Form.Control className='form-control' placeholder='Update email' type="email" id="email"  value={editEmailId} 
              onChange={(e) => seteditEmailId(e.target.value)}  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"  required/>
            </Form.Group>
            <Form.Group className="mb-3">
            <Form.Control type="text" id="username" placeholder="Update Username" value={editUsername} onChange={(e) => seteditUsername(e.target.value)} required/>
            </Form.Group>
            <Form.Group className="mb-3">
            <Form.Control className='form-control' type="tel" id="mobileNumber" placeholder="Update Mobilenumber" onChange={(e) => seteditContactNumber(e.target.value)}
              pattern="^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$" title="invalid mobile" value={editContactNumber} required/>
            </Form.Group>
            <Form.Group className="mb-3">
      <div className="input-group">
        <Form.Control
          className="form-control"
          type={showPassword ? 'text' : 'password'}
          id="password"
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
        <Form.Group className="mb-3">
            <Form.Control
        className="form-control"
        type="text"
        data-testid="admin/user"
        placeholder='type - "user"'
        onChange={(e) => handleUserChange(e.target.value)}
        />
            </Form.Group>
            <Form.Group className="mb-3">
            <Form.Control className='form-control' placeholder='email' type="email" id="email" 
              onChange={(e) => handleEmailChange(e.target.value)}  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"  required/>
            </Form.Group>
            <Form.Group className="mb-3">
            <Form.Control type="text" id="username" placeholder="Username" onChange={(e) => handleUsernameChange(e.target.value)} required/>
            </Form.Group>
            <Form.Group className="mb-3">
            <Form.Control className='form-control' type="tel" id="mobileNumber" placeholder="Mobilenumber" onChange={(e) => handleMobileChange(e.target.value)}
              pattern="^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$" title="invalid mobile" required/>
            </Form.Group>
            <Form.Group className="mb-3">
      <div className="input-group">
        <Form.Control
          className="form-control"
          type={showPassword ? 'text' : 'password'}
          id="password"
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
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose1}>
            Close
          </Button>
          <Button variant="info" onClick={()=> AddUser()}>Add User</Button>
        </Modal.Footer>
      </Modal>
    </>




    </div>
  );
}

export default Customers;
