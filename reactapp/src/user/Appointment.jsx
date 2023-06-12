import React, { Fragment, useState, useEffect } from 'react'
import Home from '../components/Home';
import { PencilSquare, Trash, FileText,Download } from 'react-bootstrap-icons';
import { Form, Button, Row, Col } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { jsPDF } from 'jspdf';
import { useNavigate } from 'react-router-dom';


function MyBookings() {


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






  let navigate = useNavigate();
  useEffect(() => {
    const email = localStorage.getItem("email")
    const username = localStorage.getItem("username")
    setUsername(username)
    setEmail(email)
    getData(email);
    axios.get(`https://8080-cddafbcbabccadefcdadfcefbadbddebabfddbdad.project.examly.io/api/Auth/getAdminByEmailId/?email=${email}`)
    .then((result)=>{
      // setUserName(result.data.username)
      // setUserRole(result.data.userRole)
      if(result.data.userRole==="admin"){
        localStorage.removeItem("email");
        navigate("/")
      }
    }).catch((error)=>{

    })


  }, [])





  const [editedId, setEditedId] = useState('')
  
  const handleEdit = (ID) => {
    setEditedId(ID);
  
    axios.get(`https://8080-cddafbcbabccadefcdadfcefbadbddebabfddbdad.project.examly.io/api/Appointment/getAppointmentSlotsById/${ID}`)
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
        alert(error)
      })

  }
