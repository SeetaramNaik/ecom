import React, { useState } from 'react';
import '../../App.css';
import styles from '../styles.module.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AllProducts = ({ product, getItemData }) => {
  const [verification, setVerification] = useState(false);
  const { REACT_APP_BASE_URL } = process.env;
  const [individualItem, setIndividualItem] = useState({});
  const [error, setError] = useState('');
  const {
    _id,
    useremail,
    itemname,
    itemquantity,
    quantity_measure,
    itemprice,
    newprice,
    expecteddate,
    verified,
  } = product;
  var name = useremail.substring(0, useremail.lastIndexOf('@'));
  function daysLeft(date) {
    var date2 = new Date(date);
    let currentDate = Date.now();
    var Difference_In_Time = date2 - currentDate;
    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
    date2 = Math.round(Difference_In_Days);
    if (date2 < 0) {
      return 0;
    } else {
      return date2;
    }
  }



  return (
    <div className={styles.itemcard}>
      <h5 className='card-title'>
        <span className={styles.quantity}>{itemname.toUpperCase()}{verified=='yes'?'✅':''}</span>
        <br />
        <p>
          For<h4>{name}</h4>
        </p>
      </h5>
      <h5 className='card-title'>
        Quantity:{' '}
        <span className={styles.quantity}>
          {itemquantity} {quantity_measure}
        </span>
      </h5>
      <h5 className='card-title'>
        ₹<span className={styles.price}>{itemprice}</span>+<span className={styles.price}>{newprice-itemprice}</span>
      </h5>
      <h5 className='card-title'>Total: ₹<span className={styles.price}>{newprice}</span></h5>
      <h5 className='card-text'>{daysLeft(expecteddate)} Days left</h5>
   
      <Link to='/single-product' state={{ from: product }}>
        <button className='btn mt-3 item-btn' name={_id} onClick={getItemData}>
          Update Price
        </button>
      </Link>
    </div>
  );
};

export default AllProducts;
