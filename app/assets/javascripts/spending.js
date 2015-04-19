var data, hide_1, hide_2, main, gray, font, spending_sum, spending_income, tab_color, c;

var sketch = new Processing.Sketch();

function sketchProc(processing) {
	
	processing.setup = function() {
		if (user_id)
			$.post("/api/v2/users/" + user_id + "/completed?api_key=" + api_key, {"section": "View Spending Breakdown"});
		//console.log("loaded spending.js successfully");
		if (sessionStorage.getItem("colors"))
		{
			c = jQuery.parseJSON(unescape(sessionStorage.getItem("colors")));
			main = processing.color(c["p_rgb"][0], c["p_rgb"][1], c["p_rgb"][2]);
			gray = processing.color(c["s_rgb"][0], c["s_rgb"][1], c["s_rgb"][2]);
			tab_color = c["p_rgb"];
		}
		else
		{

			main = processing.color(136, 68, 18);
			gray = processing.color(138, 136, 137);
			tab_color = [136, 68, 18];
		}


		processing.size(655,375);
		hide_1 = false;
		hide_2 = false;
		//load font
		font = processing.loadFont("Roboto");
		processing.textFont(font, 12);

		data = new Array();

		//setup if type is spending breakdown
		spending_selected = "default";

		//objects holding default spending quantities
		default_categories = {	'default':{"Taxes":0, "Food":17, "Housing":25, "Utilities":6, "Transportation":12, "Healthcare":5, "Insurance":8, "Personal_Debt":12, "Savings":10, "Misc":5},
								'student':{"Taxes":0, "Food":14, "Housing":21, "Utilities":6, "Transportation":12, "Tuition":25, "Books":6, "Savings":8, "Misc":8},
								'custom':{"Taxes":0, "Food":17, "Housing":25, "Utilities":6}
		};

		spending_categories = {	'default':{"Taxes":0, "Food":17, "Housing":25, "Utilities":6, "Transportation":12, "Healthcare":5, "Insurance":8, "Personal_Debt":12, "Savings":10, "Misc":5},
								'student':{"Taxes":0, "Food":14, "Housing":21, "Utilities":6, "Transportation":12, "Tuition":25, "Books":6, "Savings":8, "Misc":8},
								'custom':{"Taxes":0, "Food":17, "Housing":25, "Utilities":6}
		};

		pie_colors = new Array();
		pie_colors = [	processing.color(122,59,63), processing.color(110,118,135), processing.color(0,171,169), processing.color(170,0,255),
						processing.color(216,193,0), processing.color(229,20,0), processing.color(244,114,208), processing.color(250,104,0),
						processing.color(241,88,84), processing.color(109,135,100), processing.color(118,96,138), processing.color(0,138,0),
						processing.color(96,169,23), processing.color(106,0,255), processing.color(164,196,0), processing.color(216,0,115),
						processing.color(27,161,226), processing.color(162,0,37), processing.color(130,90,44), processing.color(240,163,10)];

		shuffle(pie_colors);


		if (sessionStorage.getItem("income") == undefined || sessionStorage.getItem("income") == "" || isNaN(sessionStorage.getItem("income")))
			spending_income = 45000;
		else
			spending_income = sessionStorage.getItem("income") * 1.00;

		calculateTaxes();
		rebuildPercentages();

		buildCategories();
		document.getElementById("income_value").value = (spending_income).toFixed(0);
	};


	processing.draw = function() {
		processing.background(255);

		var num_cats = Object.keys(spending_categories[spending_selected]).length;
		
		var start = 205-20*processing.round((num_cats)/2-1);
		var count = 0;

		var temp_sum = 0;
		for (key in spending_categories[spending_selected])
			temp_sum += spending_categories[spending_selected][key];
		spending_sum = temp_sum;

		processing.textAlign(processing.CENTER);
		processing.fill(0);
		processing.text("SUGGESTED MONTHLY SPENDING", 335, 25);
		processing.text("UPDATE INCOME BELOW, CATEGORY AND TEMPLATE CUSTOMIZATION ON RIGHT", 335, 365);

		//draw key with colors
		processing.noStroke();
		processing.textAlign(processing.RIGHT);
		for (key in spending_categories[spending_selected])
		{
			processing.fill(0);
			processing.text(key.replace(/_/g, " ").toUpperCase(), 155, (count*18)+start);
			processing.fill(pie_colors[count]);
			processing.rect(160, (count*18)+start-10, 20, 10, 3);
			count++;
		}

		//convert data into angles for pie chart
		var angles = new Array(num_cats);
		count = 0;
		for (key in spending_categories[spending_selected])
		{
			angles[count] = (spending_categories[spending_selected][key]/spending_sum)*360;
			count++;
		}
		//draw pie chart
		var lastAngle = 0.0;
		processing.stroke(255);
		processing.strokeWeight(1);
  		for (var i = 0; i < angles.length; i++) {
    		processing.fill(pie_colors[i]);
    		processing.arc(420, 190, 290, 290, lastAngle, lastAngle+processing.radians(angles[i]));
    		lastAngle += processing.radians(angles[i]);
  		}

  		//draw white circle on top for allocation info
  		processing.noStroke();
  		processing.fill(255);
  		processing.ellipse(420, 190, 220, 220);

  		//determine and show if over/under spending for the month
  		processing.textAlign(processing.CENTER);
		if (spending_sum.toFixed(2) < 100)
		{
			processing.fill(0);
			processing.textFont(font, 12);
			processing.text("UNDER", 420, 170);
			processing.text("BUDGET", 420, 230);
			processing.fill(0,200,0);
			processing.textFont(font, 36);
			processing.text("$" + String((spending_income*(100-spending_sum)/1200).toFixed(0)), 415, 208);
		}
		//spending more than making
		else if (spending_sum.toFixed(2) > 100)
		{
			processing.fill(0);
			processing.textFont(font, 12);
			processing.text("OVER", 420, 170);
			processing.text("BUDGET", 420, 230);
			processing.fill(200,0,0);
			processing.textFont(font, 36);
			processing.text("$" + String((spending_income*(spending_sum-100)/1200).toFixed(0)), 415, 208);

		}
		else
		{
			//maybe add something stating they are on budget (?)
		}

		//reset font
		processing.textFont(font, 12);
	};

};

