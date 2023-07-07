import React, { Fragment, useState, useEffect } from 'react'
import { PencilSquare, Trash, FileText,Download } from 'react-bootstrap-icons';
import { Form, Button, Row, Col, Table } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { jsPDF } from 'jspdf';
import { useNavigate } from 'react-router-dom';
import {Box} from '@mui/material';
import Swal from 'sweetalert2';
import '../../Styling/LoadingScreen.css';
import { GridLoader } from 'react-spinners';
import Usersidebar from '../../Navbar/Usersidebar';
import Usertopbar from '../../Navbar/Usertopbar';
import Review from '../Review/Review';
import { API_URLS } from '../../Apis/config.js';

function Booking() {

  const[userPage] = useState('Appointments')

  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);

  const [smShow, setSmShow] = useState(false);

  const [CameraName, setCameraName] = useState('')
  const [ModelNumber, setModelNumber] = useState('')
  const [ContactNumber, setContactNumber] = useState('')
  const [DateofAppointment, setDateofAppointment] = useState('')
  const [BookedSlot, SetBookedSlot] = useState('')

  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [itemsPerPage] = useState(10);

  const [editProductName, seteditProductName] = useState('')
  const [editProductModelNo, seteditProductModelNo] = useState('')
  const [editdateofPurchase, seteditdateofPurchase] = useState('')
  const [editcontactNumber, seteditcontactNumber] = useState('')
  const [editproblemDescription, seteditproblemDescription] = useState('')
  const [editdateOfAppointment, seteditdateOfAppointment] = useState('')
  const [editbookedSlots, seteditbookedSlots] = useState('')
  const [editserviceCenterID, setEditserviceCenterID] = useState('')

  const[username, setUsername] = useState("")
  const[email, setEmail] = useState("")
  const[contactNumber, setcontactNumber] = useState("")
  const[service, setservice] = useState("")
  const[prodname, setprodname] = useState("")
  const[dateofAppointment, setdateofAppointment] = useState("")
  const[bookedSlot, setbookedSlot] = useState("")
  const[basicservicecost, setbasicservicecost] = useState("")

  const today = new Date();
  const fiveDaysLater = new Date();
  fiveDaysLater.setDate(today.getDate() + 4);

  const [serviceCenterId, setServiceCenterId] = useState('')
  const [deletedID, setDeletedID] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  let navigate = useNavigate();

