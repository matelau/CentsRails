class User < ActiveRecord::Base
	has_many :amounts, dependent: :destroy
	has_many :queries, dependent: :destroy
	has_many :completeds, dependent: :destroy
	has_many :rates_schools, dependent: :destroy
	has_many :rates_majors, dependent: :destroy

	# Tell bcrypt to do its thing.
	has_secure_password

	# Ensure that the names are made of letters.
	validates :first_name, format: { with: /\A[a-zA-Z]+\z/,
		message: 'must be letters' }
	validates :last_name, format: { with: /\A[a-zA-Z]+\z/,
		message: 'must be letters' }

  # Ensure that the email is unique.
  validates :email, uniqueness: true, presence: true

	validates :email_type, presence: true

end
