require 'nokogiri'
require 'open-uri'

ENV['RAILS_ENV'] = "development" # Set to your desired Rails environment name
require_relative '../config/environment.rb'

class MajorRecommendScraper
	def scrape()
		data = Nokogiri::HTML(open("http://www.payscale.com/college-salary-report/most-recommended-majors"))

		arr = {}

		data.css("table")[1].css("tr").each do |l| 
			name = l.css("td")[1]
			next if name == nil
			name = name.text.strip()
			pct = l.css("td")[2]
			pct = pct.text.strip().gsub!("%","")
			
			arr[name] = pct
		end

		puts arr

		arr.each do |k, v|
			Degree.find_or_create_by(:name = k.gsub(/\(.*?\)/, "")).update(:recommend v)
		end
	end
end

MajorRecommendScraper.scrape()