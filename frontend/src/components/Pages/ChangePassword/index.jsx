import "./ChangePassword.modules.css";

import React from 'react'
import { useState } from "react";
import Input from "../../Input";
import Button from "../../Button";
import api from "../../../services/apiService";
import { useNavigate } from "react-router-dom";

function ChangePasswordPage() {

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [passwordRepeat, setPasswordRepeat] = useState("");
    const [error, setError] = useState();

    const navigate = useNavigate();

    const changePassword = async(e) => {
        e.preventDefault();

        if(!oldPassword || !newPassword || !passwordRepeat) {
            setError("You have to provide all inputs");
            return false;
        }

        const {data} = await api.put("/auth/changePassword", {
            oldPassword:oldPassword,
            newPassword:newPassword,
            passwordRepeat:passwordRepeat
        });

        if(data.success === true){
            navigate("/auth/logout");
        }
    }


  return (
    <>
    <form action="" className='registerForm' onSubmit={changePassword}>
      <h1 className="formTitle">Change Password</h1>


      {error && (
        <ul className="error">
          <li className='errorItem'>{error}</li>
        </ul>
      ) }

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