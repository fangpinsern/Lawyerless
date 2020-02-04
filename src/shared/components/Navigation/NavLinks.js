import React from "react";
import { NavLink } from "react-router-dom";

import "./NavLinks.css";

function NavLinks(props) {
  // Home, About Us, Start, Timeline, FAQ, Resources, Contact Us
  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/" exact>
          HOME
        </NavLink>
      </li>
      <li>
        <NavLink to="/aboutus" exact>
          ABOUT US
        </NavLink>
      </li>
      <li>
        <NavLink to="/start" exact>
          START
        </NavLink>
      </li>
      <li>
        <NavLink to="/faq" exact>
          FAQ/CONTACT US
        </NavLink>
      </li>
      <li>
        <NavLink to="/resources" exact>
          RESOURCES
        </NavLink>
      </li>
    </ul>
  );
}

export default NavLinks;
