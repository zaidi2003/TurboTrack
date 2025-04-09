import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const BecomeAPartner = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    businessName: '',
    email: '',
    phone: '',
    businessAddress: '',
    bankName: '',
    accountOwner: '',
    iban: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add API call here to submit the form data
  };

  return (
    <div
      style={{
        width: '100%',
        minHeight: '100vh',
        position: 'relative',
        backgroundImage: 'url("/bg-wp.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: '#000000',
        overflow: 'hidden'
      }}
    >
      {/* Header with Logo */}
      <div
        style={{
          width: '100%',
          height: 100,
          padding: '20px 40px',
          background: 'linear-gradient(90deg, black 26%, #1B1B1B 53%, #1F1F1F 74%, #242424 83%, #272727 93%)',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <Link to="/" style={{ textDecoration: 'none' }}>
          <div
            style={{
              color: '#D5D4D4',
              fontSize: 30,
              fontFamily: 'Zen Dots, cursive',
              fontWeight: '400',
              letterSpacing: 3,
              cursor: 'pointer'
            }}
          >
            turbotrack
          </div>
        </Link>
      </div>

      {/* Red Bar with "Become a Partner" */}
      <div
        style={{
          width: '100%',
          height: 50,
          background: 'linear-gradient(90deg, #300101 6%, #3A0202 20%, #410202 27%, #480202 35%, #510202 48%, #690303 62%, #740303 73%, #7B0303 84%, #960404 95%)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: '#ffffff',
          fontSize: 20,
          fontFamily: 'Readex Pro, sans-serif',
          fontWeight: '600'
        }}
      >
        Become a Partner
      </div>

      {/* Form Container */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          padding: '40px 20px',
          flexWrap: 'wrap',
          gap: '20px'
        }}
      >
        <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '1200px' }}>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '20px',
              justifyContent: 'space-between'
            }}
          >
            {/* Owner Details Column */}
            <div
              style={{
                flex: '1 1 45%',
                minWidth: '300px',
                padding: '20px',
                background: 'linear-gradient(90deg, black 26%, #1B1B1B 53%, #1F1F1F 74%, #242424 83%, #272727 93%)',
                opacity: 0.8,
                borderRadius: 34.13
              }}
            >
              <div
                style={{
                  textAlign: 'center',
                  color: '#C9C0C0',
                  fontSize: 36.53,
                  fontFamily: 'Readex Pro, sans-serif',
                  fontWeight: '700',
                  letterSpacing: 1.83,
                  marginBottom: '15px'
                }}
              >
                Owner Details
              </div>
              <div
                style={{
                  width: '80%',
                  height: 0,
                  margin: '0 auto 30px',
                  opacity: 0.5,
                  borderBottom: '1.14px solid #F7F4F1'
                }}
              ></div>

              {/* Input Fields */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <input
                  type="text"
                  name="fullName"
                  placeholder="First & Last Name as per CNIC"
                  value={formData.fullName}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    height: 65,
                    padding: '0 20px',
                    opacity: 0.6,
                    background: '#C8DCE4',
                    borderRadius: 15,
                    border: '1px solid black',
                    fontSize: 18,
                    fontFamily: 'Readex Pro, sans-serif',
                    fontWeight: '200',
                    color: '#000000'
                  }}
                />

                <input
                  type="text"
                  name="businessName"
                  placeholder="Business Name"
                  value={formData.businessName}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    height: 65,
                    padding: '0 20px',
                    opacity: 0.6,
                    background: '#C8DCE4',
                    borderRadius: 15,
                    border: '1px solid black',
                    fontSize: 18,
                    fontFamily: 'Readex Pro, sans-serif',
                    fontWeight: '200',
                    color: '#000000'
                  }}
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Business Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    height: 65,
                    padding: '0 20px',
                    opacity: 0.6,
                    background: '#C8DCE4',
                    borderRadius: 15,
                    border: '1px solid black',
                    fontSize: 18,
                    fontFamily: 'Readex Pro, sans-serif',
                    fontWeight: '200',
                    color: '#000000'
                  }}
                />

                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    height: 65,
                    padding: '0 20px',
                    opacity: 0.6,
                    background: '#C8DCE4',
                    borderRadius: 15,
                    border: '1px solid black',
                    fontSize: 18,
                    fontFamily: 'Readex Pro, sans-serif',
                    fontWeight: '200',
                    color: '#000000'
                  }}
                />
              </div>
            </div>

            {/* Business Stuff Column */}
            <div
              style={{
                flex: '1 1 45%',
                minWidth: '300px',
                padding: '20px',
                background: 'linear-gradient(90deg, black 26%, #1B1B1B 53%, #1F1F1F 74%, #242424 83%, #272727 93%)',
                opacity: 0.8,
                borderRadius: 34.13
              }}
            >
              <div
                style={{
                  textAlign: 'center',
                  color: '#C9C0C0',
                  fontSize: 36.53,
                  fontFamily: 'Readex Pro, sans-serif',
                  fontWeight: '700',
                  letterSpacing: 1.83,
                  marginBottom: '15px'
                }}
              >
                Business Stuff
              </div>
              <div
                style={{
                  width: '80%',
                  height: 0,
                  margin: '0 auto 30px',
                  opacity: 0.5,
                  borderBottom: '1.14px solid #F7F4F1'
                }}
              ></div>

              {/* Input Fields */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <input
                  type="text"
                  name="businessAddress"
                  placeholder="Business Address"
                  value={formData.businessAddress}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    height: 65,
                    padding: '0 20px',
                    opacity: 0.6,
                    background: '#C8DCE4',
                    borderRadius: 15,
                    border: '1px solid black',
                    fontSize: 18,
                    fontFamily: 'Readex Pro, sans-serif',
                    fontWeight: '200',
                    color: '#000000'
                  }}
                />

                <input
                  type="text"
                  name="bankName"
                  placeholder="Bank Name"
                  value={formData.bankName}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    height: 65,
                    padding: '0 20px',
                    opacity: 0.6,
                    background: '#C8DCE4',
                    borderRadius: 15,
                    border: '1px solid black',
                    fontSize: 18,
                    fontFamily: 'Readex Pro, sans-serif',
                    fontWeight: '200',
                    color: '#000000'
                  }}
                />

                <input
                  type="text"
                  name="accountOwner"
                  placeholder="Bank Account Owner/Title"
                  value={formData.accountOwner}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    height: 65,
                    padding: '0 20px',
                    opacity: 0.6,
                    background: '#C8DCE4',
                    borderRadius: 15,
                    border: '1px solid black',
                    fontSize: 18,
                    fontFamily: 'Readex Pro, sans-serif',
                    fontWeight: '200',
                    color: '#000000'
                  }}
                />

                <input
                  type="text"
                  name="iban"
                  placeholder="IBAN"
                  value={formData.iban}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    height: 65,
                    padding: '0 20px',
                    opacity: 0.6,
                    background: '#C8DCE4',
                    borderRadius: 15,
                    border: '1px solid black',
                    fontSize: 18,
                    fontFamily: 'Readex Pro, sans-serif',
                    fontWeight: '200',
                    color: '#000000'
                  }}
                />
              </div>
            </div>
          </div>

          {/* Get Started Button */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '30px' }}>
            <button
              type="submit"
              style={{
                width: 184,
                height: 62,
                background: 'linear-gradient(90deg, #300101 6%, #3A0202 20%, #410202 27%, #480202 35%, #510202 48%, #690303 62%, #740303 73%, #7B0303 84%, #960404 95%)',
                borderRadius: 15,
                border: '1px solid #120000',
                color: '#EAD8D8',
                fontSize: 21,
                fontFamily: 'Inter, sans-serif',
                fontWeight: '700',
                cursor: 'pointer'
              }}
            >
              Get Started
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BecomeAPartner;