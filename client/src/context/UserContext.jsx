// src/context/UserContext.jsx
import { createContext, useState, useContext, useEffect } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';

// Create the context
const UserContext = createContext(null);

// Provider component
export const UserProvider = ({ children }) => {
  const [token, setToken] = useState(JSON.parse(localStorage.getItem("auth")) || "");
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    role: "",
    wins: 0,
    podiums: 0,
    sessions: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  const fetchUserInfo = async () => {
    setIsLoading(true);
    
    if (!token) {
      setIsLoading(false);
      return;
    }
    
    const axiosConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/dashboard/dashboard`, 
        axiosConfig
      );
      
      const { msg, secret, email, username, wins, podiums, sessions, role } = response.data;
      
      setUserData({ 
        username, 
        email, 
        role,
        wins: wins || 0,
        podiums: podiums || 0,
        sessions: sessions || 0
      });
      
    } catch (error) {
      toast.error(error.response?.data?.msg || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, [token]); // Re-fetch when token changes

  // Prepare stats for components that need them
  const userStats = {
    sessions: userData.sessions || 0,
    wins: userData.wins || 0,
    podiums: userData.podiums || 0,
    other: (userData.sessions || 0) - (userData.podiums || 0) - (userData.wins || 0) || 0,
  };

  const logout = () => {
    localStorage.removeItem("auth");
    setToken("");
    setUserData({
      username: "",
      email: "",
      role: "",
      wins: 0,
      podiums: 0,
      sessions: 0
    });
    // Note: Navigation will be handled by the component that calls this function
  };

  const updateToken = (newToken) => {
    localStorage.setItem("auth", JSON.stringify(newToken));
    setToken(newToken);
  };

  // Value to be provided to consumers
  const value = {
    userData,
    userStats,
    isLoading,
    token,
    updateToken,
    fetchUserInfo,
    logout
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook for using the context
export const useUser = () => {
  const context = useContext(UserContext);
  if (context === null) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export default UserContext;