import React from "react";
import { BrowserRouter as Router, Routes, Navigate, Route } from "react-router-dom";
import Login from "./components/login";
import Signup from "./components/signup";
//import logo from './logo.svg';
//import './App.css';

function App() {
  return (
		<div className="App">
			<Router>
				<Routes>
					<Route exact path="/" element={<Navigate to="/login" />} />
					<Route exact path="/login" element={<Login />} />
					<Route exact path="/signup" element={<Signup />} />
				</Routes>
			</Router>
		</div>

	);
}

export default App;
