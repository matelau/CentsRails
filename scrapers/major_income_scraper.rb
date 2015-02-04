require 'csv'

ENV['RAILS_ENV'] = "development" # Set to your desired Rails environment name
require_relative '../config/environment.rb'


class MajorIncomeScraper
	def self.scrape()
		taxes = {}

		arr = CSV::parse(File.open("../data/scraped/major_salary.csv", 'r') {|f| f.read})

		arr.each do |major, starting, avg|
			Degree.find_or_create_by(name: major).update(salary: starting)
		end
	end
end

MajorIncomeScraper.scrape()