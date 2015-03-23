var prefill = {'city':['City 1', 'City 2 (Optional)'], 'major':['Major 1', 'Major 2 (Optional'], 
				'school':['College 1', 'College 2 (Optional)'], 'spending':['Annual Income ($)'],
				'career':['Career 1', 'Career 2 (Optional)'], 'suggest':['What else would you like to search for?']};

//get all data for the auto completes
var auto_cities, auto_majors, auto_schools, stillover;

stillover = true;

$(document).ready(function() {

	//wait to change bg color until image has loaded
	//first get color from local storage
	var bg_color;
    if (localStorage.getItem("colors"))
    {
        console.log("here");
        var c = jQuery.parseJSON(unescape(localStorage.getItem("colors")));
        bg_color = c["p_hex"];
    }
    else
    	bg_color = "#884412";
    $('<img/>').attr('src', '/assets/examples/city.png').load(function() {
    	$('#city_container').css({"background-color":bg_color});
		$('<img/>').attr('src', '/assets/examples/city_blur.jpeg').load();
	});
	$('<img/>').attr('src', '/assets/examples/career.png').load(function() {
    	$('#career_container').css({"background-color":bg_color});
		$('<img/>').attr('src', '/assets/examples/career_blur.jpeg').load();
	});
	$('<img/>').attr('src', '/assets/examples/school.png').load(function() {
    	$('#school_container').css({"background-color":bg_color});
		$('<img/>').attr('src', '/assets/examples/school_blur.jpeg').load();
	});
	$('<img/>').attr('src', '/assets/examples/major.png').load(function() {
    	$('#major_container').css({"background-color":bg_color});
		$('<img/>').attr('src', '/assets/examples/major_blur.jpeg').load();
	});
	$('<img/>').attr('src', '/assets/examples/spending.png').load(function() {
    	$('#spending_container').css({"background-color":bg_color});
		$('<img/>').attr('src', '/assets/examples/spending_blur.jpeg').load();
	});
	$('<img/>').attr('src', '/assets/examples/suggest.png').load(function() {
    	$('#suggest_container').css({"background-color":bg_color});
		$('<img/>').attr('src', '/assets/examples/suggest_blur.jpeg').load();
	});
		// $('<img/>').attr('src', '/assets/examples/career.png').load(function() {
		// 	$('#career_container').css({"background-color":bg_color});
		// });
		// $('<img/>').attr('src', '/assets/examples/school.png').load(function() {
		// 	$('#school_container').css({"background-color":bg_color});
		// });
		// $('<img/>').attr('src', '/assets/examples/major.png').load(function() {
		// 	$('#major_container').css({"background-color":bg_color});
		// });
		// $('<img/>').attr('src', '/assets/examples/spending.png').load(function() {
		// 	$('#spending_container').css({"background-color":bg_color});
		// });
		// $('<img/>').attr('src', '/assets/examples/suggest.png').load(function() {
		// 	$('#suggest_container').css({"background-color":bg_color});
		// });


	// var blur_1 = new Image(540, 300);
	// blur_1.src = "/assets/examples/city_blur.jpeg";
	// var blur_2 = new Image(540, 300);
	// blur_2.src = "/assets/examples/career_blur.jpeg";
	// var blur_3 = new Image(540, 300);
	// blur_3.src = "/assets/examples/school_blur.jpeg";
	// var blur_4 = new Image(540, 300);
	// blur_4.src = "/assets/examples/major_blur.jpeg";
	// var blur_5 = new Image(540, 300);
	// blur_5.src = "/assets/examples/spending_blur.jpeg";
	// var blur_6 = new Image(540, 300);
	// blur_6.src = "/assets/examples/suggest_blur.jpeg";

	//put in placeholders
	for (category in prefill)
	{
		var arr = prefill[category];
		for (index in arr)
		{
			var i = parseInt(index) + 1;
			$("#search_" + i + "_" + category).attr("placeholder", arr[index]);
		}
	}



	$.post("/api/v1/record_names", {operation: 'get', tables: ['colis']}, function(response) { 
		auto_cities = response;
		$( "#search_1_city" ).autocomplete({
	  		source: function(req, responseFn) {
		  			var re = $.ui.autocomplete.escapeRegex(req.term);
		  			var pattern1 = new RegExp("^"+re, "i");
		  			var a = $.grep(auto_cities, function(item, index){return pattern1.test(item);});
		  			var b = $.grep(auto_cities, function(item, index){return ((item.toLowerCase()).indexOf(re.toLowerCase())>0);});
		  			responseFn(a.concat(b));
		  	},
	  		autoFocus: true,
	  		delay: 0
		});
		$( "#search_2_city" ).autocomplete({
	  		source: function(req, responseFn) {
		  			var re = $.ui.autocomplete.escapeRegex(req.term);
		  			var pattern1 = new RegExp("^"+re, "i");
		  			var a = $.grep(auto_cities, function(item, index){return pattern1.test(item);});
		  			var b = $.grep(auto_cities, function(item, index){return ((item.toLowerCase()).indexOf(re.toLowerCase())>0);});
		  			responseFn(a.concat(b));
		  	},
	  		autoFocus: true,
	  		delay: 0
		});
	});

	$.post("/api/v1/record_names", {operation: 'get', tables: ['majors']}, function(response) { 
		auto_majors = response;
		$( "#search_1_major" ).autocomplete({
	  		source: function(req, responseFn) {
		  			var re = $.ui.autocomplete.escapeRegex(req.term);
		  			var pattern1 = new RegExp("^"+re, "i");
		  			var a = $.grep(auto_majors, function(item, index){return pattern1.test(item);});
		  			var b = $.grep(auto_majors, function(item, index){return ((item.toLowerCase()).indexOf(re.toLowerCase())>0);});
		  			responseFn(a.concat(b));
		  	},
	  		autoFocus: true,
	  		delay: 0
		});
		$( "#search_2_major" ).autocomplete({
	  		source: function(req, responseFn) {
		  			var re = $.ui.autocomplete.escapeRegex(req.term);
		  			var pattern1 = new RegExp("^"+re, "i");
		  			var a = $.grep(auto_majors, function(item, index){return pattern1.test(item);});
		  			var b = $.grep(auto_majors, function(item, index){return ((item.toLowerCase()).indexOf(re.toLowerCase())>0);});
		  			responseFn(a.concat(b));
		  	},
	  		autoFocus: true,
	  		delay: 0
		});
	});

	$.post("/api/v1/record_names", {operation: 'get', tables: ['school']}, function(response) { 
		auto_schools = response;
		$( "#search_1_school" ).autocomplete({
	  		source: function(req, responseFn) {
		  			var re = $.ui.autocomplete.escapeRegex(req.term);
		  			var pattern1 = new RegExp("^"+re, "i");
		  			var a = $.grep(auto_schools, function(item, index){return pattern1.test(item);});
		  			var b = $.grep(auto_schools, function(item, index){return ((item.toLowerCase()).indexOf(re.toLowerCase())>0);});
		  			responseFn(a.concat(b));
		  	},
	  		autoFocus: true,
	  		delay: 0
		});
		$( "#search_2_school" ).autocomplete({
	  		source: function(req, responseFn) {
		  			var re = $.ui.autocomplete.escapeRegex(req.term);
		  			var pattern1 = new RegExp("^"+re, "i");
		  			var a = $.grep(auto_schools, function(item, index){return pattern1.test(item);});
		  			var b = $.grep(auto_schools, function(item, index){return ((item.toLowerCase()).indexOf(re.toLowerCase())>0);});
		  			responseFn(a.concat(b));
		  	},
	  		autoFocus: true,
	  		delay: 0
		});
	});
	stillover = false;



});


