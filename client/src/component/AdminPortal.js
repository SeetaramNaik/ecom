import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.module.css';
import '../App.css';
import AllProducts from '.././component/admin/AllProducts';
import axios from 'axios';

const AdminPortal = () => {
  const { REACT_APP_BASE_URL } = process.env;
  const [item, setItem] = useState([]);
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location = '/login';
  };
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
    <div className='adminportal'>
      <div className='admin-nav'>
        <div className='adm-txt'>
          <h3>Admin Portal</h3>
        </div>

        <div className='nav-btns'>
          <div className='nav-btn'>
            <Link to='/customerlist' className='cust-list'>
              Customers
            </Link>
            <Link to='/companylist' className='comp-list'>
              Companies
            </Link>
            <button className={styles.logout_btn} onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </div>


      <div className='home_container_prod'>
      {item.map((items, index) => (
        <AllProducts key={index} product={items} />
      ))}
    </div>
    </div>
  );
};

export default AdminPortal;
