const router = require('express').Router();
const { CompanyUser } = require('../model/CompanyUser');
const { CustomerUser } = require('../model/CustomerUser');
const joi = require('joi');
const passwordComplexity = require('joi-password-complexity');
const bcrypt = require('bcrypt');
const sendEmail = require('../utils/sendEmail');

router.post('/', async (req, res) => {
  try {
    const { error } = validateUserLogin(req.body);

    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    const Customeruser = await CustomerUser.findOne({ email: req.body.email });

    if (!Customeruser) {

      const Companyuser = await CompanyUser.findOne({ email: req.body.email });
      
      if (!Companyuser) {
        return res.status(401).send({ message: 'Invalid Email or Password' });
      } else {
        const validPassword = await bcrypt.compare(
          req.body.password,
          Companyuser.password
        );
        if (!validPassword) {
          return res.status(401).send({ message: 'Invalid Email or Password' });
        }
        const token = Companyuser.generateAuthToken();

        res.status(200).send({
          data: { user: Companyuser, type: 'company' },
          message: 'Logged in successfully',
        });
      }
    } else {
      const validPassword = await bcrypt.compare(
        req.body.password,
        Customeruser.password
      );
      if (!validPassword) {
        return res.status(401).send({ message: 'Invalid Email or Password' });
      }
      const token = Customeruser.generateAuthToken();
      res.status(200).send({
        data: { user: Customeruser, type: 'customer' },
        message: 'Logged in successfully',
      });
    }
  } catch (error) {
    res.status(500).send({ message: 'Internal server error' });
  }
});

router.post('/forgotpassword', async (req, res) => {
  try {
    const { error } = validateEmailForForgotPassword(req.body);

    if (error) {
      return res.status(400).send({ message: error.message });
    }

    const verificationCode = Math.floor(Math.random() * 10000);

    const message = `
      <h1>You have requested a password reset</h1>
      <h3>Enter this verification code to reset your password</h3>
      <h1>${verificationCode}</h1>
      <h4>Thank You...</h4>
    `;

    const Customeruser = await CustomerUser.findOne({ email: req.body.email });

    if (!Customeruser) {
      const Companyuser = await CompanyUser.findOne({ email: req.body.email });
      if (!Companyuser) {
        return res.status(401).send({ message: 'Enter valid email address' });
      } else {
        try {
          await sendEmail({
            to: Companyuser.email,
            subject: 'Password reset request',
            text: message,
          });

          res.status(200).send({
            data: verificationCode,
            message: 'Email sent successfully',
          });
        
        } catch (err) {
          console.log(err);
          return res.status(400).send({ message: error.details[0].message });
        }
      }
    } else {
      try {
        await sendEmail({
          to: Customeruser.email,
          subject: 'Password reset request',
          text: message,
        });

        res
          .status(200)
          .send({ data: verificationCode, message: 'Email sent successfully' });
   
      } catch (err) {
        console.log(err);
        return res.status(400).send({ message: error.details[0].message });
      }
    }
  } catch (error) {
    res.status(500).send({ message: 'Internal server error' });
  }
});

router.post('/resetpassword', async (req, res) => {
 
  try {
    const { error } = resetValidation(req.body);

    if (error) {
      return res.status(400).send({ message: error.message });
    }

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    const Customeruser = await CustomerUser.findOneAndUpdate(
      { email: req.body.email },
      { $set: { password: hashPassword } }
    );

    if (!Customeruser) {
      const Companyuser = await CompanyUser.findOneAndUpdate(
        { email: req.body.email },
        { $set: { password: hashPassword } }
      );
      if (!Companyuser) {
        return res.status(401).send({ message: 'Unable to update password' });
      } else {
        return res.status(200).send({ message: 'Password reset successfully' });
      }
    } else {
      return res.status(200).send({ message: 'Password reset successfully' });
    }
  } catch (error) {
    res.status(500).send({ message: 'Internal server error' });
  }
});

const validateUserLogin = (data) => {
  const schema = joi.object({
    email: joi.string().email().required().label('Email'),
    password: joi.string().required().label('Password'),
  });
  return schema.validate(data);
};

const validateEmailForForgotPassword = (data) => {
  const schema = joi.object({
    email: joi.string().email().required().label('Email'),
  });
  return schema.validate(data);
};

const resetValidation = (data) => {
  const schema = joi.object({
    email: joi.string().email().required().label('Email'),
    password: passwordComplexity().required().label('Password'),
  });
  return schema.validate(data);
};

module.exports = router;