function shuffle(o){
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};


function buildCategories() {
	//build field and labels for all currently selected spending categories
	for (key in spending_categories[spending_selected])
	{
		var add = "<ul id='" + key + "_list_item' style='list-style-type: none; padding: 0; width:280px; height:30px;'>";
		if (key != "Taxes")
		{	
			add += "<li style='display:inline;'><input class='update_spend' id='" + key + "_field' oninput='spendingVal(&quot;" + key +"&quot;)' type='text'/></li>";
			//add += "<li style='display:inline;'><a style='padding-left:5px' onclick='deleteCategory(&quot;" + key + "&quot;)'><img src='/assets/svg/x.svg' height='10' width='10'></a></li>";
			//add += "<li style='display:inline;'><a style='padding-left:5px' onclick='deleteCategory(&quot;" + key + "&quot;)'>";
			add += "<li style='display:inline;'>";
			add += "<svg onclick='deleteCategory(&quot;" + key + "&quot;)' height='15px' width='15px' style='padding-left:3px; padding-top:3px'>";
			add += "<path class='fil0' d='M 0.49824641,11.476595 0.25881484,11.239868 C 0.01938328,11.003141 0.13639403,10.645347 0.25476126,10.52563 L 4.8709305,5.8567194 0.20201913,1.2405466 C -0.03741244,1.0038201 0.0795983,0.64602507 0.19796555,0.52630955 L 0.43469208,0.28687796 C 0.67141861,0.04744637 1.0292137,0.16445708 1.1489292,0.28282415 L 5.817841,4.8989948 10.434013,0.23008298 c 0.236727,-0.23943145 0.594522,-0.12242048 0.714237,-0.004058 l 0.239432,0.23672664 c 0.239432,0.23672651 0.122421,0.59452151 0.0041,0.71423711 L 6.7755632,5.8459011 11.444475,10.462074 c 0.239431,0.236726 0.12242,0.594521 0.0041,0.714237 l -0.236731,0.239431 c -0.236727,0.239432 -0.594522,0.122418 -0.714237,0.004 L 5.8286561,6.8036266 1.2124836,11.472538 c -0.23672656,0.239432 -0.59452167,0.122418 -0.71423719,0.004 z'";
			add += " id='path10' style='fill-opacity:1'/>";
			add += "</svg></li>";
			add += "<li style='display:inline;'><a style='padding-left:5px' onclick='lockToggle(&quot;" + key + "&quot;)'><img src='/assets/unlock-gray.png' value='false' id='" + key + "_lock' height='15' width='11'></a></li>";
		}
		//if it is the taxes field, dont allow changes/delete or locking
		else
			add += "<li style='display:inline;'><input class='tax_spend' id='" + key + "_field' readonly type='text'/></li>";
		add += ("<li style='display:inline;'><p style='display:inline; float:left; margin:10px 0px 0px 0px; width:140px; text-align:right;'>" + key.toUpperCase().replace(/_/g, " ") + "</p></li></ul>");
		$(add).appendTo("#category_list");
		//add the appropriate values into the text fields
		if (spending_sum <= 0)
			document.getElementById(key + "_field").value = (0).toFixed(0);
		else
			document.getElementById(key + "_field").value = ((spending_categories[spending_selected][key]/100)*(spending_income/12)).toFixed(0);
	}
	if (sessionStorage.getItem("colors"))
	{
		$('.update_spend').css({"border-bottom-color":c["p_hex"]});
		$('.tax_spend').css({"border-bottom-color":c["p_hex"]});
		$('.fil0').css({"fill":c["p_hex"]});
	}
	else
	{
		$('.update_spend').css({"border-bottom-color":"#884412"});
		$('.tax_spend').css({"border-bottom-color":"#884412"});
		$('.fil0').css({"fill":"#884412"});
	}
};

