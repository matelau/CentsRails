

function showSearch(type, side) {
	$("#" + type + "_container").empty();
	var toAdd = "<div id='" + type + "_search' height='300px' width='540px' style='display:inline; float:left; box-shadow: -5px 5px 3px #CDCDCD; background-image: url(/assets/" + type + "_compare_blur.jpeg); height: 300px; width: 540px; margin-" + side + ": 10px'></div></li>";
	$(toAdd).appendTo("#" + type + "_container");
	//build search objects
	var search = "<form><ul class='examples_search'><li><input class='search_1_examples' id='search_1_name' type='text'></li>";
	search += "<li><p class='versus'>VS.</p></li>";
	search += "<li><input class='search_2_examples' id='search_2_name' type='text'></li>";
	search += "<li><button class='circle-arrow-examples'><img src='/assets/circle arrow.png' height='38px' width='38px'></button></li>";
	search += "<li><a class='btn btn-default' onclick='resort(&quot;" + type + "&quot;, &quot;" + side + "&quot;)'>CANCEL</li>";
	search += "</ul></form>";
	$(search).appendTo("#" + type + "_search");
};

function resort(type, side) {
	$("#" + type + "_container").empty();
	var toAdd = "<div height='300px' width='540px' onclick='showSearch(&quot;" + type + "&quot;, &quot;" + side + "&quot;)' style='display:inline; box-shadow: -5px 5px 3px #CDCDCD; float:left;";
	toAdd += "background-image: url(/assets/" + type + "_compare.jpeg); height: 300px; width: 540px; margin-" + side + ": 10px'></div>";
	$(toAdd).appendTo("#" + type + "_container");
};
