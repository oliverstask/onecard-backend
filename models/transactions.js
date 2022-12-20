const mongoose = require('mongoose');

const locationSchema = mongoose.Schema({
    lat: Number,
    lon: Number
})


const transactionSchema = mongoose.Schema({
  
    qrId : {type: mongoose.Schema.Types.ObjectId, ref:'qrs'},
    userId : {type: mongoose.Schema.Types.ObjectId, ref:'users'},
    date : Date,
    location : locationSchema

});

const Transaction = mongoose.model('transactions', transactionSchema);

module.exports = Transaction;