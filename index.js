var express = require("express"),
    app = express(),
    bodyParser  = require("body-parser"),
    methodOverride = require("method-override"),
    http = require('http'),
    polyline = require('polyline'),
    path = require('path');

    var  mongoose = require('mongoose');
    mongoose.connect('mongodb://localhost/facultades');

    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
      console.log("OPEN")
    });


    var control=require('./controllers/facultades');



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


router.get('/admin', function(req, res) {
    res.sendfile(path.resolve('../admin/index.html'), {root: __dirname })(200);
});

router.get('/user', function(req, res) {
    res.sendfile(path.resolve('../user/index.html'), {root: __dirname })(200);
});

router.get('/getAllFacultades', function(req, res) {
  var callback=function(data) {
    res.send(data);
  }
  control.getAllFacultades(callback)

});

router.post('/addFacultad', function(req, res) {
  control.addFacultad(req.body)
  res.sendStatus(200);
});

router.post('/updateFacultad', function(req, res) {
  control.addFacultad(req.body)
  res.sendStatus(200);
});

router.delete('/removeFacultad', function(req, res) {
  control.addFacultad(req.body)
  res.sendStatus(200);
});

router.post('/search/facultad', function(req, res) {
  if (req.body.name) {
    var callback=function(data) {
      res.send(data);
    }
    control.findOne(req.body.name,callback)
  }

});


app.use(router);


app.listen(3000, function() {
  console.log("Node server running on http://localhost:3000");
});
