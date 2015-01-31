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
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require material
//= require ripples
//= require_tree .



var active_tab, type, data, hide_1, hide_2, axis_location, horz_locs, min, max, above_1, above_2, below_1, below_2, font;


var sketch = new Processing.Sketch();

function sketchProc(processing) {
	var main = processing.color(136, 68, 18);
	var gray = processing.color(138, 136, 137);
	var color_1 = processing.color(136, 68, 18);
	var color_2 = processing.color(18, 86, 136);

	processing.setup = function() {
		//this will be retrieved from json object
		//type = "city";
		processing.size(655,375);
		//always set the initial tab to the first one
		active_tab = 1;
		hide_1 = false;
		hide_2 = false;
		horz_locs = [87, 145, 215, 308, 389, 488, 577];
		

		//load font
		font = processing.loadFont("./fonts/Roboto-Regular.ttf");
		processing.textFont(font, 12);

		//var to hold all data relevant to a given category
		above_1 = new Array();
		above_2 = new Array();
		below_1 = new Array();
		below_2 = new Array();
		data = new Array();

		var query = window.location.search;
		if(query != "")
		{
			if (query.substring(0, 1) == '?') {
	   			query = query.substring(1);
	  		}
	  		data = jQuery.parseJSON(unescape(query));
  		}
		
		//create dummy data
		if(query == "")
		{
			data["weather_1"] =    [38.0, 44.0, 53.0, 61.0, 71.0, 82.0, 90.0, 89.0, 78.0, 65.0, 50.0, 40.0, 38.0, 90.0];
			data["weatherlow_1"] = [26.0, 31.0, 38.0, 43.0, 52.0, 61.0, 69.0, 67.0, 58.0, 46.0, 36.0, 27.0, 26.0, 69.0];
			data["weather_2"]    = [67.0, 71.0, 77.0, 85.0, 95.0, 104.0, 106.0, 104.0, 100.0, 89.0, 76.0, 66.0, 66.0, 106.0];
			data["weatherlow_2"] = [46.0, 49.0, 53.0, 60.0, 69.0, 78.0, 83.0, 83.0, 77.0, 65.0, 53.0, 45.0, 45.0, 83.0];

			data["location_1"] = "Salt Lake City, UT";
			data["location_2"] = "Phoenix, AZ";

			data["cli_1"] = [102, 94, 95, 95, 119, 105, 92, 92, 119];
			data["cli_2"] = [96, 92, 100, 106, 97, 101, 99, 92, 106];
		}

		data["labor_1"] = [3.4, 48000, 4.4];
		data["labor_2"] = [6.4, 51000, 3.3];
		data["labor_3"] = [5.8, 44800, 4.6];

		//sales, income min, income max, property
		data["taxes_1"] = [6.85, 5.0, 5.0, 0.67];
		data["taxes_2"] = [8.3, 2.59, 4.54, 1.59];
		data["taxes_3"] = [8.25, 3.5, 7.8, 1.15];

		//college comparisons, tuition, grad rate, undergrad enrollment, natl ranking
		data["school_1"] = [8000, 24, 32000, 40];
		data["school_2"] = [5000, 50, 29000, 62];

		//career salary data, 1997-2013, min, max
		data["career_salary_1"] = [52000, 53500, 53000, 54500, 54500, 55500, 59000, 72000, 73500, 77000, 79000, 81000, 82000, 85000, 86000, 86500, 88000, 52000, 88000];
		data["career_salary_2"] = [27000, 28000, 29000, 29250, 29500, 30000, 29500, 27750, 25500, 26000, 26250, 26500, 26500, 26500, 25750, 28000, 27250, 25500, 30000];
		//career satisfaction
		data["career_satisfaction_1"] = 4.8;
		data["career_satisfaction_2"] = 2.9;
		//demand
		data["career_demand_1"] = [353200, 22.4, 252700];
		data["career_demand_2"] = [35500, 16.0, 18300];
		//unemployment
		data["career_unemploy_1"] = [3.8, 3.2];
		data["career_unemploy_2"] = [8.1, 8.5];
		data["career_unemploy_3"] = [6.0, 6.8];

	};

	processing.draw = function() {
		processing.background(255);

		var pathArray = window.location.pathname.split('/');
		type = pathArray[2];

		if (type == "city")
			draw_city();

		else if (type == "spending")
			draw_spend();

		else if (type == "career")
			draw_career();

		else if (type == "school")
			draw_college();

		else if (type == "major")
			draw_major();

		else;

		//show cli details
		if (type == "city" && active_tab == 2)
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
							var length = processing.max(data["location_1"].length, category[i]);
							var height;
							if (processing.mouseY < 60)
								height = 62;
							else
								height = processing.mouseY;
							processing.rect(processing.mouseX-(120+length)/2, height-60, length+120, 52);
							processing.fill(0);
							processing.textAlign(processing.CENTER);
							processing.text(category[i], processing.mouseX, height-48);
							processing.text(data["location_1"], processing.mouseX, height-36);
							processing.text("are " + String(data1 - 100) + "% above the", processing.mouseX, height-24);
							processing.text("national average.", processing.mouseX, height-12);

						}
						if (processing.mouseY > (axis_location+10) && processing.mouseY < below_1[i])
						{
							processing.fill(255);
							processing.stroke(0);
							var length = processing.max(data["location_1"].length, category[i]);
							var height;
							if (processing.mouseY > 595)
								height = 593;
							else
								height = processing.mouseY;
							processing.rect(processing.mouseX-(120+length)/2, height-60, length+120, 52);
							processing.fill(0);
							processing.textAlign(processing.CENTER);
							processing.text(category[i], processing.mouseX, height-48);
							processing.text(data["location_1"], processing.mouseX, height-36);
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
						var length = processing.max(data["location_2"].length, category[i]);
						var height;
						if (processing.mouseY < 60)
							height = 62;
						else
							height = processing.mouseY;
						processing.rect(processing.mouseX-(120+length)/2, height-60, length+120, 52);
						processing.fill(0);
						processing.textAlign(processing.CENTER);
						processing.text(category[i], processing.mouseX, height-48);
						processing.text(data["location_2"], processing.mouseX, height-36);
						processing.text("are " + String(data2 - 100) + "% above the", processing.mouseX, height-24);
						processing.text("national average.", processing.mouseX, height-12);

					}
					if (processing.mouseY > (axis_location+10) && processing.mouseY < below_2[i])
					{
						processing.fill(255);
						processing.stroke(0);
						var length = processing.max(data["location_2"].length, category[i]);
						var height;
						if (processing.mouseY > 595)
							height = 593;
						else
							height = processing.mouseY;
						processing.rect(processing.mouseX-(120+length)/2, height-60, length+120, 52);
						processing.fill(0);
						processing.textAlign(processing.CENTER);
						processing.text(category[i], processing.mouseX, height-48);
						processing.text(data["location_2"], processing.mouseX, height-36);
						processing.text("are " + String(100 - data2) + "% below the", processing.mouseX, height-24);
						processing.text("national average.", processing.mouseX, height-12);

					}
				}
			}
		}

	};

	function draw_city() {
		//tab helper 2-cost of living, 3-labor stats, 4-taxes, 5-weather
		document.getElementById("search_1_name").value = data["location_1"];
		document.getElementById("search_2_name").value = data["location_2"];
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
	};

	function city_summary() {
		//draw categories and separations
		processing.textAlign(processing.RIGHT);
		processing.fill(0);
		processing.text("AVERAGE COST OF LIVING", 235, 55);
		processing.text("AVERAGE INCOME", 235, 135);
		processing.text("INCOME TAX RANGE", 235, 215);
		processing.text("AVERAGE TEMPERATURES", 235, 295);
		processing.stroke(225);
		processing.strokeWeight(1);
		processing.line(65, 93, 235, 93);
		processing.line(65, 173, 235, 173);
		processing.line(65, 253, 235, 253);
		processing.textAlign(processing.CENTER);
		processing.text("(CLICK TABS ON RIGHT FOR MORE DETAILS)", 330, 355);

		//draw data
		processing.textFont(font, 30);
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

		processing.text(c1 + "%", 360, 50);
		processing.text("$" + (data["labor_1"][1]).toLocaleString(), 360, 140);
		if (data["taxes_1"][1] == data["taxes_1"][2])
			processing.text(data["taxes_1"][1] + "%", 360, 218);
		else
		{
			processing.textFont(font, 24);
			processing.text(data["taxes_1"][1] + "%-" + data["taxes_1"][2] + "%", 360, 215);
			processing.textFont(font, 30);
		}
		processing.text(data["weatherlow_1"][12] + "°- " + data["weather_1"][13] + "°", 360, 295);
		

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

		processing.text(c2 + "%", 540, 50);
		processing.text("$" + (data["labor_2"][1]).toLocaleString(), 540, 140);
		if (data["taxes_2"][1] == data["taxes_2"][2])
			processing.text(data["taxes_2"][1] + "%", 540, 218);
		else
		{
			processing.textFont(font, 24);
			processing.text(data["taxes_2"][1] + "%-" + data["taxes_2"][2] + "%", 540, 215);
			processing.textFont(font, 30);
		}
		processing.text(data["weatherlow_2"][12] + "°- " + data["weather_2"][13] + "°", 540, 295);

		processing.textFont(font, 12);
		processing.fill(main);
		processing.text(percent1 + " NATIONAL", 360, 70);
		processing.text("AVERAGE", 360, 85);
		processing.fill(gray);
		processing.text(percent2 + " NATIONAL", 540, 70);
		processing.text("AVERAGE", 540, 85);

	};

	function cost_of_living() {

		//need to check for hugh outliers that will skew viz and make data impossible to read

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
			min = processing.min(data["cli_1"][7], data["cli_2"][7]);
			max = processing.max(data["cli_1"][8], data["cli_2"][8]);
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
					processing.rect(horz_locs[i], axis_location - 15, 16, -5);
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
		//processing.line(154, 47, 499, 47);

		//left and right axis
		processing.line(graph_left, graph_top, graph_left, graph_bot);
		processing.line(graph_right, graph_top, graph_right, graph_bot);

		//bottom lines around categories
		processing.line(graph_left, graph_bot+1, graph_right-1, graph_bot+1);
		//processing.line(graph_left, graph_bot+31, graph_right-1, graph_bot+31);

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
			var temp_max_1 = processing.max(data["labor_1"][0], data["labor_2"][0], data["labor_3"][0]);
			var temp_max_2 = processing.max(data["labor_1"][2], data["labor_2"][2], data["labor_3"][2]);	
			max_1 = processing.max(temp_max_2, temp_max_1) * 1.1;
			max_2 = processing.max(data["labor_1"][1], data["labor_2"][1], data["labor_3"][1]) * 1.1;

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




		var height_1 = (graph_top - graph_bot)*((data["labor_1"][0] -  min_1)/(max_1 - min_1));
		var height_2 = (graph_top - graph_bot)*((data["labor_1"][2] -  min_1)/(max_1 - min_1));
		var height_3 = (graph_top - graph_bot)*((data["labor_1"][1] -  min_2)/(max_2 - min_2));
		var height_4 = (graph_top - graph_bot)*((data["labor_2"][0] -  min_1)/(max_1 - min_1));
		var height_5 = (graph_top - graph_bot)*((data["labor_2"][2] -  min_1)/(max_1 - min_1));
		var height_6 = (graph_top - graph_bot)*((data["labor_2"][1] -  min_2)/(max_2 - min_2));

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
		}

		if (!hide_2)
		{
			processing.fill(gray);
			processing.noStroke();
			processing.rect(axis_location[0], graph_bot, 20, height_4);
			processing.rect(axis_location[1], graph_bot, 20, height_5);
			processing.rect(axis_location[2], graph_bot, 20, height_6);	
		}
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
		//processing.line(154, 47, 499, 47);

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
			var temp_max_1 = processing.max(data["taxes_1"][0], data["taxes_2"][0], data["taxes_3"][0]);
			var temp_max_2 = processing.max(data["taxes_1"][2], data["taxes_2"][2], data["taxes_3"][2]);	
			max_1 = processing.max(temp_max_2, temp_max_1) * 1.1;
			max_2 = processing.max(data["taxes_1"][3], data["taxes_2"][3], data["taxes_3"][3]) * 1.1;

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
			processing.text(String(processing.round(min_2 + money_scale * i * 100)/100) + "%", graph_right+5, h+5);
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

		var height_1 = (graph_top - graph_bot)*((data["taxes_1"][0] -  min_1)/(max_1 - min_1));
		var height_2 = (graph_top - graph_bot)*((data["taxes_1"][2] -  min_1)/(max_1 - min_1));
		var height_3 = (graph_top - graph_bot)*((data["taxes_1"][1] -  min_1)/(max_1 - min_1));
		var height_4 = (graph_top - graph_bot)*((data["taxes_1"][3] -  min_2)/(max_2 - min_2));
		var height_5 = (graph_top - graph_bot)*((data["taxes_2"][0] -  min_1)/(max_1 - min_1));
		var height_6 = (graph_top - graph_bot)*((data["taxes_2"][1] -  min_1)/(max_1 - min_1));
		var height_7 = (graph_top - graph_bot)*((data["taxes_2"][2] -  min_1)/(max_1 - min_1));
		var height_8 = (graph_top - graph_bot)*((data["taxes_2"][3] -  min_2)/(max_2 - min_2));

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
			min = processing.min(data["weatherlow_1"][12], data["weatherlow_2"][12]);
			max = processing.max(data["weather_1"][13], data["weather_2"][13]);
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

		//processing.noStroke();
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

	function draw_major() {
		document.getElementById("search_1_name").value = "computer science";
		document.getElementById("search_2_name").value = "english";
		//tab helper 1-salary, 2-job satisfication, 3-grad rate, 4-demand, 5-unemploy, 6-top jobs
	};

	function draw_college() {
		document.getElementById("search_1_name").value = "University of Utah";
		document.getElementById("search_2_name").value = "BYU";

		var tuition_max = 30000;
		var grad_max = 100;
		var size_max = 60000;
		//var rank_max = 220;

		if (data["school_1"][0] > 30000 || data["school_2"][0] > 30000)
			tuition_max = 60000;

		//temp divider line
		processing.strokeWeight(1);
		processing.stroke(235);
		processing.line(30, 187, 625, 187);
		processing.line(327, 40, 327, 335);

		//top and bottom labels and lines
		processing.strokeWeight(2);
		processing.stroke(0);
		processing.line(30, 20, 625, 20);
		processing.line(30, 40, 625, 40);
		processing.line(30, 355, 625, 355);
		processing.line(30, 335, 625, 335);
		processing.fill(0);
		processing.textAlign(processing.CENTER);
		processing.text("YEARLY TUITION ($)", 175, 35);
		processing.text("UNDERGRAD ENROLLMENT", 480, 35);
		processing.text("GRADUATION RATE", 175, 350);
		processing.text("NATIONAL RANKING", 480, 350);


		//draw graphs
		//yearly tuition graph outline and scale
		processing.line(40, 75, 300, 75);
		processing.line(40, 165, 300, 165);
		processing.line(40, 75, 40, 164);
		if (tuition_max == 60000)
		{
			processing.text("0", 40, 70);
			processing.text("10k", 82, 70);
			processing.text("20k", 126, 70);
			processing.text("30k", 169, 70);
			processing.text("40k", 212, 70);
			processing.text("50k", 255, 70);
			processing.text("60k", 300, 70);
		}
		else 
		{
			processing.text("0", 40, 70);
			processing.text("5k", 82, 70);
			processing.text("10k", 126, 70);
			processing.text("15k", 169, 70);
			processing.text("20k", 212, 70);
			processing.text("25k", 255, 70);
			processing.text("30k", 300, 70);
		}
		//undergrad enrollment
		processing.line(355, 75, 615, 75);
		processing.line(355, 165, 615, 165);
		processing.line(355, 75, 355, 164);
		processing.text("0", 355, 70);
		processing.text("10k", 398, 70);
		processing.text("20k", 441, 70);
		processing.text("30k", 484, 70);
		processing.text("40k", 527, 70);
		processing.text("50k", 570, 70);
		processing.text("60k", 613, 70);
		//grad rate
		processing.line(40, 210, 300, 210);
		processing.line(40, 300, 300, 300);
		processing.line(40, 210, 40, 299);
		processing.text("0", 40, 315);
		processing.text("25%", 105, 315);
		processing.text("50%", 170, 315);
		processing.text("75%", 235, 315);
		processing.text("100%", 300, 315);

		//all gray lines
		processing.stroke(235);
		processing.strokeWeight(1);
		//tuition
		processing.line(82, 76, 82, 163);
		processing.line(126, 76, 126, 163);
		processing.line(169, 76, 169, 163);
		processing.line(212, 76, 212, 163);
		processing.line(255, 76, 255, 163);
		processing.line(300, 76, 300, 163);
		//enroll
		processing.line(398, 76, 398, 163);
		processing.line(441, 76, 441, 163);
		processing.line(484, 76, 484, 163);
		processing.line(527, 76, 527, 163);
		processing.line(570, 76, 570, 163);
		processing.line(613, 76, 613, 163);
		//grad
		processing.line(105, 211, 105, 298);
		processing.line(170, 211, 170, 298);
		processing.line(235, 211, 235, 298);
		processing.line(300, 211, 300, 298);

		//draw data
		processing.noStroke();
		if (!hide_1)
		{
			processing.fill(main);
			processing.rect(41, 95, data["school_1"][0]/tuition_max * 260, 25);
			processing.rect(41, 230, data["school_1"][1]/grad_max * 260, 25);
			processing.rect(356, 95, data["school_1"][2]/size_max * 260, 25);

			processing.strokeWeight(3);
			processing.stroke(main);
			if (data["school_1"][3] > 100)
			{
				if (data["school_1"][3] > 201)
				{
					processing.fill(255);
					processing.rect(362, 220, 110, 80, 10);
					processing.fill(main);
					processing.text("OVER", 419, 240);
					processing.textFont(font, 56);
					processing.text("200", 417, 287);
				}
				else
				{
					processing.fill(255);
					processing.rect(362, 220, 110, 80, 10);
					processing.fill(main);
					processing.textFont(font, 58);
					processing.text(data["school_1"][3], 415, 282);
				}
			}
			else
			{
				processing.fill(255);
				processing.rect(375, 220, 80, 80, 10);
				processing.fill(main);
				processing.textFont(font, 58);
				processing.text(data["school_1"][3], 415, 282);
			}
			processing.textFont(font, 12);
		}
		processing.noStroke();
		if (!hide_2)
		{
			processing.fill(gray);
			processing.rect(41, 120, data["school_2"][0]/tuition_max * 260, 25);
			processing.rect(41, 255, data["school_2"][1]/grad_max * 260, 25);
			processing.rect(356, 120, data["school_2"][2]/size_max * 260, 25);

			processing.strokeWeight(3);
			processing.stroke(gray);
			if (data["school_2"][3] > 100)
			{
				if (data["school_2"][3] > 201)
				{
					processing.fill(255);
					processing.rect(503, 220, 110, 80, 10);
					processing.fill(gray);
					processing.text("OVER", 560, 240);
					processing.textFont(font, 56);
					processing.text("200", 558, 287);
				}
				else
				{
					processing.fill(255);
					processing.rect(503, 220, 110, 80, 10);
					processing.fill(gray);
					processing.textFont(font, 58);
					processing.text(data["school_2"][3], 555, 282);
				}
			}
			else
			{
				processing.fill(255);
				processing.rect(515, 220, 80, 80, 10);
				processing.fill(gray);
				processing.textFont(font, 58);
				processing.text(data["school_2"][3], 555, 282);
			}
			processing.textFont(font, 12);
		}

	};

	function draw_career() {
		document.getElementById("search_1_name").value = "software engineer";
		document.getElementById("search_2_name").value = "music teacher";
		//tab helper salary, job satisfaction, demand, unemployment
		if (active_tab == 1)
			career_summary();
		else if (active_tab == 2)
			career_salary();
		else if (active_tab == 3)
			career_demand();
		else
			career_unemploy();
	};

	function career_salary() {
		//graph variables
		var graph_top = 50; 
		var graph_bot = 320;
		var graph_left = 70;
		var graph_right = 605;

		//draw title and graph border
		processing.strokeWeight(2);
		processing.stroke(0);
		processing.fill(0);
		processing.textAlign(processing.CENTER);
		processing.text("AVERAGE NATIONAL SALARIES ($)", 327, 30);

		processing.line(graph_left, graph_top, graph_left, graph_bot-1);
		processing.line(graph_left, graph_bot, graph_right, graph_bot);

		//draw year labels and lines
		processing.stroke(235);
		processing.strokeWeight(1);
		processing.text("1997", graph_left, graph_bot+20);
		for (var i=1; i<17; i++)
		{
			var horz_loc = graph_left+i*((graph_right-graph_left)/16);
			if (i%2 == 0)
			{
				processing.text(String(1997+i), horz_loc, graph_bot+20);
			}
			processing.line(horz_loc, graph_top+1, horz_loc, graph_bot-2);
		}

		//calculate min and max for data being shown [17] = min, [18] = max
		var min, max;
		if (!hide_1 && !hide_2)
		{
			min = processing.min(data["career_salary_1"][17], data["career_salary_2"][17]);
			max = processing.max(data["career_salary_1"][18], data["career_salary_2"][18]);
		}
		else if (hide_1)
		{
			min = data["career_salary_2"][17];
			max = data["career_salary_2"][18];
		}
		else
		{
			min = data["career_salary_1"][17];
			max = data["career_salary_1"][18];
		}

		//draw lines and labels for salary range
		min = ((processing.round(min/10000))-1)*10000;
		max = ((processing.round(max/10000))+1)*10000;

		var range = (max-min);
		var step = range/10;


		processing.textAlign(processing.RIGHT);

		processing.text(String(processing.round((min)/1000))+"k", graph_left-10, graph_bot);
		for (var i=1; i<=10; i++)
		{
			var vert_loc = graph_bot-i*((graph_bot-graph_top)/10);
			processing.text(String(processing.round((min+i*step)/1000))+"k", graph_left-10, vert_loc+2);
			processing.line(graph_left+1, vert_loc, graph_right, vert_loc);
		}

		//draw data
		processing.strokeWeight(4);
		for (var i=0; i<16; i++)
		{
			if (!hide_1)
			{
				processing.stroke(main);
				var horz_1 = graph_left+i*((graph_right-graph_left)/16);
				var horz_2 = graph_left+(i+1)*((graph_right-graph_left)/16);
				var vert_1 = graph_top+(1-(data["career_salary_1"][i] - min)/(range))*(graph_bot-graph_top);
				var vert_2 = graph_top+(1-(data["career_salary_1"][i+1] - min)/(range))*(graph_bot-graph_top);
				processing.line(horz_1, vert_1, horz_2, vert_2);
			}
			if (!hide_2)
			{
				processing.stroke(gray);
				var horz_1 = graph_left+i*((graph_right-graph_left)/16);
				var horz_2 = graph_left+(i+1)*((graph_right-graph_left)/16);
				var vert_1 = graph_top+(1-(data["career_salary_2"][i] - min)/(range))*(graph_bot-graph_top);
				var vert_2 = graph_top+(1-(data["career_salary_2"][i+1] - min)/(range))*(graph_bot-graph_top);
				processing.line(horz_1, vert_1, horz_2, vert_2);
			}
		}


	};

	function career_summary() {
		//draw categories and separations
		processing.textAlign(processing.RIGHT);
		processing.fill(0);
		processing.text("2013 AVERAGE SALARY", 275, 55);
		processing.text("CENTS JOB RATING", 275, 135);
		processing.text("PROJECTED JOB DEMAND 2012-2022", 275, 215);
		processing.text("2012 UNEMPLOYMENT", 275, 295);
		processing.stroke(225);
		processing.strokeWeight(1);
		processing.line(55, 93, 275, 93);
		processing.line(55, 173, 275, 173);
		processing.line(55, 253, 275, 253);
		processing.textAlign(processing.CENTER);
		processing.text("(CLICK TABS ON RIGHT FOR MORE DETAILS)", 330, 355);
		//processing.stroke(0);
		//processing.line(190, 340, 464, 340);

		//draw data
		//salary[16]
		processing.textFont(font, 30);
		processing.fill(main);
		processing.text("$" + (data["career_salary_1"][16]).toLocaleString(), 400, 60);
		processing.text("" + (data["career_satisfaction_1"]), 400, 130);
		processing.text((data["career_demand_1"][0]).toLocaleString(), 400, 215);
		processing.text((data["career_unemploy_1"][0]) + "%", 400, 300);

		processing.fill(gray);
		processing.text("$" + (data["career_salary_2"][16]).toLocaleString(), 560, 60);
		processing.text("" + (data["career_satisfaction_2"]), 560, 130);
		processing.text((data["career_demand_2"][0]).toLocaleString(), 560, 215);
		processing.text((data["career_unemploy_2"][0]) + "%", 560, 300);

		processing.textFont(font, 12);
		processing.fill(main);
		processing.text("OUT OF 5.0", 400, 150);
		processing.text("JOBS", 400, 235);
		processing.fill(gray);
		processing.text("OUT OF 5.0", 560, 150);
		processing.text("JOBS", 560, 235);

	};

	function career_demand() {
		//graph variables
		var graph_top = 50; 
		var graph_bot = 320;
		var graph_mid_1 = 122;
		//var graph_right_1 = 212;
		var graph_mid_2 = 327;
		//var graph_right_2 = 417;
		var graph_mid_3 = 532;
		//var graph_right_3 = 622;

		//draw title and graph border
		processing.strokeWeight(2);
		processing.stroke(0);
		processing.fill(0);
		processing.textAlign(processing.CENTER);
		processing.text("PROJECTED CAREER DEMAND (2012-2022)", 327, 25);
		// processing.textAlign(processing.RIGHT);
		processing.text("CAREER GROWTH VOLUME", graph_mid_1+10, graph_bot+28);
		processing.text("CAREER GROWTH PERCENT", graph_mid_2+10, graph_bot+28);
		processing.text("JOB OPENINGS", graph_mid_3+10, graph_bot+28);

		processing.line(graph_mid_1-55, graph_bot, graph_mid_1+90, graph_bot);
		processing.line(graph_mid_2-55, graph_bot, graph_mid_2+90, graph_bot);
		processing.line(graph_mid_3-55, graph_bot, graph_mid_3+90, graph_bot);

		//draw scale lines
		processing.strokeWeight(1);
		processing.stroke(235);
		var scale = (graph_bot-graph_top)/10;
		for (var i=0; i<10; i++)
		{
			processing.line(graph_mid_1-55, graph_top+(scale*i), graph_mid_1+90, graph_top+(scale*i));
			processing.line(graph_mid_2-55, graph_top+(scale*i), graph_mid_2+90, graph_top+(scale*i));
			processing.line(graph_mid_3-55, graph_top+(scale*i), graph_mid_3+90, graph_top+(scale*i));
		}

		//calculate min and max for each graph
		//***************FIX FOR NEGATIVE NUMBERS
		var min_1, max_1, min_2, max_2, min_3, max_3;
		if (hide_2 && !hide_1)
		{
			min_1 = data["career_demand_1"][2] * 0.8;
			max_1 = data["career_demand_1"][2] * 1.1;
			min_2 = data["career_demand_1"][1] * 0.8;
			max_2 = data["career_demand_1"][1] * 1.1;
			min_3 = data["career_demand_1"][0] * 0.8;
			max_3 = data["career_demand_1"][0] * 1.1;
		}
		else if (!hide_2 && hide_1)
		{
			min_1 = data["career_demand_2"][2] * 0.8;
			max_1 = data["career_demand_2"][2] * 1.1;
			min_2 = data["career_demand_2"][1] * 0.8;
			max_2 = data["career_demand_2"][1] * 1.1;
			min_3 = data["career_demand_2"][0] * 0.8;
			max_3 = data["career_demand_2"][0] * 1.1;
		}
		else
		{
			min_1 = processing.min(data["career_demand_1"][2], data["career_demand_2"][2]) * 0.8;
			max_1 = processing.max(data["career_demand_1"][2], data["career_demand_2"][2]) * 1.1;
			min_2 = processing.min(data["career_demand_1"][1], data["career_demand_2"][1]) * 0.8;
			max_2 = processing.max(data["career_demand_1"][1], data["career_demand_2"][1]) * 1.1;
			min_3 = processing.min(data["career_demand_1"][0], data["career_demand_2"][0]) * 0.8;
			max_3 = processing.max(data["career_demand_1"][0], data["career_demand_2"][0]) * 1.1;

		}

		//draw numerical scales
		var range_1 = (max_1-min_1)/10;
		var range_2 = (max_2-min_2)/10;
		var range_3 = (max_3-min_3)/10;
		processing.textAlign(processing.RIGHT);
		for (var i=0; i<=10; i++)
		{
			processing.text(((min_1+(range_1*i))/1000).toFixed(1) + "k", graph_mid_1-60, graph_bot-(scale*i)+5);
			processing.text((min_2+(range_2*i)).toFixed(1) + "%", graph_mid_2-60, graph_bot-(scale*i)+5);
			processing.text(((min_3+(range_3*i))/1000).toFixed(1) + "k", graph_mid_3-60, graph_bot-(scale*i)+5);
		}

		//draw data
		if (!hide_1)
		{
			processing.fill(main);
			processing.noStroke();
			processing.rect(graph_mid_1-20, graph_bot-1, 30, -1*(graph_bot-graph_top)*(data["career_demand_1"][2]-min_1)/(max_1-min_1));
			processing.rect(graph_mid_2-20, graph_bot-1, 30, -1*(graph_bot-graph_top)*(data["career_demand_1"][1]-min_2)/(max_2-min_2));
			processing.rect(graph_mid_3-20, graph_bot-1, 30, -1*(graph_bot-graph_top)*(data["career_demand_1"][0]-min_3)/(max_3-min_3));

		}
		if (!hide_2)
		{
			processing.fill(gray);
			processing.noStroke();
			processing.rect(graph_mid_1+10, graph_bot-1, 30, -1*(graph_bot-graph_top)*(data["career_demand_2"][2]-min_1)/(max_1-min_1));
			processing.rect(graph_mid_2+10, graph_bot-1, 30, -1*(graph_bot-graph_top)*(data["career_demand_2"][1]-min_2)/(max_2-min_2));
			processing.rect(graph_mid_3+10, graph_bot-1, 30, -1*(graph_bot-graph_top)*(data["career_demand_2"][0]-min_3)/(max_3-min_3));
		}


	};

	function career_unemploy() {

		var graph_top = 50; 
		var graph_bot = 320;
		var graph_left = 60;
		var graph_right = 620;
		axis_location = [150, 530];

		//draw labels
		processing.textAlign(processing.CENTER);
		processing.stroke(0);
		processing.strokeWeight(2);
		processing.fill(0);
		processing.text("UNEMPLOYMENT RATE 2011", axis_location[0], graph_bot+23);
		processing.text("UNEMPLOYMENT RATE 2012", axis_location[1], graph_bot+23);
		processing.text("CAREER UNEMPLOYMENT RATES", 335, 30);

		//left and right axis
		processing.line(graph_left, graph_top, graph_left, graph_bot);
		processing.line(graph_right, graph_top, graph_right, graph_bot);

		//bottom lines around categories
		processing.line(graph_left, graph_bot+1, graph_right-1, graph_bot+1);

		//need max for percentages
		var min, max;
		if (hide_2 && !hide_1)
		{
			min = processing.min(data["career_unemploy_1"][0], data["career_unemploy_1"][1], data["career_unemploy_3"][0], data["career_unemploy_3"][1]);
			max = processing.max(data["career_unemploy_1"][0], data["career_unemploy_1"][1], data["career_unemploy_3"][0], data["career_unemploy_3"][1]);
			min = min * 0.9;
			max = max * 1.05;
		}
		else if (!hide_2 && hide_1)
		{
			min = processing.min(data["career_unemploy_2"][0], data["career_unemploy_2"][1], data["career_unemploy_3"][0], data["career_unemploy_3"][1]);
			max = processing.max(data["career_unemploy_2"][0], data["career_unemploy_2"][1], data["career_unemploy_3"][0], data["career_unemploy_3"][1]);
			min = min * 0.9;
			max = max * 1.05;
		}
		else
		{
			min = processing.min(data["career_unemploy_1"][0], data["career_unemploy_1"][1], data["career_unemploy_2"][0], data["career_unemploy_2"][1], data["career_unemploy_3"][0], data["career_unemploy_3"][1]);
			max = processing.max(data["career_unemploy_1"][0], data["career_unemploy_1"][1], data["career_unemploy_2"][0], data["career_unemploy_2"][1], data["career_unemploy_3"][0], data["career_unemploy_3"][1]);
			min = min * 0.9;
			max = max * 1.05;
		}

		//draw scales
		processing.stroke(235);
		processing.fill(0);
		var range = (graph_top - graph_bot)/10;
		var per_scale = (max - min)/10;
		for (var i=1; i<=10; i++)
		{
			var h = graph_bot + range * i;
			processing.line(graph_left+2, h, graph_right-3, h);
			processing.textAlign(processing.RIGHT);
			processing.text((min + per_scale * i).toFixed(1) + "%", graph_left-5, h+5);
		}
		//bottom value
		processing.text((min).toFixed(1) + "%", graph_left-5, graph_bot);


		

		// //draw NATIONAL AVERAGE rectangle and data
		processing.stroke(0);
		var line_1 = graph_bot + (graph_top - graph_bot)*((data["career_unemploy_3"][0] -  min)/(max - min));
		var line_2 = graph_bot + (graph_top - graph_bot)*((data["career_unemploy_3"][1] -  min)/(max - min));
		
		processing.line(graph_left, line_1, axis_location[0]+70, line_1);
		processing.line(axis_location[0]+71, line_1, axis_location[1]-71, line_2);
		processing.line(axis_location[1]-70, line_2, graph_right-1, line_2);

		processing.fill(255);
		processing.stroke(255);
		processing.rect((axis_location[0]+axis_location[1])/2-40, (line_1+line_2)/2-30, 77, 50)
		processing.noStroke();
		processing.fill(0);
		processing.textAlign(processing.CENTER);
		processing.text("NATIONAL", (axis_location[0]+axis_location[1])/2, (line_1+line_2)/2-9);
		processing.text("AVERAGES", (axis_location[0]+axis_location[1])/2, (line_1+line_2)/2+8);

		var height_1 = (graph_top - graph_bot)*((data["career_unemploy_1"][0] -  min)/(max - min));
		var height_2 = (graph_top - graph_bot)*((data["career_unemploy_1"][1] -  min)/(max - min));
		var height_3 = (graph_top - graph_bot)*((data["career_unemploy_2"][0] -  min)/(max - min));
		var height_4 = (graph_top - graph_bot)*((data["career_unemploy_2"][1] -  min)/(max - min));


		//buffer boxes
		if (!hide_1)
		{
			processing.fill(255);
			processing.rect(axis_location[0]-35, graph_bot, 40, height_1);
			processing.rect(axis_location[1]-35, graph_bot, 40, height_2);
		}

		if (!hide_2)
		{
			processing.fill(255);
			processing.rect(axis_location[0]-5, graph_bot, 40, height_3);
			processing.rect(axis_location[1]-5, graph_bot, 40, height_4);
		}
		//data
		if (!hide_1)
		{
			processing.fill(main);
			processing.noStroke();
			processing.rect(axis_location[0]-30, graph_bot, 30, height_1);
			processing.rect(axis_location[1]-30, graph_bot, 30, height_2);
		}

		if (!hide_2)
		{
			processing.fill(gray);
			processing.noStroke();
			processing.rect(axis_location[0], graph_bot, 30, height_3);
			processing.rect(axis_location[1], graph_bot, 30, height_4);	
		}

	};

	function draw_spend() {
		//no tabs, just draw
	};


};


var canvas = document.getElementById("main_viz");
if (canvas != null)
	var processingInstance = new Processing(canvas, sketchProc);


function update_tab(name) {
	active_tab = name;
	hide_1 = false;
	hide_2 = false;
	document.getElementById("search_1_button").value = "HIDE";
	document.getElementById("search_2_button").value = "HIDE";
};

function api_request(query) {
	var url = "http://54.67.106.77:6001/query/" + query;
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

//var hide_show_1 = "HIDE";
function hide_toggle(num) {
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

