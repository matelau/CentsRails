var canvas, context, imageObj, x, y, primary, c;

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
	imageObj.src = '/assets/color wheel tiny 2.png';
	//get color from local storage if it exists, set old and new to that stored color
	document.getElementById("new_div").style.backgroundColor = "#884412";
	document.getElementById("old_div").style.backgroundColor = "#884412";
	c = [136, 68, 18];
	colorScale();
});

function getPixels() {
	c = context.getImageData(x,y,1,1).data;
	document.getElementById("new_div").style.backgroundColor = "rgb(" + c[0] + "," + c[1] + "," + c[2] + ")";	
	colorScale();
	$("#color_points").val(8);
};

function getPosition(event) {
	x = event.x;
	y = event.y;

	if (isNaN(x) || isNaN(y))
	{
		x = event.clientX;
		y = event.clientY;
	}

	var offset = $("#color_picker").offset();

	x -= (offset.left - $(window).scrollLeft());
	y -= (offset.top - $(window).scrollTop());
	//x -= 45;
	//y += 68;

	console.log(x, y, offset.left, offset.top);
};

function applyColor() {
	//save to local storage
	//document.getElementByClass("navbar-cents").style.backgroundColor = document.getElementById("new_div").style.backgroundColor;
	$('.navbar-cents').css({"background-color":document.getElementById("new_div").style.backgroundColor});
	$('.dropdown-menu').css({"background-color":document.getElementById("new_div").style.backgroundColor});
	document.getElementById("old_div").style.backgroundColor = document.getElementById("new_div").style.backgroundColor;
};

function resetColor() {
	//reset to cents orange
};

function primaryShow() {
	$("#primary_btn").attr("class", "btn btn-color_select");
	$("#secondary_btn").attr("class", "btn btn-color_not_select");
};

function sliderChange() {
	var index = $("#color_points").val();
	var color = $("#scale_" + index).css("background-color");
	document.getElementById("new_div").style.backgroundColor = color;
}

function secondaryShow() {
	$("#primary_btn").attr("class", "btn btn-color_not_select");
	$("#secondary_btn").attr("class", "btn btn-color_select");
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
	{
		document.getElementById("scale_" + i).style.backgroundColor = "rgb(" + Math.round(c[0]*mods_high[i-1]) + "," + Math.round(c[1]*mods_high[i-1]) + "," + Math.round(c[2]*mods_high[i-1]) + ")";
	}
	for (var i=9; i<16; i++)
	{
		document.getElementById("scale_" + i).style.backgroundColor = "rgb(" + (c[0]+Math.round((255-c[0])*mods_low[i-8])) + "," + (c[1]+Math.round((255-c[1])*mods_low[i-8])) + "," + (c[2]+Math.round((255-c[2])*mods_low[i-8])) + ")";
	}
};