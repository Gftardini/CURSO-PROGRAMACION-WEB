var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var NosotrosRouter = require('./routes/Nosotros');//routes/Nosotros.js 
var ServiciosRouter = require('./routes/Servicios');//routes/Servicios.js 
var ContactoRouter = require('./routes/Contacto');//routes/Contacto.js 

const req = require('express/lib/request');
const res = require('express/lib/response');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/Nosotros', NosotrosRouter );
app.use('/Servicios', ServiciosRouter );
app.use('/Contacto', ContactoRouter );


app.get('/prueba', function (req, res) {
  res.send('Hola soy la pagina de prueba')
})

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
