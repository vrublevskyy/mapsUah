$(document).ready(function () {
    $.ajax({
    url: 'http://www.paradisecity.me:3000/getAllFacultades',
    type: 'GET',
    dataType: 'json',
    success: function(data) {
               console.log(data)
               for (var facultad in data) {
                 $('#facultades').append("<div id=\""+facultad+"\" class=\"col-lg-3 col-md-4 col-xs-6 thumb\"> <a><img src="+data[facultad].properties.imgSrc+"/></a>  \
                   <h4><a>"+data[facultad].properties.name+"</a></h4> \
                   <p>"+data[facultad].properties.info+"</p> \
                   <button type=\"button\" class=\"btn btn-default btn-lg\" onclick=\"setPoint(\""+data[facultad]._id+"\")\" ></button> \
                 </div>");
               }

             },
    error: function(XMLHttpRequest, textStatus, errorThrown) {
        console.log("Status: " + textStatus); console.log("Error: " + errorThrown);
    }

    });
});

function setPoint (data){
    console.log(data)
}
