var express = require("express"),
    app = express(),
    bodyParser  = require("body-parser"),
    methodOverride = require("method-override"),
    http = require('http');


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

router.post('/findById', function(req, res) {
  if (req.body.id) {
    var callback=function(data) {
      res.send(data);
    }
    control.findById(req.body.id,callback)
  }
});

router.post('/updateFacultad', function(req, res) {
  if (req.body.id) {
    var callback=function(data) {
      res.send(data);
    }
    control.updateFacultad(req.body.id,callback)
  }
});

router.delete('/removeFacultad', function(req, res) {
  if (req.body.id) {
    var callback=function(err,data) {
      if (err) {
        res.sendStatus(404);
      }
      res.sendStatus(200);
    }
    control.remove(req.body.id,callback)
  }
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
