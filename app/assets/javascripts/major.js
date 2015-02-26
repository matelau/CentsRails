var data, hide_1, hide_2, main, gray, font, active_tab;

var sketch = new Processing.Sketch();

function major_api_request(query) {
	window.alert("major api request");
	// var url = "https://54.67.106.77:6001/query/" + query;
	// $.get(url, function(resp){
	// 	data = jQuery.parseJSON(resp);
	// 	if(data["operation"] == "undefined")
	// 	{
	// 		window.location = "/info/examples/"
	// 	}
	// 	else
	// 	{
	// 		window.location = "/wizard/city/?" + resp;
	// 	}
	// });
};

function sketchProc(processing) {
	
	processing.setup = function() {
		console.log("loaded major.js successfully");
		main = processing.color(136, 68, 18);
		gray = processing.color(138, 136, 137);

		processing.size(655,375);
		//always set the initial tab to the first one
		active_tab = 1;
		hide_1 = false;
		hide_2 = false;
		//load font
		font = processing.loadFont("./fonts/Roboto-Regular.ttf");
		processing.textFont(font, 12);

		data = new Array();

		data = jQuery.parseJSON(unescape(localStorage.getItem("data_store")));
  		//localStorage.removeItem("data_store");

  		if (data == null)
  		{
  			data = new Array();
			//salary, major recommendation, major satisfaction, cents major rating
			data["major_1"] = [95000, 89, 77, 4.8];
			data["major_2"] = [41000, 45, 72, 2.9];
			data["jobs_1"] = ["Software Developer", 97500, "Database Administrator", 91000, "System Analyst", 89000];
			data["jobs_2"] = ["Teacher", 43500, "Disc Jockey", 37000, "Performance Artist", 36500];

			data["name_1"] = "Computer Science";
			data["name_2"] = "Music";
		}
		
		document.getElementById("search_1_name").value = data["name_1"];
		document.getElementById("search_2_name").value = data["name_2"];

	};


	processing.draw = function() {
		processing.background(255);
		//tab helper 1-summary, 2-top jobs
		if (active_tab == 1)
			major_summary();
		else
			top_jobs();
	};

	function major_summary() {
		var title_offset = 0;
		if (hide_1 || hide_2)
			title_offset = 40;

		processing.textAlign(processing.RIGHT);
		processing.fill(0);
		processing.text("AVERAGE SALARY", 235+title_offset, 65);
		processing.text("MAJOR RECOMMENDATION", 235+title_offset, 145);
		processing.text("MAJOR SATISFACTION", 235+title_offset, 225);
		processing.text("CENTS MAJOR RATING", 235+title_offset, 305);
		processing.stroke(225);
		processing.strokeWeight(1);
		processing.line(65+title_offset, 103, 235+title_offset, 103);
		processing.line(65+title_offset, 183, 235+title_offset, 183);
		processing.line(65+title_offset, 263, 235+title_offset, 263);

		//var to hold summary viz offset when hiding one column
		var offset = 0;

		processing.textAlign(processing.CENTER);
		if (!hide_1)
		{
			if (hide_2)
				offset = 90;
			processing.textFont(font, 30);
			processing.fill(main);
			processing.text("$" + (data["major_1"][0]).toLocaleString(), 360+offset, 70);
			processing.text(data["major_1"][1], 360+offset, 140);
			processing.text(data["major_1"][2], 360+offset, 220);
			processing.text((data["major_1"][3]).toFixed(1), 360+offset, 300);

			processing.textFont(font, 12);
			processing.text("OUT OF 100", 360+offset, 155);
			processing.text("OUT OF 100", 360+offset, 235);
			processing.text("OUT OF 5.0", 360+offset, 315);
		}
		if (!hide_2)
		{
			if (hide_1)
				offset = -90;
			processing.textFont(font, 30);
			processing.fill(gray);
			processing.text("$" + (data["major_2"][0]).toLocaleString(), 540+offset, 70);
			processing.text(data["major_2"][1], 540+offset, 140);
			processing.text(data["major_2"][2], 540+offset, 220);
			processing.text((data["major_2"][3]).toFixed(1), 540+offset, 300);

			processing.textFont(font, 12);
			processing.text("OUT OF 100", 540+offset, 155);
			processing.text("OUT OF 100", 540+offset, 235);
			processing.text("OUT OF 5.0", 540+offset, 315);
		}

		processing.textFont(font, 12);

	};

	function top_jobs() {
		var bar_left = 295;
		var bar_width = 275; 
		var min, max
		processing.textAlign(processing.CENTER);
		processing.text("TOP JOBS BY AVERAGE SALARY", 327, 30);
		processing.stroke(0);
		processing.strokeWeight(1);
		processing.line(225, 40, 430, 40);

		if (hide_2 && !hide_1)
		{
			min = processing.min(data["jobs_1"][1], data["jobs_1"][3], data["jobs_1"][5]);
			max = processing.max(data["jobs_1"][1], data["jobs_1"][3], data["jobs_1"][5]);

		}
		else if (!hide_2 && hide_1)
		{
			min = processing.min(data["jobs_2"][1], data["jobs_2"][3], data["jobs_2"][5]);
			max = processing.max(data["jobs_2"][1], data["jobs_2"][3], data["jobs_2"][5]);
		}
		else
		{
			if (data["name_2"])
			{
				min = processing.min(data["jobs_1"][1], data["jobs_1"][3], data["jobs_1"][5], data["jobs_2"][1], data["jobs_2"][3], data["jobs_2"][5]);
				max = processing.max(data["jobs_1"][1], data["jobs_1"][3], data["jobs_1"][5], data["jobs_2"][1], data["jobs_2"][3], data["jobs_2"][5]);
			}
			else
			{
				min = processing.min(data["jobs_1"][1], data["jobs_1"][3], data["jobs_1"][5]);
				max = processing.max(data["jobs_1"][1], data["jobs_1"][3], data["jobs_1"][5]);
			}
		}
		max = max * 1.1;
		min = min * 0.7;

		var move_down = 20;

		
		if (!hide_1)
		{
			processing.textAlign(processing.RIGHT);
			processing.noStroke();
			processing.fill(0);
			processing.text((data["jobs_1"][0]).toUpperCase(), 275, 65+move_down);
			processing.text((data["jobs_1"][2]).toUpperCase(), 275, 103+move_down);
			processing.text((data["jobs_1"][4]).toUpperCase(), 275, 145+move_down);
			processing.fill(main);
			var bar1 = (data["jobs_1"][1]-min)/(max-min);
			var bar2 = (data["jobs_1"][3]-min)/(max-min);
			var bar3 = (data["jobs_1"][5]-min)/(max-min);
			processing.rect(bar_left, 50+move_down, bar_width*bar1, 20);
			processing.rect(bar_left, 88+move_down, bar_width*bar2, 20);
			processing.rect(bar_left, 130+move_down, bar_width*bar3, 20);
			processing.fill(0);
			processing.textAlign(processing.LEFT);
			processing.text("$" + (data["jobs_1"][1]/1000).toFixed(0) + "K", bar_left+bar_width*bar1+15, 65+move_down);
			processing.text("$" + (data["jobs_1"][3]/1000).toFixed(0) + "K", bar_left+bar_width*bar2+15, 103+move_down);
			processing.text("$" + (data["jobs_1"][5]/1000).toFixed(0) + "K", bar_left+bar_width*bar3+15, 145+move_down);

		}
		processing.stroke(0);
		processing.strokeWeight(2);
		processing.line(105, 183+move_down, 275, 183+move_down);
		if (!hide_2)
		{
			processing.textAlign(processing.RIGHT);
			processing.noStroke();
			processing.fill(0);
			processing.text((data["jobs_2"][0]).toUpperCase(), 275, 225+move_down);
			processing.text((data["jobs_2"][2]).toUpperCase(), 275, 263+move_down);
			processing.text((data["jobs_2"][4]).toUpperCase(), 275, 305+move_down);
			processing.fill(gray);
			var bar1 = (data["jobs_2"][1]-min)/(max-min);
			var bar2 = (data["jobs_2"][3]-min)/(max-min);
			var bar3 = (data["jobs_2"][5]-min)/(max-min);
			processing.rect(bar_left, 210+move_down, bar_width*bar1, 20);
			processing.rect(bar_left, 248+move_down, bar_width*bar2, 20);
			processing.rect(bar_left, 290+move_down, bar_width*bar3, 20);
			processing.fill(0);
			processing.textAlign(processing.LEFT);
			processing.text("$" + (data["jobs_2"][1]/1000).toFixed(0) + "K", bar_left+bar_width*bar1+15, 225+move_down);
			processing.text("$" + (data["jobs_2"][3]/1000).toFixed(0) + "K", bar_left+bar_width*bar2+15, 263+move_down);
			processing.text("$" + (data["jobs_2"][5]/1000).toFixed(0) + "K", bar_left+bar_width*bar3+15, 305+move_down);

		}
		//processing.rect(bar_left, 50, bar_width*0.75, 20);

	};

};

function update_tab(name) {
	active_tab = name;
	hide_1 = false;
	hide_2 = false;
	document.getElementById("search_1_button").value = "HIDE";
	document.getElementById("search_2_button").value = "HIDE";
};

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

var canvas = document.getElementById("main_viz");
if (canvas != null)
	var processingInstance = new Processing(canvas, sketchProc);
