import React, { useState } from 'react'
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import api from '../../../services/apiService';
import Button from '../../Button';
import Input from '../../Input';

function ResetPasswordPage() {

    const [password, setPassword] = useState();
    const [passwordRepeat, setPasswordRepeat] = useState();
    const [error, setError] = useState("");

    const search = useLocation().search;
    const resetPasswordToken = new URLSearchParams(search).get("resetPasswordToken");

    const navigate = useNavigate();

    const resetPassword = async(e) => {
        
        e.preventDefault();

        if(!password || !password){
            setError("You have to provide all inputs");
            return;
        }

        const {data} = await api.put(`/auth/resetPassword?resetPasswordToken=${resetPasswordToken}`, {
            password:password,
            passwordRepeat: passwordRepeat
        });

        if(data.success === true){
            navigate("/");
        }

    }

  return (
    <form className='registerForm' onSubmit={resetPassword}>
    <h1 className="formTitle">Reset Password</h1>

    {error && (
      <ul className="error">
        <li className='errorItem'>{error}</li>
      </ul>
    ) }

    <Input
    type="password"
    className="formInput"
    placeholder="Password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    />

    <Input
    type="password"
    className="formInput"
    placeholder="Password Repeat"
    value={passwordRepeat}
    onChange={(e) => setPasswordRepeat(e.target.value)}
    />

    <Button
    type="submit"
    text="Reset Password"
    className="registerBtn"
    />

  </form>
  )
}

export default ResetPasswordPage