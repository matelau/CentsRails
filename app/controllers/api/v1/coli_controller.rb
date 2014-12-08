class Api::V1::ColiController < ApplicationController
### Just for testing
#	def index
#		if params[:id]  	
#			render json: Coli.find(params[:id]), status: 200
#		else
#			render json: 'Enter an ID.'
#		end
#	end

	# Retrieve all location data by location name.
	# (Well, it SHOULD. Right now it looks up some location data by ID.)
	# 			(2) Retrieve weather data also.
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

		# Start querying the database.
		column = params[:search_by]
	  objects = params[:objects]
		result = Hash.new

		## Pull all columns in both the colis and weather_records tabls for each
		## object.
		#objects.each do |o|
		#	result << Coli.joins(:weather_records).where(['? = ?', column, o])
		#	result << WeatherRecord.maximum('high')
		#end

		# Add data for each object.
		# We'll need to both iterate over each location and keep track of their
		# indices, because that's how the view tracks them.
		i = 1
		objects.each do |object|
			location = object.values[0]

			# Name each location.
			result["location_#{i}".to_sym] = location
	
		# Large array of:
		# cli_[city]_[category] 
		# (overall, city, goods, groceries, healthcare, housing, trans, utilities)
		# Followed by:
		# cli_max
		# cli_min
			##### ---------------- COST OF LIVING ---------------- #####
			# Get overall COLI data for this location.
			records = Coli.select(:cost_of_living)
										.where(['location = ?', location])
			result["cli_#{i}_1"] = records[0][:cost_of_living]

			# Re-send the location for the visualization.
			result["cli_#{i}_2"] = location

			# Get goods COLI data for this location.
			records = Coli.select(:goods)
										.where(['location = ?', location])
			result["cli_#{i}_3"] = records[0][:goods]

			# Get groceries COLI data for this location.
			records = Coli.select(:groceries)
										.where(['location = ?', location])
			result["cli_#{i}_4"] = records[0][:groceries]

			# Get healthcare COLI data for this location.
			records = Coli.select(:health_care)
										.where(['location = ?', location])
			result["cli_#{i}_5"] = records[0][:health_care]

			# Get housing COLI data for this location.
			records = Coli.select(:housing)
										.where(['location = ?', location])
			result["cli_#{i}_6"] = records[0][:housing]

			# Get transportation COLI data for this location.
			records = Coli.select(:transportation)
										.where(['location = ?', location])
			result["cli_#{i}_7"] = records[0][:transportation]

			# Get utilities COLI data for this location.
			records = Coli.select(:utilities)
										.where(['location = ?', location])
			result["cli_#{i}_8"] = records[0][:utilities]
			#### ---------------- END COST OF LIVING ------------- ####
	

			##### -------------------- LABOR --------------------- #####
			# Get unemployment data for this location.
			records = Coli.select(:unemp_rate)
										.where(['location = ?', location])
			result["labor_#{i}_1"] = records[0][:unemp_rate]

			# Get income data for this location.
			records = Coli.select(:income)
										.where(['location = ?', location])
			result["labor_#{i}_2"] = records[0][:income]

			# Get growth data for this location.
			records = Coli.select(:unemp_trend)
										.where(['location = ?', location])
			result["labor_#{i}_1"] = records[0][:unemp_trend]
			##### -------------------- END LABOR ----------------- #####


			##### -------------------- WEATHER ------------------- #####
			# Add weather data for high temperature records.
			j = 1
			records = Coli.joins(:weather_records)
										.select(:high)
										.where(['location = ?', location])
										.order('month ASC')
			
			records.each do |record|
				result["weather_#{i}_#{j}"] = record[:high]
				j += 1
			end

			# Add weather data for low temperature records.
			j = 1
			records = Coli.joins(:weather_records)
										.select(:low)
										.where(['location = ?', location])
										.order('month ASC')
			
			records.each do |record|
				result["weatherlow_#{i}_#{j}"] = record[:low]
				j += 1
			end
			##### -------------------- END WEATHER --------------- #####
			
			i += 1
		end

		# Get max and min of overall COLI data.
		result["cli_max"] = Coli.maximum(:cost_of_living)
		result["cli_min"] = Coli.minimum(:cost_of_living)	

		# Get max and min of unemployment data.
		result["labor_max_1"] = Coli.maximum(:unemp_rate)
		result["labor_min_1"] = Coli.minimum(:unemp_rate)
		
		# Get max and min of income data.
		result["labor_max_2"] = Coli.maximum(:income)
		result["labor_min_2"] = Coli.minimum(:income)

		# Get max and min of growth data.
		result["labor_max_3"] = Coli.maximum(:unemp_trend)
		result["labor_min_3"] = Coli.minimum(:unemp_trend)

		# Send min and max weather values.
		result["max_weather"] = WeatherRecord.maximum(:high)
		result["min_weather"] = WeatherRecord.minimum(:low)
	
		# Large array of:
		# taxes_city_[1, 2, 3]
		# Followed by:
		# taxes_max
		# taxes_min

		# Return the result, formatted as JSON, and with a 200 OK HTTP code.
		render json: result, status: 200
		# End querying the database.
	end
end
