const mongoose = require('mongoose');

const qrSchema = mongoose.Schema({
  
    userId : {type: mongoose.Schema.Types.ObjectId, ref:'auths'},
    settings :{type: mongoose.Schema.Types.ObjectId, ref:'settings'},
    isFav : Boolean,
    qrName : String,
    numScans : Number,
});

const Qr = mongoose.model('qrs', qrSchema);

module.exports = Qr;