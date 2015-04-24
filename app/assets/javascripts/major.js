$(document).ready(function() {

	$.post("/api/v1/record_names", {operation: 'get', tables: ['majors']}, function(response) { 
		auto_majors = response;
		$( "#search_1_name" ).autocomplete({
	  		source: function(req, responseFn) {
	  			var re = $.ui.autocomplete.escapeRegex(req.term);
	  			var pattern1 = new RegExp("^"+re, "i");
	  			var a = $.grep(auto_majors, function(item, index){return pattern1.test(item);});
	  			var b = $.grep(auto_majors, function(item, index){return ((item.toLowerCase()).indexOf(re.toLowerCase())>0);});
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
	  			else if (auto_majors.indexOf(temp1) < 0 && auto_1)
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
	  			var a = $.grep(auto_majors, function(item, index){return pattern1.test(item);});
	  			var b = $.grep(auto_majors, function(item, index){return ((item.toLowerCase()).indexOf(re.toLowerCase())>0);});
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
	  			else if (auto_majors.indexOf(temp2) < 0 && auto_2)
					document.getElementById("search_2_name").value = auto_2;
				else if (auto_2)
					auto_2 = temp2;
	  		},
	  		delay: 0
		});
	});
	if (user_id)
		$.post("/api/v2/users/" + user_id + "/completed?api_key=" + api_key, {"section": "View Major Comparison"});	
});

var data, hide_1, hide_2, main, gray, font, active_tab, auto_1, auto_2, sent1, sent2, nochanges, old1, old2, canvas, processingInstance, color, ratings, to_split;

canvas = document.getElementById("main_viz");
if (canvas != null)
	processingInstance = new Processing(canvas, sketchProc);

sent1 = true;
sent2 = true;

var sketch = new Processing.Sketch();

function name_split(name) {
	return name.split(" ");
};

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

function major_api_request(query) {
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
			$("#error_1").append("Invalid major.");
		if (auto_1 != "" && auto_1)
			field1 = auto_1;		
		else if (auto_1 == undefined)
		{
			if (auto_majors.indexOf(document.getElementById("search_1_name").value) < 0)
				$("#error_1").append("Invalid major.");
			else
				field1 = document.getElementById("search_1_name").value;	
		}	
	}
	$("#error_2").empty();
	$('#search_2_name').autocomplete('close');
	if (document.getElementById("search_2_name").value != "")
	{
		if (auto_2 == "")
			$("#error_2").append("Invalid major.");
		if (auto_2 != "" && auto_2)
			field2 = auto_2;		
		else if (auto_2 == undefined)
		{
			if (auto_majors.indexOf(document.getElementById("search_2_name").value) < 0)
				$("#error_2").append("Invalid major.");
			else
				field2 = document.getElementById("search_2_name").value;	
		}	
	}

	url = "https://trycents.com:6001/data";
	type = "major";
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

	var xmlHttp = null;

	sessionStorage.removeItem("data_store");

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
				sessionStorage.setItem("query_type", type);
				sessionStorage.setItem("data_store",JSON.stringify(data));
				//ok query, save to user
				if (user_id)
					$.post("/api/v2/users/" + user_id + "/query?api_key=" + api_key, {"url": query_string});

				auto_1 = undefined;
				auto_2 = undefined;

				//clear out the ability to rate
				if (user_id)
				{
					$("#rating_1").empty();
					var button = "<a id='rating_1_button' class='btn btn-default' onclick='rate(1)'>RATE THIS MAJOR</a>";
					$("#rating_1").html(button);
					$("#rating_2").empty();
					button = "<a id='rating_2_button' class='btn btn-default' onclick='rate(2)'>RATE THIS MAJOR</a>";
					$("#rating_2").html(button);
					$('.btn-default').css({"color":color});
				}

	  			if (sent1 && sent2)
	  			{
	  				hide_1 = false; 
	  				hide_2 = false;
		  	 		document.getElementById("search_1_button").value = "HIDE";
		  	 		$("#search_1_button").removeAttr("disabled");
		  	 		$("#rating_1_button").removeAttr("disabled");
		  	 		document.getElementById("search_2_button").value = "HIDE";
		  	 		$("#search_2_button").removeAttr("disabled");
		  	 		$("#rating_2_button").removeAttr("disabled");
	  			}
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
		  	 		//need to flip data to _2 arrays
					data["degree_2"] = $.extend(true, [], data["degree_1"]);
					data["degree_1"] = null;
					data["jobs_2"] = $.extend(true, [], data["jobs_1"]);
					data["jobs_1"] = null;
					data["name_2"] = data["name_1"];
					data["name_1"] = null;

	  			}
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
	  			nochanges = true;
	  			
	  			if (data["jobs_1"] && data["jobs_1"].length == 0 && !data["jobs_2"])
				{
					//no top jobs for either major, disable that tab
					active_tab = 1;
					$("#job_tab").hide();
				}
				else if (data["jobs_2"] && data["jobs_2"].length == 0 && !data["jobs_1"])
				{
					//no top jobs for either major, disable that tab
					active_tab = 1;
					$("#job_tab").hide();
				}
				else if (data["jobs_1"].length == 0 && data["jobs_2"].length == 0)
				{
					//no top jobs for either major, disable that tab
					active_tab = 1;
					$("#job_tab").hide();
				}
				else
					$("#job_tab").show();
      		}
      	}
    }
    xmlHttp.send(body);
};

