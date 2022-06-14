require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const UserLogin = require('./router/auth');
const UserRegister = require('./router/user');
const CompanyOrder = require('./router/CompanyOrder');
const AllOrders = require('./router/AllOrders');
const allUsers = require('./router/AllUser');

const app = express();

connectDB();

app.use(express.json({extended: false}));

app.use(cors());

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });

app.get('/', (req, res) => {
  res.send('<h1>Hello</h1>');
});

app.use('/api/register',UserRegister);
app.use('/api/login',UserLogin);
app.use('/api/companyorder',CompanyOrder);
app.use('/api/allorders',AllOrders);
app.use('/api/users',allUsers);

const PORT=process.env.PORT || 5000;

app.listen(PORT,()=>console.log(`Server started at port ${PORT}`));