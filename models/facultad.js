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
          enum: ['Point', 'LineString', 'Polygon'],
          default: 'Point'
        },
        coordinates:
          [
            { type: [ Number ]}
          ]
      },
      'properties': {
        'imgSrc': String,
        'name':String,
        'info':String
      }
    });

module.exports=mongoose.model('Facultad', facultad);
