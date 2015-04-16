$(document).ready(function() {
	$.post("/api/v1/record_names", {operation: 'get', tables: ['coli']}, function(response) { 
		auto_cities = response;
		$( "#search_1_name" ).autocomplete({
	  		source: function(req, responseFn) {
	  			var re = $.ui.autocomplete.escapeRegex(req.term);
	  			var pattern1 = new RegExp("^"+re, "i");
	  			var a = $.grep(auto_cities, function(item, index){return pattern1.test(item);});
	  			var b = $.grep(auto_cities, function(item, index){return ((item.toLowerCase()).indexOf(re.toLowerCase())>0);});
	  			responseFn(a.concat(b));
	  		},
	  		response: function(e, u) {
	  			//if match list isnt empty, save the first match
	  			if (u.content.length != 0)
	  				auto_1 = u.content[0].value;
	  			else
	  				auto_1 = "";
	  		},
	  		close: function(e, u) {
	  			//when leaving, replace with first match
	  			temp1 = document.getElementById("search_1_name").value;
	  			if (temp1 == "")
	  				auto_1 = "";
	  			else if (auto_cities.indexOf(temp1) < 0 && auto_1)
					document.getElementById("search_1_name").value = auto_1;
				else if (auto_1)
					auto_1 = temp1;
	  		},
	  		delay: 0
		});
		$( "#search_2_name" ).autocomplete({
	  		source: function(req, responseFn) {
	  			var re = $.ui.autocomplete.escapeRegex(req.term);
	  			var pattern1 = new RegExp("^"+re, "i");
	  			var a = $.grep(auto_cities, function(item, index){return pattern1.test(item);});
	  			var b = $.grep(auto_cities, function(item, index){return ((item.toLowerCase()).indexOf(re.toLowerCase())>0);});
	  			responseFn(a.concat(b));
	  		},
	  		response: function(e, u) {

	  			if (u.content.length != 0)
	  				auto_2 = u.content[0].value;
	  			else
	  				auto_2 = "";
	  		},
	  		close: function(e, u) {
	  			//when leaving, replace with first match
	  			temp2 = document.getElementById("search_2_name").value;
	  			if (temp2 == "")
	  				auto_2 = "";
	  			else if (auto_cities.indexOf(temp2) < 0 && auto_2)
					document.getElementById("search_2_name").value = auto_2;
				else if (auto_2)
					auto_2 = temp2;
	  		},
	  		delay: 0
		});
	});
	if (user_id)
		$.post("/api/v2/users/" + user_id + "/completed", {"section": "View City Comparison"});	
});

var data, hide_1, hide_2, main, gray, font, active_tab, axis_location, horz_locs, auto_1, auto_2, sent1, sent2, nochanges, old1, old2, auto_cities, canvas, processingInstance;

canvas = document.getElementById("main_viz");
if (canvas != null)
	processingInstance = new Processing(canvas, sketchProc);

sent1 = true;
sent2 = true;

var sketch = new Processing.Sketch();

function changeMade() {
	if (old1 != document.getElementById("search_1_name").value)
	{
		old1 = document.getElementById("search_1_name").value;
		nochanges = false;
	}
	if (old2 != document.getElementById("search_2_name").value)
	{
		old2 = document.getElementById("search_2_name").value;
		nochanges = false;
	}
};

