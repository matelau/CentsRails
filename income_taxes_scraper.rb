require 'csv'

ENV['RAILS_ENV'] = "development" # Set to your desired Rails environment name
require '~/Documents/dev/CentsRails/config/environment.rb'


class IncomeTaxScraper
	def self.scrape()
		taxes = {}

		arr = CSV::parse(File.open("query_service/incometaxes.csv", 'r') {|f| f.read})
		arr.shift

		arr.each do |s, min, max|
			puts s
			Coli.where(state: s).find_each do |row|
				row.update(income_tax_min: min, income_tax_max: max)
			end
		end

		arr = CSV::parse(File.open("query_service/salestaxes.csv", 'r') {|f| f.read})

		arr.each do |s, rate|
			puts s
			Coli.where(state: s).find_each do |row|
				row.update(sales_tax: rate)
			end
		end
	end
end

IncomeTaxScraper.scrape()