import React, { useState } from 'react';
import { useLocation, useNavigate,Link } from 'react-router-dom';
import '../App.css';

const VerificationPage = () => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [verificationCode, setVerificationCode] = useState('');

  const navigate = useNavigate();
  const location = useLocation();

  
  const verificationCodeHandler = async (e) => {
    e.preventDefault();
    try {
      if (verificationCode == location.state.code) {
        setSuccess('Verified');
        setTimeout(() => {
          setSuccess('');
          navigate('/resetpassword', { state: { email: location.state.email } });
        }, 3000);
      }
      else{
        setError("Enter the code correctly");
        setTimeout(() => {
          setError('');
        }, 3000);
      }
    } catch (error) {
      setError('Enter the code correctly');
      setTimeout(() => {
        setError('');
      }, 3000);
    }
  };
  return (
    <div className='forgotpassword-screen'>
   

      <form
        onSubmit={verificationCodeHandler}
        className='forgotpassword-screen__form'
      >
      {error && <span className='error_msg'>{error}</span>}
      {success && <span className='success_msg'>{success}</span>}
        <h2 className='forgotpassword-screen__title mt-5'>Verification</h2>

        <div className='form-group'>
          <p className='forgotpassword-screen__subtext mt-5'>
            The verification code has been sent to {location.state.email}
            <br />
            Please enter the code to reset your password
          </p>

          {/*<h4>{location.state.code}</h4>*/}
          

          <input
            className='input'
            type='text'
            required
            placeholder='Enter your verification code'
            maxLength={4}
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
          />
        </div>
        <button type='submit' className='btn btn-primary'>
          Verify
        </button>
      
      </form>
    </div>
  );
};

export default VerificationPage;