function city_api_request(query) {
	if (nochanges)
	{
		return;
	}

	var field1, field2;
	field1 = "";
	field2 = "";

	$("#error_1").empty();
	$('#search_1_name').autocomplete('close');
	//check to see if any of the fields are empty
	if (document.getElementById("search_1_name").value != "")
	{
		if (auto_1 == "")
			$("#error_1").append("Invalid city.");
		if (auto_1 != "" && auto_1)
			field1 = auto_1;		
		else if (auto_1 == undefined)
		{
			if (auto_cities.indexOf(document.getElementById("search_1_name").value) < 0)
				$("#error_1").append("Invalid city.");
			else
				field1 = document.getElementById("search_1_name").value;	
		}
	}
	$("#error_2").empty();
	$('#search_2_name').autocomplete('close');
	if (document.getElementById("search_2_name").value != "")
	{
		if (auto_2 == "")
			$("#error_2").append("Invalid city.");
		if (auto_2 != "" && auto_2)
			field2 = auto_2;		
		else if (auto_2 == undefined)
		{
			if (auto_cities.indexOf(document.getElementById("search_2_name").value) < 0)
				$("#error_2").append("Invalid city.");
			else
				field2 = document.getElementById("search_2_name").value;	
		}
	}

	url = "https://trycents.com:6001/data";
	type = "city";
	body = "";
	var query_string = "";

	if((field1 == "" && field2 == "")){
		sent1 = false;
		sent2 = false;
		return;
	}
	else if(field2 == ""){
		body = JSON.stringify({type:type,option:[field1]});
		sent2 = false;
		sent1 = true;
		processingInstance.noLoop();
		$("#main_viz").fadeTo(700, 0, function() {processingInstance.loop(); $("#main_viz").fadeTo(900, 1);});
		query_string = field1;
	}
	else if(field1 == ""){
		body = JSON.stringify({type:type,option:[field2]});
		sent1 = false;
		sent2 = true;
		processingInstance.noLoop();
		$("#main_viz").fadeTo(700, 0, function() {processingInstance.loop(); $("#main_viz").fadeTo(900, 1);});
		query_string = field2;
	}
	else{
		body = JSON.stringify({type:type,option:[field1,field2]});
		sent1 = true;
		sent2 = true;
		processingInstance.noLoop();
		$("#main_viz").fadeTo(700, 0, function() {processingInstance.loop(); $("#main_viz").fadeTo(900, 1);});
		query_string = field1 + " vs " + field2;
	}

	//data = new Object();
	var xmlHttp = null;

    xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "POST", url, true );
    xmlHttp.onreadystatechange = function() {
    	if (xmlHttp.readyState === 4) { 
      		if (xmlHttp.status === 200) {
      			data = jQuery.parseJSON(xmlHttp.responseText);

      			for(var i = 0; i < data["elements"].length; i++) {
  					Object.keys(data["elements"][i]).forEach(function(key) {
		    			var idx = i+1;
		    			var nKey = key + "_" + idx;
		    			data[nKey] = data["elements"][i][key];
					});
  				}
  				delete data["elements"];

      			//make api request here with type included
				localStorage.setItem("query_type", type);
				localStorage.setItem("data_store",JSON.stringify(data));
				//ok query, save to user
				$.post("/api/v2/users/" + user_id + "/query", {"url": query_string});

				auto_1 = undefined;
				auto_2 = undefined;

	  			if (sent1 && sent2)
	  			{
	  				hide_1 = false; 
	  				hide_2 = false;
		  	 		document.getElementById("search_1_button").value = "HIDE";
		  	 		$("#search_1_button").removeAttr("disabled");
		  	 		document.getElementById("search_2_button").value = "HIDE";
		  	 		$("#search_2_button").removeAttr("disabled");
	  			}
	  			else if (!sent1 && sent2)
	  			{
	  				hide_1 = true;
	  				document.getElementById("search_1_button").value = "SHOW";
		  	 		$("#search_1_button").attr("disabled", "true");
		  	 		hide_2 = false;
		  	 		document.getElementById("search_2_button").value = "HIDE";
		  	 		$("#search_2_button").removeAttr("disabled");
		  	 		//need to flip data to _2 arrays
		  	 		data["weather_2"] = $.extend(true, [], data["weather_1"]);
					data["weatherlow_2"] = $.extend(true, [], data["weatherlow_1"]);
					data["cli_2"] = $.extend(true, [], data["cli_1"])
					data["labor_2"] = $.extend(true, [], data["labor_1"])
					data["taxes_2"] = $.extend(true, [], data["taxes_1"])
					data["name_2"] = data["name_1"];
					data["weather_1"] = null;
					data["weatherlow_1"] = null;
					data["cli_1"] = null;
					data["labor_1"] = null;
					data["taxes_1"] = null;
					data["name_1"] = null;

	  			}
	  			else if (sent1 && !sent2)
	  			{
	  				hide_2 = true;
	  				document.getElementById("search_2_button").value = "SHOW";
		  	 		$("#search_2_button").attr("disabled", "true");
		  	 		hide_1 = false;
		  	 		document.getElementById("search_1_button").value = "HIDE";
		  	 		$("#search_1_button").removeAttr("disabled");
	  			}
	  			nochanges = true;
	  			
      		}
      	}
    }
    xmlHttp.send(body);
};

