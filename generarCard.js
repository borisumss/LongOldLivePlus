import $ from "jquery";
addCols();
let num = 5;  /* select count -> es la cantidad de ejercicios registrados en firebase */
var addCols = function () {
    for (var i = 1; i <= num; i++) {
        var myCol = $('<div class="col-sm-3 col-md-3 pb-2"></div>');
        var myPanel = $('<div class="card card-outline-info" id="' + i + 'Panel"><div class="card-block"><div class="card-title"><span>Card #' + i + '</span><button type="button" class="close" data-target="#' + i + 'Panel" data-dismiss="alert"><span class="float-right"><i class="fa fa-remove"></i></span></button></div><p>Some text in ' + i + ' </p><img src="//placehold.it/50/eeeeee" class="rounded rounded-circle"></div></div>');
        myPanel.appendTo(myCol);
        myCol.appendTo('#contentPanel');
    }
};