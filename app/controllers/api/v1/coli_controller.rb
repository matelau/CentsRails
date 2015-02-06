class Api::V1::ColiController < ApplicationController
	
	# Retrieve all location data by location name.
	def show
		result = Hash.new
		error_list = []

		# Check for the required fields, and return an appropriate message if
		# they are not present.
		unless params[:locations].present?
			error_list.append 'No objects were in the locations array.'
		end

		unless params[:operation].present?
			error_list.append 'The operation field was empty.'
		end

		unless error_list.empty?
			result[:errors] = error_list
			return render json: result, status: 400
		end

		lookup = Hash.new
		locations = params[:locations]

		# Create a string of the form '(city = c1 AND state = s1) OR
		# (city = c2 AND state = s2) ... ' and a list of city, state pairs.
		# This string and list will be used to dynamically create the where clause
		# for the query.
		where_string = ""
		where_params = Array.new
		locations.each do |location|
<<<<<<< HEAD
			where_string += '(city = ? AND state = ?) OR (city IS NULL AND state = ?) OR '
			where_params << location[:city]
			where_params << location[:state]
			where_params << location[:state]
=======
			#where_string += "location = '#{location}' OR "
			where_string += 'city = ? OR '
>>>>>>> dev
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
								:economic_growth,
								:month,
								:high,
								:low)
						.where([where_string, *where_params])
						.order('colis.id ASC')

		# Check that we found everything in the database.
		used_state_data_for = Array.new
		no_data_for = Array.new
		locations.each do |location|
			# Make a list of cities that don't have data (but whose state do).
			match_found = false
			records.each do |record|
				if location[:city] == record[:city] and 
					 location[:state] == record[:state] then	
					match_found = true
				end			
			end
			unless match_found
				used_state = false
				records.each do |record|
					if record[:city] == nil and 
						 location[:state] == record[:state] then					
				end
			end
				used_state_data_for << location
				# Search through the records for state-only data.
				records.each do |record|
					if record[:city] == nil and
						record[:state] == location[:state] then
						lookup["#{location[:label]}"] = record
					end
				end
				# Make a list of cities that don't have city or state data.
				unless lookup["#{location[:label]}"]
					no_data_for << location
				end
			end
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

		# Store each object's data in result.
		# We'll need to both iterate over each location and keep track of their
		# indices, because that's how the view tracks them.
		i = 1
		locations.each do |location|
			# Name each location.
			result["location_#{i}"] = location[:label]
	
			##### ---------------- COST OF LIVING ---------------- #####
			coli_stats = Array.new	# For formatting the eventual JSON object.
			
			# Note that order is important.
			fields = [:cost_of_living, :goods, :groceries, :health_care, 
				:housing, :transportation, :utilities]

			# Collect the value of each field in coli_stats.
			fields.each do |field|
				stat = lookup["#{location[:label]}"][field] 
				stat = stat ? stat.to_f : nil
				coli_stats << stat
			end

			# Add the mins and maxes.
			unless coli_stats.empty?
				coli_stats << coli_stats.min
				coli_stats << coli_stats.max
			end

			# Add the data to the result.
			result["cli_#{i}"] = coli_stats


			##### -------------------- LABOR --------------------- #####
			labor_stats = Array.new	# Used for formatting the eventual JSON object.
			# DONE: Unemployment rate, average salary, economic growth[needs to be added]:float,
			# DONE: No unemp_trend
			#  Allow nulls to be returned
			# DONE: National average for each field
			fields = [:unemp_rate, :income_per_capita, :economic_growth]

			# Collect the value of each field in coli_stats.
			fields.each do |field|
				stat = lookup["#{location[:label]}"][field] 
				stat = stat ? stat.to_f : nil
				labor_stats << stat
			end

			labor_stats << Coli.average(:unemp_rate).to_f
			labor_stats << Coli.average(:income_per_capita).to_f
			labor_stats << Coli.average(:economic_growth).to_f

			# Add max and min. The compact method removes nils.
			unless labor_stats.empty?
				labor_stats << labor_stats.compact.min
				labor_stats << labor_stats.compact.max
			end

			result["labor_#{i}"] = labor_stats

			
			##### -------------------- TAXES --------------------- #####
			tax_stats = Array.new	# For formatting the eventual JSON object.			
			fields = [:sales_tax, :income_tax_min, :income_tax_max, :property_tax]

			# Collect the value of each field in coli_stats.
			fields.each do |field|
				stat = lookup["#{location[:label]}"][field] 
				stat = stat ? stat.to_f : nil
				tax_stats << stat
			end

			# Add max and min.
			unless tax_stats.empty?
				tax_stats << tax_stats.min
				tax_stats << tax_stats.max
			end

			result["taxes_#{i}"] = tax_stats


			##### -------------------- WEATHER ------------------- #####
			weather_high_stats = Array.new
			weather_low_stats = Array.new

			# First, look for an exact match (the current location's city matches 
			# the record's city and likewise for state).
			match_found = false
			records.each do |record|
<<<<<<< HEAD
				if location[:city] == record[:city] and 
					 location[:state] == record[:state] then
					match_found = true
					weather_high_stats << (record[:high] ? record[:high].to_f : nil)
					weather_low_stats << (record[:low] ? record[:low].to_f : nil)
				end					
=======
				if record[:city] == location then
					weather_high_stats << record[:high].to_f if record[:high]
					weather_low_stats << record[:low].to_f if record[:low]
				end
>>>>>>> dev
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

			result["weather_#{i}"] = weather_high_stats
			result["weatherlow_#{i}"] = weather_low_stats
		
			# Increment for next object.	
			i += 1
		end

		result[:operation] = params[:operation]
		# Return the result, formatted as JSON, and with a 200 OK HTTP code.
		render json: result, status: 200
	end
end