function sketchProc(processing) {
	
	processing.setup = function() {
		ratings = [0, 0];
		console.log("loaded major.js successfully");
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
		//always set the initial tab to the first one
		active_tab = 1;
		hide_1 = false;
		hide_2 = false;
		//load font
		font = processing.loadFont("Roboto");
		processing.textFont(font, 12);

		data = new Array();

		data = jQuery.parseJSON(unescape(sessionStorage.getItem("data_store")));
  		//sessionStorage.removeItem("data_store");


  		if (!data || (!data["degree_1"] && !data["degree_2"]))
  		{
  			data = new Array();
			//salary, major recommendation, major satisfaction, cents major rating
			data["degree_1"] = [81804,88,43,4.3333];
			data["degree_2"] = [37224,41,53,0];
			data["jobs_1"] = ["Information Technology (IT) Director",101394,"Senior Software Engineer",100989,"Lead Applications Developer",98389];
			data["jobs_2"] = ["Worship Pastor",41622,"Administrative Assistant",35872];

			data["name_1"] = "Computer Science (Bachelor Degree)";
			data["name_2"] = "Music (Bachelor Degree)";
		}


		if (!data["degree_2"])
  		{
  			if (data["jobs_1"].length == 0)
			{
				//no top jobs for either major, disable that tab
				$("#job_tab").hide();
			}
  			hide_2 = true;
  			document.getElementById("search_2_button").value = "SHOW";
  			$("#search_2_button").attr("disabled", "true");
  			$("#rating_2_button").attr("disabled", "true");
  		}
  		else
  		{
  			document.getElementById("search_2_name").value = data["name_2"];
  		}
  		if (!data["degree_1"])
  		{
  			if (data["jobs_2"].length == 0)
			{
				//no top jobs for either major, disable that tab
				$("#job_tab").hide();
			}
  			hide_1 = true;
  			document.getElementById("search_1_button").value = "SHOW";
  			$("#search_1_button").attr("disabled", "true");
  			$("#rating_1_button").attr("disabled", "true");
  		}
  		else
  		{
  			document.getElementById("search_1_name").value = data["name_1"];
  		}
  		if (data["degree_1"] && data["degree_2"])
  		{
  			if (data["jobs_1"].length == 0 && data["jobs_2"].length == 0)
			{
				//no top jobs for either major, disable that tab
				$("#job_tab").hide();
			}
  		}

  		old1 = document.getElementById("search_1_name").value;
		old2 = document.getElementById("search_2_name").value;
		nochanges = true;

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
		processing.text("CENTS USER RATING", 235+title_offset, 305);
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
			if (data["degree_1"][0])
				processing.text("$" + (data["degree_1"][0]).toLocaleString(), 360+offset, 70);
			else
				processing.text("N/A", 360+offset, 70);
			if (data["degree_1"][1])
				processing.text(data["degree_1"][1], 360+offset, 140);
			else
				processing.text("N/A", 360+offset, 140);
			if (data["degree_1"][2])
				processing.text(data["degree_1"][2], 360+offset, 220);
			else
				processing.text("N/A", 360+offset, 220);
			processing.text((data["degree_1"][3]).toFixed(1), 360+offset, 300);


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
			if (data["degree_2"][0])
				processing.text("$" + (data["degree_2"][0]).toLocaleString(), 540+offset, 70);
			else
				processing.text("N/A", 540+offset, 70);
			if (data["degree_2"][1])
				processing.text(data["degree_2"][1], 540+offset, 140);
			else
				processing.text("N/A", 540+offset, 140);
			if (data["degree_2"][2])
				processing.text(data["degree_2"][2], 540+offset, 220);
			else
				processing.text("N/A", 540+offset, 220);
			processing.text((data["degree_2"][3]).toFixed(1), 540+offset, 300);

			processing.textFont(font, 12);
			processing.text("OUT OF 100", 540+offset, 155);
			processing.text("OUT OF 100", 540+offset, 235);
			processing.text("OUT OF 5.0", 540+offset, 315);
		}

		processing.textFont(font, 12);

	};

	function top_jobs() {

		//set these values dynamically
		var text_start = 275;
		
		var bar_left = 295;
		var bar_width = 330; 
		
		var min, max;
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
			//if top jobs on data 1 but not 2
			if (data["jobs_1"].length != 0 && data["jobs_2"].length == 0)
			{
				min = processing.min(data["jobs_1"][1], data["jobs_1"][3], data["jobs_1"][5]);
				max = processing.max(data["jobs_1"][1], data["jobs_1"][3], data["jobs_1"][5]);
			}
			//if top jobs on data 2 but not 1
			else if (data["jobs_1"].length == 0 && data["jobs_2"].length != 0)
			{
				min = processing.min(data["jobs_2"][1], data["jobs_2"][3], data["jobs_2"][5]);
				max = processing.max(data["jobs_2"][1], data["jobs_2"][3], data["jobs_2"][5]);
			}
			//if top jobs on both
			else if (data["jobs_1"].length != 0 && data["jobs_2"].length != 0)
			{
				min = processing.min(data["jobs_1"][1], data["jobs_1"][3], data["jobs_1"][5], data["jobs_2"][1], data["jobs_2"][3], data["jobs_2"][5]);
				max = processing.max(data["jobs_1"][1], data["jobs_1"][3], data["jobs_1"][5], data["jobs_2"][1], data["jobs_2"][3], data["jobs_2"][5]);
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
			if (data["jobs_1"][0])
			{
				if (data["jobs_1"][0].length < 40)
					processing.text((data["jobs_1"][0]).toUpperCase(), text_start, 65+move_down);
				else
				{
					//switch to a slightly smaller font
					processing.textFont(font, 11);
					var split = String(data["jobs_1"][0]).split(" ");
					var half = Math.ceil(split.length / 2);
					var string1 = split.slice(0, half).join(" ");
					var string2 = split.slice(half).join(" ");
					processing.text(string1.toUpperCase(), text_start, 65+move_down-6);
					processing.text(string2.toUpperCase(), text_start, 65+move_down+7);
					processing.textFont(font, 12);
				}
				processing.fill(main);
				var bar1 = (data["jobs_1"][1]-min)/(max-min);
				processing.rect(bar_left, 50+move_down, bar_width*bar1, 20);
				processing.fill(0);
				processing.textAlign(processing.LEFT);
				processing.text("$" + (data["jobs_1"][1]/1000).toFixed(0) + "K", bar_left+bar_width*bar1+15, 65+move_down);
			}
			else
			{
				//write no job 1 data for ...
				processing.text("NO TOP JOB #1 DATA.", text_start, 65+move_down);
			}
			processing.textAlign(processing.RIGHT);
			processing.noStroke();
			processing.fill(0);
			if (data["jobs_1"][2])
			{
				if (data["jobs_1"][2].length < 40)
					processing.text((data["jobs_1"][2]).toUpperCase(), text_start, 103+move_down);
				else
				{
					//switch to a slightly smaller font
					processing.textFont(font, 11);
					var split = String(data["jobs_1"][2]).split(" ");
					var half = Math.ceil(split.length / 2);
					var string1 = split.slice(0, half).join(" ");
					var string2 = split.slice(half).join(" ");
					processing.text(string1.toUpperCase(), text_start, 103+move_down-6);
					processing.text(string2.toUpperCase(), text_start, 103+move_down+7);
					processing.textFont(font, 12);
				}
				processing.fill(main);
				var bar1 = (data["jobs_1"][3]-min)/(max-min);
				processing.rect(bar_left, 88+move_down, bar_width*bar1, 20);
				processing.fill(0);
				processing.textAlign(processing.LEFT);
				processing.text("$" + (data["jobs_1"][3]/1000).toFixed(0) + "K", bar_left+bar_width*bar1+15, 103+move_down);
			}
			else
			{
				//write no job 2 data for ...
				processing.text("NO TOP JOB #2 DATA.", text_start, 103+move_down);
			}
			processing.textAlign(processing.RIGHT);
			processing.noStroke();
			processing.fill(0);
			if (data["jobs_1"][4])
			{
				if (data["jobs_1"][4].length < 40)
					processing.text((data["jobs_1"][4]).toUpperCase(), text_start, 145+move_down);
				else
				{
					//switch to a slightly smaller font
					processing.textFont(font, 11);
					var split = String(data["jobs_1"][4]).split(" ");
					var half = Math.ceil(split.length / 2);
					var string1 = split.slice(0, half).join(" ");
					var string2 = split.slice(half).join(" ");
					processing.text(string1.toUpperCase(), text_start, 145+move_down-6);
					processing.text(string2.toUpperCase(), text_start, 145+move_down+7);
					processing.textFont(font, 12);
				}
				processing.fill(main);
				var bar1 = (data["jobs_1"][5]-min)/(max-min);
				processing.rect(bar_left, 130+move_down, bar_width*bar1, 20);
				processing.fill(0);
				processing.textAlign(processing.LEFT);
				processing.text("$" + (data["jobs_1"][5]/1000).toFixed(0) + "K", bar_left+bar_width*bar1+15, 145+move_down);
			}
			else
			{
				//write no job 3 data for ...
				processing.text("NO TOP JOB #3 DATA.", text_start, 145+move_down);
			}

		}
		processing.stroke(0);
		processing.strokeWeight(2);
		processing.line(105, 183+move_down, text_start, 183+move_down);
		if (!hide_2)
		{
			processing.textAlign(processing.RIGHT);
			processing.noStroke();
			processing.fill(0);
			if (data["jobs_2"][0])
			{
				if (data["jobs_2"][0].length < 40)
					processing.text((data["jobs_2"][0]).toUpperCase(), text_start, 225+move_down);
				else
				{
					//switch to a slightly smaller font
					processing.textFont(font, 11);
					var split = String(data["jobs_2"][0]).split(" ");
					var half = Math.ceil(split.length / 2);
					var string1 = split.slice(0, half).join(" ");
					var string2 = split.slice(half).join(" ");
					processing.text(string1.toUpperCase(), text_start, 225+move_down-6);
					processing.text(string2.toUpperCase(), text_start, 225+move_down+7);
					processing.textFont(font, 12);
				}
				processing.fill(gray);
				var bar1 = (data["jobs_2"][1]-min)/(max-min);
				processing.rect(bar_left, 210+move_down, bar_width*bar1, 20);
				processing.fill(0);
				processing.textAlign(processing.LEFT);
				processing.text("$" + (data["jobs_2"][1]/1000).toFixed(0) + "K", bar_left+bar_width*bar1+15, 225+move_down);
			}
			else
			{
				//write no job 1 data for ...
				processing.text("NO TOP JOB #1 DATA.", text_start, 225+move_down);
			}
			processing.textAlign(processing.RIGHT);
			processing.noStroke();
			processing.fill(0);
			if (data["jobs_2"][2])
			{
				if (data["jobs_2"][2].length < 40)
					processing.text((data["jobs_2"][2]).toUpperCase(), text_start, 263+move_down);
				else
				{
					//switch to a slightly smaller font
					processing.textFont(font, 11);
					var split = String(data["jobs_2"][2]).split(" ");
					var half = Math.ceil(split.length / 2);
					var string1 = split.slice(0, half).join(" ");
					var string2 = split.slice(half).join(" ");
					processing.text(string1.toUpperCase(), text_start, 263+move_down-6);
					processing.text(string2.toUpperCase(), text_start, 263+move_down+7);
					processing.textFont(font, 12);
				}

				processing.fill(gray);
				var bar1 = (data["jobs_2"][3]-min)/(max-min);
				processing.rect(bar_left, 248+move_down, bar_width*bar1, 20);
				processing.fill(0);
				processing.textAlign(processing.LEFT);
				processing.text("$" + (data["jobs_2"][3]/1000).toFixed(0) + "K", bar_left+bar_width*bar1+15, 263+move_down);
			}
			else
			{
				//write no job 2 data for ...
				processing.text("NO TOP JOB #2 DATA.", text_start, 263+move_down);
			}
			processing.textAlign(processing.RIGHT);
			processing.noStroke();
			processing.fill(0);
			if (data["jobs_2"][4])
			{
				//processing.text((data["jobs_2"][4]).toUpperCase(), text_start, 305+move_down);
				if (data["jobs_2"][4].length < 40)
					processing.text((data["jobs_2"][4]).toUpperCase(), text_start, 305+move_down);
				else
				{
					//switch to a slightly smaller font
					processing.textFont(font, 11);
					var split = String(data["jobs_2"][4]).split(" ");
					var half = Math.ceil(split.length / 2);
					var string1 = split.slice(0, half).join(" ");
					var string2 = split.slice(half).join(" ");
					processing.text(string1.toUpperCase(), text_start, 305+move_down-6);
					processing.text(string2.toUpperCase(), text_start, 305+move_down+7);
					processing.textFont(font, 12);
				}
				processing.fill(gray);
				var bar1 = (data["jobs_2"][5]-min)/(max-min);
				processing.rect(bar_left, 290+move_down, bar_width*bar1, 20);
				processing.fill(0);
				processing.textAlign(processing.LEFT);
				processing.text("$" + (data["jobs_2"][5]/1000).toFixed(0) + "K", bar_left+bar_width*bar1+15, 305+move_down);
			}
			else
			{
				//write no job 2 data for ...
				processing.text("NO TOP JOB #3 DATA.", text_start, 305+move_down);
			}
		}

	};

};

