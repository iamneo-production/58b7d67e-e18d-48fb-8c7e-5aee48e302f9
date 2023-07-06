<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
import logo from './logo.svg';
import './App.css';
>>>>>>> origin/DotNet_React_AE_Camera_Service_2023-AlekyaRekapalli
=======
import logo from './logo.svg';
import './App.css';
>>>>>>> d3b1ba8fb5941e415fe114a25a9c8ca16f4af93c
=======
import logo from './logo.svg';
import './App.css';
>>>>>>> d3b1ba8fb5941e415fe114a25a9c8ca16f4af93c
=======
import logo from './logo.svg';
import './App.css';
>>>>>>> d3b1ba8fb5941e415fe114a25a9c8ca16f4af93c

function App() {
  return (
    <div className="App">
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
=======
>>>>>>> d3b1ba8fb5941e415fe114a25a9c8ca16f4af93c
=======
>>>>>>> d3b1ba8fb5941e415fe114a25a9c8ca16f4af93c
=======
>>>>>>> d3b1ba8fb5941e415fe114a25a9c8ca16f4af93c
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> origin/DotNet_React_AE_Camera_Service_2023-AlekyaRekapalli
=======
>>>>>>> d3b1ba8fb5941e415fe114a25a9c8ca16f4af93c
=======
>>>>>>> d3b1ba8fb5941e415fe114a25a9c8ca16f4af93c
=======
>>>>>>> d3b1ba8fb5941e415fe114a25a9c8ca16f4af93c
    </div>
  );
}

export default App;
