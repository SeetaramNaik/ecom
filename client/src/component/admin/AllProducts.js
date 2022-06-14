import React from 'react';
import '../../App.css';
import styles from '../styles.module.css';

const AllProducts = ({product}) => {

    const { _id, useremail,itemname, itemquantity, itemprice, expecteddate } = product;
    var name   = useremail.substring(0, useremail.lastIndexOf("@"));
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
        <span className={styles.quantity}>{itemname.toUpperCase()}</span><br/>
        <p>For<h4>{name}</h4></p>
      </h5>
      <h5 className='card-title'>
        Quantity: <span className={styles.quantity}>{itemquantity}</span>
      </h5>
      <h5 className='card-title'>
        ₹<span className={styles.price}>{itemprice}</span>/item
      </h5>
      <h5 className='card-text'>{daysLeft(expecteddate)} Days left</h5>
      <button className='btn mt-3 item-btn'>Sell</button>
    </div>
  )
}

export default AllProducts