const mongoose = require('mongoose');

const qrSchema = mongoose.Schema({
    userId : {type: mongoose.Schema.Types.ObjectId, ref:'auths'},
    infos : String,
    isFav : Boolean,
    qrName : String,
    numScans : Number,
});

const Qr = mongoose.model('qrs', qrSchema);

module.exports = Qr;