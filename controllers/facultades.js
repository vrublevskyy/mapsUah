var mongoose = require('mongoose')
var Facultad=require('../models/facultad');
var exports = module.exports


exports.addFacultad=function(data) {

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
  })

  facultad1.save(function(err, facultad1) {
    if(err) returnconsole.log("SAVE ERROR");
    console.log(facultad1);
  });
}


exports.getAllFacultades = function(callback) {
  Facultad.find(function(err, facultades) {
    if(err) console.log(err);
    return callback(facultades);
  });
};

exports.findByName=function(filter,callback) {
  Facultad.findOne({ 'properties.name': filter }, '', function (err, facultad) {
    if (err) return handleError(err);
        return callback(facultad);
  })
}

exports.findById=function(filter,callback) {
  Facultad.findOne({ '_id': filter }, '', function (err, facultad) {
    if (err) return handleError(err);
        return callback(facultad);
  })
}

exports.remove=function(id,callback) {
  Facultad.remove({ _id: id }, function(err) {
    if (!err) {
        console.log(err)
    }
    else {
      if (callback) {
        return callback(null,id)
      }
    }
  });
}

exports.updateFacultad=function(id,data,callback) {
	 Facultad.update({_id: id},{ 'properties.name':data.name, 'properties.imgSrc':data.img, 'properties.info':data.info, 'geometry.coordinates':data.Coordinates}, {upsert: false}, function(err,data) {
      if (err) {
          console.log(err)
      }
      else {
        if (callback) {
          return callback(data)
        }
      }
    });
}
