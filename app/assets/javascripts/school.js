$(document).ready(function() {
	$.post("/api/v2/users/" + user_id + "/completed", {"section": "View College Comparison"});
	$.post("/api/v1/record_names", {operation: 'get', tables: ['schools']}, function(response) { 
		auto_schools = response;
		$( "#search_1_name" ).autocomplete({
	  		source: function(req, responseFn) {
	  			var re = $.ui.autocomplete.escapeRegex(req.term);
	  			var pattern1 = new RegExp("^"+re, "i");
	  			var a = $.grep(auto_schools, function(item, index){return pattern1.test(item);});
	  			var b = $.grep(auto_schools, function(item, index){return ((item.toLowerCase()).indexOf(re.toLowerCase())>0);});
	  			responseFn(a.concat(b));
	  		},
	  		close: function(e, u){
	  			temp1 = document.getElementById("search_1_name").value;
	  			if (temp1 == "")
	  				auto_1 = "";
	  			else if (response.indexOf(temp1) < 0 && auto_1)
					document.getElementById("search_1_name").value = auto_1;
				else if (auto_1)
					auto_1 = temp1;
	  		},
	  		response: function(e, u){
	  			if (u.content.length != 0)
	  				auto_1 = u.content[0].value;
	  			else
	  				auto_1 = "";
	  		},
  			delay: 0
		});
		$( "#search_2_name" ).autocomplete({
	  		source: function(req, responseFn) {
	  			var re = $.ui.autocomplete.escapeRegex(req.term);
	  			var pattern1 = new RegExp("^"+re, "i");
	  			var a = $.grep(auto_schools, function(item, index){return pattern1.test(item);});
	  			var b = $.grep(auto_schools, function(item, index){return ((item.toLowerCase()).indexOf(re.toLowerCase())>0);});
	  			responseFn(a.concat(b));
	  		},
	  		close: function(e, u){
	  			temp2 = document.getElementById("search_2_name").value;
	  			if (temp2 == "")
	  				auto_2 = "";
	  			else if (response.indexOf(temp2) < 0 && auto_2)
					document.getElementById("search_2_name").value = auto_2;
				else if (auto_2)
					auto_2 = temp2;
	  		},
	  		response: function(e, u){
	  			if (u.content.length != 0)
	  				auto_2 = u.content[0].value;
	  			else
	  				auto_2 = "";
	  		},
  			delay: 0
		});
	});	
	
});

var data, hide_1, hide_2, main, gray, font, old1, old2, sent1, sent2, auto_1, auto_2, canvas, processingInstance;

canvas = document.getElementById("main_viz");
if (canvas != null)
	processingInstance = new Processing(canvas, sketchProc);

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

