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
		i = 1
		objects.each do |object|
			location = object.values[0]

			# Name each location.
			result["location_#{i}".to_sym] = location

			###### ---------------- WEATHER --------------- #####
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

			# Send min and max weather values.
			result["max_weather_#{i}"] = WeatherRecord.maximum(:high)
			result["min_weather_#{i}"] = WeatherRecord.minimum(:low)
			##### -------------------- END WEATHER -------------------- #####
			
			i += 1
		end
		
		# Large array of:
		# labor_[city]_[category#] (unemploy, avgsalary, econgrowth)
		# Followed by:
		# labor_max
		# labor_min
		
		# Large array of:
		# cli_[city]_[category] 
		# (overall, city, goods, groceries, healthcare, housing, trans, utilities)
		# Followed by:
		# cli_max
		# cli_min

		# Large array of:
		# taxes_city_[1, 2, 3]
		# Followed by:
		# taxes_max
		# taxes_min

		# Return the result.
		render json: result, status: 200
		# End querying the database.
	end
end
