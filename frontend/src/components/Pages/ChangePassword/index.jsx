import "./ChangePassword.modules.css";

import React, { useContext } from 'react'
import { useState } from "react";
import Input from "../../Input";
import Button from "../../Button";
import api from "../../../services/apiService";
import { useNavigate } from "react-router-dom";
import ErrorContext from "../../Context/ErrorContext";
import Error from "../../Error";

function ChangePasswordPage() {

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [passwordRepeat, setPasswordRepeat] = useState("");
    const {error, setError} = useContext(ErrorContext);

    const navigate = useNavigate();

    const changePassword = async(e) => {
        e.preventDefault();

        if(!oldPassword || !newPassword || !passwordRepeat) {
            setError("You have to provide all inputs");
            return false;
        }
        
        try{
          
          await api.put("/auth/changePassword", {
            oldPassword:oldPassword,
            newPassword:newPassword,
            passwordRepeat:passwordRepeat
          });

          navigate("/auth/logout");
        }
        catch(error){
          const {data} = error.response;
          setError(data);
        }
    }


  return (
    <>
    <form action="" className='registerForm' onSubmit={changePassword}>
      <h1 className="formTitle">Change Password</h1>


      {error &&
      (
        <Error
        text={error}
        />
      )}

      <Input
      type="password"
      className="formInput"
      placeholder="Old password"
      value={oldPassword}
      onChange={(e) => setOldPassword(e.target.value)}
      />

      <Input
      type="password"
      className="formInput"
      placeholder="New Password"
      value={newPassword}
      onChange={(e) => setNewPassword(e.target.value)}
      />

      <Input
      type="password"
      className="formInput"
      placeholder="Password again"
      value={passwordRepeat}
      onChange={(e) => setPasswordRepeat(e.target.value)}
      />

      <Button
      type="submit"
      text="Change Password"
      className="registerBtn"
      />

    </form>
    </>
  )
}

export default ChangePasswordPage