//pre caches the grayed out images
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





function showSearch(type, side) {
	$("#" + type + "_container").empty();
	var toAdd = "<div id='" + type + "_search' height='300px' onmouseleave='resort(&quot;" + type + "&quot;, &quot;" + side + "&quot;)' width='540px' style='display:inline; float:left; box-shadow: -5px 5px 3px #CDCDCD; background-image: url(/assets/" + type + "_compare_blur.jpeg); height: 300px; width: 540px; margin-" + side + ": 10px'></div></li>";
	$(toAdd).appendTo("#" + type + "_container");
	//build search objects
	var search = "<form><ul class='examples_search'><li><input class='search_1_examples' id='search_1_name' type='text'></li>";
	search += "<li><p class='versus'>VS.</p></li>";
	search += "<li><input class='search_2_examples' id='search_2_name' type='text'></li>";
	search += "<li><button class='circle-arrow-examples'><img src='/assets/circle arrow.png' height='38px' width='38px'></button></li>";
	//search += "<li><a class='btn btn-default' onclick='resort(&quot;" + type + "&quot;, &quot;" + side + "&quot;)'>CANCEL</li>";
	search += "</ul></form>";
	$(search).appendTo("#" + type + "_search");
};

function showSuggest() {
	$("#suggest_container").empty();
	var toAdd = "<div id='suggest_search' height='300px' width='540px' onmouseleave='suggestResort()' style='display:inline; box-shadow: -5px 5px 3px #CDCDCD; float:left; background-image: url(/assets/suggest_blur.jpeg); height: 300px; width: 540px; margin-left: 10px'></div>";
	$(toAdd).appendTo("#suggest_container");
	//build search objects
	var search = "<form><ul class='examples_search'><li><input class='search_1_examples' id='search_1_name' type='text'></li>";
	// search += "<li><p class='versus'>VS.</p></li>";
	// search += "<li><input class='search_2_examples' id='search_2_name' type='text'></li>";
	search += "<li><button class='circle-arrow-examples'><img src='/assets/circle arrow.png' height='38px' width='38px'></button></li>";
	//search += "<li><a class='btn btn-default' onclick='suggestResort()'>CANCEL</li>";
	search += "</ul></form>";
	$(search).appendTo("#suggest_search");
};

function suggestResort() {
	$("#suggest_container").empty();
	var toAdd = "<div height='300px' width='540px' onmouseover='showSuggest()' style='display:inline; box-shadow: -5px 5px 3px #CDCDCD; float:left; background-image: url(/assets/suggest.jpeg); height: 300px; width: 540px; margin-left: 10px'></div>;"
	$(toAdd).appendTo("#suggest_container");
};


function resort(type, side) {
	$("#" + type + "_container").empty();
	var toAdd = "<div height='300px' width='540px' onmouseover='showSearch(&quot;" + type + "&quot;, &quot;" + side + "&quot;)' style='display:inline; box-shadow: -5px 5px 3px #CDCDCD; float:left;";
	toAdd += "background-image: url(/assets/" + type + "_compare.jpeg); height: 300px; width: 540px; margin-" + side + ": 10px'></div>";
	$(toAdd).appendTo("#" + type + "_container");
};
