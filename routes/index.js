var express = require('express');
var route = express.Router();
var request = require("request");
const config = require("../config/config");
const accountSid = config.twilio_accountSid; //account sid from twilio website
const authToken = config.twilio_authToken; //get authecation token from twilio website
const client = require('twilio')(accountSid, authToken);
const aerisapi_access_id = config.aerisapi_access_id;
const aerisapi_secret_key = config.aerisapi_access_id;

var sysX=true;//system on

const options = {
    method: 'GET',
	url: `https://api.aerisapi.com/airquality/vellore,india?&format=json&client_id=${aerisapi_access_id}&client_secret=${aerisapi_secret_key}` 
};

const latitude = 12.970466;
const longitude = 79.160052;

function request_fun(callback){
    request(options, function (error, response, body) {
    	const json = JSON.parse(body);
    		
    	if (!json.success) {
    		console.error('Oh no!');
    		callback('Oh no!');
    	} else {
    	    console.log("Calling to API");
    		//console.log(json);
    		callback(json);
    	}
    });
}

route.get('/',function(req,res){
    //make query to fetch data from db
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

route.post("/rcv/data", function(req,res){
    console.log(req.connection.remoteAddress);
    console.log(req.headers['x-forwaded-for']);
    //make query for saving data to db
    console.log(req.body);
    let response = {system: sysX};
    request_fun((data)=>{
            const newData = data.response.ob;
            response.ext_temp = newData.tempC;
            response.ext_humdity = newData.humidity;
            response.weather = newData.weather;
    });
    console.log(response);
    res.send(response);
});

route.post("/snd/msg", (req, res, next)=>{
    console.log(req.body);
    client.messages
          .create({
            body: req.body.msg,
            from: `whatsroute:${config.whatsapp_sender}`,
            to:`whatsroute:${config.whatsapp_recevier}`
          })
          .then(message => console.log(message.body))
          .done();
});

route.get("/req/app", (req, res, next)=>{
    let dataSend = {
        lat_val : latitude,
        lng_val : longitude,
        temperature : 24,
        humdity : 30,
        status : "OK"
    }
    res.json(dataSend);
});

route.get("/req/system/off", (req, res, next)=>{
    if (sysX){
        sysX = false;
        res.json({"status": "off"});
    }else{
        sysX = true;
        res.json({"status": "on"});
    }
});

module.exports = route;