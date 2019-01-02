var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var multer = require('multer');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var photosRouter = require('./routes/photos');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// Set the photos folder
app.set('photos', path.join(__dirname + '/public/images'));
// console.log(__dirname)

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(multer({dest: 'uploads/'}).single('photo'));
app.use(express.static(path.join(__dirname, 'public')));

// Set the upload route
app.get('/upload', photosRouter.getUploadForm);
 app.post('/upload', photosRouter.uploadImage(app.get('photos')));
//  console.log(app.get('photos'))

app.use('/', indexRouter.listImages);
app.use('/users', usersRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;