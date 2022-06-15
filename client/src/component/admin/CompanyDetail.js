import React from 'react';
import './styles.css';

const CompanyDetail = ({ user }) => {
  const { name,gstin, address, phone, email } = user;
  return (
    <div className='company-detail'>
      <h3>
        Name: <span className='fields'>{name}</span>
      </h3>
      <h4>
      GSTIN: <span className='fields'>{gstin}</span>
    </h4>
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

export default CompanyDetail;
