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
	if (type == "city")
		document.getElementById("search").value = "Dallas, TX vs Madison, WI";
	if (type == "major")
		document.getElementById("search").value = "Computer Science vs Civil Engineering";
	if (type == "school")
		document.getElementById("search").value = "Stanford vs Bama";
	if (type == "career")
		document.getElementById("search").value = "future career seach";
	if (type == "spend")
		document.getElementById("search").value = "What can I afford with my salary?";
};
