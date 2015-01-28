class User < ActiveRecord::Base
	has_many :scalars
	has_many :queries
	has_many :completeds

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

end
