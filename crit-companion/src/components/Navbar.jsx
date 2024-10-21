import React from "react";
import { Link } from "react-router-dom"; // Use this for navigation if using React Router
import "./Navbar.css"; // Optional: Add custom styling

function Navbar() {
  return (
    <nav className="navbar">
      <h1>Crit-Companion</h1>
      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/characters">Characters</Link>
        </li>
        <li>
          <Link to="/monsters">Monsters</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
