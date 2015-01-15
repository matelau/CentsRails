class User < ActiveRecord::Base
  has_many :scalars
  has_many :queries
  has_many :completeds

  # Ensure that the email is unique.
  validates :email, :uniqueness => true
end
