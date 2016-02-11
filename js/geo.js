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
});

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



function onMapClick(e) {
  var marker = L.marker([e.latlng.lat,e.latlng.lng]).addTo(map);
  routeCoordinates.destination=e.latlng
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
function routeFromMyLocToDest() {
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
function routeFromMyLocToCusPoint() {
  position=null
  function myCallback(position) {
    routeCoordinates.origin.lat=position.latitude;
    routeCoordinates.origin.lng=position.longitude;
    console.log("1")
    console.log(position)
    getRoute(routeCoordinates)
  }
  getLocation(myCallback)
}
