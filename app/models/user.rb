class User < ActiveRecord::Base
  has_many :scalars
  has_many :queries
  has_many :completeds

  validates :email, :uniqueness => true
end
