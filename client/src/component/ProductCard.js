import React from 'react';
import styles from './styles.module.css';
import '../App.css';
import axios from 'axios';

const ProductCard = ({ product, deleteItem }) => {

  const {
    _id,
    itemname,
    itemquantity,
    quantity_measure,
    itemprice,
    expecteddate,
  } = product;

  return (

    <div className={styles.itemcard}>
      <h5 className='card-title'>
        Name: <span className={styles.quantity}>{itemname.toUpperCase()}</span>
      </h5>
      <h5 className='card-title'>
        Quantity:{' '}
        <span className={styles.quantity}>
          {itemquantity} {quantity_measure}
        </span>
      </h5>
      <h5 className='card-title'>
        Price: ₹<span className={styles.price}>{itemprice}</span>/item
      </h5>
      <h5 className='card-text'>Expected: {expecteddate}</h5>
      <button name={_id} className='btn mt-3 item-btn' onClick={deleteItem}>
        Delete
      </button>
    </div>

  );
};

export default ProductCard;
