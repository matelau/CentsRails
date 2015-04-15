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




//forward declaration
function changeMade(){};

var user_id;

//determine which js file to load
var path = window.location.pathname.split('/');
if (path[1] == "wizard" && path[2] != "start" && path[2] != "education")
{
	//localStorage.removeItem("data_store");
	var script = document.createElement("script");
	script.type = "application/javascript";
	script.src = "../assets/" + path[2] + ".js";
	document.getElementsByTagName("body")[0].appendChild(script);
}

else if (path[1] == "search" && path[2] == "results")
{
	var query_type = localStorage.getItem("query_type");

	getPartial(query_type);
}


function getPartial(query_type){
	$.get("/search/getPartial", {query_type: query_type}, function(response){  
		$(".center").remove();               
	  	$(response).appendTo("#main_body");
	  	var script = document.createElement("script");
		script.type = "application/javascript";
		script.src = "/../assets/" + query_type + ".js";
		document.getElementsByTagName("body")[0].appendChild(script);
	});
};

function api_request(query) {
	query = query.replace('/', '');
	var temp = query.replace(/\s+/g, '');
	if (temp == "")
		return;
	var data =  new Object();

	var url = "https://trycents.com:6001/query/" + query;

	var xhr = null;

    xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);

    xhr.onreadystatechange = function() {
    	if (xhr.readyState === 4) { 
      		if (xhr.status === 200) {
      			data = jQuery.parseJSON(xhr.responseText);

				if(data["operation"] == "undefined") {
					localStorage.setItem("stored_query",data["query"])
					window.location = "/info/examples/";
				}
				else {
    				localStorage.removeItem("data_store");
					localStorage.setItem("data_store", JSON.stringify(data));
					localStorage.setItem("query_type", data["query_type"]);
					//ok query, save to user
					$.post("/api/v2/users/" + user_id + "/query", {"url": query});
					window.location = "/search/results/";
				}
      		}
  		}
  	};

  	xhr.onerror = function() {
  		window.location = "/info/down/";
  	};

  	xhr.ontimeout = function() {
  		window.location = "/info/down/";
  	};
  	
  	xhr.send(null);

  	$('#search-bar').attr("hidden", "true");
    $('#loading').removeAttr("hidden");
    
};

