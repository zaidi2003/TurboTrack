import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  const [showModal, setShowModal] = useState(false);

  const handleGetStarted = () => {
    setShowModal(true);
  };

console.log('Environment Variable:', import.meta.env.VITE_API_URL);
  return (
    <div
      style={{
        width: '100%',
        minHeight: '100vh',
        position: 'relative',
        background: 'linear-gradient(99deg, #1A1919 16%, #0D0D0D 100%)', overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1rem 4rem',
        }}
      >
        <div
          style={{
            fontSize: '2rem',
            fontFamily: 'Zen Dots',
            letterSpacing: 3,
            fontSize: 30,
            fontWeight: '400',
            color: '#D5D4D4'
          }}
        >
          turbotrack
        </div>
        <div
          style={{
            display: 'flex',
            gap: '2rem',
            alignItems: 'center',
          }}
        >
          <Link to="/about-us" style={{ color: '#ffffff', fontFamily: 'Readex Pro', fontWeight: '200', textDecoration: 'none' }}>About Us</Link>
          <Link to="/services" style={{ color: '#ffffff', fontFamily: 'Readex Pro', fontWeight: '200', textDecoration: 'none' }}>Services</Link>
          <Link 
            to="/login" 
            style={{ 
              color: '#ffffff', 
              textDecoration: 'none', 
              background: 'linear-gradient(90deg, #300101 6%, #3A0202 20%, #410202 27%, #480202 35%, #510202 48%, #690303 62%, #740303 73%, #7B0303 84%, #960404 95%)',
              fontFamily: 'Readex Pro',
              padding: '0.5rem 1.5rem',
              borderRadius: '20px',
              fontSize: '1rem'
            }}
          >
            Login
          </Link>
        </div>
      </div>
      {/* Red Gradient Line */}
      <div 
        style={{
          width: '100%', 
          height: 10.65, 
          background: 'linear-gradient(90deg, #300101 6%, #3A0202 20%, #410202 27%, #480202 35%, #510202 48%, #690303 62%, #740303 73%, #7B0303 84%, #960404 95%)', 
          border: '1px black solid'
        }} 
      />
      <div
        style={{
          flex: 1,
          display: 'flex',
          padding: '4rem',
          position: 'relative',
        }}
      >
        {/* Left Content */}
        <div
          style={{
            zIndex: 2,
            maxWidth: '50%',
          }}
        >
          <h1
            style={{

              fontFamily: 'Readex Pro',
              fontSize: 83,
              display: 'flex', flexDirection: 'column',
              marginBottom: '1rem',
              color: '#DCDCDC',
              fontWeight: '300'
            }}
          >
            Welcome to <br />
            <span style={{ display: 'flex', flexDirection: 'column', color: '#D8D8D8', fontSize: 73, fontFamily: 'Zilla Slab Highlight', fontWeight: '700', letterSpacing: 10.95, wordWrap: 'break-word'}}>turbotrack</span>
          </h1>
          <p
            style={{
              fontSize: 32,
              color: '#EDEDED',
              marginBottom: '2rem',
              fontFamily: 'Readex Pro',
              fontWeight: '200',
              letterSpacing: 3.84,
              wordWrap: 'break-word'
            }}
          >
            a one-stop <span style={{ 
              color: '#CAC4C4',
              fontSize: 32,
              fontFamily: 'Readex Pro',
              fontWeight: '500',
              wordWrap: 'break-word',
              letterSpacing: 3.84 }}>RACE</span>
          </p>
          {/* Get Started Button */}
          <button
          onClick={handleGetStarted}
          style={{
            width: 325.77,
            height: 48.87,
            background: 'linear-gradient(90deg, #300101 6%, #3A0202 20%, #410202 27%, #480202 35%, #510202 48%, #690303 62%, #740303 73%, #7B0303 84%, #960404 95%)',
            border: '1px rgba(134.10, 95.73, 95.73, 0) solid',
            borderRadius: 6,
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div 
            style={{
              color: 'rgba(255, 255, 255, 0.62)', 
              fontSize: 21, 
              fontFamily: 'Readex Pro', 
              fontWeight: '500', 
              letterSpacing: 2.52, 
              wordWrap: 'break-word'
            }}
          >
            Get Started
          </div>
        </button>
        </div>

        {/* Right Content - Image */}
        <div
          style={{
            position: 'absolute',
            right: '10px',
            top: '-0px',
            zIndex: 1,
          }}
        >
          <img 
            style={{
              width: '1300px', 
              height: '750px',
              transform: 'rotate(-2deg)', 
              transformOrigin: 'top left', 
            }} 
            src='/flag.png'

            alt="Racing flag"
          />
        </div>
      </div>

      {/* Modal (conditionally rendered) */}
      {showModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
            padding: '1rem',
          }}
        >
          <div
            style={{
              backgroundColor: '#333333',
              borderRadius: '8px',
              overflow: 'hidden',
              width: '100%',
              maxWidth: '800px',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
            }}
          >
            <div
              style={{
                background: 'linear-gradient(90deg, black 26%, #1B1B1B 53%, #1F1F1F 74%, #242424 83%, #272727 93%)',
                padding: '1.5rem',
              }}
            >
              <h3
                style={{
                  marginBottom: '1rem',
                  fontSize: '1.2rem',
                  color: '#DCDCDC',
                  fontSize: 35, fontFamily: 'Readex Pro', fontWeight: '700', letterSpacing: 3.50
                }}
              >
                some ad thing yapping idk
              </h3>
              <p
                style={{
                  color: '#c4c4c4',
                  fontSize: '0.9rem',
                  background: 'linear-gradient(90deg, black 26%, #1B1B1B 53%, #1F1F1F 74%, #242424 83%, #272727 93%)'
                }}
              >
                some more yappingg etc
              </p>
            </div>
            
            <div
              style={{
                padding: '1.5rem',
                position: 'relative',
              }}
            >
              <h2
                style={{
                  marginBottom: '1rem',
                  fontSize: '1.5rem',
                  fontWeight: '600',
                }}
              >
                What best describes you?
              </h2>
              <p
                style={{
                  color: '#c4c4c4',
                  fontSize: '0.9rem',
                  marginBottom: '1rem',
                }}
              >
                I want to track/manage what's going on here
              </p>
              
              <Link 
                to="/register"
                style={{
                  display: 'block',
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '4px',
                  textAlign: 'center',
                  marginBottom: '1rem',
                  fontWeight: '600',
                  backgroundColor: '#444444',
                  color: '#ffffff',
                  textDecoration: 'none',
                }}
              >
                Register Now
              </Link>
              
              <p
                style={{
                  color: '#c4c4c4',
                  fontSize: '0.9rem',
                  marginBottom: '1rem',
                }}
              >
                I want to use TurboTrack's software to manage bookings for my organization
              </p>
              
              <Link 
                to="/become-a-partner"
                style={{
                  display: 'block',
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '4px',
                  textAlign: 'center',
                  marginBottom: '1rem',
                  fontWeight: '600',
                  background: 'linear-gradient(90deg, #300101 6%, #3A0202 20%, #410202 27%, #480202 35%, #510202 48%, #690303 62%, #740303 73%, #7B0303 84%, #960404 95%)',
                  color: '#ffffff',
                  textDecoration: 'none',
                }}
              >
                Become a Partner
              </Link>
              
              <button
                onClick={() => setShowModal(false)}
                style={{
                  position: 'absolute',
                  top: '0.5rem',
                  right: '0.5rem',
                  background: 'none',
                  border: 'none',
                  color: '#c4c4c4',
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                }}
              >
                ×
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Responsive styles */}
      <style jsx>{`
        @media (max-width: 768px) {
          h1 {
            font-size: 2rem !important;
          }
          
          p {
            font-size: 1.2rem !important;
          }
          
          .main-content {
            flex-direction: column;
            text-align: center;
          }
          
          .left-content {
            padding-right: 0;
            margin-bottom: 2rem;
          }
          
          .modal-content {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Landing;