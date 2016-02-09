var express = require("express"),
    app = express(),
    bodyParser  = require("body-parser"),
    methodOverride = require("method-override"),
    http = require('http'),
    polyline = require('polyline'),
    mongoDB= require('./mongo.js');

myMongo= new mongoDB()
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(methodOverride());

var router = express.Router();

var osrmServer="http://router.project-osrm.org"


router.get('/', function(req, res) {
   res.send("OK");
});

router.post('/search/route', function(req, res) {
  var reqData=req.body;
  var options = {
    host: osrmServer,
    path1: '/viaroute?loc='+reqData.origin.lat+','+reqData.origin.lng+'&loc='+reqData.destination.lat+','+reqData.destination.lng+'&instructions=false&compression=false',
    path: '/viaroute?loc=52.503033,13.420526&loc=52.516582,13.429290&instructions=false&compression=false'
  };
  callback = function(response) {
    var str = '';

    //another chunk of data has been recieved, so append it to `str`
    response.on('data', function (chunk) {
      str += chunk;
    });

  //the whole response has been recieved, so we just print it out here
    response.on('end', function () {
      str=JSON.parse(str.replace(/[\r\n ]+/g,""))
      console.log(str.route_geometry)
      res.send(str)
    });
  }

  http.request(options, callback).end();
});

router.get('/search/place', function(req, res) {
   res.send("/search/place");
});

router.get('/search/nearest', function(req, res) {
   res.send("('/search/nearest");
});

router.post('/add/element/faculty', function(req, res) {
   res.send("/add/element/faculty");
});

router.post('/update/element/faculty', function(req, res) {
   res.send("/update/element/faculty");
});

router.post('/delete/element/faculty', function(req, res) {
   res.send("/delete/element/faculty");
});
app.use(router);


app.listen(3000, function() {
  console.log("Node server running on http://localhost:3000");
  myMongo.connect()
});
