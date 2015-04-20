var slider;



$(document).ready(function() {
	slider = new IdealImageSlider.Slider('#examples_slider');
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

var city_searches = ["Dallas, TX vs Madison, WI", "Salt Lake City, UT vs Phoenix, AZ", "Chicago, IL vs Miami, FL", "San Francisco, CA vs San Jose, CA"];

var major_searches = ["Accounting vs Economics", "Computer Science Bachelor vs Computer Engineering Bachelor", 
						"Computer Engineering (Bachelor Degree) vs Computer Engineering (Master Degree)", "English Literature (Bachelor Degree) vs Physical Education Teaching (Bachelor Degree)"];

var school_searches = ["BYU vs University of Utah", "Stanford vs MIT", "Bama vs LSU", "Colorado School of Mines vs University of Colorado"];

var career_searches = ["Software Developer vs Web Developer", "Account Manager vs Account Executive", "Economist vs Accountant", "General Surgeon vs Anesthesiologist"];

function popular_populate(type) {
	if (type == "city")
		document.getElementById("search").value = city_searches[Math.floor(Math.random() * city_searches.length)];
	if (type == "major")
		document.getElementById("search").value = major_searches[Math.floor(Math.random() * major_searches.length)];
	if (type == "school")
		document.getElementById("search").value = school_searches[Math.floor(Math.random() * school_searches.length)];
	if (type == "career")
		document.getElementById("search").value = career_searches[Math.floor(Math.random() * career_searches.length)];
	if (type == "spend")
		document.getElementById("search").value = "What can I afford with my salary?";
};
