//Modelo de datos para guardar GeoJson de las facultades
var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

    var facultad =  mongoose.Schema ({
      'type': {
        type: String,
        required: true,
        default: 'Feature'
      },
      'geometry': {
        'type': {
          type: String,
          required: true,
          enum: ['Point', 'LineString', 'Polygon'],   //en esta version solo se utiliza Point
          default: 'Point'
        },
        coordinates:
          [
            { type: [ Number ]}
          ]
      },
      'properties': {
        'imgSrc': {
          type: String,
          default: 'http://www3.uah.es/fisymat/UAH_Logo.gif'
          },   //URL de una imagen
        'name':String,
        'info':{
          type: String,
          default: 'No hay información'
          },   //URL de una imagen
      }
    });

module.exports=mongoose.model('Facultad', facultad);