function spendingVal(category) {
	var temp_val = document.getElementById(category + "_field").value;

	//check to make sure a valid number is in the field
	if (isNaN(temp_val) || temp_val < 0.0)
		window.alert("Invalid entry detected. Please enter a positive number.");

	//if it is valid, update the stored value, recalculate income allocation amount
	else
	{
		spending_categories[spending_selected][category] = (temp_val*12)/spending_income*100;
		var temp_sum = 0;
		for (key in spending_categories[spending_selected])
			temp_sum += spending_categories[spending_selected][key];
		spending_sum = temp_sum;
	}
};

function updateIncome() {
	if (user_id)
		$.post("/api/v2/users/" + user_id + "/completed?api_key=" + api_key, {"section": "Create Custom Spending"});
	var temp_income = document.getElementById("income_value").value;
	if (temp_income == 0 || isNaN(temp_income))
		temp_income = 0.001;

	//reset values to initial
	for (key_1 in spending_categories)
	{
		var old_tax = spending_categories[key_1]["Taxes"];
		for (key_2 in spending_categories[key_1])
		{
			if (key_2 != "Taxes")
			{
				spending_categories[key_1][key_2] = (spending_categories[key_1][key_2]*100/(100-old_tax));
			}
		}
	}

	//calculate taxes for new income, then rebuild the values according to the new allocation
	spending_income = temp_income;
	sessionStorage.setItem("income", spending_income);
	calculateTaxes();
	rebuildPercentages();
	//populate the fields with the rebuilt values
	for (key in spending_categories[spending_selected])
	{
		document.getElementById(key + "_field").value = ((spending_categories[spending_selected][key]/100)*(temp_income/12)).toFixed(0);
	}
};

