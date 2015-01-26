class ToBeValidatedUser < ActiveRecord::Base

	# Tell bcrypt to do its thing.
	has_secure_password

	# Ensure that the names are made of letters.
	validates :first_name, format: { with: /\A[a-zA-Z]+\z/,
		message: 'must be letters' }
	validates :last_name, format: { with: /\A[a-zA-Z]+\z/,
		message: 'must be letters' }

	# Ensure that the email is unique.
	validates :email, uniqueness: true,
										presence: true

	# Ensure that the user has entered a password twice and that the password is
	# the right length.
	validates :password, presence: true,
  										 confirmation: true,
  										 length: {within: 6..70}

	# Ensure that the user has entered something in the confirmation field.
	# (The password confirmation would be bypassed otherwise.)
	validates :password_confirmation, presence: true

end
