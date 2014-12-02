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

var active_tab, type, data, hide_1, hide_2;


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
		

		//load font


		//var to hold all data relevant to a given category
		data = new Array();
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
		//this should be scaled up and down a little, +- 10% of range
		data["max_weather_1"] = 95.5;
		data["min_weather_1"] = 26.0;
		data["max_weather_2"] = 106.5;
		data["min_weather_2"] = 45.5;

		data["name1"] = "Salt Lake City, UT";
		data["name2"] = "Phoenix, AZ";

		//labor statstics
		data["unemploy_1"] = 3.4;
		data["unemploy_2"] = 6.4;
		data["avgsal_1"] = 48000;
		data["avgsal_2"] = 51000;
		data["econgrow_1"] = 4.4;
		data["econgrow_2"] = 3.3;






		document.getElementById("search_1_name").value = data["name1"];
		document.getElementById("search_2_name").value = data["name2"];





		//set up min and max and any other design variables for each tab here 

	};

	processing.draw = function() {
		processing.background(255);

		if (type == "city")
			draw_city();

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
		//draw axis
		processing.fill(0);
		processing.stroke(0);
		processing.strokeWeight(2);
		processing.line(50, 50, 50, 325);
		processing.line(50, 187, 605, 187);
		//add scale

		//add labels

		//draw data

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
		var range = max - min;
		var scale = (max - min) / 10;
		for (var i=0; i<=10; i++)
		{
			processing.line(62, 325-27*i, 605, 325-27*i);
			processing.textAlign(processing.RIGHT);
			processing.stroke(235);
			processing.text(processing.round(min+i*scale), 50, 325-27*i);
			
		}


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
		processing.text("AVERAGE MONTHLY TEMPERATURE (°F) RANGE", 195, 35);

		//processing.noStroke();
		//draw data

		processing.strokeWeight(3);
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
				processing.ellipse(27+45*i, (1-percent_1) * 275 + 49, 4, 4);
				processing.ellipse(27+45*i, (1-percent_2) * 275 + 49, 4, 4);
				processing.line(26+45*i, (1-percent_1) * 275 + 49, 26+45*i, (1-percent_2) * 275 + 49);
			}

			if (!hide_2)
			{
				processing.stroke(gray);
				processing.fill(gray);
				//processing.strokeWeight(10);
				var percent_1 = (data["weather_2_"+i] -  min) / range;
				var percent_2 = (data["weatherlow_2_"+i] -  min) / range;
				//processing.rect(27+45*i, (1-percent_1) * 275 + 49, 10, percent_1 * 275);
				processing.ellipse(42+45*i, (1-percent_1) * 275 + 49, 4, 4);
				processing.ellipse(42+45*i, (1-percent_2) * 275 + 49, 4, 4);
				processing.line(41+45*i, (1-percent_1) * 275 + 49, 41+45*i, (1-percent_2) * 275 + 49);
			}
		}
		
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

