import React, { useState } from 'react'
import Button from '../../Button'
import Input from '../../Input'
import "./Login.modules.css";
import {Link, useNavigate} from "react-router-dom";
import api from "../../../services/apiService.js";

function LoginPage() {

    
  
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState("");

  const navigate = useNavigate()

  const login = async(e) => {
    
    e.preventDefault();

    const {data} = await api.post("/auth/login", {
      email:email,
      password:password
    });
    
    if(data.success === true){
      navigate("/");
    }
    else{
      setError(data.message);
    }
  
  }

  return (
    <>
    <form action="" onSubmit={login}>
        <h1 className="formTitle">Login</h1>

        
      {error && (
        <ul className="error">
          <li className='errorItem'>{error}</li>
        </ul>
      ) }


        <Input
        type="text"
        placeholder="Email"
        className="formInput"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        />

        <Input
        type="password"
        placeholder="Password"
        className="formInput"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        />

        <Link 
        className="forgotPassword" 
        style={{
          display:"block", 
          marginBottom:"2vh", 
          color:"black", 
          fontSize:"15px"
        }} 
        to="/forgotPassword"
        >
          Did you forgot your password?
        </Link>

        <Button
        type="submit"
        text="Login"
        className="registerBtn"
        />

    </form>
    
    </>
  )
}

export default LoginPage