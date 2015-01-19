class User < ActiveRecord::Base
  has_many :scalars
  has_many :queries
  has_many :completeds

  has_secure_password

  # Ensure that the email is unique.
  validates :email, :uniqueness => true
end
