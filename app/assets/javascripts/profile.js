var canvas, context, imageObj, x, y, primary, c, search_height, school_rate, degree_rate, career_rate, color;

var progress_cats = [	"View Major Comparison", "View College Comparison", "View Career Comparison", "View Spending Breakdown",
						"View About", "View City Comparison", "Create Custom Spending", "Create Custom Color", "Use Mobile",
						"Use Wizard", "Use Main Search", "Use Examples", "Submit Feedback"];

var mods_high = [0, .2, .375, .5, .625, .75, .875, 1];
//var mods_high = [.125, .25, .375, .5, .625, .75, .875, 1];
var mods_low = [0, .125, .25, .375, .5, .675, .8];

$(document).ready(function() {
	canvas = document.getElementById('color_picker');
	canvas.addEventListener("mousedown", getPosition, false);
	context = canvas.getContext('2d');
	imageObj = new Image();
	primary = true;
	imageObj.onload = function() {
	context.drawImage(imageObj, 45, 45);
	};
	imageObj.src = '/assets/color wheel.png';
	//get color from local storage if it exists, set old and new to that stored color
	if (localStorage.getItem("colors"))
	{
		var c_store = jQuery.parseJSON(unescape(localStorage.getItem("colors")));
		document.getElementById("new_div").style.backgroundColor = c_store["p_hex"];
		document.getElementById("old_div").style.backgroundColor = c_store["p_hex"];
		c = c_store["p_rgb"];
		color = c_store["p_hex"];
	}
	else
	{
		document.getElementById("new_div").style.backgroundColor = "#884412";
		document.getElementById("old_div").style.backgroundColor = "#884412";
		c = [136, 68, 18];
		color = "#884412";
	}
	colorScale();

	//request user data
	$.get("/api/v2/users/" + user_id, function(response){  
		$("#email").text("Email:\t\t\t" + response.email);
		$("#fname").text("First Name:\t\t" + response.first_name);
		$("#lname").text("Last Name:\t\t" + response.last_name);
		$("#email_type").text("Email Type:\t\t" + response.email_type);
	});

	//request user data
	$.get("/api/v2/users/" + user_id + "/query", function(response){  
		//create set of unrepeated searches
		var searches = [];
		var uppers = [];
		for (var i=0; i<response.length; i++)
		{
			if (uppers.indexOf(response[i].toUpperCase()) < 0)
			{
				searches[searches.length] = response[i];
				uppers[uppers.length] = response[i].toUpperCase();
			}
		}
		var a_tags = "";
		for (var i=0; i<searches.length; i++)
			a_tags += "<p class='search_info' onclick='api_request(&quot;" + searches[i] + "&quot;)'>" + searches[i] + "</p>";
		var l = searches.length;
		$("#ac-2").attr("onclick", "setHeight('ac-2', '#recent_article', " + searches.length + ")");
		document.getElementById("ac-2").value = "0";
		$("#recent_article").html(a_tags);
	});

	//request user data
	$.get("/api/v2/users/" + user_id + "/ratings", function(response){ 
		//major ratings
		degree_rate = JSON.parse(JSON.stringify(response.degree_ratings));
		//school_rate = response.school_ratings;
		var a_tags = "";
		for (var i=0; i<degree_rate.length; i++)
			a_tags += "<div class='rating-div'><div class='rating-name'><p class='profile_info'>" + degree_rate[i].name + "</p></div><div class='rating-value'>" + centsRating("degree_rate", degree_rate[i].name) + "</div></div>";
			//a_tags += "<p class='profile_info'>" + school_rate[i].name + "\t\t\t" + school_rate[i].rating + "</p>";
		$("#ac-3").attr("onclick", "setHeight('ac-3', '#degree_ratings'," + degree_rate.length + ")");
		document.getElementById("ac-3").value = "0";
		$("#degree_ratings").html(a_tags);
		setRatings(degree_rate);

		//school ratings
		school_rate = JSON.parse(JSON.stringify(response.school_ratings));
		//school_rate = response.school_ratings;
		a_tags = "";
		for (var i=0; i<school_rate.length; i++)
			a_tags += "<div class='rating-div'><div class='rating-name'><p class='profile_info'>" + school_rate[i].name + "</p></div><div class='rating-value'>" + centsRating("school_rate", school_rate[i].name) + "</div></div>";
			//a_tags += "<p class='profile_info'>" + school_rate[i].name + "\t\t\t" + school_rate[i].rating + "</p>";
		$("#ac-4").attr("onclick", "setHeight('ac-4', '#school_ratings'," + school_rate.length + ")");
		document.getElementById("ac-4").value = "0";
		$("#school_ratings").html(a_tags);
		setRatings(school_rate);

		//career ratings
		career_rate = JSON.parse(JSON.stringify(response.career_ratings));
		//school_rate = response.school_ratings;
		a_tags = "";
		for (var i=0; i<career_rate.length; i++)
			a_tags += "<div class='rating-div'><div class='rating-name'><p class='profile_info'>" + career_rate[i].name + "</p></div><div class='rating-value'>" + centsRating("career_rate", career_rate[i].name) + "</div></div>";
			//a_tags += "<p class='profile_info'>" + school_rate[i].name + "\t\t\t" + school_rate[i].rating + "</p>";
		$("#ac-5").attr("onclick", "setHeight('ac-5', '#career_ratings'," + career_rate.length + ")");
		document.getElementById("ac-5").value = "0";
		$("#career_ratings").html(a_tags);
		setRatings(career_rate);
	});

	//user site progress
	$.get("/api/v2/users/" + user_id + "/completed", function(response){ 
		//console.log(response);
		to_do = [];
		for (var i=0; i<progress_cats.length; i++)
		{
			if (response.indexOf(progress_cats[i]) < 0)
				to_do[to_do.length] = progress_cats[i];
		}
		console.log(progress_cats);
		console.log(to_do);
		console.log(response);

	});	


});

