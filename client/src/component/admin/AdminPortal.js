import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles.module.css';
import '../../App.css';
import AllProducts from './AllProducts';
import UpdateProdCard from './UpdateProdCard';
import axios from 'axios';

const AdminPortal = () => {
  const { REACT_APP_BASE_URL } = process.env;
  const [item, setItem] = useState([]);
  const [id, setId] = useState('');
  const [update, setUpdate] = useState(false);
  const [modal, setModal] = useState(false);
  const [individualItem, setIndividualItem] = useState({});
  const [error, setError] = useState('');
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location = '/login';
  };
  useEffect(() => {
    axios
      .get(`${REACT_APP_BASE_URL}/api/allorders`)
      .then((item) => {
        // console.log(item.data.data);
        setItem(item.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  // console.log('This is item state', item);

  // const editPrice = (e) => {
  //   setId(e.target.name);
  //   setModal(true);
  // };

  const updatePrice = () => {
    setUpdate(!update);
  };

  const closeHandler = () => {
    setId('');
    setModal(false);
  };

  const getIndividualItemData = async (e) => {
    setId(e.target.name);
   
    // console.log('This is button ID:',e.target.name);
    // console.log('This is state ID:',id);
 
    try {
      const res = await axios.get(
        `${REACT_APP_BASE_URL}/api/companyorder/individualorder/${e.target.name}`
      );
      // console.log('This is server data', res.data.data);
      setIndividualItem(res.data.data);
      setModal(true);
      // console.log('This is state data:', individualItem);
    } catch (err) {
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
  // console.log('This is modal:',modal);

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
          <AllProducts key={index} product={items} getItemData={getIndividualItemData} />
        ))}
      </div>
{/*

     {modal ? (
        <section className='update-container'>
         

          <div className='update-todo-data'>
            <p onClick={closeHandler} className='close'>
              &times;
            </p>
            <UpdateProdCard
              _id={id}
              closeHandler={closeHandler}
              updatePrice={updatePrice}
              item={individualItem}
            />
          </div>
        </section>
      ) : (
        ''
      )}

*/}
    </div>
  );
};

export default AdminPortal;
