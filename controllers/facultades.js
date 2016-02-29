//Controlador de la aplicación
//metodos para acceder a la base de datos
var mongoose = require('mongoose')
var Facultad=require('../models/facultad');
var exports = module.exports

//Todos los metodos tienen un callback

//Añade nueva facultad
exports.addFacultad=function(data,callback) {

  var facultad1=new Facultad({
    type: "Feature",
    geometry:{
      type:"Point",
      coordinates:data.Coordinates
    },
    properties:{
      "imgSrc": data.img,
      "name":data.name,
      "info":data.info
    }
  });

  facultad1.save(function(err, facultad1,callback) {
    if (callback) {
      return callback(err);
    }
  });
};

//Devuelve todos los datos
exports.getAllFacultades = function(callback) {
  Facultad.find(function(err, facultades) {
    if (callback) {
      return callback(err,facultades);
    }
  });
};

//Busca por nombre
exports.findByName=function(filter,callback) {
  Facultad.findOne({ 'properties.name': filter }, '', function (err, facultad) {
    if (callback) {
      return callback(err,facultad);
    }
  })
}

//Busca por ID
exports.findById=function(filter,callback) {
  Facultad.findOne({ '_id': filter }, '', function (err, facultad) {
    if (callback) {
      return callback(err,facultad);
    }
  })
}

//Elimina un elemnto
exports.remove=function(id,callback) {
  Facultad.remove({ _id: id }, function(err) {
    if (callback) {
      return callback(err,id)
    }

  });
}

//Actuañiza la facultad, si no existe no lo crea
exports.updateFacultad=function(id,data,callback) {
	 Facultad.update({_id: id},{ 'properties.name':data.name, 'properties.imgSrc':data.img, 'properties.info':data.info, 'geometry.coordinates':data.Coordinates}, {upsert: false}, function(err,data) {
        if (callback) {
          return callback(err,data);
        }
      });
}
