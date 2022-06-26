import React, { useState } from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
import './styles.css';
import axios from 'axios';

const SingleProduct = () => {
  const { REACT_APP_BASE_URL } = process.env;
  const navigate = useNavigate();
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

  // const [newPrice,setNewPrice] = useState(itemprice);

  // const [commission,setCommission]= useState({commissionprice:0});
  const [newPrice, setNewPrice] = useState({
    currentprice: itemprice,
    commission: 0,
  });

  var name = useremail.substring(0, useremail.lastIndexOf('@'));

  const handleChange = (e) => {
    setNewPrice({ ...newPrice, commission: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPrice.commission <= 0) {
      console.log('Current Item price', itemprice);
      console.log('New price:', newPrice);

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
        console.log('Body', body);
        const response = await axios.post(
          `${REACT_APP_BASE_URL}/api/companyorder/updateprice/${_id}`,
          body,
          config
        );
        if (response.status === 200) {
          document.getElementById('price-field').reset();
     
          setSuccess(response.data.message);
          setTimeout(() => {
            setSuccess('');
            navigate('/adminportal');
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
    <form
      className='single-prod'
      name='form'
      id='price-field'
      onSubmit={handleSubmit}
    >
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
        name='commissionprice'
        onChange={handleChange}
        className='form-control price-input'
        placeholder='Enter the commission'
      />
      <input type='submit' className='btn-success btn' value='Update price' />
    </form>
  );
};

export default SingleProduct;
