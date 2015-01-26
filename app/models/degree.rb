class Degree < ActiveRecord::Base
	has_many :careers
	has_many :top_jobs
	has_many :universities
end