function setRatings(ratings) {
	for (var index in ratings)
	{
		var obj = ratings[index];
		var name = obj.name.replace(/ /g, "_");
		for (var j=1; j<=obj.rating; j++)
			$("#" + name + "_" + j).css("fill", color);
		for (var i=5; i>obj.rating; i--)
		$("#" + name + "_" + i).css("fill", "#DDDDDD");
	}
};

function centsRating(field, name) {
	name_new = name.replace(/ /g, "_");
	var rate = "";
	for (var i=1; i<6; i++)
	{
		rate += "<svg style='width: 20px; position:absolute; height:20px; margin-top:7px; margin-left:" + (i-1) * 20 + "px;' ";
		rate += "onmouseleave='setRatings(" + field + ")' ";
		rate += "onclick='updateRating(" + field + ",&quot;" + name + "&quot;," + i + ")' ";
		rate += "onmouseover='colorChange(" + i + ", &quot;" + name_new + "&quot;)'>";
		rate += buildCent(i, name_new);
		rate += "</svg>";
	}
	return rate;
};

function colorChange(num, name) {
	for (var i=1; i<num+1; i++)
		$("#" + name + "_" + i).css("fill", color);
	for (var i=5; i>num; i--)
		$("#" + name + "_" + i).css("fill", "#DDDDDD");
};

function updateRating(field, name, num) {
	var level;
	for (var index in field)
	{
		if (field[index].name == name)
		{
			field[index].rating = num;
			if (field == degree_rate)
				level = field[index].level;
			break;
		}
	}
	setRatings(field);

	var name_prep = name.replace(/ /g, "%20");
	if (field == school_rate)
	{
		$.ajax({
    		url: "/api/v2/schools/" + name_prep + "/" + num,
    		type: 'PUT',
    		data: {"user": user_id}
		});
	}
	if (field == degree_rate)
	{
		var level_prep = level.replace(/ /g, "%20");
		$.ajax({
    		url: "/api/v2/degrees/" + level_prep + "/" + name_prep + "/" + num,
    		type: 'PUT',
    		data: {"user": user_id}
		});
	}
	if (field == career_rate)
	{
		$.ajax({
    		url: "/api/v2/careers/" + name_prep + "/" + num,
    		type: 'PUT',
    		data: {"user": user_id}
		});
	}
};

