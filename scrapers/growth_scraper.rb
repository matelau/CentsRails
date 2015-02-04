require 'csv'

ENV['RAILS_ENV'] = "development" # Set to your desired Rails environment name
require_relative '../config/environment.rb'


class GrowthScraper
	def self.scrape()
		taxes = {}

		arr = CSV::parse(File.open("../data/scraped/growth_trend.csv", 'r') {|f| f.read})
		states = CSV::parse(File.open("../query_service/states.csv", 'r') {|f| f.read})

		arr.each do |city, state, two, last, trend|
			s = nil
			states.each do |abbr, st|
				if(state == abbr)
					s = st
				end
			end
			Coli.where(city: city, state: s).find_each do |row|
				row.update(economic_growth: trend)
			end
		end
	end
end

GrowthScraper.scrape()