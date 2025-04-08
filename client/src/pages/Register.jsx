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
        const response = await axios.post("http://localhost:3000/api/v1/register", {
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
        width: 1512,
        height: 982,
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
          width: 1512,
          height: 120,
          left: 0,
          top: 0,
          position: 'absolute',
          background: 'linear-gradient(90deg, black 26%, #1B1B1B 53%, #1F1F1F 74%, #242424 83%, #272727 93%)',
          border: '1px solid black'
        }}
      />
      <div
        style={{
          width: 1512,
          height: 65,
          left: 0,
          top: 120,
          position: 'absolute',
          background: 'linear-gradient(90deg, #300101 6%, #3A0202 20%, #410202 27%, #480202 35%, #510202 48%, #690303 62%, #740303 73%, #7B0303 84%, #960404 95%)',
          border: '1px solid black'
        }}
      />
      <div
        style={{
          width: 1512,
          height: 10,
          left: -1,
          top: 115,
          position: 'absolute',
          background: 'linear-gradient(90deg, #300101 6%, #3A0202 20%, #410202 27%, #480202 35%, #510202 48%, #690303 62%, #740303 73%, #7B0303 84%, #960404 95%)',
          border: '1px solid black'
        }}
      />
      <Link to="/" style={{ textDecoration: 'none' }}>
        <div
          style={{
            width: 300,
            left: 82,
            top: 41,
            position: 'absolute',
            color: '#D5D4D4',
            fontSize: 30,
            fontFamily: 'Zen Dots',
            fontWeight: '400',
            letterSpacing: 3,
            wordWrap: 'break-word'
          }}
        >
          turbotrack
        </div>
      </Link>
      <Link
        to="/login"
        style={{
          left: 640,
          top: 149,
          position: 'absolute',
          color: '#C9C0C0',
          fontSize: 20,
          fontFamily: 'Readex Pro',
          fontWeight: '400',
          wordWrap: 'break-word'
        }}
      >
        Sign in
        </Link>
      <div
        style={{
          width: 111,
          height: 6,
          left: 760,
          top: 179,
          position: 'absolute',
          background: '#B81515'
        }}
      />
      <div
        style={{
          left: 774,
          top: 149,
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

      {/* Heading */}
      <div
        style={{
          left: 527,
          top: 277,
          position: 'absolute',
          textAlign: 'center',
          color: '#D5D4D4',
          fontSize: 55,
          fontFamily: 'Readex Pro',
          fontWeight: '700',
          letterSpacing: 2.75,
          wordWrap: 'break-word'
        }}
      >
        Create Account
      </div>

      {/* Labels */}
      <div
        style={{
          left: 400,
          top: 436,
          position: 'absolute',
          color: '#D5D4D4',
          fontSize: 21,
          fontFamily: 'Readex Pro',
          fontWeight: '300',
          wordWrap: 'break-word'
        }}
      >
        Email address
      </div>
      <div
        style={{
          left: 400,
          top: 560,
          position: 'absolute',
          color: '#D5D4D4',
          fontSize: 21,
          fontFamily: 'Readex Pro',
          fontWeight: '300',
          wordWrap: 'break-word'
        }}
      >
        Username
      </div>
      <div
        style={{
          width: 106.72,
          height: 23.12,
          left: 398,
          top: 683,
          position: 'absolute',
          color: '#D5D4D4',
          fontSize: 21,
          fontFamily: 'Readex Pro',
          fontWeight: '300',
          wordWrap: 'break-word'
        }}
      >
        Password
      </div>

      {/* Underline Element from Figma */}
      <div
        style={{
          width: 737,
          height: 0,
          left: 388,
          top: 370,
          position: 'absolute',
          outline: '1px #D5D4D4 solid',
          outlineOffset: '-0.50px'
        }}
      ></div>

      {/* Form with Input Boxes */}
      <form onSubmit={handleRegisterSubmit}>
        {/* Email Input Box */}
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder=""
          style={{
            width: 730,
            height: 65,
            left: 391,
            top: 473,
            position: 'absolute',
            background: 'rgba(244,248,250,0.8)',
            borderRadius: 15,
            border: '1px solid black',
            paddingLeft: 10,
            fontSize: 20,
            fontFamily: 'Readex Pro'
          }}
        />
        {/* Username Input Box */}
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder=""
          style={{
            width: 730,
            height: 65,
            left: 391,
            top: 596,
            position: 'absolute',
            background: 'rgba(244,248,250,0.8)',
            borderRadius: 15,
            border: '1px solid black',
            paddingLeft: 10,
            fontSize: 20,
            fontFamily: 'Readex Pro'
          }}
        />
        {/* Password Input Box */}
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder=""
          style={{
            width: 730,
            height: 65,
            left: 391,
            top: 728,
            position: 'absolute',
            background: 'rgba(244,248,250,0.8)',
            borderRadius: 15,
            border: '1px solid black',
            paddingLeft: 10,
            fontSize: 20,
            fontFamily: 'Readex Pro'
          }}
        />
        {/* Register Button */}
        <div
          style={{
            width: 184,
            height: 62,
            left: 937,
            top: 851,
            position: 'absolute',
            background: 'linear-gradient(90deg, #300101 6%, #3A0202 20%, #410202 27%, #480202 35%, #510202 48%, #690303 62%, #740303 73%, #7B0303 84%, #960404 95%)',
            overflow: 'hidden',
            borderRadius: 15,
            outline: '1px #120000 solid',
            outlineOffset: '-1px',
            cursor: 'pointer'
          }}
          onClick={handleRegisterSubmit}
        >
          <div
            style={{
              left: 50,
              top: 18,
              position: 'absolute',
              color: '#EAD8D8',
              fontSize: 21,
              fontFamily: 'Inter',
              fontWeight: '800',
              wordWrap: 'break-word'
            }}
          >
            Register
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
