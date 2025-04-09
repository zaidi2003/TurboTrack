import React, { useEffect } from 'react'
import "../styles/Logout.css";
import { useNavigate } from 'react-router-dom';

const Logout = () => {

    const navigate = useNavigate();
    
    useEffect(() => {
        localStorage.removeItem("auth");
        setTimeout(() => {
            navigate("/");
        }, 10);
    }, []);

  return (
    <div className='logout-main'>
    <h1>Logout Successful!</h1>
  </div>
  )
}

export default Logout