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
});

var data, hide_1, hide_2, main, gray, font, active_tab, auto_1, auto_2, sent1, sent2, nochanges, old1, old2, canvas, processingInstance;

canvas = document.getElementById("main_viz");
if (canvas != null)
	processingInstance = new Processing(canvas, sketchProc);

sent1 = true;
sent2 = true;

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
	type = "major"
	body = ""

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
	}
	else if(field1 == ""){
		body = JSON.stringify({type:type,option:[field2]});
		sent1 = false;
		sent2 = true;
		processingInstance.noLoop();
		$("#main_viz").fadeTo(700, 0, function() {processingInstance.loop(); $("#main_viz").fadeTo(900, 1);});
	}
	else{
		body = JSON.stringify({type:type,option:[field1,field2]});
		sent1 = true;
		sent2 = true;
		processingInstance.noLoop();
		$("#main_viz").fadeTo(700, 0, function() {processingInstance.loop(); $("#main_viz").fadeTo(900, 1);});
	}

	var xmlHttp = null;

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
				localStorage.setItem("query_type", type);
				localStorage.setItem("data_store",JSON.stringify(data));

				auto_1 = undefined;
				auto_2 = undefined;

	  			if (sent1 && sent2)
	  			{
	  				hide_1 = false; 
	  				hide_2 = false;
		  	 		document.getElementById("search_1_button").value = "HIDE";
		  	 		$("#search_1_button").removeAttr("disabled");
		  	 		document.getElementById("search_2_button").value = "HIDE";
		  	 		$("#search_2_button").removeAttr("disabled");
	  			}
	  			else if (!sent1 && sent2)
	  			{
	  				hide_1 = true;
	  				document.getElementById("search_1_button").value = "SHOW";
		  	 		$("#search_1_button").attr("disabled", "true");
		  	 		hide_2 = false;
		  	 		document.getElementById("search_2_button").value = "HIDE";
		  	 		$("#search_2_button").removeAttr("disabled");
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
		  	 		hide_1 = false;
		  	 		document.getElementById("search_1_button").value = "HIDE";
		  	 		$("#search_1_button").removeAttr("disabled");
	  			}
	  			nochanges = true;
	  			if (data["jobs_1"].length == 0 && data["jobs_2"].length == 0)
				{
					//no top jobs for either major, disable that tab
					$("#job_tab").hide();
				}
				else
				{
					$("#job_tab").show();
				}
      		}
      	}
    }
    xmlHttp.send(body);
};

