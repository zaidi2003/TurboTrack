import React from 'react';
import { Link } from 'react-router-dom';

const Locked = () => {
  return (
    <div
      style={{
        width: 1512,
        height: 982,
        position: 'relative',
        backgroundImage: 'url("/bg-wp.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: '#F7F4F1',
        overflow: 'hidden',
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
          background:
            'linear-gradient(90deg, black 26%, #1B1B1B 53%, #1F1F1F 74%, #242424 83%, #272727 93%)',
          border: '1px solid black',
        }}
      />
      <div
        style={{
          width: 1512,
          height: 65,
          left: 0,
          top: 120,
          position: 'absolute',
          background:
            'linear-gradient(90deg, #300101 6%, #3A0202 20%, #410202 27%, #480202 35%, #510202 48%, #690303 62%, #740303 73%, #7B0303 84%, #960404 95%)',
          border: '1px solid black',
        }}
      />
      <div
        style={{
          width: 1512,
          height: 10,
          left: -1,
          top: 115,
          position: 'absolute',
          background:
            'linear-gradient(90deg, #300101 6%, #3A0202 20%, #410202 27%, #480202 35%, #510202 48%, #690303 62%, #740303 73%, #7B0303 84%, #960404 95%)',
          border: '1px solid black',
        }}
      />

      {/* Added Link to the main landing page */}
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
            wordWrap: 'break-word',
            cursor: 'pointer',
          }}
        >
          turbotrack
        </div>
      </Link>
      <div
        style={{
          left: 658,
          top: 149,
          position: 'absolute',
          color: '#C9C0C0',
          fontSize: 20,
          fontFamily: 'Readex Pro',
          fontWeight: '700',
          wordWrap: 'break-word',
        }}
      >
        Sign in
      </div>
      <div
        style={{
          width: 111,
          height: 6,
          left: 638,
          top: 179,
          position: 'absolute',
          background: '#B81515',
        }}
      />
      <Link
        to="/register"
        style={{
          left: 792,
          top: 149,
          position: 'absolute',
          color: '#D5D4D4',
          fontSize: 20,
          fontFamily: 'Readex Pro',
          fontWeight: '400',
          wordWrap: 'break-word',
          textDecoration: 'none',
        }}
      >
        Register
      </Link>

      {/* Main Heading */}
      <div
        style={{
          left: 538,
          top: 293,
          position: 'absolute',
          textAlign: 'center',
          color: '#D5D4D4',
          fontSize: 35,
          fontFamily: 'Readex Pro',
          fontWeight: '700',
          letterSpacing: 2.75,
          wordWrap: 'break-word',
        }}
      >
        Welcome Back
      </div>
      {/* Underline Element */}
      <div
        style={{
          width: 737,
          height: 0,
          left: 388,
          top: 370,
          position: 'absolute',
          outline: '1px var(--cream, #F7F4F1) solid',
          outlineOffset: '-0.50px',
        }}
      ></div>

      {/* Form and Labels */}
      <form>
        {/* Email Label */}
        <div
          style={{
            left: 400,
            top: 460,
            position: 'absolute',
            color: '#D5D4D4',
            fontSize: 18,
            fontFamily: 'Readex Pro',
            fontWeight: '300',
            wordWrap: 'break-word',
          }}
        >
          Email address
        </div>
        {/* Email Input Box */}
        <input
          type="email"
          name="email"
          style={{
            width: 730,
            height: 65,
            left: 391,
            top: 491,
            position: 'absolute',
            background: 'rgba(244,248,250,0.8)',
            borderRadius: 15,
            border: '1px solid black',
            paddingLeft: 10,
            fontSize: 20,
            fontFamily: 'Readex Pro',
          }}
        />
        {/* Password Label */}
        <div
          style={{
            width: 106.72,
            height: 23.12,
            left: 400,
            top: 610,
            position: 'absolute',
            color: '#D5D4D4',
            fontSize: 18,
            fontFamily: 'Readex Pro',
            fontWeight: '300',
            wordWrap: 'break-word',
          }}
        >
          Password
        </div>
        {/* Password Input Box */}
        <input
          type="password"
          name="password"
          style={{
            width: 730,
            height: 65,
            left: 391,
            top: 645,
            position: 'absolute',
            background: 'rgba(244,248,250,0.8)',
            borderRadius: 15,
            border: '1px solid black',
            paddingLeft: 10,
            fontSize: 20,
            fontFamily: 'Readex Pro',
          }}
        />

        {/* Sign In Button */}
        <div
          style={{
            width: 184,
            height: 62,
            left: 391,
            top: 750,
            position: 'relative',
            background:
              'linear-gradient(90deg, #300101 6%, #3A0202 20%, #410202 27%, #480202 35%, #510202 48%, #690303 62%, #740303 73%, #7B0303 84%, #960404 95%)',
            overflow: 'hidden',
            borderRadius: 15,
            outline: '1px #120000 solid',
            outlineOffset: '-1px',
            cursor: 'pointer',
          }}
        >
          <div
            style={{
              left: 57,
              top: 18,
              position: 'absolute',
              color: '#EAD8D8',
              fontSize: 21,
              fontFamily: 'Inter',
              fontWeight: '700',
              wordWrap: 'break-word',
            }}
          >
            Sign in
          </div>
        </div>

        {/* Bottom Links */}
        <div
          style={{
            left: 579,
            top: 899,
            position: 'absolute',
            color: '#D5D4D4',
            fontSize: 20.06,
            fontFamily: 'Readex Pro',
            fontWeight: '400',
            wordWrap: 'break-word',
          }}
        >
          Don’t have an account?
        </div>
        <Link
          to="/register"
          style={{
            left: 805.78,
            top: 899.87,
            position: 'absolute',
            color: '#C8C0C0',
            fontSize: 19.63,
            fontFamily: 'Readex Pro',
            fontWeight: '600',
            textDecoration: 'underline',
            wordWrap: 'break-word',
          }}
        >
          Register now
        </Link>
        <Link
          to="/forgot-password"
          style={{
            left: 946,
            top: 758,
            position: 'absolute',
            color: '#D5D4D4',
            fontSize: 20.05,
            fontFamily: 'Readex Pro',
            fontWeight: '500',
            textDecoration: 'underline',
            wordWrap: 'break-word',
          }}
        >
          Forgot Password?
        </Link>
      </form>
    </div>
  );
};

export default Locked;
