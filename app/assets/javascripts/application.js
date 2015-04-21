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

var user_id, api_key;

//determine which js file to load
var path = window.location.pathname.split('/');
if (path[1] == "wizard" && path[2] != "start" && path[2] != "education")
{
	//sessionStorage.removeItem("data_store");
	var script = document.createElement("script");
	script.type = "application/javascript";
	script.src = "../assets/" + path[2] + ".js";
	document.getElementsByTagName("body")[0].appendChild(script);
}

else if (path[1] == "search" && path[2] == "results")
{
	var query_type = sessionStorage.getItem("query_type");
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
					sessionStorage.setItem("stored_query",data["query"]);
					window.location = "/info/examples/";
				}
				else if(data["query_type"] == "spending"){
					if (user_id)
					{
						$.post("/api/v2/users/" + user_id + "/query?api_key=" + api_key, {"url": query});
						$.post("/api/v2/users/" + user_id + "/completed?api_key=" + api_key, {"section": "Use Main Search"});
					}
					sessionStorage.setItem("query_type",data["query_type"]);
					sessionStorage.setItem("income",data["income"]);
					window.location = "/search/results";
				}
				else {
					if (user_id)
					{
						$.post("/api/v2/users/" + user_id + "/query?api_key=" + api_key, {"url": query});
						$.post("/api/v2/users/" + user_id + "/completed?api_key=" + api_key, {"section": "Use Main Search"});
					}
    				sessionStorage.removeItem("data_store");

    				var o1 = null;
			  		var o2 = null;
			  		if(data["elements"])
			  		{
	    				if(data["elements"].length > 2) {
	    					for(var i = 0; i < data["elements"].length; i++) {
				  				$('#disSelections > tbody:last').append("<tr><td><input type='checkbox' name='"+i+"' class='obj'/></td><td>"+data['elements'][i]['name']+"</td></tr>");
				  			}

				  			$('#disModal').show();

				  			$('#sub').click(function(event){
				  				var obs = $('input:checkbox:checked.obj').map(function () {
								  return this.name;
								}).get();

				  				if(obs.length == 0 || obs.length > 2){
				  					alert("Please click one or two only.");
				  				}
				  				else{
				  					o1 = data["elements"][obs[0]];
				  					if(obs.length == 2){
				  						o2 = data["elements"][obs[1]];
				  					}

				  					delete data["elements"];

						    		Object.keys(o1).forEach(function(key) {
						    			var nKey = key + "_1";
						    			data[nKey] = o1[key];
									});
									data["name_1"] = o1["name"];
						    		if(o2 != null){
										Object.keys(o2).forEach(function(key) {
											var nKey = key + "_2";
							    			data[nKey] = o2[key];
										});
										data["name_2"] = o2["name"];
									}
				  					$('#disModal').hide();

				  					sessionStorage.setItem("data_store", JSON.stringify(data));
									sessionStorage.setItem("query_type", data["query_type"]);
									window.location = "/search/results/";
				  				}
				  			});
				    	}
				    	else {
				    		o1 = data["elements"][0];
		  					if(data["elements"].length == 2){
		  						o2 = data["elements"][1];
		  					}

				    		Object.keys(o1).forEach(function(key) {
				    			var nKey = key + "_1";
				    			data[nKey] = o1[key];
							});

							//data["name_1"] = o1["name"];
				    		if(o2 != null){
								Object.keys(o2).forEach(function(key) {
									var nKey = key + "_2";
					    			data[nKey] = o2[key];
								});
								//data["name_2"] = o2["name"];
							}
				    		sessionStorage.setItem("data_store", JSON.stringify(data));
							sessionStorage.setItem("query_type", data["query_type"]);
							window.location = "/search/results/";
				    	}
					}
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

function cleanUp() {
	user_id = null;
	api_key = null;
	sessionStorage.clear();
};