function school_api_request(query) {
	field1 = document.getElementById("search_1_name").value;
	field2 = document.getElementById("search_2_name").value;

	url = "https://trycents.com:6001/data";
	type = "school";
	body = "";
	var query_string = "";

	if(field1 == "" && field2 == ""){
		sent1 = false;
		sent2 = false;
		return;
	}
	else if(field2 == ""){
		sent2 = false;
		sent1 = true;
		body = JSON.stringify({type:type,option:[field1]});
		processingInstance.noLoop();
		$("#main_viz").fadeTo(700, 0, function() {processingInstance.loop(); $("#main_viz").fadeTo(900, 1);});
		query_string = field1;
	}
	else if(field1 == ""){
		sent1 = false;
		sent2 = true;
		body = JSON.stringify({type:type,option:[field2]});
		processingInstance.noLoop();
		$("#main_viz").fadeTo(700, 0, function() {processingInstance.loop(); $("#main_viz").fadeTo(900, 1);});
		query_string = field2;
	}
	else{
		sent1 = true;
		sent2 = true;
		body = JSON.stringify({type:type,option:[field1,field2]});
		processingInstance.noLoop();
		$("#main_viz").fadeTo(700, 0, function() {processingInstance.loop(); $("#main_viz").fadeTo(900, 1);});
		query_string = field1 + " vs " + field2;
	}

	//var data = new Object();
	var xmlHttp = null;

    xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "POST", url, true );

    xmlHttp.onreadystatechange = function() {
    	if (xmlHttp.readyState === 4) { 
      		if (xmlHttp.status === 200) {
      			data = jQuery.parseJSON(xmlHttp.responseText);
      			//make api request here with type included
				localStorage.setItem("query_type", type);
				localStorage.setItem("data_store",JSON.stringify(data));
				//ok query, save to user
				$.post("/api/v2/users/" + user_id + "/query", {"url": query_string});

				$("#error_1").empty();
				$("#error_2").empty();
				//invalid searches could have been made, check to see what all was sent and returned
				//both sent
				if (sent1 && sent2)
				{
					//check to see if two results have been returned
					if (data["school_1_name"] && data["school_2_name"])
					{
						//two results are returned, check to make sure they line up with the right fields
						if (data["school_1_name"] != field1)
						{
							//need to swap
							var tempArray = $.extend(true, [], data["school_1"]);
							data["school_1"] = $.extend(true, [], data["school_2"]);
							data["school_2"] = $.extend(true, [], tempArray);
							var tempName = data["school_1_name"];
							data["school_1_name"] = data["school_2_name"];
							data["school_2_name"] = tempName;
						}
						hide_1 = false;
						hide_2 = false;
						document.getElementById("search_1_button").value = "HIDE";
			  	 		$("#search_1_button").removeAttr("disabled");
			  	 		document.getElementById("search_2_button").value = "HIDE";
			  	 		$("#search_2_button").removeAttr("disabled");

					}
					//first search was invalid, write error, disable field and swap arrays
					else if (data["school_1_name"] == field2 && !data["school_2_name"])
					{
						hide_1 = true;
						$("#error_1").append("Invalid school.");
	  					document.getElementById("search_1_button").value = "SHOW";
		  	 			$("#search_1_button").attr("disabled", "true");
		  	 			hide_2 = false;
		  	 			document.getElementById("search_2_button").value = "HIDE";
			  	 		$("#search_2_button").removeAttr("disabled");
		  	 			data["school_2"] = $.extend(true, [], data["school_1"]);
		  	 			data["school_1"] = null;
		  	 			data["school_2_name"] = data["school_1_name"];
		  	 			data["school_1_name"] = null;
					}
					//second search was invalid, just write error, disable field
					else if (data["school_1_name"] == field1 && !data["school_2_name"])
					{
						hide_2 = true;
						$("#error_2").append("Invalid school.");
	  					document.getElementById("search_2_button").value = "SHOW";
		  	 			$("#search_2_button").attr("disabled", "true");
		  	 			hide_1 = false;
		  	 			document.getElementById("search_1_button").value = "HIDE";
			  	 		$("#search_1_button").removeAttr("disabled");
					}
					//write both erros
					else
					{
						if (!data["school_1"])
						{
							hide_1 = true;
							$("#error_1").append("Invalid school.");
		  					document.getElementById("search_1_button").value = "SHOW";
			  	 			$("#search_1_button").attr("disabled", "true");
			  	 			hide_2 = true;
							$("#error_2").append("Invalid school.");
		  					document.getElementById("search_2_button").value = "SHOW";
			  	 			$("#search_2_button").attr("disabled", "true");
			  	 		}
			  	 		else
			  	 		{
			  	 			hide_2 = true;
							$("#error_2").append("Invalid school.");
		  					document.getElementById("search_2_button").value = "SHOW";
			  	 			$("#search_2_button").attr("disabled", "true");
			  	 			document.getElementById("search_2_name").value = "";
			  	 			document.getElementById("search_1_name").value = data["school_1_name"];

			  	 		}
					}

				}
				//just 1 sent
				else if (sent1 && !sent2)
				{
					if (!data["school_1_name"])
					{
						hide_1 = true;
						$("#error_1").append("Invalid school.");
	  					document.getElementById("search_1_button").value = "SHOW";
		  	 			$("#search_1_button").attr("disabled", "true");
					}
					else
					{
						hide_2 = true;
	  					document.getElementById("search_2_button").value = "SHOW";
		  	 			$("#search_2_button").attr("disabled", "true");
						hide_1 = false;
		  	 			document.getElementById("search_1_button").value = "HIDE";
			  	 		$("#search_1_button").removeAttr("disabled");
					}

				}
				//just 2 sent
				else if (!sent1 && sent2)
				{
					if (!data["school_1_name"])
					{
						hide_2 = true;
						$("#error_2").append("Invalid school.");
	  					document.getElementById("search_2_button").value = "SHOW";
		  	 			$("#search_2_button").attr("disabled", "true");
					}
					//swap to 2 spot
					else
					{
						hide_1 = true;
	  					document.getElementById("search_1_button").value = "SHOW";
		  	 			$("#search_1_button").attr("disabled", "true");
						hide_2 = false;
		  	 			document.getElementById("search_2_button").value = "HIDE";
			  	 		$("#search_2_button").removeAttr("disabled");
						data["school_2"] = $.extend(true, [], data["school_1"]);
		  	 			data["school_1"] = null;
		  	 			data["school_2_name"] = data["school_1_name"];
		  	 			data["school_1_name"] = null;
					}
				}
				else
					window.alert("serious logic error here...");
				nochanges = true;
				auto_1 = "";
				auto_2 = "";
      		}
      	}
    }
    xmlHttp.send(body);
};

function sketchProc(processing) {
	
	processing.setup = function() {
		console.log("loaded school.js successfully");
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
		hide_1 = false;
		hide_2 = false;
		auto_1 = "";
		auto_2 = "";
		//load font
		font = processing.loadFont("Roboto");
		processing.textFont(font, 12);
		
 		data = jQuery.parseJSON(unescape(localStorage.getItem("data_store")));

 		if(!data || (!data["school_1"] && !data["school_2"])) {
 			data = new Array();
	 		data["school_1"] = [8000, 25000, 24, 32000, 40, 4.1];
 			data["school_2"] = [5000, 5000, 50, 29000, 62, 3.8];
	 		document.getElementById("search_1_name").value = "University of Utah";
			document.getElementById("search_2_name").value = "Brigham Young University-Provo";
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
		old1 = document.getElementById("search_1_name").value;
		old2 = document.getElementById("search_2_name").value;
		nochanges = true;
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

