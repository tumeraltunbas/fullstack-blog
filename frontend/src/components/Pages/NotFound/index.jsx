import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function NotFoundPage() {

    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            navigate("/");
        }, 5000)
    },[]);
    
  return (
    <>
    <h1 style={{textAlign:"center"}}>404 Not Found</h1>
    <p style={{textAlign:"center"}}>You will be redirected to index page in 5 seconds</p>
    </>
  )
}

export default NotFoundPage