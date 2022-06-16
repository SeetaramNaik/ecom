const router = require('express').Router();
const { CompanyOrder, validateOrder } = require('../model/Order');
const joi = require('joi');

router.post('/', async (req, res) => {
  try {
    const { error } = validateOrder(req.body);

    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    const Itemname = await CompanyOrder.find({
      useremail: req.body.useremail,
      itemname: req.body.itemname,
    });

    const item = Object.values(Itemname).length;

    if (item != 0) {
      return res
        .status(400)
        .send({ message: 'Item already present, Delete and try again' });
    }
    const data = await CompanyOrder({
      ...req.body,
      currentdate: Date.now(),
    }).save();
    return res
      .status(200)
      .send({ data: data, message: 'Your item added successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Internal server error' });
  }
});

router.get('/:id', async (req, res) => {
  const orders = await CompanyOrder.find({ useremail: req.params.id });
  if (orders) {
    return res
      .status(200)
      .send({ data: orders, message: 'Your orders are sent' });
  }
  return res.status(400).send({ message: "You haven't order anything yet" });
});

router.get('/individualorder/:id', async (req, res) => {
  const orders = await CompanyOrder.find({ _id: req.params.id });
  if (orders) {
    return res
      .status(200)
      .send({ data: orders, message: 'Your orders are sent' });
  }
  return res.status(400).send({ message: "You haven't order anything yet" });
});

router.delete('/:id', async (req, res) => {

  try {
    const item = await CompanyOrder.findByIdAndDelete(req.params.id, req.body);
    res.status(200).send({ message: 'Successfully deleted' });
  } catch (error) {
    res.status(500).send({ message: 'Internal server error' });
  }
});



module.exports = router;
