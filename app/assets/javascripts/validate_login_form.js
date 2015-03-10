// The rules and messages for the login form validation.
// Requires the jQuery Validation plug in to work.
$("#login-form").validate(
{
	// When a rule is met, make the label blank instead of removing it.
	success: function(label)
	{
		label.text("");
	},

	// Set the requirements for the fields here.
	rules: 
	{
		"email": 
		{
			required: true,
			email: true
		},
		"password": 
		{
			required: true
		},
	},

	// Set the error message here.
	messages: 
	{
		"password": "Enter your password.",
		"email": "Enter a valid email address.",
	},
	
	// Disallow submission until the rules are met.
	submitHandler: function(form) 
	{
		form.submit();
	}
});

// Run the validations immediately.
$("#login-form").valid();