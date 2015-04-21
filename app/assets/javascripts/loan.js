function isNumberKey(evt)
{
  var charCode = (evt.which) ? evt.which : evt.keyCode;
  if (charCode != 46 && charCode > 31 
    && (charCode < 48 || charCode > 57))
     return false;

  return true;
};

function clearFields() {
	document.getElementById("amount").value = "";
	document.getElementById("interest").value = "";
	document.getElementById("time").value = "";
};

function calculate() {
	var amt = document.getElementById("amount").value;
	var intr = document.getElementById("interest").value;
	var term = document.getElementById("time").value;

	if(amt == "" || intr == "" || term == ""){
		return;
	}

	amt = parseFloat(amt);
	intr = (parseFloat(intr)/100)/12;
	console.log(intr)
	term = parseFloat(term).toFixed(1);
	pments = term*12;

	var res = amt*(intr + intr/(1-Math.pow((1+intr),(-pments))));

	document.getElementById("payment").value = res.toFixed(2);
};