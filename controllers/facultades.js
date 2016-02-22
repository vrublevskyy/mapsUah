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
        return callback()
      }
    }
  });
}

exports.updateFacultad=function(id,data) {
    Facultad.update({_id: id}, data, {upsert: true}, function(err) {
      if (!err) {
          console.log(err)
      }
      else {
        if (callback) {
          return callback()
        }
      }
    });
}
