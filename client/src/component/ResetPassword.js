import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import '../App.css';
import axios from 'axios';

const ResetPassword = () => {
  const { REACT_APP_BASE_URL } = process.env;
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate();
  const location = useLocation();

  const resetPasswordHandler = async (e) => {
    e.preventDefault();
    if (password == confirmPassword) {
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json',
          },
        };
        const data = { password: password, email: location.state.email };
        const body = JSON.stringify(data);
        const res = await axios.post(
          `${REACT_APP_BASE_URL}/api/login/resetpassword`,
          body,
          config
        );
        console.log(res.message);
        setSuccess('Password reset successfully');
        // window.location="/login";

        setTimeout(() => {
          setSuccess('');
          navigate('/login');
        }, 3000);
      } catch (error) {
        if (
          error.response &&
          error.response.status >= 400 &&
          error.response.status <= 500
        ) {
          setError(error.response.data.message);
        }
        setTimeout(() => {
          setError('');
        }, 3000);
      }
    } else {
      setError("Password doesn't matched");
      setTimeout(() => {
        setError('');
      }, 3000);
    }
  };
  return (
    <div className='resetpassword-screen'>
      <form
        onSubmit={resetPasswordHandler}
        className='resetpassword-screen__form'
      >
        {error && <span className='error_msg my-5'>{error}</span>}
        {success && <span className='success_msg my-5'>{success}</span>}

        <h3 className='resetpassword-screen__title mt-5'>
          Reset your Password
        </h3>

        <div className='form-group'>
          <input
            className='input'
            type='text'
            required
            id='password'
            placeholder='Enter new password'
            autoComplete='true'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <input
            className='input'
            type='text'
            required
            id='confirmpassword'
            placeholder='Confirm new password'
            autoComplete='true'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button type='submit' className='btn btn-primary'>
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
