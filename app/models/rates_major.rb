class RatesMajor < ActiveRecord::Base
	belongs_to :user
	belongs_to :degree

	validates :degree_id, presence: true
	validates :user_id, :uniqueness => {:scope => :degree_id}, presence: true
end
