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

		####### !!!!!!!!!!!!!!
		####### !!!!!!!!!!!!!!
		#------------------- Make Sure You Set write_json val to false to push to db ---------------------------
		# switch to write json else pushes values to db
		write_json = false
		####### !!!!!!!!!!!!!!
		####### !!!!!!!!!!!!!!
		####### !!!!!!!!!!!!!!
		areas = []
		states = {}
		citi = File.read("../query_service/cities.txt")
		areas = citi.split("\r")

		arr = CSV::parse(File.open("../query_service/states.csv", 'r') {|f| f.read})
		arr.shift
		arr.each {|k,v| states[k.downcase] = v.downcase}


		# TODO update to collect data on multiple cities in a less formal matter
		#areas = ["phoenix-az" , "tucson-az" , "mesa-az", "los+angeles-ca", "san+francisco-ca", "san+jose-ca", "san+diego-ca", "sacramento-ca", "denver-co", "colorado+springs-co", "aurora-co","washington-dc", "fort+lauderdale-fl", "jacksonville-fl", "miami-fl", "tampa-fl", "chicago-il", "aurora-il", "indianapolis-in", "boston-ma", "detroit-mi", "columbus-oh", "charlotte-nc", "new+york-ny", "oyster+bay-ny", "buffalo-ny", "philadelphia-pa", "memphis-tn", "nashville-tn", "austin-tx","el+paso-tx", "fort+worth-tx", "houston-tx", "san+antonio-tx", "dallas-tx", "seattle-wa", "spokane-wa", "tacoma-wa", "vancouver-wa", "madison-wi", "milwaukee-wi", "green+bay-wi", "salt+lake+city-ut", "west+valley+city-ut", "provo-ut"]
		#------------------------- Cost of Living data ------------------------------
		areas.each do |area|
			area.downcase!

			states.each do |abbr, st|
				if (area.include? ", #{st}")
					area.gsub!(", #{st}", ", #{abbr}")
					break
				end
			end

			area.gsub! "\, ", "-"
			area.gsub! " ", "+"

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

			# TODO research map! and flatten to map vals
			# map city vals to columns
			columns_to_values = Hash.new
			columns.each_with_index do |col , x|
				columns_to_values[col] = values[x]
			end
			# include general state col in data
			# columns_to_values[state] = state_values[0]
			str = "#{city}:#{state}"
			if write_json
				str = "location:#{city}"
			end
			loc_to_values[str] = columns_to_values 

			if processed_states.include?(state)
				# do nothing
			else
				# map state vals to columns	
				processed_states.push(state)
				columns_to_values = Hash.new
				columns.each_with_index do |col, x|
					columns_to_values[col] = state_values[x]
				end
				str = ":" + state
				if write_json
					str = "location':'#{state}"
				end
				loc_to_values[str] = columns_to_values
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
					values = Array.new
					# remove html tags
					month = month.text.strip
					values.push min.text.strip.slice 0..-3
					values.push max.text.strip.slice 0..-3
					values.push avg.text.strip.slice 0..-3

					month_data[month] = values
					count = count + 1
				end
			end


			if !cities.include?(city)
				cities.push city
			end
			weather_area[city] = month_data 

		end

		if write_json
			# -------------------- Write Json ---------------------------
			# store_vals
			col_file = Pathname.pwd.to_s + "../data/col.json"
			# col_state_file = Pathname.pwd.to_s + "/data/col_state.json"
			js = loc_to_values.to_json
			File.write(col_file, js)

		else
			# ------------------ Database init ----------------------------------

			# ------------------ Database Code COL -------------------------------

			store_vals = Hash.new
			table_name = "colis"
			store_vals[table_name] = loc_to_values
			curr_loc = " "
			col = " "
			goods = " "
			groc = " "
			hc = " "
			housing = " "
			trans = " "
			util = " "

			store_vals[table_name].each do |loc|
				curr_loc = loc[0].to_s
				ci =  curr_loc.split(":")[0]
				ci = nil if ci == ""
				st =  curr_loc.split(":")[1]
				loc_data =loc_to_values[curr_loc]
				col = loc_data[columns[0]]
				goods = loc_data[columns[1]]
				groc = loc_data[columns[2]]
				hc = loc_data[columns[3]]
				housing = loc_data[columns[4]]
				trans = loc_data[columns[5]]
				util = loc_data[columns[6]]
				Coli.find_or_create_by(city: ci, state: st).update(cost_of_living: col, transportation: trans, groceries: groc, goods: goods, health_care: hc, utilities: util, housing: housing)
			end


			# --------------- Database Code weather_reports ------------------------- 

			cities.each do |city|
				# get id
				results = Coli.find_by(location: city)
				id = nil

				id = results["id"]

				if id != nil
					# iterate through months and push data to db
					weather_area[city].each do |months|
						# get month
						curr_month = months[0]
						# get values
						arr_vals = months[1]
						min = arr_vals[0]
						max = arr_vals[1]
						avg = arr_vals[2]
						WeatherRecord.find_or_create_by(coli_id: id, high: max, low: min, average: avg, month: curr_month)
					end
				end
			end
		end
	end
end

CostOfLivingScraper.scrape()