class User < ActiveRecord::Base
  has_many :scalars
  has_many :queries
  has_many :completeds
end
