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

		processing.size(655,375);
		hide_1 = false;
		hide_2 = false;
		//load font
		font = processing.loadFont("./fonts/Roboto-Regular.ttf");
		processing.textFont(font, 12);
		
 		data = jQuery.parseJSON(unescape(localStorage.getItem("data_store")));

 		if(data == null) {
 			data = new Array();
	 		data["school_1"] = [8000, 25000, 24, 32000, 40, 4.1];
 			data["school_2"] = [5000, 5000, 50, 29000, 62, 3.8];
	 		document.getElementById("search_1_name").value = "University of Utah";
			document.getElementById("search_2_name").value = "Brigham Young University";
		}
		else {
			if (!data["school_2"])
	  		{
	  			hide_2 = true;
	  			document.getElementById("search_2_button").value = "SHOW";
	  			$("#search_2_button").attr("disabled", "true");
	  		}
			else {		
				document.getElementById("search_2_name").value = data["school_2_name"];
			}
			document.getElementById("search_1_name").value = data["school_1_name"];
		}
	};


	processing.draw = function() {
		processing.background(255);

		var title_offset = 0;
		if (hide_1 || hide_2)
			title_offset = 40;

		processing.textAlign(processing.RIGHT);
		processing.fill(0);
		processing.text("NATIONAL RANKING", 235+title_offset, 60);
		processing.text("IN STATE TUITION", 235+title_offset, 113);
		processing.text("OUT OF STATE TUITION", 235+title_offset, 164);
		processing.text("GRADUATION RATE", 235+title_offset, 217);
		processing.text("UNDERGRAD ENROLLMENT", 235+title_offset, 270);
		processing.text("CENTS USER RATING", 235+title_offset, 325);
		processing.stroke(225);
		processing.strokeWeight(1);
		processing.line(65+title_offset, 81, 235+title_offset, 81);
		processing.line(65+title_offset, 134, 235+title_offset, 134);
		processing.line(65+title_offset, 185, 235+title_offset, 185);
		processing.line(65+title_offset, 238, 235+title_offset, 238);
		processing.line(65+title_offset, 291, 235+title_offset, 291);
		processing.textAlign(processing.CENTER);

		var offset = 0;

		if (!hide_1)
		{
			if (hide_2)
				offset = 90;
			processing.textFont(font, 28);
			processing.textAlign(processing.CENTER);
			processing.fill(main);
			if (data["school_1"][4] == null)
			{
				processing.text("200", 360+offset, 73);
				processing.textFont(font, 12);
				processing.text("OVER", 360+offset, 50);
				processing.textFont(font, 28);
			}
			else
			{
				processing.text(data["school_1"][4], 360+offset, 60);
				processing.textFont(font, 12);
				processing.text("OUT OF 200", 360+offset, 78);
				processing.textFont(font, 28);
			}
			if (data["school_1"][0] == null)
				processing.text("N/A", 360+offset, 118);
			else
				processing.text("$" + (data["school_1"][0]).toLocaleString(), 360+offset, 118);
			if (data["school_1"][1] == null)
				processing.text("N/A", 360+offset, 169);
			else
				processing.text("$" + (data["school_1"][1]).toLocaleString(), 360+offset, 169);
			if (data["school_1"][2] == null)
				processing.text("N/A", 360+offset, 222);
			else
				processing.text(String(data["school_1"][2]) + "%", 360+offset, 222);
			if (data["school_1"][3] == null)
				processing.text("N/A", 360+offset, 265);
			else
				processing.text(data["school_1"][3].toLocaleString(), 360+offset, 265);
			if (data["school_1"][5] == null)
				processing.text("N/A", 360+offset, 320);
			else
				processing.text((data["school_1"][5]).toFixed(1), 360+offset, 320);

			processing.textFont(font, 12);
			processing.text("STUDENTS", 360+offset, 283);
			processing.text("OUT OF 5.0", 360+offset, 338);

		}

		if (!hide_2)
		{
			if (hide_1)
				offset = -90;
			processing.textFont(font, 28);
			processing.textAlign(processing.CENTER);
			processing.fill(gray);
			if (data["school_2"][4] == null)
			{
				processing.text("200", 540+offset, 73);
				processing.textFont(font, 12);
				processing.text("OVER", 540+offset, 50);
				processing.textFont(font, 28);
			}
			else
			{
				processing.text(data["school_2"][4], 540+offset, 60);
				processing.textFont(font, 12);
				processing.text("OUT OF 200", 540+offset, 78);
				processing.textFont(font, 28);
			}

			if (data["school_2"][0] == null)
				processing.text("N/A", 540+offset, 118);
			else
				processing.text("$" + (data["school_2"][0]).toLocaleString(), 540+offset, 118);
			if (data["school_2"][1] == null)
				processing.text("N/A", 540+offset, 169);
			else
				processing.text("$" + (data["school_2"][1]).toLocaleString(), 540+offset, 169);
			if (data["school_2"][2] == null)
				processing.text("N/A", 540+offset, 222);
			else
				processing.text(String(data["school_2"][2]) + "%", 540+offset, 222);
			if (data["school_2"][3] == null)
				processing.text("N/A", 540+offset, 265);
			else
				processing.text(data["school_2"][3].toLocaleString(), 540+offset, 265);
			if (data["school_2"][5] == null)
				processing.text("N/A", 540+offset, 320);
			else
				processing.text((data["school_2"][5]).toFixed(1), 540+offset, 320);


			processing.textFont(font, 12);
			processing.text("STUDENTS", 540+offset, 283);
			processing.text("OUT OF 5.0", 540+offset, 338);
		}


		//reset font
		processing.textFont(font, 12);

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