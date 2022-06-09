import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';
import axios from 'axios';

const ForgotPassword = () => {
  const {REACT_APP_BASE_URL} = process.env;
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate();

  const forgotPasswordHandler = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const res = await axios.post(
        `${REACT_APP_BASE_URL}/api/login/forgotpassword`,
        { email },
        config
      );
      console.log('code from server', res.data.data);
      setCode(res.data.data);
      setSuccess('Verification code sent successfully');
      // navigate('/verificationpage', {
      //   state: { email: email, code: res.data.data },
      // });
      setTimeout(() => {
        setSuccess('');
        navigate('/verificationpage', {
          state: { email: email, code: res.data.data },
        });
      }, 3000);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setEmail('');
        setError(error.response.data.message);
      }
      setTimeout(() => {
        setError('');
      }, 3000);
    }
  };

  return (
    <div className='forgotpassword-screen'>
      <form
        onSubmit={forgotPasswordHandler}
        className='forgotpassword-screen__form'
      >
      {error && <span className='error_msg mb-3'>{error}</span>}
      {success && <span className='success_msg mb-5'>{success}</span>}
        <h2 className='forgotpassword-screen__title mt-5'>Forgot Password</h2>

        <div className='form-group '>
          <p className='forgotpassword-screen__subtext'>
            Please enter the email that you've registered with. 
            Get the 4 digit number to reset the password
          </p>

          <input
            className='input'
            type='email'
            required
            placeholder='Enter your Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      
        <button type='submit' className='btn btn-primary'>
          Send Email
        </button>
      
      </form>
    </div>
  );
};

export default ForgotPassword;
