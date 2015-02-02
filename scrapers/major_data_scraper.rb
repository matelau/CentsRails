require 'csv'

ENV['RAILS_ENV'] = "development" # Set to your desired Rails environment name
require_relative '../config/environment.rb'


class MajorDataScraper
	def self.scrape()
		taxes = {}

		arr = CSV::parse(File.open("../data/scraped/major_unemployment.csv", 'r') {|f| f.read})
		arr.shift

		arr.each do |m, u|
			puts m
			Degree.find_or_create_by(name: m).update(unemployment: u)
		end

		arr = CSV::parse(File.open("../data/scraped/major_in_field.csv", 'r') {|f| f.read})

		arr.each do |m, i|
			puts m
			Degree.find_or_create_by(name: m).update(in_field: i)
		end

		arr = CSV::parse(File.open("../data/scraped/major_job_satisfaction.csv", 'r') {|f| f.read})

		arr.each do |m, s, g|
			puts m
			Degree.find_or_create_by(name: m).update(satisfaction: s)
		end
	end
end

MajorDataScraper.scrape()