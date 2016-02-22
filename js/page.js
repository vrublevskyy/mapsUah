$.ajax({
    url: 'http://www.paradisecity.me:3000/getAllFacultades',
    type: 'GET',
    dataType: 'json',
    success: function(data) {
               console.log(data)
               for (var facultad in data) {
                 $('#facultades').append("<div class=\"col-lg-3 col-md-4 col-xs-6 thumb\"> <a href=\"http://192.168.1.150:8082/manage.html#"+data[facultad]._id+"\"><img src="+data[facultad].properties.imgSrc+" alt=\"\" /></a>  \
                   <h4><a href=\"http://192.168.1.150/manage.html/#"+data[facultad]._id+"\">"+data[facultad].properties.name+"</a></h4> \
                   <p>"+data[facultad].properties.info+"</p> \
                 </div>");
               }

             },
    error: function(XMLHttpRequest, textStatus, errorThrown) {
        console.log("Status: " + textStatus); console.log("Error: " + errorThrown);
    }

});

$(document).ready(function () {

});
