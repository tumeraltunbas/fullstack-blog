import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../../services/apiService'

function Logout() {

    const navigate = useNavigate();

    useEffect(() => {

        const logout = async() => {
            const {data} = await api.get("/auth/logout");

            if(data.success === true){
                navigate("/login", {replace:true});
            }
            else{
                navigate("/");
                alert("An error occured when you tried to logout, try again.")
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