import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDragon, faHouse, faPeopleGroup, faDiceD20, faScroll, faShieldHalved } from "@fortawesome/free-solid-svg-icons";

function Navbar() {
  return (
    <nav className="navbar-vertical">
      <div className="logo">
        <i>
        <FontAwesomeIcon icon={faDiceD20} />
        </i>
      </div>
      <ul className="nav-links-vertical">
        <NavLink to="/" className={({ isActive }) => (isActive ? "active-link" : undefined)}><li><FontAwesomeIcon icon={faHouse} /></li></NavLink>
        <NavLink to="/characters" className={({ isActive }) => (isActive ? "active-link" : undefined)}><li><FontAwesomeIcon icon={faPeopleGroup} /></li></NavLink>
        <NavLink to="/monsters" className={({ isActive }) => (isActive ? "active-link" : undefined)}><li><FontAwesomeIcon icon={faDragon} /></li></NavLink>
        <NavLink to="/encounters" className={({ isActive }) => (isActive ? "active-link" : undefined)}><li><FontAwesomeIcon icon={faShieldHalved} /></li></NavLink>
        <NavLink to="/about" className={({ isActive }) => (isActive ? "active-link" : undefined)}><li><FontAwesomeIcon icon={faScroll} /></li></NavLink>
      </ul>
    </nav>
  );
}

export default Navbar;
