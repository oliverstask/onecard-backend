require('dotenv').config()
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var authRouter = require('./routes/auth');
var settingRouter = require('./routes/setting');
var app = express();

const cors = require('cors')


app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/auth', authRouter);
app.use('/setting', settingRouter);


module.exports = app;
