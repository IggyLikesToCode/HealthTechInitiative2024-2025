import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Home from "../tabs/Home";
import Map from "../tabs/Map";
import "./components_css/navbar.css"; // Importing the CSS for styling

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Router>
      <div className="app-container">
        <div
          className={`reveal-navbar ${isOpen ? "open" : ""}`}
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        >
          <div className="navbar-button">&#9776;</div>
          {isOpen && (
            <ul className="navbar-links">
              <li>
                <Link to="/" className="nav-link">Home</Link>
              </li>
              <li>
                <Link to="/map" className="nav-link">Map</Link>
              </li>
            </ul>
          )}
        </div>
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/map" element={<Map />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default Navbar;
