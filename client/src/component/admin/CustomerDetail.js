import React from 'react';
import './styles.css';

const CustomerDetail = ({ user }) => {
  const { name, address, phone, email } = user;
  return (
    <div className='customer-detail'>
      <h3>
        Name: <span className='fields'>{name}</span>
      </h3>
      <h4>
        Address: <span className='fields'>{address}</span>
      </h4>
      <h4>
        Phone: <span className='fields'>{phone}</span>
      </h4>
      <h4>
        Email: <span className='fields'>{email}</span>
      </h4>
    </div>
  );
};

export default CustomerDetail;
