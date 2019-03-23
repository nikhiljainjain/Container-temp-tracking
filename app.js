var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = new express();
var request = require("request");
var sysX=true;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.get('/',function(req,res){
    var latitude = 12.970466;
    var longitude = 79.160052;
    var locationName;
    var url2 =
    "https://maps.googleapis.com/maps/api/geocode/json?latlng=" +
    latitude +
    "," +
    longitude +
    "&sensor=true&key=AIzaSyACjEFG5Hufa0S1NlDL1IH0bphLn334Ciw";
    request(url2, function(error, response, body) {
            if (!error && response.statusCode == 200) {
            var locationDetails = JSON.parse(body);
            locationName = locationDetails["results"][0]["formatted_address"];
            console.log(locationName);
            }
            else{
              locationName: "Error!";
            }
            res.render("index", {data: {location: locationName, long: longitude, lat: latitude}});
    });
});

app.post("/rcv/data", function(req,res){
  console.log(req.body);
  res.send("ok");
});

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
