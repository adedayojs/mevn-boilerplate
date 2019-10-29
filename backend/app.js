/* Import all necessary tools */
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const fs = require('fs');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
require('dotenv').config();

const apiVersionOne = require('./routes/apiv1');

const app = express();

/* Get Environment for later use */
let env = process.env.NODE_ENV || 'DEVELOPMENT';
env = env.toUpperCase();

/* Connect to your database */

const mongooseURI = `${process.env[`MONGOOSE_DB_${env}`]}`;
mongoose
  .connect(mongooseURI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .catch(err => console.log(err));

mongoose.connection.once('open', () => {
  console.log('Connected successfully to mongoose database');
});
mongoose.connection.on('error', () => {
  console.log('Error Connecting to Mongoose Database');
});

/* This is used to render 404 pages by default. You should define your 404 pages when moving to production 
because this becomes useless in production as all your routes expect api routes, are handled by vue afterwards  */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

/* Apply your middlewares */
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

/* Api routing */
app.use('/api/v1', apiVersionOne);

const clientDirectory = path.join(__dirname, '../frontend/dist/');

//  Forward All Routes By Default to Vue Build if In Production Mode and vue build exist
if (fs.existsSync(clientDirectory) && env == 'PRODUCTION') {
  app.use(express.static(clientDirectory));
  app.get('/*', (req, res) => {
    res.sendFile(path.join(clientDirectory, 'index.html'));
  });
}

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
