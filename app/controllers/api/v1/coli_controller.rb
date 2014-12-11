class Api::V1::ColiController < ApplicationController
	# Retrieve all location data by location name.
	def show
		# Check for the required fields, and return an appropriate message if
		# they are not present.
		unless params[:search_by]
			message = {'error' => 
				"The search_by field was empty. It should be a column name."}
			render json: message, status: 400
			return
		end

		unless params[:objects]
			message = {'error' => 
				"The objects field was empty. It should be an array."}
			render json: message, status: 400
			return
		end

		# The column we're searching over. Currently this is always 'location',
		# but it could change.
		column = params[:search_by]

		# A hash that stores the results. This will be converted into a JSON
		# object.
		result = Hash.new

		lookup = Hash.new

		# A list of the locations that were passed in.
		locations = Array.new
		params[:objects].each do |object|
			locations << object.values[0]
		end

		# Create a string of the form 'location = l1 OR location = l1 OR ...'.
		where_string = ""
		locations.each do |location|
			#where_string += "location = '#{location}' OR "
			where_string += 'location = ? OR '
		end

		# Strip off the last ' OR '.
		where_string = where_string[0..-5]

		# Query the database.
		records = Coli.joins(:weather_records)
									.select(:cost_of_living,
													:transportation,
													:groceries,
													:goods,
													:health_care,
													:utilities,
													:housing,
													:location,
													:unemp_rate,
													:unemp_trend,
													:income,
													:income_tax,
													:sales_tax,
													:property_tax,
													:month,
													:high,
													:low)
									.where([where_string, *locations])
									.order('colis.id ASC')	

		locations.each do |location|
			records.each do |record|
				if record[:location] == location then
					lookup["#{location}"] = record
					break
				end
			end
		end

		# Check that we found everything in the database.
		not_found = Array.new
		locations.each do |location|
			not_found << location unless lookup["#{location}"]
		end
		unless not_found.empty?
			result[:failure] = 'Some objects weren\'t found in the database.'
			result[:not_found] = not_found
			return render json: result, status: 200
		end

		# Store each object's data in result.
		# We'll need to both iterate over each location and keep track of their
		# indices, because that's how the view tracks them.
		i = 1
		locations.each do |location|
			# Name each location.
			result["location_#{i}"] = location
	
			##### ---------------- COST OF LIVING ---------------- #####
			coli_stats = Array.new	# Used for formatting the eventual JSON object.

			coli_stats << lookup["#{location}"][:cost_of_living].to_f
			coli_stats << lookup["#{location}"][:goods].to_f
			coli_stats << lookup["#{location}"][:groceries].to_f
			coli_stats << lookup["#{location}"][:health_care].to_f
			coli_stats << lookup["#{location}"][:housing].to_f
			coli_stats << lookup["#{location}"][:transportation].to_f
			coli_stats << lookup["#{location}"][:utilities].to_f

			# Add the mins and maxes.
			coli_stats << coli_stats.max
			coli_stats << coli_stats.min

			# Add the data to the result.
			result["cli_#{i}"] = coli_stats


			##### -------------------- LABOR --------------------- #####
			labor_stats = Array.new	# Used for formatting the eventual JSON object.

			labor_stats << lookup["#{location}"][:unemp_trend].to_f
			labor_stats << lookup["#{location}"][:income].to_f
			labor_stats << lookup["#{location}"][:unemp_trend].to_f

			# Add max and min.
			labor_stats << labor_stats.max
			labor_stats << labor_stats.min

			result["labor_#{i}"] = labor_stats

			
			##### -------------------- TAXES --------------------- #####
			tax_stats = Array.new	# Used for formatting the eventual JSON object.			

			tax_stats << lookup["#{location}"][:income_tax].to_f
			tax_stats << lookup["#{location}"][:property_tax].to_f
			tax_stats << lookup["#{location}"][:sales_tax].to_f

			# Add max and min.
			tax_stats << labor_stats.max
			tax_stats << labor_stats.min

			result["taxes_#{i}"] = tax_stats


			##### -------------------- WEATHER ------------------- #####
			weather_high_stats = Array.new
			weather_low_stats = Array.new

			records.each do |record|
				if record[:location] == location then
					weather_high_stats << record[:high].to_f
					weather_low_stats << record[:low].to_f
				end
			end

			# Add max and min for each list.
			weather_high_stats << weather_high_stats.max
			weather_high_stats << weather_high_stats.min
			weather_low_stats << weather_low_stats.max
			weather_low_stats << weather_low_stats.min

			result["weather_#{i}"] = weather_high_stats
			result["weatherlow_#{i}"] = weather_low_stats
		
			# Increment for next object.	
			i += 1
		end

		# Return the result, formatted as JSON, and with a 200 OK HTTP code.
		render json: result, status: 200
	end
end
