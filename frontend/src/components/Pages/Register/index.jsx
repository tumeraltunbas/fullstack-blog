import React, { useContext, useState } from 'react'
import Input from '../../Input/index.jsx';
import Button from "../../Button/index.jsx";
import "./Register.modules.css";
import {Link, useNavigate} from "react-router-dom";
import api from "../../../services/apiService.js";
import Error from '../../Error/index.jsx';
import ErrorContext from '../../Context/ErrorContext.js';

function RegisterPage() {

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const {error, setError} = useContext(ErrorContext);

  const navigate = useNavigate();

  const register = async(e) => {
    e.preventDefault();

    if(email === "" || username === "" || password === ""){
      setError("You must provide an email, an username and a password");
      return false;
    }

    try{
      
      await api.post("/auth/register", {
        email:email, 
        username:username, 
        password:password
      });
      
      navigate("/");

    }
    catch(error){
      const {data} = error.response;

      if(data.message.includes("duplicate")){

        setError("This email or username already in use, please choose another one.");
      }
      else{
        
        setError(data.message);
      }
    }
  }

  return (
    <form action="" className='registerForm' onSubmit={register}>
      <h1 className="formTitle">Register</h1>


      {error &&
      (
        <Error
        text={error}
        />
      )}

      <Input
      type="text"
      className="formInput"
      placeholder="Email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      />

      <Input
      type="text"
      className="formInput"
      placeholder="Username"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
      />

      <Input
      type="password"
      className="formInput"
      placeholder="Password"
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
        to="/auth/login"
        >
          Already have an account? Log in here!
        </Link>

      <Button
      type="submit"
      text="Register"
      className="registerBtn"
      />

    </form>
   )
}

export default RegisterPage