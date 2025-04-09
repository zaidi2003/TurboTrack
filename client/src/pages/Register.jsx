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
          width: '100%',
          height: 10,
          left: -1,
          top: '11.5%',
          position: 'absolute',
          background: 'linear-gradient(90deg, #300101 6%, #3A0202 20%, #410202 27%, #480202 35%, #510202 48%, #690303 62%, #740303 73%, #7B0303 84%, #960404 95%)',
          border: '1px solid black'
        }}
      />
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
            wordWrap: 'break-word'
          }}
        >
          turbotrack
        </div>
      </Link>
      <Link
        to="/login"
        style={{
          left: '42%',
          top: '15%',
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
          left: '50%',
          top: '18%',
          position: 'absolute',
          background: '#B81515'
        }}
      />
      <div
        style={{
          left: '51%',
          top: '15%',
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
          left: '50%',
          top: '28%',
          position: 'absolute',
          textAlign: 'center',
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
        Create Account
      </div>

      {/* Labels */}
      <div
        style={{
          left: '25.5%',
          top: '44%',
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
          left: '25.5%',
          top: '59%',
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
          left: '25.5%',
          top: '74%',
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
          width: '50%',
          height: 0,
          left: '25%',
          top: '38%',
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
            left: '25%',
            top: '48%',
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
            left: '25%',
            top: '63%',
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
            left: '25%',
            top: '78%',
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
            left: '63%',
            top: '89%',
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
      {/* Add "Need a business account?" link */}
      <div
          style={{
            left: '43%',
            top: '97%',
            position: 'absolute',
            transform: 'translateX(-50%)',
            textAlign: 'center',
            color: '#D5D4D4',
            fontSize: 'clamp(14px, 1.3vw, 18px)',
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
            left: '57%',
            top: '97%',
            position: 'absolute',
            transform: 'translateX(-50%)',
            textAlign: 'center',
            color: '#C8C0C0',
            fontSize: 'clamp(14px, 1.3vw, 18px)',
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
  );
};

export default Register;
