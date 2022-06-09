import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.module.css';
import axios from 'axios';
import '../App.css';

const Login = () => {
  const {REACT_APP_BASE_URL} = process.env;
  const [route, setRoute] = useState('');
  const [data, setData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const body = JSON.stringify(data);

      const res = await axios.post(
        `${REACT_APP_BASE_URL}/api/login`,
        body,
        config
      );
      console.log('response form server', res.data);
      localStorage.setItem('token', JSON.stringify(res.data));
      if (res.data.data.type == 'company') {
        window.location = '/companyhome';
      } else {
        window.location = '/customerhome';
      }

      // window.location = route;
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
  };

  const [viewPass, setViewPass] = useState(false);
  function viewPassword() {
    setViewPass(!viewPass);
    if (viewPass) {
      document.getElementById('password').type = 'text';
    } else {
      document.getElementById('password').type = 'password';
    }
  }

  return (
    <div className={styles.login_container}>
      <div className={styles.login_form_container}>
        <div className={styles.login_left}>
          <form className={styles.form_container} onSubmit={handleSubmit}>
            {error && <div className={styles.error_msg}>{error}</div>}
            <h1>Login to your Account</h1>
            

            <div class='input-group mb-2 mr-sm-2'>
              <input
                type='email'
                name='email'
                value={data.email}
                onChange={handleChange}
                required
                className='form-control input'
                id='inlineFormInputGroupUsername2'
                placeholder='Email'
              />
            </div>
            <label class='sr-only' for='inlineFormInputGroupUsername2'>
              Password
            </label>
            <div class='input-group mb-2 mr-sm-2'>
              <input
                type='password'
                name='password'
                className='form-control input'
                id='password'
                value={data.password}
                onChange={handleChange}
                required
                placeholder='Password'
              />
              <div class='input-group-prepend px-2'>
                <span
                  className='py-2 px-2 input'
                  type='button'
                  onClick={viewPassword}
                >👁️‍🗨️</span>
              </div>
            </div>
            <Link
              to='/forgotpassword'
              className='login-screen__forgotpassword'
              tabIndex={4}
            >
              Forgot Password?
            </Link>
          

            <button type='submit' className={styles.green_btn}>
              Sign In
            </button>
          </form>
        </div>
        <div className={styles.login_right}>
          <h1>New Here?</h1>
          <Link to='/signup'>
            <button type='button' className={styles.white_btn}>
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
