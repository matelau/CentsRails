var slider;

$(document).ready(function() {
	slider = new IdealImageSlider.Slider('#examples_slider');
	//set all caption tags
	//document.getElementById("career").setAttribute("data-caption", "CLICK FOR A POPULAR CAREER COMPARISON");
	// document.getElementById("city").setAttribute("data-caption", "CLICK FOR A POPULAR CITY COMPARISON");
	// document.getElementById("spend").setAttribute("data-caption", "CLICK FOR A POPULAR SPENDING BREAKDOWN");
	// document.getElementById("major").setAttribute("data-caption", "CLICK FOR A POPULAR MAJOR COMPARISON");
	// document.getElementById("school").setAttribute("data-caption", "CLICK FOR A POPULAR SCHOOL COMPARISON");
	//slider.addCaptions();
    slider.start();
});

$(window).focus(function() {
    slider.start();
});

function stopSlider() {
	slider.stop();
};

function startSlider() {
	slider.start();
};

function popular_populate(type) {
	var idx = Math.floor(Math.random() * 6);
	if (type == "city")
	{
		var arr = ["Dallas, TX vs Madison, WI","Las Vegas vs Seattle","slc vs sf","Boston, MA vs Detroit, MI","Omaha, NE vs NYC"];
		document.getElementById("search").value = arr[idx];
	}
	if (type == "major")
	{
		var arr = ["Computer Science vs Civil Engineering","Art History","Business Management Bachelors","Law","Computer Science Masters"];
		document.getElementById("search").value = arr[idx];
	}
	if (type == "school")
	{
		var arr = ["LSU vs Bama","U of U vs BYU","Harvard","Princeton vs Yale","UCLA vs Stanford"];
		document.getElementById("search").value = arr[idx];
	}
	if (type == "career")
	{
		var arr = ["Software Developer vs Account Manager","Registered Nurse","Director of Operations","Anesthesiologist vs General Surgeon","Sales Associate"];
		document.getElementById("search").value = arr[idx];
	}
	if (type == "spend")
	{
		document.getElementById("search").value = "What can I afford with a salary of 35,000?";
	}
};
