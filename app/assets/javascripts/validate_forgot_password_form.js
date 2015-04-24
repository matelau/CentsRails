// The rules and messages for the forgot-password form validation.
// Requires the jQuery Validation plug in to work.
$("#forgot-password-form").validate(
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
		"answer": 
		{
			required: true
		},
		"password":
		{
			required: true,
			minlength: 6
		},
		"password_confirmation": 
		{
			required: true,
			minlength: 6,
			equalTo: "#password"
		},
	},
					
	// Set the error message here.
	messages: 
	{
		"password": 
		{
			required: "Required.",
			minlength: "Must be at least six characters long."
		},
		"answer": 
		{
			required: "Required."
		},
		"email": 
		{
			required: "Required.",
			email: "Must be your real email address."
		},
		"password_confirmation": 
		{
			required: "Required.",
			equalTo: "Passwords must match.",
			minlength: "Must be at least six characters long."
		}
	},

	// Disallow submission until the rules are met.
	submitHandler: function(form) 
	{
		form.submit();
	}
});

// Run the validations immediately.
$("#forgot-password-form").valid();
