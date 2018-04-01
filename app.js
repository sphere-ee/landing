var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();

app.use(function(req, res, next){
  if (req.get('X-Forwarded-Proto') === 'http') {
    res.redirect(`https://${req.host}${req.url}`)
    return;
  }
  next()
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/forms', function(req, res, next) {
  console.log(req.body)
  res.send(req.body)
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  console.error(err)
  res.send(err)
});


module.exports = app;
