const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const joi = require('joi');
const passwordComplexity = require('joi-password-complexity');
// const { checkout } = require('../router/router');

const userSchema = new mongoose.Schema({
  // type: { type: String, required: true },
  name: { type: String, required: true },
  gstin: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: Number, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_PRIVATE_KEY, {
    expiresIn: process.env.JWT_EXPIRES,
  });
  return token;
};

const CompanyUser = mongoose.model('companyuser', userSchema);

const validateCompany = (data) => {
  const schema = joi.object({
    // type: joi.string().required().label('Type of user'),
    name: joi.string().required().label('Name'),
    gstin: joi.string().required().label('GSTIN'),
    address: joi.string().required().label('Address'),
    phone: joi.string().required().label('Phone number'),
    email: joi.string().email().required().label('Email'),
    password: passwordComplexity().required().label('Password'),
  });
  return schema.validate(data);
};

module.exports = { CompanyUser, validateCompany };
