import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './styles.css';
import axios from 'axios';

const SingleProduct = () => {
  const { REACT_APP_BASE_URL } = process.env;
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const location = useLocation();
  const { from } = location.state;
  const {
    _id,
    useremail,
    itemname,
    itemquantity,
    quantity_measure,
    itemprice,
    expecteddate,
  } = from;

  const [newPrice, setNewPrice] = useState({
    newprice: 0,
    // _id: _id,
  });
  var name = useremail.substring(0, useremail.lastIndexOf('@'));

  const handleChange = (e) => {
    setNewPrice({ ...newPrice, [e.target.name]: parseInt(e.target.value)+parseInt({itemprice}) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    var input = document.forms['form']['newprice'].value;
    if (newPrice.newprice <= 0) {
      setError("You've not entered any commission price");
      setTimeout(() => {
        setError('');
      }, 3000);
    } else {
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json',
          },
        };
        const body = JSON.stringify(newPrice);
        const response = await axios.post(
          `${REACT_APP_BASE_URL}/api/companyorder/updateprice/${_id}`,
          body,
          config
        );
        if (response.status === 200) {
          document.getElementById('price-field').reset();
          newPrice.newprice=0;
          setSuccess(response.data.message);
          setTimeout(() => {
            setSuccess('');
          }, 3000);
        }
      } catch (error) {
        if (
          error.response &&
          error.response.status >= 400 &&
          error.response.status <= 500
        ) {
          // setError(error.response.data.message);
          setError(error.response.data.message);
          setTimeout(() => {
            setError('');
          }, 3000);
        }
      }
    }
  };

  return (
    <form className='single-prod' name='form' id='price-field' onSubmit={handleSubmit}>
      {error && <div className='error_msg'>{error}</div>}
      {success && <div className='success_msg'>{success}</div>}

      <h4 className='info'>
        Item: <span className='main-info'>{itemname}</span>
      </h4>
      <h4 className='info'>
        For: <span className='main-info'>{name}</span>
      </h4>
      <h4 className='info'>
        Quantity:{' '}
        <span className='main-info'>
          {itemquantity} {quantity_measure}
        </span>
      </h4>
      <h4 className='info'>
        Item price: <span className='main-info'>₹{itemprice}</span>
      </h4>
      <h4 className='info'>
        Expected date:<span className='main-info'>{expecteddate}</span>
      </h4>
      <input
        type='number'
        name='newprice'
        onChange={handleChange}
        className='form-control input'
        placeholder='Enter the commission'
      />
      <input type='submit' className='btn-success btn' value='Update price' />
    </form>
  );
};

export default SingleProduct;
