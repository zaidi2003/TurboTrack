import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Register = () => {
  // State to store form inputs and token
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [token, setToken] = useState(JSON.parse(localStorage.getItem("auth")) || "");
  const navigate = useNavigate();

  // Update form state on input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle registration form submission
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    const { username, email, password } = formData;
    if (username && email && password) {
      try {
        const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/v1/users/register`, {
          username, email, password
        });
        toast.success("Registration successful");
        navigate("/login");
      } catch (err) {
        toast.error(err.response?.data?.msg || err.message);
      }
    } else {
      toast.error("Please fill all inputs");
    }
  };

  // Redirect if already logged in
  useEffect(() => {
    if (token !== "") {
      toast.success("You are already logged in");
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
      <div style={{ width: '100%', height: 185, position: 'relative', borderRadius: 15 }}>
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
      <Link
        to="/login"
        style={{
          left: '42%',
          top: 120,
          position: 'absolute',
          color: '#C9C0C0',
          fontSize: 20,
          fontFamily: 'Readex Pro',
          fontWeight: '400',
          wordWrap: 'break-word',
          textDecoration: 'none'
        }}
      >
        Sign in
      </Link>
      <div
        style={{
          width: 111,
          height: 6,
          left: '50%',
          top: 145,
          position: 'absolute',
          background: '#B81515'
        }}
      />
      <div
        style={{
          left: '51%',
          top: 120,
          position: 'absolute',
          color: '#C9C0C0',
          fontSize: 20,
          fontFamily: 'Readex Pro',
          fontWeight: '700',
          wordWrap: 'break-word'
        }}
      >
        Register
      </div>

      {/* Form Container */}
      <div
        style={{
          width: 488,
          height: 466,
          left: '50%',
          top: 235,
          position: 'absolute',
          transform: 'translateX(-50%)',
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

        {/* Create Account Heading */}
        <div
          style={{
            left: 92.05,
            top: 15,
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
          Create Account
        </div>

        {/* Underline */}
        <div
          style={{
            width: 381.57,
            height: 0,
            left: 53,
            top: 75.08,
            position: 'absolute',
            opacity: 0.50,
            outline: '0.81px #F7F4F1 solid',
            outlineOffset: '-0.41px'
          }}
        ></div>

        {/* Form */}
        <form onSubmit={handleRegisterSubmit}>
          {/* Email Field */}
          <div
            style={{
              width: 373.45,
              height: 52.77,
              left: 57.82,
              top: 100,
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
                letterSpacing: 0.90,
                opacity: 0.5
              }}
            />
          </div>

          {/* Username Field */}
          <div
            style={{
              width: 373.45,
              height: 52.77,
              left: 57,
              top: 183.86,
              position: 'absolute',
              background: '#C8DCE4',
              borderRadius: 12.18,
              border: '0.81px black solid'
            }}
          >
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
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
                letterSpacing: 0.90,
                opacity: 0.6
              }}
            />
          </div>

          {/* Password Field */}
          <div
            style={{
              width: 373.45,
              height: 52.77,
              left: 58,
              top: 263.86,
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
                letterSpacing: 0.90,
                opacity: 0.6
              }}
            />
          </div>

          {/* Register Button */}
          <button
            type="submit"
            style={{
              width: 373,
              height: 51,
              left: 58,
              top: 349,
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
              Register
            </div>
          </button>

          {/* Business Account Link */}
          <div
            style={{
              left: 67,
              top: 423,
              position: 'absolute',
              color: '#C9C0C0',
              fontSize: 16.54,
              fontFamily: 'Readex Pro',
              fontWeight: '400',
              wordWrap: 'break-word'
            }}
          >
            Need a business account?
          </div>
          <Link
            to="/become-a-partner"
            style={{
              left: 278,
              top: 424,
              position: 'absolute',
              color: '#C9C0C0',
              fontSize: 16.18,
              fontFamily: 'Readex Pro',
              fontWeight: '600',
              textDecoration: 'underline',
              wordWrap: 'break-word'
            }}
          >
            Become a Partner
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Register;