function buildCent(num, name) {

	var cent = "<ellipse id='" + name + "_" + num + "' style='fill:#DDDDDD' id='circle10' cy='8.865243' cx='8.865243' class='fil0' rx='8.865243' ry='8.865243'/>";
	cent += "<path style='fill:#fefefe;fill-rule:nonzero' d='m 12.553192,10.212769 c -0.283688,0.92199 -0.780141,1.631206 -1.347517,2.127659 -0.567376,0.496456 -1.3475183,0.709231 -2.3404262,0.709231 -0.7801419,0 -1.4184399,-0.1419 -1.9148937,-0.425535 C 6.3829792,12.340428 5.9574473,11.843975 5.6737591,11.134759 5.3191493,10.496464 5.1773054,9.6453943 5.1773054,8.7234199 c 0,-0.5673904 0.070923,-1.1347653 0.2127659,-1.6312053 C 5.5319157,6.5957598 5.6737591,6.2411448 5.8865253,5.8865298 6.0992913,5.6028348 6.312057,5.3191701 6.5957451,5.106395 6.879433,4.893635 7.1631209,4.7517801 7.5177309,4.6099401 7.8723411,4.4680402 8.3687948,4.3971651 8.9361708,4.3971651 c 1.7730502,0 2.9787242,0.8510699 3.5460992,2.4822745 l -0.992907,0.1419 C 11.134753,5.8156548 10.283689,5.1773601 8.9361708,5.1773601 c -0.4255318,0 -0.780142,0.070949 -1.134752,0.2127748 -0.3546099,0.1418999 -0.6382979,0.3546001 -0.8510637,0.7092149 -0.212766,0.28368 -0.425532,0.6382949 -0.4964539,1.0638298 -0.1418445,0.42552 -0.2127661,0.8510548 -0.2127661,1.3475103 0,1.0638288 0.2127661,1.9858191 0.70922,2.6241141 0.4964538,0.638295 1.1347518,0.992911 1.9858157,0.992911 1.2765962,0 2.1276602,-0.709231 2.6950362,-2.1985807 l 0.921985,0.1418997 z'/>";
	cent += "<rect style='fill:#fefefe' height='1.3783751' width='0.91596466' y='2.6241159' x='8.1560297' />";
	cent += "<path style='fill:#fefefe' d='m 9.0780147,17.730498 c -0.070921,0 -0.1418446,0 -0.2127659,0 -0.212766,0 -0.496454,0 -0.70922,0 l 0,-4.184399 0.9219859,0 0,4.184399 z'/>";
	return cent;
}


function setHeight(id1, id2, len) {
	if (document.getElementById(id1).value == "0")
	{
		document.getElementById(id1).value = "1";
		if (len != 0)
			$(id2).height(Math.min(310, 30 + len * 30));
		else
			$(id2).height(0);
	}
	else
	{
		document.getElementById(id1).value = "0";
		$(id2).height(0);
	}
};

function getPixels() {
	c = context.getImageData(x,y,1,1).data;
	document.getElementById("new_div").style.backgroundColor = "rgb(" + c[0] + "," + c[1] + "," + c[2] + ")";	
	colorScale();
	$("#color_points").val(8);
};

function getPosition(event) {
	x = event.x;
	y = event.y;

	//firefox support
	if (isNaN(x) || isNaN(y))
	{
		x = event.clientX;
		y = event.clientY;
	}

	var offset = $("#color_picker").offset();

	x -= (offset.left - $(window).scrollLeft());
	y -= (offset.top - $(window).scrollTop());
};

