import React, { useContext, useEffect } from 'react';
import {Link} from "react-router-dom";
import api from '../../services/apiService';
import UserContext from '../Context/UserContext';
import "./Header.modules.css";

function Header() {

  const {user, setUser} = useContext(UserContext);
  
  useEffect(() => {
    
    const getUser = async() => {

      const {data} = await api.get("/auth/getUser");

      console.log(data);

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

          {user &&
          (
            <>
              <Link to="/create" className='navLink'>Create new post</Link>
              <Link className="navLink">Hello, {user.username}</Link>
            </>
          )}
          {
            !user && (
              <>
                <a href="/register" className='navLink'>Register</a> 
                <a href="/login" className='navLink'>Login</a> 
              </>
            )
          }

        </nav>
    </header>
   )
}

export default Header;