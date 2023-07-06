import './App.css';
import Signup from './components/Auth/Signup/Signup';
import Login from './components/Auth/Login/Login';
import AddCenter from './components/Admin/AddCenter/AddCenter';
import Centerprofile from './components/Admin/Centerprofile/Centerprofile';
import Service from './components/Admin/Service/Service';
import Customers from './components/Admin/Customer/Customers';
import HomePage from './components/Customer/HomePage/HomePage';
import Dashboard from './components/Customer/Dashboard/Dashboard';
import Booking from './components/Customer/Cart/Cart';
import PrivateRoutes from './components/Auth/PrivateRoutes';
import Review from './components/Admin/Review/Review';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
<<<<<<< HEAD

=======
>>>>>>> 34111c214527f0e3feecd5013b54bd3bcee9c003

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
        <Route element={<PrivateRoutes />}>
                <Route element={<AddCenter/>} path="/admin/AddCenter" exact/>
                <Route element={<Centerprofile/>} path="/admin/Centerprofile" exact/>
                <Route element={<Service/>} path="/admin/Service" exact/>
                <Route element={<Customers/>} path="/admin/Customers" exact/>
                <Route element={<Review/>} path="/admin/Review" exact/>
                <Route element={<HomePage/>} path="/user/Homepage" exact/>
                <Route element={<Dashboard/>} path="/user/Dashboard" exact/>
                <Route element={<Booking/>} path="/user/Cart" exact/>
            </Route>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
