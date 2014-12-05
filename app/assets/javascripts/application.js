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
		type = "city";
		processing.size(655,375);
		//always set the initial tab to the first one
		active_tab = 1;
		hide_1 = false;
		hide_2 = false;
		horz_locs = [87, 145, 215, 308, 389, 488, 577];
		

		//load font


		//var to hold all data relevant to a given category
		data = new Array();
		above_1 = new Array();
		above_2 = new Array();
		below_1 = new Array();
		below_2 = new Array();
		//create dummy data

		//weather
		data["weather_1_1"] = 38.0;
		data["weather_2_1"] = 67.0;
		data["weather_1_2"] = 44.0;
		data["weather_2_2"] = 71.5;
		data["weather_1_3"] = 53.0;
		data["weather_2_3"] = 77.5;
		data["weather_1_4"] = 61.0;
		data["weather_2_4"] = 85.5;
		data["weather_1_5"] = 71.0;
		data["weather_2_5"] = 95.5;
		data["weather_1_6"] = 82.0;
		data["weather_2_6"] = 104.5;
		data["weather_1_7"] = 90.0;
		data["weather_2_7"] = 106.5;
		data["weather_1_8"] = 89.0;
		data["weather_2_8"] = 104.5;
		data["weather_1_9"] = 78.0;
		data["weather_2_9"] = 100.5;
		data["weather_1_10"] = 65.0;
		data["weather_2_10"] = 89.5;
		data["weather_1_11"] = 50.0;
		data["weather_2_11"] = 76.5;
		data["weather_1_12"] = 40.0;
		data["weather_2_12"] = 66.5;

		data["weatherlow_1_1"] = 26.0;
		data["weatherlow_2_1"] = 46.0;
		data["weatherlow_1_2"] = 31.0;
		data["weatherlow_2_2"] = 49.5;
		data["weatherlow_1_3"] = 38.0;
		data["weatherlow_2_3"] = 53.5;
		data["weatherlow_1_4"] = 43.0;
		data["weatherlow_2_4"] = 60.5;
		data["weatherlow_1_5"] = 52.0;
		data["weatherlow_2_5"] = 69.5;
		data["weatherlow_1_6"] = 61.0;
		data["weatherlow_2_6"] = 78.5;
		data["weatherlow_1_7"] = 69.0;
		data["weatherlow_2_7"] = 83.5;
		data["weatherlow_1_8"] = 67.0;
		data["weatherlow_2_8"] = 83.5;
		data["weatherlow_1_9"] = 58.0;
		data["weatherlow_2_9"] = 77.5;
		data["weatherlow_1_10"] = 46.0;
		data["weatherlow_2_10"] = 65.5;
		data["weatherlow_1_11"] = 36.0;
		data["weatherlow_2_11"] = 53.5;
		data["weatherlow_1_12"] = 27.0;
		data["weatherlow_2_12"] = 45.5;
		data["max_weather_1"] = 95.5;
		data["min_weather_1"] = 26.0;
		data["max_weather_2"] = 106.5;
		data["min_weather_2"] = 45.5;

		data["location_1"] = "Salt Lake City, UT";
		data["location_2"] = "Phoenix, AZ";

		//labor statstics
		data["unemploy_1"] = 3.4;
		data["unemploy_2"] = 6.4;
		data["avgsal_1"] = 48000;
		data["avgsal_2"] = 51000;
		data["econgrow_1"] = 4.4;
		data["econgrow_2"] = 3.3;

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



		document.getElementById("search_1_name").value = data["location_1"];
		document.getElementById("search_2_name").value = data["location_2"];





		//set up min and max and any other design variables for each tab here 

	};

	processing.draw = function() {
		processing.background(255);

		if (type == "city")
			draw_city();

		//show cli details
		if (type == "city" && active_tab == 1)
		{
			var category = ["Overall costs in", "Goods in", "Groceries in", "Health care costs in", "Housing costs in", "Transportation costs in", "Utilities in"];
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
		var step = (max-min)/11;
		//var range = max-min;
		for (var i=max; i>100; i-=step)
		{
				processing.line(60, 45 + (axis_location-15-45)*(1-(i-100)/(max-100)), 605, 45 + (axis_location-15-45)*(1-(i-100)/(max-100)));
				processing.text(processing.round(i) + "%", 55, 50 + (axis_location-15-45)*(1-(i-100)/(max-100)));
		}
		var step = (max-min)/10;
		for (var i=min; i<100; i+=step)
		{
			processing.line(60, 330 - (330-(axis_location+15))*(1-(100-i)/(100-min)), 605, 330 - (330-(axis_location+15))*(1-(100-i)/(100-min)));
			processing.text(processing.round(i) + "%", 55, 335 - (330-(axis_location+15))*(1-(100-i)/(100-min)));
		}

		// var max_percent = (max-100)/(max-min)+0.049;
		// var min_percent = (100-min)/(max-min)+0.049;
		// for (var i=0.1; i<max_percent-0.1; i+=0.1)
		// {
		// 	processing.text(processing.round(i*(max-min)) + "%", 55, (axis_location-15) - (axis_location-15+60)*i+5);
		// 	processing.line(60, (axis_location-15) - (axis_location-15+60)*i, 605, (axis_location-15) - (axis_location-15+60)*i);

		// }
		// for (var i=0.1; i<min_percent-0.1; i+=0.1)
		// {
		// 	processing.text(processing.round("-" + i*(max-min)) + "%", 55, (axis_location+15) + (axis_location+15+60)*i+5);
		// 	processing.line(60, (axis_location+15) + (axis_location+15+60)*i, 605, (axis_location+15) + (axis_location+15+60)*i);
		// }

		

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
		//draw axis
		processing.fill(0);
		processing.stroke(0);
		processing.strokeWeight(2);
		processing.line(100, 300, 225, 300);
		processing.line(265, 300, 390, 300);
		processing.line(430, 300, 555, 300);
		
		//draw labels
		processing.text("UNEMPLOYMENT RATE", 94, 325);
		processing.text("AVERAGE SALARY", 278, 325);
		processing.text("ECONOMIC GROWTH", 432, 325);
		processing.fill(gray);
		processing.text("(%)", 143, 340);
		processing.text("($)", 319, 340);
		processing.text("(%)", 480, 340);

		//draw data
		var max_unemploy = processing.max(data["unemploy_1"], data["unemploy_2"]);
		var max_salary = processing.max(data["avgsal_1"], data["avgsal_2"]);
		var max_econ = processing.max(data["econgrow_1"], data["econgrow_2"]);

		processing.noStroke();

		if (!hide_1)
		{
			processing.fill(main);
			processing.rect(121, 299 - 200 * (data["unemploy_1"]/max_unemploy), 42, 200 * (data["unemploy_1"]/max_unemploy));
			processing.rect(286, 299 - 200 * (data["avgsal_1"]/max_salary), 42, 200 * (data["avgsal_1"]/max_salary));
			processing.rect(451, 299 - 200 * (data["econgrow_1"]/max_econ), 42, 200 * (data["econgrow_1"]/max_econ));
		}
		if (!hide_2)
		{
			processing.fill(gray);
			processing.rect(163, 299 - 200 * (data["unemploy_2"]/max_unemploy), 42, 200 * (data["unemploy_2"]/max_unemploy));
			processing.rect(328, 299 - 200 * (data["avgsal_2"]/max_salary), 42, 200 * (data["avgsal_2"]/max_salary));
			processing.rect(493, 299 - 200 * (data["econgrow_2"]/max_econ), 42, 200 * (data["econgrow_2"]/max_econ));
		}

		

	};

	function taxes() {
		
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
			min = data["min_weather_2"] - ((data["max_weather_2"]-data["min_weather_2"]) / 18);
			max = data["max_weather_2"] + ((data["max_weather_2"]-data["min_weather_2"]) / 18);

		}
		else if (hide_2 && !hide_1)
		{
			min = data["min_weather_1"] - ((data["max_weather_1"]-data["min_weather_1"]) / 18);
			max = data["max_weather_1"] + ((data["max_weather_1"]-data["min_weather_1"]) / 18);
		}
		else
		{
			min = processing.min(data["min_weather_1"], data["min_weather_2"]);
			max = processing.max(data["max_weather_1"], data["max_weather_2"]);
			min = min - ((max-min) / 10);
			max = max + ((max-min) / 10);
		}

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
		processing.text("JAN", 70, 345);
		processing.text("FEB", 115, 345);
		processing.text("MAR", 160, 345);
		processing.text("APR", 205, 345);
		processing.text("MAY", 250, 345);
		processing.text("JUN", 295, 345);
		processing.text("JUL", 340, 345);
		processing.text("AUG", 385, 345);
		processing.text("SEP", 430, 345);
		processing.text("OCT", 475, 345);
		processing.text("NOV", 520, 345);
		processing.text("DEC", 565, 345);
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
				var percent_1 = (data["weather_1_"+i] -  min) / range;
				var percent_2 = (data["weatherlow_1_"+i] -  min) / range;
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
				var percent_1 = (data["weather_2_"+i] -  min) / range;
				var percent_2 = (data["weatherlow_2_"+i] -  min) / range;
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
		//tab helper
	};

	function draw_college() {
		//tab helper
	};

	function draw_career() {
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

