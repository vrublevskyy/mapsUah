$(document).ready(function () {
    $.ajax({
    url: 'http://www.paradisecity.me:3000/getAllFacultades',
    type: 'GET',
    dataType: 'json',
    success: function(data) {
               console.log(data)
               var htmlCode="<div class=\"col-lg-3 col-md-4 col-xs-6 thumb\" onclick=\"setPoint("+data[facultad]._id+")\"> \
               <img src="+data[facultad].properties.imgSrc+" alt=\"\" /></a>  \
               <h4><a href=\"#"\">"+data[facultad].properties.name+"</a></h4> \
               <p>"+data[facultad].properties.info+"</p></div>"
               console.log(htmlCode)
               for (var facultad in data) {
                 $('#facultades').append(htmlCode);
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

("<div class=\"col-lg-3 col-md-4 col-xs-6 thumb\" onclick=\"setPoint("+data[facultad]._id+")\"><img src="+data[facultad].properties.imgSrc+" alt=\"\" /></a><h4><a href=\"#"\">"+data[facultad].properties.name+"</a></h4><p>"+data[facultad].properties.info+"</p></div>")


("<div class=\"col-lg-3 col-md-4 col-xs-6 thumb\" onclick=\"setPoint("+data[facultad]._id+")\"><img src=\""+data[facultad].properties.imgSrc+"\" alt=\"\" /></a><h4><a href=\"#"\">"+data[facultad].properties.name+"</a></h4><p>"+data[facultad].properties.info+"</p></div>"
