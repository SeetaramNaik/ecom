const router = require('express').Router();
const { CompanyUser } = require('../model/CompanyUser');
const { CustomerUser } = require('../model/CustomerUser');

router.get('/allCompanyUsers', async (req, res) => {
    const allCompanyUsers = await CompanyUser.find();
    if(allCompanyUsers){
        return res.status(200).send({data:allCompanyUsers,message: "All company users data sent suucessfully"});
    }
    else{
        return res.status(400).send({message:"Internal server error"});
    }

});

router.get('/allCustomerUsers', async (req, res) => {
    const allCustomerUsers = await CustomerUser.find();
    if(allCustomerUsers){
        return res.status(200).send({data:allCustomerUsers,message: "All company users data sent suucessfully"});
    }
    else{
        return res.status(400).send({message:"Internal server error"});
    }

});


module.exports = router;