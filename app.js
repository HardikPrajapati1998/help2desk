var createError = require('http-errors');
var express = require('express');
var path = require('path');
var flash = require('express-flash-notification');
var mongoose = require('mongoose');
var fileuplod = require('express-fileupload');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var session = require('express-session')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var answerRouter = require('./routes/answer');
var blogRouter = require('./routes/blog');
var categoryRouter = require('./routes/category');
var ContactRouter = require('./routes/Contact');
var questionRouter = require('./routes/question');
var materialRouter = require('./routes/material');
var messageRouter = require('./routes/message');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(fileuplod());
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 2000000 }}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(flash());
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/answer',answerRouter);
app.use('/question',questionRouter);

app.use('/category',categoryRouter);
app.use('/material',materialRouter);
app.use('/Contact',ContactRouter);
mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://Help_Desk:hardik@cluster0-eixsm.mongodb.net/test?retryWrites=true',{useNewUrlParser: true})
.then(() => console.log('connection succesful'))
.catch((err) => console.error(err))

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
