import React, { useContext, useEffect, useState } from 'react';
import {Link} from "react-router-dom";
import api from '../../services/apiService';
import UserContext from '../Context/UserContext';
import "./Header.modules.css";
import Button from "../Button/index.jsx";

function Header() {

  const {user, setUser} = useContext(UserContext);
  
  useEffect(() => {
    
    const getUser = async() => {

      const {data} = await api.get("/auth/getUser");

      if(data.success === true){
        setUser(data.user);
      }
    }

    getUser();

  }, []) //when a component mounted

  return (
    <header>
        <a href="/" className='logo'>MyBlog</a>
        <nav>

          {
          user &&
          (
            <>
              <Link to="/create" className='navLink'>Create new post</Link>
            
              
              <div class="dropdown">
                <button 
                class="btn dropdownButton" 
                type="button" 
                data-bs-toggle="dropdown" 
                aria-expanded="false"
                >
                  Options
                </button>
                <ul class="dropdown-menu">
                  <li><Link className="dropdown-item navLink" to="/changePassword">Change Password</Link></li>
                  <li><Link className="dropdown-item navLink" to="/logout">Logout</Link></li>
                </ul>
              </div>
              
            </>
          )}
          {
            !user && (
              <>
                <Link to="/register" className='navLink'>Register</Link> 
                <Link to="/login" className='navLink'>Login</Link> 
              </>
            )
          }

        </nav>
    </header>
   )
}

export default Header;