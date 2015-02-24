class University < ActiveRecord::Base
	has_many :degrees
	has_many :rates_schools, dependent: :destroy
end
