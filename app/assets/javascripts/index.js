var slider;

$(document).ready(function() {
	slider = new IdealImageSlider.Slider('#examples_slider');
    slider.start();
});

$(window).focus(function() {
	//slider = new IdealImageSlider.Slider('#examples_slider');
    slider.start();
});

$(window).blur(function() {
	//slider.stop();
	slider.destroy();
	slider = new IdealImageSlider.Slider('#examples_slider');
});

function stopSlider() {
	slider.stop();
};

function startSlider() {
	slider.start();
};

function popular_populate(type) {
	var idx = Math.floor(Math.random() * 5);
	if (type == "city")
	{
		var arr = ["Dallas, TX vs Madison, WI","Las Vegas, NV vs Seattle, WA","slc vs sf","Boston vs Detroit","Omaha, NE vs NYC"];
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
		var arr = ["Software Developer vs Account Manager","Registered Nurse","Director of Operations","Anesthesiologist vs Surgeon","Sales Associate"];
		document.getElementById("search").value = arr[idx];
	}
	if (type == "spend")
	{
		document.getElementById("search").value = "What can I afford with a salary of 35,000?";
	}
};
