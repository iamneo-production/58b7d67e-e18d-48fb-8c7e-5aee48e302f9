
import './App.css';
import Signup from './Components/Signup';
import Login from './Components/Login';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Router>
      <Routes>
      <Route exact path="/" element={<Login />} />
          <Route exact path="/Signup" element={<Signup />} />
        </Routes>  
      </Router>
    </div>
  );
}

export default App;
