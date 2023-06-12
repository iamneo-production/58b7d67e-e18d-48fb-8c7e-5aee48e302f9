import React, { useEffect, useState } from 'react';
import AddCenter from '../components/addCenter';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Reports (){

    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchDate, setSearchDate] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    let navigate =useNavigate();
    
    useEffect(() => {
      fetchData();
    }, [searchTerm, searchDate]);

    const fetchData = () => {
        axios.get('https://8080-cddafbcbabccadefcdadfcefbadbddebabfddbdad.project.examly.io/api/Appointment/getAllAppointments')
        .then((result)=>{
         setData(result.data)
        }).catch((error)=>{
    
        })
        const email =localStorage.getItem('email')
        axios.get(`https://localhost:44303/api/admin/getUserByEmailId/?email=${email}`)
        .then((result)=>{
          // setUserName(result.data.username)
          // setUserRole(result.data.userRole)
          if(result.data.userRole==="user"){
            localStorage.removeItem("email");
            navigate("/")
          }
        }).catch((error)=>{
    
        })
      };
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

    return (
        <div>
            <AddCenter/>
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
                  <Form.Control type="Date"
                    value={searchDate}                    
                    onChange={(e) => setSearchDate(e.target.value)}
                    style={{ width: '30%' }} />
                  <Button variant="primary" onClick={filteredData} style={{ marginLeft: '10px' }}>Search</Button>
                  <Button variant="secondary" onClick={handleClear} style={{ marginLeft: '10px' }}>Clear</Button>
                </div>
              </Form.Group>
              &nbsp;&nbsp;
            </Form>
            </div>
            {data && data.length > 0 ? (
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">S.No</th>
                <th scope="col">Service Center Id</th>
                <th scope="col">Service Name</th>
                <th scope="col">User Email</th>
                <th scope="col">Product Name</th>
                <th scope="col">Contact Number</th>
                <th scope="col">Booked Slot</th>
                <th scope="col">Appointment Date</th>
                <th scope="col">Date of Booking</th>
                <th scope="col">Service Cost</th>
                <th scope="col"></th>
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
                    <td>{item.email}</td>
                    <td>{item.productName}</td>
                    <td>{item.contactNumber}</td>
                    <td>{item.bookedSlots}</td>
                    <td>{new Date(item.dateOfAppointment).toLocaleDateString('en-GB')}</td>
                    <td>{new Date(item.dateOfAppointmentBooking).toLocaleString('en-GB', { dateStyle: 'short', timeStyle: 'medium', hour12: true })}</td>
                    <td>{item.serviceCost}/-</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <p>No Reports found....</p>
        )}
         <div>
        <button variant="info"  onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        <button variant="secondary" onClick={handleNextPage} disabled={endIndex >= data.length}>
          Next
        </button>
      </div>
        </div>
    );
}
export default Reports;