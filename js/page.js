//Genera la lista de las facultades a partir de los datos del servidor

$.ajax({
    url: 'http://www.paradisecity.me:3000/getAllFacultades',
    type: 'GET',
    dataType: 'json',
    success: function(data) {
               console.log(data)
               for (var facultad in data) {
                 $('#facultades').append("<div class=\"col-lg-3 col-md-4 col-xs-8 thumb\"> <a href=\"http://ivr0.myqnapcloud.com:8082/admin/manage.html#"+data[facultad]._id+"\"><img src="+data[facultad].properties.imgSrc+" alt=\"\" /></a>  \
                   <h4><a href=\"http://ivr0.myqnapcloud.com:8082/admin/manage.html#"+data[facultad]._id+"\">"+data[facultad].properties.name+"</a></h4> \
                   <p>"+data[facultad].properties.info+"</p> \
                 </div>");
               }

             },
    error: function(XMLHttpRequest, textStatus, errorThrown) {
        console.log("Status: " + textStatus); console.log("Error: " + errorThrown);
    }

});