function rate(id) {
	$("#rating_" + id).fadeTo(500, 0, function() {
		//$("#rating_" + id).fadeTo(700, 0, function() {$("#rating_" + id).fadeTo(900, 1);});
		//remove button
		$("#rating_" + id).empty();
		//get users ratings, check to see if already rated
		$.get("/api/v2/users/" + user_id + "/ratings?api_key=" + api_key, function(response){ 
			degree_rate = response.degree_ratings;
			var key = document.getElementById("search_" + id + "_name").value;
			var split = key.split("(");
			var name = split[0].substring(0, split[0].length - 1);
			var level = split[1].substring(0, split[1].length - 1);

			//check to see if its in there
			for (i in degree_rate)
			{
				if (degree_rate[i].name == name && degree_rate[i].level == level)
				{
					ratings[id-1] = degree_rate[i].rating;
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
		var button = "<a id='rating_" + id + "_button' class='btn btn-default' onclick='rate(" + id + ")'>RATE THIS MAJOR</a>";
		$("#rating_" + id).html(button);
		$('.btn-default').css({"color":color});
		$("#rating_" + id).fadeTo(700, 1);
	});
};

function updateRating(id, num) {
	ratings[id-1] = num;
	//get name and level from search field
	var split = document.getElementById("search_" + id + "_name").value.split("(");
	var name = split[0].substring(0, split[0].length - 1).replace(/ /g, "%20");
	var level = split[1].substring(0, split[1].length - 1).replace(/ /g, "%20");
	$.ajax({
		url: "/api/v2/degrees/" + level + "/" + name + "/" + num + "?api_key=" + api_key,
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

function update_tab(name) {
	if (name != active_tab)
	{
		processingInstance.noLoop();
		$("#main_viz").fadeTo(500, 0, function() {processingInstance.loop(); $("#main_viz").fadeTo(700, 1);});
		active_tab = name;
		if(data["degree_1"])
		{
			hide_1 = false;
			document.getElementById("search_1_button").value = "HIDE";
		}
		if(data["degree_2"])
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