/* The above code is a React component that displays a table of customer reports for service centers.
It includes functionality to filter the data based on search terms and date of appointment, as well
as the ability to download a customer report in PDF format. The component uses various React hooks
such as useState, useEffect, and useCallback to manage state and handle side effects. It also uses
external libraries such as react-bootstrap, react-toastify, jspdf, and react-router-dom for UI
components and functionality. */
import React, { useEffect, useState, useCallback } from 'react';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import {  FileText } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { jsPDF } from 'jspdf';
import {Box} from '@mui/material';
import Adminsidebar from '../../Navbar/Adminsidebar';
import Admintopbar from '../../Navbar/Admintopbar';
import { API_URLS } from '../../Apis/config.js';


function Service (){
    const[adminPage] = useState('Customers Reports');
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchDate, setSearchDate] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    const [show1, setShow1] = useState(false);
    const handleClose1 = () => setShow1(false);
    const handleShow1 = () => setShow1(true);

    const [AppointmentDate, setAppointmentDate] = useState('')
    const [BookedSlot, setBookedSlot] = useState('')
    const [DateOfBooking, setDateOfBooking] = useState('')
    const [ServiceCost, setServiceCost] = useState('')


    const[serviceName, setServiceName] = useState('');
    const[useremail, setEmail] = useState('');
    const[phone, setPhone] = useState('')
    const[pName, setpName] = useState('');
    const[pNo, setpNo] = useState('');
    const[problem, setproblem] = useState('');
    let navigate =useNavigate();
    
   /* The above code is defining a function called `fetchData` using the `useCallback` hook in React.
   This function makes an HTTP GET request to the `API_URLS.getAllAppointments` endpoint using the
   axios library. If the request is successful, the response data is stored in the `data` state
   variable using the `setData` function. If there is an error, it is caught and can be handled in
   the catch block. */
    const fetchData = useCallback(() => {
      axios
        .get(API_URLS.getAllAppointments)
        .then((result) => {
          setData(result.data);
        })
        .catch((error) => {
          // Handle error
        });
    
      const email = localStorage.getItem('email');
      axios
        .get(`${API_URLS.getUserByEmailId}?email=${email}`)
        .then((result) => {
          if (result.data.userRole === 'user') {
            localStorage.removeItem('email');
            navigate('/');
          }
         
        })
        .catch((error) => {
          // Handle error
        });
    }, [navigate]);
    
    useEffect(() => {
      fetchData();
      localStorage.setItem('adminPage', adminPage)
    }, [searchTerm, searchDate, fetchData, adminPage]);
    
    
      /**
       * The function filters data based on search terms and date of appointment, and updates the data
       * state and displays a success toast message.
       */
      const filteredData = () => {
      const formattedSearchDate = searchDate ? new Date(searchDate).toLocaleDateString('en-GB') : '';
      const filteredData1 = data.filter((item) => {
        const matchesServiceId = searchTerm ? item.serviceCenterId.includes(searchTerm) : true;
        const matchesServiceName = searchTerm ? item.serviceCenterName.includes(searchTerm)  : true;
        const formattedDateofAppointment = item.dateOfAppointment ? new Date(item.dateOfAppointment).toLocaleDateString('en-GB') : ' ';
        const matchesDate = formattedSearchDate ? formattedDateofAppointment === formattedSearchDate : true;

        return ((matchesServiceId || matchesServiceName) && matchesDate);
       
      })
      setData(filteredData1);
      toast.success('Filtered service center successfully')
    };

    const handleClear = () => {
      setSearchTerm('');
      setSearchTerm('');
      setSearchDate(''); 
      fetchData();
    };
    const handleInputChange = (e) => {
      const value= e.target.value;
      setSearchTerm(value);

      const suggestions = data.filter(
        (item) => 
        item.serviceCenterId.toLowerCase().includes(value.toLowerCase()) ||
        item.serviceCenterName.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(suggestions);
    };

    

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
      
      // Calculate the start and end indices for the current page
      const startIndex = (currentPage - 1) * pageSize;
      const endIndex = startIndex + pageSize;
/**
 * The above code is a JavaScript React function that handles the download of a customer report in PDF
 * format, including various details such as service name, customer email, contact number, camera name,
 * appointment date, etc.
 */

      const handleDownload= (ID) =>{
        axios.get(`${API_URLS.getAppointmentSlotsById}/${ID}`)
      .then((result) => {

        setEmail(result.data.email)
        setPhone(result.data.contactNumber)
        setServiceName(result.data.serviceCenterName)
        setpName(result.data.productName)
        setpNo(result.data.productModelNo)
        setproblem(result.data.problemDescription)
        const rawDate1 = result.data.dateOfAppointment;
        const appointmentDate1 = new Date(rawDate1);
        const day1 = appointmentDate1.getDate();
        const month1 = appointmentDate1.getMonth() + 1;
        const year1 = appointmentDate1.getFullYear();
        const formattedDate1 = `${day1 < 10 ? '0' + day1 : day1}-${month1 < 10 ? '0' + month1 : month1}-${year1}`;
        setAppointmentDate(formattedDate1);
        setBookedSlot(result.data.bookedSlots)

        const rawDate = result.data.dateOfAppointmentBooking;
        const appointmentDate = new Date(rawDate);
        const day = appointmentDate.getDate();
        const month = appointmentDate.getMonth() + 1;
        const year = appointmentDate.getFullYear();
        const formattedDate = `${day < 10 ? '0' + day : day}-${month < 10 ? '0' + month : month}-${year}`;
        setDateOfBooking(formattedDate);

        setServiceCost(result.data.serviceCost)

      }).catch((error) => {
       
      })
        handleShow1();
      }

      const DownloadReport = () =>{

        handleClose1();
        
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
        
        const currentTime = new Date().toLocaleTimeString();
        
        doc.setFont('Helvetica', 'normal');
        doc.setFontSize(14);
        
        const timeTextWidth = doc.getStringUnitWidth(`Time: ${currentTime}`) * doc.internal.getFontSize();
        const timeX = pageWidth - timeTextWidth - 10;
        const timeY = 50;
        doc.text(`Time: ${currentTime}`, timeX, timeY, { align: 'right' });
        
        doc.setFontSize(14);
      
      const basicservicecostValue = parseInt(ServiceCost); 
      const gstValue = 156; 
      const totalValue = basicservicecostValue + gstValue; 
        
        const labels = [
          'Service Name',
          'Customer Email',
          'Contact Number',
          'Camera Name',
          'Model',
          'Problem',
          'Appointment Date',
          'Booked Slot',
          'Date of Booking',
          'Service Cost',
          'GST',
        ];
        const values = [
          serviceName,
          useremail,
          phone,
          pName,
          pNo,
          problem,
          AppointmentDate,
          BookedSlot,
          DateOfBooking,
          ServiceCost + '/-',
        gstValue + '/-',
        totalValue + '/-', // Replace with the actual GST value or calculation
        ];
        
        const labelY = 70;
        const labelSpacing = 15;
        
       // ...

labels.forEach((label, index) => {
  const labelNumber = `${index + 1}.`;
  const labelX = 10;
  const labelText = `${labelNumber} ${label}:`;
  doc.text(labelText, labelX, labelY + index * labelSpacing);

  const valueX = 60;
  const valueText = values[index] || '';
  const valueLine = `${valueText}  `;
  doc.text(valueLine, valueX, labelY + index * labelSpacing, { align: 'left', maxWidth: width - valueX - 10 });

  // ...
});

// ...

      
        doc.setFontSize(headingFontSize);
        doc.setFont(undefined, headingFontStyle);
        doc.setTextColor(headingTextColor);
        doc.text('Customer Report - KRAFTCAM Services', pageWidth / 2, y + headingFontSize + 10, { align: 'center' });
        
        const lineY = y + headingFontSize + 15;
        
        doc.line(50, lineY, pageWidth - 50, lineY);
        
        const totalLabelX = 10;
      const totalLabelText = 'Total:';
      const totalValueX = 60;
      const totalValueText = values[values.length - 1];
      
      
      doc.text(totalLabelText, totalLabelX, labelY + labels.length * labelSpacing);
      doc.text(totalValueText, totalValueX, labelY + labels.length * labelSpacing);
      
      const footerText = 'Dear Admin: ';
      const footerContent = 'We believe in the utmost importance of safeguarding our customers information and maintaining their trust. It is imperative that we handle their data with the utmost care, ensuring its confidentiality and security.';
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
       doc.save('Customer_Report.pdf');
    

      }

    return (
        <div>
        <Box sx={{ display: "flex" ,flexDirection:"column" , background: "linear-gradient(to bottom, rgba(7, 150, 238, 0.947), rgb(246, 246, 246))" }}>
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
            <ToastContainer/>
            <div className='mt-4 ml-2'>
              <Form>
              <Form.Group>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <Form.Control type="text"
                    className="mr-2"
                    placeholder='Search by Service Id or Service Name'
                    value={searchTerm}
                    onChange={handleInputChange}
                    list="suggestions"
                    style={{ width: '30%' }} />
                  {suggestions.length > 0 && (
                  <datalist id="suggestions">
                     {suggestions.map((suggestion) => (
                      <option key={suggestion.serviceCenterId} value={suggestion.serviceCenterId}/>
                      ))}
                     {suggestions.map((suggestion) => (
                      <option key={suggestion.serviceCenterName} value={suggestion.serviceCenterName}/>
                      ))}
                   </datalist>
                  )}
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <Form.Control type="Date"
                    value={searchDate}                    
                    onChange={(e) => setSearchDate(e.target.value)}
                    style={{ width: '30%' }} />
                  <Button variant="primary" onClick={filteredData} style={{ marginLeft: '10px' }}>Search</Button>&nbsp;&nbsp;
                  <Button variant="secondary" onClick={handleClear} style={{ marginLeft: '10px' }}>Clear</Button>
                </div>
              </Form.Group>
              &nbsp;&nbsp;
            </Form>
            </div>
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">S.No</th>
                <th scope="col">Service Center Id</th>
                <th scope="col">Service Name</th>
                <th scope="col" data-testid='customerName'>Customer Name</th>
                <th scope="col">Email</th>
                <th scope="col">Product Name</th>
                <th scope="col">Contact Number</th>
                <th scope="col">Generate Report</th>
              </tr>
            </thead>
            <tbody>
              {data.slice(startIndex, endIndex).map((item, index) => {
                              const serialNumber = startIndex + index + 1;

                return (
                  <tr key={index}>
                    <td>{serialNumber}</td>
                    <td>{item.serviceCenterId}</td>
                    <td>{item.serviceCenterName}</td>
                    <td>{item.customerName}</td>
                    <td>{item.email}</td>
                    <td>{item.productName}</td>
                    <td>{item.contactNumber}</td>
                    <td><Button variant="link" onClick={() => handleDownload(item.id)}><FileText size={24} />  </Button></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
         <>

<ToastContainer />

<Modal
  show={show1}
  onHide={handleClose1}
  backdrop="static"
  keyboard={false}
>
  <Modal.Header closeButton>
    <Modal.Title>Customer Report</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <Form className="my-form text-start">

    <Form.Group className="mb-4">
        <Form.Text style={{ fontSize: '20px' }}>Customer Mail : </Form.Text>
        <Form.Text style={{ fontSize: '20px' }}>{useremail}</Form.Text>
      </Form.Group>
      <Form.Group className="mb-4">
        <Form.Text style={{ fontSize: '20px' }}> Appointment Date : </Form.Text>
        <Form.Text style={{ fontSize: '20px' }} onChange={(e) => setAppointmentDate(e.target.value)}>{AppointmentDate}</Form.Text>
      </Form.Group>
      <Form.Group className="mb-4">
        <Form.Text style={{ fontSize: '20px' }}> Booked Slot : </Form.Text>
        <Form.Text style={{ fontSize: '20px' }} onChange={(e) => setBookedSlot(e.target.value)}>{BookedSlot}</Form.Text>
      </Form.Group>
      <Form.Group className="mb-4">
        <Form.Text style={{ fontSize: '20px' }}> Date of Booking : </Form.Text>
        <Form.Text style={{ fontSize: '20px' }} onChange={(e) => setDateOfBooking(e.target.value)}>{DateOfBooking}</Form.Text>
      </Form.Group>
      <Form.Group className="mb-4">
        <Form.Text style={{ fontSize: '20px' }}>ServiceCost : </Form.Text>
        <Form.Text style={{ fontSize: '20px' }} onChange={(e) => setServiceCost(e.target.value)}>{ServiceCost}/-
        </Form.Text>
      </Form.Group>
    </Form>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={handleClose1}>
      Close
    </Button>
    
    
      <Button variant="primary" onClick={DownloadReport}>Generate Report</Button>
  
  </Modal.Footer>
</Modal>
</>
         <div>
        <button variant="info"  onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        <button variant="secondary" onClick={handleNextPage} disabled={endIndex >= data.length}>
          Next
        </button>
      </div>
      </Box></Box></Box>
        </div>
    );
}
export default Service;