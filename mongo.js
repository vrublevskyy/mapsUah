var  mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/facultades');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("OPEN")
});


var control=require('./controllers/facultades');

//control.addFacultad()

control.findOne("informatica2")
