var data, hide_1, hide_2, main, gray, font;

var sketch = new Processing.Sketch();

function school_api_request(query) {
	window.alert("school api request");
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
		console.log("loaded school.js successfully");
		main = processing.color(136, 68, 18);
		gray = processing.color(138, 136, 137);

		document.getElementById("search_1_name").value = "University of Utah";
		document.getElementById("search_2_name").value = "BYU";

		processing.size(655,375);
		hide_1 = false;
		hide_2 = false;
		//load font
		font = processing.loadFont("./fonts/Roboto-Regular.ttf");
		processing.textFont(font, 12);

		data = new Array();
		data["school_1"] = [8000, 24, 32000, 40];
 		data["school_2"] = [5000, 50, 29000, 62];

	};


	processing.draw = function() {
		processing.background(255);

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