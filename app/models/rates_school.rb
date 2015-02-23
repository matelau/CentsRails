class RatesSchool < ActiveRecord::Base
	belongs_to :user
	belongs_to :university

	validates :university_id, presence: true
	validates :user_id, :uniqueness => {:scope => :university_id}, presence: true
	end
