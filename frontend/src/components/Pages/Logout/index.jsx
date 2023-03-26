import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../../services/apiService'

function Logout() {

    const navigate = useNavigate();

    useEffect(() => {

        const logout = async() => {
            try{
                
                await api.get("/auth/logout");
                navigate("/auth/login", {replace:true});
            }
            catch(error){
                alert("An error occured when you tried to logout, try again.")
                navigate("/");
            }
        }

        logout();
    }
    ,[]) //when component mounted

  return (
        <>
        </>
    )
}

export default Logout