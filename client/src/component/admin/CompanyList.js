import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles.module.css';
import '../../App.css';
import axios from 'axios';

const CompanyList = () => {
    const { REACT_APP_BASE_URL } = process.env;
    const [company, setCompany] = useState([]);
    const handleLogout = () => {
      localStorage.removeItem('token');
      window.location = '/login';
    };
    useEffect(() => {
        axios
          .get(`${REACT_APP_BASE_URL}/api/users/allCompanyUsers`)
          .then((user) => {
            console.log(user.data.data);
            setCompany(user.data.data);
          })
          .catch((err) => {
            console.log(err);
          });
      }, []);
      console.log(company);
  return (
    <div className='all-comp-list'>
    <div className='admin-nav'>
    <div className='adm-txt'>
      <h3>Admin Portal</h3>
    </div>

    <div className='nav-btns'>
      <div className='nav-btn'>
      
        <Link to='/customerlist' className='comp-list'>
          Customers
        </Link>
        <button className={styles.logout_btn} onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  </div>
  <div className='home_container_prod'>
  {company.map((user, index) => (
     <h3 key={index}>{user.name} </h3>
   ))} 
 </div>

    </div>
  )
}

export default CompanyList