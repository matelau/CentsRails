class RatesCareer < ActiveRecord::Base
	belongs_to :user
	belongs_to :career

	validates :career_id, presence: true
	validates :user_id, :uniqueness => {:scope => :career_id}, presence: true
end
