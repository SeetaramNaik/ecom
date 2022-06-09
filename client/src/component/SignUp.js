import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './styles.module.css';
import axios from 'axios';

const SignUp = () => {
  const { REACT_APP_BASE_URL } = process.env;

  const [typeOfUser, setTypeOfUser] = useState('');

  const [data, setData] = useState({
    // type: typeOfUser,
    name: '',
    gstin: '',
    address: '',
    phone: '',
    email: '',
    password: '',
  });

  const [custdata, setcustData] = useState({
    // type: typeOfUser,
    name: '',
    address: '',
    phone: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleChange = (e) => {
    // setData({ ...data, [e.target.name]: e.target.value });
    if (typeOfUser == 'customer') {
      setcustData({ ...custdata, [e.target.name]: e.target.value });
    } else {
      setData({ ...data, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    console.log(typeOfUser);
    e.preventDefault();
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      if (typeOfUser == 'company') {
        const body = JSON.stringify(data);

        const res = await axios.post(
          `${REACT_APP_BASE_URL}/api/register/companyregister`,
          body,
          config
        );
        navigate('/login');
        console.log(res.message);
      } else {
        const body = JSON.stringify(custdata);

        const res = await axios.post(
          `${REACT_APP_BASE_URL}/api/register/customerregister`,
          body,
          config
        );
        navigate('/login');
        console.log(res.message);
      }
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  const handleType = (e) => {
    if (e.target.value == 'customer') {
      document.getElementById('gstin_input').style.display = 'none';
    } else {
      document.getElementById('gstin_input').style.display = 'block';
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
    <div className={styles.signup_container}>
      <div className={styles.signup_form_container}>
        <div className={styles.signup_left}>
          <h1>Welcome back</h1>
          <Link to='/login'>
            <button type='button' className={styles.white_btn}>
              Sign In
            </button>
          </Link>
        </div>
        <div className={styles.signup_right}>
          <form className={styles.form_container} onSubmit={handleSubmit}>
            {error && <div className={styles.error_msg}>{error}</div>}
            <h1>Create Account</h1>
            <div class='input-group mb-2 mr-sm-2'>
              <select
                class='custom-select'
                name='type'
                value={typeOfUser}
                className={styles.input}
                onChange={(e) => setTypeOfUser(e.target.value)}
                required
                onClick={handleType}
              >
                <option selected disabled>
                  Choose user Type
                </option>
                <option value='customer'>Customer</option>
                <option value='company'>Company</option>
              </select>
            </div>

            <div class='input-group mb-2 mr-sm-2'>
              <input
                type='text'
                name='name'
                //value={data.name}
                onChange={handleChange}
                required
                className='form-control input'
                id='inlineFormInputGroupUsername2'
                placeholder='Enter name'
              />
            </div>

            <div class='input-group mb-2 mr-sm-2'>
              <input
                type='text'
                name='gstin'
                //value={data.name}
                onChange={handleChange}
                maxLength={15}
                className='form-control input'
                id='gstin_input'
                placeholder='Enter GSTIN'
              />
            </div>

            <div class='input-group mb-2 mr-sm-2'>
              <input
                type='text'
                name='address'
                //value={data.name}
                onChange={handleChange}
                className='form-control input'
                placeholder='Enter your current address'
                required
              />
            </div>

            <div class='input-group mb-2 mr-sm-2'>
              <input
                type='text'
                pattern='^[0-9]{10}$'
                maxLength={10}
                name='phone'
                //value={data.name}
                onChange={handleChange}
                className='form-control input'
                placeholder='Enter phone number'
                required
              />
            </div>

            <div class='input-group mb-2 mr-sm-2'>
              <input
                type='email'
                name='email'
                //value={data.name}
                onChange={handleChange}
                className='form-control input'
                placeholder='Enter your email'
                required
              />
            </div>

            <div class='input-group mb-2 mr-sm-2'>
              <input
                type='password'
                name='password'
                className='form-control input'
                id='password'
                //value={data.password}
                onChange={handleChange}
                required
                placeholder='Password'
              />
              <div class='input-group-prepend px-2'>
                <span
                  className='py-2 px-2 input'
                  type='button'
                  onClick={viewPassword}
                >
                  👁️‍🗨️
                </span>
              </div>
            </div>

            <button type='submit' className={styles.green_btn}>
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
