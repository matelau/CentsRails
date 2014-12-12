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

		# The objects whose data we're searching for. Currently these are cities.
	  	objects = params[:objects]

		# A hash that stores the results. This will be converted into a JSON
		# object.
		result = Hash.new

		# Store each object's data in result.
		# We'll need to both iterate over each location and keep track of their
		# indices, because that's how the view tracks them.
		i = 1
		objects.each do |object|
			location = object.values[0]

			# Name each location.
			result["location_#{i}".to_sym] = location
	
			# Query the database.
			records = Coli.select('*').where(['location = ?', location])

			##### ---------------- COST OF LIVING ---------------- #####
			coli_stats = Array.new	# Used for formatting the eventual JSON object.

			# Get overall COLI data for this location.
			coli_stats << records[0][:cost_of_living]
			coli_stats << records[0][:goods]
			coli_stats << records[0][:groceries]
			coli_stats << records[0][:health_care]
			coli_stats << records[0][:housing]
			coli_stats << records[0][:transportation]
			coli_stats << records[0][:utilities]

			# Add the mins and maxes.
			coli_stats << coli_stats.min
			coli_stats << coli_stats.max


			# Add the data to the result.
			result["cli_#{i}"] = coli_stats


			##### -------------------- LABOR --------------------- #####
			labor_stats = Array.new	# Used for formatting the eventual JSON object.

			# Get unemployment data for this location.
			labor_stats << records[0][:unemp_rate]
			labor_stats << records[0][:income]
			labor_stats << records[0][:unemp_trend]

			# Add max and min.
			labor_stats << labor_stats.max
			labor_stats << labor_stats.min

			result["labor_#{i}"] = labor_stats

			
			##### -------------------- TAXES --------------------- #####
			tax_stats = Array.new	# Used for formatting the eventual JSON object.			

			# Get income taxes for this location.
			tax_stats << records[0][:income_tax]
			tax_stats << records[0][:property_tax]
			tax_stats << records[0][:sales_tax]

			# Add max and min.
			tax_stats << labor_stats.max
			tax_stats << labor_stats.min

			result["taxes_#{i}"] = tax_stats


			##### -------------------- WEATHER ------------------- #####
			weather_high_stats = Array.new
			weather_low_stats = Array.new

			# Add weather data for high temperature records.
			records = Coli.joins(:weather_records)
										.select(:month, :high, :low)
										.where(['location = ?', location])
										.order('colis.id ASC')	

			records.each do |record|
				weather_high_stats << record[:high]
				weather_low_stats << record[:low]
			end

			# Add max and min for each list.
			weather_high_stats << weather_high_stats.min
			weather_high_stats << weather_high_stats.max

			weather_low_stats << weather_low_stats.min
			weather_low_stats << weather_low_stats.max


			result["weather_#{i}"] = weather_high_stats
			result["weatherlow_#{i}"] = weather_low_stats
		
			# Increment for next object.	
			i += 1
		end

		# Return the result, formatted as JSON, and with a 200 OK HTTP code.
		render json: result, status: 200
	end
end
