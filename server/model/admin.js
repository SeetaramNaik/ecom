const mongoose = require('mongoose');


const userschema = new mongoose.Schema({
  username: { type: String },
  password: { type: String },
  email: { type: String },
});

const Admin = mongoose.model('admin', userschema);

module.exports ={ Admin };
