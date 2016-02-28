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
   res.sendFile('/root/admin/index.html')
});

router.get('/css/thumbnail-gallery.css', function(req, res) {
   res.sendFile('/root/admin/css/thumbnail-gallery.css')
});


router.get('/js/jquery.js', function(req, res) {
   res.sendFile('/root/admin/js/jquery.js')
});


router.get('/css/bootstrap.min.css', function(req, res) {
   res.sendFile('/root/admin/css/bootstrap.min.css')
});


router.get('/js/bootstrap.min.js', function(req, res) {
   res.sendFile('/root/admin/js/bootstrap.min.js')
});


router.get('/js/page.js', function(req, res) {
   res.sendFile('/root/admin/js/page.js')
});


app.use(router);

 
 var port = 8088;
 app.listen(port, function() {
   console.log("Listening on " + port);
 });


