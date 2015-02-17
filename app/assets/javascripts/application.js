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
	localStorage.removeItem("data_store");
	var script = document.createElement("script");
	script.type = "application/javascript";
	script.src = "../assets/" + path[2] + ".js";
	document.getElementsByTagName("body")[0].appendChild(script);
}

else if (path[1] == "search" && path[2] == "results")
{
	var query_type = localStorage.getItem("query_type");
 	//localStorage.removeItem("query_type");

	getPartial(query_type);
}


function getPartial(query_type){
	$.get("../getPartial", {query_type: query_type}, function(response){  
	$("div").removeClass("center");                
  	$(response).appendTo("#main_body");
  	var script = document.createElement("script");
	script.type = "application/javascript";
	script.src = "/../assets/" + query_type + ".js";
	document.getElementsByTagName("body")[0].appendChild(script);
  });

};


function api_request(query) {

	//send request to api

	//data returned
	var data =  new Object();

	var url = "https://www.trycents.com:6001/query/" + query;

	var xmlHttp = null;

    xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", url, false );
    xmlHttp.send( null );
    data = jQuery.parseJSON(xmlHttp.responseText);

	//console.log(data)

	//store query type in local storage

	/*data.weather_1 =    [38.0, 44.0, 53.0, 61.0, 71.0, 82.0, 90.0, 89.0, 78.0, 65.0, 50.0, 40.0, 38.0, 90.0];
	data.weatherlow_1 = [26.0, 31.0, 38.0, 43.0, 52.0, 61.0, 69.0, 67.0, 58.0, 46.0, 36.0, 27.0, 26.0, 69.0];
	data.weather_2    = [67.0, 71.0, 77.0, 85.0, 95.0, 104.0, 106.0, 104.0, 100.0, 89.0, 76.0, 66.0, 66.0, 106.0];
	data.weatherlow_2 = [46.0, 49.0, 53.0, 60.0, 69.0, 78.0, 83.0, 83.0, 77.0, 65.0, 53.0, 45.0, 45.0, 83.0];

	data.location_1 = "Salt Lake City, UT";
	data.location_2 = "Phoenix, AZ";

	data.cli_1 = [102, 94, 95, 95, 119, 105, 92, 92, 119];
	data.cli_2 = [96, 92, 100, 106, 97, 101, 99, 92, 106];

	data.labor_1 = [3.4, 48000, 4.2];
	data.labor_2 = [6.4, 51000, null];
	data.labor_3 = [5.8, 44800, 4.6];

	data.taxes_1 = [6.85, 5.0, 5.0, 0.67];
	data.taxes_2 = [8.3, 2.59, 4.54, 1.59];
	data.taxes_3 = [8.25, 3.5, 7.8, 1.15];*/

	if(data["operation"] == "undefined") {
		window.location = "/info/examples/";
	}
	else {
		//write data to local storage for results page
		localStorage.removeItem("data_store");
		localStorage.setItem("data_store", JSON.stringify(data));
		localStorage.setItem("query_type", data["query_type"]);

		window.location = "/search/results/";
	}
};