/* The above code is a React useEffect hook that is executed when the component is mounted or when the
dependencies (navigate and userPage) change. */
  useEffect(() => {
    const email = localStorage.getItem("email")
    const username = localStorage.getItem("username")
    localStorage.setItem('userPage', userPage)
    setUsername(username)
    setEmail(email)
    getData(email);
    axios.get(`${API_URLS.getAdminByEmailId}/?email=${email}`)
    .then((result)=>{
      if(result.data.userRole==="admin"){
        localStorage.removeItem("email");
        navigate("/")
      }
    }).catch((error)=>{
      toast.error(error)
    })
  }, [navigate, userPage])

  /**
   * The `getData` function retrieves appointment data based on an email address and filters the
   * results based on the current date and time.
   */
  const getData = (email) => {
    axios.get(`${API_URLS.getAppointmentByMailId}?email=${email}`)
      .then((result) => {
        const currentDate = new Date().toLocaleDateString('en-GB');
        const month=new Date().getMonth() +1;
        const year=new Date().getFullYear();
        const currentTime = new Date().toLocaleTimeString('en-GB', {hour: '2-digit', minute: '2-digit'});
        const filteredBookings = result.data.filter(booking => {
          const [startTime, endTime] = booking.bookedSlots.split(' - ');
          startTime.split(':');
          const [hours, minutes] = endTime.split(':');
          const appointmentEndTime = new Date();
          appointmentEndTime.setHours(hours);
          appointmentEndTime.setMinutes(minutes);
          const formattedEndTime = new Date(appointmentEndTime).toLocaleTimeString('en-GB', {hour: '2-digit', minute: '2-digit'});
          const monthOfDateOfAppointment= new Date(booking.dateOfAppointment).getMonth()+1;
          const yearOfDateOfAppointment = new Date(booking.dateOfAppointment).getFullYear();
          const formattedDateOfAppointment = new Date(booking.dateOfAppointment).toLocaleDateString('en-GB');
          return (
            (yearOfDateOfAppointment>year)|| (monthOfDateOfAppointment>month)|| formattedDateOfAppointment > currentDate || (formattedDateOfAppointment === currentDate && formattedEndTime > currentTime)
          );
        });
        setData(filteredBookings)      
      })
      .catch((error) => {
        toast.error(error)
      })
  };

  const [editedId, setEditedId] = useState('')
  
  /**
   * The handleEdit function retrieves appointment slot data by ID and sets the corresponding state
   * variables before showing the edit form.
   */
  const handleEdit = (ID) => {
    setEditedId(ID);  
    axios.get(`${API_URLS.getAppointmentSlotsById}/${ID}`)
      .then((result) => {        
        seteditProductName(result.data.productName);
        seteditProductModelNo(result.data.productModelNo);
        seteditdateofPurchase(result.data.dateofPurchase);
        seteditdateofPurchase(result.data.dateofPurchase);
        seteditcontactNumber(result.data.contactNumber);
        seteditproblemDescription(result.data.problemDescription);
        seteditdateOfAppointment(result.data.dateOfAppointment);
        seteditbookedSlots(result.data.bookedSlots);
        setEditserviceCenterID(result.data.serviceCenterId);
        handleShow();
      }).catch((error) => {
        toast.error(error)
      })
  }

  const [editAvailableSlots, seteditAvailableSlots] =useState([]);

  /**
   * The function `handleDateChange` takes a date as input, formats it, sets the
   * `editdateOfAppointment` state variable, and makes an API call to retrieve available slots for that
   * date.
   */
  function handleDateChange(date) {
    const formattedDate= moment(date).format('YYYY-MM-DD');
    seteditdateOfAppointment(formattedDate );
    const data3 = {
      serviceCenterId: editserviceCenterID,
      appointmentDate: formattedDate,
    };
    axios.get(`${API_URLS.getSlotDetailsByDate}/${editserviceCenterID},${formattedDate}`, data3).then((result) => {
      const availableSlots = result.data[0].availableSlots;
      if(availableSlots) {
      //const filteredSlots = availableSlots.filter(slot => slot.date !== formattedDate);
      seteditAvailableSlots(availableSlots);
      } else {
      }
    })
    .catch((error) => {
      toast.error(error)
    })
  }

  const handleUpdate = () => {
    setIsLoading(true);
  const data1 = {
  productName: editProductName,
  productModelNo: editProductModelNo,
  dateofPurchase: editdateofPurchase,
  contactNumber: editcontactNumber,
  problemDescription: editproblemDescription,
  dateOfAppointment: editdateOfAppointment,
  bookedSlots: editbookedSlots,
};


/**
 * This code snippet handles the logic for updating and deleting appointments based on certain
 * conditions.
 */
axios.get(`${API_URLS.getAppointmentSlotsById}/${editedId}`)
.then((result) => {
  if(result.data.dateOfAppointment===editdateOfAppointment){
    if(result.data.bookedSlots===editbookedSlots){
      axios
      .put(`${API_URLS.editAppointment}/${editedId}`, data1)
      .then((result) => {
        setIsLoading(false);
        setShow(false)
        toast.dark("Changes made successfully!")
        getData(email);
      })
    }
     
  }else{
    const data2 = {
      serviceCenterId: result.data.serviceCenterId,
      Appointmentdate: result.data.dateOfAppointment,
      availableSlots: [result.data.bookedSlots],
    };
    axios.post(API_URLS.updateOnDeleteAppointment, data2)
    .then((result) => {    
    const filteredSlots = editAvailableSlots.filter((slot) => slot !== editbookedSlots);
    const SlotData = {
      serviceCenterId: editserviceCenterID,
      Appointmentdate: editdateOfAppointment,
      availableSlots: filteredSlots,
    };
          axios.post(API_URLS.postAvailableSlots, SlotData)
            .then((result) => {
              axios
              .put(`${API_URLS.editAppointment}/${editedId}`, data1)
              .then((result) => {
                setIsLoading(false);
                Swal.fire({
                  icon: 'success',
                  title: 'Appointment Updated Successfully',
                  text: 'Your appointment has been successfully Updated. A confirmation mail has been sent to your registered mail ID, with all the updated details. Please check your email.',
                });
                getData(email);
                setShow(false)
              })
            }).catch((error) => {
            })
          })
  }
})

  };

  /**
   * The handleDelete function sets the deletedID state, makes an API call to get appointment slot
   * details by ID, and sets various states based on the API response.
   */
  const handleDelete = (ID) => { 
    setDeletedID(ID);
    axios.get(`${API_URLS.getAppointmentSlotsById}/${ID}`)
      .then((result) => {
        setCameraName(result.data.productName);
        setModelNumber(result.data.productModelNo);
        setContactNumber(result.data.contactNumber);
        setDateofAppointment(result.data.dateOfAppointment);
        SetBookedSlot(result.data.bookedSlots);
        setServiceCenterId(result.data.serviceCenterId);
      }).catch((error) => {
       
      })
    handleShow1();
  };

 /**
  * The above code defines a function `DownloadPDF` that generates a PDF document with specific content
  * and saves it with the name "service_bill.pdf".
  */
  const handleDownload = (ID) => {
    axios.get(`${API_URLS.getAppointmentSlotsById}/${ID}`)
    .then((result)=>{
      setcontactNumber(result.data.contactNumber)
      setservice(result.data.serviceCenterName)
      setprodname(result.data.productName)
      const rawDate = result.data.dateOfAppointment;
      const appointmentDate = new Date(rawDate);
      const day = appointmentDate.getDate();
      const month = appointmentDate.getMonth() + 1;
      const year = appointmentDate.getFullYear();
      const formattedDate = `${day < 10 ? '0' + day : day}-${month < 10 ? '0' + month : month}-${year}`;
  setdateofAppointment(formattedDate);
      setbookedSlot(result.data.bookedSlots)
      setbasicservicecost(result.data.serviceCost.toString())
      setSmShow(true)
    })
}

