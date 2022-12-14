const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
  socialLogin: Boolean,
  token: String,
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  userSettings : {type: mongoose.Schema.Types.ObjectId, ref:'settings'}
});

const User = mongoose.model('users', userSchema);

module.exports = User;