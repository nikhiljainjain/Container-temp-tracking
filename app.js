var express = require("express");
var app = new express();
var request = require("request");
var sysX=true;
app.set("view engine","ejs");
app.use(express.static("public"));



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
app.listen(process.env.PORT,process.env.IP, function(){
    console.log("Server started");
});
