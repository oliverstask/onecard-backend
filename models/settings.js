const mongoose = require('mongoose');

const customSchema = mongoose.Schema({
    name : String,
    url : String,
    icon : String,
    color : String,
})

const settingSchema = mongoose.Schema({
    phoneNumber : Number,
    address : String,
    companyName : String,
    website : String,
    linkedin : String,
    whatsApp : Number,
    tweeter : String,
    instagram : String,
    facebook : String,
    tiktok : String,
    resume : String,
    customs : [customSchema]
});

const Setting = mongoose.model('settings', settingSchema);

module.exports = Setting;