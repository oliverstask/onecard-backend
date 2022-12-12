const mongoose = require('mongoose');


const authSchema = mongoose.Schema({
  token: String,
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  userSettings : {type: mongoose.Schema.Types.ObjectId, ref:'settings'},
});

const Auth = mongoose.model('auths', authSchema);

module.exports = Auth;