import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles.module.css';
import '../../App.css';
import './styles.css';
import axios from 'axios';
import CustomerDetail from '../admin/CustomerDetail';

const CustomerList = () => {
  const { REACT_APP_BASE_URL } = process.env;
  const [customer, setCustomer] = useState([]);
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location = '/login';
  };
  useEffect(() => {
    axios
      .get(`${REACT_APP_BASE_URL}/api/users/allCustomerUsers`)
      .then((user) => {
        console.log(user.data.data);
        setCustomer(user.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log(customer);
  return (
    <div className='all-cust-list'>
      <div className='admin-nav'>
          <Link className='adm-txt' to='/adminportal'>
            <h3>Admin Portal</h3>
          </Link>
    

        <div className='nav-btns'>
          <div className='nav-btn'>
            <Link to='/companylist' className='comp-list'>
              Companies
            </Link>
            <button className={styles.logout_btn} onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </div>
      <h2>All customers details are listed below</h2>

      <div className='all-cust-detail'>
        {customer.map((user, index) => (
          <CustomerDetail key={index} user={user} />
        ))}
      </div>
    </div>
  );
};

export default CustomerList;
