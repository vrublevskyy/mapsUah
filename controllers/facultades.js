var mongoose = require('mongoose')
var Facultad=require('../models/facultad');
var exports = module.exports


exports.addFacultad=function() {

  var facultad1=new Facultad({
    type: "Feature",
    geometry:{
      type:"Point",
      coordinates:[35,22]
    },
    properties:{
      "imgSrc": "http://www.uah.es/grafica/universidad/galeria_facultades_escuelas/escuela_informatica_min.jpg",
      "name":"informatica",
      "info":"Facultad Informatica"
    }
  })

  facultad1.save(function(err, facultad1) {
    if(err) returnconsole.log("SAVE ERROR");
    console.log(facultad1);
  });
}


exports.findAllFacultades = function() {
  Facultad.find(function(err, facultades) {
    if(err) console.log(err);
    console.log(facultades)
  });
};

exports.findOne=function(filter) {
  Facultad.findOne({ 'properties.name': filter }, 'properties.imgSrc', function (err, facultad) {
    if (err) return handleError(err);
    console.log(JSON.stringify(facultad)) // Space Ghost is a talk show host.
  })
}
