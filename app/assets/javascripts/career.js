
$(document).ready(function() {
	$.get("/api/v2/careers", function(response) { 
		auto_careers = response;
		$( "#search_1_name" ).autocomplete({
	  		source: function(req, responseFn) {
	  			var re = $.ui.autocomplete.escapeRegex(req.term);
	  			var pattern1 = new RegExp("^"+re, "i");
	  			var a = $.grep(auto_careers, function(item, index){return pattern1.test(item);});
	  			var b = $.grep(auto_careers, function(item, index){return ((item.toLowerCase()).indexOf(re.toLowerCase())>0);});
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
	  			else if (auto_careers.indexOf(temp1) < 0 && auto_1)
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
	  			var a = $.grep(auto_careers, function(item, index){return pattern1.test(item);});
	  			var b = $.grep(auto_careers, function(item, index){return ((item.toLowerCase()).indexOf(re.toLowerCase())>0);});
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
	  			else if (auto_careers.indexOf(temp2) < 0 && auto_2)
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

function career_api_request(query) {
	if (nochanges)
		return;

	var field1, field2;
	field1 = "";
	field2 = "";

	$("#error_1").empty();
	$('#search_1_name').autocomplete('close');
	//check to see if any of the fields are empty
	if (document.getElementById("search_1_name").value != "")
	{
		if (auto_1 == "")
			$("#error_1").append("Invalid career.");
		if (auto_1 != "" && auto_1)
			field1 = auto_1;		
		else if (auto_1 == undefined)
		{
			if (auto_careers.indexOf(document.getElementById("search_1_name").value) < 0)
				$("#error_1").append("Invalid career.");
			else
				field1 = document.getElementById("search_1_name").value;	
		}	
	}
	$("#error_2").empty();
	$('#search_2_name').autocomplete('close');
	if (document.getElementById("search_2_name").value != "")
	{
		if (auto_2 == "")
			$("#error_2").append("Invalid career.");
		if (auto_2 != "" && auto_2)
			field2 = auto_2;		
		else if (auto_2 == undefined)
		{
			if (auto_careers.indexOf(document.getElementById("search_2_name").value) < 0)
				$("#error_2").append("Invalid career.");
			else
				field2 = document.getElementById("search_2_name").value;	
		}	
	}

	url = "https://trycents.com:6001/data";
	type = "career"
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

				auto_1 = undefined;
				auto_2 = undefined;

	  			if (sent1 && sent2)
	  			{
	  				for(var i = 0; i < data["elements"].length; i++) {
	  					Object.keys(data["elements"][i]).forEach(function(key) {
			    			var idx = i+1;
		    				var nKey = key + "_" + idx;
			    			data[nKey] = data["elements"][i][key];
						});
	  				}
	  				delete data["elements"];
	  				hide_1 = false; 
	  				hide_2 = false;
		  	 		document.getElementById("search_1_button").value = "HIDE";
		  	 		$("#search_1_button").removeAttr("disabled");
		  	 		document.getElementById("search_2_button").value = "HIDE";
		  	 		$("#search_2_button").removeAttr("disabled");
	  			}
	  			else if (!sent1 && sent2)
	  			{
	  				Object.keys(data["elements"][0]).forEach(function(key) {
		    			var nKey = key + "_2";
		    			data[nKey] = data["elements"][0][key];
					});
					delete data["elements"];
	  				hide_1 = true;
	  				document.getElementById("search_1_button").value = "SHOW";
		  	 		$("#search_1_button").attr("disabled", "true");
		  	 		hide_2 = false;
		  	 		document.getElementById("search_2_button").value = "HIDE";
		  	 		$("#search_2_button").removeAttr("disabled");
		  	 		//need to flip data to _2 arrays
					data["career_salary_2"] = $.extend(true, [], data["career_salary_1"]);
					data["career_salary_1"] = null;
					data["career_rating_2"] = $.extend(true, [], data["career_rating_1"]);
					data["career_rating_1"] = null;
					data["career_demand_2"] = $.extend(true, [], data["career_demand_1"]);
					data["career_demand_1"] = null;
					data["career_unemploy_2"] = $.extend(true, [], data["career_unemploy_1"]);
					data["career_unemploy_1"] = null;
	
					data["career_2_name"] = data["career_1_name"];
					data["career_1_name"] = null;

	  			}
	  			else if (sent1 && !sent2)
	  			{
	  				Object.keys(data["elements"][0]).forEach(function(key) {
		    			var nKey = key + "_1";
		    			data[nKey] = data["elements"][0][key];
					});
					delete data["elements"];

	  				hide_2 = true;
	  				document.getElementById("search_2_button").value = "SHOW";
		  	 		$("#search_2_button").attr("disabled", "true");
		  	 		hide_1 = false;
		  	 		document.getElementById("search_1_button").value = "HIDE";
		  	 		$("#search_1_button").removeAttr("disabled");
	  			}
	  			nochanges = true;

	  			//make api request here with type included
				localStorage.setItem("query_type", type);
				localStorage.setItem("data_store",JSON.stringify(data));
      		}
      	}
    }
    xmlHttp.send(body);
};

function sketchProc(processing) {
	
	processing.setup = function() {
		console.log("loaded career.js successfully");
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

		data = new Array();

		data = jQuery.parseJSON(unescape(localStorage.getItem("data_store")));


		//document.getElementById("search_1_name").value = "software engineer";
		//document.getElementById("search_2_name").value = "music teacher";

		processing.size(655,375);
		//always set the initial tab to the first one
		active_tab = 1;
		hide_1 = false;
		hide_2 = false;
		//load font
		font = processing.loadFont("Roboto");
		processing.textFont(font, 12);

		if (!data || (!data["career_salary_1"] && !data["career_salary_2"]))
  		{
			data = new Array();
			//career salary data, 1997-2013, min, max
			data["career_salary_1"] = [52000, 72000, null, 77000, 79000, 81000, null, null, 86000, 86500, 88000, 52000, 88000];
			data["career_salary_2"] = [12345, null, null, 15000, null, null, null, 17500, null, null, 25750, 12345, 25750];
			//career satisfaction
			data["career_rating_1"] = 4.8;
			data["career_rating_2"] = 2.9;
			//demand
			data["career_demand_1"] = [353200, 22.4, 252700];
			data["career_demand_2"] = [35500, 16.0, 18300];
			//unemployment
			data["career_unemploy_1"] = [3.8, 3.2];
			data["career_unemploy_2"] = [8.1, 8.5];
			data["career_unemploy_3"] = [6.0, 6.8];

			data["career_1_name"] = "Software Engineer";
			data["career_2_name"] = "Music Teacher";
		}

		document.getElementById("search_1_name").value = data["career_1_name"];

		if (!data["career_salary_2"])
  		{
  			hide_2 = true;
  			document.getElementById("search_2_button").value = "SHOW";
  			$("#search_2_button").attr("disabled", "true");
  		}
  		else
  		{
  			document.getElementById("search_2_name").value = data["career_2_name"];
  		}
  		old1 = document.getElementById("search_1_name").value;
		old2 = document.getElementById("search_2_name").value;
		nochanges = true;
	};


	processing.draw = function() {
		processing.background(255);

		//tab helper salary, job satisfaction, demand, unemployment
		if (active_tab == 1)
			career_summary();
		else if (active_tab == 2)
			career_salary();
		else if (active_tab == 3)
			career_demand();
		else
			career_unemploy();
	};

	function career_summary() {
		//draw categories and separations
		var title_offset = 0;
		if (hide_1 || hide_2)
			title_offset = 40;

		processing.textAlign(processing.RIGHT);
		processing.fill(0);
		processing.text("2013 AVERAGE SALARY", 275+title_offset, 55);
		processing.text("CENTS JOB RATING", 275+title_offset, 135);
		processing.text("PROJECTED JOB DEMAND 2012-2022", 275+title_offset, 215);
		processing.text("2012 UNEMPLOYMENT", 275+title_offset, 295);
		processing.stroke(225);
		processing.strokeWeight(1);
		processing.line(55+title_offset, 93, 275+title_offset, 93);
		processing.line(55+title_offset, 173, 275+title_offset, 173);
		processing.line(55+title_offset, 253, 275+title_offset, 253);
		processing.textAlign(processing.CENTER);
		processing.text("(CLICK TABS ON RIGHT FOR MORE DETAILS)", 330, 355);

		var offset = 0;

		//draw data
		if (!hide_1)
		{
			if (hide_2)
				offset = 80;
			processing.textFont(font, 30);
			processing.fill(main);
			processing.text("$" + (data["career_salary_1"][10]).toLocaleString(), 400+offset, 60);
			processing.text("" + (data["career_rating_1"]), 400+offset, 130);
			processing.text((data["career_demand_1"][0]).toLocaleString(), 400+offset, 215);
			processing.text((data["career_unemploy_1"][0]) + "%", 400+offset, 300);
			processing.textFont(font, 12);
			processing.text("OUT OF 5.0", 400+offset, 150);
			processing.text("JOBS", 400+offset, 235);
		}

		if (!hide_2)
		{
			if (hide_1)
				offset = -80;
			processing.textFont(font, 30);
			processing.fill(gray);
			processing.text("$" + (data["career_salary_2"][10]).toLocaleString(), 560+offset, 60);
			processing.text("" + (data["career_rating_2"]), 560+offset, 130);
			processing.text((data["career_demand_2"][0]).toLocaleString(), 560+offset, 215);
			processing.text((data["career_unemploy_2"][0]) + "%", 560+offset, 300);
			processing.textFont(font, 12);
			processing.text("OUT OF 5.0", 560+offset, 150);
			processing.text("JOBS", 560+offset, 235);
		}	

	};

	function career_salary() {
		//graph variables
		var graph_top = 50; 
		var graph_bot = 320;
		var graph_left = 70;
		var graph_right = 605;

		//draw title and graph border
		processing.strokeWeight(2);
		processing.stroke(0);
		processing.fill(0);
		processing.textAlign(processing.CENTER);
		processing.text("AVERAGE NATIONAL SALARIES ($)", 327, 30);

		processing.line(graph_left, graph_top, graph_left, graph_bot-1);
		processing.line(graph_left, graph_bot, graph_right+2, graph_bot);

		//draw year labels and lines
		processing.stroke(235);
		processing.strokeWeight(1);
		processing.text("2003", graph_left, graph_bot+20);
		for (var i=1; i<11; i++)
		{
			var horz_loc = graph_left+i*((graph_right-graph_left)/10);
			if (i%2 == 0)
			{
				processing.text(String(2003+i), horz_loc, graph_bot+20);
			}
			processing.line(horz_loc, graph_top+1, horz_loc, graph_bot-2);
		}

		//check to see if how many null values for each
		var null_1, null_2;
		null_1 = reduce(data["career_salary_1"]);
		if (data["career_salary_2"])
			null_2 = reduce(data["career_salary_2"]);

		//calculate min and max for data being shown [17] = min, [18] = max
		var min, max;
		if (hide_2 && !hide_1)
		{
			min = data["career_salary_1"][11];
			max = data["career_salary_1"][12];
		}
		else if (hide_1 && !hide_2)
		{
			min = data["career_salary_2"][11];
			max = data["career_salary_2"][12];
		}
		else
		{
			
			if (data["career_salary_2"])
			{
				min = processing.min(data["career_salary_1"][11], data["career_salary_2"][11]);
				max = processing.max(data["career_salary_1"][12], data["career_salary_2"][12]);
			}
			else
			{
				min = data["career_salary_1"][11];
				max = data["career_salary_1"][12];
			}
		}

		// if (!hide_1 && !hide_2)
		// {
		// 	min = processing.min(data["career_salary_1"][11], data["career_salary_2"][11]);
		// 	max = processing.max(data["career_salary_1"][12], data["career_salary_2"][12]);
		// }
		// else if (hide_1 && !hide_2)
		// {
		// 	min = data["career_salary_2"][11];
		// 	max = data["career_salary_2"][12];
		// }
		// else
		// {

		// 	min = data["career_salary_1"][11];
		// 	max = data["career_salary_1"][12];
		// }

		//draw lines and labels for salary range
		min = ((processing.round(min/10000))-1)*10000;
		max = ((processing.round(max/10000))+1)*10000;

		var range = (max-min);
		var step = range/10;


		processing.textAlign(processing.RIGHT);

		processing.text(String(processing.round((min)/1000))+"k", graph_left-10, graph_bot);
		for (var i=1; i<=10; i++)
		{
			var vert_loc = graph_bot-i*((graph_bot-graph_top)/10);
			processing.text(String(processing.round((min+i*step)/1000))+"k", graph_left-10, vert_loc+2);
			processing.line(graph_left+1, vert_loc, graph_right, vert_loc);
		}

		// //draw data
		
		for (var i=0; i<10; i++)
		{
			processing.strokeWeight(2);
			if (!hide_1)
			{
				var horz_1, horz_2, vert_1, vert_2;
				processing.stroke(main);
				processing.fill(main);
				if (data["career_salary_1"][i])
				{
					horz_1 = graph_left+i*((graph_right-graph_left)/10);
					vert_1 = graph_top+(1-(data["career_salary_1"][i] - min)/(range))*(graph_bot-graph_top);
					//draw dots
					processing.ellipse(horz_1, vert_1, 5, 5);
				}
				//get next non null point
				var j = i + 1;
				while (!data["career_salary_1"][j] && j<11)
					j++;
				if (j<11)
				{
					horz_2 = graph_left+(j)*((graph_right-graph_left)/10);
					vert_2 = graph_top+(1-(data["career_salary_1"][j] - min)/(range))*(graph_bot-graph_top);
					processing.ellipse(horz_2, vert_2, 5, 5);
					if (horz_1)
						processing.line(horz_1, vert_1, horz_2, vert_2);
					else
					{
						if (null_1 == 1 && i == 9)
						{
							processing.textAlign(processing.CENTER);
							processing.noStroke();
							processing.text("LIMITED", horz_2, vert_2-25);
							processing.text("SALARY INFO", horz_2, vert_2-10);
						}
					}
				}
			}
		}
		for (var i=0; i<10; i++)
		{
			processing.strokeWeight(2);
			if (!hide_2)
			{
				var horz_3, horz_4, vert_3, vert_4;
				processing.stroke(gray);
				processing.fill(gray);
				if (data["career_salary_2"][i])
				{
					horz_3 = graph_left+i*((graph_right-graph_left)/10);
					vert_3 = graph_top+(1-(data["career_salary_2"][i] - min)/(range))*(graph_bot-graph_top);
					//draw dots
					processing.ellipse(horz_3, vert_3, 5, 5);
				}
				//get next non null point
				var j = i + 1;
				while (!data["career_salary_2"][j] && j<11)
					j++;
				//console.log("next at " + j);
				if (j<11)
				{
					horz_4 = graph_left+(j)*((graph_right-graph_left)/10);
					vert_4 = graph_top+(1-(data["career_salary_2"][j] - min)/(range))*(graph_bot-graph_top);
					processing.ellipse(horz_4, vert_4, 5, 5);
					if (horz_3)
						processing.line(horz_3, vert_3, horz_4, vert_4);
					else
					{
						if (null_2 == 1 && i == 9)
						{
							processing.textAlign(processing.CENTER);
							processing.noStroke();
							processing.text("LIMITED", horz_4, vert_4-25);
							processing.text("SALARY INFO", horz_4, vert_4-10);
						}
					}
				}
				// processing.stroke(gray);
				// var horz_1 = graph_left+i*((graph_right-graph_left)/16);
				// var horz_2 = graph_left+(i+1)*((graph_right-graph_left)/16);
				// var vert_1 = graph_top+(1-(data["career_salary_2"][i] - min)/(range))*(graph_bot-graph_top);
				// var vert_2 = graph_top+(1-(data["career_salary_2"][i+1] - min)/(range))*(graph_bot-graph_top);
				// processing.line(horz_1, vert_1, horz_2, vert_2);
			}
		}
	};

	function career_demand() {
		//graph variables
		var graph_top = 50; 
		var graph_bot = 320;
		var graph_mid_1 = 122;
		var graph_mid_2 = 327;
		var graph_mid_3 = 532;

		//draw title and graph border
		processing.strokeWeight(2);
		processing.stroke(0);
		processing.fill(0);
		processing.textAlign(processing.CENTER);
		processing.text("PROJECTED CAREER DEMAND (2012-2022)", 327, 25);
		processing.text("CAREER GROWTH VOLUME", graph_mid_1+10, graph_bot+28);
		processing.text("CAREER GROWTH PERCENT", graph_mid_2+10, graph_bot+28);
		processing.text("JOB OPENINGS", graph_mid_3+10, graph_bot+28);

		processing.line(graph_mid_1-55, graph_bot, graph_mid_1+90, graph_bot);
		processing.line(graph_mid_2-55, graph_bot, graph_mid_2+90, graph_bot);
		processing.line(graph_mid_3-55, graph_bot, graph_mid_3+90, graph_bot);

		//draw scale lines
		processing.strokeWeight(1);
		processing.stroke(235);
		var scale = (graph_bot-graph_top)/10;
		for (var i=0; i<10; i++)
		{
			processing.line(graph_mid_1-55, graph_top+(scale*i), graph_mid_1+90, graph_top+(scale*i));
			processing.line(graph_mid_2-55, graph_top+(scale*i), graph_mid_2+90, graph_top+(scale*i));
			processing.line(graph_mid_3-55, graph_top+(scale*i), graph_mid_3+90, graph_top+(scale*i));
		}

		//calculate min and max for each graph
		//***************FIX FOR NEGATIVE NUMBERS
		var min_1, max_1, min_2, max_2, min_3, max_3;

		if (hide_2 && !hide_1)
		{
			min_1 = data["career_demand_1"][2] * 0.8;
			max_1 = data["career_demand_1"][2] * 1.1;
			min_2 = data["career_demand_1"][1] * 0.8;
			max_2 = data["career_demand_1"][1] * 1.1;
			min_3 = data["career_demand_1"][0] * 0.8;
			max_3 = data["career_demand_1"][0] * 1.1;
		}
		else if (hide_1 && !hide_2)
		{
			min_1 = data["career_demand_2"][2] * 0.8;
			max_1 = data["career_demand_2"][2] * 1.1;
			min_2 = data["career_demand_2"][1] * 0.8;
			max_2 = data["career_demand_2"][1] * 1.1;
			min_3 = data["career_demand_2"][0] * 0.8;
			max_3 = data["career_demand_2"][0] * 1.1;
		}
		else
		{
			
			if (data["career_demand_2"])
			{
				min_1 = processing.min(data["career_demand_1"][2], data["career_demand_2"][2]) * 0.8;
				max_1 = processing.max(data["career_demand_1"][2], data["career_demand_2"][2]) * 1.1;
				min_2 = processing.min(data["career_demand_1"][1], data["career_demand_2"][1]) * 0.8;
				max_2 = processing.max(data["career_demand_1"][1], data["career_demand_2"][1]) * 1.1;
				min_3 = processing.min(data["career_demand_1"][0], data["career_demand_2"][0]) * 0.8;
				max_3 = processing.max(data["career_demand_1"][0], data["career_demand_2"][0]) * 1.1;
			}
			else
			{
				min_1 = data["career_demand_1"][2] * 0.8;
				max_1 = data["career_demand_1"][2] * 1.1;
				min_2 = data["career_demand_1"][1] * 0.8;
				max_2 = data["career_demand_1"][1] * 1.1;
				min_3 = data["career_demand_1"][0] * 0.8;
				max_3 = data["career_demand_1"][0] * 1.1;
			}
		}



		
		// if (hide_2 && !hide_1)
		// {
		// 	min_1 = data["career_demand_1"][2] * 0.8;
		// 	max_1 = data["career_demand_1"][2] * 1.1;
		// 	min_2 = data["career_demand_1"][1] * 0.8;
		// 	max_2 = data["career_demand_1"][1] * 1.1;
		// 	min_3 = data["career_demand_1"][0] * 0.8;
		// 	max_3 = data["career_demand_1"][0] * 1.1;
		// }
		// else if (!hide_2 && hide_1)
		// {
		// 	min_1 = data["career_demand_2"][2] * 0.8;
		// 	max_1 = data["career_demand_2"][2] * 1.1;
		// 	min_2 = data["career_demand_2"][1] * 0.8;
		// 	max_2 = data["career_demand_2"][1] * 1.1;
		// 	min_3 = data["career_demand_2"][0] * 0.8;
		// 	max_3 = data["career_demand_2"][0] * 1.1;
		// }
		// else
		// {
		// 	min_1 = processing.min(data["career_demand_1"][2], data["career_demand_2"][2]) * 0.8;
		// 	max_1 = processing.max(data["career_demand_1"][2], data["career_demand_2"][2]) * 1.1;
		// 	min_2 = processing.min(data["career_demand_1"][1], data["career_demand_2"][1]) * 0.8;
		// 	max_2 = processing.max(data["career_demand_1"][1], data["career_demand_2"][1]) * 1.1;
		// 	min_3 = processing.min(data["career_demand_1"][0], data["career_demand_2"][0]) * 0.8;
		// 	max_3 = processing.max(data["career_demand_1"][0], data["career_demand_2"][0]) * 1.1;

		// }

		//draw numerical scales
		var range_1 = (max_1-min_1)/10;
		var range_2 = (max_2-min_2)/10;
		var range_3 = (max_3-min_3)/10;
		processing.textAlign(processing.RIGHT);
		for (var i=0; i<=10; i++)
		{
			processing.text(((min_1+(range_1*i))/1000).toFixed(1) + "k", graph_mid_1-60, graph_bot-(scale*i)+5);
			processing.text((min_2+(range_2*i)).toFixed(1) + "%", graph_mid_2-60, graph_bot-(scale*i)+5);
			processing.text(((min_3+(range_3*i))/1000).toFixed(1) + "k", graph_mid_3-60, graph_bot-(scale*i)+5);
		}

		//draw data
		if (!hide_1)
		{
			processing.fill(main);
			processing.noStroke();
			if (data["career_demand_1"][2] != null)
				processing.rect(graph_mid_1-20, graph_bot-1, 30, -1*(graph_bot-graph_top)*(data["career_demand_1"][2]-min_1)/(max_1-min_1));
			if (data["career_demand_1"][1] != null)
				processing.rect(graph_mid_2-20, graph_bot-1, 30, -1*(graph_bot-graph_top)*(data["career_demand_1"][1]-min_2)/(max_2-min_2));
			if (data["career_demand_1"][0] != null)
				processing.rect(graph_mid_3-20, graph_bot-1, 30, -1*(graph_bot-graph_top)*(data["career_demand_1"][0]-min_3)/(max_3-min_3));
		}
		if (!hide_2)
		{
			processing.fill(gray);
			processing.noStroke();
			if (data["career_demand_2"][2] != null)
				processing.rect(graph_mid_1+10, graph_bot-1, 30, -1*(graph_bot-graph_top)*(data["career_demand_2"][2]-min_1)/(max_1-min_1));
			if (data["career_demand_2"][1] != null)
				processing.rect(graph_mid_2+10, graph_bot-1, 30, -1*(graph_bot-graph_top)*(data["career_demand_2"][1]-min_2)/(max_2-min_2));
			if (data["career_demand_2"][0] != null)
				processing.rect(graph_mid_3+10, graph_bot-1, 30, -1*(graph_bot-graph_top)*(data["career_demand_2"][0]-min_3)/(max_3-min_3));
		}


	};

	function career_unemploy() {

		var graph_top = 50; 
		var graph_bot = 320;
		var graph_left = 60;
		var graph_right = 620;
		axis_location = [150, 530];

		//draw labels
		processing.textAlign(processing.CENTER);
		processing.stroke(0);
		processing.strokeWeight(2);
		processing.fill(0);
		processing.text("UNEMPLOYMENT RATE 2011", axis_location[0], graph_bot+23);
		processing.text("UNEMPLOYMENT RATE 2012", axis_location[1], graph_bot+23);
		processing.text("CAREER UNEMPLOYMENT RATES", 335, 30);

		//left and right axis
		processing.line(graph_left, graph_top, graph_left, graph_bot);
		processing.line(graph_right, graph_top, graph_right, graph_bot);

		//bottom lines around categories
		processing.line(graph_left, graph_bot+1, graph_right-1, graph_bot+1);

		//need max for percentages
		var min, max;
		if (hide_2 && !hide_1)
		{
			min = processing.min(data["career_unemploy_1"][0], data["career_unemploy_1"][1], data["career_unemploy_3"][0], data["career_unemploy_3"][1]);
			max = processing.max(data["career_unemploy_1"][0], data["career_unemploy_1"][1], data["career_unemploy_3"][0], data["career_unemploy_3"][1]);
			min = min * 0.9;
			max = max * 1.05;
		}
		else if (hide_1 && !hide_2)
		{
			min = processing.min(data["career_unemploy_2"][0], data["career_unemploy_2"][1], data["career_unemploy_3"][0], data["career_unemploy_3"][1]);
			max = processing.max(data["career_unemploy_2"][0], data["career_unemploy_2"][1], data["career_unemploy_3"][0], data["career_unemploy_3"][1]);
			min = min * 0.9;
			max = max * 1.05;
		}
		else
		{
			
			if (data["career_unemploy_2"])
			{
				min = processing.min(data["career_unemploy_1"][0], data["career_unemploy_1"][1], data["career_unemploy_2"][0], data["career_unemploy_2"][1], data["career_unemploy_3"][0], data["career_unemploy_3"][1]);
				max = processing.max(data["career_unemploy_1"][0], data["career_unemploy_1"][1], data["career_unemploy_2"][0], data["career_unemploy_2"][1], data["career_unemploy_3"][0], data["career_unemploy_3"][1]);
				min = min * 0.9;
				max = max * 1.05;
			}
			else
			{
				min = processing.min(data["career_unemploy_1"][0], data["career_unemploy_1"][1], data["career_unemploy_3"][0], data["career_unemploy_3"][1]);
				max = processing.max(data["career_unemploy_1"][0], data["career_unemploy_1"][1], data["career_unemploy_3"][0], data["career_unemploy_3"][1]);
				min = min * 0.9;
				max = max * 1.05;
			}
		}

		// if (hide_2 && !hide_1)
		// {
		// 	min = processing.min(data["career_unemploy_1"][0], data["career_unemploy_1"][1], data["career_unemploy_3"][0], data["career_unemploy_3"][1]);
		// 	max = processing.max(data["career_unemploy_1"][0], data["career_unemploy_1"][1], data["career_unemploy_3"][0], data["career_unemploy_3"][1]);
		// 	min = min * 0.9;
		// 	max = max * 1.05;
		// }
		// else if (!hide_2 && hide_1)
		// {
		// 	min = processing.min(data["career_unemploy_2"][0], data["career_unemploy_2"][1], data["career_unemploy_3"][0], data["career_unemploy_3"][1]);
		// 	max = processing.max(data["career_unemploy_2"][0], data["career_unemploy_2"][1], data["career_unemploy_3"][0], data["career_unemploy_3"][1]);
		// 	min = min * 0.9;
		// 	max = max * 1.05;
		// }
		// else
		// {
		// 	min = processing.min(data["career_unemploy_1"][0], data["career_unemploy_1"][1], data["career_unemploy_2"][0], data["career_unemploy_2"][1], data["career_unemploy_3"][0], data["career_unemploy_3"][1]);
		// 	max = processing.max(data["career_unemploy_1"][0], data["career_unemploy_1"][1], data["career_unemploy_2"][0], data["career_unemploy_2"][1], data["career_unemploy_3"][0], data["career_unemploy_3"][1]);
		// 	min = min * 0.9;
		// 	max = max * 1.05;
		// }

		//draw scales
		processing.stroke(235);
		processing.fill(0);
		var range = (graph_top - graph_bot)/10;
		var per_scale = (max - min)/10;
		for (var i=1; i<=10; i++)
		{
			var h = graph_bot + range * i;
			processing.line(graph_left+2, h, graph_right-3, h);
			processing.textAlign(processing.RIGHT);
			processing.text((min + per_scale * i).toFixed(1) + "%", graph_left-5, h+5);
		}
		//bottom value
		processing.text((min).toFixed(1) + "%", graph_left-5, graph_bot);


		

		//draw NATIONAL AVERAGE rectangle and data
		processing.stroke(0);
		var line_1 = graph_bot + (graph_top - graph_bot)*((data["career_unemploy_3"][0] -  min)/(max - min));
		var line_2 = graph_bot + (graph_top - graph_bot)*((data["career_unemploy_3"][1] -  min)/(max - min));
		
		processing.line(graph_left, line_1, axis_location[0]+70, line_1);
		processing.line(axis_location[0]+71, line_1, axis_location[1]-71, line_2);
		processing.line(axis_location[1]-70, line_2, graph_right-1, line_2);

		processing.fill(255);
		processing.stroke(255);
		processing.rect((axis_location[0]+axis_location[1])/2-40, (line_1+line_2)/2-30, 77, 50)
		processing.noStroke();
		processing.fill(0);
		processing.textAlign(processing.CENTER);
		processing.text("NATIONAL", (axis_location[0]+axis_location[1])/2, (line_1+line_2)/2-9);
		processing.text("AVERAGES", (axis_location[0]+axis_location[1])/2, (line_1+line_2)/2+8);

		var height_1, height_2, height_3, height_4;
		height_1 = (graph_top - graph_bot)*((data["career_unemploy_1"][0] -  min)/(max - min));
		height_2 = (graph_top - graph_bot)*((data["career_unemploy_1"][1] -  min)/(max - min));
		if (!hide_2)
		{
			height_3 = (graph_top - graph_bot)*((data["career_unemploy_2"][0] -  min)/(max - min));
			height_4 = (graph_top - graph_bot)*((data["career_unemploy_2"][1] -  min)/(max - min));
		}

		//buffer boxes
		if (!hide_1)
		{
			processing.fill(255);
			processing.rect(axis_location[0]-35, graph_bot, 40, height_1);
			processing.rect(axis_location[1]-35, graph_bot, 40, height_2);
		}

		if (!hide_2)
		{
			processing.fill(255);
			processing.rect(axis_location[0]-5, graph_bot, 40, height_3);
			processing.rect(axis_location[1]-5, graph_bot, 40, height_4);
		}
		//data
		if (!hide_1)
		{
			processing.fill(main);
			processing.noStroke();
			processing.rect(axis_location[0]-30, graph_bot, 30, height_1);
			processing.rect(axis_location[1]-30, graph_bot, 30, height_2);
		}

		if (!hide_2)
		{
			processing.fill(gray);
			processing.noStroke();
			processing.rect(axis_location[0], graph_bot, 30, height_3);
			processing.rect(axis_location[1], graph_bot, 30, height_4);	
		}

	};
};

function reduce(a) {
	var temp = [];
	for (var i=0; i<a.length; i++)
	{
		if (a[i] != null)
			temp[temp.length] = a[i];
		//console.log(a[i]);
	}
	return temp.length-2;
};

function update_tab(name) {
	if (name != active_tab)
	{
		processingInstance.noLoop();
		$("#main_viz").fadeTo(500, 0, function() {processingInstance.loop(); $("#main_viz").fadeTo(700, 1);});
		active_tab = name;
		if(data["career_salary_1"])
		{
			hide_1 = false;
			document.getElementById("search_1_button").value = "HIDE";
		}
		if(data["career_salary_2"])
		{
			hide_2 = false;
			document.getElementById("search_2_button").value = "HIDE";
		}
	}
	// active_tab = name;
	// hide_1 = false;
	// hide_2 = false;
	// document.getElementById("search_1_button").value = "HIDE";
	// document.getElementById("search_2_button").value = "HIDE";
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
