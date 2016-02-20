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

$('#send').click( function() {
    $.ajax({
        url: 'http://localhost:3000/addFacultad',
        type: 'post',
        dataType: 'json',
        data: $('#sendForm').serialize(),
        success: function(data) {
                   window.history.go(-1);
                 }
    });
});

$('#delete').click( function() {
    $.ajax({
        url: 'http://localhost:3000/addFacultad',
        type: 'DELETE',
        dataType: 'json',
        data: $('#sendForm').serialize(),
        success: function(data) {
                   window.history.go(-1);
                 }
    });
});


//---------------------- Global map settings,functions,vars

// add an OpenStreetMap tile layer
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var marker = L.marker([0,0]).addTo(map);

function onMapClick(e) {
  marker.setLatLng(e.latlng);
  document.getElementById("lat").value = e.latlng.lat.toFixed(4);
  document.getElementById("lng").value = e.latlng.lng.toFixed(4);
  routeCoordinates.destination=e.latlng
}

map.on('click', onMapClick);

$( "#lat" ).change(function(value) {
  routeCoordinates.destination.lat=value.target.valueAsNumber;
  marker.setLatLng(routeCoordinates.destination);
});
$( "#lng" ).change(function(value) {
  routeCoordinates.destination.lng=value.target.valueAsNumber;
  marker.setLatLng(routeCoordinates.destination);
});

//---------------------- Map operations: routes, search points.....
