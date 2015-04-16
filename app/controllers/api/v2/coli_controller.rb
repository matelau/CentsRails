class Api::V2::ColiController < ApplicationController
	def index
		result = Array.new

		if params[:state] and not (params[:only_state_names] == 'true')
			records = Coli.select('DISTINCT city').where(['state = ? and city IS NOT NULL', params[:state]])

			records.each do |record|
				result << record[:city]
			end

		elsif params[:only_state_names] == 'true' and not params[:state]
			records = Coli.select('DISTINCT state')
			records.each do |record|
				result << record[:state]
			end

		elsif (not (params[:only_state_names] == 'true')) and (not params[:state])
			records = Coli.select('DISTINCT city, state')
			
			# Format the location name as a single string.
			records.each do |record|
				if not record[:city]
					result << record[:state]
				else
					result << "#{record[:city]}, #{record[:state]}"
				end
			end

		else
			records = Coli.select('DISTINCT state').where(state: params[:state])
			records.each do |record|
				result << record[:state]
			end
		end

		# Check if there are no records.
		if records.blank?
			return render json: 'No records found', status: 404
		end

		# Return the record names as a JSON object.
		result.sort!
		return render json: result, status: 200
  end

  def show_best
		col = Coli.order(
			"CASE WHEN cost_of_living >= 0 THEN income_per_capita/(cost_of_living + 1) ELSE ABS(cost_of_living + 1)*income_per_capita END"
			).first
		cols = [{city: col[:city], state: col[:state]}]
		internal_show_two(col, "get")
	end

	def show_worst
		col = Coli.order(
			"CASE WHEN cost_of_living >= 0 THEN income_per_capita/(cost_of_living + 1) ELSE ABS(cost_of_living + 1)*income_per_capita END DESC"
			).first
		cols = [{city: col[:city], state: col[:state]}]
		internal_show_two(col, "get")
	end

	def show_cheapest
		col = Coli.order('cost_of_living').first
		cols = [{city: col[:city], state: col[:state]}]
		internal_show_two(col, "get")
	end

	def show_priciest
		col = Coli.order('cost_of_living').first
		cols = [{city: col[:city], state: col[:state]}]
		internal_show_two(col, "get")
	end

	def show_random
		ids = Coli.select(:id)
		col = Coli.find( ids[Random.rand(ids.length)] )
		cols = [{city: col[:city], state: col[:state]}]
		internal_show_two(cols, "get")
	end

	# Get cost of living data by state.
	def show_state
		records = Coli.where(state: params[:state])
		locations = Array.new

		records.each do |record|
			locations << record.attributes.except('id', 'created_at', 'updated_at')
		end

		if locations.present?
			return render json: locations, status: 200
		else
			return render json: [], status: 404
		end
	end

	# Get cost of living data by state and city.
	def show_city
		location = Coli.where(state: params[:state], city: params[:city])

		if location.present?
			return render json: location[0].attributes.except('id', 'created_at', 'updated_at'), status: 200
		else
			return render json: Hash.new, status: 404
		end
	end

	# Get cost of living data for two locations.
	def show_two
		result = Hash.new

		# Check for the required fields, and return an appropriate message if
		# they are not present.
		unless params[:locations].present?
			return render json: 'No objects were in the locations array.', status: 400
		end

		# Order the locations.
		locations = Array.new
		if params[:locations][0][:order] and params[:locations][1][:order]
			params[:locations].each do |location|
				if location[:order] == 1
					locations << location
				end
			end
			params[:locations].each do |location|
				if location[:order] == 2
					locations << location
				end
			end
		else
			locations = params[:locations]
		end

		# Create a string of the form '(city = c1 AND state = s1) OR
		# (city = c2 AND state = s2) ... ' and a list of city, state pairs.
		# This string and list will be used to dynamically create the where clause
		# for the query.
		where_string = ""
		where_params = Array.new
		locations.each do |location|
			where_string += '(city = ? AND state = ?) OR (city IS NULL AND state = ?) OR '
			where_params << location[:city]
			where_params << location[:state]
			where_params << location[:state]
		end
		where_string = where_string[0..-5]	# Strip off the last ' OR '.

		records = Coli.find_by_sql [
				"SELECT cost_of_living,
								transportation,
								groceries,
								goods,
								health_care,
								utilities,
								housing,
								city,
								unemp_rate,
								sales_tax,
								property_tax,
								state,
								income_tax_max,
								income_tax_min,
								income_per_capita,
								economic_growth,
								month,
								high,
								low
				FROM colis
				LEFT OUTER JOIN weather_records
				ON colis.id = weather_records.coli_id
				WHERE #{where_string}
				ORDER BY colis.id ASC;",
				*where_params
			]

		@averages = Coli.find_by_sql "SELECT AVG(unemp_rate) AS avg_unemp_rate, 
																	 AVG(income_per_capita) AS avg_income, 
																	 AVG(economic_growth) AS avg_growth,
																	 AVG(sales_tax) AS avg_sales_tax,
																	 AVG(income_tax_min) AS avg_inc_tax_min,
																	 AVG(income_tax_max) AS avg_inc_tax_max,
																	 AVG(property_tax) AS avg_property_tax
														FROM colis"

		# Start putting the records into a JSON object that the view can use.
		used_state_data_for = Array.new
		no_data_for = Array.new

		# Iterate over each location, keeping track of the location's index.
		# (The index is needed because that's how the view tracks locations.)
		index = 1
		locations.each do |location|
			match = false
			state_match = false

			# Search through the retrieved records for an exact match.
			records.each do |record|
				if record[:city]  == location[:city]  and 
					record[:state] == location[:state] then
					match = true
					result["location_#{index}"] = extract_coli_data(location, index, record)
					if location[:city].present?
						result["location_#{index}"][:name] = "#{location[:city]}, #{location[:state]}"
					else
						result["location_#{index}"][:name] = "#{location[:state]}"
					end
					break
				end
			end

			# If no exact match is found, look for a matching state.
			unless match
				records.each do |record|
					if record[:city]  == nil and 
						 record[:state] == location[:state] then
						state_match = true
						result["location_#{index}"] = extract_coli_data(location, index, record)
						result["location_#{index}"][:name] = location[:state]
						break
					end
				end
			end

			# Add the weather data for this location.
			weather_data = extract_weather_data(location, records, result)
			if result["location_#{index}"]
				result["location_#{index}"]["weather_#{index}"] = weather_data[:weather_high_stats]
				result["location_#{index}"]["weatherlow_#{index}"] = weather_data[:weather_low_stats]
			end

			# Keep track of which states we substituted state data for.
			if state_match
				used_state_data_for << location

			# Keep track of which states had neither exact nor state data.
			elsif not match
				no_data_for << location
			end

			# Increment for next object.
			index += 1
		end

		labor_avg = Array.new
		labor_avg << @averages[0][:avg_unemp_rate].to_f
		labor_avg << @averages[0][:avg_income].to_f
		labor_avg << @averages[0][:avg_growth].to_f
		result[:labor_3] = labor_avg

		tax_avg = Array.new
		tax_avg << @averages[0][:avg_sales_tax].to_f
		tax_avg << @averages[0][:avg_inc_tax_min].to_f
		tax_avg << @averages[0][:avg_inc_tax_max].to_f
		tax_avg << @averages[0][:avg_property_tax].to_f
		result[:taxes_3] = tax_avg
		
		# If there is no data for a city or its state, send an error message.
		unless no_data_for.empty?
			result[:error] = 'No data on city or state for some locations'
			result[:no_data_for] = no_data_for
			result[:operation] = 'undefined' # Needed for the query parser.
			return render json: result, status: 404
		end

		# If there is no data for a city but there is data for its state, continue
		# but with a warning.
		unless used_state_data_for.empty?
			result[:warning] = 'No data on city for some locations; used state data instead'
			result[:used_state_data_for] = used_state_data_for
		end

		result[:operation] = params[:operation]

		# Return the result, formatted as JSON, and with a 200 OK HTTP code.
		render json: result, status: 200
	end

	private

	def extract_coli_data(location, i, record)
		# Store each locations's data in result.
		data = Hash.new

		##### ---------------- COST OF LIVING ---------------- #####
		coli_stats = Array.new	# For formatting the eventual JSON object.
		
		# Note that order is important.
		fields = [:cost_of_living, :goods, :groceries, :health_care, 
			:housing, :transportation, :utilities]

		# Collect the value of each non-nil field in coli_stats.
		fields.each do |field|
			stat = record[field]
			coli_stats << stat.to_f if stat
		end

		# Add the mins and maxes.
		coli_stats << coli_stats.compact.min
		coli_stats << coli_stats.compact.max

		# Add the data to the result.
		data["cli_#{i}"] = coli_stats


		##### -------------------- LABOR --------------------- #####
		labor_stats = Array.new	# For formatting the eventual JSON object.

		fields = [:unemp_rate, :income_per_capita, :economic_growth]

		# Collect the value of each field in labor_stats.
		fields.each do |field|
			stat = record[field] 
			stat = stat ? stat.to_f : nil
			labor_stats << stat
		end


		# Add max and min. The compact method removes nils.
		labor_stats << labor_stats.compact.min
		labor_stats << labor_stats.compact.max

		data["labor_#{i}"] = labor_stats

		
		##### -------------------- TAXES --------------------- #####
		tax_stats = Array.new	# For formatting the eventual JSON object.			

		fields = [:sales_tax, :income_tax_min, :income_tax_max, :property_tax]

		# Collect the value of each non-nil field in tax_stats.
		fields.each do |field|
			stat = record[field]
			stat = stat ? stat.to_f : nil
			tax_stats << stat
		end

		# Add max and min.
		tax_stats << tax_stats.compact.min
		tax_stats << tax_stats.compact.max

		data["taxes_#{i}"] = tax_stats

		return data
	end

	def extract_weather_data(location, records, result)
		# Store each locations's data in result.
		# We'll need to both iterate over each location and keep track of their
		# indices, because that's how the view tracks them.
		i = 1

		##### -------------------- WEATHER ------------------- #####
		weather_high_stats = Array.new
		weather_low_stats = Array.new

		# First, look for an exact match (the current location's city matches 
		# the record's city and likewise for state).
		match_found = false
		records.each do |record|
			if location[:city] == record[:city] and 
				 location[:state] == record[:state] then
				match_found = true
				weather_high_stats << (record[:high] ? record[:high].to_f : nil)
				weather_low_stats << (record[:low] ? record[:low].to_f : nil)
			end					
		end

		# If that search didn't succeed, fall back to state.
		if not match_found
			records.each do |record|
				if record[:city] == nil and 
					 location[:state] == record[:state] then
					weather_high_stats << (record[:high] ? record[:high].to_f : nil)
					weather_low_stats << (record[:low] ? record[:low].to_f : nil)
					break
				end
			end
		end

		# Reset match_found for the next location.
		match_found = false

		# Add min and max for each list.
		weather_high_stats << weather_high_stats.compact.min
		weather_high_stats << weather_high_stats.compact.max
			
		weather_low_stats << weather_low_stats.compact.min
		weather_low_stats << weather_low_stats.compact.max

		# result["weather_#{i}"] = weather_high_stats
		# result["weatherlow_#{i}"] = weather_low_stats
	
		# Increment for next object.	
		i += 1

		data = Hash.new
		data[:weather_high_stats] = weather_high_stats
		data[:weather_low_stats] = weather_low_stats

		return data
	end
end
