import './App.css';
import Signup from './components/Signup';
import Login from './components/Login';
import AddServiceCenter from './components/AddServiceCenter';
import Centerprofile from './components/Centerprofile';
import HomePage from './components/Homepage';
import Dashboard from './components/Dashboard';
import MyBookings from './components/Appointment';
import Logout from './components/Logout';
import PrivateRoutes from './components/PrivateRoutes';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//demo


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
        <Route element={<PrivateRoutes />}>
                <Route element={<AddServiceCenter/>} path="/admin/addServiceCenter" exact/>
                <Route element={<Centerprofile/>} path="/admin/Centerprofile" exact/>
                <Route element={<Logout/>} path="/user/Logout" exact/>
                <Route element={<HomePage/>} path="/user/Homepage" exact/>
                <Route element={<Dashboard/>} path="/user/Dashboard" exact/>
                <Route element={<MyBookings/>} path="/user/Appointment" exact/>
            </Route>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
