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
        const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/v1/users/login`, { email, password });
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
        backgroundImage: 'url("/bg-wp.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: '#C4C4C4',
        overflow: 'hidden'
      }}
    >
      {/* Header Structure */}
      <div style={{ width: '100%', height: 185, left: 0, top: 0, position: 'absolute' }}>
        {/* Top Black Gradient Bar */}
        <div
          style={{
            width: '100%',
            height: 90,
            left: 0,
            top: 0,
            position: 'absolute',
            background: 'linear-gradient(90deg, black 26%, #1B1B1B 53%, #1F1F1F 74%, #242424 83%, #272727 93%)',
            border: '1px black solid'
          }}
        />
        {/* Red Gradient Bar */}
        <div
          style={{
            width: '100%',
            height: 65,
            left: 0,
            top: 90,
            position: 'absolute',
            background: 'linear-gradient(90deg, #300101 6%, #3A0202 20%, #410202 27%, #480202 35%, #510202 48%, #690303 62%, #740303 73%, #7B0303 84%, #960404 95%)',
            border: '1px black solid'
          }}
        />
        
        {/* Logo */}
        <Link to="/" style={{ textDecoration: 'none' }}>
          <div
            style={{
              left: 88,
              top: 30,
              position: 'absolute',
              opacity: 0.80,
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
      </div>

      {/* Navigation Tabs */}
      <div
        style={{
          left: 658,
          top: 120,
          position: 'absolute',
          color: '#C9C0C0',
          fontSize: 20,
          fontFamily: 'Readex Pro',
          fontWeight: '700',
          wordWrap: 'break-word'
        }}
      >
        Sign in
      </div>
      <div
        style={{
          width: 111,
          height: 6,
          left: 638,
          top: 145,
          position: 'absolute',
          background: '#B81515'
        }}
      />
      <Link
        to="/register"
        style={{
          left: 792,
          top: 120,
          position: 'absolute',
          opacity: 0.80,
          color: '#C9C0C0',
          fontSize: 20,
          fontFamily: 'Readex Pro',
          fontWeight: '400',
          wordWrap: 'break-word',
          textDecoration: 'none'
        }}
      >
        Register
      </Link>

      {/* Form Container */}
      <div
        style={{
          width: 488,
          height: 466,
          left: 512,
          top: 235,
          position: 'absolute',
          overflow: 'hidden'
        }}
      >
        {/* Form Background */}
        <div
          style={{
            width: 488,
            height: 466,
            left: 0,
            top: 0,
            position: 'absolute',
            opacity: 0.20,
            background: 'linear-gradient(90deg, black 26%, #1B1B1B 53%, #1F1F1F 74%, #242424 83%, #272727 93%)',
            borderRadius: 24.36
          }}
        />

        {/* Welcome Back Heading */}
        <div
          style={{
            left: 97.22,
            top: 39.46,
            position: 'absolute',
            textAlign: 'center',
            color: '#C9C0C0',
            fontSize: 36.53,
            fontFamily: 'Readex Pro',
            fontWeight: '700',
            letterSpacing: 1.83,
            wordWrap: 'break-word'
          }}
        >
          Welcome Back
        </div>

        {/* Underline */}
        <div
          style={{
            width: 381.57,
            height: 0,
            left: 50.95,
            top: 99.54,
            position: 'absolute',
            opacity: 0.50,
            outline: '0.81px #F7F4F1 solid',
            outlineOffset: '-0.41px'
          }}
        ></div>

        {/* Form */}
        <form onSubmit={handleLoginSubmit}>
          {/* Email Field */}
          <div
            style={{
              width: 373.45,
              height: 52.77,
              left: 55.82,
              top: 122.14,
              position: 'absolute',
              background: '#C8DCE4',
              borderRadius: 12.18,
              border: '0.81px black solid'
            }}
          >
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email address"
              style={{
                width: '100%',
                height: '100%',
                background: 'transparent',
                border: 'none',
                outline: 'none',
                paddingLeft: 16,
                color: '#737373',
                fontSize: 18,
                fontFamily: 'Readex Pro',
                fontWeight: '200',
                letterSpacing: 0.90
              }}
            />
          </div>

          {/* Password Field */}
          <div
            style={{
              width: 373.45,
              height: 52.77,
              left: 55.82,
              top: 205.76,
              position: 'absolute',
              background: '#C8DCE4',
              borderRadius: 12.18,
              border: '0.81px black solid'
            }}
          >
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              style={{
                width: '100%',
                height: '100%',
                background: 'transparent',
                border: 'none',
                outline: 'none',
                paddingLeft: 16,
                color: '#737373',
                fontSize: 18,
                fontFamily: 'Readex Pro',
                fontWeight: '200',
                letterSpacing: 0.90
              }}
            />
          </div>

          {/* Forgot Password Link */}
          <Link
            to="/forgot-password"
            style={{
              left: 280.70,
              top: 277.21,
              position: 'absolute',
              opacity: 0.80,
              color: '#C9C0C0',
              fontSize: 16.28,
              fontFamily: 'Readex Pro',
              fontWeight: '500',
              textDecoration: 'underline',
              wordWrap: 'break-word'
            }}
          >
            Forgot Password?
          </Link>

          {/* Sign In Button */}
          <button
            type="submit"
            style={{
              width: 373,
              height: 51,
              left: 56,
              top: 328,
              position: 'absolute',
              background: 'linear-gradient(90deg, #300101 6%, #3A0202 20%, #410202 27%, #480202 35%, #510202 48%, #690303 62%, #740303 73%, #7B0303 84%, #960404 95%)',
              overflow: 'hidden',
              borderRadius: 12.18,
              outline: '0.81px #120000 solid',
              outlineOffset: '-0.81px',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            <div
              style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: '#EAD8D8',
                fontSize: 17.05,
                fontFamily: 'Inter',
                fontWeight: '700'
              }}
            >
              Sign in
            </div>
          </button>

          {/* Register Link */}
          <div
            style={{
              left: 115,
              top: 414,
              position: 'absolute',
              color: '#C9C0C0',
              fontSize: 16.54,
              fontFamily: 'Readex Pro',
              fontWeight: '400',
              wordWrap: 'break-word'
            }}
          >
            Don't have an account?
          </div>
          <Link
            to="/register"
            style={{
              left: 305.46,
              top: 414,
              position: 'absolute',
              color: '#C9C0C0',
              fontSize: 16.18,
              fontFamily: 'Readex Pro',
              fontWeight: '600',
              textDecoration: 'underline',
              wordWrap: 'break-word'
            }}
          >
            Register now
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;