function hex(x) {
	var hexDigits = ["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"];
	return isNaN(x) ? "00" : hexDigits[(x - x % 16) / 16] + hexDigits[x % 16];
}

function applyColor() {
	//save to local storage
	//document.getElementByClass("navbar-cents").style.backgroundColor = document.getElementById("new_div").style.backgroundColor;
	document.getElementById("old_div").style.backgroundColor = document.getElementById("new_div").style.backgroundColor;
	color_array = jQuery.parseJSON(unescape(localStorage.getItem("colors")));
	new_colors = {};
	if (color_array == null)
	{
		//set all hex and rgb for both primary and secondary
		if (primary)
		{
			$('.navbar-cents').css({"background-color":document.getElementById("new_div").style.backgroundColor});
			$('.dropdown-menu').css({"background-color":document.getElementById("new_div").style.backgroundColor});
			var rgb = c[2] | (c[1] << 8) | (c[0] << 16); 
			new_colors["p_hex"] = "#" + hex(c[0]) + hex(c[1]) + hex(c[2]);
			color = "#" + hex(c[0]) + hex(c[1]) + hex(c[2]);
			new_colors["p_rgb"] = [c[0], c[1], c[2]];
			new_colors["s_hex"] = "#8A8889";
			new_colors["s_rgb"] = [138, 136, 137];
		}
		else
		{
			var rgb = c[2] | (c[1] << 8) | (c[0] << 16); 
			new_colors["p_hex"] = "#884412";
			new_colors["p_rgb"] = [136, 68, 18];
			new_colors["s_hex"] = "#" + hex(c[0]) + hex(c[1]) + hex(c[2]);
			new_colors["s_rgb"] = [c[0], c[1], c[2]];
		}
	}
	else
	{
		if (primary)
		{
			$('.navbar-cents').css({"background-color":document.getElementById("new_div").style.backgroundColor});
			$('.dropdown-menu').css({"background-color":document.getElementById("new_div").style.backgroundColor});
			var rgb = c[2] | (c[1] << 8) | (c[0] << 16); 
			new_colors["p_hex"] = "#" + hex(c[0]) + hex(c[1]) + hex(c[2]);
			color = "#" + hex(c[0]) + hex(c[1]) + hex(c[2]);
			new_colors["p_rgb"] = [c[0], c[1], c[2]];
			new_colors["s_hex"] = color_array["s_hex"];
			new_colors["s_rgb"] = color_array["s_rgb"];
		}
		else
		{
			var rgb = c[2] | (c[1] << 8) | (c[0] << 16); 
			new_colors["p_hex"] = color_array["p_hex"];
			new_colors["p_rgb"] = color_array["p_rgb"];
			new_colors["s_hex"] = "#" + hex(c[0]) + hex(c[1]) + hex(c[2]);
			new_colors["s_rgb"] = [c[0], c[1], c[2]];
		}
	}
	localStorage.setItem("colors", JSON.stringify(new_colors));
	setRatings(school_rate);
	setRatings(degree_rate);
	setRatings(career_rate);


};

function resetColor() {
	//reset to cents orange
	if (localStorage.getItem("colors"))
	{
		new_colors = {};
		color_array = jQuery.parseJSON(unescape(localStorage.getItem("colors")));
		if (primary)
		{
			document.getElementById("new_div").style.backgroundColor = "rgb(136, 68, 18)";
			$('.navbar-cents').css({"background-color":document.getElementById("new_div").style.backgroundColor});
			$('.dropdown-menu').css({"background-color":document.getElementById("new_div").style.backgroundColor});
			document.getElementById("old_div").style.backgroundColor = document.getElementById("new_div").style.backgroundColor;
			var rgb = c[2] | (c[1] << 8) | (c[0] << 16); 
			new_colors["p_hex"] = "#884412";
			new_colors["p_rgb"] = [136, 68, 18];
			new_colors["s_hex"] = color_array["s_hex"];
			new_colors["s_rgb"] = color_array["s_rgb"];
			c = [136, 68, 18];
			color = "#884412";
		}
		else
		{
			document.getElementById("new_div").style.backgroundColor = "rgb(138, 136, 137)";
			document.getElementById("old_div").style.backgroundColor = document.getElementById("new_div").style.backgroundColor;
			var rgb = c[2] | (c[1] << 8) | (c[0] << 16); 
			new_colors["p_hex"] = color_array["p_hex"];
			new_colors["p_rgb"] = color_array["p_rgb"];
			new_colors["s_hex"] = "#8A8889";
			new_colors["s_rgb"] = [138, 136, 137];
			c = [138, 136, 137];
		}
		localStorage.setItem("colors", JSON.stringify(new_colors));
		colorScale();
	}
	setRatings(school_rate);
	setRatings(degree_rate);
	setRatings(career_rate);
};

