var slider;

$(document).ready(function() {
	slider = new IdealImageSlider.Slider('#examples_slider');
	slider.addCaptions();
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
	//console.log(document.getElementById('#examples_slider').src);
	//console.log(type);
	document.getElementById("search").value = type;
};
