const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for register
let Register = new Schema({
  Name: {
    type: String
  },
  Email: {
    type: String
  },
  Password: {
    type: String
  }
},{
    collection: 'register'
});

module.exports = mongoose.model('Register', Register);