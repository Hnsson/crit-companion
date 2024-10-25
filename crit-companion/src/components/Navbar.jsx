import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDragon } from "@fortawesome/free-solid-svg-icons";

function Navbar() {
  return (
    <nav className="navbar-vertical">
      <div className="logo">
        <h1>Crit-Companion</h1>
        <i>
          <FontAwesomeIcon icon={faDragon} />
        </i>
      </div>
      <ul className="nav-links-vertical">
        <NavLink to="/" className={({ isActive }) => (isActive ? "active-link" : undefined)}><li>Home</li></NavLink>
        <NavLink to="/characters" className={({ isActive }) => (isActive ? "active-link" : undefined)}><li>Characters</li></NavLink>
        <NavLink to="/monsters" className={({ isActive }) => (isActive ? "active-link" : undefined)}><li>Monsters</li></NavLink>
        <NavLink to="/about" className={({ isActive }) => (isActive ? "active-link" : undefined)}><li>About</li></NavLink>
      </ul>
    </nav>
  );
}

export default Navbar;
