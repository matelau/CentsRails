// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery.validate
//= require jquery.validate.additional-methods
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require material
//= require ripples



//determine which js file to load
var path = window.location.pathname.split('/');
if (path[1] == "wizard" && path[2] != "start" && path[2] != "education")
{
	var script = document.createElement("script");
	var type = "application/javascript";
	script.src = "../assets/" + path[2] + ".js";
	document.getElementsByTagName("body")[0].appendChild(script);
}
else if (path[1] == "results")
{
	//check to see what type of data was returned
}


function api_request(query) {
	var url = "http://localhost:6001/query/" + query;
	$.get(url, function(resp){
		data = jQuery.parseJSON(resp);
		if(data["operation"] == "undefined")
		{
			window.location = "/info/examples/"
		}
		else
		{
			window.location = "/wizard/city/?" + resp;
		}
	});
};

