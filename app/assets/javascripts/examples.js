var prefill = {'city':['City 1', 'City 2 (Optional)'], 'major':['Major 1', 'Major 2 (Optional'], 
				'school':['College 1', 'College 2 (Optional)'], 'spend':['Annual Income ($)'],
				'career':['Career 1', 'Career 2 (Optional)']};

//precache the grayed out images
var blur_1 = new Image(540, 300);
blur_1.src = "/assets/city_compare_blur.jpeg";
var blur_2 = new Image(540, 300);
blur_2.src = "/assets/career_compare_blur.jpeg";
var blur_3 = new Image(540, 300);
blur_3.src = "/assets/school_compare_blur.jpeg";
var blur_4 = new Image(540, 300);
blur_4.src = "/assets/major_compare_blur.jpeg";
var blur_5 = new Image(540, 300);
blur_5.src = "/assets/spend_compare_blur.jpeg";
var blur_6 = new Image(540, 300);
blur_6.src = "/assets/suggest_blur.jpeg";

//get all data for the auto completes
var city_auto, major_auto, school_auto;

$.post("/api/v1/record_names", {operation: 'get', tables: ['colis']}, function(response) { 
	city_auto = response;
});
$.post("/api/v1/record_names", {operation: 'get', tables: ['schools']}, function(response) { 
	school_auto = response;
});
$.post("/api/v1/record_names", {operation: 'get', tables: ['majors']}, function(response) { 
	major_auto = response;
});			



function build_city_auto() {
	$( "#search_1_city" ).autocomplete({
  		source: city_auto,
  		autoFocus: true,
  		delay: 0
	});
	$( "#search_2_city" ).autocomplete({
  		source: city_auto,
  		autoFocus: true,
  		delay: 0
	});
};

function build_major_auto() {
	$( "#search_1_major" ).autocomplete({
  		source: major_auto,
  		autoFocus: true,
  		delay: 0
	});
	$( "#search_2_major" ).autocomplete({
  		source: major_auto,
  		autoFocus: true,
  		delay: 0
	});
};

function build_school_auto() {
	$( "#search_1_school" ).autocomplete({
  		source: school_auto
	});
	$( "#search_2_school" ).autocomplete({
  		source: school_auto
	});
};


function showSearch(type, side) {
	$("#" + type + "_container").empty();
	var toAdd = "<div id='" + type + "_search' height='300px' onmouseleave='resort(&quot;" + type + "&quot;, &quot;" + side + "&quot;)' width='540px' style='display:inline; float:left; box-shadow: -5px 5px 3px #CDCDCD; background-image: url(/assets/" + type + "_compare_blur.jpeg); height: 300px; width: 540px; margin-" + side + ": 10px'></div></li>";
	$(toAdd).appendTo("#" + type + "_container");
	//build search objects
	var search = "<a class='btn btn-default' onclick='clearFields(&quot;" + type + "&quot;, &quot;" + side + "&quot;);' style='float: right;'>X</a>"; 
	if (type != "spend")
	{
		search += "<form onsubmit='dataRequest(&quot;" + type + "&quot;); return false;'><ul class='examples_search'><li><input class='search_1_examples' id='search_1_" + type + "' type='text'></li>";
		search += "<li><p class='versus'>VS.</p></li>";
		search += "<li><input class='search_2_examples' id='search_2_" + type + "' type='text'></li>";
	}
	else
	{
		search += "<form onsubmit='spendingRedirect(); return false;'><ul class='examples_search'><li><input class='search_1_examples_suggest' id='search_1_" + type + "' type='text'></li>";
	}
	search += "<li><button class='circle-arrow-examples'><img src='/assets/circle arrow.png' height='38px' width='38px'></button></li>";
	search += "</ul></form>";
	$(search).appendTo("#" + type + "_search");
	//add in placeholders
	$("#search_1_" + type ).attr("placeholder", prefill[type][0]);
	if (type != "spend")
		$("#search_2_" + type ).attr("placeholder", prefill[type][1]);
	if (type == "city")
		build_city_auto();
	if (type == "major")
		build_major_auto();
	if (type == "school")
		build_school_auto();
};

function showSuggest() {
	$("#suggest_container").empty();
	var toAdd = "<div id='suggest_search' height='300px' width='540px' onmouseleave='suggestResort()' style='display:inline; box-shadow: -5px 5px 3px #CDCDCD; float:left; background-image: url(/assets/suggest_blur.jpeg); height: 300px; width: 540px; margin-left: 10px'></div>";
	$(toAdd).appendTo("#suggest_container");
	//build search objects
	var search = "<a class='btn btn-default' onclick='clearSuggest();' style='float: right;'>X</a>"; 
	search += "<form onsubmit='suggestSubmit(); return false;'><ul class='examples_search'><li><textarea maxlength='465' class='suggest_1' id='suggest_1_name'/></li>";
	search += "<li><button type='submit' class='circle-arrow-examples'><img src='/assets/circle arrow.png' height='38px' width='38px'></button></li>";
	search += "</ul></form>";
	$(search).appendTo("#suggest_search");
	$("#suggest_1_name").attr("placeholder", "What else would you like to seach for?");
};

function clearFields(type, side) {
	document.getElementById("search_1_" + type).value = "";
	if (type != "spend")
		document.getElementById("search_2_" + type).value = "";
	resort(type, side);
};

function clearSuggest()
{
	document.getElementById("suggest_1_name").value = "";
	suggestResort();
};

function suggestSubmit() {
	window.alert("Thank you, your suggestion has been logged.");
	window.location = "/info/examples";
};


function suggestResort() {
	if (document.getElementById("suggest_1_name").value == "")
	{
		$("#suggest_container").empty();
		var toAdd = "<div height='300px' width='540px' onmouseover='showSuggest()' style='display:inline; box-shadow: -5px 5px 3px #CDCDCD; float:left; background-image: url(/assets/suggest.jpeg); height: 300px; width: 540px; margin-left: 10px'></div>;"
		$(toAdd).appendTo("#suggest_container");
	}
};


function resort(type, side) {
	if (document.getElementById("search_1_" + type).value == "" && (type == "spend" || document.getElementById("search_2_" + type).value == ""))
	{
		$("#" + type + "_container").empty();
		var toAdd = "<div height='300px' width='540px' onmouseover='showSearch(&quot;" + type + "&quot;, &quot;" + side + "&quot;)' style='display:inline; box-shadow: -5px 5px 3px #CDCDCD; float:left;";
		toAdd += "background-image: url(/assets/" + type + "_compare.jpeg); height: 300px; width: 540px; margin-" + side + ": 10px'></div>";
		$(toAdd).appendTo("#" + type + "_container");
	}
};

function spendingRedirect() {
	localStorage.setItem("income", document.getElementById("search_1_spend").value);
	localStorage.setItem("query_type", "spending");
	window.location = "../../search/results";
};

function dataRequest(type)
{
	field1 = document.getElementById("search_1_" + type).value;
	if (type == "city" && city_auto.indexOf(field1) < 0)
		field1 = "";
	field2 = document.getElementById("search_2_" + type).value;
	if (type == "city" && city_auto.indexOf(field2) < 0)
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
