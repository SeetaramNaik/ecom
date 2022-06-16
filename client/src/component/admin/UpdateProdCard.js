import React, { useState } from 'react';
import axios from 'axios';
import './styles.css';
import styles from '../styles.module.css';

const UpdateProdCard = ({ _id, closeHandler, updatePrice, item }) => {
  const { useremail, itemname, itemquantity, itemprice, expecteddate } = item;

  const [price, setPrice] = useState({
    itemPrice: itemprice,
    verified: '',
  });

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

  const handleChange = (e) => {
    setPrice((data) => ({ ...data, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
     {/* 
    <form
        className='form-container'
        onSubmit={(e) => {
          handleSubmit(e);
          updatePrice();
          closeHandler();
        }}
      >
        <div className={styles.itemcard}>
          <h5 className='card-title'>
            <span className={styles.quantity}>{itemname.toUpperCase()}</span>
            <br />
            <p>
              For<h4>{name}</h4>
            </p>
          </h5>
          <h5 className='card-title'>
            Quantity: <span className={styles.quantity}>{itemquantity}</span>
          </h5>
          <h5 className='card-title'>
            ₹<span className={styles.price}>{itemprice}</span>/item
          </h5>
          <h5 className='card-text'>{daysLeft(expecteddate)} Days left</h5>
        </div>
      </form>
    */} 
    <h3>Hello</h3>

    </div>
  );
};

export default UpdateProdCard;
