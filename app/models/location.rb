class Location < ActiveRecord::Base
  has_many :weather_record
  has_one :coli
end
