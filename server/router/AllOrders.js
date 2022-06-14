const router = require('express').Router();
const { CompanyOrder, validateOrder } = require('../model/Order');

router.get('/', async (req, res) => {
    const orders = await CompanyOrder.find();
    if(orders){
      return res.status(200).send({data:orders,message:"All orders are sent"});
    }
      return res.status(400).send({message: "No orders in the database"});
  });


module.exports = router;