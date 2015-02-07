class Api::V1::ColiController < ApplicationController
	
	# Retrieve all location data by location name.
	def show
		result = Hash.new
		error_list = []

		# Check for the required fields, and return an appropriate message if
		# they are not present.
		unless params[:locations].present?
			error_list << 'No objects were in the locations array.'
		end

		unless params[:operation].present?
			error_list << 'The operation field was empty.'
		end

		unless error_list.empty?
			result[:errors] = error_list
			return render json: result, status: 400
		end

		locations = params[:locations]

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

		# Query the database.
		records = Coli.joins(
						"LEFT OUTER JOIN weather_records ON colis.id = weather_records.coli_id")
						.select(:cost_of_living,
								:transportation,
								:groceries,
								:goods,
								:health_care,
								:utilities,
								:housing,
								:city,
								:unemp_rate,
								:sales_tax,
								:property_tax,
								:state,
								:income_tax_max,
								:income_tax_min,
								:income_per_capita,
								:month,
								:high,
								:low)
						.where([where_string, *where_params])
						.order('colis.id ASC')	

		# Start putting the records into a JSON object that the view can use.
		match = false
		state_match = false

		used_state_data_for = Array.new
		no_data_for = Array.new

		# We'll need to both iterate over each location and keep track of their
		# indices, because that's how the view tracks them.
		i = 1
		locations.each do |location|

			# Search through the retrieved records for an exact match.
			records.each do |record|
				if record[:city] == location[:city] and 
						record[:state] == location[:state] then
						match = true
						result = extract_coli_data(location, i, record, result)
						break
				end
			end

			# If no exact match is found, look for a matching state.
			unless match
				records.each do |record|
					if record[:city] == nil and 
						 record[:state] == location[:state] then
						state_match = true
						result = extract_coli_data(location, i, record, result)
						break
					end
				end
			end

			# Add the weather data for this location.
			result = extract_weather_data(location, records, result)

			# Keep track of which states we substituted state data for.
			if state_match
				used_state_data_for << location

			# Keep track of which states had neither exact nor state data.
			elsif not match
				no_data_for << location
			end

			# Increment for next object.
			i += 1
		end
		
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
			result[:operation] = params[:operation]	# Needed for the query parser.
		end

		# Return the result, formatted as JSON, and with a 200 OK HTTP code.
		render json: result, status: 200
	end

private

	def extract_coli_data(location, i, record, result)
		# Store each locations's data in result.
		# Name each location.
		result["location_#{i}"] = "#{location[:city]}, #{location[:state]}"

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
		unless coli_stats.empty?
			coli_stats << coli_stats.min
			coli_stats << coli_stats.max
		end

		# Add the data to the result.
		result["cli_#{i}"] = coli_stats


		##### -------------------- LABOR --------------------- #####
		labor_stats = Array.new	# For formatting the eventual JSON object.

		fields = [:unemp_trend, :income_tax_max, :income_tax_min, :unemp_rate]

		# Collect the value of each non-nil field in coli_stats.
		fields.each do |field|
			stat = record[field]
			labor_stats << stat.to_f if stat
		end

		# Add max and min.
		unless labor_stats.empty?
			labor_stats << labor_stats.min
			labor_stats << labor_stats.max
		end

		result["labor_#{i}"] = labor_stats

		
		##### -------------------- TAXES --------------------- #####
		tax_stats = Array.new	# For formatting the eventual JSON object.			

		fields = [:sales_tax, :income_tax_min, :income_tax_max, :property_tax]

		# Collect the value of each non-nil field in coli_stats.
		fields.each do |field|
			stat = record[field]
			tax_stats << stat.to_f if stat
		end

		# Add max and min.
		unless tax_stats.empty?
			tax_stats << tax_stats.min
			tax_stats << tax_stats.max
		end

		result["taxes_#{i}"] = tax_stats

		return result
	end

	def extract_weather_data(location, records, result)
		# Store each locations's data in result.
		# We'll need to both iterate over each location and keep track of their
		# indices, because that's how the view tracks them.
		i = 1

		##### -------------------- WEATHER ------------------- #####
		weather_high_stats = Array.new
		weather_low_stats = Array.new

		records.each do |record|
			if record[:city] == location[:city] and 
					record[:state] == location[:state] then
				weather_high_stats << record[:high].to_f if record[:high]
				weather_low_stats << record[:low].to_f if record[:low]
			end
		end

		# Add max and min for each list.
		unless weather_high_stats.empty?
			weather_high_stats << weather_high_stats.min
			weather_high_stats << weather_high_stats.max
		end
		
		unless weather_high_stats.empty?
			weather_low_stats << weather_low_stats.min
			weather_low_stats << weather_low_stats.max
		end

		result["weather_#{i}"] = weather_high_stats
		result["weatherlow_#{i}"] = weather_low_stats
	
		# Increment for next object.	
		i += 1

		return result
	end
end
