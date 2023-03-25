import React from 'react';
import {Link} from "react-router-dom";
import "./Header.modules.css";

function Header() {
  return (
    <header>
        <a href="" className='logo'>MyBlog</a>
        <nav>
            <a href="/" className='navLink'>Register</a> 
            <a href="/" className='navLink'>Login</a> 
        </nav>
    </header>
   )
}

export default Header;