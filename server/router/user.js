const router = require('express').Router();
const { CompanyUser, validateCompany } = require('../model/CompanyUser');
const { CustomerUser, validateCustomer } = require('../model/CustomerUser');
const bcrypt = require('bcrypt');

router.post('/companyregister', async (req, res) => {
  try {
    const { error } = validateCompany(req.body);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    const user = await CompanyUser.findOne({ email: req.body.email });

    if (user) {
      return res
        .status(409)
        .send({ message: 'User with given mail is already exists' });
    }
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    await new CompanyUser({ ...req.body, password: hashPassword }).save();
    res.status(200).send({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Internal server error' });
  }
});

router.post('/customerregister', async (req, res) => {
  
  try {
    const { error } = validateCustomer(req.body);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    const user = await CustomerUser.findOne({ email: req.body.email });

    if (user) {
      return res
        .status(409)
        .send({ message: 'User with given mail is already exists' });
    }
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    await new CustomerUser({ ...req.body, password: hashPassword }).save();
    res.status(200).send({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Internal server error' });
  }
});

module.exports = router;
