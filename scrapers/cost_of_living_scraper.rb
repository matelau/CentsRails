require 'nokogiri'
require 'open-uri'
require 'json'
require 'pathname'
require 'yaml'
require 'csv'

ENV['RAILS_ENV'] = "development" # Set to your desired Rails environment name
require_relative '../config/environment.rb'

class CostOfLivingScraper
	
	def self.scrape()
		# init maps and necessary array
		loc_to_values = Hash.new 
		processed_states = Array.new
		weather_area = Hash.new
		columns = Array.new
		cities = Array.new

		areas = []
		states = {}
		citi = File.read("../data/scraped/city_urls.txt")
		areas = citi.split("\n")

		arr = CSV::parse(File.open("../query_service/states.csv", 'r') {|f| f.read})
		arr.shift
		arr.each {|k,v| states[k.downcase] = v.downcase}

		#------------------------- Cost of Living data ------------------------------
		areas.each do |area|
			# Test Script used to play with nokogiri - pulls cost of living data from areavibes.com
			url = "http://www.areavibes.com//cost-of-living/"
			url.insert(25,area)
			puts "pulling data for: "+ url + "\n"
			data = nil
			begin
				data = Nokogiri::HTML(open(url))
			rescue OpenURI::HTTPError => e
				log_file = Pathname.pwd.to_s + "../data/error_logs"
				error_message = DateTime.now.to_s + " Cost_of_living_scraper.rb area: "+ area + " error: "+ e.message.to_s
				File.write(log_file, error_message)
				# continue
				next
			end

			table =  data.css('table.std_facts.w')
			#headers =  index, city, state, national
			state = table.css('th')[2].text
			city = table.css('th')[1].text

			columns = ["cost_of_living", "goods", "groceries", "health_care", "housing", "transportation", "utilities"]

			values = Array.new
			state_values = Array.new
			#tds = column title, city val, state val, national val
			table.css('tr').each do |row|
				str = row.css('td')[1]
				str2 = row.css('td')[2]
				# check for nil
				if str.to_s == "" 
					# do nothing
				else
					# remove html tags
					values.push str.text.strip
					state_values.push str2.text.strip
				end
			end

			col = values[0]
			goods = values[1]
			groc = values[2]
			hc = values[3]
			housing = values[4]
			trans = values[5]
			util = values[6]
			puts "push coli data for #{city}, #{state}"
			Coli.find_or_create_by(city: city, state: state).update(cost_of_living: col, transportation: trans, groceries: groc, goods: goods, health_care: hc, utilities: util, housing: housing)

			if processed_states.include?(state)
				# do nothing
			else
				# map state vals to columns	
				processed_states.push(state)

				col = state_values[0]
				goods = state_values[1]
				groc = state_values[2]
				hc = state_values[3]
				housing = state_values[4]
				trans = state_values[5]
				util = state_values[6]

				Coli.find_or_create_by(city: nil, state: state).update(cost_of_living: col, transportation: trans, groceries: groc, goods: goods, health_care: hc, utilities: util, housing: housing)
			end

			#-------------------Weather Data ----------------------------------
			# Test Script used to play with nokogiri - pulls cost of living data from areavibes.com
			url = "http://www.areavibes.com//weather/"
			url.insert(25,area)
			puts "pulling data for: "+ url + "\n"
			data = nil
			
			begin
				data = Nokogiri::HTML(open(url))
			rescue OpenURI::HTTPError => e
				log_file = Pathname.pwd.to_s + "../data/error_logs"
				error_message = DateTime.now.to_s + " Cost_of_living_scraper.rb weather: "+ area + " error: "+ e.message.to_s
				File.write(log_file, error_message)
				# continue
				next
			end

			month_data = Hash.new
			table =  data.css('table.std_facts.w')

			count = 0
			puts "push weather data for #{city}, #{state}"
			#tds = month, min, max, avg, precip
			table.css('tr').each do |row|
				month = row.css('td')[0]
				min = row.css('td')[1]
				max = row.css('td')[2]
				avg = row.css('td')[3]
				precip = row.css('td')[4]

				# check for nil 
				if month.nil? || min.nil? || max.nil? || avg.nil? || precip.nil?
					# do nothing
					# puts "do nothing block"
				elsif count > 11
					# ignore air qual and pollution index
					# puts "overcount"		
				else
					month = month.text.strip
					min = min.text.strip.slice 0..-3
					max = max.text.strip.slice 0..-3
					avg = avg.text.strip.slice 0..-3
					results = Coli.find_by(city: city, state: state)
					id = nil

					id = results["id"]
					
					WeatherRecord.find_or_create_by(coli_id: id, high: max, low: min, average: avg, month: month)

					count += 1
				end
			end
		end
	end
end

CostOfLivingScraper.scrape()