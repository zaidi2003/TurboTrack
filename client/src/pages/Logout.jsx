import React, { useEffect } from 'react';
import "../styles/Logout.css";
import { useNavigate } from 'react-router-dom';
import { useUser } from "../context/UserContext";

const Logout = () => {
  const navigate = useNavigate();
  const { logout } = useUser();
  
  useEffect(() => {
    // Use the logout function from context instead of direct localStorage manipulation
    logout();
    
    // Short timeout to ensure state updates before navigation
    setTimeout(() => {
      navigate("/");
    }, 10);
  }, [logout, navigate]);

  return (
    <div className='logout-main'>
      <h1>Logout Successful!</h1>
    </div>
  );
};

export default Logout;