import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  // State to store the auth token, form data, etc.
  const [token, setToken] = useState(JSON.parse(localStorage.getItem("auth")) || "");
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  // Update formData when input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;
    if (email && password) {
      try {
        const response = await axios.post("http://localhost:3000/api/v1/login", { email, password });
        localStorage.setItem("auth", JSON.stringify(response.data.token));
        toast.success("Login successful");
        navigate("/dashboard");
      } catch (err) {
        toast.error(err.message);
      }
    } else {
      toast.error("Please fill all inputs");
    }
  };

  // Redirect if already logged in
  useEffect(() => {
    if (token !== "") {
      toast.success("You already logged in");
      navigate("/dashboard");
    }
  }, [token, navigate]);

  return (
    <div
      style={{
        width: '100%',
        height: '100vh',
        position: 'relative',
        backgroundImage: 'url("/bg-wp.png")', // Now the file is in public folder
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: '#F7F4F1',
        overflow: 'hidden'
      }}
    >
      {/* Top Navigation Bar */}
      <div
        style={{
          width: '100%',
          height: '12%',
          left: 0,
          top: 0,
          position: 'absolute',
          background: 'linear-gradient(90deg, black 26%, #1B1B1B 53%, #1F1F1F 74%, #242424 83%, #272727 93%)',
          border: '1px solid black'
        }}
      />
      <div
        style={{
          width: '100%',
          height: '6.5%',
          left: 0,
          top: '12%',
          position: 'absolute',
          background: 'linear-gradient(90deg, #300101 6%, #3A0202 20%, #410202 27%, #480202 35%, #510202 48%, #690303 62%, #740303 73%, #7B0303 84%, #960404 95%)',
          border: '1px solid black'
        }}
      />
      <div
        style={{
          width: "100%",
          height: 10,
          left: -1,
          top: '11.5%',
          position: 'absolute',
          background: 'linear-gradient(90deg, #300101 6%, #3A0202 20%, #410202 27%, #480202 35%, #510202 48%, #690303 62%, #740303 73%, #7B0303 84%, #960404 95%)',
          border: '1px solid black'
        }}
      />
      
      {/* Added Link to the main landing page */}
      <Link to="/" style={{ textDecoration: 'none' }}>
        <div
          style={{
            width: '20%',
            left: '5%',
            top: '4%',
            position: 'absolute',
            color: '#D5D4D4',
            fontSize: 30,
            fontFamily: 'Zen Dots',
            fontWeight: '400',
            letterSpacing: 3,
            wordWrap: 'break-word',
            cursor: 'pointer'
          }}
        >
          turbotrack
        </div>
      </Link>
      <div
        style={{
          left: '43%',
          top: '15%',
          position: 'absolute',
          color: '#C9C0C0',
          fontSize: 'clamp(16px, 1.5vw, 20px)',
          fontFamily: 'Readex Pro',
          fontWeight: '700',
          wordWrap: 'break-word'
        }}
      >
        Sign in
      </div>
      <div
        style={{
          width: '7%',
          height: 6,
          left: '42%',
          top: '18%',
          position: 'absolute',
          background: '#B81515'
        }}
      />
      <Link
        to="/register"
        style={{
          left: '52%',
          top: '15%',
          position: 'absolute',
          color: '#D5D4D4',
          fontSize: 20,
          fontFamily: 'Readex Pro',
          fontWeight: '400',
          wordWrap: 'break-word',
          textDecoration: 'none'
        }}
      >
        Register
      </Link>

      {/* Main Heading */}
      <div
        style={{
          left: '50%',
          top: '30%',
          position: 'absolute',
          transform: 'translateX(-50%)',
          textAlign: 'center',
          color: '#D5D4D4',
          fontSize: 'clamp(35px, 4vw, 55px)',
          fontFamily: 'Readex Pro',
          fontWeight: '700',
          letterSpacing: 2.75,
          wordWrap: 'break-word'
        }}
      >
        Welcome Back
      </div>
      {/* Underline Element */}
      <div
        style={{
          width: '50%',
          height: 0,
          left: '25%',
          top: '41%',
          position: 'absolute',
          outline: '1px var(--cream, #F7F4F1) solid',
          outlineOffset: '-0.50px'
        }}
      ></div>
      {/* Form and Labels */}
      <form onSubmit={handleLoginSubmit}>
        {/* Email Label */}
        <div
          style={{
            left: '25.5%',
            top: '47%',
            position: 'absolute',
            color: '#D5D4D4',
            fontSize: 23,
            fontFamily: 'Readex Pro',
            fontWeight: '300',
            wordWrap: 'break-word'
          }}
        >
          Email address
        </div>
        {/* Email Input Box */}
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          style={{
            width: 730,
            height: 65,
            left: '25%',
            top: '52%',
            position: 'absolute',
            background: 'rgba(244,248,250,0.8)',
            borderRadius: 15,
            border: '1px solid black',
            paddingLeft: 10,
            fontSize: 20,
            fontFamily: 'Readex Pro'
          }}
        />
        {/* Password Label */}
        <div
          style={{
            left: '25.5%',
            top: '64%',
            position: 'absolute',
            color: '#D5D4D4',
            fontSize: 23,
            fontFamily: 'Readex Pro',
            fontWeight: '300',
            wordWrap: 'break-word'
          }}
        >
          Password
        </div>
        {/* Password Input Box */}
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          style={{
            width: 730,
            height: 65,
            left: '25%',
            top: '69%',
            position: 'absolute',
            background: 'rgba(244,248,250,0.8)',
            borderRadius: 15,
            border: '1px solid black',
            paddingLeft: 10,
            fontSize: 20,
            fontFamily: 'Readex Pro'
          }}
        />

        {/* Sign In Button */}
        <div
          data-property-1="Default"
          style={{
            width: 184,
            height: 62,
            left: '25%',
            top: '82%',
            position: 'absolute',
            background: 'linear-gradient(90deg, #300101 6%, #3A0202 20%, #410202 27%, #480202 35%, #510202 48%, #690303 62%, #740303 73%, #7B0303 84%, #960404 95%)',
            overflow: 'hidden',
            borderRadius: 15,
            outline: '1px #120000 solid',
            outlineOffset: '-1px',
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
          onClick={handleLoginSubmit}
        >
          <div
            style={{
              
              position: 'absolute',
              color: '#EAD8D8',
              fontSize: 21,
              fontFamily: 'Inter',
              fontWeight: '700',
              wordWrap: 'break-word'
            }}
          >
            Sign in
          </div>
        </div>

        {/* Bottom Links */}
        <div
          style={{
            left: '38%',
            top: '93%',
            position: 'absolute',
            color: '#D5D4D4',
            fontSize: 20.06,
            fontFamily: 'Readex Pro',
            fontWeight: '400',
            wordWrap: 'break-word'
          }}
        >
          Don’t have an account?
        </div>
        <Link
          to="/register"
          style={{
            left: '54%',
            top: '93%',
            position: 'absolute',
            color: '#C8C0C0',
            fontSize: 19.63,
            fontFamily: 'Readex Pro',
            fontWeight: '600',
            textDecoration: 'underline',
            wordWrap: 'break-word'
          }}
        >
          Register now
        </Link>
        <Link
          to="/forgot-password"
          style={{
            left: '62%',
            top: '84%',
            position: 'absolute',
            color: '#D5D4D4',
            fontSize: 20.05,
            fontFamily: 'Readex Pro',
            fontWeight: '500',
            textDecoration: 'underline',
            wordWrap: 'break-word'
          }}
        >
          Forgot Password?
        </Link>
      </form>
    </div>
  );
};

export default Login;
