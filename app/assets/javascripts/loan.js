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
	document.getElementById("intr").value = "";
	document.getElementById("time").value = "";
};

function calculate() {
	var amt = document.getElementById("amount").value;
	var intr = document.getElementById("intr").value;
	var term = document.getElementById("time").value;

	if(amt == "" or intr == "" or term == ""){
		return;
	}

	amt = parseFloat(amt).toFixed(2);
	intr = parseFloat(intr)/100;
	term = parseFloat(term).toFixed(1);
	pments = ceil(term/12);

	var res = amt*(intr/(1-(1+intr)^(-pments)));

	document.getElementById("payment").value = res.toFixed(2);
};