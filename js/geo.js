//---------------------- Global vars
var map = L.map('map').setView([40.5126759, -3.3502846], 13);
var myServer="http://router.project-osrm.org"
var routeCoordinates={
  "origin":{
    "lat":null,
    "lng":null
  },
  "destination":{
    "lat":null,
    "lng":null
  }
}
var position=null

//---------------------- Global settings functions

$(document).ready(function () {
  $.ajax({
  url: 'http://www.paradisecity.me:3000/getAllFacultades',
  type: 'GET',
  dataType: 'json',
  success: function(data) {
             console.log(data)
             for (var facultad in data) {
console.log(data[facultad]._id)

               $('#facultades').append("<div class=\"col-lg-3 col-md-4 col-xs-6 thumb\"><div id=\""+facultad+"\"  onclick=\"searchRouteFromPoint('"+data[facultad]._id+"')\"> <a><img src="+data[facultad].properties.imgSrc+"></a>  \
                 <h4><a>"+data[facultad].properties.name+"</a></h4> \
                 <p>"+data[facultad].properties.info+"</p> </div> \
                 <button type=\"button\" class=\"btn btn-default btn-lg\" onclick=\"searchRouteFromGPS('"+data[facultad]._id+"')\" >Desde mi posición</button> \
               </div>");
             }
           },
  error: function(XMLHttpRequest, textStatus, errorThrown) {
      console.log("Status: " + textStatus); console.log("Error: " + errorThrown);
  }

  });
});

function searchRouteFromGPS (id){
  $.ajax({
    url: 'http://www.paradisecity.me:3000/findById',
    type: 'GET',
    dataType: 'json',
    data: {'id':id},
    success: function(data) {
              routeCoordinates.destination.lat = data.geometry.coordinates[0];
              routeCoordinates.destination.lng = data.geometry.coordinates[1];

              routeFromMyLocation();
             },
   error:  function(XMLHttpRequest, textStatus, errorThrown) {
       alert("Status: " + textStatus+"Error: " + errorThrown);
   }
});
}

function searchRouteFromPoint (id){
  $.ajax({
    url: 'http://www.paradisecity.me:3000/findById',
    type: 'GET',
    dataType: 'json',
    data: {'id':id},
    success: function(data) {
              routeCoordinates.destination.lat = data.geometry.coordinates[0];
              routeCoordinates.destination.lng = data.geometry.coordinates[1];

              routeFromPoint();
             },
   error:  function(XMLHttpRequest, textStatus, errorThrown) {
       alert("Status: " + textStatus+"Error: " + errorThrown);
   }
});
}

function getLocation(myCallback) {
  function setPosition(position) {
    position = position.coords;
    console.log(position)
    if (myCallback) {
      myCallback(position)
    }
  }
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(setPosition);
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
}


//---------------------- Global map settings,functions,vars

// add an OpenStreetMap tile layer
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var marker = L.marker([0,0]).addTo(map);

function onMapClick(e) {
  marker.setLatLng(e.latlng);
  routeCoordinates.origin=e.latlng
}

map.on('click', onMapClick);



//---------------------- Map operations: routes, search points.....

//Devuelve una ruta entre el origen y el destino
function getRoute(routeCoordinates) {
  console.log("2")
  var options = {
    host: myServer,
    path: '/viaroute?loc='+routeCoordinates.origin.lat+','+routeCoordinates.origin.lng+'&loc='+routeCoordinates.destination.lat+','+routeCoordinates.destination.lng+'&instructions=false&compression=true'
  };
console.log(JSON.stringify(routeCoordinates));
console.log(options.host+options.path);
jQuery.ajax({
    type: "GET",
    url: options.host+options.path,
    success: function(data){
        console.log(data.route_geometry)
        data=polyline.decode(data.route_geometry);
        console.log(data)
        L.polyline(data).addTo(map)
    },
    failure: function(errorMsg) {
        alert(errorMsg);
    }
});

}

//ruta desde mi ubicacion hasta un destino seleccionado
function routeFromMyLocation() {
  position=null
  function myCallback(position) {
    routeCoordinates.origin.lat=position.latitude;
    routeCoordinates.origin.lng=position.longitude;
    console.log(position)
    getRoute(routeCoordinates)
  }
  getLocation(myCallback)
}

//ruta desde mi ubicacion hasta un elemento guardado en la BBDD
function routeFromPoint() {
    console.log(routeCoordinates.origin)
  if (routeCoordinates.origin.lat && routeCoordinates.origin.lng) {
    getRoute(routeCoordinates);
  }else {
    alert("Seleccione un punto en el mapa")
  }

}
