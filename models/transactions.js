const mongoose = require('mongoose');

const transactionSchema = mongoose.Schema({
  
    qr : {type: mongoose.Schema.Types.ObjectId, ref:'qrs'},
    me : {type: mongoose.Schema.Types.ObjectId, ref:'auths'},
    date : Date,
    location : {
        latitude : String, 
        longitude : String,
    } 

});

const Transaction = mongoose.model('transactions', transactionSchema);

module.exports = Transaction;