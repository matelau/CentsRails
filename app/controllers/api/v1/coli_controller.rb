class Api::V1::ColiController < ApplicationController
	# Retrieve all location data by location name.
	def show
		# Check for the required fields, and return an appropriate message if
		# they are not present.
		unless params[:search_by].present?
			message = {'error' => 
				"The search_by field was missing. Don't forget the underscore."}
			return render json: message, status: 400
		end

		unless params[:objects].present?
			message = {'error' => "No objects were in the objects array."}
			return render json: message, status: 400
		end

		# The column we're searching over. Currently this is always 'location',
		# but it could change.
		column = params[:search_by]

		# A hash that stores the results. This will be converted into a JSON
		# object.
		result = Hash.new

		lookup = Hash.new

		# Create a list of the locations that were passed in.
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

		#result[:test] = records

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
			coli_stats = Array.new	# For formatting the eventual JSON object.
			
			# Note that order is important.
			fields = [:cost_of_living, :goods, :groceries, :health_care, 
				:housing, :transportation, :utilities]

			# Collect the value of each non-nil field in coli_stats.
			fields.each do |field|
				stat = lookup["#{location}"][field]
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
			labor_stats = Array.new	# Used for formatting the eventual JSON object.

			fields = [:unemp_trend, :income, :unemp_rate]

			# Collect the value of each non-nil field in coli_stats.
			fields.each do |field|
				stat = lookup["#{location}"][field]
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

			fields = [:income_tax, :property_tax, :sales_tax]

			# Collect the value of each non-nil field in coli_stats.
			fields.each do |field|
				stat = lookup["#{location}"][field]
				tax_stats << stat.to_f if stat
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

			records.each do |record|
				if record[:location] == location then
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
		end

		# Return the result, formatted as JSON, and with a 200 OK HTTP code.
		render json: result, status: 200
	end
end
