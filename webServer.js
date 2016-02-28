var express = require("express"),
    app = express(),
    bodyParser  = require("body-parser"),
    methodOverride = require("method-override"),
    http = require('http');




app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(methodOverride());

var router = express.Router();

router.get('/', function(req, res) {
   res.sendFile('/root/user/index.html')
});

router.get('/node_modules/polyline/src/polyline.js', function(req, res) {
   res.sendFile('/root/user/node_modules/polyline/src/polyline.js')
});

router.get('/js/geo.js', function(req, res) {
   res.sendFile('/root/user/js/geo.js')
});

router.get('/css/style.css', function(req, res) {
   res.sendFile('/root/user/css/style.css')
});

router.get('/js/page.js ', function(req, res) {
   res.sendFile('/root/user/js/page.js')
});


app.use(router);

 
 var port = 8089;
 app.listen(port, function() {
   console.log("Listening on " + port);
 });


