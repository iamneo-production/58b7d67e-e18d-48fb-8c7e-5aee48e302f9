import './App.css';
import Signup from './user/Signup';
import Login from './user/Login';
import AddServiceCenter from './admin/addServiceCenter';
import Centerprofile from './admin/Centerprofile';
import HomePage from './user/Homepage';
import Dashboard from './user/Dashboard';
import MyBookings from './user/Appointment';
import Customers from './admin/Customers';
import Reports from './admin/Reports';
import CompletedBookings from './user/CompletedBookings';
import Auth from './user/Auth';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() {
  return (
    <div className="App">
     
 <Router>
<Routes>
<Route element={<Auth />}>
                <Route element={<AddServiceCenter/>} path="/admin/addServiceCenter" exact/>
                <Route element={<Centerprofile/>} path="/admin/Centerprofile" exact/>
                <Route element={<Customers/>} path="/admin/Customers" exact/>
                <Route element={<Reports/>} path="/admin/Reports" exact/>
                <Route element={<HomePage/>} path="/user/Homepage" exact/>
                <Route element={<Dashboard/>} path="/user/Dashboard" exact/>
                <Route element={<MyBookings/>} path="/user/Appointment" exact/>
                <Route element={<CompletedBookings/>} path="/user/CompletedBookings" exact/>
</Route>
  <Route exact path="/" element={<Login />} />
  <Route exact path="/signup" element={<Signup />} />
</Routes>
</Router> 
    </div>
  );
}

export default App;