function calculateTaxes() {
	if (spending_income < 9075)
	{
		spending_categories[spending_selected]["Taxes"] = 0.0;
	}
	else
	{
		//tax brackets and corresponding percentages
		var brackets = [0, 9075, 36900, 89350, 186350, 405100, 406750];
		var percents = [0.0, 0.2, 0.25, 0.35, 0.38, 0.43, 0.45, 0.496];
		var taxed_income = 0.0;
		var max_index = 0;
		//get max tax bracket
		for (; max_index<6; max_index++)
		{
			if (spending_income < brackets[max_index])
			{
				max_index--;
				break;
			}
		}
		var i=1;
		//determine how much tax will be paid
		for (;i<max_index+1; i++)
		{
			taxed_income += (percents[i]*(brackets[i]-brackets[i-1]));
		}
		taxed_income += (percents[i]*(spending_income-brackets[i-1]));
		//convert taxed income to actual tax rate
		for (key in spending_categories)
		{
			spending_categories[key]["Taxes"] = (taxed_income/spending_income)*100;
		}
	}
};

function rebuildPercentages() {
	//category percentages need to be updated to fit within the new available income after taxes
	for (key_1 in spending_categories)
	{
		for (key_2 in spending_categories[key_1])
		{
			if (key_2 != "Taxes")
			{
				if ($("#" + key_2 + "_lock").attr("value") == "true" && spending_selected == key_1)
				{
					spending_categories[key_1][key_2] = document.getElementById(key_2 + "_field").value*1200/spending_income;
				}
				else
					spending_categories[key_1][key_2] = (spending_categories[key_1][key_2]/100)*(100-spending_categories[key_1]["Taxes"]);
			}
		}
	}
};

function lockToggle(category) {
	if ($("#" + category + "_lock").attr("value") == "false")
	{
		$("#" + category + "_lock").attr("value", "true");
		$('<img/>').attr('src', '/assets/locks.png').load(function() {
			$("#" + category + "_lock").attr("src", "/assets/locks.png");
    		$("#" + category + "_lock").css("background-color", tab_color);
		});
		
		
	}
	else
	{
		$("#" + category + "_lock").css("background-color", "#EEEEEE");
		$("#" + category + "_lock").attr("value", "false");
		$("#" + category + "_lock").attr("src", "/assets/unlock-gray.png");
	}
};

function deleteCategory(category) {
	if (user_id)
		$.post("/api/v2/users/" + user_id + "/completed?api_key=" + api_key, {"section": "Create Custom Spending"});
	$("#" + category + "_list_item").remove();
	spending_sum -= spending_categories[spending_selected][category];
	delete spending_categories[spending_selected][category];
	document.getElementById("add_cat_button").text = "ADD CATEGORY";
	$("#add_cat_button").removeAttr("disabled");	
};

function addCategoryField() {
	if (!document.getElementById("category_name"))
	{
		var add = "<ul id='new_category' style='list-style-type: none; padding: 0; width:270px; height:30px;''>";
		add += "<li style='display:inline;'><input id='category_name' onkeyup='enterHit(event, &quot;btn1&quot;)' maxlength='15' type='text' style='width:140px; float:left;'></li>";
		//add += "<li style='display:inline;'><a onclick='addCategory()'><img src='/assets/check-color.png' height='12' width='14' style='margin-top:7px; margin-left:10px; margin-right:30px'></a></li>";
		//add += "<li style='display:inline;'><a onclick='cancelCategory()'><img src='/assets/delete-color.png' height='12' width='12'></a></li></ul>";
		add += "<li style='display:inline;'>";
		add += "<svg onclick='addCategory()' height='25px' width='15px' style='margin-right:25px; padding-top:7px'>";
		add += "<path d='M 12.848645,0.99652876 5.278586,10.541384 C 5.1140195,10.870517 4.6203201,11.19965 4.291187,10.705951 2.3031607,8.4106732 1.299973,7.1449481 0.17702515,5.7689568 c -0.1645665,-0.1645665 -0.1645665,-0.4936995 0,-0.658266 l 0.1645665,-0.1645665 c 0.1645665,-0.1645664 0.4936994,-0.1645664 0.6582659,0 L 4.6203201,9.2248532 11.696679,0.17369636 c 0.247294,-0.2266123 0.6302,-0.1562937 0.831994,-0.0124092 0.231524,0.1211298 0.579694,0.5170965 0.319972,0.8352416 z' class='fil0'/>";
		add += "</svg></li>";
		add += "<li style='display:inline;'>";
		add += "<svg onclick='cancelCategory()' height='25px' width='15px' style='padding-left:3px; padding-top:7px'>";
		add += "<path class='fil0' d='M 0.49824641,11.476595 0.25881484,11.239868 C 0.01938328,11.003141 0.13639403,10.645347 0.25476126,10.52563 L 4.8709305,5.8567194 0.20201913,1.2405466 C -0.03741244,1.0038201 0.0795983,0.64602507 0.19796555,0.52630955 L 0.43469208,0.28687796 C 0.67141861,0.04744637 1.0292137,0.16445708 1.1489292,0.28282415 L 5.817841,4.8989948 10.434013,0.23008298 c 0.236727,-0.23943145 0.594522,-0.12242048 0.714237,-0.004058 l 0.239432,0.23672664 c 0.239432,0.23672651 0.122421,0.59452151 0.0041,0.71423711 L 6.7755632,5.8459011 11.444475,10.462074 c 0.239431,0.236726 0.12242,0.594521 0.0041,0.714237 l -0.236731,0.239431 c -0.236727,0.239432 -0.594522,0.122418 -0.714237,0.004 L 5.8286561,6.8036266 1.2124836,11.472538 c -0.23672656,0.239432 -0.59452167,0.122418 -0.71423719,0.004 z'";
		add += " id='path10' style='fill-opacity:1'/>";
		add += "</svg></li></ul>";
		$(add).appendTo( "#category_list" );
		document.getElementById("category_name").focus();
		if (sessionStorage.getItem("colors"))
		{
			$('.fil0').css({"fill":c["p_hex"]});
		}
		else
			$('.fil0').css({"fill":"#884412"});
	}
};	