function sketchProc(processing) {
	
	processing.setup = function() {

		console.log("loaded city.js successfully");
		if (localStorage.getItem("colors"))
		{
			var c = jQuery.parseJSON(unescape(localStorage.getItem("colors")));
			main = processing.color(c["p_rgb"][0], c["p_rgb"][1], c["p_rgb"][2]);
			gray = processing.color(c["s_rgb"][0], c["s_rgb"][1], c["s_rgb"][2]);
		}
		else
		{
			main = processing.color(136, 68, 18);
			gray = processing.color(138, 136, 137);
		}
		processing.size(655,375);
		//always set the initial tab to the first one
		active_tab = 1;
		hide_1 = false;
		hide_2 = false;
		//load font
		font = processing.loadFont("Roboto");
		processing.textFont(font, 12);
		horz_locs = [87, 145, 215, 308, 389, 488, 577];

		//var to hold all data relevant to a given category
		above_1 = new Array();
		above_2 = new Array();
		below_1 = new Array();
		below_2 = new Array();
		data = new Array();

  		data = jQuery.parseJSON(unescape(localStorage.getItem("data_store")));

  		if(data["name_1"]){
  			data["name_1"] = data["name_1"];
  		}

  		if(data["name_2"]){
  			data["name_2"] = data["name_2"]
  		}


  		//console.log(data["name_1"]);
  		//localStorage.removeItem("data_store");
  		if (!data || (!data["name_1"] && !data["name_2"]))
  		{
  			//data = new Array();

  			data["weather_1"] =    [38.0, 44.0, 53.0, 61.0, 71.0, 82.0, 90.0, 89.0, 78.0, 65.0, 50.0, 40.0, 38.0, 90.0];
			data["weatherlow_1"] = [26.0, 31.0, 38.0, 43.0, 52.0, 61.0, 69.0, 67.0, 58.0, 46.0, 36.0, 27.0, 26.0, 69.0];
			data["weather_2"]    = [67.0, 71.0, 77.0, 85.0, 95.0, 104.0, 106.0, 104.0, 100.0, 89.0, 76.0, 66.0, 66.0, 106.0];
			data["weatherlow_2"] = [46.0, 49.0, 53.0, 60.0, 69.0, 78.0, 83.0, 83.0, 77.0, 65.0, 53.0, 45.0, 45.0, 83.0];

			data["name_1"] = "Salt Lake City, Utah";
			data["name_2"] = "Phoenix, Arizona";

			data["cli_1"] = [102, 94, 95, 95, 119, 105, 92, 92, 119];
			data["cli_2"] = [96, 92, 100, 106, 97, 101, 99, 92, 106];

			data["labor_1"] = [3.4, 48000, 4.4];
			data["labor_2"] = [6.4, 51000, 3.3];
			data["labor_3"] = [5.8, 44800, 4.6];

			//sales, income min, income max, property
			data["taxes_1"] = [6.85, 5.0, 5.0, 1407];
			data["taxes_2"] = [8.3, 2.59, 4.54, 1427];
			data["taxes_3"] = [8.25, 3.5, 7.8, 2065];
  		}
  		//console.log(data["name_2"]);
  		if (!data["name_2"])
  		{
  			hide_2 = true;
  			document.getElementById("search_2_button").value = "SHOW";
  			$("#search_2_button").attr("disabled", "true");
  		}
  		else
  		{
  			document.getElementById("search_2_name").value = data["name_2"];
  		}

		document.getElementById("search_1_name").value = data["name_1"];
		old1 = document.getElementById("search_1_name").value;
		old2 = document.getElementById("search_2_name").value;
		nochanges = true;
	};

	processing.draw = function() {
		processing.background(255);

		if (active_tab == 1)
			city_summary();
		else if (active_tab == 2)
			cost_of_living();
		else if (active_tab == 3)
			labor_stats();
		else if (active_tab == 4)
			taxes();
		else
			weather();

		//show cli mouse over details
		if (active_tab == 2)
		{
			var category = ["Overall, costs in", "Goods in", "Groceries in", "Health care costs in", "Housing costs in", "Transportation costs in", "Utilities in"];
			for (var i=0; i<7; i++)
			{
				//aligned horizontally
				if (processing.mouseX < horz_locs[i] && processing.mouseX >= (horz_locs[i] - 16) && !hide_1)
				{
						//location 1, postive change
						var data1 = data["cli_1"][i];
						if (processing.mouseY < (axis_location-10) && processing.mouseY > above_1[i])
						{
							processing.fill(255);
							processing.stroke(0);
							var length = processing.max(data["name_1"].length, category[i]);
							var height;
							if (processing.mouseY < 60)
								height = 62;
							else
								height = processing.mouseY;
							processing.rect(processing.mouseX-(120+length)/2, height-60, length+120, 52);
							processing.fill(0);
							processing.textAlign(processing.CENTER);
							processing.text(category[i], processing.mouseX, height-48);
							processing.text(data["name_1"], processing.mouseX, height-36);
							processing.text("are " + String(data1 - 100) + "% above the", processing.mouseX, height-24);
							processing.text("national average.", processing.mouseX, height-12);

						}
						if (processing.mouseY > (axis_location+10) && processing.mouseY < below_1[i])
						{
							processing.fill(255);
							processing.stroke(0);
							var length = processing.max(data["name_1"].length, category[i]);
							var height;
							if (processing.mouseY > 595)
								height = 593;
							else
								height = processing.mouseY;
							processing.rect(processing.mouseX-(120+length)/2, height-60, length+120, 52);
							processing.fill(0);
							processing.textAlign(processing.CENTER);
							processing.text(category[i], processing.mouseX, height-48);
							processing.text(data["name_1"], processing.mouseX, height-36);
							processing.text("are " + String(100 - data1) + "% below the", processing.mouseX, height-24);
							processing.text("national average.", processing.mouseX, height-12);

						}
						
				}
				if (processing.mouseX >= horz_locs[i] && processing.mouseX < (horz_locs[i] + 16) && !hide_2)
				{
					var data2 = data["cli_2"][i];
					if (processing.mouseY < (axis_location-10) && processing.mouseY > above_2[i])
					{
						processing.fill(255);
						processing.stroke(0);
						var length = processing.max(data["name_2"].length, category[i]);
						var height;
						if (processing.mouseY < 60)
							height = 62;
						else
							height = processing.mouseY;
						processing.rect(processing.mouseX-(120+length)/2, height-60, length+120, 52);
						processing.fill(0);
						processing.textAlign(processing.CENTER);
						processing.text(category[i], processing.mouseX, height-48);
						processing.text(data["name_2"], processing.mouseX, height-36);
						processing.text("are " + String(data2 - 100) + "% above the", processing.mouseX, height-24);
						processing.text("national average.", processing.mouseX, height-12);

					}
					if (processing.mouseY > (axis_location+10) && processing.mouseY < below_2[i])
					{
						processing.fill(255);
						processing.stroke(0);
						var length = processing.max(data["name_2"].length, category[i]);
						var height;
						if (processing.mouseY > 595)
							height = 593;
						else
							height = processing.mouseY;
						processing.rect(processing.mouseX-(120+length)/2, height-60, length+120, 52);
						processing.fill(0);
						processing.textAlign(processing.CENTER);
						processing.text(category[i], processing.mouseX, height-48);
						processing.text(data["name_2"], processing.mouseX, height-36);
						processing.text("are " + String(100 - data2) + "% below the", processing.mouseX, height-24);
						processing.text("national average.", processing.mouseX, height-12);

					}
				}
			}
		}
	};

	function city_summary() {
		//draw categories and separations
		var title_offset = 0;
		if (hide_1 || hide_2)
			title_offset = 40;
		processing.textAlign(processing.RIGHT);
		processing.fill(0);
		processing.text("AVERAGE COST OF LIVING", 235+title_offset, 55);
		processing.text("AVERAGE INCOME", 235+title_offset, 135);
		processing.text("INCOME TAX RANGE", 235+title_offset, 215);
		processing.text("TEMPERATURE RANGES", 235+title_offset, 295);
		processing.stroke(225);
		processing.strokeWeight(1);
		processing.line(65+title_offset, 93, 235+title_offset, 93);
		processing.line(65+title_offset, 173, 235+title_offset, 173);
		processing.line(65+title_offset, 253, 235+title_offset, 253);
		processing.textAlign(processing.CENTER);
		processing.text("(CLICK TABS ON RIGHT FOR MORE DETAILS)", 330, 355);

		var offset = 0;

		//draw data
		processing.textFont(font, 30);
		if (!hide_1)
		{
			if (hide_2)
				offset = 80;
			processing.fill(main);
			var c1 = data["cli_1"][0] - 100;
			var percent1 = "";
			if (c1 < 0)
			{
				c1 = c1 * -1;
				percent1 = "BELOW";
			}
			else
				percent1 = "ABOVE";

			processing.text(c1 + "%", 360+offset, 50);
			processing.text("$" + (data["labor_1"][1]).toLocaleString(), 360+offset, 140);
			if (data["taxes_1"][1] == data["taxes_1"][2])
				processing.text(data["taxes_1"][1] + "%", 360+offset, 218);
			else
			{
				processing.textFont(font, 24);
				processing.text(data["taxes_1"][1] + "%-" + data["taxes_1"][2] + "%", 360+offset, 215);
				processing.textFont(font, 30);
			}
			processing.text(data["weatherlow_1"][12] + "°- " + data["weather_1"][13] + "°", 360+offset, 295);
			processing.textFont(font, 12);
			processing.fill(main);
			processing.text(percent1 + " NATIONAL", 360+offset, 70);
			processing.text("AVERAGE", 360+offset, 85);
			processing.text("FAHRENHEIT", 360+offset, 310);
			//processing.textFont(font, 24);
		}
		
		
		processing.textFont(font, 30);
		if (!hide_2)
		{
			if (hide_1)
				offset = -80;
			processing.fill(gray);
			var c2 = data["cli_2"][0] - 100;
			var percent2 = "";
			if (c2 < 0)
			{
				c2 = c2 * -1;
				percent2 = "BELOW";
			}
			else
				percent2 = "ABOVE";

			processing.text(c2 + "%", 540+offset, 50);
			processing.text("$" + (data["labor_2"][1]).toLocaleString(), 540+offset, 140);
			if (data["taxes_2"][1] == data["taxes_2"][2])
				processing.text(data["taxes_2"][1] + "%", 540+offset, 218);
			else
			{
				processing.textFont(font, 24);
				processing.text(data["taxes_2"][1] + "%-" + data["taxes_2"][2] + "%", 540+offset, 215);
				processing.textFont(font, 30);
			}
			processing.text(data["weatherlow_2"][12] + "°- " + data["weather_2"][13] + "°", 540+offset, 295);
			processing.fill(gray);
			processing.textFont(font, 12);
			processing.text(percent2 + " NATIONAL", 540+offset, 70);
			processing.text("AVERAGE", 540+offset, 85);
			processing.text("FAHRENHEIT", 540+offset, 310);
		}

		processing.textFont(font, 12);

	};

	function cost_of_living() {

		var graph_top, graph_bot;
		graph_top = 45;
		graph_bot = 330;


		//calculate min and max depending on what data is being shown/hidden
		if (!hide_2 && hide_1)
		{
			min = data["cli_2"][7];
			max = data["cli_2"][8];

		}
		else if (hide_2 && !hide_1)
		{
			min = data["cli_1"][7];
			max = data["cli_1"][8];
		}
		else
		{
			if(data["name_2"])
			{
				min = processing.min(data["cli_1"][7], data["cli_2"][7]);
				max = processing.max(data["cli_1"][8], data["cli_2"][8]);
			}
			else
			{
				min = data["cli_1"][7];
				max = data["cli_1"][8];
			}
		}



		//draw axis depending on where national average (100) falls within the calculated min and max
		axis_location;
		if (max <= 100)
			axis_location = 60;
		else if (min > 100)
			axis_location = 315;
		else
			axis_location = 60 + 255 * (1 - ((100 - min) / (max - min)));


		//determin how much of scale is above and below the 100 line
		processing.stroke(235);
		processing.fill(0);
		processing.textAlign(processing.RIGHT);
		var num_above, num_below;
		if (max <= 100)
		{
			num_above = 0;
			num_below = 10;
		}
		else if (min >= 100)
		{
			num_above = 10;
			num_below = 0;
		}
		else
		{
			num_above = (max - 100) / (max - min);
			num_below = 1.0 - num_above;
			num_above = processing.round(num_above * 10);
			num_below = processing.round(num_below * 10);
		}
		var range = (axis_location-15-graph_top)/ num_above;
		var scale = (max - 100) / num_above;
		
		//draw scale
		for (var i=1; i<=num_above; i++)
		{
			processing.line(60 , (axis_location-15)-(i*range), 605, axis_location-15-(i*range));
			processing.text(String(processing.round(10*((100 + scale * i)-100))/10) + "%", 55,  axis_location-15-(i*range)+5);
		}

		range = (graph_bot-(axis_location+15)) / num_below;
		scale = (100 - min) / num_below;
		for (var i=1; i<=num_below; i++)
		{
			processing.line(60 , (axis_location+15)+(i*range), 605, axis_location+15+(i*range));
			processing.text("-" + String(processing.round(10*((100 + scale * i)-100))/10) + "%", 55,  axis_location+15+(i*range)+5);
		}

		processing.fill(255);
		processing.noStroke();
		processing.strokeWeight(2);
		processing.rect(60, axis_location - 9, 545, 19);
		
		processing.textAlign(processing.CENTER);
		processing.fill(0);
		processing.text("OVERALL", horz_locs[0], axis_location+5);
		processing.text("GOODS", horz_locs[1], axis_location+5);
		processing.text("GROCERIES", horz_locs[2], axis_location+5);
		processing.text("HEALTH CARE", horz_locs[3], axis_location+5);
		processing.text("HOUSING", horz_locs[4], axis_location+5);
		processing.text("TRANSPORTATION", horz_locs[5], axis_location+5);
		processing.text("UTILITIES", horz_locs[6], axis_location+5);
		
		//draw data
		processing.noStroke();
		for (var i=0; i<7; i++)
		{
			if (!hide_1)
			{
				var data1 = data["cli_1"][i];
				processing.fill(main);
				if (data1 > 100) //above
				{
					var height = ((data1-100) / (max-100)) * (axis_location - 15 -graph_top);
					processing.rect(horz_locs[i]-16, axis_location-15, 16, -height);
					above_1[i] = graph_top + ((axis_location - 15 - graph_top) * (1 - (data1-100) / (max-100)));
				}
				else if (data1 < 100)
				{
					var height = ((data1-100) / (min-100)) * (graph_bot - (axis_location + 15));
					processing.rect(horz_locs[i]-16, axis_location+15, 16, height);
					below_1[i] = graph_bot - ((graph_bot - axis_location - 15) * (1 - (100-data1) / (100-min)));
				}
				else
				{
					processing.rect(horz_locs[i]-16, axis_location-15, 16, -5);
					above_1[i] = axis_location-25;
				}
			}

			if (!hide_2)
			{
				var data2 = data["cli_2"][i];
				processing.fill(gray);
				if (data2 > 100) //above
				{
					var height = ((data2-100) / (max-100)) * (axis_location - 15 -graph_top);
					processing.rect(horz_locs[i], axis_location-15, 16, -height);
					above_2[i] = graph_top + ((axis_location - 15 - graph_top) * (1 - (data2-100) / (max-100)));
				}
				else if (data2 < 100)
				{
					var height = ((data2-100) / (min-100)) * (graph_bot - (axis_location + 15));
					processing.rect(horz_locs[i], axis_location+15, 16, height);
					below_2[i] = graph_bot - ((graph_bot - axis_location - 15) * (1 - (100-data2) / (100-min)));
				}
				else
				{
					processing.rect(horz_locs[i], axis_location - 15, 16, -5);
					above_2[i] = axis_location-25;
				}
			}

		}

		processing.stroke(0);
		processing.line(60, graph_top, 60, axis_location-16);
		processing.line(60, axis_location+15, 60, graph_bot);
		processing.line(605, graph_top, 605, axis_location-16);
		processing.line(605, axis_location+15, 605, graph_bot);
		processing.line(60, axis_location - 15, 604, axis_location - 15);
		processing.line(60, axis_location + 15, 604, axis_location + 15);

		//title and help
		processing.line(185, 30, 487, 30);
		processing.line(213, 347, 459, 347);
		processing.fill(0);
		processing.text("OVERALL AND CATEGORICAL COST OF LIVING (%)", 335, 25);
		processing.text("MOUSE OVER DATA FOR MORE DETAILS", 337, 362);
		
	};


	function labor_stats() {
		
		axis_location = [135, 310, 535];
		var graph_top = 50; 
		var graph_bot = 320;
		var graph_left = 60;
		var graph_right = 595;

		//draw labels
		processing.textAlign(processing.CENTER);
		processing.stroke(0);
		processing.strokeWeight(2);
		processing.fill(0);
		processing.text("UNEMPLOYMENT RATE", axis_location[0], graph_bot+23);
		processing.text("AVERAGE SALARY", axis_location[2], graph_bot+23);
		processing.text("ECONOMIC GROWTH", axis_location[1], graph_bot+23);
		processing.text("LABOR STATISTICS COMPARED TO NATIONAL AVERAGES", 327, 30);

		//left and right axis
		processing.line(graph_left, graph_top, graph_left, graph_bot);
		processing.line(graph_right, graph_top, graph_right, graph_bot);

		//bottom lines around categories
		processing.line(graph_left, graph_bot+1, graph_right-1, graph_bot+1);

		//need max for percentages
		var min_1, max_1, min_2, max_2;
		if (hide_2 && !hide_1)
		{
			var temp_max_1 = processing.max(data["labor_1"][0], data["labor_3"][0]);
			var temp_max_2 = processing.max(data["labor_1"][2], data["labor_3"][2]);	
			max_1 = processing.max(temp_max_2, temp_max_1) * 1.1;
			max_2 = processing.max(data["labor_1"][1], data["labor_3"][1]) * 1.1;
		}
		else if (hide_1 && !hide_2)
		{
			var temp_max_1 = processing.max(data["labor_2"][0], data["labor_3"][0]);
			var temp_max_2 = processing.max(data["labor_2"][2], data["labor_3"][2]);	
			max_1 = processing.max(temp_max_2, temp_max_1) * 1.1;
			max_2 = processing.max(data["labor_2"][1], data["labor_3"][1]) * 1.1;
		}
		else
		{
			
			if (data["name_2"])
			{
				var temp_max_1 = processing.max(data["labor_1"][0], data["labor_2"][0], data["labor_3"][0]);
				var temp_max_2 = processing.max(data["labor_1"][2], data["labor_2"][2], data["labor_3"][2]);	
				max_1 = processing.max(temp_max_2, temp_max_1) * 1.1;
				max_2 = processing.max(data["labor_1"][1], data["labor_2"][1], data["labor_3"][1]) * 1.1;
			}
			else
			{
				var temp_max_1 = processing.max(data["labor_1"][0], data["labor_3"][0]);
				var temp_max_2 = processing.max(data["labor_1"][2], data["labor_3"][2]);	
				max_1 = processing.max(temp_max_2, temp_max_1) * 1.1;
				max_2 = processing.max(data["labor_1"][1], data["labor_3"][1]) * 1.1;
			}

		}

		min_1 = 0.0;
		min_2 = 0.0;

		//draw scales
		processing.stroke(235);
		processing.fill(0);
		var range = (graph_top - graph_bot)/10;
		var per_scale = (max_1 - min_1)/10;
		var money_scale = (max_2 - min_2)/10;
		for (var i=1; i<=10; i++)
		{
			var h = graph_bot + range * i;
			processing.line(graph_left+2, h, graph_right-3, h);
			processing.textAlign(processing.RIGHT);
			processing.text(String(processing.round(min_1 + per_scale * i * 10)/10) + "%", graph_left-5, h+5);
			processing.textAlign(processing.LEFT);
			processing.text("$" + String(processing.round(min_2 + money_scale * i / 1000)) + "k", graph_right+5, h+5);
		}


		

		//draw NATIONAL AVERAGE rectangle and data
		processing.stroke(0);
		var line_1 = graph_bot + (graph_top - graph_bot)*((data["labor_3"][0] -  min_1)/(max_1 - min_1));
		var line_2 = graph_bot + (graph_top - graph_bot)*((data["labor_3"][2] -  min_1)/(max_1 - min_1));
		var line_3 = graph_bot + (graph_top - graph_bot)*((data["labor_3"][1] -  min_2)/(max_2 - min_2));
		
		processing.line(graph_left, line_1, axis_location[0]+40, line_1);
		processing.line(axis_location[0]+41, line_1, axis_location[1]-46, line_2);
		processing.line(axis_location[1]-45, line_2, axis_location[1]+45, line_2);
		processing.line(axis_location[1]+46, line_2, axis_location[2]-41, line_3);
		processing.line(axis_location[2]-40, line_3, graph_right-1, line_3);

		processing.fill(255);
		processing.stroke(255);
		processing.rect((axis_location[1]+axis_location[2])/2-40, (line_2+line_3)/2-30, 77, 50)
		processing.noStroke();
		processing.fill(0);
		processing.textAlign(processing.CENTER);
		processing.text("NATIONAL", (axis_location[1]+axis_location[2])/2, (line_2+line_3)/2-9);
		processing.text("AVERAGES", (axis_location[1]+axis_location[2])/2, (line_2+line_3)/2+8);

		if (!hide_1)
		{
			var height_1 = (graph_top - graph_bot)*((data["labor_1"][0] -  min_1)/(max_1 - min_1));
			var height_2 = (graph_top - graph_bot)*((data["labor_1"][2] -  min_1)/(max_1 - min_1));
			var height_3 = (graph_top - graph_bot)*((data["labor_1"][1] -  min_2)/(max_2 - min_2));
		}
		if (!hide_2)
		{
			var height_4 = (graph_top - graph_bot)*((data["labor_2"][0] -  min_1)/(max_1 - min_1));
			var height_5 = (graph_top - graph_bot)*((data["labor_2"][2] -  min_1)/(max_1 - min_1));
			var height_6 = (graph_top - graph_bot)*((data["labor_2"][1] -  min_2)/(max_2 - min_2));
		}

		//buffer boxes
		if (!hide_1)
		{
			processing.fill(255);
			processing.rect(axis_location[0]-25, graph_bot, 30, height_1);
			processing.rect(axis_location[1]-25, graph_bot, 30, height_2);
			processing.rect(axis_location[2]-25, graph_bot, 30, height_3);
		}

		if (!hide_2)
		{
			processing.fill(255);
			processing.rect(axis_location[0]-5, graph_bot, 30, height_4);
			processing.rect(axis_location[1]-5, graph_bot, 30, height_5);
			processing.rect(axis_location[2]-5, graph_bot, 30, height_6);
		}
		//data
		if (!hide_1)
		{
			processing.fill(main);
			processing.noStroke();
			processing.rect(axis_location[0]-20, graph_bot, 20, height_1);
			processing.rect(axis_location[1]-20, graph_bot, 20, height_2);
			processing.rect(axis_location[2]-20, graph_bot, 20, height_3);
			if (data["labor_1"][2] == null)
			{
				processing.textAlign(processing.LEFT);
				processing.textFont(font, 16);
				processing.text("N/A", axis_location[1]-30, graph_bot-7);
			}
		}

		if (!hide_2)
		{
			processing.fill(gray);
			processing.noStroke();
			processing.rect(axis_location[0], graph_bot, 20, height_4);
			processing.rect(axis_location[1], graph_bot, 20, height_5);
			processing.rect(axis_location[2], graph_bot, 20, height_6);	
			if (data["labor_2"][2] == null)
			{
				processing.textAlign(processing.RIGHT);
				processing.textFont(font, 16);
				processing.text("N/A", axis_location[1]+30, graph_bot-7);
			}
		}
		processing.textFont(font, 12);
	};

	function taxes() {
		axis_location = [105, 215, 340, 530];
		var graph_top = 50; 
		var graph_bot = 320;
		var graph_left = 60;
		var graph_right = 595;

		processing.textAlign(processing.CENTER);
		processing.stroke(0);
		processing.strokeWeight(2);
		processing.fill(0);
		processing.text("SALES TAX", axis_location[0], graph_bot+15);
		processing.text("-INCOME TAX-", (axis_location[2]+axis_location[1])/2, graph_bot+15);
		processing.text("MIN", axis_location[1], graph_bot+15);
		processing.text("MAX", axis_location[2], graph_bot+15);
		processing.text("PROPERTY TAX", axis_location[3], graph_bot+15);
		processing.text("TAX RATES COMPARED TO NATIONAL AVERAGES", 327, 30);

		//left and right axis
		processing.line(graph_left, graph_top, graph_left, graph_bot);
		processing.line(graph_right, graph_top, graph_right, graph_bot);

		//bottom lines around categories
		processing.line(graph_left, graph_bot+1, graph_right-1, graph_bot+1);

		var min_1, max_1, min_2, max_2;
		if (hide_2 && !hide_1)
		{
			var temp_max_1 = processing.max(data["taxes_1"][0], data["taxes_3"][0]);
			var temp_max_2 = processing.max(data["taxes_1"][2], data["taxes_3"][2]);	
			max_1 = processing.max(temp_max_2, temp_max_1) * 1.1;
			max_2 = processing.max(data["taxes_1"][3], data["taxes_3"][3]) * 1.1;
		}
		else if (hide_1 && !hide_2)
		{
			var temp_max_1 = processing.max(data["taxes_2"][0], data["taxes_3"][0]);
			var temp_max_2 = processing.max(data["taxes_2"][2], data["taxes_3"][2]);	
			max_1 = processing.max(temp_max_2, temp_max_1) * 1.1;
			max_2 = processing.max(data["taxes_2"][3], data["taxes_3"][3]) * 1.1;
		}
		else
		{
			if (data["name_2"])
			{
				var temp_max_1 = processing.max(data["taxes_1"][0], data["taxes_2"][0], data["taxes_3"][0]);
				var temp_max_2 = processing.max(data["taxes_1"][2], data["taxes_2"][2], data["taxes_3"][2]);	
				max_1 = processing.max(temp_max_2, temp_max_1) * 1.1;
				max_2 = processing.max(data["taxes_1"][3], data["taxes_2"][3], data["taxes_3"][3]) * 1.1;
			}
			else
			{
				var temp_max_1 = processing.max(data["taxes_1"][0], data["taxes_3"][0]);
				var temp_max_2 = processing.max(data["taxes_1"][2], data["taxes_3"][2]);	
				max_1 = processing.max(temp_max_2, temp_max_1) * 1.1;
				max_2 = processing.max(data["taxes_1"][3], data["taxes_3"][3]) * 1.1;
			}

		}

		min_1 = 0.0;
		min_2 = 0.0;

		processing.stroke(235);
		processing.fill(0);
		var range = (graph_top - graph_bot)/10;
		var per_scale = (max_1 - min_1)/10;
		var money_scale = (max_2 - min_2)/10;
		for (var i=1; i<=10; i++)
		{
			var h = graph_bot + range * i;
			processing.line(graph_left+2, h, graph_right-3, h);
			processing.textAlign(processing.RIGHT);
			processing.text(String(processing.round(min_1 + per_scale * i * 10)/10) + "%", graph_left-5, h+5);
			processing.textAlign(processing.LEFT);
			processing.text("$" + String((min_2 + money_scale * i).toFixed(0)), graph_right+5, h+5);
		}

		//draw NATIONAL AVERAGE rectangle and data
		processing.stroke(0);
		var line_1 = graph_bot + (graph_top - graph_bot)*((data["taxes_3"][0] -  min_1)/(max_1 - min_1));
		var line_2 = graph_bot + (graph_top - graph_bot)*((data["taxes_3"][1] -  min_1)/(max_1 - min_1));
		var line_3 = graph_bot + (graph_top - graph_bot)*((data["taxes_3"][2] -  min_1)/(max_1 - min_1));
		var line_4 = graph_bot + (graph_top - graph_bot)*((data["taxes_3"][3] -  min_2)/(max_2 - min_2));
		
		processing.line(graph_left, line_1, axis_location[0]+40, line_1);
		processing.line(axis_location[0]+41, line_1, axis_location[1]-40, line_2);
		processing.line(axis_location[1]-40, line_2, axis_location[1]+40, line_2);
		processing.line(axis_location[1]+41, line_2, axis_location[2]-41, line_3);
		processing.line(axis_location[2]-40, line_3, axis_location[2]+40, line_3);
		processing.line(axis_location[2]+41, line_3, axis_location[3]-41, line_4);
		processing.line(axis_location[3]-40, line_4, graph_right-1, line_4);

		processing.fill(255);
		processing.stroke(255);
		processing.rect((axis_location[2]+axis_location[3])/2-40, (line_3+line_4)/2-30, 77, 50)
		processing.noStroke();
		processing.fill(0);
		processing.textAlign(processing.CENTER);
		processing.text("NATIONAL", (axis_location[2]+axis_location[3])/2, (line_3+line_4)/2-9);
		processing.text("AVERAGES", (axis_location[2]+axis_location[3])/2, (line_3+line_4)/2+8);

		if (!hide_1)
		{
			var height_1 = (graph_top - graph_bot)*((data["taxes_1"][0] -  min_1)/(max_1 - min_1));
			var height_2 = (graph_top - graph_bot)*((data["taxes_1"][1] -  min_1)/(max_1 - min_1));
			var height_3 = (graph_top - graph_bot)*((data["taxes_1"][2] -  min_1)/(max_1 - min_1));
			var height_4 = (graph_top - graph_bot)*((data["taxes_1"][3] -  min_2)/(max_2 - min_2));
		}
		if (!hide_2)
		{
			var height_5 = (graph_top - graph_bot)*((data["taxes_2"][0] -  min_1)/(max_1 - min_1));
			var height_6 = (graph_top - graph_bot)*((data["taxes_2"][1] -  min_1)/(max_1 - min_1));
			var height_7 = (graph_top - graph_bot)*((data["taxes_2"][2] -  min_1)/(max_1 - min_1));
			var height_8 = (graph_top - graph_bot)*((data["taxes_2"][3] -  min_2)/(max_2 - min_2));
		}

		//buffer boxes
		if (!hide_1)
		{
			processing.fill(255);
			processing.rect(axis_location[0]-25, graph_bot, 30, height_1);
			processing.rect(axis_location[1]-25, graph_bot, 30, height_2);
			processing.rect(axis_location[2]-25, graph_bot, 30, height_3);
			processing.rect(axis_location[3]-25, graph_bot, 30, height_4);
		}

		if (!hide_2)
		{
			processing.fill(255);
			processing.rect(axis_location[0]-5, graph_bot, 30, height_5);
			processing.rect(axis_location[1]-5, graph_bot, 30, height_6);
			processing.rect(axis_location[2]-5, graph_bot, 30, height_7);
			processing.rect(axis_location[3]-5, graph_bot, 30, height_8);
		}
		//data
		if (!hide_1)
		{
			processing.fill(main);
			processing.noStroke();
			processing.rect(axis_location[0]-20, graph_bot, 20, height_1);
			processing.rect(axis_location[1]-20, graph_bot, 20, height_2);
			processing.rect(axis_location[2]-20, graph_bot, 20, height_3);
			processing.rect(axis_location[3]-20, graph_bot, 20, height_4);
		}

		if (!hide_2)
		{
			processing.fill(gray);
			processing.noStroke();
			processing.rect(axis_location[0], graph_bot, 20, height_5);
			processing.rect(axis_location[1], graph_bot, 20, height_6);
			processing.rect(axis_location[2], graph_bot, 20, height_7);
			processing.rect(axis_location[3], graph_bot, 20, height_8);		
		}
		
	};

	function weather() {
		//draw axis
		processing.stroke(0);
		processing.fill(0);
		processing.strokeWeight(2);
		processing.line(60, 50, 60, 324);
		processing.line(605, 50, 605, 324);
		processing.line(60, 325, 605, 325);
		

		var min, max;
		if (!hide_2 && hide_1)
		{
			min = data["weatherlow_2"][12];
			max = data["weather_2"][13];

		}
		else if (hide_2 && !hide_1)
		{
			min = data["weatherlow_1"][12];
			max = data["weather_1"][13];
		}
		else
		{
			if (data["name_2"])
			{
				min = processing.min(data["weatherlow_1"][12], data["weatherlow_2"][12]);
				max = processing.max(data["weather_1"][13], data["weather_2"][13]);
			}
			else
			{
				min = data["weatherlow_1"][12];
				max = data["weather_1"][13];
			}
		}

		min = min - ((max-min) / 10);
		max = max + ((max-min) / 10);

		//background separation
		processing.fill(245);
		processing.noStroke();
		processing.rect(100, 55, 48, 268);
		processing.rect(190, 55, 48, 268);
		processing.rect(280, 55, 48, 268);
		processing.rect(370, 55, 48, 268);
		processing.rect(460, 55, 48, 268);
		processing.rect(550, 55, 48, 268);


		processing.stroke(0);
		processing.fill(0);
		processing.strokeWeight(2);
		var range = max - min;
		var scale = (max - min) / 10;
		for (var i=0; i<=10; i++)
		{
			processing.strokeWeight(1);
			processing.line(62, 325-27*i, 597, 325-27*i);
			processing.textAlign(processing.RIGHT);
			processing.stroke(235);
			processing.text(processing.round(min+i*scale)+"°", 50, 325-27*i);
			
		}


		processing.fill(0);
		processing.textAlign(processing.LEFT);
		//add labels
		processing.text("JAN", 70-2, 345);
		processing.text("FEB", 115-2, 345);
		processing.text("MAR", 160-2, 345);
		processing.text("APR", 205-2, 345);
		processing.text("MAY", 250-2, 345);
		processing.text("JUN", 295-2, 345);
		processing.text("JUL", 340-2, 345);
		processing.text("AUG", 385-2, 345);
		processing.text("SEP", 430-2, 345);
		processing.text("OCT", 475-2, 345);
		processing.text("NOV", 520-2, 345);
		processing.text("DEC", 565-2, 345);
		processing.fill(0);
		processing.text("AVERAGE MONTHLY TEMPERATURE (°F) RANGE", 175, 40);

		//draw data
		processing.strokeWeight(4);
		for (var i=1; i<13; i++)
		{
			if (!hide_1)
			{
				processing.stroke(main);
				processing.fill(main);
				var percent_1 = (data["weather_1"][i-1] - min) / range;
				var percent_2 = (data["weatherlow_1"][i-1] -  min) / range;
				processing.ellipse(28+45*i, (1-percent_1) * 275 + 49, 3, 3);
				processing.ellipse(28+45*i, (1-percent_2) * 275 + 49, 3, 3);
				processing.line(28+45*i, (1-percent_1) * 275 + 49, 28+45*i, (1-percent_2) * 275 + 49);
			}

			if (!hide_2)
			{
				processing.stroke(gray);
				processing.fill(gray);
				var percent_1 = (data["weather_2"][i-1] - min) / range;
				var percent_2 = (data["weatherlow_2"][i-1] -  min) / range;
				processing.ellipse(41+45*i, (1-percent_1) * 275 + 49, 3, 3);
				processing.ellipse(41+45*i, (1-percent_2) * 275 + 49, 3, 3);
				processing.line(41+45*i, (1-percent_1) * 275 + 49, 41+45*i, (1-percent_2) * 275 + 49);
			}
		}

		//draw legend
		processing.strokeWeight(2);
		processing.fill(255);
		processing.stroke(235);
		processing.rect(525, 25, 100, 68);
		processing.fill(main);
		processing.stroke(main);
		processing.ellipse(545, 59, 3, 3);
		processing.ellipse(545, 80, 3, 3);
		processing.line(545, 60, 545, 80);
		processing.fill(gray);
		processing.stroke(gray);
		processing.ellipse(605, 59, 3, 3);
		processing.ellipse(605, 80, 3, 3);
		processing.line(605, 60, 605, 80);

		processing.fill(0);
		processing.text("AVG TEMP", 545, 43);
		processing.text("HIGHS", 557, 62);
		processing.text("LOWS", 558, 83);
	};
};

function update_tab(name) {
	if (name != active_tab)
	{
		processingInstance.noLoop();
		$("#main_viz").fadeTo(500, 0, function() {processingInstance.loop(); $("#main_viz").fadeTo(700, 1);});
		active_tab = name;
		if(data["name_1"])
		{
			hide_1 = false;
			document.getElementById("search_1_button").value = "HIDE";
		}
		if(data["name_2"])
		{
			hide_2 = false;
			document.getElementById("search_2_button").value = "HIDE";
		}
	}
};

function hide_toggle(num) {
	processingInstance.noLoop();
	$("#main_viz").fadeTo(500, 0, function() {processingInstance.loop(); $("#main_viz").fadeTo(700, 1);});
	if (num == 1)
	{
		if (document.getElementById("search_1_button").value == "HIDE") { 
			document.getElementById("search_1_button").value = "SHOW";
		}
		else { 
			document.getElementById("search_1_button").value = "HIDE";
		}
		hide_1 = !hide_1;
	}
	else
	{
		if (document.getElementById("search_2_button").value == "HIDE") { 
			document.getElementById("search_2_button").value = "SHOW";
		}
		else { 
			document.getElementById("search_2_button").value = "HIDE";
		}
		hide_2 = !hide_2;
	}
};



