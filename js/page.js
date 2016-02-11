var t = $.template('<div class="item">  \
    <div class="row"> \
        <div class="col-sm-3"><a href="#x" class="thumbnail"><img src="${url}" alt="${url}" class="img-responsive"></a> \
        </div> \
        <div class="col-sm-3"><a href="#x" class="thumbnail"><img src="${url}" alt="${url}" class="img-responsive"></a> \
        </div> \
        <div class="col-sm-3"><a href="#x" class="thumbnail"><img src="${url}" alt="${url}" class="img-responsive"></a> \
        </div> \
        <div class="col-sm-3"><a href="#x" class="thumbnail"><img src="${url}" alt="${url}" class="img-responsive"></a> \
        </div> \
    </div> \
    <!--/row--> \
</div>');


$(selector).append( t , {
     url: jsonObj.url,
     name: jsonObj.name
});
