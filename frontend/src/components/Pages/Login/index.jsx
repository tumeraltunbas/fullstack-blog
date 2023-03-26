import React, { useContext, useState } from 'react'
import Button from '../../Button'
import Input from '../../Input'
import "./Login.modules.css";
import {Link, useNavigate} from "react-router-dom";
import api from "../../../services/apiService.js";
import Error from '../../Error';
import ErrorContext from '../../Context/ErrorContext';

function LoginPage() {
  
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const {error, setError} = useContext(ErrorContext);

  const navigate = useNavigate()

  const login = async(e) => {
    
    e.preventDefault();

    if(!email || !password){
      setError("You have to provide all inputs");
      return;
    }

    try{
      
      await api.post("/auth/login", {
        email:email,
        password:password
      });

      navigate("/")

    }
    catch(error){
      const {data} = error.response;
      setError(data.message);
    }
  }

  return (
    <>
    <form action="" onSubmit={login}>
        <h1 className="formTitle">Login</h1>

      {error &&
      (
        <Error
        text={error}
        />
      )}


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
        to="/auth/forgotPassword"
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