const DownloadPDF = () =>{
  setSmShow(false)
  const doc = new jsPDF();

  const borderWidth = 1;
  const borderColor = '#000';
  const headingFontSize = 24;
  const headingFontStyle = 'bold';
  const headingTextColor = '#007bff';
  
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  
  const x = borderWidth;
  const y = borderWidth;
  const width = pageWidth - borderWidth * 2;
  const height = pageHeight - borderWidth * 2;
  
  doc.setLineWidth(borderWidth);
  doc.setDrawColor(borderColor);
  doc.rect(x, y, width, height);
  
  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();
  const formattedDate = `${day < 10 ? '0' + day : day}-${month < 10 ? '0' + month : month}-${year}`;
  
  doc.setFont('Helvetica', 'normal');
  doc.setFontSize(14);
  doc.text(`Date: ${formattedDate}`, 10, 50);
  
  const currentTime = new Date().toLocaleTimeString();
  
  doc.setFont('Helvetica', 'normal');
  doc.setFontSize(14);
  
  const timeTextWidth = doc.getStringUnitWidth(`Time: ${currentTime}`) * doc.internal.getFontSize();
  const timeX = pageWidth - timeTextWidth - 10;
  const timeY = 50;
  doc.text(`Time: ${currentTime}`, timeX, timeY, { align: 'right' });
  
  doc.setFontSize(14);

const basicservicecostValue = parseInt(basicservicecost); 
const gstValue = 156; 
const totalValue = basicservicecostValue + gstValue; 
  
  const labels = [
    'Username',
    'Email',
    'Contact Number',
    'Service Name',
    'Camera Name',
    'Appointment Date',
    'Booked Slot',
    'Service Cost',
    'GST',
  ];
  const values = [
    username,
    email,
    contactNumber,
    service,
    prodname,
    dateofAppointment,
    bookedSlot,
    basicservicecostValue + '/-',
  gstValue + '/-',
  totalValue + '/-',
  ];
  
  const labelY = 70;
  const labelSpacing = 15;
  
  labels.forEach((label, index) => {
    const labelNumber = `${index + 1}.`;
    const labelX = 10;
    const labelText = `${labelNumber} ${label}:`;
    doc.text(labelText, labelX, labelY + index * labelSpacing);
  
    const valueX = 60;
    const valueText = values[index] || '';
    doc.text(valueText, valueX, labelY + index * labelSpacing);
  
   
  });

  doc.setFontSize(headingFontSize);
  doc.setFont(undefined, headingFontStyle);
  doc.setTextColor(headingTextColor);
  doc.text('KRAFTCAM Services', pageWidth / 2, y + headingFontSize + 10, { align: 'center' });
  
  const lineY = y + headingFontSize + 15;
  
  doc.line(50, lineY, pageWidth - 50, lineY);
  
  const totalLabelX = 10;
const totalLabelText = 'Total:';
const totalValueX = 60;
const totalValueText = values[values.length - 1];

const noteText = 'Note: Additional charges may apply based on your product.'; 

doc.text(totalLabelText, totalLabelX, labelY + labels.length * labelSpacing);
doc.text(totalValueText, totalValueX, labelY + labels.length * labelSpacing);
const noteX = totalValueX;
const noteY = labelY + (labels.length + 1) * labelSpacing; 

doc.setFontSize(12); 
doc.text(noteText, noteX, noteY); 

doc.setLineWidth(0.5);
doc.line(noteX, noteY + 1, noteX + doc.getTextWidth(noteText), noteY + 1); 


const footerText = 'Dear Customer: ';
const footerContent = 'Thank you for choosing to use our services! We appreciate your trust and confidence in our company. At Kraftcam, we strive to provide the best solutions tailored to your needs. We take pride in offering a diverse range of services that cater to various requirements, all conveniently accessible on our website';
const footerX = 10;
const footerY = pageHeight - 30;
const footerWidth = pageWidth - 20;

doc.setFontSize(14); 
doc.setTextColor(0, 0, 0); 
doc.setFont('italic');
doc.text(footerText, footerX, footerY);
doc.setFontSize(12);
doc.setFont('normal');
doc.text(footerContent, footerX, footerY + 10, { maxWidth: footerWidth });
doc.save('service_bill.pdf');

}
  
  
const handleCancelAppointment = () => {
  if (deletedID) {
    Swal.fire({
      title: 'Confirm Cancellation',
      text: 'Are you sure you want to cancel the appointment?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Cancel Appointment',
      cancelButtonText: 'No, Keep Appointment',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        const data = {
          serviceCenterId: serviceCenterId,
          Appointmentdate: DateofAppointment,
          availableSlots: [BookedSlot],
        };

        axios.post(API_URLS.updateOnDeleteAppointment, data)
          .then((result) => {
            axios.delete(`${API_URLS.cancelAppointment}/${deletedID}`)
              .then((result) => {
                handleClose1();
                toast.warning('Appointment Cancelled!');
                const email = localStorage.getItem('email');
                getData(email);
              })
              .catch((error) => {
            
              });
          })
          .catch((error) => {
        
          });
      }
    });
  }
};
  const [statusFilter, setStatusFilter] = useState('inProgress');
  const [text, setText] = useState("Inprogress Bookings");