function sketchProc(processing) {
	
	processing.setup = function() {
		console.log("loaded major.js successfully");
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
		//always set the initial tab to the first one
		active_tab = 1;
		hide_1 = false;
		hide_2 = false;
		//load font
		font = processing.loadFont("Roboto");
		processing.textFont(font, 12);

		data = new Array();

		data = jQuery.parseJSON(unescape(localStorage.getItem("data_store")));
  		//localStorage.removeItem("data_store");

  		if (!data || (!data["degree_1"] && !data["degree_2"]))
  		{
  			data = new Array();
			//salary, major recommendation, major satisfaction, cents major rating
			data["degree_1"] = [95000, 89, 77, 4.8];
			data["degree_2"] = [41000, 45, 72, 2.9];
			data["jobs_1"] = ["Software Developer", 97500, "Database Administrator", 91000, "System Analyst", 89000];
			data["jobs_2"] = ["Teacher", 43500, "Disc Jockey", 37000, "Performance Artist", 36500];

			data["name_1"] = "Computer Science";
			data["name_2"] = "Music";
		}
		if (data["jobs_1"].length == 0 && !data["jobs_2"])
		{
			//no top jobs for either major, disable that tab
			$("#job_tab").hide();
		}
		if (data["jobs_2"].length == 0 && !data["jobs_1"])
		{
			//no top jobs for either major, disable that tab
			$("#job_tab").hide();
		}
		else if (data["jobs_1"].length == 0 && data["jobs_2"].length == 0)
		{
			//no top jobs for either major, disable that tab
			$("#job_tab").hide();
		}
		
		document.getElementById("search_1_name").value = data["name_1"];

		if (!data["degree_2"])
  		{
  			hide_2 = true;
  			document.getElementById("search_2_button").value = "SHOW";
  			$("#search_2_button").attr("disabled", "true");
  		}
  		else
  		{
  			document.getElementById("search_2_name").value = data["name_2"];
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
			if (data["job_2"])
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
			if (data["jobs_1"][0])
			{
				processing.text((data["jobs_1"][0]).toUpperCase(), 275, 65+move_down);
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
				processing.text("NO TOP JOB #1 DATA.", 275, 65+move_down);
			}
			processing.textAlign(processing.RIGHT);
			processing.noStroke();
			processing.fill(0);
			if (data["jobs_1"][2])
			{
				processing.text((data["jobs_1"][2]).toUpperCase(), 275, 103+move_down);
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
				processing.text("NO TOP JOB #2 DATA.", 275, 103+move_down);
			}
			processing.textAlign(processing.RIGHT);
			processing.noStroke();
			processing.fill(0);
			if (data["jobs_1"][4])
			{
				processing.text((data["jobs_1"][4]).toUpperCase(), 275, 145+move_down);
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
				processing.text("NO TOP JOB #3 DATA.", 275, 145+move_down);
			}

		}
		processing.stroke(0);
		processing.strokeWeight(2);
		processing.line(105, 183+move_down, 275, 183+move_down);
		if (!hide_2)
		{
			processing.textAlign(processing.RIGHT);
			processing.noStroke();
			processing.fill(0);
			if (data["jobs_2"][0])
			{
				processing.text((data["jobs_2"][0]).toUpperCase(), 275, 225+move_down);
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
				processing.text("NO TOP JOB #1 DATA.", 275, 225+move_down);
			}
			processing.textAlign(processing.RIGHT);
			processing.noStroke();
			processing.fill(0);
			if (data["jobs_2"][2])
			{
				processing.text((data["jobs_2"][2]).toUpperCase(), 275, 263+move_down);
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
				processing.text("NO TOP JOB #2 DATA.", 275, 263+move_down);
			}
			processing.textAlign(processing.RIGHT);
			processing.noStroke();
			processing.fill(0);
			if (data["jobs_2"][4])
			{
				processing.text((data["jobs_2"][4]).toUpperCase(), 275, 305+move_down);
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
				processing.text("NO TOP JOB #3 DATA.", 275, 305+move_down);
			}
			// processing.textAlign(processing.RIGHT);
			// processing.noStroke();
			// processing.fill(0);
			// processing.text((data["jobs_2"][0]).toUpperCase(), 275, 225+move_down);
			// //processing.text((data["jobs_2"][2]).toUpperCase(), 275, 263+move_down);
			// //processing.text((data["jobs_2"][4]).toUpperCase(), 275, 305+move_down);
			// processing.fill(gray);
			// var bar1 = (data["jobs_2"][1]-min)/(max-min);
			// //var bar2 = (data["jobs_2"][3]-min)/(max-min);
			// //var bar3 = (data["jobs_2"][5]-min)/(max-min);
			// processing.rect(bar_left, 210+move_down, bar_width*bar1, 20);
			// //processing.rect(bar_left, 248+move_down, bar_width*bar2, 20);
			// //processing.rect(bar_left, 290+move_down, bar_width*bar3, 20);
			// processing.fill(0);
			// processing.textAlign(processing.LEFT);
			// processing.text("$" + (data["jobs_2"][1]/1000).toFixed(0) + "K", bar_left+bar_width*bar1+15, 225+move_down);
			//processing.text("$" + (data["jobs_2"][3]/1000).toFixed(0) + "K", bar_left+bar_width*bar2+15, 263+move_down);
			//processing.text("$" + (data["jobs_2"][5]/1000).toFixed(0) + "K", bar_left+bar_width*bar3+15, 305+move_down);

		}
		//processing.rect(bar_left, 50, bar_width*0.75, 20);

	};

};

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