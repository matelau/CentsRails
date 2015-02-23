class RatesSchool < ActiveRecord::Base
	belongs_to :user
	belongs_to :university
end
