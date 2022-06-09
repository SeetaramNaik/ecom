const mongoose = require('mongoose');
const joi = require('joi');

const orderSchema = new mongoose.Schema({
  useremail: { type: String, required: true },
  itemname: { type: String, required: true },
  itemquantity: { type: Number, required: true },
  quantity_measure: { type: String, required: true },
  itemprice: { type: Number, required: true },
  expecteddate: { type: String, required: true },
  currentdate: { type: Date, required: true },
});

const CompanyOrder = mongoose.model('CompanyOrder', orderSchema);

const validateOrder = (data) => {
  const schema = joi.object({
    useremail: joi.string().email().required().label('User Email'),
    itemname: joi.string().required().label('Item Name'),
    itemquantity: joi.number().required().label('Item Quantity'),
    quantity_measure: joi.string().required().label('Quantity Measurement'),
    itemprice: joi.number().required().label('Item Price'),
    expecteddate: joi.required().label('Expected Date'),
  });
  return schema.validate(data);
};

module.exports = { CompanyOrder, validateOrder };