const getData = (email) => {
    axios.get(`https://8080-cddafbcbabccadefcdadfcefbadbddebabfddbdad.project.examly.io/api/Appointment/getAppointment/?email=${email}`)
      .then((result) => {
        const currentDate = new Date().toLocaleDateString('en-GB');
        const currentTime = new Date().toLocaleTimeString('en-GB', {hour: '2-digit', minute: '2-digit'});
        //console.log(currentTime);
      
        const filteredBookings = result.data.filter(booking => {
          const [startTime, endTime] = booking.bookedSlots.split(' - ');
          //console.log(endTime);
          const [hours, minutes] = endTime.split(':');
          const appointmentEndTime = new Date();
          appointmentEndTime.setHours(hours);
          appointmentEndTime.setMinutes(minutes);
          const formattedEndTime = new Date(appointmentEndTime).toLocaleTimeString('en-GB', {hour: '2-digit', minute: '2-digit'});
          const formattedDateOfAppointment = new Date(booking.dateOfAppointment).toLocaleDateString('en-GB');
          return (
            formattedDateOfAppointment > currentDate || (formattedDateOfAppointment === currentDate && formattedEndTime > currentTime)
          );
        });
        console.log(filteredBookings);
        setData(filteredBookings)
        //console.log(result.data)
      })
      .catch((error) => {
        alert(error)
      })
  };

  const [editAvailableSlots, seteditAvailableSlots] =useState([]);

  function handleDateChange(date) {
   // const utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    //seteditdateOfAppointment(utcDate);
    //const formattedDate = utcDate.toISOString().split('T')[0];
    const formattedDate= moment(date).format('YYYY-MM-DD');

    seteditdateOfAppointment(formattedDate );
    const data3 = {
      serviceCenterId: editserviceCenterID,
      appointmentDate: formattedDate,
    };

    const url = `https://8080-cddafbcbabccadefcdadfcefbadbddebabfddbdad.project.examly.io/api/Appointment/getSlotDetailsByDate/${editserviceCenterID},${formattedDate}`;
    
    axios.get(url, data3).then((result) => {
      const availableSlots = result.data[0].availableSlots;
      if(availableSlots) {
      seteditAvailableSlots(availableSlots);
      } else {
        
      }
    })
    .catch((error) => {
      alert(error);
    })
  }
  const handleUpdate = (e) => {
    e.preventDefault();
const data1 = {
  productName: editProductName,
  productModelNo: editProductModelNo,
  dateofPurchase: editdateofPurchase,
  contactNumber: editcontactNumber,
  problemDescription: editproblemDescription,
  dateOfAppointment: editdateOfAppointment,
  bookedSlots: editbookedSlots,
};

axios.get(`https://8080-cddafbcbabccadefcdadfcefbadbddebabfddbdad.project.examly.io/api/Appointment/getAppointmentSlotsById/${editedId}`)
.then((result) => {
  if(result.data.dateOfAppointment==editdateOfAppointment){
    if(result.data.bookedSlots==editbookedSlots){
      axios
      .put(`https://8080-cddafbcbabccadefcdadfcefbadbddebabfddbdad.project.examly.io/api/Appointment/user/EditAppointment/${editedId}`, data1)
      .then((result) => {
        setShow(false)
        toast.dark("Changes made successfully!")
        getData(email);
      })
    }
  }else if(result.data.dateOfAppointment==editdateOfAppointment){
    if(result.data.bookedSlots!=editbookedSlots){
      e.preventDefault();
    const data2 = {
      serviceCenterId: result.data.serviceCenterId,
      Appointmentdate: result.data.dateOfAppointment,
      availableSlots: [result.data.bookedSlots],
    };
    axios.post('https://8080-cddafbcbabccadefcdadfcefbadbddebabfddbdad.project.examly.io/api/Appointment/updateOnDeleteAppointment', data2)
    .then((result) => {
           
    const filteredSlots = editAvailableSlots.filter((slot) => slot !== editbookedSlots);
    e.preventDefault();
    const SlotData = {
      serviceCenterId: editserviceCenterID,
      Appointmentdate: editdateOfAppointment,
      availableSlots: filteredSlots,
    };
    const url = 'https://8080-cddafbcbabccadefcdadfcefbadbddebabfddbdad.project.examly.io/api/Appointment/postAvailableSlots'
          axios.post(url, SlotData)
            .then((result) => {
              axios
              .put(`https://8080-cddafbcbabccadefcdadfcefbadbddebabfddbdad.project.examly.io/api/Appointment/user/EditAppointment/${editedId}`, data1)
              .then((result) => {
                toast.success("Appointment Updated successfully!")
                getData(email);
                setShow(false)
              })
            }).catch((error) => {
            })
          })
        }      
  }else{
    e.preventDefault();
    const data2 = {
      serviceCenterId: result.data.serviceCenterId,
      Appointmentdate: result.data.dateOfAppointment,
      availableSlots: [result.data.bookedSlots],
    };
    axios.post('https://8080-cddafbcbabccadefcdadfcefbadbddebabfddbdad.project.examly.io/api/Appointment/updateOnDeleteAppointment', data2)
    .then((result) => {    
    const filteredSlots = editAvailableSlots.filter((slot) => slot !== editbookedSlots);
    const SlotData = {
      serviceCenterId: editserviceCenterID,
      Appointmentdate: editdateOfAppointment,
      availableSlots: filteredSlots,
    };
    const url = 'https://8080-cddafbcbabccadefcdadfcefbadbddebabfddbdad.project.examly.io/api/Appointment/postAvailableSlots'
          axios.post(url, SlotData)
            .then((result) => {
              axios
              .put(`https://8080-cddafbcbabccadefcdadfcefbadbddebabfddbdad.project.examly.io/api/Appointment/user/EditAppointment/${editedId}`, data1)
              .then((result) => {
                toast.success("Appointment Updated successfully!")
                getData(email);
                setShow(false)
              })
            }).catch((error) => {
            })
          })
  }
})

  };
  const handleDelete = (ID) => { 
    setDeletedID(ID);
    axios.get(`https://8080-cddafbcbabccadefcdadfcefbadbddebabfddbdad.project.examly.io/api/Appointment/getAppointmentSlotsById/${ID}`)
      .then((result) => {
        setCameraName(result.data.productName);
        setModelNumber(result.data.productModelNo);
        setContactNumber(result.data.contactNumber);
        setDateofAppointment(result.data.dateOfAppointment);
        SetBookedSlot(result.data.bookedSlots);
        setServiceCenterId(result.data.serviceCenterId);
      }).catch((error) => {
        alert(error)
      })
    handleShow1();
  };

  const handleDownload = (ID) => {
    
    axios.get(`https://8080-cddafbcbabccadefcdadfcefbadbddebabfddbdad.project.examly.io/api/Appointment/getAppointmentSlotsById/${ID}`)
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
  
  // Display date on the left side in dd-mm-yyyy format
  doc.text(`Date: ${formattedDate}`, 10, 50);
  


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
  totalValue + '/-', // Replace with the actual GST value or calculation
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

const noteText = 'Note: Additional charges may apply based on your product.'; // New note text

doc.text(totalLabelText, totalLabelX, labelY + labels.length * labelSpacing);
doc.text(totalValueText, totalValueX, labelY + labels.length * labelSpacing);

// Calculate the position of the note based on the existing elements
const noteX = totalValueX;
const noteY = labelY + (labels.length + 1) * labelSpacing; // Increment the label count to make room for the note

doc.setFontSize(12); // Set a smaller font size for the note
doc.text(noteText, noteX, noteY); // Add the note text

doc.setLineWidth(0.5);
doc.line(noteX, noteY + 1, noteX + doc.getTextWidth(noteText), noteY + 1); // Underline the note


const footerText = 'Dear Customer: ';
const footerContent = 'Thank you for choosing to use our services! We appreciate your trust and confidence in our company. At Kraftcam, we strive to provide the best solutions tailored to your needs. We take pride in offering a diverse range of services that cater to various requirements, all conveniently accessible on our website';
const footerX = 10;
const footerY = pageHeight - 30;
const footerWidth = pageWidth - 20;

doc.setFontSize(14); // Increased the text size to 14
doc.setTextColor(0, 0, 0); // Set text color to black
doc.setFont('italic');
doc.text(footerText, footerX, footerY);
doc.setFontSize(12); // Reset the text size to 12
doc.setFont('normal');
doc.text(footerContent, footerX, footerY + 10, { maxWidth: footerWidth });
doc.save('service_bill.pdf');

}
  
  
  const handleCancelAppointment = () => {
    if (deletedID) {
      if (window.confirm("Are you sure you want to Cancel Appointment") === true) {

        const data = {
          serviceCenterId: serviceCenterId,
          Appointmentdate: DateofAppointment,
          availableSlots: [BookedSlot],
        };

        axios.post('https://8080-cddafbcbabccadefcdadfcefbadbddebabfddbdad.project.examly.io/api/Appointment/updateOnDeleteAppointment', data)
          .then((result) => {

            axios.delete(`https://8080-cddafbcbabccadefcdadfcefbadbddebabfddbdad.project.examly.io/api/Appointment/user/cancelappointment/${deletedID}`)
              .then((result) => {
                
                handleClose1();
                toast.warning("Appointment Cancelled!");
                const email = localStorage.getItem("email")

                getData(email);
                // setTimeout(() => {
                //   window.location.reload();
                // }, 1500);
              })
              .catch((error) => {
                alert(error);
              });
          })
          .catch((error) => {
            alert(error);
          });

      }
    }
  };
  // https://localhost:44303/api/user/updateOnDeleteAppointment {serviceCenterId, dateofAppointment, bookedSlots} {serviceCenterId, availableSlots, Appointmentdate } post request

  // https://localhost:44303/api/user/deleteAppointment{ID} delete request
  return (
    
    <div>
      <Home />
      <Fragment>

        {data && data.length > 0 ? (
          <table id='centerName1' className="table table-hover">
            <thead>
              <tr>
                <th scope="col">S.No</th>
                <th scope="col">Name</th>
                <th scope="col">Date</th>
                <th scope="col">Timing</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
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
                        <Button variant="link" onClick={() => handleDownload(item.id)}><FileText size={24} /> <Download size={12} /> </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <p>No bookings found....</p>
        )}

        <Modal show={show} onHide={handleClose}>
          <Modal.Header className='d-flex justify-content-center' closeButton>
            <Modal.Title className='text-center w-100'>Update Appointment</Modal.Title>
          </Modal.Header>
          <Modal.Body >
          <Form className="my-form text-start" onSubmit={handleUpdate}>
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
                <Form.Control className='form-control' type="text" id="enterContactNumber" placeholder="Enter the contact number" value={editcontactNumber} onChange={(e) => seteditcontactNumber(e.target.value)}
                pattern="^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$" title="Enter valid mobile number" required />
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
                  <Button type='submit' id="bookButton" >Update</Button>
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
    </div>

  )
}
export default MyBookings
   // Add camera icon
      // Convert SVG icons to PNG images
    // Convert SVG icons to PNG images using html2canvas
  // const cameraIconRef = React.createRef();
  // const servicesIconRef = React.createRef();

  // html2canvas(cameraIconRef.current).then((canvas) => {
  //   const cameraIconData = canvas.toDataURL('image/png');
  //   // Add camera icon
  //   doc.addImage(cameraIconData, 'PNG', 10, 10, 10, 10);

  //   html2canvas(servicesIconRef.current).then((canvas) => {
  //     const servicesIconData = canvas.toDataURL('image/png');
  //     // Add services icon
  //     doc.addImage(servicesIconData, 'PNG', doc.internal.pageSize.getWidth() - 20, 10, 10, 10);
  //   });
  // });

  //  // Set text color to blue
  //  doc.setTextColor(0, 0, 255);
    
  //     // Add "Kraftcam" text in bold
  //     doc.setFont('Helvetica', 'bold');
  //     doc.setFontSize(28);
  //     doc.text('KRAFTCAM SERVICES', doc.internal.pageSize.getWidth() / 2, 30, { align: 'center' });
    
  //     // Rest of your code...
    
   


  //     // Set text color to blue
  //     doc.setTextColor(0, 0, 255);
  
  //     // Add "Kraftcam" text in bold
  //     doc.setFont('Helvetica', 'bold');
  //     doc.setFontSize(28);
  //     doc.text('KRAFTCAM SERVICES', doc.internal.pageSize.getWidth() / 2, 30, { align: 'center' });
  
  //     // Set text color to black
  //     doc.setTextColor(0);
  
  //     // Add date and time
  //     const currentDate = new Date().toLocaleDateString();
  //     const currentTime = new Date().toLocaleTimeString();
  //     doc.setFont('Helvetica', 'normal');
  //     doc.setFontSize(14);
  //     doc.text(`Date: ${currentDate}`, 10, 50);
  //     doc.text(`Time: ${currentTime}`, 10, 60);
  
  //     // Add header content
  //     doc.setFont('Helvetica', 'bold');
  //     doc.setFontSize(20);
  //     doc.text('Bill - Camera Services', doc.internal.pageSize.getWidth() / 2, 90, { align: 'center' });
  
  //     // Camera service details
  //     const serviceDetails = [
  //       { service: 'Camera repair', price: '100' },
  //       { service: 'Lens cleaning', price: '200' },
  //       { service: 'Battery', price: '250' },
  //     ];
  
  //     // Calculate total
  //     let total = 0;
  
      // // Add service details to the bill
      // doc.setFont('Helvetica', 'normal');
      // doc.setFontSize(14);
      // serviceDetails.forEach((detail, index) => {
      //   const { service, price } = detail;
      //   const yPosition = 110 + index * 15;
      //   doc.text(service, 20, yPosition);
      //   doc.text(price, doc.internal.pageSize.getWidth() - 20, yPosition, { align: 'right' });
      //   total += parseInt(price);
      // });
  
      // // Add total
      // doc.setFont('Helvetica', 'bold');
      // doc.setFontSize(16);
      // const totalYPosition = doc.internal.pageSize.getHeight() - 20;
      // doc.text('Total:', 20, totalYPosition);
      // doc.text(`${total}`, doc.internal.pageSize.getWidth() - 20, totalYPosition, { align: 'right' });
  
      // // Add "Thank You" message
      // doc.setFont('Helvetica', 'normal');
      // doc.setFontSize(18);
      // doc.setTextColor(0, 128, 0); // Green color
      // doc.text('Thank You!', doc.internal.pageSize.getWidth() / 2, totalYPosition + 10, { align: 'center' });