/**
 * The function `handleStatusFilterChange` updates the status filter and changes the text based on the
 * selected option.
 */
  const handleStatusFilterChange = (e) => {
    const selectedOption = e.target.value;
    setStatusFilter(selectedOption);

    if(selectedOption === 'inProgress') {
      setText('In Progress Bookings');
    } else {
      setText('Completed Services');
    }
  }

  const handleNextPage = () => {
    setPageNumber(pageNumber + 1);
  };

  const handlePreviousPage = () => {
    setPageNumber(pageNumber - 1);
  };
  const indexOfLastItem = pageNumber * itemsPerPage;

 /* The above code is a React component that renders a user interface for a service appointment
 management system. It includes a top bar, a side bar, and a main content area. The main content
 area displays a table of service appointments, with options to filter by status and perform actions
 such as editing, deleting, and downloading. It also includes modals for updating appointments and
 confirming cancellations. */
  return (
    <div>
  <Box sx={{ display: "flex" ,flexDirection:"column", background: "linear-gradient(to bottom, rgba(7, 150, 238, 0.947), rgb(246, 246, 246))" }}>
    <Box sx={{
       display: "flex",
       minHeight: "80px" ,
       width:"100%",
       position:"fixed"
     }}> <Usertopbar/> </Box>
  
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
     }}><Usersidebar/>
     </Box>

     <Box sx={{
       display:"flex",
       width:"100%",
       minHeight: "100%",
       flexDirection:"column"
       
         }}>
      <Fragment>
        <div style={{marginTop: '10px', marginBottom: '10px'}}>
        <Row>
        <Col xs={6} md={6} lg={6} className='text-start' >
          <Form.Label style={{fontSize: '17px', fontColor: 'black', fontWeight: 'bold', marginLeft: '10px'}}>{text}</Form.Label>
        </Col>
        <Col xs={6} md={6} lg={6} className='text-end'>
        <Form.Select
          aria-label="Select service status"
          value={statusFilter}
          onChange={handleStatusFilterChange}
          style={{width: '180px'}}
        >
          <option value="inProgress">In Progress</option>
          <option value="completed">Completed</option>
        </Form.Select>
        </Col>
        </Row>
        </div>
        {statusFilter === 'inProgress' && (
  <>
   {isLoading && (
        <div className="loading-screen">
          <div className="loading-popup">
            <div className="loading-content">
              <div style={{ fontFamily: 'Times New Roman', fontWeight: 'bold', fontSize: '1.2em' }}>
                Please wait while we're updating your Appointment Slot...
              </div>&nbsp;&nbsp;
              <GridLoader color="orange" loading={true} size={10} />
            </div>
          </div>
        </div>
      )}


      <div className={isLoading ? "blur-background" : ""}></div>
      <Table id='centerName1' bordered hover>
        <thead>
          <tr>
            <th scope="col">S.No</th>
            <th scope="col">Name</th>
            <th scope="col">Date</th>
            <th scope="col">Timing</th>
            <th scope="col" data-testid='cancelBooking'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            const serialNumber = index + 1 + (pageNumber - 1) * itemsPerPage;
            return (
              <tr key={index}>
                <td>{serialNumber}</td>
                <td id='centerName1'>{item.serviceCenterName}</td>
                <td>{new Date(item.dateOfAppointment).toLocaleDateString('en-GB')}</td>
                <td>{item.bookedSlots}</td>
                <td colSpan={2}>
                  <div className="text-right">
                    <Button variant="link" onClick={() => handleEdit(item.id)}>
                      <PencilSquare size={24} />
                    </Button>
                    <Button variant="link" onClick={() => handleDelete(item.id)}>
                      <Trash size={24} />
                    </Button>
                    <Button variant="link" onClick={() => handleDownload(item.id)}>
                      <FileText size={24} /> <Download size={12} />
                    </Button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>

    {data.length > itemsPerPage && (
      <div>
        <Button onClick={handlePreviousPage} disabled={pageNumber === 1}>Previous</Button>
        <Button onClick={handleNextPage} disabled={indexOfLastItem >= data.length}>Next</Button>
      </div>
    )}
  </>
)}

        {statusFilter==='completed' && (
          < Review />
        )}
        

        <Modal show={show} onHide={handleClose}>
          <Modal.Header className='d-flex justify-content-center' closeButton>
            <Modal.Title className='text-center w-100'>Update Appointment</Modal.Title>
          </Modal.Header>
          <Modal.Body >
            <Form className="my-form text-start">
              <Form.Group className="mb-4">
                <Form.Text style={{ fontSize: '16px' }}> Update Product Name </Form.Text>
                <Form.Control className='form-control' type="text" id="enterProductName" placeholder="Enter the name of the product" value={editProductName} onChange={(e) => seteditProductName(e.target.value)} required />
              </Form.Group>
              <Form.Group className="mb-4">
                <Form.Text style={{ fontSize: '16px' }}> Update Product Model Number </Form.Text>
                <Form.Control className='form-control' type="text" id="enterModelNo" placeholder="Enter the model no of the product" value={editProductModelNo} onChange={(e) => seteditProductModelNo(e.target.value)} required />
              </Form.Group>
              <Form.Group className="mb-4">
                <Form.Text style={{ fontSize: '16px' }}> Update Date of purchase </Form.Text>
                <DatePicker
                  className='form-control'
                  dateFormat="dd/MM/yyyy"
                  id="enterDateOfPurchase"
                  placeholderText="Enter the date of purchase"
                  selected={moment(editdateofPurchase).toDate()}
                  maxDate = {new Date()}
                  onChange={(date) => {
                    const utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())); 
                    seteditdateofPurchase(utcDate);
                  }}
                  showYearDropdown
                  showMonthDropdown
                  dropdownMode="select"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-4">
                <Form.Text style={{ fontSize: '16px' }}> Update Contact Number </Form.Text>
                <Form.Control className='form-control' type="text" id="enterContactNumber" placeholder="Enter the contact number" value={editcontactNumber} onChange={(e) => seteditcontactNumber(e.target.value)} required />
              </Form.Group>
              <Form.Group className="mb-4">
                <Form.Text style={{ fontSize: '16px' }}> Update Problem Description </Form.Text>
                <Form.Control className='form-control' as="textarea" rows={3} id="enterProblem" placeholder="Enter the problem of the product" value={editproblemDescription} onChange={(e) => seteditproblemDescription(e.target.value)} required />
              </Form.Group>
              <Form.Group className="mb-4">
                <Form.Text style={{ fontSize: '16px' }}> Update Appointment date </Form.Text>
                <DatePicker
                  className='form-control'
                  dateFormat="dd/MM/yyyy"
                  selected={moment(editdateOfAppointment).toDate()}
                  minDate={today}
                  maxDate={fiveDaysLater}
                  onChange={handleDateChange}
                />
              </Form.Group>
              <Form.Group className="mb-4">
                <Form.Text style={{ fontSize: '16px' }}> Update Slot </Form.Text>
                <Row>
                  <Col sm="8">
                    <Form.Control
                      className='mb-3'
                      style={{ width: '300px' }}
                      type="time"
                      as="select"
                      value={editbookedSlots}
                      onChange={(e) => seteditbookedSlots(e.target.value)}
                    >
                     <option>booked slot {editbookedSlots}</option>

                     
                                  {editAvailableSlots.map((slot, index) => {
                                    const currentTime = moment().format('h:mm A');
                                    const isToday = moment(editdateOfAppointment).isSame(moment(), 'day');
                                    if (!isToday || moment(slot, 'h:mm A').isAfter(moment(currentTime, 'h:mm A'))) {
                                      return (
                                        <option key={index} value={slot}>
                                          {slot}
                                        </option>
                                      );
                                    }
                                    return null;
                                  })}
                                
                    </Form.Control>
                  </Col>

                </Row>
                <Col sm="4">
                  <Button id="bookButton" onClick={handleUpdate}>Update</Button>
                </Col>
              </Form.Group>
            </Form>

          </Modal.Body></Modal>
        <>

          <ToastContainer />

          <Modal
            show={show1}
            onHide={handleClose1}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>Confrim Cancellation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form className="my-form text-start">
                <Form.Group className="mb-4">
                  <Form.Text style={{ fontSize: '20px' }}> Camera Name : </Form.Text>
                  <Form.Text style={{ fontSize: '20px' }} onChange={(e) => setCameraName(e.target.value)}>{CameraName}</Form.Text>
                </Form.Group>
                <Form.Group className="mb-4">
                  <Form.Text style={{ fontSize: '20px' }}> Model Number : </Form.Text>
                  <Form.Text style={{ fontSize: '20px' }} onChange={(e) => setModelNumber(e.target.value)}>{ModelNumber}</Form.Text>
                </Form.Group>
                <Form.Group className="mb-4">
                  <Form.Text style={{ fontSize: '20px' }}> Contact Number : </Form.Text>
                  <Form.Text style={{ fontSize: '20px' }} onChange={(e) => setContactNumber(e.target.value)}>{ContactNumber}</Form.Text>
                </Form.Group>
                <Form.Group className="mb-4">
                  <Form.Text style={{ fontSize: '20px' }}> Appointment Date : </Form.Text>
                  <Form.Text style={{ fontSize: '20px' }} onChange={(e) => setDateofAppointment(e.target.value)}>
                    {new Date(DateofAppointment).toLocaleDateString('en-GB')}
                  </Form.Text>
                </Form.Group>
                <Form.Group className="mb-4">
                  <Form.Text style={{ fontSize: '20px' }}> Booked Slot : </Form.Text>
                  <Form.Text style={{ fontSize: '20px' }} onChange={(e) => SetBookedSlot(e.target.value)}>{BookedSlot}</Form.Text>
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose1}>
                Close
              </Button>
              {deletedID && (
                <Button variant="primary" onClick={handleCancelAppointment}>Cancel Appointment</Button>
              )}
            </Modal.Footer>
          </Modal>
        </>
        <>
      <Modal
        size="sm"
        show={smShow}
        onHide={() => setSmShow(false)}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">
            Download Bill PDF
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form.Text style={{ fontSize: '15px' }}> A Bill PDF of your service  will be downloaded in to your Device! Click Downlaod Bill for your bill information.</Form.Text>
        
        </Modal.Body>
        <Modal.Footer>
              <Button variant="info" onClick={DownloadPDF}>
                Download Bill
              </Button>
              </Modal.Footer>
 
      </Modal>
      </>
      </Fragment>
     </Box></Box></Box>
    </div>

  )
}
export default Booking;