var express = require("express"),
    app = express(),
    bodyParser  = require("body-parser"),
    methodOverride = require("method-override"),
    http = require('http'),
    mongoose = require('mongoose');

//la base de datos esta en el mismo servidor
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


//****************************** Rutas ******************
var router = express.Router();

//****************** GET

//Devuelve todas las facultades
router.get('/getAllFacultades', function(req, res) {
  var callback=function(err,data) {
    if (err) {
      res.sendStatus(400);
    }else {
      res.sendStatus(200);
    }
  }
  control.getAllFacultades(callback)

});

router.get('/searchFacultad', function(req, res) {
  if (req.body.name) {
    var callback=function(err,data) {
      if (err) {
        res.sendStatus(400);
      }else {
        res.sendStatus(200);
      }
    }
    control.findOne(req.body.name,callback)
  }
});

//****************** POST

//Añade nueva facultad
router.post('/addFacultad', function(req, res) {
  var callback=function(err) {
    if (err) {
      res.sendStatus(400);
    }else {
      res.sendStatus(200);
    }
  }
  control.addFacultad(req.body,callback)
});

//Busca por id
router.post('/findById', function(req, res) {
  if (req.body.id) {
    var callback=function(err,data) {
      if (err) {
        res.sendStatus(400);
      }else {
        res.send(data);
      };
    };
    control.findById(req.body.id,callback)
  }
});

//Actualiza una facultad
router.post('/updateFacultad', function(req, res) {
  if (req.body.id) {
    var callback=function(err,data) {
      if (err) {
        res.sendStatus(400);
      }else {
        res.send(data);
      };
    }
    control.updateFacultad(req.body.id,req.body,callback)
  }
});

//Elimina una facultad
router.post('/removeFacultad', function(req, res) {
  if (req.body.id) {
    var callback=function(err,data) {
      if (err) {
        res.sendStatus(400);
      }else {
        res.sendStatus(200);
      };
    }
    control.remove(req.body.id,callback)
  }
});


app.use(router);


app.listen(3000, function() {
  console.log("Node server running on http://localhost:3000");
});