function build_city_auto() {
	$( "#search_1_city" ).autocomplete({
  		source: city_auto,
  		autoFocus: true,
  		delay: 200
	});
	$( "#search_2_city" ).autocomplete({
  		source: city_auto,
  		autoFocus: true,
  		delay: 200
	});
};

function build_major_auto() {
	$( "#search_1_major" ).autocomplete({
  		source: major_auto,
  		autoFocus: true,
  		delay: 200
	});
	$( "#search_2_major" ).autocomplete({
  		source: major_auto,
  		autoFocus: true,
  		delay: 200
	});
};

function build_school_auto() {
	$( "#search_1_school" ).autocomplete({
  		source: school_auto,
  		autoFocus: true,
  		delay: 200
	});
	$( "#search_2_school" ).autocomplete({
  		source: school_auto,
  		autoFocus: true,
  		delay: 200
	});
};


function showSearch(type) {
	if (!stillover)
	{
		$("#" + type + "_container").css("background-image", "url(/assets/examples/"+ type +"_blur.jpeg)");
		$("#" + type + "_form").removeAttr("hidden");
		$("#" + type + "_clear").css("visibility", "visible");
	}
};

function leftDiv() {
	stillover = false;
};

function clearFields(type) {
	stillover = true;
	document.getElementById("search_1_" + type).value = "";
	if (type != "spending" && type != "suggest")
		document.getElementById("search_2_" + type).value = "";
	resort(type);
};

function suggestSubmit() {
	window.alert("Thank you, your suggestion has been logged.");
	window.location = "/info/examples";
};

function resort(type) {
	if (document.getElementById("search_1_" + type).value == "" && (type == "suggest" || type == "spending" || document.getElementById("search_2_" + type).value == ""))
	{
		$("#" + type + "_container").css("background-image", "url(/assets/examples/"+ type +".png)");
		$("#" + type + "_form").attr("hidden", "true");
		$("#" + type + "_clear").css("visibility", "hidden");
	}
};

function spendingRedirect() {
	localStorage.setItem("income", document.getElementById("search_1_spending").value);
	localStorage.setItem("query_type", "spending");
	window.location = "../../search/results";
};

function dataRequest(type)
{
	if (dataRequest == "career")
	{
		window.alert("Career data coming soon!");
		return;
	}
	field1 = document.getElementById("search_1_" + type).value;
	if (type == "city" && auto_cities.indexOf(field1) < 0)
		field1 = "";
	field2 = document.getElementById("search_2_" + type).value;
	if (type == "city" && auto_cities.indexOf(field2) < 0)
		field2 = "";
	url = "";

	if(field1 == "" && field2 == ""){
		return;
	}
	else if(field2 == ""){
		url = "https://trycents.com:6001/data/type="+type+"&option="+field1;
	}
	else if(field1 == ""){
		url = "https://trycents.com:6001/data/type="+type+"&option="+field2;
	}
	else{
		url = "https://trycents.com:6001/data/type="+type+"&option="+field1+"&option="+field2;
	}
	var data = new Object();
	var xmlHttp = null;

    xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", url, true );

    xmlHttp.onreadystatechange = function() {
    	if (xmlHttp.readyState === 4) { 
      		if (xmlHttp.status === 200) {
      			data = jQuery.parseJSON(xmlHttp.responseText);
      			//make api request here with type included
				localStorage.setItem("query_type", type);
				localStorage.setItem("data_store",JSON.stringify(data));
				window.location = "../../search/results";
      		}
      	}
    }
    xmlHttp.send( null );
}
