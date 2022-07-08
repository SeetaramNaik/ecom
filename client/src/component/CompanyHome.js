import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';
import '../App.css';
import ProductCard from './ProductCard';
import axios from 'axios';

const CompanyHome = () => {
  const { REACT_APP_BASE_URL } = process.env;
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [item, setItem] = useState([]);
  const [customerType, setCustomerType] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    // localStorage.removeItem('user');
    // window.location.reload();
    window.location = '/login';
  };

  const handleChange = (e) => {
    setItemData({ ...itemData, [e.target.name]: e.target.value });
  };

  const handleOrderSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const body = JSON.stringify(itemData);
      const response = await axios.post(
        `${REACT_APP_BASE_URL}/api/companyorder`,
        body,
        config
      );
      if (response.status === 200) {
        document.getElementById('orderInputs').reset();
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
  };

  const res = JSON.parse(localStorage.getItem('token'));

  const [itemData, setItemData] = useState({
    useremail: res.data.user.email,
    itemname: '',
    itemquantity: '',
    quantity_measure: 'KG',
    itemprice: '',
    expecteddate: '',
  });

  function orderBtn() {
    if (res.data.type == 'customer') {
      document.getElementById('order_btn').style.display = 'none';
    }
  }

  useEffect(() => {
    axios
      .get(`${REACT_APP_BASE_URL}/api/companyorder/${res.data.user.email}`)
      .then((item) => {
        console.log(item.data.data);
        setItem(item.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [success]);

  var size = Object.values(item).length;
  console.log(size);

  var today = new Date();
  var dd = today.getDate();

  var mm = today.getMonth() + 1;
  var yyyy = today.getFullYear();
  if (dd < 10) {
    dd = '0' + dd;
  }
  if (mm < 10) {
    mm = '0' + mm;
  }
  const date = yyyy + '-' + mm + '-' + dd;

  const deleteItem = async (e) => {
    const valid = window.confirm('Do you really want to delete?');
    console.log(valid);

    if (valid) {
      axios
        .delete(`${REACT_APP_BASE_URL}/api/companyorder/${e.target.name}`)
        .then((res) => {
          console.log(res.data);
        });
      setItem((data) => {
        return data.filter((item) => item._id !== e.target.name);
      });
    }
  };
  return (
    <div className={styles.main_container} onLoad={orderBtn}>
      <nav className={styles.navbar}>
        <h1 className='welcome_txt'>Welcome {res.data.user.name}!</h1>
        <div className='nav-btn'>
          <button
            // hidden={res.data.type == 'customer' ? 'true' : 'false'}
            className={styles.white_btn}
            type='button'
            data-toggle='collapse'
            data-target='#orderInputs'
            aria-expanded='false'
            aria-controls='orderInputs'
            id='order_btn'
          >
            Order
          </button>

          <button className={styles.logout_btn} onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>

      <div className='container mb-5'>
        {error && <div className={styles.error_msg}>{error}</div>}
        {success && <div className={styles.success_msg}>{success}</div>}
        <form
          className='collapse'
          id='orderInputs'
          onSubmit={handleOrderSubmit}
        >
          {/*
          <input
            className='form-control my-2 input'
            name='itemname'
            type='text'
            placeholder='Enter Item Name'
            onChange={handleChange}
            required
  />*/}

          <select
            className='form-control col-sm-12 my-2'
            onChange={handleChange}
            name='itemname'
            required
          >
            <option disabled selected>
              Choose spice
            </option>
            <option value='Black Pepper'>Black Pepper</option>
            <option value='White Pepper'>White Pepper</option>
            <option value='Cinnamon'>Cinnamon</option>
            <option value='Cloves'>Cloves</option>
            <option value='Garam Masala'>Garam Masala</option>
          </select>
          <div className='row col-sm-12'>
            <input
              className='form-control col-sm-8 my-2 mx-2 input'
              name='itemquantity'
              type='number'
              placeholder='Enter Quantity'
              min='1'
              max='200'
              onChange={handleChange}
              required
            />
            <select
              className='form-control col-sm-2 my-2'
              onChange={handleChange}
              name='quantity_measure'
              required
            >
              <option disabled>Choose Measure</option>
              <option value='KG' selected>
                KG
              </option>
              <option value='Quintal'>Quintal</option>
              <option value='Ton'>Ton</option>
            </select>
          </div>
          <input
            className='form-control my-2 input'
            name='itemprice'
            type='number'
            placeholder='Enter Opening Price'
            onChange={handleChange}
            required
          />
          <input
            className='form-control my-2 input'
            name='expecteddate'
            type='date'
            placeholder='Enter Expecting Date'
            min={date}
            onChange={handleChange}
            required
          />

          <input
            className='btn btn-primary form-control my-2'
            type='submit'
            value='Place now'
          />
        </form>
      </div>

      {size === 0 ? (
        <div className=''>
          <h2>You haven't ordered anything yet</h2>
          <h5>
            Place an{' '}
            <a
              // hidden={res.data.type == 'customer' ? 'true' : 'false'}
              className=''
              type='button'
              data-toggle='collapse'
              data-target='#orderInputs'
              aria-expanded='false'
              aria-controls='orderInputs'
              id='order_btn'
            >
              Order
            </a>{' '}
            now!
          </h5>
        </div>
      ) : (
        <div>
          <h2 className='total-order-msg'>
            You've made total
            <span className='total-order'>{size}</span>
            orders.
          </h2>
          <div className='home_container_prod'>
            {item.map((items, index) => (
              <ProductCard
                deleteItem={deleteItem}
                key={index}
                product={items}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyHome;
