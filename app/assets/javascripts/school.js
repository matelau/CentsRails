$(document).ready(function() {
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
	if (user_id)
		$.post("/api/v2/users/" + user_id + "/completed?api_key=" + api_key, {"section": "View College Comparison"});
});

var data, hide_1, hide_2, main, gray, font, old1, old2, sent1, sent2, auto_1, auto_2, canvas, processingInstance, color, ratings;

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

	sessionStorage.removeItem("data_store");

	//var data = new Object();
	var xmlHttp = null;

    xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "POST", url, true );

    xmlHttp.onreadystatechange = function() {
    	if (xmlHttp.readyState === 4) { 
      		if (xmlHttp.status === 200) {

      			$("#error_1").empty();
				$("#error_2").empty();

      			if (xmlHttp.responseText == "No schools were in the schools array")
      			{
      				if (field1 != "")
      				{
	      				hide_1 = true;
						$("#error_1").append("Invalid school.");
	  					document.getElementById("search_1_button").value = "SHOW";
		  	 			$("#search_1_button").attr("disabled", "true");
		  	 			$("#rating_1_button").attr("disabled", "true");
		  	 		}
		  	 		if (field2 != "")
		  	 		{
		  	 			hide_2 = true;
						$("#error_2").append("Invalid school.");
	  					document.getElementById("search_2_button").value = "SHOW";
		  	 			$("#search_2_button").attr("disabled", "true");
		  	 			$("#rating_2_button").attr("disabled", "true");
		  	 		}
	  	 			return;
      			}

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
				sessionStorage.setItem("query_type", type);
				sessionStorage.setItem("data_store",JSON.stringify(data));
				//ok query, save to user
				if (user_id)
					$.post("/api/v2/users/" + user_id + "/query?api_key=" + api_key, {"url": query_string});

				

				//clear out the ability to rate
				if (user_id)
				{
					$("#rating_1").empty();
					var button = "<a id='rating_1_button' class='btn btn-default' onclick='rate(1)'>RATE THIS SCHOOL</a>";
					$("#rating_1").html(button);
					$("#rating_2").empty();
					button = "<a id='rating_2_button' class='btn btn-default' onclick='rate(2)'>RATE THIS SCHOOL</a>";
					$("#rating_2").html(button);
					$('.btn-default').css({"color":color});
				}
				auto_1 = "";
				auto_2 = "";

				if (sent1 && sent2)
				{
					//check to see if two results have been returned
					if (data["school_1"] && data["school_2"])
					{
						//two results are returned, check to make sure they line up with the right fields
						if (data["school_1"] != field1)
						{
							//need to swap
							var tempArray = $.extend(true, [], data["school_1"]);
							data["school_1"] = $.extend(true, [], data["school_2"]);
							data["school_2"] = $.extend(true, [], tempArray);
							var tempName = data["name_1"];
							data["name_1"] = data["name_2"];
							data["name_2"] = tempName;
						}
						hide_1 = false;
						hide_2 = false;
						document.getElementById("search_1_button").value = "HIDE";
			  	 		$("#search_1_button").removeAttr("disabled");
			  	 		document.getElementById("search_2_button").value = "HIDE";
			  	 		$("#search_2_button").removeAttr("disabled");
			  	 		$("#rating_1_button").removeAttr("disabled");
			  	 		$("#rating_2_button").removeAttr("disabled");

					}
					else if (!data["school_2"])
					{
						//school 1 was the valid city
						if (data["name_1"] == field1)
						{
							hide_2 = true;
							$("#error_2").append("Invalid school.");
		  					document.getElementById("search_2_button").value = "SHOW";
			  	 			$("#search_2_button").attr("disabled", "true");
			  	 			$("#rating_2_button").attr("disabled", "true");
			  	 			hide_1 = false;
			  	 			document.getElementById("search_1_button").value = "HIDE";
				  	 		$("#search_1_button").removeAttr("disabled");
				  	 		$("#rating_1_button").removeAttr("disabled");
						}
						//school 2 is the valid city
						else if (data["name_1"] == field2)
						{
							//swap arrays
							hide_1 = true;
							$("#error_1").append("Invalid school.");
		  					document.getElementById("search_1_button").value = "SHOW";
			  	 			$("#search_1_button").attr("disabled", "true");
			  	 			$("#rating_1_button").attr("disabled", "true");
			  	 			hide_2 = false;
			  	 			document.getElementById("search_2_button").value = "HIDE";
				  	 		$("#search_2_button").removeAttr("disabled");
				  	 		$("#rating_2_button").removeAttr("disabled");
			  	 			data["school_2"] = $.extend(true, [], data["school_1"]);
			  	 			data["school_1"] = null;
			  	 			data["name_2"] = data["name_1"];
			  	 			data["name_1"] = null;
						}
					}
				}
				//just 1 sent
				else if (sent1 && !sent2)
				{
					hide_2 = true;
  					document.getElementById("search_2_button").value = "SHOW";
	  	 			$("#search_2_button").attr("disabled", "true");
	  	 			$("#rating_2_button").attr("disabled", "true");
					hide_1 = false;
	  	 			document.getElementById("search_1_button").value = "HIDE";
		  	 		$("#search_1_button").removeAttr("disabled");
		  	 		$("#rating_1_button").removeAttr("disabled");
				}
				//just 2 sent
				else if (!sent1 && sent2)
				{
					hide_1 = true;
  					document.getElementById("search_1_button").value = "SHOW";
	  	 			$("#search_1_button").attr("disabled", "true");
	  	 			$("#rating_1_button").attr("disabled", "true");
					hide_2 = false;
	  	 			document.getElementById("search_2_button").value = "HIDE";
		  	 		$("#search_2_button").removeAttr("disabled");
		  	 		$("#rating_2_button").removeAttr("disabled");
					data["school_2"] = $.extend(true, [], data["school_1"]);
	  	 			data["school_1"] = null;
	  	 			data["name_2"] = data["name_1"];
	  	 			data["name_1"] = null;

				}
				else
					window.alert("serious logic error here...");
				nochanges = true;

      		}
      	}
    }
    xmlHttp.send(body);
};

