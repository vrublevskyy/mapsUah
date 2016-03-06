//---------------------- Global vars
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




//---------------------- Global map settings,functions,vars
var map = L.map('map').setView([40.5126759, -3.3502846], 13);
// add an OpenStreetMap tile layer
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var marker = L.marker([0,0]).addTo(map);
// Guarda las coordenadas del mapa y los muestra en el textbox
function onMapClick(e) {
  marker.setLatLng(e.latlng);
  document.getElementById("lat").value = e.latlng.lat.toFixed(4);
  document.getElementById("lng").value = e.latlng.lng.toFixed(4);
  routeCoordinates.destination=e.latlng
}

map.on('click', onMapClick);
//actualiza los valores si cambia el punto en el mapa
$( "#lat" ).change(function(value) {
  routeCoordinates.destination.lat=value.target.valueAsNumber;
  marker.setLatLng(routeCoordinates.destination);
});
$( "#lng" ).change(function(value) {
  routeCoordinates.destination.lng=value.target.valueAsNumber;
  marker.setLatLng(routeCoordinates.destination);
});

//---------------------- Operations

//Envia el formulario con los datos actualizados
$('#send').click( function() {

    $.ajax({
        url: 'http://www.paradisecity.me:3000/updateFacultad',
        type: 'post',
        dataType: 'json',
        data: $('#sendForm').serialize(),
        success: function() {
                  alert("Actualizado");
                window.location.href="http://ivr0.myqnapcloud.com:8082/admin/index.html" },
         error:  function(XMLHttpRequest, textStatus, errorThrown) {
             alert("Status: " + textStatus+"Error: " + errorThrown);
             window.location.href="http://ivr0.myqnapcloud.com:8082/admin/index.html"         }
    });
});
//Elimina la facultad seleccionada
$('#delete').click( function() {
  var parser = document.createElement('a');
  parser.href = window.location.href;
  data={"id":parser.hash.replace(/\#/g, '') }
    $.ajax({
        url: 'http://www.paradisecity.me:3000/removeFacultad',
        type: 'post',
        dataType: 'json',
        data: data,
        success: function(data) {
                alert("Eliminado");
                   window.location.href="http://ivr0.myqnapcloud.com:8082/admin/index.html"
                 },
         error:  function(XMLHttpRequest, textStatus, errorThrown) {
             alert("Status: " + textStatus+"Error: " + errorThrown);
       window.location.href="http://ivr0.myqnapcloud.com:8082/admin/index.html"         }
    });
    return false;
});

//Rellena los campos con el id que se pasa en la url
$(document).ready(function () {
  var parser = document.createElement('a');
  parser.href = window.location.href;
  data={"id":parser.hash.replace(/\#/g, '') }
  $.ajax({
      url: 'http://www.paradisecity.me:3000/findById/'+data.id,
      type: 'GET',
      dataType: 'json',
      success: function(data) {
                document.getElementById("doc_id").value =data['_id']
                document.getElementById("lat").value = data.geometry.coordinates[0];
                document.getElementById("lng").value = data.geometry.coordinates[1];
                document.getElementById("name").value = data.properties.name;
                document.getElementById("img").value = data.properties.imgSrc;
                document.getElementById("info").value = data.properties.info;
                marker.setLatLng(data.geometry.coordinates);
               },
     error:  function(XMLHttpRequest, textStatus, errorThrown) {
         alert("Status: " + textStatus+"Error: " + errorThrown);
     }
  });
});
