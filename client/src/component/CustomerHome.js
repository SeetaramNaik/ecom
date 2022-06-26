import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';
import '../App.css';
import AllProducts from './AllProducts';
import axios from 'axios';

const CustomerHome = () => {
  const { REACT_APP_BASE_URL } = process.env;
  const [item, setItem] = useState([]);
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location = '/login';
  };
  const res = JSON.parse(localStorage.getItem('token'));
  useEffect(() => {
    axios
      .get(`${REACT_APP_BASE_URL}/api/allorders`)
      .then((item) => {
        console.log(item.data.data);
        setItem(item.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <nav className={styles.navbar}>
        <h1>Welcome {res.data.user.name}!</h1>
        <div className='nav-btn'>
          <button className={styles.logout_btn} onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>
      <div className='home_container_prod'>
        {item
          .filter(items=>items.verified=='yes')
          .map((items, index) => (
          <AllProducts key={index} product={items} />
        ))}
      </div>
    </div>
  );
};

export default CustomerHome;
