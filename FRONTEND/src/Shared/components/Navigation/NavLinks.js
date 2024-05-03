import React, { useContext } from 'react';

import './NavLinks.css';
import { AuthContext } from '../../context/authenticate-context';
import { NavLink } from 'react-router-dom';

export const NavLinks = () => {
   const auth = useContext(AuthContext); // gets back the values in the from of an object.
   
   const isAdmin = auth.isLoggedIn && (auth.role.trim().toLowerCase() === 'admin' || auth.role.trim().toLowerCase() === 'administrator');
   
   return <ul className="nav-links">
       {auth.isLoggedIn && (
          <li>
             <NavLink to="/"> NEW FORM </NavLink>
          </li>
       )}

       {isAdmin && (
          <li>
             <NavLink to="/applicants"> APPLICANTS </NavLink>
          </li>
       )}

       {!auth.isLoggedIn && (
          <li>
             <NavLink to="/auth"> AUTHENTICATE </NavLink>
          </li>
       )}

       {auth.isLoggedIn && (
          <button onClick={auth.logOut}>
            LOGOUT 
          </button>
       )}
       
    </ul>
   
};