function sketchProc(processing) {
	
	processing.setup = function() {
		ratings = [0, 0];
		console.log("loaded school.js successfully");
		if (sessionStorage.getItem("colors"))
		{
			var c = jQuery.parseJSON(unescape(sessionStorage.getItem("colors")));
			color = c["p_hex"];
			main = processing.color(c["p_rgb"][0], c["p_rgb"][1], c["p_rgb"][2]);
			gray = processing.color(c["s_rgb"][0], c["s_rgb"][1], c["s_rgb"][2]);
		}
		else
		{
			color = "#884412";
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
		
 		data = jQuery.parseJSON(unescape(sessionStorage.getItem("data_store")));

 		if (!data || (!data["school_1"] && !data["school_2"])) 
 		{
 			data = new Array();
	 		data["school_1"] = [7935,25267,60,32077,129,3.5714];
 			data["school_2"] = [5000,5000,77,31123,62,1.3333];
	 		document.getElementById("search_1_name").value = "University of Utah";
			document.getElementById("search_2_name").value = "Brigham Young University-Provo";
		}
		else
		{
			if (!data["school_2"])
			{
				hide_2 = true;
				document.getElementById("search_2_button").value = "SHOW";
				$("#search_2_button").attr("disabled", "true");
				$("#rating_2_button").attr("disabled", "true");
			}
			else 
			{		
				document.getElementById("search_2_name").value = data["name_2"];
			}
			//document.getElementById("search_1_name").value = data["name_1"];
			if (!data["school_1"])
			{
				hide_2 = true;
				document.getElementById("search_1_button").value = "SHOW";
				$("#search_1_button").attr("disabled", "true");
				$("#rating_1_button").attr("disabled", "true");
			}
			else 
			{		
				document.getElementById("search_1_name").value = data["name_1"];
			}
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

function rate(id) {
	$("#rating_" + id).fadeTo(500, 0, function() {
		//$("#rating_" + id).fadeTo(700, 0, function() {$("#rating_" + id).fadeTo(900, 1);});
		//remove button
		$("#rating_" + id).empty();
		//get users ratings, check to see if already rated
		$.get("/api/v2/users/" + user_id + "/ratings?api_key=" + api_key, function(response){ 
			school_rate = response.school_ratings;
			var name = document.getElementById("search_" + id + "_name").value;

			//check to see if its in there
			for (i in school_rate)
			{
				if (school_rate[i].name == name)
				{
					ratings[id-1] = school_rate[i].rating;
					break;
				}
			}
			setRatings(id);
		});

		var cents = "";
		for (var i=1; i<6; i++)
		{
			cents += "<svg style='width: 35px; height:35px;'";
			cents += "onmouseleave='setRatings(" + id + ")' ";
			cents += "onclick='updateRating(" + id + "," + i + ")' ";
			cents += "onmouseover='colorChange(" + id + "," + i + ")'>";
			cents += buildCent(id, i);
			cents += "</svg>";
		}
		//add in x for cancel
		cents += "<a class='btn btn-default' style='margin-left:5px; margin-bottom:30px;' onclick='deleteRate(" + id + ")'>X</a>";
		$("#rating_" + id).html(cents);
		$('.btn-default').css({"color":color});
		$("#rating_" + id).fadeTo(700, 1);
	});
};

function deleteRate(id) {
	$("#rating_" + id).fadeTo(500, 0, function() {
		$("#rating_" + id).empty();
		var button = "<a id='rating_" + id + "_button' class='btn btn-default' onclick='rate(" + id + ")'>RATE THIS SCHOOL</a>";
		$("#rating_" + id).html(button);
		$('.btn-default').css({"color":color});
		$("#rating_" + id).fadeTo(700, 1);
	});
};

function updateRating(id, num) {
	ratings[id-1] = num;
	//get name and level from search field
	var name = document.getElementById("search_" + id + "_name").value.replace(/ /g, "%20");
	$.ajax({
		url: "/api/v2/schools/" + name + "/" + num + "?api_key=" + api_key,
		type: 'PUT',
		data: {"user": user_id}
	});
};

function setRatings(id) {
	var num = ratings[id-1];
	for (var i=1; i<num+1; i++)
		$("#rating_" + id + "_" + i).css("fill", color);
	for (var i=5; i>num; i--)
		$("#rating_" + id + "_" + i).css("fill", "#CCCCCC");
};

function colorChange(id, num) {
	for (var i=1; i<num+1; i++)
		$("#rating_" + id + "_" + i).css("fill", color);
	for (var i=5; i>num; i--)
		$("#rating_" + id + "_" + i).css("fill", "#CCCCCC");
};

function buildCent(id, num) {

	var cent = "<ellipse id='rating_" + id + "_" + num + "' style='fill:#CCCCCC' id='circle10' cy='17.730486' cx='17.730486' rx='17.730486' ry='17.730486'/>";
	cent += "<path style='fill:#ffffff;fill-rule:nonzero' d='m 25.106384,20.425538 c -0.567376,1.84398 -1.560282,3.262412 -2.695034,4.255318 -1.134752,0.992912 -2.695037,1.418462 -4.680852,1.418462 -1.560284,0 -2.83688,-0.2838 -3.829788,-0.85107 -1.134752,-0.567392 -1.985815,-1.560298 -2.553192,-2.97873 -0.709219,-1.27659 -0.992907,-2.978729 -0.992907,-4.822678 0,-1.134781 0.141846,-2.269531 0.425532,-3.262411 0.283688,-0.992909 0.567375,-1.702139 0.992908,-2.411369 0.425532,-0.56739 0.851063,-1.13472 1.418439,-1.56027 0.567376,-0.4255197 1.134752,-0.7092295 1.843972,-0.9929095 0.70922,-0.2837998 1.702128,-0.42555 2.83688,-0.42555 3.5461,0 5.957448,1.7021395 7.092198,4.9645485 l -1.985814,0.2838 c -0.70922,-2.411369 -2.411348,-3.687959 -5.106384,-3.687959 -0.851064,0 -1.560284,0.141898 -2.269504,0.42555 -0.70922,0.2838 -1.276596,0.7092 -1.702128,1.41843 -0.425532,0.56736 -0.851064,1.27659 -0.992908,2.127659 -0.283689,0.85104 -0.425532,1.70211 -0.425532,2.695021 0,2.127657 0.425532,3.971638 1.41844,5.248228 0.992908,1.27659 2.269504,1.985822 3.971632,1.985822 2.553192,0 4.25532,-1.418462 5.390072,-4.397161 l 1.84397,0.283799 z'/>";
	cent += "<rect style='fill:#ffffff' height='2.7567501' width='1.8319293' y='5.2482319' x='16.312059' />";
	cent += "<path style='fill:#ffffff' d='m 18.156029,35.460995 c -0.141842,0 -0.283689,0 -0.425531,0 -0.425532,0 -0.992908,0 -1.41844,0 l 0,-8.368797 1.843971,0 0,8.368797 z'/>";
	return cent;
}

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

