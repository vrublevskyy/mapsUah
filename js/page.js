$.ajax({
    url: 'http://www.paradisecity.me:3000/getAllFacultades',
    type: 'GET',
    dataType: 'json',
    success: function(data) {
               console.log(data)
               for (var facultad in data) {
                 $('#facultades').append("<div class=\"col-lg-3 col-md-4 col-xs-6 thumb\"> <a href=\"file:///home/ivan/git/clientMapAdmin/manage.html\"><img src="+data[facultad].properties.imgSrc+" alt=\"\" /></a>  \
                   <h4><a href=\"file:///home/ivan/git/clientMapAdmin/manage.html/?"+data[facultad].properties.name+"\">"+data[facultad].properties.name+"</a></h4> \
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
