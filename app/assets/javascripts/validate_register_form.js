// The rules and messages for the registration form validation.
// Requires the jQuery Validation plug in to work.
$("#register-form").validate(
{
	// When a rule is met, make the label blank instead of removing it.
	success: function(label)
	{
		label.text("");
	},

	// Set the requirements for the fields here.
	rules:
	{
		"user[first_name]": 
		{
			required: true,
			lettersonly: true
		},
		"user[last_name]": 
		{
			required: true,
			lettersonly: true
		},
		"user[email]": 
		{
			required: true,
			email: true
		},
		"user[password]":
		{
			required: true,
			minlength: 6
		},
		"user[password_confirmation]": 
		{
			required: true,
			minlength: 6,
			equalTo: "#user_password"
		},
		"terms": 
		{
			required: true
		}
	},
					
	// Set the error message here.
	messages: 
	{
		"user[first_name]":
		{
			required: "Required.",
			lettersonly: "Names can only contain letters."
		},
		"user[last_name]": 
		{
			required: "Required.",
			lettersonly: "Names can only contain letters."
		},
		"user[password]": 
		{
			required: "Required.",
			minlength: "Must be at least six characters long."
		},
		"user[email]": 
		{
			required: "Required.",
			email: "Must be your real email address."
		},
		"user[password_confirmation]": 
		{
			required: "Required.",
			equalTo: "Passwords must match.",
			minlength: "Must be at least six characters long."
		},
		"terms": "You must accept the terms and conditions to have an account."
	},

	// Disallow submission until the rules are met.
	submitHandler: function(form) 
	{
		form.submit();
	}
});

// Run the validations immediately.
$("#register-form").valid();