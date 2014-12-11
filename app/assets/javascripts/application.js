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



var active_tab, type, data, hide_1, hide_2, axis_location, horz_locs, min, max, above_1, above_2, below_1, below_2;


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
		var font = processing.loadFont("./fonts/Roboto-Regular.ttf");
		processing.textFont(font, 12);

		//var to hold all data relevant to a given category
		data = new Array();
		above_1 = new Array();
		above_2 = new Array();
		below_1 = new Array();
		below_2 = new Array();
		
		//create dummy data
		data["weather_1"] =    [38.0, 44.0, 53.0, 61.0, 71.0, 82.0, 90.0, 89.0, 78.0, 65.0, 50.0, 40.0, 90.0, 38.0];
		data["weatherlow_1"] = [26.0, 31.0, 38.0, 43.0, 52.0, 61.0, 69.0, 67.0, 58.0, 46.0, 36.0, 27.0, 69.0, 26.0];
		data["weather_2"]    = [67.0, 71.5, 77.5, 85.5, 95.5, 104.5, 106.5, 104.5, 100.5, 89.5, 76.5, 66.5, 106.5, 66.5];
		data["weatherlow_2"] = [46.0, 49.5, 53.5, 60.5, 69.5, 78.5, 83.5, 83.5, 77.5, 65.5, 53.5, 45.5, 83.5, 45.5];


		data["location_1"] = "Salt Lake City, UT";
		data["location_2"] = "Phoenix, AZ";

		data["labor_1"] = [3.4, 48000, 4.4];
		data["labor_2"] = [6.4, 51000, 3.3];
		data["labor_3"] = [5.8, 44800, 4.6];

		//sales, income min, income max, property
		data["taxes_1"] = [6.85, 5.0, 5.0, 0.67];
		data["taxes_2"] = [8.3, 2.59, 4.54, 0.59];
		data["taxes_3"] = [9.6, 3.5, 7.8, 1.65];

		//cost of living dummy data
		// data["cli_1_1"] = 101;
		// data["cli_1_2"] = 99;
		// data["cli_2_1"] = 102;
		// data["cli_2_2"] = 98;
		// data["cli_3_1"] = 103;
		// data["cli_3_2"] = 97;
		// data["cli_4_1"] = 105;
		// data["cli_4_2"] = 96;
		// data["cli_5_1"] = 110;
		// data["cli_5_2"] = 95;
		// data["cli_6_1"] = 115;
		// data["cli_6_2"] = 93;
		// data["cli_7_1"] = 120;
		// data["cli_7_2"] = 92;
		// data["max_cli_1"] = 120;
		// data["min_cli_1"] = 101;
		// data["max_cli_2"] = 99;
		// data["min_cli_2"] = 92;
		data["cli_1_1"] = 102;
		data["cli_1_2"] = 96;
		data["cli_2_1"] = 94;
		data["cli_2_2"] = 92;
		data["cli_3_1"] = 95;
		data["cli_3_2"] = 100;
		data["cli_4_1"] = 95;
		data["cli_4_2"] = 106;
		data["cli_5_1"] = 119;
		data["cli_5_2"] = 97;
		data["cli_6_1"] = 105;
		data["cli_6_2"] = 101;
		data["cli_7_1"] = 92;
		data["cli_7_2"] = 99;
		data["max_cli_1"] = 119;
		data["min_cli_1"] = 92;
		data["max_cli_2"] = 106;
		data["min_cli_2"] = 92;

		//set up min and max and any other design variables for each tab here 

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
		if (type == "city" && active_tab == 1)
		{
			var category = ["Overall, costs in", "Goods in", "Groceries in", "Health care costs in", "Housing costs in", "Transportation costs in", "Utilities in"];
			for (var i=0; i<horz_locs.length; i++)
			{
				//aligned horizontally
				if (processing.mouseX < horz_locs[i] && processing.mouseX >= (horz_locs[i] - 16) && !hide_1)
				{
						//location 1, postive change
						var data1 = data["cli_" + String(i+1) + "_1"];
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
					var data2 = data["cli_" + String(i+1) + "_2"];
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
		//tab helper 1-cost of living, 2-labor stats, 3-taxes, 4-weather
		document.getElementById("search_1_name").value = data["location_1"];
		document.getElementById("search_2_name").value = data["location_2"];
		if (active_tab == 1)
			cost_of_living();
		else if (active_tab == 2)
			labor_stats();
		else if (active_tab == 3)
			taxes();
		else
			weather();
	};

	function cost_of_living() {

		//need to check for hugh outliers that will skew viz and make data impossible to read


		//calculate min and max depending on what data is being shown/hidden
		
		if (!hide_2 && hide_1)
		{
			min = data["min_cli_2"];
			max = data["max_cli_2"];

		}
		else if (hide_2 && !hide_1)
		{
			min = data["min_cli_1"];
			max = data["max_cli_1"];
		}
		else
		{
			min = processing.min(data["min_cli_1"], data["min_cli_2"]);
			max = processing.max(data["max_cli_1"], data["max_cli_2"]);
			//min = min - ((max-min));
			//max = max + ((max-min));
		}



		//draw axis depending on where national average (100) falls within the calculated min and max
		
		axis_location;
		if (max <= 100)
			axis_location = 60;
		else if (min > 100)
			axis_location = 315;
		else
			axis_location = 60 + 255 * (1 - ((100 - min) / (max - min)));


		//draw scale
		processing.stroke(235);
		processing.fill(0);
		processing.textAlign(processing.RIGHT);
		var step = (max-min)/10;
		//var range = max-min;
		for (var i=max; i>100; i-=step)
		{
			if (processing.round(i) > 100)
			{
				processing.line(60, 45 + (axis_location-15-45)*(1-(i-100)/(max-100)), 605, 45 + (axis_location-15-45)*(1-(i-100)/(max-100)));
				processing.text(processing.round(i-100) + "%", 55, 50 + (axis_location-15-45)*(1-(i-100)/(max-100)));
			}
		}
		var step = (max-min)/10;
		for (var i=min; i<100; i+=step)
		{
			processing.line(60, 330 - (330-(axis_location+15))*(1-(100-i)/(100-min)), 605, 330 - (330-(axis_location+15))*(1-(100-i)/(100-min)));
			processing.text("-" + processing.round(100-i) + "%", 55, 335 - (330-(axis_location+15))*(1-(100-i)/(100-min)));
		}

		//draw a rectangle to highlight better or worse than national average 
		processing.fill(245);
		processing.noStroke();
		// if (axis_location != 50 || axis_location != 325)
		// 	processing.rect(60, 50, 545, 275 * (1 - ((100 - min) / (max - min))) - 15);

		processing.fill(255);
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
		for (var i=1; i<=7; i++)
		{
			if (!hide_1)
			{
				var data1 = data["cli_" + i + "_1"];
				processing.fill(main);
				if (data1 > 100) //above
				{
					var height = (100-data1)/(100-min)*(315-axis_location);
					processing.rect(horz_locs[i-1]-16, axis_location - 15, 16, height);
					above_1[i-1] = axis_location - 15 + height;
				}
				else if (data1 < 100)
				{
					var height = (100-data1)/(100-min)*(315-axis_location);
					processing.rect(horz_locs[i-1]-16, axis_location + 15, 16, height);
					below_1[i-1] = axis_location + 15 + height;
				}
				else
				{
					processing.rect(horz_locs[i-1], axis_location - 15, 16, -5);
					above_1[i-1] = axis_location-25;
				}
			}

			if (!hide_2)
			{
				var data2 = data["cli_" + i + "_2"];
				processing.fill(gray);
				if (data2 > 100) //above
				{
					var height = (100-data2)/(100-min)*(315-axis_location);
					processing.rect(horz_locs[i-1], axis_location - 15, 16, height);
					above_2[i-1] = axis_location - 15 + height;
				}
				else if (data2 < 100)
				{
					var height = (100-data2)/(100-min)*(315-axis_location);
					processing.rect(horz_locs[i-1], axis_location + 15, 16, height);
					below_2[i-1] = axis_location + 15 + height;
				}
				else
				{
					processing.rect(horz_locs[i-1], axis_location - 15, 16, -5);
					above_2[i-1] = axis_location-25;
				}
			}

		}


		processing.stroke(0);
		processing.line(60, axis_location - 15, 605, axis_location - 15);
		processing.line(60, axis_location + 15, 605, axis_location + 15);

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
		processing.stroke(245);
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
		axis_location = [110, 195, 320, 530];
		var graph_top = 50; 
		var graph_bot = 320;
		var graph_left = 60;
		var graph_right = 595;

		processing.textAlign(processing.CENTER);
		processing.stroke(0);
		processing.fill(0);
		processing.text("SALES TAX", axis_location[0], graph_bot+15);
		processing.text("- INCOME TAX -", (axis_location[2]+axis_location[1])/2, graph_bot+15);
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
		
	};

	function weather() {
		//draw axis
		processing.stroke(0);
		processing.fill(0);
		processing.strokeWeight(2);
		processing.line(60, 50, 60, 324);
		processing.line(60, 325, 605, 325);
		//add scale, will be dynamic, pulling mins and max for the two cities

		var min, max;
		if (!hide_2 && hide_1)
		{
			// min = data["min_weather_2"] - ((data["max_weather_2"]-data["min_weather_2"]) / 18);
			// max = data["max_weather_2"] + ((data["max_weather_2"]-data["min_weather_2"]) / 18);
			min = data["weatherlow_2"][13];
			max = data["weather_2"][12];

		}
		else if (hide_2 && !hide_1)
		{
			min = data["weatherlow_1"][13];
			max = data["weather_1"][12];
			//min = data["min_weather_1"] - ((data["max_weather_1"]-data["min_weather_1"]) / 18);
			//max = data["max_weather_1"] + ((data["max_weather_1"]-data["min_weather_1"]) / 18);
		}
		else
		{
			min = processing.min(data["weatherlow_1"][13], data["weatherlow_2"][13]);
			max = processing.max(data["weather_1"][12], data["weather_2"][12]);
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
				//processing.strokeWeight(10);
				//var percent_1 = (data["weather_1_"+i] -  min) / range;
				var percent_1 = (data["weather_1"][i-1] - min) / range;
				var percent_2 = (data["weatherlow_1"][i-1] -  min) / range;
				//processing.rect(27+45*i, (1-percent_1) * 275 + 49, 10, percent_1 * 275);
				processing.ellipse(28+45*i, (1-percent_1) * 275 + 49, 3, 3);
				processing.ellipse(28+45*i, (1-percent_2) * 275 + 49, 3, 3);
				processing.line(28+45*i, (1-percent_1) * 275 + 49, 28+45*i, (1-percent_2) * 275 + 49);
			}

			if (!hide_2)
			{
				processing.stroke(gray);
				processing.fill(gray);
				//processing.strokeWeight(10);
				var percent_1 = (data["weather_2"][i-1] - min) / range;
				var percent_2 = (data["weatherlow_2"][i-1] -  min) / range;
				// var percent_1 = (data["weather_2_"+i] -  min) / range;
				// var percent_2 = (data["weatherlow_2_"+i] -  min) / range;
				//processing.rect(27+45*i, (1-percent_1) * 275 + 49, 10, percent_1 * 275);
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
		//processing.strokeWeight(2);
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
		//tab helper
	};

	function draw_career() {
		document.getElementById("search_1_name").value = "software engineer";
		document.getElementById("search_2_name").value = "music teacher";
		//tab helper
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

function api_request() {
    window.alert("api_request");
};

var hide_show_1 = "HIDE";
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

