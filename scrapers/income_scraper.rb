require 'nokogiri'
require 'open-uri'
require 'json'
require 'pathname'
require 'yaml'
require 'csv'

ENV['RAILS_ENV'] = "development" # Set to your desired Rails environment name
require_relative '../config/environment.rb'

class IncomeScraper
	
	def self.scrape()
		# init maps and necessary array
		processed_states = Array.new
		columns = Array.new
		cities = Array.new

		areas = []
		states = {}
		citi = File.read("../data/scraped/city_urls.txt")
		areas = citi.split("\n")

		arr = CSV::parse(File.open("../query_service/states.csv", 'r') {|f| f.read})
		arr.shift
		arr.each {|k,v| states[k.downcase] = v.downcase}


		# TODO update to collect data on multiple cities in a less formal matter
		#areas = ["phoenix-az" , "tucson-az" , "mesa-az", "los+angeles-ca", "san+francisco-ca", "san+jose-ca", "san+diego-ca", "sacramento-ca", "denver-co", "colorado+springs-co", "aurora-co","washington-dc", "fort+lauderdale-fl", "jacksonville-fl", "miami-fl", "tampa-fl", "chicago-il", "aurora-il", "indianapolis-in", "boston-ma", "detroit-mi", "columbus-oh", "charlotte-nc", "new+york-ny", "oyster+bay-ny", "buffalo-ny", "philadelphia-pa", "memphis-tn", "nashville-tn", "austin-tx","el+paso-tx", "fort+worth-tx", "houston-tx", "san+antonio-tx", "dallas-tx", "seattle-wa", "spokane-wa", "tacoma-wa", "vancouver-wa", "madison-wi", "milwaukee-wi", "green+bay-wi", "salt+lake+city-ut", "west+valley+city-ut", "provo-ut"]
		#------------------------- Cost of Living data ------------------------------
		areas.each do |area|
			# Test Script used to play with nokogiri - pulls cost of living data from areavibes.com
			url = "http://www.areavibes.com//employment/"
			url.insert(25,area)
			puts "pulling data for: "+ url + "\n"
			data = nil
			begin
				data = Nokogiri::HTML(open(url))
			rescue OpenURI::HTTPError => e
				log_file = Pathname.pwd.to_s + "../data/error_logs"
				error_message = DateTime.now.to_s + " income_scraper.rb area: "+ area + " error: "+ e.message.to_s
				File.write(log_file, error_message)
				# continue
				next
			end

			table =  data.css('table.std_facts.w.emp')
			#headers =  index, city, state, national
			state = table.css('th')[2].text
			city = table.css('th')[1].text

			columns = ["income_per_capita","unemp_rate"]

			values = Array.new
			state_values = Array.new
			#tds = column title, city val, state val, national val
			table.css('tr').each do |row|
				next if row.css('td')[0] == nil
				if(row.css('td')[0].text.strip == "Income per capita" || row.css('td')[0].text.strip == "Unemployment rate")
					str = row.css('td')[1].text.strip
					str2 = row.css('td')[2].text.strip

					if(row.css('td')[0].text.strip == "Income per capita")
						str.gsub! "$", ""
						str.gsub! ",", ""
						str2.gsub! "$", ""
						str2.gsub! ",", ""
					end

					if(row.css('td')[0].text.strip == "Unemployment rate")
						str.gsub! "%", ""
						str2.gsub! "%", ""
					end

					# check for nil
					if str.to_s == "" 
						# do nothing
					else
						# remove html tags
						values.push str
						state_values.push str2
					end
				end
			end

			income = values[0]
			unemp = values[1]	
			Coli.find_or_create_by(city: city, state: state).update(income_per_capita: income, unemp_rate: unemp)

			if processed_states.include?(state)
				# do nothing
			else
				# map state vals to columns	
				processed_states.push(state)
				income = state_values[0]
				unemp = state_values[1]	
				Coli.find_or_create_by(city: nil, state: state).update(income_per_capita: income, unemp_rate: unemp)
			end
		end
	end
end

IncomeScraper.scrape()