function enterHit(event) {
	event = event || window.event;
    if (event.keyCode == 13 && document.getElementById("category_name").value != "") 
    {
        addCategory();
        return;
    }
    else if (event.keyCode == 27)
    	cancelCategory();
    else if (!(/^[a-zA-Z0-9 ]+$/.test(document.getElementById("category_name").value)) && document.getElementById("category_name").value != "")
    {
    	window.alert("Only letters, numbers and spaces allowed.");
    	cancelCategory();
    	addCategoryField();
    	document.getElementById("category_name").blur();
    }
};

function addCategory() {
	if (document.getElementById("category_name").value == "")
	{
		window.alert("Category cannot be blank.");
		document.getElementById("category_name").blur();
	}
	else
	{
		var exist = false;
		//check to see if category already exists
		var new_category = document.getElementById("category_name").value;
		for (key in spending_categories[spending_selected])
		{
			if (key.replace(/ /g, "_").toUpperCase() == new_category.replace(/ /g, "_").toUpperCase())
			{
				exist = true;
				break;
			}
		}
		if(exist == true)
		{
			window.alert("Category already exists.");
			document.getElementById("category_name").blur();
		}
		else
		{
			if (user_id)
				$.post("/api/v2/users/" + user_id + "/completed?api_key=" + api_key, {"section": "Create Custom Spending"});
			var category = document.getElementById("category_name").value;
			var no_space = category.replace(/ /g, "_");
			var sanitized = category.replace(/&/g, '').replace(/</g, '').replace(/"/g, '');
			
			$("#new_category").remove();
			spending_categories[spending_selected][no_space] = 0.00;

			//add the new category to the html
			var add = "<ul id='" + no_space + "_list_item' style='list-style-type: none; padding: 0; width:280px; height:30px;'>";
			add += "<li style='display:inline;'><input class='update_spend' id='" + no_space + "_field' oninput='spendingVal(&quot;" + no_space +"&quot;)' pattern='[0-9.]+'' type='text'/></li>";
			add += "<li style='display:inline;'>"//<a style='padding-left:5px' onclick='deleteCategory(&quot;" + no_space + "&quot;)'>";
			add += "<svg onclick='deleteCategory(&quot;" + no_space + "&quot;)' height='15px' width='15px' style='padding-left:3px; padding-top:3px'>";
			add += "<path class='fil0' d='M 0.49824641,11.476595 0.25881484,11.239868 C 0.01938328,11.003141 0.13639403,10.645347 0.25476126,10.52563 L 4.8709305,5.8567194 0.20201913,1.2405466 C -0.03741244,1.0038201 0.0795983,0.64602507 0.19796555,0.52630955 L 0.43469208,0.28687796 C 0.67141861,0.04744637 1.0292137,0.16445708 1.1489292,0.28282415 L 5.817841,4.8989948 10.434013,0.23008298 c 0.236727,-0.23943145 0.594522,-0.12242048 0.714237,-0.004058 l 0.239432,0.23672664 c 0.239432,0.23672651 0.122421,0.59452151 0.0041,0.71423711 L 6.7755632,5.8459011 11.444475,10.462074 c 0.239431,0.236726 0.12242,0.594521 0.0041,0.714237 l -0.236731,0.239431 c -0.236727,0.239432 -0.594522,0.122418 -0.714237,0.004 L 5.8286561,6.8036266 1.2124836,11.472538 c -0.23672656,0.239432 -0.59452167,0.122418 -0.71423719,0.004 z'";
			add += " id='path10' style='fill-opacity:1'/>";
			add += "</svg></li>";
			//<img src='/assets/delete-color.png' height='9' width='9'></a></li>";
			add += "<li style='display:inline;'><a style='padding-left:5px' onclick='lockToggle(&quot;" + no_space + "&quot;)'><img src='/assets/unlock-gray.png' value='false' id='" + no_space + "_lock' height='15' width='11'></a></li>";
			add += ("<li style='display:inline;'><p style='display:inline; float:left; margin:10px 0px 0px 0px; width:140px; text-align:right;'>" + sanitized.toUpperCase() + "</p></li></ul>");
			$(add).appendTo("#category_list");

			document.getElementById(no_space + "_field").value = 0.00;

			//check to see if max number of categories has been met
			var count = 0;
			for (key in spending_categories[spending_selected])
				count++;
			if (count > 16)
			{
				document.getElementById("add_cat_button").text = "MAX CATEGORIES";
				$("#add_cat_button").attr("disabled", "true");
			}

			document.getElementById(no_space + "_field").focus();
		}
	}
	if (sessionStorage.getItem("colors"))
	{
		$('.update_spend').css({"border-bottom-color":c["p_hex"]});
		$('.tax_spend').css({"border-bottom-color":c["p_hex"]});
		$('.fil0').css({"fill":c["p_hex"]});
	}
	else
	{
		$('.update_spend').css({"border-bottom-color":"#884412"});
		$('.tax_spend').css({"border-bottom-color":"#884412"});
		$('.fil0').css({"fill":"#884412"});
	}
};

function cancelCategory() {
	$("#new_category").remove();		
};

function updateTemplate(template) {
	if (user_id)
		$.post("/api/v2/users/" + user_id + "/completed?api_key=" + api_key, {"section": "Create Custom Spending"});
	$('#' + spending_selected + "-button").css("cssText", "background-color: rgb(" + (tab_color[0]) + "," + (tab_color[1]) + "," + (tab_color[2]) + ")");
	$('#' + template + "-button").css("cssText", "background-color: rgb(" + (tab_color[0]-5) + "," + (tab_color[1]-5) + "," + (tab_color[2]-5) + ") !important");
	var temp_sum = 0;
	for (key in spending_categories[template])
		temp_sum += spending_categories[template][key];
	spending_sum = temp_sum;
	spending_selected = template;
	//clear out old categories first
	$("#category_list").empty();
	shuffle(pie_colors);
	buildCategories();
	
};

function resetCategories() {
	spending_categories[spending_selected] = {};
	for (var k1 in default_categories)
	{
		for (var k2 in default_categories[k1])
			spending_categories[k1][k2] = default_categories[k1][k2];
	}
	$("#category_list").empty();
	var temp_sum = 0;
	for (key in spending_categories[spending_selected])
		temp_sum += spending_categories[spending_selected][key];
	spending_sum = temp_sum;
	calculateTaxes();
	rebuildPercentages();
	buildCategories();
};

var canvas = document.getElementById("main_viz");
if (canvas != null)
	var processingInstance = new Processing(canvas, sketchProc);