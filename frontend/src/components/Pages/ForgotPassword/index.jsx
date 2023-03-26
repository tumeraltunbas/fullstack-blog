import "./ForgotPassword.modules.css";

import React, { useState } from 'react'
import Input from "../../Input";
import Button from "../../Button";
import api from "../../../services/apiService";
import { useNavigate } from "react-router-dom";

function ForgotPasswordPage() {

    const [email, setEmail] = useState();
    const [error, setError] = useState();

    const navigate = useNavigate();

    const forgotPassword = async(e) => {
        
        e.preventDefault();
        
        try{
          
          await api.post("/auth/forgotPassword", {
            email:email
          });
          
          navigate("/");
        }
        catch(error){
          
          const {data} = error.response;
          setError(data.message);
        }
    }

  return (
    <>
    <form className='registerForm' onSubmit={forgotPassword}>
      <h1 className="formTitle">Forgot Password</h1>

      {error && (
        <ul className="error">
          <li className='errorItem'>{error}</li>
        </ul>
      ) }

      <Input
      type="text"
      className="formInput"
      placeholder="Email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      />

      <Button
      type="submit"
      text="Send reset password link"
      className="registerBtn"
      />

    </form>
    </>
  )
}

export default ForgotPasswordPage