function sliderChange() {
	var index = $("#color_points").val();
	var color = $("#scale_" + index).css("background-color");
	document.getElementById("new_div").style.backgroundColor = color;
	color = color.substring(4, color.length-1);
	color = color.replace(",", "");
	color = color.split(" ");
	c[0] = parseInt(color[0]);
	c[1] = parseInt(color[1]);
	c[2] = parseInt(color[2]);
};

function primaryShow() {
	$("#primary_btn").attr("class", "btn btn-color_select");
	$("#secondary_btn").attr("class", "btn btn-color_not_select");
	primary = true;
	//set c to primary color in local storage or default, set new and old color divs
	if (localStorage.getItem("colors"))
	{
		var c_store = jQuery.parseJSON(unescape(localStorage.getItem("colors")));
		document.getElementById("new_div").style.backgroundColor = c_store["p_hex"];
		document.getElementById("old_div").style.backgroundColor = c_store["p_hex"];
		c = c_store["p_rgb"];
	}
	else
	{
		document.getElementById("new_div").style.backgroundColor = "#884412";
		document.getElementById("old_div").style.backgroundColor = "#884412";
		c = [136, 68, 18];
	}
	colorScale();
};

function secondaryShow() {
	$("#primary_btn").attr("class", "btn btn-color_not_select");
	$("#secondary_btn").attr("class", "btn btn-color_select");
	primary = false;
	//set c to secondary color in local storage or default, set new and old color divs
	if (localStorage.getItem("colors"))
	{
		var c_store = jQuery.parseJSON(unescape(localStorage.getItem("colors")));
		document.getElementById("new_div").style.backgroundColor = c_store["s_hex"];
		document.getElementById("old_div").style.backgroundColor = c_store["s_hex"];
		c = c_store["s_rgb"];
	}
	else
	{
		document.getElementById("new_div").style.backgroundColor = "#8A8889";
		document.getElementById("old_div").style.backgroundColor = "#8A8889";
		c = [138, 136, 137];
	}
	colorScale();
};

function updateScale(index) {
	var color = $("#scale_" + index).css("background-color");
	document.getElementById("new_div").style.backgroundColor = color;
	color = color.substring(4, color.length-1);
	color = color.replace(",", "");
	color = color.split(" ");
	c[0] = parseInt(color[0]);
	c[1] = parseInt(color[1]);
	c[2] = parseInt(color[2]);
	$("#color_points").val(8);
	colorScale();
};

function colorScale() {
	//get primary or secondary from
	for (var i=1; i<9; i++)
		document.getElementById("scale_" + i).style.backgroundColor = "rgb(" + Math.round(c[0]*mods_high[i-1]) + "," + Math.round(c[1]*mods_high[i-1]) + "," + Math.round(c[2]*mods_high[i-1]) + ")";
	for (var i=9; i<16; i++)
		document.getElementById("scale_" + i).style.backgroundColor = "rgb(" + (c[0]+Math.round((255-c[0])*mods_low[i-8])) + "," + (c[1]+Math.round((255-c[1])*mods_low[i-8])) + "," + (c[2]+Math.round((255-c[2])*mods_low[i-8])) + ")";
};