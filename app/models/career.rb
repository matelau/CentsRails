class Career < ActiveRecord::Base
	has_many :degrees
	has_many :rates_careers, dependent: :destroy
end
